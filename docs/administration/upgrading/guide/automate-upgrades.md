---
title: How to automate Octopus Deploy upgrades
description: A how-to guide on how to automate Octopus Deploy upgrades
position: 4
---

Automating the Octopus Deploy upgrade ensures all essential steps are executed during an upgrade.  This guide provides the steps necessary to automate the upgrade process.

## Overview

This guide was written for upgrading Octopus Deploy on Windows. 

### Process 

In general, the automatic upgrade process should:

1. Backup the Master Key and license.
1. Check for a new version.
1. Enable [maintenance mode](/docs/administration/managing-infrastructure/maintenance-mode.md).
1. Stop the instance.
1. Backup the database.
1. Download and install the MSI.
1. Upgrade the database.
1. Start the instance back up.

!include <upgrade-octopus-backup-master-key>

### Checking for new versions

Invoking the `/api` endpoint on your instance, for example [https://samples.octopus.app/api](https://samples.octopus.app/api), will return the version your instance is running.

We publish a JSON feed of every version of Octopus Server and its corresponding release date here: `https://octopus.com/download/upgrade/v3`

Using these two endpoints, you can write a script that finds an appropriate version to which to upgrade.

```PowerShell
$url = 'https://samples.octopus.app'
$currentMajorVersion = (Invoke-RestMethod "$Url/api").Version.Split('.')
$versions = Invoke-RestMethod "https://octopus.com/download/upgrade/v3" `
    | Where-Object { $_.Version.StartsWith($currentMajorVersion + '.') }
$upgradeVersion = $versions[-1].Version
```

:::hint
**Choose business rules to suit your needs**
This code selects the newest minor/patch version but will not select a new major version. Intentionally avoiding a major version upgrade in an automation script like this minimizes the potential for unexpected downtime and impact to your Octopus users. 

**When scripting your upgrade you should consider your organization's comfort level and tolerance for downtime and define your business rules carefully.**
:::

### Downloading the installer

MSI installers are available to download for Windows x64 platforms at: https://download.octopusdeploy.com/octopus/Octopus.[versionnumber]-x64.msi.

Continuing with our script above, we download the installer:
```PowerShell
$msiFilename = "Octopus.$upgradeVersion-x64.msi"
Write-Host "Downloading $msiFilename"
Invoke-WebRequest "https://download.octopusdeploy.com/octopus/$msiFilename" -OutFile "${env:TEMP}\$msiFilename"
```

### Enabling and disabling maintenance mode

The following PowerShell script will enable maintenance mode if it's not already enabled:

```PowerShell
$apiKey = "API-YOURKEY"
$url = "https://youroctopusserver.url"

if (-not (Invoke-RestMethod -Uri "$url/api/maintenanceconfiguration" -Headers @{'X-Octopus-ApiKey' = $apiKey}).IsInMaintenanceMode) {
    Invoke-RestMethod `
        -Method Put `
        -Uri "$url/api/maintenanceconfiguration" `
        -Headers @{'X-Octopus-ApiKey' = $apiKey} `
        -Body (@{ Id = "maintenance"; IsInMaintenanceMode = $true } | ConvertTo-Json)
}
```

### Stop the instance

[Octopus.Server.exe](/docs/octopus-rest-api/octopus.server.exe-command-line/index.md) is the command-line interface, or CLI, of the Octopus Manager.  The below script will drain the node and wait for all the tasks to complete and then stop the service:

```PowerShell
Set-Location "${env:ProgramFiles}\Octopus Deploy\Octopus" 
& .\Octopus.Server.exe node --instance="OctopusServer" --drain=true --wait=0
& .\Octopus.Server.exe service --instance="OctopusServer" --stop
```
### Backup the SQL Server database

The simplest backup possible is a full database backup.  Execute the below T-SQL command to save a backup to a NAS or file share:

```sql
BACKUP DATABASE [OctopusDeploy]
  TO DISK = '\\SomeServer\SomeDrive\OctopusDeploy.bak'
      WITH FORMAT;
```

The `BACKUP DATABASE` T-SQL command has dozens of options.  Please refer to [Microsoft's documentation](https://docs.microsoft.com/en-us/sql/relational-databases/backup-restore/create-a-full-database-backup-sql-server?view=sql-server-ver15) or consult a DBA to understand which options you should use.

You can invoke the `BACKUP DATABASE` command from PowerShell using [sqlcmd](https://docs.microsoft.com/en-us/sql/tools/sqlcmd-utility)

### Installing the MSI

Use the downloaded installer by invoking `msiexec.exe`:

```PowerShell
msiexec /i "${env:TEMP}\$msiFilename" /quiet | Out-Null
```

:::warning
Please run `msiexec.exe` as an administrator.  It is performing an installation, and you will be prompted by Windows to confirm.
:::

Alternatively, you can use [Chocolatey](https://chocolatey.org) to install Octopus. See the `OctopusDeploy` [chocolatey package](https://chocolatey.org/packages/OctopusDeploy) for further information.

### Upgrading the database and restarting the service

Upgrading the database and restarting the service is all done via the `Octopus.Server.exe` command line:

```PowerShell
Set-Location "${env:ProgramFiles}\Octopus Deploy\Octopus"
& .\Octopus.Server.exe database --instance="OctopusServer" --upgrade
& .\Octopus.Server.exe service --instance="OctopusServer" --start
& .\Octopus.Server.exe node --instance="OctopusServer" --drain=false 
```

### Putting it all together

The final PowerShell script might look like this:

```PowerShell
$url = 'https://samples.octopus.app'
# This is the default install location, but yours could be different
$installPath = "${env:ProgramFiles}\Octopus Deploy\Octopus"
$apiKey = "API-YOURKEY"

# Get the latest minor/patch version
$currentVersion = (Invoke-RestMethod "$Url/api").Version
$currentMajorVersion = $currentVersion.Split('.')
$versions = Invoke-RestMethod "https://octopus.com/download/upgrade/v3" `
    | Where-Object { $_.Version.StartsWith($currentMajorVersion + '.') }
$upgradeVersion = $versions[-1].Version

if ($upgradeVersion -eq $currentVersion) {
    Write-Host "No new versions found. Quitting..."
    exit
}

# Download the installer
$msiFilename = "Octopus.$upgradeVersion-x64.msi"
Write-Host "Downloading $msiFilename"
Invoke-WebRequest "https://download.octopusdeploy.com/octopus/$msiFilename" -OutFile "${env:TEMP}\$msiFilename"

# Place Octopus into maintenance mode
if (-not (Invoke-RestMethod -Uri "$url/api/maintenanceconfiguration" -Headers @{'X-Octopus-ApiKey' = $apiKey}).IsInMaintenanceMode) {
    Invoke-RestMethod `
        -Method Put `
        -Uri "$url/api/maintenanceconfiguration" `
        -Headers @{'X-Octopus-ApiKey' = $apiKey} `
        -Body (@{ Id = "maintenance"; IsInMaintenanceMode = $true } | ConvertTo-Json)
}

# Finish any remaining tasks and stop the service
& $installPath\Octopus.Server.exe node --instance="OctopusServer" --drain=true --wait=0
& $installPath\Octopus.Server.exe service --instance="OctopusServer" --stop

# Backup database
$fileName = 'OctopusDeploy_' + (Get-Date -Format FileDateTime) + '.bak'
sqlcmd -S 'sqlserver.octopus.app' -Q "BACKUP DATABASE [OctopusDeploy] TO DISK = .\$fileName WITH FORMAT;"

# Running the installer
msiexec /i "${env:TEMP}\$msiFilename" /quiet | Out-Null

# Upgrade database and restart service
& $installPath\Octopus.Server.exe database --instance="OctopusServer" --upgrade
& $installPath\Octopus.Server.exe service --instance="OctopusServer" --start
& $installPath\Octopus.Server.exe node --instance="OctopusServer" --drain=false

Remove-Item "${env:TEMP}\$msiFilename"
```

Depending on the duration of the upgrade, your Octopus Server may still be starting up when the script completes. It will still be in maintenance mode, giving you a chance to log in to the Octopus web portal and verify things are working as expected.

## Upgrading High Availability Octopus Deploy instances

It is possible to automate upgrading Octopus Deploy High Availability instances, but it requires more than a single script.  The recommendation is to use an Octopus Deploy runbook on another instance to upgrade the High Availability instance.  You can get a free license to do this with an [Octopus Cloud instance](https://octopus.com/start).

![](images/upgrade-diagram.png "width=500")

Each HA node will need a Tentacle installed on it.  You will need two roles for this to work.

- HAServer: All Tentacles will be assigned to this.
- HAServer-Primary: This is the server which does the majority of the work (checking for new versions, upgrading the database, etc).

The process will look like:

1. Check for a new version (HAServer-Primary).
2. Put the server into maintenance mode (HAServer-Primary).
3. Stop all nodes (HAServer).
4. Install the MSI (HAServer).
5. Upgrade the database (HAServer-Primary).
6. Restart all nodes (HAServer).

This extra work is needed because the database can only be upgraded by one node.  Multiple nodes attempting to upgrade the database can (and will) result in deadlocks.

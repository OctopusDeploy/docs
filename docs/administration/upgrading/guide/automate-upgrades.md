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

Two URLs provide version information for Octopus Deploy.

- `https://octopus.com/downloads/upgrade`: Returns the most recent version Octopus Deploy to download.
- `https://octopus.com/download/upgrade/v3`: Returns all the versions, past and present, available for download in JSON format.

Invoking the `/api` endpoint on your instance, for example [https://samples.octopus.app/api](https://samples.octopus.app/api), will return the version your instance is running.

The URL to download a specific version of Octopus Deploy is: https://download.octopusdeploy.com/octopus/Octopus.[versionnumber]-x64.msi.  For example https://download.octopusdeploy.com/octopus/Octopus.2020.4.1-x64.msi

You can write a script to check Octopus's current installed version and compare it against the latest version with this information.  The script can include business rules such as:

- Only download patch releases.
- Only download minor releases.
- Only download minor releases after it goes to .2.  For example, currently on 2020.3.4, wait until 2020.4.2 or higher.
- Only download the next major release after it goes to .3. For example, currently, on 2019.13.7, wait until 2020.3.1 is released.
- Download the latest release.

The PowerShell script below enforces some of those business rules:

```PowerShell
$allowMajorUpgrade = $true
$onlyAllowMinorUpgrades = $true

$apiInformation = Invoke-RestMethod "http://localhost:81/api"
$currentVersionArray = $apiInformation.Version.Split(".")

$activeVersionList = Invoke-RestMethod "https://octopus.com/download/upgrade/v3"
$versionToDownload = $null

if ($allowMajorUpgrade -eq $true)
{
    $matchingVersions = @($activeVersionList | Where-Object {[int]($_.Version.Split("."))[0] -gt [int]$currentVersionArray[0]})
    $versionToDownload = $matchingVersions[$matchingVersions.Count - 1].Version
}

if ($null -eq $versionToDownload -and ($onlyAllowMinorUpgrades -eq $true -or $allowMajorUpgrade -eq $true))
{
    $matchingVersions = @($activeVersionList | Where-Object {($_.Version.Split("."))[0] -eq $currentVersionArray[0] -and [int]($_.Version.Split("."))[1] -ge [int]$currentVersionArray[1]})
    $versionToDownload = $matchingVersions[$matchingVersions.Count - 1].Version
}

if ($null -eq $versionToDownload)
{
    $matchingVersions = @($activeVersionList | Where-Object {($_.Version.Split("."))[0] -eq $currentVersionArray[0] -and ($_.Version.Split("."))[1] -eq $currentVersionArray[1] -and [int]($_.Version.Split("."))[2] -gt [int]$currentVersionArray[2]})
    $versionToDownload = $matchingVersions[$matchingVersions.Count - 1].Version
}

if ($null -ne $versionToDownload -and $versionToDownload -ne $apiInformation.Version)
{
    Write-Host "Downloading $versionToDownload"
    $filePath = "C:\Temp\Octopus.$versionToDownload-x64.msi"
    $url = "https://download.octopusdeploy.com/octopus/Octopus.$versionToDownload-x64.msi"
    Invoke-RestMethod -Method GET -Uri $url -OutFile $filePath
}
```

### Enabling and disabling maintenance mode

You can enable or disable maintenance mode via an API script:

```PowerShell
$OctopusAPIKey = "YOUR API KEY"
$OctopusURL = "https://yoururl.something.com"
$IsMaintenanceMode = $true

$header = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$header.Add("X-Octopus-ApiKey", $OctopusAPIKey)
$header.Add("X-HTTP-Method-Override", "PUT")

$rawRequest = @{
  Id = "maintenance";
  IsInMaintenanceMode = $IsMaintenanceMode;  ## Change this to false when you want to take out of maintenance mode
  Links = @{
    Self = "/api/maintenanceconfiguration";
  }
}
$jsonRequest = $rawRequest | ConvertTo-Json

Write-Host "Sending in the request $jsonRequest"

$maintenanceUrl = "$OctopusUrl/api/maintenanceconfiguration"
Write-Host "Setting maintenance mode $maintenanceUrl"
$maintenanceResponse = Invoke-RestMethod $maintenanceUrl -Headers $header -Method POST -Body $jsonRequest

Write-Host "Maintenance's response: $maintenanceResponse"
```

### Stop the instance

[Octopus.Server.exe](/docs/octopus-rest-api/octopus.server.exe-command-line/index.md) is the command-line interface, or CLI, of the Octopus Manager.  The below script will drain the node and wait for all the tasks to complete and then stop the service:

```PowerShell
Set-Location "${env:ProgramFiles}\Octopus Deploy\Octopus" 

& .\octopus.server.exe node --instance="OctopusServer" --drain=true --wait=0
& .\octopus.server.exe service --instance="OctopusServer" --stop
```
### Backup the SQL Server database

The simplest backup possible is a full database backup.  Execute the below T-SQL command to save a backup to a NAS or file share:

```
BACKUP DATABASE [OctopusDeploy]
          TO DISK = '\\SomeServer\SomeDrive\OctopusDeploy.bak'
             WITH FORMAT;
```

The `BACKUP DATABASE` T-SQL command has dozens of options.  Please refer to [Microsoft's documentation](https://docs.microsoft.com/en-us/sql/relational-databases/backup-restore/create-a-full-database-backup-sql-server?view=sql-server-ver15) or consult a DBA to understand which options you should use.

### Installing the MSI

The Octopus Deploy MSI installation can be automated by calling `msiexec.exe` directly or using a third-party tool such as Chocolatey.

:::warning
Please run `msiexec.exe` as an administrator.  It is performing an installation, and you will be prompted by Windows to confirm.
:::

#### Using msiexec.exe

Windows includes [msiexec.exe](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/msiexec) as part of the base installation.

The `msiexec.exe` can be invoked via PowerShell by using the Start-Process command.  This example will send in the `/i` and `/quiet` arguments to install the MSI without user interaction:

```PowerShell
$msi = "C:\Temp\OctopusDeploy.2020.4.2.msi"
Write-Output "Installing MSI $msi" 
$msiExitCode = (Start-Process -FilePath "msiexec.exe" -ArgumentList "/i $msi /quiet" -Wait -Passthru).ExitCode 
Write-Output "Server MSI installer returned exit code $msiExitCode" 
```

#### Using Chocolatey

[Chocolatey](https://chocolatey.org) is a third-party package management tool designed to work with Windows.  If you are coming from Linux, it is similar to apt or yum.  

This script will install Chocolatey and then install Octopus Deploy.  The example uses the `--version` argument to set a specific version.  Excluding that will cause the latest version to be installed.  The `-y` argument allows the install to proceed without user input.  For more information, please check out [Chocolatey's documentation.](https://chocolatey.org/docs/commandsinstall):

```PowerShell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

choco install octopusdeploy -y --version 2020.4.11
```

### Upgrade the database and restarting the service

Upgrading the database and restarting the service is all done via the `Octopus.Server.exe` command line:

```PowerShell
Set-Location "${env:ProgramFiles}\Octopus Deploy\Octopus" 
& .\octopus.server.exe database --instance="OctopusServer" --upgrade
& .\octopus.server.exe service --instance="OctopusServer" --start
& .\octopus.server.exe node --instance="OctopusServer" --drain=false 
```

### The complete PowerShell script

The final PowerShell script might look like this:

```PowerShell
$allowMajorUpgrade = $true
$onlyAllowMinorUpgrades = $true

$apiInformation = Invoke-RestMethod "http://localhost:81/api"
$currentVersionArray = $apiInformation.Version.Split(".")

$activeVersionList = Invoke-RestMethod "https://octopus.com/download/upgrade/v3"
$versionToDownload = $null

if ($allowMajorUpgrade -eq $true)
{
    $matchingVersions = @($activeVersionList | Where-Object {[int]($_.Version.Split("."))[0] -gt [int]$currentVersionArray[0]})
    $versionToDownload = $matchingVersions[$matchingVersions.Count - 1].Version
}

if ($null -eq $versionToDownload -and ($onlyAllowMinorUpgrades -eq $true -or $allowMajorUpgrade -eq $true))
{
    $matchingVersions = @($activeVersionList | Where-Object {($_.Version.Split("."))[0] -eq $currentVersionArray[0] -and [int]($_.Version.Split("."))[1] -ge [int]$currentVersionArray[1]})
    $versionToDownload = $matchingVersions[$matchingVersions.Count - 1].Version
}

if ($null -eq $versionToDownload)
{
    $matchingVersions = @($activeVersionList | Where-Object {($_.Version.Split("."))[0] -eq $currentVersionArray[0] -and ($_.Version.Split("."))[1] -eq $currentVersionArray[1] -and [int]($_.Version.Split("."))[2] -gt [int]$currentVersionArray[2]})
    $versionToDownload = $matchingVersions[$matchingVersions.Count - 1].Version
}

if ($null -eq $versionToDownload -or $versionToDownload -ne $apiInformation.Version)
{
    exit 0
}

Write-Host "Downloading $versionToDownload"
$filePath = "C:\Temp\Octopus.$versionToDownload-x64.msi"
$url = "https://download.octopusdeploy.com/octopus/Octopus.$versionToDownload-x64.msi"
Invoke-RestMethod -Method GET -Uri $url -OutFile $filePath

$OctopusAPIKey = "YOUR API KEY"
$OctopusURL = "https://yoururl.something.com"
$IsMaintenanceMode = $true

$header = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$header.Add("X-Octopus-ApiKey", $OctopusAPIKey)
$header.Add("X-HTTP-Method-Override", "PUT")

$rawRequest = @{
  Id = "maintenance";
  IsInMaintenanceMode = $IsMaintenanceMode;  ## Change this to false when you want to take out of maintenance mode
  Links = @{
    Self = "/api/maintenanceconfiguration";
  }
}
$jsonRequest = $rawRequest | ConvertTo-Json

Write-Host "Sending in the request $jsonRequest"

$maintenanceUrl = "$OctopusUrl/api/maintenanceconfiguration"
Write-Host "Setting maintenance mode $maintenanceUrl"
$maintenanceResponse = Invoke-RestMethod $maintenanceUrl -Headers $header -Method POST -Body $jsonRequest

Write-Host "Maintenance's response: $maintenanceResponse"

Set-Location "${env:ProgramFiles}\Octopus Deploy\Octopus" 

& .\octopus.server.exe node --instance="OctopusServer" --drain=true --wait=0
& .\octopus.server.exe service --instance="OctopusServer" --stop

Write-Output "Installing MSI $filePath" 
$msiExitCode = (Start-Process -FilePath "msiexec.exe" -ArgumentList "/i $filePath /quiet" -Wait -Passthru).ExitCode 
Write-Output "Server MSI installer returned exit code $msiExitCode" 

& .\octopus.server.exe database --instance="OctopusServer" --upgrade
& .\octopus.server.exe service --instance="OctopusServer" --start
& .\octopus.server.exe node --instance="OctopusServer" --drain=false 
```

## Upgrading High Availability Octopus Deploy instances

It is possible to automate upgrading Octopus Deploy High Availability instances, but it requires more than a single script.  The recommendation is to use an Octopus Deploy runbook on another instance to upgrade the High Availability instance.  You can get a free license to do this with an [Octopus Cloud instance](https://octopus.com/start).

![](images/upgrade-diagram.png)

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

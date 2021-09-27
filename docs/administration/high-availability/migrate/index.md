---
title: Migration
description: How to migrate from a stand-alone Octopus server to a High Availability (HA) setup.
position: 30
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/1tXVA5pyuqQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You may already have an existing Octopus Server that you wish to make highly available. The process to migrate to Octopus High Availability is the same as the process detailed in [Configuring High Availability for Octopus](/docs/administration/high-availability/configure/index.md), except your existing server will be the **first node** in the cluster.  Migrating to HA will involve:

1. Moving the SQL Server Database to a dedicated SQL Server.
1. Moving all the task logs, packages, artifacts, etc., to a shared storage folder (BLOB data).
1. Configuring a load balancer.

This guide is generic and purposely avoids mentioning specific technologies such as Azure File Storage, AWS RDS SQL Server, etc.  Please refer to the guide matching your hosting solution for specifics.

- [Designing Octopus for High Availability On-Premises](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises.md)
- [Designing Octopus for High Availability in Azure](/docs/administration/high-availability/design/octopus-for-high-availability-on-azure.md)
- [Designing Octopus for High Availability in AWS](/docs/administration/high-availability/design/octopus-for-high-availability-on-aws.md)

## Prep Work

These actions will require downtime.  You can do prep work to keep the downtime to a minimum.

### Moving the database

Moving the SQL Server database involves performing a backup and restore of the database.  That backup and restore have to occur during the outage window.  

You can prepare for that by doing the following:

- Provision the SQL Server Instance (if it doesn't already exist).
- Create the SQL Server user Octopus will use to log into SQL Server (if it doesn't already exist).

After the SQL Server has been provisioned and the user has been created, you'll want to ensure Octopus Deploy can connect to the SQL Server.  It is important to do this on the server hosting Octopus Deploy with the same user the Octopus Deploy Windows Service is running as.  If the Octopus Deploy Windows Service is running as a `Local System` any administrator account should work for this test.

```PowerShell
$userName = ""
$password = ""
$newSQLServer = ""

if ([string]::IsNullOrWhiteSpace($userName) -eq $true){
    Write-Host "No username found, using integrated security"
    $connectionString = "Server=$newSQLServer;Database=master;integrated security=true;"
}
else {
    Write-Host "Username found, using SQL Authentication"
    $connectionString = "Server=$newSQLServer;Database=master;User ID=$userName;Password=$password;"
}

$sqlConnection = New-Object System.Data.SqlClient.SqlConnection
$sqlConnection.ConnectionString = $connectionString

Write-Host "Attempting to connect to $newSQLServer"
$sqlConnection.Open()

Write-Host "Connection successful.  Closing connection."
$sqlConnection.Close()
```

:::hint
You can run that script using the Octopus Deploy [script console](/docs/administration/managing-infrastructure/script-console.md).  If you are using a SQL Login, you'll want to change the user's password after your run your tests as that password will appear in the task log.
:::

### Moving BLOB data

Most of the BLOB data (task logs, artifacts, packages, etc) stored on the file system can be copied to the new location prior to the outage window.  Doing so will reduce the amount of copying you have to do during the outage windows.  In addition, you can make sure your Octopus Deploy instance can use that shared location by running a test script to create and delete a file.  

- Provision the shared storage folder.
- If you are going to create a symbolic link to that shared folder, do that now.
- Use the [script console](/docs/administration/managing-infrastructure/script-console.md) to ensure Octopus can connect to the shared folder and create files.

```PowerShell
$filePath = "YOUR DIRECTORY"
New-Item "$filePath\file.txt" -ItemType file
Remove-Item "$filepath\file.txt"
```

- Run a tool such [RoboCopy](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/robocopy) to copy the folder contents.  

An example PowerShell script using RoboCopy will be:

```PowerShell
robocopy C:\Octopus\TaskLogs \\YOURFILESHARE\OctopusHA\TaskLogs /mir /r:5
robocopy C:\Octopus\Artifacts \\YOURFILESHARE\OctopusHA\Artifacts /mir /r:5
robocopy C:\Octopus\Packages \\YOURFILESHARE\OctopusHA\Packages /mir /r:5
```

### Configure load balancer

Octopus Deploy must sit behind a load balancer when configured in HA mode.  We recommend creating a new URL for your Octopus HA cluster.  For example, if the current URL for your Octopus Instance is `octopus.mydomain.local`, the load-balanced URL could be `octopusha.mydomain.local`.  

The advantage of a new URL is:
1. You can still access each server directly (if need be).
1. The process of redirecting users and applications to the new URL should only need to be done once.
1. You can configure and test it before the outage window, along with working through any connection issues.

!include <load-balancer-endpoint-info>

## Outage Windows

The below steps will cause an outage in Octopus Deploy.  With all the prep work, the outage window should be small.  If possible, we recommend making these change off-hours.  In addition, you don't have to do them all in one outage window.  You can move the database in one outage window, and the file system in the other outage window.  

During your outage window, perform the following steps (skip the sections that don't apply).

1. Ensure you have a backup of your master key.
1. Enable [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode.md) to prevent anyone from deploying or making changes during the upgrade.
1. Stop the Octopus Deploy windows service.

### Move the database

1. Back up the database.
1. Restore the database on the new SQL Server.
1. On your Octopus Server, run the following command to update the connection string (where "VALUE" is your connection string).

```PowerShell
Set-Location "C:\Program Files\Octopus Deploy\Octopus"

& .\Octopus.Server.exe database --connectionString="VALUE"
```

### Move the file storage

1. Run RoboCopy one final time to pick up any new files.
1. Run the following command to update the paths.

```PowerShell
Set-Location "C:\Program Files\Octopus Deploy\Octopus"
$filePath = "YOUR ROOT DIRECTORY"

& .\Octopus.Server.exe path --clusterShared "$filePath"
& .\Octopus.Server.exe path --artifacts "$filePath\Artifacts"
& .\Octopus.Server.exe path --taskLogs "$filePath\TaskLogs"
& .\Octopus.Server.exe path --nugetRepository "$filePath\Packages"
& .\Octopus.Server.exe path --imports "$filePath\Imports"
& .\Octopus.Server.exe path --telemetry "$filePath\Telemetry"
```

:::hint
Your version might not have all the above paths.  Remove them from the script if you are running an older version of Octopus.

- `Imports` was added in 2021.x
- `Telemetry` was added in 2020.x
- `ClusterShared` was added in 2020.x
:::

### After moving database and file storage

After you finish moving the database and file storage, it is time to turn back on your Octopus Deploy instance.

1. Turn back on the Octopus Deploy instance.  If the instance does not startup that indicates a database connection issue.
1. Log in to your instance.
1. Navigate to previous deployments.  If you cannot see the task logs, that indicates a file storage issue.
1. Perform a couple of test deployments.
1. Assuming all goes well, disable maintenance mode.
1. Notify everyone of the new URL (if there is one).

## Adding Additional Nodes

After configuring a load balancer and moving the database and files, adding a new node is trivial.  

1. Create a new server to host Octopus Deploy.
1. Install the same version by downloading it from our [download archive](https://octopus.com/downloads/previous).
1. When the Octopus Manager loads, click the `Add this instance to a High Availability cluster` and follow the wizard.
1. Add that server to your load balancer.
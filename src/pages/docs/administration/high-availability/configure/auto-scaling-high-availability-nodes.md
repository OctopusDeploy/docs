---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Auto Scaling High Availability Nodes
description: What to consider if you want to use auto-scaling technology to scale out your Octopus Server High Availability Cluster automatically.
navOrder: 50
---

Cloud providers, such as AWS and Azure, provide the ability to scale out and scale in virtual machines automatically.  It's possible to leverage that technology to automatically add and remove nodes from your Octopus High Availability cluster, but there are a few pitfalls to note.

:::div{.warning}
At this time, we don't recommend auto-scaling if you are using polling tentacles.  Polling tentacles must poll _all_ the nodes of your High Availability cluster.  That requires [additional configuration](/docs/administration/high-availability/maintain/polling-tentacles-with-ha).  Attempting to perform that additional configuration using auto-scaling can result in frustration and errors.
:::

## Adding new nodes with Scale-out events

A scale-out event is when auto-scaling technology decides it is time to create a new virtual machine via a schedule or a metric-based trigger.  Octopus High Availablity is designed for new nodes to come online at random intervals.  When you create a new node, an entry is added to the `OctopusServerNodes` table with a default task cap of `5`.  That node will start picking up tasks to process within 60 seconds.  A scale-out event is treated no differently than a person manually creating a VM and configuring as a new node via the UI.

The sections below will walk you through _how_ to automate adding new nodes via a script.

### Downloading Octopus Deploy

All nodes in the Octopus High Availability cluster must be running the same version of Octopus Deploy. The server version is returned from the API by going to `[ServerURL]/api`, for example, `https://samples.octopus.app/api`.  

![the version number from the api](/docs/administration/high-availability/configure/images/retrieve-version-from-api.png)

:::div{.hint}
Unlike most API calls, the `/api` endpoint does not require an API key.  
:::

Once you have the version, you can then download that from the Octopus Deploy website (or use [Chocolatey](https://chocolatey.org)).  The URL to use is `https://download.octopusdeploy.com/octopus/Octopus.[Version]-x64.msi`, for example: `https://download.octopusdeploy.com/octopus/Octopus.2021.2.7650-x64.msi`.  

Below is a sample script to download and install Octopus Deploy.

```powershell (MSI)
$yourInstanceUrl = "https://samples.octopus.app"
$downloadLocation = "C:\Temp"

$apiInfo = Invoke-RestMethod "$yourInstanceUrl/api" 
$versionToDownload = $apiInfo.Version

$msiFileName = "Octopus.$versionToDownload-x64.msi"
$downloadUrl = "https://download.octopusdeploy.com/octopus/$msiFileName"
$downloadFileName = "$downloadLocation\$msiFileName"

## Bits transfer is much faster than invoke-restmethod or invoke-webrequest for downloading files
Write-Output "Downloading $downloadUrl to $outfile"
Start-BitsTransfer -source $downloadUrl -destination $outfile

$msiExitCode = (Start-Process -FilePath "msiexec.exe" -ArgumentList "/i $downloadFileNam /quiet" -Wait -Passthru).ExitCode 
Write-Output "Server MSI installer returned exit code $msiExitCode" 
```
```powershell (Chocolatey)
$yourInstanceUrl = "https://samples.octopus.app"

$apiInfo = Invoke-RestMethod "$yourInstanceUrl/api" 
$versionToDownload = $apiInfo.Version

choco install octopusdeploy --version=$versionToDownload -y
```

### Configuring the new node

After Octopus Deploy is installed, you'll need to configure it to point to your high availability cluster.  To configure the node you'll need:

- Octopus Master Key
- Database Server Name
- Database Password

The shared folder settings for BLOB storage are stored in the database.

:::div{.hint}
If you are using a mapped network drive, you'll need to configure that prior to configuring Octopus Deploy.
:::

```powershell (With Active Directory)
$masterKey = "YOUR MASTER KEY"
$databaseServer = "YOUR DATABASE SERVER"
$databaseName = "YOUR DATABASE NAME"
$userName = "YOUR DOMAIN SERVICE ACCOUNT USER NAME"
$password = "YOUR DOMAIN SERVCIE ACCOUNT PASSWORD"
$taskCapSize = "5" ##set this to 0 for UI-only nodes!

## Add your network mapping script here!

& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" create-instance --instance "Default" --config "C:\Octopus\OctopusServer.config"
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" database --instance "Default" --masterKey "$masterkey" --connectionString "Data Source=$databaseserver;Initial Catalog=$databaseName;Integrated Security=True;"
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" configure --instance "Default" --webForceSSL "False" --webListenPrefixes "http://localhost:80/" --commsListenPort "10943"
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" service --instance "Default" --stop
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" service --instance "Default" --user "$userName" --password "$password"  --install --reconfigure --start
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" node --instance "Default" --taskCap=$taskCapSize
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" service --instance "Default" --restart
```
```powershell (No Active Directory)
$masterKey = "YOUR MASTER KEY"
$databaseServer = "YOUR DATABASE SERVER"
$databaseName = "YOUR DATABASE NAME"
$userName = "YOUR DB USER NAME"
$password = "YOUR DB PASSWORD"
$taskCapSize = "5" ##set this to 0 for UI-only nodes!

## Add your network mapping script here!

& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" create-instance --instance "Default" --config "C:\Octopus\OctopusServer.config"
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" database --instance "Default" --masterKey "$masterkey" --connectionString "Data Source=$databaseServer;Initial Catalog=$databaseName;Integrated Security=False;User ID=$userName;Password=$password"
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" configure --instance "Default" --webForceSSL "False" --webListenPrefixes "http://localhost:80/" --commsListenPort "10943"
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" service --instance "Default" --stop
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" service --instance "Default" --user "$userName" --password "$password"  --install --reconfigure --start
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" node --instance "Default" --taskCap=$taskCapSize
& "C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe" service --instance "Default" --restart
```

### Potential pitfalls

Generally, adding a new node to an Octopus High Availability cluster will fail for one the following reasons:

1. Unable to connect to the database.
1. Unable to connect to the shared file storage.
1. Unable to connect to listening tentacles (both targets and workers).
1. Unable to connect to cloud providers.

If you are going to use auto-scaling technologies, we recommend adding each node with the task cap set to 0 at first and not adding it to a load balancer.  When the task cap is 0, the node will not pick up any tasks.  That will allow you to test your scripts and new node without affecting anyone.

On the new server:

1. If the Octopus Web Portal won't load or shows an error, there is a problem connecting to the database or something is preventing the server from starting.
1. If none of the deployment logs appear when viewing the Octopus Web Portal on that node, there is a problem connecting to the file store.
1. Run the **SAVE AND TEST** on any cloud accounts and external feeds to ensure the new node can connect.
1. Remote into the VM and run this PowerShell script.  It will attempt to connect to one of your tentacles.

```powershell

$tentacleHost = "127.0.0.1" # REPLACE WITH A HOST NAME OF ONE OF YOUR TENTACLES"

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
if (-not ([System.Management.Automation.PSTypeName]'ServerCertificateValidationCallback').Type)
{
$certCallback = @"
    using System;
    using System.Net;
    using System.Net.Security;
    using System.Security.Cryptography.X509Certificates;
    public class ServerCertificateValidationCallback
    {
        public static void Ignore()
        {
            if(ServicePointManager.ServerCertificateValidationCallback ==null)
            {
                ServicePointManager.ServerCertificateValidationCallback += 
                    delegate
                    (
                        Object obj, 
                        X509Certificate certificate, 
                        X509Chain chain, 
                        SslPolicyErrors errors
                    )
                    {
                        return true;
                    };
            }
        }
    }
"@
    Add-Type $certCallback
 }
[ServerCertificateValidationCallback]::Ignore()

$url = "https://$($tentacleHost):10933"

try{
    Write-Highlight "Attempting to hit the server $url"
    $result = Invoke-RestMethod $url -TimeoutSec 10
    Write-Highlight "Found tentacle"
}
catch {        
    Throw "Unable to find the tentacle at $url"
}
```

## Removing nodes with Scale-in events

A scale-in event is when the auto-scaling technology decides it is time to delete the virtual machine via a schedule or a metric-based trigger.  

### Removing a task node

A task node is a node where the task cap is greater than 0.  By default, all nodes are task nodes because the default task cap is 5.  However, you can configure UI-Only nodes by setting the task cap to 0. When the underlying VM hosting a task node is deleted, the following will happen:

- Any in-process tasks, including deployments and runbook runs, will fail but will still appear as being executed.
- The node will stop updating the `OctopusServerNodes` table.
- After 60 minutes, the in-process tasks that failed will be marked as canceled by another node in the High Availability cluster.

While High Availability was designed to add nodes quickly, it was not designed to delete nodes quickly.  The assumption was made when a node went offline; it was for a server restart.  It was not designed to handle scale-in events from an auto-scaling technology automatically.

Auto-scaling technologies don't let you run scripts directly on virtual machines as they are being deleted.  They will typically publish a message you can process.  Because of that, you'll need to leverage the [Octopus Deploy REST API](/docs/octopus-rest-api) to do the following:

- Enable drain mode on the node.  While that is enabled, it will prevent the node from picking up new tasks and will attempt to finish in-process tasks.
- Wait until either the node is marked offline or all tasks have finished processing.
- Cancel any in-process tasks if the node is marked offline and there are tasks processing.
- Delete the node from the `OctopusServerNodes` table.

:::div{.warning}
The user required to run this script will need `Administrator` rights to your cluster.  We recommend creating a [service account](/docs/security/users-and-teams/service-accounts) and store that API Key securely.
:::

```powershell
$octopusUrl = "URL of your instances" # e.g. https://samples.octopus.app
$octopusApiKey = "YOUR API KEY"
$nodeName = "Name of node to delete"

function Write-OctopusVerbose
{
    param($message)
    
    Write-Host $message  
}

function Write-OctopusInformation
{
    param($message)
    
    Write-Host $message  
}

function Write-OctopusSuccess
{
    param($message)

    Write-Host $message 
}

function Write-OctopusWarning
{
    param($message)

    Write-Warning "$message" 
}

function Write-OctopusCritical
{
    param ($message)

    Write-Error "$message" 
}

function Invoke-OctopusApi
{
    param
    (
        $octopusUrl,
        $endPoint,
        $spaceId,
        $apiKey,
        $method,
        $item    
    )

    $octopusUrlToUse = $OctopusUrl
    if ($OctopusUrl.EndsWith("/"))
    {
        $octopusUrlToUse = $OctopusUrl.Substring(0, $OctopusUrl.Length - 1)
    }

    if ([string]::IsNullOrWhiteSpace($SpaceId))
    {
        $url = "$octopusUrlToUse/api/$EndPoint"
    }
    else
    {
        $url = "$octopusUrlToUse/api/$spaceId/$EndPoint"    
    }  

    try
    {        
        if ($null -ne $item)
        {
            $body = $item | ConvertTo-Json -Depth 10
            Write-OctopusVerbose $body

            Write-OctopusInformation "Invoking $method $url"
            return Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -Body $body -ContentType 'application/json; charset=utf-8' 
        }

        Write-OctopusVerbose "No data to post or put, calling bog standard invoke-restmethod for $url"
        $result = Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -ContentType 'application/json; charset=utf-8'

        return $result               
    }
    catch
    {
        if ($null -ne $_.Exception.Response)
        {
            if ($_.Exception.Response.StatusCode -eq 401)
            {
                Write-OctopusCritical "Unauthorized error returned from $url, please verify API key and try again."
            }
            elseif ($_.Exception.Response.statusCode -eq 403)
            {
                Write-OctopusCritical "Forbidden error returned from $url, please verify API key and try again."
            }
            else
            {                
                Write-OctopusVerbose -Message "Error calling $url $($_.Exception.Message) StatusCode: $($_.Exception.Response.StatusCode )"
            }            
        }
        else
        {
            Write-OctopusVerbose $_.Exception
        }
    }

    Throw "There was an error calling the Octopus API please check the log for more details."
}

function Get-OctopusNode
{
    param (
        $nodeName,
        $octopusUrl,
        $octopusApiKey
    )

    $nodeList = Invoke-OctopusApi -endPoint "octopusservernodes/summary" -spaceId $null -octopusUrl $octopusUrl -apiKey $octopusApiKey -method "GET"

    $node = $nodeList.Nodes | Where-Object {$_.Name.ToLower().Trim() -eq $nodeName.ToLower().Trim() }

    if ($null -eq $node)
    {
        Write-Error "Unable to find node $nodeName.  Exiting."
        Exit 1
    }

    return $node
}

function Get-IsNodeActive
{
    param ($nodeInformation)

    $isActive = $true
    if ($null -eq $nodeInformation.LastSeen)
    {
        Write-OctopusInformation "The node has not been seen in a long time, the node last seen time is null."    
        $isActive = $false
    }
    else
    {
        $currentTime = Get-Date
        $nodeLastSeen = [DateTime]$nodeInformation.LastSeen
        $timeDiff = ($currentTime - $nodeLastSeen)

        if ($timeDiff.TotalMinutes -gt 5)
        {
            Write-OctopusInformation "The node has not checked in in over 5 minutes.  The node is no longer active."
            $isActive = $false
        }
    }

    return $isActive
}

$nodeInformation = Get-OctopusNode -nodeName $nodeName -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey

$isActive = Get-IsNodeActive -nodeInformation $nodeInformation

if ($isActive -eq $true)
{
    if ($nodeInformation.IsInMaintenanceMode -eq $false)
    {
        $drainNodeRequest = @{
            Id = $nodeInformation.Id
            Name = $nodeInformation.Name
            MaxConcurrentTasks = $nodeInformation.MaxConcurrentTasks
            IsInMaintenanceMode = $true
        }

        $nodeInformation = Invoke-OctopusApi -endPoint "octopusservernodes//$($nodeInformation.Id)" -method "PUT" -apiKey $octopusApiKey -octopusUrl $octopusUrl -spaceId $null -item $drainNodeRequest
    }
        
    while ($isActive -eq $true)
    {
        $nodeInformation = Get-OctopusNode -nodeName $nodeName -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
        $isActive = Get-IsNodeActive -nodeInformation $nodeInformation

        if ($isActive -eq $true)
        {
            if ($nodeInformation.RunningTaskCount -le 0)
            {
                Write-OctopusInformation "The node has finished processing all the tasks, and the drain mode is set to enabled.  It can be deleted now."
                break
            }
        }

    }
}

Write-OctopusInformation "Cancelling all active tasks for that node"
$activeTasks = Invoke-OctopusApi -endPoint "tasks?skip=0&node=$($nodeInformation.Id))&states=Executing%2CCancelling&spaces=all&includeSystem=true&skip=0&take=$($nodeInformation.MaxConcurrentTasks)"

foreach ($task in $activeTasks)
{
    Write-OctopusInformation "Cancelling $($task.Id)"
    Invoke-OctopusApi -endPoint "/tasks/$($task.Id)/cancel" -OctopusUrl $octopusUrl -apiKey $octopusApiKey -spaceId $task.SpaceId -method "POST"
}

Write-OctopusInformation "The node can be safely removed from Octopus now.  Deleting."
Invoke-OctopusApi -endPoint "octopusservernodes/$($nodeInformation.Id)" -method "DELETE" -apiKey $octopusApiKey -octopusUrl $octopusUrl -spaceId $null
```

### Removing a UI-only node

Removing a UI-only node is no different than removing a web server from a web farm.  The Octopus Deploy UI is stateless; your steps to remove a UI-only node are:

- Remove the VM from the load balancer.
- Delete the VM.
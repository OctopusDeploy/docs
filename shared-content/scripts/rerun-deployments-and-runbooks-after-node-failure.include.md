```powershell (REST API)
$octopusUrl = "YOUR URL"
$octopusApiKey = "API KEY"
$maxAgeInMinutes = 240
$serverNodes = "HANode03,HANode04"
$whatIf = $true

$cachedResults = @{}
$changeReport = @()

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
        $item,
        $ignoreCache     
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

        if (($null -eq $ignoreCache -or $ignoreCache -eq $false) -and $method.ToUpper().Trim() -eq "GET")
        {
            Write-OctopusVerbose "Checking to see if $url is already in the cache"
            if ($cachedResults.ContainsKey($url) -eq $true)
            {
                Write-OctopusVerbose "$url is already in the cache, returning the result"
                return $cachedResults[$url]
            }
        }
        else
        {
            Write-OctopusVerbose "Ignoring cache."    
        }

        Write-OctopusVerbose "No data to post or put, calling bog standard invoke-restmethod for $url"
        $result = Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -ContentType 'application/json; charset=utf-8'

        if ($cachedResults.ContainsKey($url) -eq $true)
        {
            $cachedResults.Remove($url)
        }
        Write-OctopusVerbose "Adding $url to the cache"
        $cachedResults.add($url, $result)

        return $result

               
    }
    catch
    {
        if ($null -ne $_.Exception.Response)
        {
            if ($_.Exception.Response.StatusCode -eq 401)
            {
                Write-OctopusCritical "Unauthorized error returned from $url, please verify API key and try again"
            }
            elseif ($_.Exception.Response.statusCode -eq 403)
            {
                Write-OctopusCritical "Forbidden error returned from $url, please verify API key and try again"
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

    Throw "There was an error calling the Octopus API please check the log for more details"
}

function Get-OctopusItemList
{
    param(
        $itemType,
        $endpoint,        
        $spaceId,
        $octopusUrl,
        $octopusApiKey,
        $itemLimit
    )

    if ($null -ne $spaceId) 
    {
        Write-OctopusVerbose "Pulling back all the $itemType in $spaceId"
    }
    else
    {
        Write-OctopusVerbose "Pulling back all the $itemType in the instance"
    }

    if ($null -eq $itemLimit)
    {
        $itemLimit = 10000
    }
    
    if ($endPoint -match "\?+")
    {
        $endpointWithParams = "$($endPoint)&skip=0&take=$itemLimit"
    }
    else
    {
        $endpointWithParams = "$($endPoint)?skip=0&take=$itemLimit"
    }

    $itemList = Invoke-OctopusApi -octopusUrl $octopusUrl -endPoint $endpointWithParams -spaceId $spaceId -apiKey $octopusApiKey -method "GET"
    
    if ($itemList -is [array])
    {
        Write-OctopusVerbose "Found $($itemList.Length) $itemType."

        return $itemList        
    }
    else
    {
        Write-OctopusVerbose "Found $($itemList.Items.Length) $itemType."

        return $itemList.Items
    }
}

function Get-RunbookRunDetailsFromTask
{
    param (
        $runbookTask,
        $octopusUrl,
        $octopusApiKey
    )

    return Invoke-OctopusApi -endPoint "runbookRuns/$($runbookTask.Arguments.RunbookRunId)" -octopusUrl $octopusUrl -spaceId $runbookTask.SpaceId -apiKey $octopusApiKey -method "GET"
}

function Get-DeploymentDetailsFromTask
{
    param (
        $deploymentTask,
        $octopusUrl,
        $octopusApiKey
    )

    return Invoke-OctopusApi -endPoint "deployments/$($deploymentTask.Arguments.DeploymentId)" -octopusUrl $octopusUrl -spaceId $deploymentTask.SpaceId -apiKey $octopusApiKey -method "GET"
}

$currentTime = $(Get-Date).ToUniversalTime()
$serverNodeSplit = $serverNodes -split ","

$spaceList = Get-OctopusItemList -itemType "Spaces" -endpoint "spaces" -spaceId $null -octopusUrl $octopusUrl -itemLimit 10000 -octopusApiKey $octopusApiKey
foreach ($space in $spaceList)
{
    $canceledTasks = Get-OctopusItemList -itemType "Cancelled Tasks" -endpoint "tasks?states=Canceled&spaces=$($space.Id)&includeSystem=False" -spaceId $space.Id -octopusUrl $octopusUrl -itemLimit 200 -octopusApiKey $octopusApiKey
    foreach ($task in $canceledTasks)
    {        
        if ($task.Name -ne "Deploy" -and $task.Name -ne "RunbookRun")
        {
            Write-Host "The task type is $($task.Name) which is not one we are concerned with, moving on"
            continue
        }

        if ($task.ErrorMessage -notlike "*process that was executing the task was terminated unexpectedly*" -and $task.ErrorMessage -notlike "*process that was executing the task was shutdown*")
        {
            Write-Host "This task was not shutdown because of a failover event, moving on"
            continue
        }

        $matchingNode = $serverNodeSplit | Where-Object { $task.ServerNode.ToLower() -like "*" + $_.ToLower() + "*" }
        if ($null -eq $matchingNode)
        {
            Write-Host "This task was not executed on a server node that we are looking for, moving on"
            continue
        }

        $compareTime = [DateTime]::Parse($task.QueueTime)
        $compareTime = $compareTime.ToUniversalTime()

        $differenceInMinutes = ($currentTime - $compareTime).TotalMinutes
        Write-Host "The current task was queued $differenceInMinutes minutes ago"
        if ($differenceInMinutes -gt $maxAgeInMinutes)
        {
            Write-Host "The current task is too old to be considered for a failover event, moving on"
            continue
        }
        
        Write-OctopusSuccess "The task is a deployment or runbook run that failed on a node that we are concerned with and isn't too old, retrying it."

        if ($task.Name -eq "Deploy")
        {
            Write-OctopusInformation "Task $($task.Id) is a deployment, setting up a redeploy."
    
            $deploymentInfo = Get-DeploymentDetailsFromTask -deploymentTask $task -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
    
            $bodyRaw = @{
                EnvironmentId = $deploymentInfo.EnvironmentId
                ExcludedMachineIds = $deploymentInfo.ExcludedMachineIds
                ForcePackageDownload = $deploymentInfo.ForcePackageDownload
                ForcePackageRedeployment = $deploymentInfo.ForcePackageRedeployment
                FormValues = $deploymentInfo.FormValues
                QueueTime = $null
                QueueTimeExpiry = $null
                ReleaseId = $deploymentInfo.ReleaseId
                SkipActions = $deploymentInfo.SkipActions
                SpecificMachineIds = $deploymentInfo.SpecificMachineIds
                TenantId = $deploymentInfo.TenantId
                UseGuidedFailure = $deploymentInfo.UseGuidedFailure
            }
            
            $changeReport += "Resubmitted $($task.Description)"
    
            if ($whatIf -eq $false)
            {
                $newDeployment = Invoke-OctopusApi -endPoint "deployments" -spaceId $task.SpaceId -octopusUrl $octopusUrl -apiKey $octopusApiKey -method "POST" -item $bodyRaw
    
                Write-OctopusSuccess "$($task.Description) has been successfully resubmitted with the new id $($newDeployment.TaskId)"        
            }
        }
    
        if ($task.Name -eq "RunbookRun")
        {
            Write-OctopusInformation "Task $($task.Id) is a runbook run, configuring a re-run."
    
            $runbookInfo = Get-RunbookRunDetailsFromTask -runbookTask $task -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
    
            $bodyRaw = @{
                EnvironmentId = $runbookInfo.EnvironmentId
                ExcludedMachineIds = $runbookInfo.ExcludedMachineIds
                ForcePackageDownload = $runbookInfo.ForcePackageDownload
                ForcePackageRedeployment = $runbookInfo.ForcePackageRedeployment
                FormValues = $runbookInfo.FormValues
                QueueTime = $null
                QueueTimeExpiry = $null
                RunbookId = $runbookInfo.RunbookId
                SkipActions = $runbookInfo.SkipActions
                SpecificMachineIds = $runbookInfo.SpecificMachineIds
                TenantId = $runbookInfo.TenantId
                UseGuidedFailure = $runbookInfo.UseGuidedFailure
                FrozenRunbookProcessId = $runbookInfo.FrozenRunbookProcessId
                RunbookSnapshotId = $runbookInfo.RunbookSnapshotId            
            }
            
            $changeReport += "Resubmitted $($task.Description)"

            if ($whatIf -eq $false)
            {
                $newRunbookRun = Invoke-OctopusApi -endPoint "runbookRuns" -spaceId $task.SpaceId -octopusUrl $octopusUrl -apiKey $octopusApiKey -method "POST" -item $bodyRaw
    
                Write-OctopusSuccess "$($task.Description) has been successfully resubmitted with the new id $($newRunbookRun.TaskId)" 
            }
        }
    }
}

Write-OctopusInformation "Change Report:"
foreach ($item in $changeReport)
{
    Write-OctopusInformation "  $item"
}
```
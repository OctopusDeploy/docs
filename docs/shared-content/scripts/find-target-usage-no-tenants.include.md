```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

$octopusApiKey = "YOUR API KEY"
$octopusUrl = "https://local.octopusdemos.app"
$spaceName = "YOUR SPACE NAME"
$targetName = "YOUR TARGET NAME"

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

    if ($endPoint.ToLower().StartsWith("/api"))
    {
        $url = $octopusUrl + $endPoint
    }
    elseif ($endPoint.ToLower().StartsWith("api"))
    {
        $url = "$octopusUrlToUse/$EndPoint"
    }
    elseif ([string]::IsNullOrWhiteSpace($SpaceId))
    {
        $url = "$octopusUrlToUse/api/$EndPoint"
    }
    else
    {
        $url = "$octopusUrlToUse/api/$spaceId/$EndPoint"    
    }  

    $methodToUse = $method
    if ([string]::IsNullOrWhiteSpace($methodToUse) -eq $true)
    {
        $methodToUse = "GET"
    }

    try
    {        
        if ($null -ne $item)
        {
            $body = $item | ConvertTo-Json -Depth 10
            Write-Verbose $body
            Write-Host "Invoking $methodToUse $url"
            return Invoke-RestMethod -Method $methodToUse -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -Body $body -ContentType 'application/json; charset=utf-8' 
        }

        Write-Verbose "No data to post or put, calling bog standard invoke-restmethod for $url"
        $result = Invoke-RestMethod -Method $methodToUse -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -ContentType 'application/json; charset=utf-8'

        return $result               
    }
    catch
    {
        if ($null -ne $_.Exception.Response)
        {
            if ($_.Exception.Response.StatusCode -eq 401)
            {
                Write-Error "Unauthorized error returned from $url, please verify API key and try again"
            }
            elseif ($_.Exception.Response.statusCode -eq 403)
            {
                Write-Error "Forbidden error returned from $url, please verify API key and try again"
            }
            else
            {                
                Write-Host -Message "Error calling $url $($_.Exception.Message) StatusCode: $($_.Exception.Response.StatusCode )"
            }            
        }
        
        Throw $_.Exception
    }    
}

function Test-OctopusObjectHasProperty
{
    param(
        $objectToTest,
        $propertyName
    )

    $hasProperty = Get-Member -InputObject $objectToTest -Name $propertyName -MemberType Properties

    if ($hasProperty)
    {
        Write-Verbose "$propertyName property found."
        return $true
    }
    else
    {
        Write-Verbose "$propertyName property missing."
        return $false
    }    
}

function Get-ProjectEnvironmentIds
{
    param (
        $project,
        $octopusUrl,
        $octopusApiKey,
        $spaceId
    )

    $channelList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "projects/$($project.Id)/channels?skip=0&take=10000" -spaceId $spaceId
    $lifeCycleIds = @()
    $lifeCycleIds += $project.LifecycleId    
    foreach ($channel in $channelList)
    {
        if ($null -ne $channel.LifecycleId -and $lifeCycleIds -notcontains $channel.LifecycleId)
        {
            $lifeCycleIds += $lifeCycleIds
        }
    }

    $environmentIds = @()
    foreach ($lifecycleId in $lifeCycleIds)
    {
        $lifecycle = Invoke-OctopusApi -octopusUrl $octopusUrl -spaceId $spaceid -apiKey $octopusApiKey -endPoint "lifecycles/$lifecycleId"

        $phases = $lifecycle.Phases

        if ($lifecycle.Phases.Count -eq 0)
        {
            $lifecyclePreview = Invoke-OctopusApi -octopusUrl $octopusUrl -spaceId $null -endPoint $lifecycle.Links.Preview -apiKey $octopusApiKey
            $phases = $lifecyclePreview.Phases
        }

        foreach ($phase in $phases)
        {
            foreach ($environmentId in $phase.AutomaticDeploymentTargets)
            {
                if ($environmentIds -notcontains $environmentId)
                {
                    $environmentIds += $environmentId
                }
            }

            foreach ($environmentId in $phase.OptionalDeploymentTargets)
            {
                if ($environmentIds -notcontains $environmentId)
                {
                    $environmentIds += $environmentId
                }
            }
        }
    }

    return $environmentIds
}

function Get-TargetIsScopedToProcess
{
    param (
        $process,
        $target,
        $projectEnvironmentList
    )

    foreach ($step in $process.Steps)
    {
        $roleFound = $false
        if (Test-OctopusObjectHasProperty -objectToTest $step.Properties -propertyName "Octopus.Action.TargetRoles")
        {
            $roleList = @($step.Properties.'Octopus.Action.TargetRoles' -split ",")            
            foreach ($role in $roleList)
            {
                if ($target.Roles -contains $role)
                {
                    Write-Host "Role $role on the step '$($step.Name)' matches a role in the $targetName"
                    $roleFound = $true
                    break
                }
            }
        }

        if ($roleFound -eq $false)
        {
            continue
        }

        Write-Host "Matching role was found, now checking the scoping of the step."
        foreach ($action in $step.Actions)
        {
            $hasEnvironmentScoping = $action.Environments.Count -gt 0            
            if ($hasEnvironmentScoping -eq $true)
            {
                foreach ($environment in $action.Environments)
                {
                    if ($target.EnvironmentIds -contains $environment)
                    {
                        Write-Host "The environments the step was assigned to and the target roles match the target, target is associated with the process"
                        return $true
                    }
                }

                continue
            }

            $hasExcludedEnvironmentScoping = $false
            $allEnvironmentsExcluded = $false 
            if (Test-OctopusObjectHasProperty -objectToTest $action -propertyName "ExcludedEnvironments")
            {
                $hasExcludedEnvironmentScoping = $action.ExcludedEnvironments.Count -gt 0 
                if ($hasExcludedEnvironmentScoping -eq $true)
                {
                    $environmentsTargetCanStillDeployTo = @()
                    foreach ($environmentId in $target.EnvironmentIds)
                    {
                        if ($action.ExcludedEnvironments -notcontains $environmentId -and $projectEnvironmentList -contains $environmentId)
                        {
                            $environmentsTargetCanStillDeployTo += $environmentId
                        }
                    }

                    $allEnvironmentsExcluded = $environmentsTargetCanStillDeployTo.Count -eq 0
                }
            }

            if ($hasEnvironmentScoping -eq $false -and $hasExcludedEnvironmentScoping -eq $false)
            {
                Write-Host "Target role matches the step and no step scoping was configured, target is associated with process"
                return $true            
            }

            if ($hasExcludedEnvironmentScoping -eq $true -and $allEnvironmentsExcluded -eq $false)
            {
                Write-Host "The step role matches the target, and exclusion environments were found, but not all environments associated with the target were excluded.  The target is associated with the process."
                return $true
            }
        }
    }

    return $false
}

$octopusApiInformation = Invoke-OctopusApi -octopusUrl $octopusUrl -endPoint "api" -spaceId $null -apiKey $octopusApiKey
$splitVersion = $octopusApiInformation.Version -split "\."
$majorVersion = [int]$splitVersion[0]
$minorVersion = [int]$splitVersion[1]

$hasSpaces = $majorVersion -ge 2019
Write-Host "This version of Octopus has Spaces $hasSpaces"

$hasRunbooks = ($majorVersion -ge 2019 -and $minorVersion -ge 11) -or $majorVersion -ge 2020
Write-Host "This version of Octopus has runbooks $hasRunbooks"

$spaceId = $null
if ($hasSpaces -eq $true -and [string]::IsNullOrWhiteSpace($spaceName) -eq $false)
{
    $spaceList = Invoke-OctopusApi -octopusUrl $octopusUrl -endPoint "spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -spaceId $null -apiKey $octopusApiKey
    $space = $spaceList.Items | Where-Object {$_.Name.ToLower().Trim() -eq $spaceName.ToLower().Trim()}

    if ($null -eq $space)
    {
        Write-Error "Unable to find $spaceName on $octopusUrl"
        Exit 1
    }

    $spaceId = $space.Id

    Write-Host "The id for the space $spaceName is $spaceId"
}
else
{
    Write-Host "This instance has no spaces, the space id will be null"    
}

$targetList = Invoke-OctopusApi -octopusUrl $octopusUrl -endPoint "machines?partialName=$([uri]::EscapeDataString($targetName))&skip=0&take=100" -spaceId $spaceId -apiKey $octopusApiKey
$target = $targetList.Items | Where-Object {$_.Name.ToLower().Trim() -eq $targetName.ToLower().Trim()} 

if ($null -eq $target)
{
    Write-Error "Unable to find $targetName on $octopusUrl"
    Exit 1
}

Write-Host "The id for $targetName is $($target.Id)"

$environmentList = Invoke-OctopusApi -octopusUrl $octopusurl -endPoint "environments?skip=0&take=10000" -spaceId $spaceId -apiKey $octopusApiKey
$allEnvironmentIds = @($environmentList.Items |Select-Object -ExpandProperty Id)

$targetResults = @()

$projectList = Invoke-OctopusApi -octopusUrl $octopusUrl -endPoint "projects?skip=0&take=10000" -spaceId $spaceId -apiKey $octopusApiKey
foreach ($project in $projectList.Items)
{
    $projectEnvironmentList = Get-ProjectEnvironmentIds -project $project -spaceId $spaceId -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey 
    
    $targetHasMatchingEnvironment = $false
    foreach ($environmentId in $projectEnvironmentList)
    {
        if ($target.EnvironmentIds -contains $environmentId)    
        {
            $targetHasMatchingEnvironment = $true
            break
        }
    }

    Write-Host "The project $($project.Name) can deploy to the same environments as the target $targetName $targetHasMatchingEnvironment"
    if ($targetHasMatchingEnvironment -eq $false)
    {
        continue
    }
    
    $deploymentProcess = Invoke-OctopusApi -octopusUrl $octopusUrl -endPoint $project.Links.DeploymentProcess -apiKey $octopusApiKey -spaceId $spaceId

    $targetIsScopedToDeploymentProcess = Get-TargetIsScopedToProcess -process $deploymentProcess -target $target -projectEnvironmentList $projectEnvironmentList
    if ($targetIsScopedToDeploymentProcess -eq $true)
    {
        $targetResults += "$($Project.Name) - Deployment Process"
    }   
    
    if ($hasRunbooks)
    {
        $runbookList = Invoke-OctopusApi -octopusUrl $octopusUrl -endPoint "projects/$($project.Id)/runbooks?skip=0&take=10000" -spaceId $spaceId -apiKey $octopusApiKey
        foreach ($runbook in $runbookList.Items)
        {
            $runbookProcess = Invoke-OctopusApi -octopusUrl $octopusUrl -endPoint $runbook.Links.RunbookProcesses -spaceId $null -apiKey $octopusApiKey
            $environmentListToFilterOn = $allEnvironmentIds

            if (Test-OctopusObjectHasProperty -objectToTest $runbook -propertyName "EnvironmentScope")
            {
                if ($runbook.EnvironmentScope -eq "FromProjectLifecycles")
                {
                    $environmentListToFilterOn = $projectEnvironmentList
                }
                elseif ($runbook.EnvironmentScope -eq "Specified")
                {
                    $environmentListToFilterOn = $runbook.Environments
                }
            }           

            $runbookHasMatchingEnvironments = $false
            foreach ($environmentId in $environmentListToFilterOn)
            {
                if ($target.EnvironmentIds -contains $environmentId)    
                {
                    $runbookHasMatchingEnvironments = $true
                    break
                }
            }

            if ($runbookHasMatchingEnvironments -eq $false)
            {
                continue
            }
            
            $targetIsScopedToRunbookProcess = Get-TargetIsScopedToProcess -process $runbookProcess -target $target -projectEnvironmentList $environmentListToFilterOn
            if ($targetIsScopedToRunbookProcess -eq $true)
            {
                $targetResults += "$($Project.Name) - $($Runbook.Name) Runbook"
            }
        }
    }
}

if ($targetResults.Count -eq 0)
{
    Write-Host "The target $targetName is not associated with any projects or runbooks."
}
else
{
    Write-Host ""
    Write-Host ""
    Write-Host "The target $targetName is associated with the following projects and runbooks"    
    foreach ($result in $targetResults)
    {
        Write-Host "    $result"
    }
}
```
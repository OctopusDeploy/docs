<details data-group="project-deployment-targets-report">
<summary>PowerShell (REST API)</summary>

```powershell
$octopusUrl = "https://YOURURL"
$octopusApiKey = "YOUR API KEY"
$reportPath = "./Report.csv"
$spaceName = "Default" 
$projectName = "Hello World"
$releaseVersion = "3.0.6"

$cachedResults = @{}

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
        $octopusApiKey
    )

    if ($null -ne $spaceId) 
    {
        Write-OctopusVerbose "Pulling back all the $itemType in $spaceId"
    }
    else
    {
        Write-OctopusVerbose "Pulling back all the $itemType for the entire instance"
    }
    
    if ($endPoint -match "\?+")
    {
        $endpointWithParams = "$($endPoint)&skip=0&take=10000"
    }
    else
    {
        $endpointWithParams = "$($endPoint)?skip=0&take=10000"
    }

    $itemList = Invoke-OctopusApi -octopusUrl $octopusUrl -endPoint $endpointWithParams -spaceId $spaceId -apiKey $octopusApiKey -method "GET"
    
    if ($itemList -is [array])
    {
        Write-OctopusVerbose "Found $($itemList.Length) $itemType."

        return ,$itemList        
    }
    else
    {
        Write-OctopusVerbose "Found $($itemList.Items.Length) $itemType."

        return ,$itemList.Items
    }
}

function Get-OctopusItemByName
{
    param (
        $itemType,
        $itemName,
        $endPoint,
        $spaceId,
        $octopusUrl,
        $octopusApiKey
    )

    $itemList = Get-OctopusItemList -endpoint "$($endpoint)?partialName=$([uri]::EscapeDataString($itemName))" -itemType $itemType -spaceId $spaceId -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey

    $filteredItem = $itemList | Where-Object { $_.Name.ToLower().Trim() -eq $itemName.ToLower().Trim() }

    if ($null -eq $filteredItem)
    {
        Write-OctopusInformation "Unable to find the $itemType $itemName"
        exit 1
    }
    
    return $filteredItem
}

$space = Get-OctopusItemByName -itemType "Space" -endPoint "spaces" -itemName $spaceName -spaceId $null -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
$project = Get-OctopusItemByName -itemType "Project" -endPoint "projects" -itemName $projectName -spaceId $($space.Id) -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
$environmentList = Get-OctopusItemList -itemType "Environments" -endpoint "environments" -spaceId $($space.Id) -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
$deploymentTargetList = Get-OctopusItemList -itemType "DeploymentTargets" -endpoint "machines" -spaceId $($space.Id) -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
$releaseList = Get-OctopusItemList -itemType "Releases" -endpoint "projects/$($project.Id)/releases?searchByVersion=$($releaseVersion)" -spaceId $($space.Id) -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
$release = $releaseList | Where-Object { $_.Version -eq $releaseVersion }

if ($null -eq $release)
{
    Write-OctopusInformation "Unable to find the release $releaseVersion for $projectName"
    exit 1
}

$deployedToMachineList = @()
$deploymentList = Get-OctopusItemList -itemType "Deployments" -endpoint "releases/$($release.Id)/deployments" -spaceId $($space.Id) -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey

foreach ($deployment in $deploymentList)
{
    if ($deployment.FailureEncountered -eq $true)
    {
        Write-OctopusInformation "The deployment $($deployment.Name) encountered a failure, assuming it wasn't successfully deployed.  Moving onto next deployment."
        continue
    }

    $environment = $environmentList | Where-Object { $_.Id -eq $deployment.EnvironmentId }

    $deployedToMachine = @{
        DeploymentName = $deployment.Name
        Environment = $environment
        DeployedToMachines = @()
    }    
    
    foreach ($machineId in $deployment.DeployedToMachineIds)
    {
        $machine = $deploymentTargetList | Where-Object { $_.Id -eq $machineId }
        $deployedToMachine.DeployedToMachines += $machine
    }

    $deployedToMachineList += $deployedToMachine
}

if (Test-Path $reportPath)
{
    Remove-Item $reportPath
}

New-Item $reportPath -ItemType File

Add-Content -Path $reportPath -Value "Deployment Name,Environment Name,Machine Name,Machine Id"

Foreach ($deployedToMachine in $deployedToMachineList)
{
    foreach ($machine in $deployedToMachine.DeployedToMachines)
    {
        Add-Content -Path $reportPath -Value "$($deployedToMachine.DeploymentName),$($deployedToMachine.Environment.Name),$($machine.Name),$($machine.Id)"
    }
}
```

</details>

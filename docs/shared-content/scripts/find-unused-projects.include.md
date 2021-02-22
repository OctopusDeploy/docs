```powershell PowerShell (REST API)
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

$octopusUrl = "https://local.octopusdemos.app" ## Octopus URL to look at
$octopusApiKey = "YOUR API KEY" ## API key of user who has permissions to view all spaces, cancel tasks, and resubmit runbooks runs and deployments
$disableOldProjects = $false ## Tells the script to disable the projects that are older than the days since last release
$daysSinceLastRelease = 90 ## The number of days since the last release to be considered unused.  Any project without a release created in [90] days is considered inactive.

$cachedResults = @{}

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
            Write-Verbose $body

            Write-Host "Invoking $method $url"
            return Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -Body $body -ContentType 'application/json; charset=utf-8' 
        }

        if (($null -eq $ignoreCache -or $ignoreCache -eq $false) -and $method.ToUpper().Trim() -eq "GET")
        {
            Write-Verbose "Checking to see if $url is already in the cache"
            if ($cachedResults.ContainsKey($url) -eq $true)
            {
                Write-Verbose "$url is already in the cache, returning the result"
                return $cachedResults[$url]
            }
        }
        else
        {
            Write-Verbose "Ignoring cache."    
        }

        Write-Verbose "No data to post or put, calling bog standard invoke-restmethod for $url"
        $result = Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -ContentType 'application/json; charset=utf-8'

        if ($cachedResults.ContainsKey($url) -eq $true)
        {
            $cachedResults.Remove($url)
        }
        Write-Verbose "Adding $url to the cache"
        $cachedResults.add($url, $result)

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
                Write-Verbose -Message "Error calling $url $($_.Exception.Message) StatusCode: $($_.Exception.Response.StatusCode )"
            }            
        }
        else
        {
            Write-Verbose $_.Exception
        }
    }

    Throw $_.Exception
}

$spaceList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "spaces?skip=0&take=1000" -spaceId $null -method "GET"

$currentUtcTime = $(Get-Date).ToUniversalTime()

$oldProjectList = @()
foreach ($space in $spaceList.Items)
{    
    $projectList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "projects?skip=0&take=10000" -spaceId $space.Id -method "GET"    

    foreach ($project in $projectList.Items)
    {
        if ($project.IsDisabled -eq $true)
        {
            Write-Verbose "Project $($project.Name) is already disabled."
            continue
        }

        $releaseList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "projects/$($project.Id)/releases" -spaceId $space.Id -method "GET"

        if ($releaseList.Items.Count -le 0)
        {
            Write-Verbose "No releases found for $($project.Name)."
            continue
        }

        $assembledDate = [datetime]::Parse($releaseList.Items[0].Assembled)
        $assembledDate = $assembledDate.ToUniversalTime()

        $dateDiff = $currentUtcTime - $assembledDate

        if ($dateDiff.TotalDays -gt $daysSinceLastRelease)
        {
            $oldProjectList += "$($project.Name) - $($space.Name) last release was $($dateDiff.TotalDays) days ago."

            if ($disableOldProjects -eq $true)
            {
                $project.IsDisabled = $true
                $updatedProject = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "projects/$($project.Id)" -spaceId $space.Id -method "PUT" -Item $project
                Write-Host "Set the project $($updatedProject.Name) to disabled."
            }
        }        
    }
}

Write-Host "The following projects were found to have no releases created in at least $daysSinceLastRelease days."
foreach ($project in $oldProjectList)
{
    Write-Host "    $project"
}
```
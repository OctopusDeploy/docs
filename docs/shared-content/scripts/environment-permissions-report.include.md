```PowerShell PowerShell (REST API)
$octopusUrl = "https://YOURURL"
$octopusApiKey = "YOUR API KEY"
$reportPath = "./Report.csv"
$spaceFilter = "Permissions" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly 
$environmentFilter = "Production" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly
$permissionToCheck = "DeploymentCreate"

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

        return $itemList        
    }
    else
    {
        Write-OctopusVerbose "Found $($itemList.Items.Length) $itemType."

        return $itemList.Items
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
        Write-OctopusVerbose "$propertyName property found."
        return $true
    }
    else
    {
        Write-OctopusVerbose "$propertyName property missing."
        return $false
    }    
}

function Get-UserPermission 
{
    param (
        $space,
        $project,
        $userRole,
        $projectPermissionList,
        $permissionToCheck,
        $environmentList,
        $tenantList,
        $user,
        $scopedRole,
        $includeScope,
        $projectEnvironmentList
    )

    if ($userRole.GrantedSpacePermissions -notcontains $permissionToCheck)
    {
        return $projectPermissionList
    }

    $newPermission = @{
        DisplayName = $user.DisplayName
        UserId = $user.Id
        Environments = @()
        Tenants = @()
        IncludeScope = $includeScope
    }

    if ($includeScope -eq $true)
    {
        foreach ($environmentId in $scopedRole.EnvironmentIds)
        {
            if ($projectEnvironmentList -notcontains $environmentId)
            {
                Write-OctopusVerbose "The role is scoped to environment $environmentId, but the environment is not asigned to $($project.Name), excluding from this project's report"
                continue
            }

            $environment = $environmentList | Where-Object { $_.Id -eq $environmentId }
            $newPermission.Environments += @{
                Id = $environment.Id
                Name = $environment.Name
            }
        }
    
        foreach ($tenantId in $scopedRole.tenantIds)
        {            
            $tenant = $tenantList | Where-Object { $_.Id -eq $tenantId }

            if ((Test-OctopusObjectHasProperty -objectToTest $tenant.ProjectEnvironments -propertyName $project.Id) -eq $false)
            {
                Write-OctopusVerbose "The role is scoped to tenant $($tenant.Name), but the tenant is not assigned to $($project.Name), excluding the tenant from this project's report."
                continue
            }

            $newPermission.Tenants += @{
                Id = $tenant.Id
                Name = $tenant.Name
            }
        }
    }

    $existingPermission = $projectPermissionList | Where-Object { $_.UserId -eq $newPermission.UserId }

    if ($null -eq $existingPermission)
    {
        Write-OctopusVerbose "$($user.DisplayName) is not assigned to this project adding this permission"

        $projectPermissionList += $newPermission

        return @($projectPermissionList)
    }

    if ($existingPermission.Environments.Length -eq 0 -and $existingPermission.Tenants.Length -eq 0)
    {
        Write-OctopusVerbose "$($user.DisplayName) has no scoping for environments or tenants for this project, they have the highest level, no need to improve it."

        return @($projectPermissionList)
    }

    if ($existingPermission.Environments.Length -gt 0 -and $newPermission.Environments.Length -eq 0)
    {
        Write-OctopusVerbose "$($user.DisplayName) has scoping to environments, but the new permission doesn't have any environment scoping, removing the scoping"
        $existingPermission.Environments = @()
    }
    elseif ($existingPermission.Environments.Length -gt 0 -and $newPermission.Environments.Length -gt 0)
    {
        foreach ($item in $newPermission.Environments)
        {
            $existingItem = $existingPermission.Environments | Where-Object { $_.Id -eq $item.Id }

            if ($null -eq $existingItem)
            {
                Write-OctopusVerbose "$($user.DisplayName) is not yet scoped to the environment $($item.Name), adding it."
                $existingPermission.Environments += $item
            }
        }
    }

    if ($existingPermission.Tenants.Length -gt 0 -and $newPermission.Tenants.Length -eq 0)
    {
        Write-OctopusVerbose "$($user.DisplayName) has scoping to tenants, but the new permission doesn't have any tenant scoping, removing the scoping"
        $existingPermission.Tenants = @()
    }
    elseif ($existingPermission.Tenants.Length -gt 0 -and $newPermission.Tenants.Length -gt 0)
    {
        foreach ($item in $newPermission.Tenants)
        {
            $existingItem = $existingPermission.Tenants | Where-Object { $_.Id -eq $item.Id }

            if ($null -eq $existingItem)
            {
                Write-OctopusVerbose "$($user.DisplayName) is not yet scoped to the tenant $($item.Name), adding it."
                $existingPermission.Tenants += $item
            }
        }
    }

    return @($projectPermissionList)
}

function Write-PermissionList
{
    param (
        $permissionName,
        $permissionList,
        $permission, 
        $reportPath
    )      

    foreach ($permissionScope in $permissionList)
    {
        $permissionForCSV = @{
            Space = $permission.SpaceName
            Project = $permission.Name
            PermissionName = $permissionName
            User = $permissionScope.DisplayName
            EnvironmentScope = ""
            TenantScope = ""
        } 

        if ($permissionScope.IncludeScope -eq $false)
        {
            $permissionForCSV.EnvironmentScope = "N/A"
            $permissionForCSV.TenantScope = "N/A"            
        }      
        else
        {
            if ($permissionScope.Environments.Length -eq 0)
            {
                $permissionForCSV.EnvironmentScope = "All"
            }
            else
            {
                $permissionForCSV.EnvironmentScope = $($permissionScope.Environments.Name) -join ";"
            }        

            if ($permissionScope.TenantScope.Length -eq 0)
            {
                $permissionForCSV.TenantScope = "All"
            }
            else
            {
                $permissionForCSV.TenantScope = $($permissionScope.Tenants.Name) -join ";"
            }
        }       

        $permissionAsString = """$($permissionForCSV.Space)"",""$($permissionForCSV.Project)"",""$($permissionForCSV.PermissionName)"",""$($permissionForCSV.User)"",""$($permissionForCSV.EnvironmentScope)"",""$($permissionForCSV.TenantScope)"""
        Add-Content -Path $reportPath -Value $permissionAsString
    }    
}

function Get-EnvironmentsScopedToProject
{
    param (
        $project,
        $octopusApiKey,
        $octopusUrl,
        $spaceId
    )

    $scopedEnvironmentList = @()

    $projectChannels = Get-OctopusItemList -itemType "Channels" -endpoint "projects/$($project.Id)/channels" -spaceId $spaceId -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey

    foreach ($channel in $projectChannels)
    {
        $lifecycleId = $channel.LifecycleId
        if ($null -eq $lifecycleId)
        {
            $lifecycleId = $project.LifecycleId
        }

        $lifecyclePreview = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "lifecycles/$($project.LifeCycleId)/preview" -spaceId $spaceId -method "GET"

        foreach ($phase in $lifecyclePreview.Phases)
        {
            foreach ($environmentId in $phase.AutomaticDeploymentTargets)
            {
                if ($scopedEnvironmentList -notcontains $environmentId)
                {
                    Write-OctopusVerbose "Adding $environmentId to $($project.Name) enviornment list"
                    $scopedEnvironmentList += $environmentId
                }
            }

            foreach ($environmentId in $phase.OptionalDeploymentTargets)
            {
                if ($scopedEnvironmentList -notcontains $environmentId)
                {
                    Write-OctopusVerbose "Adding $environmentId to $($project.Name) enviornment list"
                    $scopedEnvironmentList += $environmentId
                }
            }
        }
    }

    return $scopedEnvironmentList
}

function New-OctopusFilteredList
{
    param(
        $itemList,
        $itemType,
        $filters
    )

    $filteredList = @()  
    
    Write-OctopusSuccess "Creating filter list for $itemType with a filter of $filters"

    if ([string]::IsNullOrWhiteSpace($filters) -eq $false -and $null -ne $itemList)
    {
        $splitFilters = $filters -split ","

        foreach($item in $itemList)
        {
            foreach ($filter in $splitFilters)
            {
                Write-OctopusVerbose "Checking to see if $filter matches $($item.Name)"
                if ([string]::IsNullOrWhiteSpace($filter))
                {
                    continue
                }
                if (($filter).ToLower() -eq "all")
                {
                    Write-OctopusVerbose "The filter is 'all' -> adding $($item.Name) to $itemType filtered list"
                    $filteredList += $item
                }
                elseif ((Test-OctopusObjectHasProperty -propertyName "Name" -objectToTest $item) -and $item.Name -like $filter)
                {
                    Write-OctopusVerbose "The filter $filter matches $($item.Name), adding $($item.Name) to $itemType filtered list"
                    $filteredList += $item
                }
                elseif ((Test-OctopusObjectHasProperty -propertyName "DisplayName" -objectToTest $item) -and $item.DisplayName -like $filter)
                {
                    Write-OctopusVerbose "The filter $filter matches $($item.DisplayName), adding $($item.DisplayName) to $itemType filtered list"
                    $filteredList += $item
                }
                else
                {
                    Write-OctopusVerbose "The item $($item.Name) does not match filter $filter"
                }
            }
        }
    }
    else
    {
        Write-OctopusWarning "The filter for $itemType was not set."
    }

    return $filteredList
}

$spaceList = Get-OctopusItemList -itemType "Spaces" -endpoint "spaces" -spaceId $null -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
$spaceList = New-OctopusFilteredList -itemType "Spaces" -itemList $spaceList -filters $spaceFilter

$userRolesList = Get-OctopusItemList -itemType "User Roles" -endpoint "userroles" -spaceId $null -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
$userList = Get-OctopusItemList -itemType "Users" -endpoint "users" -spaceId $null -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey

$permissionsReport = @()
foreach ($space in $spaceList)
{    
    $projectList = Get-OctopusItemList -itemType "Projects" -endpoint "projects" -spaceId $space.Id -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
    
    $environmentList = Get-OctopusItemList -itemType "Environments" -endpoint "environments" -spaceId $space.Id -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
    $environmentList = New-OctopusFilteredList -itemType "Environments" -itemList $environmentList -filters $environmentFilter

    $tenantList = Get-OctopusItemList -itemType "Tenants" -endpoint "tenants" -spaceId $space.Id -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
    
    foreach ($project in $projectList)
    {
        $projectPermission = @{
            Name = $project.Name
            SpaceName = $space.Name
            Permissions = @()
        }

        $projectEnvironmentList = @(Get-EnvironmentsScopedToProject -octopusApiKey $octopusApiKey -octopusUrl $octopusUrl -spaceId $space.Id -project $project)

        foreach ($user in $userList)
        {
            $userTeamList = Get-OctopusItemList -itemType "User $($user.DisplayName) Teams" -endpoint "users/$($user.Id)/teams?spaces=$($space.Id)&includeSystem=True" -spaceId $null -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey

            foreach ($userTeam in $userTeamList)
            {
                $scopedRolesList = Get-OctopusItemList -itemType "Team $($userTeam.Name) Scoped Roles" -endpoint "teams/$($userTeam.Id)/scopeduserroles" -spaceId $null -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey

                foreach ($scopedRole in $scopedRolesList)
                {
                    if ($scopedRole.SpaceId -ne $space.Id)
                    {
                        Write-OctopusVerbose "The scoped role is not for the current space, moving on to next role."
                        continue
                    }

                    if ($scopedRole.ProjectIds.Length -gt 0 -and $scopedRole.ProjectIds -notcontains $project.Id -and $scopedRole.ProjectGroupIds.Length -eq 0)
                    {
                        Write-OctopusVerbose "The scoped role is associated with projects, but not $($project.Name), moving on to next role."
                        continue
                    }

                    if ($scopedRole.ProjectGroupIds.Length -gt 0 -and $scopedRole.ProjectGroupIds -notcontains $project.ProjectGroupId -and $scopedRole.ProjectIds.Length -eq 0)
                    {
                        Write-OctopusVerbose "The scoped role is associated with projects groups, but not the one for $($project.Name), moving on to next role."
                        continue
                    }

                    $userRole = $userRolesList | Where-Object {$_.Id -eq $scopedRole.UserRoleId}

                    $projectPermission.Permissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.Permissions -permissionToCheck $permissionToCheck -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                }
            }
        }

        $permissionsReport += $projectPermission
    }
}

if (Test-Path $reportPath)
{
    Remove-Item $reportPath
}

New-Item $reportPath -ItemType File

Add-Content -Path $reportPath -Value "Space Name,Project Name,Permission Name,Display Name,Environment Scoping,Tenant Scoping"

foreach ($permission in $permissionsReport)
{
    Write-PermissionList -permissionName $permissionToCheck -permissionList $permission.Permissions -permission $permission -reportPath $reportPath    
}
```
```powershell Powershell (Octopus.Client)
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'

$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$reportPath = "./Report.csv"
$spaceFilter = "Permissions" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly 
$environmentFilter = "Production" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly
$permissionToCheck = "DeploymentCreate"


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


function Test-OctopusObjectHasProperty
{
    param(
        $objectToTest,
        $propertyName
    )

    $hasProperty = Get-Member -InputObject $objectToTest -Name $propertyName -MemberType Properties

    if ($hasProperty)
    {
        Write-OctopusVerbose "$propertyName property found."
        return $true
    }
    else
    {
        Write-OctopusVerbose "$propertyName property missing."
        return $false
    }    
}

function Get-UserPermission 
{
    param (
        $space,
        $project,
        $userRole,
        $projectPermissionList,
        $permissionToCheck,
        $environmentList,
        $tenantList,
        $user,
        $scopedRole,
        $includeScope,
        $projectEnvironmentList
    )

    if ($userRole.GrantedSpacePermissions -notcontains $permissionToCheck)
    {
        return $projectPermissionList
    }

    $newPermission = @{
        DisplayName = $user.DisplayName
        UserId = $user.Id
        Environments = @()
        Tenants = @()
        IncludeScope = $includeScope
    }

    if ($includeScope -eq $true)
    {
        foreach ($environmentId in $scopedRole.EnvironmentIds)
        {
            if ($projectEnvironmentList -notcontains $environmentId)
            {
                Write-OctopusVerbose "The role is scoped to environment $environmentId, but the environment is not asigned to $($project.Name), excluding from this project's report"
                continue
            }

            $environment = $environmentList | Where-Object { $_.Id -eq $environmentId }
            $newPermission.Environments += @{
                Id = $environment.Id
                Name = $environment.Name
            }
        }
    
        foreach ($tenantId in $scopedRole.tenantIds)
        {            
            $tenant = $tenantList | Where-Object { $_.Id -eq $tenantId }

            if ((Test-OctopusObjectHasProperty -objectToTest $tenant.ProjectEnvironments -propertyName $project.Id) -eq $false)
            {
                Write-OctopusVerbose "The role is scoped to tenant $($tenant.Name), but the tenant is not assigned to $($project.Name), excluding the tenant from this project's report."
                continue
            }

            $newPermission.Tenants += @{
                Id = $tenant.Id
                Name = $tenant.Name
            }
        }
    }

    $existingPermission = $projectPermissionList | Where-Object { $_.UserId -eq $newPermission.UserId }

    if ($null -eq $existingPermission)
    {
        Write-OctopusVerbose "$($user.DisplayName) is not assigned to this project adding this permission"

        $projectPermissionList += $newPermission

        return @($projectPermissionList)
    }

    if ($existingPermission.Environments.Length -eq 0 -and $existingPermission.Tenants.Length -eq 0)
    {
        Write-OctopusVerbose "$($user.DisplayName) has no scoping for environments or tenants for this project, they have the highest level, no need to improve it."

        return @($projectPermissionList)
    }

    if ($existingPermission.Environments.Length -gt 0 -and $newPermission.Environments.Length -eq 0)
    {
        Write-OctopusVerbose "$($user.DisplayName) has scoping to environments, but the new permission doesn't have any environment scoping, removing the scoping"
        $existingPermission.Environments = @()
    }
    elseif ($existingPermission.Environments.Length -gt 0 -and $newPermission.Environments.Length -gt 0)
    {
        foreach ($item in $newPermission.Environments)
        {
            $existingItem = $existingPermission.Environments | Where-Object { $_.Id -eq $item.Id }

            if ($null -eq $existingItem)
            {
                Write-OctopusVerbose "$($user.DisplayName) is not yet scoped to the environment $($item.Name), adding it."
                $existingPermission.Environments += $item
            }
        }
    }

    if ($existingPermission.Tenants.Length -gt 0 -and $newPermission.Tenants.Length -eq 0)
    {
        Write-OctopusVerbose "$($user.DisplayName) has scoping to tenants, but the new permission doesn't have any tenant scoping, removing the scoping"
        $existingPermission.Tenants = @()
    }
    elseif ($existingPermission.Tenants.Length -gt 0 -and $newPermission.Tenants.Length -gt 0)
    {
        foreach ($item in $newPermission.Tenants)
        {
            $existingItem = $existingPermission.Tenants | Where-Object { $_.Id -eq $item.Id }

            if ($null -eq $existingItem)
            {
                Write-OctopusVerbose "$($user.DisplayName) is not yet scoped to the tenant $($item.Name), adding it."
                $existingPermission.Tenants += $item
            }
        }
    }

    return @($projectPermissionList)
}

function Write-PermissionList
{
    param (
        $permissionName,
        $permissionList,
        $permission, 
        $reportPath
    )      

    foreach ($permissionScope in $permissionList)
    {
        $permissionForCSV = @{
            Space = $permission.SpaceName
            Project = $permission.Name
            PermissionName = $permissionName
            User = $permissionScope.DisplayName
            EnvironmentScope = ""
            TenantScope = ""
        } 

        if ($permissionScope.IncludeScope -eq $false)
        {
            $permissionForCSV.EnvironmentScope = "N/A"
            $permissionForCSV.TenantScope = "N/A"            
        }      
        else
        {
            if ($permissionScope.Environments.Length -eq 0)
            {
                $permissionForCSV.EnvironmentScope = "All"
            }
            else
            {
                $permissionForCSV.EnvironmentScope = $($permissionScope.Environments.Name) -join ";"
            }        

            if ($permissionScope.TenantScope.Length -eq 0)
            {
                $permissionForCSV.TenantScope = "All"
            }
            else
            {
                $permissionForCSV.TenantScope = $($permissionScope.Tenants.Name) -join ";"
            }
        }       

        $permissionAsString = """$($permissionForCSV.Space)"",""$($permissionForCSV.Project)"",""$($permissionForCSV.PermissionName)"",""$($permissionForCSV.User)"",""$($permissionForCSV.EnvironmentScope)"",""$($permissionForCSV.TenantScope)"""
        Add-Content -Path $reportPath -Value $permissionAsString
    }    
}

function Get-EnvironmentsScopedToProject
{
    param (
        $project,
        $octopusApiKey,
        $octopusUrl,
        $spaceId
    )

    $scopedEnvironmentList = @()

    $projectChannels = $repositoryForSpace.Projects.GetAllChannels($project)

    foreach ($channel in $projectChannels)
    {
        $lifecycleId = $channel.LifecycleId
        if ($null -eq $lifecycleId)
        {
            $lifecycleId = $project.LifecycleId
        }

        $lifecyclePreview = $repositoryForSpace.Lifecycles.Get($lifeCycleId)
        
        if (($null -eq $lifecyclePreview.Phases) -or ($lifecyclePreview.Phases.Count -eq 0))
        {
            # Lifecycle has no defined phases and uses environments, manually create the phases
            foreach ($environment in $repositoryForSpace.Environments.GetAll())
            {
                $phase = New-Object Octopus.Client.Model.PhaseResource
                $phase.Name = $environment.Name
                $phase.OptionalDeploymentTargets.Add($environment.Id)
                $lifecyclePreview.Phases.Add($phase)
            }
        }

        foreach ($phase in $lifecyclePreview.Phases)
        {
            foreach ($environmentId in $phase.AutomaticDeploymentTargets)
            {
                if ($scopedEnvironmentList -notcontains $environmentId)
                {
                    Write-OctopusVerbose "Adding $environmentId to $($project.Name) enviornment list"
                    $scopedEnvironmentList += $environmentId
                }
            }

            foreach ($environmentId in $phase.OptionalDeploymentTargets)
            {
                if ($scopedEnvironmentList -notcontains $environmentId)
                {
                    Write-OctopusVerbose "Adding $environmentId to $($project.Name) enviornment list"
                    $scopedEnvironmentList += $environmentId
                }
            }
        }
    }

    return $scopedEnvironmentList
}

function New-OctopusFilteredList
{
    param(
        $itemList,
        $itemType,
        $filters
    )

    $filteredList = @()  
    
    Write-OctopusSuccess "Creating filter list for $itemType with a filter of $filters"
    
    if ([string]::IsNullOrWhiteSpace($filters) -eq $false -and $null -ne $itemList)
    {
        $splitFilters = $filters -split ","

        foreach($item in $itemList)
        {
            foreach ($filter in $splitFilters)
            {
                Write-OctopusVerbose "Checking to see if $filter matches $($item.Name)"
                if ([string]::IsNullOrWhiteSpace($filter))
                {
                    continue
                }
                if (($filter).ToLower() -eq "all")
                {
                    Write-OctopusVerbose "The filter is 'all' -> adding $($item.Name) to $itemType filtered list"
                    $filteredList += $item
                }
                elseif ((Test-OctopusObjectHasProperty -propertyName "Name" -objectToTest $item) -and $item.Name -like $filter)
                {
                    Write-OctopusVerbose "The filter $filter matches $($item.Name), adding $($item.Name) to $itemType filtered list"
                    $filteredList += $item
                }
                elseif ((Test-OctopusObjectHasProperty -propertyName "DisplayName" -objectToTest $item) -and $item.DisplayName -like $filter)
                {
                    Write-OctopusVerbose "The filter $filter matches $($item.DisplayName), adding $($item.DisplayName) to $itemType filtered list"
                    $filteredList += $item
                }
                else
                {
                    Write-OctopusVerbose "The item $($item.Name) does not match filter $filter"
                }
            }
        }
    }
    else
    {
        Write-OctopusWarning "The filter for $itemType was not set."
    }
    
    return $filteredList


}

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

$spaceList = $repository.Spaces.GetAll()
$spaceList = New-OctopusFilteredList -itemType "Spaces" -itemList $spaceList -filters $spaceFilter

$userRolesList = $repository.UserRoles.GetAll()
$userList = $repository.Users.GetAll()

$permissionsReport = @()
foreach ($spaceName in $spaceList)
{    
    $space = $repository.Spaces.FindByName($spaceName.Name)
    $repositoryForSpace = $client.ForSpace($space)
   
    $projectList = $repositoryForSpace.Projects.GetAll()
    
    $environmentList = $repositoryForSpace.Environments.GetAll()
    $environmentList = New-OctopusFilteredList -itemType "Environments" -itemList $environmentList -filters $environmentFilter

    $tenantList = $repositoryForSpace.Tenants.GetAll()
    
    foreach ($project in $projectList)
    {
        $projectPermission = @{
            Name = $project.Name
            SpaceName = $space.Name
            Permissions = @()
        }

        $projectEnvironmentList = @(Get-EnvironmentsScopedToProject -octopusApiKey $octopusApiKey -octopusUrl $octopusUrl -spaceId $space.Id -project $project)

        foreach ($user in $userList)
        {            
            $allTeamList = $repository.UserTeams.Get($user)
            $userTeamList = @()

            foreach ($teamItem in $allTeamList)
            {
                $team = $repository.Teams.Get($teamItem.Id)
                if (([string]::IsNullOrWhiteSpace($team.SpaceId)) -or ($team.SpaceId -eq $space.Id))
                {
                    $userTeamList += $teamItem
                }
            }
            
            foreach ($userTeam in $userTeamList)
            {
                $team = $repository.Teams.Get($userTeam.Id)

                $scopedRolesList = $repository.Teams.GetScopedUserRoles($team)

                foreach ($scopedRole in $scopedRolesList)
                {
                    if ($scopedRole.SpaceId -ne $space.Id)
                    {
                        Write-OctopusVerbose "The scoped role is not for the current space, moving on to next role."
                        continue
                    }

                    if ($scopedRole.ProjectIds.Count -gt 0 -and $scopedRole.ProjectIds -notcontains $project.Id -and $scopedRole.ProjectGroupIds.Count -eq 0)
                    {
                        Write-OctopusVerbose "The scoped role is associated with projects, but not $($project.Name), moving on to next role."
                        continue
                    }

                    if ($scopedRole.ProjectGroupIds.Count -gt 0 -and $scopedRole.ProjectGroupIds -notcontains $project.ProjectGroupId -and $scopedRole.ProjectIds.Count -eq 0)
                    {
                        Write-OctopusVerbose "The scoped role is associated with projects groups, but not the one for $($project.Name), moving on to next role."
                        continue
                    }

                    $userRole = $userRolesList | Where-Object {$_.Id -eq $scopedRole.UserRoleId}

                    $projectPermission.Permissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.Permissions -permissionToCheck $permissionToCheck -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                }
            }
        }

        $permissionsReport += $projectPermission
    }
}

if (Test-Path $reportPath)
{
    Remove-Item $reportPath
}

New-Item $reportPath -ItemType File

Add-Content -Path $reportPath -Value "Space Name,Project Name,Permission Name,Display Name,Environment Scoping,Tenant Scoping"

foreach ($permission in $permissionsReport)
{
    Write-PermissionList -permissionName $permissionToCheck -permissionList $permission.Permissions -permission $permission -reportPath $reportPath    
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using System.Linq;
using System.Text.RegularExpressions;

class ProjectPermission
{
    private System.Collections.Generic.List<Permission> _permissions = new System.Collections.Generic.List<Permission>();
    
    public string Name
    {
        get;
        set;
    }

    public string SpaceName
    {
        get;
        set;
    }

    public System.Collections.Generic.List<Permission> Permissions
    {
        get
        {
            return _permissions;
        }
        set
        {
            _permissions = value;
        }
    }
}

class Permission
{
    private System.Collections.Generic.List<EnvironmentResource> _environments = new System.Collections.Generic.List<EnvironmentResource>();
    private System.Collections.Generic.List<TenantResource> _tenants = new System.Collections.Generic.List<TenantResource>();
    public string DisplayName
    {
        get;
        set;
    }

    public string UserId
    {
        get;
        set;
    }

    public System.Collections.Generic.List<EnvironmentResource> Environments
    {
        get
        {
            return _environments;
        }
        set
        {
            _environments = value;
        }
    }

    public System.Collections.Generic.List<TenantResource> Tenants
    {
        get
        {
            return _tenants;
        }
        set
        {
            _tenants = value;
        }
    }

    public bool IncludScope
    {
        get;
        set;
    }
}

static System.Collections.Generic.List<SpaceResource> FilterSpaceList(System.Collections.Generic.List<SpaceResource> Spaces, string Filter)
{
    var filters = Filter.Split(",", StringSplitOptions.RemoveEmptyEntries);
    System.Collections.Generic.List<SpaceResource> filteredList = new System.Collections.Generic.List<SpaceResource>();

    foreach (var spaceResource in Spaces)
    {
        // Loop through filters
        foreach (string filter in filters)
        {
            if (filter.ToLower() == "all")
            {
                // Add to list
                Console.WriteLine(string.Format("The filter is 'all' -> adding {0} to filtered list", spaceResource.Name));
                filteredList.Add(spaceResource);
                
            }
            else if (Regex.IsMatch(spaceResource.Name, filter))
            {
                Console.WriteLine(string.Format("The filter {0} matches {1}, adding {1} to filtered list", filter, spaceResource.Name));
                filteredList.Add(spaceResource);
            }
            else
            {
                Console.WriteLine(string.Format("Space {0} does not match filter {1}", spaceResource.Name, filter));
            }
        }
    }

    return filteredList;
}

static System.Collections.Generic.List<EnvironmentResource> FilterEnvironmentList(System.Collections.Generic.List<EnvironmentResource> Environments, string Filter)
{
    var filters = Filter.Split(",", StringSplitOptions.RemoveEmptyEntries);
    System.Collections.Generic.List<EnvironmentResource> filteredList = new System.Collections.Generic.List<EnvironmentResource>();

    foreach (var environmentResource in Environments)
    {
        // Loop through filters
        foreach (string filter in filters)
        {
            if (filter.ToLower() == "all")
            {
                // Add to list
                Console.WriteLine(string.Format("The filter is 'all' -> adding {0} to filtered list", environmentResource.Name));
                filteredList.Add(environmentResource);

            }
            else if (Regex.IsMatch(environmentResource.Name, filter))
            {
                Console.WriteLine(string.Format("The filter {0} matches {1}, adding {1} to filtered list", filter, environmentResource.Name));
                filteredList.Add(environmentResource);
            }
            else
            {
                Console.WriteLine(string.Format("Space {0} does not match filter {1}", environmentResource.Name, filter));
            }
        }
    }

    return filteredList;
}

static System.Collections.Generic.List<string> GetEnvironmentsScopedToProject (ProjectResource Project, SpaceResource Space, IOctopusSpaceRepository RepositoryForSpace)
{
    System.Collections.Generic.List<string> scopedEnvironments = new System.Collections.Generic.List<string>();

    var projectChannels = RepositoryForSpace.Projects.GetAllChannels(Project);

    foreach (var channel in projectChannels)
    {
        string lifeCycleId = string.Empty;

        if (string.IsNullOrEmpty(channel.LifecycleId))
        {
            lifeCycleId = Project.LifecycleId;
        }

        var lifecyclePreview = RepositoryForSpace.Lifecycles.Get(lifeCycleId);

        if ((lifecyclePreview.Phases == null) || (lifecyclePreview.Phases.Count == 0))
        {
            foreach (var environment in RepositoryForSpace.Environments.GetAll())
            {
                PhaseResource phase = new PhaseResource();
                phase.Name = environment.Name;
                phase.OptionalDeploymentTargets.Add(environment.Id);
                lifecyclePreview.Phases.Add(phase);
            }
        }

        foreach (var phase in lifecyclePreview.Phases)
        {
            foreach (var environmentId in phase.AutomaticDeploymentTargets)
            {
                if (!scopedEnvironments.Contains(environmentId))
                {
                    Console.WriteLine(string.Format("Adding {0} to {1} environment list", environmentId, Project.Name));
                    scopedEnvironments.Add(environmentId);
                }
            }

            foreach (var environmentId in phase.OptionalDeploymentTargets)
            {
                if (!scopedEnvironments.Contains(environmentId))
                {
                    Console.WriteLine(string.Format("Adding {0} to {1} environemnt list", environmentId, Project.Name));
                    scopedEnvironments.Add(environmentId);
                }
            }
        }
    }

    return scopedEnvironments;
}

static System.Collections.Generic.List<Permission> GetUserPermission (SpaceResource Space, ProjectResource Project, UserRoleResource UserRole, System.Collections.Generic.List<Permission> ProjectPermissionList, string PermissionToCheck, System.Collections.Generic.List<EnvironmentResource> EnvironmentList, System.Collections.Generic.List<TenantResource> TenantList, UserResource User, ScopedUserRoleResource ScopedRole, bool IncludeScope, System.Collections.Generic.List<string> ProjectEnvironmentList)
{
    Octopus.Client.Model.Permission octopusPermission = (Octopus.Client.Model.Permission)Enum.Parse(typeof(Octopus.Client.Model.Permission), PermissionToCheck);

    if (!UserRole.GrantedSpacePermissions.Contains(octopusPermission))
    {
        return ProjectPermissionList;
    }

    var newPermission = new Permission();
    newPermission.DisplayName = User.DisplayName;
    newPermission.UserId = User.Id;
    newPermission.IncludScope = IncludeScope;
    
    if (IncludeScope)
    {
        foreach (var environmentId in ScopedRole.EnvironmentIds)
        {
            if(!ProjectEnvironmentList.Contains(environmentId))
            {
                Console.WriteLine(string.Format("The role is scoped to environment {0}, but the environment is not assigned to project {1}, excluding from this project report", environmentId, Project.Name));
                continue;
            }

            var environment = EnvironmentList.FirstOrDefault(e => e.Id == environmentId);
            if (environment != null)
            {
                newPermission.Environments.Add(environment);
            }
        }

        foreach (var tenantId in ScopedRole.TenantIds)
        {
            var tenant = TenantList.FirstOrDefault(t => t.Id == tenantId);

            if (tenant != null)
            {
                if (!tenant.ProjectEnvironments.ContainsKey(Project.Id))
                {
                    Console.WriteLine(string.Format("The role is scoped to tenant {0}, but the tenant is not assigned to {1}, excluding the tenant from this report", tenant.Name, Project.Name));
                    continue;
                }

                newPermission.Tenants.Add(tenant);
            }
        }
    }

    var existingPermission = ProjectPermissionList.FirstOrDefault(p => p.UserId == newPermission.UserId);

    if (existingPermission == null)
    {
        Console.WriteLine(string.Format("{0} is not assigned to this project adding this permission", User.DisplayName));
        ProjectPermissionList.Add(newPermission);

        return ProjectPermissionList;
    }

    if (existingPermission.Environments.Count == 0 && existingPermission.Tenants.Count == 0)
    {
        Console.WriteLine(string.Format("{0} has not scoping for environments or tenants for this project, they have the highest permission, no need to improve it", User.DisplayName));
        return ProjectPermissionList;
    }
    
    if (existingPermission.Environments.Count > 0 && newPermission.Environments.Count == 0)
    {
        Console.WriteLine(string.Format("{0} has scoping to environments, but the new permission doesn't have any environment scoping, removing the scoping", User.DisplayName));
        existingPermission.Environments = new System.Collections.Generic.List<EnvironmentResource>();
    }
    else if (existingPermission.Environments.Count > 0 && newPermission.Environments.Count > 0)
    {
        foreach (var item in newPermission.Environments)
        {
            var existingItem = existingPermission.Environments.FirstOrDefault(e => e.Id == item.Id);

            if (existingItem == null)
            {
                Console.WriteLine(string.Format("{0} is not yet scoped to the environment {1}, adding it", User.DisplayName, item.Name));
                existingPermission.Environments.Add(item);
            }
        }
    }

    if (existingPermission.Tenants.Count > 0 && newPermission.Tenants.Count == 0)
    {
        Console.WriteLine(string.Format("{0} has scoping to tenants, but teh new permission doesn't have any tenant scoping, removing the scoping", User.DisplayName));
        existingPermission.Tenants = new System.Collections.Generic.List<TenantResource>();
    }
    else if (existingPermission.Tenants.Count > 0 && newPermission.Tenants.Count > 0)
    {
        foreach (var item in newPermission.Tenants)
        {
            Console.WriteLine(string.Format("{0} is not yet scoped to the tenant {1}, adding it", User.DisplayName, item.Name));
            existingPermission.Tenants.Add(item);
        }
    }

    return ProjectPermissionList;
}

static void WritePermissionList (string PermissionName, System.Collections.Generic.List<Permission> ProjectPermissionList, ProjectPermission Permission, string ReportPath)
{
    using (System.IO.StreamWriter csvFile = new System.IO.StreamWriter(ReportPath, true))
    {
        //csvFile.WriteLine("Space Name,Project Name,Permission Name,Display Name,Environment Scoping,Tenant Scoping");
        //                       0        1            2                3           4                   5
        

        foreach (var permissionScope in ProjectPermissionList)
        {
            System.Collections.Generic.List<string> row = new System.Collections.Generic.List<string>();
            row.Add(Permission.SpaceName);
            row.Add(Permission.Name);
            row.Add(PermissionName);
            row.Add(permissionScope.DisplayName);

            if (permissionScope.IncludScope == false)
            {
                row.Add("N/A");
                row.Add("N/A");
            }
            else
            {
                if (permissionScope.Environments.Count == 0)
                {
                    row.Add("All");
                }
                else
                {
                    row.Add(string.Join(";", permissionScope.Environments.Select(e => e.Name)));
                }

                if (permissionScope.Tenants.Count == 0)
                {
                    row.Add("All");
                }
                else
                {
                    row.Add(string.Join(";", permissionScope.Tenants.Select(t => t.Name)));
                }
            }

            csvFile.WriteLine(string.Format("{0},{1},{2},{3},{4},{5}", row.ToArray()));
        }
    }
}

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
string spaceFilter = "all";
string environmentfilter = "Development";
string permissionToCheck = "DeploymentCreate";
string reportPath = "path:\\to\\csv.file";


// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

var spaceList = repository.Spaces.FindAll();
spaceList = FilterSpaceList(spaceList, spaceFilter);

var userRoleList = repository.UserRoles.FindAll();
var userList = repository.Users.FindAll();

var permissionsReport = new System.Collections.Generic.List<ProjectPermission>();

foreach (var spaceName in spaceList)
{
    var space = repository.Spaces.FindByName(spaceName.Name);
    var repositoryForSpace = client.ForSpace(space);

    var projectList = repositoryForSpace.Projects.GetAll();
    var environmentList = repositoryForSpace.Environments.GetAll();

    environmentList = FilterEnvironmentList(environmentList, environmentfilter);

    var tenantList = repositoryForSpace.Tenants.GetAll();

    foreach (var project in projectList)
    {
        var projectPermission = new ProjectPermission();
        projectPermission.Name = project.Name;
        projectPermission.SpaceName = space.Name;
        

        var projectEnvironmentList = GetEnvironmentsScopedToProject(project, space, repositoryForSpace);

        foreach (var user in userList)
        {
            var allTeamList = repository.UserTeams.Get(user);
            var userTeamList = new System.Collections.Generic.List<TeamNameResource>();

            foreach (var teamItem in allTeamList)
            {
                var team = repository.Teams.Get(teamItem.Id);
                if ((string.IsNullOrEmpty(team.SpaceId)) || (team.SpaceId == space.Id))
                {
                    userTeamList.Add(teamItem);
                }
            }

            foreach (var userTeam in userTeamList)
            {
                var team = repository.Teams.Get(userTeam.Id);
                var scopedUserRolesList = repository.Teams.GetScopedUserRoles(team);

                foreach (var scopedRole in scopedUserRolesList)
                {
                    if (scopedRole.SpaceId != space.Id)
                    {
                        Console.WriteLine("The scoped role is not for the current space, moving on to next role");
                        continue;
                    }

                    if ((scopedRole.ProjectIds.Count > 0) && (!scopedRole.ProjectIds.Contains(project.Id) && scopedRole.ProjectGroupIds.Count == 0))
                    {
                        Console.WriteLine(string.Format("The scoped role is associates wiht projects, but not {0}, moving on to next role", project.Name));
                        continue;
                    }

                    if ((scopedRole.ProjectGroupIds.Count > 0) && (!scopedRole.ProjectGroupIds.Contains(project.ProjectGroupId) && scopedRole.ProjectIds.Count == 0))
                    {
                        Console.WriteLine(string.Format("The scoped role is associated with project groups, but not the one for {0}, moving on to next role", project.Name));
                        continue;
                    }

                    var userRole = userRoleList.FirstOrDefault(r => r.Id == scopedRole.UserRoleId);

                    projectPermission.Permissions = GetUserPermission(space, project, userRole, projectPermission.Permissions, permissionToCheck, environmentList, tenantList, user, scopedRole, true, projectEnvironmentList);
                }
            }
        }
        permissionsReport.Add(projectPermission);
    }
}

if (!System.IO.Directory.Exists(System.IO.Path.GetDirectoryName(reportPath)))
{
    string directoryPath = System.IO.Path.GetDirectoryName(reportPath);
    System.IO.Directory.CreateDirectory(directoryPath);
}

if (System.IO.File.Exists(reportPath))
{
    System.IO.File.Delete(reportPath);
}

using (System.IO.StreamWriter csvFile = new System.IO.StreamWriter(reportPath))
{
    csvFile.WriteLine("Space Name,Project Name,Permission Name,Display Name,Environment Scoping,Tenant Scoping");
}

foreach (var permission in permissionsReport)
{
    WritePermissionList(permissionToCheck, permission.Permissions, permission, reportPath);
}
```
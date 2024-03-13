<details data-group="environment-permissions-report">
<summary>PowerShell (REST API)</summary>

```powershell
$octopusUrl = "https://YOURURL"
$octopusApiKey = "YOUR API KEY"
$reportPath = "./Report.csv"
$spaceFilter = "Permissions" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly 
$environmentFilter = "Production" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly
$userFilter = "all" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly
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
                Write-OctopusVerbose "The role is scoped to environment $environmentId, but the environment is not assigned to $($project.Name), excluding from this project's report"
                continue
            }

            $environment = $environmentList | Where-Object { $_.Id -eq $environmentId }
            $newPermission.Environments += @{
                Id = $environment.Id
                Name = $environment.Name
            }
        }

        if ($scopedRole.EnvironmentIds.Length -gt 0 -and $newPermission.Environments.Length -le 0)
        {
            Write-OctopusVerbose "The role is scoped to environments, but none of the environments are assigned to $($project.Name).  This user role does not apply to this project."

            return @($projectPermissionList)
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
        
        if ($scopedRole.TenantIds.Length -gt 0 -and $newPermission.Tenants.Length -le 0)
        {
            Write-OctopusVerbose "The role is scoped to tenants, but none of the tenants are assigned to $($project.Name).  This user role does not apply to this project."

            return @($projectPermissionList)
        }
    }

    $existingPermission = $projectPermissionList | Where-Object { $_.UserId -eq $newPermission.UserId }

    if ($null -eq $existingPermission)
    {
        Write-OctopusVerbose "This is the first time we've seen $($user.DisplayName) for this permission.  Adding the permission to the list."

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

        $lifecyclePreview = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "lifecycles/$lifecycleId/preview" -spaceId $spaceId -method "GET"

        foreach ($phase in $lifecyclePreview.Phases)
        {
            foreach ($environmentId in $phase.AutomaticDeploymentTargets)
            {
                if ($scopedEnvironmentList -notcontains $environmentId)
                {
                    Write-OctopusVerbose "Adding $environmentId to $($project.Name) environment list"
                    $scopedEnvironmentList += $environmentId
                }
            }

            foreach ($environmentId in $phase.OptionalDeploymentTargets)
            {
                if ($scopedEnvironmentList -notcontains $environmentId)
                {
                    Write-OctopusVerbose "Adding $environmentId to $($project.Name) environment list"
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
$userList = New-OctopusFilteredList -itemType "Users" -itemList $userList -filters $userFilter

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

</details>
<details data-group="environment-permissions-report">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
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
                Write-OctopusVerbose "The role is scoped to environment $environmentId, but the environment is not assigned to $($project.Name), excluding from this project's report"
                continue
            }

            $environment = $environmentList | Where-Object { $_.Id -eq $environmentId }
            $newPermission.Environments += @{
                Id = $environment.Id
                Name = $environment.Name
            }
        }

        if ($scopedRole.EnvironmentIds.Length -gt 0 -and $newPermission.Environments.Length -le 0)
        {
            Write-OctopusVerbose "The role is scoped to environments, but none of the environments are assigned to $($project.Name).  This user role does not apply to this project."

            return @($projectPermissionList)
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

        if ($scopedRole.TenantIds.Length -gt 0 -and $newPermission.Tenants.Length -le 0)
        {
            Write-OctopusVerbose "The role is scoped to tenants, but none of the tenants are assigned to $($project.Name).  This user role does not apply to this project."

            return @($projectPermissionList)
        }
    }

    $existingPermission = $projectPermissionList | Where-Object { $_.UserId -eq $newPermission.UserId }

    if ($null -eq $existingPermission)
    {
        Write-OctopusVerbose "This is the first time we've seen $($user.DisplayName) for this permission.  Adding the permission to the list."
        
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
                    Write-OctopusVerbose "Adding $environmentId to $($project.Name) environment list"
                    $scopedEnvironmentList += $environmentId
                }
            }

            foreach ($environmentId in $phase.OptionalDeploymentTargets)
            {
                if ($scopedEnvironmentList -notcontains $environmentId)
                {
                    Write-OctopusVerbose "Adding $environmentId to $($project.Name) environment list"
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

</details>
<details data-group="environment-permissions-report">
<summary>C#</summary>

```csharp
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

static System.Collections.Generic.List<UserResource> FilterUserList(System.Collections.Generic.List<UserResource> Users, string Filter)
{
    var filters = Filter.Split(",", StringSplitOptions.RemoveEmptyEntries);
    System.Collections.Generic.List<UserResource> filteredList = new System.Collections.Generic.List<UserResource>();

    foreach (var userResource in Users)
    {
        // Loop through filters
        foreach (string filter in filters)
        {
            if (filter.ToLower() == "all")
            {
                // Add to list
                Console.WriteLine(string.Format("The filter is 'all' -> adding {0} to filtered list", userResource.Name));
                filteredList.Add(userResource);
            }
            else if (Regex.IsMatch(userResource.Name, filter))
            {
                Console.WriteLine(string.Format("The filter {0} matches {1}, adding {1} to filtered list", filter, userResource.Name));
                filteredList.Add(userResource);
            }
            else
            {
                Console.WriteLine(string.Format("User {0} does not match filter {1}", userResource.Name, filter));
            }
        }
    }

    return filteredList;
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
    newPermission.IncludeScope = IncludeScope;
    
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

        if (ScopedRole.EnvironmentIds.Count > 0 and newPermission.Environments.Count <= 0)
        {
            Console.WriteLine(string.Format("The role is scoped to environments, but none of the environments are assigned to {0}.  This user role does not apply to this project.", Project.Name));

            return ProjectPermissionList;
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

        if (ScopedRole.TenantIds.Count > 0 and newPermission.Tenants.Count <= 0)
        {
            Console.WriteLine(string.Format("The role is scoped to tenants, but none of the tenants are assigned to {0}.  This user role does not apply to this project.", Project.Name));

            return ProjectPermissionList;
        }
    }

    var existingPermission = ProjectPermissionList.FirstOrDefault(p => p.UserId == newPermission.UserId);

    if (existingPermission == null)
    {
        Console.WriteLine(string.Format("This is the first time we've seen {0} for this permission. Adding the permission to the list.", User.DisplayName));
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
        Console.WriteLine(string.Format("{0} has scoping to tenants, but the new permission doesn't have any tenant scoping, removing the scoping", User.DisplayName));
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

            if (permissionScope.IncludeScope == false)
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
string userFilter = "all";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

var spaceList = repository.Spaces.FindAll();
spaceList = FilterSpaceList(spaceList, spaceFilter);

var userRoleList = repository.UserRoles.FindAll();
var userList = repository.Users.FindAll();
userList = FilterUserList(userList, userFilter);

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
                        Console.WriteLine(string.Format("The scoped role is associates with projects, but not {0}, moving on to next role", project.Name));
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

</details>
<details data-group="environment-permissions-report">
<summary>Python3</summary>

```python
import json
import requests
from requests.api import get, head
import re
import os

def get_octopus_resource(uri, headers, skip_count = 0):
    items = []
    skip_querystring = ""

    if '?' in uri:
        skip_querystring = '&skip='
    else:
        skip_querystring = '?skip='

    response = requests.get((uri + skip_querystring + str(skip_count)), headers=headers)
    response.raise_for_status()

    # Get results of API call
    results = json.loads(response.content.decode('utf-8'))

    # Store results
    if hasattr(results, 'keys') and 'Items' in results.keys():
        items += results['Items']

        # Check to see if there are more results
        if (len(results['Items']) > 0) and (len(results['Items']) == results['ItemsPerPage']):
            skip_count += results['ItemsPerPage']
            items += get_octopus_resource(uri, headers, skip_count)

    else:
        return results

    
    # return results
    return items

def new_octopus_filtered_list(item_list, filters):
    filtered_list = []

    # Split string
    filter_list = filters.split(',')

    for item in item_list:
        for filter in filter_list:
            print ('Checking to see if {0} matches {1}'.format(filter, item['Name']))
            if filter == 'all':
                print ('The filter is all -> adding {0} to filtered list'.format(item['Name']))
                filtered_list.append(item)
            elif re.match(filter, item['Name'], re.IGNORECASE) != None:
                print ('The filter {0} matches {1}, adding {1} to filtered list'.format(filter, item['Name']))
                filtered_list.append(item)
            else:
                print ('The item {0} does not match filter {1}'.format(item['Name'], filter))

    return filtered_list

def get_environments_scoped_to_project (octopus_server_uri, headers, project, space):
    scoped_environment_list = []

    # Get project channels
    uri = '{0}/api/{1}/projects/{2}/channels'.format(octopus_server_uri, space['Id'], project['Id'])
    channels = get_octopus_resource(uri, headers)

    # Loop through channels
    for channel in channels:
        lifecycleId = channel['LifecycleId']

        if None == lifecycleId:
            # Channel inherits lifecycle from project
            lifecycleId = project['LifecycleId']

        # Get lifecycle preview - using the preview returns implied phases if the lifecycle doesn't have any phases defined
        uri = '{0}/api/{1}/lifecycles/{2}/preview'.format(octopus_server_uri, space['Id'], lifecycleId)
        lifecycle_preview = get_octopus_resource(uri, headers)

        # Loop through phases
        for phase in lifecycle_preview['Phases']:
            for environmentId in phase['AutomaticDeploymentTargets']:
                if environmentId not in scoped_environment_list:
                    print ('Adding {0} to {1} environment list'.format(environmentId, project['Name']))
                    scoped_environment_list.append(environmentId)
            
            for environmentId in phase['OptionalDeploymentTargets']:
                if environmentId not in scoped_environment_list:
                    print ('Adding {0} to {1} environment list'.format(environmentId, project['Name']))
                    scoped_environment_list.append(environmentId)

    return scoped_environment_list

def get_user_permission (space, project, user_role, project_permission_list, permission_to_check, environment_list, tenant_list, user, scoped_role, include_scope, project_environment_list):
    if permission_to_check not in user_role['GrantedSpacePermissions']:
        return project_permission_list

    new_permission = {
        'DisplayName': user['DisplayName'],
        'UserId': user['Id'],
        'Environments': [],
        'Tenants': [],
        'IncludeScope': include_scope
    }

    if include_scope == True:
        for environmentId in scoped_role['EnvironmentIds']:
            if environmentId not in project_environment_list:
                print ('The role is scoped to environment {0}, but the environment is not assigned to {1}, excluding from report'.format(environmentId, project['Name']))
                continue

            environment = next((x for x in environment_list if x['Id'] == environmentId), None)

            if environment != None:
                new_permission['Environments'] += [{
                    'Id': environment['Id'],
                    'Name': environment['Name']
                }]                                        

        if len(scoped_role['EnvironmentIds']) > 0 and len(new_permission['Environments']) <= 0
            print ('The role is scoped to environments, but none of the environments are assigned to {0}.  This user role does not apply to this project.'.format(project['Name']))
            return project_permission_list

        for tenantId in scoped_role['TenantIds']:
            tenant = next((x for x in tenant_list if x['Id'] == tenantId), None)
            new_permission['Tenants'] += [{
                'Id': tenant['Id'],
                'Name': tenant['Name']
            }]

        if len(scoped_role['TenantIds']) > 0 and len(new_permission['Tenants']) <= 0
            print('The role is scoped to tenants, but none of the tenants are assigned to the {0}.  This user does not apply to this project.'.format(project['Name']))
            return project_permission_list

    existing_permission = next((x for x in project_permission_list if x['UserId'] == new_permission['UserId']), None)

    if existing_permission == None:
        print ('This is the first time we''ve seen {0} for this permission. Adding the permission to the list'.format(user['DisplayName']))
        project_permission_list.append(new_permission)
        return project_permission_list

    if len(existing_permission['Environments']) == 0 and len(existing_permission['Tenants']) == 0:
        print ('{0} has no scoping for environments or tenants for this project, they have the highest level, no need to improve it.'.format(user['DisplayName']))
        return project_permission_list

    if len(existing_permission['Environments']) > 0 and len(new_permission['Environments']) == 0:
        print('{0} has scoping to environments, but the new permission does not have any environment scoping, removing the scoping'.format(user['DisplayName']))
        existing_permission['Environments'] = []
    elif len(existing_permission['Environments']) > 0 and len(new_permission['Environments']) > 0:
        for item in new_permission['Environments']:
            existing_item = next((x for x in existing_permission['Environments'] if x['Id'] == item['Id']), None)

            if existing_item == None:
                print ('{0} is not yet scoped to the environment {1}, adding it'.format(user['DisplayName'], item['Name']))
                existing_permission['Environments'] += item
    
    if len(existing_permission['Tenants']) > 0 and len(new_permission['Tenants']) == 0:
        print ('{0} has scoping to tenants, but the new permission does not have any tenant scoping, removing the scoping')
        existing_permission['Tenants'] = []
    elif len(existing_permission['Tenants']) > 0 and len(new_permission['Tenants']) > 0:
        for item in new_permission['Tenants']:
            existing_item = next((x for x in existing_permission['Tenants'] if x['Id'] == item['Id']), None)

            if existing_item == None:
                print ('{0} is not yet scoped to the tenant {1}, adding it.'.format(user['DisplayName'], item['Name']))
                existing_permission['Tenants'] += item

    return project_permission_list

def write_permission_list (permission_name, permission_list, permission, report_path):
    for permission_scope in permission_list:
        row = {
            'Space': permission['SpaceName'],
            'Project': permission['Name'],
            'PermissionName': permission_name,
            'User': permission_scope['DisplayName'],
            'EnvironmentScope': '',
            'TenantScope':''
        }

        if permission_scope['IncludeScope'] == False:
            row['EnvironmentScope'] = "N/A"
            row['TenantScope'] = "N/A"
        else:
            if len(permission_scope['Environments']) == 0:
                row['EnvironmentScope'] = "All"
            else:
                scopedList = ""
                for scopedEnvironment in permission_scope['Environments']:
                    scopedList += scopedEnvironment['Name'] + ';'

                row['EnvironmentScope'] = scopedList

            if len(permission_scope['Tenants']) == 0:
                row['TenantScope'] = "All"
            else:
                scopedList = ""
                for scopedTenant in permission_scope['Tenants']:
                    scopedList += scopedTenant['Name'] + ';'
                row['TenantScope'] = scopedList

        report = open(report_path, 'a')
        report.write('\n'.join(["{0},{1},{2},{3},{4},{5}".format(row['Space'], row['Project'], row['PermissionName'], row['User'], row['EnvironmentScope'], row['TenantScope'])]) + '\n')
        report.close()

octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_filter = "all"
environment_filter = "Development"
permission_to_check = "DeploymentCreate"
report_path = "path:\\to\\report.file"
user_filter = "all" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly

# Get spaces
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
spaces = new_octopus_filtered_list(spaces, space_filter)

# Get user role list
uri = '{0}/api/userroles'.format(octopus_server_uri)
user_roles_list = get_octopus_resource(uri, headers)

# Get user list
uri = '{0}/api/users'.format(octopus_server_uri)
user_list = get_octopus_resource(uri, headers)
user_list = new_octopus_filtered_list(user_list, user_filter)

permissions_report = []

for space in spaces:
    # Get project list
    uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
    projects = get_octopus_resource(uri, headers)

    # Get environments
    uri = '{0}/api/{1}/environments'.format(octopus_server_uri, space['Id'])
    environments = get_octopus_resource(uri, headers)
    environments = new_octopus_filtered_list(environments, environment_filter)

    # Get tenants
    uri = '{0}/api/{1}/tenants'.format(octopus_server_uri, space['Id'])
    tenants = get_octopus_resource(uri, headers)

    # Loop through projects
    for project in projects:
        # Create permission hash table
        project_permission = {
            'Name': project['Name'],
            'SpaceName': space['Name'],
            'Permissions': []
        }

        # Get environments scoped to project
        project_environment_list = get_environments_scoped_to_project(octopus_server_uri, headers, project, space)

        # Loop through users
        for user in user_list:
            # Get user team list
            uri = '{0}/api/users/{1}/teams?spaces={2}&includeSystem=True'.format(octopus_server_uri, user['Id'], space['Id'])
            user_team_list = get_octopus_resource(uri, headers)

            for user_team in user_team_list:
                # Get the scoped roles
                uri = '{0}/api/teams/{1}/scopeduserroles'.format(octopus_server_uri, user_team['Id'])
                scoped_roles_list = get_octopus_resource(uri, headers)

                for scoped_role in scoped_roles_list:
                    if scoped_role['SpaceId'] != space['Id']:
                        print ('The scoped role is not for the current space, moving on to next role')
                        continue

                    if len(scoped_role['ProjectIds']) > 0 and project['Id'] not in scoped_role['ProjectIds'] and len(scoped_role['ProjectGroupIds']) == 0:
                        print ('The scoped role is associated with projects, but not {0}, moving on to next role'.format(project['Name']))
                        continue

                    if len(scoped_role['ProjectGroupIds']) > 0 and project['ProjectGroupId'] not in scoped_role['ProjectGroupIds'] and len(scoped_role['ProjectIds']) == 0:
                        print ('The scoped role is associated with project groups, but not one for {0}, moving on to next role'.format(project['Name']))
                    
                    user_role = next((x for x in user_roles_list if x['Id'] == scoped_role['UserRoleId']), None)

                    project_permission['Permissions'] = get_user_permission(space, project, user_role, project_permission['Permissions'], permission_to_check, environments, tenants, user, scoped_role, True, project_environment_list)
        
        permissions_report.append(project_permission)

if os.path.exists(report_path):
    os.remove(report_path)

# Write header
report = open(report_path, 'w')
report.write('\n'.join(["Space Name,Project Name,Permission Name,Display Name,Environment Scoping,Tenant Scoping"]) + '\n')
report.close()

# Loop through the report
for permission in permissions_report:
    write_permission_list(permission_to_check, permission['Permissions'], permission, report_path)
```

</details>
<details data-group="environment-permissions-report">
<summary>Go</summary>

```go
package main

import (
	"bufio"
	"fmt"
	"log"
	"net/url"
	"os"
	"regexp"
	"strings"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

type ProjectPermission struct {
	Name        string
	SpaceName   string
	Permissions []Permission
}

type Permission struct {
	DisplayName  string
	UserId       string
	Environments []PermissionEnvironment
	Tenants      []PermissionTenant
	IncludeScope bool
}

type PermissionEnvironment struct {
	Id   string
	Name string
}

type PermissionTenant struct {
	Id   string
	Name string
}

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceFilter := "all"
	environmentFilter := "Development"
	permissionToCheck := "DeploymentCreate"
	reportPath := "path:\\to\\Report.csv"
    userFilter := "all"

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	// Get spaces
	spaces, err := client.Spaces.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Filter spaces
	spaces = FilterSpaces(spaces, spaceFilter)

	// Get all user roles
	userRoles, err := client.UserRoles.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Get all users
	users, err := client.Users.GetAll()
	if err != nil {
		log.Println(err)
	}

    // Filter users
	users = FilterUsers(users, userFilter)

	permissionsReport := []ProjectPermission{}

	// Loop through spaces
	for s := 0; s < len(spaces); s++ {
		spaceClient := octopusAuth(apiURL, APIKey, spaces[s].ID)

		// Get projects for space
		projects, err := spaceClient.Projects.GetAll()
		if err != nil {
			log.Println(err)
		}

		// Get environments for space
		environments, err := spaceClient.Environments.GetAll()
		if err != nil {
			log.Println(err)
		}

		environments = FilterEnvironments(environments, environmentFilter)

		// Get tenants for space
		tenants, err := spaceClient.Tenants.GetAll()
		if err != nil {
			log.Println(err)
		}

		// Loop through projects
		for p := 0; p < len(projects); p++ {
			// Create new permission object
			projectPermission := ProjectPermission{
				Name:      projects[p].Name,
				SpaceName: spaces[s].Name,
			}

			// Get environment scoped to project
			projectEnvironmentList := GetEnvironmentsScopedToProject(spaceClient, projects[p], spaces[s])

			// Loop through users
			for u := 0; u < len(users); u++ {
				// Get user team list
				userTeams, err := spaceClient.Users.GetTeams(users[u])
				if err != nil {
					log.Println(err)
				}

				for t := 0; t < len(*userTeams); t++ {
					userTeam := *userTeams
					scopedRolesList, err := client.Teams.GetScopedUserRolesByID(userTeam[t].ID)

					if err != nil {
						log.Println(err)
					}

					// Loop through scoped roles
					for r := 0; r < len(scopedRolesList.Items); r++ {
						if scopedRolesList.Items[r].SpaceID != spaces[s].ID {
							fmt.Println("The scoped role is not for the current space, moving on to next role.")
							continue
						}

						if len(scopedRolesList.Items[r].ProjectIDs) > 0 && !contains(scopedRolesList.Items[r].ProjectIDs, projects[p].ID) && len(scopedRolesList.Items[r].ProjectGroupIDs) == 0 {
							fmt.Println("The scoped role is associated with projects, but not " + projects[p].Name)
							continue
						}

						if len(scopedRolesList.Items[r].ProjectGroupIDs) > 0 && !contains(scopedRolesList.Items[r].ProjectGroupIDs, projects[p].ProjectGroupID) && len(scopedRolesList.Items[r].ProjectIDs) == 0 {
							fmt.Println("The scoped role is associated with project groups but not " + projects[p].Name)
						}

						userRole := GetUserRole(userRoles, scopedRolesList.Items[r].UserRoleID)

						projectPermission.Permissions = GetUserPermission(spaces[s], projects[p], userRole, projectPermission.Permissions, permissionToCheck, environments, tenants, users[u], scopedRolesList.Items[r], true, projectEnvironmentList)

					}
				}
			}

			// Add to report
			permissionsReport = append(permissionsReport, projectPermission)
		}
	}

	if FileExists(reportPath) {
		os.Remove(reportPath)
	}

	// Write report header
	file, err := os.OpenFile(reportPath, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		log.Println(err)
	}

	dataWriter := bufio.NewWriter(file)
	dataWriter.WriteString("Space Name,Project Name,Permission Name,Display Name,Environment Scoping,Tenant Scoping" + "\n")
	dataWriter.Flush()
	file.Close()

	for i := 0; i < len(permissionsReport); i++ {
		WritePermissionList(permissionToCheck, permissionsReport[i].Permissions, permissionsReport[i], reportPath)
	}
}

func GetEnvironmentsScopedToProject(client *octopusdeploy.Client, project *octopusdeploy.Project, space *octopusdeploy.Space) []string {
	scopedEnvironmentList := []string{}

	// Get channels for project
	channels := GetChannels(client, project)

	// Loop through channels
	for i := 0; i < len(channels); i++ {
		lifecycleId := channels[i].LifecycleID

		// Check for nil
		if lifecycleId == "" {
			// Channel inherits lifecycle from project
			lifecycleId = project.LifecycleID
		}

		// Get the lifecycle
		lifecycle, err := client.Lifecycles.GetByID(lifecycleId)
		if err != nil {
			log.Println(err)
		}

		// Check phases
		if (lifecycle.Phases == nil) || (len(lifecycle.Phases) == 0) {
			// There are no defined phases, create them manually from the environment list
			environments, err := client.Environments.GetAll()
			if err != nil {
				log.Println(err)
			}

			// Loop through environments and add phases
			for e := 0; e < len(environments); e++ {
				phase := octopusdeploy.Phase{}
				phase.OptionalDeploymentTargets = append(phase.OptionalDeploymentTargets, environments[e].ID)
				lifecycle.Phases = append(lifecycle.Phases, phase)
			}
		}

		// Loop through phases
		for p := 0; p < len(lifecycle.Phases); p++ {
			for e := 0; e < len(lifecycle.Phases[p].AutomaticDeploymentTargets); e++ {
				if !contains(scopedEnvironmentList, lifecycle.Phases[p].AutomaticDeploymentTargets[e]) {
					fmt.Println("Adding " + lifecycle.Phases[p].AutomaticDeploymentTargets[e] + " to " + project.Name + " environment list")
					scopedEnvironmentList = append(scopedEnvironmentList, lifecycle.Phases[p].AutomaticDeploymentTargets[e])
				}
			}

			for e := 0; e < len(lifecycle.Phases[p].OptionalDeploymentTargets); e++ {
				if !contains(scopedEnvironmentList, lifecycle.Phases[p].OptionalDeploymentTargets[e]) {
					fmt.Println("Adding " + lifecycle.Phases[p].OptionalDeploymentTargets[e] + " to " + project.Name + " environment list")
					scopedEnvironmentList = append(scopedEnvironmentList, lifecycle.Phases[p].OptionalDeploymentTargets[e])
				}
			}
		}
	}

	return scopedEnvironmentList
}

func GetUserRole(userRoles []*octopusdeploy.UserRole, userRoleId string) *octopusdeploy.UserRole {
	for i := 0; i < len(userRoles); i++ {
		if userRoles[i].ID == userRoleId {
			return userRoles[i]
		}
	}

	return nil
}

func GetChannels(client *octopusdeploy.Client, project *octopusdeploy.Project) []*octopusdeploy.Channel {
	channelQuery := octopusdeploy.ChannelsQuery{
		Skip: 0,
	}

	results := []*octopusdeploy.Channel{}

	for true {
		// Call for results
		channels, err := client.Channels.Get(channelQuery)

		if err != nil {
			log.Println(err)
		}

		// Check returned number of items
		if len(channels.Items) == 0 {
			break
		}

		// append items to results
		results = append(results, channels.Items...)

		// Update query
		channelQuery.Skip += len(channels.Items)
	}

	return results
}

func FilterSpaces(spaces []*octopusdeploy.Space, filter string) []*octopusdeploy.Space {
	filteredList := []*octopusdeploy.Space{}

	// Split filter
	filters := strings.Split(filter, ",")

	for i := 0; i < len(spaces); i++ {
		for j := 0; j < len(filters); j++ {
			fmt.Println("Checking to see if " + filters[j] + " matches " + spaces[i].Name)
			match, err := regexp.MatchString(filter, spaces[i].Name)
			if err != nil {
				log.Println(err)
			}

			if filters[j] == "all" {
				fmt.Println("The filter is all -> adding " + spaces[i].Name + " to filtered list")
				filteredList = append(filteredList, spaces[i])
			} else if match {
				fmt.Println("The filter " + filters[j] + " matches " + spaces[i].Name + " adding " + spaces[i].Name + " to filtered list")
				filteredList = append(filteredList, spaces[i])
			} else {
				fmt.Println("The item " + spaces[i].Name + " does not match filter " + filters[j])
			}
		}
	}

	return filteredList
}

func FilterUsers(users []*octopusdeploy.User, filter string) []*octopusdeploy.User {
	filteredList := []*octopusdeploy.User{}

	// Split filter
	filters := strings.Split(filter, ",")

	for i := 0; i < len(users); i++ {
		for j := 0; j < len(filters); j++ {
			fmt.Println("Checking to see if " + filters[j] + " matches " + users[i].Name)
			match, err := regexp.MatchString(filter, users[i].Name)
			if err != nil {
				log.Println(err)
			}

			if filters[j] == "all" {
				fmt.Println("The filter is all -> adding " + users[i].Name + " to filtered list")
				filteredList = append(filteredList, users[i])
			} else if match {
				fmt.Println("The filter " + filters[j] + " matches " + users[i].Name + " adding " + users[i].Name + " to filtered list")
				filteredList = append(filteredList, users[i])
			} else {
				fmt.Println("The item " + users[i].Name + " does not match filter " + filters[j])
			}
		}
	}

	return filteredList
}

func FilterEnvironments(environments []*octopusdeploy.Environment, filter string) []*octopusdeploy.Environment {
	filteredList := []*octopusdeploy.Environment{}

	// Split filter
	filters := strings.Split(filter, ",")

	for i := 0; i < len(environments); i++ {
		for j := 0; j < len(filters); j++ {
			fmt.Println("Checking to see if " + filters[j] + " matches " + environments[i].Name)
			match, err := regexp.MatchString(filter, environments[i].Name)
			if err != nil {
				log.Println(err)
			}

			if filters[j] == "all" {
				fmt.Println("The filter is all -> adding " + environments[i].Name + " to filtered list")
				filteredList = append(filteredList, environments[i])
			} else if match {
				fmt.Println("The filter " + filters[j] + " matches " + environments[i].Name + " adding " + environments[i].Name + " to filtered list")
				filteredList = append(filteredList, environments[i])
			} else {
				fmt.Println("The item " + environments[i].Name + " does not match filter " + filters[j])
			}
		}
	}

	return filteredList
}

func octopusAuth(octopusURL *url.URL, APIKey, space string) *octopusdeploy.Client {
	client, err := octopusdeploy.NewClient(nil, octopusURL, APIKey, space)
	if err != nil {
		log.Println(err)
	}

	return client
}

func GetSpace(octopusURL *url.URL, APIKey string, spaceName string) *octopusdeploy.Space {
	client := octopusAuth(octopusURL, APIKey, "")

	spaceQuery := octopusdeploy.SpacesQuery{
		Name: spaceName,
	}

	// Get specific space object
	spaces, err := client.Spaces.Get(spaceQuery)

	if err != nil {
		log.Println(err)
	}

	for _, space := range spaces.Items {
		if space.Name == spaceName {
			return space
		}
	}

	return nil
}

func GetProject(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, projectName string) *octopusdeploy.Project {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	projectsQuery := octopusdeploy.ProjectsQuery {
		Name: projectName,
	}

	// Get specific project object
	projects, err := client.Projects.Get(projectsQuery)

	if err != nil {
		log.Println(err)
	}

	for _, project := range projects.Items {
		if project.Name == projectName {
			return project
		}
	}

	return nil
}

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}

func GetUserPermission(space *octopusdeploy.Space, project *octopusdeploy.Project, userRole *octopusdeploy.UserRole, permissions []Permission, permissionToCheck string, environmentList []*octopusdeploy.Environment, tenantList []*octopusdeploy.Tenant, user *octopusdeploy.User, scopedRole *octopusdeploy.ScopedUserRole, includeScope bool, projectEnvironmentList []string) []Permission {
	if !contains(userRole.GrantedSpacePermissions, permissionToCheck) {
		return permissions
	}

	newPermission := Permission{
		DisplayName:  user.DisplayName,
		UserId:       user.ID,
		IncludeScope: includeScope,
	}

	if includeScope {
		for i := 0; i < len(scopedRole.EnvironmentIDs); i++ {
			if !contains(projectEnvironmentList, scopedRole.EnvironmentIDs[i]) {
				fmt.Println("The role is scoped to environment " + scopedRole.EnvironmentIDs[i] + ", but the environment is not assigned to " + project.Name)
				continue
			}

			for j := 0; j < len(environmentList); j++ {
				if environmentList[j].ID == scopedRole.EnvironmentIDs[i] {
					newPermissionEnvironment := PermissionEnvironment{}
					newPermissionEnvironment.Id = environmentList[j].ID
					newPermissionEnvironment.Name = environmentList[j].Name
					newPermission.Environments = append(newPermission.Environments, newPermissionEnvironment)
					break
				}
			}
		}

        if len(scopedRole.EnvironmentIDs) > 0 && len(newPermission.Environments) == 0 {
            fmt.Println("The role is scoped to environments but the project is not assigned to them.  This user role does not apply.")
            return permissions
        }

		for i := 0; i < len(scopedRole.TenantIDs); i++ {
			for j := 0; j < len(tenantList); j++ {
				if tenantList[j].ID == scopedRole.TenantIDs[i] {
					newPermissionTenant := PermissionTenant{}
					newPermissionTenant.Id = tenantList[j].ID
					newPermissionTenant.Name = tenantList[j].Name
					newPermission.Tenants = append(newPermission.Tenants, newPermissionTenant)
					break
				}
			}
		}

        if len(scopedRole.TenantIDs) > 0 && len(newPermission.Tenants) == 0 {
            fmt.Println("The role is scoped to tenants but the project is not assigned to them.  This user role does not apply.")
            return permissions
        }
	}

	existingPermission := Permission{}
	permissionFound := false

	for i := 0; i < len(permissions); i++ {
		if permissions[i].UserId == newPermission.UserId {
			existingPermission = permissions[i]
			permissionFound = true
			break
		}
	}

	if !permissionFound {
        fmt.Println("This is the first time we've seen " + user.DisplayName + " for this permission. Adding the permission to the list.")
		permissions = append(permissions, newPermission)
		return permissions
	}

	if len(existingPermission.Environments) == 0 && len(existingPermission.Tenants) == 0 {
		fmt.Println(user.DisplayName + "has no scoping for environments or tenants for this project, they have the highest level, no need to improve it")
		return permissions
	}

	if len(existingPermission.Environments) > 0 && len(newPermission.Environments) == 0 {
		fmt.Println(user.DisplayName + " has scoping to environments, but the new permission does not have any environment scoping, removing the scoping")
		existingPermission.Environments = nil
	} else if len(existingPermission.Environments) > 0 && len(newPermission.Environments) > 0 {
		for i := 0; i < len(newPermission.Environments); i++ {
			itemFound := false
			for j := 0; j < len(existingPermission.Environments); j++ {
				if existingPermission.Environments[j].Id == newPermission.Environments[i].Id {
					itemFound = true
					break
				}
			}

			if !itemFound {
				fmt.Println(user.DisplayName + " is not yet scoped to the environment " + newPermission.Environments[i].Name + " adding it")
				existingPermission.Environments = append(existingPermission.Environments, newPermission.Environments[i])
			}
		}
	}

	if len(existingPermission.Tenants) > 0 && len(newPermission.Tenants) == 0 {
		fmt.Println(user.DisplayName + " has scoping to tenants, but the new permission does not have any tenant scoping, removing the scoping")
		existingPermission.Tenants = nil
	} else if len(existingPermission.Tenants) > 0 && len(newPermission.Tenants) > 0 {
		for i := 0; i < len(newPermission.Tenants); i++ {
			itemFound := false
			for j := 0; j < len(existingPermission.Tenants); j++ {
				if existingPermission.Tenants[j].Id == newPermission.Tenants[i].Id {
					itemFound = true
					break
				}

				if !itemFound {
					fmt.Println(user.DisplayName + " is not yet scoped to the tenant " + newPermission.Tenants[i].Name + " adding it")
					existingPermission.Tenants = append(existingPermission.Tenants, newPermission.Tenants[i])
				}
			}
		}
	}

	return permissions
}

func WritePermissionList(permissionName string, permissions []Permission, projectPermission ProjectPermission, reportPath string) {
	for i := 0; i < len(permissions); i++ {
		row := make(map[string]string)
		row["Space"] = projectPermission.SpaceName
		row["Project"] = projectPermission.Name
		row["PermissionName"] = permissionName
		row["User"] = permissions[i].DisplayName

		if !permissions[i].IncludeScope {
			row["EnvironmentScope"] = "N/A"
			row["TenantScope"] = "N/A"
		} else {
			if len(permissions[i].Environments) == 0 {
				row["EnvironmentScope"] = "All"
			} else {
				scopedList := ""
				for e := 0; e < len(permissions[i].Environments); e++ {
					scopedList += permissions[i].Environments[e].Name + ";"
				}

				row["EnvironmentScope"] = scopedList
			}
			if len(permissions[i].Tenants) == 0 {
				row["TenantScope"] = "All"
			} else {
				scopedList := ""
				for t := 0; t < len(permissions[i].Tenants); t++ {
					scopedList += permissions[i].Tenants[t].Name + ";"
				}

				row["TenantScope"] = scopedList
			}

			// Write report row
			file, err := os.OpenFile(reportPath, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
			if err != nil {
				log.Println(err)
			}

			dataWriter := bufio.NewWriter(file)
			//dataWriter.WriteString("Space Name,Project Name,Permission Name,Display Name,Environment Scoping,Tenant Scoping" + "\n")
			dataWriter.WriteString(row["Space"] + "," + row["Project"] + "," + row["PermissionName"] + "," + row["User"] + "," + row["EnvironmentScope"] + "," + row["TenantScope"] + "\n")
			dataWriter.Flush()
			file.Close()
		}
	}
}

func FileExists(filename string) bool {
	info, err := os.Stat(filename)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}
```

</details>

```PowerShell PowerShell (REST API)
$octopusUrl = "YOUR OCTOPUS URL"
$octopusApiKey = "YOUR API KEY" # User associated with API key must be system manager or higher to view all users
$reportPath = "./Report.csv"
$spaceFilter = "All" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly 
$projectFilter = "Hello World" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly
$userFilter = "bob.walker" # Supports "all" for everything, wild cards "hello*" will pull back everything that starts with hello, or specific names.  Comma separated "Hello*,Testing" will pull back everything that starts with Hello and matches Testing exactly

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
                $permissionForCSV.EnvironmentScope = $($permissionScope.Environments | Select-Object -ExpandProperty Name) -join ";"
            }        

            if ($permissionScope.TenantScope.Length -eq 0)
            {
                $permissionForCSV.TenantScope = "All"
            }
            else
            {
                $permissionForCSV.TenantScope = $($permissionScope.Tenants | Select-Object -ExpandProperty Name) -join ";"
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
$userList = New-OctopusFilteredList -itemType "Users" -itemList $userList -filters $userFilter

$permissionsReport = @()
foreach ($space in $spaceList)
{    
    $projectList = Get-OctopusItemList -itemType "Projects" -endpoint "projects" -spaceId $space.Id -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
    $projectList = New-OctopusFilteredList -itemType "Projects" -itemList $projectList -filters $projectFilter

    $environmentList = Get-OctopusItemList -itemType "Environments" -endpoint "environments" -spaceId $space.Id -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
    $tenantList = Get-OctopusItemList -itemType "Tenants" -endpoint "tenants" -spaceId $space.Id -octopusUrl $octopusUrl -octopusApiKey $octopusApiKey
    
    foreach ($project in $projectList)
    {
        $projectPermission = @{
            Name = $project.Name
            SpaceName = $space.Name
            ViewPermissions = @()
            EditPermissions = @()
            ViewDeploymentProcessPermissions = @()
            EditProcessPermissions = @()
            ViewVariablesPermissions = @()
            EditVariablesPermissions = @()
            EditVariableUnscopedPermissions = @()
            ViewVariableUnscopedPermissions = @()
            CreateReleasePermissions = @()
            ReleaseViewPermissions = @()
            DeployReleasePermissions = @()
            ViewDeploymentPermissions = @()
            ArtifactViewPermissions = @()
            RunbookViewPermissions = @()
            RunbookEditPermissions = @()
            RunbookRunViewPermissions = @()
            RunbookRunCreatePermissions = @()
            ManualInterventionViewPermissions = @()
            ManualInterventionApprovePermisions = @()
            TenantViewPermissions = @()
            TenantEditPermissions = @()
            TenantDeletePermissions = @()
            TenantCreatePermissions = @()
            LibraryVariableSetCreatePermissions = @()
            LibraryVariableSetViewPermissions = @()
            LibraryVariableSetDeletePermissions = @()
            LibraryVariableSetEditPermissions = @()
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

                    $projectPermission.ViewPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.ViewPermissions -permissionToCheck "ProjectView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.EditPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.EditPermissions -permissionToCheck "ProjectEdit" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $false -projectEnvironmentList $projectEnvironmentList)
                    
                    $projectPermission.ViewDeploymentProcessPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.ViewDeploymentProcessPermissions -permissionToCheck "ProcessView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $false -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.EditProcessPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.EditProcessPermissions -permissionToCheck "ProcessEdit" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $false -projectEnvironmentList $projectEnvironmentList)
                    
                    $projectPermission.ViewVariablesPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.ViewVariablesPermissions -permissionToCheck "VariableView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.EditVariablesPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.EditVariablesPermissions -permissionToCheck "VariableEdit" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.EditVariableUnscopedPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.EditVariableUnscopedPermissions -permissionToCheck "VariableViewUnscoped" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $false -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.ViewVariableUnscopedPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.ViewVariableUnscopedPermissions -permissionToCheck "VariableEditUnscoped" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $false -projectEnvironmentList $projectEnvironmentList)

                    $projectPermission.LibraryVariableSetCreatePermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.LibraryVariableSetCreatePermissions -permissionToCheck "LibraryVariableSetCreate" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.LibraryVariableSetEditPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.LibraryVariableSetEditPermissions -permissionToCheck "LibraryVariableSetEdit" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.LibraryVariableSetDeletePermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.LibraryVariableSetDeletePermissions -permissionToCheck "LibraryVariableSetDelete" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.LibraryVariableSetViewPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.LibraryVariableSetViewPermissions -permissionToCheck "LibraryVariableSetView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    
                    $projectPermission.CreateReleasePermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.CreateReleasePermissions -permissionToCheck "ReleaseCreate" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $false -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.ReleaseViewPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.ReleaseViewPermissions -permissionToCheck "ReleaseView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $false -projectEnvironmentList $projectEnvironmentList)
                    
                    $projectPermission.DeployReleasePermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.DeployReleasePermissions -permissionToCheck "DeploymentCreate" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.ViewDeploymentPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.ViewDeploymentPermissions -permissionToCheck "DeploymentView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.ArtifactViewPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.ArtifactViewPermissions -permissionToCheck "ArtifactView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)

                    $projectPermission.ManualInterventionViewPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.ManualInterventionViewPermissions -permissionToCheck "InterruptionView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.ManualInterventionApprovePermisions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.ManualInterventionApprovePermisions -permissionToCheck "InterruptionViewSubmitResponsible" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    
                    $projectPermission.RunbookViewPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.RunbookViewPermissions -permissionToCheck "RunbookView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $false -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.RunbookEditPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.RunbookEditPermissions -permissionToCheck "RunbookEdit" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $false -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.RunbookRunViewPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.RunbookRunViewPermissions -permissionToCheck "RunbookRunView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.RunbookRunCreatePermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.RunbookRunCreatePermissions -permissionToCheck "RunbookRunCreate" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)

                    $projectPermission.TenantCreatePermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.TenantCreatePermissions -permissionToCheck "TenantCreate" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.TenantEditPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.TenantEditPermissions -permissionToCheck "TenantEdit" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.TenantDeletePermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.TenantDeletePermissions -permissionToCheck "TenantDelete" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
                    $projectPermission.TenantViewPermissions = @(Get-UserPermission -space $space -project $project -userRole $userRole -projectPermissionList $projectPermission.TenantViewPermissions -permissionToCheck "TenantView" -environmentList $environmentList -tenantList $tenantList -user $user -scopedRole $scopedRole -includeScope $true -projectEnvironmentList $projectEnvironmentList)
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
    Write-PermissionList -permissionName "View Project" -permissionList $permission.ViewPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Edit Project" -permissionList $permission.EditPermissions -permission $permission -reportPath $reportPath
       
    Write-PermissionList -permissionName "View Variables" -permissionList $permission.ViewVariablesPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Edit Variables" -permissionList $permission.EditVariablesPermissions -permission $permission -reportPath $reportPath
    
    Write-PermissionList -permissionName "View Variable Unscoped" -permissionList $permission.ViewVariableUnscopedPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Edit Variable Unscoped" -permissionList $permission.EditVariableUnscopedPermissions -permission $permission -reportPath $reportPath
    
    Write-PermissionList -permissionName "Library Variable Set View" -permissionList $permission.LibraryVariableSetViewPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Library Variable Set Edit" -permissionList $permission.LibraryVariableSetEditPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Library Variable Set Create" -permissionList $permission.LibraryVariableSetCreatePermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Library Variable Set Delete" -permissionList $permission.LibraryVariableSetDelete -permission $permission -reportPath $reportPath

    Write-PermissionList -permissionName "Tenant View" -permissionList $permission.TenantViewPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Tenant Edit" -permissionList $permission.TenantEditPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Tenant Create" -permissionList $permission.TenantCreatePermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Tenant Delete" -permissionList $permission.TenantDeletePermissions -permission $permission -reportPath $reportPath
    
    Write-PermissionList -permissionName "Runbook View" -permissionList $permission.RunbookViewPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Runbook Edit" -permissionList $permission.RunbookEditPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Runbook Run View" -permissionList $permission.RunbookRunViewPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Runbook Run Create" -permissionList $permission.RunbookRunCreatePermissions -permission $permission -reportPath $reportPath   
    
    Write-PermissionList -permissionName "View Deployment Process" -permissionList $permission.ViewDeploymentProcessPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Edit Deployment Process" -permissionList $permission.EditProcessPermissions -permission $permission -reportPath $reportPath

    Write-PermissionList -permissionName "View Release" -permissionList $permission.ReleaseViewPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Create Release" -permissionList $permission.CreateReleasePermissions -permission $permission -reportPath $reportPath
    
    Write-PermissionList -permissionName "Deployment View" -permissionList $permission.ViewDeploymentPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Deploy Release" -permissionList $permission.DeployReleasePermissions -permission $permission -reportPath $reportPath
    
    Write-PermissionList -permissionName "Artifact View" -permissionList $permission.ArtifactViewPermissions -permission $permission -reportPath $reportPath

    Write-PermissionList -permissionName "Manual Intervention View" -permissionList $permission.ManualInterventionViewPermissions -permission $permission -reportPath $reportPath
    Write-PermissionList -permissionName "Manual Intervention Approve (when assigned to team)" -permissionList $permission.ManualInterventionApprovePermisions -permission $permission -reportPath $reportPath

    
}
```
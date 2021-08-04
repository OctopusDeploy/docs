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
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

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
                    Write-Host "Adding $environmentId to $($project.Name) enviornment list"
                    $scopedEnvironmentList += $environmentId
                }
            }

            foreach ($environmentId in $phase.OptionalDeploymentTargets)
            {
                if ($scopedEnvironmentList -notcontains $environmentId)
                {
                    Write-Host "Adding $environmentId to $($project.Name) enviornment list"
                    $scopedEnvironmentList += $environmentId
                }
            }
        }
    }

    return $scopedEnvironmentList
}

function Get-TargetIsScopedToProcess
{
    param (
        $deploymentProcess,
        $target,
        $projectEnvironmentList
    )

    $roleFound = $false

    # Loop through steps
    foreach ($step in $deploymentProcess.Steps)
    {
        $roles = $step.Properties["Octopus.Action.TargetRoles"]
        if ($null -ne $roles)
        {
            $roles = $roles.Value.Split(",")
            foreach ($role in $roles)
            {
                # Check to see if target is in the list of roles
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
                foreach ($environment in $action.Envrionments)
                {
                    if ($target.EnvironmentIds -contains $environment)
                    {
                        Write-Host "The environments the step was assigned to and the target roles match the target, target is associated with process."
                        return $true
                    }
                }

                continue
            }

            $hasExcludedEnvironmentScoping = $false
            $allEnvironmentsExcluded = $false 
            if (($null -ne $action.ExcludedEnvironments))
            {
                $hasExcludedEnvironmentScoping = $action.ExcludedEnvironments.Count -gt 0
                if ($hasExcludedEnvironmentScopint -eq $true)
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

# Octopus variables
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "default"
$targetName = "YourMachine"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Get projects
$projects = $repositoryForSpace.Projects.GetAll()

# Get target
$target = $repositoryForSpace.Machines.FindByName($targetName)

# Get environments
$environments = $repositoryForSpace.Environments.GetAll()
$allEnvironments = @()
foreach ($environment in $environments)
{
    $allEnvironments += $environment.Id
}

$targetResults = @()

# Loop through projects
foreach ($project in $projects)
{
    # Get project environments
    $projectEnvironments = Get-EnvironmentsScopedToProject -project $project -octopusApiKey $APIKey -octopusUrl $octopusURL -spaceId $space.Id

    $targetHasMatchingEnvironment = $false
    
    # Loop through environments
    foreach ($envronmentId in $projectEnvironments)
    {
        if ($target.EnvironmentIds -contains $envronmentId)
        {
            $targetHasMatchingEnvironment = $true
            break
        }
    }

    Write-Host "The project $($project.Name) can deploy to the same environments as the target $targetName $targetHasMatchingEnvironment"

    if($targetHasMatchingEnvironment -eq $false)
    {
        continue
    }

    
    if ($project.IsVersionControlled -eq $false)
    {
        # Get project deployment process
        $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

        $targetIsScopedToDeploymentProcess = Get-TargetIsScopedToProcess -deploymentProcess $deploymentProcess -target $target -projectEnvironmentList $projectEnvironments
        
        if ($targetIsScopedToDeploymentProcess -eq $true)
        {
            $targetResults += "$($project.Name) - DeploymentProcess"
        }
        
        # Get all runbooks
        $runbookList = $repositoryForSpace.Projects.GetAllRunbooks($project)

        # Loop through runbooks
        foreach ($runbook in $runbookList)
        {
            # Get the runbook process
            $runbookProcess = $repositoryForSpace.RunbookProcesses.Get($runbook.RunbookProcessId)
            $environmentListToFilterOn = $allEnvironments

            # Check to see if runbook has an environment scope
            if ($null -ne $runbook.EnvironmentScope)
            {
                if ($runbook.EnvironmentScope -eq "FromProjectLifecycles")
                {
                    $environmentListToFilterOn = $projectEnvironments
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

            $targetIsScopedToRunbookProcess = Get-TargetIsScopedToProcess -deploymentProcess $runbookProcess -target $target -projectEnvironmentList $environmentListToFilterOn

            if ($targetIsScopedToRunbookProcess -eq $true)
            {
                $targetResults += "$($project.Name) - $($runbook.Name) Runbook"
            }
            
        }
    }
    else
    {
        Write-Host "Project $($project.Name) is under version control, skipping."
        continue
    }
}

if ($targetResults.Count -eq 0)
{
    Write-Host "The target $targetName is not associated with any projects or runbooks."
}
else
{
    Write-Host "The target $targetName is associated with the following projects and runbooks:"
    foreach ($result in $targetResults)
    {
        Write-Host "`t$result"
    }
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using System;
using System.Linq;

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
string spaceName = "Default";
string targetName = "YourTarget";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get space repository
var space = repository.Spaces.FindByName(spaceName);
var repositoryForSpace = client.ForSpace(space);

// Get all projects
var projects = repositoryForSpace.Projects.GetAll();

// Get the target
var target = repositoryForSpace.Machines.FindByName(targetName);

// Get all environments
var environments = repositoryForSpace.Environments.GetAll();
System.Collections.Generic.List<string> allEnvironments = new System.Collections.Generic.List<string>();
foreach (var environment in environments)
{
    allEnvironments.Add(environment.Id);
}

System.Collections.Generic.List<string> targetResults = new System.Collections.Generic.List<string>();

// Loop through projects
foreach (var project in projects)
{
    // Get environments scoped to project
    var projectEnvironmentList = GetEnvironmentsScopedToProject(project, space, repositoryForSpace);
    bool targetHasMatchingEnvironment = false;

    // Loop through project environments
    foreach (string environmentId in projectEnvironmentList)
    {
        if (target.EnvironmentIds.Contains(environmentId))
        {
            targetHasMatchingEnvironment = true;
            break;
        }
    }

    Console.WriteLine(string.Format("The project {0} can deploy to the same environments as the target {1} {2}", project.Name, targetName, targetHasMatchingEnvironment.ToString()));

    if (!targetHasMatchingEnvironment)
    {
        continue;
    }

    if (!project.IsVersionControlled)
    {
        // Get the deployment process
        var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);
        bool targetIsScopedToDeploymentProcess = GetTargetIsScopedToProcess(deploymentProcess, target, projectEnvironmentList);

        if(targetIsScopedToDeploymentProcess)
        {
            targetResults.Add(string.Format("{0} - DeploymentProcess", project.Name));
        }

        // Get the runbooks associated with project
        var runbookList = repositoryForSpace.Projects.GetAllRunbooks(project);

        // Loop through the runbooks
        foreach (var runbook in runbookList)
        {
            // Get the runbook process
            var runbookProcess = repositoryForSpace.RunbookProcesses.Get(runbook.RunbookProcessId);
            System.Collections.Generic.List<string> environmentListToFilterOn = new System.Collections.Generic.List<string> (allEnvironments.ToArray());

            switch(runbook.EnvironmentScope)
            {
                case Octopus.Client.Model.RunbookEnvironmentScope.FromProjectLifecycles:
                    {
                        environmentListToFilterOn = projectEnvironmentList;
                        break;
                    }
                case Octopus.Client.Model.RunbookEnvironmentScope.Specified:
                    {
                        environmentListToFilterOn.Clear();
                        foreach (var runbookEnvironment in runbook.Environments.ToArray())
                        {
                            environmentListToFilterOn.Add(runbookEnvironment);
                        }
                        break;
                    }
            }

            bool runbookHasMatchingEnvironments = false;

            // Loop through the environment filter
            foreach (var environment in environmentListToFilterOn.ToArray())
            {
                if (target.EnvironmentIds.Contains(environment))
                {
                    runbookHasMatchingEnvironments = true;
                    break;
                }
            }
                
            if(!runbookHasMatchingEnvironments)
            {
                continue;
            }


            bool targetIsScopedToRunbookProcess = GetTargetIsScopedToProcess(runbookProcess, target, projectEnvironmentList);

            if (targetIsScopedToRunbookProcess)
            {
                targetResults.Add(string.Format("{0} - {1} Runbook", project.Name, runbook.Name));
            }
            
        }
    }
    else
    {
        Console.WriteLine(string.Format("Project {0} is under version control, skipping", project.Name));
        continue;
    }
}

if(targetResults.Count == 0)
{
    Console.WriteLine(string.Format("The target {0} is not associated with any projects or runboks", target.Name));
}
else
{
    Console.WriteLine(string.Format("The target {0} is associated with the following projects and runbooks:", target.Name));
    foreach (string result in targetResults)
    {
        Console.WriteLine(string.Format("\t{0}", result));
    }
}

static System.Collections.Generic.List<string> GetEnvironmentsScopedToProject(ProjectResource Project, SpaceResource Space, IOctopusSpaceRepository RepositoryForSpace)
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

static bool GetTargetIsScopedToProcess(Octopus.Client.Model.IProcessResource process, Octopus.Client.Model.MachineResource target, System.Collections.Generic.List<string> projectEnvironmentList)
{
    // Loop through steps
    foreach (var step in process.Steps)
    {
        bool roleFound = false;
        
        // Get the roles assigned to step
        Octopus.Client.Model.PropertyValueResource roles = step.Properties.ContainsKey("Octopus.Action.TargetRoles") ? step.Properties["Octopus.Action.TargetRoles"] : null;

        // Check for null
        if (roles != null)
        {
            // Get the role list int a list
            System.Collections.Generic.List<string> octopusRoles = new System.Collections.Generic.List<string> (roles.Value.Split(","));

            // Loop through roles
            foreach (string role in octopusRoles)
            {
                // Check to see if target has the role
                if (target.Roles.Contains(role))
                {
                    Console.WriteLine(string.Format("Role {0} on the step {1} matches a role in {2}", role, step.Name, target.Name));
                    roleFound = true;
                    break;
                }
            }

            if(!roleFound)
            {
                continue;
            }

            Console.WriteLine(string.Format("Matching role was found, now checking the scoping of the step."));
            foreach (var action in step.Actions)
            {
                bool hasEnvironmentScoping = action.Environments.Count > 0;
                if (hasEnvironmentScoping)
                {
                    foreach(var environment in action.Environments)
                    {
                        if (target.EnvironmentIds.Contains(environment))
                        {
                            Console.WriteLine(string.Format("The environments the step was assigned to and the target roles match the target, target is associated with process"));
                            return true;
                        }
                    }

                    continue;
                }

                bool hasExcludedEnvironmentScoping = false;
                bool allEnvironmentsExcluded = false;

                if (action.ExcludedEnvironments != null)
                {
                    hasExcludedEnvironmentScoping = action.ExcludedEnvironments.Count > 0;
                    if(hasExcludedEnvironmentScoping)
                    {
                        System.Collections.Generic.List<string> environmentsTargetCanStillDeployTo = new System.Collections.Generic.List<string>();
                        foreach (var environmetnId in target.EnvironmentIds)
                        {
                            if ((!action.ExcludedEnvironments.Contains(environmetnId)) && (projectEnvironmentList.Contains(environmetnId)))
                            {
                                environmentsTargetCanStillDeployTo.Add(environmetnId);
                            }
                        }

                        allEnvironmentsExcluded = environmentsTargetCanStillDeployTo.Count == 0;
                    }
                }

                if (!hasEnvironmentScoping && !hasExcludedEnvironmentScoping)
                {
                    Console.WriteLine(string.Format("Target role matches the step and no step scopoing was configured, target is associated with process."));
                    return true;
                }

                if (hasExcludedEnvironmentScoping && !allEnvironmentsExcluded)
                {
                    Console.WriteLine(string.Format("The step role matches the target, and exclusion environments were found, but not all environments associated with teh target were excluded.  The target is associated with the process."));
                    return true;
                }
            }
        }
    }

    return false;
}
```
```python Python3
import json
import requests
from requests.api import get, head
import re

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

def get_target_is_scoped_to_process (process, target, project_environment_list):
    # Loop through steps
    for step in process['Steps']:
        role_found = False
        if 'Octopus.Action.TargetRoles' in step['Properties']:
            role_list = step['Properties']['Octopus.Action.TargetRoles'].split(',')
            for role in role_list:
                if role in target['Roles']:
                    print("Role {0} on the step {1} matches a role in {2}".format(role, step['Name'], target['Name']))
                    role_found = True
                    break

        if role_found == False:
            continue

        print('Matching role was found, now checking the scoping of the step')
        for action in step['Actions']:
            has_environment_scoping = len(action['Environments']) > 0
            if has_environment_scoping == True:
                for environment in action['Environments']:
                    if environment in target['EnvironmentIds']:
                        print('The environments the step was assigned to and the target roles match the target, target is associated with the process')
                        return True

                continue

            has_excluded_environment_scoping = False
            all_environments_excluded = False

            if 'ExcludedEnvironments' in action:
                has_excluded_environment_scoping = len(action['ExcludedEnvironments']) > 0
                if has_excluded_environment_scoping:
                    environments_target_can_still_deploy_to = []
                    for environmentId in target['EnvironmentIds']:
                        if environmentId not in action['ExcludedEnvironments'] and environmentId in project_environment_list:
                            environments_target_can_still_deploy_to.append(environmentId)
                        
                    
                    all_environments_excluded = len(environments_target_can_still_deploy_to) == 0

            if has_environment_scoping == False and has_excluded_environment_scoping == False:
                print("Target role matches the step and no step scoping was configurd, target is associated with process")
                return True

            if has_excluded_environment_scoping == True and all_environments_excluded == False:
                print('The step role matches the target, and exclusion environments were found, but not all environments associated with the target were excluded.  The target is associated with the process')
                return True
            
        return False

octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
target_name = "YourTarget"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get projects
uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)

# Get the target
uri = '{0}/api/{1}/machines'.format(octopus_server_uri, space['Id'])
machines = get_octopus_resource(uri, headers)
target = next((x for x in machines if x['Name'] == target_name), None)

# Get the environments
uri = '{0}/api/{1}/environments'.format(octopus_server_uri, space['Id'])
allEnvironments = []
environments = get_octopus_resource(uri, headers)
for environment in environments:
    allEnvironments.append(environment['Id'])

target_results = []

for project in projects:
    # Get environments scoped to the project
    project_environment_list = get_environments_scoped_to_project(octopus_server_uri, headers, project, space)

    target_has_matching_environment = False

    # Loop through environments
    for environmentId in project_environment_list:
        if environmentId in target['EnvironmentIds']:
            target_has_matching_environment = True
            break
    
    print ('The project {0} can deploy to the sam environments as the target {1}: {2}'.format(project['Name'], target['Name'], target_has_matching_environment))

    if target_has_matching_environment == False:
        continue

    if project['IsVersionControlled'] == False:
        # Get the deployment process
        uri = '{0}/api/{1}/deploymentprocesses/{2}'.format(octopus_server_uri, space['Id'], project['DeploymentProcessId'])
        deployment_process = get_octopus_resource(uri, headers)

        target_is_scoped_to_deployment_process = get_target_is_scoped_to_process(deployment_process, target, project_environment_list)

        if target_is_scoped_to_deployment_process == True:
            target_results.append('{0} - DeploymentProcess'.format(project['Name']))

        # Get runbooks
        uri = '{0}/api/{1}/projects/{2}/runbooks'.format(octopus_server_uri, space['Id'], project['Id'])
        runbook_list = get_octopus_resource(uri, headers)

        # Loop through runbooks
        for runbook in runbook_list:
            uri = '{0}/api/{1}/runbookprocesses/{2}'.format(octopus_server_uri, space['Id'], runbook['RunbookProcessId'])
            runbook_process = get_octopus_resource(uri, headers)
            environment_list_to_filter_on = allEnvironments

            if 'EnvironmentScope' in runbook:
                if runbook['EnvironmentScope'] == 'FromProjectLifeCycles':
                    environment_list_to_filter_on = project_environment_list
                elif runbook['EnvironmentScope'] == 'Specified':
                    environment_list_to_filter_on = runbook['Environments']
            
            runbook_has_matching_environments = False

            for environmentId in environment_list_to_filter_on:
                if environmentId in target['EnvironmentIds']:
                    runbook_has_matching_environments = True
                    break

            if runbook_has_matching_environments == False:
                continue

            target_is_scoped_to_runbook_process = get_target_is_scoped_to_process(runbook_process, target, project_environment_list)

            if target_is_scoped_to_runbook_process == True:
                target_results.append('{0} - {1} Runbook'.format(project['Name'], runbook['Name']))
    else:
        print ('Project {0} is under version control, skipping'.format(project['Name']))

if len(target_results) == 0:
    print ('The target {0} is not associated with any projects or runbooks'.format(target['Name']))
else:
    print ('The target {0} is associated with the following projects and runbooks:'.format(target['Name']))
    for result in target_results:
        print('\t{0}'.format(result))
```

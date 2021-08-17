```powershell PowerShell (REST API)
$octopusUrl = "https://local.octopusdemos.app" 
$apiKey = "YOUR API KEY"
$projectNameList = "WebAPI,Web UI"
$sourceEnvironmentName = "Production" 
$destinationEnvironmentName = "Staging"
$spaceName = "Default"

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

    if ([string]::IsNullOrWhiteSpace($SpaceId))
    {
        $url = "$OctopusUrl/api/$EndPoint"
    }
    else
    {
        $url = "$OctopusUrl/api/$spaceId/$EndPoint"    
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

        Write-Host "No data to post or put, calling bog standard invoke-restmethod for $url"
        $result = Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -ContentType 'application/json; charset=utf-8'

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
        else
        {
            Write-Host $_.Exception
        }
    }

    Throw "There was an error calling the Octopus API please check the log for more details"
}

$spaceList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $null -item $null -endPoint "spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100"
$space = $spaceList.Items | Where-Object {$_.Name -eq $spaceName}
$spaceId = $space.Id
Write-Host "The space id for space name $spaceName is $spaceId"

$sourceEnvironmentList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $spaceId -item $null -endPoint "environments?partialName=$([uri]::EscapeDataString($sourceEnvironmentName))&skip=0&take=100"
$sourceEnvironment = $sourceEnvironmentList.Items | Where-Object {$_.Name -eq $sourceEnvironmentName}
$sourceEnvironmentId = $sourceEnvironment.Id
Write-Host "The environment id for environment name $sourceEnvironmentName is $sourceEnvironmentId"

$destinationEnvironmentList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $spaceId -item $null -endPoint "environments?partialName=$([uri]::EscapeDataString($destinationEnvironmentName))&skip=0&take=100"
$destinationEnvironment = $destinationEnvironmentList.Items | Where-Object {$_.Name -eq $destinationEnvironmentName}
$destinationEnvironmentId = $destinationEnvironment.Id
Write-Host "The environment id for environment name $destinationEnvironmentName is $destinationEnvironmentId"

$splitProjectList = $projectNameList -split ","
foreach ($projectName in $splitProjectList)
{
    $projectList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $spaceId -item $null -endPoint "projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100"
    $project = $projectList.Items | Where-Object {$_.Name -eq $projectName}
    $projectId = $project.Id
    Write-Host "The project id for project name $projectName is $projectId"

    Write-Host "I have all the Ids I need, I am going to find the most recent sucesseful deployment now to $sourceEnvironmentName"
    $taskList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $null -item $null -endPoint "tasks?skip=0&environment=$($sourceEnvironmentId)&project=$($projectId)&name=Deploy&states=Success&spaces=$spaceId&includeSystem=false"
    if ($taskList.Items.Count -eq 0)
    {
        Write-Host "Unable to find a successful deployment for $projectName to $sourceEnvironmentName"
        continue
    }

    $lastDeploymentTask = $taskList.Items[0]
    $deploymentId = $lastDeploymentTask.Arguments.DeploymentId
    Write-Host "The id of the last deployment for $projectName to $sourceEnvironmentName is $deploymentId"

    $deploymentDetails = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $spaceId -item $null -endPoint "deployments/$deploymentId"
    $releaseId = $deploymentDetails.ReleaseId
    Write-Host "The release id for $deploymentId is $releaseId"

    $canPromote = $false
    Write-Host "I have all the Ids I need, I am going to find the most recent sucesseful deployment now to $destinationEnvironmentName"
    $destinationTaskList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $null -item $null -endPoint "tasks?skip=0&environment=$($destinationEnvironmentId)&project=$($projectId)&name=Deploy&states=Success&spaces=$spaceId&includeSystem=false"
    
    if ($destinationTaskList.Items.Count -eq 0)
    {
        Write-Host "The destination has no releases, promoting."
        $canPromote = $true
    }

    $lastDestinationDeploymentTask = $destinationTaskList.Items[0]
    $lastDestinationDeploymentId = $lastDestinationDeploymentTask.Arguments.DeploymentId
    Write-host "The deployment id of the last deployment for $projectName to $destinationEnvironmentName is $lastDestinationDeploymentId"

    $lastDestinationDeploymentDetails = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $spaceId -item $null -endPoint "deployments/$lastDestinationDeploymentId"
    $lastDestinationReleaseId = $lastDestinationDeploymentDetails.ReleaseId

    Write-Host "The release id for the last deployment to the destination is $lastDestinationReleaseId"

    if ($lastDestinationReleaseId -ne $releaseId)
    {
        Write-Host "The releases on the source and destination don't match, promoting"
        $canPromote = $true
    }
    else
    {
        Write-Host "The releases match, not promoting"    
    }

    if ($canPromote -eq $false)
    {
        Write-Host "Nothing to promote for $projectName"
        continue
    }

    $newDeployment = @{
        EnvironmentId = $destinationEnvironmentId
        ReleaseId = $releaseId
        ExcludedMachines = @()
        ForcePackageDownload = $false
        ForcePackageRedeployment = $false
        FormValue = @{}
        QueueTime = $null
        QueueTimeExpiry = $null
        SkipActions = @()
        SpecificMachineIds = @()
        TenantId = $null
        UseGuidedFailure = $false
    }
    $newDeployment = Invoke-OctopusApi -octopusUrl $octopusurl -apiKey $apiKey -method "POST" -spaceId $spaceId -item $newDeployment -endPoint "deployments"
}
```
```powershell PowerShell (Octopus.Client)
$ErrorActionPreference = "Stop";

# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
# Define working variables
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$sourceEnvironmentName = "Production"
$destinationEnvironmentName = "Test"
$projectNameList = @("MyProject")
 

# Establish a conneciton0
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get repository specific to space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Get the source environment
$sourceEnvironment = $repositoryForSpace.Environments.FindByName($sourceEnvironmentName)

# Get the destination environment
$destinationEnvironment = $repositoryForSpace.Environments.FindByName($destinationEnvironmentName)

# Loop through the projects
foreach ($name in $projectNameList)
{
    # Get project object
    $project = $repositoryForSpace.Projects.FindByName($name)

    Write-Host "The project Id for project name $name is $($project.Id)"
    Write-Host "I have all the Ids I need, I am going to find the most recent sucesseful deployment now to $sourceEnvironmentName"

    # Get the deployment tasks associated with this space, project, and environment
    $taskList = $repositoryForSpace.Deployments.FindBy(@($project.Id), @($sourceEnvironment.Id), 0, $null).Items | Where-Object {$repositoryForSpace.Tasks.Get($_.TaskId).State -eq [Octopus.Client.Model.TaskState]::Success}
    
    # Check to see if any tasks were returned
    if ($taskList.Count -eq 0)
    {
        Write-Host "Unable to find a successful deployment for project $($project.Name) to $($sourceEnvironment.Name)"
        continue
    }

    # Grab the last successful deployment
    $lastDeploymentTask = $taskList[0]

    Write-Host "The id of the last deployment for $($project.Name) to $($sourceEnvironment.Name) is $($lastDeploymentTask.Id)"

    # Get the deployment object
    Write-Host "The release id for $deploymentId is $($lastDeploymentTask.ReleaseId)"

    $canPromote = $false

    Write-Host "I have all the Ids I need, I am going to find the most recent successful deployment to $($destinationEnvironment.Name)"

    # Get the task list for the desitnation environment
    $destinationTaskList = $repositoryForSpace.Deployments.FindBy(@($project.Id), @($destinationEnvironment.Id), 0, $null).Items | Where-Object {$repositoryForSpace.Tasks.Get($_.TaskId).State -eq [Octopus.Client.Model.TaskState]::Success}
    
    if ($destinationTaskList.Count -eq 0)
    {
        Write-Host "The destination has no releases, promoting."
        $canPromote = $true
    }

    # Get the last destination deployment
    $lastDestinationDeploymentTask = $destinationTaskList[0]

    Write-Host "The deployment id of the last deployment for $($project.Name) to $($destinationEnvironment.Name) is $($lastDestinationDeploymentTask.Id)"
    Write-Host "The release id of the last deployment to the destination is $($lastDestinationDeploymentTask.ReleaseId)"

    if ($lastDestinationDeploymentTask.ReleaseId -ne $lastDeploymentTask.ReleaseId)
    {
        Write-Host "The releases on teh source and destination don't match, promoting"
        $canPromote = $true
    }
    else
    {
        Write-Host "The releases match, not promoting"
    }

    if ($canPromote -eq $false)
    {
        Write-Host "Nothing to promote for $($project.Name)"
        continue
    }

    # Create new deployment object
    $deployment = New-Object Octopus.Client.Model.DeploymentResource
    $deployment.EnvironmentId = $destinationEnvironment.Id
    $deployment.ReleaseId = $lastDeploymentTask.ReleaseId

    # Execute the deployment
    $repositoryForSpace.Deployments.Create($deployment)
}
```
```csharp C#

#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using System.Linq;

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);
var spaceName = "Default";
var sourceEnvironmentName = "Production";
var destinationEnvironmentName = "Test";
string[] projectList = new string[] { "MyProject" };

var space = repository.Spaces.FindByName(spaceName);
var repositoryForSpace = client.ForSpace(space);

// Get the source environment
var sourceEnvironment = repositoryForSpace.Environments.FindByName(sourceEnvironmentName);

// Get the destination environment
var destinationEnvironment = repositoryForSpace.Environments.FindByName(destinationEnvironmentName);


// Loop through project names
foreach (string projectName in projectList)
{
    // Get the project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    Console.WriteLine(string.Format("The project id for the project name {0} is {2}", project.Name, project.Id));
    Console.WriteLine(string.Format("I have all the Ids I need, I am going to find the most recent successful deployment to {0}", sourceEnvironment.Name));

    // Get a list of deployments to the environment
    var sourceTaskList = repositoryForSpace.Deployments.FindBy(new string[] { project.Id }, new string[] { sourceEnvironment.Id }, 0, null).Items.Where(d => repositoryForSpace.Tasks.Get(d.TaskId).State == TaskState.Success).ToArray();

    if (sourceTaskList.Length == 0)
    {
        Console.WriteLine(string.Format("Unable to find a successful deployment for project {0} to {1}", project.Name, sourceEnvironment.Name));
        continue;
    }

    // Grab the latest task
    var lastSourceDeploymentTask = sourceTaskList[0];

    Console.WriteLine(string.Format("The Id of the last deployment for project {0} to {1} is {2}", project.Name, sourceEnvironment.Name, lastSourceDeploymentTask.Id));
    Console.WriteLine(string.Format("The release Id for {0} is {1}", lastSourceDeploymentTask.Id, lastSourceDeploymentTask.ReleaseId));

    bool canPromote = false;

    Console.WriteLine(string.Format("I have all the Ids I need, I am going to find the most recent successful deployment to {0}", destinationEnvironment.Name));

    // Get task list for destination
    var destinationTaskList = repositoryForSpace.Deployments.FindBy(new string[] { project.Id }, new string[] { destinationEnvironment.Id }, 0, null).Items.Where(d => repositoryForSpace.Tasks.Get(d.TaskId).State == TaskState.Success).ToArray(); ;

    if (destinationTaskList.Length == 0)
    {
        Console.WriteLine(string.Format("The destination has no releases, promoting."));
        canPromote = true;
    }

    // Get the last deployment to destination
    var lastDestinationDeploymentTask = destinationTaskList[0];

    Console.WriteLine(string.Format("The deployment Id of the last deployment for {0} to {1} is {2}", project.Name, destinationEnvironment.Name, lastDestinationDeploymentTask.Id));
    Console.WriteLine(string.Format("The release Id of the last deployment to the destination is {0}", lastDestinationDeploymentTask.ReleaseId));

    if (lastSourceDeploymentTask.ReleaseId != lastDestinationDeploymentTask.ReleaseId)
    {
        Console.WriteLine(string.Format("The releases on the source and destination don't match, promoting"));
        canPromote = true;
    }
    else
    {
        Console.WriteLine("The releases match, not promoting");
    }

    if (!canPromote)
    {
        Console.WriteLine(string.Format("Nothing to promote for {0}", project.Name));
    }

    // Create new deployment object
    var deployment = new Octopus.Client.Model.DeploymentResource();
    deployment.EnvironmentId = destinationEnvironment.Id;
    deployment.ReleaseId = lastSourceDeploymentTask.ReleaseId;

    // Queue the deployment
    repositoryForSpace.Deployments.Create(deployment);
}
```
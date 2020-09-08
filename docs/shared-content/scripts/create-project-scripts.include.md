```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$projectDescription = "MyDescription"
$projectGroupName = "Default project group"
$lifecycleName = "Default lifecycle"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get project group
    $projectGroup = (Invoke-RestMethod -Method Get "$octopusURL/api/$($space.Id)/projectgroups/all" -Headers $header) | Where-Object {$_.Name -eq $projectGroupName}

    # Get Lifecycle
    $lifeCycle = (Invoke-RestMethod -Method Get "$octopusURL/api/$($space.Id)/lifecycles/all" -Headers $header) | Where-Object {$_.Name -eq $lifecycleName}

    # Create project json payload
    $jsonPayload = @{
        Name = $projectName
        Description = $projectDescription
        ProjectGroupId = $projectGroup.Id
        LifeCycleId = $lifeCycle.Id
    }

    # Create project
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/projects" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$projectGroupName = "Default project group"
$lifecycleName = "Default lifecycle"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project group
    $projectGroup = $repositoryForSpace.ProjectGroups.FindByName($projectGroupName)

    # Get lifecycle
    $lifecycle = $repositoryForSpace.Lifecycles.FindByName($lifecycleName)

    # Create new project
    $project = $repositoryForSpace.Projects.CreateOrModify($projectName, $projectGroup, $lifecycle)
    $project.Save()
}
catch
{
    Write-Host $_.Exception.Message
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string projectName = "MyProject";
string projectGroupName = "Default project group";
string lifecycleName = "Default lifecycle";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project group
    var projectGroup = repositoryForSpace.ProjectGroups.FindByName(projectGroupName);

    // Get lifecycle
    var lifecycle = repositoryForSpace.Lifecycles.FindByName(lifecycleName);

    // Create project
    var project = repositoryForSpace.Projects.CreateOrModify(projectName, projectGroup, lifecycle);
    project.Save();
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";
# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$projectName = "My Project"
$runbookName = "My Runbook"
$environmentName = "Development"
$fileDownloadPath = "/path/to/download/artifact.txt"

# Note: Must include file extension in name.
$fileNameForOctopus = "artifact_filename_in_octopus.txt" 

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Get environment
$environments = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments?partialName=$([uri]::EscapeDataString($environmentName))&skip=0&take=100" -Headers $header 
$environment = $environments.Items | Where-Object { $_.Name -eq $environmentName }

# Get project
$projects = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100" -Headers $header 
$project = $projects.Items | Where-Object { $_.Name -eq $projectName }

# Get runbook
$runbooks = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbooks?partialName=$([uri]::EscapeDataString($runbookName))&skip=0&take=100" -Headers $header 
$runbook = $runbooks.Items | Where-Object { $_.Name -eq $runbookName }

# Get latest runbook run to that environment
$tasks = Invoke-RestMethod -Uri "$octopusURL/api/tasks?skip=0&runbook=$($runbook.Id)&project=$($project.Id)&spaces=$($space.Id)&environment=$($environment.Id)&includeSystem=false" -Headers $header 
$task = $tasks.Items | Where-Object {$_.State -eq "Success"} | Select-Object -First 1

$artifacts = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/artifacts?regarding=$($task.Id)" -Headers $header
$artifact = $artifacts.Items | Where-Object {$_.Filename -eq $fileNameForOctopus}

Write-Host "Getting file content"
Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/artifacts/$($artifact.Id)/content" -Headers $header -OutFile $fileDownloadPath
Write-Host "File content written to $fileDownloadPath"
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
var octopusURL = "https://your.octopus.app";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "Default";
string projectName = "My Project";
string runbookName = "My Runbook";
string environmentName = "Development";
string fileDownloadPath = @"/path/to/download/artifact.txt";

// Note: Must include file extension in name.
string filenameForOctopus = "artifact_filename_in_octopus.txt";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get environment
    var environment = repositoryForSpace.Environments.FindByName(environmentName);

    // Get project
    var project = repositoryForSpace.Projects.FindOne(n => n.Name == projectName);

    // Get runbook
    var runbook = repositoryForSpace.Runbooks.FindByName(project, runbookName);

    var task = repositoryForSpace.Tasks.FindOne(t => t.State == Octopus.Client.Model.TaskState.Success, pathParameters: new { skip = 0, project = project.Id, runbook = runbook.Id, environment = environment.Id, includeSystem = false });
    if (task == null)
    {
        Console.WriteLine("No matching runbook task found!");
        return;
    }

    var artifact = repository.Artifacts.FindOne(t => t.Filename == filenameForOctopus, pathParameters: new { regarding = task.Id });

    if (artifact == null)
    {
        Console.WriteLine("No matching artifact found!");
        return;
    }

    Console.WriteLine("Getting artifact file content");
    var artifactStream = repositoryForSpace.Artifacts.GetContent(artifact);
    using (var fileStream = File.Create(fileDownloadPath))
    {
        artifactStream.Seek(0, SeekOrigin.Begin);
        artifactStream.CopyTo(fileStream);
    }
    Console.WriteLine("File content written to: {0}", fileDownloadPath);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
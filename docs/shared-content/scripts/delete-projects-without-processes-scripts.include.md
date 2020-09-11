```powershell PowerShell (REST-API)
# Define working variables
$octopusURL = "https://youroctopusurl"
$octopusAPIKey = "API-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get project
    $projects = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

    # Loop through projects
    foreach ($project in $projects)
    {
        # Get deployment process
        $deploymentProcess = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header

        # Check to see if there's a process
        if (($null -eq $deploymentProcess.Steps) -or ($deploymentProcess.Steps.Count -eq 0))
        {
            # Delete project
            Invoke-RestMethod -Method Delete -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)" -Headers $header
        }
    }
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
$octopusURL = "https://youroctopusurl"
$octopusAPIKey = "API-KEY"
$spaceName = "default"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $projects = $repositoryForSpace.Projects.GetAll()

    # Loop through projects
    foreach ($project in $projects)
    {
        # Get deployment process
        $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

        # Check for emtpy process
        if (($null -eq $deploymentProcess.Steps) -or ($deploymentProcess.Steps.Count -eq 0))
        {
            # Delete project
            $repositoryForSpace.Projects.Delete($project)
        }
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
var spaceName = "default";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project
    var projects = repositoryForSpace.Projects.GetAll();

    // Loop through project
    foreach (var project in projects)
    {
        // Get deployment process
        var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);

        // Check for empty process
        if ((deploymentProcess.Steps == null) || (deploymentProcess.Steps.Count == 0))
        {
            // Delete project
            repositoryForSpace.Projects.Delete(project);
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

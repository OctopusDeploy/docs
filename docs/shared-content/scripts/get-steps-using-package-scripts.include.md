```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctopusurl"
$octopusAPIKey = "API-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$packageId = "PackageId"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get projects for space
    $projectList = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

    # Loop through projects
    foreach ($project in $projectList)
    {
        # Get project deployment process
        $deploymentProcess = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header

        # Get steps
        foreach ($step in $deploymentProcess.Steps)
        {
            $packages = $step.Actions.Packages
            if ($null -ne $packages)
            {
                $packageIds = $packages | Where-Object {$_.PackageId -eq $packageId}
                if($packageIds.Count -gt 0) {
                    Write-Host "Step: $($step.Name) of project: $($project.Name) is using package '$packageId'."
                }
            }
        }
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$packageId = "PackageId"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

$projectList = $repositoryForSpace.Projects.GetAll()

"Looking for steps with the package $($packageId) in them..."

foreach($project in $projectList)
{
    # Get deployment process    
    $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

    # Loop through steps
    foreach ($step in $deploymentProcess.Steps)
    {
        $packages = $step.Actions.Packages
        if ($null -ne $packages)
        {
            $packageIds = $packages | Where-Object {$_.PackageId -eq $packageId}
            if($packageIds.Count -gt 0) {
                Write-Host "Step: $($step.Name) of project: $($project.Name) is using package '$packageId'."
            }
        }
    }
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
string packageId = "PackageId";

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
    var projectList = repositoryForSpace.Projects.GetAll();

    // Loop through list
    foreach (var project in projectList)
    {
        // Get the deployment process
        var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);

        // Loop through steps
        foreach (var step in deploymentProcess.Steps)
        {
            // Select step packages
            var packages = step.Actions.SelectMany(a => a.Packages);
            if (packages.Any(p => p.PackageId == packageId))
            {
                Console.WriteLine(string.Format("Step [{0}] from project [{1}] is using the package [{2}]", step.Name, project.Name, packageId));
            }
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
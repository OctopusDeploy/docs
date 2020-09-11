```powershell PowerShell (REST-API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$projectName = "MyProject"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get project
    $project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

    # Get project triggers
    $projectTriggers = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/triggers" -Headers $header

    # Loop through triggers
    foreach ($projectTrigger in $projectTriggers.Items)
    {
        # Disable the trigger
        $projectTrigger.IsDisabled = $true
        Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/projecttriggers/$($projectTrigger.Id)" -Body ($projectTrigger | ConvertTo-Json -Depth 10) -Headers $header
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $project = $repositoryForSpace.Projects.FindByName($projectName)

    # Get project triggers
    $projectTriggers = $repositoryForSpace.ProjectTriggers.FindMany({param($p) $p.ProjectId -eq $project.Id})

    # Loop through triggers
    foreach ($projectTrigger in $projectTriggers)
    {
        # Disable trigger
        $projectTrigger.IsDisabled = $true
        $repositoryForSpace.ProjectTriggers.Modify($projectTrigger) | Out-Null
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
string projectName = "MyProject";

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
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get project triggers
    var projectTriggers = repositoryForSpace.Projects.GetAllTriggers(project);
    
    foreach (var projectTrigger in projectTriggers)
    {
        // Disable trigger
        projectTrigger.IsDisabled = true;
        repositoryForSpace.ProjectTriggers.Modify(projectTrigger);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

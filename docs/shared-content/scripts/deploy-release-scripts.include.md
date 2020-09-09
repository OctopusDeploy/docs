```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$headers = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default"
$projectName = "Your Project Name"
$releaseVersion = "0.0.1"
$environmentName = "Development"

try {
    
    # Get space id
    $spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces/all" -Headers $headers -ErrorVariable octoError
    $space = $spaces | Where-Object { $_.Name -eq $spaceName }
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Get project by name
    $projects = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $headers -ErrorVariable octoError
    $project = $projects | Where-Object { $_.Name -eq $projectName }
    Write-Host "Using Project named $($project.Name) with id $($project.Id)"

    # Get release by version
    $releases = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/releases" -Headers $headers -ErrorVariable octoError
    $release = $releases.Items | Where-Object { $_.Version -eq $releaseVersion }
    Write-Host "Using Release version $($release.Version) with id $($release.Id)"

    # Get environment by name
    $environments = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $headers -ErrorVariable octoError
    $environment = $environments | Where-Object { $_.Name -eq $environmentName }
    Write-Host "Using Environment named $($environment.Name) with id $($environment.Id)"

    # Create deployment
    $deploymentBody = @{
        ReleaseId     = $release.Id
        EnvironmentId = $environment.Id
    } | ConvertTo-Json

    Write-Host "Creating deployment with these values: $deploymentBody"
    $deployment = Invoke-RestMethod -Uri $octopusURL/api/$($space.Id)/deployments -Method POST -Headers $headers -Body $deploymentBody
}
catch {
    Write-Host "There was an error during the request: $($octoError.Message)"
}
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path 'path\to\Octopus.Client.dll'

$octopusURL = "https://youroctourl/"
$octopusAPIKey = "API-YOURAPIKEY"

$spaceName = "Default"
$projectName = "Your Project Name"
$releaseVersion = "0.0.1"
$environmentName = "Development"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

try {
    # Get space id
    $space = $repository.Spaces.FindByName($spaceName)
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific repository
    $repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

    # Get environment by name
    $environment = $repositoryForSpace.Environments.FindByName($environmentName)
    Write-Host "Using Environment named $($environment.Name) with id $($environment.Id)"

    # Get project by name
    $project = $repositoryForSpace.Projects.FindByName($projectName)
    Write-Host "Using Project named $($project.Name) with id $($project.Id)"

    # Get release by version
    $release = $repositoryForSpace.Projects.GetReleaseByVersion($project, $releaseVersion);
    Write-Host "Using release version $($release.Version) with id $($release.Id)"

    # Create deployment
    $deployment = New-Object Octopus.Client.Model.DeploymentResource -Property @{
        ReleaseId     = $release.Id
        EnvironmentId = $environment.Id
    }

    Write-Host "Creating deployment for release $($release.Version) of project $projectName to environment $environmentName"
    $deployment = $repositoryForSpace.Deployments.Create($deployment)
}
catch {
    Write-Host $_.Exception.Message
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

string spaceName = "Default";
string projectName = "ProjectName";
string releaseVersion = "0.0.1";
string environmentName = "Development";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get Environment
    var environment = repositoryForSpace.Environments.FindByName(environmentName);
    
    // Get project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get release
    var release = repositoryForSpace.Projects.GetReleaseByVersion(project, releaseVersion);

    // Create deployment
    var deployment = new Octopus.Client.Model.DeploymentResource
    {
        ReleaseId = release.Id,
        EnvironmentId = environment.Id
    };
    
    deployment = repositoryForSpace.Deployments.Create(deployment);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

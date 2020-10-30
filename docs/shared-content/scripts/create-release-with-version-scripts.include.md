```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$projectName = "MyProject"
$releaseVersion = "1.0.0.0"
$channelName = "Default"
$spaceName = "default"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Get channel
$channel = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/channels" -Headers $header).Items | Where-Object {$_.Name -eq $channelName}

# Create release payload
$releaseBody = @{
    ChannelId        = $channel.Id
    ProjectId        = $project.Id
    Version          = $releaseVersion
    SelectedPackages = @()
}

# Get deployment process template
$template = Invoke-RestMethod -Uri "$octopusURL/api/$($space.id)/deploymentprocesses/deploymentprocess-$($project.id)/template?channel=$($channel.Id)" -Headers $header

# Loop through the deployment process packages and add to release payload
$template.Packages | ForEach-Object {
    $uri = "$octopusURL/api/$($space.id)/feeds/$($_.FeedId)/packages/versions?packageId=$($_.PackageId)&take=1"
    $version = Invoke-RestMethod -Uri $uri -Method GET -Headers $header
    $version = $version.Items[0].Version

    $releaseBody.SelectedPackages += @{
        ActionName           = $_.ActionName
        PackageReferenceName = $_.PackageReferenceName
        Version              = $version
    }
}

# Create the release
$release = Invoke-RestMethod -Uri "$octopusURL/api/$($space.id)/releases" -Method POST -Headers $header -Body ($releaseBody | ConvertTo-Json -depth 10)

# Display created release
$release
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$channelName = "default"
$releaseVersion = "1.0.0.0"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space+repo
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $project = $repositoryForSpace.Projects.FindByName($projectName)

    # Get channel
    $channel = $repositoryForSpace.Channels.FindOne({param($c) $c.Name -eq $channelName -and $c.ProjectId -eq $project.Id})

    # Create a new release resource
    $release = New-Object Octopus.Client.Model.ReleaseResource
    $release.ChannelId = $channel.Id
    $release.ProjectId = $project.Id
    $release.Version = $releaseVersion
    $release.SelectedPackages = New-Object 'System.Collections.Generic.List[Octopus.Client.Model.SelectedPackage]'

    # Get deployment process
    $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

    # Get template
    $template = $repositoryForSpace.DeploymentProcesses.GetTemplate($deploymentProcess, $channel)

    # Loop through the deployment process packages and add to release payload
    $template.Packages | ForEach-Object {
        # Get feed 
        $feed = $repositoryForSpace.Feeds.Get($package.FeedId)
        $packageIds = @($package.PackageId)
        $version = ($repositoryForSpace.Feeds.GetVersions($feed,$packageIds) | Select-Object -First 1).Version
        $selectedPackage = New-Object Octopus.Client.Model.SelectedPackage
        $selectedPackage.ActionName = $_.ActionName
        $selectedPackage.PackageReferenceName = $_.PackageReferenceName
        $selectedPackage.Version = $version

        # Add to release
        $release.SelectedPackages.Add($selectedPackage)
    }

    # Create the release
    $releaseCreated = $repositoryForSpace.Releases.Create($release, $false)

    # Display created release
    $releaseCreated
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
var octopusAPIKey = "API-APIKEY";
var spaceName = "default";
string projectName = "MyProject";
string channelName = "Default";
string releaseVersion = "1.0.0.3";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space+repo
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get channel
    var channel = repositoryForSpace.Channels.FindOne(r => r.ProjectId == project.Id && r.Name == channelName);

    // Create release object
    Octopus.Client.Model.ReleaseResource release = new ReleaseResource();
    release.ChannelId = channel.Id;
    release.ProjectId = project.Id;
    release.Version = releaseVersion;
    release.SelectedPackages = new List<Octopus.Client.Model.SelectedPackage>();

    // Get deployment process
    var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);

    // Get template
    var template = repositoryForSpace.DeploymentProcesses.GetTemplate(deploymentProcess, channel);

    // Loop through the deployment process packages and add to release payload
    foreach (var package in template.Packages)
    {
        // Get feed
        var feed = repositoryForSpace.Feeds.Get(package.FeedId);
        var packageVersion = repositoryForSpace.Feeds.GetVersions(feed, new[] { package.PackageId }).First().Version;

        // Create selected package object
        Octopus.Client.Model.SelectedPackage selectedPackage = new SelectedPackage();
        selectedPackage.ActionName = package.ActionName;
        selectedPackage.PackageReferenceName = package.PackageReferenceName;
        selectedPackage.Version = packageVersion;

        // Add to release
        release.SelectedPackages.Add(selectedPackage);
    }

    // Create release
    var releaseCreated = repositoryForSpace.Releases.Create(release, false);
    Console.WriteLine("Created release with version: {0}", releaseCreated.Version);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
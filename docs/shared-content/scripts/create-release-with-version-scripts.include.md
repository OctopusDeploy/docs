```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$projectName = "MyProject"
$releaseVersion = "1.0.0.0"
$channelName = "Default"
$spaceName = "default"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get project
    $project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

    # Get deploymentProcess
    $deploymentProcess = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header

    # Get channel
    $channel = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/channels" -Headers $header).Items | Where-Object {$_.Name -eq $channelName}

    # Loop through the deployment process and gather selected packages
    $selectedPackages = @()
    foreach ($step in $deploymentProcess.Steps)
    {
        # Loop through the actions
        foreach($action in $step.Actions)
        {
            # Check for packages
            if ($null -ne $action.Packages)
            {
                # Loop through packages
                foreach ($package in $action.Packages)
                {
                    # Get latest version of package
                    $packageVersion = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/feeds/$($package.FeedId)/packages/versions?packageId=$($package.PackageId)&take=1" -Headers $header).Items[0].Version

                    # Add package to selected packages
                    $selectedPackages += @{
                        ActionName = $action.Name
                        Version = $packageVersion
                        PackageReferenceName = $package.PackageId
                    }
                }
            }
        }
    }

    # Create json payload
    $jsonPayload = @{
        ProjectId = $project.Id
        ChannelId = $channel.Id
        Version = $releaseVersion
        SelectedPackages = $selectedPackages
    }

    # Create the release
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/releases" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
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
$channelName = "default"
$releaseVersion = "1.0.0.0"

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

    # Get deployment process
    $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

    # Get channel
    $channel = $repositoryForSpace.Channels.FindOne({param($c) $c.Name -eq $channelName -and $c.ProjectId -eq $project.Id})

    # Gather selected packages
    $selectedPackages = @()
    foreach ($step in $deploymentProcess.Steps)
    {
        # Loop through actions
        foreach ($action in $step.Actions)
        {
            # Check for package
            if ($null -ne $action.Packages)
            {
                # Loop through packages
                foreach ($package in $action.Packages)
                {
                    # Get feed
                    $feed = $repositoryForSpace.Feeds.Get($package.FeedId)

                    # Check to see if it's the built in
                    if ($feed.FeedType -eq [Octopus.Client.Model.FeedType]::BuiltIn)
                    {
                        # Get the package version
                        $packageVersion = $repositoryForSpace.BuiltInPackageRepository.ListPackages($package.PackageId).Items[0].Version

                        # Create selected package pobject
                        $selectedPackage = New-Object Octopus.Client.Model.SelectedPackage
                        $selectedPackage.ActionName = $action.Name
                        $selectedPackage.PackageReferenceName = $package.PackageId
                        $selectedPackage.Version = $packageVersion

                        # Add to collection
                        $selectedPackages += $selectedPackage
                    }
                }
            }
        }
    }

    # Create a new release resource
    $release = New-Object Octopus.Client.Model.ReleaseResource
    $release.ChannelId = $channel.Id
    $release.ProjectId = $project.Id
    $release.Version = $releaseVersion

    # Add selected packages
    foreach ($selectedPackage in $selectedPackages)
    {
        $release.SelectedPackages.Add($selectedPackage)
    }

    # Create release
    $repositoryForSpace.Releases.Create($release, $false)
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
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get channel
    var channel = repositoryForSpace.Channels.FindOne(r => r.ProjectId == project.Id && r.Name == channelName);

    // Get deployment process
    var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);

    // Gather selected packages
    List<Octopus.Client.Model.SelectedPackage> selectedPackages = new List<SelectedPackage>();
    foreach (var step in deploymentProcess.Steps)
    {
        // Loop through actions
        foreach (var action in step.Actions)
        {
            // Check to see if packages are in this action
            if (action.Packages != null)
            {
                // Loop through packages
                foreach (var package in action.Packages)
                {
                    // Get feed
                    var feed = repositoryForSpace.Feeds.Get(package.FeedId);

                    // Check to see if it's built in
                    if (feed.FeedType == FeedType.BuiltIn)
                    {
                        // Get the package version
                        var packageVersion = repositoryForSpace.BuiltInPackageRepository.ListPackages(package.PackageId).Items[0].Version;

                        // Create selected package object
                        Octopus.Client.Model.SelectedPackage selectedPackage = new SelectedPackage();
                        selectedPackage.ActionName = action.Name;
                        selectedPackage.PackageReferenceName = package.PackageId;
                        selectedPackage.Version = packageVersion;

                        // Add to list
                        selectedPackages.Add(selectedPackage);
                    }
                }
            }
        }
    }

    // Create release object
    Octopus.Client.Model.ReleaseResource release = new ReleaseResource();
    release.ChannelId = channel.Id;
    release.ProjectId = project.Id;
    release.Version = releaseVersion;

    // Add packages
    foreach (var selectedPackage in selectedPackages)
    {
        release.SelectedPackages.Add(selectedPackage);
    }

    // Create release
    repositoryForSpace.Releases.Create(release, false);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
```powershell PowerShell
$octopusBaseURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$headers = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default"
$projectName = "Your Project Name"
$environmentName = "Dev"
$tenantNames = @("Customer A Name", "Customer B Name")

try {
    # Get space id
    $spaces = Invoke-WebRequest -Uri "$octopusBaseURL/spaces/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
    $space = $spaces | Where-Object { $_.Name -eq $spaceName }
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific url
    $octopusSpaceUrl = "$octopusBaseURL/$($space.Id)"

    # Get project by name
    $projects = Invoke-WebRequest -Uri "$octopusSpaceUrl/projects/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
    $project = $projects | Where-Object { $_.Name -eq $projectName }
    Write-Host "Using Project named $($project.Name) with id $($project.Id)"

    # Get environment by name
    $environments = Invoke-WebRequest -Uri "$octopusSpaceUrl/environments/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
    $environment = $environments | Where-Object { $_.Name -eq $environmentName }
    Write-Host "Using Environment named $($environment.Name) with id $($environment.Id)"

    # Get the deployment process template
    Write-Host "Fetching deployment process template"
    $template = Invoke-WebRequest -Uri "$octopusSpaceUrl/deploymentprocesses/deploymentprocess-$($project.id)/template" -Headers $headers | ConvertFrom-Json

    # Create the release body
    $releaseBody = @{
        ProjectId        = $project.Id
        Version          = $template.NextVersionIncrement
        SelectedPackages = @()
    }

    # Set the package version to the latest for each package
    # If you have channel rules that dictate what versions can be used, you'll need to account for that
    Write-Host "Getting step package versions"
    $template.Packages | ForEach-Object {
        $uri = "$octopusSpaceUrl/feeds/$($_.FeedId)/packages/versions?packageId=$($_.PackageId)&take=1"
        $version = Invoke-WebRequest -Uri $uri -Method GET -Headers $headers -Body $releaseBody -ErrorVariable octoError | ConvertFrom-Json
        $version = $version.Items[0].Version

        $releaseBody.SelectedPackages += @{
            ActionName           = $_.ActionName
            PackageReferenceName = $_.PackageReferenceName
            Version              = $version
        }
    }

    # Create release
    $releaseBody = $releaseBody | ConvertTo-Json
    Write-Host "Creating release with these values: $releaseBody"
    $release = Invoke-WebRequest -Uri $octopusSpaceUrl/releases -Method POST -Headers $headers -Body $releaseBody -ErrorVariable octoError | ConvertFrom-Json

    # Create deployment for each tenant
    $tenants = Invoke-WebRequest -Uri "$octopusSpaceUrl/tenants/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json

    $tenantNames | ForEach-Object {
        $name = $_
        $tenant = $tenants | Where-Object { $_.Name -eq $name }

        $deploymentBody = @{
            ReleaseId     = $release.Id
            EnvironmentId = $environment.Id
            TenantId      = $tenant.Id
        } | ConvertTo-Json

        Write-Host "Creating deployment with these values: $deploymentBody"
        $deployment = Invoke-WebRequest -Uri $octopusSpaceUrl/deployments -Method POST -Headers $headers -Body $deploymentBody -ErrorVariable octoError
    }
}
catch {
    Write-Host "There was an error during the request: $($octoError.Message)"
    exit
}
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path 'path\to\Octopus.Client.dll'

$octopusBaseURL = "https://youroctourl/"
$octopusAPIKey = "API-YOURAPIKEY"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusBaseURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

$spaceName = "Default"
$projectName = "Your Project Name"
$channelName = "Default"
$environmentName = "Dev"
$tenantNames = @("Customer A Name", "Customer B Name")

try {
    # Get space id
    $space = $repository.Spaces.FindByName($spaceName)
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific repository
    $repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

    # Get project by name
    $project = $repositoryForSpace.Projects.FindByName($projectName)
    Write-Host "Using Project named $($project.Name) with id $($project.Id)"

    # Get channel by name
    $channel = $repositoryForSpace.Channels.FindByName($project, $channelName)
    Write-Host "Using Channel named $($channel.Name) with id $($channel.Id)"

    # Get environment by name
    $environment = $repositoryForSpace.Environments.FindByName($environmentName)
    Write-Host "Using Environment named $($environment.Name) with id $($environment.Id)"

    # Get the deployment process template
    Write-Host "Fetching deployment process template"
    $process = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)
    $template = $repositoryForSpace.DeploymentProcesses.GetTemplate($process, $channel)

    Write-Host "Creating release for $projectName"
    $release = New-Object Octopus.Client.Model.ReleaseResource -Property @{
        ChannelId = $channel.Id
        ProjectId = $project.Id
        Version   = $template.NextVersionIncrement
    }

    # Set the package version to the latest for each package
    # If you have channel rules that dictate what versions can be used,
    #  you'll need to account for that by overriding the package version
    Write-Host "Getting action package versions"
    $template.Packages | ForEach-Object {
        $feed = $repositoryForSpace.Feeds.Get($_.FeedId)
        $latestPackage = [Linq.Enumerable]::FirstOrDefault($repositoryForSpace.Feeds.GetVersions($feed, @($_.PackageId)))

        $selectedPackage = New-Object Octopus.Client.Model.SelectedPackage -Property @{
            ActionName = $_.ActionName
            Version    = $latestPackage.Version
        }

        Write-Host "Using version $($latestPackage.Version) for action $($_.ActionName) package $($_.PackageId)"

        $release.SelectedPackages.Add($selectedPackage)
    }

    # Create release
    $release = $repositoryForSpace.Releases.Create($release, $false) # pass in $true if you want to ignore channel rules

    # Create deployment for each tenant
    $tenants = $repositoryForSpace.Tenants.FindByNames([Collections.Generic.List[String]]$tenantNames)

    $tenants | ForEach-Object {
        $tenant = $_

        $deployment = New-Object Octopus.Client.Model.DeploymentResource -Property @{
            ReleaseId     = $release.Id
            EnvironmentId = $environment.Id
            TenantId      = $tenant.Id
        }

        Write-Host "Creating deployment for release $($release.Version) of project $projectName to environment $environmentName and tenant $($tenant.Name)"
        $deployment = $repositoryForSpace.Deployments.Create($deployment)
    }
}
catch {
    Write-Host $_.Exception.Message
    exit
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";

var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

var spaceName = "Default";
var projectName = "Your Project Name";
var channelName = "Default";
var environmentName = "Dev";
var tenantNames = new string[] { "Customer A Name", "Customer B Name" };

try
{
    // Get the space to work in
    var space = repository.Spaces.FindByName(spaceName);
    Console.WriteLine($"Using Space named {space.Name} with id {space.Id}");

    // Create space specific repository
    var repositoryForSpace = repository.ForSpace(space);

    // Get project by name
    var project = repositoryForSpace.Projects.FindByName(projectName);
    Console.WriteLine($"Using Project named {project.Name} with id {project.Id}");

    // Get channel by name
    var channel = repositoryForSpace.Channels.FindByName(project, channelName);
    Console.WriteLine($"Using Channel named {channel.Name} with id {channel.Id}");

    // Get environment by name
    var environment = repositoryForSpace.Environments.FindByName(environmentName);
    Console.WriteLine($"Using Environment named {environment.Name} with id {environment.Id}");

    // Get the deployment process template
    Console.WriteLine("Fetching deployment process template");
    var process = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);
    var template = repositoryForSpace.DeploymentProcesses.GetTemplate(process, channel);

    var release = new Octopus.Client.Model.ReleaseResource
    {
        ChannelId = channel.Id,
        ProjectId = project.Id,
        Version = template.NextVersionIncrement
    };

    // Set the package version to the latest for each package
    // If you have channel rules that dictate what versions can be used
    //  you'll need to account for that by overriding the selected package version
    Console.WriteLine("Getting action package versions");
    foreach (var package in template.Packages)
    {

        var feed = repositoryForSpace.Feeds.Get(package.FeedId);
        var latestPackage = repositoryForSpace.Feeds.GetVersions(feed, new[] { package.PackageId }).FirstOrDefault();

        var selectedPackage = new Octopus.Client.Model.SelectedPackage
        {
            ActionName = package.ActionName,
            Version = latestPackage.Version
        };

        Console.WriteLine($"Using version {latestPackage.Version} for step {package.ActionName} package {package.PackageId}");

        release.SelectedPackages.Add(selectedPackage);
    }

    // # Create release
    release = repositoryForSpace.Releases.Create(release, false); // pass in $true if you want to ignore channel rules

    var tenants = repositoryForSpace.Tenants.FindByNames(tenantNames);

    foreach (var tenant in tenants)
    {
        // # Create deployment
        var deployment = new Octopus.Client.Model.DeploymentResource
        {
            ReleaseId = release.Id,
            EnvironmentId = environment.Id,
            TenantId = tenant.Id
        };

        Console.WriteLine($"Creating deployment for release {release.Version} of project {projectName} to environment {environmentName} and tenant {tenant.Name}");
        deployment = repositoryForSpace.Deployments.Create(deployment);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}
```

```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$projectName = "MyProject"
$runbookName = "MyRunbook"

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Get project
$projects = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100" -Headers $header 
$project = $projects.Items | Where-Object { $_.Name -eq $projectName }

# Get runbook
$runbooks = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbooks?partialName=$([uri]::EscapeDataString($runbookName))&skip=0&take=100" -Headers $header 
$runbook = $runbooks.Items | Where-Object { $_.Name -eq $runbookName }

# Get a runbook snapshot template
$runbookSnapshotTemplate = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/runbookProcesses/$($runbook.RunbookProcessId)/runbookSnapshotTemplate" -Headers $header 

# Create a runbook snapshot
$body = @{
    ProjectId = $project.Id
    RunbookId = $runbook.Id
    Name = $runbookSnapshotTemplate.NextNameIncrement
    Notes = $null
    SelectedPackages = @()
}

# Include latest built-in feed packages
foreach($package in $runbookSnapshotTemplate.Packages)
{
    if($package.FeedId -eq "feeds-builtin") {
        # Get latest package version
        $packages = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/feeds/feeds-builtin/packages/versions?packageId=$($package.PackageId)&take=1" -Headers $header 
        $latestPackage = $packages.Items | Select-Object -First 1
        $package = @{
            ActionName = $package.ActionName
            Version = $latestPackage.Version
            PackageReferenceName = $package.PackageReferenceName
        }
        
        $body.SelectedPackages += $package
    }
}

$body = $body | ConvertTo-Json -Depth 10
$runbookPublishedSnapshot = Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/runbookSnapshots?publish=true" -Body $body -Headers $header 

# Re-get runbook
$runbook = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/runbooks/$($runbook.Id)" -Headers $header 

# Publish the snapshot
$runbook.PublishedRunbookSnapshotId = $runbookPublishedSnapshot.Id
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/runbooks/$($runbook.Id)" -Body ($runbook | ConvertTo-Json -Depth 10) -Headers $header

Write-Host "Published runbook snapshot: $($runbookPublishedSnapshot.Id) ($($runbookPublishedSnapshot.Name))"
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string projectName = "MyProject";
string runbookName = "MyRunbook";

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

    // Get runbook
    var runbook = repositoryForSpace.Runbooks.FindByName(project, runbookName);

    // Get runbook process
    var runbookProcess = repositoryForSpace.RunbookProcesses.Get(runbook.RunbookProcessId);

    // Get runbook snapshot template
    var runbookSnapshotTemplate = repositoryForSpace.RunbookProcesses.GetTemplate(runbookProcess);

    // Create a runbook snapshot
    var runbookSnapshot = new RunbookSnapshotResource
    {
        ProjectId = project.Id,
        RunbookId = runbook.Id,
        Name = runbookSnapshotTemplate.NextNameIncrement,
        // Add optional notes next
        Notes = null,
        SelectedPackages = new List<Octopus.Client.Model.SelectedPackage>()
    };

    // Include latest built-in feed packages
    foreach (var package in runbookSnapshotTemplate.Packages)
    {
        if (package.FeedId == "feeds-builtin")
        {
            // Get latest package version
            var packages = repositoryForSpace.BuiltInPackageRepository.ListPackages(package.PackageId, take: 1);
            var latestPackage = packages.Items.FirstOrDefault();
            if (latestPackage == null)
            {
                throw new Exception("Couldnt find latest package for " + package.PackageId);
            }

            runbookSnapshot.SelectedPackages.Add(new SelectedPackage { ActionName = package.ActionName, Version = latestPackage.Version, PackageReferenceName = package.PackageReferenceName });
        }
    }

    // Create new snapshot
    var runbookPublishedSnapshot = repositoryForSpace.RunbookSnapshots.Create(runbookSnapshot, new { publish = true });

    // Re-retrieve runbook
    runbook = repositoryForSpace.Runbooks.Get(runbook.Id);

    // Assign the snapshot as the published one.
    runbook.PublishedRunbookSnapshotId = runbookPublishedSnapshot.Id;
    repositoryForSpace.Runbooks.Modify(runbook);
    Console.WriteLine("Published runbook snapshot: {0} ({1})", runbookPublishedSnapshot.Id, runbookPublishedSnapshot.Name);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    Console.ReadLine();
    return;
}
```
```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"
$snapshotName = "Snapshot 9PNENH6"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get project
    $project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

    # Get runbook
    $runbook = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/runbooks/all" -Headers $header) | Where-Object {$_.Name -eq $runbookName -and $_.ProjectId -eq $project.Id}

    # Get the runbook process
    $runbookProcess = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/runbookProcesses/$($runbook.RunbookProcessId)" -Headers $header

    # Loop through steps and gather referenced packages
    $selectedPackages = @()
    foreach ($step in $runbookProcess.Steps)
    {
        # Loop through the actions of the step
        foreach ($action in $step.Actions)
        {
            # Check to see if action references a package
            if ($null -ne $action.Packages)
            {
                # Loop through selected packages
                foreach ($package in $action.Packages)
                {
                    # Get latest version of package
                    $packageVersion = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/feeds/$($package.FeedId)/packages/versions?packageId=$($package.PackageId)&take=1" -Headers $header).Items[0].Version
                    
                    # Add to selected packages array
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
        RunbookId = $runbook.Id
        Name = $snapshotName
        SelectedPackages = $selectedPackages
    }

    # Publish the snapshot
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/runbookSnapShots?publish=true" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
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
$runbookName = "MyRunbook"
$snapshotName = "Snapshot 9PNENH7"

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

    # Get runbook
    $runbook = $repositoryForSpace.Runbooks.FindMany({param($r) $r.Name -eq $runbookName}) | Where-Object {$_.ProjectId -eq $project.Id}

    # Get the runbook process
    $runbookProcess = $repositoryForSpace.RunbookProcesses.Get($runbook.RunbookProcessId)

    # Gather selected packages
    $selectedPackages = @()
    foreach ($step in $runbookProcess.Steps)
    {
        # Loop through actions
        foreach ($action in $step.Actions)
        {
            # Check to see if action references packages
            if ($null -ne $action.Packages)
            {
                # Loop through packages
                foreach ($package in $action.Packages)
                {
                    # Get reference to feed
                    $feed = $repositoryForSpace.Feeds.Get($package.FeedId)
                    
                    # Check to see if built in
                    if ($feed.Id -eq "feeds-builtin")
                    {
                        # Get package version
                        $packageVersion = $repositoryForSpace.BuiltInPackageRepository.ListPackages($package.PackageId).Items[0].Version

                        # Create selected package object
                        $selectedPackage = New-Object Octopus.Client.Model.SelectedPackage
                        $selectedPackage.ActionName = $action.Name
                        $selectedPackage.PackageReferenceName = ""
                        $selectedPackage.StepName = $step.Name
                        $selectedPackage.Version = $packageVersion

                        # Add to collection
                        $selectedPackages += $selectedPackage
                    }
                }
            }
        }
    }

    # Create new runbook snapshot resource object
    $runbookSnapshot = New-Object Octopus.Client.Model.RunbookSnapshotResource
    $runbookSnapshot.Name = $snapshotName
    $runbookSnapshot.ProjectId = $project.Id
    $runbookSnapshot.RunbookId = $runbook.Id
    $runbookSnapshot.SpaceId = $space.Id
    
    # Add selected packages
    foreach ($item in $selectedPackages)
    {
        # Add to collection
        $runbookSnapshot.SelectedPackages.Add($item)
    }

    # Create the snapshot
    $snapshot = $repositoryForSpace.RunbookSnapshots.Create($runbookSnapshot)

    # Publish snapshot
    $runbook.PublishedRunbookSnapshotId = $snapshot.Id
    $repositoryForSpace.Runbooks.Modify($runbook)
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
string spaceName = "default";
string projectName = "MyProject";
string runbookName = "MyRunbook";
string snapshotName = "Snapshot 7PNENH8";

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
    var runbook = repositoryForSpace.Runbooks.FindMany(n => n.Name == runbookName && n.ProjectId == project.Id)[0];

    // Get runbook process
    var runbookProcess = repositoryForSpace.RunbookProcesses.Get(runbook.RunbookProcessId);

    // Gather selected packages
    List<Octopus.Client.Model.SelectedPackage> selectedPackages = new List<SelectedPackage>();
    foreach (var step in runbookProcess.Steps)
    {
        foreach (var action in step.Actions)
        {
            // Check for packages
            if (action.Packages != null)
            {
                // Loop through packages
                foreach (var package in action.Packages)
                {
                    // Get feed reference
                    var feed = repositoryForSpace.Feeds.Get(package.FeedId);

                    // Check to see if it's the built in one
                    if (feed.Id == "feeds-builtin")
                    {
                        // Get package version
                        var packageVersion = repositoryForSpace.BuiltInPackageRepository.ListPackages(package.PackageId).Items[0].Version;

                        // Create selected package object
                        Octopus.Client.Model.SelectedPackage selectedPackage = new SelectedPackage();
                        selectedPackage.ActionName = action.Name;
                        selectedPackage.PackageReferenceName = "";
                        selectedPackage.Version = packageVersion;

                        // Add to collection
                        selectedPackages.Add(selectedPackage);
                    }
                }
            }
        }
    }

    // Create new runbook snapshot resource object
    Octopus.Client.Model.RunbookSnapshotResource runbookSnapshot = new RunbookSnapshotResource();
    runbookSnapshot.Name = snapshotName;
    runbookSnapshot.ProjectId = project.Id;
    runbookSnapshot.RunbookId = runbook.Id;
    runbookSnapshot.SpaceId = space.Id;
    runbookSnapshot.SelectedPackages = selectedPackages;

    // Create snapshot
    var snapshot = repositoryForSpace.RunbookSnapshots.Create(runbookSnapshot);

    // Publish the snapshot
    runbook.PublishedRunbookSnapshotId = snapshot.Id;
    repositoryForSpace.Runbooks.Modify(runbook);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
```python Python3
import json
import requests

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()

    return json.loads(response.content.decode('utf-8'))

def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)

space_name = 'Default'
project_name = 'Your project'
runbook_name = 'Your runbook'
runbook_snapshot_name = 'Snapshot HGYTH7J'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project = get_by_name('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']), project_name)
runbook = get_by_name('{0}/{1}/runbooks/all'.format(octopus_server_uri, space['Id']), runbook_name)
runbook_process = get_octopus_resource('{0}/{1}/runbookProcesses/{2}'.format(octopus_server_uri, space['Id'], runbook['RunbookProcessId']))

runbook_selected_packages = []

for step in runbook_process['Steps']:
    for action in step['Actions']:
        if action['Packages'] is None:
            continue
        for action_package in action['Packages']:
            package_id = action_package['PackageId']
            package_details = get_octopus_resource('{0}/{1}/feeds/{2}/packages/versions?packageId={3}&take=1'.format(octopus_server_uri, space['Id'], action_package['FeedId'], package_id))
            package_version = package_details['Items'][0]['Version']
            selected_package = {
                'ActionName': action['Name'],
                'Version': package_version,
                'PackageReferenceName': ""
            }
            runbook_selected_packages.append(selected_package)

snapshot_to_publish = {
    'ProjectId': project['Id'],
    'RunbookId':runbook['Id'],
    'Name': runbook_snapshot_name,
    'SelectedPackages': runbook_selected_packages
}

uri = '{0}/{1}/runbookSnapShots?publish=true'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=snapshot_to_publish)
response.raise_for_status()
```
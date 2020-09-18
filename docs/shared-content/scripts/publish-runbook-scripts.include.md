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
    $runbook = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbooks" -Headers $header).Items | Where-Object {$_.Name -eq $runbookName}
    
    # Get the runbook process
    $runbookSnapshot = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbookSnapshots" -Headers $header).Items | Where-Object {$_.Name -eq $snapshotName}
    
    # Publish the snapshot
    $runbook.PublishedRunbookSnapshotId = $runbookSnapshot.Id
    Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/runbooks/$($runbook.Id)" -Body ($runbook | ConvertTo-Json -Depth 10) -Headers $header
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
    $runbook = $repositoryForSpace.Runbooks.FindByName($project, $runbookName)
    
    # Get the runbook snapshot
    $runbookSnapshot = $repositoryForSpace.RunbookSnapshots.FindOne({param($r) $r.Name -eq $snapshotName -and $r.ProjectId -eq $project.Id})

    # Publish snapshot
    $runbook.PublishedRunbookSnapshotId = $runbookSnapshot.Id
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
	var runbook = repositoryForSpace.Runbooks.FindByName(project, runbookName);

	// Get runbook snapshot
	var runbookSnapshot = repositoryForSpace.RunbookSnapshots.FindOne(rs => rs.ProjectId == project.Id && rs.Name == snapshotName);

	// Publish the snapshot
	runbook.PublishedRunbookSnapshotId = runbookSnapshot.Id;
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

def get_item_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources['Items'] if x['Name'] == name), None)

space_name = 'Default'
project_name = 'Your project'
runbook_name = 'Your runbook'
snapshot_name = 'Snapshot YVVCRLF'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project = get_by_name('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']), project_name)
runbook = get_item_by_name('{0}/{1}/projects/{2}/runbooks'.format(octopus_server_uri, space['Id'], project['Id']), runbook_name)
snapshot = get_item_by_name('{0}/{1}/projects/{2}/runbookSnapshots/'.format(octopus_server_uri, space['Id'], project['Id']), snapshot_name)

runbook['PublishedRunbookSnapshotId'] = snapshot['Id']

uri = '{0}/{1}/runbooks/{2}'.format(octopus_server_uri, space['Id'], runbook['Id'])
response = requests.put(uri, headers=headers, json=runbook)
response.raise_for_status()
```
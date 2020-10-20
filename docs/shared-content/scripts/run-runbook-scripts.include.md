```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"
$environmentNames = @("Development", "Staging")
$environmentIds = @()

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Get runbook
$runbook = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/runbooks/all" -Headers $header) | Where-Object {$_.Name -eq $runbookName -and $_.ProjectId -eq $project.Id}

# Get environments
$environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
foreach ($environment in $environments)
{
    $environmentIds += $environment.Id
}

# Run runbook per selected environment
foreach ($environmentId in $environmentIds)
{
    # Create json payload
    $jsonPayload = @{
        RunbookId = $runbook.Id
        RunbookSnapshotId = $runbook.PublishedRunbookSnapshotId
        EnvironmentId = $environmentId
    }

    # Run runbook
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/runbookRuns" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
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
$runbookName = "MyRunbook"
$environmentNames = @("Test", "Production")

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

    # Get environments
    $environments = $repositoryForSpace.Environments.GetAll() | Where-Object {$environmentNames -contains $_.Name}

    # Loop through environments
    foreach ($environment in $environments)
    {
        # Create a new runbook run object
        $runbookRun = New-Object Octopus.Client.Model.RunbookRunResource
        $runbookRun.EnvironmentId = $environment.Id
        $runbookRun.ProjectId = $project.Id
        $runbookRun.RunbookSnapshotId = $runbook.PublishedRunbookSnapshotId
        $runbookRun.RunbookId = $runbook.Id

        # Execute runbook
        $repositoryForSpace.RunbookRuns.Create($runbookRun)
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
string spaceName = "default";
string projectName = "MyProject";
string runbookName = "MyRunbook";
string[] environmentNames = { "Development", "Production" };

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

    // Get environments
    foreach (var environmentName in environmentNames)
    {
        // Get environment
        var environment = repositoryForSpace.Environments.FindByName(environmentName);

        // Create runbook run object
        Octopus.Client.Model.RunbookRunResource runbookRun = new RunbookRunResource();
        runbookRun.EnvironmentId = environment.Id;
        runbookRun.RunbookId = runbook.Id;
        runbookRun.ProjectId = project.Id;
        runbookRun.RunbookSnapshotId = runbook.PublishedRunbookSnapshotId;

        // Execute runbook
        repositoryForSpace.RunbookRuns.Create(runbookRun);
    }
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
project_name = 'Your Project'
runbook_name = 'Your Runbook'
environment_names = ['Development', 'Test']
environments = []

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project = get_by_name('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']), project_name)
runbook = get_by_name('{0}/{1}/runbooks/all'.format(octopus_server_uri, space['Id']), runbook_name)

environments = get_octopus_resource(
    '{0}/{1}/environments/all'.format(octopus_server_uri, space['Id']))
environments = [e['Id']
                for e in environments if e['Name'] in environment_names]

for environmentId in environments:
    print('Running runbook {0} in {1}'.format(runbook_name, environmentId))
    uri = '{0}/{1}/runbookRuns'.format(octopus_server_uri, space['Id'])
    runbook_run = {
        'RunbookId': runbook['Id'],
        'RunbookSnapshotId': runbook['PublishedRunbookSnapshotId'],
        'EnvironmentId': environmentId
    }
    response = requests.post(uri, headers=headers, json=runbook_run)
    response.raise_for_status()
```

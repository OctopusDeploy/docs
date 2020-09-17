```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get project
    $project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

    # Create json payload
    $jsonPayload = @{
        Name = $runbookName
        ProjectId = $project.Id
        EnvironmentScope = "All"
        RunRetentionPolicy = @{
            QuantityToKeep = 100
            ShouldKeepForever = $false
        }   
    }

    # Create the runbook
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/runbooks" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
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

    # Create runbook retention object
    $runbookRetentionPolicy = New-Object Octopus.Client.Model.RunbookRetentionPeriod
    $runbookRetentionPolicy.QuantityToKeep = 100
    $runbookRetentionPolicy.ShouldKeepForever = $false


    # Create runbook object
    $runbook = New-Object Octopus.Client.Model.RunbookResource
    $runbook.Name = $runbookName
    $runbook.ProjectId = $project.Id
    $runbook.RunRetentionPolicy = $runbookRetentionPolicy
    
    # Save
    $repositoryForSpace.Runbooks.Create($runbook)
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

    // Create runbook retention object
    var runbookRetentionPolicy = new Octopus.Client.Model.RunbookRetentionPeriod();
    runbookRetentionPolicy.QuantityToKeep = 100;
    runbookRetentionPolicy.ShouldKeepForever = false;

    // Create runbook object
    var runbook = new Octopus.Client.Model.RunbookResource();
    runbook.Name = runbookName;
    runbook.ProjectId = project.Id;
    runbook.RunRetentionPolicy = runbookRetentionPolicy;

    // Save
    repositoryForSpace.Runbooks.Create(runbook);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    Console.ReadLine();
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
project_name = 'Your Project Name'
runbook_name = 'Your new runbook name'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project = get_by_name('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']), project_name)

runbook = {
    'Id': None,
    'Name': runbook_name,
    'ProjectId': project['Id'],
    'EnvironmentScope': 'All',
    'RunRetentionPolicy': {
        'QuantityToKeep': 100,
        'ShouldKeepForever': False
    }
}

uri = '{0}/{1}/runbooks'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=runbook)
response.raise_for_status()
```
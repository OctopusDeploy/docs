```powershell PowerShell (REST-API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
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
    $projectTriggers = $repositoryForSpace.Projects.GetAllTriggers($project)

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

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project = get_by_name('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']), project_name)
project_triggers = get_octopus_resource('{0}/{1}/projects/{2}/triggers'.format(octopus_server_uri, space['Id'], project['Id']))

for trigger in project_triggers['Items']:
    print('Disabling project trigger {0} ({1})'.format(trigger['Name'], trigger['Id']))
    trigger['IsDisabled'] = True
    uri = '{0}/{1}/projecttriggers/{2}'.format(octopus_server_uri, space['Id'], trigger['Id'])
    response = requests.put(uri, headers=headers, json=trigger)
    response.raise_for_status()
```

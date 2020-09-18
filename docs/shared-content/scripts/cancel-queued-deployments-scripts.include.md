```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get tasks
    $tasks = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/tasks" -Headers $header).Items | Where-Object {$_.State -eq "Queued" -and $_.HasBeenPickedUpByProcessor -eq $false -and $_.Name -eq "Deploy"}

    # Loop through tasks
    foreach ($task in $tasks)
    {
        # Cancel task
        Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tasks/$($task.Id)/cancel" -Headers $header
    }
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

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get tasks
    $queuedDeployments = $repositoryForSpace.Tasks.FindAll() | Where-Object {$_.State -eq "Queued" -and $_.HasBeenPickedUpByProcessor -eq $false -and $_.Name -eq "Deploy"}

    # Loop through results
    foreach ($task in $queuedDeployments)
    {
        $repositoryForSpace.Tasks.Cancel($task)
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
var octopusURL = "http://octotemp";
var octopusAPIKey = "API-DY8544IVQCQX8JXCGNH4URENNY";
string spaceName = "default";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get queued deployemnts
    var queuedDeployments = repositoryForSpace.Tasks.FindAll().Where(d => d.State == TaskState.Queued && !d.HasBeenPickedUpByProcessor && d.Name == "Deploy");

    // Loop through results
    foreach (var task in queuedDeployments)
    {
        // Cancel deployment
        repositoryForSpace.Tasks.Cancel(task);
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

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
tasks = get_octopus_resource('{0}/{1}/tasks'.format(octopus_server_uri, space['Id']))
queued = [task for task in tasks['Items'] if task['State'] == 'Queued' and task['Name'] == 'Deploy' and not task['HasBeenPickedUpByProcessor']]

for task in queued:
    uri = '{0}/{1}/tasks/{2}/cancel'.format(octopus_server_uri, space['Id'], task['Id'])
    response = requests.post(uri, headers=headers)
    response.raise_for_status()
```

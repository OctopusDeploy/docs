```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

$canContinue = $true

while ($canContinue -eq $true)
{
    # Get tasks
    $tasks = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/tasks?States=Queued&Name=Deploy" -Headers $header

    # Loop through tasks
    foreach ($task in $tasks.Items)
    {
        # Cancel task
        Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tasks/$($task.Id)/cancel" -Headers $header
    }

    $canContinue = $task.NumberOfPages -gt 1
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

    var canContinue = true;
    
    while (canContinue == true)
    {
        // Get queued deployemnts
        var queuedDeployments = client.List<TaskResource>(repositoryForSpace.Link("Tasks"), new { states = "Queued", name = "Deploy", take = "50", skip = "0"});

        // Loop through results
        foreach (var task in queuedDeployments.Items)
        {
            // Cancel deployment
            repositoryForSpace.Tasks.Cancel(task);
        }
        
        canContinue = queuedDeployments.Items.Count > 0;
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

results = 1

while results > 0
    tasks = get_octopus_resource('{0}/{1}/tasks?States=Queued&Name=Deploy'.format(octopus_server_uri, space['Id']))
    queued = [task for task in tasks['Items'] if not task['HasBeenPickedUpByProcessor']]

    results = len(queued)

    for task in queued:
        uri = '{0}/{1}/tasks/{2}/cancel'.format(octopus_server_uri, space['Id'], task['Id'])
        response = requests.post(uri, headers=headers)
        response.raise_for_status()
```

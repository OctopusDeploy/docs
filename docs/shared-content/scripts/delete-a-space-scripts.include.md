```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "New Space"

try {
    Write-Host "Getting space '$spaceName'"
    $spaces = (Invoke-WebRequest $octopusURL/api/spaces?take=21000 -Headers $header -Method Get -ErrorVariable octoError).Content | ConvertFrom-Json

    $space = $spaces.Items | Where-Object Name -eq $spaceName

    if ($null -eq $space) {
        Write-Host "Could not find space with name '$spaceName'"
        exit
    }

    $space.TaskQueueStopped = $true
    $body = $space | ConvertTo-Json

    Write-Host "Stopping space task queue"
    (Invoke-WebRequest $octopusURL/$($space.Links.Self) -Headers $header -Method PUT -Body $body -ErrorVariable octoError) | Out-Null

    Write-Host "Deleting space"
    (Invoke-WebRequest $octopusURL/$($space.Links.Self) -Headers $header -Method DELETE -ErrorVariable octoError) | Out-Null

    Write-Host "Action Complete"
}
catch {
    Write-Host "There was an error during the request: $($octoError.Message)"
    exit
}
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path 'path\to\Octopus.Client.dll'

$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

$spaceName = "New Space"

$space = $repository.Spaces.FindByName($spaceName)

if ($null -eq $space) {
    Write-Host "The space $spaceName does not exist."
    exit
}

try {
    $space.TaskQueueStopped = $true

    $repository.Spaces.Modify($space) | Out-Null
    $repository.Spaces.Delete($space) | Out-Null
} catch {
    Write-Host $_.Exception.Message
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

var OctopusURL = "https://youroctourl";
var OctopusAPIKey = "API-YOURAPIKEY";

var endpoint = new OctopusServerEndpoint(OctopusURL, OctopusAPIKey);
var repository = new OctopusRepository(endpoint);

var spaceName = "New Space";

try
{
    Console.WriteLine($"Getting space '{spaceName}'.");
    var space = repository.Spaces.FindByName(spaceName);

    if (space == null)
    {
        Console.WriteLine($"Could not find space '{spaceName}'.");
        return;
    }

    Console.WriteLine("Stopping task queue.");
    space.TaskQueueStopped = true;

    repository.Spaces.Modify(space);

    Console.WriteLine("Deleting space");
    repository.Spaces.Delete(space);
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

space_name = "Your Space name"

def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()

    return json.loads(response.content.decode('utf-8'))

def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
space['TaskQueueStopped'] = True

uri = '{0}/spaces/{1}'.format(octopus_server_uri, space['Id'])
response = requests.put(uri, headers=headers, json=space)
response.raise_for_status()

uri = '{0}/spaces/{1}'.format(octopus_server_uri, space['Id'])
response = requests.delete(uri, headers=headers)
response.raise_for_status()
```

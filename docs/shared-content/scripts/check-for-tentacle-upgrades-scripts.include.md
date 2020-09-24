```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://your.octopus.app/api"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"

try {
    # Get space id
    $spaces = Invoke-RestMethod -Method Get -Uri "$octopusBaseURL/spaces/all" -Headers $headers -ErrorVariable octoError
    $space = $spaces | Where-Object { $_.Name -eq $spaceName }
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific url
    $octopusSpaceUrl = "$octopusBaseURL/$($space.Id)"

    # Get tentacles
    $targets = Invoke-RestMethod -Method Get -Uri "$octopusSpaceUrl/machines/all" -Headers $headers -ErrorVariable octoError
    $workers = Invoke-RestMethod -Method Get -Uri "$octopusSpaceUrl/workers/all" -Headers $headers -ErrorVariable octoError

    ($targets + $workers)
    | Where-Object { $_.Endpoint -and $_.Endpoint.TentacleVersionDetails }
    | ForEach-Object {
        Write-Host "Checking Tentacle version for $($_.Name)"
        $details = $_.Endpoint.TentacleVersionDetails

        Write-Host "`tTentacle status: $($_.HealthStatus)"
        Write-Host "`tCurrent version: $($details.Version)"
        Write-Host "`tUpgrade suggested: $($details.UpgradeSuggested)"
        Write-Host "`tUpgrade required: $($details.UpgradeRequired)"
    }
}
catch {
    Write-Host "There was an error during the request: $($octoError.Message)"
    exit
}
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path 'C:\path\to\Octopus.Client.dll'

$octopusBaseURL = "https://your.octopus.app/api"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "Default"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusBaseURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try {
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get Tentacles
    $targets = $repositoryForSpace.Machines.GetAll()
    $workers = $repositoryForSpace.Workers.GetAll()

    ($targets + $workers)
    | Where-Object { $_.Endpoint -and $_.Endpoint.TentacleVersionDetails }
    | ForEach-Object {
        Write-Host "Checking Tentacle version for $($_.Name)"
        $details = $_.Endpoint.TentacleVersionDetails

        Write-Host "`tTentacle status: $($_.HealthStatus)"
        Write-Host "`tCurrent version: $($details.Version)"
        Write-Host "`tUpgrade suggested: $($details.UpgradeSuggested)"
        Write-Host "`tUpgrade required: $($details.UpgradeRequired)"
    }
}
catch {
    Write-Host "There was an error during the request: $($octoError.Message)"
    exit
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "C:\path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using Octopus.Client.Model.Endpoints;

var octopusURL = "https://your.octopus.app";
var octopusAPIKey = "API-YOURAPIKEY";

var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

var spaceName = "Default";

void WriteTentacleStatus(MachineBasedResource tentacle)
{
    var endpoint = tentacle.Endpoint as TentacleEndpointResource;
    if (endpoint == null) return;

    Console.WriteLine("Checking Tentacle version for {0}", tentacle.Name);
    Console.WriteLine("\tTentacle status:  {0}", tentacle.HealthStatus);
    Console.WriteLine("\tCurrent version: {0}", endpoint.TentacleVersionDetails.Version);
    Console.WriteLine("\tUpgrade suggested: {0}", endpoint.TentacleVersionDetails.UpgradeSuggested);
    Console.WriteLine("\tUpgrade required: {0}", endpoint.TentacleVersionDetails.UpgradeRequired);
}

try
{
    // Get the space to work in
    var space = repository.Spaces.FindByName(spaceName);
    Console.WriteLine($"Using Space named {space.Name} with id {space.Id}");

    // Create space specific repository
    var repositoryForSpace = repository.ForSpace(space);

    // Get Tentacles
    var targets = repositoryForSpace.Machines.FindAll();
    var workers = repositoryForSpace.Workers.FindAll();

    foreach (var target in targets)
    {
        WriteTentacleStatus(target);
    }

    foreach (var worker in workers)
    {
        WriteTentacleStatus(worker);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
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
targets = get_octopus_resource('{0}/{1}/machines/all'.format(octopus_server_uri,
                                                             space['Id']))
workers = get_octopus_resource('{0}/{1}/workers/all'.format(octopus_server_uri,
                                                            space['Id']))

tentacles = [tentacle for tentacle in targets + workers
             if 'Endpoint' in tentacle and 'TentacleVersionDetails' in tentacle['Endpoint']]

for tentacle in tentacles:
    details = tentacle['Endpoint']['TentacleVersionDetails']
    print('Checking Tentacle version for {0}'.format(tentacle['Name']))
    print('\tTentacle status: {0}'.format(tentacle['HealthStatus']))
    print('\tCurrent version: {0}'.format(details['Version']))
    print('\tUpgrade suggested: {0}'.format(details['UpgradeSuggested']))
    print('\tUpgrade required: {0}'.format(details['UpgradeRequired']))
```

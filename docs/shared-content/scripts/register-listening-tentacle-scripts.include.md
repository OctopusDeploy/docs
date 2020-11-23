```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$hostName = "MyHost"
$tentaclePort = "10933"
$environmentNames = @("Development", "Production")
$roles = @("MyRole")
$environmentIds = @()

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get environment Ids
$environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
foreach ($environment in $environments)
{
    $environmentIds += $environment.Id
}

# Discover new target
$newTarget = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/discover?host=$hostName&port=$tentaclePort&type=TentaclePassive" -Headers $header

# Create JSON payload
$jsonPayload = @{
    Endpoint = @{
        CommunicationStyle = $newTarget.Endpoint.CommunicationStyle
        Thumbprint = $newTarget.Endpoint.Thumbprint
        Uri = $newTarget.Endpoint.Uri
    }
    EnvironmentIds = $environmentIds
    Name = $newTarget.Name
    Roles = $roles
    Status = "Unknown"
    IsDisabled = $false
}

# Register new target to space
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/machines" -Headers $header -Body ($jsonPayload | ConvertTo-Json -Depth 10)
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$hostName = "MyHost"
$tentaclePort = "10933"
$environmentNames = @("Development", "Production")
$roles = @("MyRole")

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get environment ids
    $environments = $repositoryForSpace.Environments.GetAll() | Where-Object {$environmentNames -contains $_.Name}

    # Discover host
    $newTarget = $repositoryForSpace.Machines.Discover($hostName, $tentaclePort)

    # Add properties to host
    foreach ($environment in $environments)
    {
        # Add to target
        $newTarget.EnvironmentIds.Add($environment.Id) | Out-Null
    }

    foreach ($role in $roles)
    {
        # Add to target
        $newTarget.Roles.Add($role) | Out-Null
    }
    $newTarget.IsDisabled = $false

    # Add to machine to space
    $repositoryForSpace.Machines.Create($newTarget)
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
string hostName = "MyHost";
int tentaclePort = 10933;
string[] environmentNames = { "Development", "Production" };
string[] roles = { "MyRole" };
List<string> environmentIds = new List<string>();

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get environments
    foreach (var environmentName in environmentNames)
    {
        environmentIds.Add(repositoryForSpace.Environments.FindByName(environmentName).Id);
    }

    // Discover host
    var newTarget = repositoryForSpace.Machines.Discover(hostName, tentaclePort);

    // Fill in details for target
    foreach (string environmentId in environmentIds)
    {
        // Add to target
        newTarget.EnvironmentIds.Add(environmentId);
    }

    foreach (string role in roles)
    {
        newTarget.Roles.Add(role);
    }

    // Add machine to space
    repositoryForSpace.Machines.Create(newTarget);
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
environment_names = ['Development', 'Test']

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
environments = get_octopus_resource('{0}/{1}/environments/all'.format(octopus_server_uri, space['Id']))
environment_ids = [environment['Id'] for environment in environments if environment['Name'] in environment_names]

params = {
    'host': 'your target hostname',
    'port': '10933',
    'type': 'TentaclePassive'
}
uri = '{0}/{1}/machines/discover'.format(octopus_server_uri, space['Id'])
response = requests.get(uri, headers=headers, params=params)
response.raise_for_status()

discovered = json.loads(response.content.decode('utf-8'))

target = {
    'Endpoint': discovered['Endpoint'],
    'EnvironmentIds': environment_ids,
    'Name': discovered['Name'],
    'Roles': ['your-target-role']
}

uri = '{0}/{1}/machines'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=target)
response.raise_for_status()
```

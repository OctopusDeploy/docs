<details data-group="run-healthcheck-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "http://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$Description = "Health check started from Powershell script"
$TimeOutAfterMinutes = 5
$MachineTimeoutAfterMinutes = 5

# Choose an Environment, a set of machine names, or both.
$EnvironmentName = "Development"
$MachineNames = @()

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get EnvironmentId
$EnvironmentID = $null
if([string]::IsNullOrWhiteSpace($EnvironmentName) -eq $False) 
{
    $EnvironmentID += (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$_.Name -eq $EnvironmentName} | Select-Object -ExpandProperty Id -First 1
}

# Get MachineIds
$MachineIds = $null
if($MachineNames.Count -gt 0)
{
    $MachineIds = $EnvironmentID += (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/all" -Headers $header) | Where-Object {$_.Name -eq $EnvironmentName} | Select-Object -ExpandProperty Id -Join ", "
}

# Create json payload
$jsonPayload = @{
    SpaceId = "$($space.Id)"
    Name = "Health"
    Description = $Description
    Arguments = @{
        Timeout = "$([TimeSpan]::FromMinutes($TimeOutAfterMinutes))"
        MachineTimeout = "$([TimeSpan]::FromMinutes($MachineTimeoutAfterMinutes))"
        EnvironmentId = $EnvironmentID
        MachineIds = $MachineIds
    }
}

# Create health check task
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tasks" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
```

</details>
<details data-group="run-healthcheck-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "Default"
$Description = "Health check started from Powershell script"
$TimeOutAfterMinutes = 5
$MachineTimeoutAfterMinutes = 5

# Choose an Environment, a set of machine names, or both.
$EnvironmentName = ""
$MachineNames = @()

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get EnvironmentId
    $EnvironmentID = $null
    if([string]::IsNullOrWhiteSpace($EnvironmentName) -eq $False) 
    {
        $EnvironmentID = $repositoryForSpace.Environments.FindByName($EnvironmentName).Id
    }
    
    # Get MachineIds
    $MachineIds = $null
    if($MachineNames.Count -gt 0)
    {
        $MachineIds = ($repositoryForSpace.Machines.GetAll() | Where-Object {$MachineNames -contains $_.Name} | Select-Object -ExpandProperty Id) -Join ", "
    }
    
    # Execute health check
    $repositoryForSpace.Tasks.ExecuteHealthCheck($Description,$TimeOutAfterMinutes,$MachineTimeoutAfterMinutes,$EnvironmentID,$MachineIds)
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="run-healthcheck-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
var spaceName = "Default";
var description = "Health check started from C# script";
var timeoutAfterMinutes = 5;
var machineTimeoutAfterMinutes = 5;

var environmentName = "Development";
var machineNames = new List<string>() {"octopus01-listening" };

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get EnvironmentId
    string environmentId = null;
    if (string.IsNullOrWhiteSpace(environmentName) == false)
    {
        environmentId = repositoryForSpace.Environments.FindByName(environmentName).Id;
    }

    // Get MachineIds
    string[] machineIds = null;
    if (machineNames.Any())
    {
        machineIds = repositoryForSpace.Machines.FindAll().Where(m => machineNames.Contains(m.Name)).Select(m => m.Id).ToArray();
    }
    repositoryForSpace.Tasks.ExecuteHealthCheck(description, timeoutAfterMinutes, machineTimeoutAfterMinutes, environmentId, machineIds);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="run-healthcheck-scripts">
<summary>Python3</summary>

```python
import json
import requests
from requests.api import get, head

def get_octopus_resource(uri, headers, skip_count = 0):
    items = []
    skip_querystring = ""

    if '?' in uri:
        skip_querystring = '&skip='
    else:
        skip_querystring = '?skip='

    response = requests.get((uri + skip_querystring + str(skip_count)), headers=headers)
    response.raise_for_status()

    # Get results of API call
    results = json.loads(response.content.decode('utf-8'))

    # Store results
    if 'Items' in results.keys():
        items += results['Items']

        # Check to see if there are more results
        if (len(results['Items']) > 0) and (len(results['Items']) == results['ItemsPerPage']):
            skip_count += results['ItemsPerPage']
            items += get_octopus_resource(uri, headers, skip_count)

    else:
        return results

    
    # return results
    return items

def convert(seconds):
    seconds = seconds % (24 * 3600)
    hour = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60
      
    return "%d:%02d:%02d" % (hour, minutes, seconds)

octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
description = 'Health check started from Python script'
timeout_after_minutes = 5
machine_timeout_after_minutes = 5
environment_name = 'Development'
machine_names = [] # blank will check all machines in environment

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get environment
uri = '{0}/api/{1}/environments'.format(octopus_server_uri, space['Id'])
environments = get_octopus_resource(uri, headers)
environment = next((e for e in environments if e['Name'] == environment_name), None)

# Get machines to check
machines_to_check = []
uri = '{0}/api/{1}/machines?environmentids={2}'.format(octopus_server_uri, space['Id'], environment['Id'])
machines = get_octopus_resource(uri, headers)

for machine in machines:
    if len(machine_names) == 0:
        machines_to_check.append(machine['Id'])
    else:
        if machine['Name'] in machine_names:
            machines_to_check.append(machine['Id'])

# Construct payload
json_payload = {
    'SpaceId': space['Id'],
    'Name': 'Health',
    'Description': description,
    'Arguments': {
        'Timeout': convert((timeout_after_minutes * 60)),
        'MachineTimeout': convert((machine_timeout_after_minutes * 60)),
        'EnvironmentId': environment['Id'],
        'MachineIds': machines_to_check
    }
}

print (json_payload)

uri = '{0}/api/{1}/tasks'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=json_payload)
response.raise_for_status()
```

</details>

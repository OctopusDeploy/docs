```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$machineNames = @("MyMachine")

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get machine list
    $machines = @()
    foreach ($machineName in $machineNames)
    {
        # Get machine
        $machine = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/all" -Headers $header) | Where-Object {$_.Name -eq $machineName}

        # Add to list
        $machines += $machine.Id
    }

    # Build json payload
    $jsonPayload = @{
        Name = "Upgrade"
        Arguments = @{
            MachineIds = $machines
        }
        Description = "Upgrade machines"
        SpaceId = $space.Id
    }

    # Initiate upgrade
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tasks" -Headers $header -Body ($jsonPayload | ConvertTo-Json -Depth 10)
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
$machineNames = @("MyMachine")

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get machines
    $machines = @()
    foreach ($machineName in $machineNames)
    {
        # Get machine
        $machine = $repositoryForSpace.Machines.FindByName($machineName)
        $machines += $machine.Id
    }

    # Create new task resource
    $task = New-Object Octopus.Client.Model.TaskResource
    $task.Name = "Upgrade"
    $task.Description = "Upgrade machines"
    $task.Arguments.Add("MachineIds", $machines)

    # Execute
    $repositoryForSpace.Tasks.Create($task)
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

var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
var spaceName = "default";
string[] machineNames = new string[] { "OctoTempTentacle" };

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get machines
    List<string> machines = new List<string>();
    foreach (string machineName in machineNames)
    {
        // Get machine
        var machine = repositoryForSpace.Machines.FindByName(machineName);

        // Add to list
        machines.Add(machine.Id);
    }

    // Create task resource
    Octopus.Client.Model.TaskResource task = new TaskResource();
    task.Name = "Upgrade";
    task.Description = "Upgrade machines";
    task.Arguments.Add("MachineIds", machines);

    // Execute
    repositoryForSpace.Tasks.Create(task);
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
target_names = ['Target A', 'Target B']

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
targets = get_octopus_resource('{0}/{1}/machines/all'.format(octopus_server_uri, space['Id']))
target_ids = [target['Id'] for target in targets if target['Name'] in target_names]

task = {
    'Name': 'Upgrade',
    'Arguments': {
        'MachineIds': target_ids
    },
    'Description': 'Upgrade machines',
    'SpaceId': space['Id']
}

uri = '{0}/{1}/tasks'.format(octopus_server_uri,
                             space['Id'])
response = requests.post(uri, headers=headers, json=task)
response.raise_for_status()
```

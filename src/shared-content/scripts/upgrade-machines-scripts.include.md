<details data-group="upgrade-machines-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$machineNames = @("MyMachine")

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
```

</details>
<details data-group="upgrade-machines-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
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

</details>
<details data-group="upgrade-machines-scripts">
<summary>C#</summary>

```csharp
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

</details>
<details data-group="upgrade-machines-scripts">
<summary>Python3</summary>

```python
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

</details>
<details data-group="upgrade-machines-scripts">
<summary>Go</summary>

```go
package main

import (
	"fmt"
	"log"
	"net/url"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"

	spaceName := "Default"
	machineNames := []string{"MyMachine"}

	// Get the space object
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client for space
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get machines
	machines := GetMachines(client, machineNames, environment)

	// Create new health check task
	upgradeTask := octopusdeploy.NewTask()
	upgradeTask.SpaceID = space.ID
	upgradeTask.Name = "Upgrade"
	upgradeTask.Description = "Upgrade target task from Go"

	// Add the arguments
	if len(machines) > 0 {
		machineIds := []string{}
		for _, entry := range machines {
			machineIds = append(machineIds, entry.ID)
		}

		upgradeTask.Arguments["MachineIds"] = machineIds
	}

	// Execute the task
	task, err := client.Tasks.Add(upgradeTask)

	fmt.Println(task)
}

func octopusAuth(octopusURL *url.URL, APIKey, space string) *octopusdeploy.Client {
	client, err := octopusdeploy.NewClient(nil, octopusURL, APIKey, space)
	if err != nil {
		log.Println(err)
	}

	return client
}

func GetSpace(octopusURL *url.URL, APIKey string, spaceName string) *octopusdeploy.Space {
	client := octopusAuth(octopusURL, APIKey, "")
	spaceQuery := octopusdeploy.SpacesQuery{
		Name: spaceName,
	}

	// Get specific space object
	spaces, err := client.Spaces.Get(spaceQuery)

	if err != nil {
		log.Println(err)
	}

	for _, space := range spaces.Items {
		if space.Name == spaceName {
			return space
		}
	}

	return nil
}

func GetEnvironment(client *octopusdeploy.Client, environmentName string) *octopusdeploy.Environment {
	// Get environment
	environmentsQuery := octopusdeploy.EnvironmentsQuery{
		Name: environmentName,
	}
	environments, err := client.Environments.Get(environmentsQuery)
	if err != nil {
		log.Println(err)
	}

	// Loop through results
	for _, environment := range environments.Items {
		if environment.Name == environmentName {
			return environment
		}
	}

	return nil
}

func GetMachines(client *octopusdeploy.Client, machineNames []string, environment *octopusdeploy.Environment) []*octopusdeploy.DeploymentTarget {
	machineQuery := octopusdeploy.MachinesQuery{
		EnvironmentIDs: []string{environment.ID},
	}

	machines := []*octopusdeploy.DeploymentTarget{}

	// Chech to see if array is empty
	if len(machineNames) == 0 {
		results, err := client.Machines.Get(machineQuery)
		if err != nil {
			log.Println(err)
		}

		machines = append(machines, results.Items...)
	} else {
		for _, machineName := range machineNames {
			machineQuery.Name = machineName
			results, err := client.Machines.Get(machineQuery)
			if err != nil {
				log.Println(err)
			}

			machines = append(machines, results.Items...)
		}
	}

	return machines
}
```

</details>

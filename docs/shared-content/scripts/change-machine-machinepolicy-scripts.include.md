```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$machineName = "MyMachine"
$machinePolicyName = "MyPolicy"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get machine list
$machine = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/all" -Headers $header) | Where-Object {$_.Name -eq $machineName}

# Get machine policy
$machinePolicy = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machinepolicies/all" -Headers $header) | Where-Object {$_.Name -eq $machinePolicyName}

# Update machine object
$machine.MachinePolicyId = $machinePolicy.Id
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/machines/$($machine.Id)" -Body ($machine | ConvertTo-Json -Depth 10) -Headers $header
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$machineName = "MyMachine"
$machinePolicyName = "MyPolicy"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get machine list
    $machine = $repositoryForSpace.Machines.FindByName($machineName)

    # Get machine policy
    $machinePolicy = $repositoryForSpace.MachinePolicies.FindByName($machinePolicyName)

    # Change machine policy for machine
    $machine.MachinePolicyId = $machinePolicy.Id
    $repositoryForSpace.Machines.Modify($machine)
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
string machineName = "MyMachine";
string machinePolicyName = "TestPolicy";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get machine list
    var machine = repositoryForSpace.Machines.FindByName(machineName);

    // Get machine policy
    var machinePolicy = repositoryForSpace.MachinePolicies.FindByName(machinePolicyName);

    // Change machine policy for machine
    machine.MachinePolicyId = machinePolicy.Id;
    repositoryForSpace.Machines.Modify(machine);
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
target_name = 'Your Target Name'
machine_policy_name = 'Your Machine Policy Name'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
target = get_by_name('{0}/{1}/machines/all'.format(octopus_server_uri, space['Id']), target_name)
machine_policy = get_by_name('{0}/{1}/machinepolicies/all'.format(octopus_server_uri, space['Id']), machine_policy_name)

target['MachinePolicyId'] = machine_policy['Id']
uri = '{0}/{1}/machines/{2}'.format(octopus_server_uri, space['Id'], target['Id'])
response = requests.put(uri, headers=headers, json=target)
response.raise_for_status()
```
```go Go
package main

import (
	"fmt"
	"log"

	"net/url"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://youroctourl")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	newMachinePolicyName := "MyMachinePolicy"
	machineName := "MyMachine"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get machine policies
	newMachinePolicy := GetMachinePolicy(apiURL, APIKey, space, newMachinePolicyName)

	// Get machine reference
	machine := GetMachine(apiURL, APIKey, space, machineName)

	// Update
	machine.MachinePolicyID = newMachinePolicy.ID
	client := octopusAuth(apiURL, APIKey, space.ID)
	client.Machines.Update(machine)
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

	// Get specific space object
	space, err := client.Spaces.GetByName(spaceName)

	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("Retrieved space " + space.Name)
	}

	return space
}

func GetMachinePolicy(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, MachinePolicyName string) *octopusdeploy.MachinePolicy {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get the machine policy
	machinePolicies, err := client.MachinePolicies.GetByPartialName(MachinePolicyName)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(machinePolicies); i++ {
		if machinePolicies[i].Name == MachinePolicyName {
			return machinePolicies[i]
		}
	}

	return nil
}

func GetMachine(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, MachineName string) *octopusdeploy.DeploymentTarget {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get target
	deploymentTargets, err := client.Machines.GetByName(MachineName)

	if err != nil {
		log.Println(err)
	}

	// Loop through returned targets
	for i := 0; i < len(deploymentTargets); i++ {
		if deploymentTargets[i].Name == MachineName {
			return deploymentTargets[i]
		}
	}

	return nil
}
```
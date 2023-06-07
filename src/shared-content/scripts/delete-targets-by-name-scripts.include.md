<details data-group="delete-targets-by-name-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$machineName = "MachineName"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get machine list
$targetList = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines?name=$machineName&skip=0&take=1000" -Headers $header) 

# Loop through list
foreach ($target in $targetList.Items)
{
    if ($target.Name -eq $machineName)
    {
        $targetId = $target.Id
        Write-Highlight "Deleting the target $targetId because the name matches the machineName"

        $deleteResponse = (Invoke-RestMethod "$OctopusUrl/api/$($space.Id)/machines/$targetId" -Headers $header -Method Delete)

        Write-Host "Delete Response $deleteResponse"
        break
    }
}
```

</details>
<details data-group="delete-targets-by-name-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$machineName = "MachineName"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get machine
    $machine = $repositoryForSpace.Machines.FindByName($machineName)

    # Delete machine
    $repositoryForSpace.Machines.Delete($machine)
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="delete-targets-by-name-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string machineName = "MachineName";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get machine
    var machine = repositoryForSpace.Machines.FindByName(machineName);

    // Delete machine
    repositoryForSpace.Machines.Delete(machine);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="delete-targets-by-name-scripts">
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
target_name = 'Your Target Name'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
target = get_by_name('{0}/{1}/machines/all'.format(octopus_server_uri, space['Id']), target_name)

uri = '{0}/{1}/machines/{2}'.format(octopus_server_uri, space['Id'], target['Id'])
response = requests.delete(uri, headers=headers)
response.raise_for_status()
```

</details>
<details data-group="delete-targets-by-name-scripts">
<summary>Go</summary>

```go
package main

import (
	"fmt"
	"log"
	"net/url"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
	//"strconv.Itoa"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	machineName := "MyMachine"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	machine := GetTarget(apiURL, APIKey, space, machineName)

	if nil != machine {
		// Delete machine
		fmt.Println("Deleting " + machine.Name)
		client.Machines.DeleteByID(machine.ID)
	}
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

func GetTarget(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, targetName string) *octopusdeploy.DeploymentTarget {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	machinesQuery := octopusdeploy.MachinesQuery{
		Name: targetName,
	}

	// Get specific machine object
	machines, err := client.Machines.Get(machinesQuery)

	if err != nil {
		log.Println(err)
	}

	for _, machine := range machines.Items {
		if machine.Name == targetName {
			return machine
		}
	}

	return nil
}

```

</details>

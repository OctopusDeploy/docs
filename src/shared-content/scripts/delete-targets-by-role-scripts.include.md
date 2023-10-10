<details data-group="delete-targets-by-role-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$role = "MyRole"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get machine list
$machines = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/all" -Headers $header) | Where-Object {$role -in $_.Roles}

# Loop through list
foreach ($machine in $machines)
{
    # Remove machine
    Invoke-RestMethod -Method Delete -Uri "$octopusURL/api/$($space.Id)/machines/$($machine.Id)" -Headers $header
}
```

</details>
<details data-group="delete-targets-by-role-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$role = "MyRole"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get machine list
    $machines = $repositoryForSpace.Machines.GetAll() | Where-Object {$role -in $_.Roles}

    # Loop through list
    foreach ($machine in $machines)
    {
        # Delete machine
        $repositoryForSpace.Machines.Delete($machine)
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="delete-targets-by-role-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
var octopusURL = "https://your.octopus.app";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string role = "MyRole";

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
    var machines = repositoryForSpace.Machines.FindAll().Where(r => r.Roles.Contains(role));

    // Loop through list
    foreach (var machine in machines)
    {
        // Delete machine
        repositoryForSpace.Machines.Delete(machine);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="delete-targets-by-role-scripts">
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

def get_by_role(uri, role):
    resources = get_octopus_resource(uri)
    return (r for r in resources if role in r['Roles'])

space_name = 'Default'
target_role = 'your-target-role'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
targets = get_by_role('{0}/{1}/machines/all'.format(octopus_server_uri, space['Id']), target_role)

for target in targets:
    print('Deleting {0} ({1})'.format(target['Name'], target['Id']))
    uri = '{0}/{1}/machines/{2}'.format(octopus_server_uri, space['Id'], target['Id'])
    response = requests.delete(uri, headers=headers)
    response.raise_for_status()
```

</details>
<details data-group="delete-targets-by-role-scripts">
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
	roleName := "MyRole"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	machines := GetMachinesWithRole(client, roleName)

	for i := 0; i < len(machines); i++ {
		// Delete machine
		fmt.Println("Deleting " + machines[i].Name)
		client.Machines.DeleteByID(machines[i].ID)
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

func GetMachinesWithRole(client *octopusdeploy.Client, roleName string) []*octopusdeploy.DeploymentTarget {
	// Get machines
	machines, err := client.Machines.GetAll()

	// New variable for machines
	machinesWithRole := []*octopusdeploy.DeploymentTarget{}

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(machines); i++ {
		if contains(machines[i].Roles, roleName) {
			machinesWithRole = append(machinesWithRole, machines[i])
		}
	}

	return machinesWithRole
}

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}
```

</details>

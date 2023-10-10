<details data-group="delete-projects-without-processes-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctopusurl"
$octopusAPIKey = "API-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$projects = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

# Loop through projects
foreach ($project in $projects)
{
    # Get deployment process
    $deploymentProcess = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header

    # Check to see if there's a process
    if (($null -eq $deploymentProcess.Steps) -or ($deploymentProcess.Steps.Count -eq 0))
    {
        # Delete project
        Invoke-RestMethod -Method Delete -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)" -Headers $header
    }
}
```

</details>
<details data-group="delete-projects-without-processes-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctopusurl"
$octopusAPIKey = "API-KEY"
$spaceName = "default"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $projects = $repositoryForSpace.Projects.GetAll()

    # Loop through projects
    foreach ($project in $projects)
    {
        # Get deployment process
        $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

        # Check for empty process
        if (($null -eq $deploymentProcess.Steps) -or ($deploymentProcess.Steps.Count -eq 0))
        {
            # Delete project
            $repositoryForSpace.Projects.Delete($project)
        }
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="delete-projects-without-processes-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
var spaceName = "default";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project
    var projects = repositoryForSpace.Projects.GetAll();

    // Loop through project
    foreach (var project in projects)
    {
        // Get deployment process
        var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);

        // Check for empty process
        if ((deploymentProcess.Steps == null) || (deploymentProcess.Steps.Count == 0))
        {
            // Delete project
            repositoryForSpace.Projects.Delete(project);
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="delete-projects-without-processes-scripts">
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

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
projects = get_octopus_resource('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']))

for project in projects:
    process = get_octopus_resource('{0}/{1}/deploymentprocesses/{2}'.format(octopus_server_uri, space['Id'], project['DeploymentProcessId']))
    steps = process.get('Steps', None)
    if steps is None or len(steps) == 0:
        print('Deleting project \'{0}\' as it has no deployment process'.format(project['Name']))
        uri = '{0}/{1}/projects/{2}'.format(octopus_server_uri, space['Id'], project['Id'])
        response = requests.delete(uri, headers=headers)
        response.raise_for_status()        
```

</details>
<details data-group="delete-projects-without-processes-scripts">
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

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get all projects
	projects, err := client.Projects.GetAll()

	if err != nil {
		log.Println(err)
	}

	// Loop through projects
	for i := 0; i < len(projects); i++ {
		if !projects[i].IsVersionControlled {

			// Get deployment process
			deploymentProcess := GetDeploymentProcess(client, projects[i])

			// Check for steps
			if deploymentProcess == nil || deploymentProcess.Steps == nil || len(deploymentProcess.Steps) == 0 {
				// Delete project
				fmt.Println("Deleting " + projects[i].Name)
				client.Projects.DeleteByID(projects[i].ID)
			}
		} else {
			fmt.Println(projects[i].Name + " is using version control, skipping")
		}
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

func GetDeploymentProcess(client *octopusdeploy.Client, project *octopusdeploy.Project) *octopusdeploy.DeploymentProcess {
	deploymentProcess, err := client.DeploymentProcesses.GetByID(project.DeploymentProcessID)

	if err != nil {
		log.Println(err)
	}

	return deploymentProcess
}
```

</details>

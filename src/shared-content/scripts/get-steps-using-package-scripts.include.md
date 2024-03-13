<details data-group="get-steps-using-package-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctopusurl"
$octopusAPIKey = "API-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$packageId = "PackageId"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object { $_.Name -eq $spaceName }

# Get projects for space
$projectList = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

# Loop through projects
foreach ($project in $projectList) {
    
    $deploymentProcessLink = $project.Links.DeploymentProcess
    
    # Check if project is Config-as-Code
    if ($project.IsVersionControlled) {
        # Get default Git branch for Config-as-Code project
        $defaultBranch = $project.PersistenceSettings.DefaultBranch
        $deploymentProcessLink = $deploymentProcessUri -Replace "{gitRef}", $defaultBranch
    }

    $deploymentProcess = Invoke-RestMethod -Method Get -Uri "$octopusURL$deploymentProcessLink" -Headers $header

    # Get steps and check step for specified package
    foreach ($step in $deploymentProcess.Steps) {
        $packages = $step.Actions.Packages
        if ($null -ne $packages) {
            $packageIds = $packages | Where-Object { $_.PackageId -eq $packageId }
            if ($packageIds.Count -gt 0) {
                Write-Host "Step: $($step.Name) of project: $($project.Name) is using package '$packageId'."
            }
        }
    }
}
```

</details>
<details data-group="get-steps-using-package-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$packageId = "PackageId"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

$projectList = $repositoryForSpace.Projects.GetAll()

"Looking for steps with the package $($packageId) in them..."

foreach ($project in $projectList) {
    
    $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project)

    # Loop through steps
    foreach ($step in $deploymentProcess.Steps) {
        $packages = $step.Actions.Packages
        if ($null -ne $packages) {
            $packageIds = $packages | Where-Object { $_.PackageId -eq $packageId }
            if ($packageIds.Count -gt 0) {
                Write-Host "Step: $($step.Name) of project: $($project.Name) is using package '$packageId'."
            }
        }
    }
}
```

</details>
<details data-group="get-steps-using-package-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string packageId = "PackageId";

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
    var projectList = repositoryForSpace.Projects.GetAll();

    // Loop through list
    foreach (var project in projectList)
    {
        // Get the deployment process
        var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project);

        // Loop through steps
        foreach (var step in deploymentProcess.Steps)
        {
            // Select step packages
            var packages = step.Actions.SelectMany(a => a.Packages);
            if (packages.Any(p => p.PackageId == packageId))
            {
                Console.WriteLine(string.Format("Step [{0}] from project [{1}] is using the package [{2}]", step.Name, project.Name, packageId));
            }
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
<details data-group="get-steps-using-package-scripts">
<summary>Python3</summary>

```python
import json
import requests
octopus_server_uri = 'https://your.octopus.app/'
octopus_api_key = 'API-KEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}
def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()
    return json.loads(response.content.decode('utf-8'))

space_name = 'Default'
package_id = 'YourPackageId'

spaces = get_octopus_resource('{0}/api/spaces/all'.format(octopus_server_uri))
space = next((x for x in spaces if x['Name'] == space_name), None)
projects = get_octopus_resource(
    '{0}/api/{1}/projects/all'.format(octopus_server_uri, space['Id']))

for project in projects:
    deploymentprocess_link = project['Links']['DeploymentProcess']
    if project['IsVersionControlled'] == True:
        default_branch = project['PersistenceSettings']['DefaultBranch']
        deploymentprocess_link = deploymentprocess_link.replace('{gitRef}', default_branch)
    uri = '{0}{1}'.format(octopus_server_uri, deploymentprocess_link)
    process = get_octopus_resource(uri)
    for step in process['Steps']:
        packages = [package for action in step['Actions'] for package in action['Packages']]
        if packages is None:
            continue
        ids = [package['PackageId'] for package in packages]
        if package_id in ids:
            print('Step \'{0}\' of project \'{1}\' is using package \'{2}\''.format(step['Name'], project['Name'], package_id))
```

</details>
<details data-group="get-steps-using-package-scripts">
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
	packageId := "MyPackageId"

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get space specific client
	client = octopusAuth(apiURL, APIKey, space.ID)

	// Get all projects in space
	projects, err := client.Projects.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Loop through projects
	for _, project := range projects {
		if !project.IsVersionControlled {
			// Get project deployment process
			deploymentProcess, err := client.DeploymentProcesses.GetByID(project.DeploymentProcessID)
			if err != nil {
				log.Println(err)
			}

			// Loop through steps
			for _, step := range deploymentProcess.Steps {
				// Loop through actions
				for _, action := range step.Actions {
					// check to see if it uses a package
					if action.Packages != nil {
						for i := 0; i < len(action.Packages); i++ {
							if action.Packages[i].PackageID == packageId {
								fmt.Printf("Step %[1]s of %[2]s is using package %[3]s \n", step.Name, project.Name, packageId)
							}
						}
					}
				}
			}
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
```

</details>

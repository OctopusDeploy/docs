<details data-group="add-library-set-to-project-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$projectName = "MyProject"
$librarySetName = "MyLibrarySet"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Get library set
$librarySet = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets/all" -Headers $header) | Where-Object {$_.Name -eq $librarySetName}

# Add the library set
$project.IncludedLibraryVariableSetIds += $librarySet.Id

# Update the project
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)" -Headers $header -Body ($project | ConvertTo-Json -Depth 10)
```

</details>
<details data-group="add-library-set-to-project-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$librarySetName = "MyLibrarySet"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $project = $repositoryForSpace.Projects.FindByName($projectName)

    # Get library set
    $librarySet = $repositoryForSpace.LibraryVariableSets.FindByName($librarySetName)

    # Add set to project
    $project.IncludedLibraryVariableSetIds += $librarySet.Id

    # Update project
    $repositoryForSpace.Projects.Modify($project)
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="add-library-set-to-project-scripts">
<summary>C#</summary>

```csharp
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string projectName = "MyProject";
string librarySetName = "MyLibrarySet";

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
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get library set
    var librarySet = repositoryForSpace.LibraryVariableSets.FindByName(librarySetName);

    // Include library set to project
    project.IncludedLibraryVariableSetIds.Add(librarySet.Id);

    // Update project
    repositoryForSpace.Projects.Modify(project);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="add-library-set-to-project-scripts">
<summary>Python3</summary>

```python
import json
import requests
from requests.api import head

def get_octopus_resource(uri, headers, skip_count = 0):
    items = []
    response = requests.get((uri + "?skip=" + str(skip_count)), headers=headers)
    response.raise_for_status()

    # Get results of API call
    results = json.loads(response.content.decode('utf-8'))

    # Store results
    items += results['Items']

    # Check to see if there are more results
    if (len(results['Items']) > 0) and (len(results['Items']) == results['ItemsPerPage']):
        skip_count += results['ItemsPerPage']
        items += get_octopus_resource(uri, headers, skip_count)
    
    # return results
    return items


# Define Octopus server variables
octopus_server_uri = 'https://YourUrl/api'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
project_name = "MyProject"
library_set_name = "MyLibraryVariableSet"
space_name = "Default"

uri = '{0}/spaces/all'.format(octopus_server_uri)
response = requests.get(uri, headers=headers)
response.raise_for_status()

# Get space
spaces = json.loads(response.content.decode('utf-8'))
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get project
uri = '{0}/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)
project = next((x for x in projects if x['Name'] == project_name), None)

# Get library set
uri = '{0}/{1}/libraryvariablesets'.format(octopus_server_uri, space['Id'])
librarysets = get_octopus_resource(uri, headers)
libraryset = next((x for x in librarysets if x['Name'] == library_set_name), None)

# Check to see if project is none
if project != None:
    if libraryset != None:
        # Add set to project
        project['IncludedLibraryVariableSetIds'].append(libraryset['Id'])

        # Update project
        uri = '{0}/{1}/projects/{2}'.format(octopus_server_uri, space['Id'], project['Id'])
        response = requests.put(uri, headers=headers, json=project)
        response.raise_for_status
    else:
        print ("Library set {0} not found!".format(library_set_name))
else:
    print ("Project {0} not found!".format(project_name))
```

</details>
<details data-group="add-library-set-to-project-scripts">
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
	projectName := "MyProject"
	librarySetName := "MyLibrarySet"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get referece to project
	project := GetProject(apiURL, APIKey, space, projectName)

	// Get referece to libraryset
	librarySet := GetLibrarySet(apiURL, APIKey, space, librarySetName, 0)

	// Add set to project
	if project != nil {
		if librarySet != nil {
			// Create client
			client := octopusAuth(apiURL, APIKey, space.ID)

			project.IncludedLibraryVariableSets = append(project.IncludedLibraryVariableSets, librarySet.ID)

			client.Projects.Update(project)
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

func GetProject(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, projectName string) *octopusdeploy.Project {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	projectsQuery := octopusdeploy.ProjectsQuery {
		Name: projectName,
	}

	// Get specific project object
	projects, err := client.Projects.Get(projectsQuery)

	if err != nil {
		log.Println(err)
	}

	for _, project := range projects.Items {
		if project.Name == projectName {
			return project
		}
	}

	return nil
}

func GetLibrarySet(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, librarySetName string, skip int) *octopusdeploy.LibraryVariableSet {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	librarySetsQuery := octopusdeploy.LibraryVariablesQuery {
		PartialName: librarySetName,
	}

	librarySets, err := client.LibraryVariableSets.Get(librarySetsQuery)
	if err != nil {
		log.Println(err)
	}
	
	if len(librarySets.Items) == librarySets.ItemsPerPage {
		// call again
		librarySet := GetLibrarySet(octopusURL, APIKey, space, librarySetName, (skip + len(librarySets.Items)))

		if librarySet != nil {
			return librarySet
		}
	} else {
		// Loop through returned items
		for _, librarySet := range librarySets.Items {
			if librarySet.Name == LifecycleName {
				return librarySet
			}
		}
	}

	return nil
}
```

</details>
<details data-group="create-project-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$projectDescription = "MyDescription"
$projectGroupName = "Default project group"
$lifecycleName = "Default lifecycle"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project group
$projectGroup = (Invoke-RestMethod -Method Get "$octopusURL/api/$($space.Id)/projectgroups/all" -Headers $header) | Where-Object {$_.Name -eq $projectGroupName}

# Get Lifecycle
$lifeCycle = (Invoke-RestMethod -Method Get "$octopusURL/api/$($space.Id)/lifecycles/all" -Headers $header) | Where-Object {$_.Name -eq $lifecycleName}

# Create project json payload
$jsonPayload = @{
    Name = $projectName
    Description = $projectDescription
    ProjectGroupId = $projectGroup.Id
    LifeCycleId = $lifeCycle.Id
}

# Create project
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/projects" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
```

</details>
<details data-group="create-project-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$projectGroupName = "Default project group"
$lifecycleName = "Default lifecycle"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project group
    $projectGroup = $repositoryForSpace.ProjectGroups.FindByName($projectGroupName)

    # Get lifecycle
    $lifecycle = $repositoryForSpace.Lifecycles.FindByName($lifecycleName)

    # Create new project
    $project = $repositoryForSpace.Projects.CreateOrModify($projectName, $projectGroup, $lifecycle)
    $project.Save()
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="create-project-scripts">
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
string projectName = "MyProject";
string projectGroupName = "Default project group";
string lifecycleName = "Default lifecycle";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project group
    var projectGroup = repositoryForSpace.ProjectGroups.FindByName(projectGroupName);

    // Get lifecycle
    var lifecycle = repositoryForSpace.Lifecycles.FindByName(lifecycleName);

    // Create project
    var project = repositoryForSpace.Projects.CreateOrModify(projectName, projectGroup, lifecycle);
    project.Save();
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="create-project-scripts">
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
project_name = 'Your new Project Name'
project_description = 'My project created with python'
project_group_name = 'Default Project Group'
lifecycle_name = 'Default Lifecycle'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project_group = get_by_name('{0}/{1}/projectgroups/all'.format(octopus_server_uri, space['Id']), project_group_name)
lifecycle = get_by_name('{0}/lifecycles/all'.format(octopus_server_uri, space['Id']), lifecycle_name)

project = {
    'Name': project_name,
    'Description': project_description,
    'ProjectGroupId': project_group['Id'],
    'LifeCycleId': lifecycle['Id']
}

uri = '{0}/{1}/projects'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=project)
response.raise_for_status()
```

</details>
<details data-group="create-project-scripts">
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
	projectGroupName := "MyProjectGroup"
	lifeCycleName := "Default Lifecycle"

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project group
	projectGroup := GetProjectGroup(client, projectGroupName, 0)

	// Get lifecycle
    lifecycle := GetLifecycle(apiURL, APIKey, space, lifeCycleName, 0)

	// Create project
	project := CreateProject(client, lifecycle, projectGroup, projectName)

	fmt.Println("Created project " + project.ID)
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

func GetProjectGroup(client *octopusdeploy.Client, projectGroupName string, skip int) *octopusdeploy.ProjectGroup {
    projectGroupsQuery := octopusdeploy.ProjectGroupsQuery {
		PartialName: projectGroupName,
	}

	projectGroups, err := client.ProjectGroups.Get(projectGroupsQuery)

	if err != nil {
		log.Println(err)
	}
	
	if len(projectGroups.Items) == projectGroups.ItemsPerPage {
		// call again
		projectGroup := GetProjectGroup(client, projectGroupName, (skip + len(projectGroups.Items)))

		if projectGroup != nil {
			return projectGroup
		}
	} else {
		// Loop through returned items
		for _, projectGroup := range projectGroups.Items {
			if projectGroup.Name == projectGroupName {
				return projectGroup
			}
		}
	}

	return nil
}

func GetLifecycle(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, LifecycleName string, skip int) *octopusdeploy.Lifecycle {
	client := octopusAuth(octopusURL, APIKey, space.ID)

	lifecycleQuery := octopusdeploy.LifecyclesQuery {
		PartialName: LifecycleName,
	}

	lifecycles, err := client.Lifecycles.Get(lifecycleQuery)

	if err != nil {
		log.Println(err)
	}
	
	if len(lifecycles.Items) == lifecycles.ItemsPerPage {
		// call again
		lifecycle := GetLifecycle(octopusURL, APIKey, space, LifecycleName, (skip + len(lifecycles.Items)))

		if lifecycle != nil {
			return lifecycle
		}
	} else {
		// Loop through returned items
		for _, lifecycle := range lifecycles.Items {
			if lifecycle.Name == LifecycleName {
				return lifecycle
			}
		}
	}

	return nil
}

func CreateProject(client *octopusdeploy.Client, lifecycle *octopusdeploy.Lifecycle, projectGroup *octopusdeploy.ProjectGroup, name string) *octopusdeploy.Project {
	project := octopusdeploy.NewProject(name, lifecycle.ID, projectGroup.ID)

	project, err := client.Projects.Add(project)

	if err != nil {
		log.Println(err)
	}

	return project
}
```

</details>
<details data-group="create-project-scripts">
<summary>Java</summary>

```java
import com.octopus.sdk.Repository;
import com.octopus.sdk.domain.Lifecycle;
import com.octopus.sdk.domain.Project;
import com.octopus.sdk.domain.ProjectGroup;
import com.octopus.sdk.domain.Space;
import com.octopus.sdk.http.ConnectData;
import com.octopus.sdk.http.OctopusClient;
import com.octopus.sdk.http.OctopusClientFactory;
import com.octopus.sdk.model.project.ProjectResource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Optional;

public class CreateProject {

  static final String octopusServerUrl = "http://localhost:8065";
  // as read from your profile in your Octopus Deploy server
  static final String apiKey = System.getenv("OCTOPUS_SERVER_API_KEY");

  public static void main(final String... args) throws IOException {
    final OctopusClient client = createClient();

    final Repository repo = new Repository(client);
    final Optional<Space> space = repo.spaces().getByName("TheSpaceName");

    if (!space.isPresent()) {
      System.out.println("No space named 'TheSpaceName' exists on server");
      return;
    }

    final Optional<Lifecycle> lifecycle = space.get().lifecycles().getByName("TheLifecycleName");
    if (!lifecycle.isPresent()) {
      System.out.println("No lifecycle named 'TheLifecycleName' exists on server");
      return;
    }

    final Optional<ProjectGroup> projGroup =
        space.get().projectGroups().getByName("TheProjectGroupName");
    if (!projGroup.isPresent()) {
      System.out.println("No ProjectGroup named 'TheProjectGroupName' exists on server");
      return;
    }

    final ProjectResource projectToCreate =
        new ProjectResource(
            "TheProjectName",
            lifecycle.get().getProperties().getId(),
            projGroup.get().getProperties().getId());
    projectToCreate.setAutoCreateRelease(false);

    final Project createdProject = space.get().projects().create(projectToCreate);
  }

  // Create an authenticated connection to your Octopus Deploy Server
  private static OctopusClient createClient() throws MalformedURLException {
    final Duration connectTimeout = Duration.ofSeconds(10L);
    final ConnectData connectData =
        new ConnectData(new URL(octopusServerUrl), apiKey, connectTimeout);
    final OctopusClient client = OctopusClientFactory.createClient(connectData);

    return client;
  }
}
```

</details>

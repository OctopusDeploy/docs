<details data-group="create-runbook-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Create json payload
$jsonPayload = @{
    Name = $runbookName
    ProjectId = $project.Id
    EnvironmentScope = "All"
    RunRetentionPolicy = @{
        QuantityToKeep = 100
        ShouldKeepForever = $false
    }   
}

# Create the runbook
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/runbooks" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
```

</details>
<details data-group="create-runbook-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"

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

    # Create runbook retention object
    $runbookRetentionPolicy = New-Object Octopus.Client.Model.RunbookRetentionPeriod
    $runbookRetentionPolicy.QuantityToKeep = 100
    $runbookRetentionPolicy.ShouldKeepForever = $false


    # Create runbook object
    $runbook = New-Object Octopus.Client.Model.RunbookResource
    $runbook.Name = $runbookName
    $runbook.ProjectId = $project.Id
    $runbook.RunRetentionPolicy = $runbookRetentionPolicy
    
    # Save
    $repositoryForSpace.Runbooks.Create($runbook)
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="create-runbook-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string projectName = "MyProject";
string runbookName = "MyRunbook";

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

    // Create runbook retention object
    var runbookRetentionPolicy = new Octopus.Client.Model.RunbookRetentionPeriod();
    runbookRetentionPolicy.QuantityToKeep = 100;
    runbookRetentionPolicy.ShouldKeepForever = false;

    // Create runbook object
    var runbook = new Octopus.Client.Model.RunbookResource();
    runbook.Name = runbookName;
    runbook.ProjectId = project.Id;
    runbook.RunRetentionPolicy = runbookRetentionPolicy;

    // Save
    repositoryForSpace.Runbooks.Create(runbook);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    Console.ReadLine();
    return;
}
```

</details>
<details data-group="create-runbook-scripts">
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
project_name = 'Your Project Name'
runbook_name = 'Your new runbook name'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project = get_by_name('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']), project_name)

runbook = {
    'Id': None,
    'Name': runbook_name,
    'ProjectId': project['Id'],
    'EnvironmentScope': 'All',
    'RunRetentionPolicy': {
        'QuantityToKeep': 100,
        'ShouldKeepForever': False
    }
}

uri = '{0}/{1}/runbooks'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=runbook)
response.raise_for_status()
```

</details>
<details data-group="create-runbook-scripts">
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
	runbookName := "MyRunbook"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project
	project := GetProject(apiURL, APIKey, space, projectName)

	// Create new runbook
	runbook := octopusdeploy.NewRunbook(runbookName, project.ID)
	runbook.EnvironmentScope = "All"
	runbook.RunRetentionPolicy.QuantityToKeep = 100
	runbook.RunRetentionPolicy.ShouldKeepForever = false

	client.Runbooks.Add(runbook)
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
```

</details>
<details data-group="create-runbook-scripts">
<summary>Java</summary>

```java
import com.octopus.openapi.model.RunbookEnvironmentScope;
import com.octopus.sdk.Repository;
import com.octopus.sdk.domain.Project;
import com.octopus.sdk.domain.Runbook;
import com.octopus.sdk.domain.Space;
import com.octopus.sdk.http.ConnectData;
import com.octopus.sdk.http.OctopusClient;
import com.octopus.sdk.http.OctopusClientFactory;
import com.octopus.sdk.model.runbook.RunbookResource;
import com.octopus.sdk.model.runbook.RunbookRetentionPeriod;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Optional;

public class CreateRunbook {

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

    final Optional<Project> project = space.get().projects().getByName("TheProjectName");
    if (!project.isPresent()) {
      throw new IllegalArgumentException("No project named 'TheProjectName' exists on server");
    }

    final RunbookResource newRunbook = new RunbookResource("TheRunbook");
    final RunbookRetentionPeriod retentionPolicy = new RunbookRetentionPeriod();
    retentionPolicy.setQuantityToKeep(100);
    retentionPolicy.setShouldKeepForever(false);
    newRunbook.projectId(project.get().getProperties().getId());
    newRunbook.environmentScope(RunbookEnvironmentScope.ALL);
    newRunbook.runRetentionPolicy(retentionPolicy);

    final Runbook runbook = space.get().runbooks().create(newRunbook);
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

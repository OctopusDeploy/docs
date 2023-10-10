<details data-group="add-a-space-with-environments-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "New Space"
$description = "Space for the new, top secret project."
$managersTeams = @() # an array of team Ids to add to Space Managers
$managerTeamMembers = @() # an array of user Ids to add to Space Managers
$environments = @('Development', 'Test', 'Production')

$body = @{
    Name = $spaceName
    Description = $description
    SpaceManagersTeams = $managersTeams
    SpaceManagersTeamMembers = $managerTeamMembers
    IsDefault = $false
    TaskQueueStopped = $false
} | ConvertTo-Json

$response = try {
    Write-Host "Creating space '$spaceName'"
    (Invoke-WebRequest $octopusURL/api/spaces -Headers $header -Method Post -Body $body -ErrorVariable octoError)
} catch [System.Net.WebException] {
    $_.Exception.Response
}

if ($octoError) {
    Write-Host "An error was encountered trying to create the space: $($octoError.Message)"
    exit
}

$space = $response.Content | ConvertFrom-Json

foreach ($environment in $environments) {
    $body = @{
        Name = $environment
    } | ConvertTo-Json

    Write-Host "Creating environment '$environment'"
    $response = try {
        (Invoke-WebRequest "$octopusURL/api/$($space.Id)/environments" -Headers $header -Method Post -Body $body -ErrorVariable octoError)
    } catch [System.Net.WebException] {
        $_.Exception.Response
    }

    if ($octoError) {
        Write-Host "An error was encountered trying to create the environment: $($octoError.Message)"
        exit
    }
}
```

</details>
<details data-group="add-a-space-with-environments-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
Add-Type -Path 'path\to\Octopus.Client.dll'

$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

$spaceName = "New Space"
$description = "Space for the new, top secret project."
$managersTeams = @() # an array of team Ids to add to Space Managers
$managerTeamMembers = @() # an array of user Ids to add to Space Managers
$environments = @('Development', 'Test', 'Production')


$space = New-Object Octopus.Client.Model.SpaceResource -Property @{
    Name = $spaceName
    Description = $description
    SpaceManagersTeams = New-Object Octopus.Client.Model.ReferenceCollection($managersTeams)
    SpaceManagersTeamMembers = New-Object Octopus.Client.Model.ReferenceCollection($managerTeamMembers)
    IsDefault = $false
    TaskQueueStopped = $false
};

try {
    $space = $repository.Spaces.Create($space)
}
catch {
    Write-Host $_.Exception.Message
    exit
}

$repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

foreach ($environmentName in $environments) {
    $environment = New-Object Octopus.Client.Model.EnvironmentResource -Property @{
        Name = $environmentName
    }

    try {
        $repositoryForSpace.Environments.Create($environment)
    }
    catch {
        Write-Host $_.Exception.Message
        exit
    }
}
```

</details>
<details data-group="add-a-space-with-environments-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;

var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";

var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

var spaceName = "New Space";
var description = "Space for the new, top secret project.";
var managersTeams = new string[] { };
var managersTeamMembers = new string[] { };

var environments = new string[] { "Development", "Test", "Production" };

var space = new SpaceResource
{
    Name = spaceName,
    Description = description,
    SpaceManagersTeams = new ReferenceCollection(managersTeams),
    SpaceManagersTeamMembers = new ReferenceCollection(managersTeamMembers),
    IsDefault = false,
    TaskQueueStopped = false
};

try
{
    Console.WriteLine($"Creating space '{spaceName}'.");
    space = repository.Spaces.Create(space);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}

var repositoryForSpace = repository.ForSpace(space);

foreach(var environmentName in environments)
{
    var environment = new EnvironmentResource {
        Name = environmentName
    };

    try
    {
        Console.WriteLine($"Creating environment '{environmentName}'.");
        repositoryForSpace.Environments.Create(environment);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
        return;
    }
}
```

</details>
<details data-group="add-a-space-with-environments-scripts">
<summary>Python3</summary>

```python
import json
import requests

# Define Octopus server variables
octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

# Define working variables
space_name = "My New Space"
space_description = "Description of My New Space"
managers_teams = [] # Either this or manager_team_members must be populated otherwise you'll receive a 400
manager_team_members = [] # Either this or managers_teams must be populated otherwise you'll receive a 400
environments = ['Development', 'Test', 'Production']

# Define space JSON
space = {
    'Name' : space_name,
    'Description' : space_description,
    'SpaceManagersTeams' : managers_teams,
    'SpaceManagersTeamMembers' : manager_team_members,
    'IsDefault' : False,
    'TaskQueueStopped' : False
}

# Create the space
uri = '{0}/spaces'.format(octopus_server_uri)
response = requests.post(uri, headers=headers, json=space)
response.raise_for_status()

# Get the response object
octopus_space = json.loads(response.content.decode('utf-8'))

# Loop through environments
for environment in environments:
    environmentJson = {
        'Name': environment
    }

    # Format the uri
    uri = '{0}/{1}/environments'.format(octopus_server_uri, octopus_space['Id'])

    # Create the environment
    response = requests.post(uri, headers=headers, json=environmentJson)
    response.raise_for_status()
```

</details>
<details data-group="add-a-space-with-environments-scripts">
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
	spaceId := "" // Update if authentication is in a different space
	newSpaceName := "MyNewSpace"

	apiURL, err := url.Parse("https://youroctourl")
	if err != nil {
		log.Println(err)
	}

	APIKey := "API-YOURAPIKEY"
	spaceManagersTeamMembers := []string{}                // This or spaceManagerTeams must contain a value
	spaceManagerTeams := []string{"teams-administrators"} // This or spaceManagersTeamMembers must contain a value, "teams-administrators" is the Octopus Administrators team
	environments := []string{"Development", "Test", "Production"}

	octopusAuth(apiURL, APIKey, spaceId) // Though blank, spaceId is required to be passed, blank = Default
	space := CreateSpace(apiURL, APIKey, spaceId, newSpaceName, spaceManagersTeamMembers[:], spaceManagerTeams[:])

	for i := 0; i < len(environments); i++ {
		CreateEnvironment(apiURL, APIKey, space, environments[i])
	}
}

func octopusAuth(octopusURL *url.URL, APIKey, space string) *octopusdeploy.Client {
	client, err := octopusdeploy.NewClient(nil, octopusURL, APIKey, space)
	if err != nil {
		log.Println(err)
	}

	return client
}

func CreateSpace(octopusURL *url.URL, APIKey, spaceId string, spaceName string, spaceManagersTeamMembers []string, spaceManagersTeams []string) *octopusdeploy.Space {
	client := octopusAuth(octopusURL, APIKey, spaceId)
	Space := octopusdeploy.NewSpace(spaceName)

	// Loop through team members array
	for i := 0; i < len(spaceManagersTeamMembers); i++ {
		Space.SpaceManagersTeamMembers = append(Space.SpaceManagersTeamMembers, spaceManagersTeamMembers[i])
	}

	// Loop through teams array
	for i := 0; i < len(spaceManagersTeams); i++ {
		Space.SpaceManagersTeams = append(Space.SpaceManagersTeams, spaceManagersTeams[i])
	}

	fmt.Println("Creating space: " + spaceName)

	Space, err := client.Spaces.Add(Space)

	if err != nil {
		log.Println(err)
	}

	return Space
}

func CreateEnvironment(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, environmentName string) {
	// Create client object
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Create new Environment object
	environment := octopusdeploy.NewEnvironment(environmentName)

	fmt.Println("Creating environment: " + environmentName)

	// Add to space
	environment, err := client.Environments.Add(environment)

	if err != nil {
		log.Println(err)
	}
}
```

</details>
<details data-group="add-a-space-with-environments-scripts">
<summary>Java</summary>

```java
import com.octopus.sdk.Repository;
import com.octopus.sdk.domain.Environment;
import com.octopus.sdk.domain.Space;
import com.octopus.sdk.domain.User;
import com.octopus.sdk.http.ConnectData;
import com.octopus.sdk.http.OctopusClient;
import com.octopus.sdk.http.OctopusClientFactory;
import com.octopus.sdk.model.environment.EnvironmentResource;
import com.octopus.sdk.model.space.SpaceOverviewResource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Set;

import com.google.common.collect.Sets;

public class AddSpaceWithEnvironments {

  static final String octopusServerUrl = "http://localhost:8065";
  // as read from your profile in your Octopus Deploy server
  static final String apiKey = System.getenv("OCTOPUS_SERVER_API_KEY");

  public static void main(final String... args) throws IOException {
    final OctopusClient client = createClient();

    final Repository repo = new Repository(client);
    final User currentUser = repo.users().getCurrentUser();
    final Set<String> spaceManagers = Sets.newHashSet(currentUser.getProperties().getId());
    final Space createdSpace =
        repo.spaces().create(new SpaceOverviewResource("TheSpaceName", spaceManagers));
    final Environment testEnv = createdSpace.environments().create(new EnvironmentResource("Test"));
    final Environment prodEnv =
        createdSpace.environments().create(new EnvironmentResource("Production"));
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
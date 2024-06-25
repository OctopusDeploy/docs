<details data-group="create-channel-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your-octopus-url"
$octopusAPIKey = "API-YOUR-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$projectId = "Projects-101"
$channelName = "Channel Name"

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Create channel json payload
$jsonPayload = @{
    ProjectId = $ProjectId
    Name = $channelName
    Description = ""
    IsDefault = $False
}

# Create channel
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/channels" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header -ContentType "application/json"
```

</details>
<details data-group="create-channel-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load assembly
Add-Type -Path 'C:\Octopus.Client\Octopus.Client.dll'
$octopusURL = "https://your-octopus-url"
$octopusAPIKey = "API-YOUR-KEY"
$spaceName = "Default"
$projectName = "MyProject"
$channelName = "NewChannel"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Get project
$project = $repositoryForSpace.Projects.FindByName($projectName)

# Create new channel object
$channel = New-Object Octopus.Client.Model.ChannelResource
$channel.Name = $channelName
$channel.ProjectId = $project.Id
$channel.SpaceId = $space.Id

# Add channel
$repositoryForSpace.Channels.Create($channel)
```

</details>
<details data-group="create-channel-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

var octopusURL = "https://your-octopus-url";
var octopusAPIKey = "API-YOUR-KEY";
var spaceName = "Default";
var projectName = "MyProject";
var channelName = "NewChannel";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get space
var space = repository.Spaces.FindByName(spaceName);
var spaceRepository = client.ForSpace(space);

// Get project
var project = spaceRepository.Projects.FindByName(projectName);

// Create channel object
var channel = new Octopus.Client.Model.ChannelResource();
channel.Name = channelName;
channel.ProjectId = project.Id;
channel.SpaceId = space.Id;

spaceRepository.Channels.Create(channel);
```

</details>
<details data-group="create-channel-scripts">
<summary>Python3</summary>

```python
import json
import requests
from requests.api import get, head

def get_octopus_resource(uri, headers, skip_count = 0):
    items = []
    skip_querystring = ""

    if '?' in uri:
        skip_querystring = '&skip='
    else:
        skip_querystring = '?skip='

    response = requests.get((uri + skip_querystring + str(skip_count)), headers=headers)
    response.raise_for_status()

    # Get results of API call
    results = json.loads(response.content.decode('utf-8'))

    # Store results
    if 'Items' in results.keys():
        items += results['Items']

        # Check to see if there are more results
        if (len(results['Items']) > 0) and (len(results['Items']) == results['ItemsPerPage']):
            skip_count += results['ItemsPerPage']
            items += get_octopus_resource(uri, headers, skip_count)

    else:
        return results

    
    # return results
    return items

# Define Octopus server variables
octopus_server_uri = 'https://your-octopus-url'
octopus_api_key = 'API-YOUR-KEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
project_name = "MyProject"
channel_name = "NewChannel"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get project
uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)
project = next((x for x in projects if x['Name'] == project_name), None)

# Create the channel json
channel = {
    'ProjectId': project['Id'],
    'Name': channel_name,
    'SpaceId': space['Id'],
    'IsDefault': False
}

uri = '{0}/api/{1}/channels'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=channel)
response.raise_for_status()
```

</details>
<details data-group="create-channel-scripts">
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

	apiURL, err := url.Parse("https://your-octopus-url")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YOUR-KEY"
	spaceName := "Default"
	projectName := "MyProject"
	channelName := "NewChannel"

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project
	project := GetProject(apiURL, APIKey, space, projectName)

	// Create channel resource
	channel := octopusdeploy.NewChannel(channelName, project.ID)
	channel.SpaceID = space.ID
	channel.IsDefault = false
	client.Channels.Add(channel)
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
<details data-group="create-channel-scripts">
<summary>Java</summary>

```java
import com.octopus.sdk.Repository;
import com.octopus.sdk.domain.Channel;
import com.octopus.sdk.domain.Project;
import com.octopus.sdk.domain.Space;
import com.octopus.sdk.http.ConnectData;
import com.octopus.sdk.http.OctopusClient;
import com.octopus.sdk.http.OctopusClientFactory;
import com.octopus.sdk.model.channel.ChannelResource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Optional;

public class CreateChannel {

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

    final Project project =
        space
            .get()
            .projects()
            .getByName("TheProjectName")
            .orElseThrow(
                () ->
                    new IllegalArgumentException(
                        "No project named 'TheProjectName' exists on server"));

    final ChannelResource newChannel =
        new ChannelResource("Mainline", project.getProperties().getId());
    newChannel.setSpaceId(space.get().getProperties().getId());
    newChannel.setIsDefault(false);

    final Channel channel = space.get().channels().create(newChannel);
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

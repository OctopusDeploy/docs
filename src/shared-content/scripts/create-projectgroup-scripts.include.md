<details data-group="create-projectgroup-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

function Get-OctopusItems
{
	# Define parameters
    param(
    	$OctopusUri,
        $ApiKey,
        $SkipCount = 0
    )
    
    # Define working variables
    $items = @()
    $skipQueryString = ""
    $headers = @{"X-Octopus-ApiKey"="$ApiKey"}

    # Check to see if there there is already a querystring
    if ($octopusUri.Contains("?"))
    {
        $skipQueryString = "&skip="
    }
    else
    {
        $skipQueryString = "?skip="
    }

    $skipQueryString += $SkipCount
    
    # Get intial set
    $resultSet = Invoke-RestMethod -Uri "$($OctopusUri)$skipQueryString" -Method GET -Headers $headers

    # Check to see if it returned an item collection
    if ($resultSet.Items)
    {
        # Store call results
        $items += $resultSet.Items
    
        # Check to see if resultset is bigger than page amount
        if (($resultSet.Items.Count -gt 0) -and ($resultSet.Items.Count -eq $resultSet.ItemsPerPage))
        {
            # Increment skip count
            $SkipCount += $resultSet.ItemsPerPage

            # Recurse
            $items += Get-OctopusItems -OctopusUri $OctopusUri -ApiKey $ApiKey -SkipCount $SkipCount
        }
    }
    else
    {
        return $resultSet
    }
    

    # Return results
    return $items
}


# Define working variables
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$projectGroupName = "MyProjectGroup"
$projectGroupDescription = "MyDescription"

# Get spaces
$spaces = Get-OctopusItems -OctopusUri "$octopusURL/api/spaces" -ApiKey $octopusAPIKey
$space = $spaces | Where-Object { $_.Name -eq $spaceName }

# Create project group payload
$projectGroupJson = @{
    Id = $null
    Name = $projectGroupName
    EnvironmentIds = @()
    Links = $null
    RetentionPolicyId = $null
    Description = $projectGroupDescription
}

# Create project group
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/projectgroups" -Body ($projectGroupJson | ConvertTo-Json -Depth 10) -Headers $header
```

</details>
<details data-group="create-projectgroup-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$projectGroupName = "MyProjectGroup"
$projectGroupDescription = "MyDescription"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Create project group object
$projectGroup = New-Object Octopus.Client.Model.ProjectGroupResource
$projectGroup.Description = $projectGroupDescription
$projectGroup.Name = $projectGroupName
$projectGroup.EnvironmentIds = $null
$projectGroup.RetentionPolicyId = $null

$repositoryForSpace.ProjectGroups.Create($projectGroup)
```

</details>
<details data-group="create-projectgroup-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

var octopusURL = "https://your.octopus.app";
var octopusAPIKey = "API-YOUR-KEY";
var spaceName = "Default";
var projectGroupName = "MyProjectGroup";
var projectGroupDescription = "My Description";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get space
var space = repository.Spaces.FindByName(spaceName);
var spaceRepository = client.ForSpace(space);

// Create project group object
var projectGroup = new Octopus.Client.Model.ProjectGroupResource();
projectGroup.Description = projectGroupDescription;
projectGroup.Name = projectGroupName;
projectGroup.EnvironmentIds = null;
projectGroup.RetentionPolicyId = null;

// Create the project group
spaceRepository.ProjectGroups.Create(projectGroup);
```

</details>
<details data-group="create-projectgroup-scripts">
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
octopus_server_uri = 'https://your.octopus.app'
octopus_api_key = 'API-YOUR-KEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
project_group_name = "MyProjectGroup"
project_group_description = "My description"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Create json
project_group_json = {
    'Id': None,
    'Name': project_group_name,
    'EnvironmentIds': None,
    'Links': None,
    'RetentionPolicyId': None,
    'Description': project_group_description
}

# Create project group
uri = '{0}/api/{1}/projectgroups'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=project_group_json)
response.raise_for_status()
```

</details>
<details data-group="create-projectgroup-scripts">
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
	projectGroupName := "MyProjectGroup"
	projectGroupDescription := "My description"

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Create project group object
	projectGroup := octopusdeploy.NewProjectGroup(projectGroupName)
	projectGroup.Description = projectGroupDescription
	projectGroup.EnvironmentIDs = nil
	projectGroup.RetentionPolicyID = octopusdeploy.NewDisplayInfo().Label

	// Create project group
	client.ProjectGroups.Add(projectGroup)
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
<details data-group="create-projectgroup-scripts">
<summary>Java</summary>

```java
import com.octopus.sdk.Repository;
import com.octopus.sdk.domain.ProjectGroup;
import com.octopus.sdk.domain.Space;
import com.octopus.sdk.http.ConnectData;
import com.octopus.sdk.http.OctopusClient;
import com.octopus.sdk.http.OctopusClientFactory;
import com.octopus.sdk.model.projectgroup.ProjectGroupResource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Optional;

public class CreateProjectGroup {

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
    final ProjectGroupResource projectGroupResource =
        new ProjectGroupResource("TheProjectGroupName");
    final ProjectGroup createdProjectGroup =
        space.get().projectGroups().create(projectGroupResource);
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

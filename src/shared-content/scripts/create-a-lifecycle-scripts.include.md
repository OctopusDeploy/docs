<details data-group="create-a-lifecycle-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
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

    # Check to see if there is already a querystring
    if ($octopusUri.Contains("?"))
    {
        $skipQueryString = "&skip="
    }
    else
    {
        $skipQueryString = "?skip="
    }

    $skipQueryString += $SkipCount
    
    # Get initial set
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

$apikey = 'API-YourAPIKey' # Get this from your profile
$OctopusUrl = 'https://YourURL' # Your Octopus Server address
$spaceName = "Default"

# Create headers for API calls
$headers = @{"X-Octopus-ApiKey"="$ApiKey"}

$lifecycleName = "MyLifecycle"

# Get space
$space = (Get-OctopusItems -OctopusUri "$octopusURL/api/spaces" -ApiKey $ApiKey) | Where-Object {$_.Name -eq $spaceName}

# Get lifecycles
$lifecycles = Get-OctopusItems -OctopusUri "$octopusURL/api/$($space.Id)/lifecycles" -ApiKey $apikey

# Check to see if lifecycle already exists
if ($null -eq ($lifecycles | Where-Object {$_.Name -eq $lifecycleName}))
{
    # Create payload
    $jsonPayload = @{
        Id = $null
        Name = $lifecycleName
        SpaceId = $space.Id
        Phases = @()
        ReleaseRetentionPolicy = @{
            ShouldKeepForever = $true
            QuantityToKeep = 0
            Unit = "Days"
        }
        TentacleRetentionPolicy = @{
            ShouldKeepForever = $true
            QuantityToKeep = 0
            Unit = "Days"
        }
        Links = $null
    }

    # Create new lifecycle
    Invoke-RestMethod -Method Post -Uri "$OctopusUrl/api/$($space.Id)/lifecycles" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $headers
}
else
{
    Write-Host "$lifecycleName already exists."
}
```

</details>
<details data-group="create-a-lifecycle-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$lifecycleName = "MyLifecycle"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Check to see if lifecycle already exists
if ($null -eq $repositoryForSpace.Lifecycles.FindByName($lifecycleName))
{
    # Create new lifecycle
    $lifecycle = New-Object Octopus.Client.Model.LifecycleResource
    $lifecycle.Name = $lifecycleName
    $repositoryForSpace.Lifecycles.Create($lifecycle)
}
else
{
    Write-Host "$lifecycleName already exists."
}
```

</details>
<details data-group="create-a-lifecycle-scripts">
<summary>C#</summary>

```csharp
#r "path\to\Octopus.Client.dll"
using Octopus.Client;
using Octopus.Client.Model;
using System;
using System.Linq;
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
var spaceName = "Default";
var lifecycleName = "MyLifecycle";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get space
var space = repository.Spaces.FindByName(spaceName);
var spaceRepository = client.ForSpace(space);

if (null == spaceRepository.Lifecycles.FindByName(lifecycleName))
{
	// Create new lifecycle
	var lifecycle = new Octopus.Client.Model.LifecycleResource();
	lifecycle.Name = lifecycleName;
	spaceRepository.Lifecycles.Create(lifecycle);
}
else
{
	Console.Write(string.Format("{0} already exists.", lifecycleName));
}
```

</details>
<details data-group="create-a-lifecycle-scripts">
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
lifecycle_name = "MyLifecycle"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get lifecycles
uri = '{0}/api/{1}/lifecycles'.format(octopus_server_uri, space['Id'])
lifecycles = get_octopus_resource(uri, headers)
lifecycle = next((x for x in lifecycles if x['Name'] == lifecycle_name), None)

# Check to see if lifecycle already exists
if None == lifecycle:
    # Create new lifecycle
    lifecycle = {
        'Id': None,
        'Name': lifecycle_name,
        'SpaceId': space['Id'],
        'Phases': [],
        'ReleaseRetentionPolicy': {
            'ShouldKeepForever': True,
            'QuantityToKeep': 0,
            'Unit': 'Days'
        },
        'TentacleRetentionPolicy': {
            'ShouldKeepForever': True,
            'QuantityToKeep': 0,
            'Unit': 'Days'
        },
        'Links': None
    }

    response = requests.post(uri, headers=headers, json=lifecycle)
    response.raise_for_status()
else:
    print ('{0} already exists.'.format(lifecycle_name))
```

</details>
<details data-group="create-a-lifecycle-scripts">
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
	spaceName := "MySpace"
	lifecycleName := "MyLifecycle"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Check to see if the lifecycle already exists
	if GetLifecycle(apiURL, APIKey, space, lifecycleName, 0) == nil {
		lifecycle := CreateLifecycle(apiURL, APIKey, space, lifecycleName)
		fmt.Println(lifecycle.Name + " created successfully")
	} else {
		fmt.Println(lifecycleName + " already exists.")
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

func CreateLifecycle(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, name string) *octopusdeploy.Lifecycle {
	client := octopusAuth(octopusURL, APIKey, space.ID)
	lifecycle := octopusdeploy.NewLifecycle(name)

	client.Lifecycles.Add(lifecycle)

	return lifecycle
}
```

</details>
<details data-group="create-a-lifecycle-scripts">
<summary>Java</summary>

```java
import com.octopus.sdk.Repository;
import com.octopus.sdk.domain.Lifecycle;
import com.octopus.sdk.domain.Space;
import com.octopus.sdk.http.ConnectData;
import com.octopus.sdk.http.OctopusClient;
import com.octopus.sdk.http.OctopusClientFactory;
import com.octopus.sdk.model.lifecycle.LifecycleResource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Optional;

public class CreateLifecycle {

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

    final String lifecycleName = "TheLifecycleName";

    if (space.get().lifecycles().getByName(lifecycleName).isPresent()) {
      System.out.println("Lifecycle called 'TheLifecycleName' already exists");
      return;
    }

    final Lifecycle createdLifecycle =
        space.get().lifecycles().create(new LifecycleResource(lifecycleName));
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
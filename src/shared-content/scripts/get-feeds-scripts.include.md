<details data-group="get-feeds-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get all feeds
$feeds = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/feeds/all" -Headers $header)

# Enumerate each feed
foreach($feed in $feeds)
{
    $feed
}
```

</details>
<details data-group="get-feeds-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
Add-Type -Path "C:\Octo\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

try
{
    # Get space id
    $space = $repository.Spaces.FindByName($spaceName)
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific repository
    $repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

    # Get all feeds
    $feeds = $repositoryForSpace.Feeds.FindAll()

    # Enumerate each feed
    foreach($feed in $feeds)
    {
        $feed
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="get-feeds-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";

string spaceName = "Default";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get All feeds
    var feeds = repositoryForSpace.Feeds.FindAll();

    foreach (var feed in feeds)
    {
        Console.WriteLine("Feed Id: {0}", feed.Id);
        Console.WriteLine("Feed Name: {0}", feed.Name);
        Console.WriteLine("Feed Type: {0}", feed.FeedType);
        Console.WriteLine();
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="get-feeds-scripts">
<summary>Python3</summary>

```python
import json
import requests

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

space_name = 'Default'

uri = '{0}/spaces/all'.format(octopus_server_uri)
response = requests.get(uri, headers=headers)
response.raise_for_status()

spaces = json.loads(response.content.decode('utf-8'))
space = next((x for x in spaces if x['Name'] == space_name), None)

uri = '{0}/{1}/feeds/all'.format(octopus_server_uri, space['Id'])
response = requests.get(uri, headers=headers)
response.raise_for_status()

feeds = json.loads(response.content.decode('utf-8'))

for feed in feeds:
    uri = feed.get('FeedUri', feed['FeedType'])
    print('{0} - {1} - {2}'.format(feed['Id'], feed['Name'], uri))
```

</details>
<details data-group="get-feeds-scripts">
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

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	// Get space
    space := GetSpace(apiURL, APIKey, spaceName)

	// Get space specific client
	client = octopusAuth(apiURL, APIKey, space.ID)

	// Get all feeds
	feeds, err := client.Feeds.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Display all feeds
	for _, feed := range feeds {
		fmt.Printf("%[1]s: %[2]s - %[3]s \n", feed.GetID(), feed.GetName(), feed.GetFeedType())
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

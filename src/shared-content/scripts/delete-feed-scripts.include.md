<details data-group="delete-feed-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$feedName = "nuget.org"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get feedID
$feed = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/feeds/all" -Headers $header) | Where-Object {$_.Name -eq $feedName}
$feedID = $feed.Id

# Delete Feed
Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/feeds/$feedID" -Headers $header -Method Delete
```

</details>
<details data-group="delete-feed-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
Add-Type -Path "C:\Octo\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

$spaceName = "default"
$feedName = "nuget.org"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

try
{
    # Get space id
    $space = $repository.Spaces.FindByName($spaceName)
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific repository
    $repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

    # Get Existing feed
    $feed = $repositoryForSpace.Feeds.FindByName($feedName)

    $repositoryForSpace.Feeds.Delete($feed) | Out-Null
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="delete-feed-scripts">
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
string feedName = "nuget to delete";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get Feed
    var feed = repositoryForSpace.Feeds.FindByName(feedName);

    // Delete feed
    repositoryForSpace.Feeds.Delete(feed);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="delete-feed-scripts">
<summary>Python3</summary>

```python
import json
import requests

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

space_name = "Default"
feed_name = "nuget.org"

uri = '{0}/spaces/all'.format(octopus_server_uri)
response = requests.get(uri, headers=headers)
response.raise_for_status()

spaces = json.loads(response.content.decode('utf-8'))
space = next((x for x in spaces if x['Name'] == space_name), None)

uri = '{0}/{1}/feeds/all'.format(octopus_server_uri, space['Id'])
response = requests.get(uri, headers=headers)
response.raise_for_status()

feeds = json.loads(response.content.decode('utf-8'))
feed = next((x for x in feeds if x['Name'] == feed_name), None)

uri = '{0}/{1}/feeds/{2}'.format(octopus_server_uri, space['Id'], feed['Id'])
response = requests.delete(uri, headers=headers)
response.raise_for_status()
```

</details>
<details data-group="delete-feed-scripts">
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
	feedName := "MyFeed"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get feed id
	feedId := GetFeedId(client, feedName)

	if feedId != "" {
		// Delete the feed
		client.Feeds.DeleteByID(feedId)
	} else {
		fmt.Println(feedName + " not found!")
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

func GetFeedId(client *octopusdeploy.Client, feedName string) string {
	// Get the feed
	feedQuery := octopusdeploy.FeedsQuery{
		PartialName: feedName,
	}

	feeds, err := client.Feeds.Get(feedQuery)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(feeds.Items); i++ {
		if feeds.Items[i].GetName() == feedName {
			return feeds.Items[i].GetID()
		}
	}

	return ""
}
```

</details>

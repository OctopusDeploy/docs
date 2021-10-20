```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "New Space"

Write-Host "Getting space '$spaceName'"
$spaces = (Invoke-WebRequest $octopusURL/api/spaces?take=21000 -Headers $header -Method Get -ErrorVariable octoError).Content | ConvertFrom-Json

$space = $spaces.Items | Where-Object Name -eq $spaceName

if ($null -eq $space) {
    Write-Host "Could not find space with name '$spaceName'"
    exit
}

$space.TaskQueueStopped = $true
$body = $space | ConvertTo-Json

Write-Host "Stopping space task queue"
(Invoke-WebRequest $octopusURL/$($space.Links.Self) -Headers $header -Method PUT -Body $body -ErrorVariable octoError) | Out-Null

Write-Host "Deleting space"
(Invoke-WebRequest $octopusURL/$($space.Links.Self) -Headers $header -Method DELETE -ErrorVariable octoError) | Out-Null

Write-Host "Action Complete"
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path 'path\to\Octopus.Client.dll'

$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

$spaceName = "New Space"

$space = $repository.Spaces.FindByName($spaceName)

if ($null -eq $space) {
    Write-Host "The space $spaceName does not exist."
    exit
}

try {
    $space.TaskQueueStopped = $true

    $repository.Spaces.Modify($space) | Out-Null
    $repository.Spaces.Delete($space) | Out-Null
} catch {
    Write-Host $_.Exception.Message
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

var OctopusURL = "https://youroctourl";
var OctopusAPIKey = "API-YOURAPIKEY";

var endpoint = new OctopusServerEndpoint(OctopusURL, OctopusAPIKey);
var repository = new OctopusRepository(endpoint);

var spaceName = "New Space";

try
{
    Console.WriteLine($"Getting space '{spaceName}'.");
    var space = repository.Spaces.FindByName(spaceName);

    if (space == null)
    {
        Console.WriteLine($"Could not find space '{spaceName}'.");
        return;
    }

    Console.WriteLine("Stopping task queue.");
    space.TaskQueueStopped = true;

    repository.Spaces.Modify(space);

    Console.WriteLine("Deleting space");
    repository.Spaces.Delete(space);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
```python Python3
import json
import requests

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

space_name = "Your Space name"

def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()

    return json.loads(response.content.decode('utf-8'))

def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
space['TaskQueueStopped'] = True

# update task queue to stopped
uri = '{0}/spaces/{1}'.format(octopus_server_uri, space['Id'])
response = requests.put(uri, headers=headers, json=space)
response.raise_for_status()

# Delete space
response = requests.delete(uri, headers=headers)
response.raise_for_status()
```
```go Go
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

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)
	space.TaskQueueStopped = true

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	client.Spaces.Update(space)
	deleteErr := client.Spaces.DeleteByID(space.ID)
	if deleteErr != nil {
		log.Println(deleteErr)
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
```java Java
import com.octopus.sdk.Repository;
import com.octopus.sdk.domain.Space;
import com.octopus.sdk.http.ConnectData;
import com.octopus.sdk.http.OctopusClient;
import com.octopus.sdk.http.OctopusClientFactory;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Optional;

public class DeleteSpace {

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

    space.get().getProperties().setTaskQueueStopped(true);
    final Space stoppedSpace = repo.spaces().update(space.get().getProperties());
    repo.spaces().delete(stoppedSpace.getProperties());
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
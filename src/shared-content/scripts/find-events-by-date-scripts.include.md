<details data-group="find-events-by-date-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$eventDate = "8/1/2021"
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

# Get space
$spaces = Get-OctopusItems -OctopusUri "$octopusURL/api/spaces" -ApiKey $octopusAPIKey
$space = $spaces | Where-Object {$_.Name -eq $spaceName}

# Get events
$events = Get-OctopusItems -OctopusUri "$octopusURL/api/$($space.Id)/events?from=$eventDate" -ApiKey $octopusAPIKey

# Display events
foreach ($event in $events)
{
    $event
}
```

</details>
<details data-group="find-events-by-date-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "path:\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURKEY"
$spaceName = "default"
$eventDate = "8/1/2021"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get events
    $events = $repositoryForSpace.Events.List(0, $null, $eventDate)
    $returnedItems = $events

    $skip = $returnedItems.Items.Count
    while ($returnedItems.Items.Count -eq $returnedItems.ItemsPerPage)
    {
        $returnedItems = $repositoryForSpace.Events.List($skip, $null, $eventDate)
        $skip += $returnedItems.Items.Count
        $events.Items.AddRange($returnedItems.Items)
    }

    foreach ($item in $events.Items)
    {
        $item
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="find-events-by-date-scripts">
<summary>C#</summary>

```csharp
#r "path\to\Octopus.Client.dll"
using Octopus.Client;
using Octopus.Client.Model;
using System;
using System.Linq;
using System.Text.RegularExpressions;

// If using .net Core, be sure to add the NuGet package of System.Security.Permissions

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
string spaceName = "Default";
DateTime eventDate = new DateTime(2021, 8, 1);

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get space repository
var space = repository.Spaces.FindByName(spaceName);
var repositoryForSpace = client.ForSpace(space);

// Get events
var events = repositoryForSpace.Events.List(from: eventDate.ToString());
var returnedEvents = events;
int skip = returnedEvents.Items.Count;

while (returnedEvents.Items.Count == returnedEvents.ItemsPerPage)
{
    returnedEvents = repositoryForSpace.Events.List(from: eventDate.ToString(), skip: skip);
    skip += returnedEvents.Items.Count;
    
    foreach (var item in returnedEvents.Items)
    {
        events.Items.Add(item);
    }    
}

// event is a keyword, couldn't use it :)
foreach (var octopusEvent in events.Items)
{
    Console.WriteLine(octopusEvent.Message);
}
```

</details>
<details data-group="find-events-by-date-scripts">
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
    if hasattr(results, 'keys') and 'Items' in results.keys():
        items += results['Items']

        # Check to see if there are more results
        if (len(results['Items']) > 0) and (len(results['Items']) == results['ItemsPerPage']):
            skip_count += results['ItemsPerPage']
            items += get_octopus_resource(uri, headers, skip_count)

    else:
        return results

    
    # return results
    return items

octopus_server_uri = 'https://YourUrl'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
event_date = "8/1/2021"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get events
uri = '{0}/api/{1}/events?from={2}'.format(octopus_server_uri, space['Id'], event_date)
events = get_octopus_resource(uri, headers)

# Display events
for event in events:
    print (event)
```

</details>
<details data-group="find-events-by-date-scripts">
<summary>Go</summary>

```go
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strconv"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	eventDate := "8/1/2021"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get events
	events := GetEvents(apiURL, APIKey, space, eventDate)

	// Loop and display
	for i := 0; i < len(events); i++ {
		fmt.Println(events[i])
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

func GetEvents(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, eventDate string) []interface{} {
	// Define api endpoint
	eventsEndpoint := octopusURL.String() + "/api/" + space.ID + "/events"

	// Create http client
	httpClient := &http.Client{}
	skipAmount := 0

	// Make request
	request, _ := http.NewRequest("GET", eventsEndpoint, nil)
	request.Header.Set("X-Octopus-ApiKey", APIKey)

	queryString := request.URL.Query()
	queryString.Set("from", eventDate)
	request.URL.RawQuery = queryString.Encode()

	response, err := httpClient.Do(request)

	if err != nil {
		log.Println(err)
	}

	// Get response
	responseData, err := ioutil.ReadAll(response.Body)
	var eventsJson interface{}
	err = json.Unmarshal(responseData, &eventsJson)

	// Map the returned data
	returnedEvents := eventsJson.(map[string]interface{})
	// Returns the list of items, translate it to a map
	returnedItems := returnedEvents["Items"].([]interface{})

	for true {
		// check to see if there's more to get
		fltItemsPerPage := returnedEvents["ItemsPerPage"].(float64)
		itemsPerPage := int(fltItemsPerPage)

		if len(returnedEvents["Items"].([]interface{})) == itemsPerPage {
			// Increment skip accoumt
			skipAmount += len(returnedEvents["Items"].([]interface{}))

			// Make request
			queryString := request.URL.Query()
			queryString.Set("skip", strconv.Itoa(skipAmount))
			request.URL.RawQuery = queryString.Encode()
			response, err := httpClient.Do(request)

			if err != nil {
				log.Println(err)
			}

			responseData, err := ioutil.ReadAll(response.Body)
			var releasesJson interface{}
			err = json.Unmarshal(responseData, &releasesJson)

			returnedEvents = releasesJson.(map[string]interface{})
			returnedItems = append(returnedItems, returnedEvents["Items"].([]interface{})...)
		} else {
			break
		}
	}

	return returnedItems
}
```

</details>

<details data-group="create-tagset-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$tagsetName = "Upgrade Ring"
$tagsetDescription = "Describes which upgrade ring the tenant belongs to"

# Optional Tags to add in the format "Tag name", "Tag Color"
$optionalTags = @{}
$optionalTags.Add("Early Adopter", "#ECAD3F")
$optionalTags.Add("Stable", "#36A766")

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# See if tagset already exists
$tagsetResults = (Invoke-RestMethod -Method Get "$octopusURL/api/$($space.Id)/tagsets?partialName=$tagsetName" -Headers $header) 
if( $tagsetResults.TotalResults -gt 0) {
    throw "Existing tagset results found matching '$($tagsetName)'!"
}

$tags = @()
if($optionalTags.Count -gt 0)
{
    foreach ($tagName in $optionalTags.Keys) {
        $tag = @{
            Id = $null
            Name = $tagName
            Color = $optionalTags.Item($tagName)
            Description = ""
            CanonicalTagName = $null
        }
        $tags += $tag
    }
}
# Create tagset json payload
$jsonPayload = @{
    Name = $tagsetName
    Description = $tagsetDescription
    Tags = $tags
}

# Create tagset
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tagsets" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
```

</details>
<details data-group="create-tagset-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "Default"
$tagsetName = "Upgrade Ring"
$tagsetDescription = "Describes which upgrade ring the tenant belongs to"

# Optional Tags to add in the format "Tag name", "Tag Color"
$optionalTags = @{}
$optionalTags.Add("Early Adopter", "#ECAD3F")
$optionalTags.Add("Stable", "#36A766")

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Create or modify tagset
    $tagsetEditor = $repositoryForSpace.TagSets.CreateOrModify($tagsetName, $tagsetDescription)
    
    # Add optional tags
    if($optionalTags.Count -gt 0)
    {
        foreach ($tagName in $optionalTags.Keys) {
            $tagsetEditor.AddOrUpdateTag($tagName, "", $optionalTags.Item($tagName))
        }
    }
    $tagsetEditor.Save()
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="create-tagset-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
var spaceName = "Default";
var tagsetName = "Upgrade Ring";
var tagsetDescription = "Describes which upgrade ring the tenant belongs to";

// Optional Tags to add in the format "Tag name", "Tag Color"
var optionalTags = new Dictionary<string, string>();
optionalTags.Add("Early Adopter", "#ECAD3F");
optionalTags.Add("Stable", "#36A766");

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Create or modify tagset
    var tagsetEditor = repositoryForSpace.TagSets.CreateOrModify(tagsetName, tagsetDescription);

    // Add optional tags
    foreach (var tag in optionalTags)
    {
        tagsetEditor.AddOrUpdateTag(tag.Key, "", tag.Value);
    }
    tagsetEditor.Save();
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="create-tagset-scripts">
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

octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
tagset_name = "MyTagset"
tagset_description = "My description"
tags = []
tag = {
    'Id': None,
    'Name': 'Tag1',
    'Color': '#ECAD3F',
    'Description': 'Tag Description',
    'CanonicalTagName': None
}

tags.append(tag)

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Check to see if tagset exists
uri = '{0}/api/{1}/tagsets?partialName={2}'.format(octopus_server_uri, space['Id'], tagset_name)
tagsets = get_octopus_resource(uri, headers)

if len(tagsets) == 0:
    tagset = {
        'Name': tagset_name,
        'Description': tagset_description,
        'Tags': tags
    }

    uri = '{0}/api/{1}/tagsets'.format(octopus_server_uri, space['Id'])
    response = requests.post(uri, headers=headers, json=tagset)
    response.raise_for_status()    
else:
    print ('{0} already exists!'.format(tagset_name))
```

</details>
<details data-group="create-tagset-scripts">
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
	tagsetName := "MyTagset"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get tagset
	tagset := GetTagSet(apiURL, APIKey, space, tagsetName, 0)

	if tagset == nil {
		// Create new tagset
		tagset = octopusdeploy.NewTagSet(tagsetName)

		// Create new tag
		tag := octopusdeploy.Tag{
			Name:        "MyTag",
			Color:       "#ECAD3F",
			Description: "My tag description",
		}

		// Add to set
		tagset.Tags = append(tagset.Tags, tag)

		// Add to server
		client.TagSets.Add(tagset)
	} else {
		fmt.Println("Tagset " + tagsetName + " already exists!")
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

func GetTagSet(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, tagsetName string, skip int) *octopusdeploy.TagSet {
	// Get client for space
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get tagsets
	tagsetQuery := octopusdeploy.TagSetsQuery {
		PartialName: tagsetName,
	}

	tagsets, err := client.TagSets.Get(tagsetQuery)
	if err != nil {
		log.Println(err)
	}

	if len(tagsets.Items) == tagsets.ItemsPerPage {
		// call again
		tagset := GetTagSet(octopusURL, APIKey, space, tagsetName, (skip + len(tagsets.Items)))

		if tagset != nil {
			return tagset
		}
	} else {
		// Loop through returned items
		for _, tagset := range tagsets.Items {
			if tagset.Name == tagsetName {
				return tagset
			}
		}
	}

	return nil
}
```

</details>
<details data-group="create-tagset-scripts">
<summary>Java</summary>

```java

import com.octopus.sdk.Repository;
import com.octopus.sdk.domain.Space;
import com.octopus.sdk.domain.TagSet;
import com.octopus.sdk.http.ConnectData;
import com.octopus.sdk.http.OctopusClient;
import com.octopus.sdk.http.OctopusClientFactory;
import com.octopus.sdk.model.tag.TagResource;
import com.octopus.sdk.model.tagset.TagSetResource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Optional;

public class CreateTagSet {


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

    final TagSetResource newTagSet = new TagSetResource("TheTagSet");
    newTagSet.addTagsItem(new TagResource("FirstTag", "#ECAD3F"));
    final TagSet tagSet = space.get().tagSets().create(newTagSet);
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

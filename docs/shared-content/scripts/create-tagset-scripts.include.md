```powershell PowerShell (REST API)
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
```powershell PowerShell (Octopus.Client)
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
```csharp C#
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
```python Python3
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
	spaceName := "Default"
	tagsetName := "MyTagset"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get tagset
	tagset := GetTagSet(client, tagsetName)

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

	// Get specific space object
	space, err := client.Spaces.GetByName(spaceName)

	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("Retrieved space " + space.Name)
	}

	return space
}

func GetTagSet(client *octopusdeploy.Client, tagsetName string) *octopusdeploy.TagSet {
	// Get tagsets
	tagSet, err := client.TagSets.GetByName(tagsetName)

	if err != nil {
		log.Println(err)
	}

	return tagSet
}
```
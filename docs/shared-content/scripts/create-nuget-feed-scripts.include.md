```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$feedName = "nuget.org"
$feedURI = "https://api.nuget.org/v3/index.json"
$downloadAttempts = 5
$downloadRetryBackoffSeconds = 10
# Set to $True to use the Extended API.
$useExtendedApi = $False
# Optional
$feedUsername = ""
$feedPassword = ""

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

$body = @{
    Id = $null
    FeedType = "NuGet"
    DownloadAttempts = $downloadAttempts
    DownloadRetryBackoffSeconds = $downloadRetryBackoffSeconds
    EnhancedMode = $useExtendedApi
    Name = $feedName
    FeedUri = $feedURI
}
if(-not ([string]::IsNullOrEmpty($feedUsername))) 
{
    $body.Username = $feedUsername
}
if(-not ([string]::IsNullOrEmpty($feedPassword))) 
{
    $body.Password = $feedPassword
}

# Create Feed
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/feeds" -Body ($body | ConvertTo-Json -Depth 10) -Headers $header
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path "C:\Octo\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

$spaceName = "default"
$feedName = "nuget.org"
$feedURI = "https://api.nuget.org/v3/index.json"
$downloadAttempts = 5
$downloadRetryBackoffSeconds = 10
# Set to $True to use the Extended API.
$useExtendedApi = $False
# Optional
$feedUsername = ""
$feedPassword = ""

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

try
{
    # Get space id
    $space = $repository.Spaces.FindByName($spaceName)
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific repository
    $repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

    # Set new feed resource
    $feedResource = New-Object Octopus.Client.Model.NuGetFeedResource
    $feedResource.SpaceId = $space.Id
    $feedResource.Name = $feedName
    $feedResource.FeedUri = $feedURI
    $feedResource.DownloadAttempts = $downloadAttempts
    $feedResource.DownloadRetryBackoffSeconds = $downloadRetryBackoffSeconds
    $feedResource.EnhancedMode = $useExtendedApi

    if(-not ([string]::IsNullOrEmpty($feedUsername)))
    {
        $feedResource.Username = $feedUsername
    }
    if(-not ([string]::IsNullOrEmpty($feedPassword)))
    {
        $feedResource.Password = $feedPassword
    }

    # Create new feed
    $feed = $repositoryForSpace.Feeds.Create($feedResource)
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

string spaceName = "Default";
string feedName = "nuget.org 3";
string feedURI = "https://api.nuget.org/v3/index.json";
int downloadAttempts = 5;
int downloadRetryBackoffSeconds = 10;
bool useExtendedApi = false;
// optional
string feedUsername = "";
string feedPassword = "";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    var feedResource = new NuGetFeedResource
    {
        SpaceId = space.Id,
        Name = feedName,
        FeedUri = feedURI,
        DownloadAttempts = downloadAttempts,
        DownloadRetryBackoffSeconds = downloadRetryBackoffSeconds,
        EnhancedMode = useExtendedApi
    };
    if (!string.IsNullOrWhiteSpace(feedUsername))
    {
        feedResource.Username=feedUsername;
    }
    if (!string.IsNullOrWhiteSpace(feedPassword))
    {
        feedResource.Password = feedPassword;
    }
    var feed = repositoryForSpace.Feeds.Create(feedResource);
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

space_name = 'Default'

feed = {
    'Id': None,
    'Name': 'nuget.org',
    'FeedUri': 'https://api.nuget.org/v3/index.json',
    'FeedType': 'NuGet',
    'DownloadAttempts': 5,
    'DownloadRetryBackoffSeconds': 10,
    'EnhancedMode': False
    # 'Username': 'uncomment to provide credentials'
    # 'Password': 'uncomment to provide credentials'
}

uri = '{0}/spaces/all'.format(octopus_server_uri)
response = requests.get(uri, headers=headers)
response.raise_for_status()

spaces = json.loads(response.content.decode('utf-8'))
space = next((x for x in spaces if x['Name'] == space_name), None)

uri = '{0}/{1}/feeds'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=feed)
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
	APIKey := "API-YourAPI  Key"
	spaceName := "Default"
	feedName := "MyNugetFeed"
	feedUri := "https://api.nuget.org/v3/index.json"
	downloadAttempts := 5
	downloadRetryBackoffSeconds := 10
	feedUsername := ""
	feedPassword := ""

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Create feed resource
	feed := octopusdeploy.NewFeedResource(feedName, octopusdeploy.FeedTypeNuGet)
	feed.FeedURI = feedUri
	feed.DownloadAttempts = downloadAttempts
	feed.DownloadRetryBackoffSeconds = downloadRetryBackoffSeconds
	feed.Username = feedUsername
	feed.Password = octopusdeploy.NewSensitiveValue(feedPassword)
     
	// Add to space
	client.Feeds.Add(feed)
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
```
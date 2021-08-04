```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$librarySetName = "MyLibrarySet"


# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get library set reference
$librarySet = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets/all" -Headers $header) | Where-Object {$_.Name -eq $librarySetName}

# Get all projects
$projects = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

# Loop through projects
Write-Host "The following projects are using $librarySetName"
foreach ($project in $projects)
{
    # Check to see if it's using the set
    if ($project.IncludedLibraryVariableSetIds -contains $librarySet.Id)
    {
        Write-Host "$($project.Name)"
    }
}
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$librarySetName = "MyLibrarySet"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get Library set
    $librarySet = $repositoryForSpace.LibraryVariableSets.FindByName($librarySetName)
    
    # Get Projects
    $projects = $repositoryForSpace.Projects.GetAll()

    # Show all projects using set
    Write-Host "The following projects are using $librarySetName"
    foreach ($project in $projects)
    {
        if ($project.IncludedLibraryVariableSetIds -contains $librarySet.Id)
        {
            Write-Host "$($project.Name)"
        }
    }
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
string spaceName = "default";
string librarySetName = "MyLibrarySet";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get projects
    var projects = repositoryForSpace.Projects.GetAll();

    // Get library set
    var librarySet = repositoryForSpace.LibraryVariableSets.FindByName(librarySetName);

    // Loop through projects
    Console.WriteLine(string.Format("The following projects are using {0}", librarySetName));
    foreach (var project in projects)
    {
        if (project.IncludedLibraryVariableSetIds.Contains(librarySet.Id))
        {
            Console.WriteLine(project.Name);
        }
    }
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

def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()

    return json.loads(response.content.decode('utf-8'))

def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)

space_name = 'Default'
libraryset_name = 'Your variable set name'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
library_variable_set = get_by_name('{0}/{1}/libraryvariablesets/all'.format(octopus_server_uri, space['Id']), libraryset_name)
library_variable_set_id = library_variable_set['Id']

projects = get_octopus_resource('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']))

for project in projects:
    project_variable_sets = project['IncludedLibraryVariableSetIds']
    if library_variable_set_id in project_variable_sets:
        print('Project \'{0}\' is using library variable set \'{1}\''.format(project['Name'], libraryset_name))
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
	librarySetName := "LibrarySetName"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get library set
	librarySet := GetLirarySet(client, librarySetName)

	// Get events
	projects, err := client.Projects.GetAll()

	if err != nil {
		log.Println(err)
	}

	fmt.Println("The following projects use library set " + librarySetName)

	// Loop through projects
	for i := 0; i < len(projects); i++ {
		if contains(projects[i].IncludedLibraryVariableSets, librarySet.ID) {
			fmt.Println(projects[i].Name)
		}
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

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}

func GetLirarySet(client *octopusdeploy.Client, librarySetName string) *octopusdeploy.LibraryVariableSet {
	// Get the library set
	librarySets, err := client.LibraryVariableSets.GetByPartialName(librarySetName)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(librarySets); i++ {
		if librarySets[i].Name == librarySetName {
			return librarySets[i]
		}
	}

	return nil
}
```
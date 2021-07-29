```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

Function Clear-SensitiveVariables
{
    # Define function variables
    param ($VariableCollection)

    # Loop through variables
    foreach ($variable in $VariableCollection)
    {
        # Check for sensitive
        if ($variable.IsSensitive)
        {
            $variable.Value = [string]::Empty
        }
    }

    # Return collection
    return $VariableCollection
}

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get all projects
$projects = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

# Loop through projects
foreach ($project in $projects)
{
    # Get variable set
    $variableSet = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Headers $header
    
    # Check for variables
    if ($variableSet.Variables.Count -gt 0)
    {
        $variableSet.Variables = Clear-SensitiveVariables -VariableCollection $variableSet.Variables

        # Update set
        Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Body ($variableSet | ConvertTo-Json -Depth 10) -Headers $header
    }
}

# Get all libarary sets
$variableSets = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets/all" -Headers $header

# Loop through variablesets
foreach ($variableSet in $variableSets)
{
    # Get the variableset
    $variableSet = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets/$($variableSet.Id)" -Headers $header
    
    # Check for variables
    if ($variableSet.Variables.Count -gt 0)
    {
        $variableSet.Variables = Clear-SensitiveVariables -VariableCollection $variableSet.Variables

        # Update set
        Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets/$($variableSet.Id)" -Body ($variableSet | ConvertTo-Json -Depth 10) -Headers $header            
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

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

Function Clear-SensitiveVariables
{
    # Define function variables
    param ($VariableSetId)

    # Get the variable set
    $variableSet = $repositoryForSpace.VariableSets.Get($VariableSetId)

    # Loop through variables
    foreach ($variable in $VariableSet)
    {
        # Check for sensitive
        if ($variable.IsSensitive)
        {
            $variable.Value = [string]::Empty
        }
    }

    # Update set
    $repositoryForSpace.VariableSets.Modify($variableSet)
}

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Loop through projects
    foreach ($project in $repositoryForSpace.Projects.GetAll())
    {
        # Clear the sensitive ones
        Clear-SensitiveVariables -VariableSetId $project.VariableSetId
    }
    
    # Loop through library variable sets
    foreach ($libararySet in $repositoryForSpace.LibraryVariableSets.GetAll())
    {
        # Clear sensitive ones
        Clear-SensitiveVariables -VariableSetId $libararySet.VariableSetId
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

// Declare working variables
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
var spaceName = "default";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Loop through projects
    foreach (var project in repositoryForSpace.Projects.GetAll())
    {
        var variableSet = repositoryForSpace.VariableSets.Get(project.VariableSetId);

        foreach (var variable in variableSet.Variables)
        {
            if (variable.IsSensitive)
            {
                variable.Value = string.Empty;
            }
        }

        repositoryForSpace.VariableSets.Modify(variableSet);
    }

    // Loop through library sets
    foreach (var librarySet in repositoryForSpace.LibraryVariableSets.FindAll())
    {
        var variableSet = repositoryForSpace.VariableSets.Get(librarySet.VariableSetId);

        foreach (var variable in variableSet.Variables)
        {
            if (variable.IsSensitive)
            {
                variable.Value = string.Empty;
            }
        }

        repositoryForSpace.VariableSets.Modify(variableSet);
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
octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "MySpace"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get all projects
uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)

for project in projects:
    uri = '{0}{1}'.format(octopus_server_uri, project['Links']['Variables'])
    projectVariables = get_octopus_resource(uri, headers)
    variablesUpdated = False

    for variable in projectVariables['Variables']:
        if variable['IsSensitive']:
            variable['Value'] = ""
            variablesUpdated = True

    if variablesUpdated:
        print ('Clearing sensitive variables for project {0}'.format(project['Name']))
        uri = '{0}{1}'.format(octopus_server_uri, project['Links']['Variables'])
        response = requests.put(uri, headers=headers, json=projectVariables)
        response.raise_for_status

# Get all variable sets
uri = '{0}/api/{1}/libraryvariablesets'.format(octopus_server_uri, space['Id'])
variableSets = get_octopus_resource(uri, headers)

for variableSet in variableSets:
    uri = '{0}{1}'.format(octopus_server_uri, variableSet['Links']['Variables'])
    libraryVariables = get_octopus_resource(uri, headers)
    variablesUpdated = False

    for variable in libraryVariables['Variables']:
        if variable['IsSensitive']:
            variable['Value'] = ""
            variablesUpdated = True

    if variablesUpdated:
        print ('Clearing senitive variables for library set {0}'.format(variableSet['Name']))
        uri = '{0}{1}'.format(octopus_server_uri, variableSet['Links']['Variables'])
        response = requests.put(uri, headers=headers, json=libraryVariables)
        response.raise_for_status
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

	apiURL, err := url.Parse("http://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "MySace"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get reference to all projects
	projects := GetProjects(apiURL, APIKey, space)

	// Loop through projects
	for i := 0; i < len(projects); i++ {
		//projectVariables := GetProjectVariables(apiURL, APIKey, projects[i])
		projectVariables := GetVariables(apiURL, APIKey, space, projects[i].ID)
		variablesUpdated := false
		for j := 0; j < len(projectVariables.Variables); j++ {
			if projectVariables.Variables[j].IsSensitive {
				projectVariables.Variables[j].Value = ""
				variablesUpdated = true
			}
		}

		if variablesUpdated {
			println("Variables for " + projects[i].Name + " have been updated")
			UpdateVariables(apiURL, APIKey, space, projectVariables.OwnerID, projectVariables)
		}
	}

	// Get reference to library variable sets
	librarySets := GetLibraryVariableSets(apiURL, APIKey, space)

	// Loop through sets
	for i := 0; i < len(librarySets); i++ {
		librarysetVariables := GetVariables(apiURL, APIKey, space, librarySets[i].ID)
		variablesUpdated := false
		for j := 0; j < len(librarysetVariables.Variables); j++ {
			if librarysetVariables.Variables[j].IsSensitive {
				librarysetVariables.Variables[j].Value = ""
				variablesUpdated = true
			}
		}

		if variablesUpdated {
			println("Variables for " + librarySets[i].Name + " have been updated")
			UpdateVariables(apiURL, APIKey, space, librarysetVariables.OwnerID, librarysetVariables)
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

func GetProjects(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space) []*octopusdeploy.Project {
	// Create client object
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get all projects
	projects, err := client.Projects.GetAll()

	if err != nil {
		log.Println(err)
	}

	return projects
}

func GetVariables(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, ownerID string) octopusdeploy.VariableSet {
	// Create client object
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// retrieve variables
	variables, err := client.Variables.GetAll(ownerID)

	if err != nil {
		log.Println(err)
	}

	return variables
}

func GetLibraryVariableSets(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space) []*octopusdeploy.LibraryVariableSet {
	// Create client object
	client := octopusAuth(octopusURL, APIKey, space.ID)

	librarySets, err := client.LibraryVariableSets.GetAll()

	if err != nil {
		log.Println(err)
	}

	return librarySets
}

func UpdateVariables(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, ownerID string, variables octopusdeploy.VariableSet) {
	client := octopusAuth(octopusURL, APIKey, space.ID)

	variableSet, err := client.Variables.Update(ownerID, variables)

	if err != nil {
		log.Println(err)
	}

	fmt.Println(variableSet.ID + " updated")
}
```
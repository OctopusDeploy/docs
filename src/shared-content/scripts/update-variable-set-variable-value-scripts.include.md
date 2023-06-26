<details data-group="update-variable-set-variable-value-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";
# Define working variables
$octopusURL = "http://your.octopus.app/"
$octopusAPIKey = "YOUR-APIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# Specify the Space to search in
$spaceName = ""

# Library Variable Set
$libraryVariableSetName = ""

# Variable name to search for
$VariableName = ""

# New variable value to set
$VariableValue = ""

$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

Write-Host "Looking for library variable set '$libraryVariableSet'"
$LibraryvariableSets = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets?contentType=Variables" -Headers $header)
$LibraryVariableSet = $LibraryVariableSets.Items | Where-Object { $_.Name -eq $libraryVariableSetName }

if ($null -eq $libraryVariableSet) {
    Write-Warning "Library variable set not found with name '$libraryVariableSetName'."
    exit
}

$LibraryVariableSetVariables = (Invoke-RestMethod -Method Get -Uri "$OctopusURL/api/$($Space.Id)/variables/$($LibraryVariableSet.VariableSetId)" -Headers $Header) 

for($i=0; $i -lt $LibraryVariableSetVariables.Variables.Length; $i++) {
    $existingVariable = $LibraryVariableSetVariables.Variables[$i];
    if($existingVariable.Name -eq $VariableName) {
        Write-Host "Found existing variable, updating its value"
        $existingVariable.Value = $VariableValue
    }
}

$existingVariable = $LibraryVariableSetVariables.Variables  | Where-Object {$_.name -eq $VariableName} | Select-Object -First 1 

$UpdatedLibraryVariableSet = Invoke-RestMethod -Method Put -Uri "$OctopusURL/api/$($Space.Id)/variables/$($LibraryVariableSetVariables.Id)" -Headers $Header -Body ($LibraryVariableSetVariables | ConvertTo-Json -Depth 10)   
```

</details>
<details data-group="update-variable-set-variable-value-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
# Define working variables
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$libraryVariableSetName = "MyLibraryVariableSet"
$variableName = "MyVariable"
$variableValue = "MyValue"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get repository specific to space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

Write-Host "Looking for library variable set '$libraryVariableSetName'"

$librarySet = $repositoryForSpace.LibraryVariableSets.FindByName($libraryVariableSetName)

# Check to see if something was returned
if ($null -eq $librarySet)
{
    Write-Warning "Library variable not found with name '$libraryVariabelSetName'"
    exit
}

# Get the variableset
$variableSet = $repositoryForSpace.VariableSets.Get($librarySet.VariableSetId)

# Get the variable
($variableSet.Variables | Where-Object {$_.Name -eq $variableName}).Value = $variableValue

# Update
$repositoryForSpace.VariableSets.Modify($variableSet)
```

</details>
<details data-group="update-variable-set-variable-value-scripts">
<summary>C#</summary>

```csharp
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using System.Linq;

var octopusURL = "https://your.octopus.app";
var octopusAPIKey = "API-YOURKEY";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);
var spaceName = "Default";
string libraryVariableSetName = "MyLibraryVariableSet";
string variableName = "MyVariable";
string variableValue = "MyValue";

var space = repository.Spaces.FindByName(spaceName);
var repositoryForSpace = client.ForSpace(space);

Console.WriteLine(string.Format("Looking for library variable set '{0}'", libraryVariableSetName));

var librarySet = repositoryForSpace.LibraryVariableSets.FindByName(libraryVariableSetName);

if (null == librarySet)
{
    throw new Exception(string.Format("Library variable not found with name '{0}'", libraryVariableSetName));
}

// Get the variable set
var variableSet = repositoryForSpace.VariableSets.Get(librarySet.VariableSetId);

// Update the variable
variableSet.Variables.FirstOrDefault(v => v.Name == variableName).Value = variableValue;
repositoryForSpace.VariableSets.Modify(variableSet);
```

</details>
<details data-group="update-variable-set-variable-value-scripts">
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
library_variable_set_name = "MyLibraryVariableSet"
variable_name = "MyVariable"
variable_value = "MyValue"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

print('Looking for library variable set "{0}"'.format(library_variable_set_name))

# Get library variable set
uri = '{0}/api/{1}/libraryvariablesets'.format(octopus_server_uri, space['Id'])
library_variable_sets = get_octopus_resource(uri, headers)
library_variable_set = next((l for l in library_variable_sets if l['Name'] == library_variable_set_name), None)

# Check to see if something was returned
if library_variable_set == None:
    print('Library variable set not found with name "{0}"'.format(library_variable_set_name))
    exit

# Get the the variables
uri = '{0}/api/{1}/variables/{2}'.format(octopus_server_uri, space['Id'], library_variable_set['VariableSetId'])
library_variables = get_octopus_resource(uri, headers)

# Update the variable
for variable in library_variables['Variables']:
    if variable['Name'] == variable_name:
        variable['Value'] = variable_value
        break

response = requests.put(uri, headers=headers, json=library_variables)
response.raise_for_status()
```

</details>
<details data-group="update-variable-set-variable-value-scripts">
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
	libraryVariableSetName := "MyLibraryVariableSet"
	variableName := "MyVariable"
	variableValue := "MyValue"

	// Get the space object
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client for space
	client := octopusAuth(apiURL, APIKey, space.ID)

	fmt.Printf("Looking for library variable set '%[1]s", libraryVariableSetName)

	// Get the library library set
	librarySet := GetLibrarySet(client, space, libraryVariableSetName, 0)

	// Get the variable set
	variableSet, err := client.Variables.GetAll(librarySet.ID)
	if err != nil {
		log.Println(err)
	}

	// Loop through variables
	for _, variable := range variableSet.Variables {
		if variable.Name == variableName {
			variable.Value = variableValue
			break
		}
	}

	// Update the set
	client.Variables.Update(librarySet.ID, variableSet)
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

func GetLibrarySet(client *octopusdeploy.Client, space *octopusdeploy.Space, librarySetName string, skip int) *octopusdeploy.LibraryVariableSet {
	// Create library sets query
	librarySetsQuery := octopusdeploy.LibraryVariablesQuery{
		PartialName: librarySetName,
	}

	// Get Library set
	librarySets, err := client.LibraryVariableSets.Get(librarySetsQuery)

	if err != nil {
		log.Println(err)
	}

	// Loop through results
	if len(librarySets.Items) == librarySets.ItemsPerPage {
		// Call again
		librarySet := GetLibrarySet(client, space, librarySetName, (skip + len(librarySets.Items)))

		if librarySet != nil {
			return librarySet
		}
	} else {
		for _, librarySet := range librarySets.Items {
			if librarySet.Name == librarySetName {
				return librarySet
			}
		}
	}

	return nil
}
```

</details>

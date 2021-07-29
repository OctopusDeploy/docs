```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$projectName = "MyProject"
$variable = @{
    Name = "MyVariable"
    Value = "MyValue"
    Type = "String"
    IsSensitive = $false
}

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Get project variables
$projectVariables = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Headers $header

# Check to see if varialbe is already present
$variableToUpdate = $projectVariables.Variables | Where-Object {$_.Name -eq $variable.Name}
if ($null -eq $variableToUpdate)
{
    # Create new object
    $variableToUpdate = New-Object -TypeName PSObject
    $variableToUpdate | Add-Member -MemberType NoteProperty -Name "Name" -Value $variable.Name
    $variableToUpdate | Add-Member -MemberType NoteProperty -Name "Value" -Value $variable.Value
    $variableToUpdate | Add-Member -MemberType NoteProperty -Name "Type" -Value $variable.Type
    $variableToUpdate | Add-Member -MemberType NoteProperty -Name "IsSensitive" -Value $variable.IsSensitive

    # Add to collection
    $projectVariables.Variables += $variableToUpdate

    $projectVariables.Variables
}

# Update the value
$variableToUpdate.Value = $variable.Value

# Update the collection
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Headers $header -Body ($projectVariables | ConvertTo-Json -Depth 10)
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$variable = @{
    Name = "MyVariable"
    Value = "MyValue"
    Type = "String"
    IsSensitive = $false
}

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    [Octopus.Client.Model.ProjectResource]$project = $repositoryForSpace.Projects.FindByName($projectName)

    # Get project variables
    $projectVariables = $repositoryForSpace.VariableSets.Get($project.VariableSetId)

    # Check to see if variable exists
    $variableToUpdate = ($projectVariables.Variables | Where-Object {$_.Name -eq $variable.Name})
    if ($null -eq $variableToUpdate)
    {
        # Create new object
        $variableToUpdate = New-Object Octopus.Client.Model.VariableResource
        $variableToUpdate.Name = $variable.Name
        $variableToUpdate.IsSensitive = $variable.IsSensitive
        $variableToUpdate.Value = $variable.Value
        $variableToUpdate.Type = $variable.Type

        # Add to collection
        $projectVariables.Variables.Add($variableToUpdate)
    }
    else
    {
        # Update the value
        $variableToUpdate.Value = $variable.Value
    }

    # Update the projectvariable
    $repositoryForSpace.VariableSets.Modify($projectVariables)
}
catch
{
    Write-Host $_.Exception.Message
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string projectName = "MyProject";
System.Collections.Hashtable variable = new System.Collections.Hashtable()
{
    { "Name", "MyVariable" },
    {"Value", "MyValue" },
    {"Type", "String" },
    {"IsSensitive", false }
};

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get project variables
    var projectVariables = repositoryForSpace.VariableSets.Get(project.VariableSetId);

    // Check to see if variable exists
    var variableToUpdate = projectVariables.Variables.FirstOrDefault(v => v.Name == (variable["Name"]).ToString());
    if (variableToUpdate == null)
    {
        // Create new variable object
        variableToUpdate = new Octopus.Client.Model.VariableResource();
        variableToUpdate.Name = variable["Name"].ToString();
        variableToUpdate.Value = variable["Value"].ToString();
        variableToUpdate.Type = (Octopus.Client.Model.VariableType)Enum.Parse(typeof(Octopus.Client.Model.VariableType), variable["Type"].ToString());
        variableToUpdate.IsSensitive = bool.Parse(variable["IsSensitive"].ToString());

        // Add to collection
        projectVariables.Variables.Add(variableToUpdate);
    }
    else
    {
        // Update value
        variableToUpdate.Value = variable["Value"].ToString();
    }

    // Update collection
    repositoryForSpace.VariableSets.Modify(projectVariables);
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
    response = requests.get((uri + "?skip=" + str(skip_count)), headers=headers)
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
octopus_server_uri = 'https://YourURL/api'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
project_name = "MyProject"
space_name = "Default"
variable = {
    'Name': 'MyVariable',
    'Value': 'MyValue',
    'Type': 'String',
    'IsSensitive': False
}

uri = '{0}/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

uri = '{0}/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)
project = next((x for x in projects if x['Name'] == project_name), None)

if project != None:
    uri = '{0}/{1}/variables/{2}'.format(octopus_server_uri, space['Id'], project['VariableSetId'])
    projectVariables = get_octopus_resource(uri, headers)
    projectVariable = next((x for x in projectVariables['Variables'] if x['Name'] == variable['Name']), None)

    if projectVariable == None:
        projectVariables['Variables'].append(variable)
    else:
        projectVariable['Value'] = variable['Value']
        projectVariable['Type'] = variable['Type']
        projectVariable['IsSensitive'] = variable ['IsSensitive']
   
    response = requests.put(uri, headers=headers, json=projectVariables)
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

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	variable := octopusdeploy.NewVariable("MyVariable")
	variable.IsSensitive = false
	variable.Type = "String"
	variable.Value = "MyValue"
	projectName := "MyProject"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get project reference
	project := GetProject(apiURL, APIKey, space, projectName)

	// Get project variables
	projectVariables := GetProjectVariables(apiURL, APIKey, space, project)
	variableFound := false

	for i := 0; i < len(projectVariables.Variables); i++ {
		if projectVariables.Variables[i].Name == variable.Name {
			projectVariables.Variables[i].IsSensitive = variable.IsSensitive
			projectVariables.Variables[i].Type = variable.Type
			projectVariables.Variables[i].Value = variable.Value

			variableFound = true
			break
		}
	}

	if !variableFound {
		projectVariables.Variables = append(projectVariables.Variables, variable)
	}

	// Update target
	client := octopusAuth(apiURL, APIKey, space.ID)
	client.Variables.Update(project.ID, projectVariables)
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

func GetProject(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, projectName string) *octopusdeploy.Project {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get project
	project, err := client.Projects.GetByName(projectName)

	if err != nil {
		log.Println(err)
	}

	if project != nil {
		fmt.Println("Retrieved project " + project.Name)
	} else {
		fmt.Println("Project " + projectName + " not found!")
	}

	return project
}

func GetProjectVariables(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, project *octopusdeploy.Project) octopusdeploy.VariableSet {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get project variables
	projectVariables, err := client.Variables.GetAll(project.ID)

	if err != nil {
		log.Println(err)
	}

	return projectVariables
}
```
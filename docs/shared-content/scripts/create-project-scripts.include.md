```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$projectDescription = "MyDescription"
$projectGroupName = "Default project group"
$lifecycleName = "Default lifecycle"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project group
$projectGroup = (Invoke-RestMethod -Method Get "$octopusURL/api/$($space.Id)/projectgroups/all" -Headers $header) | Where-Object {$_.Name -eq $projectGroupName}

# Get Lifecycle
$lifeCycle = (Invoke-RestMethod -Method Get "$octopusURL/api/$($space.Id)/lifecycles/all" -Headers $header) | Where-Object {$_.Name -eq $lifecycleName}

# Create project json payload
$jsonPayload = @{
    Name = $projectName
    Description = $projectDescription
    ProjectGroupId = $projectGroup.Id
    LifeCycleId = $lifeCycle.Id
}

# Create project
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/projects" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$projectGroupName = "Default project group"
$lifecycleName = "Default lifecycle"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project group
    $projectGroup = $repositoryForSpace.ProjectGroups.FindByName($projectGroupName)

    # Get lifecycle
    $lifecycle = $repositoryForSpace.Lifecycles.FindByName($lifecycleName)

    # Create new project
    $project = $repositoryForSpace.Projects.CreateOrModify($projectName, $projectGroup, $lifecycle)
    $project.Save()
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
string projectName = "MyProject";
string projectGroupName = "Default project group";
string lifecycleName = "Default lifecycle";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project group
    var projectGroup = repositoryForSpace.ProjectGroups.FindByName(projectGroupName);

    // Get lifecycle
    var lifecycle = repositoryForSpace.Lifecycles.FindByName(lifecycleName);

    // Create project
    var project = repositoryForSpace.Projects.CreateOrModify(projectName, projectGroup, lifecycle);
    project.Save();
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
project_name = 'Your new Project Name'
project_description = 'My project created with python'
project_group_name = 'Default Project Group'
lifecycle_name = 'Default Lifecycle'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project_group = get_by_name('{0}/{1}/projectgroups/all'.format(octopus_server_uri, space['Id']), project_group_name)
lifecycle = get_by_name('{0}/lifecycles/all'.format(octopus_server_uri, space['Id']), lifecycle_name)

project = {
    'Name': project_name,
    'Description': project_description,
    'ProjectGroupId': project_group['Id'],
    'LifeCycleId': lifecycle['Id']
}

uri = '{0}/{1}/projects'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=project)
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
	spaceName := "Default"
	projectName := "MyProject"
	projectGroupName := "MyProjectGroup"
	lifeCycleName := "Default Lifecycle"

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project group
	projectGroup := GetProjectGroup(client, projectGroupName)

	// Get lifecycle
	lifecycle := GetLifecycle(client, lifeCycleName)

	// Create project
	project := CreateProject(client, lifecycle, projectGroup, projectName)

	fmt.Println("Created project " + project.ID)
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

func GetProjectGroup(client *octopusdeploy.Client, projectGroupName string) *octopusdeploy.ProjectGroup {
	// Get matching project groups
	projectGroups, err := client.ProjectGroups.GetByPartialName(projectGroupName)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(projectGroups); i++ {
		if projectGroups[i].Name == projectGroupName {
			return projectGroups[i]
		}
	}

	return nil
}

func GetLifecycle(client *octopusdeploy.Client, lifecycleName string) *octopusdeploy.Lifecycle {
	// Get lifecycle
	lifecycles, err := client.Lifecycles.GetByPartialName(lifecycleName)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(lifecycles); i++ {
		if lifecycles[i].Name == lifecycleName {
			return lifecycles[i]
		}
	}

	return nil
}

func CreateProject(client *octopusdeploy.Client, lifecycle *octopusdeploy.Lifecycle, projectGroup *octopusdeploy.ProjectGroup, name string) *octopusdeploy.Project {
	project := octopusdeploy.NewProject(name, lifecycle.ID, projectGroup.ID)

	project, err := client.Projects.Add(project)

	if err != nil {
		log.Println(err)
	}

	return project
}
```

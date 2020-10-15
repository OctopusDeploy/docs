```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$projectDescription = "MyDescription"
$projectGroupName = "Default project group"
$lifecycleName = "Default lifecycle"

try
{
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
}
catch
{
    Write-Host $_.Exception.Message
}
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
	"os"

	"github.com/OctopusDeploy/go-octopusdeploy/client"
	"github.com/OctopusDeploy/go-octopusdeploy/model"
	"golang.org/x/crypto/ssh/terminal"
)

func main() {
	octopusURL := os.Args[1]
	space := os.Args[2]
	name := os.Args[3]
	projectGroupID := os.Args[4]
	lifecycleID := os.Args[5]

	fmt.Println("Enter Password Securely: ")
	apiKey, err := terminal.ReadPassword(0)

	if err != nil {
		log.Println(err)
	}

	APIKey := string(apiKey)

	octopusAuth(octopusURL, APIKey, space)
	CreateProject(octopusURL, APIKey, space, name, lifecycleID, projectGroupID)

}

func octopusAuth(octopusURL, APIKey, space string) *client.Client {
	client, err := client.NewClient(nil, octopusURL, APIKey, space)
	if err != nil {
		log.Println(err)
	}

	return client
}

func CreateProject(octopusURL, APIKey, space, name, lifecycleID, projectGroupID string) *model.Project {
	client := octopusAuth(octopusURL, APIKey, space)
	Project := model.NewProject(name, lifecycleID, projectGroupID)

	client.Projects.Add(Project)

	return Project
}
```
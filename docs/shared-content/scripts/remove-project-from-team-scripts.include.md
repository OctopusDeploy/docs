```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$projectName = "MyProject"
$spaceName = "default"
$teamName = "MyTeam"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Get team
$team = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams" -Headers $header).Items | Where-Object {$_.Name -eq $teamName}

# Get scoped user roles
$scopedUserRoles = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams/$($team.Id)/scopeduserroles" -Headers $header).Items | Where-Object {$_.ProjectIds -contains $project.Id}

# Loop through results and remove project Id
foreach ($scopedUserRole in $scopedUserRoles)
{
    # Filter out project
    $scopedUserRole.ProjectIds = ,($scopedUserRole.ProjectIds | Where-Object {$_ -notcontains $project.Id}) # Yes, the , is supposed to be there
    
    # Update scoped user role
    Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/scopeduserroles/$($scopedUserRole.Id)" -Body ($scopedUserRole | ConvertTo-Json -Depth 10) -Headers $header
}
```
```powershell Powershell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$teamName = "MyTeam"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $project = $repositoryForSpace.Projects.FindByName($projectName)
    
    # Get team
    $team = $repositoryForSpace.Teams.FindByName($teamName)

    # Get scoped user roles
    $scopedUserRoles = $repositoryForSpace.ScopedUserRoles.FindMany({param($p) $p.ProjectIds -contains $project.Id -and $p.TeamId -eq $team.Id})
    
    # Loop through scoped user roles and remove where present
    foreach ($scopedUserRole in $scopedUserRoles)
    {
        $scopedUserRole.ProjectIds = [Octopus.Client.Model.ReferenceCollection]($scopedUserRole.ProjectIds | Where-Object {$_ -notcontains $project.Id})
        $repositoryForSpace.ScopedUserRoles.Modify($scopedUserRole)
    }
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
var spaceName = "default";
string projectName = "MyProject";
string teamName = "MyTeam";

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

    // Get team
    var team = repositoryForSpace.Teams.FindByName(teamName);

    // Get scoped user roles
    var scopedUserRoles = repository.Teams.GetScopedUserRoles(team);

    // Loop through scoped user roles and remove project reference
    foreach (var scopedUserRole in scopedUserRoles)
    {
        scopedUserRole.ProjectIds = new Octopus.Client.Model.ReferenceCollection(scopedUserRole.ProjectIds.Where(p => p != project.Id).ToArray());
        repositoryForSpace.ScopedUserRoles.Modify(scopedUserRole);
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
import csv

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

octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = 'Default'
project_name = "MyProject"
team_name = "MyTeam"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get project
uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)
project = next((p for p in projects if p['Name'] == project_name), None)

# Get team
uri = '{0}/api/{1}/teams'.format(octopus_server_uri, space['Id'])
teams = get_octopus_resource(uri, headers)
team = next((t for t in teams if t['Name'] == team_name), None)

# Get scoped user roles
uri = '{0}/api/{1}/teams/{2}/scopeduserroles'.format(octopus_server_uri, space['Id'], team['Id'])
scoped_user_roles = get_octopus_resource(uri, headers)

for scoped_user_role in scoped_user_roles:
    if project['Id'] in scoped_user_role['ProjectIds']:
        scoped_user_role['ProjectIds'].remove(project['Id'])

        # Update the scoped user role
        print('Removing team {0} from project {1}'.format(team['Name'], project['Name']))
        uri = '{0}/api/{1}/scopeduserroles/{2}'.format(octopus_server_uri, space['Id'], scoped_user_role['Id'])
        response = requests.put(uri, headers=headers, json=scoped_user_role)
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
	teamName := "MyTeam"

	// Get the space object
	space := GetSpace(apiURL, APIKey, spaceName)

	// Creat client for space
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get team
	team := GetTeam(client, space, teamName, 0)

	// Get project
	project := GetProject(apiURL, APIKey, space, projectName)

	// Get the scoped user roles for the team
	scopedUserRoles, err := client.Teams.GetScopedUserRoles(*team, octopusdeploy.SkipTakeQuery{Skip: 0, Take: 1000})
	if err != nil {
		log.Println(err)
	}

	// Loop through scoped user roles
	for _, scopedUserRole := range scopedUserRoles.Items {
		if arrayContains(scopedUserRole.ProjectIDs, project.ID) {
			// Rebuild slice without that Id
			fmt.Printf("Removing %[1]s from %[2]s \n", team.Name, project.Name)
			scopedUserRole.ProjectIDs = RemoveFromArray(scopedUserRole.ProjectIDs, project.ID)
			client.ScopedUserRoles.Update(scopedUserRole)
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

func GetTeam(client *octopusdeploy.Client, space *octopusdeploy.Space, teamName string, skip int) *octopusdeploy.Team {

	// Create query
	teamsQuery := octopusdeploy.TeamsQuery{
		PartialName: teamName,
		Spaces:      []string{space.ID},
	}

	// Query for team
	teams, err := client.Teams.Get(teamsQuery)
	if err != nil {
		log.Println(err)
	}

	if len(teams.Items) == teams.ItemsPerPage {
		// call again
		team := GetTeam(client, space, teamName, (skip + len(teams.Items)))

		if team != nil {
			return team
		}
	} else {
		// Loop through returned items
		for _, team := range teams.Items {
			if team.Name == teamName {
				return team
			}
		}
	}

	return nil
}

func arrayContains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}

func RemoveFromArray(items []string, item string) []string {
	newItems := []string{}
	for _, entry := range items {
		if entry != item {
			newItems = append(newItems, entry)
		}
	}

	return newItems
}

func GetProject(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, projectName string) *octopusdeploy.Project {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	projectsQuery := octopusdeploy.ProjectsQuery {
		Name: projectName,
	}

	// Get specific project object
	projects, err := client.Projects.Get(projectsQuery)

	if err != nil {
		log.Println(err)
	}

	for _, project := range projects.Items {
		if project.Name == projectName {
			return project
		}
	}

	return nil
}
```
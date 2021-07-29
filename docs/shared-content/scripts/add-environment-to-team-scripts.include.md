```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$teamName = "MyTeam"
$userRoleName = "Deployment creator"
$environmentNames = @("Development", "Staging")
$environmentIds = @()

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get team
$team = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams/all" -Headers $header) | Where-Object {$_.Name -eq $teamName}

# Get user role
$userRole = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/userroles/all" -Headers $header) | Where-Object {$_.Name -eq $userRoleName}

# Get scoped user role reference
$scopedUserRole = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams/$($team.Id)/scopeduserroles" -Headers $header).Items | Where-Object {$_.UserRoleId -eq $userRole.Id}

# Get Environments
$environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
foreach ($environment in $environments)
{
    $environmentIds += $environment.Id
}

# Update the scopedUserRole
$scopedUserRole.EnvironmentIds += $environmentIds

Invoke-RestMethod -Method Put -Uri "$octopusURL/api/scopeduserroles/$($scopedUserRole.Id)" -Headers $header -Body ($scopedUserRole | ConvertTo-Json -Depth 10)
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$environmentNames = @("Test", "Production")
$teamName = "MyTeam"
$userRoleName = "Deployment creator"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint
$environmentIds = @()

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get team
    $team = $repositoryForSpace.Teams.FindByName($teamName)

    # Get user role
    $userRole = $repositoryForSpace.UserRoles.FindByName($userRoleName)
    
    # Get scopeduserrole
    $scopedUserRole = $repositoryForSpace.Teams.GetScopedUserRoles($team) | Where-Object {$_.UserRoleId -eq $userRole.Id}

    # Get environments
    $environments = $repositoryForSpace.Environments.GetAll() | Where-Object {$environmentNames -contains $_.Name}
    foreach ($environment in $environments)
    {
        # Add Id
        $scopedUserRole.EnvironmentIds.Add($environment.Id)
    }

    # Update the scoped user role object
    $repositoryForSpace.ScopedUserRoles.Modify($scopedUserRole)
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
string[] environmentNames = { "Development", "Production" };
string teamName = "MyTeam";
string userRoleName = "Deployment creator";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get team
    var team = repositoryForSpace.Teams.FindByName(teamName);

    // Get user role
    var userRole = repository.UserRoles.FindByName(userRoleName);

    // Get scoped user role
    var scopedUserRole = repository.Teams.GetScopedUserRoles(team).FirstOrDefault(s => s.UserRoleId == userRole.Id);

    // Get environment ids
    foreach (var environmentName in environmentNames)
    {
        scopedUserRole.EnvironmentIds.Add(repositoryForSpace.Environments.FindByName(environmentName).Id);
    }

    // Update scoped user role
    repositoryForSpace.ScopedUserRoles.Modify(scopedUserRole);
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

# Define Octopus server variables
octopus_server_uri = 'https://YourUrl'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = 'Default'
team_name = 'MyTeam'
user_role_name = 'MyRole'
environment_names = ['List', 'of', 'environment names']

uri = '{0}/spaces/all'.format(octopus_server_uri)
response = requests.get(uri, headers=headers)
response.raise_for_status()

# Get space
spaces = json.loads(response.content.decode('utf-8'))
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get team
uri = '{0}/{1}/teams'.format(octopus_server_uri, space['Id'])
response = requests.get(uri, headers=headers)
response.raise_for_status
teams = json.loads(response.content.decode('utf-8'))
team = next((x for x in teams['Items'] if x['Name'] == team_name), None)

# Get userrole
uri = '{0}/userroles'.format(octopus_server_uri)
response = requests.get(uri, headers=headers)
response.raise_for_status
userroles = json.loads(response.content.decode('utf-8'))
userrole = next((x for x in userroles['Items'] if x['Name'] == user_role_name), None)

# Get scopeduserrole
uri = '{0}/{1}/teams/{2}/scopeduserroles'.format(octopus_server_uri, space['Id'], team['Id'])
response = requests.get(uri, headers=headers)
response.raise_for_status
scopeduserroles = json.loads(response.content.decode('utf-8'))
scopeduserrole = next((x for x in scopeduserroles['Items'] if x['UserRoleId'] == userrole['Id']), None)

# Get environments
uri = '{0}/{1}/environments'.format(octopus_server_uri, space['Id'])
response = requests.get(uri, headers=headers)
response.raise_for_status
environments = json.loads(response.content.decode('utf-8'))

# Loop through environment names
for environment_name in environment_names:
    environment = next((x for x in environments['Items'] if x['Name'] == environment_name), None)
    scopeduserrole['EnvironmentIds'].append(environment['Id'])

# Update the user role
uri = '{0}/{1}/scopeduserroles/{2}'.format(octopus_server_uri, space['Id'], scopeduserrole['Id'])
response = requests.put(uri, headers=headers, json=scopeduserrole)
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

	apiURL, err := url.Parse("https://YourUrl")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	environmentNames := []string{"Development", "Production"}
	teamName := "MyTeam"
	userRoleName := "MyRole"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get reference to team
	team := GetTeam(apiURL, APIKey, space, teamName)

	// Get reference to userrole
	userRole := GetRole(apiURL, APIKey, space, userRoleName)

	// Get scoped user role
	scopedUserRole := GetScopedUserRole(apiURL, APIKey, space, userRole, team)

	// Get references to environments
	for i := 0; i < len(environmentNames); i++ {
		environment := GetEnvironment(apiURL, APIKey, space, environmentNames[i])
		//environments = append(environments, *environment)
		scopedUserRole.EnvironmentIDs = append(scopedUserRole.EnvironmentIDs, environment.ID)
	}

	// Update scoped user role
	client := octopusAuth(apiURL, APIKey, space.ID)
	client.ScopedUserRoles.Update(scopedUserRole)
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

func GetEnvironment(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, EnvironmentName string) *octopusdeploy.Environment {
	client := octopusAuth(octopusURL, APIKey, space.ID)

	environment, err := client.Environments.GetByName(EnvironmentName)

	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("Retrieved environment " + environment[0].Name)
	}

	return environment[0]
}

func GetTeam(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, TeamName string) *octopusdeploy.Team {
	client := octopusAuth(octopusURL, APIKey, space.ID)

	teams, err := client.Teams.GetByPartialName(TeamName)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(teams); i++ {
		if teams[i].Name == TeamName {
			fmt.Println("Retrieved team " + teams[i].Name)
			return teams[i]
		}
	}

	return nil
}

func GetRole(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, RoleName string) *octopusdeploy.UserRole {
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get user account
	userRoleQuery := octopusdeploy.UserRolesQuery{
		PartialName: RoleName,
	}

	userRoles, err := client.UserRoles.Get(userRoleQuery)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(userRoles.Items); i++ {
		if userRoles.Items[i].Name == RoleName {
			fmt.Println("Retrieved UserRole " + userRoles.Items[i].Name)
			return userRoles.Items[i]
		}
	}

	return nil
}

func GetScopedUserRole(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, userRole *octopusdeploy.UserRole, team *octopusdeploy.Team) *octopusdeploy.ScopedUserRole {
	client := octopusAuth(octopusURL, APIKey, space.ID)

	/*
		There is a bug currently where the Get() method doesn't take the query as a parameter, once that has been fixed, this block will work

	*/
	//scopedUserRoleQuery := octopusdeploy.ScopedUserRolesQuery {
	//	PartialName: userRole.Name,
	//}

	// Get scoped user role
	scopedUserRoles, err := client.ScopedUserRoles.Get()

	if err != nil {
		log.Println(err)
	}

	// Loop through results to find the correct one
	for i := 0; i < len(scopedUserRoles.Items); i++ {
		if scopedUserRoles.Items[i].UserRoleID == userRole.ID {
			return scopedUserRoles.Items[i]
		}
	}

	return nil
}

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}
```
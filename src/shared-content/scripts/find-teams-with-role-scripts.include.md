<details data-group="find-teams-with-role-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$userRoleName = "Deployment creator"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get user role
$userRole = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/userroles/all" -Headers $header) | Where-Object {$_.Name -eq $userRoleName}

# Get teams collection
$teams = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams/all" -Headers $header

# Loop through teams
$teamNames = @()
foreach ($team in $teams)
{
    # Get scoped roles for team
    $scopedUserRole = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams/$($team.Id)/scopeduserroles" -Headers $header).Items | Where-Object {$_.UserRoleId -eq $userRole.Id}

    # Check for null
    if ($null -ne $scopedUserRole)
    {
        # Add to teams
        $teamNames += $team.Name
    }
}

# Loop through results
Write-Host "The following teams are using role $($userRoleName):"
foreach ($teamName in $teamNames)
{
    Write-Host "$teamName"
}
```

</details>
<details data-group="find-teams-with-role-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$userRoleName = "Deployment creator"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get team
    $teams = $repositoryForSpace.Teams.FindAll()

    # Get user role
    $userRole = $repositoryForSpace.UserRoles.FindByName($userRoleName)
    
    # Loop through teams
    $teamNames = @()
    foreach ($team in $teams)
    {
        # Get scopeduserrole
        $scopedUserRole = $repositoryForSpace.Teams.GetScopedUserRoles($team) | Where-Object {$_.UserRoleId -eq $userRole.Id}

        # Check for null
        if ($null -ne $scopedUserRole)
        {
            # Add to list
            $teamNames += $team.Name
        }
    }

    # Loop through results
    Write-Host "The following teams are using role $($userRoleName):"
    foreach ($teamName in $teamNames)
    {
        Write-Host "$teamName"
    }

}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="find-teams-with-role-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
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

    // Get teams
    var teams = repositoryForSpace.Teams.FindAll();

    // Get user role
    var userRole = repository.UserRoles.FindByName(userRoleName);

    // Loop through teams
    List<string> teamNames = new List<string>();
    foreach (var team in teams)
    {
        // Get scoped user roles
        var scopedUserRoles = repositoryForSpace.Teams.GetScopedUserRoles(team).Where(s => s.UserRoleId == userRole.Id);

        // Check for null
        if (scopedUserRoles != null && scopedUserRoles.Count() > 0)
        {
            // Add to teams
            teamNames.Add(team.Name);
        }
    }

    // Display which teams have use the role
    Console.WriteLine(string.Format("The following teams are using role {0}", userRoleName));
    foreach (string teamName in teamNames)
    {
        Console.WriteLine(teamName);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="find-teams-with-role-scripts">
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
space_name = "Default"
role_name = "Project deployer"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get userrole
uri = '{0}/api/userroles'.format(octopus_server_uri)
user_roles = get_octopus_resource(uri, headers)
user_role = next((x for x in user_roles if x['Name'] == role_name), None)

# Get teams
uri = '{0}/api/{1}/teams'.format(octopus_server_uri, space['Id'])
teams = get_octopus_resource(uri, headers)

teams_with_role = []

# Loop through teams
for team in teams:
    # Get the scoped user roles
    uri = '{0}/api/{1}/teams/{2}/scopeduserroles'.format(octopus_server_uri, space['Id'], team['Id'])
    scoped_user_roles = get_octopus_resource(uri, headers)

    for role in scoped_user_roles:
        if role['UserRoleId'] == user_role['Id']:
            teams_with_role.append(team)

print("The following teams are using role {0}".format(user_role['Name']))
for team in teams_with_role:
    print (team['Name'])
```

</details>
<details data-group="find-teams-with-role-scripts">
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
	userRoleName := "Project deployer"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get teams
	teams, err := client.Teams.GetAll()

	if err != nil {
		log.Println(err)
	}

	// Get user roles
	userRole := GetUserRole(client, userRoleName)

	if err != nil {
		log.Println(err)
	}

	teamsUsingRole := []*octopusdeploy.Team{}

	// Loop through teams
	for _, team := range teams {
		// Get scoped user roles for team
		scopedUserRoles, err := client.Teams.GetScopedUserRolesByID(team.ID)

		if err != nil {
			log.Println(err)
		}

		for _, scopedUserRole := range scopedUserRoles.Items {
			if scopedUserRole.UserRoleID == userRole.ID {
				teamsUsingRole = append(teamsUsingRole, team)
				break
			}
		}
	}

	fmt.Println("The following teams are using the role " + userRole.Name)
	for _, team := range teamsUsingRole {
		fmt.Println(team.Name)
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

func GetUserRole(client *octopusdeploy.Client, userRoleName string) *octopusdeploy.UserRole {
	// Get all roles
	userRoles, err := client.UserRoles.GetAll()

	if err != nil {
		log.Println(err)
	}

	for _, userRole := range userRoles {
		if userRole.Name == userRoleName {
			return userRole
		}
	}

	return nil
}
```

</details>

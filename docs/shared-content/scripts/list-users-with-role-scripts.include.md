```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusBaseURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$headers = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$roleName = "Project Deployer"
$spaceName = "" # Leave blank if you're using an older version of Octopus or you want to search all spaces

# Get the space id
$spaceId = ((Invoke-RestMethod -Method Get -Uri "$octopusBaseURL/spaces/all" -Headers $headers -ErrorVariable octoError) | Where-Object {$_.Name -eq $spaceName}).Id

# Get reference to role
$role = (Invoke-RestMethod -Method Get -Uri "$octopusBaseURL/userroles/all" -Headers $headers -ErrorVariable octoError) | Where-Object {$_.Name -eq $roleName}

# Get list of teams
$teams = (Invoke-RestMethod -Method Get -Uri "$octopusBaseURL/teams/all" -Headers $headers -ErrorVariable octoError)

# Loop through teams
foreach ($team in $teams)
{
    # Get the scoped user role
    $scopedUserRoles = Invoke-RestMethod -Method Get -Uri ("$octopusBaseURL/teams/$($team.Id)/scopeduserroles") -Headers $headers -ErrorVariable octoError
    
    # Loop through the scoped user roles
    foreach ($scopedUserRole in $scopedUserRoles)
    {
        # Check to see if space was specified
        if (![string]::IsNullOrEmpty($spaceId))
        {
            # Filter items by space
            $scopedUserRole.Items = $scopedUserRole.Items | Where-Object {$_.SpaceId -eq $spaceId}
        }

        # Check to see if the team has the role
        if ($null -ne ($scopedUserRole.Items | Where-Object {$_.UserRoleId -eq $role.Id}))
        {
            # Display team name
            Write-Output "Team: $($team.Name)"

            # check space id
            if ([string]::IsNullOrEmpty($spaceName))
            {
                # Get the space id
                $teamSpaceId = ($scopedUserRole.Items | Where-Object {$_.UserRoleId -eq $role.Id}).SpaceId

                # Get the space name
                $teamSpaceName = (Invoke-RestMethod -Method Get -Uri "$octopusBaseURL/spaces/$teamSpaceId" -Headers $headers -ErrorVariable octoError).Name

                # Display the space name
                Write-Output "Space: $teamSpaceName"
            }
            else
            {
                # Display the space name
                Write-Output "Space: $spaceName"
            }

            Write-Output "Users:"

            # Loop through members
            foreach ($userId in $team.MemberUserIds)
            {
                # Get user object
                $user = Invoke-RestMethod -Method Get -Uri ("$octopusBaseURL/users/$userId") -Headers $headers -ErrorVariable octoError
                
                # Display user
                Write-Output "$($user.DisplayName)"
            }

            # Check for external security groups
            if (($null -ne $team.ExternalSecurityGroups) -and ($team.ExternalSecurityGroups.Count -gt 0))
            {
                # External groups
                Write-Output "External security groups:"

                # Loop through groups
                foreach ($group in $team.ExternalSecurityGroups)
                {
                    # Display group
                    Write-Output "$($group.Id)"
                }
            }
        }
    }   
}
```
```powershell PowerShell (Octopus.Client)
# Define working variables
$octopusBaseURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"

# Load the Octopus.Client assembly from where you have it located.
Add-type -Path "C:\Octopus.Client\Octopus.Client.dll"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusBaseURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

$roleName = "Project Deployer"
$spaceName = ""

try
{
    $space = $repository.Spaces.FindByName($spaceName)

    # Get specific role
    $role = $repository.UserRoles.FindByName($roleName)

    # Get all the teams
    $teams = $repository.Teams.GetAll()

    # Loop through the teams
    foreach ($team in $teams)
    {
        # Get all associated user roles
        $scopedUserRoles = $repository.Teams.GetScopedUserRoles($team)

        # Check to see if there was a space defined
        if (![string]::IsNullOrEmpty($spaceName))
        {
            # Filter on space
            $scopedUserRoles = $scopedUserRoles | Where-Object {$_.SpaceId -eq $space.Id}
        }

        # Loop through the scoped user roles
        foreach ($scopedUserRole in $scopedUserRoles)
        {
            # Check role id
            if ($scopedUserRole.UserRoleId -eq $role.Id)
            {
                # Display the team name
                Write-Output "Team: $($team.Name)"

                # Display the space name
                Write-Output "Space: $($repository.Spaces.Get($scopedUserRole.SpaceId).Name)"

                Write-Output "Users:"

                # Loop through the members
                foreach ($member in $team.MemberUserIds)
                {
                    # Get the user account
                    $user = $repository.Users.GetAll() | Where-Object {$_.Id -eq $member}
                    
                    # Display
                    Write-Output "$($user.DisplayName)"
                }

                # Check to see if there were external groups
                if (($null -ne $team.ExternalSecurityGroups) -and ($team.ExternalSecurityGroups.Count -gt 0))
                {
                    Write-Output "External security groups:"

                    # Loop through groups
                    foreach ($group in $team.ExternalSecurityGroups)
                    {
                        # Display group
                        Write-Output "$($group.Id)"
                    }
                }
            }
        }
    }
}
catch
{
    Write-Output "An error occurred: $($_.Exception.Message)"
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
var octopusBaseURL = "https://youroctourl/api";
var octopusAPIKey = "API-YOURAPIKEY";

var endpoint = new OctopusServerEndpoint(octopusBaseURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

string roleName = "Project Deployer";
var spaceName = "";

try
{
    // Get space id
    var space = repository.Spaces.FindByName(spaceName);

    // Get reference to the role
    var role = repository.UserRoles.FindByName(roleName);

    // Get all teams to search
    var teams = repository.Teams.FindAll();

    // Loop through the teams
    foreach (var team in teams)
    {
        // Retrieve scoped user roles
        var scopedUserRoles = repository.Teams.GetScopedUserRoles(team);

        // Check to see if there was a space name specified
        if (!string.IsNullOrEmpty(spaceName))
        {
            // filter returned scopedUserRoles
            scopedUserRoles = scopedUserRoles.Where(x => x.SpaceId == space.Id).ToList();
        }

        // Loop through returned roles
        foreach (var scopedUserRole in scopedUserRoles)
        {
            // Check to see if it's the role we're looking for
            if (scopedUserRole.UserRoleId == role.Id)
            {
                // Output team name
                Console.WriteLine(string.Format("Team: {0}", team.Name));

                // Output space name
                Console.WriteLine(string.Format("Space: {0}", repository.Spaces.Get(scopedUserRole.SpaceId).Name));

                Console.WriteLine("Users:");

                // Loop through team members
                foreach (var member in team.MemberUserIds)
                {
                    // Get the user object
                    var user = repository.Users.Get(member);

                    // Display the user name
                    Console.WriteLine(user.DisplayName);
                }

                // Check for external groups
                if ((team.ExternalSecurityGroups != null) && (team.ExternalSecurityGroups.Count > 0))
                {
                    //
                    Console.WriteLine("External security groups:");

                    // Iterate through external security groups
                    foreach (var group in team.ExternalSecurityGroups)
                    {
                        Console.WriteLine(group.Id);
                    }
                }
            }
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
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
role_name = 'Project deployer'
space_name = 'Default'
headers = {'X-Octopus-ApiKey': octopus_api_key}

# Get users
uri = '{0}/api/users'.format(octopus_server_uri)
users = get_octopus_resource(uri, headers)

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get teams
uri = '{0}/api/teams'.format(octopus_server_uri)
teams = get_octopus_resource(uri, headers)

# Get the role in question
uri = '{0}/api/userroles'.format(octopus_server_uri)
user_roles = get_octopus_resource(uri, headers)
user_role = next((x for x in user_roles if x['Name'] == role_name), None)

# Loop through teams
for team in teams:
    # Get the scoped user roles
    uri = '{0}/api/teams/{1}/scopeduserroles'.format(octopus_server_uri, team['Id'])
    scoped_user_roles = get_octopus_resource(uri, headers)

    # Get the role that matches
    scoped_user_role = next((r for r in scoped_user_roles if r['UserRoleId'] == user_role['Id']), None)

    # Check to see if it has the role
    if scoped_user_role != None:
        print ('Team: {0}'.format(team['Name']))
        print('Users:')
        # Display the team members
        for user_id in team['MemberUserIds']:
            
            uri = '{0}/api/users/{1}'.format(octopus_server_uri, user_id)
            user = get_octopus_resource(uri, headers)

            print(user['DisplayName'])

        if team['ExternalSecurityGroups'] != None and len(team['ExternalSecurityGroups']) > 0:
            for group in team['ExternalSecurityGroups']:
                print(group['Id'])
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

	//spaceName := "Default"
	userRoleName := "Project deployer"

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	// Get all teams
	teams, err := client.Teams.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Get user role
	userRole := GetUserRoleByName(client, userRoleName)

	// Loop through teams
	for _, team := range teams {
		// Get scoped user roles
		scopedUserRoles, err := client.Teams.GetScopedUserRoles(*team, octopusdeploy.SkipTakeQuery{Skip: 0, Take: 1000})
		if err != nil {
			log.Println(err)
		}

		scopedUserRole := GetUserRole(scopedUserRoles.Items, userRole)

		if scopedUserRole != nil {
			fmt.Printf("Team: %[1]s \n", team.Name)
			fmt.Println("Users:")

			for _, userId := range team.MemberUserIDs {
				user, err := client.Users.GetByID(userId)
				if err != nil {
					log.Println(err)
				}

				fmt.Println(user.DisplayName)
			}

			if team.ExternalSecurityGroups != nil && len(team.ExternalSecurityGroups) > 0 {
				for _, group := range team.ExternalSecurityGroups {
					fmt.Println(group.DisplayIDAndName)
				}
			}
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

func GetSpace(octopusURL *url.URL, APIKey string, spaceId string) *octopusdeploy.Space {
	client := octopusAuth(octopusURL, APIKey, "")

	// Get specific space object
	space, err := client.Spaces.GetByID(spaceId)

	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("Retrieved space " + space.Name)
	}

	return space
}

func GetUserRoleByName(client *octopusdeploy.Client, roleName string) *octopusdeploy.UserRole {
	// Get all user roles
	userRoles, err := client.UserRoles.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Loop through roles
	for _, role := range userRoles {
		if role.Name == roleName {
			return role
		}
	}

	return nil
}

func GetUserRole(roles []*octopusdeploy.ScopedUserRole, role *octopusdeploy.UserRole) *octopusdeploy.ScopedUserRole {
	for _, v := range roles {
		if v.UserRoleID == role.ID {
			return v
		}
	}

	return nil
}
```
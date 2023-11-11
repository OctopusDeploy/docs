<details data-group="list-users-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOUR-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# Optional: include user role details?
$includeUserRoles = $False

# Optional: include non-active users in output
$includeNonActiveUsers = $False

# Optional: include AD details
$includeActiveDirectoryDetails = $False

# Optional: include AAD details
$includeAzureActiveDirectoryDetails = $False

# Optional: set a path to export to csv
$csvExportPath = ""

$users = @()
$usersList = @()
$response = $null
do {
    $uri = if ($response) { $octopusURL + $response.Links.'Page.Next' } else { "$octopusURL/api/users" }
    $response = Invoke-RestMethod -Method Get -Uri $uri -Headers $header
    $usersList += $response.Items
} while ($response.Links.'Page.Next')

# Filter non-active users
if($includeNonActiveUsers -eq $False) {
    Write-Host "Filtering users who aren't active from results"
    $usersList = $usersList | Where-Object {$_.IsActive -eq $True}
}

# If we are including user roles, need to get team details
if($includeUserRoles -eq $True) {
    $teams = @()
    $response = $null
    do {
        $uri = if ($response) { $octopusURL + $response.Links.'Page.Next' } else { "$octopusURL/api/teams" }
        $response = Invoke-RestMethod -Method Get -Uri $uri -Headers $header
        $teams += $response.Items
    } while ($response.Links.'Page.Next')

    foreach($team in $teams) {
        $scopedUserRoles = Invoke-RestMethod -Method Get -Uri ("$octopusURL/api/teams/$($team.Id)/scopeduserroles") -Headers $header
        $team | Add-Member -MemberType NoteProperty -Name "ScopedUserRoles" -Value $scopedUserRoles.Items
    }

    $allUserRoles = @()
    $response = $null
    do {
        $uri = if ($response) { $octopusURL + $response.Links.'Page.Next' } else { "$octopusURL/api/userroles" }
        $response = Invoke-RestMethod -Method Get -Uri $uri -Headers $header
        $allUserRoles += $response.Items
    } while ($response.Links.'Page.Next')

    $spaces = @()
    $response = $null
    do {
        $uri = if ($response) { $octopusURL + $response.Links.'Page.Next' } else { "$octopusURL/api/spaces" }
        $response = Invoke-RestMethod -Method Get -Uri $uri -Headers $header
        $spaces += $response.Items
    } while ($response.Links.'Page.Next')
}

foreach($userRecord in $usersList) {
    $usersRoles = @()

    $user = [PSCustomObject]@{
        Id = $userRecord.Id
        Username = $userRecord.Username
        DisplayName = $userRecord.DisplayName
        IsActive = $userRecord.IsActive
        IsService = $userRecord.IsService
        EmailAddress = $userRecord.EmailAddress
    }
    if($includeActiveDirectoryDetails -eq $True) 
    {
        $user | Add-Member -MemberType NoteProperty -Name "AD_Upn" -Value $null
        $user | Add-Member -MemberType NoteProperty -Name "AD_Sam" -Value $null
        $user | Add-Member -MemberType NoteProperty -Name "AD_Email" -Value $null
    }
    if($includeAzureActiveDirectoryDetails -eq $True) 
    {
        $user | Add-Member -MemberType NoteProperty -Name "AAD_DN" -Value $null
        $user | Add-Member -MemberType NoteProperty -Name "AAD_Email" -Value $null
    }

    if($includeUserRoles -eq $True) {
        $usersTeams = $teams | Where-Object {$_.MemberUserIds -icontains $user.Id}
        foreach($userTeam in $usersTeams) {
            $roles = $userTeam.ScopedUserRoles
            foreach($role in $roles) {
                $userRole = $allUserRoles | Where-Object {$_.Id -eq $role.UserRoleId} | Select-Object -First 1
                $roleName = "$($userRole.Name)"
                $roleSpace = $spaces | Where-Object {$_.Id -eq $role.SpaceId} | Select-Object -First 1
                if (![string]::IsNullOrWhiteSpace($roleSpace)) {
                    $roleName += " ($($roleSpace.Name))"
                }
                $usersRoles+= $roleName
            }
        }
        $user | Add-Member -MemberType NoteProperty -Name "ScopedUserRoles" -Value ($usersRoles -Join "|")
    }

    if($userRecord.Identities.Count -gt 0) {
        if($includeActiveDirectoryDetails -eq $True) 
        {
            $activeDirectoryIdentity = $userRecord.Identities | Where-Object {$_.IdentityProviderName -eq "Active Directory"} | Select-Object -ExpandProperty Claims
            if($null -ne $activeDirectoryIdentity) {               
                $user.AD_Upn = (($activeDirectoryIdentity | ForEach-Object {"$($_.upn.Value)"}) -Join "|")
                $user.AD_Sam = (($activeDirectoryIdentity | ForEach-Object {"$($_.sam.Value)"}) -Join "|")
                $user.AD_Email = (($activeDirectoryIdentity | ForEach-Object {"$($_.email.Value)"}) -Join "|")
            }
        }
        if($includeAzureActiveDirectoryDetails -eq $True) 
        {
            $azureAdIdentity = $userRecord.Identities | Where-Object {$_.IdentityProviderName -eq "Azure AD"} | Select-Object -ExpandProperty Claims
            if($null -ne $azureAdIdentity) {
                $user.AAD_Dn = (($azureAdIdentity | ForEach-Object {"$($_.dn.Value)"}) -Join "|")
                $user.AAD_Email = (($azureAdIdentity | ForEach-Object {"$($_.email.Value)"}) -Join "|")
            }
        }
    }
    $users+=$user
}

if (![string]::IsNullOrWhiteSpace($csvExportPath)) {
    Write-Host "Exporting results to CSV file: $csvExportPath"
    $users | Export-Csv -Path $csvExportPath -NoTypeInformation
}

$users | Format-Table
```

</details>
<details data-group="list-users-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
# Define working variables
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"

# Optional: include user role details?
$includeUserRoles = $true

# Optional: include non-active users in output
$includeNonActiveUsers = $False

# Optional: include AD details
$includeActiveDirectoryDetails = $False

# Optional: include AAD details
$includeAzureActiveDirectoryDetails = $True

# Optional: set a path to export to csv
$csvExportPath = "path:\to\users.csv"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get users
$users = $repository.Users.GetAll()
$usersList = @()

# Check to see if we're filtering out inactive
if ($includeNonActiveUsers -eq $true)
{
    # Filter out inactive users
    Write-Host "Filtering users who aren't active from results"
    $users = $users | Where-Object {$_.IsActive -eq $True}
}


# Loop through users
foreach ($user in $users)
{
    # Populate user details
    $userDetails = [ordered]@{
        Id = $user.Id
        Username = $user.Username
        DisplayName = $user.DisplayName
        IsActive = $user.IsActive
        IsService = $user.IsService
        EmailAddress = $user.EmailAddress
    }


    # Check to see if we're including user roles
    if ($includeUserRoles -eq $true)
    {
        $userDetails.Add("ScopedUserRoles", "")
        # Get users teams
        $userTeamNames = $repository.UserTeams.Get($user)

        # Loop through the users teams
        foreach ($teamName in $userTeamNames)
        {
            # Get the team
            $team = $repository.Teams.Get($team.Id)
            
            foreach ($role in $repository.Teams.GetScopedUserRoles($team))
            {
                $userDetails["ScopedUserRoles"] += "$(($repository.UserRoles.Get($role.UserRoleId).Name)) ($(($repository.Spaces.Get($role.SpaceId)).Name))|"
            }
        }
    }

    if ($includeActiveDirectoryDetails -eq $true)
    {
        # Get the identity provider object
        $activeDirectoryIdentity = $user.Identities | Where-Object {$_.IdentityProviderName -eq "Active Directory"}
        if ($null -ne $activeDirectoryIdentity) 
        {
            $userDetails.Add("AD_Upn", (($activeDirectoryIdentity.Claims | ForEach-Object {"$($_.upn.Value)"}) -Join "|"))
            $userDetails.Add("AD_Sam", (($activeDirectoryIdentity.Claims | ForEach-Object {"$($_.sam.Value)"}) -Join "|"))
            $userDetails.Add("AD_Email", (($activeDirectoryIdentity.Claims | ForEach-Object {"$($_.email.Value)"}) -Join "|"))
        }
    }
    
    if ($includeAzureActiveDirectoryDetails -eq $true)
    {
        $azureAdIdentity = $user.Identities | Where-Object {$_.IdentityProviderName -eq "Azure AD"}
        if ($null -ne $azureAdIdentity)
        {
            $userDetails.Add("AAD_Dn", (($azureAdIdentity.Claims | ForEach-Object {"$($_.dn.Value)"}) -Join "|"))
            $userDetails.Add("AAD_Email", (($azureAdIdentity.Claims | ForEach-Object {"$($_.email.Value)"}) -Join "|"))
        }
    }

    
    $usersList += $userDetails    
}

# Write header
$header = $usersList.Keys | Select-Object -Unique
Set-Content -Path $csvExportPath -Value ($header -join ",")

foreach ($user in $usersList)
{
    Add-Content -Path $csvExportPath -Value ($user.Values -join ",")
}

$usersList | Format-Table
```

</details>
<details data-group="list-users-scripts">
<summary>C#</summary>

```csharp

#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;
using System.Linq;

class UserDetails
{
    // Define private variables

    public string Id
    {
        get;
        set;
    }

    public string Username
    {
        get; set;
    }

    public string DisplayName
    {
        get; set;
    }

    public bool IsActive
    {
        get; set;
    }

    public bool IsService
    {
        get; set;
    }

    public string EmailAddress
    {
        get;
        set;
    }

    public string ScopedUserRoles
    {
        get;set;
    }

    public string AD_Upn
    {
        get;
        set;
    }

    public string AD_Sam
    {
        get;
        set;
    }

    public string AD_Email
    {
        get;
        set;
    }

    public string AAD_Dn
    {
        get;
        set;
    }

    public string AAD_Email
    {
        get;
        set;
    }
}

// If using .net Core, be sure to add the NuGet package of System.Security.Permissions

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
string csvExportPath = "path:\\to\\users.csv";
bool includeUserRoles = true;
bool includeActiveDirectoryDetails = false;
bool includeAzureActiveDirectoryDetails = true;
bool includeInactiveUsers = false;

System.Collections.Generic.List<UserDetails> usersList = new System.Collections.Generic.List<UserDetails>();

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get all users
var users = repository.Users.FindAll();

// Loop through users
if (!includeInactiveUsers)
    users = users.Where(u => u.IsActive == true).ToList();
foreach (var user in users)
{
    // Get basic details
    UserDetails userDetails = new UserDetails();
    userDetails.Id = user.Id;
    userDetails.Username = user.Username;
    userDetails.DisplayName = user.DisplayName;
    userDetails.IsActive = user.IsActive;
    userDetails.IsService = user.IsService;
    userDetails.EmailAddress = user.EmailAddress;

    // Check to see if userroles are included
    if (includeUserRoles)
    {
        var userTeamNames = repository.UserTeams.Get(user);

        foreach (var teamName in userTeamNames)
        {
            var team = repository.Teams.Get(teamName.Id);
            
            foreach (var role in repository.Teams.GetScopedUserRoles(team))
            {
                userDetails.ScopedUserRoles += string.Format("{0} ({1})|", (repository.UserRoles.Get(role.UserRoleId)).Name, (repository.Spaces.Get(role.SpaceId)));
            }
        }
    }

    if(includeActiveDirectoryDetails)
    {
        var activeDirectoryDetails = user.Identities.FirstOrDefault(i => i.IdentityProviderName == "Active Directory");
        if (null != activeDirectoryDetails)
        {
            userDetails.AD_Upn = activeDirectoryDetails.Claims["upn"].Value;
            userDetails.AD_Sam = activeDirectoryDetails.Claims["sam"].Value;
            userDetails.AD_Email = activeDirectoryDetails.Claims["email"].Value;
        }
    }

    if (includeAzureActiveDirectoryDetails)
    {
        var azureActiveDirectoryDetails = user.Identities.FirstOrDefault(i => i.IdentityProviderName == "Azure AD");
        if (null != azureActiveDirectoryDetails)
        {
            userDetails.AAD_Dn = azureActiveDirectoryDetails.Claims["dn"].Value;
            userDetails.AAD_Email = azureActiveDirectoryDetails.Claims["email"].Value;
        }
    }

    usersList.Add(userDetails);
}

Console.WriteLine(string.Format("Found {0} results", usersList.Count.ToString()));

if (usersList.Count > 0)
{
    foreach (var result in usersList)
    {
        System.Collections.Generic.List<string> row = new System.Collections.Generic.List<string>();
        System.Collections.Generic.List<string> header = new System.Collections.Generic.List<string>();
        
        var isFirstRow = variableTracking.IndexOf(result) == 0;
        var properties = result.GetType().GetProperties();

        foreach (var property in properties)
        {
            Console.WriteLine(string.Format("{0}: {1}", property.Name, property.GetValue(result)));
            if (isFirstRow)
            {
                header.Add(property.Name);
            }
            
            row.Add((property.GetValue(result) == null ? string.Empty : property.GetValue(result).ToString()));
        }

        if (!string.IsNullOrWhiteSpace(csvExportPath))
        {
            using (System.IO.StreamWriter csvFile = new System.IO.StreamWriter(csvExportPath, true))
            {
                if (isFirstRow)
                {
                    // Write header
                    csvFile.WriteLine(string.Join(",", header.ToArray()));
                }
                csvFile.WriteLine(string.Join(",", row.ToArray()));
            }
        }
    }
}

```

</details>
<details data-group="list-users-scripts">
<summary>Python3</summary>

```python
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
include_user_roles = True
include_non_active_users = False
include_active_directory_details = False
include_azure_active_directory = True
csv_export_path = "path:\\to\\users.csv"

# Get users
uri = '{0}/api/users'.format(octopus_server_uri)
users = get_octopus_resource(uri, headers)
users_list = []

# Loop through users
for user in users:
    if include_non_active_users != True and user['IsActive'] == False:
        continue

    user_details = {
        'Id': user['Id'],
        'Username': user['Username'],
        'DisplayName': user['DisplayName'],
        'IsActive': user['IsActive'],
        'IsService': user['IsService'],
        'EmailAddress': user['EmailAddress']
    }

    if include_user_roles:
        # Get users teams
        uri = '{0}/api/users/{1}/teams'.format(octopus_server_uri, user['Id'])
        user_team_names = get_octopus_resource(uri, headers)

        # Loop through teams
        for team_name in user_team_names:
            uri = '{0}/api/teams/{1}'.format(octopus_server_uri, team_name['Id'])
            team = get_octopus_resource(uri, headers)

            # Get scoped user roles
            uri = '{0}/api/teams/{1}/ScopedUserRoles'.format(octopus_server_uri, team['Id'])
            scoped_user_roles = get_octopus_resource(uri, headers)

            user_details['ScopedUserRoles'] = ''
            
            # Loop through roles
            for role in scoped_user_roles:
                if role['SpaceId'] == None:
                    role['SpaceId'] = 'Spaces-1'
                uri = '{0}/api/spaces/{1}'.format(octopus_server_uri, role['SpaceId'])
                space = get_octopus_resource(uri, headers)
                uri = '{0}/api/userroles/{1}'.format(octopus_server_uri, role['UserRoleId'])
                user_role = get_octopus_resource(uri, headers)
                user_details['ScopedUserRoles'] += '{0} ({1})|'.format(user_role['Name'], space['Name'])

    if include_active_directory_details:
        active_directory_identity = next((x for x in user['Identities'] if x['IdentityProviderName'] == 'Active Directory'), None)
        if active_directory_identity != None:
            user_details['AD_Upn'] = active_directory_identity['Claims']['upn']['Value']
            user_details['AD_Sam'] = active_directory_identity['Claims']['sam']['Value']
            user_details['AD_Email'] = active_directory_identity['Claims']['sam']['Value']

    if include_azure_active_directory:
        azure_ad_identity = next((x for x in user['Identities'] if x['IdentityProviderName'] == 'Azure AD'), None)
        if azure_ad_identity != None:
            user_details['AAD_Dn'] = azure_ad_identity['Claims']['dn']['Value']
            user_details['AAD_Email'] = azure_ad_identity['Claims']['email']['Value']

    print(user_details)
    users_list.append(user_details)

    if csv_export_path:
        with open(csv_export_path, mode='w') as csv_file:
            fieldnames = ['Id', 'Username', 'DisplayName', 'IsActive', 'IsService', 'EmailAddress', 'ScopedUserRoles', 'AD_Upn', 'AD_Sam', 'AD_Email', 'AAD_Dn', 'AAD_Email']
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()
            for user in users_list:
                writer.writerow(user)
```

</details>
<details data-group="list-users-scripts">
<summary>Go</summary>

```go
package main

import (
	"bufio"
	"fmt"
	"log"
	"net/url"
	"os"
	"reflect"
	"strconv"
	"strings"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

type UserDetails struct {
	Id              string
	Username        string
	DisplayName     string
	IsActive        string
	IsService       string
	EmailAddress    string
	ScopedUserRoles string
	AD_Upn          string
	AD_Sam          string
	AD_Email        string
	AAD_Dn          string
	AAD_Email       string
}

func main() {

	apiURL, err := url.Parse("https://YourUrl")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	csvExportPath := "path:\\to\\users.csv"
	includeUserRoles := true
	includeActiveDirectoryDetails := false
	includeAzureActiveDirectoryDetails := true
	includeInactiveUsers := false

	usersList := []UserDetails{}

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	// Get all users
	users, err := client.Users.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Loop through users
	for _, user := range users {
		if !includeInactiveUsers && !user.IsActive {
			continue
		}

		// record user information
		userDetails := UserDetails{}
		userDetails.Id = user.ID
		userDetails.Username = user.Username
		userDetails.DisplayName = user.DisplayName
		userDetails.IsActive = strconv.FormatBool(user.IsActive)
		userDetails.IsService = strconv.FormatBool(user.IsService)
		userDetails.EmailAddress = user.EmailAddress

		if includeUserRoles {
			userTeamNames, err := client.Users.GetTeams(user)
			if err != nil {
				log.Println(err)
			}

			for _, userTeamName := range *userTeamNames {
				team, err := client.Teams.GetByID(userTeamName.ID)
				if err != nil {
					log.Println(err)
				}

				roles, err := client.Teams.GetScopedUserRoles(*team, octopusdeploy.SkipTakeQuery{Skip: 0, Take: 1000})

				for _, role := range roles.Items {
					if role.SpaceID == "" {
						role.SpaceID = "Spaces-1"
					}
					space := GetSpace(apiURL, APIKey, role.SpaceID)
					userRole, err := client.UserRoles.GetByID(role.UserRoleID)
					if err != nil {
						log.Println(err)
					}
					userDetails.ScopedUserRoles += userRole.Name + " (" + space.Name + ")|"
				}
			}
		}

		for _, provider := range user.Identities {
			if provider.IdentityProviderName == "Active Directory" && includeActiveDirectoryDetails {
				userDetails.AD_Upn += provider.Claims["upn"].Value
				userDetails.AD_Sam += provider.Claims["sam"].Value
				userDetails.AD_Email += provider.Claims["email"].Value
			}
			if provider.IdentityProviderName == "Azure AD" && includeAzureActiveDirectoryDetails {
				userDetails.AAD_Dn += provider.Claims["dn"].Value
				userDetails.AAD_Email += provider.Claims["email"].Value
			}
		}

		usersList = append(usersList, userDetails)
	}

	if len(usersList) > 0 {
		fmt.Printf("Found %[1]s results \n", strconv.Itoa(len(usersList)))

		for i := 0; i < len(usersList); i++ {
			row := []string{}
			header := []string{}
			isFirstRow := false
			if i == 0 {
				isFirstRow = true
			}

			e := reflect.ValueOf(&usersList[i]).Elem()
			for j := 0; j < e.NumField(); j++ {
				if isFirstRow {
					header = append(header, e.Type().Field(j).Name)
				}
				row = append(row, e.Field(j).Interface().(string))
			}

			if csvExportPath != "" {
				file, err := os.OpenFile(csvExportPath, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
				if err != nil {
					log.Println(err)
				}

				dataWriter := bufio.NewWriter(file)
				if isFirstRow {
					dataWriter.WriteString(strings.Join(header, ",") + "\n")
				}
				dataWriter.WriteString(strings.Join(row, ",") + "\n")
				dataWriter.Flush()
				file.Close()
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
```

</details>

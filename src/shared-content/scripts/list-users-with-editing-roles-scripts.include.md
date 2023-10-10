<details data-group="list-users-with-editing-roles-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = 'Stop';

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-KEY"

$csvExportPath = ""

function Invoke-PagedOctoGet($uriFragment)
{
    $items = @()
    $response = $null
    do {
        $uri = if ($response) { $octopusURL + $response.Links.'Page.Next' } else { "$octopusURL/$uriFragment" }
        $response = Invoke-RestMethod -Method Get -Uri $uri -Headers @{ "X-Octopus-ApiKey" = $octopusAPIKey }
        $items += $response.Items
    } while ($response.Links.'Page.Next')

    $items
}

$users = Invoke-PagedOctoGet "api/users"
$usersWithEditPermissions = @()
foreach ($user in $users) {
    $permissions = (Invoke-RestMethod `
        -Uri "$octopusURL/api/users/$($user.Id)/permissions" `
        -Headers @{ "X-Octopus-ApiKey" = $octopusAPIKey }).SpacePermissions.PSObject.Members `
            | Where-Object MemberType -eq "NoteProperty"

    $editPermissionsForUser = @()
    foreach ($name in $permissions.Name) {
        if (($name -match "Edit") -or ($name -match "Create") -or ($name -match "Delete")) {
            $editPermissionsForUser += $name
        }
    }

    if ($editPermissionsForUser) {
        $usersWithEditPermissions += [PSCustomObject] @{
            Id = $user.Id
            EmailAddress = $user.EmailAddress
            Username = $user.Username
            DisplayName = $user.DisplayName
            IsActive = $user.IsActive
            IsService = $user.IsService
            Permissions = ($editPermissionsForUser -join ",")
        }
    }
}

if (![string]::IsNullOrWhiteSpace($csvExportPath)) {
    Write-Host "Exporting results to CSV file: $csvExportPath"
    $usersWithEditPermissions | Export-Csv -Path $csvExportPath -NoTypeInformation
}

$usersWithEditPermissions | Format-Table
```

</details>
<details data-group="list-users-with-editing-roles-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
# Define working variables
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$csvExportPath = "path:\to\editpermissions.csv"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get users
$users = $repository.Users.GetAll()
$usersList = @()

# Loop through users
foreach ($user in $users)
{
    $userPermissions = $repository.UserPermissions.Get($user)
    $editPermissions = @()
    foreach ($spacePermission in $userPermissions.SpacePermissions)
    {
        foreach ($permissionName in $spacePermission.Keys)
        {
            if ($permissionName.ToString().ToLower().Contains("create") -or $permissionName.ToString().ToLower().Contains("delete") -or $permissionName.ToString().ToLower().Contains("edit"))
            {
                $editPermissions += $permissionName.ToString()
            }
        }
    }

    if ($null -ne $editPermissions -and $editPermissions.Count -gt 0)
    {
        $usersList += @{
            Id = $user.Id
            EmailAddress = $user.EmailAddress
            Username = $user.Username
            DisplayName = $user.DisplayName
            IsActive = $user.IsActive
            IsService = $user.IsService
            Permissions = ($editPermissions -join "| ")
        }
    }
}

if (![string]::IsNullOrWhiteSpace($csvExportPath))
{
    # Write header
    $header = $usersList.Keys | Select-Object -Unique
    Set-Content -Path $csvExportPath -Value ($header -join ",")

    foreach ($user in $usersList)
    {
        Add-Content -Path $csvExportPath -Value ($user.Values -join ",")
    }
}
```

</details>
<details data-group="list-users-with-editing-roles-scripts">
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

    public string Permissions
    {
        get;set;
    }
}

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
string csvExportPath = "path:\\to\\editpermissions.csv";

System.Collections.Generic.List<UserDetails> usersList = new System.Collections.Generic.List<UserDetails>();

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get all users
var users = repository.Users.FindAll();

// Loop through users
foreach (var user in users)
{
    System.Collections.Generic.List<string> editPermissions = new System.Collections.Generic.List<string>();

    var userPermissions = repository.UserPermissions.Get(user);

    // Loop through space permissions
    foreach (var spacePermission in userPermissions.SpacePermissions)
    {
        if (spacePermission.Key.ToString().ToLower().Contains("create") || spacePermission.Key.ToString().ToLower().Contains("delete") || spacePermission.Key.ToString().ToLower().Contains("edit"))
        {
            editPermissions.Add(spacePermission.Key.ToString());
        }
    }

    if (editPermissions.Count > 0)
    {
        // Get basic details
        UserDetails userDetails = new UserDetails();
        userDetails.Id = user.Id;
        userDetails.Username = user.Username;
        userDetails.DisplayName = user.DisplayName;
        userDetails.IsActive = user.IsActive;
        userDetails.IsService = user.IsService;
        userDetails.EmailAddress = user.EmailAddress;
        userDetails.Permissions = (String.Join("|", editPermissions.ToArray()));

        usersList.Add(userDetails);
    }
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
<details data-group="list-users-with-editing-roles-scripts">
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
csv_export_path = "path:\\to\\editpermissions.csv"

# Get users
uri = '{0}/api/users'.format(octopus_server_uri)
users = get_octopus_resource(uri, headers)
users_list = []

# Loop through users
for user in users:
    uri = '{0}/api/users/{1}/permissions'.format(octopus_server_uri, user['Id'])
    user_permissions = get_octopus_resource(uri, headers)

    edit_permission = []
    # Loop through space permissions
    for space_permission in user_permissions['SpacePermissions']:
        if "Create" in space_permission or "Delete" in space_permission or "Edit" in space_permission:
            edit_permission.append(space_permission)

    
    if len(edit_permission) > 0:
        users_list.append({
            'Id': user['Id'],
            'EmailAddress': user['EmailAddress'],
            'Username': user['Username'],
            'DisplayName': user['DisplayName'],
            'IsActive': user['IsActive'],
            'IsService': user['IsService'],
            'Permissions': '|'.join(edit_permission)
        })

    if csv_export_path:
        with open(csv_export_path, mode='w') as csv_file:
            fieldnames = ['Id', 'EmailAddress', 'Username', 'DisplayName', 'IsActive', 'IsService', 'Permissions']
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()
            for user in users_list:
                writer.writerow(user)
```

</details>
<details data-group="list-users-with-editing-roles-scripts">
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
	Id           string
	Username     string
	DisplayName  string
	IsActive     string
	IsService    string
	EmailAddress string
	Permissions  string
}

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	csvExportPath := "path:\\to\\editpermissions.csv"

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

		// Get user permissions
		userPermissions, err := client.Users.GetPermissions(user)
		editPermissions := []string{}

		if err != nil {
			log.Println(err)
		}

		// Loop through the permissions
		v := reflect.ValueOf(userPermissions.SpacePermissions)
		for i := 0; i < v.NumField(); i++ {
			if strings.Contains(v.Type().Field(i).Name, "Create") || strings.Contains(v.Type().Field(i).Name, "Delete") || strings.Contains(v.Type().Field(i).Name, "Edit") {
				permissionRestrictions := v.Field(i).Interface().([]octopusdeploy.UserPermissionRestriction)

				if len(permissionRestrictions) > 0 {
					editPermissions = append(editPermissions, v.Type().Field(i).Name)
				}
			}
		}

		if len(editPermissions) > 0 {
			// record user information
			userDetails := UserDetails{}
			userDetails.Id = user.ID
			userDetails.Username = user.Username
			userDetails.DisplayName = user.DisplayName
			userDetails.IsActive = strconv.FormatBool(user.IsActive)
			userDetails.IsService = strconv.FormatBool(user.IsService)
			userDetails.EmailAddress = user.EmailAddress
			userDetails.Permissions = strings.Join(editPermissions, "|")

			usersList = append(usersList, userDetails)
		}
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

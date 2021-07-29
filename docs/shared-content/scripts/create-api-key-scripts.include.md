```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# UserName of the user for which the API key will be created. You can check this value from the web portal under Configuration/Users
$UserName = "" 

#Purpose of the API Key. This field is mandatory.
$APIKeyPurpose = ""

# Create payload
$body = @{
    Purpose = $APIKeyPurpose
} | ConvertTo-Json

# Getting all users to filter target user by name
$allUsers = (Invoke-WebRequest "$OctopusURL/api/users/all" -Headers $header -Method Get).content | ConvertFrom-Json

# Getting user that owns API Key.
$User = $allUsers | Where-Object { $_.username -eq $UserName }

# Creating API Key
$CreateAPIKeyResponse = (Invoke-WebRequest "$OctopusURL/api/users/$($User.id)/apikeys" -Method Post -Headers $header -Body $body -Verbose).content | ConvertFrom-Json

# Printing new API Key
Write-Output "API Key created: $($CreateAPIKeyResponse.apikey)"
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "C:\octo\Octopus.Client.dll"

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

# Purpose of the API Key. This field is mandatory.
$APIKeyPurpose = ""

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

try
{
    # Get Current user
    $User = $repository.Users.GetCurrent()

    # Create API Key for user
    $ApiKeyResponse = $repository.Users.CreateApiKey($User, $APIKeyPurpose)

    # Return the API Key
    Write-Output "API Key created: $($ApiKeyResponse.ApiKey)"
}
catch
{
    Write-Host $_.Exception.Message
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions

// Reference Octopus.Client
//#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string apiKeyPurpose = "Key used with C# application";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

try
{
    // Get Current user
    var user = repository.Users.GetCurrent();

    // Create API Key for user
    var apiKeyResponse = repository.Users.CreateApiKey(user, apiKeyPurpose);

    // Return the API Key
    Console.WriteLine("API Key created: {0}", apiKeyResponse.ApiKey);
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

# Define Octopus server variables
octopus_server_uri = 'https://YourUrl'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = 'Default'
user_name = 'MyUser'
purpose = 'Descriptive purpose'

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get user
uri = '{0}/api/users'.format(octopus_server_uri)
users = get_octopus_resource(uri, headers)
user = next((x for x in users if x['Username'] == user_name), None)

# Create API key
apiKey = {
    'Purpose': purpose
}

uri = '{0}/api/users/{1}/apikeys'.format(octopus_server_uri, user['Id'])
response = requests.post(uri, headers=headers, json=apiKey)
response.raise_for_status()
```
```go Go
package main

import (
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
	userName := "MyUser"
	purpose := "Descriptive purpose"

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	// Get user
	user := GetUser(client, userName)
	userApiKey := octopusdeploy.NewAPIKey(purpose, user.ID)

	userApiKey, err = client.APIKeys.Create(userApiKey)

}

func octopusAuth(octopusURL *url.URL, APIKey, space string) *octopusdeploy.Client {
	client, err := octopusdeploy.NewClient(nil, octopusURL, APIKey, space)
	if err != nil {
		log.Println(err)
	}

	return client
}

func GetUser(client *octopusdeploy.Client, OctopusUserName string) *octopusdeploy.User {

	// Get user account
	userQuery := octopusdeploy.UsersQuery{
		Filter: OctopusUserName,
	}

	userAccounts, err := client.Users.Get(userQuery)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(userAccounts.Items); i++ {
		// Check to see if it's a match
		if userAccounts.Items[i].Username == OctopusUserName {
			return userAccounts.Items[i]
		}
	}

	return nil
}
```
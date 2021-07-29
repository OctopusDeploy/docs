```powershell PowerShell (REST API)
# Note: This script will only work with Octopus 2021.2 and higher.
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"

# Octopus Account name
$accountName = "My Google Cloud Account"

# Octopus Account Description
$accountDescription = "A Google Cloud account for my project"

# Tenant Participation e.g. Tenanted, or, Untenanted, or TenantedOrUntenanted
$accountTenantParticipation = "Untenanted"

# Google Cloud JSON key file
$jsonKeyPath = "/path/to/jsonkeyfile.json"

# (Optional) Tenant tags e.g.: "AWS Region/California"
$accountTenantTags = @() 
# (Optional) Tenant Ids e.g.: "Tenants-101"
$accountTenantIds = @()
# (Optional) Environment Ids e.g.: "Environments-1"
$accountEnvironmentIds = @()

if(-not (Test-Path $jsonKeyPath)) {
    Write-Warning "The Json Key file was not found at '$jsonKeyPath'."
    return
}
else {
    $jsonContent = Get-Content -Path $jsonKeyPath
    $jsonKeyBase64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($jsonContent))
}

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Create JSON payload
$jsonPayload = @{
    AccountType = "GoogleCloudAccount"
    JsonKey = @{
        HasValue = $true
        NewValue = $jsonKeyBase64
    }
    Name = $accountName
    Description = $accountDescription
    TenantedDeploymentParticipation = $accountTenantParticipation
    TenantTags = $accountTenantTags
    TenantIds = $accountTenantIds
    EnvironmentIds = $accountEnvironmentIds
}

# Add Google Cloud account
$accountResponse = Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/accounts" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
$accountResponse
```
```PowerShell (Octopus.Client)
# Note: This script will only work with Octopus 2021.2 and higher.
# It also requires version 11.3.3355 or higher of the Octopus.Client library

# You can get this dll from your Octopus Server/Tentacle installation directory or from
# https://www.nuget.org/packages/Octopus.Client/
Add-Type -Path 'path\to\Octopus.Client.dll'
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "Default"

# Octopus Account name
$accountName = "My Google Cloud Account"

# Octopus Account Description
$accountDescription = "A Google Cloud account for my project"

# Tenant Participation e.g. Tenanted, or, Untenanted, or TenantedOrUntenanted
$accountTenantParticipation = "Untenanted"

# Google Cloud JSON key file
$jsonKeyPath = "/path/to/jsonkeyfile.json"

# (Optional) Tenant tags e.g.: "AWS Region/California"
$accountTenantTags = @() 
# (Optional) Tenant Ids e.g.: "Tenants-101"
$accountTenantIds = @()
# (Optional) Environment Ids e.g.: "Environments-1"
$accountEnvironmentIds = @()

if(-not (Test-Path $jsonKeyPath)) {
    Write-Warning "The Json Key file was not found at '$jsonKeyPath'."
    return
}
else {
    $jsonContent = Get-Content -Path $jsonKeyPath
    $jsonKeyBase64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($jsonContent))
}

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Create Google Cloud Account object
    $googleCloudAccount = New-Object Octopus.Client.Model.Accounts.GoogleCloudAccountResource
    $googleCloudAccount.Name = $accountName
    $googleCloudAccount.Description = $accountDescription
    
    $jsonKeySensitiveValue = New-Object Octopus.Client.Model.SensitiveValue
    $jsonKeySensitiveValue.NewValue = $jsonKeyBase64
    $jsonKeySensitiveValue.HasValue = $True
    $googleCloudAccount.JsonKey = $jsonKeySensitiveValue

    $googleCloudAccount.TenantedDeploymentParticipation = [Octopus.Client.Model.TenantedDeploymentMode]::$accountTenantParticipation
    $googleCloudAccount.TenantTags = New-Object Octopus.Client.Model.ReferenceCollection $accountTenantTags
    $googleCloudAccount.TenantIds = New-Object Octopus.Client.Model.ReferenceCollection $accountTenantIds
    $googleCloudAccount.EnvironmentIds = New-Object Octopus.Client.Model.ReferenceCollection $accountEnvironmentIds

    # Create account
    $repositoryForSpace.Accounts.Create($googleCloudAccount)
}
catch
{
    Write-Host $_.Exception.Message
}
```
```csharp C#
// Note: This script will only work with Octopus 2021.2 and higher.
// It also requires version 11.3.3355 or higher of the Octopus.Client library

// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

var OctopusURL = "https://your.octopus.app";
var OctopusAPIKey = "API-YOURAPIKEY";
string spaceName = "Default";

// Octopus Account name
string accountName = "My Google Cloud Account";

// Octopus Account Description
string accountDescription = "A Google Cloud account for my project";

// Tenant Participation e.g. Tenanted, or, Untenanted, or TenantedOrUntenanted
Octopus.Client.Model.TenantedDeploymentMode octopusAccountTenantParticipation = Octopus.Client.Model.TenantedDeploymentMode.TenantedOrUntenanted;

// Google Cloud JSON key file
string jsonKeyPath = @"/path/to/jsonkeyfile.json";
string jsonKeyBase64 = "";

// (Optional) Tenant tags e.g.: "AWS Region/California"
Octopus.Client.Model.ReferenceCollection octopusAccountTenantTags = new ReferenceCollection();
// (Optional) Tenant Ids e.g.: "Tenants-101"
Octopus.Client.Model.ReferenceCollection octopusAccountTenantIds = new ReferenceCollection();
// (Optional) Environment Ids e.g.: "Environments-1"
Octopus.Client.Model.ReferenceCollection octopusAccountEnvironmentIds = new ReferenceCollection();

if (!File.Exists(jsonKeyPath))
{
    Console.WriteLine("The Json Key file was not found at '{0}", jsonKeyPath);
    return;
}
else
{
    string jsonContent = File.ReadAllText(jsonKeyPath);
    jsonKeyBase64 = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(jsonContent));
}

try
{
    // Create repository object
    var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
    var repository = new OctopusRepository(endpoint);
    var client = new OctopusClient(endpoint);

    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Create Google Cloud Account object
    var googleCloudAccount = new Octopus.Client.Model.Accounts.GoogleCloudAccountResource();

    googleCloudAccount.Name = accountName;
    googleCloudAccount.Description = accountDescription;
    googleCloudAccount.JsonKey = new SensitiveValue
    {
        NewValue = jsonKeyBase64,
        HasValue = true
    };
    googleCloudAccount.TenantedDeploymentParticipation = octopusAccountTenantParticipation;
    googleCloudAccount.TenantIds = octopusAccountTenantIds;
    googleCloudAccount.EnvironmentIds = octopusAccountEnvironmentIds;
    
    repositoryForSpace.Accounts.Create(googleCloudAccount);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
```python Python3
# Note: This script will only work with Octopus 2021.2 and higher.
import json
import requests
import base64

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

space_name = 'Default'
google_cloud_account_name = 'My Google Cloud Account'
google_cloud_account_description = 'A Google Cloud account for my project'
tenanted_participation = 'Untenanted'

tenant_tags = []
tenant_ids = []
environment_ids = []

json_keyfile_path = '/path/to/jsonkeyfile.json'
json_data = open(json_keyfile_path, 'rb').read()
json_key_base64 = base64.b64encode(json_data)

account = {
    'Id': None,
    'AccountType': 'GoogleCloudAccount',
    'JsonKey': {
        'HasValue': True,
        'NewValue': json_key_base64
    },
    'Name': google_cloud_account_name, 
    'Description': google_cloud_account_description, 
    'TenantedDeploymentParticipation': tenanted_participation,
    'TenantTags': tenant_tags,
    'TenantIds': tenant_ids,
    'EnvironmentIds': environment_ids
}
uri = '{0}/spaces/all'.format(octopus_server_uri)
response = requests.get(uri, headers=headers)
response.raise_for_status()
spaces = json.loads(response.content.decode('utf-8'))
space = next((x for x in spaces if x['Name'] == space_name), None)
uri = '{0}/{1}/accounts'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=account)
response.raise_for_status()
```
```go Go
package main

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"log"
	"net/url"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourURL"
	spaceName := "MySpace"
	googleAccountName := "MyGoogleAccount"
	pathToFile := "path:\\to\\google\\json\\file.json"

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Read json file
	jsonRawData, err := ioutil.ReadFile(pathToFile)

	if err != nil {
		log.Println(err)
	}

	// Convert data to base 64 string
	jsonString := base64.StdEncoding.EncodeToString(jsonRawData)

	// Create sensitive variable
	octopusAccountString := octopusdeploy.SensitiveValue{
		HasValue: true,
		NewValue: &jsonString,
	}

	// Create google account
	googleAccount, err := octopusdeploy.NewGoogleCloudAccount(googleAccountName, &octopusAccountString)

	if err != nil {
		log.Println(err)
	}

	client.Accounts.Add(googleAccount)
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
```
```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"

# Azure service principle details
$azureSubscriptionNumber = "Subscription-Guid"
$azureTenantId = "Tenant-Guid"
$azureClientId = "Client-Guid"
$azureSecret = "Secret"

# Octopus Account details
$accountName = "Azure Account"
$accountDescription = "My Azure Account"
$accountTenantParticipation = "Untenanted"
$accountTenantTags = @()
$accountTenantIds = @()
$accountEnvironmentIds = @()

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Create JSON payload
$jsonPayload = @{
    AccountType = "AzureServicePrincipal"
    AzureEnvironment = ""
    SubscriptionNumber = $azureSubscriptionNumber
    Password = @{
        HasValue = $true
        NewValue = $azureSecret
    }
    TenantId = $azureTenantId
    ClientId = $azureClientId
    ActiveDirectoryEndpointBaseUri = ""
    ResourceManagementEndpointBaseUri = ""
    Name = $accountName
    Description = $accountDescription
    TenantedDeploymentParticipation = $accountTenantParticipation
    TenantTags = $accountTenantTags
    TenantIds = $accountTenantIds
    EnvironmentIds = $accountEnvironmentIds
}

# Add Azure account
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/accounts" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header

```
```powershell PowerShell (Octopus.Client)
# Load assembly
Add-Type -Path 'path\to\Octopus.Client.dll'
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

# Azure service principle details
$azureSubscriptionNumber = "Subscription-Guid"
$azureTenantId = "Tenant-Guid"
$azureClientId = "Client-Guid"
$azureSecret = "Secret"

# Octopus Account details
$accountName = "Azure Account"
$accountDescription = "My Azure Account"
$accountTenantParticipation = "Untenanted"
$accountTenantTags = @()
$accountTenantIds = @()
$accountEnvironmentIds = @()
$spaceName = "default"


$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Create azure service principal object
    $azureAccount = New-Object Octopus.Client.Model.Accounts.AzureServicePrincipalAccountResource
    $azureAccount.ClientId = $azureClientId
    $azureAccount.TenantId = $azureTenantId
    $azureAccount.Description = $accountDescription
    $azureAccount.Name = $accountName
    $azureAccount.Password = $azureSecret
    $azureAccount.SubscriptionNumber = $azureSubscriptionNumber
    $azureAccount.TenantedDeploymentParticipation = [Octopus.Client.Model.TenantedDeploymentMode]::$accountTenantParticipation
    $azureAccount.TenantTags = New-Object Octopus.Client.Model.ReferenceCollection $accountTenantTags
    $azureAccount.TenantIds = New-Object Octopus.Client.Model.ReferenceCollection $accountTenantIds
    $azureAccount.EnvironmentIds = New-Object Octopus.Client.Model.ReferenceCollection $accountEnvironmentIds

    # Create account
    $repositoryForSpace.Accounts.Create($azureAccount)
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

var OctopusURL = "https://youroctourl";
var OctopusAPIKey = "API-YOURAPIKEY";

// Azure specific details
string azureSubscriptionNumber = "Subscription-Guid";
string azureClientId = "Client-Guid";
string azureTenantId = "Tenant-Guid";
string azureSecret = "Secret";

// Octopus Account details
string octopusAccountName = "Azure Account";
string octopusAccountDescription = "My Azure Account";
Octopus.Client.Model.TenantedDeploymentMode octopusAccountTenantParticipation = Octopus.Client.Model.TenantedDeploymentMode.Untenanted;
Octopus.Client.Model.ReferenceCollection octopusAccountTenantTags = null;
Octopus.Client.Model.ReferenceCollection octopusAccountTenantIds = null;
Octopus.Client.Model.ReferenceCollection octopusAccountEnvironmentIds = null;
string spaceName = "default";

var endpoint = new OctopusServerEndpoint(OctopusURL, OctopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);
var azureAccount = new Octopus.Client.Model.Accounts.AzureServicePrincipalAccountResource();

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Fill in account details
    azureAccount.ClientId = azureClientId;
    azureAccount.TenantId = azureTenantId;
    azureAccount.SubscriptionNumber = azureSubscriptionNumber;
    azureAccount.Password = azureSecret;
    azureAccount.Name = octopusAccountName;
    azureAccount.Description = octopusAccountDescription;
    azureAccount.TenantedDeploymentParticipation = octopusAccountTenantParticipation;
    azureAccount.TenantTags = octopusAccountTenantTags;
    azureAccount.TenantIds = octopusAccountTenantIds;
    azureAccount.EnvironmentIds = octopusAccountEnvironmentIds;

    // Create account
    repositoryForSpace.Accounts.Create(azureAccount);
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

space_name = 'Default'

account = {
    'Id': None,
    'AccountType': 'AzureServicePrincipal',
    'AzureEnvironment': '',
    'SubscriptionNumber': 'Subscription GUID', # replace with valid GUID
    'Password': {
        'HasValue': True,
        'NewValue': 'App registration secret' # replace with valid secret
    },
    'TenantId': 'Tenant GUID', # replace with valid GUID
    'ClientId': 'Client GUID', # replace with valid GUID
    'ActiveDirectoryEndpointBaseUri': '',
    'ResourceManagementEndpointBaseUri': '',
    'Name': 'Azure Account Name', # replace with preferred name
    'Description': 'Azure Account Description', # replace with preferred description
    'TenantedDeploymentParticipation': 'Untenanted',
    'TenantTags': [],
    'TenantIds': [],
    'EnvironmentIds': []
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
	"fmt"
	"log"
	"github.com/google/uuid"
	"net/url"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	accountName := "MyAzureAccount"
	subscriptionID := "MySubscriptionId"
	tenantID := "MyTenantId"
	applicationID := "MyApplicationId"
	password := "MyPassword"
	azureClientPassword := octopusdeploy.SensitiveValue{
		HasValue: true,
		NewValue: &password,
	}
	spaceName := "Default"

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Convert values
	subscriptionID_UUID, _ := uuid.Parse(subscriptionID)
	tenantID_UUID, _ := uuid.Parse(tenantID)
	applicationID_UUID, _ := uuid.Parse(applicationID)

	// Create AWS account object
	azureAccount, err := octopusdeploy.NewAzureServicePrincipalAccount(accountName, subscriptionID_UUID, tenantID_UUID, applicationID_UUID, &azureClientPassword)

	if err != nil {
		log.Println(err)
	}

	client.Accounts.Add(azureAccount)
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

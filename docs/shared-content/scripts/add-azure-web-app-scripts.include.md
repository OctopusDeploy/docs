```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$azureServicePrincipalName = "MyAzureAccount"
$azureResourceGroupName = "MyResourceGroup"
$environmentNames = @("Development", "Production")
$roles = @("Myrole")
$environmentIds = @()
$azureWebAppName = "MyAzureWebAppName"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get Azure account
$azureAccount = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/accounts/all" -Headers $header) | Where-Object {$_.Name -eq $azureServicePrincipalName}

# Get Environments
$environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
foreach ($environment in $environments)
{
    $environmentIds += $environment.Id
}

# Build json payload
$jsonPayload = @{
    Name = $azureWebAppName
    EndPoint = @{
        CommunicationStyle = "AzureWebApp"
        AccountId = $azureAccount.Id
        ResourceGroupName = $azureResourceGroupName
        WebAppName = $azureWebAppName
    }
    Roles = $roles
    EnvironmentIds = $environmentIds
}

# Register the target to Octopus Deploy
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/machines" -Headers $header -Body ($jsonPayload | ConvertTo-Json -Depth 10)
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$azureServicePrincipalName = "MyAzureAccount"
$azureResourceGroupName = "MyResourceGroup"
$azureWebAppName = "MyAzureWebApp"
$spaceName = "default"
$environmentNames = @("Development", "Production")
$roles = @("MyRole")


$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get environment ids
    $environments = $repositoryForSpace.Environments.FindAll() | Where-Object {$environmentNames -contains $_.Name}

    # Get Azure account
    $azureAccount = $repositoryForSpace.Accounts.FindByName($azureServicePrincipalName)

    # Create new Azure Web App object
    $azureWebAppTarget = New-Object Octopus.Client.Model.Endpoints.AzureWebAppEndpointResource
    $azureWebAppTarget.AccountId = $azureAccount.Id
    $azureWebAppTarget.ResourceGroupName = $azureResourceGroupName
    $azureWebAppTarget.WebAppName = $azureWebAppName

    # Create new machine object
    $machine = New-Object Octopus.Client.Model.MachineResource
    $machine.Endpoint = $azureWebAppTarget
    $machine.Name = $azureWebAppName

    # Add Environments
    foreach ($environment in $environments)
    {
        # Add to target
        $machine.EnvironmentIds.Add($environment.Id)
    }

    # Add roles
    foreach ($role in $roles)
    {
        $machine.Roles.Add($role)
    }

    # Add to machine to space
    $repositoryForSpace.Machines.Create($machine)
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
string[] roles = { "MyRole" };
List<string> environmentIds = new List<string>();
string azureServicePrincipalName = "MyAzureAccount";
string azureResourceGroupName = "Target-Hybrid-rg";
string azureWebAppName = "s-OctoPetShop-Web";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get environments
    foreach (var environmentName in environmentNames)
    {
        environmentIds.Add(repositoryForSpace.Environments.FindByName(environmentName).Id);
    }

    // Get Azure account
    var azureAccount = repositoryForSpace.Accounts.FindByName(azureServicePrincipalName);

    // Create new azure web app object
    var azureWebAppTarget = new Octopus.Client.Model.Endpoints.AzureWebAppEndpointResource();
    azureWebAppTarget.AccountId = azureAccount.Id;
    azureWebAppTarget.ResourceGroupName = azureResourceGroupName;
    azureWebAppTarget.WebAppName = azureWebAppName;

    // Create new machine resource
    var tentacle = new Octopus.Client.Model.MachineResource();
    tentacle.Endpoint = azureWebAppTarget;
    tentacle.Name = azureWebAppName;

    // Fill in details for target
    foreach (string environmentId in environmentIds)
    {
        // Add to target
        tentacle.EnvironmentIds.Add(environmentId);
    }

    foreach (string role in roles)
    {
        tentacle.Roles.Add(role);
    }

    // Add machine to space
    repositoryForSpace.Machines.Create(tentacle);
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


space_name = 'Default'
azure_account_name = 'Your Azure Account Name'
environment_names = ['Development', 'Test']
roles = ['your-product-web']

spaces = get_octopus_resource('{0}/spaces/all'.format(octopus_server_uri))
space = next((x for x in spaces if x['Name'] == space_name), None)

azure_accounts = get_octopus_resource('{0}/{1}/accounts/all'.format(octopus_server_uri, space['Id']))
azure_account = next((x for x in azure_accounts if x['Name'] == azure_account_name), None)

environments = get_octopus_resource('{0}/{1}/environments/all'.format(octopus_server_uri, space['Id']))
environment_ids = [e['Id'] for e in environments if e['Name'] in environment_names]

azure_web_app = {
    'Name': 'New Azure Web App',
    'EndPoint': {
        'CommunicationStyle': 'AzureWebApp',
        'AccountId': azure_account['Id'],
        'ResourceGroupName': 'Your Resource Group',
        'WebAppName': 'Your Web App'
    },
    'Roles': roles,
    'EnvironmentIds': environment_ids
}

uri = '{0}/{1}/machines'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=azure_web_app)
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
	spaceName := "Default"
	azureServicePrincipalName := "MyAzurePrincipal"
	environmentNames := []string{"Development", "Production"}
	roles := []string{"MyRole"}
	azureWebAppName := "MyWebApp"
	azureResourceGroupName := "MyResourceGroup"

	apiURL, err := url.Parse("https://youroctourl")
	if err != nil {
		log.Println(err)
	}

	APIKey := "API-YOURKEY"

	// Get space to work with
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get the azure account
	azureAccount := GetAzureAccount(apiURL, APIKey, space, azureServicePrincipalName)

	// Get client for space
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Create new Azure Web App object
	azureWebApp := octopusdeploy.NewAzureWebAppEndpoint()
	azureWebApp.CommunicationStyle = "AzureWebApp"
	azureWebApp.AccountID = azureAccount.ID
	azureWebApp.ResourceGroupName = azureResourceGroupName
	azureWebApp.WebAppName = azureWebAppName

	// Get deployment IDs
	environmentIds := []string{}
	for i := 0; i < len(environmentNames); i++ {
		environment := GetEnvironment(apiURL, APIKey, space, environmentNames[i])
		environmentIds = append(environmentIds, environment.ID)
	}

	// Create new deployment target object
	deploymentTarget := octopusdeploy.NewDeploymentTarget(azureWebAppName, azureWebApp, environmentIds, roles)

	machine, err := client.Machines.Add(deploymentTarget)

	if err != nil {
		log.Println(err)
	}

	fmt.Println("Successfully created " + machine.ID)
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
	}

	return space
}

func GetAzureAccount(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, accountName string) *octopusdeploy.AzureServicePrincipalAccount {
	// Get client for space
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Create accounts query
	accountsQuery := octopusdeploy.AccountsQuery{
		PartialName: accountName,
	}

	accounts, err := client.Accounts.Get(accountsQuery)

	if err != nil {
		log.Println(err)
	}

	// return the result, casting to specific account type
	return accounts.Items[0].(*octopusdeploy.AzureServicePrincipalAccount)
}

func GetEnvironment(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, environmentName string) *octopusdeploy.Environment {
	// Get client for space
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get environment
	environment, err := client.Environments.GetByName(environmentName)

	if err != nil {
		log.Println(err)
	}

	// return environment
	return environment[0]
}
```
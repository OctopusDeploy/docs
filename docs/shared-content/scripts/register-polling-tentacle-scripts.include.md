```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$communicationsStyle = "TentacleActive" # Listening mode
$hostName = "MyHost"
$environmentNames = @("Development", "Production")
$roles = @("MyRole")
$environmentIds = @()
$tentacleThumbprint = "TentacleThumbprint"
$tentacleIdentifier = "PollingTentacleIdentifier" # Must match value in Tentacle.config file on tentacle machine; ie poll://RandomCharacters

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get environment Ids
$environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
foreach ($environment in $environments)
{
    $environmentIds += $environment.Id
}

# Create unique URI for tentacle
$tentacleURI = "poll://$tentacleIdentifier"

# Create JSON payload
$jsonPayload = @{
    Endpoint = @{
        CommunicationStyle = $communicationsStyle
        Thumbprint = $tentacleThumbprint
        Uri = $tentacleURI
    }
    EnvironmentIds = $environmentIds
    Name = $hostName
    Roles = $roles
    Status = "Unknown"
    IsDisabled = $false
}

$jsonPayload

# Register new target to space
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/machines" -Headers $header -Body ($jsonPayload | ConvertTo-Json -Depth 10)
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$hostName = "MyHost"
$tentacleThumbprint = "TentacleThumbprint"
$tentacleIdentifier = "PollingTentacleIdentifier" # Must match value in Tentacle.config file on tentacle machine; ie poll://RandomCharacters
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

    # Create new polling tentacle resource
    $newTarget = New-Object Octopus.Client.Model.Endpoints.PollingTentacleEndpointResource

    $newTarget.Uri = "poll://$tentacleIdentifier"
    $newTarget.Thumbprint = $tentacleThumbprint

    # Create new machien resourece
    $tentacle = New-Object Octopus.Client.Model.MachineResource
    $tentacle.Endpoint = $newTarget
    $tentacle.Name = $hostName
    
    
    # Add properties to host
    foreach ($environment in $environments)
    {
        # Add to target
        $tentacle.EnvironmentIds.Add($environment.Id)
    }

    foreach ($role in $roles)
    {
        # Add to target
        $tentacle.Roles.Add($role)
    }
        
    # Add to machine to space
    $repositoryForSpace.Machines.Create($tentacle)
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
string hostName = "OctoTempTentacle";
string[] environmentNames = { "Development", "Production" };
string[] roles = { "MyRole" };
List<string> environmentIds = new List<string>();
string tentacleThumbprint = "TentacleThumbprint";
string tentacleIdentifier = "PollingTentacleIdentifer"; // Must match value in Tentacle.config file on tentacle machine; ie poll://RandomCharacters

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

    // Create new polling tentacle resource
    var newTarget = new Octopus.Client.Model.Endpoints.PollingTentacleEndpointResource();
    newTarget.Uri = string.Format("poll://{0}", tentacleIdentifier);
    newTarget.Thumbprint = tentacleThumbprint;

    // Create new machine resource
    var tentacle = new Octopus.Client.Model.MachineResource();
    tentacle.Endpoint = newTarget;
    tentacle.Name = hostName;

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


def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)


space_name = 'Default'
environment_names = ['Development', 'Test']
target_name = 'your-target-name'
target_tentacle_thumbprint = 'your-tentacle-thumbprint'

# The subscription id is a random 20 character id (for example: 3hw9vtskv2cbfw7zvpje) that is used to queue messages from the server to the Polling Tentacle. 
# This should match the value in the Tentacle config file.
target_polling_subscription_identifier = 'your-target-subscription'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
environments = get_octopus_resource('{0}/{1}/environments/all'.format(octopus_server_uri, space['Id']))
environment_ids = [environment['Id'] for environment in environments if environment['Name'] in environment_names]

target = {
    'Endpoint': {
        'CommunicationStyle': 'TentacleActive',
        'Thumbprint': target_tentacle_thumbprint,
        'Uri': 'poll://{0}'.format(target_polling_subscription_identifier)
    },
    'EnvironmentIds': environment_ids,
    'Name': target_name,
    'Roles': ['your-target-role'],
    'Status': 'Unknown',
    'IsDisabled': False
}

uri = '{0}/{1}/machines'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=target)
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
	hostName := "MyPollingTentacle"
	environments := []string{"Development", "Test"}
	roles := []string{"MyRole"}
	tentacleThumbprint := "PollingTentacleThumbprint"
	tentacleIdentifier := "PollingTentacleIdentifier"

	// Get the space object
	space := GetSpace(apiURL, APIKey, spaceName)

	// Creat client for space
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get the environment ids
	environmentIds := GetEnvironmentIds(client, environments)
	pollingUrl, err := url.Parse("poll://" + tentacleIdentifier + "/")
	if err != nil {
		log.Println(err)
	}

	newDeploymentTargetEndPoint := octopusdeploy.NewPollingTentacleEndpoint(pollingUrl, tentacleThumbprint)
	newDeploymentTargetEndPoint.CommunicationStyle = "TentacleActive"

	newDeploymentTarget := octopusdeploy.NewDeploymentTarget(hostName, newDeploymentTargetEndPoint, environmentIds, roles)

	machine, err := client.Machines.Add(newDeploymentTarget)
	if err != nil {
		log.Println(err)
	}

	fmt.Println(machine)
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

func GetEnvironmentIds(client *octopusdeploy.Client, environmentNames []string) []string {
	environmentIds := []string{}

	for _, environmentName := range environmentNames {
		environment, err := client.Environments.GetByName(environmentName)
		if err != nil {
			log.Println(err)
		}

		environmentIds = append(environmentIds, environment[0].ID)
	}

	return environmentIds
}
```
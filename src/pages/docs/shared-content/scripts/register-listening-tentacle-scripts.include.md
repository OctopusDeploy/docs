```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$hostName = "MyHost"
$tentaclePort = "10933"
$environmentNames = @("Development", "Production")
$roles = @("MyRole")
$environmentIds = @()

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get environment Ids
$environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
foreach ($environment in $environments)
{
    $environmentIds += $environment.Id
}

# Discover new target
$newTarget = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/discover?host=$hostName&port=$tentaclePort&type=TentaclePassive" -Headers $header

# Create JSON payload
$jsonPayload = @{
    Endpoint = @{
        CommunicationStyle = $newTarget.Endpoint.CommunicationStyle
        Thumbprint = $newTarget.Endpoint.Thumbprint
        Uri = $newTarget.Endpoint.Uri
    }
    EnvironmentIds = $environmentIds
    Name = $newTarget.Name
    Roles = $roles
    Status = "Unknown"
    IsDisabled = $false
}

# Register new target to space
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/machines" -Headers $header -Body ($jsonPayload | ConvertTo-Json -Depth 10)
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$hostName = "MyHost"
$tentaclePort = "10933"
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
    $environments = $repositoryForSpace.Environments.GetAll() | Where-Object {$environmentNames -contains $_.Name}

    # Discover host
    $newTarget = $repositoryForSpace.Machines.Discover($hostName, $tentaclePort)

    # Add properties to host
    foreach ($environment in $environments)
    {
        # Add to target
        $newTarget.EnvironmentIds.Add($environment.Id) | Out-Null
    }

    foreach ($role in $roles)
    {
        # Add to target
        $newTarget.Roles.Add($role) | Out-Null
    }
    $newTarget.IsDisabled = $false

    # Add to machine to space
    $repositoryForSpace.Machines.Create($newTarget)
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
string hostName = "MyHost";
int tentaclePort = 10933;
string[] environmentNames = { "Development", "Production" };
string[] roles = { "MyRole" };
List<string> environmentIds = new List<string>();

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

    // Discover host
    var newTarget = repositoryForSpace.Machines.Discover(hostName, tentaclePort);

    // Fill in details for target
    foreach (string environmentId in environmentIds)
    {
        // Add to target
        newTarget.EnvironmentIds.Add(environmentId);
    }

    foreach (string role in roles)
    {
        newTarget.Roles.Add(role);
    }

    // Add machine to space
    repositoryForSpace.Machines.Create(newTarget);
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

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
environments = get_octopus_resource('{0}/{1}/environments/all'.format(octopus_server_uri, space['Id']))
environment_ids = [environment['Id'] for environment in environments if environment['Name'] in environment_names]

params = {
    'host': 'your target hostname',
    'port': '10933',
    'type': 'TentaclePassive'
}
uri = '{0}/{1}/machines/discover'.format(octopus_server_uri, space['Id'])
response = requests.get(uri, headers=headers, params=params)
response.raise_for_status()

discovered = json.loads(response.content.decode('utf-8'))

target = {
    'Endpoint': discovered['Endpoint'],
    'EnvironmentIds': environment_ids,
    'Name': discovered['Name'],
    'Roles': ['your-target-role']
}

uri = '{0}/{1}/machines'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=target)
response.raise_for_status()
```
```go Go
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strconv"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

type DiscoveredMachine struct {
	Architecture      string
	Endpoint          EndPoint
	HasLatestCalamari bool
	HealthStatus      string
	IsDisabled        bool
	IsInProcess       bool
	Name              string
	Status            string
}

type EndPoint struct {
	CertificateSignatureAlgorithm string
	CommunicationStyle            string
	Id                            string
	LastModifiedBy                string
	LastModifiedOn                string
	Thumbprint                    string
	Uri                           string
}

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"

	spaceName := "Default"
	hostName := "MyMachine"
	tentaclePort := 10933
	environments := []string{"Development", "Test"}
	roles := []string{"MyRole"}

	// Get the space object
	space := GetSpace(apiURL, APIKey, spaceName)

	// Creat client for space
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get the environment ids
	environmentIds := GetEnvironmentIds(client, environments)

	// The client doesn't have this *yet* so we're hitting the API directly
	discoveredMachine := DiscoverMachine(apiURL, APIKey, hostName, tentaclePort, space)

	// Create new machine
	parsedUri, err := url.Parse(discoveredMachine.Endpoint.Uri)
	if err != nil {
		log.Println(err)
	}

	newDeploymentTargetEndpoint := octopusdeploy.NewListeningTentacleEndpoint(parsedUri, discoveredMachine.Endpoint.Thumbprint)
	newDeploymentTargetEndpoint.Thumbprint = discoveredMachine.Endpoint.Thumbprint

	newDeploymentTarget := octopusdeploy.NewDeploymentTarget(hostName, newDeploymentTargetEndpoint, environmentIds, roles)

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

func GetEnvironmentIds(client *octopusdeploy.Client, environmentNames []string) []string {
	environmentIds := []string{}

	for _, environmentName := range environmentNames {
		environmentsQuery := octopusdeploy.EnvironmentsQuery {
		    Name: environmentName,		
	    }  
		environments, err := client.Environments.Get(environmentsQuery)
        if err != nil {
            log.Println(err)
        }

        // Loop through results
        for _, environment := range environments.Items {
            if environment.Name == environmentName {
                environmentIds = append(environmentIds, environment.ID)
            }
        }
	}

	return environmentIds
}

func DiscoverMachine(octopusURL *url.URL, APIKey string, hostname string, port int, space *octopusdeploy.Space) DiscoveredMachine {
	// Construct url
	discoverUrl := octopusURL.String() + "/api/" + space.ID + "/machines/discover?host=" + hostname + "&port=" + strconv.Itoa(port)

	// Create http client
	httpClient := &http.Client{}

	// Create request object
	request, err := http.NewRequest("GET", discoverUrl, nil)
	if err != nil {
		log.Println(err)
	}

	request.Header.Set("X-Octopus-ApiKey", APIKey)
	request.Header.Set("Content-Type", "application/json")

	// Execute request
	response, err := httpClient.Do(request)
	if err != nil {
		log.Println(err)
	}

	// Get the response
	var machine DiscoveredMachine

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Println(err)
	}

	json.Unmarshal(responseData, &machine)

	return machine
}
```
```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctopus.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default"
$environments = @("Development", "Test", "Staging", "Production")

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

foreach ($environment in $environments) {
    
    # Check to see if environment exists
    $environments = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments?partialName=$([uri]::EscapeDataString($environment))&skip=0&take=100" -Headers $header
    $existingEnvironment = $environments.Items | Where-Object { $_.Name -eq $environment }

    if($null -ne $existingEnvironment) {
        Write-Host "Environment '$environment' already exists. Nothing to create :)"
    }
    else {

        $body = @{
            Name = $environment
        } | ConvertTo-Json

        Write-Host "Creating environment '$environment'"
        $response = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments" -Headers $header -Method Post -Body $body 
        Write-Host "EnvironmentId: $($response.Id)"
    }
}
```
```powershell PowerShell (Octopus.Client)
$ErrorActionPreference = "Stop";

# You can get this dll from your Octopus Server/Tentacle installation directory or from
# https://www.nuget.org/packages/Octopus.Client/
Add-Type -Path 'path\to\Octopus.Client.dll'

$octopusURL = "https://youroctopus.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"

$spaceName = "Default"
$environments = @("Development", "Test", "Staging", "Production")

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

foreach ($environmentName in $environments) {
    
    $environment = $repositoryForSpace.Environments.FindByName($environmentName)
    if($null -ne $environment) {
        Write-Host "Environment '$environmentName' already exists. Nothing to create :)"
    }
    else {
        Write-Host "Creating environment '$environmentName'"
        $environment = New-Object Octopus.Client.Model.EnvironmentResource -Property @{
            Name = $environmentName
        }
        
        $repositoryForSpace.Environments.Create($environment)
        Write-Host "EnvironmentId: $($response.Id)"
    }
}
```

```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctopus.octopus.app";
var octopusAPIKey = "API-YOURAPIKEY";

var spaceName = "Default";
var environments = new List<string> { "Development", "Staging", "Test", "Production" };

// Create endpoint, repository and client
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    foreach (var environmentName in environments)
    {
        // Check for existing environment
        var environment = repositoryForSpace.Environments.FindByName(environmentName);
        if (environment != null)
        {
            Console.WriteLine("Environment '{0}' already exists. Nothing to create :)", environmentName);
        }
        else
        {
            Console.WriteLine("Creating environment '{0}'", environmentName);
            var environmentResource = new EnvironmentResource { Name = environmentName };
            environment = repositoryForSpace.Environments.Create(environmentResource);
            Console.WriteLine("EnvironmentId: {0}", environment.Id);
        }
    }
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
from urllib.parse import quote

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()

    return json.loads(response.content.decode('utf-8'))

def post_octopus_resource(uri, body):
    response = requests.post(uri, headers=headers, json=body)
    response.raise_for_status()

    return json.loads(response.content.decode('utf-8'))

def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources['Items'] if x['Name'] == name), None)

space_name = 'Default'
environment_names = ['Development', 'Test', 'Staging', 'Production']

space = get_by_name('{0}/spaces?partialName={1}&skip=0&take=100'.format(octopus_server_uri, quote(space_name)), space_name)

for environment_name in environment_names:
    existing_environment = get_by_name('{0}/{1}/environments?partialName={2}&skip=0&take=100'.format(octopus_server_uri, space['Id'], quote(environment_name)), environment_name)
    if existing_environment is None:
        print('Creating environment \'{0}\''.format(environment_name))
        environment = {
            'Name': environment_name
        }
        environment_resource = post_octopus_resource('{0}/{1}/environments'.format(octopus_server_uri, space['Id']), environment)
        print('EnvironmentId: \'{0}\''.format(environment_resource['Id']))
    else:
        print('Environment \'{0}\' already exists. Nothing to create :)'.format(environment_name))
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

	apiURL, err := url.Parse("https://YourUrl")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	environmentNames := []string{"Environment1", "Environment2"}

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get references to environments
	for i := 0; i < len(environmentNames); i++ {
		environment := GetEnvironment(apiURL, APIKey, space, environmentNames[i])

		// Check to see if environment already exists
		if environment == nil {
			environment := octopusdeploy.NewEnvironment(environmentNames[i])
			client := octopusAuth(apiURL, APIKey, space.ID)
			client.Environments.Add(environment)
		} else {
			fmt.Println("Environment " + environment.Name + " already exists.")
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

func GetEnvironment(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, EnvironmentName string) *octopusdeploy.Environment {
	client := octopusAuth(octopusURL, APIKey, space.ID)

	environment, err := client.Environments.GetByName(EnvironmentName)

	if err != nil {
		log.Println(err)
	}

	if len(environment) > 0 {
		return environment[0]
	}

	return nil
}
```
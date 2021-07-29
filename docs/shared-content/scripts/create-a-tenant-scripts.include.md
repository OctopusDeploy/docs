```powershell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
# Provide the space name
$spaceName = "Default"
# Provide a tenant name
$tenantName = "MyTenant"
# Provide project names which have multi-tenancy enabled in their settings.
$projectNames = @("MyProject")
# provide the environments to connect to the projects.
$environmentNames = @("Development", "Test")
# Optionally, provide existing tenant tagsets you wish to apply.
$tenantTags = @("MyTagSet/Beta", "MyTagSet/Stable") # Format: TagSet/Tag

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get projects
$projectIds = @()
foreach ($projectName in $projectNames)
{
    $projectIds += ((Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}).Id
}

# Get Environments
$environmentIds = @()
$environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
foreach ($environment in $environments)
{
    $environmentIds += $environment.Id
}

# Build project/environments
$projectEnvironments = @{}
foreach ($projectId in $projectIds)
{
    $projectEnvironments.Add($projectId, $environmentIds)
}

# Build json payload
$jsonPayload = @{
    Name = $tenantName
    TenantTags = $tenantTags
    SpaceId = $space.Id
    ProjectEnvironments = $projectEnvironments
}

# Create tenant
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tenants" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header -ContentType "application/json"
```
```powershell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctopusurl"
$octopusAPIKey = "API-KEY"
$spaceName = "default"
$tenantName = "MyTenant"
$projectNames = @("MyProject")
$environmentNames = @("Development", "Test")
$tenantTags = @("MyTagSet/Beta", "MyTagSet/Stable") # Format: TagSet/Tag

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

    # Get projects
    $projects = $repositoryForSpace.Projects.GetAll() | Where-Object {$projectNames -contains $_.Name}
    
    # Create projectenvironments
    $projectEnvironments = New-Object Octopus.Client.Model.ReferenceCollection
    foreach ($environment in $environments)
    {
        $projectEnvironments.Add($environment.Id) | Out-Null
    }

    # Create new tenant resource
    $tenant = New-Object Octopus.Client.Model.TenantResource
    $tenant.Name = $tenantName
    
    # Add tenant tags
    foreach ($tenantTag in $tenantTags)
    {
        $tenant.TenantTags.Add($tenantTag) | Out-Null
    }
    
    # Add project environments
    foreach ($project in $projects)
    {
        $tenant.ProjectEnvironments.Add($project.Id, $projectEnvironments) | Out-Null
    }
    
    # Create the tenant
    $repositoryForSpace.Tenants.Create($tenant)
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
string tenantName = "MyTenant";
string[] projectNames = { "MyProject" };
string[] environmentNames = { "Development", "Production" };
string[] tenantTags = { "MyTagSet/Beta", "MyTagSet/Stable" };

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get projects
    var projects = repositoryForSpace.Projects.FindByNames(projectNames);

    // Get environments
    var environments = repositoryForSpace.Environments.FindByNames(environmentNames);

    // Create projectenvironments
    Octopus.Client.Model.ReferenceCollection projectEnvironments = new ReferenceCollection();
    foreach (var environment in environments)
    {
        projectEnvironments.Add(environment.Id);
    }

    // Create tenant object
    Octopus.Client.Model.TenantResource tenant = new TenantResource();
    tenant.Name = tenantName;

    foreach (string tenantTag in tenantTags)
    {
        tenant.TenantTags.Add(tenantTag);
    }

    foreach (var project in projects)
    {
        tenant.ProjectEnvironments.Add(project.Id, projectEnvironments);
    }

    // Create tenant
    repositoryForSpace.Tenants.Create(tenant);
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
octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = 'Default'
tenant_name = 'MyTenant'
project_names = ['MyProject']
environment_names = ['Development', 'Test']
tenant_tags = ['TagSet/Tag'] # Format: TagSet/Tag

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get projects
uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)
tenantProjects = []
for project_name in project_names:
    project = next((x for x in projects if x['Name'] == project_name), None)
    if None != project:
        tenantProjects.append(project['Id'])
    else:
        print ('{0} not found!'.format(project_name))

# Get environments
uri = '{0}/api/{1}/environments'.format(octopus_server_uri, space['Id'])
environments = get_octopus_resource(uri, headers)
tenantEnvironments = []
for environment_name in environment_names:
    environment = next((x for x in environments if x['Name'] == environment_name), None)
    if None != environment:
        tenantEnvironments.append(environment['Id'])

# Create project/environment dictionary
projectEnvironments = {}
for project in tenantProjects:
    projectEnvironments[project] = tenantEnvironments

# Create new Tenant
tenant = {
    'Name': tenant_name,
    'TenantTags': tenant_tags,
    'SpaceId': space['Id'],
    'ProjectEnvironments': projectEnvironments
}

uri = '{0}/api/{1}/tenants'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=tenant)
response.raise_for_status
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
	tenantName := "MyTenant"
	environmentNames := []string{"Development", "Test"}
	projectNames := []string{"MyProject"}
	tenantTags := []string{"TagSet/Tag"}
	projectEnvironments := make(map[string][]string)

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Loop through environments
	for i := 0; i < len(projectNames); i++ {
		project := GetProject(apiURL, APIKey, space, projectNames[i])
		environmentIds := []string{}
		for j := 0; j < len(environmentNames); j++ {
			environment := GetEnvironment(apiURL, APIKey, space, environmentNames[j])
			environmentIds = append(environmentIds, environment.ID)
		}
		projectEnvironments[project.ID] = environmentIds
	}

	// Create new tenant
	tenant := octopusdeploy.NewTenant(tenantName)
	tenant.SpaceID = space.ID
	tenant.ProjectEnvironments = projectEnvironments
	tenant.TenantTags = tenantTags

	client := octopusAuth(apiURL, APIKey, space.ID)
	client.Tenants.Add(tenant)
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

func GetProject(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, projectName string) *octopusdeploy.Project {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get project
	project, err := client.Projects.GetByName(projectName)

	if err != nil {
		log.Println(err)
	}

	if project != nil {
		fmt.Println("Retrieved project " + project.Name)
	} else {
		fmt.Println("Project " + projectName + " not found!")
	}

	return project
}

func GetEnvironment(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, EnvironmentName string) *octopusdeploy.Environment {
	client := octopusAuth(octopusURL, APIKey, space.ID)

	environments, err := client.Environments.GetByName(EnvironmentName)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(environments); i++ {
		if environments[i].Name == EnvironmentName {
			return environments[i]
		}
	}

	return nil
}
```
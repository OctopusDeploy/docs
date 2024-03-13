<details data-group="create-a-tenant-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
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

</details>
<details data-group="create-a-tenant-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
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

</details>
<details data-group="create-a-tenant-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
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

</details>
<details data-group="create-a-tenant-scripts">
<summary>Python3</summary>

```python
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

</details>
<details data-group="create-a-tenant-scripts">
<summary>Go</summary>

```go
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

func GetProject(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, projectName string) *octopusdeploy.Project {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	projectsQuery := octopusdeploy.ProjectsQuery {
		Name: projectName,
	}

	// Get specific project object
	projects, err := client.Projects.Get(projectsQuery)

	if err != nil {
		log.Println(err)
	}

	for _, project := range projects.Items {
		if project.Name == projectName {
			return project
		}
	}

	return nil
}

func GetEnvironment(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, environmentName string) *octopusdeploy.Environment {
	// Get client for space
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get environment
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
			return environment
		}
	}

	return nil
}
```

</details>
<details data-group="create-a-tenant-scripts">
<summary>Java</summary>

```java

import com.octopus.sdk.Repository;
import com.octopus.sdk.domain.Project;
import com.octopus.sdk.domain.Space;
import com.octopus.sdk.domain.Tenant;
import com.octopus.sdk.http.ConnectData;
import com.octopus.sdk.http.OctopusClient;
import com.octopus.sdk.http.OctopusClientFactory;
import com.octopus.sdk.model.tenant.TenantResource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

import com.google.common.collect.Lists;

public class CreateTenant {

  static final String octopusServerUrl = "http://localhost:8065";
  // as read from your profile in your Octopus Deploy server
  static final String apiKey = System.getenv("OCTOPUS_SERVER_API_KEY");

  public static void main(final String... args) throws IOException {
    final OctopusClient client = createClient();

    final List<String> environmentNames = Lists.newArrayList("Development", "Test");
    final List<String> projectNames = Lists.newArrayList("MyProject");
    final Set<String> tenantTags = Collections.singleton("TagSet/Tag");

    final Repository repo = new Repository(client);
    final Optional<Space> space = repo.spaces().getByName("TheSpaceName");

    if (!space.isPresent()) {
      System.out.println("No space named 'TheSpaceName' exists on server");
      return;
    }

    final Map<String, Set<String>> projIdToEnvIdsMap = new HashMap<>();
    for (final String projName : projectNames) {
      final Project project =
          space
              .get()
              .projects()
              .getByName(projName)
              .orElseThrow(() -> new IllegalArgumentException("No project called " + projName));

      final Set<String> envIds = new TreeSet<>();
      for (final String envName : environmentNames) {
        space
            .get()
            .environments()
            .getByName(envName)
            .ifPresent(env -> envIds.add(env.getProperties().getId()));
      }
      projIdToEnvIdsMap.put(project.getProperties().getId(), envIds);
    }

    final TenantResource newTenant = new TenantResource("newTenant");
    newTenant.setProjectEnvironments(projIdToEnvIdsMap);
    newTenant.tenantTags(tenantTags);
    final Tenant createdTenant = space.get().tenants().create(newTenant);
  }

  // Create an authenticated connection to your Octopus Deploy Server
  private static OctopusClient createClient() throws MalformedURLException {
    final Duration connectTimeout = Duration.ofSeconds(10L);
    final ConnectData connectData =
        new ConnectData(new URL(octopusServerUrl), apiKey, connectTimeout);
    final OctopusClient client = OctopusClientFactory.createClient(connectData);

    return client;
  }
}
```

</details>
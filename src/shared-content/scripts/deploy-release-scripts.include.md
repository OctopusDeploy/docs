<details data-group="deploy-release-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$headers = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default"
$projectName = "Your Project Name"
$releaseVersion = "0.0.1"
$environmentName = "Development"

# Get space id
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $headers -ErrorVariable octoError
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }
Write-Host "Using Space named $($space.Name) with id $($space.Id)"

# Get project by name
$projects = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100" -Headers $headers -ErrorVariable octoError
$project = $projects.Items | Where-Object { $_.Name -eq $projectName }
Write-Host "Using Project named $($project.Name) with id $($project.Id)"

# Get release by version
$releases = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/releases" -Headers $headers -ErrorVariable octoError
$release = $releases.Items | Where-Object { $_.Version -eq $releaseVersion }
Write-Host "Using Release version $($release.Version) with id $($release.Id)"

# Get environment by name
$environments = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments?partialName=$([uri]::EscapeDataString($environmentName))&skip=0&take=100" -Headers $headers -ErrorVariable octoError
$environment = $environments.Items | Where-Object { $_.Name -eq $environmentName }
Write-Host "Using Environment named $($environment.Name) with id $($environment.Id)"

# Create deployment
$deploymentBody = @{
    ReleaseId     = $release.Id
    EnvironmentId = $environment.Id
} | ConvertTo-Json

Write-Host "Creating deployment with these values: $deploymentBody"
$deployment = Invoke-RestMethod -Uri $octopusURL/api/$($space.Id)/deployments -Method POST -Headers $headers -Body $deploymentBody
```

</details>
<details data-group="deploy-release-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
Add-Type -Path 'path\to\Octopus.Client.dll'

$octopusURL = "https://youroctourl/"
$octopusAPIKey = "API-YOURAPIKEY"

$spaceName = "Default"
$projectName = "Your Project Name"
$releaseVersion = "0.0.1"
$environmentName = "Development"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

try {
    # Get space id
    $space = $repository.Spaces.FindByName($spaceName)
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific repository
    $repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

    # Get environment by name
    $environment = $repositoryForSpace.Environments.FindByName($environmentName)
    Write-Host "Using Environment named $($environment.Name) with id $($environment.Id)"

    # Get project by name
    $project = $repositoryForSpace.Projects.FindByName($projectName)
    Write-Host "Using Project named $($project.Name) with id $($project.Id)"

    # Get release by version
    $release = $repositoryForSpace.Projects.GetReleaseByVersion($project, $releaseVersion);
    Write-Host "Using release version $($release.Version) with id $($release.Id)"

    # Create deployment
    $deployment = New-Object Octopus.Client.Model.DeploymentResource -Property @{
        ReleaseId     = $release.Id
        EnvironmentId = $environment.Id
    }

    Write-Host "Creating deployment for release $($release.Version) of project $projectName to environment $environmentName"
    $deployment = $repositoryForSpace.Deployments.Create($deployment)
}
catch {
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="deploy-release-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;

string octopusURL = "https://YourURL";
string octopusAPIKey = "API-YourKey";
string spaceName = "Default";
string projectName = "ProjectName";
string releaseVersion = "0.0.1";
string environmentName = "Development";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get Environment
    var environment = repositoryForSpace.Environments.FindByName(environmentName);

    // Get project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get release
    var release = repositoryForSpace.Projects.GetReleaseByVersion(project, releaseVersion);

    // Create deployment
    var deployment = new Octopus.Client.Model.DeploymentResource
    {
        ReleaseId = release.Id,
        EnvironmentId = environment.Id
    };

    deployment = repositoryForSpace.Deployments.Create(deployment);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="deploy-release-scripts">
<summary>Python3</summary>

```python
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
project_name = 'Your Project Name'
release_version = "1.0.0"
environment_name = 'Development'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project = get_by_name('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']), project_name)
releases = get_octopus_resource('{0}/{1}/projects/{2}/releases'.format(octopus_server_uri, space['Id'], project['Id']))
release = next((x for x in releases['Items'] if x['Version'] == release_version), None)
environment = get_by_name('{0}/{1}/environments/all'.format(octopus_server_uri, space['Id']), environment_name)

deployment = {
    'ReleaseId': release['Id'],
    'EnvironmentId': environment['Id']
}

uri = '{0}/{1}/deployments'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=deployment)
response.raise_for_status()
```

</details>
<details data-group="deploy-release-scripts">
<summary>Go</summary>

```go
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

func main() {

	apiURL, err := url.Parse("https://your.octopus.app")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YOUR-KEY"
	spaceName := "Default"
	projectName := "MongoDB Demo"
	releaseVersion := "2021.04.21.0"
	environmentName := "Development"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project
	project := GetProject(apiURL, APIKey, space, projectName)

	// Get environment
	environment := GetEnvironment(apiURL, APIKey, space, environmentName)

	// Get project releases
	projectReleases := GetProjectReleases(apiURL, APIKey, space, project)

	// Loop through releases
	for i := 0; i < len(projectReleases); i++ {
		projectRelease := projectReleases[i].(map[string]interface{})

		// Delete release
		if projectRelease["Version"].(string) == releaseVersion {
			// Create deployment object
    		deployment := octopusdeploy.NewDeployment(environment.ID, projectRelease["Id"].(string))

    		// Issue deployment
			deployment, err = client.Deployments.Add(deployment)
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

func GetProjectReleases(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, project *octopusdeploy.Project) []interface{} {
	// Define api endpoint
	projectReleasesEndoint := octopusURL.String() + "/api/" + space.ID + "/projects/" + project.ID + "/releases"

	// Create http client
	httpClient := &http.Client{}
	skipAmount := 0

	// Make request
	request, _ := http.NewRequest("GET", projectReleasesEndoint, nil)
	request.Header.Set("X-Octopus-ApiKey", APIKey)
	response, err := httpClient.Do(request)

	if err != nil {
		log.Println(err)
	}

	// Get response
	responseData, err := ioutil.ReadAll(response.Body)
	var releasesJson interface{}
	err = json.Unmarshal(responseData, &releasesJson)

	// Map the returned data
	returnedReleases := releasesJson.(map[string]interface{})
	// Returns the list of items, translate it to a map
	returnedItems := returnedReleases["Items"].([]interface{})

	//make(map[string][]octopusdeploy.PropertyValue)

	for true {
		// check to see if there's more to get
		fltItemsPerPage := returnedReleases["ItemsPerPage"].(float64)
		itemsPerPage := int(fltItemsPerPage)

		if len(returnedReleases["Items"].([]interface{})) == itemsPerPage {
			// Increment skip amount
			skipAmount += len(returnedReleases["Items"].([]interface{}))

			// Make request
			queryString := request.URL.Query()
			queryString.Set("skip", strconv.Itoa(skipAmount))
			request.URL.RawQuery = queryString.Encode()
			response, err := httpClient.Do(request)

			if err != nil {
				log.Println(err)
			}

			responseData, err := ioutil.ReadAll(response.Body)
			var releasesJson interface{}
			err = json.Unmarshal(responseData, &releasesJson)

			returnedReleases = releasesJson.(map[string]interface{})
			returnedItems = append(returnedItems, returnedReleases["Items"].([]interface{})...)
		} else {
			break
		}
	}

	return returnedItems
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

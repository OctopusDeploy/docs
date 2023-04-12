```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$OctopusURL = "YOUR INSTANCE URL"
$SpaceName = "YOUR SPACE NAME" 
$APIKey = "API-YOURAPIKEY"
$projectName = "YOUR PROJECT NAME"
$releaseVersion = "YOUR RELEASE VERSION"
$environmentName = "YOUR ENVIRONMENT NAME"
$fileDownloadPath = "LOCATION TO PLACE DOWNLOADED ARTIFACT"
$fileNameForOctopus = "NAME FOR OCTOPUS" ## Must include file extension in name!

$header = @{ "X-Octopus-ApiKey" = $APIKey }

Write-Host "Getting the space information"
$spaceList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/spaces?skip=0&take=10&partialName=$([System.Web.HTTPUtility]::UrlEncode($spaceName))" -Headers $header
$space = $spaceList.Items | Where-Object {$_.Name -eq $spaceName}
$spaceId = $space.Id
Write-Host "The space-id for $spaceName is $spaceId"

Write-Host "Getting the environment information"
$environmentList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/environments?skip=0&take=10&partialName=$([System.Web.HTTPUtility]::UrlEncode($environmentName))" -Headers $header
$environment = $environmentList.Items | Where-Object {$_.Name -eq $environmentName}
$environmentId = $environment.Id
Write-Host "The id of $environmentName is $environmentId"

Write-Host "Getting the project information"
$projectList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/projects?skip=0&take=10&partialName=$([System.Web.HTTPUtility]::UrlEncode($projectName))" -Headers $header
$project = $projectList.Items | Where-Object {$_.Name -eq $projectName}
$projectId = $project.Id
Write-Host "The id of $projectName is $projectId"

Write-Host "Getting the release information"
$releaseList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/projects/$projectId/releases?skip=0&take=100&searchByVersion=$releaseVersion" -Headers $header
$release = $releaseList.Items | Where-Object {$_.Version -eq $releaseVersion}
$releaseId = $release.Id
Write-Host "The id of $releaseVersion is $releaseId"

Write-Host "Getting the deployment information"
$deploymentList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/releases/$releaseId/deployments?skip=0&take=1000" -Headers $header
$deploymentsToEnvironment = @($deploymentList.Items | Where-Object {$_.EnvironmentId -eq $environmentId})

$deploymentToUse = $deploymentsToEnvironment | Sort-Object {[DateTime]$_."Created"} | Select-Object -First 1 

$serverTaskId = $deploymentToUse.TaskId
Write-Host "The server task id of the most recent deployment to $environmentName for release $releaseVersion is $serverTaskId"

$artifactList = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/artifacts?regarding=$serverTaskId" -Headers $header
$artifact = $artifactList.Items | Where-Object {$_.Filename -eq $fileNameForOctopus}
$artifactId = $artifact.Id
Write-Host "Found $artifactId that matches expected file name $filenameForOctopus"

Write-Host "Getting file content"
Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/artifacts/$artifactId/content" -Headers $header -OutFile $fileDownloadPath
Write-Host "File content written to $fileDownloadPath"
```
```powershell PowerShell (Octopus.Client)
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$projectName = "MyProject"
$releaseVersion = "1.0.0"
$environmentName = "Development"
$downloadPath = "c:\temp"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Get project by name
$project = $repositoryForSpace.Projects.FindByName($projectName)
Write-Host "Using Project named $($project.Name) with id $($project.Id)"

# Get environment by name
$environment = $repositoryForSpace.Environments.FindByName($environmentName)

# Get the release
$release = $repositoryForSpace.Projects.GetReleaseByVersion($project, $releaseVersion)


# Get the artifacts
$artifacts = $repositoryForSpace.Releases.GetArtifacts($release)


# Loop through artifacts
foreach ($artifact in $artifacts.Items)
{
    # Get server task
    $serverTask = $repositoryForSpace.Tasks.Get($artifact.ServerTaskId)
    
    # Get deployment
    $deploymentId = $serverTask.Arguments["DeploymentId"]
    $deployment = $repositoryForSpace.Deployments.Get($deploymentId)

    # Check to see if the deployment was to the environment we're looking for
    if ($deployment.EnvironmentId -eq $environment.Id)
    {
        # Get the artifact content
        $ioStream = $repositoryForSpace.Artifacts.GetContent($artifact)

        $fileStream = New-Object System.IO.FileStream ("$downloadPath/$($artifact.Filename)", [System.IO.FileMode]::Create)
        $ioStream.CopyTo($fileStream)
        $fileStream.Close()

        break
    }
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
var spaceName = "Default";
var projectName = "MyProject";
var releaseVersion = "1.0.0";
var environmentName = "Development";
string downloadPath = @"c:\temp";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get space
var space = repository.Spaces.FindByName(spaceName);
var spaceRepository = client.ForSpace(space);

// Get project by name
var project = repository.Projects.FindByName(projectName);

// Get project release
var projectRelease = spaceRepository.Projects.GetReleaseByVersion(project, releaseVersion);

// Get the environment
var environment = spaceRepository.Environments.FindByName(environmentName);

// Get the release
var release = spaceRepository.Projects.GetReleaseByVersion(project, releaseVersion);

// Get the artifacts
var artifacts = spaceRepository.Releases.GetArtifacts(release);

// Loop through artifacts
foreach (var artifact in artifacts.Items)
{
    // Get the server task
    var serverTask = spaceRepository.Tasks.Get(artifact.ServerTaskId);

    // Get the deployment
    string deploymentId = serverTask.Arguments["DeploymentId"].ToString();
    var deployment = spaceRepository.Deployments.Get(deploymentId);

    // Check to see if the deployment was for the correct environment
    if (deployment.EnvironmentId == environment.Id)
    {
        // Get artifact content
        System.IO.Stream ioStream = spaceRepository.Artifacts.GetContent(artifact);
        System.IO.FileStream fileStream = new System.IO.FileStream(string.Format("{0}/{1}", downloadPath, artifact.Filename), System.IO.FileMode.Create);
        ioStream.CopyTo(fileStream);
        fileStream.Close();
        ioStream.Close();
    }
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

octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
project_name = "MyProject"
release_version = "1.0.0"
environment_name = "Development"
download_path = "c:\\temp"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get project
uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)
project = next((x for x in projects if x['Name'] == project_name), None)

# Get project releases
uri = '{0}/api/{1}/projects/{2}/releases'.format(octopus_server_uri, space['Id'], project['Id'])
releases = get_octopus_resource(uri, headers)
release = next((x for x in releases if x['Version'] == release_version), None)

# Get environment
uri = '{0}/api/{1}/environments'.format(octopus_server_uri, space['Id'])
environments = get_octopus_resource(uri, headers)
environment = next((x for x in environments if x['Name'] == environment_name), None)

# Get the deployments related to release
uri = '{0}/api/{1}/releases/{2}/deployments'.format(octopus_server_uri, space['Id'], release['Id'])
deployments = get_octopus_resource(uri, headers)
deployment = next((x for x in deployments if x['EnvironmentId'] == environment['Id']), None)

# Get the artifacts
uri = '{0}{1}'.format(octopus_server_uri, deployment["Links"]["Artifacts"])
artifacts = get_octopus_resource(uri, headers)

# Download the artifacts
for artifact in artifacts:
    uri = '{0}{1}'.format(octopus_server_uri, artifact['Links']['Content'])
    response = requests.get(uri, allow_redirects=True, headers=headers)
    response.raise_for_status()
    filePath = '{0}\\{1}'.format(download_path, artifact['Filename'])
    open(filePath, 'wb').write(response.content)
```
```go Go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	projectName := "MyProject"
	relaseVersion := "1.0.0"
	environmentName := "Development"
	downloadPath := "c:\\temp"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project
	project := GetProject(apiURL, APIKey, space, projectName)

	// Get the release
	release := GetProjectReleaseByVersion(client, project, relaseVersion)

	// Get the deployments for the release
	deployments, err := client.Deployments.GetDeployments(release)
	if err != nil {
		log.Println(err)
	}

	// Get environment
	environment := GetEnvironment(apiURL, APIKey, space, environmentName)

	// Get the deployment we're looking for
	for i := 0; i < len(deployments.Items); i++ {
		if deployments.Items[i].EnvironmentID == environment.ID {
			deployment := deployments.Items[i]
			artifacts := GetArtifacts(client, deployment.TaskID)
			DownloadArtifact(apiURL, APIKey, artifacts, downloadPath)

			break
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

func GetProjectReleaseByVersion(client *octopusdeploy.Client, project *octopusdeploy.Project, releaseVersion string) *octopusdeploy.Release {
	// Get releases for project
	releases, err := client.Projects.GetReleases(project)

	if err != nil {
		log.Println(err)
	}

	// Loop through releases
	for i := 0; i < len(releases); i++ {
		if releases[i].Version == releaseVersion {
			return releases[i]
		}
	}

	return nil
}

func GetArtifacts(client *octopusdeploy.Client, taskId string) *octopusdeploy.Artifacts {
	// Create artifacts query
	artifactsQuery := octopusdeploy.ArtifactsQuery{
		Regarding: taskId,
	}

	// Query for artifacts
	artifacts, err := client.Artifacts.Get(artifactsQuery)

	if err != nil {
		log.Println(err)
	}

	return artifacts
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

func DownloadArtifact(octopusURL *url.URL, APIKey string, artifacts *octopusdeploy.Artifacts, downloadPath string) {
	// Create http client
	httpClient := &http.Client{}

	// Loop through artifacts
	for i := 0; i < len(artifacts.Items); i++ {
		// Build url
		downloadUrl := octopusURL.String() + artifacts.Items[i].Links["Content"]

		// Get the download path
		filePath := downloadPath + "\\" + artifacts.Items[i].Filename

		// Get the data
		request, _ := http.NewRequest("GET", downloadUrl, nil)
		request.Header.Set("X-Octopus-ApiKey", APIKey)
		response, err := httpClient.Do(request)
		//response, err := http.Get(downloadUrl)
		if err != nil {
			log.Println(err)
		}
		defer response.Body.Close()

		// Create file
		out, err := os.Create(filePath)
		if err != nil {
			log.Println(err)
		}
		defer out.Close()

		// Write to file
		_, err = io.Copy(out, response.Body)
	}
}
```
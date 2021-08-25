```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";
# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$projectName = "My Project"
$runbookName = "My Runbook"
$environmentName = "Development"
$fileDownloadPath = "/path/to/download/artifact.txt"

# Note: Must include file extension in name.
$fileNameForOctopus = "artifact_filename_in_octopus.txt" 

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Get environment
$environments = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments?partialName=$([uri]::EscapeDataString($environmentName))&skip=0&take=100" -Headers $header 
$environment = $environments.Items | Where-Object { $_.Name -eq $environmentName }

# Get project
$projects = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100" -Headers $header 
$project = $projects.Items | Where-Object { $_.Name -eq $projectName }

# Get runbook
$runbooks = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbooks?partialName=$([uri]::EscapeDataString($runbookName))&skip=0&take=100" -Headers $header 
$runbook = $runbooks.Items | Where-Object { $_.Name -eq $runbookName }

# Get latest runbook run to that environment
$tasks = Invoke-RestMethod -Uri "$octopusURL/api/tasks?skip=0&runbook=$($runbook.Id)&project=$($project.Id)&spaces=$($space.Id)&environment=$($environment.Id)&includeSystem=false" -Headers $header 
$task = $tasks.Items | Where-Object {$_.State -eq "Success"} | Select-Object -First 1

$artifacts = Invoke-RestMethod -Method Get -Uri "$OctopusUrl/api/$spaceId/artifacts?regarding=$($task.Id)" -Headers $header
$artifact = $artifacts.Items | Where-Object {$_.Filename -eq $fileNameForOctopus}

Write-Host "Getting file content"
Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/artifacts/$($artifact.Id)/content" -Headers $header -OutFile $fileDownloadPath
Write-Host "File content written to $fileDownloadPath"
```
```powershell PowerShell (Octopus.Client)
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$projectName = "MyProject"
$runbookName = "MyRunbook"
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

# Get runbook
$runbook = $repositoryForSpace.Runbooks.FindByName($project, $runbookName)

# Get 
$runbookRuns = $repositoryForSpace.RunbookRuns.FindBy(@($project.Id), @($runbook.Id), @($environment.Id))

# Loop through runbook runs
foreach ($runbookRun in $runbookRuns.Items)
{
    # Get artifacts related to runbook run
    $artifacts = $repositoryForSpace.Artifacts.FindRegarding($runbookRun)
    
    # Loop through artifacts
    foreach ($artifact in $artifacts.Items)
    {
        # Get the artifact content
        $ioStream = $repositoryForSpace.Artifacts.GetContent($artifact)

        $fileStream = New-Object System.IO.FileStream ("$downloadPath/$($runbookRun.Id)-$($artifact.Filename)", [System.IO.FileMode]::Create)
        $ioStream.CopyTo($fileStream)
        $fileStream.Close()        
    }
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
var octopusURL = "https://your.octopus.app";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "Default";
string projectName = "My Project";
string runbookName = "My Runbook";
string environmentName = "Development";
string fileDownloadPath = @"/path/to/download/artifact.txt";

// Note: Must include file extension in name.
string filenameForOctopus = "artifact_filename_in_octopus.txt";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get environment
    var environment = repositoryForSpace.Environments.FindByName(environmentName);

    // Get project
    var project = repositoryForSpace.Projects.FindOne(n => n.Name == projectName);

    // Get runbook
    var runbook = repositoryForSpace.Runbooks.FindByName(project, runbookName);

    var task = repositoryForSpace.Tasks.FindOne(t => t.State == Octopus.Client.Model.TaskState.Success, pathParameters: new { skip = 0, project = project.Id, runbook = runbook.Id, environment = environment.Id, includeSystem = false });
    if (task == null)
    {
        Console.WriteLine("No matching runbook task found!");
        return;
    }

    var artifact = repository.Artifacts.FindOne(t => t.Filename == filenameForOctopus, pathParameters: new { regarding = task.Id });

    if (artifact == null)
    {
        Console.WriteLine("No matching artifact found!");
        return;
    }

    Console.WriteLine("Getting artifact file content");
    var artifactStream = repositoryForSpace.Artifacts.GetContent(artifact);
    using (var fileStream = File.Create(fileDownloadPath))
    {
        artifactStream.Seek(0, SeekOrigin.Begin);
        artifactStream.CopyTo(fileStream);
    }
    Console.WriteLine("File content written to: {0}", fileDownloadPath);
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

octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
project_name = "MyProject"
runbook_name = "MyRunbook"
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

# Get the runbook
uri = '{0}/api/{1}/projects/{2}/runbooks'.format(octopus_server_uri, space['Id'], project['Id'])
runbooks = get_octopus_resource(uri, headers)
runbook = next((x for x in runbooks if x['Name'] == runbook_name), None)

# Get environment
uri = '{0}/api/{1}/environments'.format(octopus_server_uri, space['Id'])
environments = get_octopus_resource(uri, headers)
environment = next((x for x in environments if x['Name'] == environment_name), None)

# Get the runbook runs
uri = '{0}/api/{1}/runbookruns?projects={2}&runbooks={3}&environments={4}'.format(octopus_server_uri, space['Id'], project['Id'], runbook['Id'], environment['Id'])
runbookRuns = get_octopus_resource(uri, headers)

# Loop through runs
for runbookRun in runbookRuns:
    uri = '{0}{1}'.format(octopus_server_uri, runbookRun['Links']['Artifacts'])
    artifacts = get_octopus_resource(uri, headers)
    
    # Loop through artifacts
    for artifact in artifacts:
        uri = '{0}{1}'.format(octopus_server_uri, artifact['Links']['Content'])
        response = requests.get(uri, allow_redirects=True, headers=headers)
        response.raise_for_status()
        filePath = '{0}\\{1}-{2}'.format(download_path, runbookRun['Id'], artifact['Filename'])
        open(filePath, 'wb').write(response.content)
```
```go Go
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
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
	runbookName := "MyRunbook"
	environmentName := "Development"
	downloadPath := "c:\\temp"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project
	project := GetProject(apiURL, APIKey, space, projectName)

	// Get the runbook
	runbook := GetRunbook(client, project, runbookName)

	// Get environment
	environment := GetEnvironment(client, environmentName)

	// Get runbook runs for project runbook and environment
	runbookRuns := GetRunbookRuns(apiURL, APIKey, space, project, runbook, environment)

	// Loop through the runbook runs
	for i := 0; i < len(runbookRuns); i++ {
		// Map teh runbook run object
		runbookRun := runbookRuns[i].(map[string]interface{})

		// Get the artifacts from the run
		artifacts := GetArtifacts(client, runbookRun["TaskId"].(string))

		// Download the artifact
		DownloadArtifact(apiURL, APIKey, artifacts, (downloadPath + "\\" + runbookRun["Id"].(string)))
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
		Name: projectName
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

func GetRunbook(client *octopusdeploy.Client, project *octopusdeploy.Project, runbookName string) *octopusdeploy.Runbook {
	// Get runbook
	runbooks, err := client.Runbooks.GetAll()

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(runbooks); i++ {
		if runbooks[i].ProjectID == project.ID && runbooks[i].Name == runbookName {
			return runbooks[i]
		}
	}

	return nil
}

func GetRunbookRuns(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, project *octopusdeploy.Project, runbook *octopusdeploy.Runbook, environment *octopusdeploy.Environment) []interface{} {
	// Build url
	runbookRunUrl := octopusURL.String() + "/api/" + space.ID + "/runbookruns"

	// Create http client
	httpClient := &http.Client{}

	// Create request object
	request, _ := http.NewRequest("GET", runbookRunUrl, nil)
	request.Header.Set("X-Octopus-ApiKey", APIKey)
	queryString := request.URL.Query()
	queryString.Set("projects", project.ID)
	queryString.Set("runbooks", runbook.ID)
	queryString.Set("environments", environment.ID)
	request.URL.RawQuery = queryString.Encode()

	response, err := httpClient.Do(request)

	if err != nil {
		log.Println(err)
	}

	// Get response
	responseData, err := ioutil.ReadAll(response.Body)
	var runbookRunsRaw interface{}
	err = json.Unmarshal(responseData, &runbookRunsRaw)

	// Map the returned data
	returnedRunbookRuns := runbookRunsRaw.(map[string]interface{})

	// Get the data
	runbookRuns := returnedRunbookRuns["Items"].([]interface{})

	return runbookRuns
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

func GetEnvironment(client *octopusdeploy.Client, EnvironmentName string) *octopusdeploy.Environment {
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

		// Create folder if necessary
		if _, err := os.Stat(downloadPath); os.IsNotExist(err) {
			err := os.Mkdir(downloadPath, os.ModeDir)
			if err != nil {
				log.Println(err)
			}
		}

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
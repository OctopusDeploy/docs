</details>
<details data-group="publish-runbook-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOUR-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"
$snapshotName = "Snapshot XXXXX"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Get runbook
$runbook = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbooks" -Headers $header).Items | Where-Object {$_.Name -eq $runbookName}

# Get the runbook process
$runbookSnapshot = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbookSnapshots" -Headers $header).Items | Where-Object {$_.Name -eq $snapshotName}

# Publish the snapshot
$runbook.PublishedRunbookSnapshotId = $runbookSnapshot.Id
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/runbooks/$($runbook.Id)" -Body ($runbook | ConvertTo-Json -Depth 10) -Headers $header
```

</details>
<details data-group="publish-runbook-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOUR-KEY"
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"
$snapshotName = "Snapshot XXXXX"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $project = $repositoryForSpace.Projects.FindByName($projectName)

    # Get runbook
    $runbook = $repositoryForSpace.Runbooks.FindByName($project, $runbookName)
    
    # Get the runbook snapshot
    $runbookSnapshot = $repositoryForSpace.RunbookSnapshots.FindOne({param($r) $r.Name -eq $snapshotName -and $r.ProjectId -eq $project.Id})

    # Publish snapshot
    $runbook.PublishedRunbookSnapshotId = $runbookSnapshot.Id
    $repositoryForSpace.Runbooks.Modify($runbook)
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="publish-runbook-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working variables
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-APIKEY";
string spaceName = "default";
string projectName = "MyProject";
string runbookName = "MyRunbook";
string snapshotName = "Snapshot XXXXX";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
	// Get space
	var space = repository.Spaces.FindByName(spaceName);
	var repositoryForSpace = client.ForSpace(space);

	// Get project
	var project = repositoryForSpace.Projects.FindByName(projectName);

	// Get runbook
	var runbook = repositoryForSpace.Runbooks.FindByName(project, runbookName);

	// Get runbook snapshot
	var runbookSnapshot = repositoryForSpace.RunbookSnapshots.FindOne(rs => rs.ProjectId == project.Id && rs.Name == snapshotName);

	// Publish the snapshot
	runbook.PublishedRunbookSnapshotId = runbookSnapshot.Id;
	repositoryForSpace.Runbooks.Modify(runbook);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="publish-runbook-scripts">
<summary>Python3</summary>

```python
import json
import requests

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOUR-KEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()
    return json.loads(response.content.decode('utf-8'))

def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)

def get_item_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources['Items'] if x['Name'] == name), None)

space_name = 'Default'
project_name = 'Your project'
runbook_name = 'Your runbook'
snapshot_name = 'Snapshot XXXXX'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project = get_by_name('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']), project_name)
runbook = get_item_by_name('{0}/{1}/projects/{2}/runbooks'.format(octopus_server_uri, space['Id'], project['Id']), runbook_name)
snapshot = get_item_by_name('{0}/{1}/projects/{2}/runbookSnapshots/'.format(octopus_server_uri, space['Id'], project['Id']), snapshot_name)

runbook['PublishedRunbookSnapshotId'] = snapshot['Id']

uri = '{0}/{1}/runbooks/{2}'.format(octopus_server_uri, space['Id'], runbook['Id'])
response = requests.put(uri, headers=headers, json=runbook)
response.raise_for_status()
```

</details>
<details data-group="publish-runbook-scripts">
<summary>Go</summary>

```go
package main

import (
	"encoding/json"
	"log"
	"net/url"

	"net/http"

	"io/ioutil"

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
	snapshotName := "Snapshot XXXXX"

	// Get the space object
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get client for space
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project
	project := GetProject(apiURL, APIKey, space, projectName)

	// Get runbook
	runbook := GetRunbook(client, project, runbookName)

	// Get runbook snapshot
	runbookSnapshotId := GetRunbookSnapshot(apiURL, APIKey, space, runbook, snapshotName)

	// Update the runbook
	runbook.PublishedRunbookSnapshotID = runbookSnapshotId
	client.Runbooks.Update(runbook)
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

func GetRunbookSnapshot(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, runbook *octopusdeploy.Runbook, snapshotName string) string {
	snapshotApi := octopusURL.String() + "/api/" + space.ID + "/runbooks/" + runbook.ID + "/runbooksnapshots"

	// Create http client
	httpClient := &http.Client{}

	// Make post request
	request, err := http.NewRequest("GET", snapshotApi, nil)
	request.Header.Set("X-Octopus-ApiKey", APIKey)
	request.Header.Set("Content-Type", "application/json")

	// Execute post and get response
	response, err := httpClient.Do(request)

	responseData, err := ioutil.ReadAll(response.Body)

	var f interface{}
	jsonErr := json.Unmarshal(responseData, &f)
	if jsonErr != nil {
		log.Println(err)
	}

	runbookSnapshotMap := f.(map[string]interface{})

	runbookSnapshotItems := runbookSnapshotMap["Items"].([]interface{})

	for _, snapshot := range runbookSnapshotItems {
		entry := snapshot.(map[string]interface{})
		if entry["Name"].(string) == snapshotName {
			return entry["Id"].(string)
		}
	}

	return ""
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
```

</details>
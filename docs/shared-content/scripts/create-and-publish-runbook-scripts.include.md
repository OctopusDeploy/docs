```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$projectName = "MyProject"
$runbookName = "MyRunbook"

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Get project
$projects = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100" -Headers $header 
$project = $projects.Items | Where-Object { $_.Name -eq $projectName }

# Get runbook
$runbooks = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbooks?partialName=$([uri]::EscapeDataString($runbookName))&skip=0&take=100" -Headers $header 
$runbook = $runbooks.Items | Where-Object { $_.Name -eq $runbookName }

# Get a runbook snapshot template
$runbookSnapshotTemplate = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/runbookProcesses/$($runbook.RunbookProcessId)/runbookSnapshotTemplate" -Headers $header 

# Create a runbook snapshot
$body = @{
    ProjectId = $project.Id
    RunbookId = $runbook.Id
    Name = $runbookSnapshotTemplate.NextNameIncrement
    Notes = $null
    SelectedPackages = @()
}

# Include latest built-in feed packages
foreach($package in $runbookSnapshotTemplate.Packages)
{
    if($package.FeedId -eq "feeds-builtin") {
        # Get latest package version
        $packages = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/feeds/feeds-builtin/packages/versions?packageId=$($package.PackageId)&take=1" -Headers $header 
        $latestPackage = $packages.Items | Select-Object -First 1
        $package = @{
            ActionName = $package.ActionName
            Version = $latestPackage.Version
            PackageReferenceName = $package.PackageReferenceName
        }
        
        $body.SelectedPackages += $package
    }
}

$body = $body | ConvertTo-Json -Depth 10
$runbookPublishedSnapshot = Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/runbookSnapshots?publish=true" -Body $body -Headers $header 

# Re-get runbook
$runbook = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/runbooks/$($runbook.Id)" -Headers $header 

# Publish the snapshot
$runbook.PublishedRunbookSnapshotId = $runbookPublishedSnapshot.Id
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/runbooks/$($runbook.Id)" -Body ($runbook | ConvertTo-Json -Depth 10) -Headers $header

Write-Host "Published runbook snapshot: $($runbookPublishedSnapshot.Id) ($($runbookPublishedSnapshot.Name))"
```
```powershell PowerShell (Octopus.Client)
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKeyu"
$spaceName = "Default"
$projectName = "MyProject"
$runbook = "MyRunbook"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Get project
$project = $repositoryForSpace.Projects.FindByName($projectName)

# Get runbook
$runbook = $repositoryForSpace.Runbooks.FindByName($project, $runbook)

# Get runbook snapshot template
$runbookSnapshotTemplate = $repositoryForSpace.Runbooks.GetRunbookSnapshotTemplate($runbook)

# Create a runbook snapshot
$runbookSnapshot = New-Object Octopus.Client.Model.RunbookSnapshotResource
$runbookSnapshot.ProjectId = $project.Id
$runbookSnapshot.RunbookId = $runbook.Id
$runbookSnapshot.Name = $runbookSnapshotTemplate.NextNameIncrement
$runbookSnapshot.SpaceId = $space.Id

# Add packages
foreach ($package in $runbookSnapshotTemplate.Packages)
{
    # Get the feed
    $feed = $repositoryForSpace.Feeds.Get($package.FeedId)
    $latestPackage = [Linq.Enumerable]::FirstOrDefault($repositoryForSpace.Feeds.GetVersions($feed, @($package.Id)))

    # Create selected package object
    $selectedPackage = New-Object Octopus.Client.Model.SelectedPackage -Property @{
        ActionName = $package.ActionName
        Version = $latestPackage.Version
        PackageReferenceName = $package.PackageReferenceName
    }

    # Add to selected packages
    $runbookSnapshot.SelectedPackages.Add($selectedPackage)
}

#Publish snapshot
$runbookSnapshot = $repositoryForSpace.RunbookSnapshots.Create($runbookSnapshot)
$runbook.PublishedRunbookSnapshotId = $runbookSnapshot.Id
$repositoryForSpace.Runbooks.Modify($runbook)
```
```csharp C#
#r "path\to\Octopus.Client.dll"
using Octopus.Client;
using Octopus.Client.Model;
using System;
using System.Linq;

// If using .net Core, be sure to add the NuGet package of System.Security.Permissions

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
var spaceName = "Default";
var projectName = "MyProject";
var runbookName = "MyRunbook";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get space
var space = repository.Spaces.FindByName(spaceName);
var spaceRepository = client.ForSpace(space);

// Get project
var project = spaceRepository.Projects.FindByName(projectName);

// Get runbook
var runbook = spaceRepository.Runbooks.FindByName(project, runbookName);

// Get runbook snapshot tempalte
var runbookSnapshotTemplate = spaceRepository.Runbooks.GetRunbookSnapshotTemplate(runbook);

// Create runbook snapshot
var runbookSnapshot = new Octopus.Client.Model.RunbookSnapshotResource(project.Id);
runbookSnapshot.RunbookId = runbook.Id;
runbookSnapshot.Name = runbookSnapshotTemplate.NextNameIncrement;
runbookSnapshot.SpaceId = space.Id;

// Add any referenced packages
foreach (var package in runbookSnapshotTemplate.Packages)
{
    // Get the feed
    var feed = spaceRepository.Feeds.Get(package.FeedId);
    var latestPackage = spaceRepository.Feeds.GetVersions(feed, (new string[] { package.PackageId }));

    // Create new selected package object
    var selectedPackage = new Octopus.Client.Model.SelectedPackage(package.ActionName, package.PackageReferenceName, latestPackage[0].Version);

    // Add to runbook snapshot
    runbookSnapshot.SelectedPackages.Add(selectedPackage);
}

// Publish snapshot
runbookSnapshot = spaceRepository.RunbookSnapshots.Create(runbookSnapshot);
runbook.PublishedRunbookSnapshotId = runbookSnapshot.Id;
spaceRepository.Runbooks.Modify(runbook); 
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
project_name = 'MyProject'
runbook_name = 'MyRunbook'

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get project
uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)
project = next((x for x in projects if x['Name'] == project_name), None)

# Get project runbooks
uri = '{0}/api/{1}/projects/{2}/runbooks'.format(octopus_server_uri, space['Id'], project['Id'])
runbooks = get_octopus_resource(uri, headers)
runbook = next((x for x in runbooks if x['Name'] == runbook_name), None)

# Get runbook snapshot template
uri = '{0}/api/{1}/runbookprocesses/{2}/runbooksnapshottemplate'.format(octopus_server_uri, space['Id'], runbook['RunbookProcessId'])
runbook_snapshot_template = get_octopus_resource(uri, headers)

# Create runbook snapshot
runbookSnapshotJson = {
    'ProjectId': project['Id'],
    'RunbookId': runbook['Id'],
    'Name': runbook_snapshot_template['NextNameIncrement'],
    'SelectedPackages': []
}

# Include any referenced packages
for package in runbook_snapshot_template['Packages']:
    uri = '{0}/api/{1}/feeds/{2}/packages/versions?packageId={3}'.format(octopus_server_uri, space['Id'], package['FeedId'], package['PackageId'])
    packages = get_octopus_resource(uri, headers)
    latestPackage = packages[0] # get the latest one
    selectedPackage = {
        'ActionName': package['ActionName'],
        'Version': latestPackage['Version'],
        'PackageReferenceName': package['PackageReferenceName']
    }

    runbookSnapshotJson['SelectedPackages'].append(selectedPackage)

# Create snapshot
uri = '{0}/api/{1}/runbooksnapshots'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=runbookSnapshotJson)
response.raise_for_status()

# Get results of API call
runbookSnapshot = json.loads(response.content.decode('utf-8'))

# Update the runbook object
runbook['PublishedRunbookSnapshotId'] = runbookSnapshot['Id']
uri = '{0}/api/{1}/runbooks/{2}'.format(octopus_server_uri, space['Id'], runbook['Id'])
response = requests.put(uri, headers=headers, json=runbook)
response.raise_for_status()
```
```go Go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"

	"net/http"
	"net/url"

	"io/ioutil"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

type runbooksnapshot struct {
	ProjectID        string
	RunbookID        string
	Name             string
	Notes            string
	SelectedPackages []octopusdeploy.SelectedPackage
}

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPI"
	spaceName := "Default"
	projectName := "MyProject"
	runbookName := "MyRunbook"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project
	project := GetProject(client, projectName)

	// Get runbook
	runbook := GetRunbook(client, project, runbookName)

	// Get runbook snapshot template
	runbookSnapshotTemplate := GetRunbookSnapshotTemplate(apiURL, APIKey, space, runbook)

	// Create runbook snapshot object
	runbookSnapshot := runbooksnapshot{
		ProjectID: project.ID,
		RunbookID: runbook.ID,
		Name:      runbookSnapshotTemplate["NextNameIncrement"].(string),
	}

	runbookPackages := runbookSnapshotTemplate["Packages"].([]interface{})

	for i := 0; i < len(runbookPackages); i++ {
		runbookPackage := runbookPackages[i].(map[string]interface{})
		version := GetPackageVersion(apiURL, APIKey, space, runbookPackage["FeedId"].(string), runbookPackage["PackageId"].(string))
		selectedPackage := octopusdeploy.SelectedPackage{
			ActionName:           runbookPackage["ActionName"].(string),
			Version:              version,
			PackageReferenceName: runbookPackage["PackageReferenceName"].(string),
		}

		runbookSnapshot.SelectedPackages = append(runbookSnapshot.SelectedPackages, selectedPackage)
	}

	// Create new snapshop
	runbookSnapshotId := CreateRunbookSnapshot(apiURL, APIKey, space, runbookSnapshot)

	// Publish snapshot
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

	// Get specific space object
	space, err := client.Spaces.GetByName(spaceName)

	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("Retrieved space " + space.Name)
	}

	return space
}

func GetProject(client *octopusdeploy.Client, projectName string) *octopusdeploy.Project {
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

func GetRunbookSnapshotTemplate(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, runbook *octopusdeploy.Runbook) map[string]interface{} {
	// Query api for tasks
	templateApi := octopusURL.String() + "/api/" + space.ID + "/runbookprocesses/" + runbook.RunbookProcessID + "/runbooksnapshottemplate"

	// Create http client
	httpClient := &http.Client{}

	// perform request
	request, _ := http.NewRequest("GET", templateApi, nil)
	request.Header.Set("X-Octopus-ApiKey", APIKey)
	response, err := httpClient.Do(request)

	if err != nil {
		log.Println(err)
	}

	responseData, err := ioutil.ReadAll(response.Body)

	var f interface{}
	jsonErr := json.Unmarshal(responseData, &f)
	if jsonErr != nil {
		log.Println(err)
	}

	template := f.(map[string]interface{})

	// return the template
	return template
}

func GetPackageVersion(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, feedId string, packageId string) string {
	packageApi := octopusURL.String() + "/api/" + space.ID + "/feeds/" + feedId + "/packages/versions?packageId=" + packageId

	// Create http client
	httpClient := &http.Client{}

	// perform request
	request, _ := http.NewRequest("GET", packageApi, nil)
	request.Header.Set("X-Octopus-ApiKey", APIKey)
	response, err := httpClient.Do(request)

	if err != nil {
		log.Println(err)
	}

	responseData, err := ioutil.ReadAll(response.Body)

	var f interface{}
	jsonErr := json.Unmarshal(responseData, &f)
	if jsonErr != nil {
		log.Println(err)
	}

	// Map the returned data
	packageItems := f.(map[string]interface{})

	// Returns the list of items, translate it to a map
	returnedItems := packageItems["Items"].([]interface{})

	// We only need the most recent version
	mostRecentPackageVersion := returnedItems[0].(map[string]interface{})

	return mostRecentPackageVersion["Version"].(string)
}

func CreateRunbookSnapshot(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, snapshot runbooksnapshot) string {
	snapshotApi := octopusURL.String() + "/api/" + space.ID + "/runbooksnapshots"

	// Create http client
	httpClient := &http.Client{}

	// Marshall the snapshot object
	snapshotJson, err := json.Marshal(snapshot)

	if err != nil {
		log.Println(err)
	}

	// Make post request
	request, err := http.NewRequest("POST", snapshotApi, bytes.NewBuffer(snapshotJson))
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

	runbookMap := f.(map[string]interface{})

	return runbookMap["Id"].(string)
}
```
```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$projectName = "MyProject"
$releaseVersion = "1.0.0.0"
$channelName = "Default"
$spaceName = "default"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Get channel
$channel = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/channels" -Headers $header).Items | Where-Object {$_.Name -eq $channelName}

# Create release payload
$releaseBody = @{
    ChannelId        = $channel.Id
    ProjectId        = $project.Id
    Version          = $releaseVersion
    SelectedPackages = @()
}

# Get deployment process template
$template = Invoke-RestMethod -Uri "$octopusURL/api/$($space.id)/deploymentprocesses/deploymentprocess-$($project.id)/template?channel=$($channel.Id)" -Headers $header

# Loop through the deployment process packages and add to release payload
$template.Packages | ForEach-Object {
    $uri = "$octopusURL/api/$($space.id)/feeds/$($_.FeedId)/packages/versions?packageId=$($_.PackageId)&take=1"
    $version = Invoke-RestMethod -Uri $uri -Method GET -Headers $header
    $version = $version.Items[0].Version

    $releaseBody.SelectedPackages += @{
        ActionName           = $_.ActionName
        PackageReferenceName = $_.PackageReferenceName
        Version              = $version
    }
}

# Create the release
$release = Invoke-RestMethod -Uri "$octopusURL/api/$($space.id)/releases" -Method POST -Headers $header -Body ($releaseBody | ConvertTo-Json -depth 10)

# Display created release
$release
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$channelName = "default"
$releaseVersion = "1.0.0.0"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space+repo
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $project = $repositoryForSpace.Projects.FindByName($projectName)

    # Get channel
    $channel = $repositoryForSpace.Channels.FindOne({param($c) $c.Name -eq $channelName -and $c.ProjectId -eq $project.Id})

    # Create a new release resource
    $release = New-Object Octopus.Client.Model.ReleaseResource
    $release.ChannelId = $channel.Id
    $release.ProjectId = $project.Id
    $release.Version = $releaseVersion
    $release.SelectedPackages = New-Object 'System.Collections.Generic.List[Octopus.Client.Model.SelectedPackage]'

    # Get deployment process
    $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

    # Get template
    $template = $repositoryForSpace.DeploymentProcesses.GetTemplate($deploymentProcess, $channel)

    # Loop through the deployment process packages and add to release payload
    $template.Packages | ForEach-Object {
        # Get feed 
        $feed = $repositoryForSpace.Feeds.Get($package.FeedId)
        $packageIds = @($package.PackageId)
        $version = ($repositoryForSpace.Feeds.GetVersions($feed,$packageIds) | Select-Object -First 1).Version
        $selectedPackage = New-Object Octopus.Client.Model.SelectedPackage
        $selectedPackage.ActionName = $_.ActionName
        $selectedPackage.PackageReferenceName = $_.PackageReferenceName
        $selectedPackage.Version = $version

        # Add to release
        $release.SelectedPackages.Add($selectedPackage)
    }

    # Create the release
    $releaseCreated = $repositoryForSpace.Releases.Create($release, $false)

    # Display created release
    $releaseCreated
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
var octopusAPIKey = "API-APIKEY";
var spaceName = "default";
string projectName = "MyProject";
string channelName = "Default";
string releaseVersion = "1.0.0.3";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space+repo
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get channel
    var channel = repositoryForSpace.Channels.FindOne(r => r.ProjectId == project.Id && r.Name == channelName);

    // Create release object
    Octopus.Client.Model.ReleaseResource release = new ReleaseResource();
    release.ChannelId = channel.Id;
    release.ProjectId = project.Id;
    release.Version = releaseVersion;
    release.SelectedPackages = new List<Octopus.Client.Model.SelectedPackage>();

    // Get deployment process
    var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);

    // Get template
    var template = repositoryForSpace.DeploymentProcesses.GetTemplate(deploymentProcess, channel);

    // Loop through the deployment process packages and add to release payload
    foreach (var package in template.Packages)
    {
        // Get feed
        var feed = repositoryForSpace.Feeds.Get(package.FeedId);
        var packageVersion = repositoryForSpace.Feeds.GetVersions(feed, new[] { package.PackageId }).First().Version;

        // Create selected package object
        Octopus.Client.Model.SelectedPackage selectedPackage = new SelectedPackage();
        selectedPackage.ActionName = package.ActionName;
        selectedPackage.PackageReferenceName = package.PackageReferenceName;
        selectedPackage.Version = packageVersion;

        // Add to release
        release.SelectedPackages.Add(selectedPackage);
    }

    // Create release
    var releaseCreated = repositoryForSpace.Releases.Create(release, false);
    Console.WriteLine("Created release with version: {0}", releaseCreated.Version);
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
project_name = 'MyProject'
environment_name = 'Development'
channel_name = 'Default'
release_version = '1.0.0.0'

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get project
uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)
project = next((x for x in projects if x['Name'] == project_name), None)

# Get channel
uri = '{0}/api/{1}/projects/{2}/channels'.format(octopus_server_uri, space['Id'], project['Id'])
channels = get_octopus_resource(uri, headers)
channel = next((x for x in channels if x['Name'] == channel_name), None)

# Get environment
uri = '{0}/api/{1}/environments'.format(octopus_server_uri, space['Id'])
environments = get_octopus_resource(uri, headers)
environment = next((x for x in environments if x['Name'] == environment_name), None)

# Get project template
uri = '{0}/api/{1}/deploymentprocesses/deploymentprocess-{2}/template?channel={3}'.format(octopus_server_uri, space['Id'], project['Id'], channel['Id'])
template = get_octopus_resource(uri, headers)

# Create release JSON
releaseJson = {
    'ChannelId': channel['Id'],
    'ProjectId': project['Id'],
    'Version': release_version,
    'SelectedPackages': []
}

# Select packages for process
for package in template['Packages']:
    uri = '{0}/api/{1}/feeds/{2}/packages/versions?packageId={3}&take=1'.format(octopus_server_uri, space['Id'], package['FeedId'], package['PackageId'])
    selectedPackage = get_octopus_resource(uri, headers)[0] # Only one result is returned so using index 0
    selectedPackageJson = {
        'ActionName': package['ActionName'],
        'PackageReferenceName': package['PackageReferenceName'],
        'Version': selectedPackage['Version']
    }
    releaseJson['SelectedPackages'].append(selectedPackageJson)

# Create release
uri = '{0}/api/{1}/releases'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=releaseJson)
response.raise_for_status()

# Get results of API call
release = json.loads(response.content.decode('utf-8'))
```
```go Go
package main

import (
	"encoding/json"
	"fmt"
	"log"

	"net/http"
	"net/url"

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
	channelName := "Default"
	environmentName := "Development"
	projectName := "MyProject"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project
	project := GetProject(apiURL, APIKey, space, projectName)

	// Get channel
	channel := GetChannel(client, project, channelName)

	// Get template
	template := GetDeploymentProcessTemplate(apiURL, APIKey, space, project, channel)

	// Get environment
	environment := GetEnvironment(apiURL, APIKey, space, environmentName)

    releaseVersion := ""

	// Check to see if the nexversionincrement property is nil
	if nil == template["NextVersionIncrement"] {
		// Project uses a package instead of a template, get the latest version of the package
		deploymentProcess, err := client.DeploymentProcesses.GetByID(project.DeploymentProcessID)

		if err != nil {
			log.Println(err)
		}

		versionNumberFound := false

		for i := 0; i < len(deploymentProcess.Steps); i++ {
			if deploymentProcess.Steps[i].Name == template["VersioningPackageStepName"].(string) {
				for j := 0; j < len(deploymentProcess.Steps[i].Actions); j++ {
					releasePackage := deploymentProcess.Steps[i].Actions[j].Packages[0]
					releaseVersion = GetPackageVersion(apiURL, APIKey, space, releasePackage.FeedID, releasePackage.PackageID)
					versionNumberFound = true
					break
				}
			}
			if versionNumberFound {
				break
			}
		}

	} else {
		releaseVersion = template["NextVersionIncrement"].(string)
	}

	// Create new release object
	release := octopusdeploy.NewRelease(channel.ID, project.ID, releaseVersion)

	// Get packages for release
	packages := template["Packages"].([]interface{})
	for i := 0; i < len(packages); i++ {
		// Get selected package map
		packageMap := packages[i].(map[string]interface{})

		version := GetPackageVersion(apiURL, APIKey, space, packageMap["FeedId"].(string), packageMap["PackageId"].(string))

		// create selected package object
		selectedPackage := octopusdeploy.SelectedPackage{
			ActionName:           packageMap["ActionName"].(string),
			PackageReferenceName: packageMap["PackageReferenceName"].(string),
			Version:              version,
		}

		// add selected package
		release.SelectedPackages = append(release.SelectedPackages, &selectedPackage)
	}

	// Create release
	release, err = client.Releases.Add(release)

	if err != nil {
		log.Println(err)
	}

	fmt.Println("Created release version: " + release.Version)
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

func GetChannel(client *octopusdeploy.Client, project *octopusdeploy.Project, ChannelName string) *octopusdeploy.Channel {
	channelQuery := octopusdeploy.ChannelsQuery{
		PartialName: ChannelName,
		Skip:        0,
	}

	results := []*octopusdeploy.Channel{}

	for true {
		// Call for results
		channels, err := client.Channels.Get(channelQuery)

		if err != nil {
			log.Println(err)
		}

		// Check returned number of items
		if len(channels.Items) == 0 {
			break
		}

		// append items to results
		results = append(results, channels.Items...)

		// Update query
		channelQuery.Skip += len(channels.Items)
	}

	for i := 0; i < len(results); i++ {
		if results[i].ProjectID == project.ID && results[i].Name == ChannelName {
			return results[i]
		}
	}

	return nil
}

func GetDeploymentProcessTemplate(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, project *octopusdeploy.Project, channel *octopusdeploy.Channel) map[string]interface{} {
	// Query api for tasks
	templateApi := octopusURL.String() + "/api/" + space.ID + "/deploymentprocesses/deploymentprocess-" + project.ID + "/template?channel=" + channel.ID

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
```
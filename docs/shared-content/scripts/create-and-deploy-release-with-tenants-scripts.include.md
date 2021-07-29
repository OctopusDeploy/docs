```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusBaseURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$headers = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default"
$projectName = "Your Project Name"
$environmentName = "Dev"
$channelName = "Default"
$tenantNames = @("Customer A Name", "Customer B Name")


# Get space id
$spaces = Invoke-WebRequest -Uri "$octopusBaseURL/spaces/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
$space = $spaces | Where-Object { $_.Name -eq $spaceName }
Write-Host "Using Space named $($space.Name) with id $($space.Id)"

# Create space specific url
$octopusSpaceUrl = "$octopusBaseURL/$($space.Id)"

# Get project by name
$projects = Invoke-WebRequest -Uri "$octopusSpaceUrl/projects/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
$project = $projects | Where-Object { $_.Name -eq $projectName }
Write-Host "Using Project named $($project.Name) with id $($project.Id)"

# Get channel by name
$channels = Invoke-WebRequest -Uri "$octopusSpaceUrl/projects/$($project.Id)/channels" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
$channel = $channels | Where-Object { $_.Name -eq $channelName }
Write-Host "Using Channel named $($channel.Name) with id $($channel.Id)"

# Get environment by name
$environments = Invoke-WebRequest -Uri "$octopusSpaceUrl/environments/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
$environment = $environments | Where-Object { $_.Name -eq $environmentName }
Write-Host "Using Environment named $($environment.Name) with id $($environment.Id)"

# Get the deployment process template
Write-Host "Fetching deployment process template"
$template = Invoke-WebRequest -Uri "$octopusSpaceUrl/deploymentprocesses/deploymentprocess-$($project.id)/template?channel=$($channel.Id)" -Headers $headers | ConvertFrom-Json

# Create the release body
$releaseBody = @{
    ChannelId        = $channel.Id
    ProjectId        = $project.Id
    Version          = $template.NextVersionIncrement
    SelectedPackages = @()
}

# Set the package version to the latest for each package
# If you have channel rules that dictate what versions can be used, you'll need to account for that
Write-Host "Getting step package versions"
$template.Packages | ForEach-Object {
    $uri = "$octopusSpaceUrl/feeds/$($_.FeedId)/packages/versions?packageId=$($_.PackageId)&take=1"
    $version = Invoke-WebRequest -Uri $uri -Method GET -Headers $headers -Body $releaseBody -ErrorVariable octoError | ConvertFrom-Json
    $version = $version.Items[0].Version

    $releaseBody.SelectedPackages += @{
        ActionName           = $_.ActionName
        PackageReferenceName = $_.PackageReferenceName
        Version              = $version
    }
}

# Create release
$releaseBody = $releaseBody | ConvertTo-Json
Write-Host "Creating release with these values: $releaseBody"
$release = Invoke-WebRequest -Uri $octopusSpaceUrl/releases -Method POST -Headers $headers -Body $releaseBody -ErrorVariable octoError | ConvertFrom-Json

# Create deployment for each tenant
$tenants = Invoke-WebRequest -Uri "$octopusSpaceUrl/tenants/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json

$tenantNames | ForEach-Object {
    $name = $_
    $tenant = $tenants | Where-Object { $_.Name -eq $name }

    $deploymentBody = @{
        ReleaseId     = $release.Id
        EnvironmentId = $environment.Id
        TenantId      = $tenant.Id
    } | ConvertTo-Json

    Write-Host "Creating deployment with these values: $deploymentBody"
    $deployment = Invoke-WebRequest -Uri $octopusSpaceUrl/deployments -Method POST -Headers $headers -Body $deploymentBody -ErrorVariable octoError
}
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path 'path\to\Octopus.Client.dll'

$octopusBaseURL = "https://youroctourl/"
$octopusAPIKey = "API-YOURAPIKEY"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusBaseURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

$spaceName = "Default"
$projectName = "Your Project Name"
$channelName = "Default"
$environmentName = "Dev"
$tenantNames = @("Customer A Name", "Customer B Name")

try {
    # Get space id
    $space = $repository.Spaces.FindByName($spaceName)
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific repository
    $repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

    # Get project by name
    $project = $repositoryForSpace.Projects.FindByName($projectName)
    Write-Host "Using Project named $($project.Name) with id $($project.Id)"

    # Get channel by name
    $channel = $repositoryForSpace.Channels.FindByName($project, $channelName)
    Write-Host "Using Channel named $($channel.Name) with id $($channel.Id)"

    # Get environment by name
    $environment = $repositoryForSpace.Environments.FindByName($environmentName)
    Write-Host "Using Environment named $($environment.Name) with id $($environment.Id)"

    # Get the deployment process template
    Write-Host "Fetching deployment process template"
    $process = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)
    $template = $repositoryForSpace.DeploymentProcesses.GetTemplate($process, $channel)

    Write-Host "Creating release for $projectName"
    $release = New-Object Octopus.Client.Model.ReleaseResource -Property @{
        ChannelId = $channel.Id
        ProjectId = $project.Id
        Version   = $template.NextVersionIncrement
    }

    # Set the package version to the latest for each package
    # If you have channel rules that dictate what versions can be used,
    #  you'll need to account for that by overriding the package version
    Write-Host "Getting action package versions"
    $template.Packages | ForEach-Object {
        $feed = $repositoryForSpace.Feeds.Get($_.FeedId)
        $latestPackage = [Linq.Enumerable]::FirstOrDefault($repositoryForSpace.Feeds.GetVersions($feed, @($_.PackageId)))

        $selectedPackage = New-Object Octopus.Client.Model.SelectedPackage -Property @{
            ActionName = $_.ActionName
            Version    = $latestPackage.Version
        }

        Write-Host "Using version $($latestPackage.Version) for action $($_.ActionName) package $($_.PackageId)"

        $release.SelectedPackages.Add($selectedPackage)
    }

    # Create release
    $release = $repositoryForSpace.Releases.Create($release, $false) # pass in $true if you want to ignore channel rules

    # Create deployment for each tenant
    $tenants = $repositoryForSpace.Tenants.FindByNames([Collections.Generic.List[String]]$tenantNames)

    $tenants | ForEach-Object {
        $tenant = $_

        $deployment = New-Object Octopus.Client.Model.DeploymentResource -Property @{
            ReleaseId     = $release.Id
            EnvironmentId = $environment.Id
            TenantId      = $tenant.Id
        }

        Write-Host "Creating deployment for release $($release.Version) of project $projectName to environment $environmentName and tenant $($tenant.Name)"
        $deployment = $repositoryForSpace.Deployments.Create($deployment)
    }
}
catch {
    Write-Host $_.Exception.Message
    exit
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";

var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

var spaceName = "Default";
var projectName = "Your Project Name";
var channelName = "Default";
var environmentName = "Dev";
var tenantNames = new string[] { "Customer A Name", "Customer B Name" };

try
{
    // Get the space to work in
    var space = repository.Spaces.FindByName(spaceName);
    Console.WriteLine($"Using Space named {space.Name} with id {space.Id}");

    // Create space specific repository
    var repositoryForSpace = repository.ForSpace(space);

    // Get project by name
    var project = repositoryForSpace.Projects.FindByName(projectName);
    Console.WriteLine($"Using Project named {project.Name} with id {project.Id}");

    // Get channel by name
    var channel = repositoryForSpace.Channels.FindByName(project, channelName);
    Console.WriteLine($"Using Channel named {channel.Name} with id {channel.Id}");

    // Get environment by name
    var environment = repositoryForSpace.Environments.FindByName(environmentName);
    Console.WriteLine($"Using Environment named {environment.Name} with id {environment.Id}");

    // Get the deployment process template
    Console.WriteLine("Fetching deployment process template");
    var process = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);
    var template = repositoryForSpace.DeploymentProcesses.GetTemplate(process, channel);

    var release = new Octopus.Client.Model.ReleaseResource
    {
        ChannelId = channel.Id,
        ProjectId = project.Id,
        Version = template.NextVersionIncrement
    };

    // Set the package version to the latest for each package
    // If you have channel rules that dictate what versions can be used
    //  you'll need to account for that by overriding the selected package version
    Console.WriteLine("Getting action package versions");
    foreach (var package in template.Packages)
    {

        var feed = repositoryForSpace.Feeds.Get(package.FeedId);
        var latestPackage = repositoryForSpace.Feeds.GetVersions(feed, new[] { package.PackageId }).FirstOrDefault();

        var selectedPackage = new Octopus.Client.Model.SelectedPackage
        {
            ActionName = package.ActionName,
            Version = latestPackage.Version
        };

        Console.WriteLine($"Using version {latestPackage.Version} for step {package.ActionName} package {package.PackageId}");

        release.SelectedPackages.Add(selectedPackage);
    }

    // # Create release
    release = repositoryForSpace.Releases.Create(release, false); // pass in $true if you want to ignore channel rules

    var tenants = repositoryForSpace.Tenants.FindByNames(tenantNames);

    foreach (var tenant in tenants)
    {
        // # Create deployment
        var deployment = new Octopus.Client.Model.DeploymentResource
        {
            ReleaseId = release.Id,
            EnvironmentId = environment.Id,
            TenantId = tenant.Id
        };

        Console.WriteLine($"Creating deployment for release {release.Version} of project {projectName} to environment {environmentName} and tenant {tenant.Name}");
        deployment = repositoryForSpace.Deployments.Create(deployment);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
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
tenant_names = ['MyTenant']

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

# Get release version number
releaseVersion = ""
if None == template['NextVersionIncrement']:
    uri = uri = '{0}/api/{1}/deploymentprocesses/{2}'.format(octopus_server_uri, space['Id'], project['DeploymentProcessId'])
    deploymentProcess = get_octopus_resource(uri, headers)
    for step in deploymentProcess['Steps']:
        versionNumberFound = False
        if step['Name'] == template['VersioningPackageStepName']:
            for action in step['Actions']:
                package = action['Packages'][0]
                uri = '{0}/api/{1}/feeds/{2}/packages/versions?packageId={3}&take=1'.format(octopus_server_uri, space['Id'], package['FeedId'], package['PackageId'])
                releaseVersion = get_octopus_resource(uri, headers)[0]['Version'] # Only one result is returned so using index 0
                versionNumberFound = True
                break
        if versionNumberFound:
            break

else:
    releaseVersion = template['NextVersionIncrement']

# Create release JSON
releaseJson = {
    'ChannelId': channel['Id'],
    'ProjectId': project['Id'],
    'Version': releaseVersion,
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

# Get tenants
uri = '{0}/api/{1}/tenants'.format(octopus_server_uri, space['Id'])
allTenants = get_octopus_resource(uri, headers)
tenants = []
for tenant_name in tenant_names:
    tenant = next((x for x in allTenants if x['Name'] == tenant_name), None)
    tenants.append(tenant)

for tenant in tenants:
    # Create deploymentJson
    deploymentJson = {
    'ReleaseId': release['Id'],
    'EnvironmentId': environment['Id'],
    'TenantId': tenant['Id']
    }

    # Deploy
    uri = '{0}/api/{1}/deployments'.format(octopus_server_uri, space['Id'])
    response = requests.post(uri, headers=headers, json=deploymentJson)
    response.raise_for_status()
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
	tenantNames := []string{"MyTenant"}

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get project
	project := GetProject(client, projectName)

	// Get channel
	channel := GetChannel(client, project, channelName)

	// Get template
	template := GetDeploymentProcessTemplate(apiURL, APIKey, space, project, channel)

	// Get environment
	environment := GetEnvironment(client, environmentName)

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

	// Get tenants
	tenants := GetTenants(client, tenantNames)

	// Loop through tenants
	for i := 0; i < len(tenants); i++ {
		deployment := octopusdeploy.NewDeployment("MyDeployment", environment.ID, release.ID)
		deployment.TenantID = tenants[i].ID
		deployment, err = client.Deployments.Add(deployment)
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

func GetTenants(client *octopusdeploy.Client, TenantNames []string) []*octopusdeploy.Tenant {
	// Declare variables
	tenants := []*octopusdeploy.Tenant{}

	// Loop through tenant names
	for i := 0; i < len(TenantNames); i++ {
		// Get tenant
		tenantResults, err := client.Tenants.GetByPartialName(TenantNames[i])

		if err != nil {
			log.Println(err)
		}

		for j := 0; j < len(tenantResults); j++ {
			if tenantResults[j].Name == TenantNames[i] {
				tenants = append(tenants, tenantResults[j])
				break
			}
		}
	}

	// Return tenants
	return tenants
}
```

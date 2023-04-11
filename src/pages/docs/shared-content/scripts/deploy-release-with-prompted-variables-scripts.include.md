```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$apiKey = "Your API Key"
$OctopusURL = "https://yoururl.octopus.app/"

$ProjectName = "Your Project Name"
$EnvironmentName = "Your Environment Name"
$ReleaseNumber = "Your Release Number"
$spaceName = "Your Space Name"
$promptedVariableValue = "VariableName::Variable Value"

$Header =  @{ "X-Octopus-ApiKey" = $apiKey }

# Get space id
$spaceList = Invoke-RestMethod "$OctopusUrl/api/spaces?partialName=$([System.Web.HTTPUtility]::UrlEncode($spaceName))&skip=0&take=1" -Headers $Header
$spaceId = $spaceList.Items[0].Id

# Get project by name
$ProjectList = Invoke-RestMethod "$OctopusURL/api/$spaceId/projects?name=$([System.Web.HTTPUtility]::UrlEncode($projectName))&skip=0&take=1" -Headers $header
$ProjectId = $ProjectList.Items[0].Id

# Get environment by name
$EnvironmentList = Invoke-RestMethod -Uri "$OctopusURL/api/$spaceId/Environments?name=$([System.Web.HTTPUtility]::UrlEncode($EnvironmentName))&skip=0&take=1" -Headers $Header
$EnvironmentId = $EnvironmentList.Items[0].Id

# Get release by version
$ReleaseList = Invoke-RestMethod -Uri "$OctopusURL/api/$spaceId/projects/$ProjectId/releases?searchByVersion=$([System.Web.HTTPUtility]::UrlEncode($releaseNumber))&skip=0&take=1" -Headers $Header
$ReleaseId = $ReleaseList.Items[0].Id

# Get deployment preview for prompted variables
$deploymentPreview = Invoke-RestMethod "$OctopusUrl/api/$spaceId/releases/$releaseId/deployments/preview/$($EnvironmentId)?includeDisabledSteps=true" -Headers $Header

$deploymentFormValues = @{}
$promptedValueList = @(($promptedVariableValue -Split "`n").Trim())
   
foreach($element in $deploymentPreview.Form.Elements)
{
    $nameToSearchFor = $element.Control.Name
    $uniqueName = $element.Name
    $isRequired = $element.Control.Required
    
    $promptedVariablefound = $false
    
    Write-Host "Looking for the prompted variable value for $nameToSearchFor"
    foreach ($promptedValue in $promptedValueList)
    {
        $splitValue = $promptedValue -Split "::"
        Write-Host "Comparing $nameToSearchFor with provided prompted variable $($promptedValue[$nameToSearchFor])"
        if ($splitValue.Length -gt 1)
        {
            if ($nameToSearchFor -eq $splitValue[0])
            {
                Write-Host "Found the prompted variable value $nameToSearchFor"
                $deploymentFormValues[$uniqueName] = $splitValue[1]
                $promptedVariableFound = $true
                break
            }
        }
    }
    
    if ($promptedVariableFound -eq $false -and $isRequired -eq $true)
    {
        Write-Highlight "Unable to find a value for the required prompted variable $nameToSearchFor, exiting"
        Exit 1
    }
}


# Create deployment
$DeploymentBody = @{ 
            ReleaseID = $releaseId 
            EnvironmentID = $EnvironmentId
            FormValues = $deploymentFormValues
            ForcePackageDownload=$False
            ForcePackageRedeployment=$False
            UseGuidedFailure=$False
          } | ConvertTo-Json

Write-Host "Creating deployment with these values: $deploymentBody"
Invoke-RestMethod -Uri "$OctopusURL/api/$spaceId/deployments" -Method Post -Headers $Header -Body $DeploymentBody
```
```powershell PowerShell (Octopus.Client)
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$projectName = "MyProject"
$releaseVersion = "0.0.1"
$environmentName = "Development"
$promptedVariable = "MyVariable::MyValue"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Get project by name
$project = $repositoryForSpace.Projects.FindByName($projectName)
Write-Host "Using Project named $($project.Name) with id $($project.Id)"

# Get project releases
$projectRelease = $repositoryForSpace.Projects.GetAllReleases($project) | Where-Object {$_.Version -eq $releaseVersion}

# Get environment
$environment = $repositoryForSpace.Environments.GetAll() | Where-Object {$_.Name -eq $environmentName}

# Get release template
$releaseTemplate = $repositoryForSpace.Releases.GetTemplate($projectRelease)

# Get promotion object
$promotion = $releaseTemplate.PromoteTo | Where-Object {$_.Name -eq $environment.Name}

# Get the preview of the deployment to grab prompted variables
$preview = $repositoryForSpace.Releases.GetPreview($promotion)

# Parse variable
$parsedPromptedVariable = $promptedVariable.Split("::", [System.StringSplitOptions]::RemoveEmptyEntries)

# Create deployment object
$deployment = New-Object Octopus.Client.Model.DeploymentResource -Property @{
    ReleaseId = $projectRelease.Id
    EnvironmentId = $environment.Id
}

# Loop through form values
foreach ($element in $preview.Form.Elements)
{
    # Check to see if element matches variable name
    if ($parsedPromptedVariable[0] -eq $element.Control.Name)
    {
        Write-Host "Adding $($element.Control.Name) to list with value $($parsedPromptedVariable[1])"
        $deployment.FormValues.Add($element.Name, $parsedPromptedVariable[1])
    }
}

# Execute deployment
$deployment = $repositoryForSpace.Deployments.Create($deployment)
```
```csharp C#

// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using System.Linq;

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
var spaceName = "Default";
var projectName = "MyProject";
var releaseVersion = "0.0.1";
var environmentName = "Development";
var promptedVariable = "MyVariable::MyValue";

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
var projectRelease = spaceRepository.Projects.GetAllReleases(project).Where(x => x.Version == releaseVersion).FirstOrDefault();

// Get the environment
var environment = spaceRepository.Environments.FindByName(environmentName);

// Get project release template
var template = spaceRepository.Releases.GetTemplate(projectRelease);

// Get promotion object
var promotion = template.PromoteTo.FirstOrDefault(x => x.Name == environment.Name);

// Get preview object
var preview = spaceRepository.Releases.GetPreview(promotion);

// Parse parameter
var parsedParameter = promptedVariable.Split("::", StringSplitOptions.RemoveEmptyEntries);

// Create new deployment object
var deployment = new Octopus.Client.Model.DeploymentResource();
deployment.ReleaseId = projectRelease.Id;
deployment.EnvironmentId = environment.Id;

// Loop through form elements
foreach (var element in preview.Form.Elements)
{
    // Check to see if the variable name matches
    if (parsedParameter[0] == ((Octopus.Client.Model.Forms.VariableValue)element.Control).Name)
    {
        // Add to form values
        deployment.FormValues.Add(element.Name, parsedParameter[1]);
    }
}

// Execute deployment
spaceRepository.Deployments.Create(deployment);
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
release_version = "0.0.1"
environment_name = "Development"
prompted_variable = "MyVariable::MyValue"

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

# Get deployment preview
uri = '{0}/api/{1}/releases/{2}/deployments/preview/{3}?includeDisabledSteps=true'.format(octopus_server_uri, space['Id'], release['Id'], environment['Id'])
preview = get_octopus_resource(uri, headers)

# Create variable for values
form_values = {}
parsedPromptedVariable = prompted_variable.split("::")

# Loop through prompted variables
for promptedVariable in preview['Form']['Elements']:
    if promptedVariable['Control']['Name'] == parsedPromptedVariable[0]:
        # Add to list
        form_values[promptedVariable['Name']] = parsedPromptedVariable[1]

# Create deployment object
# Create deploymentJson
deploymentJson = {
    'ReleaseId': release['Id'],
    'EnvironmentId': environment['Id'],
    'FormValues': form_values
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
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-MyAPIKey"
	spaceName := "Default"
	projectName := "MyProject"
	releaseVersion := "0.0.1"
	environmentName := "Development"
	promptedVariable := "MyVariable::MyValue"

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

	// Split prompted variable
	parsedPromptedVariable := strings.Split(promptedVariable, "::")

	// Declare release
	releaseId := ""

	// Loop through releases
	for i := 0; i < len(projectReleases); i++ {
		projectRelease := projectReleases[i].(map[string]interface{})

		// Delete release
		if projectRelease["Version"].(string) == releaseVersion {

			releaseId = projectRelease["Id"].(string)

			break
		}
	}

	// Get deployment preview
	deploymentPreview := GetDeploymentPreview(apiURL, APIKey, releaseId, space, environment)

	// Get form
	form := deploymentPreview["Form"].(map[string]interface{})

	// Get elements
	elements := form["Elements"].([]interface{})

	// Create variable for form elements
	formElements := make(map[string]string)

	// Loop through form elements
	for i := 0; i < len(elements); i++ {
		element := elements[i].(map[string]interface{})

		// check to see if the element display name matches
		if (element["Control"].(map[string]interface{}))["Name"] == parsedPromptedVariable[0] {
			formElements[element["Name"].(string)] = parsedPromptedVariable[1]
		}
	}

	// Create deployment object
	deployment := octopusdeploy.NewDeployment(environment.ID, releaseId)
	deployment.FormValues = formElements

	// Issue deployment
	deployment, err = client.Deployments.Add(deployment)

	if err != nil {
		log.Println(err)
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

	for true {
		// check to see if there's more to get
		fltItemsPerPage := returnedReleases["ItemsPerPage"].(float64)
		itemsPerPage := int(fltItemsPerPage)

		if len(returnedReleases["Items"].([]interface{})) == itemsPerPage {
			// Increment skip accoumt
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

func GetDeploymentPreview(octopusURL *url.URL, APIKey string, ReleaseId string, space *octopusdeploy.Space, environment *octopusdeploy.Environment) map[string]interface{} {
	// Define api endpoint
	deploymentPreviewEndpoint := octopusURL.String() + "/api/" + space.ID + "/releases/" + ReleaseId + "/deployments/preview/" + environment.ID + "?includeDisabledSteps=true"

	// Create http client
	httpClient := &http.Client{}

	// Make request
	request, _ := http.NewRequest("GET", deploymentPreviewEndpoint, nil)
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
	returnedPreview := releasesJson.(map[string]interface{})

	return returnedPreview
}
```

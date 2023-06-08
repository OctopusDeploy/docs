<details data-group="promote-releases-not-in-destination">
<summary>PowerShell (REST API)</summary>

```powershell
$octopusUrl = "https://local.octopusdemos.app" 
$apiKey = "YOUR API KEY"
$projectNameList = "WebAPI,Web UI"
$sourceEnvironmentName = "Production" 
$destinationEnvironmentName = "Staging"
$spaceName = "Default"

function Invoke-OctopusApi
{
    param
    (
        $octopusUrl,
        $endPoint,
        $spaceId,
        $apiKey,
        $method,
        $item     
    )

    if ([string]::IsNullOrWhiteSpace($SpaceId))
    {
        $url = "$OctopusUrl/api/$EndPoint"
    }
    else
    {
        $url = "$OctopusUrl/api/$spaceId/$EndPoint"    
    }  

    try
    {        
        if ($null -ne $item)
        {
            $body = $item | ConvertTo-Json -Depth 10
            Write-Verbose $body

            Write-Host "Invoking $method $url"
            return Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -Body $body -ContentType 'application/json; charset=utf-8' 
        }

        Write-Host "No data to post or put, calling bog standard invoke-restmethod for $url"
        $result = Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -ContentType 'application/json; charset=utf-8'

        return $result               
    }
    catch
    {
        if ($null -ne $_.Exception.Response)
        {
            if ($_.Exception.Response.StatusCode -eq 401)
            {
                Write-Error "Unauthorized error returned from $url, please verify API key and try again"
            }
            elseif ($_.Exception.Response.statusCode -eq 403)
            {
                Write-Error "Forbidden error returned from $url, please verify API key and try again"
            }
            else
            {                
                Write-Host -Message "Error calling $url $($_.Exception.Message) StatusCode: $($_.Exception.Response.StatusCode )"
            }            
        }
        else
        {
            Write-Host $_.Exception
        }
    }

    Throw "There was an error calling the Octopus API please check the log for more details"
}

$spaceList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $null -item $null -endPoint "spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100"
$space = $spaceList.Items | Where-Object {$_.Name -eq $spaceName}
$spaceId = $space.Id
Write-Host "The space id for space name $spaceName is $spaceId"

$sourceEnvironmentList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $spaceId -item $null -endPoint "environments?partialName=$([uri]::EscapeDataString($sourceEnvironmentName))&skip=0&take=100"
$sourceEnvironment = $sourceEnvironmentList.Items | Where-Object {$_.Name -eq $sourceEnvironmentName}
$sourceEnvironmentId = $sourceEnvironment.Id
Write-Host "The environment id for environment name $sourceEnvironmentName is $sourceEnvironmentId"

$destinationEnvironmentList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $spaceId -item $null -endPoint "environments?partialName=$([uri]::EscapeDataString($destinationEnvironmentName))&skip=0&take=100"
$destinationEnvironment = $destinationEnvironmentList.Items | Where-Object {$_.Name -eq $destinationEnvironmentName}
$destinationEnvironmentId = $destinationEnvironment.Id
Write-Host "The environment id for environment name $destinationEnvironmentName is $destinationEnvironmentId"

$splitProjectList = $projectNameList -split ","
foreach ($projectName in $splitProjectList)
{
    $projectList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $spaceId -item $null -endPoint "projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100"
    $project = $projectList.Items | Where-Object {$_.Name -eq $projectName}
    $projectId = $project.Id
    Write-Host "The project id for project name $projectName is $projectId"

    Write-Host "I have all the Ids I need, I am going to find the most recent sucesseful deployment now to $sourceEnvironmentName"
    $taskList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $null -item $null -endPoint "tasks?skip=0&environment=$($sourceEnvironmentId)&project=$($projectId)&name=Deploy&states=Success&spaces=$spaceId&includeSystem=false"
    if ($taskList.Items.Count -eq 0)
    {
        Write-Host "Unable to find a successful deployment for $projectName to $sourceEnvironmentName"
        continue
    }

    $lastDeploymentTask = $taskList.Items[0]
    $deploymentId = $lastDeploymentTask.Arguments.DeploymentId
    Write-Host "The id of the last deployment for $projectName to $sourceEnvironmentName is $deploymentId"

    $deploymentDetails = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $spaceId -item $null -endPoint "deployments/$deploymentId"
    $releaseId = $deploymentDetails.ReleaseId
    Write-Host "The release id for $deploymentId is $releaseId"

    $canPromote = $false
    Write-Host "I have all the Ids I need, I am going to find the most recent sucesseful deployment now to $destinationEnvironmentName"
    $destinationTaskList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $null -item $null -endPoint "tasks?skip=0&environment=$($destinationEnvironmentId)&project=$($projectId)&name=Deploy&states=Success&spaces=$spaceId&includeSystem=false"
    
    if ($destinationTaskList.Items.Count -eq 0)
    {
        Write-Host "The destination has no releases, promoting."
        $canPromote = $true
    }

    $lastDestinationDeploymentTask = $destinationTaskList.Items[0]
    $lastDestinationDeploymentId = $lastDestinationDeploymentTask.Arguments.DeploymentId
    Write-host "The deployment id of the last deployment for $projectName to $destinationEnvironmentName is $lastDestinationDeploymentId"

    $lastDestinationDeploymentDetails = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $apiKey -method "GET" -spaceId $spaceId -item $null -endPoint "deployments/$lastDestinationDeploymentId"
    $lastDestinationReleaseId = $lastDestinationDeploymentDetails.ReleaseId

    Write-Host "The release id for the last deployment to the destination is $lastDestinationReleaseId"

    if ($lastDestinationReleaseId -ne $releaseId)
    {
        Write-Host "The releases on the source and destination don't match, promoting"
        $canPromote = $true
    }
    else
    {
        Write-Host "The releases match, not promoting"    
    }

    if ($canPromote -eq $false)
    {
        Write-Host "Nothing to promote for $projectName"
        continue
    }

    $newDeployment = @{
        EnvironmentId = $destinationEnvironmentId
        ReleaseId = $releaseId
        ExcludedMachines = @()
        ForcePackageDownload = $false
        ForcePackageRedeployment = $false
        FormValue = @{}
        QueueTime = $null
        QueueTimeExpiry = $null
        SkipActions = @()
        SpecificMachineIds = @()
        TenantId = $null
        UseGuidedFailure = $false
    }
    $newDeployment = Invoke-OctopusApi -octopusUrl $octopusurl -apiKey $apiKey -method "POST" -spaceId $spaceId -item $newDeployment -endPoint "deployments"
}
```

</details>
<details data-group="promote-releases-not-in-destination">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
# Define working variables
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$sourceEnvironmentName = "Production"
$destinationEnvironmentName = "Test"
$projectNameList = @("MyProject")
 

# Establish a conneciton0
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get repository specific to space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Get the source environment
$sourceEnvironment = $repositoryForSpace.Environments.FindByName($sourceEnvironmentName)

# Get the destination environment
$destinationEnvironment = $repositoryForSpace.Environments.FindByName($destinationEnvironmentName)

# Loop through the projects
foreach ($name in $projectNameList)
{
    # Get project object
    $project = $repositoryForSpace.Projects.FindByName($name)

    Write-Host "The project Id for project name $name is $($project.Id)"
    Write-Host "I have all the Ids I need, I am going to find the most recent sucesseful deployment now to $sourceEnvironmentName"

    # Get the deployment tasks associated with this space, project, and environment
    $taskList = $repositoryForSpace.Deployments.FindBy(@($project.Id), @($sourceEnvironment.Id), 0, $null).Items | Where-Object {$repositoryForSpace.Tasks.Get($_.TaskId).State -eq [Octopus.Client.Model.TaskState]::Success}
    
    # Check to see if any tasks were returned
    if ($taskList.Count -eq 0)
    {
        Write-Host "Unable to find a successful deployment for project $($project.Name) to $($sourceEnvironment.Name)"
        continue
    }

    # Grab the last successful deployment
    $lastDeploymentTask = $taskList[0]

    Write-Host "The id of the last deployment for $($project.Name) to $($sourceEnvironment.Name) is $($lastDeploymentTask.Id)"

    # Get the deployment object
    Write-Host "The release id for $deploymentId is $($lastDeploymentTask.ReleaseId)"

    $canPromote = $false

    Write-Host "I have all the Ids I need, I am going to find the most recent successful deployment to $($destinationEnvironment.Name)"

    # Get the task list for the destination environment
    $destinationTaskList = $repositoryForSpace.Deployments.FindBy(@($project.Id), @($destinationEnvironment.Id), 0, $null).Items | Where-Object {$repositoryForSpace.Tasks.Get($_.TaskId).State -eq [Octopus.Client.Model.TaskState]::Success}
    
    if ($destinationTaskList.Count -eq 0)
    {
        Write-Host "The destination has no releases, promoting."
        $canPromote = $true
    }

    # Get the last destination deployment
    $lastDestinationDeploymentTask = $destinationTaskList[0]

    Write-Host "The deployment id of the last deployment for $($project.Name) to $($destinationEnvironment.Name) is $($lastDestinationDeploymentTask.Id)"
    Write-Host "The release id of the last deployment to the destination is $($lastDestinationDeploymentTask.ReleaseId)"

    if ($lastDestinationDeploymentTask.ReleaseId -ne $lastDeploymentTask.ReleaseId)
    {
        Write-Host "The releases on teh source and destination don't match, promoting"
        $canPromote = $true
    }
    else
    {
        Write-Host "The releases match, not promoting"
    }

    if ($canPromote -eq $false)
    {
        Write-Host "Nothing to promote for $($project.Name)"
        continue
    }

    # Create new deployment object
    $deployment = New-Object Octopus.Client.Model.DeploymentResource
    $deployment.EnvironmentId = $destinationEnvironment.Id
    $deployment.ReleaseId = $lastDeploymentTask.ReleaseId

    # Execute the deployment
    $repositoryForSpace.Deployments.Create($deployment)
}
```

</details>
<details data-group="promote-releases-not-in-destination">
<summary>C#</summary>

```csharp
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using System.Linq;

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);
var spaceName = "Default";
var sourceEnvironmentName = "Production";
var destinationEnvironmentName = "Test";
string[] projectList = new string[] { "MyProject" };

var space = repository.Spaces.FindByName(spaceName);
var repositoryForSpace = client.ForSpace(space);

// Get the source environment
var sourceEnvironment = repositoryForSpace.Environments.FindByName(sourceEnvironmentName);

// Get the destination environment
var destinationEnvironment = repositoryForSpace.Environments.FindByName(destinationEnvironmentName);


// Loop through project names
foreach (string projectName in projectList)
{
    // Get the project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    Console.WriteLine(string.Format("The project id for the project name {0} is {2}", project.Name, project.Id));
    Console.WriteLine(string.Format("I have all the Ids I need, I am going to find the most recent successful deployment to {0}", sourceEnvironment.Name));

    // Get a list of deployments to the environment
    var sourceTaskList = repositoryForSpace.Deployments.FindBy(new string[] { project.Id }, new string[] { sourceEnvironment.Id }, 0, null).Items.Where(d => repositoryForSpace.Tasks.Get(d.TaskId).State == TaskState.Success).ToArray();

    if (sourceTaskList.Length == 0)
    {
        Console.WriteLine(string.Format("Unable to find a successful deployment for project {0} to {1}", project.Name, sourceEnvironment.Name));
        continue;
    }

    // Grab the latest task
    var lastSourceDeploymentTask = sourceTaskList[0];

    Console.WriteLine(string.Format("The Id of the last deployment for project {0} to {1} is {2}", project.Name, sourceEnvironment.Name, lastSourceDeploymentTask.Id));
    Console.WriteLine(string.Format("The release Id for {0} is {1}", lastSourceDeploymentTask.Id, lastSourceDeploymentTask.ReleaseId));

    bool canPromote = false;

    Console.WriteLine(string.Format("I have all the Ids I need, I am going to find the most recent successful deployment to {0}", destinationEnvironment.Name));

    // Get task list for destination
    var destinationTaskList = repositoryForSpace.Deployments.FindBy(new string[] { project.Id }, new string[] { destinationEnvironment.Id }, 0, null).Items.Where(d => repositoryForSpace.Tasks.Get(d.TaskId).State == TaskState.Success).ToArray(); ;

    if (destinationTaskList.Length == 0)
    {
        Console.WriteLine(string.Format("The destination has no releases, promoting."));
        canPromote = true;
    }

    // Get the last deployment to destination
    var lastDestinationDeploymentTask = destinationTaskList[0];

    Console.WriteLine(string.Format("The deployment Id of the last deployment for {0} to {1} is {2}", project.Name, destinationEnvironment.Name, lastDestinationDeploymentTask.Id));
    Console.WriteLine(string.Format("The release Id of the last deployment to the destination is {0}", lastDestinationDeploymentTask.ReleaseId));

    if (lastSourceDeploymentTask.ReleaseId != lastDestinationDeploymentTask.ReleaseId)
    {
        Console.WriteLine(string.Format("The releases on the source and destination don't match, promoting"));
        canPromote = true;
    }
    else
    {
        Console.WriteLine("The releases match, not promoting");
    }

    if (!canPromote)
    {
        Console.WriteLine(string.Format("Nothing to promote for {0}", project.Name));
    }

    // Create new deployment object
    var deployment = new Octopus.Client.Model.DeploymentResource();
    deployment.EnvironmentId = destinationEnvironment.Id;
    deployment.ReleaseId = lastSourceDeploymentTask.ReleaseId;

    // Queue the deployment
    repositoryForSpace.Deployments.Create(deployment);
}
```

</details>
<details data-group="promote-releases-not-in-destination">
<summary>Python3</summary>

```python
import json
import requests
from requests.api import get, head
import csv

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
    if hasattr(results, 'keys') and 'Items' in results.keys():
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
space_name = 'Default'
source_environment_name = 'Production'
destination_environment_name = 'Test'
project_name_list = ['MyProject']

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get source environment
uri = '{0}/api/{1}/environments'.format(octopus_server_uri, space['Id'])
environments = get_octopus_resource(uri, headers)
source_environment = next((x for x in environments if x['Name'] == source_environment_name), None)
destination_environment = next((x for x in environments if x['Name'] == destination_environment_name), None)

print ('The space Id for the space name {0} is {1}'.format(space['Name'], space['Id']))
print ('The environment Id for the environment {0} is {1}'.format(source_environment['Name'], source_environment['Id']))
print ('The environment Id for the environment {0} is {1}'.format(destination_environment['Name'], destination_environment['Id']))

# Get all projects
uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)

# Loop through projects
for project_name in project_name_list:
    # Get the project
    project = next((x for x in projects if x['Name'] == project_name), None)

    print('The project Id for project name {0} is {1}'.format(project['Name'], project['Id']))
    print('I have all the Ids I need, I am going to find the most recent successful deployment to {0}'.format(source_environment['Name']))

    uri = '{0}/api/tasks?environment={1}&project={2}&name=Deploy&states=Success&spaces={3}&includesystem=false'.format(octopus_server_uri, source_environment['Id'], project['Id'], space['Id'])
    source_task_list = get_octopus_resource(uri, headers)

    if len(source_task_list) == 0:
        print('Unable to find a successful deployment for {0} to {1}'.format(project['Name'], source_environment['Name']))
        continue

    # Get last deployment task
    last_source_deployment_task = source_task_list[0]
    last_source_deployment_id = last_source_deployment_task['Arguments']['DeploymentId']
    
    print ('The Id of the last deployment for {0} to {1} is {2}'.format(project['Name'], source_environment['Name'], last_source_deployment_id))

    # Get deployment details
    uri = '{0}/api/{1}/deployments/{2}'.format(octopus_server_uri, space['Id'], last_source_deployment_id)
    last_source_deployment = get_octopus_resource(uri, headers)
    last_source_release_id = last_source_deployment['ReleaseId']

    print ('The release Id for {0} is {1}'.format(last_source_deployment_id, last_source_release_id))

    can_promote = False

    print ('I have all the Ids I need, I am going to find the most recent successfule deployment to {0}'.format(destination_environment['Name']))

    uri = '{0}/api/tasks?environment={1}&project={2}&name=Deploy&states=Success&spaces={3}&includesystem=false'.format(octopus_server_uri, destination_environment['Id'], project['Id'], space['Id'])
    destination_task_list = get_octopus_resource(uri, headers)

    if len(destination_task_list) == 0:
        print('The destination has no releases, promoting')
        can_promote = True

    last_destination_depoloyment_task = destination_task_list[0]
    last_destination_deployment_id = last_destination_depoloyment_task['Arguments']['DeploymentId']

    print('The deployment Id of the last deployment for {0} to {1} is {2}'.format(project['Name'], destination_environment['Name'], last_destination_deployment_id))

    # Get deployment details
    uri = '{0}/api/{1}/deployments/{2}'.format(octopus_server_uri, space['Id'], last_destination_deployment_id)
    last_destination_deployment = get_octopus_resource(uri, headers)
    last_destination_release_id = last_destination_deployment['ReleaseId']

    print('The release Id for the last deployment to the destination is {0}'.format(last_destination_release_id))

    if last_destination_release_id != last_source_release_id:
        print('The releases on teh source and destination do not match, promoting')
        can_promote = True
    else:
        print('Nothing to promote for {0}'.format(project['Name']))
        continue

    # Create deployment object
    new_deployment = {
        'EnvironmentId': destination_environment['Id'],
        'ReleaseId': last_source_release_id
    }

    # Post deployment
    uri = '{0}/api/{1}/deployments'.format(octopus_server_uri, space['Id'])
    response = requests.post(uri, headers=headers, json=new_deployment)
    response.raise_for_status()    
```

</details>
<details data-group="promote-releases-not-in-destination">
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
	projectNames := []string{"MyProject"}
	sourceEnvironmentName := "Production"
	destinationEnvironmentName := "Test"

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get source environment
    sourceEnvironment := GetEnvironment(apiURL, APIKey, space, sourceEnvironmentName)
    destinationEnvironment := GetEnvironment(apiURL, APIKey, space, destinationEnvironmentName)

	// Loop through projects
	for _, projectName := range projectNames {
		
        // Get the project
        project := GetProject(apiURL, APIKey, space, projectName)
		
		fmt.Printf("The project Id for project name %[1]s is %[2]s \n", project.Name, project.ID)
		fmt.Printf("I have all the Ids I need, I am going to find the most recent successful deployment to %[1]s \n", sourceEnvironment.Name)

		// Get task list
		taskQuery := octopusdeploy.TasksQuery{
			Environment: sourceEnvironment.ID,
			Project:     project.ID,
			States:      []string{"Success"},
			Spaces:      []string{space.ID},
		}
		sourceTaskList, err := client.Tasks.Get(taskQuery)
		if err != nil {
			log.Println(err)
		}

		if len(sourceTaskList.Items) == 0 {
			fmt.Printf("Unable to find a successful deployment for project %[1]s to %[2]s \n", project.Name, sourceEnvironment.Name)
			continue
		}

		latestSourceDeploymentTask := sourceTaskList.Items[0]
		latestSourceDeploymentId := latestSourceDeploymentTask.Arguments["DeploymentId"].(string)

		fmt.Printf("The Id of the last deployment for project %[1]s to %[2]s is %[3]s \n", project.Name, sourceEnvironment.Name, latestSourceDeploymentId)
		latestSourceDeployment, err := client.Deployments.GetByID(latestSourceDeploymentId)
		if err != nil {
			log.Println(err)
		}

		fmt.Printf("The release Id for %[1]s is %[2]s \n", latestSourceDeployment.ID, latestSourceDeployment.ReleaseID)

		canPromote := false

		fmt.Printf("I have all the Ids I need, I am going to find the recent successful deployment to %[1]s \n", destinationEnvironment.Name)

		// Get destination task list
		taskQuery.Environment = destinationEnvironment.ID
		destinationTaskList, err := client.Tasks.Get(taskQuery)
		if err != nil {
			log.Println(err)
		}

		if len(destinationTaskList.Items) == 0 {
			fmt.Printf("The destination has no releases, promoting \n")
			canPromote = true
		}

		// Get the latest task
		latestDestinationDeploymentTask := destinationTaskList.Items[0]
		latestDestinationDeploymentId := latestDestinationDeploymentTask.Arguments["DeploymentId"].(string)

		fmt.Printf("The Id of the last deployment for project %[1]s to %[2]s is %[3]s \n", project.Name, destinationEnvironment.Name, latestDestinationDeploymentId)
		latestDestinationDeployment, err := client.Deployments.GetByID(latestDestinationDeploymentId)
		if err != nil {
			log.Println(err)
		}

		fmt.Printf("The release Id for %[1]s is %[2]s \n", latestDestinationDeployment.ID, latestDestinationDeployment.ReleaseID)

		if latestDestinationDeployment.ReleaseID != latestSourceDeployment.ReleaseID {
			fmt.Printf("The releases on the source and destination do not match, promoting \n")
			canPromote = true
		} else {
			fmt.Printf("The releases match, not promoting \n")
		}

		if !canPromote {
			fmt.Printf("Nothing to promote for project %[1]s \n", project.Name)
		}

		deployment := octopusdeploy.NewDeployment(destinationEnvironment.ID, latestSourceDeployment.ReleaseID)
		client.Deployments.Add(deployment)
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

func GetUserRoleByName(client *octopusdeploy.Client, roleName string) *octopusdeploy.UserRole {
	// Get all user roles
	userRoles, err := client.UserRoles.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Loop through roles
	for _, role := range userRoles {
		if role.Name == roleName {
			return role
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

```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app/"
$octopusAPIKey = "API-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# Provide the space name where the export task ran.
$sourceSpaceName = "Export-Space"
# Provide the space name for the projects to be imported into.
$destinationSpaceName = "Default"
# Provide the Export Server task id to use as the source for import e.g. ServerTasks-12345
$exportTaskId = ""
# Provide a password for the import zip file
$importTaskPassword = ""
# Wait for the import task to finish?
$importTaskWaitForFinish = $True
# Provide a timeout for the imports task to be canceled.
$importTaskCancelInSeconds=300

$octopusURL = $octopusURL.TrimEnd('/')

# Get Destination Space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($sourceSpaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $sourceSpaceName }
$exportTaskSpaceId = $space.Id

# Get Destination Space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($destinationSpaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $destinationSpaceName }
$importTaskSpaceId = $space.Id

$importBody = @{
    ImportSource = @{
    	Type = "space";
        SpaceId = $exportTaskSpaceId;
        TaskId = $exportTaskId;
    };
    Password = @{
    	HasValue = $True;
        NewValue = $importTaskPassword;
    };
}

$importBodyAsJson = $importBody | ConvertTo-Json
$importBodyPostUrl = "$octopusURL/api/$($importTaskSpaceId)/projects/import-export/import"
Write-Host "Kicking off import run by posting to $importBodyPostUrl"
Write-Verbose "Payload: $importBodyAsJson"
$importResponse = Invoke-RestMethod $importBodyPostUrl -Method POST -Headers $header -Body $importBodyAsJson
$importServerTaskId = $importResponse.TaskId
Write-Host "The task id of the new task is $importServerTaskId"
Write-Host "Import task was successfully invoked, you can access the task: $octopusURL/app#/$importTaskSpaceId/tasks/$importServerTaskId"

if ($importTaskWaitForFinish -eq $true)
{
	Write-Host "The setting to wait for completion was set, waiting until task has finished"
    $startTime = Get-Date
    $currentTime = Get-Date
    $dateDifference = $currentTime - $startTime
    $taskStatusUrl = "$octopusURL/api/$importTaskSpaceId/tasks/$importServerTaskId"
    $numberOfWaits = 0    
    While ($dateDifference.TotalSeconds -lt $importTaskCancelInSeconds)
    {
        Write-Host "Waiting 5 seconds to check status"
        Start-Sleep -Seconds 5
        $taskStatusResponse = Invoke-RestMethod $taskStatusUrl -Headers $header        
        $taskStatusResponseState = $taskStatusResponse.State
        if ($taskStatusResponseState -eq "Success")
        {
            Write-Host "The task has finished with a status of Success"
            exit 0
        }
        elseif($taskStatusResponseState -eq "Failed" -or $taskStatusResponseState -eq "Canceled")
        {
            Write-Host "The task has finished with a status of $taskStatusResponseState status, completing"
            exit 1            
        }
        $numberOfWaits += 1
        if ($numberOfWaits -ge 10)
        {
        	Write-Host "The task state is currently $taskStatusResponseState"
        	$numberOfWaits = 0
        }
        else
        {
        	Write-Host "The task state is currently $taskStatusResponseState"
        }  
        $startTime = $taskStatusResponse.StartTime
        if ($null -eq $startTime -or [string]::IsNullOrWhiteSpace($startTime) -eq $true)
        {        
        	Write-Host "The task is still queued, let's wait a bit longer"
        	$startTime = Get-Date
        }
        $startTime = [DateTime]$startTime
        $currentTime = Get-Date
        $dateDifference = $currentTime - $startTime        
    }
    Write-Host "The cancel timeout has been reached, cancelling the import task"
    Invoke-RestMethod "$octopusURL/api/$importTaskSpaceId/tasks/$importTaskSpaceId/cancel" -Headers $header -Method Post | Out-Null
    Write-Host "Exiting with an error code of 1 because we reached the timeout"
    exit 1
}
```
```python Python3
import json
import requests
from requests.api import get, head
from datetime import datetime
import time

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
sourceSpaceName = "Default"
destinationSpaceName = "DestinationSpace"
exportTaskId = "ServerTasks-XXXX" # from the export operation
importTaskPassword = "MyFantasticPassword"
importTaskWaitForFinish = True
importTaskCancelInSeconds = 300

# Get destination space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
destinationSpace = next((x for x in spaces if x['Name'] == destinationSpaceName), None)

# Get source space
sourceSpace = next((x for x in spaces if x['Name'] == sourceSpaceName), None)

# Define body of request
importBody = {
    'ImportSource': {
        'Type': 'space', # must be lower case
        'SpaceId': sourceSpace['Id'],
        'TaskId' : exportTaskId
    },
    'Password': {
        'HasValue': True,
        'NewValue': importTaskPassword
    }
}

# Execute transfer
uri = '{0}/api/{1}/projects/import-export/import'.format(octopus_server_uri, destinationSpace['Id'])
print ('Kicking off import from {0} to {1}'.format(sourceSpaceName, destinationSpaceName))
response = requests.post(uri, headers=headers, json=importBody)
response.raise_for_status()

# Get results
results = json.loads(response.content.decode('utf-8'))
importTaskId = results['TaskId']
print ('The task id of the new task is: {0}'.format(importTaskId))

if importTaskWaitForFinish:
    start_time = datetime.now()
    current_time = datetime.now()
    
    date_difference = current_time - start_time
    number_of_waits = 0

    while date_difference.seconds < importTaskCancelInSeconds:
        print ('Waiting 5 seconds')
        time.sleep(5)
        uri = '{0}/api/{1}/tasks/{2}'.format(octopus_server_uri, destinationSpace['Id'], importTaskId)
        response = requests.get(uri, headers=headers)
        response.raise_for_status()

        results = json.loads(response.content.decode('utf-8'))
        
        if results['State'] == 'Success':
            print ('The task has finished successfully')
            exit(0)

        elif results['State'] == 'Failed' or results['State'] == 'Cancelled':
            print ('The task finished with a status of {0}'.format(results['State']))
            exit(1)

        number_of_waits += 1

        if number_of_waits >= 10:
            print ('The task is currently {0}'.format(results['State']))
            number_of_waits = 0
        else:
            print ('The task is currently {0}'.format(results['State']))
        
        if results['StartTime'] == None or results['StartTime'] == '':
            print ('The task is still queued, let us wait a bit longer')
            start_time = datetime.now()
        
        current_time = datetime.now()
        date_difference = current_time - start_time    

  
    print ('The cancel timeout has been reached, cancelling the export task')
    uri = '{0}/api/{1}/tasks/{2}'.format(octopus_server_uri, destinationSpace['Id'], importTaskId)
    response = requests.get(uri, headers=headers)
    response.raise_for_status()
```
```go Go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"time"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

type ImportProject struct {
	ImportSource ImportSource
	Password     *octopusdeploy.SensitiveValue
}

type ImportSource struct {
	Type    string
	SpaceId string
	TaskId  string
}

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	destinationSpaceName := "Destination Space"
	exportPassword := "MyFanatasticPassword"
	exportTaskId := "ServerTasks-XXXXX"

	// Get reference to space
	destinationSpace := GetSpace(apiURL, APIKey, destinationSpaceName)


	// Build body
	password := octopusdeploy.NewSensitiveValue(exportPassword)
	importObject := ImportProject{}
	importObject.ImportSource.SpaceId = destinationSpace.ID
	importObject.ImportSource.TaskId = exportTaskId
	importObject.ImportSource.Type = "space"
	importObject.Password = password

	// Export the projects
	ImportProjects(apiURL, APIKey, destinationSpace, importObject, true, 300)

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

func ImportProjects(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, importProjects ImportProject, waitForFinish bool, taskCancelInSeconds int) {
	// Create http client
	httpClient := &http.Client{}
	exportTaskUrl := octopusURL.String() + "/api/" + space.ID + "/projects/import-export/import"

	// Make request
	jsonBody, err := json.Marshal(importProjects)
	myString := string(jsonBody)
	fmt.Println(myString)
	if err != nil {
		log.Println(err)
	}

	request, _ := http.NewRequest("POST", exportTaskUrl, bytes.NewBuffer(jsonBody))
	request.Header.Set("X-Octopus-ApiKey", APIKey)
	response, err := httpClient.Do(request)

	if err != nil {
		log.Println(err)
	}

	responseData, err := ioutil.ReadAll(response.Body)

	var serverTaskRaw interface{}
	jsonErr := json.Unmarshal(responseData, &serverTaskRaw)
	if jsonErr != nil {
		log.Println(err)
	}

	// Get the task id
	serverTask := serverTaskRaw.(map[string]interface{})
	serverTaskId := serverTask["TaskId"]
	fmt.Println("The task id of the new task is: " + serverTaskId.(string))

	if waitForFinish {
		fmt.Println("The setting to wait for completion was set, waiting until the task has finished")

		elapsedSeconds := 0
		taskUrl := octopusURL.String() + "/api/" + space.ID + "/tasks/" + serverTaskId.(string)

		for elapsedSeconds < taskCancelInSeconds {
			time.Sleep(5 * time.Second)
			elapsedSeconds += 5

			request, _ := http.NewRequest("GET", taskUrl, nil)
			request.Header.Set("X-Octopus-ApiKey", APIKey)
			response, err := httpClient.Do(request)

			if err != nil {
				log.Println(err)
			}

			responseData, err := ioutil.ReadAll(response.Body)

			var serverTaskRaw interface{}
			jsonErr := json.Unmarshal(responseData, &serverTaskRaw)
			if jsonErr != nil {
				log.Println(err)
			}
			serverTask = serverTaskRaw.(map[string]interface{})
			taskStatus := serverTask["State"]

			if taskStatus.(string) == "Success" {
				fmt.Println("The task has finished successfully")
				break

			} else if taskStatus.(string) == "Failed" || taskStatus.(string) == "Cancelled" {
				fmt.Println("The task finished with a status of " + taskStatus.(string))
				break
			}
		}

		if elapsedSeconds >= taskCancelInSeconds {
			cancelUrl := octopusURL.String() + "/api/" + space.ID + "/tasks/" + serverTaskId.(string) + "/cancel"
			request, _ := http.NewRequest("GET", cancelUrl, nil)
			request.Header.Set("X-Octopus-ApiKey", APIKey)
			response, err := httpClient.Do(request)

			if err != nil {
				log.Println(err)
			}
			fmt.Println(response)
		}
	}
}
```
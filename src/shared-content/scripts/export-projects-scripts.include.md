<details data-group="export-projects-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app/"
$octopusAPIKey = "API-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# Provide the space name for the projects to export.
$spaceName = "Default"
# Provide a list of project names to export.
$projectNames = @("Project A", "Project B")
# Provide a password for the export zip file
$exportTaskPassword = ""
# Wait for the export task to finish?
$exportTaskWaitForFinish = $True
# Provide a timeout for the export task to be canceled.
$exportTaskCancelInSeconds=300

$octopusURL = $octopusURL.TrimEnd('/')

# Get Space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }
$exportTaskSpaceId = $space.Id

$exportTaskProjectIds = @()

if (![string]::IsNullOrWhiteSpace($projectNames)) {
    @(($projectNames -Split "`n").Trim()) | ForEach-Object {
        if (![string]::IsNullOrWhiteSpace($_)) {
            Write-Verbose "Working on: '$_'"
            $projectName = $_.Trim()
            if([string]::IsNullOrWhiteSpace($projectName)) {
                throw "Project name is empty'"
            }
            $projects = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100" -Headers $header 
			$project = $projects.Items | Where-Object { $_.Name -eq $projectName }
            $exportTaskProjectIds += $project.Id
        }
    }
}

$exportBody = @{
    IncludedProjectIds = $exportTaskProjectIds;
    Password = @{
    	HasValue = $True;
        NewValue = $exportTaskPassword;
    }
}

$exportBodyAsJson = $exportBody | ConvertTo-Json
$exportBodyPostUrl = "$octopusURL/api/$($exportTaskSpaceId)/projects/import-export/export"
Write-Host "Kicking off export run by posting to $exportBodyPostUrl"
Write-Verbose "Payload: $exportBodyAsJson"
$exportResponse = Invoke-RestMethod $exportBodyPostUrl -Method POST -Headers $header -Body $exportBodyAsJson
$exportServerTaskId = $exportResponse.TaskId
Write-Host "The task id of the new task is $exportServerTaskId"
Write-Host "Export task was successfully invoked, you can access the task: $octopusURL/app#/$exportTaskSpaceId/tasks/$exportServerTaskId"

if ($exportTaskWaitForFinish -eq $true)
{
	Write-Host "The setting to wait for completion was set, waiting until task has finished"
    $startTime = Get-Date
    $currentTime = Get-Date
    $dateDifference = $currentTime - $startTime
    $taskStatusUrl = "$octopusURL/api/$exportTaskSpaceId/tasks/$exportServerTaskId"
    $numberOfWaits = 0    
    While ($dateDifference.TotalSeconds -lt $exportTaskCancelInSeconds)
    {
        Write-Host "Waiting 5 seconds to check status"
        Start-Sleep -Seconds 5
        $taskStatusResponse = Invoke-RestMethod $taskStatusUrl -Headers $header        
        $taskStatusResponseState = $taskStatusResponse.State
        if ($taskStatusResponseState -eq "Success")
        {
            Write-Host "The task has finished with a status of Success"
            $artifactsUrl= "$octopusURL/api/$exportTaskSpaceId/artifacts?regarding=$exportServerTaskId"
            Write-Host "Checking for artifacts from $artifactsUrl"
            $artifacts = Invoke-RestMethod $artifactsUrl -Method GET -Headers $header
            $exportArtifact = $artifacts.Items | Where-Object { $_.Filename -like "Octopus-Export-*.zip"} 
            Write-Host "Export task successfully completed, you can download the export archive: $octopusURL$($exportArtifact.Links.Content)"
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
    Write-Host "The cancel timeout has been reached, cancelling the export task"
    Invoke-RestMethod "$octopusURL/api/$exportTaskSpaceId/tasks/$exportTaskSpaceId/cancel" -Headers $header -Method Post | Out-Null
    Write-Host "Exiting with an error code of 1 because we reached the timeout"
    exit 1
}
```

</details>
<details data-group="export-projects-scripts">
<summary>Python3</summary>

```python
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

octopus_server_uri = 'https:/YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
project_names = ["MyProject"]
export_task_password = ""
export_task_wait_for_finish = True
export_task_cancel_in_seconds = 300

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Loop through projects
export_task_project_ids = []
uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)

for project_name in project_names:
    # Get project
    uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
    project = next((x for x in projects if x['Name'] == project_name), None)

    if project != None:
        # Add Id
        export_task_project_ids.append(project['Id'])

# Create export body
export_body = {
    'IncludedProjectIds': export_task_project_ids,
    'Password': {
        'HasValue': True,
        'NewValue': export_task_password
    }
}

# Start export task
uri = '{0}/api/{1}/projects/import-export/export'.format(octopus_server_uri, space['Id'])
print ('Kicking off export run by posting to {0}'.format(uri))
response = requests.post(uri, headers=headers, json=export_body)
response.raise_for_status()

# Get results of API call
results = json.loads(response.content.decode('utf-8'))

# Get the task Id
export_task_id = results['TaskId']
print ('The task id of the new task is {0}'.format(export_task_id))
print ('Export task was successfully invoked, you can access the task {0}/app#/{1}/tasks/{2}'.format(octopus_server_uri, space['Id'], export_task_id))


if export_task_wait_for_finish:
    print ('The setting to wait for completion was set, waiting until the task has finished')
    start_time = datetime.now()
    current_time = datetime.now()
    
    date_difference = current_time - start_time
    number_of_waits = 0

    while date_difference.seconds < export_task_cancel_in_seconds:
        print ('Waiting 5 seconds')
        time.sleep(5)
        uri = '{0}/api/{1}/tasks/{2}'.format(octopus_server_uri, space['Id'], export_task_id)
        response = requests.get(uri, headers=headers)
        response.raise_for_status()

        results = json.loads(response.content.decode('utf-8'))
        
        if results['State'] == 'Success':
            print ('The task has finished successfully')
            uri = '{0}/api/{1}/artifacts?regarding={2}'.format(octopus_server_uri, space['Id'], export_task_id)
            print ('Checking for artifacts from {0}'.format(uri))
            artifact = get_octopus_resource(uri, headers)
            print ('Export task successfully completed, you can download the export archive: {0}{1}'.format(octopus_server_uri, artifact[0]['Links']['Content']))
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
    uri = '{0}/api/{1}/tasks/{2}/cancel'.format(octopus_server_uri, space['Id'], export_task_id)
    response = requests.get(uri, headers=headers)
    response.raise_for_status()
```

</details>
<details data-group="export-projects-scripts">
<summary>Go</summary>

```go
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

type ExportProject struct {
	IncludedProjectIds []string
	Password           *octopusdeploy.SensitiveValue
}

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	projectNames := []string{"MyProject"}
	exportPassword := ""

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Loop through projects
	exportProjectIds := []string{}

	for i := 0; i < len(projectNames); i++ {
		// Get the project
		project := GetProject(apiURL, APIKey, space, projectNames[i])

		if project != nil {
			exportProjectIds = append(exportProjectIds, project.ID)
		}
	}

	// Build body
	password := octopusdeploy.NewSensitiveValue(exportPassword)
	exportObject := ExportProject{
		IncludedProjectIds: exportProjectIds,
		Password:           password,
	}

	// Export the projects
	ExportProjects(apiURL, APIKey, space, exportObject, true, 300)
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

func ExportProjects(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, exportProjects ExportProject, waitForFinish bool, exportTaskCancelInSeconds int) {
	// Create http client
	httpClient := &http.Client{}
	exportTaskUrl := octopusURL.String() + "/api/" + space.ID + "/projects/import-export/export"

	// Make request
	jsonBody, err := json.Marshal(exportProjects)
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
	fmt.Println("Export task was successfully invoked, you can access the task " + octopusURL.String() + "/app#/" + space.ID + "/tasks" + serverTaskId.(string))

	if waitForFinish {
		fmt.Println("The setting to wait for completion was set, waiting until the task has finished")

		elapsedSeconds := 0
		taskUrl := octopusURL.String() + "/api/" + space.ID + "/tasks/" + serverTaskId.(string)

		for elapsedSeconds < exportTaskCancelInSeconds {
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
				artifactUrl := octopusURL.String() + "/api/" + space.ID + "/artifacts?regarding=" + serverTaskId.(string)
				fmt.Println("Checking for artifacts from " + artifactUrl)

				request, _ := http.NewRequest("GET", artifactUrl, nil)
				request.Header.Set("X-Octopus-ApiKey", APIKey)
				response, err := httpClient.Do(request)

				if err != nil {
					log.Println(err)
				}

				responseData, err := ioutil.ReadAll(response.Body)
				var artifactRaw interface{}
				jsonErr := json.Unmarshal(responseData, &artifactRaw)
				if jsonErr != nil {
					log.Println(err)
				}

				artifactsRaw := artifactRaw.(map[string]interface{})
				returnedItems := artifactsRaw["Items"].([]interface{})[0].(map[string]interface{})

				fmt.Println("Export task successfully completed, you can download the export archive: " + octopusURL.String() + returnedItems["Links"].(map[string]interface{})["Content"].(string))
				break

			} else if taskStatus.(string) == "Failed" || taskStatus.(string) == "Cancelled" {
				fmt.Println("The task finished with a status of " + taskStatus.(string))
				break
			}
		}

		if elapsedSeconds >= exportTaskCancelInSeconds {
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

</details>

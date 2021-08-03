```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object { $_.Name -eq $spaceName }

# Get step templates
$templates = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/actiontemplates?take=250" -Headers $header)

mkdir "$PSScriptRoot/step-templates"

$templates.Items | ForEach-Object {
    $template = $_
    $name = $template.Name.Replace(" ", "-")
    Write-Host "Writing $PSScriptRoot/step-templates/$name.json"
    ($template | ConvertTo-Json) | Out-File -FilePath "$PSScriptRoot/step-templates/$name.json"
}
```
```powershell PowerShell (Octopus.Client)
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$exportPath = "path:\to\export-to"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Check to make sure folder exists
if ((Test-Path -Path $exportPath) -eq $false)
{
    # Create folder
    New-Item -Path $exportPath -ItemType Directory
}

# Get the templates
$templates = $repositoryForSpace.ActionTemplates.GetAll()

# Loop through templates
foreach ($template in $templates)
{
    $fileName = $template.Name.Replace(" ", "-")
    Write-Host "Writing $exportPath/$fileName.json"
    $template | ConvertTo-Json | Out-File -FilePath "$exportPath/$fileName.json"
}
```
```python Python3
import json
import requests
from requests.api import get, head
import re
import os
import string

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
space_name = "Default"
export_path = "path:\\to\\templates"

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get templates
uri = '{0}/api/{1}/actiontemplates'.format(octopus_server_uri, space['Id'])
action_templates = get_octopus_resource(uri, headers)

# Check to see if folder exists
if not os.path.isdir(export_path):
    os.makedirs(export_path)

# Loop through templates
for action_template in action_templates:
    fileName = str.replace(action_template['Name'], ' ', '-')
    print ('Writing {0}\\{1}.json'.format(export_path, fileName))
    with open("{0}\\{1}.json".format(export_path, fileName), "w") as outfile: 
        json.dump(action_template, outfile)
```
```go Go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/url"
	"os"
	"strings"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	exportPath := "path:\\to\\templates"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get action templates
	actionTemplates, err := client.ActionTemplates.GetAll()

	if err != nil {
		log.Println(err)
	}

	// Check to see if folder exists
	if !FolderExists(exportPath) {
		err := os.Mkdir(exportPath, 0755)
		if err != nil {
			log.Println(err)
		}
	}

	// Loop through action templates
	for i := 0; i < len(actionTemplates); i++ {
		fileName := strings.Replace(actionTemplates[i].Name, " ", "-", -1)

		jsonBody, err := json.Marshal(actionTemplates[i])
		if err != nil {
			log.Println(err)
		}

		byteReader := bytes.NewReader(jsonBody)

		// Create file
		out, err := os.Create(exportPath + "\\" + fileName + ".json")
		if err != nil {
			log.Println(err)
		}
		defer out.Close()

		// Write to file
		fmt.Println("Writing " + exportPath + "\\" + fileName + ".json")
		_, err = io.Copy(out, byteReader)
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

func FolderExists(folderPath string) bool {
	info, err := os.Stat(folderPath)
	if os.IsNotExist(err) {
		return false
	}
	return info.IsDir()
}
```
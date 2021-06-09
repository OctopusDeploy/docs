```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$projectName = "MyProject"
$projectEnabled = $False

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Get project
$projects = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100" -Headers $header 
$project = $projects.Items | Where-Object { $_.Name -eq $projectName }

# Enable/Disable project
$project.IsDisabled = !$projectEnabled

# Save project changes
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)" -Headers $header -Body ($project | ConvertTo-Json -Depth 10)
```
```python Python3
import json
import requests
import sys

# instantiate working variables
octopus_server_uri = 'http://your.octopus.app/'
octopus_api_key = 'API-YOURAPIKEY'
params = {'API-Key': octopus_api_key}
space_name = 'Default'
project_name = 'ProjectName'
#Set disable_proect to 'True' to disable | 'False' to enable.
disable_project = True

# Get Space
spaces = requests.get("{url}/api/spaces?partialName={space}&skip=0&take=100".format(url=octopus_server_uri, space=space_name), params)
spaces_data = json.loads(spaces.text)
for item in spaces_data['Items']:
    if item['Name'] == space_name:
        space = item
    else:
        sys.exit("The Space with name {spaceName} cannot be found.".format(spaceName=space_name))

# Get Project
projects = requests.get("{url}/api/{spaceID}/projects?partialName={projectName}&skip=0&take=100".format(url=octopus_server_uri, spaceID=space['Id'], projectName=project_name), params)
projects_data = json.loads(projects.text)
for item in projects_data['Items']:
    if item['Name'] == project_name:
        project = item
    else:
        sys.exit("Project with name {projectName} cannot be found.".format(projectName=project_name))

# Enable/Disable Project
project['IsDisabled'] = disable_project

# Save Changes
uri = "{url}/api/{spaceID}/projects/{projectID}".format(url=octopus_server_uri, spaceID=space['Id'], projectID=project['Id'])
change = requests.put(uri, headers={'X-Octopus-ApiKey': octopus_api_key}, data=json.dumps(project))
if change.status_code == 200:
	print("Request Successful.")
else:
	print("Error - Request Code: {code}".format(code=change.status_code))
```

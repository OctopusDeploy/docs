```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$stepName = "Run a script"
$environmentNames = @("Development", "Test")
$environments = @()

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get environments
$environments += (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name} | Select -Property Id

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Get project deployment process
$deploymentProcess = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header

# Get specific step
$step = $deploymentProcess.Steps | Where-Object {$_.Name -eq $stepName}

# Loop through the actions of the step and apply environment(s)
foreach ($action in $step.Actions)
{
    # Add/upate environment(s)
    $action.Environments += $environments.Id
}

# Update the deployment process
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header -Body ($deploymentProcess | ConvertTo-Json -Depth 10)
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path "path\to\Octopus.Client.dll"

$apikey = "API-YOURAPIKEY"
$octopusURL = "https://youroctourl"
$spaceName = "default"
$stepName = "Run a script"
$environmentNames = @("Development", "Test")
$projectName = "MyProject"

# Create endpoint and client
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $apikey
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    $repository = $client.ForSystem()

    # Get space specific repository and get all projects in space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)
    $project = $repositoryForSpace.Projects.FindByName($projectName)
    $environments = $repositoryForSpace.Environments.GetAll() | Where-Object {$environmentNames -contains $_.Name} | Select -Property Id

    # Get process
    $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

    # Get step
    $step = $deploymentProcess.Steps | Where-Object {$_.Name -eq $stepName}

    # Update the action
    foreach ($action in $step.Actions)
    {
        foreach ($id in $environments.Id)
        {
            $action.Environments.Add($id)
        }
    }

    # Update deployment process
    $repositoryForSpace.DeploymentProcesses.Modify($deploymentProcess)
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
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string projectName = "MyProject";
string[] environmentNames = { "Development", "Test" };
string stepName = "Run a script";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get environment ids
    List<string> environmentIds = new List<string>();
    foreach (var environmentName in environmentNames)
    {
        environmentIds.Add(repositoryForSpace.Environments.FindByName(environmentName).Id);
    }

    // Get project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get deployment process
    var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);

    // Get the step
    var step = deploymentProcess.Steps.Where(s => s.Name == stepName).FirstOrDefault();

    // Update the action
    foreach (var action in step.Actions)
    {
        foreach (string environmentId in environmentIds)
        {
            action.Environments.Add(environmentId);
        }
    }

    // Update the deployment process
    repositoryForSpace.DeploymentProcesses.Modify(deploymentProcess);
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

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}


def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()

    return json.loads(response.content.decode('utf-8'))


space_name = 'Default'
project_name = 'Your Project'
step_name = 'Your Step'
environment_names = ['Development', 'Test']
environments = []

spaces = get_octopus_resource('{0}/spaces/all'.format(octopus_server_uri))
space = next((x for x in spaces if x['Name'] == space_name), None)

environments = get_octopus_resource('{0}/{1}/environments/all'.format(octopus_server_uri, space['Id']))
environments = [e['Id'] for e in environments if e['Name'] in environment_names]

projects = get_octopus_resource('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']))
project = next((x for x in projects if x['Name'] == project_name), None)

uri = '{0}/{1}/deploymentprocesses/{2}'.format(octopus_server_uri, space['Id'], project['DeploymentProcessId'])
process = get_octopus_resource(uri)
step = next((s for s in process['Steps'] if s['Name'] == step_name), None)

for action in step['Actions']:
    new_environments = set(action['Environments'] + environments)
    action['Environments'] = list(new_environments)

response = requests.put(uri, headers=headers, json=process)
response.raise_for_status()
```

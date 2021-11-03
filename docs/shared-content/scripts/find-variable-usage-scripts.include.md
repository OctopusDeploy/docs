```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# Specify the Space to search in
$spaceName = "Default"

# Specify the Variable to find, without OctoStache syntax
# e.g. For #{MyProject.Variable} -> use MyProject.Variable
$variableToFind = "MyProject.Variable"

# Search through Project's Deployment Processes?
$searchDeploymentProcesses = $True

# Search through Project's Runbook Processes?
$searchRunbooksProcesses = $True

# Search through Variable Set values?
$searchVariableSets = $False

# Optional: set a path to export to csv
$csvExportPath = ""

$variableTracking = @()
$octopusURL = $octopusURL.TrimEnd('/')

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object { $_.Name -eq $spaceName }

Write-Host "Looking for usages of variable named $variableToFind in space: '$spaceName'"

# Get all projects
$projects = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

# Loop through projects
foreach ($project in $projects) {
    Write-Host "Checking project '$($project.Name)'"
    # Get project variables
    $projectVariableSet = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Headers $header

    # Check to see if variable is named in project variables.
    $matchingNamedVariables = $projectVariableSet.Variables | Where-Object { $_.Name -like "*$variableToFind*" }
    if ($null -ne $matchingNamedVariables) {
        foreach ($match in $matchingNamedVariables) {
            $result = [pscustomobject]@{
                Project           = $project.Name
                VariableSet       = $null
                MatchType         = "Named Project Variable"
                Context           = $match.Name
                Property          = $null
                AdditionalContext = $match.Value
                Link              = "$octopusURL$($project.Links.Web)/variables"
            }

            # Add and de-dupe later
            $variableTracking += $result
        }
    }

    # Check to see if variable is referenced in other project variable values.
    $matchingValueVariables = $projectVariableSet.Variables | Where-Object { $_.Value -like "*#{$variableToFind}*" }
    if ($null -ne $matchingValueVariables) {
        foreach ($match in $matchingValueVariables) {
            $result = [pscustomobject]@{
                Project           = $project.Name
                VariableSet       = $null
                MatchType         = "Referenced Project Variable"
                Context           = $match.Name
                Property          = $null
                AdditionalContext = $match.Value
                Link              = "$octopusURL$($project.Links.Web)/variables"
            }
            # Add and de-dupe later
            $variableTracking += $result
        }
    }

    # Search Deployment process if enabled
    if ($searchDeploymentProcesses -eq $True) {
        # Get project deployment process
        $deploymentProcess = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header)

        # Loop through steps
        foreach ($step in $deploymentProcess.Steps) {
            $props = $step | Get-Member | Where-Object { $_.MemberType -eq "NoteProperty" }
            foreach ($prop in $props) {
                $propName = $prop.Name
                $json = $step.$propName | ConvertTo-Json -Compress -Depth 10
                if ($null -ne $json -and ($json -like "*$variableToFind*")) {
                    $result = [pscustomobject]@{
                        Project           = $project.Name
                        VariableSet       = $null
                        MatchType         = "Step"
                        Context           = $step.Name
                        Property          = $propName
                        AdditionalContext = $null
                        Link              = "$octopusURL$($project.Links.Web)/deployments/process/steps?actionId=$($step.Actions[0].Id)"
                    }
                    # Add and de-dupe later
                    $variableTracking += $result
                }
            }
        }
    }

    # Search Runbook processes if enabled
    if ($searchRunbooksProcesses -eq $True) {

        # Get project runbooks
        $runbooks = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbooks?skip=0&take=5000" -Headers $header)

        # Loop through each runbook
        foreach ($runbook in $runbooks.Items) {
            # Get runbook process
            $runbookProcess = (Invoke-RestMethod -Method Get -Uri "$octopusURL$($runbook.Links.RunbookProcesses)" -Headers $header)

            # Loop through steps
            foreach ($step in $runbookProcess.Steps) {
                $props = $step | Get-Member | Where-Object { $_.MemberType -eq "NoteProperty" }
                foreach ($prop in $props) {
                    $propName = $prop.Name
                    $json = $step.$propName | ConvertTo-Json -Compress -Depth 10
                    if ($null -ne $json -and ($json -like "*$variableToFind*")) {
                        $result = [pscustomobject]@{
                            Project           = $project.Name
                            VariableSet       = $null
                            MatchType         = "Runbook Step"
                            Context           = $runbook.Name
                            Property          = $propName
                            AdditionalContext = $step.Name
                            Link              = "$octopusURL$($project.Links.Web)/operations/runbooks/$($runbook.Id)/process/$($runbook.RunbookProcessId)/steps?actionId=$($step.Actions[0].Id)"
                        }
                        # Add and de-dupe later
                        $variableTracking += $result
                    }
                }
            }
        }
    }
}

if ($searchVariableSets -eq $True) { 
    $VariableSets = (Invoke-RestMethod -Method Get "$OctopusURL/api/libraryvariablesets?contentType=Variables" -Headers $header).Items

    foreach ($VariableSet in $VariableSets) {
        Write-Host "Checking Variable Set: $($VariableSet.Name)"
        $variables = (Invoke-RestMethod -Method Get "$OctopusURL/$($VariableSet.Links.Variables)" -Headers $header).Variables | Where-Object { $_.Value -like "*#{$variableToFind}*" }
        $link = ($VariableSet.Links.Self -replace "/api", "app#") -replace "/libraryvariablesets/", "/library/variables/"
        foreach ($variable in $variables) {
            $result = [pscustomobject]@{
                Project           = $null
                VariableSet       = $VariableSet.Name
                MatchType         = "Variable Set"
                Context           = $variable.Name
                Property          = $null
                AdditionalContext = $variable.Value
                Link              = "$octopusURL$($link)"
            }

            # Add and de-dupe later
            $variableTracking += $result
        }
    }
}

# De-dupe
$variableTracking = @($variableTracking | Sort-Object -Property * -Unique)

if ($variableTracking.Count -gt 0) {
    Write-Host ""
    Write-Host "Found $($variableTracking.Count) results:"
    $variableTracking
    if (![string]::IsNullOrWhiteSpace($csvExportPath)) {
        Write-Host "Exporting results to CSV file: $csvExportPath"
        $variableTracking | Export-Csv -Path $csvExportPath -NoTypeInformation
    }
}
```
```powershell (Octopus.Client)
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$variableToFind = "MyProject.Variable"
$searchDeploymentProcesses = $true
$searchRunbookProcesses = $true
$csvExportPath = "path:\to\CSVFile.csv"

$variableTracking = @()


$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

Write-Host "Looking for usages of variable named $variableToFind in space $($space.Name)"

# Get all projects
$projects = $repositoryForSpace.Projects.GetAll()

# Loop through projects
foreach ($project in $projects)
{
    Write-Host "Checking $($project.Name)"
    
    # Get varaible set
    $projectVariableSet = $repositoryForSpace.VariableSets.Get($project.VariableSetId)
    
    # Find any name matches
    $matchingNamedVariable = $projectVariableSet.Variables | Where-Object {$_.Name -like "*$variableToFind*"}

    if ($null -ne $matchingNamedVariable)
    {
        foreach ($match in $matchingNamedVariable)
        {
            # Create new hashtable
            $result = [pscustomobject]@{
                Project = $project.Name
                MatchType = "Named Project Variable"
                Context = $match.Name
                Property = $null
                AdditionalContext = $match.Value
                Link = $project.Links["Variables"]
            }

            $variableTracking += $result
        }
    }

    # Find any value matches
    $matchingValueVariables = $projectVariableSet.Variables | Where-Object {$_.Value -like "*$variableToFind*"}

    if ($null -ne $matchingValueVariables)
    {
        foreach ($match in $matchingValueVariables)
        {
            $result = [pscustomobject]@{
                Project = $project.Name
                MatchType = "Referenced Project Variable"
                Context = $match.Name
                Property = $null
                AdditionalContext = $match.Value
                Link = $project.Links["Variables"]
            }

            $variableTracking += $result
        }
    }

    if ($searchDeploymentProcesses -eq $true)
    {
        if ($project.IsVersionControlled -ne $true)
        {
            # Get deployment process
            $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

            # Loop through steps
            foreach ($step in $deploymentProcess.Steps)
            {               
                foreach ($action in $step.Actions)
                {
                    foreach ($property in $action.Properties.Keys)
                    {
                        if ($action.Properties[$property].Value -like "*$variableToFind*")
                        {
                            $result = [pscustomobject]@{
                                Project = $project.Name
                                MatchType = "Step"
                                Context = $step.Name
                                Property = $property
                                AdditionalContext = $null
                                Link = "$octopusURL$($project.Links.Web)/deployments/process/steps?actionid=$($action.Id)"
                            }

                            $variableTracking += $result
                        }
                    }
                }
            }
        }
        else
        {
            Write-Host "$($project.Name) is version controlled, skipping searching the deployment process."
        }
    }

    if ($searchRunbookProcesses -eq $true)
    {
        # Get project runbooks
        $runbooks = $repositoryForSpace.Projects.GetAllRunbooks($project)

        # Loop through runbooks
        foreach ($runbook in $runbooks)
        {
            # Get Runbook process
            $runbookProcess = $repositoryForSpace.RunbookProcesses.Get($runbook.RunbookProcessId)

            foreach ($step in $runbookProcess.Steps)
            {
                foreach ($action in $step.Actions)
                {
                    foreach ($proprety in $action.Properties.Keys)
                    {
                        if ($action.Properties[$property].Value -like "*$variableToFind*")
                        {
                            $result = [pscustomobject]@{
                                Project = $project.Name
                                MatchType = "Runbook Step"
                                Context = $runbook.Name
                                Property = $property
                                AdditionalContext = $step.Name
                                Link = "$octopusURL$($project.Links.Web)/operations/runbooks/$($runbook.Id)/process/$($runbook.RunbookProcessId)/steps?actionId=$($action.Id)"
                            }

                            $variableTracking += $result                            
                        }
                    }
                }
            }
        }
    }
}

# De-duplicate
$variableTracking = @($variableTracking | Sort-Object -Property * -Unique)

if ($variableTracking.Count -gt 0)
{
    Write-Host ""
    Write-Host "Found $($variableTracking.Count) results:"
    $variableTracking

    if(![string]::IsNullOrWhiteSpace($csvExportPath)) 
    {
        Write-Host "Exporting results to CSV file: $csvExportPath"
        $variableTracking | Export-Csv -Path $csvExportPath -NoTypeInformation
    }
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using System.Linq;

class VariableResult
{
    // Define private variables
    
    public string Project
    {
        get;
        set;
    }

    public string MatchType
    {
        get; set;
    }

    public string Context
    {
        get;set;
    }

    public string Property
    {
        get;set;
    }

    public string AdditionalContext
    {
        get;set;
    }

    public string Link
    {
        get;
        set;
    }
}

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
var spaceName = "Default";
string variableToFind = "MyProject.Variable";
bool searchDeploymentProcess = true;
bool searchRunbookProcess = true;
string csvExportPath = "path:\\to\\variable.csv";

System.Collections.Generic.List<VariableResult> variableTracking = new System.Collections.Generic.List<VariableResult>();

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get space repository
var space = repository.Spaces.FindByName(spaceName);
var repositoryForSpace = client.ForSpace(space);

Console.WriteLine(string.Format("Looking for usages of variable named {0} in space {1}", variableToFind, space.Name));

// Get all projects
var projects = repositoryForSpace.Projects.GetAll();

// Loop through projects
foreach (var project in projects)
{
    Console.WriteLine(string.Format("Checking {0}", project.Name));

    // Get the project variable set
    var projectVariableSet = repositoryForSpace.VariableSets.Get(project.VariableSetId);

    var matchingNameVariable = projectVariableSet.Variables.Where(v => v.Name.ToLower().Contains(variableToFind.ToLower()));

    // Match on name
    if (matchingNameVariable != null)
    {
        // Loop through results
        foreach (var match in matchingNameVariable)
        {
            VariableResult result = new VariableResult();
            result.Project = project.Name;
            result.MatchType = "Named Project Variable";
            result.Context = match.Name;
            result.Property = null;
            result.AdditionalContext = match.Value;
            result.Link = project.Links["Variables"];

            if (!variableTracking.Contains(result))
            {
                variableTracking.Add(result);
            }
        }
    }

    // Match on value
    var matchingValueVariable = projectVariableSet.Variables.Where(v => v.Value != null && v.Value.ToLower().Contains(variableToFind.ToLower()));

    if (matchingValueVariable != null)
    {
        // Loop through results
        foreach (var match in matchingValueVariable)
        {
            VariableResult result = new VariableResult();
            result.Project = project.Name;
            result.MatchType = "Referenced Project Variable";
            result.Context = match.Name;
            result.Property = null;
            result.AdditionalContext = match.Value;
            result.Link = project.Links["Variables"];

            if (!variableTracking.Contains(result))
            {
                variableTracking.Add(result);
            }
        }
    }

    if (searchDeploymentProcess)
    {
        if(!project.IsVersionControlled)
        {
            // Get deployment process
            var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);

            // Loop through steps
            foreach (var step in deploymentProcess.Steps)
            {
                // Loop through actions
                foreach (var action in step.Actions)
                {
                    // Loop through properties
                    foreach (var property in action.Properties.Keys)
                    {
                        if (action.Properties[property].Value != null && action.Properties[property].Value.ToLower().Contains(variableToFind.ToLower()))
                        {
                            VariableResult result = new VariableResult();
                            result.Project = project.Name;
                            result.MatchType = "Step";
                            result.Context = step.Name;
                            result.Property = property;
                            result.AdditionalContext = null;
                            result.Link = string.Format("{0}{1}/deployments/process/steps?actionid={2}", octopusURL, project.Links["Web"], action.Id);

                            if (!variableTracking.Contains(result))
                            {
                                variableTracking.Add(result);
                            }
                        }
                    }
                }
            }
        }
        else
        {
            Console.WriteLine(string.Format("{0} is version controlled, skipping searching the deployment process.", project.Name));
        }
    }

    if (searchRunbookProcess)
    {
        // Get project runbooks
        var runbooks = repositoryForSpace.Projects.GetAllRunbooks(project);

        // Loop through runbooks
        foreach (var runbook in runbooks)
        {
            // Get runbook process
            var runbookProcess = repositoryForSpace.RunbookProcesses.Get(runbook.RunbookProcessId);

            // Loop through steps
            foreach (var step in runbookProcess.Steps)
            {
                foreach (var action in step.Actions)
                {
                    foreach (var property in action.Properties.Keys)
                    {
                        if (action.Properties[property].Value != null && action.Properties[property].Value.ToLower().Contains(variableToFind.ToLower()))
                        {
                            VariableResult result = new VariableResult();
                            result.Project = project.Name;
                            result.MatchType = "Runbook Step";
                            result.Context = runbook.Name;
                            result.Property = property;
                            result.AdditionalContext = step.Name;
                            result.Link = string.Format("{0}{1}/operations/runbooks/{2}/process/{3}/steps?actionId={4}", octopusURL, project.Links["Web"], runbook.Id, runbookProcess.Id, action.Id);

                            if (!variableTracking.Contains(result))
                            {
                                variableTracking.Add(result);
                            }
                        }
                    }
                }
            }
        }
    }
}

Console.WriteLine(string.Format("Found {0} results", variableTracking.Count.ToString()));

if (variableTracking.Count > 0)
{    
    foreach (var result in variableTracking)
    {
        System.Collections.Generic.List<string> row = new System.Collections.Generic.List<string>();
        bool isFirstRow = false;
        if (variableTracking.IndexOf(result) == 0)
        {
            isFirstRow = true;
        }

        foreach (var property in result.GetType().GetProperties())
        {
            Console.WriteLine(string.Format("{0}: {1}", property.Name, property.GetValue(result)));
            if (isFirstRow)
            {
                row.Add(property.Name);
            }
            else
            {
                row.Add((property.GetValue(result) == null ? string.Empty : property.GetValue(result).ToString()));
            }
        }

        if (!string.IsNullOrWhiteSpace(csvExportPath))
        {
            using (System.IO.StreamWriter csvFile = new System.IO.StreamWriter(csvExportPath, true))
            {
                // Write header
                csvFile.WriteLine(string.Join(",", row.ToArray()));
            }
        }

    }
}

```
```python Python3
import json
import requests
import csv

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()

    return json.loads(response.content.decode('utf-8'))

def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)

# Specify the Space to search in
space_name = 'Default'

# Specify the Variable to find, without OctoStache syntax 
# e.g. For #{MyProject.Variable} -> use MyProject.Variable
variable_name = 'MyProject.Variable'

# Search through Project's Deployment Processes?
search_deployment_processes = True

# Search through Project's Runbook Processes?
search_runbook_processes = True

# Optional: set a path to export to csv
csv_export_path = ''

variable_tracker = []
octopus_server_uri = octopus_server_uri.rstrip('/')
octopus_server_baselink_uri = octopus_server_uri.rstrip('api')

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
print('Looking for usages of variable named \'{0}\' in space \'{1}\''.format(variable_name, space_name))

projects = get_octopus_resource('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']))

for project in projects:
    project_name = project['Name']
    project_web_uri = project['Links']['Web'].lstrip('/')
    print('Checking project \'{0}\''.format(project_name))
    project_variable_set = get_octopus_resource('{0}/{1}/variables/{2}'.format(octopus_server_uri, space['Id'], project['VariableSetId']))
    
    # Check to see if variable is named in project variables.
    matching_named_variables = [variable for variable in project_variable_set['Variables'] if variable_name in variable['Name']]
    if matching_named_variables is not None:
        for variable in matching_named_variables:
            tracked_variable = {
                'Project': project_name,
                'MatchType': 'Named Project Variable',
                'Context': variable['Name'],
                'AdditionalContext': None,
                'Property': None,
                'Link': '{0}{1}/variables'.format(octopus_server_baselink_uri, project_web_uri)
            }
            if tracked_variable not in variable_tracker:
                variable_tracker.append(tracked_variable)
    
    # Check to see if variable is referenced in other project variable values.
    matching_value_variables = [variable for variable in project_variable_set['Variables'] if variable['Value'] is not None and variable_name in variable['Value']]
    if matching_value_variables is not None:
        for variable in matching_value_variables:
            tracked_variable = {
                'Project': project_name,
                'MatchType': 'Referenced Project Variable',
                'Context': variable['Name'],
                'AdditionalContext': variable['Value'],
                'Property': None,
                'Link': '{0}{1}/variables'.format(octopus_server_baselink_uri, project_web_uri)
            }
            if tracked_variable not in variable_tracker:
                variable_tracker.append(tracked_variable)
    
    # Search Deployment process if enabled
    if search_deployment_processes == True:
        deployment_process = get_octopus_resource('{0}/{1}/deploymentprocesses/{2}'.format(octopus_server_uri, space['Id'], project['DeploymentProcessId']))
        for step in deployment_process['Steps']:
            for step_key in step.keys():
                step_property_value = str(step[step_key])
                if step_property_value is not None and variable_name in step_property_value:
                    tracked_variable = {
                        'Project': project_name,
                        'MatchType': 'Step',
                        'Context': step['Name'],
                        'Property': step_key,
                        'AdditionalContext': None,
                        'Link': '{0}{1}/deployments/process/steps?actionId={2}'.format(octopus_server_baselink_uri, project_web_uri, step['Actions'][0]['Id'])
                    }
                    if tracked_variable not in variable_tracker:
                        variable_tracker.append(tracked_variable)

    # Search Runbook processes if configured
    if search_runbook_processes == True:
        runbooks_resource = get_octopus_resource('{0}/{1}/projects/{2}/runbooks?skip=0&take=5000'.format(octopus_server_uri, space['Id'], project['Id']))
        runbooks = runbooks_resource['Items']
        for runbook in runbooks:
            runbook_processes_link = runbook['Links']['RunbookProcesses']
            runbook_process = get_octopus_resource('{0}/{1}'.format(octopus_server_baselink_uri, runbook_processes_link))
            for step in runbook_process['Steps']:
                for step_key in step.keys():
                    step_property_value = str(step[step_key])
                    if step_property_value is not None and variable_name in step_property_value:
                        tracked_variable = {
                            'Project': project_name,
                            'MatchType': 'Runbook Step',
                            'Context': runbook['Name'],
                            'Property': step_key,
                            'AdditionalContext': step['Name'],
                            'Link': '{0}{1}/operations/runbooks/{2}/process/{3}/steps?actionId={4}'.format(octopus_server_baselink_uri, project_web_uri, runbook['Id'], runbook['RunbookProcessId'], step['Actions'][0]['Id'])
                        }
                        if tracked_variable not in variable_tracker:
                            variable_tracker.append(tracked_variable)               

results_count = len(variable_tracker)
if results_count > 0:
    print('')    
    print('Found {0} results:'.format(results_count))
    for tracked_variable in variable_tracker:
        print('Project           : {0}'.format(tracked_variable['Project']))
        print('MatchType         : {0}'.format(tracked_variable['MatchType']))
        print('Context           : {0}'.format(tracked_variable['Context']))
        print('AdditionalContext : {0}'.format(tracked_variable['AdditionalContext']))
        print('Property          : {0}'.format(tracked_variable['Property']))
        print('Link              : {0}'.format(tracked_variable['Link']))
        print('')
    if csv_export_path:
        with open(csv_export_path, mode='w') as csv_file:
            fieldnames = ['Project', 'MatchType', 'Context', 'AdditionalContext', 'Property', 'Link']
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()
            for tracked_variable in variable_tracker:
                writer.writerow(tracked_variable)
```
```go Go
package main

import (
	"bufio"
	"fmt"
	"log"
	"net/url"
	"os"
	"reflect"
	"strconv"
	"strings"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

type VariableResult struct {
	Project           string
	MatchType         string
	Context           string
	Property          string
	AdditionalContext string
	Link              string
}

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	variableToFind := "MyProject.Variable"
	searchDeploymentProcess := true
	searchRunbookProcess := true
	csvExportPath := "path:\\to\\variable.csv"

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	// Get space
    space := GetSpace(apiURL, APIKey, spaceName)

	client = octopusAuth(apiURL, APIKey, space.ID)

	variableTracking := []VariableResult{}

	// Get projects
	projects, err := client.Projects.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Loop through projects
	for _, project := range projects {
		fmt.Printf("Checking %[1]s \n", project.Name)

		// Get variables
		projectVariables, err := client.Variables.GetAll(project.ID)

		if err != nil {
			log.Println(err)
		}

		for _, variable := range projectVariables.Variables {
			nameMatch := strings.Contains(variable.Name, variableToFind)
			if err != nil {
				log.Println(err)

			}

			if nameMatch {
				result := VariableResult{}
				result.Project = project.Name
				result.MatchType = "Named Project Variable"
				result.Context = variable.Name
				result.Property = ""
				result.AdditionalContext = variable.Value
				result.Link = project.Links["Variables"]

				if !arrayContains(variableTracking, result) {
					variableTracking = append(variableTracking, result)
				}

			}

			valueMatch := strings.Contains(variable.Value, variableToFind)
			if err != nil {
				log.Println(err)
			}

			if valueMatch {
				result := VariableResult{}
				result.Project = project.Name
				result.MatchType = "Referenced Project Variable"
				result.Context = variable.Name
				result.Property = ""
				result.AdditionalContext = variable.Value
				result.Link = project.Links["Variables"]

				if !arrayContains(variableTracking, result) {
					variableTracking = append(variableTracking, result)
				}

			}
		}

		if searchDeploymentProcess {
			if !project.IsVersionControlled {
				// Get deployment process
				deploymentProcess, err := client.DeploymentProcesses.GetByID(project.DeploymentProcessID)
				if err != nil {
					log.Println(err)
				}

				for _, step := range deploymentProcess.Steps {
					for _, action := range step.Actions {
						for property := range action.Properties {
							if strings.Contains(action.Properties[property].Value, variableToFind) {
								result := VariableResult{}
								result.Project = project.Name
								result.MatchType = "Step"
								result.Context = step.Name
								result.Property = property
								result.AdditionalContext = ""
								result.Link = apiURL.String() + project.Links["Web"] + "/deployments/process/stesp?actionId=" + action.ID

								if !arrayContains(variableTracking, result) {
									variableTracking = append(variableTracking, result)
								}
							}
						}
					}
				}
			} else {
				fmt.Printf("%[1]s is version controlled, skipping searching deployment process", project.Name)
			}
		}

		if searchRunbookProcess {
			// Get project runbooks
			runbooks := GetRunbooks(client, project)

			// Loop through runbooks
			for _, runbook := range runbooks {
				// Get runbook process
				runbookProcess, err := client.RunbookProcesses.GetByID(runbook.RunbookProcessID)
				if err != nil {
					log.Println(err)
				}

				for _, step := range runbookProcess.Steps {
					for _, action := range step.Actions {
						for property := range action.Properties {
							if strings.Contains(action.Properties[property].Value, variableToFind) {
								result := VariableResult{}
								result.Project = project.ID
								result.MatchType = "Runbook Step"
								result.Context = runbook.Name
								result.Property = property
								result.AdditionalContext = step.Name
								result.Link = apiURL.String() + project.Links["Web"] + "/operations/runbooks/" + runbook.ID + "/process/" + runbook.RunbookProcessID + "/steps?actionId=" + action.ID

								if !arrayContains(variableTracking, result) {
									variableTracking = append(variableTracking, result)
								}
							}
						}
					}
				}
			}
		}
	}

	if len(variableTracking) > 0 {
		fmt.Printf("Found %[1]s results \n", strconv.Itoa(len(variableTracking)))

		for i := 0; i < len(variableTracking); i++ {
			row := []string{}
            header := []string{}
			isFirstRow := false
			if i == 0 {
				isFirstRow = true
			}

			e := reflect.ValueOf(&variableTracking[i]).Elem()
			for j := 0; j < e.NumField(); j++ {
				if isFirstRow {
					header = append(header, e.Type().Field(j).Name)
				}
				row = append(row, e.Field(j).Interface().(string))
			}

			if csvExportPath != "" {
				file, err := os.OpenFile(csvExportPath, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
				if err != nil {
					log.Println(err)
				}

				dataWriter := bufio.NewWriter(file)
				if isFirstRow {
					dataWriter.WriteString(strings.Join(header, ",") + "\n")
				}
				dataWriter.WriteString(strings.Join(row, ",") + "\n")
				dataWriter.Flush()
				file.Close()
			}

		}
	}
}

func octopusAuth(octopusURL *url.URL, APIKey, space string) *octopusdeploy.Client {
	client, err := octopusdeploy.NewClient(nil, octopusURL, APIKey, space)
	if err != nil {
		log.Println(err)
	}

	return client
}

func arrayContains(array []VariableResult, result VariableResult) bool {
	for _, v := range array {
		if v == result {
			return true
		}
	}

	return false
}

func GetRunbooks(client *octopusdeploy.Client, project *octopusdeploy.Project) []*octopusdeploy.Runbook {
	// Get runbook
	runbooks, err := client.Runbooks.GetAll()
	projectRunbooks := []*octopusdeploy.Runbook{}

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(runbooks); i++ {
		if runbooks[i].ProjectID == project.ID {
			projectRunbooks = append(projectRunbooks, runbooks[i])
		}
	}

	return projectRunbooks
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
```
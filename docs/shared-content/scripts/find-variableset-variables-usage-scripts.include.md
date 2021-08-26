```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# Specify the Space to search in
$spaceName = "Default"

# Specify the name of the Library VariableSet to use to find variables usage of
$variableSetVariableUsagesToFind = "My-Variable-Set"

# Search through Project's Deployment Processes?
$searchDeploymentProcesses = $True

# Search through Project's Runbook Processes?
$searchRunbooksProcesses = $True

# Optional: set a path to export to csv
$csvExportPath = ""

$variableTracking = @()
$octopusURL = $octopusURL.TrimEnd('/')

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get first matching variableset record
$libraryVariableSet = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets/all" -Headers $header) | Where-Object {$_.Name -eq $variableSetVariableUsagesToFind} | Select-Object -First 1

# Get variables for library variable set
$variableSet  = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/variables/$($libraryVariableSet.VariableSetId)" -Headers $header)
$variables = $variableSet.Variables

Write-Host "Looking for usages of variables from variable set '$variableSetVariableUsagesToFind' in space: '$spaceName'"

# Get all projects
$projects = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

# Loop through projects
foreach ($project in $projects)
{
    Write-Host "Checking project '$($project.Name)'"
    
    # Get project variables
    $projectVariableSet = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Headers $header
    
    # Check to see if there are any project variable values that reference any of the library set variables.
    foreach($variable in $variables) {
        
        $matchingValueVariables = $projectVariableSet.Variables | Where-Object {$_.Value -like "*$($variable.Name)*"}

        if($null -ne $matchingValueVariables) {
            foreach($match in $matchingValueVariables) {
                $result = [pscustomobject]@{
                    Project = $project.Name
                    MatchType = "Referenced Project Variable"
                    VariableSetVariable = $variable.Name
                    Context = $match.Name
                    AdditionalContext = $match.Value
                    Property = $null
                    Link = "$octopusURL$($project.Links.Web)/variables"
                }
                # Add and de-dupe later
                $variableTracking += $result
            }
        }
    }

    # Search Deployment process if configured
    if($searchDeploymentProcesses -eq $True) {

        # Get project deployment process
        $deploymentProcess = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header)

        # Loop through steps
        foreach($step in $deploymentProcess.Steps)
        {
            $props = $step | Get-Member | Where-Object {$_.MemberType -eq "NoteProperty"}
            foreach($prop in $props) 
            {
                $propName = $prop.Name                
                $json = $step.$propName | ConvertTo-Json -Compress
                
                # Check to see if any of the variableset variables are referenced in this step's properties
                foreach($variable in $variables)
                {
                    if($null -ne $json -and ($json -like "*$($variable.Name)*")) {
                        $result = [pscustomobject]@{
                            Project = $project.Name
                            MatchType= "Step"
                            VariableSetVariable = $variable.Name
                            Context = $step.Name
                            AdditionalContext = $null
                            Property = $propName
                            Link = "$octopusURL$($project.Links.Web)/deployments/process/steps?actionId=$($step.Actions[0].Id)"
                        }
                        # Add and de-dupe later
                        $variableTracking += $result
                    }
                }
            }
        }
    }

    # Search Runbook processes if configured
    if($searchRunbooksProcesses -eq $True) {
        
        # Get project runbooks
        $runbooks = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbooks?skip=0&take=5000" -Headers $header)

        # Loop through each runbook
        foreach($runbook in $runbooks.Items)
        {
            # Get runbook process
            $runbookProcess = (Invoke-RestMethod -Method Get -Uri "$octopusURL$($runbook.Links.RunbookProcesses)" -Headers $header)
            
            # Loop through steps
            foreach($step in $runbookProcess.Steps)
            {
                $props = $step | Get-Member | Where-Object {$_.MemberType -eq "NoteProperty"}
                foreach($prop in $props) 
                {
                    $propName = $prop.Name                
                    $json = $step.$propName | ConvertTo-Json -Compress
                    
                    # Check to see if any of the variableset variables are referenced in this runbook step's properties
                    foreach($variable in $variables)
                    {
                        if($null -ne $json -and ($json -like "*$($variable.Name)*")) {
                            $result = [pscustomobject]@{
                                Project = $project.Name
                                MatchType= "Runbook Step"
                                VariableSetVariable = $variable.Name
                                Context = $runbook.Name
                                AdditionalContext = $step.Name
                                Property = $propName
                                Link = "$octopusURL$($project.Links.Web)/operations/runbooks/$($runbook.Id)/process/$($runbook.RunbookProcessId)/steps?actionId=$($step.Actions[0].Id)"
                            }
                            # Add and de-dupe later
                            $variableTracking += $result
                        }
                    }
                }
            }
        }
    }
}

# De-dupe
$variableTracking = $variableTracking | Sort-Object -Property * -Unique

if($variableTracking.Count -gt 0) {
    Write-Host ""
    Write-Host "Found $($variableTracking.Count) results:"
    if (![string]::IsNullOrWhiteSpace($csvExportPath)) {
        Write-Host "Exporting results to CSV file: $csvExportPath"
        $variableTracking | Export-Csv -Path $csvExportPath -NoTypeInformation
    }
}
```
```powershell PowerShell (Octopus.Client)
$ErrorActionPreference = "Stop";

# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'


# Define working variables
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$searchDeploymentProcesses = $true
$searchRunbookProcesses = $true
$csvExportPath = "path:\to\variable.csv"


# Specify the name of the Library VariableSet to use to find variables usage of
$variableSetVariableUsagesToFind = "My-Variable-Set"

# Search through Project's Deployment Processes?
$searchDeploymentProcesses = $True

# Search through Project's Runbook Processes?
$searchRunbooksProcesses = $True



$variableTracking = @()

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Get first matching variableset record
$libraryVariableSet = $repositoryForSpace.LibraryVariableSets.FindByName($variableSetVariableUsagesToFind)

# Get variables for library variable set
$variableSet = $repositoryForSpace.VariableSets.Get($libraryVariableSet.VariableSetId)
$variables = $variableSet.Variables



Write-Host "Looking for usages of variables from variable set '$variableSetVariableUsagesToFind' in space: '$spaceName'"

# Get all projects
$projects = $repositoryForSpace.Projects.GetAll()

# Loop through projects
foreach ($project in $projects)
{
    Write-Host "Checking project '$($project.Name)'"
    
    # Get project variables
    $projectVariableSet = $repositoryForSpace.VariableSets.Get($project.VariableSetId)
    
    # Check to see if there are any project variable values that reference any of the library set variables.
    foreach($variable in $variables) {
        
        $matchingValueVariables = $projectVariableSet.Variables | Where-Object {$_.Value -like "*$($variable.Name)*"}

        if($null -ne $matchingValueVariables) {
            foreach($match in $matchingValueVariables) {
                $result = [pscustomobject]@{
                    Project = $project.Name
                    MatchType = "Referenced Project Variable"
                    VariableSetVariable = $variable.Name
                    Context = $match.Name
                    AdditionalContext = $match.Value
                    Property = $null
                    Link = "$octopusURL$($project.Links.Web)/variables"
                }
                # Add and de-dupe later
                $variableTracking += $result
            }
        }
    }

    # Search Deployment process if configured
    if($searchDeploymentProcesses -eq $True -and $project.IsVersionControlled -ne $true) {

        # Get project deployment process
        $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

        # Loop through steps
        foreach($step in $deploymentProcess.Steps)
        {
            foreach ($action in $step.Actions)
            {
                foreach ($property in $action.Properties.Keys)
                {
                    foreach ($variable in $variables)
                    {
                        if ($action.Properties[$property].Value -like "*$($variable.Name)*")
                        {
                            $result = [pscustomobject]@{
                                Project = $project.Name
                                MatchType= "Step"
                                VariableSetVariable = $variable.Name
                                Context = $step.Name
                                AdditionalContext = $null
                                Property = $propName
                                Link = "$octopusURL$($project.Links.Web)/deployments/process/steps?actionId=$($step.Actions[0].Id)"
                            }
                            # Add and de-dupe later
                            $variableTracking += $result

                        }
                    }
                }
            }
        }
    }

    # Search Runbook processes if configured
    if($searchRunbooksProcesses -eq $True) {
        
        # Get project runbooks
        $runbooks = $repositoryForSpace.Projects.GetAllRunbooks($project)

        # Loop through each runbook
        foreach($runbook in $runbooks)
        {
            # Get runbook process
            $runbookProcess = $repositoryForSpace.RunbookProcesses.Get($runbook.RunbookProcessId)
            
            # Loop through steps
            foreach($step in $runbookProcess.Steps)
            {
                foreach ($action in $step.Actions)
                {
                    foreach ($property in $action.Properties.Keys)
                    {
                        foreach ($variable in $variables)
                        {
                            if ($action.Properties[$property].Value -like "*$($variable.Name)*")
                            {
                                $result = [pscustomobject]@{
                                    Project = $project.Name
                                    MatchType= "Runbook Step"
                                    VariableSetVariable = $variable.Name
                                    Context = $runbook.Name
                                    AdditionalContext = $step.Name
                                    Property = $propName
                                    Link = "$octopusURL$($project.Links.Web)/operations/runbooks/$($runbook.Id)/process/$($runbook.RunbookProcessId)/steps?actionId=$($step.Actions[0].Id)"
                                }
                                # Add and de-dupe later
                                $variableTracking += $result
                            }
                        }
                    }
                }                
            }
        }
    }
}

# De-dupe
$variableTracking = $variableTracking | Sort-Object -Property * -Unique

if($variableTracking.Count -gt 0) {
    Write-Host ""
    Write-Host "Found $($variableTracking.Count) results:"
    if (![string]::IsNullOrWhiteSpace($csvExportPath)) {
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
        get; set;
    }

    public string Property
    {
        get; set;
    }

    public string AdditionalContext
    {
        get; set;
    }

    public string Link
    {
        get;
        set;
    }

    public string VariableSetVariable
    {
        get;set;
    }
}

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
var spaceName = "Default";
string variableSetVariableUsagesToFind = "My-Variable-Set";
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

// Get library set
var librarySet = repositoryForSpace.LibraryVariableSets.FindByName(variableSetVariableUsagesToFind);

// Get variables
var variableSet = repositoryForSpace.VariableSets.Get(librarySet.VariableSetId);
var variables = variableSet.Variables;

Console.WriteLine(string.Format("Looking for usages of variables from variable set {0} in space {1}", variableSetVariableUsagesToFind, space.Name));

// Get all projects
var projects = repositoryForSpace.Projects.GetAll();

// Loop through projects
foreach (var project in projects)
{
    Console.WriteLine(string.Format("Checking {0}", project.Name));

    // Get the project variable set
    var projectVariableSet = repositoryForSpace.VariableSets.Get(project.VariableSetId);

    // Loop through variables
    foreach (var variable in variables)
    {
        var matchingValueVariables = projectVariableSet.Variables.Where(v => v.Value != null && v.Value.ToLower().Contains(variable.Name.ToLower()));

        if (matchingValueVariables != null)
        {
            foreach (var match in matchingValueVariables)
            {
                VariableResult result = new VariableResult();
                result.Project = project.Name;
                result.MatchType = "Referenced Project Variable";
                result.VariableSetVariable = variable.Name;
                result.Context = match.Name;
                result.Property = null;
                result.AdditionalContext = match.Value;
                result.Link = project.Links["Variables"];

                //if (!variableTracking.Contains(result))
                if (!variableTracking.Any(r => r.Project == result.Project && r.MatchType == result.MatchType && r.VariableSetVariable == result.VariableSetVariable && r.Context == result.Context && r.Property == result.Property && r.AdditionalContext == result.AdditionalContext && r.Link == result.Link))
                {
                    variableTracking.Add(result);
                }
            }
        }
    }

    if (searchDeploymentProcess)
    {
        if (!project.IsVersionControlled)
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
                        // Loop through variables
                        foreach (var variable in variables)
                        {
                            if (action.Properties[property].Value != null && action.Properties[property].Value.ToLower().Contains(variable.Name.ToLower()))
                            {
                                VariableResult result = new VariableResult();
                                result.Project = project.Name;
                                result.MatchType = "Step";
                                result.VariableSetVariable = variable.Name;
                                result.Context = step.Name;
                                result.Property = property;
                                result.AdditionalContext = null;
                                result.Link = string.Format("{0}{1}/deployments/process/steps?actionid={2}", octopusURL, project.Links["Web"], action.Id);

                                //if (!variableTracking.Contains(result))
                                if (!variableTracking.Any(r => r.Project == result.Project && r.MatchType == result.MatchType && r.VariableSetVariable == result.VariableSetVariable && r.Context == result.Context && r.Property == result.Property && r.AdditionalContext == result.AdditionalContext && r.Link == result.Link))
                                {
                                    variableTracking.Add(result);
                                }
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
                        foreach (var variable in variables)
                        {
                            if (action.Properties[property].Value != null && action.Properties[property].Value.ToLower().Contains(variable.Name.ToLower()))
                            {
                                VariableResult result = new VariableResult();
                                result.Project = project.Name;
                                result.MatchType = "Runbook Step";
                                result.VariableSetVariable = variable.Name;
                                result.Context = runbook.Name;
                                result.Property = property;
                                result.AdditionalContext = step.Name;
                                result.Link = string.Format("{0}{1}/operations/runbooks/{2}/process/{3}/steps?actionId={4}", octopusURL, project.Links["Web"], runbook.Id, runbookProcess.Id, action.Id);

                                //if (!variableTracking.Contains(result))
                                if (!variableTracking.Any(r => r.Project == result.Project && r.MatchType == result.MatchType && r.VariableSetVariable == result.VariableSetVariable && r.Context == result.Context && r.Property == result.Property && r.AdditionalContext == result.AdditionalContext && r.Link == result.Link))
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
}

Console.WriteLine(string.Format("Found {0} results", variableTracking.Count.ToString()));

if (variableTracking.Count > 0)
{
    foreach (var result in variableTracking)
    {
        System.Collections.Generic.List<string> row = new System.Collections.Generic.List<string>();
        System.Collections.Generic.List<string> header = new System.Collections.Generic.List<string>();
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
                header.Add(property.Name);
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
                if (isFirstRow)
                {
                    // Write header
                    csvFile.WriteLine(string.Join(",", header.ToArray()));
                }
                csvFile.WriteLine(string.Join(",", row.ToArray()));
            }
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

# Specify the name of the Library VariableSet to use to find variables usage of
library_variableset_name = 'My-Variable-Set'

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
library_variableset_resource = get_by_name('{0}/{1}/libraryvariablesets/all'.format(octopus_server_uri, space['Id']), library_variableset_name)
library_variableset = get_octopus_resource('{0}/{1}/variables/{2}'.format(octopus_server_uri, space['Id'], library_variableset_resource['VariableSetId']))
library_variableset_variables = library_variableset['Variables']
print('Looking for usages of variables from variable set \'{0}\' in space \'{1}\''.format(library_variableset_name, space_name))

projects = get_octopus_resource('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']))

for project in projects:
    project_name = project['Name']
    project_web_uri = project['Links']['Web'].lstrip('/')
    print('Checking project \'{0}\''.format(project_name))
    project_variable_set = get_octopus_resource('{0}/{1}/variables/{2}'.format(octopus_server_uri, space['Id'], project['VariableSetId']))
        
    # Check to see if there are any project variable values that reference any of the library set variables.
    for library_variableset_variable in library_variableset_variables:

        matching_value_variables = [project_variable for project_variable in project_variable_set['Variables'] if project_variable['Value'] is not None and library_variableset_variable['Name'] in project_variable['Value']]
        if matching_value_variables is not None:
            for matching_variable in matching_value_variables:
                tracked_variable = {
                    'Project': project_name,
                    'MatchType': 'Referenced Project Variable',
                    'VariableSetVariable': library_variableset_variable['Name'],
                    'Context': matching_variable['Name'],
                    'AdditionalContext': matching_variable['Value'],
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
                # Check to see if any of the variableset variables are referenced in this step's properties
                for library_variableset_variable in library_variableset_variables:
                    if step_property_value is not None and library_variableset_variable['Name'] in step_property_value:
                        tracked_variable = {
                            'Project': project_name,
                            'MatchType': 'Step',
                            'VariableSetVariable': library_variableset_variable['Name'],
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
                    # Check to see if any of the variableset variables are referenced in this step's properties
                    for library_variableset_variable in library_variableset_variables:
                        if step_property_value is not None and library_variableset_variable['Name'] in step_property_value:
                            tracked_variable = {
                                'Project': project_name,
                                'MatchType': 'Runbook Step',
                                'VariableSetVariable': library_variableset_variable['Name'],
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
        print('Project             : {0}'.format(tracked_variable['Project']))
        print('MatchType           : {0}'.format(tracked_variable['MatchType']))
        print('VariableSetVariable : {0}'.format(tracked_variable['VariableSetVariable']))
        print('Context             : {0}'.format(tracked_variable['Context']))
        print('AdditionalContext   : {0}'.format(tracked_variable['AdditionalContext']))
        print('Property            : {0}'.format(tracked_variable['Property']))
        print('Link                : {0}'.format(tracked_variable['Link']))
        print('')
    if csv_export_path:
        with open(csv_export_path, mode='w') as csv_file:
            fieldnames = ['Project', 'MatchType', 'VariableSetVariable', 'Context', 'AdditionalContext', 'Property', 'Link']
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
	Project             string
	MatchType           string
	Context             string
	Property            string
	AdditionalContext   string
	Link                string
	VariableSetVariable string
}

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	variableSetVariableUsagesToFind := "My-Variable-Set"
	searchDeploymentProcess := true
	searchRunbookProcess := true
	csvExportPath := "path:\\to\\variable.csv"

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	client = octopusAuth(apiURL, APIKey, space.ID)

	variableTracking := []VariableResult{}

	// Get variableset
	librarySet := GetLibrarySet(apiURL, APIKey, space, variableSetVariableUsagesToFind, 0)

	// Get the variables
	variableSet, err := client.Variables.GetAll(librarySet.ID)
	if err != nil {
		log.Println(err)
	}

	variables := variableSet.Variables

	fmt.Printf("Looking for usages of variables from variable set %[1]s in space %[2]s \n", variableSetVariableUsagesToFind, space.Name)

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

		// Loop through variables
		for _, variable := range variables {
			for _, projectVariable := range projectVariables.Variables {
				valueMatch := strings.Contains(projectVariable.Value, variable.Name)

				if valueMatch {
					result := VariableResult{}
					result.Project = project.Name
					result.MatchType = "Referenced Project Variable"
					result.VariableSetVariable = variable.Name
					result.Context = projectVariable.Name
					result.AdditionalContext = projectVariable.Value
					result.Property = ""
					result.Link = apiURL.String() + project.Links["Web"] + "/variables"

					if !arrayContains(variableTracking, result) {
						variableTracking = append(variableTracking, result)
					}
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
							for _, variable := range variables {
								if strings.Contains(action.Properties[property].Value, variable.Name) {
									result := VariableResult{}
									result.Project = project.Name
									result.MatchType = "Step"
									result.VariableSetVariable = variable.Name
									result.Context = step.Name
									result.AdditionalContext = ""
									result.Property = property
									result.Link = apiURL.String() + project.Links["Web"] + "/deployments/process/steps?actionId=" + action.ID

									if !arrayContains(variableTracking, result) {
										variableTracking = append(variableTracking, result)
									}
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
							for _, variable := range variables {
								if strings.Contains(action.Properties[property].Value, variable.Name) {
									result := VariableResult{}
									result.Project = project.Name
									result.MatchType = "Runbook Step"
									result.VariableSetVariable = variable.Name
									result.Context = runbook.Name
									result.AdditionalContext = step.Name
									result.Property = property
									result.Link = apiURL.String() + project.Links["Web"] + "/operations/runbooks/" + runbook.ID + "/process/" + runbook.RunbookProcessID + "/steps/actionId=" + action.ID

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

func GetLibrarySet(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, librarySetName string, skip int) *octopusdeploy.LibraryVariableSet {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	librarySetsQuery := octopusdeploy.LibraryVariablesQuery {
		PartialName: librarySetName,
	}

	librarySets, err := client.LibraryVariableSets.Get(librarySetsQuery)
	if err != nil {
		log.Println(err)
	}
	
	if len(librarySets.Items) == librarySets.ItemsPerPage {
		// call again
		librarySet := GetLibrarySet(octopusURL, APIKey, space, librarySetName, (skip + len(librarySets.Items)))

		if librarySet != nil {
			return librarySet
		}
	} else {
		// Loop through returned items
		for _, librarySet := range librarySets.Items {
			if librarySet.Name == LifecycleName {
				return librarySet
			}
		}
	}

	return nil
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
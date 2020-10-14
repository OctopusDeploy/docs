```powershell PowerShell (REST API)
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

# Optional: set a path to export to csv
$csvExportPath = ""

$variableTracking = @()
$octopusURL = $octopusURL.TrimEnd('/')

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}
    
    Write-Host "Looking for usages of variable named $variableToFind in space: '$spaceName'"

    # Get all projects
    $projects = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

    # Loop through projects
    foreach ($project in $projects)
    {
        Write-Host "Checking project '$($project.Name)'"
        # Get project variables
        $projectVariableSet = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Headers $header

        # Check to see if variable is named in project variables.
        $matchingNamedVariables = $projectVariableSet.Variables | Where-Object {$_.Name -like "*$variableToFind*"}
        if($null -ne $matchingNamedVariables) {
            foreach($match in $matchingNamedVariables) {
                $result = [pscustomobject]@{
                    Project = $project.Name
                    MatchType = "Named Project Variable"
                    Context = $match.Name
                    Property = $null
                    AdditionalContext = $match.Value
                    Link = "$octopusURL$($project.Links.Web)/variables"
                }
                
                # Add and de-dupe later
                $variableTracking += $result
            }
        }
        
        # Check to see if variable is referenced in other project variable values.
        $matchingValueVariables = $projectVariableSet.Variables | Where-Object {$_.Value -like "*$variableToFind*"}
        if($null -ne $matchingValueVariables) {
            foreach($match in $matchingValueVariables) {
                $result = [pscustomobject]@{
                    Project = $project.Name
                    MatchType = "Referenced Project Variable"
                    Context = $match.Name
                    Property = $null
                    AdditionalContext = $match.Value
                    Link = "$octopusURL$($project.Links.Web)/variables"
                }
                # Add and de-dupe later
                $variableTracking += $result
            }
        }

        # Search Deployment process if enabled
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
                    if($null -ne $json -and ($json -like "*$variableToFind*")) {
                        $result = [pscustomobject]@{
                            Project = $project.Name
                            MatchType= "Step"
                            Context = $step.Name
                            Property = $propName
                            AdditionalContext = $null
                            Link = "$octopusURL$($project.Links.Web)/deployments/process/steps?actionId=$($step.Actions[0].Id)"
                        }
                        # Add and de-dupe later
                        $variableTracking += $result
                    }
                }
            }
        }

        # Search Runbook processes if enabled
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
                        if($null -ne $json -and ($json -like "*$variableToFind*")) {
                            $result = [pscustomobject]@{
                                Project = $project.Name
                                MatchType = "Runbook Step"
                                Context = $runbook.Name
                                Property = $propName
                                AdditionalContext = $step.Name
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
    
    # De-dupe
    $variableTracking = $variableTracking | Sort-Object -Property * -Unique

    if($variableTracking.Count -gt 0) {
        Write-Host ""
        Write-Host "Found $($variableTracking.Count) results:"
        $variableTracking
        if (![string]::IsNullOrWhiteSpace($csvExportPath)) {
            Write-Host "Exporting results to CSV file: $csvExportPath"
            $variableTracking | Export-Csv -Path $csvExportPath -NoTypeInformation
        }
    }
}
catch
{
    Write-Host $_.Exception.Message
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
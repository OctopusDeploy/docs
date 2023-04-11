```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default"
$projectName = "MyProject"
$runbookName = "MyRunbook"

# Specify runbook trigger name
$runbookTriggerName = "RunbookTriggerName"

# Specify runbook trigger description
$runbookTriggerDescription = "RunbookTriggerDescription"

# Specify which environments the runbook should run in
$runbookEnvironmentNames = @("Development")

# What timezone do you want the trigger scheduled for
$runbookTriggerTimezone = "GMT Standard Time"

# Remove any days you don't want to run the trigger on
$runbookTriggerDaysOfWeekToRun = @("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")

# Specify the start time to run the runbook each day in the format yyyy-MM-ddTHH:mm:ss.fffZ
# See https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.8

$runbookTriggerStartTime = "2021-07-22T09:00:00.000Z"

# Script variables
$runbookEnvironmentIds = @()

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Get project
$projects = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects?partialName=$([uri]::EscapeDataString($projectName))&skip=0&take=100" -Headers $header 
$project = $projects.Items | Where-Object { $_.Name -eq $projectName }

# Get runbook
$runbooks = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/projects/$($project.Id)/runbooks?partialName=$([uri]::EscapeDataString($runbookName))&skip=0&take=100" -Headers $header 
$runbook = $runbooks.Items | Where-Object { $_.Name -eq $runbookName }

# Get environments for runbook trigger
foreach($runbookEnvironmentName in $runbookEnvironmentNames) {
    $environments = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments?partialName=$([uri]::EscapeDataString($runbookEnvironmentName))&skip=0&take=100" -Headers $header 
    $environment = $environments.Items | Where-Object { $_.Name -eq $runbookEnvironmentName } | Select-Object -First 1
    $runbookEnvironmentIds += $environment.Id
}

# Create a runbook trigger
$body = @{
    ProjectId = $project.Id;
    Name = $runbookTriggerName;
    Description = $runbookTriggerDescription;
    IsDisabled = $False;
    Filter = @{
        Timezone = $runbookTriggerTimezone;
        FilterType = "OnceDailySchedule";
        DaysOfWeek = @($runbookTriggerDaysOfWeekToRun);
        StartTime = $runbookTriggerStartTime;
    };
    Action = @{
        ActionType = "RunRunbook";
        RunbookId = $runbook.Id;
        EnvironmentIds = @($runbookEnvironmentIds);
    };
}

# Convert body to JSON
$body = $body | ConvertTo-Json -Depth 10

# Create runbook scheduled trigger
$runbookScheduledTrigger = Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/projecttriggers" -Body $body -Headers $header 

Write-Host "Created runbook trigger: $($runbookScheduledTrigger.Id) ($runbookTriggerName)"
```
```powershell PowerShell (Octopus.Client)
# You can get this dll from your Octopus Server/Tentacle installation directory or from
# https://www.nuget.org/packages/Octopus.Client/
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"

$spaceName = "Default"
$projectName = "MyProject"
$runbookName = "MyRunbook"

# Specify runbook trigger name
$runbookTriggerName = "RunbookTriggerName"

# Specify runbook trigger description
$runbookTriggerDescription = "RunbookTriggerDescription"

# Specify which environments the runbook should run in
$runbookEnvironmentNames = @("Development")

# What timezone do you want the trigger scheduled for
$runbookTriggerTimezone = "GMT Standard Time"

# Remove any days you don't want to run the trigger on
$runbookTriggerDaysOfWeekToRun = [Octopus.Client.Model.DaysOfWeek]::Monday -bor [Octopus.Client.Model.DaysOfWeek]::Tuesday -bor [Octopus.Client.Model.DaysOfWeek]::Wednesday -bor [Octopus.Client.Model.DaysOfWeek]::Thursday -bor [Octopus.Client.Model.DaysOfWeek]::Friday -bor [Octopus.Client.Model.DaysOfWeek]::Saturday -bor [Octopus.Client.Model.DaysOfWeek]::Sunday

# Specify the start time to run the runbook each day in the format yyyy-MM-ddTHH:mm:ss.fffZ
# See https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.8

$runbookTriggerStartTime = "2021-07-22T09:00:00.000Z"

# Script variables
$runbookEnvironmentIds = @()

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

# Get project
$project = $repositoryForSpace.Projects.FindByName($projectName);

# Get runbook
$runbook = $repositoryForSpace.Runbooks.FindByName($runbookName);

foreach($environmentName in $runbookEnvironmentNames) {
    $environment = $repositoryForSpace.Environments.FindByName($environmentName);
    $runbookEnvironmentIds += $environment.Id
}

$runbookScheduledTrigger = New-Object Octopus.Client.Model.ProjectTriggerResource

$runbookScheduledTriggerFilter = New-Object Octopus.Client.Model.Triggers.ScheduledTriggers.OnceDailyScheduledTriggerFilterResource
$runbookScheduledTriggerFilter.Timezone = $runbookTriggerTimezone
$runbookScheduledTriggerFilter.StartTime = (Get-Date -Date $runbookTriggerStartTime)
$runbookScheduledTriggerFilter.DaysOfWeek = $runbookTriggerDaysOfWeekToRun

$runbookScheduledTriggerAction = New-Object Octopus.Client.Model.Triggers.RunRunbookActionResource
$runbookScheduledTriggerAction.RunbookId = $runbook.Id
$runbookScheduledTriggerAction.EnvironmentIds = New-Object Octopus.Client.Model.ReferenceCollection($runbookEnvironmentIds)

$runbookScheduledTrigger.ProjectId = $project.Id
$runbookScheduledTrigger.Name = $runbookTriggerName
$runbookScheduledTrigger.Description = $runbookTriggerDescription
$runbookScheduledTrigger.IsDisabled = $False
$runbookScheduledTrigger.Filter = $runbookScheduledTriggerFilter
$runbookScheduledTrigger.Action = $runbookScheduledTriggerAction

$createdRunbookTrigger = $repositoryForSpace.ProjectTriggers.Create($runbookScheduledTrigger);
Write-Host "Created runbook trigger: $($createdRunbookTrigger.Id) ($runbookTriggerName)"
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://your.octopus.app";
var octopusAPIKey = "API-YOURAPIKEY";

// Define workig variables
string spaceName = "default";
string projectName = "MyProject";
string runbookName = "MyRunbook";

// Specify runbook trigger name
string runbookTriggerName = "RunbookTriggerName";

// Specify runbook trigger description
string runbookTriggerDescription = "RunbookTriggerDescription";

// Specify which environments the runbook should run in
List<string> runbookEnvironmentNames = new List<string>() { "Development" };

// What timezone do you want the trigger scheduled for
string runbookTriggerTimezone = "GMT Standard Time";

// Remove any days you don't want to run the trigger on
// Bitwise operator to add all days by default
Octopus.Client.Model.DaysOfWeek runbookTriggerDaysOfWeekToRun = DaysOfWeek.Monday | DaysOfWeek.Tuesday | DaysOfWeek.Wednesday | DaysOfWeek.Thursday | DaysOfWeek.Friday | DaysOfWeek.Saturday | DaysOfWeek.Sunday;

// Specify the start time to run the runbook each day in the format yyyy-MM-ddTHH:mm:ss.fffZ
// See https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.8
string runbookTriggerStartTime = "2021-07-22T09:00:00.000Z";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get runbook
    var runbook = repositoryForSpace.Runbooks.FindByName(project, runbookName);

    // Get environments for runbook trigger
    List<string> environmentIds = new List<string>();
    foreach (var environmentName in runbookEnvironmentNames)
    {
        var environment = repositoryForSpace.Environments.FindByName(environmentName);
        environmentIds.Add(environment.Id);
    }

    // Create scheduled trigger
    ProjectTriggerResource runbookScheduledTrigger = new ProjectTriggerResource
    {
        ProjectId = project.Id,
        Name = runbookTriggerName,
        Description = runbookTriggerDescription,
        IsDisabled = false,
        Filter = new OnceDailyScheduledTriggerFilterResource()
        {
            Timezone = runbookTriggerTimezone,
            StartTime = DateTime.Parse(runbookTriggerStartTime),
            DaysOfWeek = runbookTriggerDaysOfWeekToRun
        },
        Action = new Octopus.Client.Model.Triggers.RunRunbookActionResource
        {
            RunbookId = runbook.Id,
            EnvironmentIds = new ReferenceCollection(environmentIds)
        }
    };

    // Create runbook scheduled trigger
    var createdRunbookTrigger = repositoryForSpace.ProjectTriggers.Create(runbookScheduledTrigger);
    Console.WriteLine("Created runbook trigger: {0} ({1})", createdRunbookTrigger.Id, runbookTriggerName);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    Console.ReadLine();
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

def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)

def get_item_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources['Items'] if x['Name'] == name), None)

# Define variables
space_name = 'Default'
project_name = 'Your Project Name'
runbook_name = 'Your runbook name'
runbook_trigger_name = 'Your runbook trigger name'
runbook_trigger_description = 'Your runbook trigger description'
runbook_trigger_environments = ['Development', 'Test']
runbook_trigger_timezone = 'GMT Standard Time'
runbook_trigger_schedule_days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
runbook_trigger_schedule_start_time = '2021-07-22T09:00:00.000Z'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project = get_by_name('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']), project_name)
runbook = get_item_by_name('{0}/{1}/projects/{2}/runbooks'.format(octopus_server_uri, space['Id'], project['Id']), runbook_name)
environments = get_octopus_resource('{0}/{1}/environments/all'.format(octopus_server_uri, space['Id']))

runbook_environment_ids = [environment['Id'] for environment in environments if environment['Name'] in runbook_trigger_environments]

scheduled_runbook_trigger = {
    'ProjectId': project['Id'],
    'Name': runbook_trigger_name,
    'Description': runbook_trigger_name,
    'IsDisabled': False,
    'Filter': {
        'Timezone': runbook_trigger_timezone,
        'FilterType': 'OnceDailySchedule',
        'DaysOfWeek': runbook_trigger_schedule_days_of_week,
        'StartTime': runbook_trigger_schedule_start_time
    },
    'Action': {
        'ActionType': 'RunRunbook',
        'RunbookId': runbook['Id'],
        'EnvironmentIds': runbook_environment_ids
    }
}

uri = '{0}/{1}/projecttriggers'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=scheduled_runbook_trigger)
response.raise_for_status()
```
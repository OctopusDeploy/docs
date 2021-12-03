```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"
$environmentNames = @("Development", "Staging")
$environmentIds = @()

# Optional Tenant
$tenantName = ""
$tenantId = $null

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Get runbook
$runbook = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/runbooks/all" -Headers $header) | Where-Object {$_.Name -eq $runbookName -and $_.ProjectId -eq $project.Id}

# Get environments
$environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
foreach ($environment in $environments)
{
    $environmentIds += $environment.Id
}

# Optionally get tenant
if (![string]::IsNullOrEmpty($tenantName)) {
    $tenant = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/tenants/all" -Headers $header) | Where-Object {$_.Name -eq $tenantName} | Select-Object -First 1
    $tenantId = $tenant.Id
}

$runbook = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/runbooks/all" -Headers $header) | Where-Object {$_.Name -eq $runbookName -and $_.ProjectId -eq $project.Id}

# Run runbook per selected environment
foreach ($environmentId in $environmentIds)
{
    # Create json payload
    $jsonPayload = @{
        RunbookId = $runbook.Id
        RunbookSnapshotId = $runbook.PublishedRunbookSnapshotId
        EnvironmentId = $environmentId
        TenantId = $tenantId
        SkipActions = @()
        SpecificMachineIds = @()
        ExcludedMachineIds = @()
    }

    # Run runbook
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/runbookRuns" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
}
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$runbookName = "MyRunbook"
$environmentNames = @("Test", "Production")

# Optional Tenant
$tenantName = ""
$tenantId = $null

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $project = $repositoryForSpace.Projects.FindByName($projectName)

    # Get runbook
    $runbook = $repositoryForSpace.Runbooks.FindMany({param($r) $r.Name -eq $runbookName}) | Where-Object {$_.ProjectId -eq $project.Id}

    # Get environments
    $environments = $repositoryForSpace.Environments.GetAll() | Where-Object {$environmentNames -contains $_.Name}

    # Optionally get tenant
    if (![string]::IsNullOrEmpty($tenantName)) {
        $tenant = $repositoryForSpace.Tenants.FindByName($tenantName)
        $tenantId = $tenant.Id
    }

    # Loop through environments
    foreach ($environment in $environments)
    {
        # Create a new runbook run object
        $runbookRun = New-Object Octopus.Client.Model.RunbookRunResource
        $runbookRun.EnvironmentId = $environment.Id
        $runbookRun.ProjectId = $project.Id
        $runbookRun.RunbookSnapshotId = $runbook.PublishedRunbookSnapshotId
        $runbookRun.RunbookId = $runbook.Id
        $runbookRun.TenantId = $tenantId

        # Execute runbook
        $repositoryForSpace.RunbookRuns.Create($runbookRun)
    }
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
string runbookName = "MyRunbook";
string[] environmentNames = { "Development", "Production" };

// Optional tenantName
string tenantName = "";
string tenantId = null;

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
    var runbook = repositoryForSpace.Runbooks.FindMany(n => n.Name == runbookName && n.ProjectId == project.Id)[0];

    // Optional - tenant
    if (!string.IsNullOrWhiteSpace(tenantName))
    {
        var tenant = repositoryForSpace.Tenants.FindByName(tenantName);
        tenantId = tenant.Id;
    }

    // Get environments
    foreach (var environmentName in environmentNames)
    {
        // Get environment
        var environment = repositoryForSpace.Environments.FindByName(environmentName);

        // Create runbook run object
        Octopus.Client.Model.RunbookRunResource runbookRun = new RunbookRunResource();
        runbookRun.EnvironmentId = environment.Id;
        runbookRun.RunbookId = runbook.Id;
        runbookRun.ProjectId = project.Id;
        runbookRun.RunbookSnapshotId = runbook.PublishedRunbookSnapshotId;
        runbookRun.TenantId = tenantId;
        // Execute runbook
        repositoryForSpace.RunbookRuns.Create(runbookRun);
    }
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

def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)

space_name = 'Default'
project_name = 'Your Project'
runbook_name = 'Your Runbook'
environment_names = ['Development', 'Test']
environments = []

# Optional tenant Name
tenant_name = ''
tenantId = None

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
project = get_by_name('{0}/{1}/projects/all'.format(octopus_server_uri, space['Id']), project_name)
runbook = get_by_name('{0}/{1}/runbooks/all'.format(octopus_server_uri, space['Id']), runbook_name)

if tenant_name: 
    tenant = get_by_name('{0}/{1}/tenants/all'.format(octopus_server_uri, space['Id']), tenant_name)
    tenantId = tenant['Id']

environments = get_octopus_resource(
    '{0}/{1}/environments/all'.format(octopus_server_uri, space['Id']))
environments = [e['Id']
                for e in environments if e['Name'] in environment_names]

for environmentId in environments:
    print('Running runbook {0} in {1}'.format(runbook_name, environmentId))
    uri = '{0}/{1}/runbookRuns'.format(octopus_server_uri, space['Id'])
    runbook_run = {
        'RunbookId': runbook['Id'],
        'RunbookSnapshotId': runbook['PublishedRunbookSnapshotId'],
        'EnvironmentId': environmentId,
        'TenantId': tenantId,
        'SkipActions': None,
        'SpecificMachineIds': None,
        'ExcludedMachineIds': None
    }
    response = requests.post(uri, headers=headers, json=runbook_run)
    response.raise_for_status()
```
```ts TypeScript
import { Client, ClientConfiguration, Repository } from '@octopusdeploy/api-client';
import {
    EnvironmentResource,
    ProjectResource,
    RunbookResource,
    RunbookRunParameters,
    RunbookRunResource,
    TenantResource
} from '@octopusdeploy/message-contracts';

const configuration: ClientConfiguration = {
    apiKey: 'api-key',
    apiUri: 'https://your.octopus.app/',
    autoConnect: true
};

const client = await Client.create(configuration);
if (client === undefined) {
    console.error('The API client for Octopus Deploy encountered an error.');
    return;
}

const repository = new Repository(client);
const projectNameOrId = 'project-name-or-id';
const runbookNameOrId = 'runbook-name-or-id';
const environmentNamesOrIds = ['environment-name-or-id'];
const tenantNamesOrIds = ['tenant-name-or-id'];

let project: ProjectResource | undefined;

console.log(`Getting project, "${projectNameOrId}"...`);

try {
	project = await repository.projects.find(projectNameOrId);
} catch (error) {
	console.error(error);
}

if (project === null || project === undefined) {
	console.error(`Project, "${projectNameOrId}" not found`);
	return;
}

console.log(`Project found: "${project.Name}" (${project.Id})`);

let runbook: RunbookResource | undefined;

console.log(`Getting runbook, "${runbookNameOrId}"...`);

try {
    runbook = await repository.runbooks.find(runbookNameOrId, project);
} catch (error) {
    console.error(error);
}

if (runbook === null || runbook === undefined) {
	console.error(`Runbook, "${runbookNameOrId}" not found`);
	return;
}

console.log(`Runbook found: "${runbook.Name}" (${runbook.Id})`);

let environments: EnvironmentResource[] | undefined;

console.log(`Getting environments, "${environmentNamesOrIds}"...`);

try {
    environments = await repository.environments.find(environmentNamesOrIds);
} catch (error) {
    console.error(error);
}

if (environments === null || environments === undefined || environments.length === 0) {
   	console.error(`No environment(s) found.`);
	return;
}

for (const environment of environments) {
    console.log(`Environment found: "${environment.Name}" (${environment.Id})`);
}

let tenants: TenantResource[] | undefined;

console.log(`Getting tenants, "${tenantNamesOrIds}"...`);

try {
    tenants = await repository.tenants.find(tenantNamesOrIds);
} catch (error) {
    console.error(error);
}

if (tenants === null || tenants === undefined || tenants.length === 0) {
   	console.error(`No tenant(s) found.`);
	return;
}

for (const tenant of tenants) {
    console.log(`Tenant found: "${tenant.Name}" (${tenant.Id})`);
}

let runbookRuns: RunbookRunResource[] | undefined;
let runbookRunParameters: RunbookRunParameters = {
    EnvironmentIds: environments.map(env => env.Id),
    ExcludedMachineIds: [],
    ForcePackageDownload: false,
    FormValues: {},
    ProjectId: project.Id,
    RunbookId: runbook.Id,
    SkipActions: [],
    SpecificMachineIds: [],
    TenantIds: tenants.map(ten => ten.Id),
    UseDefaultSnapshot: true,
    UseGuidedFailure: false
};

console.log(`Running runbook, "${runbook.Name}" (${runbook.Id})...`);

try {
    runbookRuns = await repository.runbooks.runWithParameters(runbook, runbookRunParameters);
} catch (error) {
    console.error(error);
}

if (runbookRuns === null || runbookRuns === undefined || runbookRuns.length === 0) {
   	console.error(`No runbook run(s) found.`);
	return;
}

for (const runbookRun of runbookRuns) {
    console.log(`Runbook run: "${runbookRun.Name}" (${runbookRun.Id})`);
}
```
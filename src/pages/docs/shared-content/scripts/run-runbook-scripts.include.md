```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$projectName = "MyProject"
$runbookName = "MyRunbook"
$environmentNames = @("Development", "Staging")

# Get space
$spaces = Invoke-WebRequest -Uri "$octopusBaseURL/spaces/all" -Headers $headers -ErrorVariable octoError | ConvertFrom-Json
$space = $spaces | Where-Object { $_.Name -eq $spaceName }
Write-Host "Using Space named $($space.Name) with id $($space.Id)"

# Create space specific url
$octopusSpaceUrl = "$octopusBaseURL/$($space.Id)"

# Create the release body
$createRunbookRunCommandV1 = @{
	SpaceId          = $space.Id
    SpaceIdOrName    = $spaceName
    ProjectName      = $projectName
    RunbookName      = $runbookName
    EnvironmentNames = $environmentNames
} | ConvertTo-Json

# Run runbook
Invoke-RestMethod -Method POST -Uri "$octopusSpaceUrl/runbook-runs/create/v1" -Body $createRunbookRunCommandV1 -Headers $header

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
import { Client, CreateRunbookRunCommandV1, ReleaseRepository } from '@octopusdeploy/api-client'

const configuration: ClientConfiguration = {
    userAgentApp: 'CustomTypeScript',
    instanceURL: 'https://your.octopus.app/',
    apiKey: 'api-key'
};

const client = await Client.create(configuration);

const command: CreateRunbookRunCommandV1 = {
    spaceName: 'Your space Name',
    ProjectName: 'Your project name',
    RunbookName: 'Your runbook name',
    EnvironmentNames: [ "Dev" ]
  };

const repository = new ReleaseRepository(client, parameters.space)
const allocatedReleaseNumber = await repository.create(command)

```
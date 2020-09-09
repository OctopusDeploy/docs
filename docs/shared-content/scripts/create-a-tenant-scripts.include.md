```powershell (REST API)
# Define working variables
$octopusURL = "https://youroctopusurl"
$octopusAPIKey = "API-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$tenantName = "MyTenant"
$projectNames = @("MyProject")
$environmentNames = @("Development", "Test")
$tenantTags = @("MyTagSet/Beta", "MyTagSet/Stable") # Format: TagSet/Tag

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get projects
    $projectIds = @()
    foreach ($projectName in $projectNames)
    {
        $projectIds += ((Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}).Id
    }

    # Get Environments
    $environmentIds = @()
    $environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
    foreach ($environment in $environments)
    {
        $environmentIds += $environment.Id
    }

    # Build projet/environments
    $projectEnvironments = @{}
    foreach ($projectId in $projectIds)
    {
        $projectEnvironments.Add($projectId, $environmentIds)
    }

    # Build json payload
    $jsonPayload = @{
        Name = $tenantName
        TenantTags = $tenantTags
        SpaceId = $space.Id
        ProjectEnvironments = $projectEnvironments
    }

    # Create tenant
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tenants" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctopusurl"
$octopusAPIKey = "API-KEY"
$spaceName = "default"
$tenantName = "MyTenant"
$projectNames = @("MyProject")
$environmentNames = @("Development", "Test")
$tenantTags = @("MyTagSet/Beta", "MyTagSet/Stable") # Format: TagSet/Tag

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get environment ids
    $environments = $repositoryForSpace.Environments.GetAll() | Where-Object {$environmentNames -contains $_.Name}

    # Get projects
    $projects = $repositoryForSpace.Projects.GetAll() | Where-Object {$projectNames -contains $_.Name}
    
    # Create projectenvironments
    $projectEnvironments = New-Object Octopus.Client.Model.ReferenceCollection
    foreach ($environment in $environments)
    {
        $projectEnvironments.Add($environment.Id) | Out-Null
    }

    # Create new tenant resource
    $tenant = New-Object Octopus.Client.Model.TenantResource
    $tenant.Name = $tenantName
    
    # Add tenant tags
    foreach ($tenantTag in $tenantTags)
    {
        $tenant.TenantTags.Add($tenantTag) | Out-Null
    }
    
    # Add project environments
    foreach ($project in $projects)
    {
        $tenant.ProjectEnvironments.Add($project.Id, $projectEnvironments) | Out-Null
    }
    
    # Create the tenant
    $repositoryForSpace.Tenants.Create($tenant)
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
string tenantName = "MyTenant";
string[] projectNames = { "MyProject" };
string[] environmentNames = { "Development", "Production" };
string[] tenantTags = { "MyTagSet/Beta", "MyTagSet/Stable" };

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get projects
    var projects = repositoryForSpace.Projects.FindByNames(projectNames);

    // Get environments
    var environments = repositoryForSpace.Environments.FindByNames(environmentNames);

    // Create projectenvironments
    Octopus.Client.Model.ReferenceCollection projectEnvironments = new ReferenceCollection();
    foreach (var environment in environments)
    {
        projectEnvironments.Add(environment.Id);
    }

    // Create tenant object
    Octopus.Client.Model.TenantResource tenant = new TenantResource();
    tenant.Name = tenantName;

    foreach (string tenantTag in tenantTags)
    {
        tenant.TenantTags.Add(tenantTag);
    }

    foreach (var project in projects)
    {
        tenant.ProjectEnvironments.Add(project.Id, projectEnvironments);
    }

    // Create tenant
    repositoryForSpace.Tenants.Create(tenant);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
<details data-group="list-deployments-to-environment-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# Space name
$spaceName = "Default"

# Environment name
$environmentName = "Development"

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Get environment
$environments = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments?partialName=$([uri]::EscapeDataString($environmentName))&skip=0&take=100" -Headers $header 
$environment = $environments.Items | Where-Object { $_.Name -eq $environmentName } | Select-Object -First 1

# Get deployments to environment
$deployments = @()
$response = $null
do {
    $uri = if ($response) { $octopusURL + $response.Links.'Page.Next' } else { "$octopusURL/api/$($space.Id)/deployments?environments=$($environment.Id)" }
    $response = Invoke-RestMethod -Method Get -Uri $uri -Headers $header
    Write-Output "Found $($response.Items.Length) deployments.";
    $deployments += $response.Items
} while ($response.Links.'Page.Next')

Write-Output "Retrieved $($deployments.Count) deployments to environment $($environmentName)"
```

</details>
<details data-group="list-deployments-to-environment-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
Add-Type -Path "path\to\Octopus.Client.dll"
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-KEY"

$spaceName = "Default"
$environmentName = "Development"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint


# Get space id
$space = $repository.Spaces.FindByName($spaceName)
Write-Host "Using Space named $($space.Name) with id $($space.Id)"

# Create space specific repository
$repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

# Get environment
$environment = $repositoryForSpace.Environments.FindByName($environmentName)

# Get deployments to environment
$projects = @()
$environments = @($environment.Id)
$deployments = New-Object System.Collections.Generic.List[System.Object] 
    
$repositoryForSpace.Deployments.Paginate($projects, $environments, {param($page) 
    Write-Host "Found $($page.Items.Count) deployments.";
    $deployments.AddRange($page.Items); 
    return $True; 
})

Write-Host "Retrieved $($deployments.Count) deployments to environment $($environmentName)"

```

</details>
<details data-group="list-deployments-to-environment-scripts">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;

var octopusURL = "https://your.octopus.app";
var octopusAPIKey = "API-KEY";

var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

var spaceName = "Default";
var environmentName = "Dev";

try
{
    // Get the space to work in
    var space = repository.Spaces.FindByName(spaceName);
    Console.WriteLine($"Using Space named {space.Name} with id {space.Id}");

    // Create space specific repository
    var repositoryForSpace = repository.ForSpace(space);

    // Get environment
    var environment = repositoryForSpace.Environments.FindByName(environmentName);
	
    // Get paged list of deployments for that environment
    var deployments = new List<DeploymentResource>();
	repositoryForSpace.Deployments.Paginate(null, new[] { environment.Id }, page =>
	{
		deployments.AddRange(page.Items);
		return true;
	});
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}
```

</details>

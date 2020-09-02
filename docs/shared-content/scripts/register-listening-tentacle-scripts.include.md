```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$communicationsStyle = "TentaclePassive" # Listening mode
$hostName = "MyHost"
$tentaclePort = "10933"
$environmentNames = @("Development", "Production")
$roles = @("MyRole")
$environmentIds = @()

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get environment Ids
    $environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
    foreach ($environment in $environments)
    {
        $environmentIds += $environment.Id
    }

    # Discover new target
    $newTarget = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/discover?host=$hostName&port=$tenctaclePort&type=$communicationsStyle" -Headers $header

    # Create JSON payload
    $jsonPayload = @{
        Endpoint = @{
            CommunicationStyle = $newTarget.Endpoint.CommunicationStyle
            Thumbprint = $newTarget.Endpoint.Thumbprint
            Uri = $newTarget.Endpoint.Uri
        }
        EnvironmentIds = $environmentIds
        Name = $newTarget.Name
        Roles = $roles
        Status = "Unknown"
        IsDisabled = $false
    }

    # Register new target to space
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/machines" -Headers $header -Body ($jsonPayload | ConvertTo-Json -Depth 10)
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$communicationsStyle = "TentaclePassive" # Listening mode
$hostName = "MyHost"
$tentaclePort = "10933"
$environmentNames = @("Development", "Production")
$roles = @("MyRole")
$environmentIds = @()


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

    # Discover host
    $newTarget = $repositoryForSpace.Machines.Discover($hostName, $tentaclePort)

    # Add properties to host
    foreach ($environments in $environments)
    {
        # Add to target
        $newTarget.EnvironmentIds.Add($environment.Id) | Out-Null
    }

    foreach ($role in $roles)
    {
        # Add to target
        $newTarget.Roles.Add($role) | Out-Null
    }
    $newTarget.IsDisabled = $false
    
    # Add to machine to space
    $repositoryForSpace.Machines.Create($newTarget)
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
var octopusURL = "http://octotemp";
var octopusAPIKey = "API-DY8544IVQCQX8JXCGNH4URENNY";
string spaceName = "default";
string hostName = "OctoTempTentacle";
int tentaclePort = 10933;
string[] environmentNames = { "Development", "Production" };
string[] roles = { "MyRole" };
List<string> environmentIds = new List<string>();

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get environments
    foreach (var environmentName in environmentNames)
    {
        environmentIds.Add(repositoryForSpace.Environments.FindByName(environmentName).Id);
    }

    // Discover host
    var newTarget = repositoryForSpace.Machines.Discover(hostName, tentaclePort);

    // Fill in details for target
    foreach (string environmentId in environmentIds)
    {
        // Add to target
        newTarget.EnvironmentIds.Add(environmentId);
    }

    foreach (string role in roles)
    {
        newTarget.Roles.Add(role);
    }

    // Add machine to space
    repositoryForSpace.Machines.Create(newTarget);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
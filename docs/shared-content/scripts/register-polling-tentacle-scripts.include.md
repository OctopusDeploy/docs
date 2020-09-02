```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$communicationsStyle = "TentacleActive" # Listening mode
$hostName = "MyHost"
$tentaclePort = "10934"
$environmentNames = @("Development", "Production")
$roles = @("MyRole")
$environmentIds = @()
$tentacleThumbprint = "TentacleThumbprint"
$tentacleIdentifier = "PollingTentacleIdentifier" # Must match value in Tentacle.config file on tentacle machine; ie poll://RandomCharacters

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

    # Create unique URI for tentacle
    $tentacleURI = "poll://$tentacleIdentifier"

    # Create JSON payload
    $jsonPayload = @{
        Endpoint = @{
            CommunicationStyle = $communicationsStyle
            Thumbprint = $tentacleThumbprint
            Uri = $tentacleURI
        }
        EnvironmentIds = $environmentIds
        Name = $hostName
        Roles = $roles
        Status = "Unknown"
        IsDisabled = $false
    }

    $jsonPayload

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
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$hostName = "MyHost"
$tentacleThumbprint = "TentacleThumbprint"
$tentacleIdentifier = "PollingTentacleIdentifier" # Must match value in Tentacle.config file on tentacle machine; ie poll://RandomCharacters
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
    $environments = $repositoryForSpace.Environments.FindAll() | Where-Object {$environmentNames -contains $_.Name}

    # Create new polling tentacle resource
    $newTarget = New-Object Octopus.Client.Model.Endpoints.PollingTentacleEndpointResource

    $newTarget.Uri = "poll://$tentacleIdentifier"
    $newTarget.Thumbprint = $tentacleThumbprint

    # Create new machien resourece
    $tentacle = New-Object Octopus.Client.Model.MachineResource
    $tentacle.Endpoint = $newTarget
    $tentacle.Name = $hostName
    
    
    # Add properties to host
    foreach ($environment in $environments)
    {
        # Add to target
        $tentacle.EnvironmentIds.Add($environment.Id)
    }

    foreach ($role in $roles)
    {
        # Add to target
        $tentacle.Roles.Add($role)
    }
        
    # Add to machine to space
    $repositoryForSpace.Machines.Create($tentacle)
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
string hostName = "OctoTempTentacle";
string[] environmentNames = { "Development", "Production" };
string[] roles = { "MyRole" };
List<string> environmentIds = new List<string>();
string tentacleThumbprint = "TentacleThumbprint";
string tentacleIdentifier = "PollingTentacleIdentifer"; // Must match value in Tentacle.config file on tentacle machine; ie poll://RandomCharacters

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

    // Create new polling tentacle resource
    var newTarget = new Octopus.Client.Model.Endpoints.PollingTentacleEndpointResource();
    newTarget.Uri = string.Format("poll://{0}", tentacleIdentifier);
    newTarget.Thumbprint = tentacleThumbprint;

    // Create new machine resource
    var tentacle = new Octopus.Client.Model.MachineResource();
    tentacle.Endpoint = newTarget;
    tentacle.Name = hostName;

    // Fill in details for target
    foreach (string environmentId in environmentIds)
    {
        // Add to target
        tentacle.EnvironmentIds.Add(environmentId);
    }

    foreach (string role in roles)
    {
        tentacle.Roles.Add(role);
    }

    // Add machine to space
    repositoryForSpace.Machines.Create(tentacle);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
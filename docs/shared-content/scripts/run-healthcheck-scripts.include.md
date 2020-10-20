```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "http://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$Description = "Health check started from Powershell script"
$TimeOutAfterMinutes = 5
$MachineTimeoutAfterMinutes = 5

# Choose an Environment, a set of machine names, or both.
$EnvironmentName = "Development"
$MachineNames = @()

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get EnvironmentId
$EnvironmentID = $null
if([string]::IsNullOrWhiteSpace($EnvironmentName) -eq $False) 
{
    $EnvironmentID += (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$_.Name -eq $EnvironmentName} | Select-Object -ExpandProperty Id -First 1
}

# Get MachineIds
$MachineIds = $null
if($MachineNames.Count -gt 0)
{
    $MachineIds = $EnvironmentID += (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/all" -Headers $header) | Where-Object {$_.Name -eq $EnvironmentName} | Select-Object -ExpandProperty Id -Join ", "
}

# Create json payload
$jsonPayload = @{
    SpaceId = "$($space.Id)"
    Name = "Health"
    Description = $Description
    Arguments = @{
        Timeout = "$([TimeSpan]::FromMinutes($TimeOutAfterMinutes))"
        MachineTimeout = "$([TimeSpan]::FromMinutes($MachineTimeoutAfterMinutes))"
        EnvironmentId = $EnvironmentID
        MachineIds = $MachineIds
    }
}

# Create health check task
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tasks" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "Default"
$Description = "Health check started from Powershell script"
$TimeOutAfterMinutes = 5
$MachineTimeoutAfterMinutes = 5

# Choose an Environment, a set of machine names, or both.
$EnvironmentName = ""
$MachineNames = @()

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get EnvironmentId
    $EnvironmentID = $null
    if([string]::IsNullOrWhiteSpace($EnvironmentName) -eq $False) 
    {
        $EnvironmentID = $repositoryForSpace.Environments.FindByName($EnvironmentName).Id
    }
    
    # Get MachineIds
    $MachineIds = $null
    if($MachineNames.Count -gt 0)
    {
        $MachineIds = ($repositoryForSpace.Machines.GetAll() | Where-Object {$MachineNames -contains $_.Name} | Select-Object -ExpandProperty Id) -Join ", "
    }
    
    # Execute health check
    $repositoryForSpace.Tasks.ExecuteHealthCheck($Description,$TimeOutAfterMinutes,$MachineTimeoutAfterMinutes,$EnvironmentID,$MachineIds)
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
var spaceName = "Default";
var description = "Health check started from C# script";
var timeoutAfterMinutes = 5;
var machineTimeoutAfterMinutes = 5;

var environmentName = "Development";
var machineNames = new List<string>() {"octopus01-listening" };

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get EnvironmentId
    string environmentId = null;
    if (string.IsNullOrWhiteSpace(environmentName) == false)
    {
        environmentId = repositoryForSpace.Environments.FindByName(environmentName).Id;
    }

    // Get MachineIds
    string[] machineIds = null;
    if (machineNames.Any())
    {
        machineIds = repositoryForSpace.Machines.FindAll().Where(m => machineNames.Contains(m.Name)).Select(m => m.Id).ToArray();
    }
    repositoryForSpace.Tasks.ExecuteHealthCheck(description, timeoutAfterMinutes, machineTimeoutAfterMinutes, environmentId, machineIds);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
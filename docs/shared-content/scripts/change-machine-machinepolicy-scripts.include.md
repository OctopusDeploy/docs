```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$machineName = "MyMachine"
$machinePolicyName = "MyPolicy"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get machine list
    $machine = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/all" -Headers $header) | Where-Object {$_.Name -eq $machineName}
    
    # Get machine policy
    $machinePolicy = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machinepolicies/all" -Headers $header) | Where-Object {$_.Name -eq $machinePolicyName}

    # Update machine object
    $machine.MachinePolicyId = $machinePolicy.Id
    Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/machines/$($machine.Id)" -Body ($machine | ConvertTo-Json -Depth 10) -Headers $header
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
$machineName = "MyMachine"
$machinePolicyName = "MyPolicy"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get machine list
    $machine = $repositoryForSpace.Machines.FindByName($machineName)

    # Get machine policy
    $machinePolicy = $repositoryForSpace.MachinePolicies.FindByName($machinePolicyName)

    # Change machine policy for machine
    $machine.MachinePolicyId = $machinePolicy.Id
    $repositoryForSpace.Machines.Modify($machine)
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
string machineName = "MyMachine";
string machinePolicyName = "TestPolicy";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get machine list
    var machine = repositoryForSpace.Machines.FindByName(machineName);

    // Get machine policy
    var machinePolicy = repositoryForSpace.MachinePolicies.FindByName(machinePolicyName);

    // Change machine policy for machine
    machine.MachinePolicyId = machinePolicy.Id;
    repositoryForSpace.Machines.Modify(machine);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
```powershell PowerShell (REST API)
# Define working variables
$octopusBaseURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$role = "MyRole"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get machine list
    $machines = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/all" -Headers $header) | Where-Object {$role -in $_.Roles}
    
    # Loop through list
    foreach ($machine in $machines)
    {
        # Remove machine
        Invoke-RestMethod -Method Delete -Uri "$octopusURL/api/$($space.Id)/machines/$($machine.Id)" -Headers $header
    }
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
$octopusBaseURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$role = "MyRole"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get machine list
    $machines = $repositoryForSpace.Machines.GetAll() | Where-Object {$role -in $_.Roles}

    # Loop through list
    foreach ($machine in $machines)
    {
        # Delete machine
        $repositoryForSpace.Machines.Delete($machine)
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
string role = "MyRole";

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
    var machines = repositoryForSpace.Machines.FindAll().Where(r => r.Roles.Contains(role));

    // Loop through list
    foreach (var machine in machines)
    {
        // Delete machine
        repositoryForSpace.Machines.Delete(machine);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
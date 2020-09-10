```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$machineName = "MachineName"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get machine list
    $targetList = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines?name=$machineName&skip=0&take=1000" -Headers $header) 
    
    # Loop through list
    foreach ($target in $targetList.Items)
    {
        if ($target.Name -eq $machineName)
        {
            $targetId = $target.Id
            Write-Highlight "Deleting the target $targetId because the name matches the machineName"

            $deleteResponse = (Invoke-RestMethod "$OctopusUrl/api/$($space.Id)/machines/$targetId" -Headers $header -Method Delete)

            Write-Host "Delete Response $deleteResponse"
            break
        }
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
$octopusURL = "https://youroctourl/api"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$machineName = "MachineName"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get machine
    $machine = $repositoryForSpace.Machines.FindByName($machineName)

    # Delete machine
    $repositoryForSpace.Machines.Delete($machine)
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
string machineName = "MachineName";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get machine
    var machine = repositoryForSpace.Machines.FindByName(machineName);

    // Delete machine
    repositoryForSpace.Machines.Delete(machine);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
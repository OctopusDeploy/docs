```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get tasks
    $tasks = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/tasks" -Headers $header).Items | Where-Object {$_.State -eq "Queued" -and $_.HasBeenPickedUpByProcessor -eq $false}

    # Loop through tasks
    foreach ($task in $tasks)
    {
        # Cancel task
        Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tasks/$($task.Id)/cancel" -Headers $header
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
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get tasks
    $queuedDeployments = $repositoryForSpace.Tasks.FindAll() | Where-Object {$_.State -eq "Queued" -and $_.HasBeenPickedUpByProcessor -eq $false -and $_.Name -eq "Deploy"}

    # Loop through results
    foreach ($task in $queuedDeployments)
    {
        $repositoryForSpace.Tasks.Cancel($task)   
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
var octopusURL = "http://octotemp";
var octopusAPIKey = "API-DY8544IVQCQX8JXCGNH4URENNY";
string spaceName = "default";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get queued deployemnts
    var queuedDeployments = repositoryForSpace.Tasks.FindAll().Where(d => d.State == TaskState.Queued && !d.HasBeenPickedUpByProcessor && d.Name == "Deploy");

    // Loop through results
    foreach (var task in queuedDeployments)
    {
        // Cancel deployment
        repositoryForSpace.Tasks.Cancel(task);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
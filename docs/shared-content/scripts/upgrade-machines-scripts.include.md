```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$machineNames = @("MyMachine")

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get machine list
    $machines = @()
    foreach ($machineName in $machineNames)
    {
        # Get machine
        $machine = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/machines/all" -Headers $header) | Where-Object {$_.Name -eq $machineName}

        # Add to list
        $machines += $machine.Id
    }

    # Build json payload
    $jsonPayload = @{
        Name = "Upgrade"
        Arguments = @{
            MachineIds = $machines
        }
        Description = "Upgrade machines"
        SpaceId = $space.Id
    }

    # Initiate upgrade
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tasks" -Headers $header -Body ($jsonPayload | ConvertTo-Json -Depth 10)
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
$machineNames = @("MyMachine")

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get machines
    $machines = @()
    foreach ($machineName in $machineNames)
    {
        # Get machine
        $machine = $repositoryForSpace.Machines.FindByName($machineName)
        $machines += $machine.Id
    }

    # Create new task resource
    $task = New-Object Octopus.Client.Model.TaskResource
    $task.Name = "Upgrade"
    $task.Description = "Upgrade machines"
    $task.Arguments.Add("MachineIds", $machines)    
    
    # Execute
    $repositoryForSpace.Tasks.Create($task)   
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

var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
var spaceName = "default";
string[] machineNames = new string[] { "OctoTempTentacle" };

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get machines
    List<string> machines = new List<string>();
    foreach (string machineName in machineNames)
    {
        // Get machine
        var machine = repositoryForSpace.Machines.FindByName(machineName);

        // Add to list
        machines.Add(machine.Id);
    }

    // Create task resource
    Octopus.Client.Model.TaskResource task = new TaskResource();
    task.Name = "Upgrade";
    task.Description = "Upgrade machines";
    task.Arguments.Add("MachineIds", machines);

    // Execute
    repositoryForSpace.Tasks.Create(task);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
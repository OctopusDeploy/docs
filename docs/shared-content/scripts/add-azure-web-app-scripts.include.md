```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$azureServicePrincipalName = "MyAzureAccount"
$azureResourceGroupName = "MyResourceGroup"
$environmentNames = @("Development", "Production")
$roles = @("Myrole")
$environmentIds = @()
$azureWebAppName = "MyAzureWebAppName"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get Azure account
    $azureAccount = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/accounts/all" -Headers $header) | Where-Object {$_.Name -eq $azureServicePrincipalName}

    # Get Environments
    $environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
    foreach ($environment in $environments)
    {
        $environmentIds += $environment.Id
    }

    # Build json payload
    $jsonPayload = @{
        Name = $azureWebAppName
        EndPoint = @{
            CommunicationStyle = "AzureWebApp"
            AccountId = $azureAccount.Id
            ResourceGroupName = $azureResourceGroupName
            WebAppName = $azureWebAppName
        }
        Roles = $roles
        EnvironmentIds = $environmentIds
    }
    
    # Register the target to Octopus Deploy
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
$azureServicePrincipalName = "MyAzureAccount"
$azureResourceGroupName = "MyResourceGroup"
$azureWebAppName = "MyAzureWebApp"
$spaceName = "default"
$environmentNames = @("Development", "Production")
$roles = @("MyRole")


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

    # Get Azure account
    $azureAccount = $repositoryForSpace.Accounts.FindByName($azureServicePrincipalName)

    # Create new Azure Web App object
    $azureWebAppTarget = New-Object Octopus.Client.Model.Endpoints.AzureWebAppEndpointResource
    $azureWebAppTarget.AccountId = $azureAccount.Id
    $azureWebAppTarget.ResourceGroupName = $azureResourceGroupName
    $azureWebAppTarget.WebAppName = $azureWebAppName

    # Create new machine object
    $machine = New-Object Octopus.Client.Model.MachineResource
    $machine.Endpoint = $azureWebAppTarget
    $machine.Name = $azureWebAppName
    
    # Add Environments
    foreach ($environment in $environments)
    {
        # Add to target
        $machine.EnvironmentIds.Add($environment.Id)
    }

    # Add roles
    foreach ($role in $roles)
    {
        $machine.Roles.Add($role)
    }
        
    # Add to machine to space
    $repositoryForSpace.Machines.Create($machine)
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
string[] environmentNames = { "Development", "Production" };
string[] roles = { "MyRole" };
List<string> environmentIds = new List<string>();
string azureServicePrincipalName = "MyAzureAccount";
string azureResourceGroupName = "Target-Hybrid-rg";
string azureWebAppName = "s-OctoPetShop-Web";

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

    // Get Azure account
    var azureAccount = repositoryForSpace.Accounts.FindByName(azureServicePrincipalName);

    // Create new azure web app object
    var azureWebAppTarget = new Octopus.Client.Model.Endpoints.AzureWebAppEndpointResource();
    azureWebAppTarget.AccountId = azureAccount.Id;
    azureWebAppTarget.ResourceGroupName = azureResourceGroupName;
    azureWebAppTarget.WebAppName = azureWebAppName;

    // Create new machine resource
    var tentacle = new Octopus.Client.Model.MachineResource();
    tentacle.Endpoint = azureWebAppTarget;
    tentacle.Name = azureWebAppName;

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
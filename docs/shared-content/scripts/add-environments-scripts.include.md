```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctopus.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default"
$environments = @("Development", "Test", "Staging", "Production")

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

foreach ($environment in $environments) {
    
    # Check to see if environment exists
    $environments = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments?partialName=$([uri]::EscapeDataString($environment))&skip=0&take=100" -Headers $header
    $existingEnvironment = $environments.Items | Where-Object { $_.Name -eq $environment }

    if($null -ne $existingEnvironment) {
        Write-Host "Environment $environment' already exists. Nothing to create :)"
    }
    else {

        $body = @{
            Name = $environment
        } | ConvertTo-Json

        Write-Host "Creating environment '$environment'"
        $response = Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/environments" -Headers $header -Method Post -Body $body 
        Write-Host "EnvironmentId: $($response.Id)"
    }
}
```
```powershell PowerShell (Octopus.Client)
$ErrorActionPreference = "Stop";

# You can get this dll from your Octopus Server/Tentacle installation directory or from
# https://www.nuget.org/packages/Octopus.Client/
Add-Type -Path 'path\to\Octopus.Client.dll'

$octopusURL = "https://youroctopus.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"

$spaceName = "Default"
$environments = @("Development", "Test", "Staging", "Production")

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

foreach ($environmentName in $environments) {
    
    $environment = $repositoryForSpace.Environments.FindByName($environmentName)
    if($null -ne $environment) {
        Write-Host "Environment '$environmentName' already exists. Nothing to create :)"
    }
    else {
        Write-Host "Creating environment '$environmentName'"
        $environment = New-Object Octopus.Client.Model.EnvironmentResource -Property @{
            Name = $environmentName
        }
        
        $repositoryForSpace.Environments.Create($environment)
        Write-Host "EnvironmentId: $($response.Id)"
    }
}
```

```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctopus.octopus.app";
var octopusAPIKey = "API-YOURAPIKEY";

var spaceName = "Default";
var environments = new List<string> { "Development", "Staging", "Test", "Production" };

// Create endpoint, repository and client
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    foreach (var environmentName in environments)
    {
        // Check for existing environment
        var environment = repositoryForSpace.Environments.FindByName(environmentName);
        if (environment != null)
        {
            Console.WriteLine("Environment '{0}' already exists. Nothing to create :)", environmentName);
        }
        else
        {
            Console.WriteLine("Creating environment '{0}'", environmentName);
            var environmentResource = new EnvironmentResource { Name = environmentName };
            environment = repositoryForSpace.Environments.Create(environmentResource);
            Console.WriteLine("EnvironmentId: {0}", environment.Id);
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$teamName = "MyTeam"
$userRoleName = "Deployment creator"
$environmentNames = @("Development", "Staging")
$environmentIds = @()

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get team
    $team = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams/all" -Headers $header) | Where-Object {$_.Name -eq $teamName}

    # Get user role
    $userRole = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/userroles/all" -Headers $header) | Where-Object {$_.Name -eq $userRoleName}
    
    # Get scoped user role reference
    $scopedUserRole = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams/$($team.Id)/scopeduserroles" -Headers $header).Items | Where-Object {$_.UserRoleId -eq $userRole.Id}

    # Get Environments
    $environments = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/environments/all" -Headers $header) | Where-Object {$environmentNames -contains $_.Name}
    foreach ($environment in $environments)
    {
        $environmentIds += $environment.Id
    }

    # Update the scopedUserRole
    $scopedUserRole.EnvironmentIds += $environmentIds
    
    Invoke-RestMethod -Method Put -Uri "$octopusURL/api/scopeduserroles/$($scopedUserRole.Id)" -Headers $header -Body ($scopedUserRole | ConvertTo-Json -Depth 10)
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
$environmentNames = @("Test", "Production")
$teamName = "MyTeam"
$userRoleName = "Deployment creator"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint
$environmentIds = @()

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get team
    $team = $repositoryForSpace.Teams.FindByName($teamName)

    # Get user role
    $userRole = $repositoryForSpace.UserRoles.FindByName($userRoleName)
    
    # Get scopeduserrole
    $scopedUserRole = $repositoryForSpace.Teams.GetScopedUserRoles($team) | Where-Object {$_.UserRoleId -eq $userRole.Id}

    # Get environments
    $environments = $repositoryForSpace.Environments.GetAll() | Where-Object {$environmentNames -contains $_.Name}
    foreach ($environment in $environments)
    {
        # Add Id
        $scopedUserRole.EnvironmentIds.Add($environment.Id)
    }

    # Update the scoped user role object
    $repositoryForSpace.ScopedUserRoles.Modify($scopedUserRole)
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
string teamName = "MyTeam";
string userRoleName = "Deployment creator";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get team
    var team = repositoryForSpace.Teams.FindByName(teamName);

    // Get user role
    var userRole = repository.UserRoles.FindByName(userRoleName);

    // Get scoped user role
    var scopedUserRole = repository.Teams.GetScopedUserRoles(team).FirstOrDefault(s => s.UserRoleId == userRole.Id);

    // Get environment ids
    foreach (var environmentName in environmentNames)
    {
        scopedUserRole.EnvironmentIds.Add(repositoryForSpace.Environments.FindByName(environmentName).Id);
    }

    // Update scoped user role
    repositoryForSpace.ScopedUserRoles.Modify(scopedUserRole);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
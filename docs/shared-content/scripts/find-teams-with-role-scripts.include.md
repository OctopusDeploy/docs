```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$userRoleName = "Deployment creator"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get user role
    $userRole = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/userroles/all" -Headers $header) | Where-Object {$_.Name -eq $userRoleName}

    # Get teams collection
    $teams = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams/all" -Headers $header
    
    # Loop through teams
    $teamNames = @()
    foreach ($team in $teams)
    {
        # Get scoped roles for team
        $scopedUserRole = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams/$($team.Id)/scopeduserroles" -Headers $header).Items | Where-Object {$_.UserRoleId -eq $userRole.Id}

        # Check for null
        if ($null -ne $scopedUserRole)
        {
            # Add to teams
            $teamNames += $team.Name
        }
    }

    # Loop through results
    Write-Host "The following teams are using role $($userRoleName):"
    foreach ($teamName in $teamNames)
    {
        Write-Host "$teamName"
    }
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
$userRoleName = "Deployment creator"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get team
    $teams = $repositoryForSpace.Teams.FindAll()

    # Get user role
    $userRole = $repositoryForSpace.UserRoles.FindByName($userRoleName)
    
    # Loop through teams
    $teamNames = @()
    foreach ($team in $teams)
    {
        # Get scopeduserrole
        $scopedUserRole = $repositoryForSpace.Teams.GetScopedUserRoles($team) | Where-Object {$_.UserRoleId -eq $userRole.Id}

        # Check for null
        if ($null -ne $scopedUserRole)
        {
            # Add to list
            $teamNames += $team.Name
        }
    }

    # Loop through results
    Write-Host "The following teams are using role $($userRoleName):"
    foreach ($teamName in $teamNames)
    {
        Write-Host "$teamName"
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

    // Get teams
    var teams = repositoryForSpace.Teams.FindAll();

    // Get user role
    var userRole = repository.UserRoles.FindByName(userRoleName);

    // Loop through teams
    List<string> teamNames = new List<string>();
    foreach (var team in teams)
    {
        // Get scoped user roles
        var scopedUserRoles = repositoryForSpace.Teams.GetScopedUserRoles(team).Where(s => s.UserRoleId == userRole.Id);

        // Check for null
        if (scopedUserRoles != null && scopedUserRoles.Count() > 0)
        {
            // Add to teams
            teamNames.Add(team.Name);
        }
    }

    // Display which teams have use the role
    Console.WriteLine(string.Format("The following teams are using role {0}", userRoleName));
    foreach (string teamName in teamNames)
    {
        Console.WriteLine(teamName);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
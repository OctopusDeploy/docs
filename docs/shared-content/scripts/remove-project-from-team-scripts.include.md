```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$projectName = "MyProject"
$spaceName = "default"
$teamName = "MyTeam"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get project
    $project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

    # Get team
    $team = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams" -Headers $header).Items | Where-Object {$_.Name -eq $teamName}

    # Get scoped user roles
    $scopedUserRoles = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/teams/$($team.Id)/scopeduserroles" -Headers $header).Items | Where-Object {$_.ProjectIds -contains $project.Id}
    
    # Loop through results and remove project Id
    foreach ($scopedUserRole in $scopedUserRoles)
    {
        # Filter out project
        $scopedUserRole.ProjectIds = ,($scopedUserRole.ProjectIds | Where-Object {$_ -notcontains $project.Id}) # Yes, the , is supposed to be there
        
        # Update scoped user role
        Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/scopeduserroles/$($scopedUserRole.Id)" -Body ($scopedUserRole | ConvertTo-Json -Depth 10) -Headers $header
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell Powershell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$teamName = "MyTeam"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    $project = $repositoryForSpace.Projects.FindByName($projectName)
    
    # Get team
    $team = $repositoryForSpace.Teams.FindByName($teamName)

    # Get scoped user roles
    $scopedUserRoles = $repositoryForSpace.ScopedUserRoles.FindMany({param($p) $p.ProjectIds -contains $project.Id -and $p.TeamId -eq $team.Id})
    
    # Loop through scoped user roles and remove where present
    foreach ($scopedUserRole in $scopedUserRoles)
    {
        $scopedUserRole.ProjectIds = [Octopus.Client.Model.ReferenceCollection]($scopedUserRole.ProjectIds | Where-Object {$_ -notcontains $project.Id})
        $repositoryForSpace.ScopedUserRoles.Modify($scopedUserRole)
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
var spaceName = "default";
string projectName = "MyProject";
string teamName = "MyTeam";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get project
    var project = repositoryForSpace.Projects.FindByName(projectName);

    // Get team
    var team = repositoryForSpace.Teams.FindByName(teamName);

    // Get scoped user roles
    var scopedUserRoles = repository.Teams.GetScopedUserRoles(team);

    // Loop through scoped user roles and remove project reference
    foreach (var scopedUserRole in scopedUserRoles)
    {
        scopedUserRole.ProjectIds = new Octopus.Client.Model.ReferenceCollection(scopedUserRole.ProjectIds.Where(p => p != project.Id).ToArray());
        repositoryForSpace.ScopedUserRoles.Modify(scopedUserRole);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
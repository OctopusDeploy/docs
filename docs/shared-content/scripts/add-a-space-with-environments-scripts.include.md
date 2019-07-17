```powershell PowerShell
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "New Space"
$description = "Space for the new, top secret project."
$managersTeams = @() # an array of team Ids to add to Space Managers
$managerTeamMembers = @() # an array of user Ids to add to Space Managers
$environments = @('Development', 'Test', 'Production')

$body = @{
    Name = $spaceName
    Description = $description
    SpaceManagersTeams = $managersTeams
    SpaceManagersTeamMembers = $managerTeamMembers
    IsDefault = $false
    TaskQueueStopped = $false
} | ConvertTo-Json

$response = try {
    Write-Host "Creating space '$spaceName'"
    (Invoke-WebRequest $octopusURL/api/spaces -Headers $header -Method Post -Body $body -ErrorVariable octoError)
} catch [System.Net.WebException] {
    $_.Exception.Response
}

if ($octoError) {
    Write-Host "An error was encountered trying to create the space: $($octoError.Message)"
    exit
}

$space = $response.Content | ConvertFrom-Json

foreach ($environment in $environments) {
    $body = @{
        Name = $environment
    } | ConvertTo-Json

    Write-Host "Creating environment '$environment'"
    $response = try {
        (Invoke-WebRequest "$octopusURL/api/$($space.Id)/environments" -Headers $header -Method Post -Body $body -ErrorVariable octoError)
    } catch [System.Net.WebException] {
        $_.Exception.Response
    }

    if ($octoError) {
        Write-Host "An error was encountered trying to create the environment: $($octoError.Message)"
        exit
    }
}
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path 'path\to\Octopus.Client.dll'

$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

$spaceName = "New Space"
$description = "Space for the new, top secret project."
$managersTeams = @() # an array of team Ids to add to Space Managers
$managerTeamMembers = @() # an array of user Ids to add to Space Managers
$environments = @('Development', 'Test', 'Production')


$space = New-Object Octopus.Client.Model.SpaceResource -Property @{
    Name = $spaceName
    Description = $description
    SpaceManagersTeams = New-Object Octopus.Client.Model.ReferenceCollection($managersTeams)
    SpaceManagersTeamMembers = New-Object Octopus.Client.Model.ReferenceCollection($managerTeamMembers)
    IsDefault = $false
    TaskQueueStopped = $false
};

try {
    $space = $repository.Spaces.Create($space)
}
catch {
    Write-Host $_.Exception.Message
    exit
}

$repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

foreach ($environmentName in $environments) {
    $environment = New-Object Octopus.Client.Model.EnvironmentResource -Property @{
        Name = $environmentName
    }

    try {
        $repositoryForSpace.Environments.Create($environment)
    }
    catch {
        Write-Host $_.Exception.Message
        exit
    }
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";

var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

var spaceName = "New Space";
var description = "Space for the new, top secret project.";
var managersTeams = new string[] { };
var managersTeamMembers = new string[] { };

var environments = new string[] { "Development", "Test", "Production" };

var space = new SpaceResource
{
    Name = spaceName,
    Description = description,
    SpaceManagersTeams = new ReferenceCollection(managersTeams),
    SpaceManagersTeamMembers = new ReferenceCollection(managersTeamMembers),
    IsDefault = false,
    TaskQueueStopped = false
};

try
{
    Console.WriteLine($"Creating space '{spaceName}'.");
    space = repository.Spaces.Create(space);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}

var repositoryForSpace = repository.ForSpace(space);

foreach(var environmentName in environments)
{
    var environment = new EnvironmentResource {
        Name = environmentName
    };

    try
    {
        Console.WriteLine($"Creating environment '{environmentName}'.");
        repositoryForSpace.Environments.Create(environment);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
        return;
    }
}
```

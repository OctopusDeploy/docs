```powershell PowerShell
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$roleName = "My role"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get projects for space
    $projectList = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

    # Loop through projects
    foreach ($project in $projectList)
    {
        # Get project deployment process
        $deploymentProcess = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header

        # Get steps
        foreach ($step in $deploymentProcess.Steps)
        {
            if (($null -ne $step.Properties.'Octopus.Action.TargetRoles') -and ($step.Properties.'Octopus.Action.TargetRoles' -eq $roleName))
            {
                Write-Host "Step $($step.Name) of $($project.Name) is using role $roleName"
            }
        }
    }
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$roleName = "My role"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

$projectList = $repositoryForSpace.Projects.GetAll()

"Looking for steps with the role $($roleName) in them..."

foreach($project in $projectList)
{
    # Get deployment process    
    $deploymentProcess = $repositoryForSpace.DeploymentProcesses.Get($project.DeploymentProcessId)

    # Loop through steps
    foreach ($step in $deploymentProcess.Steps)
    {
        if($step.properties.'Octopus.Action.TargetRoles' -and ($step.properties.'Octopus.Action.TargetRoles'.Value.Split(',') -Icontains $roleName ))
        {
            "Step [$($step.Name)] from project [$($project.Name)] is using the role [$($roleName )]"
        }
    }
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string roleName = "My role";

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
    var projectList = repositoryForSpace.Projects.GetAll();

    // Loop through list
    foreach (var project in projectList)
    {
        // Get the deployment process
        var deploymentProcess = repositoryForSpace.DeploymentProcesses.Get(project.DeploymentProcessId);

        // Loop through steps
        foreach (var step in deploymentProcess.Steps)
        {
            // Get property value
            PropertyValueResource propertyValue = null;
            if (step.Properties.TryGetValue("Octopus.Action.TargetRoles", out propertyValue))
            {
                if ((propertyValue != null) && (propertyValue.Value.ToString().ToLower().Split(',').Contains(roleName.ToLower())))
                {
                    Console.WriteLine(string.Format("Step [{0}] from project [{1}] is using the role [{2}]", step.Name, project.Name, roleName));
                }
            }
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
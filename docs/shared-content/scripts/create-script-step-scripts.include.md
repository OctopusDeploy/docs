```powershell

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$space = "Spaces-1"

# Project details
$projectName = "MyProject"

try
{
    # Get project
    $project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$space/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

    # Get deployment process
    $deploymentProcess = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$space/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header)

    # Get current steps
    $steps = $deploymentProcess.Steps

    # Add new step to process
    $steps += @{
      Name = "Run a script"
      Properties = @{
        'Octopus.Action.TargetRoles' = "Test-Role"
      }  
      Condition = "Success"
      StartTrigger = "StartAfterPrevious"
      PackageRequirement = "LetOctopusDecide"
      Actions = @(
        @{
            ActionType = "Octopus.Script"
            Name = "Run a script"
            Environments = @()
            ExcludedEnvironments = @()
            Channels = @()
            TenantTags = @()
            Properties = @{
                'Octopus.Action.RunOnServer' = "false"
                'Octopus.Action.EnabledFeatures' = ""
                'Octopus.Action.Script.ScriptSource' = "Inline"
                'Octopus.Action.Script.Syntax' = "PowerShell"
                'Octopus.Action.Script.ScriptFilename' = $null
                'Octopus.Action.Script.ScriptBody' = "Write-Host `"Hello world`""
            }
            Packages = @()
            IsDisabled = $false
            WorkerPoolId = ""
            WorkerPoolVariable = ""
            Container = @{
                "FeedId" = $null
                "Image" = $null
            }
            CanBeUsedForProjectVersioning = $false
            IsRequired = $false
        }
      )
    }

    # Convert steps to json
    $deploymentProcess.Steps = $steps
    $jsonPayload = $deploymentProcess | ConvertTo-Json -Depth 10

    # Submit request
    Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$space/deploymentprocesses/$($project.DeploymentProcessId)" -Headers $header -Body $jsonPayload
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path 'Octopus.Client.dll' 

$apikey = 'API-MCPLE1AQM2VKTRFDLIBMORQHBXA' # Get this from your profile
$octopusURI = 'http://localhost' # Your server address

$projectId = "Projects-100" # Get this from /api/projects
$stepName = "Run a script" # The name of the step
$role = "demo-role" # The machine role to run this step on
$scriptBody = "Write-Host 'Hello world'" # The script to run

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURI,$apikey 
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

$project = $repository.Projects.Get($projectId)
$process = $repository.DeploymentProcesses.Get($project.DeploymentProcessId)

$step = New-Object Octopus.Client.Model.DeploymentStepResource
$step.Name = $stepName
$step.Condition = [Octopus.Client.Model.DeploymentStepCondition]::Success
$step.Properties.Add("Octopus.Action.TargetRoles", $role)

$scriptAction = New-Object Octopus.Client.Model.DeploymentActionResource
$scriptAction.ActionType = "Octopus.Script"
$scriptAction.Name = $stepName
$scriptAction.Properties.Add("Octopus.Action.Script.ScriptBody", $scriptBody)

$step.Actions.Add($scriptAction)

$process.Steps.Add($step)

$repository.DeploymentProcesses.Modify($process)

```
```csharp C#
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "http://OctoTemp";
var octopusAPIKey = "API-DY8544IVQCQX8JXCGNH4URENNY";
string stepName = "Run a script";
string roleName = "Test-role";
string scriptBody = "Write-Host \"Hello world\"";
string projectName = "MyProject";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

try
{
    // Get project
    var project = repository.Projects.FindByName(projectName);

    // Get the deployment process
    var deploymentProcess = repository.DeploymentProcesses.Get(project.DeploymentProcessId);

    // Create new step object
    Octopus.Client.Model.DeploymentStepResource newStep = new DeploymentStepResource();
    newStep.Name = stepName;
    newStep.Condition = DeploymentStepCondition.Success;
    newStep.Properties.Add("Octopus.Action.TargetRoles", roleName);

    // Create new script action
    Octopus.Client.Model.DeploymentActionResource stepAction = new DeploymentActionResource();
    stepAction.ActionType = "Octopus.Script";
    stepAction.Name = stepName;
    stepAction.Properties.Add("Octopus.Action.Script.ScriptBody", scriptBody);

    // Add step action and step to process
    newStep.Actions.Add(stepAction);
    deploymentProcess.Steps.Add(newStep);

    // Update process
    repository.DeploymentProcesses.Modify(deploymentProcess);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
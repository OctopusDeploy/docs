```powershell

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$space = "Spaces-1"
$role = "My role"
$scriptBody = "Write-Host `"Hello world`""

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
        'Octopus.Action.TargetRoles' = $role
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
                'Octopus.Action.Script.ScriptBody' = $scriptBody
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
# Load Octopous Client assembly
Add-Type -Path 'c:\octopus.client\Octopus.Client.dll' 

# Declare Octopus variables
$apikey = 'API-YOURAPIKEY' 
$octopusURI = 'https://youroctourl'
$projectName = "MyProject"

# Create repository object
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURI,$apikey 
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

try
{
    # Get project
    $project = $repository.Projects.FindByName($projectName)

    # Get project process
    $process = $repository.DeploymentProcesses.Get($project.DeploymentProcessId)

    # Define new step
    $stepName = "Run a script" 
    $role = "My role" 
    $scriptBody = "Write-Host 'Hello world'" 
    $step = New-Object Octopus.Client.Model.DeploymentStepResource
    $step.Name = $stepName
    $step.Condition = [Octopus.Client.Model.DeploymentStepCondition]::Success
    $step.Properties.Add("Octopus.Action.TargetRoles", $role)

    # Define script action
    $scriptAction = New-Object Octopus.Client.Model.DeploymentActionResource
    $scriptAction.ActionType = "Octopus.Script"
    $scriptAction.Name = $stepName
    $scriptAction.Properties.Add("Octopus.Action.Script.ScriptBody", $scriptBody)

    # Add step to process
    $step.Actions.Add($scriptAction)
    $process.Steps.Add($step)
    $repository.DeploymentProcesses.Modify($process)
}
catch
{
    # Display error
    Write-Host $_.Exception.Message
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "http://OctoTemp";
var octopusAPIKey = "API-DY8544IVQCQX8JXCGNH4URENNY";
string stepName = "Run a script";
string roleName = "My role";
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
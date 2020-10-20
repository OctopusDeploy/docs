```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$projectName = "MyProject"
$variable = @{
    Name = "MyVariable"
    Value = "MyValue"
    Type = "String"
    IsSensitive = $false
}

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get project
$project = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header) | Where-Object {$_.Name -eq $projectName}

# Get project variables
$projectVariables = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Headers $header

# Check to see if varialbe is already present
$variableToUpdate = $projectVariables.Variables | Where-Object {$_.Name -eq $variable.Name}
if ($null -eq $variableToUpdate)
{
    # Create new object
    $variableToUpdate = New-Object -TypeName PSObject
    $variableToUpdate | Add-Member -MemberType NoteProperty -Name "Name" -Value $variable.Name
    $variableToUpdate | Add-Member -MemberType NoteProperty -Name "Value" -Value $variable.Value
    $variableToUpdate | Add-Member -MemberType NoteProperty -Name "Type" -Value $variable.Type
    $variableToUpdate | Add-Member -MemberType NoteProperty -Name "IsSensitive" -Value $variable.IsSensitive

    # Add to collection
    $projectVariables.Variables += $variableToUpdate

    $projectVariables.Variables
}        

# Update the value
$variableToUpdate.Value = $variable.Value

# Update the collection
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Headers $header -Body ($projectVariables | ConvertTo-Json -Depth 10)
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "c:\octopus.client\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$projectName = "MyProject"
$variable = @{
    Name = "MyVariable"
    Value = "MyValue"
    Type = "String"
    IsSensitive = $false
}

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get project
    [Octopus.Client.Model.ProjectResource]$project = $repositoryForSpace.Projects.FindByName($projectName)

    # Get project variables
    $projectVariables = $repositoryForSpace.VariableSets.Get($project.VariableSetId)

    # Check to see if variable exists
    $variableToUpdate = ($projectVariables.Variables | Where-Object {$_.Name -eq $variable.Name})
    if ($null -eq $variableToUpdate)
    {
        # Create new object
        $variableToUpdate = New-Object Octopus.Client.Model.VariableResource
        $variableToUpdate.Name = $variable.Name
        $variableToUpdate.IsSensitive = $variable.IsSensitive
        $variableToUpdate.Value = $variable.Value
        $variableToUpdate.Type = $variable.Type

        # Add to collection
        $projectVariables.Variables.Add($variableToUpdate)
    }
    else
    {
        # Update the value
        $variableToUpdate.Value = $variable.Value
    }

    # Update the projectvariable
    $repositoryForSpace.VariableSets.Modify($projectVariables)
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
string spaceName = "default";
string projectName = "MyProject";
System.Collections.Hashtable variable = new System.Collections.Hashtable()
{
    { "Name", "MyVariable" },
    {"Value", "MyValue" },
    {"Type", "String" },
    {"IsSensitive", false }
};

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

    // Get project variables
    var projectVariables = repositoryForSpace.VariableSets.Get(project.VariableSetId);

    // Check to see if variable exists
    var variableToUpdate = projectVariables.Variables.FirstOrDefault(v => v.Name == (variable["Name"]).ToString());
    if (variableToUpdate == null)
    {
        // Create new variable object
        variableToUpdate = new Octopus.Client.Model.VariableResource();
        variableToUpdate.Name = variable["Name"].ToString();
        variableToUpdate.Value = variable["Value"].ToString();
        variableToUpdate.Type = (Octopus.Client.Model.VariableType)Enum.Parse(typeof(Octopus.Client.Model.VariableType), variable["Type"].ToString());
        variableToUpdate.IsSensitive = bool.Parse(variable["IsSensitive"].ToString());

        // Add to collection
        projectVariables.Variables.Add(variableToUpdate);
    }
    else
    {
        // Update value
        variableToUpdate.Value = variable["Value"].ToString();
    }

    // Update collection
    repositoryForSpace.VariableSets.Modify(projectVariables);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
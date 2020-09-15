```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

Function Clear-SensitiveVariables
{
    # Define function variables
    param ($VariableCollection)

    # Loop through variables
    foreach ($variable in $VariableCollection)
    {
        # Check for sensitive
        if ($variable.IsSensitive)
        {
            $variable.Value = [string]::Empty
        }
    }

    # Return collection
    return $VariableCollection
}

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get all projects
    $projects = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

    # Loop through projects
    foreach ($project in $projects)
    {
        # Get variable set
        $variableSet = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Headers $header
        
        # Check for variables
        if ($variableSet.Variables.Count -gt 0)
        {
            $variableSet.Variables = Clear-SensitiveVariables -VariableCollection $variableSet.Variables

            # Update set
            Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Body ($variableSet | ConvertTo-Json -Depth 10) -Headers $header
        }
    }

    # Get all libarary sets
    $variableSets = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets/all" -Headers $header

    # Loop through variablesets
    foreach ($variableSet in $variableSets)
    {
        # Get the variableset
        $variableSet = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets/$($variableSet.Id)" -Headers $header
        
        # Check for variables
        if ($variableSet.Variables.Count -gt 0)
        {
            $variableSet.Variables = Clear-SensitiveVariables -VariableCollection $variableSet.Variables

            # Update set
            Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets/$($variableSet.Id)" -Body ($variableSet | ConvertTo-Json -Depth 10) -Headers $header            
        }
    }
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
$spaceName = "default"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

Function Clear-SensitiveVariables
{
    # Define function variables
    param ($VariableSetId)

    # Get the variable set
    $variableSet = $repositoryForSpace.VariableSets.Get($VariableSetId)

    # Loop through variables
    foreach ($variable in $VariableSet)
    {
        # Check for sensitive
        if ($variable.IsSensitive)
        {
            $variable.Value = [string]::Empty
        }
    }

    # Update set
    $repositoryForSpace.VariableSets.Modify($variableSet)
}

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Loop through projects
    foreach ($project in $repositoryForSpace.Projects.GetAll())
    {
        # Clear the sensitive ones
        Clear-SensitiveVariables -VariableSetId $project.VariableSetId
    }
    
    # Loop through library variable sets
    foreach ($libararySet in $repositoryForSpace.LibraryVariableSets.GetAll())
    {
        # Clear sensitive ones
        Clear-SensitiveVariables -VariableSetId $libararySet.VariableSetId
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

// Declare working variables
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
var spaceName = "default";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Loop through projects
    foreach (var project in repositoryForSpace.Projects.GetAll())
    {
        var variableSet = repositoryForSpace.VariableSets.Get(project.VariableSetId);

        foreach (var variable in variableSet.Variables)
        {
            if (variable.IsSensitive)
            {
                variable.Value = string.Empty;
            }
        }

        repositoryForSpace.VariableSets.Modify(variableSet);
    }

    // Loop through library sets
    foreach (var librarySet in repositoryForSpace.LibraryVariableSets.FindAll())
    {
        var variableSet = repositoryForSpace.VariableSets.Get(librarySet.VariableSetId);

        foreach (var variable in variableSet.Variables)
        {
            if (variable.IsSensitive)
            {
                variable.Value = string.Empty;
            }
        }

        repositoryForSpace.VariableSets.Modify(variableSet);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
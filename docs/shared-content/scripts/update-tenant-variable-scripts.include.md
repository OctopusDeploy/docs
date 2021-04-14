```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default" # Name of the Space
$tenantName = "TenantName" # The tenant name
$variableTemplateName = "ProjectTemplateName" # Choose the template Name
$newValue = "NewValue" # Choose a new variable value, assumes same per environment
$NewValueIsBoundToOctopusVariable=$False # Choose $True if the $newValue is an Octopus variable e.g. #{SomeValue}

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get Tenant
$tenantsSearch = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/tenants?name=$tenantName" -Headers $header)
$tenant = $tenantsSearch.Items | Select-Object -First 1

# Get Tenant Variables
$variables = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/tenants/$($tenant.Id)/variables" -Headers $header)

# Get project templates
$projects = $variables.ProjectVariables | Get-Member | Where-Object {$_.MemberType -eq "NoteProperty"} | Select-Object -ExpandProperty "Name"

# Loop through each project template
foreach ($projectKey in $projects)
{
    # Get connected project
    $project = $variables.ProjectVariables.$projectKey
    $projectName = $project.ProjectName
    Write-Host "Working on Project: $projectName ($projectKey)"

    # Get Project template ID
    $variableTemplate = ($project.Templates | Where-Object Name -eq $variableTemplateName | Select-Object -First 1)
    
    
    if($null -ne $variableTemplate) {

        $variableTemplateId = $variableTemplate.Id
        $variableTemplateIsSensitiveControlType = $variableTemplate.DisplaySettings.{Octopus.ControlType} -eq "Sensitive"

        Write-Host "Found templateId for Template: $variableTemplateName = $variableTemplateId"
        $projectConnectedEnvironments = $project.Variables | Get-Member | Where-Object {$_.MemberType -eq "NoteProperty"} | Select-Object -ExpandProperty "Name"

        # Loop through each of the connected environments variables
        foreach($envKey in $projectConnectedEnvironments) {
            # Check for Environment project template entry, and add if not present
            if($null -eq $project.Variables.$envKey.$variableTemplateId) {
                $project.Variables.$envKey | Add-Member -MemberType NoteProperty -Name $variableTemplateId -Value $newValue
            }

            # Check sensitive control types differently
            if($variableTemplateIsSensitiveControlType -eq $True) {
                # If $newValue denotes an octopus variable e.g. #{SomeVar}, treat it as if it were text
                if($NewValueIsBoundToOctopusVariable -eq $True) {      
                    Write-Host "Adding in new text value (treating as octopus variable) in Environment '$envKey' for $variableTemplateName"             
                    $project.Variables.$envKey.$variableTemplateId = $newValue
                }    
                else {
                    $newSensitiveValue = [PsCustomObject]@{
                        HasValue = $True
                        NewValue = $newValue
                    }
                    Write-Host "Adding in new sensitive value = '********' in Environment '$envKey' for $variableTemplateName"
                    $project.Variables.$envKey.$variableTemplateId = $newSensitiveValue
                }
            } 
            else {
                Write-Host "Adding in new value = $newValue in Environment '$envKey' for $variableTemplateName"
                $project.Variables.$envKey.$variableTemplateId = $newValue
            }       
        }
    }
    else {
        Write-Host "Couldnt find project template: $variableTemplateName for project $projectName"
    }
}
# Update the variables with the new value
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/tenants/$($tenant.Id)/variables" -Headers $header -Body ($variables | ConvertTo-Json -Depth 10)
```
```powershell PowerShell (Octopus.Client)
# You can get this dll from your Octopus Server/Tentacle installation directory or from
# https://www.nuget.org/packages/Octopus.Client/
Add-Type -Path 'Octopus.Client.dll' 

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

$spaceName = "Default" # Name of the Space
$tenantName = "TenantName" # The tenant name
$variableTemplateName = "ProjectTemplateName" # Choose the template Name
$newValue = "NewValue" # Choose a new variable value, assumes same per environment
$NewValueIsBoundToOctopusVariable=$False # Choose $True if the $newValue is an Octopus variable e.g. #{SomeValue}

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $spaceRepository = $client.ForSpace($space)

    # Get Tenant
    $tenant = $spaceRepository.Tenants.FindByName($tenantName)
    
    # Get Tenant Variables
    $variables = $spaceRepository.Tenants.GetVariables($tenant)

    # Loop through each Project Template
    foreach($projectKey in $variables.ProjectVariables.Keys)
    {
        # Get connected project
        $project = $variables.ProjectVariables[$projectKey]
        $projectName = $project.ProjectName
        Write-Host "Working on Project: $projectName ($projectKey)"
        
        # Get Project template ID
        $variableTemplate = ($project.Templates | Where-Object Name -eq $variableTemplateName | Select-Object -First 1)
        $variableTemplateId = $variableTemplate.Id
        $variableTemplateIsSensitiveControlType = $variableTemplate.DisplaySettings.{Octopus.ControlType} -eq "Sensitive"

        if($null -ne $variableTemplateId) {

            Write-Host "Found templateId for Template: $variableTemplateName = $variableTemplateId"

            # Loop through each of the connected environments variables
            foreach($envKey in $project.Variables.Keys) {
                                        
                # Set null value in case not set
                $project.Variables[$envKey][$variableTemplateId] = $null

                # Check sensitive control types differently
                if($variableTemplateIsSensitiveControlType -eq $True) {
                    
                    # If $newValue denotes an octopus variable e.g. #{SomeVar}, treat it as if it were text
                    if($NewValueIsBoundToOctopusVariable -eq $True) {      
                        Write-Host "Adding in new text value (treating as octopus variable) in Environment '$envKey' for $variableTemplateName"             
                        $project.Variables[$envKey][$variableTemplateId] = New-Object Octopus.Client.Model.PropertyValueResource $newValue
                    }    
                    else {
                        Write-Host "Adding in new sensitive value = '********' in Environment '$envKey' for $variableTemplateName"
                        $sensitiveValue = New-Object Octopus.Client.Model.SensitiveValue 
                        $sensitiveValue.HasValue = $True
                        $sensitiveValue.NewValue = $newValue
                        $project.Variables[$envKey][$variableTemplateId] = $sensitiveValue
                    }
                } 
                else {
                    Write-Host "Adding in new value = $newValue in Environment '$envKey' for $variableTemplateName"
                    $project.Variables[$envKey][$variableTemplateId] = New-Object Octopus.Client.Model.PropertyValueResource $newValue
                }
            }
        }
        else {
            Write-Host "Couldnt find project template: $variableTemplateName for project $projectName"
        }
    }

    # Update the variables with the new value
    $spaceRepository.Tenants.ModifyVariables($tenant, $variables) | Out-Null
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

var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
var spaceName = "Default";
var tenantName = "TenantName";
var projectVariableTemplateName = "TemplateName";
var variableNewValue = "NewValue";
var valueBoundToOctoVariable = true;

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get tenant
    var tenant = repositoryForSpace.Tenants.FindByName(tenantName);

    // Get tenant variables
    var variables = repositoryForSpace.Tenants.GetVariables(tenant);

    // Loop through tenant variables
    foreach (var projectKey in variables.ProjectVariables.Keys)
    {
        var project = variables.ProjectVariables[projectKey];
        var projectName = project.ProjectName;
        Console.WriteLine("Working on Project: {0} ({1})", projectName, projectKey);

        // Get project template ID.
        var variableTemplateResource = project.Templates.FirstOrDefault(t => t.Name == projectVariableTemplateName);

        if (variableTemplateResource != null)
        {
            var variableTemplateId = variableTemplateResource.Id;
            var variableTemplateIsSensitiveControlType = (variableTemplateResource.DisplaySettings.FirstOrDefault(ds => ds.Key == "Octopus.ControlType")).Value == "Sensitive";
            Console.WriteLine("Found templateid for template: {0} of {1}", projectVariableTemplateName, variableTemplateId);

            // Loop through each of the connected environments
            foreach (var envKey in project.Variables.Keys)
            {
                // Set null value in case not set
                project.Variables[envKey][variableTemplateId] = null;

                if (variableTemplateIsSensitiveControlType == true)
                {
                    if (valueBoundToOctoVariable == true)
                    {
                        Console.WriteLine("Adding in new text value (treating as octopus variable) in Environment '{0}' for {1}", envKey, projectVariableTemplateName);
                        project.Variables[envKey][variableTemplateId] = new PropertyValueResource(variableNewValue);
                    }
                    else
                    {
                        Console.WriteLine("Adding in new sensitive value = '********' in Environment '{0}' for {1}", envKey, projectVariableTemplateName);
                        var sensitiveValue = new SensitiveValue { HasValue = true, NewValue = variableNewValue };
                        project.Variables[envKey][variableTemplateId] = new PropertyValueResource(sensitiveValue);
                    }
                }
                else
                {
                    //Write-Host "Adding in new value = $newValue in Environment '$envKey' for $variableTemplateName"
                    Console.WriteLine("Adding in new value = '{0}' in Environment '{1}' for {2}", variableNewValue, envKey, projectVariableTemplateName);
                    project.Variables[envKey][variableTemplateId] = new PropertyValueResource(variableNewValue);
                }
            }
        }
        else
        {
            Console.WriteLine("Couldnt find project template: {0} for project {1}", projectVariableTemplateName, projectName);
        }
    }

    // Update the variables with the new value
    repositoryForSpace.Tenants.ModifyVariables(tenant, variables);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
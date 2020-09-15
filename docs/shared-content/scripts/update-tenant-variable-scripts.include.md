```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default" # Name of the Space
$tenantName = "TenantName" # The tenant name
$variableTemplateName = "ProjectTemplateName" # Choose the template Name
$newValue = "NewValue" # Choose a new variable value, assumes same per environment

try
{
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
        $variableTemplateId = ($project.Templates | Where-Object Name -eq $variableTemplateName | Select-Object -First 1).Id
        
        if($null -ne $variableTemplateId) {

            Write-Host "Found templateId for Template: $variableTemplateName = $variableTemplateId"
            $projectConnectedEnvironments = $project.Variables | Get-Member | Where-Object {$_.MemberType -eq "NoteProperty"} | Select-Object -ExpandProperty "Name"

        
            #$project.Variables
            # Loop through each of the connected environments variables
            foreach($envKey in $projectConnectedEnvironments) {
                
                # Find variable which matches the current connected environment
                $currentValue = $project.Variables.$envKey.$variableTemplateId
                
                # If null / only default value exists, add new value in 
                if($null -eq $currentValue ) {
                    Write-Host "No value found for $variableTemplateName, adding in new value = $newValue for Environment '$envKey' "
                    $project.Variables.$envKey | Add-Member -MemberType NoteProperty -Name $variableTemplateId -Value $newValue
                } 
                else {
                    # Get Current value
                    Write-Host "Found $variableTemplateName in Environment '$envKey' with Value = $currentValue"
                    # Set the new value for this connected environment
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
}
catch
{
    Write-Host $_.Exception.Message
}
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
        $variableTemplateId = ($project.Templates | Where-Object Name -eq $variableTemplateName | Select-Object -First 1).Id
        if($null -ne $variableTemplateId) {

            Write-Host "Found templateId for Template: $variableTemplateName = $variableTemplateId"

            # Loop through each of the connected environments variables
            foreach($envKey in $project.Variables.Keys) {
            
                # Find variable which matches the current connected environment
                $templateEnvVariableObject = ($project.Variables[$envKey].GetEnumerator() | Where-Object Key -eq $variableTemplateId | Select-Object -ExpandProperty Value -First 1)
            
                # If null / only default value exists, add new value in 
                if($null -eq $templateEnvVariableObject ) {
                    Write-Host "No value found for $variableTemplateName, adding in new Value=$newValue for Environment '$envKey' "
                    $project.Variables[$envKey][$variableTemplateId] = New-Object Octopus.Client.Model.PropertyValueResource $newValue
                } 
                else {

                    # Get Current value
                    $currentValue = $templateEnvVariableObject.Value
                    Write-Host "Found $variableTemplateName in Environment '$envKey' with Value = $currentValue"
        
                    # Set the new value for this connected environment
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
    Write-Host $_.Exception.Message for
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
            Console.WriteLine("Found templateid for template: {0} of {1}", projectVariableTemplateName, variableTemplateId);

            // Loop through each of the connected environments
            foreach (var envKey in project.Variables.Keys)
            {
                // Find variable which matches the current connected environment.
                var templateEnvironmentVariable = project.Variables[envKey].Where(x => x.Key == variableTemplateId).Select(x => x.Value).FirstOrDefault();
                if (templateEnvironmentVariable == null)
                {
                    Console.WriteLine("No value found for {0}, adding in new Value={1} for Environment '{2}' ", projectVariableTemplateName, variableNewValue, envKey);
                    project.Variables[envKey][variableTemplateId] = new PropertyValueResource(variableNewValue);
                }
                else
                {
                    // Get current value
                    var currentValue = templateEnvironmentVariable.Value;
                    Console.WriteLine("Found {0} in Environment '{1}' with value {2}", projectVariableTemplateName, envKey, currentValue);

                    // Set the new value for this connected environment
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
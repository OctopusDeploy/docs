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
```python Python3
import json
import requests
from requests.api import get, head

def get_octopus_resource(uri, headers, skip_count = 0):
    items = []
    skip_querystring = ""

    if '?' in uri:
        skip_querystring = '&skip='
    else:
        skip_querystring = '?skip='

    response = requests.get((uri + skip_querystring + str(skip_count)), headers=headers)
    response.raise_for_status()

    # Get results of API call
    results = json.loads(response.content.decode('utf-8'))

    # Store results
    if 'Items' in results.keys():
        items += results['Items']

        # Check to see if there are more results
        if (len(results['Items']) > 0) and (len(results['Items']) == results['ItemsPerPage']):
            skip_count += results['ItemsPerPage']
            items += get_octopus_resource(uri, headers, skip_count)

    else:
        return results

    
    # return results
    return items

octopus_server_uri = 'https://your.octopus.app'
octopus_api_key = 'API-YOURKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
tenant_name = "MyTenant"
variable_template_name = "Tenant.Site.HostName"
new_value = "MyValue"
new_value_bound_to_octopus_variable = False

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get tenants
uri = '{0}/api/{1}/tenants'.format(octopus_server_uri, space['Id'])
tenants = get_octopus_resource(uri, headers)
tenant = next((t for t in tenants if t['Name'] == tenant_name), None)

# Get tenant variables
uri = '{0}/api/{1}/tenants/{2}/variables'.format(octopus_server_uri, space['Id'], tenant['Id'])
tenant_variables = get_octopus_resource(uri, headers)
variable_template = None

# Loop through connected projects
for projectKey in tenant_variables['ProjectVariables']:
    templates = tenant_variables['ProjectVariables'][projectKey]['Templates']
    
    # Loop through the project templates
    for template in templates:
        is_sensitive = (template['DisplaySettings']['Octopus.ControlType'] == 'Sensitive')
        if template['Name'] == variable_template_name:
            variable_template = template
            break
    
    if variable_template != None:
        # Loop through connected environments
        environment_variables = tenant_variables['ProjectVariables'][projectKey]['Variables']
        
        for environment_variable in environment_variables:
            variables = tenant_variables['ProjectVariables'][projectKey]['Variables'][environment_variable]
            if is_sensitive:
                new_sensitive_variable = {
                    'HasValue': True,
                    'NewValue': new_value_bound_to_octopus_variable
                }
                variables[variable_template['Id']] = new_sensitive_variable
            else:
                variables[variable_template['Id']] = new_value

# Update the tenants variables
uri = '{0}/api/{1}/tenants/{2}/variables'.format(octopus_server_uri, space['Id'], tenant['Id'])
response = requests.put(uri, headers=headers, json=tenant_variables)
response.raise_for_status()
```
```go Go
package main

import (
	"fmt"
	"log"
	"net/url"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"

	spaceName := "Default"
	tenantName := "MyTenant"
	variableTemplateName := "MyTemplate"
	newValue := "MyValue"

	// Get the space object
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client for space
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get tenant
	tenant := GetTenant(client, tenantName, 0)

	tenantVariables, err := client.Tenants.GetVariables(tenant)
	if err != nil {
		log.Println(err)
	}

	// Loop through the project variables
	for i, projectVariables := range tenantVariables.ProjectVariables {
		projectTemplate := octopusdeploy.ActionTemplateParameter{}
		for _, template := range projectVariables.Templates {
			if template.Name == variableTemplateName {
				projectTemplate = *template
				break
			}
		}

		for environment, variables := range projectVariables.Variables {
			fmt.Println(environment)
			for template, element := range variables {
				if template == projectTemplate.ID {
					newPropertyValue := octopusdeploy.NewPropertyValue(newValue, element.IsSensitive)
					element = newPropertyValue
					tenantVariables.ProjectVariables[i].Variables[environment][template] = element
				}
			}
		}
	}

	// Update tenant variables
	tenantVariables, err = client.Tenants.UpdateVariables(tenant, tenantVariables)
	if err != nil {
		log.Println(err)
	}

}

func octopusAuth(octopusURL *url.URL, APIKey, space string) *octopusdeploy.Client {
	client, err := octopusdeploy.NewClient(nil, octopusURL, APIKey, space)
	if err != nil {
		log.Println(err)
	}

	return client
}

func GetSpace(octopusURL *url.URL, APIKey string, spaceName string) *octopusdeploy.Space {
	client := octopusAuth(octopusURL, APIKey, "")
	spaceQuery := octopusdeploy.SpacesQuery{
		Name: spaceName,
	}

	// Get specific space object
	spaces, err := client.Spaces.Get(spaceQuery)

	if err != nil {
		log.Println(err)
	}

	for _, space := range spaces.Items {
		if space.Name == spaceName {
			return space
		}
	}

	return nil
}

func GetTenant(client *octopusdeploy.Client, tenantName string, skip int) *octopusdeploy.Tenant {
	tenantQuery := octopusdeploy.TenantsQuery{
		Name: tenantName,
	}

	// Get tenants
	tenants, err := client.Tenants.Get(tenantQuery)

	if err != nil {
		log.Println(err)
	}

	// Check what's been returned
	if len(tenants.Items) == tenants.ItemsPerPage {
		tenant := GetTenant(client, tenantName, (skip + len(tenants.Items)))

		if tenant != nil {
			return tenant
		}
	} else {
		// Loop through
		for _, tenant := range tenants.Items {
			if tenant.Name == tenantName {
				return tenant
			}
		}
	}

	return nil
}
```
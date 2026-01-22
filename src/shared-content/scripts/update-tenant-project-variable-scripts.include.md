<details data-group="update-tenant-variable-scripts">
<summary>PowerShell (REST API)</summary>

```powershell
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your-octopus-url"
$octopusAPIKey = "API-YOUR-KEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

$spaceName = "Default" # Name of the space
$tenantName = "TenantName" # The tenant name
$projectVariableTemplateName = "ProjectTemplateName" # Choose the template name
$newValue = "NewValue" # Choose a new variable value, assumes same per environment
$NewValueIsBoundToOctopusVariable=$False # Choose $True if the $newValue is an Octopus variable e.g. #{SomeValue}

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get Tenant
$tenantsSearch = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/tenants?name=$tenantName" -Headers $header)
$tenant = $tenantsSearch.Items | Select-Object -First 1

# Get Project Tenant Variables (including missing variables)
$projectVariablesUri = "$octopusURL/api/$($space.Id)/tenants/$($tenant.Id)/projectvariables?includeMissingVariables=true"
$projectVariables = (Invoke-RestMethod -Method Get -Uri $projectVariablesUri -Headers $header)

# Build update payload
$updatePayload = @{
  Variables = @()
}

# Loop through project variables
foreach ($variable in $projectVariables.Variables) {
  if ($variable.Template.Name -eq $projectVariableTemplateName) {
    Write-Host "Found project variable template: $projectVariableTemplateName (Template ID: $($variable.Template.Id), Project ID: $($variable.ProjectId))"

    # Create new variable entry
    $variableEntry = @{
      ProjectId = $variable.ProjectId
      TemplateId = $variable.Template.Id
      Scope = @{
        EnvironmentIds = $variable.Scope.EnvironmentIds
      }
    }

    # Handle sensitive values
    if($variable.Template.DisplaySettings["Octopus.ControlType"] -eq "Sensitive") {
      if($NewValueIsBoundToOctopusVariable -eq $True) {
        $variableEntry.Value = $newValue
      } else {
        $variableEntry.Value = @{
          HasValue = $true
          NewValue = $newValue
        }
      }
      Write-Host "Updated sensitive variable for environments: $($variable.Scope.EnvironmentIds -join ', ')"
    } else {
      $variableEntry.Value = $newValue
      Write-Host "Updated variable value to '$newValue' for environments: $($variable.Scope.EnvironmentIds -join ', ')"
    }

    $updatePayload.Variables += $variableEntry
  } else {
    # Keep existing variables unchanged
    $updatePayload.Variables += @{
      Id = $variable.Id
      ProjectId = $variable.ProjectId
      TemplateId = $variable.TemplateId
      Value = $variable.Value
      Scope = $variable.Scope
    }
  }
}

# Handle variables that need to be created
if ($projectVariables.MissingVariables) {
  foreach ($missingVariable in $projectVariables.MissingVariables) {
    if ($missingVariable.Template.Name -eq $projectVariableTemplateName) {
      Write-Host "Found missing project variable template: $projectVariableTemplateName (Template ID: $($missingVariable.Template.Id), Project ID: $($missingVariable.ProjectId))"

      # Create new variable entry for missing variable
      $variableEntry = @{
        ProjectId = $missingVariable.ProjectId
        TemplateId = $missingVariable.Template.Id
        Scope = @{
          EnvironmentIds = $missingVariable.Scope.EnvironmentIds
        }
      }

      # Handle sensitive values
      if($missingVariable.Template.DisplaySettings["Octopus.ControlType"] -eq "Sensitive") {
        if($NewValueIsBoundToOctopusVariable -eq $True) {
          $variableEntry.Value = $newValue
        } else {
          $variableEntry.Value = @{
            HasValue = $true
            NewValue = $newValue
          }
        }
        Write-Host "Created sensitive variable for missing template"
      } else {
        $variableEntry.Value = $newValue
        Write-Host "Created variable value '$newValue' for missing template"
      }

      $updatePayload.Variables += $variableEntry
    }
  }
}

# Update project variables
Invoke-RestMethod -Method Put -Uri "$octopusURL/api/$($space.Id)/tenants/$($tenant.Id)/projectvariables" -Headers $header -Body ($updatePayload | ConvertTo-Json -Depth 10)
Write-Host "Successfully updated project tenant variables"
```

</details>
<details data-group="update-tenant-variable-scripts">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# You can get this dll from your Octopus Server/Tentacle installation directory or from
# https://www.nuget.org/packages/Octopus.Client/
Add-Type -Path 'Octopus.Client.dll'

# Octopus variables
$octopusURL = "https://your-octopus-url"
$octopusAPIKey = "API-YOUR-KEY"

$spaceName = "Default" # Name of the Space
$tenantName = "TenantName" # The tenant name
$projectVariableTemplateName = "ProjectTemplateName" # Choose the template Name
$newValue = "NewValue" # Choose a new variable value
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

  # Get Project Tenant Variables (including missing variables)
  $projectVariablesRequest = New-Object Octopus.Client.Model.TenantVariables.GetProjectVariablesByTenantIdRequest($tenant.Id, $space.Id)
  $projectVariablesRequest.IncludeMissingVariables = $true
  $projectVariables = $spaceRepository.TenantVariables.Get($projectVariablesRequest)

  # Build update payload
  $variablesToModify = @()

  # Loop through project variables
  foreach ($variable in $projectVariables.Variables) {
    if ($variable.Template.Name -eq $projectVariableTemplateName) {
      Write-Host "Found project variable template: $projectVariableTemplateName (Template ID: $($variable.Template.Id), Project ID: $($variable.ProjectId))"

      # Handle sensitive values
      if($variable.Template.DisplaySettings["Octopus.ControlType"] -eq "Sensitive") {
        if($NewValueIsBoundToOctopusVariable -eq $True) {
          $newPropertyValue = New-Object Octopus.Client.Model.PropertyValueResource($newValue, $false)
        } else {
          $newPropertyValue = New-Object Octopus.Client.Model.PropertyValueResource
          $newPropertyValue.SensitiveValue = @{
            HasValue = $true
            NewValue = $newValue
          }
          $newPropertyValue.IsSensitive = $true
        }
        Write-Host "Updated sensitive variable for environments: $($variable.Scope.EnvironmentIds -join ', ')"
      } else {
        $newPropertyValue = New-Object Octopus.Client.Model.PropertyValueResource($newValue, $false)
        Write-Host "Updated variable value to '$newValue' for environments: $($variable.Scope.EnvironmentIds -join ', ')"
      }

      # Create new payload entry
      $variablePayload = New-Object Octopus.Client.Model.TenantVariables.TenantProjectVariablePayload(
      $variable.ProjectId,
      $variable.TemplateId,
      $newPropertyValue,
      $variable.Scope
      )

      $variablesToModify += $variablePayload
    } else {
      # Keep existing variables unchanged
      $variablePayload = New-Object Octopus.Client.Model.TenantVariables.TenantProjectVariablePayload(
      $variable.ProjectId,
      $variable.TemplateId,
      $variable.Value,
      $variable.Scope
      )
      $variablePayload.Id = $variable.Id

      $variablesToModify += $variablePayload
    }
  }

  # Handle variables that need to be created
  if ($projectVariables.MissingVariables) {
    foreach ($missingVariable in $projectVariables.MissingVariables) {
      if ($missingVariable.Template.Name -eq $projectVariableTemplateName) {
        Write-Host "Found missing project variable template: $projectVariableTemplateName (Template ID: $($missingVariable.Template.Id), Project ID: $($missingVariable.ProjectId))"

        # Handle sensitive values
        if($missingVariable.Template.DisplaySettings["Octopus.ControlType"] -eq "Sensitive") {
          if($NewValueIsBoundToOctopusVariable -eq $True) {
            $newPropertyValue = New-Object Octopus.Client.Model.PropertyValueResource($newValue, $false)
          } else {
            $newPropertyValue = New-Object Octopus.Client.Model.PropertyValueResource
            $newPropertyValue.SensitiveValue = @{
              HasValue = $true
              NewValue = $newValue
            }
            $newPropertyValue.IsSensitive = $true
          }
          Write-Host "Created sensitive variable for missing template"
        } else {
          $newPropertyValue = New-Object Octopus.Client.Model.PropertyValueResource($newValue, $false)
          Write-Host "Created variable value '$newValue' for missing template"
        }

        # Create new payload entry for missing variable
        $variablePayload = New-Object Octopus.Client.Model.TenantVariables.TenantProjectVariablePayload(
        $missingVariable.ProjectId,
        $missingVariable.TemplateId,
        $newPropertyValue,
        $missingVariable.Scope
        )

        $variablesToModify += $variablePayload
      }
    }
  }

  # Update project variables
  $modifyProjectCommand = New-Object Octopus.Client.Model.TenantVariables.ModifyProjectVariablesByTenantIdCommand($tenant.Id, $space.Id, $variablesToModify)
  $spaceRepository.TenantVariables.Modify($modifyProjectCommand) | Out-Null
  Write-Host "Successfully updated project tenant variables"
}
catch
{
    Write-Host $_.Exception.Message
}
```

</details>
<details data-group="update-tenant-variable-scripts">
<summary>C#</summary>
    
```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "nuget: Octopus.Client"

using Octopus.Client;
using Octopus.Client.Model;
using Octopus.Client.Model.TenantVariables;

var octopusURL = "https://your-octopus-url";
var octopusAPIKey = "API-YOUR-KEY";
var spaceName = "Default";
var tenantName = "TenantName";
var projectVariableTemplateName = "ProjectTemplateName";
var variableNewValue = "NewValue";
var valueBoundToOctoVariable = false;

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get Tenant
    var tenant = repositoryForSpace.Tenants.FindByName(tenantName);

    // Get Project Tenant Variables (including missing variables)
    var projectVariablesRequest = new GetProjectVariablesByTenantIdRequest(tenant.Id, space.Id)
    {
        IncludeMissingVariables = true
    };

    var projectVariables = repositoryForSpace.TenantVariables.Get(projectVariablesRequest);

    // Build update payload
    var variablesToModify = new List<TenantProjectVariablePayload>();

    // Loop through project variables
    foreach (var variable in projectVariables.Variables)
    {
        if (variable.Template.Name == projectVariableTemplateName)
        {
            Console.WriteLine($"Found project variable template: {projectVariableTemplateName} (Template ID: {variable.Template.Id}, Project ID: {variable.ProjectId})");

            PropertyValueResource newPropertyValue;

            // Handle sensitive values
            if (variable.Template.DisplaySettings.ContainsKey("Octopus.ControlType") &&
                variable.Template.DisplaySettings["Octopus.ControlType"] == "Sensitive")
            {
                if (NewValueIsBoundToOctopusVariable)
                {
                    newPropertyValue = new PropertyValueResource(newValue, false);
                }
                else
                {
                    newPropertyValue = new PropertyValueResource(newValue, true);
                }
                Console.WriteLine($"Updated sensitive variable for environments: {string.Join(", ", variable.Scope.EnvironmentIds)}");
            }
            else
            {
                newPropertyValue = new PropertyValueResource(newValue, false);
                Console.WriteLine($"Updated variable value to '{newValue}' for environments: {string.Join(", ", variable.Scope.EnvironmentIds)}");
            }

            // Create new payload entry
            var variablePayload = new TenantProjectVariablePayload(
                variable.ProjectId,
                variable.TemplateId,
                newPropertyValue,
                variable.Scope
            );

            variablesToModify.Add(variablePayload);
        }
        else
        {
            // Keep existing variables unchanged
            var variablePayload = new TenantProjectVariablePayload(
                variable.ProjectId,
                variable.TemplateId,
                variable.Value,
                variable.Scope
            )
            {
                Id = variable.Id
            };

            variablesToModify.Add(variablePayload);
        }
    }

    // Handle variables that need to be created
    if (projectVariables.MissingVariables != null)
    {
        foreach (var missingVariable in projectVariables.MissingVariables)
        {
            if (missingVariable.Template.Name == projectVariableTemplateName)
            {
                Console.WriteLine($"Found missing project variable template: {projectVariableTemplateName} (Template ID: {missingVariable.Template.Id}, Project ID: {missingVariable.ProjectId})");

                PropertyValueResource newPropertyValue;

                // Handle sensitive values
                if (missingVariable.Template.DisplaySettings.ContainsKey("Octopus.ControlType") &&
                    missingVariable.Template.DisplaySettings["Octopus.ControlType"] == "Sensitive")
                {
                    if (NewValueIsBoundToOctopusVariable)
                    {
                        newPropertyValue = new PropertyValueResource(newValue, false);
                    }
                    else
                    {
                        // For sensitive variables, use the isSensitive parameter
                        newPropertyValue = new PropertyValueResource(newValue, true);
                    }
                    Console.WriteLine("Created sensitive variable for missing template");
                }
                else
                {
                    newPropertyValue = new PropertyValueResource(newValue, false);
                    Console.WriteLine($"Created variable value '{newValue}' for missing template");
                }

                // Create new payload entry for missing variable
                var variablePayload = new TenantProjectVariablePayload(
                    missingVariable.ProjectId,
                    missingVariable.TemplateId,
                    newPropertyValue,
                    missingVariable.Scope
                );

                variablesToModify.Add(variablePayload);
            }
        }
    }

    // Update project variables
    var modifyProjectCommand = new ModifyProjectVariablesByTenantIdCommand(tenant.Id, space.Id, variablesToModify.ToArray());
    repositoryForSpace.TenantVariables.Modify(modifyProjectCommand);
    Console.WriteLine("Successfully updated project tenant variables");
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```

</details>
<details data-group="update-tenant-variable-scripts">
<summary>Python3</summary>

```python
import json
import requests

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

    return items

octopus_server_uri = 'https://your-octopus-url'
octopus_api_key = 'API-YOUR-KEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}
space_name = "Default"
tenant_name = "MyTenant"
project_variable_template_name = "ProjectTemplateName"
new_value = "MyValue"
new_value_bound_to_octopus_variable = False

# Get space
uri = f'{octopus_server_uri}/api/spaces'
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get Tenant
uri = '{0}/api/{1}/tenants'.format(octopus_server_uri, space['Id'])
tenants = get_octopus_resource(uri, headers)
tenant = next((t for t in tenants if t['Name'] == tenant_name), None)

# Get Project Tenant Variables (including missing variables)
uri = '{0}/api/{1}/tenants/{2}/projectvariables?includeMissingVariables=true'.format(octopus_server_uri, space['Id'], tenant['Id'])
project_variables = requests.get(uri, headers=headers).json()

update_payload = {
    'Variables': []
}

# Loop through project variables
for variable in project_variables['Variables']:
    if variable['Template']['Name'] == project_variable_template_name:
        print(f"Found project variable template: {project_variable_template_name} (Template ID: {variable['Template']['Id']}, Project ID: {variable['ProjectId']})")

        # Create new variable entry
        variable_entry = {
            'ProjectId': variable['ProjectId'],
            'TemplateId': variable['Template']['Id'],
            'Scope': {
                'EnvironmentIds': variable['Scope']['EnvironmentIds']
            }
        }

        # Handle sensitive values
        if variable['Template']['DisplaySettings'].get('Octopus.ControlType') == 'Sensitive':
            if new_value_is_bound_to_octopus_variable:
                variable_entry['Value'] = new_value
            else:
                variable_entry['Value'] = {
                    'HasValue': True,
                    'NewValue': new_value
                }
            print(f"Updated sensitive variable for environments: {', '.join(variable['Scope']['EnvironmentIds'])}")
        else:
            variable_entry['Value'] = new_value
            print(f"Updated variable value to '{new_value}' for environments: {', '.join(variable['Scope']['EnvironmentIds'])}")

        update_payload['Variables'].append(variable_entry)
    else:
        # Keep existing variables unchanged
        update_payload['Variables'].append({
            'Id': variable['Id'],
            'ProjectId': variable['ProjectId'],
            'TemplateId': variable['TemplateId'],
            'Value': variable['Value'],
            'Scope': variable['Scope']
        })

# Handle variables that need to be created
if 'MissingVariables' in project_variables and project_variables['MissingVariables']:
    for missing_variable in project_variables['MissingVariables']:
        if missing_variable['Template']['Name'] == project_variable_template_name:
            print(f"Found missing project variable template: {project_variable_template_name} (Template ID: {missing_variable['Template']['Id']}, Project ID: {missing_variable['ProjectId']})")

            # Create new variable entry for missing variable
            variable_entry = {
                'ProjectId': missing_variable['ProjectId'],
                'TemplateId': missing_variable['Template']['Id'],
                'Scope': {
                    'EnvironmentIds': missing_variable['Scope']['EnvironmentIds']
                }
            }

            # Handle sensitive values
            if missing_variable['Template']['DisplaySettings'].get('Octopus.ControlType') == 'Sensitive':
                if new_value_is_bound_to_octopus_variable:
                    variable_entry['Value'] = new_value
                else:
                    variable_entry['Value'] = {
                        'HasValue': True,
                        'NewValue': new_value
                    }
                print("Created sensitive variable for missing template")
            else:
                variable_entry['Value'] = new_value
                print(f"Created variable value '{new_value}' for missing template")

            update_payload['Variables'].append(variable_entry)

# Update project variables
response = requests.put(f'{octopus_server_uri}/api/{space["Id"]}/tenants/{tenant["Id"]}/projectvariables', headers=headers, json=update_payload)
response.raise_for_status()
print("Successfully updated project tenant variables")
```

</details>
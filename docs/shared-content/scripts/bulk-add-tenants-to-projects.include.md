```PowerShell PowerShell (REST API)
$octopusUrl = "YOUR URL"
$octopusApiKey = "YOUR API KEY"
$spaceName = "YOUR SPACE NAME"
$projectName = "PROJECT NAME TO ADD"
$environmentNameList =  "ENVIRONMENTS TO TIE TO" # "Development,Test"
$tenantTag = "TENANT TAG TO FILTER ON" #Format = [Tenant Tag Set Name]/[Tenant Tag] "Tenant Type/Customer"
$whatIf = $false # Set to true to test out changes before making them
$maxNumberOfTenants = 1 # The max number of tenants you wish to change in this run


$cachedResults = @{}

function Write-OctopusVerbose
{
    param($message)
    
    Write-Verbose $message  
}

function Write-OctopusInformation
{
    param($message)
    
    Write-Host $message  
}

function Write-OctopusSuccess
{
    param($message)

    Write-Host $message 
}

function Write-OctopusWarning
{
    param($message)

    Write-Warning "$message" 
}

function Write-OctopusCritical
{
    param ($message)

    Write-Error "$message" 
}

function Invoke-OctopusApi
{
    param
    (
        $octopusUrl,
        $endPoint,
        $spaceId,
        $apiKey,
        $method,
        $item,
        $ignoreCache     
    )

    $octopusUrlToUse = $OctopusUrl
    if ($OctopusUrl.EndsWith("/"))
    {
        $octopusUrlToUse = $OctopusUrl.Substring(0, $OctopusUrl.Length - 1)
    }

    if ([string]::IsNullOrWhiteSpace($SpaceId))
    {
        $url = "$octopusUrlToUse/api/$EndPoint"
    }
    else
    {
        $url = "$octopusUrlToUse/api/$spaceId/$EndPoint"    
    }  

    try
    {        
        if ($null -ne $item)
        {
            $body = $item | ConvertTo-Json -Depth 10
            Write-OctopusVerbose $body

            Write-OctopusInformation "Invoking $method $url"
            return Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -Body $body -ContentType 'application/json; charset=utf-8' 
        }

        if (($null -eq $ignoreCache -or $ignoreCache -eq $false) -and $method.ToUpper().Trim() -eq "GET")
        {
            Write-OctopusVerbose "Checking to see if $url is already in the cache"
            if ($cachedResults.ContainsKey($url) -eq $true)
            {
                Write-OctopusVerbose "$url is already in the cache, returning the result"
                return $cachedResults[$url]
            }
        }
        else
        {
            Write-OctopusVerbose "Ignoring cache."    
        }

        Write-OctopusVerbose "No data to post or put, calling bog standard invoke-restmethod for $url"
        $result = Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -ContentType 'application/json; charset=utf-8'

        if ($cachedResults.ContainsKey($url) -eq $true)
        {
            $cachedResults.Remove($url)
        }
        Write-OctopusVerbose "Adding $url to the cache"
        $cachedResults.add($url, $result)

        return $result

               
    }
    catch
    {
        if ($null -ne $_.Exception.Response)
        {
            if ($_.Exception.Response.StatusCode -eq 401)
            {
                Write-OctopusCritical "Unauthorized error returned from $url, please verify API key and try again"
            }
            elseif ($_.Exception.Response.statusCode -eq 403)
            {
                Write-OctopusCritical "Forbidden error returned from $url, please verify API key and try again"
            }
            else
            {                
                Write-OctopusVerbose -Message "Error calling $url $($_.Exception.Message) StatusCode: $($_.Exception.Response.StatusCode )"
            }            
        }
        else
        {
            Write-OctopusVerbose $_.Exception
        }
    }

    Throw "There was an error calling the Octopus API please check the log for more details"
}

function Get-OctopusItemByName
{
    param(
        $itemName,
        $itemType,
        $endpoint,        
        $spaceId,
        $defaultUrl,
        $octopusApiKey
    )

    Write-OctopusInformation "Attempting to find $itemType with the name of $itemName"
    
    $itemList = Invoke-OctopusApi -octopusUrl $defaultUrl -endPoint "$($endPoint)?partialName=$([uri]::EscapeDataString($itemName))&skip=0&take=100" -spaceId $spaceId -apiKey $octopusApiKey -method "GET"    
    $item = Get-FilteredOctopusItem -itemList $itemList -itemName $itemName

    Write-OctopusInformation "Successfully found $itemName with id of $($item.Id)"

    return $item
}

function Get-FilteredOctopusItem
{
    param(
        $itemList,
        $itemName
    )

    if ($itemList.Items.Count -eq 0)
    {
        Write-OctopusCritical "Unable to find $itemName.  Exiting with an exit code of 1."
        Exit 1
    }  

    $item = $itemList.Items | Where-Object { $_.Name -eq $itemName}      

    if ($null -eq $item)
    {
        Write-OctopusCritical "Unable to find $itemName.  Exiting with an exit code of 1."
        exit 1
    }

    return $item
}

function Test-OctopusObjectHasProperty
{
    param(
        $objectToTest,
        $propertyName
    )

    $hasProperty = Get-Member -InputObject $objectToTest -Name $propertyName -MemberType Properties

    if ($hasProperty)
    {
        Write-OctopusVerbose "$propertyName property found."
        return $true
    }
    else
    {
        Write-OctopusVerbose "$propertyName property missing."
        return $false
    }    
}

function Add-PropertyIfMissing
{
    param(
        $objectToTest,
        $propertyName,
        $propertyValue,
        $overwriteIfExists)
    
    if ((Test-OctopusObjectHasProperty -objectToTest $objectToTest -propertyName $propertyName) -eq $false)
    {            
        $objectToTest | Add-Member -MemberType NoteProperty -Name $propertyName -Value $propertyValue        
    }        
}

#https://local.octopusdemos.app/api/Spaces-102/tenants/tag-test?tags=Tenant%20Type%2FCustomer
$space = Get-OctopusItemByName -itemName $spaceName -itemType "Space" -endpoint "spaces" -spaceId $null -defaultUrl $octopusUrl -octopusApiKey $octopusApiKey
$spaceId = $space.Id

$project = Get-OctopusItemByName -itemName $projectName -itemType "Project" -endpoint "projects" -spaceId $spaceId -defaultUrl $octopusUrl -octopusApiKey $octopusApiKey
$projectId = $project.Id

$splitEnvironmentlist = $environmentNameList -split ","
$environmentList = @()
foreach ($environmentName in $splitEnvironmentlist)
{
    $environment = Get-OctopusItemByName -itemName $environmentName -itemType "Environment" -endpoint "environments" -spaceId $spaceId -defaultUrl $octopusUrl -octopusApiKey $octopusApiKey
    $environmentList += $environment.Id
}

$tenantList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "tenants?tags=$([uri]::EscapeDataString($tenantTag))&skip=0&take=10000" -spaceId $spaceId -method "GET" -item $null -ignoreCache $false
Write-OctopusInformation "Found $($tenantList.Items.Count) tenants matching the tenant tag $tenantTag"

$changeReport = @()
$itemsChanged = 1
foreach ($tenant in $tenantList.Items)
{
    Write-OctopusInformation "Checking to see if $($tenant.Name) is assigned to $($project.Name)"
    $tenantChanged = $false
    if ((Test-OctopusObjectHasProperty -objectToTest $tenant.ProjectEnvironments -propertyName $projectId) -eq $false)
    {
        Write-OctopusInformation "The project $($project.Name) is not assigned to $($project.Name), adding it"
        $changeReport += "Added $($project.Name) to $($tenant.Name) with environment ids $environmentList"

        Add-PropertyIfMissing -objectToTest $tenant.ProjectEnvironments -propertyName $projectId -propertyValue $environmentList        
        $tenantChanged = $true
    }
    else 
    {
        Write-OctopusInformation "Project $($project.Name) is assigned to the $($tenant.Name), let's make sure it has the environments as well"
        foreach ($environmentId in $environmentList)
        {
            if ($tenant.ProjectEnvironments.$projectId -notcontains $environmentId)
            {
                $changeReport += "Added $environmentId to $($project.Name) association for $($tenant.Name)"
                Write-OctopusInformation "Environment $environmentId is not assigned to $($project.Name) for $($tenant.Name), adding it"
                $tenant.ProjectEnvironments.$projectId += $environmentId
                $tenantChanged = $true
            }
        }
    }

    if ($tenantChanged -eq $false)
    {
        continue
    }

    if ($whatIf -eq $false)
    {
        Invoke-OctopusApi -endPoint "tenants/$($tenant.Id)" -spaceId $spaceId -apiKey $octopusApiKey -method "PUT" -item $tenant -ignoreCache $true -octopusUrl $octopusUrl
    }
    else
    {
        Write-OctopusInformation "What if set to true, skipping saving"
    }

    $itemsChanged += 1
    if ($itemsChanged -gt $maxNumberOfTenants)
    {
        Write-OctopusInformation "Max number of tenants to change has been reached, exiting loop"
        break
    }
}

Write-OctopusInformation "Change Report:"
foreach ($item in $changeReport)
{
    Write-OctopusInformation "  $item"
}
```
```powershell PowerShell (Octopus.Client)
# Load assembly
Add-Type -Path 'C:\Octopus.Client\Octopus.Client.dll'

# Declare variables
$octopusUrl = "YOUR URL"
$octopusApiKey = "YOUR API KEY"
$spaceName = "YOUR SPACE NAME"
$projectName = "PROJECT NAME TO ADD"
$environmentNameList =  "ENVIRONMENTS TO TIE TO" # "Development,Test"
$tenantTag = "TENANT TAG TO FILTER ON" #Format = [Tenant Tag Set Name]/[Tenant Tag] "Tenant Type/Customer"
$whatIf = $false # Set to true to test out changes before making them
$maxNumberOfTenants = 1 # The max number of tenants you wish to change in this run
$tenantsUpdated = 0

# Create client object
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

$space = $repository.Spaces.FindByName($spaceName)
$client = $client.ForSpace($space)

# Get project
$project = $client.Projects.FindByName($projectName)

# Get reference to environments
$environments = @()
foreach ($environmentName in $environmentNameList)
{
    $environment = $client.Environments.FindByName($environmentName)

    if ($null -ne $environment)
    {
        $environments += $environment
    }
    else
    {
        Write-Warning "Environment $environmentName not found!"
    }
}

# Get tenants by tag
$tenants = $client.Tenants.FindAll("", @($tenantTag), 1000)

# Loop through returned tenants
foreach ($tenant in $tenants)
{
    $tenantUpdated = $false
    if (($null -eq $tenant.ProjectEnvironments) -or ($tenant.ProjectEnvironments.Count -eq 0))
    {
        # Add project/environments
        $tenant.ConnectToProjectAndEnvironments($project, $environments)
        $tenantUpdated = $true
    }
    else
    {
        # Get existing project connections
        $projectEnvironments = $tenant.ProjectEnvironments | Where-Object {$_.Keys -eq $project.Id}
        
        # Compare environment list
        $missingEnvironments = @()
        foreach ($environment in $environments)
        {
            if ($projectEnvironments.ContainsValue($environment.Id) -eq $false)
            {
                #$missingEnvironments += $environment.Id
                $tenant.ProjectEnvironments[$project.Id].Add($environment.Id)
                $tenantUpdated = $true
            }
        }
    }

    if ($tenantUpdated)
    {
        if ($whatIf)
        {
            $tenant
        }
        else
        {
            # Update tenenat
            $client.Tenants.Modify($tenant)
        }

        $tenantsUpdated ++
    }
    

    if ($tenantsUpdated -ge $maxNumberOfTenants)
    {
        # We out!
        break
    }
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"
using Octopus.Client;
using Octopus.Client.Model;
using System;
using System.Linq;

// If using .net Core, be sure to add the NuGet package of System.Security.Permissions

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
var spaceName = "Default";
var projectName = "MyProject";
var environmentNameList = new string[] { "Environment", "List"};
string[] tenantTag = new string[] { "TagSet/Tag" }; // "TENANT TAG TO FILTER ON" Format = [Tenant Tag Set Name]/[Tenant Tag] "Tenant Type/Customer"
bool whatIf = false;
int maxNumberOfTenants = 1;
int tenantsUpdated = 0;

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get space
var space = repository.Spaces.FindByName(spaceName);
var spaceRepository = client.ForSpace(space);

// Get project
var project = spaceRepository.Projects.FindByName(projectName);

// Get tenants by tag
var tenants = spaceRepository.Tenants.FindAll("", tenantTag, 1000);

// Get environment objects
var environments = new System.Collections.Generic.List<Octopus.Client.Model.EnvironmentResource>();
foreach (string environmentName in environmentNameList)
{
    var environment = spaceRepository.Environments.FindByName(environmentName);
    if (environment != null)
    {
        environments.Add(environment);
    }
    else
    {
        Console.WriteLine(string.Format("{0} not found!", environmentName));
    }
}

// Loop through tenants
foreach (var tenant in tenants)
{
    bool tenantUpdated = false;
    if(tenant.ProjectEnvironments == null || tenant.ProjectEnvironments.Count == 0)
    {
        // Add project/environments
        tenant.ConnectToProjectAndEnvironments(project, environments.ToArray());
        tenantUpdated = true;
    }
    else
    {
        // Get project connected environments
        System.Collections.Generic.Dictionary<string, ReferenceCollection> projectEnvironments = new System.Collections.Generic.Dictionary<string, Octopus.Client.Model.ReferenceCollection>(tenant.ProjectEnvironments.Where(e => e.Key == project.Id));

        // Compare what's connected to list of environments to connect
        foreach (var environment in environments)
        {
            if (!projectEnvironments[project.Id].Contains(environment.Id))
            {
                tenant.ProjectEnvironments[project.Id].Add(environment.Id);
                tenantUpdated = true;
            }
        }
    }

    // Check to see if tenant was updated
    if (tenantUpdated)
    {
        if (whatIf)
        {
            Console.WriteLine(tenant);
        }
        else
        {
            // Update tenant
            spaceRepository.Tenants.Modify(tenant);
        }

        // Increment updated counter
        tenantsUpdated++;
    }

    // Check to see if we've reached the max number of updated
    if (tenantsUpdated == maxNumberOfTenants)
    {
        // Get outta here!
        break;
    }
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

# Define Octopus server variables
octopus_server_uri = 'https://YourURL/api'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
project_name = "MyProject"
environment_name_list = ['Environment', 'List']
tenant_tag = 'TENANT TAG TO FILTER ON'  #Format = [Tenant Tag Set Name]/[Tenant Tag] "Tenant Type/Customer"
max_number_tenants = 1
tenants_updated = 0
space_name = 'Default'
what_if = False

# Get space
uri = '{0}/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Get project
uri = '{0}/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)
project = next((x for x in projects if x['Name'] == project_name), None)

# Get environments
environments = []
uri = '{0}/{1}/environments'.format(octopus_server_uri, space['Id'])
all_environments = get_octopus_resource(uri, headers)
for environment_name in environment_name_list:
    environment = next((x for x in all_environments if x['Name'] == environment_name), None)
    environments.append(environment['Id'])

# Get tenants by tag
uri = '{0}/{1}/tenants?tags={2}'.format(octopus_server_uri, space['Id'], tenant_tag)
tenants = get_octopus_resource(uri, headers)

# Loop through tenants
for tenant in tenants:
    tenant_updated = False

    if tenant['ProjectEnvironments'] == None or len(tenant['ProjectEnvironments']) == 0:
        projectEnvironments = {
            project['Id']: environments
        }

        # Attach to tenant
        tenant['ProjectEnvironments'] = projectEnvironments
        tenant_updated = True
    else:
        # Get current project environments
        projectEnvironments = tenant['ProjectEnvironments']

        # Loop through environments
        for environment in environments:
            #print (projectEnvironments[project['Id']])
            if environment not in projectEnvironments[project['Id']]:
                projectEnvironments[project['Id']].append(environment)
        
        tenant['ProjectEnvironments'] = projectEnvironments
        tenant_updated = True
    
    if tenant_updated:
        if what_if:
            print(tenant)
        else:
            uri = '{0}/{1}/tenants/{2}'.format(octopus_server_uri, space['Id'], tenant['Id'])
            response = requests.put(uri, headers=headers, json=tenant)
            response.raise_for_status
        
        tenants_updated = tenants_updated + 1
    
    if tenants_updated == max_number_tenants:
        break
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
	projectName := "MyProject"
	environmentNameList := []string{"Environment", "List"}
	tenantTag := "TENANT TAG TO FILTER ON"  //Format = [Tenant Tag Set Name]/[Tenant Tag] "Tenant Type/Customer"
	whatIf := false
	maxNumberOfTenants := 1
	tenantsUpdated := 0

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Get project reference
	project := GetProject(apiURL, APIKey, space, projectName)

	// Get envrionment ids
	environments := []string{}
	for i := 0; i < len(environmentNameList); i++ {
		environment := GetEnvironment(apiURL, APIKey, space, environmentNameList[i])

		if nil != environment {
			environments = append(environments, environment.ID)
		}
	}

	// Get tenants
	tenants := GetTenantsByTag(apiURL, APIKey, space, tenantTag)

	// Loop through teneants
	for i := 0; i < len(tenants); i++ {
		tenantUpdated := false
		if len(tenants[i].ProjectEnvironments) == 0 {
			// Add everything
			projectEnvironments := make(map[string][]string)
			projectEnvironments[project.ID] = environments
			tenants[i].ProjectEnvironments = projectEnvironments
			tenantUpdated = true
		} else {
			projectEnvironments := tenants[i].ProjectEnvironments

			for e := 0; e < len(environments); e++ {
				if !contains(projectEnvironments[project.ID], environments[e]) {
					// Add
					existingEntries := []string{}
					existingEntries = projectEnvironments[project.ID]
					existingEntries = append(existingEntries, environments[e])
					projectEnvironments[project.ID] = existingEntries
					tenantUpdated = true
				}
			}
		}

		if tenantUpdated {
			if whatIf {
				fmt.Println(tenants[i])
			} else {
				client := octopusAuth(apiURL, APIKey, space.ID)
				client.Tenants.Update(tenants[i])
			}

			tenantsUpdated++
		}

		if maxNumberOfTenants == tenantsUpdated {
			break
		}
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

	// Get specific space object
	space, err := client.Spaces.GetByName(spaceName)

	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("Retrieved space " + space.Name)
	}

	return space
}

func GetProject(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, projectName string) *octopusdeploy.Project {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get project
	project, err := client.Projects.GetByName(projectName)

	if err != nil {
		log.Println(err)
	}

	if project != nil {
		fmt.Println("Retrieved project " + project.Name)
	} else {
		fmt.Println("Project " + projectName + " not found!")
	}

	return project
}

func GetEnvironment(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, EnvironmentName string) *octopusdeploy.Environment {
	client := octopusAuth(octopusURL, APIKey, space.ID)

	environments, err := client.Environments.GetByName(EnvironmentName)

	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(environments); i++ {
		if environments[i].Name == EnvironmentName {
			return environments[i]
		}
	}

	return nil
}

func GetTenantsByTag(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, tagName string) []*octopusdeploy.Tenant {
	// Create client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	tenants, err := client.Tenants.GetAll()

	if err != nil {
		log.Println(err)
	}

	tenantsWithTag := []*octopusdeploy.Tenant{}

	for i := 0; i < len(tenants); i++ {
		if contains(tenants[i].TenantTags, tagName) {
			tenantsWithTag = append(tenantsWithTag, tenants[i])
		}
	}

	return tenantsWithTag
}

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}
```
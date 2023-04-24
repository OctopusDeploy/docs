```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"

$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# Specify the Space to search in
$spaceName = "Default"

# Specify the Variable Value to find, without OctoStache syntax 

$variableValueToFind = "mytestvalue"

# Optional: set a path to export to csv
$csvExportPath = ""

$variableTracking = @()
$octopusURL = $octopusURL.TrimEnd('/')

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

Write-Host "Looking for usages of variable value named '$variableValueToFind' in space: '$spaceName'"

# Get variables from variable sets
$variableSets = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets?contentType=Variables" -Headers $header

foreach ($variableSet in $variableSets.Items)
{
    Write-Host "Checking variable set '$($variableSet.Name)'"
    
    $variableSetVariables = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/variables/variableset-$($variableSet.Id)" -Headers $header

    $matchingNamedVariables = $variableSetVariables.Variables | Where-Object {$_.Value -like "*$variableValueToFind*"}
    if($null -ne $matchingNamedVariables){
        foreach($match in $matchingNamedVariables){
            $result = [PSCustomObject]@{
                Project = $null
                VariableSet = $variableSet.Name
                MatchType = "Value in Library Set"
                Context = $match.Value
                Property = $null
                AddtionalContext = $match.Name
            }
            $variableTracking += $result
        }
    }

}

# Get all projects
$projects = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

# Loop through projects
foreach ($project in $projects)
{
    Write-Host "Checking project '$($project.Name)'"
    # Get project variables
    $projectVariableSet = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/variables/$($project.VariableSetId)" -Headers $header

    # Check to see if variable is named in project variables.
    $ProjectMatchingNamedVariables = $projectVariableSet.Variables | Where-Object {$_.Value -like "*$variableValueToFind*"}
    if($null -ne $ProjectMatchingNamedVariables) {
        foreach($match in $ProjectMatchingNamedVariables) {
            $result = [pscustomobject]@{
                Project = $project.Name
                VariableSet = $null
                MatchType = "Named Project Variable"
                Context = $match.Value
                Property = $null
                AdditionalContext = $match.Name
            }
            
            # Add to tracking list
            $variableTracking += $result
        }
    }
}
    

if($variableTracking.Count -gt 0) {
    Write-Host ""
    Write-Host "Found $($variableTracking.Count) results:"
    $variableTracking
    if (![string]::IsNullOrWhiteSpace($csvExportPath)) {
        Write-Host "Exporting results to CSV file: $csvExportPath"
        $variableTracking | Export-Csv -Path $csvExportPath -NoTypeInformation
    }
}
```
```powershell PowerShell (Octopus.Client)
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$spaceName = "Default"
$variableValueToFind = "MyValue"
$csvExportPath = "c:\temp\variable.csv"

$variableTracking = @()


$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get space
$space = $repository.Spaces.FindByName($spaceName)
$repositoryForSpace = $client.ForSpace($space)

Write-Host "Looking for usages of variable value '$variableValueToFind' in space: $($space.Name)"

# Get all variable sets
$variableSets = $repositoryForSpace.LibraryVariableSets.GetAll()

# Loop through variable sets
foreach ($variableSet in $variableSets)
{
    Write-Host "Checking variable set: $($variableSet.Name)"

    # Get variables associated with variable set
    $variables = $repositoryForSpace.VariableSets.Get($variableSet.VariableSetId)

    $matchingNamedVariables = $variableSetVariables.Variables | Where-Object {$_.Value -like "*$variableValueToFind*"}
    if($null -ne $matchingNamedVariables){
        foreach($match in $matchingNamedVariables){
            $result = [PSCustomObject]@{
                Project = $null
                VariableSet = $variableSet.Name
                MatchType = "Value in Library Set"
                Context = $match.Value
                Property = $null
                AddtionalContext = $match.Name
            }
            $variableTracking += $result
        }
    }    
}

# Get all projects
$projects = $repositoryForSpace.Projects.GetAll()

# Loop through projects
foreach ($project in $projects)
{
    Write-Host "Checking project '$($project.Name)'"
    # Get project variables
    $projectVariableSet = $repositoryForSpace.VariableSets.Get($project.VariableSetId)

    # Check to see if variable is named in project variables.
    $ProjectMatchingNamedVariables = $projectVariableSet.Variables | Where-Object {$_.Value -like "*$variableValueToFind*"}
    if($null -ne $ProjectMatchingNamedVariables) {
        foreach($match in $ProjectMatchingNamedVariables) {
            $result = [pscustomobject]@{
                Project = $project.Name
                VariableSet = $null
                MatchType = "Named Project Variable"
                Context = $match.Value
                Property = $null
                AdditionalContext = $match.Name
            }
            
            # Add to tracking list
            $variableTracking += $result
        }
    }
}

if($variableTracking.Count -gt 0) {
    Write-Host ""
    Write-Host "Found $($variableTracking.Count) results:"
    $variableTracking
    if (![string]::IsNullOrWhiteSpace($csvExportPath)) {
        Write-Host "Exporting results to CSV file: $csvExportPath"
        $variableTracking | Export-Csv -Path $csvExportPath -NoTypeInformation
    }
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using System.Linq;

class VariableResult
{
    // Define private variables
    
    public string Project
    {
        get;
        set;
    }

    public string MatchType
    {
        get; set;
    }

    public string Context
    {
        get;set;
    }

    public string Property
    {
        get;set;
    }

    public string AdditionalContext
    {
        get;set;
    }

    public string VariableSet
    {
        get;
        set;
    }
}

var octopusURL = "https://your.octopus.app";
var octopusAPIKey = "API-YOURKEY";
var spaceName = "Default";
string variableValueToFind = "MyValue";
string csvExportPath = "path:\\to\\variable.csv";

System.Collections.Generic.List<VariableResult> variableTracking = new System.Collections.Generic.List<VariableResult>();

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get space repository
var space = repository.Spaces.FindByName(spaceName);
var repositoryForSpace = client.ForSpace(space);

Console.WriteLine(string.Format("Looking for usages of variable value {0} in space {1}", variableValueToFind, space.Name));

// Get all variable sets
var variableSets = repositoryForSpace.LibraryVariableSets.FindAll();

// Loop through variable sets
foreach (var variableSet in variableSets)
{
    Console.WriteLine(string.Format("Checking variable set: {0}", variableSet.Name));

    // Get the variables
    var variables = repositoryForSpace.VariableSets.Get(variableSet.VariableSetId);

    // Get matches
    var matchingValueVariable = variables.Variables.Where(v => v.Value != null && v.Value.ToLower().Contains(variableValueToFind.ToLower()));

    if (matchingValueVariable != null)
    {
        foreach (var match in matchingValueVariable)
        {
            VariableResult result = new VariableResult();
            result.Project = null;
            result.VariableSet = variableSet.Name;
            result.MatchType = "Value in Library Set";
            result.Context = match.Value;
            result.AdditionalContext = match.Name;

            if (!variableTracking.Contains(result))
            {
                variableTracking.Add(result);
            }
        }
    }
}

// Get all projects
var projects = repositoryForSpace.Projects.GetAll();

// Loop through projects
foreach (var project in projects)
{
    Console.WriteLine(string.Format("Checking {0}", project.Name));

    // Get the project variable set
    var projectVariableSet = repositoryForSpace.VariableSets.Get(project.VariableSetId);

    var matchingNameVariable = projectVariableSet.Variables.Where(v => v.Value != null && v.Value.ToLower().Contains(variableValueToFind.ToLower()));

    // Match on name
    if (matchingNameVariable != null)
    {
        // Loop through results
        foreach (var match in matchingNameVariable)
        {
            VariableResult result = new VariableResult();
            result.Project = project.Name;
            result.VariableSet = null;
            result.MatchType = "Named Project Variable";
            result.Context = match.Value;
            result.Property = null;
            result.AdditionalContext = match.Name;

            if (!variableTracking.Contains(result))
            {
                variableTracking.Add(result);
            }
        }
    }
}

Console.WriteLine(string.Format("Found {0} results", variableTracking.Count.ToString()));

if (variableTracking.Count > 0)
{
    foreach (var result in variableTracking)
    {
        System.Collections.Generic.List<string> header = new System.Collections.Generic.List<string>();
        System.Collections.Generic.List<string> row = new System.Collections.Generic.List<string>();

        var isFirstRow = variableTracking.IndexOf(result) == 0;
        var properties = result.GetType().GetProperties();

        foreach (var property in properties)
        {
            Console.WriteLine(string.Format("{0}: {1}", property.Name, property.GetValue(result)));
            if (isFirstRow)
            {
                header.Add(property.Name);
            }
            row.Add((property.GetValue(result) == null ? string.Empty : property.GetValue(result).ToString()));
        }

        if (!string.IsNullOrWhiteSpace(csvExportPath))
        {
            using (System.IO.StreamWriter csvFile = new System.IO.StreamWriter(csvExportPath, true))
            {
                if (isFirstRow)
                {
                    // Write header
                    csvFile.WriteLine(string.Join(",", header.ToArray()));
                }
                // Write result
                csvFile.WriteLine(string.Join(",", row.ToArray()));
            }
        }
    }
}
```
```python Python3
import json
import requests
import csv

octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}

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
    if hasattr(results, 'keys') and 'Items' in results.keys():
        items += results['Items']

        # Check to see if there are more results
        if (len(results['Items']) > 0) and (len(results['Items']) == results['ItemsPerPage']):
            skip_count += results['ItemsPerPage']
            items += get_octopus_resource(uri, headers, skip_count)

    else:
        return results

    
    # return results
    return items

# Specify the Space to search in
space_name = 'Default'

# Specify the Variable to find, without OctoStache syntax 
# e.g. For #{MyProject.Variable} -> use MyProject.Variable
variable_value = 'MyValue'

csv_export_path = 'path:\\to\\variable.csv'
# Optional: set a path to export to csv

variable_tracker = []

uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)
print('Looking for usages of variable named \'{0}\' in space \'{1}\''.format(variable_value, space_name))

uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
projects = get_octopus_resource(uri, headers)

for project in projects:
    project_name = project['Name']
    project_web_uri = project['Links']['Web'].lstrip('/')
    print('Checking project \'{0}\''.format(project_name))
    uri = '{0}/api/{1}/variables/{2}'.format(octopus_server_uri, space['Id'], project['VariableSetId'])
    project_variable_set = get_octopus_resource(uri, headers)
    
    # Check to see if variable is named in project variables.
    matching_value_variables = [variable for variable in project_variable_set['Variables'] if variable['Value'] != None and variable_value in variable['Value']]
    if matching_value_variables is not None:
        for variable in matching_value_variables:
            tracked_variable = {
                'Project': project_name,
                'MatchType': 'Named Project Variable',
                'Context': variable['Name'],
                'AdditionalContext': None,
                'Property': None,
                'VariableSet': None
            }
            if tracked_variable not in variable_tracker:
                variable_tracker.append(tracked_variable)
    
# Get variable sets
uri = '{0}/api/{1}/libraryvariablesets?contentType=Variables'.format(octopus_server_uri, space['Id'])
variable_sets = get_octopus_resource(uri, headers)

for variable_set in variable_sets:
    uri = '{0}/api/{1}/variables/{2}'.format(octopus_server_uri, space['Id'], variable_set['VariableSetId'])
    variables = get_octopus_resource(uri, headers)
    matching_value_variables = [variable for variable in variables['Variables'] if variable['Value'] != None and variable_value in variable['Value']]
    if matching_value_variables is not None:
        for variable in matching_value_variables:
            tracked_variable = {
                'Project': None,
                'VariableSet': variable_set['Name'],
                'MatchType': 'Value in Library Set',
                'Context': variable['Value'],
                'Property': None,
                'AdditionalContext': variable['Name']
            }

            if tracked_variable not in variable_tracker:
                variable_tracker.append(tracked_variable)


results_count = len(variable_tracker)
if results_count > 0:
    print('')    
    print('Found {0} results:'.format(results_count))
    for tracked_variable in variable_tracker:
        print('Project           : {0}'.format(tracked_variable['Project']))
        print('MatchType         : {0}'.format(tracked_variable['MatchType']))
        print('Context           : {0}'.format(tracked_variable['Context']))
        print('AdditionalContext : {0}'.format(tracked_variable['AdditionalContext']))
        print('Property          : {0}'.format(tracked_variable['Property']))
        print('VariableSet              : {0}'.format(tracked_variable['VariableSet']))
        print('')
    if csv_export_path:
        with open(csv_export_path, mode='w') as csv_file:
            fieldnames = ['Project', 'MatchType', 'Context', 'AdditionalContext', 'Property', 'VariableSet']
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()
            for tracked_variable in variable_tracker:
                writer.writerow(tracked_variable)
```
```go Go
package main

import (
	"bufio"
	"fmt"
	"log"
	"net/url"
	"os"
	"reflect"
	"strconv"
	"strings"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

type VariableResult struct {
	Project           string
	MatchType         string
	Context           string
	Property          string
	AdditionalContext string
	VariableSet       string
}

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	variableValueToFind := "MyValue"
	csvExportPath := "path:\\to\\variable.csv"

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	client = octopusAuth(apiURL, APIKey, space.ID)

	variableTracking := []VariableResult{}

	// Get projects
	projects, err := client.Projects.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Loop through projects
	for _, project := range projects {
		fmt.Printf("Checking %[1]s \n", project.Name)

		// Get variables
		projectVariables, err := client.Variables.GetAll(project.ID)

		if err != nil {
			log.Println(err)
		}

		for _, variable := range projectVariables.Variables {
			valueMatch := strings.Contains(variable.Value, variableValueToFind)
			if err != nil {
				log.Println(err)

			}

			if valueMatch {
				result := VariableResult{}
				result.Project = project.Name
				result.MatchType = "Named Project Variable"
				result.Context = variable.Name
				result.Property = ""
				result.AdditionalContext = variable.Name
				result.VariableSet = ""

				if !arrayContains(variableTracking, result) {
					variableTracking = append(variableTracking, result)
				}

			}
		}
	}

	// Get variablesets
	variableSets, err := client.LibraryVariableSets.GetAll()
	if err != nil {
		log.Println(err)
	}

	// Loop through variablesets
	for _, variableSet := range variableSets {
		fmt.Printf("Checking library set: %[1]s \n", variableSet.Name)
		// Get variables for set
		variables, err := client.Variables.GetAll(variableSet.ID)
		if err != nil {
			log.Println(err)
		}
		for _, variable := range variables.Variables {
			valueMatch := strings.Contains(variable.Value, variableValueToFind)

			if valueMatch {
				result := VariableResult{}
				result.Project = ""
				result.MatchType = "Value in Library Set"
				result.Context = variable.Value
				result.Property = ""
				result.AdditionalContext = variable.Name
				result.VariableSet = ""

				if !arrayContains(variableTracking, result) {
					variableTracking = append(variableTracking, result)
				}

			}
		}
	}

	if len(variableTracking) > 0 {
		fmt.Printf("Found %[1]s results \n", strconv.Itoa(len(variableTracking)))

		for i := 0; i < len(variableTracking); i++ {
			row := []string{}
			header := []string{}
			isFirstRow := false
			if i == 0 {
				isFirstRow = true
			}

			e := reflect.ValueOf(&variableTracking[i]).Elem()
			for j := 0; j < e.NumField(); j++ {
				if isFirstRow {
					header = append(header, e.Type().Field(j).Name)
				}
				row = append(row, e.Field(j).Interface().(string))
			}

			if csvExportPath != "" {
				file, err := os.OpenFile(csvExportPath, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
				if err != nil {
					log.Println(err)
				}

				dataWriter := bufio.NewWriter(file)
				if isFirstRow {
					dataWriter.WriteString(strings.Join(header, ",") + "\n")
				}
				dataWriter.WriteString(strings.Join(row, ",") + "\n")
				dataWriter.Flush()
				file.Close()
			}

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

func arrayContains(array []VariableResult, result VariableResult) bool {
	for _, v := range array {
		if v == result {
			return true
		}
	}

	return false
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
```
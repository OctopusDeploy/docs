```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$librarySetName = "MyLibrarySet"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}
    
    # Get library set reference
    $librarySet = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/libraryvariablesets/all" -Headers $header) | Where-Object {$_.Name -eq $librarySetName}

    # Get all projects
    $projects = Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/projects/all" -Headers $header

    # Loop through projects
    Write-Host "The following projects are using $librarySetName"
    foreach ($project in $projects)
    {
        # Check to see if it's using the set
        if ($project.IncludedLibraryVariableSetIds -contains $librarySet.Id)
        {
            Write-Host "$($project.Name)"
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
$librarySetName = "MyLibrarySet"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get Library set
    $librarySet = $repositoryForSpace.LibraryVariableSets.FindByName($librarySetName)
    
    # Get Projects
    $projects = $repositoryForSpace.Projects.GetAll()

    # Show all projects using set
    Write-Host "The following projects are using $librarySetName"
    foreach ($project in $projects)
    {
        if ($project.IncludedLibraryVariableSetIds -contains $librarySet.Id)
        {
            Write-Host "$($project.Name)"
        }
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

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string spaceName = "default";
string librarySetName = "MyLibrarySet";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get projects
    var projects = repositoryForSpace.Projects.GetAll();

    // Get library set
    var librarySet = repositoryForSpace.LibraryVariableSets.FindByName(librarySetName);

    // Loop through projects
    Console.WriteLine(string.Format("The following projects are using {0}", librarySetName));
    foreach (var project in projects)
    {
        if (project.IncludedLibraryVariableSetIds.Contains(librarySet.Id))
        {
            Console.WriteLine(project.Name);
        }
    }
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

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

def get_octopus_resource(uri):
    response = requests.get(uri, headers=headers)
    response.raise_for_status()

    return json.loads(response.content.decode('utf-8'))

def get_by_name(uri, name):
    resources = get_octopus_resource(uri)
    return next((x for x in resources if x['Name'] == name), None)

space_name = 'Default'
libraryset_name = 'Variable Set A'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
library_variable_set = get_by_name('{0}/{1}/libraryvariablesets/all'.format(octopus_server_uri, space['Id']), libraryset_name)
library_variable_set_id = library_variable_set['Id']

uri = '{0}/{1}/projects/all'.format(octopus_server_uri, space['Id'])
response = requests.get(uri, headers=headers)
response.raise_for_status()

projects = json.loads(response.content.decode('utf-8'))

for project in projects:
    project_variable_sets = project['IncludedLibraryVariableSetIds']
    if library_variable_set_id in project_variable_sets:
        print('Project \'{0}\' is using library variable set \'{1}\''.format(project['Name'], libraryset_name))
```
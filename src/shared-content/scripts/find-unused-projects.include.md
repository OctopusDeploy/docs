<details data-group="find-unused-projects">
<summary>PowerShell (REST API)</summary>

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

$octopusUrl = "https://local.octopusdemos.app" ## Octopus URL to look at
$octopusApiKey = "YOUR API KEY" ## API key of user who has permissions to view all spaces, cancel tasks, and resubmit runbooks runs and deployments
$disableOldProjects = $false ## Tells the script to disable the projects that are older than the days since last release
$daysSinceLastRelease = 90 ## The number of days since the last release to be considered unused.  Any project without a release created in [90] days is considered inactive.

$cachedResults = @{}

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
            Write-Verbose $body

            Write-Host "Invoking $method $url"
            return Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -Body $body -ContentType 'application/json; charset=utf-8' 
        }

        if (($null -eq $ignoreCache -or $ignoreCache -eq $false) -and $method.ToUpper().Trim() -eq "GET")
        {
            Write-Verbose "Checking to see if $url is already in the cache"
            if ($cachedResults.ContainsKey($url) -eq $true)
            {
                Write-Verbose "$url is already in the cache, returning the result"
                return $cachedResults[$url]
            }
        }
        else
        {
            Write-Verbose "Ignoring cache."    
        }

        Write-Verbose "No data to post or put, calling bog standard invoke-restmethod for $url"
        $result = Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -ContentType 'application/json; charset=utf-8'

        if ($cachedResults.ContainsKey($url) -eq $true)
        {
            $cachedResults.Remove($url)
        }
        Write-Verbose "Adding $url to the cache"
        $cachedResults.add($url, $result)

        return $result

               
    }
    catch
    {
        if ($null -ne $_.Exception.Response)
        {
            if ($_.Exception.Response.StatusCode -eq 401)
            {
                Write-Error "Unauthorized error returned from $url, please verify API key and try again"
            }
            elseif ($_.Exception.Response.statusCode -eq 403)
            {
                Write-Error "Forbidden error returned from $url, please verify API key and try again"
            }
            else
            {                
                Write-Verbose -Message "Error calling $url $($_.Exception.Message) StatusCode: $($_.Exception.Response.StatusCode )"
            }            
        }
        else
        {
            Write-Verbose $_.Exception
        }
    }

    Throw $_.Exception
}

$spaceList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "spaces?skip=0&take=1000" -spaceId $null -method "GET"

$currentUtcTime = $(Get-Date).ToUniversalTime()

$oldProjectList = @()
foreach ($space in $spaceList.Items)
{    
    $projectList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "projects?skip=0&take=10000" -spaceId $space.Id -method "GET"    

    foreach ($project in $projectList.Items)
    {
        if ($project.IsDisabled -eq $true)
        {
            Write-Verbose "Project $($project.Name) is already disabled."
            continue
        }

        $releaseList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "projects/$($project.Id)/releases" -spaceId $space.Id -method "GET"

        if ($releaseList.Items.Count -le 0)
        {
            Write-Verbose "No releases found for $($project.Name)."
            continue
        }

        $assembledDate = [datetime]::Parse($releaseList.Items[0].Assembled)
        $assembledDate = $assembledDate.ToUniversalTime()

        $dateDiff = $currentUtcTime - $assembledDate

        if ($dateDiff.TotalDays -gt $daysSinceLastRelease)
        {
            $oldProjectList += "$($project.Name) - $($space.Name) last release was $($dateDiff.TotalDays) days ago."

            if ($disableOldProjects -eq $true)
            {
                $project.IsDisabled = $true
                $updatedProject = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "projects/$($project.Id)" -spaceId $space.Id -method "PUT" -Item $project
                Write-Host "Set the project $($updatedProject.Name) to disabled."
            }
        }        
    }
}

Write-Host "The following projects were found to have no releases created in at least $daysSinceLastRelease days."
foreach ($project in $oldProjectList)
{
    Write-Host "    $project"
}
```

</details>
<details data-group="find-unused-projects">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$daysSinceLastRelease = 90

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

$currentUtcTime = $(Get-Date).ToUniversalTime()
$oldProjects = @()

# Loop through spaces
foreach ($space in $repository.Spaces.GetAll())
{
    # Get space
    $space = $repository.Spaces.FindByName($space.Name)
    $repositoryForSpace = $client.ForSpace($space)

    # Get all projects in space
    $projects = $repositoryForSpace.Projects.GetAll()

    # Loop through projects
    foreach ($project in $projects)
    {
        # Check for disabled
        if ($project.IsDisabled)
        {
            Write-Host "$($project.Name) is disabled."
            continue
        }

        # Get project releases
        $releases = $repositoryForSpace.Projects.GetReleases($project)

        if ($releases.Items.Count -eq 0)
        {
            Write-Host "No releases found for $($project.Name)"
            continue
        }

        $assembledDate = [datetime]::Parse($releases.Items[0].Assembled)
        $assembledDate = $assembledDate.ToUniversalTime()
        
        $dateDiff = $currentUtcTime - $assembledDate

        # Check the length of time
        if ($dateDiff.TotalDays -gt $daysSinceLastRelease)
        {
            $oldProjects += "$($project.Name) - $($space.Name) last release was $($dateDiff.TotalDays) days ago."

        }
    }
}


Write-Host "The following projects were found to have no releases created in at least $daysSinceLastRelease days"
foreach ($project in $oldProjects)
{
    Write-Host "`t$project"
}
```

</details>
<details data-group="find-unused-projects">
<summary>C#</summary>

```csharp
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

var octopusURL = "https://your.octopus.app";
var octopusAPIKey = "API-YOURKEY";
DateTime currentUtcTime = DateTime.Now.ToUniversalTime();
System.Collections.Generic.List<string> oldProjects = new System.Collections.Generic.List<string>();
int daysSinceLastRelease = 90;

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Loop through all spaces
foreach (var octopusSpace in repository.Spaces.FindAll())
{
    // Get space repository
    var space = repository.Spaces.FindByName(octopusSpace.Name);
    var repositoryForSpace = client.ForSpace(space);

    // Get all projects
    var projects = repositoryForSpace.Projects.GetAll();

    // Loop through projects
    foreach (var project in projects)
    {
        if(project.IsDisabled)
        {
            Console.WriteLine(string.Format("{0} is disabled", project.Name));
            continue;
        }

        // Get releases for project
        var releases = repositoryForSpace.Projects.GetAllReleases(project);

        // Check to see if anything has ever been created
        if (releases.Count == 0)
        {
            Console.WriteLine(string.Format("No releases found for {0}", project.Name));
            continue;
        }

        var assembledDate = releases[0].Assembled.ToUniversalTime();
        var dateDiff = currentUtcTime - assembledDate;

        // Check to see how many days it has been 
        if (dateDiff.TotalDays > daysSinceLastRelease)
        {
            oldProjects.Add(string.Format("{0} - {1} last release was {2} days ago.", project.Name, space.Name, dateDiff.TotalDays.ToString()));
        }
    }
}

Console.WriteLine(string.Format("The following projects were found to have no releases created in at least {0} days", daysSinceLastRelease));
foreach(var project in oldProjects)
{
    Console.WriteLine(string.Format("\t {0}", project));
}
```

</details>
<details data-group="find-unused-projects">
<summary>Python3</summary>

```python
import json
import requests
from requests.api import get, head
import datetime
from dateutil.parser import parse

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

octopus_server_uri = 'https://YourURL'
octopus_api_key = 'API-YourAPIKey'
headers = {'X-Octopus-ApiKey': octopus_api_key}
old_projects = []
current_date = datetime.datetime.utcnow()
days_since_last_release = 90

# Get spaces
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)

# Loop through spaces
for space in spaces:
    # Get all projects
    uri = '{0}/api/{1}/projects'.format(octopus_server_uri, space['Id'])
    projects = get_octopus_resource(uri, headers)

    # Loop through projects
    for project in projects:
        
        # Check to see if it's disabled
        if project['IsDisabled']:
            print('{0} is disabled', project['Name'])
            continue
        
        # Get releases
        uri = '{0}/api/{1}/projects/{2}/releases'.format(octopus_server_uri, space['Id'], project['Id'])
        releases = get_octopus_resource(uri, headers)

        # Check to see if any exist
        if len(releases) == 0:
            print('No releases found for {0}'.format(project['Name']))
            continue

        # Get the assembled date
        assembled_date = parse(releases[0]['Assembled'])
        assembled_date = assembled_date.replace(tzinfo=None)

        # Calculate the difference
        date_diff = current_date - assembled_date
        
        if date_diff.days > days_since_last_release:
            old_projects.append('{0} - {1} last release as {2} days ago'.format(project['Name'], space['Name'], date_diff.days))

print('The following projects were found to have no releases created in the last {0} days'.format(days_since_last_release))

for project in old_projects:
    print('\t{0}'.format(project))
```

</details>
<details data-group="find-unused-projects">
<summary>Go</summary>

```go
package main

import (
	"fmt"
	"log"
	"net/url"
	"time"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"

	// Get client
	client := octopusAuth(apiURL, APIKey, "")

	// Get current date
	currentDate := time.Now()
	daysSinceLastRelease := 90
	oldProjects := []string{}

	// Get all spaces
	spaces, err := client.Spaces.GetAll()

	if err != nil {
		log.Println(err)
	}

	// Loop through spaces
	for _, space := range spaces {
		spaceClient := octopusAuth(apiURL, APIKey, space.ID)

		// Get all projects for space
		projects, err := spaceClient.Projects.GetAll()

		if err != nil {
			log.Println(err)
		}

		// Loop through projects in space
		for _, project := range projects {
			// Check to see if it is disabled
			if project.IsDisabled {
				fmt.Printf("%[1]s is disabled \n", project.Name)
				continue
			}

			// Get all releases
			projectReleases, err := spaceClient.Projects.GetReleases(project)

			if err != nil {
				log.Println(err)
			}

			if len(projectReleases) == 0 {
				fmt.Printf("No releases found for %[1]s \n", project.Name)
				continue
			}

			// Get assembled date of most recent release
			assembledDate := projectReleases[0].Assembled

			// Calculate difference
			dateDiff := currentDate.Sub(assembledDate).Hours() / 24
			
			strDateDiff := fmt.Sprintf("%f", dateDiff)

			// Check the difference
			if dateDiff > float64(daysSinceLastRelease) {
				oldProjects = append(oldProjects, (project.Name + " - " + space.Name + " last release was " + strDateDiff + " days ago."))
			}
		}
	}

	strDaysSinceLastRelease := fmt.Sprintf("%f", daysSinceLastRelease)
	fmt.Printf("The following projects were found to have no releases created in at least %[1]s days \n", strDaysSinceLastRelease)
	for _, project := range oldProjects {
		fmt.Println("\t" + project)
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

func GetUserRole(client *octopusdeploy.Client, userRoleName string) *octopusdeploy.UserRole {
	// Get all roles
	userRoles, err := client.UserRoles.GetAll()

	if err != nil {
		log.Println(err)
	}

	for _, userRole := range userRoles {
		if userRole.Name == userRoleName {
			return userRole
		}
	}

	return nil
}
```

</details>

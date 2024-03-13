<details data-group="find-unused-targets">
<summary>PowerShell (REST API)</summary>

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

$octopusUrl = "https://local.octopusdemos.app" ## Octopus URL to look at
$octopusApiKey = "YOUR API KEY" ## API key of user who has permissions to view all spaces, cancel tasks, and resubmit runbooks runs and deployments
$daysSinceLastDeployment = 90 ## The number of days since the last deployment to be considered unused.  Any target without a deployment in the last [90] days is considered inactive.
$includeMachineLists = $false;  ## If true, all machines in each category will get listed out to the console.  If false, just a summary of information will be included.

$unsupportedCommunicationStyles = @("None")
$tentacleCommunicationStyles = @("TentaclePassive")

function Invoke-OctopusApi
{
    param
    (
        $octopusUrl,
        $endPoint,
        $spaceId,
        $apiKey,
        $method,
        $item   
    )

    $octopusUrlToUse = $OctopusUrl
    if ($OctopusUrl.EndsWith("/"))
    {
        $octopusUrlToUse = $OctopusUrl.Substring(0, $OctopusUrl.Length - 1)
    }

    if ([string]::IsNullOrWhiteSpace($spaceId))
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

        Write-Verbose "No data to post or put, calling bog standard invoke-restmethod for $url"
        $result = Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -ContentType 'application/json; charset=utf-8'

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
                Write-Error -Message "Error calling $url $($_.Exception.Message) StatusCode: $($_.Exception.Response.StatusCode )"
            }            
        }
        else
        {
            Write-Verbose $_.Exception
        }
    }

    Throw $_.Exception
}

function Update-CategorizedMachines
{
    param (
        $categorizedMachines,
        $space
    )

    $machineList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "machines?skip=0&take=10000" -spaceId $space.Id -method "GET"    

    foreach ($machine in $machineList.Items)
    {
        $categorizedMachines.TotalMachines += 1

        if ($unsupportedCommunicationStyles -contains $machine.Endpoint.CommunicationStyle)
        {
            $categorizedMachines.NotCountedMachines += $machine
            continue
        }

        if ($tentacleCommunicationStyles -contains $machine.Endpoint.CommunicationStyle)
        {
            $duplicateTentacle = $categorizedMachines.ListeningTentacles | Where-Object {$_.Thumbprint -eq $machine.Thumbprint -and $_.EndPoint.Uri -eq $machine.Endpoint.Uri }

            if ($null -ne $duplicateTentacle)
            {
                $categorizedMachines.DuplicateTentacles += $machine
                $categorizedMachines.ActiveMachines -= 1
            }

            $categorizedMachines.ListeningTentacles += $machine
        }        

        if ($machine.IsDisabled -eq $true)
        {
            $categorizedMachines.DisabledMachines += $machine
            continue
        }

        $categorizedMachines.ActiveMachines += 1

        if ($machine.Status -ne "Online")
        {
            $categorizedMachines.OfflineMachines += $machine            
        }

        $deploymentsList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "machines/$($machine.Id)/tasks?skip=0" -spaceId $space.Id -method "GET"

        if ($deploymentsList.Items.Count -le 0)
        {
            $categorizedMachines.UnusedMachines += $machine
            continue
        }

        $deploymentDate = [datetime]::Parse($deploymentsList.Items[0].CompletedTime)
        $deploymentDate = $deploymentDate.ToUniversalTime()

        $dateDiff = $currentUtcTime - $deploymentDate

        if ($dateDiff.TotalDays -gt $daysSinceLastDeployment)
        {
            $categorizedMachines.OldMachines += $machine                        
        }                 
    }
}

$currentUtcTime = $(Get-Date).ToUniversalTime()

$categorizedMachines = @{
    NotCountedMachines = @()
    DisabledMachines = @()
    ActiveMachines = 0
    OfflineMachines = @()
    UnusedMachines = @()
    OldMachines = @()
    TotalMachines = 0
    ListeningTentacles = @()
    DuplicateTentacles = @()
}

# Need to check the Octopus Server version for spaces feature
Write-Host "Checking Octopus Server version..."
$apiInfo = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint $null -method "GET"
$version = $apiInfo.Version
$versionParts = $apiInfo.Version.Split(".")

if ($versionParts[0] -ge 2019) {
    Write-Host "Octopus Server version $version supports spaces, checking all spaces."
    $spaceList = Invoke-OctopusApi -octopusUrl $octopusUrl -apiKey $octopusApiKey -endPoint "spaces?skip=0&take=1000" -spaceId $null -method "GET"
    foreach ($space in $spaceList.Items)
    {    
        Update-CategorizedMachines -categorizedMachines $categorizedMachines -space $space
    }
} else {
    Write-Host "Octopus Server version $version doesn't use spaces."
    Update-CategorizedMachines -categorizedMachines $categorizedMachines
}

Write-Host "This instance has a total of $($categorizedMachines.TotalMachines) targets across all spaces."
Write-Host "There are $($categorizedMachines.NotCountedMachines.Count) cloud regions which are not counted."
Write-Host "There are $($categorizedMachines.DisabledMachines.Count) disabled machines that are not counted."
Write-Host "There are $($categorizedMachines.DuplicateTentacles.Count) duplicate listening tentacles that are not counted (assuming you are using 2019.7.3+)."
Write-Host ""
Write-Host "This leaves you with $($categorizedMachines.ActiveMachines) active targets being counted against your license (this script is excluding the $($categorizedMachines.DuplicateTentacles.Count) duplicates in that active count)."
Write-Host "Of that combined number, $($categorizedMachines.OfflineMachines.Count) are showing up as offline."
Write-Host "Of that combined number, $($categorizedMachines.UnusedMachines.Count) have never had a deployment."
Write-Host "Of that combined number, $($categorizedMachines.OldMachines.Count) haven't done a deployment in over $daysSinceLastDeployment days."

if ($includeMachineLists -eq $true){
    Write-Host "Offline Targets"
    Foreach ($target in $categorizedMachines.OfflineMachines)
    {
        Write-Host " -  $($target.Name)"
    }

    Write-Host "No Deployment Ever Targets"
    Foreach ($target in $categorizedMachines.UnusedMachines)
    {
        Write-Host " -  $($target.Name)"
    }

    Write-Host " No deployments in the last $daysSinceLastDeployment days"
    Foreach ($target in $categorizedMachines.OldMachines)
    {
        Write-Host " -  $($target.Name)"
    }
}
```

</details>
<details data-group="find-unused-targets">
<summary>PowerShell (Octopus.Client)</summary>

```powershell
# Load assembly
Add-Type -Path 'path:\to\Octopus.Client.dll'
$octopusURL = "https://YourURL"
$octopusAPIKey = "API-YourAPIKey"
$daysSinceLastDeployment = 90
$includeMachineLists = $false;  ## If true, all machines in each category will get listed out to the console.  If false, just a summary of information will be included.

$unsupportedCommunicationStyles = @("None")
$tentacleCommunicationStyles = @("TentaclePassive")

function Update-CategorizedMachines
{
    param (
        $categorizedMachines,
        $space,
        $client
    )

    $repositoryForSpace = $client.ForSpace($space)

    $machineList = $repositoryForSpace.Machines.GetAll()

    foreach ($machine in $machineList)
    {
        $categorizedMachines.TotalMachines += 1

        if ($unsupportedCommunicationStyles -contains $machine.Endpoint.CommunicationStyle)
        {
            $categorizedMachines.NotCountedMachines += $machine
            continue
        }

        if ($tentacleCommunicationStyles -contains $machine.Endpoint.CommunicationStyle)
        {
            $duplicateTentacle = $categorizedMachines.ListeningTentacles | Where-Object {$_.Thumbprint -eq $machine.Thumbprint -and $_.EndPoint.Uri -eq $machine.Endpoint.Uri }

            if ($null -ne $duplicateTentacle)
            {
                $categorizedMachines.DuplicateTentacles += $machine
                $categorizedMachines.ActiveMachines -= 1
            }

            $categorizedMachines.ListeningTentacles += $machine
        }        

        if ($machine.IsDisabled -eq $true)
        {
            $categorizedMachines.DisabledMachines += $machine
            continue
        }

        $categorizedMachines.ActiveMachines += 1

        if ($machine.Status -ne "Online")
        {
            $categorizedMachines.OfflineMachines += $machine            
        }

        $deploymentsList = $repositoryForSpace.Machines.GetTasks($machine)

        if ($deploymentsList.Count -le 0)
        {
            $categorizedMachines.UnusedMachines += $machine
            continue
        }

        $deploymentDate = [datetime]::Parse($deploymentsList[0].CompletedTime)
        $deploymentDate = $deploymentDate.ToUniversalTime()

        $dateDiff = $currentUtcTime - $deploymentDate

        if ($dateDiff.TotalDays -gt $daysSinceLastDeployment)
        {
            $categorizedMachines.OldMachines += $machine                        
        }                 
    }
}

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

$currentUtcTime = $(Get-Date).ToUniversalTime()
$categorizedMachines = @{
    NotCountedMachines = @()
    DisabledMachines = @()
    ActiveMachines = 0
    OfflineMachines = @()
    UnusedMachines = @()
    OldMachines = @()
    TotalMachines = 0
    ListeningTentacles = @()
    DuplicateTentacles = @()
}

# Get all spaces
$spaces = $repository.Spaces.GetAll()

# Loop through spaces
foreach ($space in $spaces)
{
    Update-CategorizedMachines -categorizedMachines $categorizedMachines -space $space -client $client
}

Write-Host "This instance has a total of $($categorizedMachines.TotalMachines) targets across all spaces."
Write-Host "There are $($categorizedMachines.NotCountedMachines.Count) cloud regions which are not counted."
Write-Host "There are $($categorizedMachines.DisabledMachines.Count) disabled machines that are not counted."
Write-Host "There are $($categorizedMachines.DuplicateTentacles.Count) duplicate listening tentacles that are not counted (assuming you are using 2019.7.3+)."
Write-Host ""
Write-Host "This leaves you with $($categorizedMachines.ActiveMachines) active targets being counted against your license (this script is excluding the $($categorizedMachines.DuplicateTentacles.Count) duplicates in that active count)."
Write-Host "Of that combined number, $($categorizedMachines.OfflineMachines.Count) are showing up as offline."
Write-Host "Of that combined number, $($categorizedMachines.UnusedMachines.Count) have never had a deployment."
Write-Host "Of that combined number, $($categorizedMachines.OldMachines.Count) haven't done a deployment in over $daysSinceLastDeployment days."

if ($includeMachineLists -eq $true){
    Write-Host "Offline Targets"
    Foreach ($target in $categorizedMachines.OfflineMachines)
    {
        Write-Host " -  $($target.Name)"
    }

    Write-Host "No Deployment Ever Targets"
    Foreach ($target in $categorizedMachines.UnusedMachines)
    {
        Write-Host " -  $($target.Name)"
    }

    Write-Host " No deployments in the last $daysSinceLastDeployment days"
    Foreach ($target in $categorizedMachines.OldMachines)
    {
        Write-Host " -  $($target.Name)"
    }
}
```

</details>
<details data-group="find-unused-targets">
<summary>C#</summary>

```csharp
class CategorizedMachines
{
    // Define private variables
    private System.Collections.Generic.List<Octopus.Client.Model.MachineResource> _notCountedMachines = new System.Collections.Generic.List<MachineResource>();
    private System.Collections.Generic.List<Octopus.Client.Model.MachineResource> _disabledMachines = new System.Collections.Generic.List<MachineResource>();
    private System.Collections.Generic.List<Octopus.Client.Model.MachineResource> _offlineMachines = new System.Collections.Generic.List<MachineResource>();
    private System.Collections.Generic.List<Octopus.Client.Model.MachineResource> _unusedMachines = new System.Collections.Generic.List<MachineResource>();
    private System.Collections.Generic.List<Octopus.Client.Model.MachineResource> _oldMachines = new System.Collections.Generic.List<MachineResource>();
    private System.Collections.Generic.List<Octopus.Client.Model.MachineResource> _listeningTentacles = new System.Collections.Generic.List<MachineResource>();
    private System.Collections.Generic.List<Octopus.Client.Model.MachineResource> _duplicateTentacles = new System.Collections.Generic.List<MachineResource>();

    // Define public properties
    public System.Collections.Generic.List<Octopus.Client.Model.MachineResource> NotCountedMachines
    {
        get
        {
            return _notCountedMachines;
        }
        set
        {
            _notCountedMachines = value;
        }
    }

    public System.Collections.Generic.List<Octopus.Client.Model.MachineResource> DisabledMachines
    {
        get
        {
            return _disabledMachines;
        }
        set
        {
            _disabledMachines = value;
        }
    }

    public System.Collections.Generic.List<Octopus.Client.Model.MachineResource> OfflineMachines
    {
        get
        {
            return _offlineMachines;
        }
        set
        {
            _offlineMachines = value;
        }
    }

    public System.Collections.Generic.List<Octopus.Client.Model.MachineResource> UnusedMachines
    {
        get
        {
            return _unusedMachines;
        }
        set
        {
            _unusedMachines = value;
        }
    }

    public System.Collections.Generic.List<Octopus.Client.Model.MachineResource> OldMachines
    {
        get
        {
            return _oldMachines;
        }
        set
        {
            _oldMachines = value;
        }
    }

    public System.Collections.Generic.List<Octopus.Client.Model.MachineResource> ListeningTentacles
    {
        get
        {
            return _listeningTentacles;
        }
        set
        {
            _listeningTentacles = value;
        }
    }

    public System.Collections.Generic.List<Octopus.Client.Model.MachineResource> DuplicateTentacles
    {
        get
        {
            return _duplicateTentacles;
        }
        set
        {
            _duplicateTentacles = value;
        }
    }

    public int ActiveMachines
    {
        get;
        set;
    }

    public int TotalMachines
    {
        get;
        set;
    }
}

static CategorizedMachines UpdateCategorizedMachines (CategorizedMachines categorizedMachines, Octopus.Client.Model.SpaceResource space, Octopus.Client.OctopusClient client, System.Collections.Generic.List<string> unsupportedCommunicationsStyles, System.Collections.Generic.List<string> tentacleCommunicationsStyles, int daysSinceLastDeployment)
{
    var currentUtcTime = DateTime.Now.ToUniversalTime();
    // Create repository for space
    var repositoryForSpace = client.ForSpace(space);

    // Get machines in space
    var machines = repositoryForSpace.Machines.FindAll();
    
    // Loop through machines
    foreach (var machine in machines)
    {
        categorizedMachines.TotalMachines++;
        
        if (unsupportedCommunicationsStyles.Contains(machine.Endpoint.CommunicationStyle.ToString()))
        {
            categorizedMachines.NotCountedMachines.Add(machine);
            continue;
        }

        if (tentacleCommunicationsStyles.Contains(machine.Endpoint.CommunicationStyle.ToString()))
        {
            var duplicateTentacle = categorizedMachines.ListeningTentacles.FirstOrDefault(m => m.Thumbprint == machine.Thumbprint);

            switch (machine.Endpoint.CommunicationStyle.ToString())
            {
                case "TentaclePassive":
                    {
                        var machineEndpoint = (Octopus.Client.Model.Endpoints.ListeningTentacleEndpointResource)machine.Endpoint;
                        

                        if (duplicateTentacle != null && ((Octopus.Client.Model.Endpoints.ListeningTentacleEndpointResource)duplicateTentacle.Endpoint).Uri == machineEndpoint.Uri)
                        {
                            categorizedMachines.DuplicateTentacles.Add(machine);
                            categorizedMachines.ActiveMachines--;
                        }

                        categorizedMachines.ListeningTentacles.Add(machine);

                        break;
                    }
                case "TentacleActive":
                    {
                        break;
                    }
            }
        }

        if (machine.IsDisabled)
        {
            categorizedMachines.DisabledMachines.Add(machine);
            continue;
        }

        categorizedMachines.ActiveMachines++;

        if(machine.Status != Octopus.Client.Model.MachineModelStatus.Online)
        {
            categorizedMachines.OfflineMachines.Add(machine);
        }

        var deploymentList = repositoryForSpace.Machines.GetTasks(machine);

        if (deploymentList.Count <= 0)
        {
            categorizedMachines.UnusedMachines.Add(machine);
            continue;
        }

        var deploymentDate = deploymentList[0].CompletedTime.Value.ToUniversalTime();

        var dateDiff = currentUtcTime - deploymentDate;

        if (dateDiff.TotalDays > daysSinceLastDeployment)
        {
            categorizedMachines.OldMachines.Add(machine);
        }
        
    }

    return categorizedMachines;
}

// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;
using System.Linq;

var octopusURL = "https://YourURL";
var octopusAPIKey = "API-YourAPIKey";
DateTime currentUtcTime = DateTime.Now.ToUniversalTime();
CategorizedMachines categorizedMachines = new CategorizedMachines();
int daysSinceLastDeployment = 90;
bool includeMachineLists = false;
System.Collections.Generic.List<string> unsupportedCommunicationsStyles = new System.Collections.Generic.List<string> { "None" };
System.Collections.Generic.List<string> tentacleCommunicationsStyles = new System.Collections.Generic.List<string> { "TentaclePassive" };

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

// Get all spaces
var spaces = repository.Spaces.FindAll();

// Loop through spaces
foreach (var space in spaces)
{
    categorizedMachines = UpdateCategorizedMachines(categorizedMachines, space, client, unsupportedCommunicationsStyles, tentacleCommunicationsStyles, daysSinceLastDeployment);
}

Console.WriteLine(string.Format("This instance has a total of {0} targets across all spaces", categorizedMachines.TotalMachines.ToString()));
Console.WriteLine(string.Format("There are {0} cloud regions which are not counted", categorizedMachines.NotCountedMachines.Count.ToString()));
Console.WriteLine(string.Format("There are {0} disabled machines which are not counted", categorizedMachines.DisabledMachines.Count.ToString()));
Console.WriteLine(string.Format("There are {0} duplicate listening Tentacles that are not counted (assuming you are using 2019.7.3+", categorizedMachines.DuplicateTentacles.Count.ToString()));
Console.WriteLine(string.Empty);
Console.WriteLine(string.Format("This leaves you with {0} active targets being counted against your license (this process is excluding the {1} duplicates in that active count)", categorizedMachines.ActiveMachines.ToString(), categorizedMachines.DuplicateTentacles.Count.ToString()));
Console.WriteLine(string.Format("Of that combined number, {0} are showing up as offline", categorizedMachines.OfflineMachines.Count.ToString()));
Console.WriteLine(string.Format("Of that combined number, {0} have never had a deployment", categorizedMachines.UnusedMachines.Count.ToString()));
Console.WriteLine(string.Format("Of that combined number, {0} haven't done a deployment in over {1} days", categorizedMachines.OldMachines.Count.ToString(), daysSinceLastDeployment));

if (includeMachineLists)
{
    Console.WriteLine(string.Format("Offline targets"));
    foreach (var machine in categorizedMachines.OfflineMachines)
    {
        Console.WriteLine(string.Format("\t{0}", machine.Name));
    }

    Console.WriteLine(string.Format("No deployment ever targets"));
    foreach (var machine in categorizedMachines.UnusedMachines)
    {
        Console.WriteLine(string.Format("\t{0}", machine.Name));
    }

    Console.WriteLine(string.Format("No deployments in the last {0} days", daysSinceLastDeployment));
    foreach(var machine in categorizedMachines.OldMachines)
    {
        Console.WriteLine(string.Format("\t{0}", machine.Name));
    }
}
```

</details>
<details data-group="find-unused-targets">
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

def find_duplicate_entry(categorized_machines, machine):
    machineEndpoint = machine['Endpoint']
    
    for entry in categorized_machines['ListeningTentacles']:
        entryEndpoint = entry['Endpoint']
        

        if entryEndpoint['Thumbprint'] == machineEndpoint['Thumbprint'] and entryEndpoint['Uri'] == machine['Uri']:
            return entry

    
    return None


def update_categorized_machines(categorized_machines, space, octopus_server_uri, headers, unsupported_communication_styles, tentacle_communication_styles):
    # Get machines for space
    uri = '{0}/api/{1}/machines'.format(octopus_server_uri, space['Id'])
    machine_list = get_octopus_resource(uri, headers)
    current_date = datetime.datetime.utcnow()

    for machine in machine_list:
        categorized_machines['TotalMachines'] += 1

        if machine['Endpoint']['CommunicationStyle'] in unsupported_communication_styles:
            categorized_machines['NotCountedMachines'].append(machine)
            continue
        
        if machine['Endpoint']['CommunicationStyle'] in tentacle_communication_styles:
            if machine['Endpoint']['CommunicationStyle'] == "TentaclePassive":
                # Search for duplicate
                duplicate_machine = find_duplicate_entry(categorized_machines, machine)
                if duplicate_machine != None:
                    categorized_machines['DuplicateTentacles'].append(machine)
                    categorized_machines['ActiveMachines'] -= 1

                categorized_machines['ListeningTentacles'].append(machine)
            
        if machine['IsDisabled'] == True:
            categorized_machines['DisabledMachines'].append(machine)
            continue

        categorized_machines['ActiveMachines'] +=1

        if machine['Status'] != "Online":
            categorized_machines['OfflineMachines'].append(machine)

        uri = '{0}/api/{1}/machines/{2}/tasks'.format(octopus_server_uri, space['Id'], machine['Id'])
        deployment_list = get_octopus_resource(uri, headers)

        if len(deployment_list) <= 0:
            categorized_machines['UnusedMachines'].append(machine)
            continue

        deployment_date = parse(deployment_list[0]['CompletedTime'])
        deployment_date = deployment_date.replace(tzinfo=None)

        # Calculate the date difference
        date_diff = current_date - deployment_date

        if date_diff.days > days_since_last_deployment:
            categorized_machines['OldMachines'].append(machine)
            
    
    return categorized_machines



octopus_server_uri = 'https://your.octopus.app'
octopus_api_key = 'API-YOURKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}
categorized_machines = {
    'NotCountedMachines': [],
    'DisabledMachines': [],
    'ActiveMachines': 0,
    'OfflineMachines': [],
    'OldMachines': [],
    'TotalMachines': 0,
    'ListeningTentacles': [],
    'DuplicateTentacles': [],
    'UnusedMachines': []
}
unsupported_communication_styles = ['None']
tentacle_communication_styles = ['TentaclePassive']
current_date = datetime.datetime.utcnow()
days_since_last_deployment = 90
include_machine_lists = False

# Get spaces
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)

# Loop through spaces
for space in spaces:
    categorized_machines = update_categorized_machines(categorized_machines, space, octopus_server_uri, headers, unsupported_communication_styles, tentacle_communication_styles)

print('This instance has a total of {0} targets across all spaces'.format(categorized_machines['TotalMachines']))
print('There are {0} cloud regions which are not counted'.format(len(categorized_machines['NotCountedMachines'])))
print('There are {0} disabled machines that are not counted'.format(len(categorized_machines['DisabledMachines'])))
print('There are {0} duplicate listening tentacles that are not counted (assuming you are using 2019.7.3+)'.format(len(categorized_machines['DuplicateTentacles'])))
print('\n')
print('This leaves you with {0} active targets being counted against your license (this script is excluding the {1} duplicates in that active count'.format(categorized_machines['ActiveMachines'], len(categorized_machines['DuplicateTentacles'])))
print('Of that combined number, {0} are showing up as offline'.format(len(categorized_machines['OfflineMachines'])))
print('Of that combined number, {0} have never had a deployment'.format(len(categorized_machines['UnusedMachines'])))
print('Of that combined number, {0} have not done a deployment in over {1} days'.format(len(categorized_machines['OldMachines']), days_since_last_deployment))

if include_machine_lists:
    print("Offline targets")
    for target in categorized_machines['OfflineMachines']:
        print("\t{0}".format(target['Name']))
    
    print("No deployments ever")
    for target in categorized_machines['UnusedMachines']:
        print("\t{0}".format(target['Name']))

    print ("No deployments in the last {0} days".format(days_since_last_deployment))
    for target in categorized_machines['OldMachines']:
        print("\t{0}".format(target['Name']))
```

</details>
<details data-group="find-unused-targets">
<summary>Go</summary>

```go
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strconv"
	"time"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

type CategorizedMachines struct {
	NotCountedMachines []*octopusdeploy.DeploymentTarget
	DisabledMachines   []*octopusdeploy.DeploymentTarget
	ActiveMachines     int
	OfflineMachines    []*octopusdeploy.DeploymentTarget
	UnusedMachines     []*octopusdeploy.DeploymentTarget
	OldMachines        []*octopusdeploy.DeploymentTarget
	TotalMachines      int
	ListeningTentacles []*octopusdeploy.DeploymentTarget
	DuplicateTentacles []*octopusdeploy.DeploymentTarget
}

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	daysSinceLastDeployment := 90
	includeMachineLists := true
	categorizedMachines := CategorizedMachines{}
	unsupportedCommunicationStyles := []string{"None"}
	tentacleCommunicationStyles := []string{"TentaclePassive"}

	// Create client object
	client := octopusAuth(apiURL, APIKey, "")

	// Get all spaces
	spaces, err := client.Spaces.GetAll()

	if err != nil {
		log.Println(err)
	}

	for _, space := range spaces {
		categorizedMachines = updateCategorizedMachines(apiURL, APIKey, space, categorizedMachines, unsupportedCommunicationStyles, tentacleCommunicationStyles, daysSinceLastDeployment)
	}

	fmt.Printf("This instance has a total of %[1]s targets across all spaces \n", strconv.Itoa(categorizedMachines.TotalMachines))
	fmt.Printf("There are %[1]s cloud regions which are not counted \n", strconv.Itoa(len(categorizedMachines.NotCountedMachines)))
	fmt.Printf("There are %[1]s disabled machines which are not counted \n", strconv.Itoa(len(categorizedMachines.DisabledMachines)))
	fmt.Printf("There are %[1]s duplicate listening tentacles that are not counted (assuming you are using 2019.7.3+)\n", strconv.Itoa(len(categorizedMachines.DuplicateTentacles)))
	fmt.Println("")
	fmt.Printf("This leaves you with %[1]s active targets being counted against your license (this process is excluding %[2]s duplicates in that active count) \n", strconv.Itoa(categorizedMachines.ActiveMachines), strconv.Itoa(len(categorizedMachines.DuplicateTentacles)))
	fmt.Printf("Of that combined number, %[1]s are showing up as offline\n", strconv.Itoa(len(categorizedMachines.OfflineMachines)))
	fmt.Printf("Of that combined number, %[1]s have never had a deployment\n", strconv.Itoa(len(categorizedMachines.UnusedMachines)))
	fmt.Printf("Of that combined number, %[1]s have not done a deployment in over %[2]s days\n", strconv.Itoa(len(categorizedMachines.OldMachines)), strconv.Itoa(daysSinceLastDeployment))

	if includeMachineLists {
		fmt.Println("Offline targets")
		for _, target := range categorizedMachines.OfflineMachines {
			fmt.Printf("\t%[1]s\n", target.Name)
		}

		fmt.Println("No deployments ever")
		for _, target := range categorizedMachines.UnusedMachines {
			fmt.Printf("\t%[1]s\n", target.Name)
		}

		fmt.Printf("No deployments in the last %[1]s days\n", strconv.Itoa(daysSinceLastDeployment))
		for _, target := range categorizedMachines.OldMachines {
			fmt.Printf("\t%[1]s\n", target.Name)
		}

		fmt.Printf("Duplicates\n")
		for _, target := range categorizedMachines.DuplicateTentacles {
			fmt.Printf("\t%[1]s\n", target.Name)
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

func arrayContains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}

func updateCategorizedMachines(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, categorizedMachines CategorizedMachines, unsupportedCommunicationStyles []string, tentacleCommunicationStyles []string, daysSinceLastDeployment int) CategorizedMachines {
	currentDate := time.Now()

	// Get client
	client := octopusAuth(octopusURL, APIKey, space.ID)

	// Get all machines
	machines, err := client.Machines.GetAll()

	if err != nil {
		log.Println(err)
	}

	// Loop through machines
	for _, machine := range machines {
		categorizedMachines.TotalMachines++

		if arrayContains(unsupportedCommunicationStyles, machine.Endpoint.GetCommunicationStyle()) {
			categorizedMachines.NotCountedMachines = append(categorizedMachines.NotCountedMachines, machine)
			continue
		}

		if arrayContains(tentacleCommunicationStyles, machine.Endpoint.GetCommunicationStyle()) {
			if machine.Endpoint.GetCommunicationStyle() == "TentaclePassive" {
				duplicateEntry := searchForDuplicateListening(categorizedMachines, machine)

				if duplicateEntry != nil {
					categorizedMachines.DuplicateTentacles = append(categorizedMachines.DuplicateTentacles, machine)
					categorizedMachines.ActiveMachines--
				}

				categorizedMachines.ListeningTentacles = append(categorizedMachines.ListeningTentacles, machine)
			}
		}

		if machine.IsDisabled {
			categorizedMachines.DisabledMachines = append(categorizedMachines.DisabledMachines, machine)
			continue
		}

		categorizedMachines.ActiveMachines++

		if machine.Status != "Online" {
			categorizedMachines.OfflineMachines = append(categorizedMachines.OfflineMachines, machine)
		}

		deploymentList := GetMachineTasks(octopusURL, APIKey, space, machine)

		if len(deploymentList) <= 0 {
			categorizedMachines.UnusedMachines = append(categorizedMachines.UnusedMachines, machine)
			continue
		}

		latestDeployment := deploymentList[0].(map[string]interface{})
		deploymentDate, err := time.Parse(time.RFC3339Nano, latestDeployment["CompletedTime"].(string))

		if err != nil {
			log.Println(err)
		}

		dateDiff := currentDate.Sub(deploymentDate).Hours() / 24

		if dateDiff > float64(daysSinceLastDeployment) {
			categorizedMachines.OldMachines = append(categorizedMachines.OldMachines, machine)
		}
	}

	return categorizedMachines
}

func searchForDuplicateListening(categorizedMachines CategorizedMachines, machine *octopusdeploy.DeploymentTarget) *octopusdeploy.DeploymentTarget {
	// Loop through listening tentacles
	for _, entry := range categorizedMachines.ListeningTentacles {
		if entry.Thumbprint == machine.Thumbprint && entry.URI == machine.URI {
			return entry
		}
	}

	return nil
}

func GetMachineTasks(octopusURL *url.URL, APIKey string, space *octopusdeploy.Space, machine *octopusdeploy.DeploymentTarget) []interface{} {
	// Define api endpoint
	tasksEndpoint := octopusURL.String() + "/api/" + space.ID + "/machines/" + machine.ID + "/tasks"

	// Create http client
	httpClient := &http.Client{}
	skipAmount := 0

	// Make request
	request, _ := http.NewRequest("GET", tasksEndpoint, nil)
	request.Header.Set("X-Octopus-ApiKey", APIKey)
	response, err := httpClient.Do(request)

	if err != nil {
		log.Println(err)
	}

	// Get response
	responseData, err := ioutil.ReadAll(response.Body)
	var tasksJson interface{}
	err = json.Unmarshal(responseData, &tasksJson)

	// Map the returned data
	returnedTasks := tasksJson.(map[string]interface{})
	// Returns the list of items, translate it to a map
	returnedItems := returnedTasks["Items"].([]interface{})

	for true {
		// check to see if there's more to get
		fltItemsPerPage := returnedTasks["ItemsPerPage"].(float64)
		itemsPerPage := int(fltItemsPerPage)

		if len(returnedTasks["Items"].([]interface{})) == itemsPerPage {
			// Increment skip amount
			skipAmount += len(returnedTasks["Items"].([]interface{}))

			// Make request
			queryString := request.URL.Query()
			queryString.Set("skip", strconv.Itoa(skipAmount))
			request.URL.RawQuery = queryString.Encode()
			response, err := httpClient.Do(request)

			if err != nil {
				log.Println(err)
			}

			responseData, err := ioutil.ReadAll(response.Body)
			var releasesJson interface{}
			err = json.Unmarshal(responseData, &releasesJson)

			returnedTasks = releasesJson.(map[string]interface{})
			returnedItems = append(returnedItems, returnedTasks["Items"].([]interface{})...)
		} else {
			break
		}
	}

	return returnedItems
}
```

</details>

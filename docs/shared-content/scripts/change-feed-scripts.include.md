```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$feedName = "nuget.org"

# Change property
$newFeedName = "nuget.org feed"

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get feed
    $feed = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/feeds/all" -Headers $header) | Where-Object {$_.Name -eq $feedName}
    
    # Change feed name
    $feed.Name = $newFeedName
    
    # Update feed in Octopus
    Invoke-RestMethod -Uri "$octopusURL/api/$($space.Id)/feeds/$($feed.Id)" -Body ($feed | ConvertTo-Json -Depth 10) -Headers $header -Method Put
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.Client)
Add-Type -Path "C:\Octo\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

$spaceName = "default"
$feedName = "nuget.org"
$newFeedName = "nuget.org feed"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

try
{
    # Get space id
    $space = $repository.Spaces.FindByName($spaceName)
    Write-Host "Using Space named $($space.Name) with id $($space.Id)"

    # Create space specific repository
    $repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)

    # Get feed
    $feed = $repositoryForSpace.Feeds.FindByName($feedName)

    # Change feed name
    $feed.Name = $newFeedName

    # Update feed
    $repositoryForSpace.Feeds.Modify($feed) | Out-Null
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

string spaceName = "Default";
string feedName = "nuget.org";
string newFeedName = "nuget.org feed";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);
    
    // Get Feed
    var feed = repositoryForSpace.Feeds.FindByName(feedName);
    
    // Change feed name
    feed.Name = newFeedName;

    // Update feed
    repositoryForSpace.Feeds.Modify(feed);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
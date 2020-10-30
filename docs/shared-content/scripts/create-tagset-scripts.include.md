```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$tagsetName = "Upgrade Ring"
$tagsetDescription = "Describes which upgrade ring the tenant belongs to"

# Optional Tags to add in the format "Tag name", "Tag Color"
$optionalTags = @{}
$optionalTags.Add("Early Adopter", "#ECAD3F")
$optionalTags.Add("Stable", "#36A766")

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# See if tagset already exists
$tagsetResults = (Invoke-RestMethod -Method Get "$octopusURL/api/$($space.Id)/tagsets?partialName=$tagsetName" -Headers $header) 
if( $tagsetResults.TotalResults -gt 0) {
    throw "Existing tagset results found matching '$($tagsetName)'!"
}

$tags = @()
if($optionalTags.Count -gt 0)
{
    foreach ($tagName in $optionalTags.Keys) {
        $tag = @{
            Id = $null
            Name = $tagName
            Color = $optionalTags.Item($tagName)
            Description = ""
            CanonicalTagName = $null
        }
        $tags += $tag
    }
}
# Create tagset json payload
$jsonPayload = @{
    Name = $tagsetName
    Description = $tagsetDescription
    Tags = $tags
}

# Create tagset
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/tagsets" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "Default"
$tagsetName = "Upgrade Ring"
$tagsetDescription = "Describes which upgrade ring the tenant belongs to"

# Optional Tags to add in the format "Tag name", "Tag Color"
$optionalTags = @{}
$optionalTags.Add("Early Adopter", "#ECAD3F")
$optionalTags.Add("Stable", "#36A766")

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Create or modify tagset
    $tagsetEditor = $repositoryForSpace.TagSets.CreateOrModify($tagsetName, $tagsetDescription)
    
    # Add optional tags
    if($optionalTags.Count -gt 0)
    {
        foreach ($tagName in $optionalTags.Keys) {
            $tagsetEditor.AddOrUpdateTag($tagName, "", $optionalTags.Item($tagName))
        }
    }
    $tagsetEditor.Save()
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
var spaceName = "Default";
var tagsetName = "Upgrade Ring";
var tagsetDescription = "Describes which upgrade ring the tenant belongs to";

// Optional Tags to add in the format "Tag name", "Tag Color"
var optionalTags = new Dictionary<string, string>();
optionalTags.Add("Early Adopter", "#ECAD3F");
optionalTags.Add("Stable", "#36A766");

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Create or modify tagset
    var tagsetEditor = repositoryForSpace.TagSets.CreateOrModify(tagsetName, tagsetDescription);

    // Add optional tags
    foreach (var tag in optionalTags)
    {
        tagsetEditor.AddOrUpdateTag(tag.Key, "", tag.Value);
    }
    tagsetEditor.Save();
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
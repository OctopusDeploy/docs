```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$packageFile = "path\to\package"

try
{
    # Load http assembly
    Add-Type -AssemblyName System.Net.Http

    # Create http client handler
    $httpClientHandler = New-Object System.Net.Http.HttpClientHandler
    $httpClient = New-Object System.Net.Http.HttpClient $httpClientHandler
    $httpClient.DefaultRequestHeaders.Add("X-Octopus-ApiKey", $octopusAPIKey)
    
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName} 

    # Open file stream
    $fileStream = New-Object System.IO.FileStream($packageFile, [System.IO.FileMode]::Open)

    # Create dispositon object
    $contentDispositionHeaderValue = New-Object System.Net.Http.Headers.ContentDispositionHeaderValue "form-data"
    $contentDispositionHeaderValue.Name = "fileData"
    $contentDispositionHeaderValue.FileName = [System.IO.Path]::GetFileName($packageFile)

    # Creat steam content
    $streamContent = New-Object System.Net.Http.StreamContent $fileStream
    $streamContent.Headers.ContentDisposition = $contentDispositionHeaderValue
    $contentType = "multipart/form-data"
    $streamContent.Headers.ContentType = New-Object System.Net.Http.Headers.MediaTypeHeaderValue $contentType

    $content = New-Object System.Net.Http.MultipartFormDataContent
    $content.Add($streamContent)

    # Upload package
    $httpClient.PostAsync("$octopusURL/api/$($space.Id)/packages/raw?replace=false", $content).Result
}
catch
{
    Write-Host $_.Exception.Message
}
finally
{
    if ($null -ne $fileStream)
    {
        $fileStream.Close()
    }
}
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "default"
$packageFile = "path\to\package"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint
$fileStream = $null

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Create new package resource
    $package = New-Object Octopus.Client.Model.PackageResource

    # Create filestream object
    $fileStream = New-Object System.IO.FileStream($packageFile, [System.IO.FileMode]::Open)

    # Push package
    $repositoryForSpace.BuiltInPackageRepository.PushPackage($packageFile, $fileStream)
}
catch
{
    Write-Host $_.Exception.Message
}
finally
{
    if ($null -ne $fileStream)
    {
        $fileStream.Close()
    }
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-APIKEY";
var spaceName = "default";
string packageFile = "path\\to\\file";
System.IO.FileStream fileStream = null;

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Open file stream
    fileStream = new System.IO.FileStream(packageFile, System.IO.FileMode.Open);

    // Push package
    repositoryForSpace.BuiltInPackageRepository.PushPackage(packageFile, fileStream);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    Console.ReadLine();
    return;
}
finally
{
    if (fileStream != null)
    {
        fileStream.Close();
    }
}
```
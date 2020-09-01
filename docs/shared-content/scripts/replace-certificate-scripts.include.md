```powershell
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"

# Certificate details
$certificateName = "MyCertificate"
$certificateFilePath = "path\to\pfx-file.pfx"
$certificatePfxPassword = "PFX-file-password"

# Convert PFX file to base64
$certificateContent = [Convert]::ToBase64String((Get-Content -Path $certificateFilePath -Encoding Byte))

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

    # Get existing certificate
    $certificate = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/certificates/all" -Headers $header) | Where-Object {($_.Name -eq $certificateName) -and ($null -eq $_.Archived)}

    # Check to see if multiple certificates were returned
    if ($certificate -is [array])
    {
        # Throw exception
        throw "Multiple certificates returned!"        
    }

    # Create JSON payload
    $jsonPayload = @{
        certificateData = $certificateContent
        password = $certificatePfxPassword
    }

    # Submit request
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/certificates/$($certificate.Id)/replace" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.Client)
# Load Octopus Client assembly
Add-Type -Path 'path\to\Octopus.Client.dll' 

# Provide credentials for Octopus
$apikey = 'API-YOURAPIKEY' 
$octopusURI = 'https://youroctourl' 
$spaceName = "default"

# Create repository object
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURI,$apikey 
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)
    
    # Get current certificate
    $certificateName = "MyCertificate"
    $currentCertificate = $repositoryForSpace.Certificates.FindAll() | Where-Object {($_.Name -eq $certificateName) -and ($null -eq $_.Archived)} # Octopus supports multiple certificates of the same name.  The FindByName() method returns the first one it finds, so it is not useful in this scenario

    # Check to see if multiple certificates were returned
    if ($currentCertificate -is [array])
    {
        # throw error
        throw "Multiple certificates returned!"
    }

    # Get replacement certificate
    $replacementPfxPath = "path\to\replacement\file.pfx"
    $pfxBase64 = [Convert]::ToBase64String((Get-Content -Path $replacementPfxPath -Encoding Byte)) 
    $pfxPassword = "PFX-file-password"

    # Replace certificate
    $replacementCertificate = $repositoryForSpace.Certificates.Replace($currentCertificate, $pfxBase64, $pfxPassword);
}
catch
{
    Write-Host $_.Exception.Message
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-APIKEY";
string pfxFilePath = "C:\\path\\to\\thecert.pfx";
string pfxFilePassword = "PFX-file-password";
string certificateName = "MyCertificate";
string spaceName = "default";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Convert file to base64
    string base64Certificate = Convert.ToBase64String(System.IO.File.ReadAllBytes(pfxFilePath));

    // Get certificates
    List<Octopus.Client.Model.CertificateResource> octopusCertificate = repositoryForSpace.Certificates.FindAll().Where(c => c.Name == certificateName && c.Archived == null).ToList();

    // Check to see if multiple were returned
    if (octopusCertificate.Count > 1)
    {
        // throw error
        throw new Exception("Multiple certificates returned!");
    }

    // Replace certificate
    repositoryForSpace.Certificates.Replace(octopusCertificate.FirstOrDefault(), base64Certificate, pfxFilePassword);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
```powershell
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$space = "Spaces-1"

# Certificate details
$certificateName = "MyCertificate"
$certificateFilePath = "path\to\pfx-file.pfx"
$certificatePfxPassword = "PFX-file-password"

# Convert PFX file to base64
$certificateContent = [Convert]::ToBase64String((Get-Content -Path $certificateFilePath -Encoding Byte))

try
{
    # Get existing certificate
    $certificate = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$space/certificates/all" -Headers $header) | Where-Object {$_.Name -eq $certificateName}

    # Create JSON payload
    $jsonPayload = @{
        certificateData = $certificateContent
        password = $certificatePfxPassword
    }

    # Submit request
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$space/certificates/$($certificate.Id)/replace" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell PowerShell (Octopus.Client)
# Load Octopus Client assembly
Add-Type -Path 'C:\octopus.client\Octopus.Client.dll' 

# Provide credentials for Octopus
$apikey = 'API-YOURAPIKEY' # Get this from your profile
$octopusURI = 'https://youroctourl' # Your server address

# Create repository object
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURI,$apikey 
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

try
{
    # Get current certificate
    $certificateName = "MyCertificate"
    $currentCertificate = $repository.Certificates.FindByName($certificateName);

    # Get replacement certificate
    $replacementPfxPath = "path\to\replacement\file.pfx"
    $pfxBase64 = [Convert]::ToBase64String((Get-Content -Path $replacementPfxPath -Encoding Byte)) 
    $pfxPassword = "PFX-file-password"

    # Replace certificate
    $replacementCertificate = $repository.Certificates.Replace($currentCertificate, $pfxBase64, $pfxPassword);
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

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

try
{
    // Convert file to base64
    string base64Certificate = Convert.ToBase64String(System.IO.File.ReadAllBytes(pfxFilePath));

    // Replace certificate object
    Octopus.Client.Model.CertificateResource octopusCertificate = repository.Certificates.FindByName(certificateName);
    repository.Certificates.Replace(octopusCertificate, base64Certificate, pfxFilePassword);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
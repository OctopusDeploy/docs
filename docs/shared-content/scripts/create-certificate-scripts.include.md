```powershell PowerShell (REST API)
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"

# Certificate details
$certificateName = "MyCertificate"
$certificateNotes = ""
$certificateFilePath = "path\to\pfxfile.pfx"
$certificatePfxPassword = "PFX-file-password"
$certificateEnvironmentIds = @()
$certificateTenantIds = @()
$certificateTenantTags = @()
$certificateTenantedDeploymentParticipation = "Untenanted"

# Convert PFX file to base64
$certificateContent = [Convert]::ToBase64String((Get-Content -Path $certificateFilePath -Encoding Byte))

try
{
    # Get space
    $space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}
    
    # Create JSON payload
    $jsonPayload = @{
        Name = $certificateName
        Notes = $certificateNotes
        CertificateData = @{
            HasValue = $true
            NewValue = $certificateContent
        }
        Password = @{
            HasValue = $true
            NewValue = $certificatePfxPassword
        }
        EnvironmentIds = $certificateEnvironmentIds
        TenantIds = $certificateTenantIds
        TenantTags = $certificateTenantTags
        TenantedDeploymentPartificapation = $certificateTenantedDeploymentParticipation
    }

    # Submit request
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/certificates" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
}
catch
{
    Write-Host $_.Exception.Message
}
```

```powershell PowerShell (Octopus.Client)
# Load Octopus Client assembly
Add-Type -Path 'path\to\Octopus.Client.dll' 

# Declare working variables
$apikey = 'API-YOURAPIKEY' # Get this from your profile
$octopusURI = 'https://youroctourl' # Your server address
$spaceName = 'default'

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURI,$apikey 
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)
    
    # Fill in certificate details
    $pfxFilePath = "path\to\pfxfile.pfx" # note: other file formats are supported https://octopus.com/docs/deploying-applications/certificates/file-formats  
    $pfxBase64 = [Convert]::ToBase64String((Get-Content -Path $pfxFilePath -Encoding Byte)) 
    $pfxPassword = "PFX-file-password"
    $certificateName = "MyCertificate" # The display name in Octopus

    # Create certificate
    $certificateResource = New-Object -TypeName "Octopus.Client.Model.CertificateResource" -ArgumentList @($certificateName, $pfxBase64, $pfxPassword) 
    $certificateResource = $repositoryForSpace.Certificates.Create($certificateResource);
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
string pfxFilePath = "path\\to\\pfxfile.pfx";
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

    // Create certificate object
    Octopus.Client.Model.CertificateResource octopusCertificate = new CertificateResource(certificateName, base64Certificate, pfxFilePassword);
    repositoryForSpace.Certificates.Create(octopusCertificate);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
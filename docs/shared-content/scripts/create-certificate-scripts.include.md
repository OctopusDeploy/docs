```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

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
    TenantedDeploymentParticipation = $certificateTenantedDeploymentParticipation
}

# Submit request
Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/certificates" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
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
```python Python3
import json
import requests
import base64

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

certificate_name = 'My Certificate'
certificate_notes = 'My certificate created using python via the REST API'
certificate_file_path = '/path/to/pfx_file.pfx'
certificate_file_password = 'pfx-file-password'

# Optional tenanted parameters
# Use 'Untenanted' for certificate_tenanted_deployment if multi-tenancy not required.
certificate_environments = ['Development']
certificate_tenants = ['Tenant A']
certificate_tenant_tags = ['Upgrade Ring/Stable']
certificate_tenanted_deployment = 'Tenanted'

certificate_data = open(certificate_file_path, 'rb').read()
certificate_base64 = base64.b64encode(certificate_data)

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)

environments = get_octopus_resource('{0}/{1}/environments/all'.format(octopus_server_uri, space['Id']))
environment_ids = [environment['Id'] for environment in environments if environment['Name'] in certificate_environments]

tenants = get_octopus_resource('{0}/{1}/tenants/all'.format(octopus_server_uri, space['Id']))
tenant_ids = [tenant['Id'] for tenant in tenants if tenant['Name'] in certificate_tenants]

certificate = {
    'Name': certificate_name,
    'Notes': certificate_notes,
    'CertificateData': {
        'HasValue': True,
        'NewValue': certificate_base64
    },
    'Password': {
        'HasValue': True,
        'NewValue': certificate_file_password
    },
    'EnvironmentIds': environment_ids,
    'TenantIds': tenant_ids,
    'TenantTags': certificate_tenant_tags,
    'TenantedDeploymentParticipation': certificate_tenanted_deployment
}
uri = '{0}/{1}/certificates'.format(octopus_server_uri, space['Id'])
response = requests.post(uri, headers=headers, json=certificate)
response.raise_for_status()
```
```go Go
package main

import (
	"fmt"
	"log"
	"net/url"

	b64 "encoding/base64"
	"io/ioutil"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	certificateName := "MyCertificate"
	pathToCertificate := "path:\\To\\PFXFile.pfx"
	pfxPassword := "YourPassword"
	rawData, err := ioutil.ReadFile(pathToCertificate)

	if err != nil {
		log.Println(err)
	}

    // Convert byte array to base 64 string
	stringRawData := b64.StdEncoding.EncodeToString([]byte(rawData))

    // Create new certificate sensitive value
    certificateData := octopusdeploy.SensitiveValue{
		HasValue: true,
		NewValue: &stringRawData,
	}

    // Create PFX Password as sensitive value
	sensitivePfxPassword := octopusdeploy.SensitiveValue{
		HasValue: true,
		NewValue: &pfxPassword,
	}

	// Create new certificate resource
	certificate := octopusdeploy.NewCertificateResource(certificateName, &certificateData, &sensitivePfxPassword)

	// Get space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Create certificate
	certificate, err = client.Certificates.Add(certificate)

	if err != nil {
		log.Println(err)
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

	// Get specific space object
	space, err := client.Spaces.GetByName(spaceName)

	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("Retrieved space " + space.Name)
	}

	return space
}
```
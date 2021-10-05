```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

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
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions
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
```python Python3
import json
from os import replace
import requests
from requests.api import get, head
import base64

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
space_name = 'Default'
certificate_name = 'MyCertificate'
certificate_file_path = 'path:\\to\\certificate.Pfx'
certificate_file_password = 'MyPassword'

# Get space
uri = '{0}/api/spaces'.format(octopus_server_uri)
spaces = get_octopus_resource(uri, headers)
space = next((x for x in spaces if x['Name'] == space_name), None)

# Open file
certificate_data = open(certificate_file_path, 'rb').read()
certificate_base64 = base64.b64encode(certificate_data)


# Get current certificiate
uri = '{0}/api/{1}/certificates'.format(octopus_server_uri, space['Id'])
certificates = get_octopus_resource(uri, headers)
certificate = next((c for c in certificates if c['Name'] == certificate_name), None)
test = certificate_base64.decode()

# Create json for upload
replacement_certificate = {
    'certificateData':  certificate_base64.decode().strip(),
    'password': certificate_file_password
}

# Replace certificate
uri = '{0}/api/{1}/certificates/{2}/replace'.format(octopus_server_uri, space['Id'], certificate['Id'])
response = requests.post(uri, headers=headers, json=replacement_certificate)
response.raise_for_status()
```
```go Go
package main

import (
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
	APIKey := "API-YourAPIEKey"

	spaceName := "Default"
	certificateName := "MyCertificate"
	certificateFilePath := "path:\\to\\NewCertificate.pfx"
	certificatePassword := "MyPassword"

	// Get the space object
	space := GetSpace(apiURL, APIKey, spaceName)

	// Creat client for space
	client := octopusAuth(apiURL, APIKey, space.ID)

	rawData, err := ioutil.ReadFile(certificateFilePath)
	if err != nil {
		log.Println(err)
	}

	// Convert data to base64 encoded string
	base64String := b64.StdEncoding.EncodeToString([]byte(rawData))

	// Get certificate
	certificate := GetCertificate(client, certificateName)

	// Replace existing certificate
	replacementCertificate := octopusdeploy.NewReplacementCertificate(base64String, certificatePassword)
	client.Certificates.Replace(certificate.ID, replacementCertificate)
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

func GetCertificate(client *octopusdeploy.Client, certificateName string) *octopusdeploy.CertificateResource {
	certificateQuery := octopusdeploy.CertificatesQuery{
		PartialName: certificateName,
		Archived:    "",
		Skip:        0,
		Take:        1000,
	}

	certificates, err := client.Certificates.Get(certificateQuery)
	if err != nil {
		log.Println(err)
	}

	for _, certificate := range certificates.Items {
		if certificate.Name == certificateName && certificate.Archived == "" {
			return certificate
		}
	}

	return nil
}
```
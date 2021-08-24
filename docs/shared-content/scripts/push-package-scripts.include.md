```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "default"
$packageFile = "path\to\package"

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

if ($null -ne $fileStream)
{
    $fileStream.Close()
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
```python Python3
import json
import requests

octopus_server_uri = 'https://your.octopus.app/api'
octopus_api_key = 'API-YOURAPIKEY'
headers = {'X-Octopus-ApiKey': octopus_api_key}

space_name = "Default"
package_folder = '/folder/containing/package/'
package_name = 'Package.Name.1.2.3.zip'

uri = '{0}/spaces/all'.format(octopus_server_uri)
response = requests.get(uri, headers=headers)
response.raise_for_status()

spaces = json.loads(response.content.decode('utf-8'))
space = next((x for x in spaces if x['Name'] == space_name), None)

with open('{0}{1}'.format(package_folder, package_name), 'rb') as package:
    uri = '{0}/{1}/packages/raw?replace=false'.format(octopus_server_uri, space['Id'])
    files = {
        'fileData': (package_name, package, 'multipart/form-data', {'Content-Disposition': 'form-data'})
    }

    response = requests.post(uri, headers=headers, files=files)
    response.raise_for_status()
```
```go Go
package main

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strconv"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"

	spaceName := "Default"
	filePath := "path:\\to\\package.X.X.X.X.zip"

	// Get the space object
	space := GetSpace(apiURL, APIKey, spaceName)
	url := apiURL.String() + "/api/" + space.ID + "/packages/raw?replace=false"

	UploadPackage(filePath, url, APIKey)
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
	}

	return space
}

func UploadPackage(filePath string, url string, APIKey string) {

	file, err := os.Open(filePath)
	if err != nil {
		log.Println(err)
	}

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile("filedata", filepath.Base(file.Name()))
	if err != nil {
		log.Println(err)
	}

	io.Copy(part, file)

	writer.Close()

	request, err := http.NewRequest("POST", url, body)
	if err != nil {
		log.Println(err)
	}

	fileStats, err := file.Stat()
	if err != nil {
		log.Println(err)
	}

	fileSize := strconv.FormatInt(fileStats.Size(), 10)
	request.Header.Set("X-Octopus-ApiKey", APIKey)
	request.Header.Set("Upload-Offset", "0")
	request.Header.Set("Content-Length", fileSize)
	request.Header.Set("Upload-Length", fileSize)
	request.Header.Set("Content-Type", writer.FormDataContentType())
	client := &http.Client{}

	response, err := client.Do(request)
	if err != nil {
		log.Println(err)
	}

	defer response.Body.Close()
}
```
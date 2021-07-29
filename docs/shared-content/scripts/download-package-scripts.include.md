```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"
$packageName = "packageName"
$packageVersion = "1.0.0.0"
$outputFolder = "/path/to/output/folder"

# Get space
$space = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/spaces/all" -Headers $header) | Where-Object {$_.Name -eq $spaceName}

# Get package details
$package = (Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/packages/packages-$packageName.$packageVersion" -Headers $header)

# Get package
$filePath = [System.IO.Path]::Combine($outputFolder, "$($package.PackageId).$($package.Version)$($package.FileExtension)")
Invoke-RestMethod -Method Get -Uri "$octopusURL/api/$($space.Id)/packages/$packageName.$packageVersion/raw" -Headers $header -OutFile $filePath
Write-Host "Downloaded file to $filePath"
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "path\to\Octopus.Client.dll"

# Octopus variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "Default"
$packageName = "packageName"
$packageVersion = "1.0.0.0"
$outputFolder = "C:\Temp\"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint
$client = New-Object Octopus.Client.OctopusClient $endpoint

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Get package
    $package = $repositoryForSpace = $repositoryForSpace.BuiltInPackageRepository.GetPackage($packageName, $packageVersion)

    # Download Package
    $filePath = [System.IO.Path]::Combine($outputFolder, "$($package.PackageId).$($package.Version)$($package.FileExtension)")
    Invoke-RestMethod -Method Get -Uri "$octopusURL/$($package.Links.Raw)" -Headers $header -OutFile $filePath
    Write-Host "Downloaded file to $filePath"
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
string packageName = "packagename";
string packageVersion = "1.0.0.0";
string outputFolder = @"C:\Temp\";

octopusURL = octopusURL.TrimEnd('/');

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);
var client = new OctopusClient(endpoint);

try
{
    // Get space
    var space = repository.Spaces.FindByName(spaceName);
    var repositoryForSpace = client.ForSpace(space);

    // Get package details
    var packageDetails = repositoryForSpace.BuiltInPackageRepository.GetPackage(packageName, packageVersion);

    // Download package
    var webClient = new System.Net.WebClient();
    webClient.Headers["X-Octopus-ApiKey"] = octopusAPIKey;
    var uri = new Uri(octopusURL + "/" + packageDetails.Links["Raw"]);
    var filePath = Path.Combine(outputFolder, string.Format("{0}.{1}{2}", packageName, packageVersion, packageDetails.FileExtension));
    
    webClient.DownloadFile(uri, filePath);
    Console.WriteLine("Downloaded file to {0}", filePath);
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

space_name = "Default"
package_output_folder = '/path/to/output/package/to'
package_name = 'packagename'
package_version = '1.0.0.0'

space = get_by_name('{0}/spaces/all'.format(octopus_server_uri), space_name)
package = get_octopus_resource('{0}/{1}/packages/packages-{2}.{3}'.format(octopus_server_uri, space['Id'], package_name, package_version))

uri = '{0}/{1}/packages/packages-{2}.{3}/raw'.format(octopus_server_uri, space['Id'], package_name, package_version)
response = requests.get(uri, headers=headers)
response.raise_for_status()
package_output_file_path = '{0}/{1}.{2}{3}'.format(package_output_folder, package_name, package_version, package['FileExtension'])
f = open(package_output_file_path, "wb")
f.write(response.content)
f.close()
print('Downloaded package to \'{0}\''.format(package_output_file_path))
```
```go Go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/OctopusDeploy/go-octopusdeploy/octopusdeploy"
)

func main() {

	apiURL, err := url.Parse("https://YourURL")
	if err != nil {
		log.Println(err)
	}
	APIKey := "API-YourAPIKey"
	spaceName := "Default"
	downloadPath := "c:\\temp"
	packageName := "MyPackage"
	packageVersion := "1.0.0"

	// Get reference to space
	space := GetSpace(apiURL, APIKey, spaceName)

	// Create client object
	client := octopusAuth(apiURL, APIKey, space.ID)

	// Get packages
	packages, err := client.Packages.GetAll()
	if err != nil {
		log.Println(err)
	}

	for i := 0; i < len(packages); i++ {
		if (packages[i].PackageID == packageName) && (packages[i].Version == packageVersion) {
			DownloadPackage(apiURL, APIKey, packages[i], downloadPath)

			break
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

func DownloadPackage(octopusURL *url.URL, APIKey string, octoPackage *octopusdeploy.Package, downloadPath string) {
	// Create http client
	httpClient := &http.Client{}

	// Build url
	downloadUrl := octopusURL.String() + octoPackage.Links["Raw"]

	// Get the download path
	filePath := downloadPath + "\\" + octoPackage.PackageID + "." + octoPackage.Version + octoPackage.FileExtension

	// Get the data
	request, _ := http.NewRequest("GET", downloadUrl, nil)
	request.Header.Set("X-Octopus-ApiKey", APIKey)
	response, err := httpClient.Do(request)
	//response, err := http.Get(downloadUrl)
	if err != nil {
		log.Println(err)
	}
	defer response.Body.Close()

	// Create folder if necessary
	if _, err := os.Stat(downloadPath); os.IsNotExist(err) {
		err := os.Mkdir(downloadPath, os.ModeDir)
		if err != nil {
			log.Println(err)
		}
	}

	// Create file
	out, err := os.Create(filePath)
	if err != nil {
		log.Println(err)
	}
	defer out.Close()

	// Write to file
	_, err = io.Copy(out, response.Body)

}
```
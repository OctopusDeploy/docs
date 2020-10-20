```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }

# UserName of the user for which the API key will be created. You can check this value from the web portal under Configuration/Users
$UserName = "" 

#Purpose of the API Key. This field is mandatory.
$APIKeyPurpose = ""

# Create payload
$body = @{
    Purpose = $APIKeyPurpose
} | ConvertTo-Json

# Getting all users to filter target user by name
$allUsers = (Invoke-WebRequest "$OctopusURL/api/users/all" -Headers $header -Method Get).content | ConvertFrom-Json

# Getting user that owns API Key.
$User = $allUsers | Where-Object { $_.username -eq $UserName }

# Creating API Key
$CreateAPIKeyResponse = (Invoke-WebRequest "$OctopusURL/api/users/$($User.id)/apikeys" -Method Post -Headers $header -Body $body -Verbose).content | ConvertFrom-Json

# Printing new API Key
Write-Output "API Key created: $($CreateAPIKeyResponse.apikey)"
```
```powershell PowerShell (Octopus.Client)
# Load octopus.client assembly
Add-Type -Path "C:\octo\Octopus.Client.dll"

# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

# Purpose of the API Key. This field is mandatory.
$APIKeyPurpose = ""

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURL, $octopusAPIKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

try
{
    # Get Current user
    $User = $repository.Users.GetCurrent()

    # Create API Key for user
    $ApiKeyResponse = $repository.Users.CreateApiKey($User, $APIKeyPurpose)

    # Return the API Key
    Write-Output "API Key created: $($ApiKeyResponse.ApiKey)"
}
catch
{
    Write-Host $_.Exception.Message
}
```
```csharp C#
// If using .net Core, be sure to add the NuGet package of System.Security.Permissions

// Reference Octopus.Client
//#r "path\to\Octopus.Client.dll"

using Octopus.Client;
using Octopus.Client.Model;

// Declare working varibles
var octopusURL = "https://youroctourl";
var octopusAPIKey = "API-YOURAPIKEY";
string apiKeyPurpose = "Key used with C# application";

// Create repository object
var endpoint = new OctopusServerEndpoint(octopusURL, octopusAPIKey);
var repository = new OctopusRepository(endpoint);

try
{
    // Get Current user
    var user = repository.Users.GetCurrent();

    // Create API Key for user
    var apiKeyResponse = repository.Users.CreateApiKey(user, apiKeyPurpose);

    // Return the API Key
    Console.WriteLine("API Key created: {0}", apiKeyResponse.ApiKey);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
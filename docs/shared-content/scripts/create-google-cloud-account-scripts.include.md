```powershell PowerShell (REST API)
$ErrorActionPreference = "Stop";

# Define working variables
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$spaceName = "Default"

# Octopus Account name
$accountName = "My Google Cloud Account"

# Octopus Account Description
$accountDescription = "A Google Cloud account for my project"

# Tenant Participation e.g. Tenanted, or, Untenanted, or TenantedOrUntenanted
$accountTenantParticipation = "Untenanted"

# Google Cloud JSON key file
$jsonKeyPath = "/path/to/jsonkeyfile.json"

# (Optional) Tenant tags e.g.: "AWS Region/California"
$accountTenantTags = @() 
# (Optional) Tenant Ids e.g.: "Tenants-101"
$accountTenantIds = @()
# (Optional) Environment Ids e.g.: "Environments-1"
$accountEnvironmentIds = @()

if(-not (Test-Path $jsonKeyPath)) {
    Write-Warning "The Json Key file was not found at '$jsonKeyPath'."
    return
}
else {
    $jsonContent = Get-Content -Path $jsonKeyPath
    $jsonKeyBase64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($jsonContent))
}

# Get space
$spaces = Invoke-RestMethod -Uri "$octopusURL/api/spaces?partialName=$([uri]::EscapeDataString($spaceName))&skip=0&take=100" -Headers $header 
$space = $spaces.Items | Where-Object { $_.Name -eq $spaceName }

# Create JSON payload
$jsonPayload = @{
    AccountType = "GoogleCloudAccount"
    JsonKey = @{
        HasValue = $true
        NewValue = $jsonKeyBase64
    }
    Name = $accountName
    Description = $accountDescription
    TenantedDeploymentParticipation = $accountTenantParticipation
    TenantTags = $accountTenantTags
    TenantIds = $accountTenantIds
    EnvironmentIds = $accountEnvironmentIds
}

# Add Google Cloud account
$accountResponse = Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$($space.Id)/accounts" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
$accountResponse
```
```PowerShell (Octopus.Client)
# Note: This script will only work with Octopus 2021.2 and higher.
# It also requires version 11.3.3355 or higher of the Octopus.Client library

# You can get this dll from your Octopus Server/Tentacle installation directory or from
# https://www.nuget.org/packages/Octopus.Client/
Add-Type -Path 'path\to\Octopus.Client.dll'
$octopusURL = "https://your.octopus.app"
$octopusAPIKey = "API-YOURAPIKEY"
$spaceName = "Default"

# Octopus Account name
$accountName = "My Google Cloud Account"

# Octopus Account Description
$accountDescription = "A Google Cloud account for my project"

# Tenant Participation e.g. Tenanted, or, Untenanted, or TenantedOrUntenanted
$accountTenantParticipation = "Untenanted"

# Google Cloud JSON key file
$jsonKeyPath = "/path/to/jsonkeyfile.json"

# (Optional) Tenant tags e.g.: "AWS Region/California"
$accountTenantTags = @() 
# (Optional) Tenant Ids e.g.: "Tenants-101"
$accountTenantIds = @()
# (Optional) Environment Ids e.g.: "Environments-1"
$accountEnvironmentIds = @()

if(-not (Test-Path $jsonKeyPath)) {
    Write-Warning "The Json Key file was not found at '$jsonKeyPath'."
    return
}
else {
    $jsonContent = Get-Content -Path $jsonKeyPath
    $jsonKeyBase64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($jsonContent))
}

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
$client = New-Object Octopus.Client.OctopusClient($endpoint)

try
{
    # Get space
    $space = $repository.Spaces.FindByName($spaceName)
    $repositoryForSpace = $client.ForSpace($space)

    # Create Google Cloud Account object
    $googleCloudAccount = New-Object Octopus.Client.Model.Accounts.GoogleCloudAccountResource
    $googleCloudAccount.Name = $accountName
    $googleCloudAccount.Description = $accountDescription
    
    $jsonKeySensitiveValue = New-Object Octopus.Client.Model.SensitiveValue
    $jsonKeySensitiveValue.NewValue = $jsonKeyBase64
    $jsonKeySensitiveValue.HasValue = $True
    $googleCloudAccount.JsonKey = $jsonKeySensitiveValue

    $googleCloudAccount.TenantedDeploymentParticipation = [Octopus.Client.Model.TenantedDeploymentMode]::$accountTenantParticipation
    $googleCloudAccount.TenantTags = New-Object Octopus.Client.Model.ReferenceCollection $accountTenantTags
    $googleCloudAccount.TenantIds = New-Object Octopus.Client.Model.ReferenceCollection $accountTenantIds
    $googleCloudAccount.EnvironmentIds = New-Object Octopus.Client.Model.ReferenceCollection $accountEnvironmentIds

    # Create account
    $repositoryForSpace.Accounts.Create($googleCloudAccount)
}
catch
{
    Write-Host $_.Exception.Message
}
```
```powershell
# Define working variables
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"
$header = @{ "X-Octopus-ApiKey" = $octopusAPIKey }
$space = "Spaces-1"

# Azure service principle details
$azureSubscriptionNumber = "Subscription-Guid"
$azureTenantId = "Tenant-Guid"
$azureClientId = "Client-Guid"
$azureSecret = "SecretPassword"

# Octopus Account details
$accountName = "Azure Account"
$accountDescription = "My Azure Account"
$accountTenantParticipation = "Untenanted"
$accountTenantTags = @()
$accountTenantIds = @()
$accountEnvironmentIds = @()

try
{
    # Create JSON payload
    $jsonPayload = @{
        AccountType = "AzureServicePrincipal"
        AzureEnvironment = ""
        SubscriptionNumber = $azureSubscriptionNumber
        Password = @{
            HasValue = $true
            NewValue = $azureSecret
        }
        TenantId = $azureTenantId
        ClientId = $azureClientId
        ActiveDirectoryEndpointBaseUri = ""
        ResourceManagementEndpointBaseUri = ""
        Name = $accountName
        Description = $accountDescription
        TenantedDeploymentParticipation = $accountTenantParticipation
        TenantTags = $accountTenantTags
        TenantIds = $accountTenantIds
        EnvironmentIds = $accountEnvironmentIds
    }

    # Add Azure account
    Invoke-RestMethod -Method Post -Uri "$octopusURL/api/$space/accounts" -Body ($jsonPayload | ConvertTo-Json -Depth 10) -Headers $header
}
catch
{
    Write-Host $_.Exception.Message
    exit
}
```
```powershell PowerShell (Octopus.Client)
# Load assembly
Add-Type -Path 'path\to\Octopus.Client.dll'
$octopusURL = "https://youroctourl"
$octopusAPIKey = "API-YOURAPIKEY"

# Azure service principle details
$azureSubscriptionNumber = "Subscription-Guid"
$azureTenantId = "Tenant-Guid"
$azureClientId = "Client-Guid"
$azureSecret = "SecretPassword"

# Octopus Account details
$accountName = "Azure Account"
$accountDescription = "My Azure Account"
$accountTenantParticipation = "Untenanted"
$accountTenantTags = @()
$accountTenantIds = @()
$accountEnvironmentIds = @()


$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($octopusURL, $octopusAPIKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

try
{
    # Create azure service principal object
    $azureAccount = New-Object Octopus.Client.Model.Accounts.AzureServicePrincipalAccountResource
    $azureAccount.ClientId = $azureClientId
    $azureAccount.TenantId = $azureTenantId
    $azureAccount.Description = $accountDescription
    $azureAccount.Name = $accountName
    $azureAccount.Password = $azureSecret
    $azureAccount.SubscriptionNumber = $azureSubscriptionNumber
    $azureAccount.TenantedDeploymentParticipation = [Octopus.Client.Model.TenantedDeploymentMode]::$accountTenantParticipation
    $azureAccount.TenantTags = New-Object Octopus.Client.Model.ReferenceCollection $accountTenantTags
    $azureAccount.TenantIds = New-Object Octopus.Client.Model.ReferenceCollection $accountTenantIds
    $azureAccount.EnvironmentIds = New-Object Octopus.Client.Model.ReferenceCollection $accountEnvironmentIds

    # Create account
    $repository.Accounts.Create($azureAccount)
}
catch
{
    Write-Host $_.Exception.Message
}
```
```csharp C#
#r "path\to\Octopus.Client.dll"

var OctopusURL = "https://youroctourl";
var OctopusAPIKey = "API-YOURAPIKEY";

// Azure specific details
string azureSubscriptionNumber = "Subscription-Guid";
string azureClientId = "Client-Guid";
string azureTenantId = "Tenant-Guid";
string azureSecret = "SecretPassword";

// Octopus Account details
string octopusAccountName = "Azure Account";
string octopusAccountDescription = "My Azure Account";
Octopus.Client.Model.TenantedDeploymentMode octopusAccountTenantParticipation = Octopus.Client.Model.TenantedDeploymentMode.Untenanted;
Octopus.Client.Model.ReferenceCollection octopusAccountTenantTags = null;
Octopus.Client.Model.ReferenceCollection octopusAccountTenantIds = null;
Octopus.Client.Model.ReferenceCollection octopusAccountEnvironmentIds = null;

var endpoint = new OctopusServerEndpoint(OctopusURL, OctopusAPIKey);
var repository = new OctopusRepository(endpoint);
var azureAccount = new Octopus.Client.Model.Accounts.AzureServicePrincipalAccountResource();

try
{
    // Fill in account details
    azureAccount.ClientId = azureClientId;
    azureAccount.TenantId = azureTenantId;
    azureAccount.SubscriptionNumber = azureSubscriptionNumber;
    azureAccount.Password = azureSecret;
    azureAccount.Name = octopusAccountName;
    azureAccount.Description = octopusAccountDescription;
    azureAccount.TenantedDeploymentParticipation = octopusAccountTenantParticipation;
    azureAccount.TenantTags = octopusAccountTenantTags;
    azureAccount.TenantIds = octopusAccountTenantIds;
    azureAccount.EnvironmentIds = octopusAccountEnvironmentIds;

    // Create account
    repository.Accounts.Create(azureAccount);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
```
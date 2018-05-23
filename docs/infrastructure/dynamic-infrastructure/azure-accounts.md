---
title: Create Azure Service Principal Account Command
description: Cmdlet for creating an Azure Service Principal account
position: 10
---

## Azure Service Principal Account
Command: **_New-OctopusAzureServicePrincipalAccount_**

| Parameters                    | Value                                                                                                      |
|-------------------------------|------------------------------------------------------------------------------------------------------------|
| `-name`                       | Name for the Octopus Service Principal account                                                             |
| `-azureSubscription`          | GUID Id of the Azure Subscription                                                                          |
| `-azureApplicationId`         | GUID Id of the Azure Application                                                                           |
| `-azureTenantId`              | GUID Id of the Azure AD Tenant                                                                             |
| `-azurePassword`              | Azure AD Password                                                                                          |
| `-azureEnvironment`           | Azure Environment Identifier,  see [Azure Environment Options](#azure-environment-options) below           |
| `-azureBaseUri`               | Azure Base Login URI, see [Azure Environment Options](#azure-environment-options) below                    |
| `-azureResourceManagementUri` | Azure Resource Management URI,  see [Azure Environment Options](#azure-environment-options) below          |
| `-updateIfExisting`           | Will update an existing account with the same name, create if it doesn't exist |

Example:
```powershell
# Targeting the Azure Global Cloud
New-OctopusAzureServicePrincipalAccount -name "My Azure Account" `
                                        -azureSubscription "dea39b53-1ac8-4adc-b291-a44b205921af" `
                                        -azureApplicationId "f83ece42-857d-44ed-9652-0765af7fa7d4" `
                                        -azureTenantId "e91671b4-a676-4cb6-8ff8-69fcb8e048d6" `
                                        -azurePassword "correct horse battery staple" `
                                        -updateIfExisting

# Targeting an isolated Cloud, e.g AzureGermanCloud
New-OctopusAzureServicePrincipalAccount -name "My Azure Account" `
                                        -azureSubscription "dea39b53-1ac8-4adc-b291-a44b205921af" `
                                        -azureApplicationId "f83ece42-857d-44ed-9652-0765af7fa7d4" `
                                        -azureTenantId "e91671b4-a676-4cb6-8ff8-69fcb8e048d6" `
                                        -azurePassword "correct horse battery staple" `
                                        -azureEnvironment "AzureGermanCloud" `
                                        -azureBaseUri "https://login.microsoftonline.de/" `
                                        -azureResourceManagementBaseUri "https://management.microsoftazure.de/"
```

### Azure Environment Options

The valid options for `-azureEnvironment` are available via the following command:
```powershell
Get-AzureRmEnvironment | Select-Object -Property Name,ActiveDirectoryAuthority,ResourceManagerUrl
```

Valid Azure cloud names are:
- AzureChina
- AzureCloud
- AzureGermanCloud
- AzureUSGovernment

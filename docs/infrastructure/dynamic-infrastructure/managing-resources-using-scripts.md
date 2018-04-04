---
title: Managing Resources using scripts
description: Octopus resources can be created using service messages allowing resources that you currently can script in Azure to be modeled in Octopus.
position: 10
version: "[2018.5,)"
---

Some resources can be created within Octopus from the same scripts that you use to create them on Azure. By adding some additional commands Web Apps you create on Azure can also be created within Octopus as deployment targets.

:::warning
As of the `2018.5` release, only Azure Service Principal Accounts, Azure Web Apps, Azure Service Fabric and Azure Cloud Services targets are supported.
:::

## Available Commands and Syntax

Each of the resource commands is available as a Powershell function anywhere that a step allows you to run a Powershell script.

### Targets

#### Azure Web App
Command: **_New-OctopusAzureWebAppTarget_**

| Parameter                 | Value                                         |
| ------------------------- | --------------------------------------------- |
| `-name`                   | name for the Octopus deployment target        |
| `-azureWebApp`            | Name of the Azure Web App                     |
| `-azureResourceGroupName` | Name of the Azure Resource Group              |
| `-octopusAccountIdOrName` | Name or Id of the Account Resource in Octopus |
| `-octopusRoles`           | Comma separated list of Roles to assign       |

Example:
```powershell
New-OctopusAzureWebAppTarget -name "My Azure Web Application" `
                             -azureWebApp "WebApp1" `
                             -azureResourceGroupName "WebApp1-ResourceGroup"  `
                             -octopusAccountIdOrName "Dev Azure Account" `
                             -octopusRoles "AzureWebApp"
```

#### Azure Service Fabric
Command: **_New-OctopusAzureServiceFabricTarget_**

| Parameter                       | Value                                              |
| ------------------------------- | -------------------------------------------------  |
| `-name`                         | Name for the Octopus deployment target             |
| `-azureConnectionEndpoint`      | Connection endpoint for the Service Fabric Cluster |
| `-azureSecurityMode`            | Security mode, use one of the aliases in the table below |
| `-azureCertificateThumbprint`   | Certificate thumbprint of the Azure Certificate    |
| `-azureActiveDirectoryUsername` | Username for accessing the Service Fabric Cluster  |
| `-azureActiveDirectoryPassword` | Password for accessing the Service Fabric Cluster  |
| `-certificateStoreLocation`     | Override the default certificate store location    |
| `-certificateStoreName`         | Override the default certificate store name        |
| `-octopusCertificateIdOrName`   | Name or Id of the Certificate Resource in Octopus  |
| `-octopusRoles`                 | Comma separated list of Roles to assign            |

_Security Mode Options_

| Mode | Aliases |
| --- | --- |
| Unsecure | `unsecure` |
| Secure Client Certificate | `certificate` `clientcertificate` `secureclientcertificate` |
| Secure Azure Active Directory | `aad` `azureactivedirectory`| 

Examples:
```powershell
# Unsecure
New-OctopusAzureServiceFabricTarget -name "My Service Fabric Target 1" `
                                    -azureConnectionEndpoint "connectionEndpoint" `
                                    -azureSecurityMode "unsecure" `
                                    -octopusRoles "ServiceFabricRole"

# Client Certificate
New-OctopusAzureServiceFabricTarget -name "My Service Fabric Target 2" `
                                    -azureConnectionEndpoint "connectionEndpoint" `
                                    -azureSecurityMode "certificate" `
                                    -azureCertificateThumbprint "1234567890" `
                                    -octopusCertificateIdOrName "My Service Fabric Certificate" `
                                    -octopusRoles "Service Fabric Role"

# Client Certificate overriding certificate store
New-OctopusAzureServiceFabricTarget -name "My Service Fabric Target 3" `
                                    -azureConnectionEndpoint "https://localhost" `
                                    -azureSecurityMode "certificate" `
                                    -azureCertificateThumbprint "1234" `
                                    -certificateStoreLocation "Custom Store Location" `
                                    -certificateStoreName "My Store Name" `
                                    -octopusCertificateIdOrName "cert" `
                                    -octopusRoles "sfrole"

# Azure Active Directory
New-OctopusAzureServiceFabricTarget -name "My Service Fabric Target 4" `
                                   -azureConnectionEndpoint "connectionEndpoint" `
                                   -azureSecurityMode  "azureactivedirectory" `
                                   -azureCertificateThumbprint "1234567890" `                             
                                   -octopusCertificateIdOrName "cert" 
                                   -octopusRoles "Service Fabric Role"

```

#### Azure Cloud Service
Command: **_New-OctopusAzureCloudServiceTarget_**

| Parameter | Value |
| --- | --- |
| `-name`                         | Name for the Octopus deployment target             |
| `-azureCloudServiceName` | Name of the Azure Cloud Service |
| `-azureStorageAccount` | Name of the Azure Storage Account |
| `-azureDeploymentSlot` | Deployment slot. Options are `staging` (default), `production`) |
| `-swap` | Swap staging to production, or just deploy. Options are `swap` (default), `deploy` |
| `-instanceCount` | Use the current instance count from Azure, or use the value in the configuration file. Options are `current` (default), `configuration` |
| `-octopusAccountIdOrName` | Name or Id of the Account Resource in Octopus. Must be a Management Certificate Account |
| `-octopusRoles`                 | Comma separated list of Roles to assign            |

Example:
```powershell
# Using default options
New-OctopusAzureCloudServiceTarget -name "My Azure Cloud Service Target" `
                                   -azureCloudServiceName "CloudService1" `
                                   -azureStorageAccount "MyAzureCloudStorageAccount" `
                                   -octopusAccountIdOrName "Service Management Cert Account" `
                                   -octopusRoles "AzureCloudService"

New-OctopusAzureCloudServiceTarget -name "My Azure Cloud Service Target" `
                                   -azureCloudServiceName "CloudService1" `
                                   -azureStorageAccount "MyAzureCloudStorageAccount" `
                                   -azureDeploymentSlot "production" `
                                   -swap "deploy" `
                                   -instanceCount "configuration"
                                   -octopusAccountIdOrName "Service Management Cert Account" `
                                   -octopusRoles "AzureCloudService"
```

#### Delete Target
Command: **_Remove-OctopusTarget_**

| Parameter | Value |
| --- | --- |
| `-targetIdOrName` | The Name or Id of the target to delete |

Example:
```powershell
Remove-OctopusTarget -targetIdOrName "My Azure Web Application"
```

### Accounts

#### Azure Service Principal Account
Command: **_New-OctopusAzureServicePrincipalAccount_**

Example:
```powershell
# Targeting the Azure Global Cloud
New-OctopusAzureServicePrincipalAccount -name "My Azure Account" `
                                        -azureSubscription "dea39b53-1ac8-4adc-b291-a44b205921af" `
                                        -azureApplicationId "f83ece42-857d-44ed-9652-0765af7fa7d4" `
                                        -azureTenantId "e91671b4-a676-4cb6-8ff8-69fcb8e048d6" `
                                        -azurePassword "correct horse battery staple" `

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

**Azure Environment Options**

The valid options for `-azureEnvironment` are available via the following command:
```powershell
Get-AzureRmEnvironment | Select-Object -Property Name,ActiveDirectoryAuthority,ResourceManagerUrl
```

- AzureChina
- AzureCloud
- AzureGermanCloud
- AzureUSGovernment

## Scenarios

### Creating a Web App



### Deploying an ARM template

### Tearing down a test environment

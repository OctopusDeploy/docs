---
title: Managing Resources using scripts
description: Octopus resources can be created using service messages allowing resources that you currently can script in Azure to be modeled in Octopus.
position: 10
version: "[2018.5,)"
---

Some resources can be created within Octopus from the same scripts that you use to create them on Azure. By adding some additional commands Web Apps you create on Azure can also be created within Octopus as deployment targets.

:::warning
As of the `2018.5` release, only Azure Service Principal Accounts, Azure Web Apps and Azure Service Fabric targets are supported.
:::

## Available Commands and Syntax

Each of the resource commands is available as a Powershell function anywhere that a step allows you to run a Powershell script.

### Targets

#### Azure Web App
_New-OctopusAzureWebAppTarget_

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
_New-OctopusAzureServiceFabricTarget_

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
_New-OctopusAzureCloudServiceTarget

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
New-OctopusAzureCloudServiceTarget -name "My Azure Web Application" `
                                   -azureCloudServiceName "CloudService1" `
                                   -azureStorageAccount "MyAzureCloudStorageAccount"      `
                                   -azureDeploymentSlot "staging" `
                                   -swap "swap" `
                                   -instanceCount "current"
                                   -octopusAccountIdOrName "Service Management Cert      Account" `
                                   -octopusRoles "AzureCloudService"
```

### Azure Cloud Service
**New-OctopusAzureCloudServiceTarget**

// TODO: mark.siedle - Talk to Ben about what we need here.

#### Delete Target
_Remove-OctopusTarget__

| Parameter | Value |
| --- | --- |
| `-targetIdOrName` | The Name or Id of the target to delete |

```powershell
Remove-OctopusTarget -targetIdOrName "My Azure Web Application"
```

### Accounts

#### Azure Service Principal Account
```powershell

```

## Scenarios

### Creating a Web App

### Deploying and ARM template

### Tearing down a test environment

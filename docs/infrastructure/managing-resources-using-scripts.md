---
title: Managing Resources using scripts
description: Octopus resources can be created using service messages allowing resources that you currently can script in Azure to be modeled in Octopus.
position: 10
---

Some resources can be created within Octopus from the same scripts that you use to create them on Azure. By adding some additional commands Web Apps you create on Azure can also be created within Octopus as deployment targets.

:::warning
As of the 2018.4 release, only Azure Service Principal Accounts, Azure Web Apps and Azure Service Fabric targets are supported.
:::

## Available Commands and Syntax

Each of the resource commands is available as a Powershell function anywhere that a step allows you to run a Powershell script.

### Targets

#### Azure Web App
**New-OctopusAzureWebAppTarget**


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
**New-OctopusServiceFabricTarget**


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


```powershell
New-OctopusServiceFabricTarget 
```

#### Delete Target
**Remove-OctopusTarget**


| Parameter | Value |
| --- | --- |
| `-targetIdOrName` | The Name or Id of the target to delete |

```powershell
Remote-OctopusTarget -targetIdOrName "My Azure Web Application"
```

### Accounts

#### Azure Service Principal Account
```powershell

```

## Scenarios

### Creating a Web App

### Deploying and ARM template

### Tearing down a test environment


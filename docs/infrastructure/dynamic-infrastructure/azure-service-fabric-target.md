---
title: Create Azure Service Fabric Target Command
description: Cmdlet for creating an Azure Service Fabric target
version: "[2018.5,)"
position: 30
---

## Azure Service Fabric
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
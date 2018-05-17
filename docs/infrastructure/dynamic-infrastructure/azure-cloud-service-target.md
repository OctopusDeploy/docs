---
title: Create Azure Cloud Service Target Command
description: Cmdlet for creating an Azure Cloud Service target
position: 40
---

## Azure Cloud Service
Command: **_New-OctopusAzureCloudServiceTarget_**

| Parameter                     | Value                                                                                   |
| ------------------------------| --------------------------------------------------------------------------------------- |
| `-name`                       | Name for the Octopus deployment target                                                  |
| `-azureCloudServiceName`      | Name of the Azure Cloud Service                                                         |
| `-azureStorageAccount`        | Name of the Azure Storage Account                                                       |
| `-azureDeploymentSlot`        | Deployment slot. <br>Options are `staging` (default), `production`)                         |
| `-swap`                       | Swap staging to production, or just deploy. <br>Options are `swap` (default), `deploy`      |
| `-instanceCount`              | Use the current instance count from Azure, or use the value in the configuration file.<br>Options are `current` (default), `configuration` |
| `-octopusAccountIdOrName`     | Name or Id of the Account Resource in Octopus. Must be a Management Certificate Account |
| `-octopusRoles`               | Comma separated list of Roles to assign                                                 |
| `-updateIfExisting`           | Will update an existing Cloud Service target with the same name, create if it doesn't exist |

Example:
```powershell
# Using default options
New-OctopusAzureCloudServiceTarget -name "My Azure Cloud Service Target" `
                                   -azureCloudServiceName "CloudService1" `
                                   -azureStorageAccount "MyAzureCloudStorageAccount" `
                                   -octopusAccountIdOrName "Service Management Cert Account" `
                                   -octopusRoles "AzureCloudService"
                                   -updateIfExisting

# Overriding default values
New-OctopusAzureCloudServiceTarget -name "My Azure Cloud Service Target" `
                                   -azureCloudServiceName "CloudService1" `
                                   -azureStorageAccount "MyAzureCloudStorageAccount" `
                                   -azureDeploymentSlot "production" `
                                   -swap "deploy" `
                                   -instanceCount "configuration"
                                   -octopusAccountIdOrName "Service Management Cert Account" `
                                   -octopusRoles "AzureCloudService"
```

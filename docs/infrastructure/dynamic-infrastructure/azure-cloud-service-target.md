---
title: Create Azure Cloud Service Target Command
description: Cmdlet for creating an Azure Cloud Service target
version: "[2018.5,)"
position: 40
---

## Azure Cloud Service
Command: **_New-OctopusAzureCloudServiceTarget_**

| Parameter                     | Value                                                                                   |
| ------------------------------| --------------------------------------------------------------------------------------- |
| `-name`                       | Name for the Octopus deployment target                                                  |
| `-azureCloudServiceName`      | Name of the Azure Cloud Service                                                         |
| `-azureStorageAccount`        | Name of the Azure Storage Account                                                       |
| `-azureDeploymentSlot`        | Deployment slot. Options are `staging` (default), `production`)                         |
| `-swap`                       | Swap staging to production, or just deploy. Options are `swap` (default), `deploy`      |
| `-instanceCount`              | Use the current instance count from Azure, or use the value in the configuration file.<br>Options are `current` (default), `configuration` |
| `-octopusAccountIdOrName`     | Name or Id of the Account Resource in Octopus. Must be a Management Certificate Account |
| `-octopusRoles`               | Comma separated list of Roles to assign                                                 |


Options are `current` (default), `configuration`

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

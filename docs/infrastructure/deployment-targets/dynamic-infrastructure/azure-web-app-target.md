---
title: Create Azure Web App Target Command
description: Cmdlet for creating an Azure Web App target
position: 20
---

## Azure Web App
Command: **_New-OctopusAzureWebAppTarget_**

| Parameter                 | Value                                         |
| ------------------------- | --------------------------------------------- |
| `-name`                   | name for the Octopus deployment target        |
| `-azureWebApp`            | Name of the Azure Web App                     |
| `-azureWebAppSlot`        | Name of the Azure Web App Slot                |
| `-azureResourceGroupName` | Name of the Azure Resource Group              |
| `-octopusAccountIdOrName` | Name or Id of the Account Resource in Octopus |
| `-octopusRoles`           | Comma separated list of Roles to assign       |
| `-updateIfExisting`           | Will update an existing Web App target with the same name, create if it doesn't exist |

Example:
```powershell
New-OctopusAzureWebAppTarget -name "My Azure Web Application" `
                             -azureWebApp "WebApp1" `
                             -azureResourceGroupName "WebApp1-ResourceGroup"  `
                             -octopusAccountIdOrName "Dev Azure Account" `
                             -octopusRoles "AzureWebApp" `
                             -updateIfExisting
```

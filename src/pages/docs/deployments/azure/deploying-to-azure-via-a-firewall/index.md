---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Deploying to Azure via a firewall
description: Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.
navOrder: 29
---

All the Azure steps in Octopus are executed from the VM where the Octopus Server is running. So to able to successfully deploy to the Microsoft cloud, you need to make sure your Octopus Server can reach it through the network.

To check you can reach Microsoft cloud through your network, run this script on the same machine using an account with the same permissions as your Octopus Server.

:::info

You might need to install Azure Powershell before running this script. For information, see [Install the Azure PowerShell module](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-2.5.0).

:::


```
$ErrorActionPreference = "Stop"

$OctopusAzureADTenantId = #Enter TenantId here
$OctopusAzureSubscriptionId = #Enter SubscriptionId here
$OctopusAzureADClientId = #Enter ClientId here
$OctopusAzureADPassword = #Enter Secret here
$OctopusAzureEnvironment = "AzureCloud"

$securePassword = ConvertTo-SecureString $OctopusAzureADPassword -AsPlainText -Force
$creds = New-Object System.Management.Automation.PSCredential ($OctopusAzureADClientId, $securePassword)
$AzureEnvironment = Get-AzEnvironment -Name $OctopusAzureEnvironment

Connect-AzAccount -Credential $creds -TenantId $OctopusAzureADTenantId -SubscriptionId $OctopusAzureSubscriptionId -Environment $AzureEnvironment -ServicePrincipal

Get-AzResourceGroup
```

If everything is working as expected, you will see output showing all the Azure Resource Groups you have access to:

![Screenshot of Azure Resource Groups](/docs/deployments/azure/deploying-to-azure-via-a-firewall/image.png "width=500")

If you need to add firewall exclusions to an allow list, here are a few things to take into consideration:

- Figure out which Azure Data Centers you will be targeting.
- Figure out which Azure services you will be targeting in those Data Centers.
- Configure an allow list from the Octopus Server to the appropriate IP Address Ranges.

Download the latest list of IP Address Ranges from the [Microsoft Download Center](https://www.microsoft.com/download/details.aspx?id=56519) (updated weekly).

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).

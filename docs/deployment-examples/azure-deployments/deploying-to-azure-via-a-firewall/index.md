---
title: Deploying to Azure via a Firewall
description: Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Azure.
position: 29
---

All the Azure steps in Octopus are executed from the VM where the Octopus Server is running. So to able to successfully deploy to the Microsoft cloud, you need to make sure your Octopus Server can reach it through the network.

To check if you are able to reach Microsoft cloud through your network, try running this script on the same machine and using an account with the same permissions as your Octopus Server.

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

You should see output showing all the Azure Resource Groups you have access to:

![Screenshot of Azure Resource Groups](img.png)

If you need to add firewall exclusions to a whitelist, here are a few things to take into consideration:

- Figure out which Azure Data Centers you will be targeting.
- Figure out which Azure services you will be targeting in those Data Centers.
- Configure a whitelist from the Octopus Server to the appropriate IP Address Ranges.

Download the latest list of IP Address Ranges from the [Microsoft Download Center](https://www.microsoft.com/download/details.aspx?id=41653) (updated weekly).

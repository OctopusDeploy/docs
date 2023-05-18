---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Azure account variables
description: Create an Azure account variable to use it in Azure deployment steps
navOrder: 70
---

[Azure accounts](/docs/infrastructure/accounts/azure/) can be referenced in a project through a project [variable](/docs/projects/variables) of the type **Azure account**.

The [Azure PowerShell](/docs/deployments/azure/running-azure-powershell) step will allow you to bind the account to an **Azure account** variable, using the [binding syntax](/docs/projects/variables/#Bindingsyntax-Referencingvariablesinstepdefinitions). By using an variable for the account, you can have different accounts used across different environments or regions using [scoping](/docs/projects/variables/#Bindingsyntax-Referencingvariablesinstepdefinitions).

:::figure
![AWS Account variable](/docs/projects/variables/images/azure-account-variable.png "width=500")
:::

The **Add Variable** window is then displayed and lists all the Azure accounts.

Select the account that was created in the previous step to assign it to the variable.

:::figure
![Azure account variable selection](/docs/projects/variables/images/azure-account-variable-selection.png "width=500")
:::

## Azure account variable properties

The Azure account Variable also exposes the following properties that you can reference in a PowerShell script:

### Service Principal

| Name and description | Example |
| -------------------- | ------------------------|
| **`SubscriptionNumber`** <br/> The Azure Subscription Id | cd21dc34-73dc-4c7d-bd86-041284e0bc45 |
| **`Client`** <br/> The Azure Application Id | 57dfa713-f4c1-4b15-b21d-d14ff7941f7c |
| **`Password`** <br/> | correct horse battery staple |
| **`TenantId`** <br/> The Azure Active Directory Tenant Id | 2a681dca-3230-4e01-abcb-b1fd225c0982 |
| **`AzureEnvironment`** <br/> The Azure environment | AzureCloud, AzureGermanCloud, AzureChinaCloud, AzureUSGovernment |
| **`ResourceManagementEndpointBaseUri`** <br/> Only set if explicitly set in the Account settings | https://management.microsoftazure.de/  |
| **`ActiveDirectoryEndpointBaseUri`** <br/> Only set if explicitly set in the Account settings | https://login.microsoftonline.de/ |

### Management certificate

| Name and description | Example|
| -------------------- | ------------------------|
| **`SubscriptionNumber`** <br/> The Azure Subscription Id | cd21dc34-73dc-4c7d-bd86-041284e0bc45 |
| **`CertificateThumbprint`** <br/> The thumbprint of the certificate | |
| **`ServiceManagementEndpointBaseUri`** <br/> | https://management.core.cloudapi.de |
| **`ServiceManagementEndpointSuffix`** <br/> | core.cloudapi.de  |
| **`AzureEnvironment`** <br/> The Azure environment | AzureCloud, AzureGermanCloud, AzureChinaCloud, AzureUSGovernment |

### Accessing the properties in a script

Each of the above properties can be referenced in any of the supported scripting languages such as PowerShell and Bash.

```powershell PowerShell
# For an account with a variable name of 'azure account'

# Using $OctopusParameters
Write-Host 'AzureAccount.Id=' $OctopusParameters["azure account"]
Write-Host 'AzureAccount.Client=' $OctopusParameters["azure account.Client"]

# Directly as a variable
Write-Host 'AzureAccount.Id=' $azureAccount
Write-Host 'AzureAccount.Client=' $azureaccountClient
```
```bash Bash
# For an account with a variable name of 'azure account'

id=$(get_octopusvariable "azure account")
client=$(get_octopusvariable "azure account.Client")
echo "Azure Account Id is: $id"
echo "Azure Account Client is: $client"
```

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
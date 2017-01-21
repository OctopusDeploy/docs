---
title: Creating an Azure Service Principal Account

---


:::hint
**Azure Service Principal Accounts work with the Azure Resource Management (ARM) API only**
**Azure Service Principal Accounts are only available from Octopus Deploy version 3.3 onwards.**


Prior to Octopus Deploy 3.3, [Azure Management Certificate Accounts](/docs/key-concepts/environments/accounts/azure-subscription-account.md) (previously known simply as "Azure Subscription Accounts") were the only type of Azure Account available.


[Azure Management Certificate Accounts](/docs/guides/azure-deployments/creating-an-azure-account/creating-an-azure-management-certificate-account.md) are only able to interact with the legacy Azure interface known as the "Azure Service Management API", which is used when Octopus deploys [Cloud Services](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-cloud-service.md) and [Azure Web Apps](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app.md).


To interact with Azure Resource Manager (ARM), like when Octopus deploys a [Resource Group Template](/docs/guides/azure-deployments/resource-groups/deploy-using-an-azure-resource-group-template.md), you must use an [Azure Service Principal Account](/docs/guides/azure-deployments/creating-an-azure-account/creating-an-azure-service-principal-account.md).
:::


There are two steps to enable your Octopus Server to manage your Azure subscription via a Service Principal:

1. [Create an Azure Active Directory application and service principal](/docs/guides/azure-deployments/creating-an-azure-account/creating-an-azure-service-principal-account.md) (via PowerShell or the Azure Portal)
2. [Allow Octopus to authenticate with Azure using a Service Principal](/docs/guides/azure-deployments/creating-an-azure-account/creating-an-azure-service-principal-account.md)


## Step 1: Create an Azure Active Directory application and service principal


The first step is to create an Azure Active Directory (AAD) application and service principal. You will configure your Octopus Server to authenticate using the service principal you create in AAD, which means you can configure finely grained authorization for your Octopus Server. Creating an Azure Active Directory application and service principal can be done either via PowerShell or the Azure Portal.

### Option 1: Use PowerShell


You can use the PowerShell script below to create the Service Principal.

:::hint
This script requires [Azure PowerShell](https://azure.microsoft.com/en-us/documentation/articles/powershell-install-configure/) 1.0 or greater.


During the script, you will be prompted to authenticate with Azure. The authenticated user must have administrator permissions in the Active Directory in which the Service Principal is being created.
:::

```powershell
# Obviously, replace the following with your own values
$subscriptionId = "cd21dc34-73dc-4c7d-bd86-041284e0bc45"
$tenantId = "2a681dca-3230-4e01-abcb-b1fd225c0982"
$password = "correct horse battery staple"

# Login to your Azure Subscription
Login-AzureRMAccount
Set-AzureRMContext -SubscriptionId $subscriptionId -TenantId $tenantId

# Create an Octopus Deploy application in Active Directory
Write-Output "Creating AAD application..."
$azureAdApplication = New-AzureRmADApplication -DisplayName "Octopus Deploy" -HomePage "http://octopus.com" -IdentifierUris "http://octopus.com" -Password $password
$azureAdApplication | Format-Table

# Create the Service Principal
Write-Output "Creating AAD service principal..."
$servicePrincipal = New-AzureRmADServicePrincipal -ApplicationId $azureAdApplication.ApplicationId
$servicePrincipal | Format-Table

# Sleep, to ensure the Service Principal is actually created
Write-Output "Sleeping for 10s to give the service principal a chance to finish creating..."
Start-Sleep -s 10
 
# Assign the Service Principal the Contributor role to the subscription.
# Roles can be granted at the Resource Group level if desired.
Write-Output "Assigning the Contributor role to the service principal..."
New-AzureRmRoleAssignment -RoleDefinitionName Contributor -ServicePrincipalName $azureAdApplication.ApplicationId

# The Application ID (aka Client ID) will be required when creating the Account in Octopus Deploy
Write-Output "Client ID: $($azureAdApplication.ApplicationId)"
```





The values required for the script above are:


**Subscription ID**: The ID of the Azure subscription the account will interact with.


**Password**: A secret value created by you. Ensure you record it, as you will need to enter it into Octopus Deploy.


**Tenant ID**: The ID of the Active Directory tenant.  You can get this value from the old Azure portal.  If you navigate to the Active Directory tab, and inspect the URL of the link to the directory you will be using, the Tenant ID will be the final portal portion.


e.g. https://manage.windowsazure.com/@papasmurf.smurfs.com#Workspaces/ActiveDirectoryExtension/Directory/**b88c0ac7-dade-3842-8a4f-3bc5db3ee8ca**





![](/docs/images/3702850/3964967.png)

### Option 2: Use the Azure Portal


Alternatively, you can [create a Service Principal via the Azure Portal](https://azure.microsoft.com/en-us/documentation/articles/resource-group-create-service-principal-portal/).

## Step 2: Allow Octopus to authenticate with Azure using a Service Principal


Navigate to *Environments -> Accounts* and click *Add account* in the *Azure Subscriptions* section.


![](/docs/images/3702850/3964965.png)





On the Create New Account page, in the *Authentication Method* field select *Use a Service Principal*.


![](/docs/images/3702850/3964966.png)





The values for the following fields come from Azure:


**Subscription ID**:  The ID of the Azure Subscription this account will interact with.


**Client ID**:  This is the ID of the application in Azure Active Directory.  It is known as ApplicationID in the PowerShell API, but Client ID in the Azure Portal.


**Tenant ID**: The ID of the Active Directory tenant.  The *Creating a Service Principal via PowerShell* section above shows how the Tenant ID can be obtained.





Use the *Save and test* button to confirm the account can interact with Azure.

:::hint
**What is actually tested?**
When you click the Save and Test button, Octopus will attempt to use the account credentials to access the Azure Resource Management (ARM) API and list the Resource Groups in that subscription. You may need to whitelist the appropriate IP Addresses for the Azure Data Centre you are targeting. See [deploying to Azure via a Firewall](/docs/deploying-applications/deploying-to-azure.md) for more details.
:::

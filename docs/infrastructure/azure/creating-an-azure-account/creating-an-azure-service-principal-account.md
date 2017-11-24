---
title: Creating an Azure Service Principal Account
description: Creating an Azure Service Principal Account in Octopus Deploy.
---

:::hint
**Azure Service Principal Accounts work with the Azure Resource Management (ARM) API only**
**Azure Service Principal Accounts are only available from Octopus Deploy version 3.3 onwards.**

Prior to Octopus Deploy 3.3, [Azure Management Certificate Accounts](/docs/infrastructure/azure/index.md) (previously known simply as "Azure Subscription Accounts") were the only type of Azure Account available.

[Azure Management Certificate Accounts](/docs/guides/azure-deployments/creating-an-azure-account/creating-an-azure-management-certificate-account.md) are only able to interact with the legacy Azure interface known as the "Azure Service Management API", which is used when Octopus deploys [Cloud Services](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-cloud-service/index.md) and [Azure Web Apps](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/index.md).

To interact with Azure Resource Manager (ARM), like when Octopus deploys a [Resource Group Template](/docs/guides/azure-deployments/resource-groups/index.md), you must use an [Azure Service Principal Account](/docs/guides/azure-deployments/creating-an-azure-account/creating-an-azure-service-principal-account.md).
:::

There are two steps to enable your Octopus Server to manage your Azure subscription via a Service Principal:

1. Create an Azure Active Directory application and service principal (via PowerShell or the Azure Portal)
2. Allow Octopus to authenticate with Azure using a Service Principal

## Step 1: Create an Azure Active Directory application and service principal {#CreatinganAzureServicePrincipalAccount-create-service-principalStep1:CreateanAzureActiveDirectoryapplicationandserviceprincipal}

The first step is to create an Azure Active Directory (AAD) application and service principal. You will configure your Octopus Server to authenticate using the service principal you create in AAD, which means you can configure finely grained authorization for your Octopus Server. Creating an Azure Active Directory application and service principal can be done either via PowerShell or the Azure Portal.

### Option 1: Use PowerShell {#CreatinganAzureServicePrincipalAccount-Option1:UsePowerShell}

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

# Create an Octopus Deploy Application in Active Directory
Write-Output "Creating AAD application..."
$azureAdApplication = New-AzureRmADApplication -DisplayName "Octopus Deploy" -HomePage "http://octopus.com" -IdentifierUris "http://octopus.com" -Password $password
$azureAdApplication | Format-Table

# Create the Service Principal
Write-Output "Creating AAD service principal..."
$servicePrincipal = New-AzureRmADServicePrincipal -ApplicationId $azureAdApplication.ApplicationId
$servicePrincipal | Format-Table

# Sleep, to Ensure the Service Principal is Actually Created
Write-Output "Sleeping for 10s to give the service principal a chance to finish creating..."
Start-Sleep -s 10
 
# Assign the Service Principal the Contributor Role to the Subscription.
# Roles can be Granted at the Resource Group Level if Desired.
Write-Output "Assigning the Contributor role to the service principal..."
New-AzureRmRoleAssignment -RoleDefinitionName Contributor -ServicePrincipalName $azureAdApplication.ApplicationId

# The Application ID (aka Client ID) will be Required When Creating the Account in Octopus Deploy
Write-Output "Client ID: $($azureAdApplication.ApplicationId)"
```

The values required for the script above are:

**Subscription ID**: The ID of the Azure subscription the account will interact with.

**Password**: A secret value created by you. Ensure you record it, as you will need to enter it into Octopus Deploy.

**Tenant ID**: The ID of the Active Directory tenant.  You can find this in the *Properties* blade of the *Azure Active Directory*, listed as 'Directory ID'.

### Option 2: Use the Azure Portal {#CreatinganAzureServicePrincipalAccount-Option2:UsetheAzurePortal}

Alternatively, you can [create a Service Principal via the Azure Portal](https://azure.microsoft.com/en-us/documentation/articles/resource-group-create-service-principal-portal/).

:::hint
Note on roles: Your Service Principal will need to be assigned the *Contributor* role in order to deploy.
:::

:::warning
The Service Principal will default to expiring in 1 year from the time of creation.

Using the PowerShell script in option 1, you can specify the expiry date by adding the *-EndDate* parameter to the *New-AzureRmADApplication* command

```powershell
-EndDate (new-object System.DateTime 2018, 12, 31)
```

Using option 2, the Azure portal will allow you to select the expiry time when creating the key. 
:::

## Step 2: Allow Octopus to Authenticate with Azure using a Service Principal {#CreatinganAzureServicePrincipalAccount-authenticate-with-service-principalStep2:AllowOctopustoauthenticatewithAzureusingaServicePrincipal}

!partial <add>

## Creating a New Service Principal Credential {#CreatingAnAzureServicePrincipalCredential}

If you need to create a new **Service Principal Credential**, this can also be done either via PowerShell or the Azure Portal.

### Step 1: Creating a New AAD Service Principal Credential

#### Option 1: Use PowerShell {#CreatinganAzureServicePrincipalCredential-Option1:UsePowerShell}
The following PowerShell script will create an additional credential under the existing AAD application


```powershell
# Obviously, replace the following with your own values
$subscriptionId = "cd21dc34-73dc-4c7d-bd86-041284e0bc45"
$tenantId = "2a681dca-3230-4e01-abcb-b1fd225c0982"
$applicationId = "1d7f3207-0d20-4ff3-bdd2-c6928a5dd3f0" 
$password = "correct horse battery staple 2"

# Login to your Azure Subscription
Login-AzureRMAccount
Set-AzureRMContext -SubscriptionId $subscriptionId -TenantId $tenantId

# Get the Azure AD Appliction
Write-Output "Getting the Azure AD Application"
$azureAdApp = Get-AzureRmADApplication -ApplicationId $applicationId
$azureAdApp | Format-Table

Write-Output "Getting the Azure AD Service Principal"
$azureAdServicePrincpal = Get-AzureRmADServicePrincipal -SearchString $azureAdApp.DisplayName
$azureAdServicePrincpal | Format-Table

Write-Output "Creating a new Service Principal Credential"
$servicePrincipalCred = New-AzureRmADSPCredential -ObjectId $azureAdServicePrincipal.Id -EndDate (New-Object System.DateTime 2019,1,31) -Password $password
$servicePrincipalCred | Format-Table

```
#### Option 2: Use the Azure Portal {#CreatinganAzureServicePrincipalCredential-Option2:UsetheAzurePortal}

For the Azure Portal steps, create a new Key using the directions [here](https://azure.microsoft.com/en-us/documentation/articles/resource-group-create-service-principal-portal/).

### Step 2: Updating the Password/Key in the Octopus Azure Subscriptions

Navigate to {{Environments,Accounts}} and click on the account you wish to update in the *Azure Subscriptions* section.

Use the **Change** button to modify the password or key and enter the password or key from Step 1.


![Edit password](sp-password.png "width=500")

Use the *Save and test* button to confirm the account can interact with Azure.
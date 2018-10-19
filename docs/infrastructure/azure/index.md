---
title: Azure
description: Configure your infrastructure so Octopus can deploy software to your Windows servers, Linux servers, or Cloud Regions.
position: 50
---

You can deploy software to the Azure cloud by adding you Azure subscription to Octopus. With an active Azure subscription, you can use Octopus to deploy to Azure Cloud Service targets, Azure Service Fabric targets, and Azure Web App targets.

Before you can deploy software to Azure, you need to add your Azure subscription to Octopus Deploy. Read the following sections to learn more about using Azure with Octopus.

- [Creating an Azure Service Principal Account](#azure-service-principal)
- [Creating an Azure Management Certificate Account](#azure-management-certificate)
- [Azure Account Variables](#azure-account-variables)
- [Azure Targets](#azure-targets)

## Azure Account Authentication Method {#CreatinganAzureAccount-AuthenticationMethod}

When you add an Azure account to Octopus, there are two ways to authenticate with Azure in Octopus. These represent the different interfaces in Azure, and the interface you need will dictate which authentication method you use.

- [Service Principal](#azure-service-principal) (default) is used with resource manager mode (ARM).
- [Management Certificate](#azure-management-certificate) is used with service management mode (ASM)

You can read about the differences in [this document](https://azure.microsoft.com/en-us/documentation/articles/resource-manager-deployment-model/).

## Creating an Azure Service Principal Account {#azure-service-principal}

Azure Service Principal accounts are for use with the **Azure Resource Management (ARM) API** only. Configuring your Octopus Server to authenticate with the service principal you create in Azure Active Directory will let you configure finely grained authorization for your Octopus Server.

1. Create an Azure Active Directory registered application (or application registration) and service principal (via the [Azure Portal](#create-service-principal-account-in-azure) or with [PowerShell](#create-service-principal-account-with-powershell)).
2. Allow Octopus to authenticate with Azure using a Service Principal.

### Create an Azure Active Directory Application and Service Principal With the Azure Portal {#create-service-principal-account-in-azure}

1. In the Azure Portal, navigate to {{Azure Active Directory,Properties}} and copy the value from the **Directory ID** field, this is your **Tenant ID**.
1. Next you need your **Application ID**.
  - If you have created an AAD registered application, navigate to {{Azure Active Directory,App Registrations}}, click **View all applications**, select the app and copy the **Application ID**.
  - If you haven't created a registered app, Click **New application registration** and add the details for your app, and click **Save**. Make note of the **Application ID**.
1. Generate a one-time password by navigating to {{Settings,Keys}}. Add a new password, enter a description, and click **Save**. Make note of the displayed application password for use in Octopus. If you don't want to accept the default one year expiry for the key, you can change the expiry date.

You now have the following:

- **Tenant ID**
- **Application ID**
- **Application Password/Key**

Next, you need to configure your [resource permissions](#resource-permissions).

### Create an Azure Active Directory Application and Service Principal With PowerShell {#create-service-principal-account-with-powershell}

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
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$azureAdApplication = New-AzureRmADApplication -DisplayName "Octopus Deploy" -HomePage "http://octopus.com" -IdentifierUris "http://octopus.com" -Password $securePassword
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

**Password**: A secret value created by you. Make sure you record it, as you will need to enter it into Octopus Deploy.

**Tenant ID**: The ID of the Active Directory tenant. You can find this in the Azure Portal by navigating to {{Azure Active Directory,Properties}} in the **Directory ID** field.

The Service Principal will default to expiring in 1 year from the time of creation.

You can specify the expiry date by adding the *-EndDate* parameter to the *New-AzureRmADApplication* command:

```powershell
-EndDate (new-object System.DateTime 2018, 12, 31)
```

Now, you can [add the Service Principal Account in Octopus](#add-service-principal-account).

## Resource Permissions {#resource-permissions}

The final step is to ensure your registered app has permission to work with your Azure resources.

1. In the Azure Portal navigate to **Resource groups** and select the resource group(s) that you want the registered app to access.
1. Next, select the **Access Control (IAM)** option and if your app isn't listed, click **Add**. Select the appropriate role (**Contributor** is a common option) and search for your new application name. Select it from the search results and then click **Save**.

Now, you can [add the Service Principal Account in Octopus](#add-service-principal-account).

:::hint
Note on roles: Your Service Principal will need to be assigned the *Contributor* role in order to deploy.
:::

### Note on Least Privilege {#note_on_lease_privilege}

In the PowerShell and Permissions example above the service principal is assigned the **Contributor** role on the subscription. This isn't always the best idea, you might want to apply a principle of least privilege to the access the service principal is granted. If that's the case, there are a couple of things worth noting.

Firstly, you might want to constrain the service principal to a single resource group, in which case, you just need to assign it the **Contributor** role on the resource group.

Next, if you might want to get even more granular you can constrain the service principal to a single resource, e.g. a Web App. _In this case, you have to assign the **Contributor** role on the Web App and explicitly assign the **Reader** role on the subscription itself_.

The reason behind this has to do with the way Octopus queries for the web app resources in Azure. In order to handle scenarios where [ASEs](/docs/deployment-examples/azure-deployments/ase/index.md#resource_groups) are being used, Octopus first queries the resource groups and then queries for the web apps within each resource group. When the service principal is assigned **Contributor** on a resource group it seems to implicitly get **Reader** on the subscription, but this doesn't seem to be the case when **Contributor** is assigned directly to a web app, so you have to assign **Reader** explicitly.

## Add the Service Principal Account in Octopus {#add-service-principal-account}

Now that you have the following values, you can add your account to Octopus:

- Application ID
- Tenant ID
- Application Password/Key

1. Navigate to {{Infrastructure,Account}}.
1. Select {{ADD ACCOUNT,Azure Subscriptions}}.
1. Give the account the name you want it to be known by in Octopus.
1. Give the account a description.
1. Add your Azure Subscription ID. This is found in the Azure portal under **Subscriptions**.
1. Add the **Application ID**, the **Tenant ID**, and the **Application Password/Keyword**.

Click **SAVE AND TEST** to confirm the account can interact with Azure. Octopus will then attempt to use the account credentials to access the Azure Resource Management (ARM) API and list the Resource Groups in that subscription. You may need to whitelist the IP Addresses for the Azure Data Center you are targeting. See [deploying to Azure via a Firewall](/docs/deployment-examples/azure-deployments/index.md) for more details.

## Creating a New Service Principal Credential

If you need to create a new **Service Principal Credential** this can be done either with [PowerShell](#new-add-service-principal-credential-with-powershell) or the [Azure Portal](#new-add-service-principal-credential-azure-portal).

### Step 1: Creating a New AAD Service Principal Credential

#### Using PowerShell {#new-add-service-principal-credential-with-powershell}

The following PowerShell script will create an additional credential under the existing AAD application:

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
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$servicePrincipalCred = New-AzureRmADSPCredential -ObjectId $azureAdServicePrincipal.Id -EndDate (New-Object System.DateTime 2019,1,31) -Password $securePassword
$servicePrincipalCred | Format-Table

```
#### Using the Azure Portal {#new-add-service-principal-credential-azure-portal}

For the Azure Portal steps, create a new Key using the directions [here](https://azure.microsoft.com/en-us/documentation/articles/resource-group-create-service-principal-portal/).

### Step 2: Updating the Password/Key in the Octopus Azure Subscriptions

Navigate to {{Environments,Accounts}} and click on the account you wish to update in the **Azure Subscriptions** section.

Use the **Change** button to modify the password or key and enter the password or key from Step 1.

Click **Save and test** to confirm the account can interact with Azure.


## Creating an Azure Management Certificate Account {#azure-management-certificate}

Azure Management Certificate Accounts work with the **Azure Service Management API** only, which is used to when Octopus deploys [Cloud Services](/docs/deployment-examples/azure-deployments/deploying-a-package-to-an-azure-cloud-service/index.md) and [Azure Web Apps](/docs/deployment-examples/azure-deployments/deploying-a-package-to-an-azure-web-app/index.md).

To create an Azure Management Certificate account as part of adding an [Azure subscription](#adding-azure-subscription), select Management Certificate as the Authentication Method.

### Step 1: Management Certificate {#CreatinganAzureManagementCertificateAccount-Step2:ManagementCertificate}

When using **Management Certificate**, Octopus authenticates with Azure using an X.509 certificate.  You can either upload an existing certificate (`.pfx`), or leave the field blank and Octopus will generate a certificate. Keep in mind that since Octopus securely stores the certificate internally, there is no need to upload a password protected `.pfx` file. If you would like to use one that is password protected, you will need to first remove the password. This can be done with the following commands.

**Remove .pfx password**

```powershell
openssl pkcs12 -in AzureCert.pfx -password pass:MySecret -nodes -out temp.pem
openssl pkcs12 -export -in temp.pem -passout pass -out PasswordFreeAzureCert.pfx
del temp.pem
```

If Octopus generates your certificate, you need to upload the certificate to the Azure Management Portal.  After clicking **Save**, the Account settings page provides instructions for downloading the certificate public-key from Octopus and uploading it into the Azure Management Portal.

Uploaded certificates can be viewed on the 'Management Certificates' tab of the 'Settings' page in the Azure Portal.

The certificate will be named **Octopus Deploy -``{Your Account Name}**.

### Step 2: Save and Test {#CreatinganAzureManagementCertificateAccount-Step3:SaveandTest}

Click **Save and Test**, and Octopus will attempt to use the account credentials to access the Azure Service Management (ASM) API and list the Hosted Services in that subscription. You may need to whitelist the appropriate IP Addresses for the Azure Data Center you are targeting. See [deploying to Azure via a Firewall](/docs/deployment-examples/azure-deployments/index.md) for more details.

You can now configure Octopus to deploy to Azure via the Azure Service Management (ASM) API.

## Azure Account Variables {#azure-account-variables}

You can access your Azure account from within projects through a variable of type **Azure Account**. Learn more about [Azure Account Variables](/docs/deployment-process/variables/azure-account-variables.md) and [Azure Deployments](/docs/deployment-examples/azure-deployments/index.md).

## Azure Targets {#azure-targets}

The Azure target types were added in **Octopus 2018.5**.

Octopus models your platform-as-a-service endpoints as deployment targets. Read more PaaS targets [blog: PaaS Deployment Targets](https://octopusdeploy.com/blog/paas-targets).

Octopus's Azure targets provide a reference to actual targets in your Azure infrastructure, allowing you to target several PaaS products by role during a deployment. Azure targets are added the same way as regular deployment targets and go through health checks, so you know the status of your Azure infrastructure targets and can spot any problems.

The currently supported Azure targets are:

- [Azure Web Apps](/web-app-targets/index.md) (also works for Azure Functions).
- [Azure Service Fabric Clusters](/service-fabric-cluster-targets/index.md).
- [Azure Cloud Services](/cloud-service-targets/index.md).

:::warning
Regarding Azure Cloud Services, Azure has [announced](https://blogs.msdn.microsoft.com/appserviceteam/2018/03/12/deprecating-service-management-apis-support-for-azure-app-services/) that from June 30th 2018 they are retiring support for Service Management API (which indicates Cloud Services). Azure has stated that _"Cloud Services is similar to Service Fabric in degree of control versus ease of use, but it’s now a legacy service and Service Fabric is recommended for new development"_ ([source](https://docs.microsoft.com/en-us/azure/app-service/choose-web-site-cloud-service-vm)).
:::

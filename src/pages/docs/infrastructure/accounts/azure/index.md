---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Azure
description: Configure your infrastructure so Octopus can deploy software to your Windows servers, Linux servers, or cloud regions.
navOrder: 10
---

You can deploy software to the Azure cloud by adding your Azure subscription to Octopus. With an active Azure subscription, you can use Octopus to deploy to [Azure Cloud Service](/docs/infrastructure/deployment-targets/azure/cloud-service-targets/) targets, [Azure Service Fabric](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets/) targets, and [Azure Web App](/docs/infrastructure/deployment-targets/azure/web-app-targets) targets.

Before you can deploy software to Azure, you need to add your Azure subscription to Octopus Deploy.

## Azure account authentication method {#CreatingAnAzureAccount-AuthenticationMethod}

When you add an Azure account to Octopus, there are two ways to authenticate with Azure in Octopus. These represent the different interfaces in Azure, and the interface you need will dictate which authentication method you use.

- [Service Principal](#azure-service-principal) (default) is used with resource manager mode (ARM), along with the `az` command line interface.
- [Management certificate](#azure-management-certificate) is used with service management mode (ASM) or legacy mode.

You can read about the differences in [this document](https://azure.microsoft.com/en-us/documentation/articles/resource-manager-deployment-model/).

Azure Service Principal accounts are for use with the **Azure Resource Management (ARM) API** only. Configuring your Octopus Server to authenticate with the service principal you create in Azure Active Directory will let you configure finely grained authorization for your Octopus Server.

:::div{.warning}
Management Certificates are used to authenticate with Service Management APIs, those are being deprecated by Microsoft.  See our [blog post](https://octopus.com/blog/azure-management-certs) for more details.  Instructions remain only for legacy purposes.  Please migrate to service principals as soon as possible.
:::

## Creating an Azure Service Principal account {#azure-service-principal}

Before creating an Octopus Azure Service Principal account, you will need an Azure App Registration. If you do not currently have an Azure App Registration follow the [App Registration](https://oc.to/create-azure-app-registration) guide, or create it with a [script](#create-app-registration-via-script).

After creating the App Registration, make a note of the following:

- **Subscription ID**
- **Tenant ID**
- **Application ID**

There are two supported types of credentials to allow your Octopus instance to authenticate with an Azure Service Principal: Client Secrets and Federated Credentials.

### Create a client secret credential for an Azure Service Principal

To manually create a client secret follow the [Add a client secret](https://oc.to/create-azure-credentials) section in the Azure AD documentation, or create it with a [script](#create-a-client-secret-via-script).

Following this process you will be given the client secret, make a note of this as you cannot retrieve it afterward.

Next, you need to configure your [resource permissions](#resource-permissions).

### Create a federated credential for an Azure Service Principal

#### Octopus Server configuration  
:::div{.info}
If you are using Octopus Cloud, you will not need to do anything to expose the instance to the public internet, this is already configured for you.
:::

To use federated credentials, your Octopus instance will need to have two anonymous URLs exposed to the public internet. 

- `https://server-host/.well-known/openid-configuration`
- `https://server-host/.well-known/jwks`

These must be exposed with anonymous access on HTTPS. Without this, the OpenID Connect protocol will not be able to complete the authentication flow.

The hostname of the URL that these two endpoints are available on must either be configured under **Configuration->Nodes->Server Uri** or set as the first ListenPrefix in the server configuration. 

#### Azure Service Principal configuration 

To manually create a Federated Credential follow the [Add a federated credential](https://oc.to/create-azure-credentials) section in the Azure AD documentation, or create it with a [script](#create-federated-credential-via-script).

The federated credential will need the **Issuer** value set to the publicly accessible Octopus Server URI configured in the previous step, this value must also not have a trailing slash (/), for example `https://samples.octopus.app`.

Please read [OpenID Connect Subject Identifier](/docs/infrastructure/accounts/openid-connect) on how to customize the **Subject** value.

The **Audience** value can be left at the default, or set to a custom value if needed.

#### Azure Tool support for OpenID Connect

To support OpenID Connect authentication, you will need to ensure it is supported in the versions of the tooling:

- az CLI requires 2.30+
- az PowerShell modules requires 7.0+
- azurerm terraform provider required 3.22+ 

## Resource permissions {#resource-permissions}

The final step is to ensure your registered app has permission to work with your Azure resources.

1. In the Azure Portal navigate to **Resource groups** and select the resource group(s) that you want the registered app to access.
1. Next, select the **Access Control (IAM)** option and if your app isn't listed, click **Add**. Select the appropriate role (**Contributor** is a common option) and search for your new application name. Select it from the search results and then click **Save**.

Now, you can [add the Service Principal Account in Octopus](#add-service-principal-account).

:::div{.hint}
Note on roles: Your Service Principal will need to be assigned the *Contributor* role in order to deploy.

It will also need the *Reader* role on the subscription itself.
:::

### Note on least privilege {#note_on_least_privilege}

In the PowerShell and Permissions example above the service principal is assigned the **Contributor** role on the subscription. This isn't always the best idea, you might want to apply a principle of least privilege to the access the service principal is granted. If that's the case, there are a couple of things worth noting.

Firstly, you might want to constrain the service principal to a single resource group, in which case, you just need to assign it the **Contributor** role on the resource group.

Next, if you want to get even more granular you can constrain the service principal to a single resource, e.g. a Web App. _In this case, you have to assign the **Contributor** role on the Web App and explicitly assign the **Reader** role on the subscription itself_.

The reason behind this has to do with the way Octopus queries for the web app resources in Azure. In order to handle scenarios where [ASEs](/docs/deployments/azure/ase/#resource_groups) are being used, Octopus first queries the resource groups and then queries for the web apps within each resource group. When the service principal is assigned **Contributor** on a resource group it seems to implicitly get **Reader** on the subscription, but this doesn't seem to be the case when **Contributor** is assigned directly to a web app, so you have to assign **Reader** explicitly.

### Create an Azure App Registration via script {#create-app-registration-via-script}

This step shows you how to script the creation of an Azure Active Directory App Registration

:::div{.hint}
During the script, you will be prompted to authenticate with Azure. The authenticated user must have administrator permissions in the Active Directory in which the Service Principal is being created.
:::

<details data-group="infrastructure-accounts-azure">
<summary>Az CLI</summary>

```bash
# this script will create a new Azure AD App Registration

subscription='' # Replace with the name or id of your subscription
appName='' # Replace with your app registration name

az login
az account set --subscription $subscription
az ad app create --display-name "$appName" -o table --query "{Id:id,Name:displayName,ClientId:appId}"
az account show  --query "{Name:name,SubscriptionId:id,TenantId:tenantId}" -o table
```
</details>

<details data-group="infrastructure-accounts-azure">
<summary>Az PowerShell</summary>

```powershell
# this script will create a new Azure AD App Registration

$AzureTenantId = "2a681dca-3230-4e01-abcb-b1fd225c0982" # Replace with your Tenant Id
$AzureSubscriptionName = "YOUR SUBSCRIPTION NAME" # Replace with your subscription name
$AzureApplicationName = "YOUR APPLICATION NAME" # Replace with your application name

if (Get-Module -Name Az -ListAvailable)
{    
    Write-Host "Azure Az Module found."
}
else
{
    Write-Host "Azure Az Modules not found.  Installing the Azure Az PowerShell Modules.  You might be prompted that PSGallery is untrusted.  If you select Yes your screen might freeze for a second while the modules download process is started."
    Install-Module -Name Az -AllowClobber -Scope CurrentUser
}

Write-Host "Loading the Azure Az Module.  This may cause the screen to freeze while loading the module."
Import-Module -Name Az

Write-Host "Logging into Azure"
Connect-AzAccount -Tenant $AzureTenantId -Subscription $AzureSubscriptionName

$azureSubscription = Get-AzSubscription -SubscriptionName $AzureSubscriptionName
$ExistingApplication = Get-AzADApplication -DisplayName "$AzureApplicationName"

if ($null -eq $ExistingApplication)
{
    Write-Host "The Azure Active Directory Application does not exist, creating Azure Active Directory application"
    $azureAdApplication = New-AzADApplication -DisplayName "$AzureApplicationName"
    
    Write-Host "Azure App Registration successfully created"
    $AzureApplication = $azureAdApplication
}
else 
{
    Write-Host "The Azure service principal $AzureApplicationName already exists"        
    $AzureApplication = $ExistingApplication
}

Write-Host "Important information to know when registering this subscription with Octopus Deploy:"
Write-Host "    1) The Azure Tenant Id is: $AzureTenantId"
Write-Host "    2) The Azure Subscription Id: $($azureSubscription.SubscriptionId)"  
Write-Host "    3) The Azure Application Id: $(AzureApplication.AppId)"

```
</details>

### Create a Service Principal Client Secret with PowerShell {#create-a-client-secret-via-script}

This step shows you how to create a Service Principal Client Secret with the script below.

:::div{.hint}
During the script, you will be prompted to authenticate with Azure. The authenticated user must have administrator permissions in the Active Directory in which the Service Principal is being created.
:::


<details data-group="infrastructure-accounts-azure">
<summary>Az CLI</summary>

```bash
# This script will create a new client secret for you to use in Octopus Deploy using the Az CLI. 
subscription='' # Replace with the name or id of your subscription
appId='' # Replace id of your application registration
expiryYears=1

az login
az account set --subscription $subscription
az ad app credential reset --append --id $appId --years $expiryYears
```

<details data-group="infrastructure-accounts-azure">
<summary>Az PowerShell</summary>

```powershell
# This script will create a new client secret for you to use in Octopus Deploy using the Az PowerShell modules.  This will work with both PowerShell and PowerShell Core.

$AzureTenantId = "2a681dca-3230-4e01-abcb-b1fd225c0982" # Replace with your Tenant Id
$AzureSubscriptionName = "YOUR SUBSCRIPTION NAME" # Replace with your subscription name
$AzureApplicationName = "YOUR APPLICATION NAME" # Replace with your application name
$AzurePasswordEndDays = "365" # Update to change the expiration date of the password

if (Get-Module -Name Az -ListAvailable)
{    
    Write-Host "Azure Az Module found."
}
else
{
    Write-Host "Azure Az Modules not found.  Installing the Azure Az PowerShell Modules.  You might be prompted that PSGallery is untrusted.  If you select Yes your screen might freeze for a second while the modules download process is started."
    Install-Module -Name Az -AllowClobber -Scope CurrentUser
}

Write-Host "Loading the Azure Az Module.  This may cause the screen to freeze while loading the module."
Import-Module -Name Az

Write-Host "Logging into Azure"
Connect-AzAccount -Tenant $AzureTenantId -Subscription $AzureSubscriptionName

$endDate = (Get-Date).AddDays($AzurePasswordEndDays)

$azureSubscription = Get-AzSubscription -SubscriptionName $AzureSubscriptionName
$ExistingApplication = Get-AzADApplication -DisplayName "$AzureApplicationName"

if ($null -eq $ExistingApplication) {
    Write-host "Unable to find application with name '$AzureApplicationName'"
} else {
    Write-Host "The Azure service principal $AzureApplicationName already exists, creating a new password for Octopus Deploy to use."        
    $credential = New-Object Microsoft.Azure.PowerShell.Cmdlets.Resources.MSGraph.Models.ApiV10.MicrosoftGraphPasswordCredential
    $credential.EndDateTime = $endDate 
    $credential.DisplayName = "$AzureApplicationName"
    $newCredential = New-AzADAppCredential -PasswordCredentials @($credential) -ApplicationId $ExistingApplication.AppId 
    Write-Host "Azure Service Principal successfully password successfully created."

    Write-Host "Important information to know when registering this subscription with Octopus Deploy:"
    Write-Host "    1) The Azure Tenant Id is: $AzureTenantId"
    Write-Host "    2) The Azure Subscription Id: $($azureSubscription.SubscriptionId)"  
    Write-Host "    3) The Azure Application Id: $($ExistingApplication.AppId)"
    Write-Host "    4) The new password is: $($newCredential.SecretText) - this is the only time you'll see this password, please store it in a safe location."
}
```

</details>

- **Subscription ID**: The ID of the Azure subscription the account will interact with.
- **Password**: A secret value created by you. Make sure you record it, as you will need to enter it into Octopus Deploy.
- **Tenant ID**: The ID of the Active Directory tenant. You can find this in the Azure Portal by navigating to **Azure Active Directory ➜ Properties** in the **Tenant ID** field.

The Service Principal will default to expiring in 1 year from the time of creation.

You can specify the expiry date by adding the *-EndDate* parameter to the *New-AzureRmADApplication* command:

```powershell
-EndDate (new-object System.DateTime 2018, 12, 31)
```

Now, you can [add the Service Principal Account in Octopus](#add-service-principal-account). Consider reading our [note on least privilege first](#note_on_least_privilege).


### Create a Service Principal Client Secret with PowerShell {#create-a-client-secret-via-script}

This step shows you how to create a Service Principal Client Secret with the script below.

:::div{.hint}
During the script, you will be prompted to authenticate with Azure. The authenticated user must have administrator permissions in the Active Directory in which the Service Principal is being created.
:::


<details data-group="infrastructure-accounts-azure">
<summary>Az CLI</summary>

```bash
# This script will create a new federated credential for you to use in Octopus Deploy using the Az CLI. 
subscription='' # Replace with the name or id of your subscription
appId='' # Replace id of your application registration

credential='{
    "name": "Testing",
    "issuer": "https://oidc-client-test.testoctopus.app",
    "subject": "space:default:project:something",
    "description": "Testing",
    "audiences": [
        "api://AzureADTokenExchange"
    ]
}'

az login
az account set --subscription "$subscription"
az ad app federated-credential create --id $appId --parameters "$credential"
```

<details data-group="infrastructure-accounts-azure">
<summary>Az PowerShell</summary>

```powershell
# This script will create a new client secret for you to use in Octopus Deploy using the Az PowerShell modules.  This will work with both PowerShell and PowerShell Core.

$AzureTenantId = "2a681dca-3230-4e01-abcb-b1fd225c0982" # Replace with your Tenant Id
$AzureSubscriptionName = "YOUR SUBSCRIPTION NAME" # Replace with your subscription name
$AzureApplicationName = "YOUR APPLICATION NAME" # Replace with your application name
$AzurePasswordEndDays = "365" # Update to change the expiration date of the password

if (Get-Module -Name Az -ListAvailable)
{    
    Write-Host "Azure Az Module found."
}
else
{
    Write-Host "Azure Az Modules not found.  Installing the Azure Az PowerShell Modules.  You might be prompted that PSGallery is untrusted.  If you select Yes your screen might freeze for a second while the modules download process is started."
    Install-Module -Name Az -AllowClobber -Scope CurrentUser
}

Write-Host "Loading the Azure Az Module.  This may cause the screen to freeze while loading the module."
Import-Module -Name Az

Write-Host "Logging into Azure"
Connect-AzAccount -Tenant $AzureTenantId -Subscription $AzureSubscriptionName

$endDate = (Get-Date).AddDays($AzurePasswordEndDays)

$azureSubscription = Get-AzSubscription -SubscriptionName $AzureSubscriptionName
$ExistingApplication = Get-AzADApplication -DisplayName "$AzureApplicationName"

if ($null -eq $ExistingApplication) {
    Write-host "Unable to find application with name '$AzureApplicationName'"
} else {
    Write-Host "The Azure service principal $AzureApplicationName already exists, creating a new password for Octopus Deploy to use."        
    $credential = New-Object Microsoft.Azure.PowerShell.Cmdlets.Resources.MSGraph.Models.ApiV10.MicrosoftGraphPasswordCredential
    $credential.EndDateTime = $endDate 
    $credential.DisplayName = "$AzureApplicationName"
    $newCredential = New-AzADAppCredential -PasswordCredentials @($credential) -ApplicationId $ExistingApplication.AppId 
    Write-Host "Azure Service Principal successfully password successfully created."

    Write-Host "Important information to know when registering this subscription with Octopus Deploy:"
    Write-Host "    1) The Azure Tenant Id is: $AzureTenantId"
    Write-Host "    2) The Azure Subscription Id: $($azureSubscription.SubscriptionId)"  
    Write-Host "    3) The Azure Application Id: $($ExistingApplication.AppId)"
    Write-Host "    4) The new password is: $($newCredential.SecretText) - this is the only time you'll see this password, please store it in a safe location."
}
```

</details>

- **Subscription ID**: The ID of the Azure subscription the account will interact with.
- **Password**: A secret value created by you. Make sure you record it, as you will need to enter it into Octopus Deploy.
- **Tenant ID**: The ID of the Active Directory tenant. You can find this in the Azure Portal by navigating to **Azure Active Directory ➜ Properties** in the **Tenant ID** field.

The Service Principal will default to expiring in 1 year from the time of creation.

You can specify the expiry date by adding the *-EndDate* parameter to the *New-AzureRmADApplication* command:

```powershell
-EndDate (new-object System.DateTime 2018, 12, 31)
```

Now, you can [add the Service Principal Account in Octopus](#add-service-principal-account). Consider reading our [note on least privilege first](#note_on_least_privilege).




## Add the Service Principal account in Octopus {#add-service-principal-account}

Now that you have the following values, you can add your account to Octopus:

- Subscription ID
- Application ID
- Tenant ID
- Application Password/Key

1. Navigate to **Infrastructure ➜ Account**.
1. Select **ADD ACCOUNT ➜ Azure Subscriptions**.
1. Give the account the name you want it to be known by in Octopus.
1. Give the account a description.
1. Add your Azure Subscription ID. This is found in the Azure portal under **Subscriptions**.
1. Add the **Application ID**, the **Tenant ID**, and the **Application Password/Keyword**.

Click **SAVE AND TEST** to confirm the account can interact with Azure. Octopus will then attempt to use the account credentials to access the Azure Resource Management (ARM) API and list the Resource Groups in that subscription. You may need to include the appropriate IP Addresses for the Azure Data Center you are targeting in any firewall allow list. See [deploying to Azure via a Firewall](/docs/deployments/azure) for more details.

:::div{.hint}
A newly created Service Principal may take several minutes before the credential test passes. If you have double-checked your credential values, wait 15 minutes and try again.
:::

## Creating an Azure Management Certificate account {#azure-management-certificate}

Azure Management Certificate Accounts work with the **Azure Service Management API** only, which is used when Octopus deploys [Cloud Services](/docs/deployments/azure/cloud-services/) and [Azure Web Apps](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app).

:::div{.warning}
The Azure Service Management APIs are being deprecated by Microsoft.  See [this blog post](https://octopus.com/blog/azure-management-certs).  The instructions below only exist for legacy purposes.
:::

To create an Azure Management Certificate account as part of adding an [Azure subscription](#adding-azure-subscription), select Management Certificate as the Authentication Method.

### Step 1: Management Certificate {#CreatingAnAzureManagementCertificateAccount-Step2-ManagementCertificate}

When using **Management Certificate**, Octopus authenticates with Azure using an X.509 certificate.  You can either upload an existing certificate (`.pfx`), or leave the field blank and Octopus will generate a certificate. Keep in mind that since Octopus securely stores the certificate internally, there is no need to upload a password protected `.pfx` file. If you would like to use one that is password protected, you will need to first remove the password. This can be done with the following commands.

**Remove .pfx password**

```powershell
openssl pkcs12 -in AzureCert.pfx -password pass:MySecret -nodes -out temp.pem
openssl pkcs12 -export -in temp.pem -passout pass: -out PasswordFreeAzureCert.pfx
del temp.pem
```

If Octopus generates your certificate, you need to upload the certificate to the Azure Management Portal.  After clicking **Save**, the Account settings page provides instructions for downloading the certificate public-key from Octopus and uploading it into the Azure Management Portal.

Uploaded certificates can be viewed on the 'Management Certificates' tab of the 'Settings' page in the Azure Portal.

The certificate will be named **Octopus Deploy -``{Your Account Name}**.

### Step 2: Save and Test {#CreatingAnAzureManagementCertificateAccount-Step3-SaveAndTest}

Click **Save and Test**, and Octopus will attempt to use the account credentials to access the Azure Service Management (ASM) API and list the Hosted Services in that subscription. You may need to include the appropriate IP Addresses for the Azure Data Center you are targeting in any firewall allow list. See [deploying to Azure via a Firewall](/docs/deployments/azure) for more details.

You can now configure Octopus to deploy to Azure via the Azure Service Management (ASM) API.

## Azure account variables {#azure-account-variables}

You can access your Azure account from within projects through a variable of type **Azure Account**. Learn more about [Azure Account Variables](/docs/projects/variables/azure-account-variables/) and [Azure Deployments](/docs/deployments/azure).

## Automate Azure Service Principal creation and Octopus Deploy account registration {#azure-octopus-account-automate-creation}

The above scripts / steps can result in a lot of clicking back and forth.  Below is a script that will do the following:

1. Create an Azure Service Principal
1. Assign that Service Principal the role of `contributor` to the desired subscription.
1. Register that Service Principal and subscription in Octopus Deploy.

While parameters are present, they are not required.  You will be prompted for each parameter while the script runs.  This script is designed to run multiple times.

```powershell
# None of these parameters are required to start the script, you will be prompted at each stage to enter any values missing.

param (
    $OctopusURL,
    $OctopusApiKey,
    $OctopusSpaceName,
    $OctopusAccountName,
    $OctopusEnvironmentList,
    $OctopusTenantList,
    $AzureTenantId,
    $AzureSubscriptionName,
    $AzureServicePrincipalName,
    $AzureServicePrincipalPasswordEndDays
)

$ErrorActionPreference = "Stop"

function Write-OctopusSuccess
{
    param($message)

    Write-Host $message -ForegroundColor Green
}

function Write-OctopusWarning
{
    param($message)

    Write-Host $message -ForegroundColor Red
}

function Write-OctopusVerbose
{
    param($message)

    Write-Host $message -ForegroundColor White
}

function Get-ParameterValue
{
    param
    (
        $originalParameterValue,
        $parameterName
    )

    if ($null -ne $originalParameterValue -and [string]::IsNullOrWhiteSpace($originalParameterValue) -eq $false)
    {
        return $originalParameterValue
    }

    return Read-Host -Prompt "Please enter a value for $parameterName"
}

function Get-ParameterValueWithDefault
{
    param
    (
        $originalParameterValue,
        $parameterName,
        $defaultValue
    )

    $returnValue = Get-ParameterValue -originalParameterValue $originalParameterValue -parameterName $parameterName

    if ([string]::IsNullOrWhiteSpace($returnValue) -eq $true)
    {
        return $defaultValue
    }

    return $returnValue
}

function Invoke-OctopusApi
{
    param
    (
        $EndPoint,
        $SpaceId,
        $OctopusURL,
        $apiKey,
        $method,
        $item
    )

    $url = "$OctopusUrl/api/$spaceId/$EndPoint"
    if ([string]::IsNullOrWhiteSpace($SpaceId))
    {
        $url = "$OctopusUrl/api/$EndPoint"
    } 
    
    if ($null -eq $EndPoint -and $null -eq $SpaceId)
    {
        $url = "$OctopusUrl/api"
    }

    if ($null -eq $item)
    {           
        Write-OctopusVerbose "Invoking GET $url" 
        return Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -ContentType 'application/json; charset=utf-8'
    }

    $body = $item | ConvertTo-Json -Depth 10        

    Write-OctopusVerbose "Invoking $method $url"
    return Invoke-RestMethod -Method $method -Uri $url -Headers @{"X-Octopus-ApiKey" = "$ApiKey" } -Body $body -ContentType 'application/json; charset=utf-8'
}

function Get-OctopusItemByName
{
    param (
        $ItemList,
        $ItemName
        )    

    return ($ItemList | Where-Object {$_.Name -eq $ItemName})
}

function Import-AzurePowerShellModules
{
    if (Get-Module -Name Az -ListAvailable)
    {    
        Write-OctopusVerbose "Azure Az Module found."
    }
    else
    {
        Write-OctopusVerbose "Azure Az Modules not found.  Installing the Azure Az PowerShell Modules.  You might be prompted that PSGallery is untrusted.  If you select Yes your screen might freeze for a second while the modules download process is started."
        Install-Module -Name Az -AllowClobber -Scope CurrentUser
    }

    Write-OctopusVerbose "Loading the Azure Az Module.  This may cause the screen to freeze while loading the module."
    Import-Module -Name Az
}

function Get-OctopusSpaceInformation
{
    param (
        $OctopusApiKey,
        $OctopusUrl,
        $OctopusSpaceName
    )

    Write-OctopusVerbose "Testing the API credentials of the credentials supplied by pulling the space information"
    $spaceResults = Invoke-OctopusApi -EndPoint "spaces?skip=0&take=100000" -SpaceId $null -OctopusURL $OctopusURL -apiKey $OctopusApiKey -method "Get" -item $null
    $spaceInfo = Get-OctopusItemByName -ItemList $spaceResults.Items -ItemName $OctopusSpaceName

    if ($null -ne $spaceInfo -and $null -ne $spaceInfo.Id)
    {
        Write-OctopusSuccess "Successfully connected to the Octopus Deploy instance provided.  The space id for $OctopusSpaceName is $($spaceInfo.Id)"
        return $spaceInfo
    }
    else
    {
        Write-OctopusWarning "Unable to connect to $OctopusUrl.  Please check your credentials and try again."
        exit 1
    }    
}

function Test-ExistingOctopusAccountWorksWithAzure
{
    param (
        $OctopusApiKey,
        $OctopusUrl,
        $SpaceInfo,
        $ExistingAccount
    )

    Write-OctopusVerbose "The account already exists in Octopus Deploy.  Running a test to ensure it can connect to Azure."
    $testAccountTaskBody = @{
        "Name" = "TestAccount"
        "Description" = "Test Azure account"
        "SpaceId" = $spaceInfo.Id
        "Arguments" = @{
            "AccountId" = $existingAccount.Id
            }
        }

    $checkConnectivityTask = Invoke-OctopusApi -EndPoint "tasks" -SpaceId $null -OctopusURL $OctopusURL -apiKey $OctopusApiKey -method "POST" -item $testAccountTaskBody
    $taskStatusEndPoint = "tasks/$($checkConnectivityTask.Id)"

    $taskState = $checkConnectivityTask.State
    $taskDone = $taskState -eq "Success" -or $taskState -eq "Canceled" -or $taskState -eq "Failed"    

    While ($taskDone -eq $false)
    {
        Write-OctopusVerbose "Checking on the status of the task in 3 seconds"
        Start-Sleep -Seconds 3
        $taskStatus = Invoke-OctopusApi -EndPoint $taskStatusEndPoint -SpaceId $null -OctopusURL $OctopusURL -apiKey $OctopusApiKey -method "GET"        
        $taskState = $taskStatus.State

        Write-Host "The task status is $taskState"
        $taskDone = $taskState -eq "Success" -or $taskState -eq "Canceled" -or $taskState -eq "Failed"

        if ($taskState -eq "Success")
        {
            Write-OctopusSuccess "The Octopus Account can successfully connect to Azure"
            return $true            
        }        
    } 

    return $false
}

function New-OctopusIdList
{
    param (
        $OctopusUrl,
        $OctopusApiKey,
        $spaceInfo,
        $endPoint,
        $itemName,
        $itemParameter
    )

    Write-OctopusVerbose "Checking to see if Octopus Deploy instance has $itemName"
    $allItemsList = Invoke-OctopusApi -EndPoint "$($endPoint)?skip=0&take=100000" -method "Get" -SpaceId $spaceInfo.Id -OctopusURL $OctopusUrl -apiKey $OctopusApiKey
    $IdList = @()

    if ($allItemsList.Items.Count -le 0)
    {
        return $IdList
    }

    Write-OctopusVerbose "$itemName records found."
    $itemFilter = Get-ParameterValue  -originalParameterValue $itemParameter -parameterName "a comma-separated list of $itemName you'd like to associate the account to.  If left blank the account can be used for all $itemName."        
    
    if ([string]::IsNullOrWhiteSpace($itemFilter) -eq $true)
    {
        return $IdList
    }

    $itemList = $itemFilter -split ","
    foreach ($item in $itemList)
    {
        $foundItem = Get-OctopusItemByName -ItemList $allItemsList.Items -ItemName $item

        if ($null -eq $foundItem)
        {
            Write-OctopusWarning "The $itemName $item was not found in your Octopus Deploy instance."
            $continue = Read-Host -Prompt "Would you like to continue?  If yes, the account will not be tied to $itemName $item.  y/n"
            if ($continue.ToLower() -ne "y")
            {
                exit
            }
        }
        else 
        {
            $IdList += $foundItem.Id    
        }
    }

    return $IdList
}

Write-OctopusVerbose "This script will do the following:"
Write-OctopusVerbose "    1) In Azure: create an Azure Service Principal and associate it with your desired subscription as a contributor.  The password generated is two GUIDs without dashes."
Write-OctopusVerbose "    2) In Octopus Deploy: create an Azure Account using the credentials created in step 1"

Write-OctopusVerbose "For this to work you will need to have the following installed.  If it is not installed, then this script will it install it for you from the PowerShell Gallery."
Write-OctopusVerbose "    1)  Azure Az Powershell Modules"

$answer = Read-Host -Prompt "Do you wish to continue? y/n"
if ($answer.ToLower() -ne "y")
{
    Write-OctopusWarning "You have chosen not to continue.  Stopping script"
    Exit
}

Import-AzurePowerShellModules

$OctopusURL = Get-ParameterValue -originalParameterValue $OctopusURL -parameterName "the URL of your Octopus Deploy Instance, example: https://samples.octopus.com"
$OctopusApiKey = Get-ParameterValue -originalParameterValue $OctopusApiKey -parameterName "the API Key of your Octopus Deploy User.  See https://octopus.com/docs/octopus-rest-api/how-to-create-an-api-key for a guide on how to create one"
$OctopusSpaceName = Get-ParameterValueWithDefault -originalParameterValue $OctopusSpaceName -parameterName "the name of the space in Octopus Deploy.  If left empty it will default to 'Default'" -defaultValue "Default"
$OctopusAccountName = Get-ParameterValueWithDefault -originalParameterValue $OctopusAccountName -parameterName "the name of the account you wish to create in Octopus Deploy.  If left empty it will default to 'Bootstrap Azure Account'" -defaultValue "Bootstrap Azure Account"

$spaceInfo = Get-OctopusSpaceInformation -OctopusApiKey $OctopusApiKey -OctopusUrl $OctopusURL -OctopusSpaceName $OctopusSpaceName

Write-OctopusVerbose "Getting the list of accounts on that space in Octopus Deploy to see if it exists"
$existingOctopusAccounts = Invoke-OctopusApi -EndPoint "accounts?skip=0&take=1000000" -method "GET" -SpaceId $spaceInfo.Id -apiKey $OctopusApiKey -OctopusURL $OctopusURL
$existingAccount = Get-OctopusItemByName -ItemList $existingOctopusAccounts.Items -ItemName $OctopusAccountName
$OctopusAndAzureServicePrincipalAlreadyExist = $false
$OctopusEnvironmentIdList = @()
$OctopusTenantIdList = @()

if ($null -ne $existingAccount)
{
    $OctopusAndAzureServicePrincipalAlreadyExist = Test-ExistingOctopusAccountWorksWithAzure -OctopusApiKey $OctopusApiKey -OctopusUrl $OctopusURL -SpaceInfo $spaceInfo -ExistingAccount $existingAccount
}
else 
{
    Write-OctopusWarning "The account $OctopusAccountName does not exist.  After creating the Azure Account it will create a new account in Octopus Deploy"
    Write-OctopusVerbose "Octopus accounts can be locked down to specific environments, tenants and tenant tags"
    $OctopusEnvironmentIdList = New-OctopusIdList -OctopusUrl $OctopusURL -OctopusApiKey $OctopusApiKey -spaceInfo $spaceInfo -endPoint "environments" -itemName "environments" -itemParameter $OctopusEnvironmentList
    $OctopusTenantIdList = New-OctopusIdList -OctopusUrl $OctopusURL -OctopusApiKey $OctopusApiKey -spaceInfo $spaceInfo -endPoint "tenants" -itemName "tenants" -itemParameter $OctopusTenantList
}

if ($OctopusAndAzureServicePrincipalAlreadyExist -eq $true)
{
    $overwriteExisting = Read-Host -Prompt "Octopus Deploy already has a working connection with Azure.  Do you wish to continue?  This will create a new password for the service principal account in Azure and update the account in Octopus Deploy.  y/n"
    If ($overwriteExisting.ToLower() -ne "y")
    {
        Write-OctopusSuccess "Octopus Deploy already has a working connection and you elected to leave it as as is, stopping script."
        exit
    }
}

$AzureTenantId = Get-ParameterValue -originalParameterValue $AzureTenantId -parameterName "the ID (GUID) of the Azure tenant you wish to connect to.  See https://microsoft.github.io/AzureTipsAndTricks/blog/tip153.html on how to get that id"
$AzureSubscriptionName = Get-ParameterValue -originalParameterValue $AzureSubscriptionName -parameterName "the name of the subscription you wish to connect Octopus Deploy to"
$AzureServicePrincipalName = Get-ParameterValue -originalParameterValue $AzureServicePrincipalName -parameterName "the name of the service principal you wish to create in Azure"

Write-OctopusVerbose "Logging into Azure"
Connect-AzAccount -Tenant $AzureTenantId -Subscription $AzureSubscriptionName

Write-OctopusVerbose "Auto-generating new password"
$AzureServicePrincipalPasswordEndDays = Get-ParameterValue -originalParameterValue $AzureServicePrincipalPasswordEndDays -parameterName "the number of days you want the service principal password to be active"
$password = "$(New-Guid)$(New-Guid)" -replace "-", ""
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force

$endDate = (Get-Date).AddDays($AzureServicePrincipalPasswordEndDays)

$azureSubscription = Get-AzSubscription -SubscriptionName $AzureSubscriptionName
$azureSubscription | Format-Table

$ExistingApplication = Get-AzADApplication -DisplayName "$AzureServicePrincipalName"
$ExistingApplication | Format-Table

if ($null -eq $ExistingApplication)
{
    Write-OctopusVerbose "The Azure Active Directory Application does not exist, creating Azure Active Directory application"
    $azureAdApplication = New-AzADApplication -DisplayName "$AzureServicePrincipalName" -HomePage "http://octopus.com" -IdentifierUris "http://octopus.com/$($AzureServicePrincipalName)" -Password $securePassword -EndDate $endDate
    $azureAdApplication | Format-Table

    Write-OctopusVerbose "Creating Azure Active Directory service principal"
    $servicePrincipal = New-AzADServicePrincipal -ApplicationId $azureAdApplication.ApplicationId
    $servicePrincipal | Format-Table

    Write-OctopusSuccess "Azure Service Principal successfully created"
    $AzureApplicationId = $azureAdApplication.ApplicationId
}
else 
{
    Write-OctopusVerbose "The azure service principal $AzureServicePrincipalName already exists, creating a new password for Octopus Deploy to use."        
    New-AzADAppCredential -DisplayName "$AzureServicePrincipalName" -Password $securePassword -EndDate $endDate     
    Write-OctopusSuccess "Azure Service Principal successfully password successfully created."
    $AzureApplicationId = $ExistingApplication.ApplicationId
}

if ($null -eq $existingAccount)
{
    Write-OctopusVerbose "Now creating the account in Octopus Deploy."
    $tenantParticipation = "Untenanted"

    if ($OctopusTenantIdList.Count -gt 0)
    {
        $tenantParticipation = "TenantedOrUntenanted"
    }

    $jsonPayload = @{
        AccountType = "AzureServicePrincipal"
        AzureEnvironment = ""
        SubscriptionNumber = $azureSubscription.Id
        Password = @{
            HasValue = $true
            NewValue = $password
        }
        TenantId = $AzureTenantId
        ClientId = $AzureApplicationId
        ActiveDirectoryEndpointBaseUri = ""
        ResourceManagementEndpointBaseUri = ""
        Name = $OctopusAccountName
        Description = "Account created by the bootstrap script"
        TenantedDeploymentParticipation = $tenantParticipation
        TenantTags = @()
        TenantIds = @($OctopusTenantIdList)
        EnvironmentIds = @($OctopusEnvironmentIdList)
    }

    Write-OctopusVerbose "Adding Azure Service Principal that was just created to Octopus Deploy"    
    Invoke-OctopusApi -EndPoint "accounts" -item $jsonPayload -method "POST" -SpaceId $spaceInfo.Id -apiKey $OctopusApiKey -OctopusURL $OctopusURL

    Write-OctopusSuccess "Successfully added the Azure Service Principal account to Octopus Deploy"
}
else 
{
    $existingAccount.Password.HasValue = $true    
    $existingAccount.Password.NewValue = $password

    Write-OctopusVerbose "Updating the existing account in Octopus Deploy to use the new service principal credentials"
    Invoke-OctopusApi -EndPoint "accounts/$($existingAccount.Id)" -item $existingAccount -method "PUT" -SpaceId $spaceInfo.Id -apiKey $OctopusApiKey -OctopusURL $OctopusUrl
    Write-OctopusSuccess "Successfully updated Azure Service Principal account in Octopus Deploy"
}

Write-OctopusSuccess "Important information to know for future usage:"
Write-OctopusVerbose "    1) The Azure Tenant Id is: $AzureTenantId"
Write-OctopusVerbose "    2) The Azure Subscription Id: $($azureSubscription.SubscriptionId)"  
Write-OctopusVerbose "    3) The Azure Application Id: $AzureApplicationId"
Write-OctopusVerbose "    4) The new password is: $password - this is the only time you'll see this password, please store it in a safe location."
```

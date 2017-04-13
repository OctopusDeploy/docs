---
title: Web App concepts
description: Core concepts involved in deploying Azure Web Apps with Octopus Deploy.
---

There are several core concepts involved in deploying Azure Web Apps.  Read on for more information.

## Packaging Web Apps {#WebAppConcepts-PackagingWebApps}

In order to deploy Web Apps they must be packaged into an Octopus compatible NuGet package.

### Publish your Web App {#WebAppConcepts-PublishyourWebApp}

Publish your Web App with Visual Studio to the file system:

![](/docs/images/3049436/3278570.png "width=500")

### Generate a NuGet package {#WebAppConcepts-GenerateaNuGetpackage}

Octopus requires a Web Apps to be packaged in NuGet package for use by Octopus. The easiest way generate a NuGet package is to use the [Octo.exe](/docs/packaging-applications/nuget-packages/using-octo.exe.md) command line tool:

**Packaging a Cloud Service with Octo.exe**

```powershell
Octo.exe pack --id=HelloWeb --basePath=C:\PathToWebApp
```

Octo.exe will generate a NuGet package containing your Web App:

![](/docs/images/3049436/3278571.png "width=500")

Here is a sample Web App NuGet package: [HelloWeb.1.0.0.nupkg](https://download.octopusdeploy.com/demo/HelloWeb.1.0.0.nupkg)

### Upload to a NuGet feed {#WebAppConcepts-UploadtoaNuGetfeed}

In order to make the NuGet package accessible to Octopus it needs to be uploaded to a [package repository](/docs/packaging-applications/package-repositories/index.md). The built-in Octopus package repository is accessible from {{Library,Packages}} and is a suitable place to upload your Web App NuGet package:

![](/docs/images/3049356/3278535.png "width=500")

## Web App accounts {#WebAppConcepts-WebAppAccounts}

Deploying a Web App in Octopus requires the configuration of an Azure Subscription Account.  Azure Subscription Accounts contain the details of Azure subscriptions.

### Creating the account {#WebAppConcepts-Creatingtheaccount}

![](/docs/images/3049434/3278565.png "width=500")

#### Subscription Id {#WebAppConcepts-SubscriptionId}

The subscription Id can be found on the Settings tab of the Azure Management portal.

![](/docs/images/3049434/3278564.png "width=500")

#### Management certificate {#WebAppConcepts-Managementcertificate}

Octopus Deploy must authenticate to Azure using an X.509 certificate.  You can either upload an existing certificate (`.pfx`), or leave the field blank and Octopus Deploy will generate a certificate. Keep in mind that since Octopus Deploy securely stores the certificate internally, there is no need to upload a password protected `.pfx`file. If you would like to use one that is password protected, you will need to first remove the password. This can be done with the following commands.

**Remove .pfx password**

```bash
openssl pkcs12 -in AzureCert.pfx -password pass:MySecret -nodes -out temp.pem
openssl pkcs12 -export -in temp.pem -passout pass -out PasswordFreeAzureCert.pfx
del temp.pem
```

If you allow Octopus Deploy to generate your certificate, you will need to upload the certificate to the Azure Management Portal.  After clicking 'Save', the Account settings page provides instructions for downloading the certificate public-key from Octopus Deploy, and uploading it into the Azure Management Portal.

![](/docs/images/3049434/3278566.png "width=500")

Uploaded certificates can be viewed on the 'Management Certificates' tab of the 'Settings' page in the Azure Management Portal.

![](/docs/images/3049434/3278567.png "width=500")

The certificate will be named `Octopus Deploy - {Your Account Name}.`

## Web App deployment step {#WebAppConcepts-WebAppDeploymentStep}

Octopus Deploy supports automated deployment of [Azure Web Apps](http://azure.microsoft.com/en-us/services/app-service/web/) (formerly known as Azure Web Sites).

### Deployment Step {#WebAppdeploymentstep-DeploymentStep}

Add a new 'Deploy an Azure Web App' step to your project. For information about adding a step to the deployment process, see the [add step](/docs/deploying-applications/adding-steps.md) section.

![](/docs/images/5671696/5865899.png "width=170")

![](/docs/images/3049430/3278562.png "width=500")

Once an Account is selected, the list of Azure Web Apps available to the subscription associated with the account will populate the 'Web App' select-list.

#### Physical Path {#WebAppdeploymentstep-PhysicalPath}

Allows deployment to a physical sub-directory of the web-root.  This is useful when deploying to Virtual Directories or Web Jobs, and you don't want to deploy the root application at the same time.

#### Remove additional files {#WebAppdeploymentstep-Removeadditionalfiles}

When set, deletes files from the destination that aren't in the source package.

**Preserve App\_Data**

When set, skip Delete operations in the **App\_Data** directory.

:::hint
**Preserve Specific Paths**
If you wish to set the "Remove additional files" option but preserve specific paths, see[ this document](/docs/guides/azure-deployments/web-apps/web-app-concepts.md#WebAppConcepts-PreserveSpecificPathsWhenDeployingAzureWebApp).
:::

**Enable AppOffline**

When set, this safely brings down a website with a blank app\_offline.htm file in the root.

:::hint
For more information, see [Taking an Application Offline before Publishing](https://www.iis.net/learn/publish/deploying-application-packages/taking-an-application-offline-before-publishing).
:::

**Variable-expressions**

Any of the fields above can be switched to use a custom expression.

### Features {#WebAppdeploymentstep-Features}

The following features are available when deploying a package to an Azure Web App.

- [Custom Scripts](/docs/deploying-applications/custom-scripts/index.md)
- [Configuration Variables](/docs/deploying-applications/configuration-files/index.md)
- [Configuration Transforms](/docs/deploying-applications/configuration-files/index.md)
- [Substitute variables in files](/docs/reference/variable-substitution-syntax.md)

#### PowerShell {#WebAppdeploymentstep-PowerShell}

PowerShell custom scripts executed against an Azure Web App target will have the Azure PowerShell module loaded, and the subscription from the chosen account will be selected.

### Preserve Specific Paths When Deploying Azure Web App {#WebAppConcepts-PreserveSpecificPathsWhenDeployingAzureWebApp}

When configuring the[ Deploy an Azure Web App](/docs/guides/azure-deployments/web-apps/web-app-concepts.md#WebAppConcepts-WebAppDeploymentStep) step, if you wish to set the "Remove additional files" option but preserve specific paths (i.e. other than App\_Data) you can create a variable named `Octopus.Action.Azure.PreservePaths`.

The value should be set to a list of regexes, delimeted by `;` that will be used to select directories and files to preserve.

For example, to preserve any paths beginning with `\Component` you could use:

```powershell
\\Component.*(\\.*|$)
```

:::hint
Note: Because of the way the rules work for [WebDeploy](https://www.iis.net/downloads/microsoft/web-deploy) (which is used internally by Octopus when deploying Azure Websites), your pattern must also match any parent directories of the path you wish to preserve.

For e.g. if you had the paths:

```powershell
\Components\ComponentA
\Components\ComponentB
```

and you wanted to preserve `ComponentA` but *not* `ComponentB`, then you would have to set the variable to:

```powershell
\\Components;\\Components\\ComponentA(\\.*|$)
```
:::

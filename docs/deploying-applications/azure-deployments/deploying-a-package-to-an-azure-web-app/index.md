---
title: Azure Web Apps
description: Octopus Deploy can help you perform repeatable and controlled deployments to Azure Web Apps.
---
Octopus Deploy supports automated deployment of [Azure Web Apps](http://azure.microsoft.com/en-us/services/app-service/web/) (formerly known as Azure Web Sites). The below guide explains how to add a step to your deployment process to deploy an application to an Azure Web App.

!toc

## Understanding Azure Web Apps {#DeployingapackagetoanAzureWebApp-UnderstandingAzureWebApps}

The Azure Web Apps you build, and how you might want to deploy them, are becoming increasingly complex as the Azure team provide more features to the platform. The best place to stay abreast of changes, and how they might affect your deployments is the [Azure Web App Documentation](https://azure.microsoft.com/en-us/documentation/services/app-service/web/), the [many and varied ways you can deploy Web Apps (including Octopus Deploy)](https://azure.microsoft.com/en-us/documentation/articles/web-sites-deploy/). There is also the hidden gem of the [Project Kudu GitHub repository](https://github.com/projectkudu/kudu/wiki) where you will find many of the hard to find facts about Web Jobs (like the `settings.job` file, configuring a Continuous Web Job as a Singleton, configuring the Schedule for Scheduled Jobs, how shadow copying enables in-place deployments, and how to shut down gracefully).

### Web Apps are deployed using Web Deploy {#DeployingapackagetoanAzureWebApp-WebAppsaredeployedusingWebDeploy}

Deploying an Azure Web App with Octopus Deploy behaves very similarly to the Visual Studio publish wizard and uses **Web Deploy** to synchronize the files in your package to the Azure Web App. Similarly to Visual Studio you can change how Octopus Deploy invokes Web Deploy using the following options in your deployment steps which enable the most common deployment scenarios. All of these options are discussed below where we describe how to configure the Azure Web App step.

:::hint
**Defaults match Visual Studio**
The default values for these variables were chosen to match Visual Studio following the principle of least surprise. You will typically need to adjust these values depending on your specific circumstances.
:::

## Step 1: Packaging {#DeployingapackagetoanAzureWebApp-Step1:Packaging}

See the [packaging application docs](/docs/packaging-applications/index.md)

!partial <configurestep>

4. On the `Deployment` section you can configure any of the below settings which are related to *how* your files are going to be pushed to Azure.

| Setting                     | Default     | Description                              |
| --------------------------- | ----------- | ---------------------------------------- |
| **Physical Path**           |             | The physical path relative to site root on the web app host. e.g. 'foo' will deploy to 'site\wwwroot\foo'. Leave blank to deploy to root. |
| **Remove additional files** | *False*     | When *True* instructs Web Deploy to delete files from the destination that aren't in the source package |
| **Preserve App\_Data**      | *False*     | When *True* instructs Web Deploy to skip Delete operations in the **App\_Data** directory |
| **Enable AppOffline**       | *False*     | When *True* instructs Web Deploy to place *app\_offline.htm* in root deployment directory to safely bring down the app domain.</br>Click [here](http://www.iis.net/learn/publish/deploying-application-packages/taking-an-application-offline-before-publishing) for more details. |
| **File comparison method**  | *Timestamp* | Can be *timestamp* or *checksum* and instructs web deploy to use the selected algorithm to determine which files to update.</br>*Note: There have been some issues with checksum in earlier versions of web deploy, and we've written about that in detail [here](https://octopus.com/blog/reliably-deploying-large-azure-web-apps).* |

:::success
**Use variable binding expressions**
Any of the settings above can be switched to use a variable binding expression. A common example is when you use a naming convention for your different web apps, like **MyApp\_Production** and **MyApp\_Test** - you can use environment-scoped variables to automatically configure this step depending on the environment you are targeting.
:::

### Deployment features available to Azure Web App steps {#DeployingapackagetoanAzureWebApp-DeploymentfeaturesavailabletoAzureWebAppsteps}

The following features are available when deploying a package to an Azure Web App.

- [Custom Scripts](/docs/deploying-applications/custom-scripts/index.md)
- [Configuration Variables](/docs/deployment-process/steps/configuration-files/index.md)
- [Configuration Transforms](/docs/deployment-process/steps/configuration-files/index.md)
- [JSON configuration variables](/docs/deploying-applications/deploying-asp.net-core-web-applications/json-configuration-variables-feature.md)
- [Substitute variables in files](/docs/deployment-process/variables/variable-substitution-syntax.md)

:::hint
Please note these features actually run on the Octopus Server prior to executing web deploy to synchronize the resultant files to the Azure Web App slot. They don't execute in the Azure Web App host you are eventually targeting.
:::

:::hint
For your convenience the PowerShell session for your [custom scripts](/docs/deploying-applications/custom-scripts/index.md) will have the Azure PowerShell module loaded, and the subscription from the account associated with the target will be selected. This means you don't have to worry about loading the Azure PowerShell module nor authenticate with Azure yourself. See the [Azure Powershell documentation](/docs/deploying-applications/azure-deployments/running-azure-powershell/index.md) for more information. You can write very straightforward scripts like the example below which is from our [guide on using deployment slots with Azure Web Apps](/docs/deploying-applications/azure-deployments/deploying-a-package-to-an-azure-web-app/using-deployment-slots-with-azure-web-apps.md):

```powershell
#Swap the staging slot into production
Switch-AzureWebsiteSlot -Name #{WebSite} -Slot1 Staging -Slot2 Production -Force
```
:::

### What happens when the step is executed? {#DeployingapackagetoanAzureWebApp-ExecutingTheStep}

When the `Deploy an Azure Web App` step gets executed, the below actions will happen (in order):

1. Download the package from the [package repository](/docs/packaging-applications/package-repositories/index.md)
2. Extract the package on the Octopus server to a temporary location
3. Any configured or packaged `PreDeploy` scripts are executed
4. [Substitute variables in files ](/docs/deployment-process/steps/configuration-files/substitute-variables-in-files.md)(if configured)
5. [XML configuration transformations](/docs/deployment-process/steps/configuration-files/index.md) (if configured) are performed
6. [XML configuration variables](/docs/deployment-process/steps/configuration-files/index.md) (if configured) are replaced
7. Any configured or packaged `Deploy` scripts are executed
8. Push your package content to the Web App in Azure.
9. Any configured or packaged `PostDeploy` scripts are executed

## Simple and advanced deployment scenarios{#DeployingapackagetoanAzureWebApp-Simpleandadvanceddeploymentscenarios}


## Deploying to multiple geographic regions {#DeployingapackagetoanAzureWebApp-Deployingtomultiplegeographicregions}

When your application is deployed to more than one geographic region, you are likely to need per-region configuration settings. You can achieve this result in many different ways, but the two most popular methods we have seen are:

1. [Cloud Regions](/docs/infrastructure/cloud-regions.md): introduced in Octopus 3.4 to enable [rolling deployments](/docs/deployment-patterns/rolling-deployments.md) across multiple geographic regions
2. Environment-per-region: by creating an environment per region you can leverage [lifecycles](/docs/infrastructure/lifecycles/index.md) to create a strict release promotion process

The example we've discussed here is the most common scenario for deploying Azure Web Apps: a single package that contains an ASP.NET Web Application and some Web Jobs in the same release cadence. It is possible to implement more complex deployment scenarios where the ASP.NET Web Application and each Web Job follow independent release cadences. In this case you would build multiple packages using the folder structure expected by the Azure Web App hosting framework discussed earlier. Once you've done that you can simply reuse the same Azure Web App Deployment Target to deploy each package when they are released.

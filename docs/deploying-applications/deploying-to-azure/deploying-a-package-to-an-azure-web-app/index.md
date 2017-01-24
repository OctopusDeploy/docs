---
title: Deploying a package to an Azure Web App

---


Octopus Deploy supports automated deployment of [Azure Web Apps](http://azure.microsoft.com/en-us/services/app-service/web/) (formerly known as Azure Web Sites).


- Understanding Azure Web Apps
 - Web Apps are deployed using Web Deploy
 - Web Jobs
- Step 1: Packaging
 - Simple and advanced deployment scenarios
- Step 2: Create an Azure Account
- Step 3: Create the Azure Web App deployment step
- Step 4: Configure your Azure Web App step.
 - Deployment features available to Azure Web App steps
- Deployment process
- Deploying to multiple geographic regions

## Understanding Azure Web Apps {#DeployingapackagetoanAzureWebApp-UnderstandingAzureWebApps}


The Azure Web Apps you build, and how you might want to deploy them, are becoming increasingly complex as the Azure team provide more features to the platform. The best place to stay abreast of changes, and how they might affect your deployments is the [Azure Web App Documentation](https://azure.microsoft.com/en-us/documentation/services/app-service/web/), the [many and varied ways you can deploy Web Apps (including Octopus Deploy)](https://azure.microsoft.com/en-us/documentation/articles/web-sites-deploy/). There is also the hidden gem of the [Project Kudu GitHub repository](https://github.com/projectkudu/kudu/wiki) where you will find many of the hard to find facts about Web Jobs (like the `settings.job` file, configuring a Continuous Web Job as a Singleton, configuring the Schedule for Scheduled Jobs, how shadow copying enables in-place deployments, and how to shut down gracefully).

### Web Apps are deployed using Web Deploy {#DeployingapackagetoanAzureWebApp-WebAppsaredeployedusingWebDeploy}


Deploying an Azure Web App with Octopus Deploy behaves very similarly to the Visual Studio publish wizard and uses **Web Deploy** to synchronize the files in your package to the Azure Web App. Similarly to Visual Studio you can change how Octopus Deploy invokes Web Deploy using the following options in your deployment steps which enable the most common deployment scenarios. All of these options are discussed below where we describe how to configure the Azure Web App step.

:::hint
**Defaults match Visual Studio**
The default values for these variables were chosen to match Visual Studio following the principle of least surprise. You will typically need to adjust these values depending on your specific circumstances.
:::

### Web Jobs {#DeployingapackagetoanAzureWebApp-WebJobs}


You can build Web Jobs [in almost any way you can imagine](https://azure.microsoft.com/en-us/documentation/articles/websites-webjobs-resources/), so let's focus this discussion on deploying Web Jobs. Web Jobs are deployed by simply copying the files into the right place in the Web App file system.


When you use Octopus Deploy to deploy a package to an Azure Web App it will synchronize the files from your package into the Web App via Web Deploy where the root folder of the package matches the root folder of the Web App.


To deploy a Web Job with Octopus Deploy you simply need to add the executable Web Job(s) into the appropriate folder(s) of your package and deploy them to the Web App.

- Triggered Web Jobs should be added to the `app_data/jobs/triggered/{job_name}` folder
- Continuous Web Jobs should be added to the `app_data/jobs/continuous/{job_name}` folder



See below for more information on packaging Azure Web Apps including Web Jobs.


For more information refer to the [Project Kudu documentation on Web Jobs](https://github.com/projectkudu/kudu/wiki/Web-jobs).

## Step 1: Packaging {#DeployingapackagetoanAzureWebApp-Step1:Packaging}


Your application should be packaged into a [supported package](/docs/packaging-applications/index.md) where the contents of the package will be synchronized with the Azure Web App via Web Deploy. Your package should include any content and binaries for your Web Site and any Web Jobs using the same folder structure that is expected by the Azure Web App hosting environment.

**Example Azure Web App package with Web Jobs**

```powershell
\\MyWebApp.1.0.0.0.nupkg
    \---app_data
        \---jobs
            \---continuous
                \---WebJob1
                    |   WebJob1.exe
                    |   WebJob1.exe.config
            \---triggered
                \---WebJob2
                    |   WebJob2.exe
                    |   WebJob2.exe.config
    \---bin
        \---MyWebApp.dll
    \---Global.asax
    \---index.html
    \---MyWebApp.nuspec
    \---web.config
```


A really convenient way to package Web Apps is [using OctoPack](/docs/packaging-applications/nuget-packages/using-octopack/index.md). Here's a simplified example that would build the package discussed above.

**MyWebApp.nuspec**

```xml
<?xml version="1.0"?>
<package >
  <metadata>
    <id>MyWebApp</id>
    <version>1.0.0.0</version>
    <title>MyWebApp</title>
    <authors>MyCompany</authors>
    <owners>MyCompany</owners>
    <projectUrl>https://github.com/MyCompany/MyWebApp</projectUrl>
    <iconUrl></iconUrl>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>MyWebApp with WebJobs</description>
    <copyright>Copyright 2015 MyCompany</copyright>
  </metadata>
  <files>
  	<file src="..\WebJob1\bin\**\*.*" target="app_data\jobs\continuous\WebJob1" />
  	<file src="..\WebJob2\bin\**\*.*" target="app_data\jobs\triggered\WebJob2" />
  </files>
</package>
```

:::hint
**OctoPackEnforceAddingFiles**
If the **<files>** section exists, OctoPack by default won't attempt to automatically add any extra files to your package, so you'll need to be explicit about which files you want to include. You can override this behavior with `/p:OctoPackEnforceAddingFiles=true`
:::


Here's an example project file with some of the OctoPack configuration set as properties that are convenient for WebApps and WebJobs.

**MyWebApp.csproj**

```xml
<PropertyGroup>
  ...
  <RunOctoPack>true</RunOctoPack><!-- Run OctoPack on every build which is really convenient for testing your package process works as expected -->
  <OctoPackEnforceAddingFiles>true</OctoPackEnforceAddingFiles><!-- Package files included by convention because it's a web project, and package files specified by the <files> node of the nuspec -->
  <OctoPackPublishPackageToFileShare>..\..\artifacts</OctoPackPublishPackageToFileShare><!-- Publish the resultant package to the ..\..\artifacts folder -->
  ...
</PropertyGroup>
```

### Simple and advanced deployment scenarios {#DeployingapackagetoanAzureWebApp-Simpleandadvanceddeploymentscenarios}


The example we've discussed here is the most common scenario for deploying Azure Web Apps: a single package that contains an ASP.NET Web Application and some Web Jobs in the same release cadence. It is possible to implement more complex deployment scenarios where the ASP.NET Web Application and each Web Job follow independent release cadences. In this case you would build multiple packages using the folder structure expected by the Azure Web App hosting framework discussed earlier. Once you've done that you can simply reuse the same Azure Web App Deployment Target to deploy each package when they are released.

## Step 2: Create an Azure Account {#DeployingapackagetoanAzureWebApp-Step2:CreateanAzureAccount}


If you haven't already, create an [Azure Subscription Account](/docs/key-concepts/environments/accounts/azure-subscription-account.md) to grant Octopus Deploy access to your Azure Subscription.

## Step 3: Create the Azure Web App deployment step {#DeployingapackagetoanAzureWebApp-Step3:CreatetheAzureWebAppdeploymentstep}

1. Add a new 'Deploy an Azure Web App' step to your project. For information about adding a step to the deployment process, see the [add step](http://docs.octopusdeploy.com/display/OD/Add+step) section. 

![](/docs/images/5671696/5865899.png "width=170")


## Step 4: Configure your Azure Web App step. {#DeployingapackagetoanAzureWebApp-Step4:ConfigureyourAzureWebAppstep.}


Once an Account is selected, the list of Azure Web Apps available to the subscription associated with the account will populate the 'Web App' select-list.


![](/docs/images/3048686/3278366.png "width=500")




| Setting | Default | Description |
| --- | --- | --- |
| Account |  | The [Azure Account](/docs/key-concepts/environments/accounts/azure-subscription-account.md) you want to target when deploying this web app. Select one from the list, or use a [variable binding](/docs/deploying-applications/variables/binding-syntax.md) to select an account by its name or ID. |
| --- | --- | --- |
| Web App |  | The actual web app you want to target. Select one from the list, or use a [variable binding](/docs/deploying-applications/variables/binding-syntax.md) to define the name of the web app. |
| --- | --- | --- |
| Physical Path |  | The physical path relative to site root on the web app host. e.g. 'foo' will deploy to 'site\wwwroot\foo'. Leave blank to deploy to root. |
| --- | --- | --- |
| **Remove additional files** | *False* | When *True* instructs Web Deploy to delete files from the destination that aren't in the source package |
| --- | --- | --- |
| **Preserve App\_Data** | *False* | When *True* instructs Web Deploy to skip Delete operations in the **App\_Data** directory |
| --- | --- | --- |
| **Enable AppOffline** | *False* | When *True* instructs Web Deploy to place *app\_offline.htm* in root deployment directory to safely bring down the app domain.
Click [here](http://www.iis.net/learn/publish/deploying-application-packages/taking-an-application-offline-before-publishing) for more details. |
| --- | --- | --- |
| File comparison method | *Timestamp* | Can be *timestamp* or *checksum* and instructs web deploy to use the selected algorithm to determine which files to update.
*Note: There have been some issues with checksum in earlier versions of web deploy, and we've written about that in detail [here](https://octopus.com/blog/reliably-deploying-large-azure-web-apps).* |
| --- | --- | --- |

:::success
**Use variable binding expressions**
Any of the settings above can be switched to use a variable binding expression. A common example is when you use a naming convention for your different web apps, like **MyApp\_Production** and **MyApp\_Test** - you can use environment-scoped variables to automatically configure this step depending on the environment you are targeting.
:::

### Deployment features available to Azure Web App steps {#DeployingapackagetoanAzureWebApp-DeploymentfeaturesavailabletoAzureWebAppsteps}


The following features are available when deploying a package to an Azure Web App.

- [Custom Scripts](/docs/deploying-applications/custom-scripts/index.md)
- [Configuration Variables](/docs/deploying-applications/configuration-files/index.md)
- [Configuration Transforms](/docs/deploying-applications/configuration-files/index.md)
- [Substitute variables in files](/docs/reference/variable-substitution-syntax.md)


:::hint
Please note these features actually run on the Octopus Server prior to executing web deploy to synchronize the resultant files to the Azure Web App slot. They don't execute in the Azure Web App host you are eventually targeting.
:::

:::hint
For your convenience the PowerShell session for your [custom scripts](/docs/deploying-applications/custom-scripts/index.md) will have the Azure PowerShell module loaded, and the subscription from the account associated with the target will be selected. This means you don't have to worry about loading the Azure PowerShell module nor authenticate with Azure yourself. See the [Azure Powershell documentation](/docs/guides/azure-deployments/running-azure-powershell/index.md) for more information. You can write very straightforward scripts like the example below which is from our [guide on using deployment slots with Azure Web Apps](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/using-deployment-slots-with-azure-web-apps.md):

```powershell
#Swap the staging slot into production
Switch-AzureWebsiteSlot -Name #{WebSite} -Slot1 Staging -Slot2 Production -Force
```
:::

## Deployment process {#DeployingapackagetoanAzureWebApp-Deploymentprocess}


Deployment to an Azure Web App proceeds as follows (more details provided below):

1. Download the package from the [package repository](/docs/packaging-applications/package-repositories/index.md)
2. Extract the package on the Octopus server to a temporary location
3. Any configured or packaged `PreDeploy` scripts are executed
4. [Substitute variables in files ](/docs/deploying-applications/substitute-variables-in-files.md)(if configured)
5. [XML configuration transformations](/docs/deploying-applications/configuration-files/index.md) (if configured) are performed
6. [XML configuration variables](/docs/deploying-applications/configuration-files/index.md) (if configured) are replaced
7. Any configured or package `Deploy` scripts are executed
8. Execute web deploy to synchronize the resultant files in the temporary location to the web app host
9. Any configured or packaged `PostDeploy` scripts are executed


## Deploying to multiple geographic regions {#DeployingapackagetoanAzureWebApp-Deployingtomultiplegeographicregions}


When your application is deployed to more than one geographic region, you are likely to need per-region configuration settings. You can achieve this result in many different ways, but the two most popular methods we have seen are:

1. [Cloud Regions](/docs/deployment-targets/cloud-regions.md): introduced in Octopus 3.4 to enable [rolling deployments](/docs/patterns/rolling-deployments.md) across multiple geographic regions
2. Environment-per-region: by creating an environment per region you can leverage [lifecycles](/docs/key-concepts/lifecycles.md) to create a strict release promotion process



Both methods allow you to modify your deployment process and variables per-region, but have slightly different release promotion paths. Choose the one that suits you best.

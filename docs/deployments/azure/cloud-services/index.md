---
title: Azure Cloud Services
description: Octopus Deploy can help you perform repeatable and controlled deployments to Azure Cloud Services.
hideInThisSectionHeader: true
---

!include <azure-cloud-services-deprecated>

Octopus Deploy supports deployment of [Azure Cloud Services](http://azure.microsoft.com/en-us/services/cloud-services/). This page will walk you through, step by step, setting up a deployment using the Octopus built-in **Deploy an Azure Cloud Service** step.

## Step 1: Packaging {#DeployingapackagetoanAzureCloudService-Step1:Packaging}

An Azure cloud service package is normally compiled into a `.cspkg` file. This file will need to be [re-packed into a supported package](/docs/packaging-applications/index.md) for Octopus to consume. The easiest way to do this currently is to either create a simple zip file or use the [NuGet.exe command line tool](https://docs.microsoft.com/en-us/nuget/tools/nuget-exe-cli-reference). For example, the resulting NuGet package will look like this:

![](3278363.png "width=500")

### Upload to a NuGet feed {#DeployingapackagetoanAzureCloudService-UploadtoaNuGetfeed}

In order to make the NuGet package accessible to Octopus it needs to be uploaded to a [package repository](/docs/packaging-applications/package-repositories/index.md). The built-in Octopus package repository is accessible from **{{Library > Packages}}** and is a suitable place to upload your Cloud Service NuGet package:

![Package feed](package-feed.png "width=500")

## Step 2: Create an Azure account {#DeployingapackagetoanAzureCloudService-Step2:CreateanAzureAccount}

If you haven't already, create an [Azure Management Certificate Account](/docs/infrastructure/accounts/azure/index.md) to grant Octopus Deploy access to your Azure Subscription.

## Step 3: Create the Azure Cloud Service deployment step {#DeployingapackagetoanAzureCloudService-Step3:CreatetheAzureCloudServicedeploymentstep}

Add a new Azure Cloud Service Deployment Step to your project. For information about adding a step to the deployment process, see the [add step](/docs/projects/steps/index.md) section. 

![](5865904.png "width=170")

## Step 4: Configure your Azure Cloud Service step {#DeployingapackagetoanAzureCloudService-Step4:ConfigureyourAzureCloudServicestep}

Once an Account is selected, the list of Cloud Services and Storage Accounts available to the Azure subscription associated with the chosen Account will be populated for you to choose from.

| Setting         | Default | Description                              |
| --------------- | ------- | ---------------------------------------- |
| Account         |         | The [Azure Account](/docs/infrastructure/accounts/azure/index.md) you want to  target when deploying this cloud service. Select one from the list, or use a [variable binding](/docs/projects/variables/variable-substitutions.md) to select an account by its name or ID. |
| Cloud Service   |         | The actual cloud service you want to target. Select one from the list, or use a [variable binding](/docs/projects/variables/variable-substitutions.md) to define the name of the cloud service. |
| Storage Account |         | The Azure Storage Account where the Cloud Service Package (`*.cspkg`) file will be pushed in order to be deployed. |
| Slot            |         | You can choose to deploy to either the Staging or Production slot. |
| Swap            |         | Azure allows staging and production deployments to be swapped, by switching virtual IP addresses. When deploying to production, Octopus can detect whether the current staging deployment can be swapped, and if so, it can do a swap rather than a new deployment.<br/>If **Always deploy** is selected, the package will always be deployed to the selected Slot.<br/>If **Swap staging to production if possible** is selected and the selected Slot is Production, then a swap will occur between Production and Staging (if there is a deployment in the Staging slot).<br/>See [VIP Swap](/docs/deployments/azure/cloud-services/vip-swap.md) for more information on how to configure a VIP swap.|
| Instance Count  |         | If you have scaled your Windows Azure service using the management portal (for example, changing the role count from 1 to 4), during a deployment Octopus can be configured to keep the existing instance counts rather than using the instance counts defined in your cloud service configuration file. |

:::success
**Use variable binding expressions**
Any of the settings above can be switched to use a variable binding expression. A common example is when you use a naming convention for your different cloud services, like **MyCloudService\_Production** and **MyCloudService\_Test** - you can use environment-scoped variables to automatically configure this step depending on the environment you are targeting.
:::

### Deployment features available to Azure Cloud Service steps {#DeployingapackagetoanAzureCloudService-DeploymentfeaturesavailabletoAzureCloudServicesteps}

The following features are available when deploying a package to an Azure Cloud Service:

- [Custom Scripts](/docs/deployments/custom-scripts/index.md)
- [Configuration Variables](/docs/projects/steps/configuration-features/xml-configuration-variables-feature.md)
- [.NET Configuration Transforms](/docs/projects/steps/configuration-features/configuration-transforms/index.md)
- [Structured configuration variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature.md)
- [Substitute variables in templates](/docs/projects/steps/configuration-features/substitute-variables-in-templates.md)

:::hint
Please note these features actually run on the Octopus Server prior to deploying the Cloud Service package to Azure. They don't execute in the Azure Cloud Service instances you are eventually targeting.
:::

For your convenience the PowerShell session for your [custom scripts](/docs/deployments/custom-scripts/index.md) will have the Azure PowerShell module loaded, and the subscription from the account associated with the target will be selected. This means you don't have to worry about loading the Azure PowerShell module nor authenticate with Azure yourself. See the [Azure PowerShell documentation](/docs/deployments/azure/running-azure-powershell/index.md) for more information. You can write very straightforward scripts like the example below:

```powershell
#Swap the staging slot into production
$ServiceName = $OctopusParameters["Octopus.Action.Azure.CloudServiceName"]
$Deployment = Get-AzureDeployment -Slot "Staging" -ServiceName $ServiceName
if ($Deployment -ne $null -AND $Deployment.DeploymentId  -ne $null) {
  Write-Host ("Current Status of staging slot for {0}" -f $ServiceName)
  $Deployment
  $MoveStatus = Move-AzureDeployment -ServiceName $ServiceName
  Write-Host ("Vip swap of {0} status: {1}" -f $ServiceName, $MoveStatus.OperationStatus)
} else {
  Write-Host ("There is no deployment in staging slot of {0} to swap." -f $ServiceName)
}
```

## Deployment process {#DeployingapackagetoanAzureCloudService-Deploymentprocess}

Deployment to an Azure Cloud Service proceeds as follows (more details provided below):

1. Download the package from the [package repository](/docs/packaging-applications/package-repositories/index.md).
2. Extract the package on the Octopus Server to a temporary location.
3. Extract the Cloud Service package (`.cspkg`) to a temporary location.
4. Any configured or packaged `PreDeploy` scripts are executed.
5. Variable substitutions in Cloud Service configuration file (`.cscfg`).
6. [Substitute variables in templates](/docs/projects/steps/configuration-features/substitute-variables-in-templates.md) (if configured).
7. [.NET XML configuration transformations](/docs/projects/steps/configuration-features/configuration-transforms/index.md) (if configured) are performed.
8. [.NET XML configuration variables](/docs/projects/steps/configuration-features/xml-configuration-variables-feature.md) (if configured) are replaced.
9. Any configured or package `Deploy` scripts are executed.
10. Re-package the Cloud Service Package.
11. Upload the Cloud Service Package to Azure Storage.
12. Deploy the Cloud Service Package (see 'Customizing the deployment process' section below).
13. Any configured or packaged `PostDeploy` scripts are executed.

### Extract the Cloud Service package {#DeployingapackagetoanAzureCloudService-ExtracttheCloudServicePackage}

Cloud Service Package files are extracted during deployment, in order to make available features such as .NET Configuration Transforms and Variable Substitution.

To extract the Cloud Service Package, it is first converted to the CTP format (also known as V20120315). This is the format described by Microsoft [documentation](https://msdn.microsoft.com/en-us/library/azure/jj151522.aspx), but is not used by default by the [CSPack ](https://msdn.microsoft.com/en-us/library/azure/gg432988.aspx)utility (passing the `/useCtpPackageFormat` switch is required for this format to be used).  This is just an implementation detail, but the documented archive layout gives a good starting point to understanding the layout of the extracted package.

Setting the `Octopus.Action.Azure.LogExtractedCspkg` variable to `true` will cause the layout of the extracted package to be written into the Task Log. This may assist with finding the path to a particular file.

:::warning
**Disable Package Extraction and Re-Packaging**

Based on customer reports and Azure community discussions, we believe Microsoft is no longer recommending Azure Cloud Services: https://docs.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree. Several customers have reported timeout issues in regards to Azure Cloud Services and slow re-packing of CTP packages. Unfortunately, we cannot fix this issue, [as noted here](https://github.com/OctopusDeploy/Issues/issues/6111).

The issues around timeouts and slow re-repackaging can be mitigated by passing in the variable `Octopus.Action.Azure.CloudServicePackageExtractionDisabled` and setting the value to `true`. However, in doing so, variable substitution will no longer be available.
:::

### Variable substitutions in Cloud Service configuration file {#DeployingapackagetoanAzureCloudService-VariablesubstitutionsinCloudServiceconfigurationfile}

Octopus will attempt to modify your `.cscfg` file. For example, take the following configuration:

```xml
<ServiceConfiguration serviceName="Humpty" xmlns="http://schemas.microsoft.com/ServiceHosting/2008/10/ServiceConfiguration" osFamily="2" osVersion="*" schemaVersion="2012-10.1.8">
  <Role name="Humpty.Web">
    <Instances count="1" />
    <ConfigurationSettings>
      <Setting name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" value="UseDevelopmentStorage=true" />
      <Setting name="HelloMessage" value="Hello world! This is a web role!" />
    </ConfigurationSettings>
  </Role>
  <Role name="Humpty.Worker">
    <Instances count="1" />
    <ConfigurationSettings>
      <Setting name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" value="UseDevelopmentStorage=true" />
      <Setting name="HelloMessage" value="Hello world! This is a worker!" />
    </ConfigurationSettings>
  </Role>
</ServiceConfiguration>
```

If a variable named `HelloMessage` is defined in your Octopus project variables, Octopus will automatically update it in the configuration file. You can also name the variable `Humpty.Worker/HelloMessage` to scope the setting to a specific web/worker role.

### Customizing the deployment process {#DeployingapackagetoanAzureCloudService-Customizingthedeploymentprocess}

The deployment is performed using the [open-source Calamari project](https://github.com/OctopusDeploy/Calamari). For backwards compatibility, Octopus will look for a PowerShell script called `DeployToAzure.ps1`. If a file with this name exists within your package, Octopus will invoke it. Otherwise, Octopus will continue to use it's bundled [Sashimi.AzureCloudService](https://github.com/OctopusDeploy/Sashimi.AzureCloudService) library.

:::hint
If you choose to override the deployment script, remember that your `DeployToAzure.ps1` file must exist at **the root** of your package. It cannot be located in a subfolder. For reference, you can see how this filename is detected in your extracted package [here](https://github.com/OctopusDeploy/Sashimi.AzureCloudService/blob/main/source/Calamari/DeployAzureCloudServicePackageBehaviour.cs).
:::

## Deploying to multiple geographic regions {#DeployingapackagetoanAzureCloudService-Deployingtomultiplegeographicregions}

When your application is deployed to more than one geographic region, you are likely to need per-region configuration settings. You can achieve this result in many different ways, but the two most popular methods we have seen are:

1. [Cloud Regions](/docs/infrastructure/deployment-targets/cloud-regions.md): enable [rolling deployments](/docs/deployments/patterns/rolling-deployments.md) across multiple geographic regions.
2. Environment-per-region: by creating an environment per region you can leverage [lifecycles](/docs/releases/lifecycles/index.md) to create a strict release promotion process.

Both methods allow you to modify your deployment process and variables per-region, but have slightly different release promotion paths. Choose the one that suits you best.

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).
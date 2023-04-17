---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Deploying a package to an Azure Service Fabric cluster
description: Octopus Deploy can help you perform repeatable and controlled deployments to Service Fabric clusters.
navOrder: 20
---

Octopus Deploy supports deployment of [Azure Service Fabric applications](https://azure.microsoft.com/en-au/services/service-fabric/).

:::hint
The [Service Fabric SDK](https://oc.to/ServiceFabricSdkDownload) must be installed on the Octopus Server. If this SDK is missing, the step will fail with an error: _"Could not find the Azure Service Fabric SDK on this server."_

**PowerShell Script Execution** may also need to be enabled. See the _"Enable PowerShell script execution"_ section from the above link for more details.

After the above SDK has been installed, you need to restart your Octopus service for the changes to take effect.
:::

## Step 1: Create a Service Fabric cluster

Create a Service Fabric cluster (either in Azure, on-premises, or in other clouds). Octopus needs an existing Service Fabric cluster to connect to in order to deploy your application package.

## Step 2: Packaging

Package your Service Fabric application. See our guide to [Packaging a Service Fabric application](/docs/deployments/azure/service-fabric/packaging).

## Step 3: Create a Service Fabric deployment target

You will need to create a [Service Fabric Deployment Target](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets) for each cluster you are deploying to.

## Step 4: Create the Service Fabric application deployment step

Add a new Service Fabric application deployment step to your project. For information about adding a step to the deployment process, see the [add step](/docs/projects/steps) section. 

## Step 5: Configure your Service Fabric application step

Select the Role you assigned your Service Fabric target and select your Service Fabric package from your package feed.

Select and configure the security mode required to connect to your cluster. The various security modes are described in detail in the [Deploying to Service Fabric documentation](/docs/deployments/azure/service-fabric)

Various options are available to deploy your Service Fabric application.

| Setting                                                | Default     | Description                              |
| ------------------------------------------------------ | ----------- | ---------------------------------------- |
| Publish profile file                                   | PublishProfiles\Cloud.xml | Path to the file containing the publish profile |
| Deploy only                                            | Disabled | Indicates that the Service Fabric application should not be created or upgraded after registering the application type |
| Unregister unused application versions after upgrade   | Disabled | Indicates whether to unregister any unused application versions that exist after an upgrade is finished |
| Override upgrade behavior                              |     None        | Indicates the behavior used to override the upgrade settings specified by the publish profile. Options are _None_, _ForceUpgrade_, _VetoUpgrade_. To force an upgrade regardless of the publish profile setting set this option to _ForceUpgrade_. To use the setting defined in publish profile set this setting to _None_. |
| Overwrite behavior                                     | SameAppTypeAndVersion | Overwrite Behavior if an application exists in the cluster with the same name. Available options are _Never_, _Always_, _SameAppTypeAndVersion_. This setting is not applicable when upgrading an application |
| Skip package validation                                | Disabled | Switch signaling whether the package should be validated or not before deployment |
| Copy package timeout (seconds)                         | SDK Default | Timeout in seconds for copying application package to image store |
| Register Application Type Timeout (seconds)            | SDK Default | Timeout in seconds for registering application type. Requires Service Fabric SDK version 6.2+ |

:::success
**Use Variable Binding Expressions**
Any of the settings above can be switched to use a variable binding expression. A common example is when you use a naming-convention for your application services, like **MyFabricApplication\_Production** and **MyFabricApplication\_Test**, you can use environment-scoped variables to automatically configure this step depending on the environment you are targeting.
:::

### Deployment features available to Service Fabric application steps

The following features are available when deploying a package to a Service Fabric application:

- [Custom Scripts](/docs/deployments/custom-scripts)
- [Configuration Variables](/docs/projects/steps/configuration-features/xml-configuration-variables-feature)
- [.NET Configuration Transforms](/docs/projects/steps/configuration-features/configuration-transforms)
- [Structured Configuration Variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature)
- [Substitute Variables in Templates](/docs/projects/steps/configuration-features/substitute-variables-in-templates)

:::hint
Please note these features run on the Octopus Server prior to deploying the Service Fabric application to your cluster. They don't execute in the cluster nodes you are eventually targeting.
:::

## Deployment process

Deployment to a Service Fabric cluster proceeds as follows (more details provided below):

1. Download the package from the [package repository](/docs/packaging-applications/package-repositories).
1. Extract the package on the Octopus Server to a temporary location.
1. Any configured or packaged `PreDeploy` scripts are executed.
1. [Substitute variables in templates](/docs/projects/steps/configuration-features/substitute-variables-in-templates) (if configured).
1. [.NET XML configuration transformations](/docs/projects/steps/configuration-features/configuration-transforms) (if configured) are performed.
1. [.NET XML configuration variables](/docs/projects/steps/configuration-features/xml-configuration-variables-feature) (if configured) are replaced.
1. [Structured configuration variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature) (if configured) are replaced.
1. Any configured or package `Deploy` scripts are executed.
1. Generic variable substitution is carried out across all `*.config` and `*.xml` files in the extracted package.
1. Execute the Service Fabric application deployment script (see [Customizing the deployment process](#customizing-the-deployment-process) section below).
1. Any configured or packaged `PostDeploy` scripts are executed.

### Extract the Service Fabric package

Service Fabric package files are extracted during deployment, as the `Publish-UpgradedServiceFabricapplication` cmdlet used by Calamari requires an `ApplicationPackagePath` parameter to the extracted package. This also allows Octopus to use available features such as .NET Configuration Transforms and Variable Substitution.

Setting the `Octopus.Action.ServiceFabric.LogExtractedApplicationPackage` variable to `true` will cause the layout of the extracted package to be written into the Task Log. This may assist with finding the path to a particular file.

### Customizing the deployment process

The deployment is performed using a PowerShell script called `DeployToServiceFabric.ps1`. If a file with this name exists within the root of your package, Octopus will invoke it. Otherwise, Octopus will use a bundled version of the script as a default. You can **[view the bundled script here](https://github.com/OctopusDeploy/Sashimi.AzureServiceFabric/blob/main/source/Calamari/Scripts/DeployAzureServiceFabricApplication.ps1)**, and use it as a basis for creating your own custom deployment script.

:::hint
If you choose to override the deployment script, remember that your `DeployToServiceFabric.ps1` file must exist at **the root** of your package. It cannot be located in a subfolder. For reference, you can see how this filename is detected in your extracted package [here](https://github.com/OctopusDeploy/Sashimi.AzureServiceFabric/blob/main/source/Calamari/Behaviours/DeployAzureServiceFabricAppBehaviour.cs).
:::

## Deploying to multiple geographic regions

When your application is deployed to more than one geographic region, you are likely to need per-region configuration settings. You can achieve this by creating a [Service Fabric Deployment Target](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets) per-region and assigning them to the same role and an appropriate environment.

Your process can be modified by using [variables scoped](/docs/projects/variables/#scoping-variables) by environment or deployment target.

You can also employ an *environment-per-region* method so you can leverage [lifecycles](/docs/releases/lifecycles) to create a strict release promotion process.

Both methods allow you to modify your deployment process and variables per-region, but have slightly different release promotion paths. Choose the one that suits you best.

## Versioning

To learn more about how you can automate Service Fabric versioning with Octopus, see our guide on [Version Automation with Service Fabric application packages](/docs/deployments/azure/service-fabric/version-automation-with-service-fabric-application-packages).


## Troubleshooting

Due to the complexity of the PowerShell deployment script, it's likely you'll run into unsupported actions or unforeseen edge cases. The most common type of errors are related to the wrong action type chosen by the script due to either unforeseen edge cases or unsupported cases. For this reason, we highly recommend using [a customized version of the PowerShell script](/docs/deployments/azure/service-fabric/deploying-a-package-to-a-service-fabric-cluster/#customizing-the-deployment-process) that comes with Visual Studio for Service Fabric for most scenarios.

:::hint
Octopus will not modify the service fabric script due to the complexity associated with the script and the number of combinations it supports. We are considering options to improve this experience in the future, and this will most likely require customers to include/bundle their own version of the PS script.
:::

### Application name already exists

When the `RegisterAndCreate` is used when the type and name already exists, you may be presented with the following error:
```
An application with name 'fabric:/name' already exists, its Type is 'TypeName' and Version is 'version'. You must first remove the existing application before a new application can be deployed or provide a new name for the application.
```

This usually relates to the `Override Upgrade Behavior` setting being incorrect. We suggest you either change the setting or use a custom SF deployment script such
as [this](https://github.com/OctopusDeploy/Calamari/blob/4a7a5d2b571246181701e743939f635905ef5d84/source/Calamari.Azure/Scripts/DeployAzureServiceFabricApplication.ps1) (preferred).

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).


---
title: Deploying a package to a Azure Service Fabric cluster
description: Octopus Deploy can help you perform repeatable and controlled deployments to Service Fabric clusters.
position: 0
version: "[3.13,)"
---

Octopus Deploy supports deployment of [Azure Service Fabric applications](https://azure.microsoft.com/en-au/services/service-fabric/).

:::hint
The [Service Fabric SDK](https://g.octopushq.com/ServiceFabricSdkDownload) must be installed on the Octopus Server. If this SDK is missing, the step will fail with an error: _"Could not find the Azure Service Fabric SDK on this server."_

**PowerShell script execution** may also need to be enabled. See the _"Enable PowerShell script execution"_ section from the above link for more details.

After the above SDK has been installed, you will need to restart your Octopus service before the changes will take effect.
:::

## Step 1: Create a Service Fabric cluster

Create a Service Fabric cluster (either in Azure, on-prem or in other clouds). Octopus needs an existing Service Fabric cluster to connect to in order to deploy your application package.

## Step 2: Packaging

Package your Service Fabric application. See our guide to [Packaging a Service Fabric application](/docs/deployment-examples/azure-deployments/service-fabric/packaging.md).

## Step 3: Create a Service Fabric Deployment Target

You will need to create a [Service Fabric Deployment Target](/docs/infrastructure/azure/service-fabric-cluster-targets/index.md) for each cluster you are deploying to.

## Step 4: Create the Service Fabric application deployment step

Add a new Service Fabric application deployment step to your project. For information about adding a step to the deployment process, see the [add step](/docs/deployment-process/steps/index.md) section. 

## Step 5: Configure your Service Fabric application step

Select the Role you assigned your Service Fabric target and select your Service Fabric package from your package feed.

Select and configure the security mode required to connect to your cluster. The various security modes are described in detail in the [Deploying to Service Fabric documentation](/docs/deployment-examples/azure-deployments/deploying-to-service-fabric/index.md)

Various options are available to deploy your Service Fabric application.

| Setting                                                | Default     | Description                              |
| ------------------------------------------------------ | ----------- | ---------------------------------------- |
| Publish profile file                                   |             | Path to the file containing the publish profile |
| Deploy only                                            |             | Indicates that the Service Fabric application should not be created or upgraded after registering the application type |
| Unregister unused application versions after upgrade   |             | Indicates whether to unregister any unused application versions that exist after an upgrade is finished |
| Override upgrade behavior                              |             | Indicates the behavior used to override the upgrade settings specified by the publish profile. Options are _None_, _ForceUpgrade_, _VetoUpgrade_ |
| Overwrite behavior                                     |             | Overwrite Behavior if an application exists in the cluster with the same name. Available options are _Never_, _Always_, _SameAppTypeAndVersion_. This setting is not applicable when upgrading an application |
| Skip package validation                                |             | Switch signaling whether the package should be validated or not before deployment |
| Copy package timeout (seconds)                         | SDK Default | Timeout in seconds for copying application package to image store |
| Register Application Type Timeout (seconds)            | SDK Default | Timeout in seconds for registering application type. Requires Service Fabric SDK version 6.2+ |

:::success
**Use variable binding expressions**
Any of the settings above can be switched to use a variable binding expression. A common example is when you use a naming-convention for your various application services, like **MyFabricApplication\_Production** and **MyFabricApplication\_Test** - you can use environment-scoped variables to automatically configure this step depending on the environment you are targeting.
:::

### Deployment features available to Service Fabric application steps

The following features are available when deploying a package to a Service Fabric application:

- [Custom Scripts](/docs/deployment-examples/custom-scripts/index.md)
- [Configuration Variables](/docs/deployment-process/configuration-features/configuration-variables.md)
- [Configuration Transforms](/docs/deployment-process/configuration-features/configuration-transforms.md)
- [JSON configuration variables](/docs/deployment-process/configuration-features/json-configuration-variables-feature.md)
- [Substitute variables in files](/docs/deployment-process/variables/variable-substitution-syntax.md)

:::hint
Please note these features actually run on the Octopus Server prior to deploying the Service Fabric application to your cluster. They don't execute in the cluster nodes you are eventually targeting.
:::

## Deployment process

Deployment to a Service Fabric cluster proceeds as follows (more details provided below):

1. Download the package from the [package repository](/docs/packaging-applications/package-repositories/index.md)
2. Extract the package on the Octopus server to a temporary location
3. Any configured or packaged `PreDeploy` scripts are executed
4. [Substitute variables in files](/docs/deployment-process/configuration-features/substitute-variables-in-files.md) (if configured)
5. [XML configuration transformations](/docs/deployment-process/configuration-features/configuration-transforms.md) (if configured) are performed
6. [XML configuration variables](/docs/deployment-process/configuration-features/configuration-variables.md) (if configured) are replaced
7. [JSON configuration variables](/docs/deployment-process/configuration-features/json-configuration-variables-feature.md) (if configured) are replaced
8. Any configured or package `Deploy` scripts are executed
9. Generic variable substitution is carried out across all `*.config` and `*.xml` files in the extracted package
10. Execute the Service Fabric application deployment script (see 'Customizing the deployment process' section below)
11. Any configured or packaged `PostDeploy` scripts are executed

### Extract the Service Fabric Package

Service Fabric package files are extracted during deployment, as the `Publish-UpgradedServiceFabricapplication` cmdlet used by Calamari requires an `ApplicationPackagePath` parameter to the extracted package. This also allows Octopus to use available features such as Configuration Transforms and Variable Substitution.

Setting the `Octopus.Action.ServiceFabric.LogExtractedApplicationPackage` variable to `true` will cause the layout of the extracted package to be written into the Task Log. This may assist with finding the path to a particular file.

### Customizing the deployment process

The deployment is performed using a PowerShell script called `DeployToServiceFabric.ps1`. If a file with this name exists within the root of your package, Octopus will invoke it. Otherwise, Octopus will use a bundled version of the script as a default. You can **[view the bundled script here](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari.Azure/Scripts/DeployAzureServiceFabricApplication.ps1)**, and use it as a basis for creating your own custom deployment script.

:::hint
If you choose to override the deployment script, remember that your `DeployToServiceFabric.ps1` file must exist at **the root** of your package. It cannot be located in a subfolder. For reference, you can see how this filename is detected in your extracted package [here](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari.Azure/Deployment/Conventions/DeployAzureServiceFabricAppConvention.cs).
:::

## Deploying to multiple geographic regions

When your application is deployed to more than one geographic region, you are likely to need per-region configuration settings. You can achieve this by creating a [Service Fabric Deployment Target](/docs/infrastructure/azure/service-fabric-cluster-targets/index.md) per-region and assigning them to the same role and an appropriate environment.

Your process can be modified by using [variables scoped](/docs/deployment-process/variables/scoping-variables.md) by environment, or deployment target.

You can also employ an *environment-per-region* method so you can leverage [lifecycles](/docs/deployment-process/lifecycles/index.md) to create a strict release promotion process.

Both methods allow you to modify your deployment process and variables per-region, but have slightly different release promotion paths. Choose the one that suits you best.

## Versioning

To learn more about how you can automate Service Fabric versioning with Octopus, see our guide on [Version Automation with Service Fabric application packages](/docs/deployment-examples/azure-deployments/service-fabric/version-automation-with-service-fabric-application-packages/index.md).

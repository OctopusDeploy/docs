---
title: Deploying packages
position: 2
---


When defining your [deployment process](/docs/home/deploying-applications.md), the most common step type will be a package step. This step type allows you to deploy an [application that you have packaged](/docs/home/packaging-applications.md) onto one or more [Tentacles](/docs/home/installation/installing-tentacles.md).


The process of deploying a package looks approximately like this:

1. Acquire the package as optimally as possible (local package cache and [delta compression](/docs/home/deploying-applications/delta-compression-for-package-transfers.md))
2. Create a new folder for the deployment (which avoids many common problems like file locks and leaving stale files behind)
 1. Example: `C:\Octopus\Applications\[Tenant name]\[Environment name]\[Package name]\[Package version]\` where `C:\Octopus\Applications` is the Tentacle application directory you configured when installing Tentacle)
3. Extract the package into the newly created folder
4. Execute each of your [custom scripts](/docs/home/deploying-applications/custom-scripts.md) and the [deployment features](/docs/home/deploying-applications.md) you've configured will be executed to perform the deployment [following this order by convention](/docs/home/reference/package-deployment-feature-ordering.md).
5. [Output variables](/docs/home/deploying-applications/variables/output-variables.md) and deployment [artifacts](/docs/home/deploying-applications/artifacts.md) from this step are sent back to the Octopus Server





:::hint
**Package deployment feature ordering**
Each part of a package step is [executed in a specific order](/docs/home/reference/package-deployment-feature-ordering.md) by the open-source [Calamari project](https://github.com/OctopusDeploy/Calamari) to enable more complex deployment scenarios.
:::

## Adding a package step


When adding a step to your deployment process, choose the **Deploy a Package** option. For more information, see the [add step](http://docs.octopusdeploy.com/display/OD/Add+step) section.


![](/docs/images/5671696/5865908.png)


When deploying a package you will need to select the machine role that the package will be deployed to. You will also be asked to select the [feed](/docs/home/packaging-applications/package-repositories.md) that is the source of the package, and the ID of the package to deploy. You can define the feed with an Octopus variable. Please note that these variables can be scoped to environments but you must have an unscoped entry for release creation.





![](/docs/images/3048090/5275675.png)

:::hint
When multiple machines are in the role you select, Octopus deploys to all of the machines in parallel. If you need to change this behavior, you can [configure a rolling deployment](/docs/home/patterns/rolling-deployments.md).
:::

## Configuring features


Octopus is built to make it easy to deploy .NET applications, and contains a number of useful built in *features* that can be enabled on NuGet package steps.


You can enable or disable features by clicking **Configure features**.





![](/docs/images/3048090/5275676.png)


![](/docs/images/3048090/3277744.png)





For more details on some of the features, see the topics below.

- [Configuration files](/docs/home/deploying-applications/configuration-files.md)
- [Windows Services](/docs/home/deploying-applications/windows-services.md)
- [IIS Websites and Application Pools](/docs/home/deploying-applications/iis-websites-and-application-pools.md)

---
title: Deploying Packages
description: Package steps allow you to deploy your applications and services that you have packaged and configured with Octopus.
position: 30
---

When defining your [deployment process](/docs/deployment-examples/index.md), the most common step type will be a package step. This step deploys your [packaged application](/docs/packaging-applications/index.md) onto one or more deployment targets.

## Adding a Package Step

When adding a step to your deployment process, choose the **Deploy a Package** option. For more information, see the [add step](/docs/deployment-process/steps/index.md) section:

![](/docs/images/5671696/5865908.png "width=170")

When deploying a package you will need to select the machine role that the package will be deployed to. You will also be asked to select the [feed](/docs/packaging-applications/package-repositories/index.md) that is the source of the package, and the ID of the package to deploy.

:::hint
**Variable Package Feed and/or Package ID**
You can dynamically select a Package Feed and/or the Package ID at deployment time using an Octopus variable expression. Learn more about [using dynamically selecting packages at deployment time](/docs/deployment-examples/deploying-packages/dynamically-selecting-packages.md).
:::

![](deploy-package-step.png "width=500")

:::hint
When multiple machines are in the role you select, Octopus deploys to all of the machines in parallel. If you need to change this behavior, you can [configure a rolling deployment](/docs/deployment-patterns/rolling-deployments.md).
:::

## Configuring Features

Octopus is built to make it easy to deploy .NET applications, and contains a number of useful built in *features* that can be enabled on NuGet package steps. See [Configuration Features](/docs/deployment-process/configuration-features/index.md) for more details.

## How Packages are Deployed

1. Acquire the package as optimally as possible (local package cache and [delta compression](/docs/deployment-examples/deploying-packages/delta-compression-for-package-transfers.md)).
1. Create a new folder for the deployment (which avoids many common problems like file locks and leaving stale files behind).
    - Example: `C:\Octopus\Applications\[Tenant name]\[Environment name]\[Package name]\[Package version]\` where `C:\Octopus\Applications` is the Tentacle application directory you configured when installing Tentacle).
1. Extract the package into the newly created folder.
1. Execute each of your [custom scripts](/docs/deployment-examples/custom-scripts/index.md) and the [deployment features](/docs/deployment-examples/index.md) you've configured will be executed to perform the deployment [following this order by convention](/docs/deployment-examples/deploying-packages/package-deployment-feature-ordering.md).
1. [Output variables](/docs/deployment-process/variables/output-variables.md) and deployment [artifacts](/docs/deployment-process/artifacts.md) from this step are sent back to the Octopus Server.

:::hint
**Package deployment feature ordering**
Each part of a package step is [executed in a specific order](/docs/deployment-examples/deploying-packages/package-deployment-feature-ordering.md) by the open-source [Calamari project](https://github.com/OctopusDeploy/Calamari) to enable more complex deployment scenarios.
:::

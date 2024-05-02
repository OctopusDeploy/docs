---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-05-01
title: Packages
description: Package steps allow you to deploy your applications and services that you have packaged and configured with Octopus.
navOrder: 140
---

When defining your [deployment process](/docs/deployments/), the most common step type will be a package step. This step deploys your [packaged application](/docs/packaging-applications) onto one or more deployment targets.

## Adding a package step

When adding a step to your deployment process, choose the **Deploy a Package** option. For more information, see the [add step](/docs/projects/steps) section:

When deploying a package you will need to select the [target tag](/docs/infrastructure/deployment-targets/#target-roles) that the package will be deployed to. You will also be asked to select the [feed](/docs/packaging-applications/package-repositories) that is the source of the package, and the ID of the package to deploy.

:::div{.hint}
**Variable Package Feed and/or Package ID**
You can dynamically select a Package Feed and/or the Package ID at deployment time using an Octopus variable expression. Learn more about [using dynamically selecting packages at deployment time](/docs/deployments/packages/dynamically-selecting-packages).
:::

:::figure
![](/docs/deployments/packages/images/deploy-package-step.png)
:::

:::div{.hint}
When multiple machines are associated with the target tag you select, Octopus deploys to all of the machines in parallel. If you need to change this behavior, you can [configure a rolling deployment](/docs/deployments/patterns/rolling-deployments).
:::

## Configuring features

Octopus is built to make it easy to deploy your software to multi-cloud, hybrid, and on-premises environments with ease. It contains a number of useful features that can be enabled on package steps. See [Configuration Features](/docs/projects/steps/configuration-features) for more details.

## How packages are deployed

1. Acquire the package as optimally as possible (local package cache and [delta compression](/docs/deployments/packages/delta-compression-for-package-transfers)).
1. Create a new folder for the deployment (which avoids many common problems like file locks and leaving stale files behind):
    - Example: `C:\Octopus\Applications\[Tenant name]\[Environment name]\[Package name]\[Package version]\` where `C:\Octopus\Applications` is the Tentacle application directory you configured when installing Tentacle).
1. Extract the package into the newly created folder.
1. Execute each of your [custom scripts](/docs/deployments/custom-scripts/) and the [deployment features](/docs/deployments/) you've configured will be executed to perform the deployment [following this order by convention](/docs/deployments/packages/package-deployment-feature-ordering).
1. [Output variables](/docs/projects/variables/output-variables/) and deployment [artifacts](/docs/projects/deployment-process/artifacts) from this step are sent back to the Octopus Server.

:::div{.hint}
**Package deployment feature ordering**
Each part of a package step is [executed in a specific order](/docs/deployments/packages/package-deployment-feature-ordering) by the open-source [Calamari project](https://github.com/OctopusDeploy/Calamari) to enable more complex deployment scenarios.
:::

---
title: Creating Packages
description: Creating packages for use in your Octopus deployments.
position: 4
---

Octopus expects your package to contain all of the files needed to run the application when it is deployed (along with [any scripts needed for deployment](/docs/deploying-applications/custom-scripts/index.md), and any [configuration transformation files](/docs/deployment-process/configuration-files/index.md), etc).

How you create your packages depends on which package type you wish to create. Octopus generally treats all packages the same, so choose the tooling and package type that is easiest for you to create.

## Applications

In our [Applications](/docs/packaging-applications/creating-packages/applications/index.md) section you'll find instructions on how to package different kinds of applications **Locally** on your workstation. The idea is that once you understand how the packaging process for your application works in your local environment, you can then translate that same process to run on a [Build Server](#build-tools).

See [Applications](/docs/packaging-applications/creating-packages/applications/index.md).

## Build Tools

In our [Build Tools](/docs/packaging-applications/creating-packages/build-tools/index.md) section you'll find guides on how to package applications when building using a **Build Server**. This section will have a varied set of examples for packaging different kinds of applications in the most common build server technologies out there. 

See [Build Tools](/docs/packaging-applications/creating-packages/build-tools/index.md).
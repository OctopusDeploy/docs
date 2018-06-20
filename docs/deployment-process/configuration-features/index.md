---
title: Configuration Features
description: Configuring applications to work in specific environments is an essential part of deploying applications with Octopus Deploy and this can include updating database connection strings and app settings.
position: 9
hideInThisSection: true
---

One of the essential steps in deploying software is configuring it to work with specific environments. This might mean pointing your application to the right database connection string, tweaking settings to run in production, or specifying a custom installation directory. Many of the steps that you define as part of your deployment process can have additional configuration features enabled.

## Enable Configuration Features

You enable configuration features, as you define the [steps](/docs/deployment-process/steps/index.md) in your [deployment process](/docs/deployment-process/index.md).

1. If the step you are defining has configuration features available, there is a **CONFIGURE FEATURES** link. Click this link.
1. Select the features you would like to enable by clicking the relevant checkboxes in the list and click **OK**.

The features you have enabled will now be available in the **Features** section of the step you are defining.

![Configuration Transforms screenshot](configuration-transforms.png)

:::hint
Only steps the features can be used with, will have the features listed as options.

Steps that are not compatible with any of the configuration features, will not show the **CONFIGURE FEATURES** link.
:::

You can configure the following features:

- [Custom Installation Directory](/docs/deployment-process/configuration-features/custom-installation-directory.md)
- [IIS Web Site and Application Pool](/docs/deployment-examples/iis-websites-and-application-pools.md)
- [Windows Service](/docs/deployment-examples/windows-services.md)
- [Custom Deployment Scripts](/docs/deployment-examples/custom-scripts/index.md)
- [JSON Configuration Variables](/docs/deployment-process/configuration-features/json-configuration-variables-feature.md)
- [Configuration Variables](/docs/deployment-process/configuration-features/configuration-variables.md)
- [Configuration Transforms](/docs/deployment-process/configuration-features/configuration-transforms.md)
- [Substitute Variables in Files](/docs/deployment-process/configuration-features/substitute-variables-in-files.md)
- IIS6+ Home Directory
- Red Gate Database Deployment

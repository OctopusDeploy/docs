---
title: Configuration Features
description: Configuring applications to work in specific environments is an essential part of deploying applications with Octopus Deploy and this can include updating database connection strings and app settings.
position: 9
hideInThisSection: true
---

One of the essential steps in deploying software is configuring it to work with specific environments. This might mean pointing your application to the right database connection string, tweaking settings to run in production, or specifying a custom installation directory.

You enable configuration features, as you define your deployment process. Compatible steps have a **Configure features** link next to the save button.

![Configuration Transforms screenshot](configuration-transforms.png)

You can configure the following features:

- [Custom Installation Directory](/docs/deployment-process/configuration-features/custom-installation-directory.md)
- IIS Web Site and Application Pool
- Windows Service
- Custom Deployment Scripts
- JSON Configuration Variables
- [Configuration Variables](/docs/deployment-process/configuration-features/configuration-variables.md)
- [Configuration Transforms](/docs/deployment-process/configuration-features/configuration-transforms.md)
- [Substitute Variables in Files](/docs/deployment-process/configuration-features/substitute-variables-in-files.md)
- IIS6+ Home Directory
- Red Gate Database Deployment

:::hint
Note, only steps the features can be used with will have the features listed as options.

Steps that are not compatible with any of the configuration features, will not show the **Configure Features** link.
:::

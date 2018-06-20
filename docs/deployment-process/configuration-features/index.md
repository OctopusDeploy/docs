---
title: Configuration Features
description: Configuring applications to work in specific environments is an essential part of deploying applications with Octopus Deploy and this can include updating database connection strings and app settings.
position: 9
---

One of the essential steps in deploying software is configuring it to work with specific environments. This might mean pointing your application to the right database connection string, tweaking settings to run in production, or specifying a custom installation directory.

You enable configuration features, as you define your deployment process. Compatible steps have a **Configure features** link next to the save button.

![Configuration Transforms screenshot](configuration-transforms.png)

You can configure the following features:

1. [Custom Installation Directory](/docs/deployment-process/configuration-features/custom-installation-directory.md)
1. IIS Web Site and Application Pool
1. Windows Service
1. Custom Deployment Scripts
1. JSON Configuration Variables
1. [Configuration Variables](/docs/deployment-process/configuration-features/configuration-variables.md)
1. [Configuration Transforms](/docs/deployment-process/configuration-features/configuration-transforms.md)
1. [Substitute Variables in Files](/docs/deployment-process/configuration-features/substitute-variables-in-files.md)
1. IIS6+ Home Directory
1. Red Gate Database Deployment

:::hint
Note, only steps the features can be used with will have the features listed as options.

Steps that are not compatible with any of the configuration features, will not show the **Configure Features** link.
:::

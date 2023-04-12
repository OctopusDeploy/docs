---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Configuration features
description: Configuring applications to work in specific environments is an essential part of deploying applications with Octopus Deploy and this can include updating database connection strings and app settings.
navOrder: 10
hideInThisSection: true
---

!include <configuration-features>

## Enable configuration features

You enable configuration features as you define the [steps](/docs/projects/steps/index.md) in your [deployment process](/docs/projects/deployment-process/).

1. If the step you are defining has configuration features available, there is a **CONFIGURE FEATURES** link. Click the link.
1. Select the features you would like to enable by clicking the relevant check-boxes in the list and click **OK**.

![Configuration features screenshot](images/configuration-features.png "width=500")

The features you have enabled will now be available in the **Features** section of the step you are defining.

You can configure the following features:

- [Custom installation directory](/docs/projects/steps/configuration-features/custom-installation-directory.md)
- [IIS web site and application pool](/docs/projects/steps/configuration-features/iis-website-and-application-pool.md)
- [Windows Service](/docs/projects/steps/configuration-features/windows-services.md)
- [Custom deployment scripts](/docs/deployments/custom-scripts/)
- [Structured configuration variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature.md)
- [Configuration variables](/docs/projects/steps/configuration-features/xml-configuration-variables-feature.md)
- [.NET Configuration transforms](/docs/projects/steps/configuration-features/configuration-transforms/)
- [Substitute variables in templates](/docs/projects/steps/configuration-features/substitute-variables-in-templates.md)
- IIS6+ Home directory
- [NGINX Web Server](/docs/projects/steps/configuration-features/nginx-web-server.md)
- Red Gate database deployment

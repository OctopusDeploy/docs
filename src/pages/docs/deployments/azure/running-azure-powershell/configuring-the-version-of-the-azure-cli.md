---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Configuring the version of the Azure CLI
description: A version of Azure CLI is bundled with Octopus Deploy and it's possible to configure which version you wish to use in your deployments.
---

:::warning
Using the Azure tools bundled with Octopus Deploy is not recommended. Octopus bundles versions of the Azure Resource Manager Powershell modules (AzureRM) and Azure CLI. These were originally provided as convenience mechanisms for users wanting to run scripts against Azure targets. The versions bundled are now out of date, and we will not be updating them further.
:::

We recommend you configure Octopus Deploy to use your own version of the Azure CLI.

To determine the version of the bundled CLI is installed on your worker, add the command below to an Azure Script Step:

```powershell
az --version
```

If you wish to use a different version, you can install the Azure CLI on your worker, and configure Octopus to use the installed version.

To be compatible with Octopus's automated Azure CLI login behavior, the Azure CLI version you install must be 2.0 or above.

The procedure to configure this differs depending on which version of Octopus Deploy you are using:

## Octopus 2020.1 or newer {#ConfiguringtheversionoftheAzurePowerShellmodules-Octopus2020.1(ornewer)}

The Azure Script step has an option called "Azure Tools". Toggle the setting to **Use Azure Tools pre-installed on the worker** if it is not already selected.

## Octopus 2018.5.5 to 2019.13.7 {#ConfiguringtheversionoftheAzurePowerShellmodules-Octopus2018.5.5-to-2019.13.7}

Create a [variable](/docs/projects/variables/) named **OctopusUseBundledAzureCLI** and set its value to **False**.

With this value set, Octopus Deploy will not load the bundled Azure CLI.

If you need to disable the Azure CLI altogether due to errors or the added time to login to the CLI, use **OctopusDisableAzureCLI** and set its value to **True**.

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).

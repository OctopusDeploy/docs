---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Configuring the version of the Azure PowerShell Modules
description: A version of Azure PowerShell is bundled with Octopus Deploy and it's possible to configure which version you wish to use in your deployments.
---

:::warning
Using the Azure tools bundled with Octopus Deploy is not recommended. Octopus bundles versions of the Azure Resource Manager Powershell modules (AzureRM) and Azure CLI. These were originally provided as convenience mechanisms for users wanting to run scripts against Azure targets. The versions bundled are now out of date, and we will not be updating them further.
:::

We recommend you configure Octopus Deploy to use your own version of the Azure PowerShell cmdlets.

To determine the versions of the various Azure modules that are present on your worker, add the PowerShell below to an Azure Script Step:

**AzureRM Module Versions**

```powershell
Get-Module -ListAvailable -Name Azure*
```

**Az Module Versions**

```powershell
Get-Module -ListAvailable -Name Az*
```

If you wish to use a different version, you can install the Azure PowerShell modules on your worker, and configure Octopus to use those modules. The procedure to configure Octopus to use the installed modules differs depending on which version you are using:

## Octopus 2020.1 or newer {#ConfiguringtheversionoftheAzurePowerShellmodules-Octopus2020.1(ornewer)}

The Azure Script step has an option called "Azure Tools". Toggle the setting to **Use Azure Tools pre-installed on the worker** if it is not already selected.

## Octopus 2018.5.5 to 2019.13.7 {#ConfiguringtheversionoftheAzurePowerShellmodules-Octopus2018.5.5-to-2019.13.7}

We made this configurable by variables in **Octopus 2018.5.5** to be more flexible. Create a [variable](/docs/projects/variables/index.md) named **OctopusUseBundledAzureModules** and set its value to **False**.

With this value set, Octopus Deploy will not load the bundled Azure PowerShell modules, and PowerShell will automatically load the Azure modules installed on the Octopus Server.

Now Octopus will attempt to load these modules when executing an Azure step, rather than the version bundled with Octopus.

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).

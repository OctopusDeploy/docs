---
title: Configuring the version of the Azure PowerShell CLI
description: A version of Azure PowerShell CLI is bundled with Octopus Deploy and it's possible to configure which version you wish to use in your deployments.
---

A version of [Azure PowerShell CLI](https://docs.microsoft.com/cli/azure/) is bundled with Octopus Deploy.  To determine the version of the bundled CLI, add the PowerShell below to an Azure PowerShell Script Step:

```powershell
az --version
```

If you wish to use a different version, you can install the Azure PowerShell CLI on your Octopus Server, and configure Octopus to use the installed version instead. 

The procedure to configure this differs depending on which version of Octopus Deploy you are using:

## Octopus 2020.1 or newer {#ConfiguringtheversionoftheAzurePowerShellmodules-Octopus2020.1(ornewer)}

Within the PowerShell Azure step, is an option called "Azure Tools". Toggle the setting to **Use Azure Tools pre-installed on the worker**.

## Octopus 2018.5.5 to 2019.13.7 {#ConfiguringtheversionoftheAzurePowerShellmodules-Octopus2018.5.5-to-2019.13.7}

Create a [variable](/docs/projects/variables/index.md) named **OctopusUseBundledAzureCLI** and set its value to **False**.

With this value set, Octopus Deploy will not load the bundled Azure PowerShell CLI.


If you need to disable the Azure CLI altogether due to errors or the added time to login to the CLI, use **OctopusDisableAzureCLI** and set its value to **True**.

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).

---
title: Configuring the Version of the Azure PowerShell CLI
description: A version of Azure PowerShell CLI is bundled with Octopus Deploy and it's possible to configure which version you wish to use in your deployments.
---

A version of [Azure PowerShell CLI](https://docs.microsoft.com/cli/azure/) is bundled with Octopus Deploy.  To determine the version of the bundled CLI, add the PowerShell below to an Azure PowerShell Script Step:

```powershell
az --version
```

If you wish to use a different version, you can install the Azure PowerShell CLI on your Octopus Server, and configure Octopus to use the installed version instead. 

To do this, create a [variable](/docs/deployment-process/variables/index.md) named **OctopusUseBundledAzureCLI** and set its value to **False**.

With this value set, Octopus Deploy will not load the bundled Azure PowerShell CLI.


If you need to disable the Azure CLI altogether due to errors or the added time to login to the CLI, use **OctopusDisableAzureCLI** and set its value to **True**.
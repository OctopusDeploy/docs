---
title: Configuring the Version of the Azure PowerShell Modules
description: A version of Azure PowerShell is bundled with Octopus Deploy and it's possible to configure which version you wish to use in your deployments.
---

A version of Azure PowerShell is bundled with Octopus Deploy.  To determine the versions of the various Azure modules, add the PowerShell below to an Azure PowerShell Script Step:

**Azure Module Versions**

```powershell
Get-Module -ListAvailable -Name Azure*
```

If you wish to use a different version, you can install the Azure PowerShell modules on your Octopus Server, and configure Octopus to use the installed version.  The procedure to configure this differs depending on which version of Octopus Deploy you are using:

## Octopus 2018.5.5 (Or Newer) {#ConfiguringtheversionoftheAzurePowerShellmodules-Octopus2018.5.5(ornewer)}

We made this configurable by variables in **Octopus 2018.5.5** to be more flexible. Create a [variable](/docs/deployment-process/variables/index.md) named **OctopusUseBundledAzureModules** and set its value to **False**.

With this value set, Octopus Deploy will not load the bundled Azure PowerShell modules, and PowerShell will automatically load the Azure modules installed on the Octopus Server.

Now Octopus will attempt to load these modules when executing an Azure step, rather than the version bundled with Octopus.

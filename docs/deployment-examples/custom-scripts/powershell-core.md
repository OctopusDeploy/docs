---
title: PowerShell Core
description: Enabling PowerShell Core.
position: 109
---

In Octopus Version `2019.10.0` we released support for PowerShell Core. This feature will allow you to execute your PowerShell scripts on Linux deployment targets with PowerShell Core installed. When executing a PowerShell script as a part of a step, you can now specify whether Octopus should use Windows PowerShell or PowerShell Core during Windows deployments. For information on how this affects proxy configuration, [see here](/docs/infrastructure/deployment-targets/proxy-support.md#powershell-core-scripts).

:::hint
**My Windows target can not find my PowerShell Core installation**
If you have picked a non-default location for your PowerShell Core installation, then ensure that `pwsh.exe` is available on your `Path` Environment Variable.
:::

You can enable the option to select PowerShell Core from the Configure Features button on a step in your deployment.

![custom feature](images/customfeature.png)

Enabling this feature will give you the option to use PowerShell Core to execute your PowerShell scripts. By default, Octopus will execute your PowerShell scripts using Windows PowerShell.

![powershellcore](images/powershellcore.png)

## PowerShell Core on Linux targets

You will first need to ensure that the `pwsh` executable is available on your `$PATH` before Octopus can use it.

This feature allows you to run your PowerShell scripts against Linux targets with PowerShell Core installed. However, there are some things to keep in mind.

If your package contains both `.ps1` & `.sh` scripts and you are deploying to a non-Windows target, Octopus will attempt to execute both scripts. This may cause some unexpected behavior depending on the script, so ensure that your package only contains a single copy of your deployment scripts.

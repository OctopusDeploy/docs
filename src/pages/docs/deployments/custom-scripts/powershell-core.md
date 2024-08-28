---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: PowerShell Core
description: Enabling PowerShell Core.
icon: fa-regular fa-file-code
navOrder: 109
---

This feature will allow you to execute your PowerShell scripts on Linux deployment targets with PowerShell Core installed. When executing a PowerShell script as a part of a step, you can now specify whether Octopus should use Windows PowerShell or PowerShell Core during Windows deployments. For information on how this affects proxy configuration, [see here](/docs/infrastructure/deployment-targets/proxy-support/#powershell-core-scripts).

:::div{.hint}
**Non-default install location**
If your deployment target or Worker is running Windows and Octopus can't find the PowerShell Core installation, check the install location.
If you have picked a non-default location for your PowerShell Core installation, then ensure that `pwsh.exe` is available on your `Path` Environment Variable.
:::

You can enable the option to select PowerShell Core from the Configure Features button on a step in your deployment.

:::figure
![custom feature](/docs/deployments/custom-scripts/images/customfeature.png)
:::

Enabling this feature will give you the option to use PowerShell Core to execute your PowerShell scripts. By default, Octopus will execute your PowerShell scripts using Windows PowerShell.

:::figure
![Select PowerShell edition](/docs/deployments/custom-scripts/images/powershellcore.png)
:::

## PowerShell Core on Linux targets

You will first need to ensure that the `pwsh` executable is available on your `$PATH` before Octopus can use it.

This feature allows you to run your PowerShell scripts against Linux targets with PowerShell Core installed. However, there are some things to keep in mind.

:::div{.warning}
If your package contains both `.ps1` & `.sh` scripts and you are deploying to a non-Windows target, Octopus will attempt to execute both scripts. This may cause some unexpected behavior depending on the script, so ensure that your package only contains a single copy of your deployment scripts.
:::

## Older versions

Support for PowerShell Core was added in In Octopus version **2019.10.0**. Versions prior to this only support Windows PowerShell (Desktop).

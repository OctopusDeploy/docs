---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Tentacle installation requirements
description: Software and hardware requirements for installing the latest version of Tentacle.
navOrder: 10
hideInThisSection: true
---

If you're using a version prior to **Tentacle 3.1**, refer to the [installation requirements for older versions of Tentacle](/docs/infrastructure/deployment-targets/tentacle/windows/requirements/legacy-requirements.md).

The installation requirements for the latest version of Tentacle are:

## Windows Server

-  Windows Server 2012
-  Windows Server 2012 R2 
-  Windows Server 2016 (Both "Server Core" and "Server with a GUI" installations are supported for Tentacle).
-  Windows Server 2019 
-  Windows Server 2022

:::warning
Octopus does not actively test against Windows 2008 nor Windows 2008 R2. Certain operating system specific issues may not be fixed as [Microsoft no longer supports Windows 2008](https://docs.microsoft.com/en-us/lifecycle/products/windows-server-2008) nor [Windows 2008R2](https://docs.microsoft.com/en-us/lifecycle/products/windows-server-2008-r2).
:::

## .NET Framework

The table below outlines the **minimum** required version of .NET Framework for Tentacle **3.1** and higher.

| Tentacle       | .NET Framework version |
| -------------- | ---------------------- | 
| 3.1 -> 4.0.7   | 4.5.1+ ([download](https://dotnet.microsoft.com/download/dotnet-framework/thank-you/net451-web-installer)) |
| 5.0 -> 6.2.277 | 4.5.2+ ([download](https://dotnet.microsoft.com/download/dotnet-framework/thank-you/net452-web-installer)) |
| 6.3 -> latest  | 4.8+ ([download](https://dotnet.microsoft.com/download/dotnet-framework/thank-you/net48-web-installer)) |


## Windows PowerShell

- Windows PowerShell 2.0. This is automatically installed on 2008 R2.
- Windows PowerShell 3.0 or 4.0 is recommended, both of which are compatible with PowerShell 2.0, but execute against .NET 4.0+.
- Windows PowerShell 5.1 is required to run Azure steps

## Hardware requirements

- Hardware minimum: 512MB RAM, 1GHz CPU, 2GB free disk space.

Tentacle uses a small amount of memory when idle, usually around 10MB (it may appear higher in task manager because memory is shared with other .NET processes that are running). When deploying, depending on what happens during the deployment, this may expand to 60-100MB, and will then go back down after the deployment is complete. Tentacle will happily run on single-core machines, and only uses about 100MB of disk space, though, of course, you'll need more than that to deploy your applications.

!include <tentacle-downloads>

## Python
Octopus can run Python scripts on Windows targets provided the following criteria are met:

- Python version 3.4+ is installed
- `Python` is on the path for the user that Tentacle is running as
- pip is installed or the pycryptodome python package is installed

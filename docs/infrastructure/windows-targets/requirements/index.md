---
title: Tentacle Installation Requirements
description: Software and hardware requirements for installing the latest version of Tentacle.
position: 10
---

If you're using a version prior to Tentacle 3.1, refer to the [installation requirements for older versions of Tentacle](/docs/infrastructure/windows-targets/requirements/legacy-requirements.md).

The installation requirements for the latest version of Tentacle are:

## Windows Server

-  Windows Server 2008 R2
-  Windows Server 2012
-  Windows Server 2012 R2 
-  Windows Server 2016 (Both "Server Core" and "Server with a GUI" installations are supported for Tentacle).

## .NET Framework.

- Tentacle 3.1+ (TLS 1.0 or 1.2): .NET Framework 4.5+ ([download](http://www.microsoft.com/en-au/download/details.aspx?id=42643)).

## Windows PowerShell

- Windows PowerShell 2.0. This is automatically installed on 2008 R2.
- Windows PowerShell 3.0 or 4.0 is recommended, both of which are compatible with PowerShell 2.0, but execute against .NET 4.0+.

## Hardware Requirements

- Hardware minimum: 512MB RAM, 1GHz CPU, 2GB free disk space.

Tentacle uses a small amount of memory when idle, usually around 10MB (it may appear higher in task manager because memory is shared with other .NET processes that are running). When deploying, depending on what happens during the deployment, this may expand to 60-100MB, and will then go back down after the deployment is complete. Tentacle will happily run on single-core machines, and only uses about 100MB of disk space, though of course you'll need more than that to deploy your applications.

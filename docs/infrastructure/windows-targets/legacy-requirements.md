---
title: Legacy Tentacle Installation Requirements
description: Software and hardware requirements for installing legacy versions of Tentacles.
position: 1
---

These are the installation requirements for Tentacles prior to Tentacle version 3.1.

### Windows Server

- Windows Server 2003 SP2 (**N.B. Not supported for Tentacle 3.1 and up due to .NET 4.5 dependency**)
-  Windows Server 2008 (**N.B. SP1 not supported for Tentacle 3.1 and up due to .NET 4.5 dependency**)
-  Windows Server 2008 R2
-  Windows Server 2012
-  Windows Server 2012 R2 
-  Windows Server 2016 (Both "Server Core" and "Server with a GUI" installations are supported for Tentacle).

### .NET Framework

- Tentacle 3.0 (TLS 1.0): .NET Framework 4.0+ ([download](http://www.microsoft.com/en-au/download/details.aspx?id=17851)).
- Tentacle 3.1+ (TLS 1.0 or 1.2): .NET Framework 4.5+ ([download](http://www.microsoft.com/en-au/download/details.aspx?id=42643)).

### Windows PowerShell

- Windows PowerShell 2.0. This is automatically installed on 2008 R2, but for 2008 pre-R2 you'll need to install it ([x86 download](http://www.microsoft.com/download/en/details.aspx?id=11829&amp;__hstc=254453975.06c54f702f3aed3215f4224e6b75b56f.1380851265147.1386910090621.1387188601891.78&amp;__hssc=254453975.2.1387188601891&amp;__hsfp=4151299608), [x64 download](http://www.microsoft.com/download/en/details.aspx?displaylang=en&amp;id=20430&amp;__hstc=254453975.06c54f702f3aed3215f4224e6b75b56f.1380851265147.1386910090621.1387188601891.78&amp;__hssc=254453975.2.1387188601891&amp;__hsfp=4151299608)).
- Windows PowerShell 3.0 or 4.0 is recommended, both of which are compatible with PowerShell 2.0, but execute against .NET 4.0+.
- Windows Server 2003 servers will need [Windows Management Framework](http://support.microsoft.com/kb/968930?__hstc=254453975.06c54f702f3aed3215f4224e6b75b56f.1380851265147.1386910090621.1387188601891.78&amp;__hssc=254453975.2.1387188601891&amp;__hsfp=4151299608) installed (this includes PowerShell).

### Hardware Requirements

- Hardware minimum: 512MB RAM, 1GHz CPU, 2GB free disk space.

Tentacle uses a small amount of memory when idle, usually around 10MB (it may appear higher in task manager because memory is shared with other .NET processes that are running). When deploying, depending on what happens during the deployment, this may expand to 60-100MB, and will then go back down after the deployment is complete. Tentacle will happily run on single-core machines, and only uses about 100MB of disk space, though of course you'll need more than that to deploy your applications.

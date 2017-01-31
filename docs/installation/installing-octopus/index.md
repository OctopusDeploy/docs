---
title: Installing Octopus
position: 0
---

The Octopus Deploy Server is software that you download and install on one of your own servers, just like you would install Microsoft SQL Server. The Octopus Deploy Server:

- runs as a Windows Service
- stores its data in a [SQL Server database](/docs/administration/octopus-database/index.md)
- has an embedded HTTP server which presents the main Octopus user interface (the **Octopus Web Portal**)

## Requirements {#InstallingOctopus-Requirements}

Your Octopus Deploy server requires:

- Windows Server 2008 SP2+, 2008 R2, 2012, 2012 R2 or 2016 ("Server with a GUI" install, not Server Core)
- .NET Framework 4.5+ ([download](https://www.microsoft.com/en-au/download/details.aspx?id=30653))
- .NET Framework 4.5.1+ for Octopus Server 3.4.0 and later
- SQL Server installed locally or on another server, or Microsoft Azure SQL Database ([more details](/docs/installation/installing-octopus/sql-server-database-requirements.md))
- Hardware:
- Absolute minimum to make it run: 512MB RAM, 1GHz CPU, 2GB free disk space
- Recommended for smaller deployments (less than 30 Tentacles for example): 2GB RAM, dual-core CPU, 10GB free disk space
- Recommended for larger deployments: 4GB RAM, dual-core, 20GB free disk space

## Installation {#InstallingOctopus-Installation}

:::success
**Download the Octopus Deploy MSI**
The latest Octopus Deploy MSI can always be [downloaded from the Octopus Deploy downloads page](https://octopus.com/downloads).

Alternatively you can download the latest stable builds directly for one of our products via links to [OctopusServer x64](https://octopus.com/downloads/latest/WindowsX64/OctopusServer), [OctopusServer 32-bit/x86](https://octopus.com/downloads/latest/WindowsX86/OctopusServer), [OctopusTentacle x64](https://octopus.com/downloads/latest/WindowsX64/OctopusTentacle), [OctopusTentacle 32-bit/x86](https://octopus.com/downloads/latest/WindowsX86/OctopusTentacle), [Hydra](https://octopus.com/downloads/latest/Hydra), [CommandLineTools](https://octopus.com/downloads/latest/CommandLineTools) or the [TeamCityPlugin](https://octopus.com/downloads/latest/TeamCityPlugin)
:::

This three minute video  will walk you through the installation process:
<script charset="ISO-8859-1" src="//fast.wistia.com/assets/external/E-v1.js" async></script>
<div class="wistia_embed wistia_async_fsxoijvtvm" style="height:360px;width:640px"/>

### Using a Managed Service Account (MSA) {#InstallingOctopus-UsingaManagedServiceAccount(MSA)}

You can run the Octopus Server using a Managed Service Account (MSA):

1. Install the Octopus Server and make sure it is running correctly using one of the built-in Windows Service accounts or a Custom Account
2. Reconfigure the Octopus Server Windows Service to use the MSA, either manually using the Service snap-in, or using `sc.exe config &quot;OctopusDeploy&quot; obj= Domain\Username$`
3. Restart the Octopus Server Windows Service

Learn about [using Managed Service Accounts](https://technet.microsoft.com/en-us/library/dd548356(v=ws.10).aspx).

## Troubleshooting {#InstallingOctopus-Troubleshooting}

In a few cases a bug in a 3rd party component causes the installer displays a "Installation directory must be on a local hard drive" error. If this occurs, running the install again from an elevated command prompt using the following command (replacing Octopus.3.3.4-x64.msi with the name of the installer you are using)

`msiexec /i Octopus.3.3.4-x64.msi WIXUI_DONTVALIDATEPATH=&quot;1&quot;`

:::warning
**Deploying applications to an Azure website?**
If you get the following error it means you have a local copy of Web Deploy and that is being used. You will either need to upgrade your local version of Web Deploy to 3.5 or greater, or uninstall the local copy so Octopus can reference the embedded copy.
:::

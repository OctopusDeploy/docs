---
title: Installation
position: 0
description: How to install the central Octopus Deploy server.
---

The Octopus Deploy server:

- Runs as a Windows Service.
- Stores its data in a [SQL Server database](/docs/administration/octopus-database/index.md).
- Has an embedded HTTP server which serves the [Octopus REST API](/docs/api-and-integration/octopus-rest-api.md) and the  **Octopus Web Portal** that you will use to manage your deployments.

## Upgrading {#Installation-Upgrading}

If Octopus is already installed, and you want to upgrade to a new version, please follow the steps in the [upgrade guide](/docs/administration/upgrading/index.md).

## Requirements {#InstallingOctopus-Requirements}

To successfully install the Octopus server you need:

- Any of the following Windows servers:
	- Windows Server 2008 SP2
	- Windows Server 2008 R2
	- Windows Server 2012
	- Windows Server 2012 R2
	- Windows Server 2016
- .NET Framework:
	- Octopus 3.0.0 - 3.3.27 requires [.NET Framework 4.5](https://www.microsoft.com/en-au/download/details.aspx?id=30653) or newer.
	- Octopus 3.4 onward requires [.NET Framework 4.5.1](https://www.microsoft.com/en-au/download/details.aspx?id=40773) or newer.
- A Microsoft SQL Server instance which can be accessed by your Octopus Server ([more details](/docs/installation/sql-server-database-requirements.md)).

### Windows Server Core

Whilst Octopus Server will run on "Windows Server Core", the easiest installation path is to use "Windows Server with a GUI" and run our installation wizard. If you want to use "Windows Server Core" you will need to add some missing Windows Features and configure Octopus server yourself. Learn about [automating installation](/docs/installation/automating-installation.md).

### Hardware Requirements

There is no "one size fits all" approach for Octopus server. The best approach is to start with a working Octopus server, start deploying your applications, monitor your server statistics, and scale from there.

- Absolute minimum to make it run: 512MB RAM, 1GHz CPU, 2GB free disk space.
- Recommended starting point for smaller deployments (less than 30 deployment targets for example): 2GB RAM, dual-core CPU, 10GB free disk space.
- Recommended starting point for larger deployments: 4GB RAM, dual-core, 20GB free disk space.

Learn about [Octopus Server performance](/docs/administration/performance.md).

## Downloads

The latest Octopus Deploy MSI can always be [downloaded from the Octopus Deploy downloads page](https://octopus.com/downloads). You can also download any [previous releases](https://octopus.com/downloads/previous) from our archive.
### Download Permalinks

If you are writing a script or utility to automatically download the latest version of one of our products, you can use the following permanent links:
 
 - [OctopusServer x64](https://octopus.com/downloads/latest/WindowsX64/OctopusServer)
 - [OctopusServer 32-bit/x86](https://octopus.com/downloads/latest/WindowsX86/OctopusServer)
 - [OctopusTentacle x64](https://octopus.com/downloads/latest/WindowsX64/OctopusTentacle) 
 - [OctopusTentacle 32-bit/x86](https://octopus.com/downloads/latest/WindowsX86/OctopusTentacle)
 - [CommandLineTools](https://octopus.com/downloads/latest/CommandLineTools) 
 - [TeamCityPlugin](https://octopus.com/downloads/latest/TeamCityPlugin)

## Installation {#InstallingOctopus-Installation}

This three minute video will walk you through the installation process:

<iframe src="//fast.wistia.net/embed/iframe/fsxoijvtvm" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" oallowfullscreen="" msallowfullscreen="" width="640" height="360" style="margin: 30px"></iframe>

### Using a Managed Service Account (MSA) {#InstallingOctopus-UsingaManagedServiceAccount(MSA)}

You can run the Octopus Server using a Managed Service Account (MSA):

1. Install the Octopus Server and make sure it is running correctly using one of the built-in Windows Service accounts or a Custom Account.
1. Reconfigure the Octopus Server Windows Service to use the MSA, either manually using the Service snap-in, or using `sc.exe config "OctopusDeploy" obj= Domain\Username$`
1. Restart the Octopus Server Windows Service.

Learn about [using Managed Service Accounts](https://technet.microsoft.com/en-us/library/dd548356(v=ws.10).aspx).

## Troubleshooting {#InstallingOctopus-Troubleshooting}

In a few cases a bug in a 3rd party component causes the installer to display an "Installation directory must be on a local hard drive" error. If this occurs, run the install again from an elevated command prompt using the following command (replacing Octopus.3.3.4-x64.msi with the name of the installer you are using):

`msiexec /i Octopus.3.3.4-x64.msi WIXUI_DONTVALIDATEPATH="1"`

:::warning
**Deploying applications to an Azure website?**
If you get the following error it means you have a local copy of Web Deploy and that is being used. You will either need to upgrade your local version of Web Deploy to 3.5 or greater, or uninstall the local copy so Octopus can reference the embedded copy.
:::

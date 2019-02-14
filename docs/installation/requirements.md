---
title: Installation Requirements
description: Software and hardware requirements for installing the central Octopus Deploy Server.
position: 1
---

If you are hosting your Octopus Deploy server yourself, these are the minimum requirements.

## Operating System

The Octopus Deploy server is hosted on a Microsoft Windows operating system, however, once your Octopus Deploy server is up and running, you can deploy to Windows servers, Linux servers, Microsoft Azure, AWS, Cloud Regions, or even an Offline Package Drop.

## Windows Server

Octopus Deploy server can be hosted on any modern Windows Server. We automatically test the Octopus Deploy server on the following versions of Windows Server:

- Windows Server 2008 SP2
- Windows Server 2008 R2
- Windows Server 2012
- Windows Server 2012 R2
- Windows Server 2016
- Windows Server 2019

Octopus Deploy server will run on the newer versions of Windows Server without GUIs, however, the easiest installation path is to use "Windows Server with a GUI" and run our installation wizard. If you want to use one of the new GUI-less servers, you will need to add some missing Windows Features and configure the Octopus server yourself.

Learn about [automating installation](/docs/installation/automating-installation.md).

## Windows Desktop

Octopus Deploy server will run on client/desktop versions of Windows, such as Windows 7 and Windows 10. This can be an easy way to trial Octopus Deploy server; however, we do not support Octopus server for production workloads unless it is hosted on a server operating system.

!include <sql>

Octopus works with a wide range of versions and editions of SQL Server, from a local SQL Server Express instance, all the way to an Enterprise Edition [SQL Server Failover Cluster](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server) or [SQL Server AlwaysOn Availability Group](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server), or even one of the hosted database-as-a-service offerings.

## .NET Framework

We try to keep the .NET Framework requirements for Octopus server as stable as possible:

- **Octopus 3.4** to **Octopus 2018.4.0** requires [.NET Framework 4.5.1](https://www.microsoft.com/en-au/download/details.aspx?id=40773) or newer.
- **Octopus 2018.5.0** and later requires [.NET Framework 4.5.2](https://www.microsoft.com/en-au/download/details.aspx?id=42642) or newer and [WMF/PowerShell 5.0](https://www.microsoft.com/en-us/download/details.aspx?id=50395) or newer.

## Supported Browsers {#supported-browsers}

The Octopus server comes with a built-in web portal user interface and we try to keep this as stable as possible:

- **Octopus 3.0** to **Octopus 3.17** supports all modern browsers and Internet Explorer 9+.
- **Octopus 4.0** and later supports all modern browsers, and Internet Explorer 11+ (available on Windows 7 and newer, and Windows Server 2008R2 SP1 and newer).

## Hardware Requirements

There is no *one size fits all* approach for Octopus server. The best approach is to start with a working Octopus server, start deploying your applications, monitor your server statistics, and scale from there.

- Absolute minimum to make it run: 512MB RAM, 1GHz CPU, 2GB free disk space.
- Recommended starting point for smaller deployments (less than 30 deployment targets for example): 2GB RAM, dual-core CPU, 10GB free disk space.
- Recommended starting point for larger deployments: 4GB RAM, dual-core, 20GB free disk space.

## Next

Learn about the [SQL Server database](/docs/installation/sql-server-database.md), download the [Octopus MSI](/docs/installation/downloads.md), learn more about [Octopus server performance](/docs/administration/managing-infrastructure/performance/index.md), or return to the [installation process](/docs/installation/index.md).

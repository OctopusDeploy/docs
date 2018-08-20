---
title: Installation Requirements
description: Software and hardware requirements for installing the central Octopus Deploy Server.
position: 1
---

If you are hosting Octopus Server yourself, here are the set of minimum requirements.

## Operating System

At the moment, the Octopus Server itself must be hosted on a Microsoft Windows operating system. Once your Octopus Server is up and running, you can deploy to almost anything imaginable.

### Windows Server

Octopus Server can be hosted on any modern Windows Server. We automatically test Octopus Server on the following versions of Windows Server:

- Windows Server 2008 SP2
- Windows Server 2008 R2
- Windows Server 2012
- Windows Server 2012 R2
- Windows Server 2016

Octopus Server will run on `Windows Server Core` and `Windows Server version 1709` etc. However, the easiest installation path is to use "Windows Server with a GUI" and run our installation wizard. If you want to use one of the new GUI-less servers, you will need to add some missing Windows Features and configure Octopus Server yourself.

Learn about [automating installation](/docs/installation/automating-installation.md).

### Windows Desktop

Octopus Server will run on client/desktop versions of Windows, like Windows 7 and Windows 10. This can be a nice easy way to trial Octopus Server, however we do not support Octopus Server for production workloads unless it is hosted on a server operating system.

!include <sql>

Octopus works with a wide range of versions and editions of SQL Server, from a local SQL Server Express instance, all the way to an Enterprise Edition [SQL Server Failover Cluster](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server) or [SQL Server AlwaysOn Availability Group](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server), or even one of the hosted database-as-a-service offerings.

## .NET Framework

We try to keep the .NET Framework requirements for Octopus Server as stable as possible:

- **Octopus 3.4** - **Octopus 2018.4.0** requires [.NET Framework 4.5.1](https://www.microsoft.com/en-au/download/details.aspx?id=40773) or newer.
- **Octopus 2018.5.0** and onwards requires [.NET Framework 4.5.2](https://www.microsoft.com/en-au/download/details.aspx?id=42642) or newer and [WMF/PowerShell 5.0](https://www.microsoft.com/en-us/download/details.aspx?id=50395) or newer.

## Supported Browsers {#supported-browsers}

The Octopus Server comes with a built-in web portal user interface and we try to keep this as stable as possible:

- **Octopus 3.0** - **Octopus 3.17** supports all modern browsers, and Internet Explorer 9+
- **Octopus  4.0** and onwards supports all modern browsers, and Internet Explorer 11+ (available on Windows 7 and newer, and Windows Server 2008R2 SP1 and newer)

## Hardware Requirements

There is no "one size fits all" approach for Octopus Server. The best approach is to start with a working Octopus Server, start deploying your applications, monitor your server statistics, and scale from there.

- Absolute minimum to make it run: 512MB RAM, 1GHz CPU, 2GB free disk space.
- Recommended starting point for smaller deployments (less than 30 deployment targets for example): 2GB RAM, dual-core CPU, 10GB free disk space.
- Recommended starting point for larger deployments: 4GB RAM, dual-core, 20GB free disk space.

Learn about [Octopus Server performance](/docs/administration/performance.md).

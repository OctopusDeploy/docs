---
title: Installation Requirements
description: Software and hardware requirements for installing the central Octopus Deploy Server.
position: 1
---
To successfully install the Octopus Deploy server you need:

## .NET Framework:

Octopus 3.4 onward requires [.NET Framework 4.5.1](https://www.microsoft.com/en-au/download/details.aspx?id=40773) or newer.

## Windows Server:

Any of the following Windows Servers:

	* Windows Server 2008 SP2
	* Windows Server 2008 R2
	* Windows Server 2012
	* Windows Server 2012 R2
	* Windows Server 2016

Octopus Server will run on "Windows Server Core”; however, the easiest installation path is to use "Windows Server with a GUI" and run our installation wizard. If you want to use "Windows Server Core" you will need to add some missing Windows Features and configure Octopus server yourself.

Learn about [automating installation](/docs/installation/automating-installation.md).

## SQL Server Database

The following versions of SQL Server Database are supported and automatically tested against every release of Octopus Deploy server:

    * SQL Server 2008
    * SQL Server 2008 R2
    * SQL Server 2012
    * SQL Server 2014
    * SQL Server 2016

Supported editions:

    * Express (free)
    * Web
    * Datacenter
    * Standard
    * Enterprise
- Microsoft Azure SQL Database
- AWS RDS SQL Database

Octopus works with a wide range of versions and editions of SQL Server, from a local SQL Server Express instance, all the way to an Enterprise Edition [SQL Server Failover Cluster](https://docs.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server) or [SQL Server AlwaysOn Availability Group](https://docs.microsoft.com/en-us/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server), or even one of the hosted database-as-a-service offerings.

## Hardware Requirements

There is no "one size fits all" approach for Octopus server. The best approach is to start with a working Octopus server, start deploying your applications, monitor your server statistics, and scale from there.

- Absolute minimum to make it run: 512MB RAM, 1GHz CPU, 2GB free disk space.
- Recommended starting point for smaller deployments (less than 30 deployment targets for example): 2GB RAM, dual-core CPU, 10GB free disk space.
- Recommended starting point for larger deployments: 4GB RAM, dual-core, 20GB free disk space.

Learn about [Octopus Server performance](/docs/administration/performance.md).

---
title: SQL Server DACPAC deployment
description: How to do database deployments with DACPAC.
position: 
---

One of the most complex aspects of full stack deployments is automating database changes.  There are two schools of thought in how changes should be implemented; state-based and migration-based.  The state-based approach captures the state of the database and uses that to compare against the target.  Differences are automatically scripted out and applied to the target so it matches the given state.  The migration-based approach starts with an intial script to define your database, then uses versioned scripts applied in sequence to migrate the database over time.

## Microsoft Data-tier application package (DACPAC)
Starting with SQL Server 2008, Microsoft introduced a new project type called Database Projects.  These projects use the state-based approach to applying changes to your database.  Initially, Visual Studio were not available as part of the initial install and had to be downloaded separately. This download was referred to as SQL Server Data Tools (SSDT) and included project types for Database projects, SQL Server Reporting Services (SSRS) projects, and SQL Server Integration Services (SSIS) projects.  Modern versions of Visual Studio has this available to choose when installing.

### Installing SSDT for Visual Studio
For earlier versions of Visual Studio such as 2015 and below, installing the SSDT was a matter of locating the download for your version of Visual Studio.  Microsoft has provided a convenient way of finding the appropriate download on [this page](https://docs.microsoft.com/en-us/sql/ssdt/previous-releases-of-sql-server-data-tools-ssdt-and-ssdt-bi?view=sql-server-ver15).

For more modern versions of Visual Studio (2017+), the option appears on the project type selection screen during intial installation or when modifying an existing installation.


---
title: Permissions required for the Octopus windows service
position: 1
---


When you install the Octopus Deploy server, you'll be asked whether Octopus should run as the Local System account, or as a custom user. It's a good practice to set up a dedicated user account for the Octopus server.


Keep in mind that the user principal that the Octopus service runs as needs to be able to do many things:

1. Run as a service ("Log on as a service" rights), so that the service can start
2. Read and write the Octopus SQL Server database. If the SQL database is on another server, this is a good reason to use a custom user account.
3. Read and write from the registry and file system (details below)
4. Read any NuGet feeds that use local folders or file shares



The following table acts as a guide for the minimal permission set that Octopus must have for successful operation:

| Permission | Object | Reason | Applied with |
| --- | --- | --- | --- |
| Full control | The Octopus "Home" folder, e.g. `C:\Octopus` | Octopus stores logs, temporary data, and dynamic configuration in this folder | Windows Explorer |
| Read | The directory Octopus was installed to (typically C:\Program Files\Octopus Deploy) | Octopus needs these files in order to run | Windows Explorer |
| Read | The `HLKM\Software\Octopus`registry key | Octopus determines the location of its configuration files from this key | Regedit |
| Full control | The `OctopusDeploy` Windows Service | Octopus must be able to upgrade and restart itself for remote administration | SC.EXE |
| Listen | Port **10943** | Octopus accepts commands from polling Tentacles on this port | NETSH.EXE |
| db\_owner | For the SQL database. [Learn more](/docs/home/installation/installing-octopus/sql-server-database-requirements.md). | Octopus needs to be able to manage its database, including making schema changes | SQL Server Management Studio |


If you rely on Octopus to run certain tasks on the Octopus server, you'll also need to grant appropriate permissions for these. Examples include:

- If you use the Windows Azure deployment tasks in Octopus, these run on the Octopus server

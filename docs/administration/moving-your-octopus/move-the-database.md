---
title: Moving the Octopus Server Database
description: Walkthrough outlining how you can move an Octopus database from one server to another.
position: 200
---

This page outlines our recommended steps to move your SQL database to another server, without moving your Octopus Server. The following is our advised approach to moving your Octopus database while retaining all of your data.

## Step-by-step Process
1. Place your Octopus instance into [Maintenance Mode](/docs/administration/upgrading/maintenance-mode.md) and stop the service when all deployments have completed. You can stop the service via the Octopus Manager, or via the command line using the following command.
`Octopus.Server.exe service --stop`
2. Ensure you have saved a copy of your [master key](/docs/administration/security/data-encryption.md#Securityandencryption-YourMasterKey).
3. Take a backup of your Octopus database.
4. Restore the database on your new server.
5. On your original Octopus Server, run the following command to update the connection string (where "VALUE" is your connection string).
```
Octopus.Server.exe database --connectionString="VALUE"
```
:::hint
Ensure the user specified in the connection string has access to the database as a **dbo_owner**. Refer to our [SQL server database](/docs/installation/sql-server-database.md) documentation page.
:::

:::hint
When running the Octopus Deploy service as a Local System account, Windows Authentication can be used only if the SQL server instance is hosted on the same machine. To host SQL Server remotely, use SQL Server Authentication, or run the Octopus Deploy service as a custom account.
:::

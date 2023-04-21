---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Moving the Octopus Server database
description: Walk-through outlining how you can move an Octopus database from one server to another.
navOrder: 200
---

This page outlines our recommended steps to move your SQL database to another server, without moving your Octopus Server. The following is our advised approach to moving your Octopus database while retaining all of your data.

## Step-by-step process {#Movethedatabase-StepByStep}
1. Place your Octopus instance into [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode) and stop the service when all deployments have completed. You can stop the service via the Octopus Manager, or via the command line using the following command.
`Octopus.Server.exe service --stop`
2. Ensure you have saved a copy of your [Master Key](/docs/security/data-encryption/#Securityandencryption-YourMasterKey).
3. Take a backup of your Octopus database.
4. Restore the database on your new server.
5. On your Octopus Server, run the following command to update the connection string (where "VALUE" is your connection string).
```
Octopus.Server.exe database --connectionString="VALUE"
```
:::div{.hint}
**Database connection string tips**
- Ensure the user specified in the connection string has access to the database as a **dbo_owner**. Refer to our [SQL server database](/docs/installation/sql-server-database) documentation page.
- When running the Octopus Deploy service as a Local System account, Windows Authentication can be used only if the SQL server instance is hosted on the same machine. To host SQL Server remotely, use SQL Server Authentication, or run the Octopus Deploy service as a custom account.
:::

## Step-by-step process for Octopus HA {#Movethedatabase-StepByStepOctopusHA}

When you are using [Octopus High Availability](/docs/administration/high-availability) clusters, you should generally follow the same instructions as above, but repeat certain steps for each node.

1. Place your Octopus instance into [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode)
2. Toggle the [Drain](/docs/administration/high-availability/maintain/maintain-high-availability-nodes) option for each Octopus Server node in **Configuration ➜ Nodes**
3. Stop the service on each Octopus Server node when all deployments have completed. You can stop the service via the Octopus Manager, or via the command line using the following command.
`Octopus.Server.exe service --stop`
4. Ensure you have saved a copy of your [Master Key](/docs/security/data-encryption/#Securityandencryption-YourMasterKey).
5. Take a backup of your Octopus database.
6. Restore the database on your new server.
7. On each Octopus Server node, run the following command to update the connection string (where "VALUE" is your connection string).
```
Octopus.Server.exe database --connectionString="VALUE"
```
8. Start the service on each Octopus Server node. You can start the service via the Octopus Manager, or via the command line using the following command.
`Octopus.Server.exe service --start`
9. Disable the Node Drain option for each Octopus Server node in **Configuration ➜ Nodes**
10. Take your Octopus instance out of Maintenance Mode.

## Moving from Azure SQL to AWS RDS

If you want to move your Octopus database from Azure SQL to AWS RDS, replace steps 3 and 4 in the [step-by-step process](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-database/#Movethedatabase-StepByStep) with the steps below:

1. Take a backup of your Azure SQL database (`.bacpac`)
2. Download the `.bacpac` backup from Azure
3. Import the `.bacpac` backup to a local SQL Server
4. Create a standard SQL backup (`.bak`)
5. [Import the SQL backup into your AWS RDS database](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/SQLServer.Procedural.Importing.html)

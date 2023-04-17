---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Database configuration
description: Configuring your database and Octopus Deploy for database deployments.
navOrder: 10
---

Database deployments are often more complicated than deploying a web application or service as production databases are typically clusters or high-availability groups. They are often comprised of more than one node hidden behind a VIP (virtual IP address).

![](/docs/deployments/databases/configuration/images/common-database-with-vip.png "width=500")

Database deployment tooling doesn't need to run an executable directly on the database server. Instead, it needs to run somewhere that connects to the database over a specific port as specific user to run scripts:

 - SQL Server: `1433`
 - Oracle: `1521`
 - MySQL: `3306`
 - PostgreSQL: `5432`

The user account running the scripts needs permission to modify the database.  


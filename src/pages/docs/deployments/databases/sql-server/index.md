---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: SQL Server deployments
description: Automating deployments to SQL Server
navOrder: 10
hideInThisSection: true
---

There are a number of tools Octopus Deploy integrates with to deploy to SQL Server, and it can be a bit overwhelming to get started.  This section will help get started on automating deployments to SQL Server.

We have written a number of "iteration zero" blog posts that examine the benefits and approaches to automating database deployments:

- [Why consider database deployment automation?](https://octopus.com/blog/why-consider-database-deployment-automation)
- [Database deployment automation approaches](https://octopus.com/blog/database-deployment-automation-approaches)
- [How to design an automated database deployment process](https://octopus.com/blog/designing-db-deployment-process)
- [Automated database deployment process: case study](https://octopus.com/blog/use-case-for-designing-db-deployment-process)
- [Implementing an automated database deployment process](https://octopus.com/blog/implementing-db-deployment-process)
- [Pitfalls with rollbacks and automated database deployments](https://octopus.com/blog/database-rollbacks-pitfalls)

## Common deployment process patterns

There is a learning curve with adopting automated database deployments, and that can lead to quite a bit of trepidation, after all, databases are the lifeblood of most applications. There are some common deployment patterns you can adopt to build trust and level-up tooling knowledge quickly.

Learn more about [common patterns](/docs/deployments/databases/common-patterns/).

## Permissions

The database account used in the database deployment process needs enough permissions to make appropriate changes, but it should not have so much control it could damage an entire server.  

Learn more about [user permissions for SQL Server](/docs/deployments/databases/sql-server/permissions.md).

## Guides

We have written a number of guides and blog posts on the various tooling Octopus Deploy interacts with.  

- [Docs: Deploying to SQL Server with Redgate SQL Change Automation](/docs/deployments/databases/sql-server/redgate.md)
- [Docs: Deploying to SQL Server with a DacPac](/docs/deployments/databases/sql-server/dacpac.md)
- [Blog: Using DbUp and Workers to Automate Database Deployments](https://octopus.com/blog/dbup-database-deployments)
- [Blog: Deploying to SQL Server with Entity Framework Core](https://octopus.com/blog/will-it-deploy-episode-03)
- [Blog: Ad hoc SQL data scripts](https://octopus.com/blog/database-deployment-automation-adhoc-scripts-with-runbooks)

See working examples on our [samples instance](https://samples.octopus.app/app#/Spaces-106).

## Learn more

- [Blog: Automated blue/green database deployments](https://octopus.com/blog/databases-with-blue-green-deployments)
- [Blog: Using ad-hoc scripts in your database deployment automation pipeline](https://octopus.com/blog/database-deployment-automation-adhoc-scripts)
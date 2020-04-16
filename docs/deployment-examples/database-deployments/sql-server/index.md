---
title: SQL Server Deployments
description: Automating Deployments to SQL Server
position: 10
---

There are a number of tools Octopus Deploy integrates with to deploy to SQL Server.  So much so, it can be a bit overwhelming to get started.  This section will help get started on automating deployments to SQL Server.

We have written a number of "iteration zero" blog posts.

- [Why consider database deployment automation?](https://octopus.com/blog/why-consider-database-deployment-automation)
- [Database deployment automation approaches](https://octopus.com/blog/database-deployment-automation-approaches)
- [How to design an automated database deployment process](https://octopus.com/blog/designing-db-deployment-process)
- [Automated database deployment process: case study](https://octopus.com/blog/use-case-for-designing-db-deployment-process)
- [Implementing an automated database deployment process](https://octopus.com/blog/implementing-db-deployment-process)
- [Pitfalls with rollbacks and automated database deployments](https://octopus.com/blog/database-rollbacks-pitfalls)

## Common deployment process patterns

There is a learning curve with adopting automated database deployments, and that can lead to quite a bit of trepidation, especially when combined with the fact databases are the lifeblood of most applications. There are some common deployment patterns you can adopt to build trust and level-up tooling knowledge quickly.

Learn more about [common patterns](/docs/deployment-examples/database-deployments/common-patterns/index.md).

## Permissions

The database account used in the database deployment process needs enough permissions to make appropriate changes, but not have so much control it could damage an entire server.  

Learn more about [user permissions for SQL Server](/docs/deployment-examples/database-deployments/sql-server/permissions.md).

## Guides

We have written a number of guides and blog posts on the various tooling Octopus Deploy interacts with.  

- [Using DbUp and Workers to Automate Database Deployments](https://octopus.com/blog/dbup-database-deployments)
- [Deploying to SQL Server with Redgate SQL Change Automation](/docs/deployment-examples/database-deployments/sql-server/redgate.md)
- [Deploying to SQL Server with a DacPac](/docs/deployment-examples/database-deployments/sql-server/dacpac.md)
- [Deploying to SQL Server with Entity Framework Core](https://octopus.com/blog/will-it-deploy-episode-03)
- [Ad hoc SQL data scripts](https://octopus.com/blog/database-deployment-automation-adhoc-scripts-with-runbooks)

See working examples on our [samples instance](https://samples.octopus.app/app#/Spaces-106).

## Advanced topics

Automating database deployments is often the final piece of a fully automated CI/CD pipeline.  The next thought is, "what else can I do?"  We've written some blog posts to help out with the "what next?" question.

- [Automated blue/green database deployments](https://octopus.com/blog/databases-with-blue-green-deployments)
- [Using ad-hoc scripts in your database deployment automation pipeline](https://octopus.com/blog/database-deployment-automation-adhoc-scripts)
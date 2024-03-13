---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Databases
description: Database deployments
navOrder: 50
hideInThisSectionHeader: true
---

Automating database deployments is a complex topic and often the final step in an automated CI/CD pipeline. In this section, we aim to provide you with as much information as possible to get you started.  

We have also written a series of blog posts on the topic:

- [Why consider database deployment automation?](https://octopus.com/blog/why-consider-database-deployment-automation)
- [Database deployment automation approaches](https://octopus.com/blog/database-deployment-automation-approaches)
- [How to design an automated database deployment process](https://octopus.com/blog/designing-db-deployment-process)
- [Automated database deployment process: case study](https://octopus.com/blog/use-case-for-designing-db-deployment-process)
- [Implementing an automated database deployment process](https://octopus.com/blog/implementing-db-deployment-process)
- [Pitfalls with rollbacks and automated database deployments](https://octopus.com/blog/database-rollbacks-pitfalls)

## Third-party tools

Octopus Deploy integrates with several third-party database tools:

- RoundhousE
- DbUp
- ApexSQL
- Redgate
- [and more](https://library.octopus.com/listing/database)

Before those tools can run, they need to be configured to run as a specific database account that has permission to make schema changes.

Learn more about [configuration settings](/docs/deployments/databases/configuration).

## Common deployment process patterns

There is a learning curve with adopting automated database deployments, and that can lead to quite a bit of trepidation, especially when combined with the fact databases are the lifeblood of most applications. There are some common deployment patterns you can adopt to build trust and level-up tooling knowledge quickly.

Learn more about [common patterns](/docs/deployments/databases/common-patterns).

## Databases servers

Octopus Deploy is database server agnostics; it calls the command-line interface (CLI) of the tool of your choice. The database server you use (SQL Server, Oracle, MySQL, PostgreSQL, etc.), will determine which tool you can choose. 

### SQL Server

If you are deploying to SQL Server, see the [SQL Server section](/docs/deployments/databases/sql-server).


### Oracle

Oracle might be complicated, but that doesn't mean its deployments have to be.  We have some guides to help you get going.

- [Deploy to Oracle Database using Octopus Deploy and Redgate](https://octopus.com/blog/oracle-database-using-redgate)
- [Add Post Deployment scripts to Oracle database deployments using Octopus Deploy, Jenkins and Redgate](https://octopus.com/blog/oracle-database-using-redgate-part-2)
- [Using DbUp and Workers to Automate Database Deployments](https://octopus.com/blog/dbup-database-deployments) (the article uses SQL Server as the example, but DbUp can deploy to Oracle)

### MySQL

MySQL is one of the most popular databases in the world.  Even better, it is free and open-source.  It is used to power websites that get millions of views per day.  We've started building out our guides to help you deploy to it.

- [Deploying a Java web app with a MySQL backend through Octopus Deploy](https://octopus.com/blog/deploying-java-with-mysql)
- [Using DbUp and Workers to Automate Database Deployments](https://octopus.com/blog/dbup-database-deployments) (the article uses SQL Server as the example, but DbUp can deploy to MySQL).

## Advanced topics

Automating database deployments is often the final piece of a fully automated CI/CD pipeline.  The next thought is, "what else can I do?"  We've written some blog posts to help out with the "what next?" question.

- [Automated blue/green database deployments](https://octopus.com/blog/databases-with-blue-green-deployments)
- [Using ad-hoc scripts in your database deployment automation pipeline](https://octopus.com/blog/database-deployment-automation-adhoc-scripts)

## Learn more 

- [Manage database maintenance with runbooks](/docs/runbooks/runbook-examples/databases)
- [Database blog posts](https://octopus.com/blog/tag/database%20deployments)

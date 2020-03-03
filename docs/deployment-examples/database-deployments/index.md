---
title: Databases
description: Database deployments
position: 140
---

Automating database deployments tends to be the final frontier for a fully automated CI/CD pipeline.  We are here to help.  In this section we aim to provide as much information possible to help you get started.  

## Getting Started
Automating database deployments is a complex topic.  There are a lot of questions to answer and decisions to make.  To help get started, we have written a series of blog posts.  

- [Why consider database deployment automation?](https://octopus.com/blog/why-consider-database-deployment-automation)
- [Database deployment automation approaches.](https://octopus.com/blog/database-deployment-automation-approaches)
- [How to design an automated database deployment process.](https://octopus.com/blog/designing-db-deployment-process)
- [Automated database deployment process: case study.](https://octopus.com/blog/use-case-for-designing-db-deployment-process)
- [Implementing an automated database deployment process.](https://octopus.com/blog/implementing-db-deployment-process)
- [Pitfalls with rollbacks and automated database deployments.](https://octopus.com/blog/database-rollbacks-pitfalls)
- [Automated blue/green database deployments.](https://octopus.com/blog/databases-with-blue-green-deployments)

## Configuration

Octopus Deploy integrates with a number of third-party database tools, RoundhousE, DbUp, ApexSQL, andd Redgate to name a few.  Those tools have to run somewhere.  They have to run as a specific database account which has permissions to make schema changes.  Before implementing the tooling some scaffolding needs to be done.

Learn more about [configuration settings](/docs/deployment-examples/database-deployments/configuration.md).

## Databases Servers

Octopus Deploy is database server agnostics; it calls the command line interface (CLI) of the tool of your choice.  The tool you pick will dictate the database server (SQL Server, Oracle, MySQL, PostgreSQL, etc.) you can deploy to.  Please see the `In This Section` to pick the database server of your choice.

:::warning
This section is a work in progress.  Our goal is to cover as many of the popular database servers as we can.  If we are missing a guide, please email [advice@octopus.com](mailto:advice@octopus.com) and we will do our best to help you out.
:::

## Learn more 

- [Database blog posts](https://www.octopus.com/blog/tag/database%20deployments)
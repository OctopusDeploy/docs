---
title: Databases
description: Database deployments
position: 140
---

Automating database deployments is often the final frontier for an automated CI/CD pipeline.  We are here to help.  In this section, we aim to provide as much information as possible to help you get started.  

## Getting Started
Automating database deployments is a complex topic.  There are a lot of questions to answer and decisions to make.  To help get started, we have written a series of blog posts.  

- [Why consider database deployment automation?](https://octopus.com/blog/why-consider-database-deployment-automation)
- [Database deployment automation approaches.](https://octopus.com/blog/database-deployment-automation-approaches)
- [How to design an automated database deployment process.](https://octopus.com/blog/designing-db-deployment-process)
- [Automated database deployment process: case study.](https://octopus.com/blog/use-case-for-designing-db-deployment-process)
- [Implementing an automated database deployment process.](https://octopus.com/blog/implementing-db-deployment-process)
- [Pitfalls with rollbacks and automated database deployments.](https://octopus.com/blog/database-rollbacks-pitfalls)

## Configuration

Octopus Deploy integrates with several third-party database tools, RoundhousE, DbUp, ApexSQL, and Redgate, to name a few.  Those tools have to run somewhere.  They have to run as a specific database account which has permissions to make schema changes.  Before implementing the tooling, some scaffolding needs to be done.

Learn more about [configuration settings](/docs/deployment-examples/database-deployments/configuration/index.md).

## Databases Servers

Octopus Deploy is database server agnostics; it calls the command-line interface (CLI) of the tool of your choice.  The tool you pick will dictate the database server (SQL Server, Oracle, MySQL, PostgreSQL, etc.) you can deploy to.  Please see the `In This Section` to pick the database server of your choice.

:::highlight
You'll notice this section is heavier on SQL Server than other database servers.  For a long time, our primary users were .NET developers deploying to SQL Server; our guides reflected that.  But that is very limiting.  There are a lot of great database servers out there.  Our goal is to cover as many of the popular database servers as we can.  If we are missing a guide, please email [advice@octopus.com](mailto:advice@octopus.com), and we will do our best to help you out.
:::

### SQL Server

If your framework is .NET chances are you are deploying to SQL Server.  The deployment tooling has evolved along with it since its early days in 1989, running on OS/2.  We have written a number of guides and blog posts on the subject.

- [Using DbUp and Workers to Automate Database Deployments](https://octopus.com/blog/dbup-database-deployments)
- [Database Deployment Automation using state-based Redgate SQL Change Automation](https://octopus.com/blog/database-deployment-automation-using-redgate-sql-change-automation)
- [Deploying to SQL Server with a DacPac](https://octopus.com/blog/will-it-deploy-episode-04)
- [Deploying to SQL Server with Entity Framework Core](https://octopus.com/blog/will-it-deploy-episode-03)

### Oracle

Oracle might be complicated, but that doesn't mean its deployments have to be.  We have some guides to help you get going.

- [Deploy to Oracle Database using Octopus Deploy and Redgate](https://octopus.com/blog/oracle-database-using-redgate)
- [Add Post Deployment scripts to Oracle database deployments using Octopus Deploy, Jenkins and Redgate](https://octopus.com/blog/oracle-database-using-redgate-part-2)
- [Using DbUp and Workers to Automate Database Deployments](https://octopus.com/blog/dbup-database-deployments) (the article uses SQL Server as the example, but DbUp can deploy to Oracle)

### MySQL

MySQL is one of the most popular databases in the world.  Even better, it is free and open-source.  It is used to power websites that get millions of views per day.  We've started building out our guides to help you deploy to it.

- [Deploying a Java web app with a MySQL backend through Octopus Deploy](https://octopus.com/blog/deploying-java-with-mysql)
- [Using DbUp and Workers to Automate Database Deployments](https://octopus.com/blog/dbup-database-deployments) (the article uses SQL Server as the example, but DbUp can deploy to MySQL).

## Advanced Topics

Automating database deployments is often the final piece of a fully automated CI/CD pipeline.  The next thought is, "what else can I do?"  We've written some blog posts to help out with the "what next?" question.

- [Automated blue/green database deployments](https://octopus.com/blog/databases-with-blue-green-deployments)
- [Using adhoc scripts in your database deployment automation pipeline](https://octopus.com/blog/database-deployment-automation-adhoc-scripts)

## Learn more 

- [Database blog posts](https://www.octopus.com/blog/tag/database%20deployments)
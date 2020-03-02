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

## Third Party Tools

Octopus Deploy integrates with a variety of tooling to enable database deployments to a variety of database technologies.

### Redgate DLM Automation
:::warning
**Redgate DLM Automation has been replaced by SQL Change Automation**, which is available in the [SQL Toolbelt](http://www.red-gate.com/products/sql-development/sql-toolbelt/). For more details, see the documentation for [SQL Change Automation](https://documentation.red-gate.com/sca3)
:::

### Redgate SQL Change Automation

The Redgate SQL Change Automation tool works with build servers and release management tools to provide continuous integration and automated deployment for your SQL databases. You can control SQL Change Automation by using the [SQL Change Automation PowerShell cmdlets](https://documentation.red-gate.com/sca3/reference/powershell-cmdlets) or by using one of the [SQL Chage Automation add-ons](https://documentation.red-gate.com/sca3/automating-database-changes/add-ons). SQL Change Automation is available in the [SQL Toolbelt](http://www.red-gate.com/products/sql-development/sql-toolbelt/).

:::hint
Learn about [using SQL Change Automation with Octopus Deploy](https://documentation.red-gate.com/sca3/automating-database-changes/add-ons/octopus-deploy).
:::

### Redgate ReadyRoll 
:::warning
**Redgate ReadyRoll has been replaced by SQL Change Automation**, which is available in the [SQL Toolbelt](http://www.red-gate.com/products/sql-development/sql-toolbelt/). For more details, see the documentation for [SQL Change Automation](https://documentation.red-gate.com/sca3)
:::

Redgate SQL Change Automation follows the change script approach, and also provides an excellent Visual Studio experience as well as integrates with SQL Server Management Studio. It has the ability to generate Octopus Deploy-ready NuGet packages and can work in continuous integration/automated build tools.

:::hint
**Learn more about SQL Change Automation**
You can learn more about [Redgate SQL Change Automation's Octopus Deploy support](https://documentation.red-gate.com/sca3/automating-database-changes/add-ons/octopus-deploy) in their documentation.
:::

### DbUp

The open source tool [DbUp](http://dbup.github.io/), built by members of the Octopus Deploy team and other contributors, is another alternative. This 8 minute video (with captions) demonstrates how DbUp and Octopus Deploy can be used together to perform database deployments:

<iframe width="640" height="360" src="https://www.youtube.com/embed/mFnN8eLs3c8" frameborder="0" allowfullscreen></iframe>

### Visual Studio Database Projects

Raffaele Garofalo has a blog post detailing [how to deploy Visual Studio Database Projects with Octopus](http://blog.raffaeu.com/archive/2013/10/17/deploy-database-project-using-octopus/).

### Entity Framework Migrations

Kevin Kuszyk has a blog post about [deploying SQL databases using Entity Framework migrations and Octopus Deploy](http://www.kevinkuszyk.com/2016/10/26/deploying-sql-databases-using-entity-framework-migrations-and-octopus-deploy/).

### RoundhousE

Ben Tillman has a walk-through on [how to deploy database migrations with RoundhousE](http://blog.bentillman.net/deploying-db-migrations-with-octopus-deploy-and-roundhouse/).

## Learn more 

- [Database blog posts](https://www.octopus.com/blog/tag/database%20deployments)
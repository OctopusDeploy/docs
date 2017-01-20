---
title: SQL Server databases
position: 17
---


There are a variety of ways that SQL Server databases can be managed in Octopus Deploy. This section will provide a broad outline of the different approaches, and then drill into one possible solution to use as an example.


On this page:


- Approaches to database change management
- How change scripts work
- Third party tools
 - Redgate SQL Release
 - Redgate DLM Automation
 - Redgate ReadyRoll
 - DbUp
 - Visual Studio Database Projects
 - Entity Framework Migrations
 - RoundhousE




:::hint
**Tentacle Installation Location**
For SQL deployments, the SQL server does not require a locally installed Tentacle. You can use any Tentacle installed on any server, so long as it has access to SQL to run the functions you require.
:::

## Approaches to database change management


There are two main approaches to managing database definitions and applying differences when deploying:

1. A **model-driven** approach, where you define the desired state of your database in terms of tables and columns. During deployment, a tool compares the model with the actual target database, and then figures out what changes (column additions, table drops, etc.) need to be made to bring the target database in line with the model.
2. A **change-script-driven** approach, where the scripts to migrate from one version of the schema to the next are kept in source control, and are only ever run once.



The model driven approach makes for a great development experience - we can quickly compare our desired model database with a target database, and bring it into line, without needing to write or maintain any scripts. However, this model can begin to fall down - the tool might mistake a column rename as a column drop and add, for example, losing vital data.


When it comes to production deployments, however, there's nothing more reliable than keeping track of exactly the scripts you intend to run, and running them, without trying to compare state and guess. And in fact many model-driven tools are used that way, leading to a hybrid approach of model driven database development, and then change-script driven production deployments.

## How change scripts work


The database change script concept has been around for a long time. The core principles are:

- When you need to make a change to the database, write it in a script
- Make sure the script does what you intend - if you rename the LastName column to Surname, make sure the script doesn't do something silly such as dropping the LastName column and add the Surname column without moving any of the data
- Name the file sequentially - scripts will always be run in order
- A given script will only ever be run against a target database once (i.e., once the script to rename LastName to Surname has been run, it won't be run again, because it would fail
- Never change a script once it has been run (or the changes won't be run against the databases it has already been run against)
- Run the same set of scripts in every environment that you deploy to



The benefits of this are:

- When deploying to an old environment, you just run the scripts that haven't been run yet
- When setting up a new environment, you simply run all the change scripts
- When developers need to set up their local workstation, or you need to stand up a database for automated integration testing, guess what - you just run the change scripts
- You can write integration tests that actually test that your change scripts work
- Since you've run the same scripts in all of your pre-production environment, you can have more confidence that they will work in production (more confidence than if this is the first time the script has ever been run, or if you are supposed to make production schema changes by hand)
- Databases are much less likely to have differences in their schema



There are many ways of using the change script approach. Entity Framework has migration libraries that can help to do some of this. Some tools have special C# DSL's that let you specify what changes to make between schema versions. Personally, we prefer the simple approach: create T-SQL files, name them sequentially, and use a tool like the open source [DbUp](http://dbup.github.io/) to run them (it turns out that T-SQL is a pretty awesome DSL for dealing with SQL Server databases!)

## Third party tools

### Redgate SQL Release

:::warning
**SQL Release has been replaced by DLM Automation**
SQL Release has been replaced by DLM Automation, which is available in the [SQL Toolbelt](http://www.red-gate.com/products/sql-development/sql-toolbelt/). For more details, see the documentation for [DLM Automation](https://documentation.red-gate.com/display/DLMA1/DLM+Automation+documentation)
:::

### Redgate DLM Automation


The Redgate Database Lifecycle Management (DLM) Automation tool works with build servers and release management tools to provide continuous integration and automated deployment for your SQL databases. You can control DLM Automation by using the [DLM Automation PowerShell cmdlets](https://documentation.red-gate.com/display/DLMA2/Cmdlet+reference) or by using one of the [DLM Automation add-ons](http://www.red-gate.com/dlmas/add-ons-page). DLM Automation is available in the [SQL Toolbelt](http://www.red-gate.com/products/sql-development/sql-toolbelt/).


![](/docs/images/3048077/5865877.png)

:::hint
Learn about [using DLM Automation with Octopus Deploy](https://documentation.red-gate.com/display/DLMA2/Walkthrough%3A+Set+up+Continuous+Integration+And+Release+Management).
:::

### Redgate ReadyRoll


follows the change script approach, and also provides an excellent Visual Studio experience. It has the ability to [generate Octopus Deploy-ready NuGet packages](http://doc.ready-roll.com/display/RRSQLDOC/Octopus+Deploy) and can work in continuous integration/automated build tools.


![](/docs/images/3048077/3277640.png)

:::hint
**Learn more about ReadyRoll**
You can learn more about [Redgate ReadyRoll's Octopus Deploy support](http://doc.ready-roll.com/display/RRSQLDOC/Octopus+Deploy) in their documentation.
:::

### DbUp


The open source tool [DbUp](http://dbup.github.io/), built by members of the Octopus Deploy team and other contributors, is another alternative. This 8 minute video (with captions) demonstrates how DbUp and Octopus Deploy can be used together to perform database deployments:

### Visual Studio Database Projects


Raffaele Garofalo has a blog post detailing [how to deploy Visual Studio Database Projects with Octopus](http://blog.raffaeu.com/archive/2013/10/17/deploy-database-project-using-octopus.aspx).

### Entity Framework Migrations


Kevin Kuszyk has a blog post about [deploying SQL databases using Entity Framework migrations and Octopus Deploy](http://www.kevinkuszyk.com/2016/10/26/deploying-sql-databases-using-entity-framework-migrations-and-octopus-deploy/).

### RoundhousE


Ben Tillman has a walkthrough on [how to deploy database migrations with RoundhousE](http://blog.bentillman.net/deploying-db-migrations-with-octopus-deploy-and-roundhouse/).

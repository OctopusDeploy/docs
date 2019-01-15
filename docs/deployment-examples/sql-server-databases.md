---
title: SQL Server Databases
description: Octopus integrates with numerous tools to handle automated database deployments.
position: 140
---

There are a variety of ways for Octopus Deploy to deploy to SQL Server.  Octopus Deploy integrates with many third-party tools, both free and commercial.  This section will provide a broad outline of approaches, tooling, and recommended configuration.

## Approaches to Database Change Management {#SQLServerdatabases-Approachestodatabasechangemanagement}

There are two main approaches to deploying databases.

1. A model-driven approach, where you define the desired state of your database.  During deployment, a tool will compare the desired state with the target database.  Using that comparison it will generate a delta script.

[Redgate's DLM Automation Suite](https://www.red-gate.com/products/dlm/dlm-automation/index), [Microsoft's DacPac](https://docs.microsoft.com/en-us/sql/relational-databases/data-tier-applications/data-tier-applications?view=sql-server-2017), and [Microsoft's Entity Framework Migrations](https://msdn.microsoft.com/en-us/library/jj591621(v=vs.113).aspx) use the model-driven approach.

2. A change-driven approach, where schema changes are manually written and only run once.  The target database keeps track of which scripts already ran.

[Redgate's ReadyRoll](https://www.red-gate.com/products/sql-development/readyroll/index), [DbUp](https://dbup.readthedocs.io/en/latest/), and [RoundhousE](http://projectroundhouse.org/) use the change-driven approach.

There are pros and cons to either approach as well as the tools themselves.  It is important for your team to research the tools and determine the best one for you.

## Tentacle Installation Recommendations {#SQLServerdatabases-Tentacles}

Deploying an IIS Web Application or a Windows Service is very straight-forward.  Install the Tentacle on the server to be deployed to.  SQL Server is different.  Production SQL Servers are typically clusters or high-availability groups.  They comprise more than one node hidden behind a VIP or virtual IP Address.

![](common-database-with-vip.png "width=500")

For high-availability groups, there is an active node and a passive node.  In this case, installing a Tentacle on each node will not work.  Octopus Deploy will see multiple Tentacles and attempt to deploy to both nodes.

SQL PaaS, such as [AWS RDS](https://aws.amazon.com/rds/) or [Azure's SQL](https://azure.microsoft.com/en-us/services/sql-database/), will not allow the installation of Tentacles on SQL Server.  

All the tools mentioned above connect to SQL Server using port 1433 and run one or more scripts.  They do not need to be installed directly on SQL Server.  Nor do they need to be run directly on SQL Server.  They will work as long as they run on any machine with a direct connection and port 1433 open.

Also, Windows authentication is the often the preferred way to authenticate.  A recommended security practice is the principle of least privilege.  The account used by the website to connect to SQL Server should have restricted permissions.  For example, the website uses stored procedures, the account would only have permissions to execute those stored procedures.  Whereas, the account used for deployments needs elevated permissions.  This is because that account needs to make schema changes.

Most of the tooling from above requires it to be installed somewhere.  It is important the same version is used across all environments.  This prevents any uncertainty during deployments.  

Finally, it is good security practice to have a different deployment account per environment.  That deployment account only has permissions to make schema changes in their environment.  An account used to change a test environment should not be able to change production.  

With all that in mind, a "jump box" is where Tentacles should be installed.  The jump box sits between Octopus Deploy and the SQL Server VIP.  The Tentacle is running as a [service account](/docs/infrastructure/deployment-targets/windows-targets/running-tentacle-under-a-specific-user-account.md) with the necessary permissions to make schema changes.  The tooling chosen for database deployments is installed on the jump box.

![](database-with-jump-box.png "width=500")

In the event of multiple domains, a jump box would be needed per domain.  This might be seen where there is a domain in a local infrastructure and another domain in a cloud provider such as Azure.  As long as port 10933 is open (for a listening Tentacle) or port 443 (for a polling Tentacle) Octopus will be able to communicate to the jump box.

![](database-jump-box-multiple-domains.png "width=500")

It is possible to install many Tentacles on a single server.  Please [read here](/docs/administration/managing-infrastructure/managing-multiple-instances.md) for more information.  

![](database-jump-box-multiple-tentacles.png "width=500")

## Database Deployment Permissions {#SQLServerdatabases-Permissions}

The level of permissions required to automate database deployments is tricky.  There is a fine line between functionality and security.  There is no single magic bullet.  It will be up to you and your security team to discuss.  With that said, below are some considerations around permissions and a couple of recommendations.

### Application Account Permissions {#SQLServerdatabases-ApplicationAccountPermissions}

Applications should run under their own accounts with the least amount of rights.  Each environment for each application should have their own account.  

Having separate accounts for each environment can make automated database deployments very tricky.  Which account should be stored in source control?  All of them or none of them?  None of them.  Assign permissions to roles.  Attach the correct user for the environment to that role.

### Deployment Permission Considerations {#SQLServerdatabases-DeploymentPermissions}

The account used to make schema changes requires elevated permissions.  Because of that, create a special account to handle database deployments.  Do not use the same account used by an IIS Web Application.

The level of elevated permissions is up to you.   More restrictions placed on the deployment account means more manual steps.  Deployments will fail due to missing or restricted permissions.  Octopus will provide the error message to fix the issue.  It will need a manual intervention to resolve the issue.  It is up to you to decide which is best.

First, decide what the deployment account should have the ability to do at the server level.  From there, research which server roles are applicable.  Microsoft has provided a chart of the server roles and their specific permissions.

![](permissions-of-server-roles.png)

Next, decide what permissions the deployment account can have at the database level.  Again, Microsoft has provided a chart of the database roles and their specific permissions.   

![](permissions-of-database-roles.png)

With those two charts in mind, below are some recommended permissions sets.  

### Fully Automated Database Deployments Permission Recommendation {#SQLServerdatabases-FullAutomationPermissions}

Following DevOps principles, everything that can be automated should be automated.  This includes creating databases, user management, schema changes and data changes.  Octopus Deploy plus the third-party tool of your choice can handle that. The deployment account should have these roles assigned:

- Server Permissions
    - dbcreator -> ability to create new databases
    - securityadmin -> ability to create new users and grant them permissions (you will need a check in place to ensure it doesn't grant random people sysadmin roles)
- Database Permissions
    - db_ddladmin -> can run any Data Definition Language (DDL) command in a database.
    - db_datareader -> can read all the data from all user tables
    - db_datawriter -> can add, delete, or change data from all user tables
    - db_backupoperator -> can backup the database
    - db_securityadmin -> modify role membership and manage permissions
    - db_accessadmin -> can add or remove access to the database for logins
    - Can View Any Definition

Be sure to assign the deployment account those database roles in the model database.  That is the system database used by SQL Server as a base when a new database is created.  This means the deployment account will be assigned to those roles going forward.

### Fully Automated Database Deployments Permission Recommendation {#SQLServerdatabases-ManualUsers}

Security Admins should be treated the same as System Admins, as they can grant permissions at the server level.  For security purposes, it is common to see that role restricted.  In that case, below are the recommended permissions.  It can do everything except create a new SQL Login.

- Server Permissions
    - dbcreator -> ability to create new databases
- Database Permissions
    - db_ddladmin -> can run any Data Definition Language (DDL) command in a database.
    - db_datareader -> can read all the data from all user tables
    - db_datawriter -> can add, delete, or change data from all user tables
    - db_backupoperator -> can backup the database
    - db_securityadmin -> modify role membership and manage permissions
    - db_accessadmin -> can add or remove access to the database for logins
    - Can View Any Definition

### No Database Creation or User Creation Everything Else Automated Permission Recommendation {#SQLServerdatabases-ManualDbCreationAndUsers}

If granting that level of access is not workable or allowed we would recommend the following.  It requires SQL Users to be manually created and the database to already exist.  The process can add existing users to databases as well as deploy everything.

- Database Permissions:
    - db_ddladmin -> can run any Data Definition Language (DDL) command in a database.
    - db_datareader -> can read all the data from all user tables.
    - db_datawriter -> can add, delete, or change data from all user tables.
    - db_backupoperator -> can backup the database.
    - db_securityadmin -> modify role membership and manage permissions.
    - db_accessadmin -> can add or remove access to the database for logins.
    - Can View Any Definition.

### Manual User Creation Both Server and Database Permission Recommendation {#SQLServerdatabases-ManualUserPermissions}

Here is the most restrictive permissions for automating database deployments.  No new database users can be created.  No new schemas can be created.  Users cannot be added to roles.  Table and stored procedure changes can be made.

- Database Permissions:
    - db_ddladmin -> can run any Data Definition Language (DDL) command in a database.
    - db_datareader -> can read all the data from all user tables.
    - db_datawriter -> can add, delete, or change data from all user tables.
    - db_backupoperator -> can backup the database.
    - Can View Any Definition.

## Third Party Tools {#SQLServerdatabases-Thirdpartytools}

### Redgate SQL Release {#SQLServerdatabases-RedgateSQLRelease}

:::warning
**SQL Release has been replaced by DLM Automation**
SQL Release has been replaced by DLM Automation, which is available in the [SQL Toolbelt](http://www.red-gate.com/products/sql-development/sql-toolbelt/). For more details, see the documentation for [DLM Automation](https://documentation.red-gate.com/display/DLMA1/DLM+Automation+documentation)
:::

### Redgate DLM Automation {#SQLServerdatabases-RedgateDLMAutomation}

The Redgate Database Lifecycle Management (DLM) Automation tool works with build servers and release management tools to provide continuous integration and automated deployment for your SQL databases. You can control DLM Automation by using the [DLM Automation PowerShell cmdlets](https://documentation.red-gate.com/display/DLMA2/Cmdlet+reference) or by using one of the [DLM Automation add-ons](http://www.red-gate.com/dlmas/add-ons-page). DLM Automation is available in the [SQL Toolbelt](http://www.red-gate.com/products/sql-development/sql-toolbelt/).

![](/docs/images/3048077/5865877.png "width=500")

:::hint
Learn about [using DLM Automation with Octopus Deploy](https://documentation.red-gate.com/display/DLMA2/Walkthrough%3A+Set+up+Continuous+Integration+And+Release+Management).
:::

### Redgate ReadyRoll {#SQLServerdatabases-RedgateReadyRoll}

Redgate ReadyRoll follows the change script approach, and also provides an excellent Visual Studio experience. It has the ability to [generate Octopus Deploy-ready NuGet packages](http://doc.ready-roll.com/display/RRSQLDOC/Octopus+Deploy) and can work in continuous integration/automated build tools.

![](/docs/images/3048077/3277640.png "width=500")

:::hint
**Learn more about ReadyRoll**
You can learn more about [Redgate ReadyRoll's Octopus Deploy support](http://doc.ready-roll.com/display/RRSQLDOC/Octopus+Deploy) in their documentation.
:::

### DbUp {#SQLServerdatabases-DbUp}

The open source tool [DbUp](http://dbup.github.io/), built by members of the Octopus Deploy team and other contributors, is another alternative. This 8 minute video (with captions) demonstrates how DbUp and Octopus Deploy can be used together to perform database deployments:

<iframe width="640" height="360" src="https://www.youtube.com/embed/mFnN8eLs3c8" frameborder="0" allowfullscreen></iframe>

### Visual Studio Database Projects {#SQLServerdatabases-VisualStudioDatabaseProjects}

Raffaele Garofalo has a blog post detailing [how to deploy Visual Studio Database Projects with Octopus](http://blog.raffaeu.com/archive/2013/10/17/deploy-database-project-using-octopus/).

### Entity Framework Migrations {#SQLServerdatabases-EntityFrameworkMigrations}

Kevin Kuszyk has a blog post about [deploying SQL databases using Entity Framework migrations and Octopus Deploy](http://www.kevinkuszyk.com/2016/10/26/deploying-sql-databases-using-entity-framework-migrations-and-octopus-deploy/).

### RoundhousE {#SQLServerdatabases-RoundhousE}

Ben Tillman has a walkthrough on [how to deploy database migrations with RoundhousE](http://blog.bentillman.net/deploying-db-migrations-with-octopus-deploy-and-roundhouse/).

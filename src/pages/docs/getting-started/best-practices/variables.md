---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-05-03
title: Variable Recommendations
description: Guidelines and recommendations for configuring variables in Octopus Deploy.
navOrder: 60
hideInThisSection: true
---

[Variables](/docs/projects/variables) allow you to parameterize your deployment and runbook process.  That allows your processes to work across your infrastructure without having to hard-code or manually update configuration settings that differ across environments, deployment targets, channels, or tenants.

There are multiple levels of variables in Octopus Deploy:

1.  Project 
2.  Tenant 
3.  Step Templates
4.  Library Set
5.  System Variables

Project, Tenant, and Step Template variables are associated with their specific item and cannot be shared.  Library set variables can be shared between 1 to N Projects and Tenants.  System variables are variables provided by Octopus Deploy you can use during deployments.

During a deployment, Octopus will gather all the variables for the project, Tenant (when applicable), step template, associated library sets, and system variables and create a "variable manifest" for each step to use.

:::div{.hint}
Multi-tenancy is an advanced topic with its own set of recommendations.  Tenants were mentioned here so you could see the bigger picture of variables.
:::

Octopus Deploy provides the ability to replace values in your configuration files using the [structured configuration variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature/) or the [.NET XML configuration variables feature](/docs/projects/steps/configuration-features/xml-configuration-variables-feature/).  In addition, Octopus Deploy supports the ability to perform [.NET Configuration transforms](/docs/projects/steps/configuration-features/configuration-transforms) during deployment time.

In addition to having the above levels of variables, there are also two categories of variables.

1.  Variables used in configuration file replacement (connection strings, version number, etc.)
2.  Variables specific to the deployment or runbook run (output variables, messages, accounts, etc.)

## Variable Naming

Without established naming conventions, variable name collisions are possible.  A common example is when a project and a library variable set have the same variable name scoped to the same environment.  When a name collision occurs, Octopus Deploy will do its best to pick the ["right one" using an algorithm](/docs/projects/variables/#Scopingvariables-Scopespecificity).  But sometimes, the variables are scoped equally.  If this occurs, Octopus will choose project-defined variables ahead of library-defined ones.

The recommendation is to avoid name collisions in the first place by following these naming standards.

1. Project: `Project.[Component].[Name]` - for example, **Project.Database.UserName.**
2. Tenant: `[ProjectName].[Component].[Name]` - for example, **OctoPetShopWebUI.URL.Port**.
3. Step Template: `[TemplateShortName].[Component].[Name]` - for example, **SlackNotification.Message.Body**.
4. Library Set: `Library.[LibrarySetName].[Component].[Name]` - for example, **Library.Notification.Slack.Message**.

These naming conventions only apply to variables used for a deployment or runbook run.  Variables used for configuration file replacement have a specific naming convention to follow.  The above naming convention makes it easier to distinguish between the two.

## Configuration File Replacement Variables

One of Octopus Deploy's most used features is environmental variable scoping.  And with good reason, having the same process, only needing a specific value such as a connection string or domain name changed, ensures consistency during deployment.

However, that has led some customers to attempt to make Octopus Deploy something other than what it is.  Octopus Deploy is not a configuration management tool, secret store, or feature flag provider.  Store the variables required for Octopus Deploy to successfully deploy your application, along with a minimum amount of configuration variables.  

:::div{.hint}
Changing a feature flag or secret stored in Octopus Deploy requires you to deploy or run a runbook to update the file manually.  Leverage best-in-breed tools for storing secrets or feature flags that were designed with that use case in mind.  Octopus Deploy should store the necessary connection information to those platforms as sensitive variables.  It should update the appropriate configuration file entries or set environmental variables to connect successfully to those tools.  
:::

Some examples of configuration variables include:

- Database Connection Strings, including username and password
- Connection details to a secret store
- Domain names
- Server ports
- Service URLs

There are also variables only Octopus Deploy knows about.  These include the release version number, environment name, and deployment date. 

For configurations that differ per environment, our recommendation is to use a combination of Octopus Deploy and configuration files stored in source control.  You'd have three levels of configuration files:

- Main configuration file (appSettings.json)
- Environment-specific configuration file (appSettings.Development.json)
- Tenant-specific configuration file (appSettings.MyTenantName.json)

Octopus Deploy can set an environment variable or configuration value during deployment to indicate which environment-specific configuration file to use.  Or, if you are using .NET Framework, you can leverage [configuration file transforms](/docs/projects/steps/configuration-features/configuration-transforms).

For other items,   

## Library Variable Sets

[Library variable sets](/docs/projects/variables/library-variable-sets) are a great way to share variables between projects.  We recommend the following when creating library variable sets.

- Don't have a single "global" library variable set.  This becomes a "junk drawer" of values and quickly becomes unmanageable.  And not every project will need all those variables.
- Group common variables into a library variable set.  Examples include Notifications, Azure, AWS, Naming, and so on.
- Have application-specific library variable sets to share items such as service URLs, database connection strings, etc., across the multiple projects that make up an application.

## Permissions

A common scenario we've talked to customers about is restricting variable edit access to specific environments.  For example, a developer can edit any variables scoped to **development** and **test** environments, but not **staging** or **production** environments.  On paper this makes sense, in practice this causes messy handovers and claims of "it worked on my machine."  The developers working on the application know all the various settings and variables required for their application to work.

Our recommendations for variable edit permissions are:
- Variable edit permissions should be all or nothing, either a person can edit variables, or they cannot.  Don't scope permissions to environments.  Anyone responsible for the application should have permission to update variables (developers, lead devs, DB developers, etc.) along with operations (DBAs, web admins, sys admins) who can create and update service accounts and passwords.  
- Library variable sets can be shared across multiple projects.  Limit who can edit library variable set variables to more experienced Octopus Deploy users, or people who understand "with great power comes great responsibility."  Typically, we see senior or lead developers along with operations people who have these permissions.  If you want to isolate an application, consider using [spaces](/docs/administration/spaces).
- Leverage [sensitive variables](/docs/projects/variables/sensitive-variables) to encrypt and hide sensitive values such as usernames and passwords.  Sensitive variables are write-only in the Octopus UI and Octopus API.  
- Use [composite variables](/docs/projects/variables/variable-substitutions/#binding-variables) to combine sensitive and non-sensitive values.  A typical use case is database connection strings.  Each language has a specific syntax.  In the screenshot below `Project.Database.ConnectionString` is the composite variable, with the username and password referenced by the composite variable, but they are separate sensitive variables. 

:::figure
![composite variables](/docs/getting-started/best-practices/images/composite-variables.png "width=500")
:::

## Further reading

For further reading on variables in Octopus Deploy please see:

- [Variables](/docs/projects/variables)
- [Scoping Variables](/docs/projects/variables/#scoping-variables)
- [Structured Configuration Variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature)
- [.NET XML Configuration Variables](/docs/projects/steps/configuration-features/xml-configuration-variables-feature)
- [.NET Configuration Transforms](/docs/projects/steps/configuration-features/configuration-transforms)
- [Library Variable Sets](/docs/projects/variables/library-variable-sets)

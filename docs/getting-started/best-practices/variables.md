---
title: Variables
description: Guidelines and recommendations for configuring variables in Octopus Deploy.
position: 60
hideInThisSection: true
---

[Variables](/docs/projects/variables/index.md) allow you to paramertize your deployment and runbook process.  This allows your processes to work across your infrastructure without having to hard-code or manually update configuration settings that differ across environments, deployment targets, channels, or tenants.

There are four levels of variables in Octopus Deploy:

1. Project 
2. Tenant 
3. Step Templates
4. Library Set

Project, Tenant, and Step Template variables are associated with their specific item and cannot be shared.  Library set variables can be shared between 1 to N Projects and Tenants.

:::hint
Multi-tenancy is an advanced topic, with it's own set of recommendations.  Tenants were mentioned here so you could see the bigger picture of variables.
:::

Octopus Deploy provides the ability to replace values in your configuration files using the [structured configuration variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature.md) or the [.NET XML configuration variables feature](/docs/projects/steps/configuration-features/xml-configuration-variables-feature.md).  In addition, Octopus Deploy supports the ability to perform [.NET Configuration transforms](/docs/projects/steps/configuration-features/configuration-transforms.md) during deployment time.

In addition to having three levels of variables, there are also two categories of variables.

1. Variables used in configuration file replacement (connection strings, version number, etc.)
2. Variables specific to the deployment or runbook run (output variables, messages, accounts, etc.)

## Recommendation For Variable Naming

It is entirely possible for a name collision to occur, where a project and a library variable set have the same variable name scoped to the same environment.  When a name collision occurs, Octopus Deploy will do its best to pick the ["right one" using an algorithm](//docs/projects/variables/index.md#Scopingvariables-Scopespecificity).

However, the recommendation is to avoid name collisions in the first place by following these naming standards.

1. Project: Project.[Componenet].[Name] - for example, Project.Database.UserName.
2. Tenant: [ProjectName].[Component].[Name] - for example, OctoPetShopWebUI.URL.Port.
3. Step Template: [TemplateName].[Component].[Name] - for example, SlackNotification.Message.Body.
4. Library Set: [LibrarySetName].[Component].[Name] - for example, Notification.Slack.Message.

These naming conventions only apply for variables specific to the deployment or runbook run.  Variables used for configuration file replacement have a specific naming convention to follow.  However, following the above naming convention for variables specific to deployments or runbook runs make it easier to distinguish between the two.

## Recommendations For Configuration File Replacement Variables

One of Octopus Deploy's most used feature is the variable scoping.  And with good reason, having the same process, with only needing a specific value such as a connection string or domain name changed, ensures consistency during the deployment process.  

Configuration File Replacement Variables tend to be one of the most overused features resulting in a few anti-patterns.  Those include:

- Dozens or hundreds of variables being replaced during a deployment.
- Needing a process to automatically add variables based on a custom structure in source control.
- Needing the ability to only edit one variable set associated with a specific project.
- Desiring the ability to source control variables from Octopus Deploy.



<span><a class="btn btn-outline-dark" href="/docs/getting-started/best-practices/project-and-project-groups">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/best-practices/library">Next</a></span>
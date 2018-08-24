---
title: Scoping Variables
description: Scoping variables allows you to specify different values for a variable depending on where you are deploying them.
position: 0
---

To allow you to define different values for variables depending on where you are deploying, variables can be **scoped**.

![](/docs/images/3048305/3278293.png "width=500")

Variables can be scoped by:

- Environments (most common).
- Specific machines.
- Specific machine roles.
- Specific deployment steps.

For example, suppose these variables exist:

| Name | Value | Environment scope |
| --- | --- | --- |
| LogLevel | Info |  |
| LogLevel | Warn | Production, Staging |
| DBConnectionString | Server=SQL-UAT1;Database=... | UAT |
| DBConnectionString | Server=SQL-PROD;Database=... | Production |

During deployment, Octopus will try to select the most specifically scoped variable that applies. For example, when deploying to Production, the *LogLevel* property would be *Warn*. But to any other environment, it would fall back to the less-specific variable and have a value of *Info* instead.

## Assigning Scopes {#Scopingvariables-Assigningscopes}

You can set the scope of a variable by selecting the Scope cell, and choosing the scope values:

![](/docs/images/3048305/3278294.png "width=500")

## Scope Specificity {#Scopingvariables-Scopespecificity}

Imagine you have one variable scoped to an environment (Production), and another scoped to a machine within the environment. Which value should Octopus choose?

Since variables can be scoped in many different ways, there needs to be a predictable, deterministic order in which they are resolved. The list below is the priority in which variable scopes take precedence - the top items are considered higher priority than the bottom ones:

- The current step/action (most specific).
- The current machine.
- Roles applied to the current machine and targeted by the current step.
- Roles applied to the current machine.
- The target tenant (if tenant-features are enabled).
- The target tenant-tag (if tenant-features are enabled).
- The target environment.
- The target channel (if channels are enabled).
- No scope (least specific).

For example, imagine a **LogLevel** variable with a value scoped to an environment is considered by Octopus to be "less specific" than a value scoped to a machine role. So when two possible values for a variable exist, Octopus will choose the "more specific" scope value over the less specific one.

Variable scoping also works like CSS rules; a value scoped twice is more specific than a value scoped once. For example, a variable scoped to an environment and a role is more specific than a variable scoped to just a role.

If two variables are scoped equally, Octopus will choose project-defined variables ahead of library-defined ones. If this still does not resolve the conflict the result is non-deterministic and you should not depend on a specific value being used. Instead, you should take care when scoping variables so that they are unlikely to conflict.

Scope specificity can quickly become very complicated. Read our blog post for a [better understanding of why scope specificity works the way it does](http://octopusdeploy.com/blog/variable-specificity-and-complexity).

## Using Variables with Target Roles

Variables can also be scoped to specific [target roles](docs/infrastructure/target-roles/index.md). This means that the variable will take the specified value only when it is used on a deployment step that runs on a deployment target with the specified role. This feature can be really handy when you want to use the same variable name multiple times and have their values changed depending on the target they are running on.

Let’s say you have the following targets with their respective roles:

| Target   | Role       |
| ---------- | ---------- |
| Target 1 | app-server |
| Target 2 | web-server |

You want to deploy the same package on each server but the deployment path will be different between servers. In this case you can set the same variable (we’ll call it *DeployPath*) with a different value for each target role:

![](deploy-path-variable.png)

Then, on your deployment step, you can set the **[Custom Install Directory](/docs/deployment-process/configuration-features/custom-installation-directory.md)** to `#{DeployPath}`.

![](custom-install-path.png)

## Variables and Permissions

When applying permissions on variables via scopes, the only options that are checked against permissions are Environments, Targets and Tenants.

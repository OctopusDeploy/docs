---
title: Variables
description: Defining variables in Octopus allows you to promote your applications through environments and update their configuration files.
position: 20
hideInThisSection: false
---

Octopus lets you define variables with values that change based on the scope you've assigned to the variables and the scope of your deployments. For instance, as you define your [deployment processes](/docs/deployment-process/index.md) there will be [steps](/docs/deployment-process/steps/index.md) in your [projects](/docs/deployment-process/projects/index.md) that need different database connection strings (or any number of other parameters, i.e., application settings, web service URLs, etc) depending on the environment you're deploying to.

Using variables, you can define a variable with one value (the database connection string for the test database) scoped to the test environment and another value (the database connection string for the production database) scoped to the production environment. Then, when your deployment process runs, it will use the value with the test database connection string when deploying to the test environment, and it will use the value with the production database connection string when deploying to the production environment.

| Name | Value | Scope |
| --- | --- | --- |
| database | TestSQL | Testing |
| database | ProductionSQL | Production |

Using variables means you don't need to hardcode any of these values. You define your variables and the values you provide will be used at deployment time, allowing you to create applications and deployments that are agnostic of the target environments.

:::warning
If you are using Spaces as part of your Octopus Deploy installation, please remember that any Variables you configure, will only be available to the space they are configured for.
:::

## Creating Hello World Variables

In this example, we'll add a variable to a Hello World project that runs a script to say hello. The project uses the variable to vary the message it displays based on the environment the script is deployed to.

1. To add a variable to your [project](/docs/deployment-process/projects/index.md), navigate to the Project's Overview page, and click **Variables** to access the variable editor.
1. Give the variable a name, for instance, *Greeting*.
1. Enter the first value for the variable, for instance, *Hello, Test*, in the value field.
1. Define the scope for the value, for instance, by selecting the *Test* environment.
1. Click **ADD ANOTHER VALUE** and enter the second value for the variable, for instance, *Hello, Production*.
1. Define the scope for this value, for instance, by selecting the *Production* environment.

![Adding a Variable](adding-a-variable.png)

1. Save the variable by clicking **SAVE**.
1. In this example, we'll reference this variable from a **Run a Script** step.
1. Define your step (Click **{{Process,ADD STEP,Run A Script}}**) and in the **Script Content** section, enter the following PowerShell script into the script editor:

​```
Write-Host
​```

1. Select the variable *Greeting* from the insert variable tool (**#\{\}**) next to the script editor, and click **SAVE**.

![Script with Variable](script-variable.png)

When a release of the project is deployed, the script step will run with the string *Hello, Test* on the Test environment, and with the string *Hello, Production*, on the Production environment.

## Scoping Variables {#scoping-variables}

The variables that you define for your projects in Octopus can be scoped in the following ways:

- Environments (most common).
- Deployment targets.
- Target roles.
- Deployment steps.
- Channels.
- Tenants.

Scoping the values of your variables lets you determine which values will be used in which situations. For example, suppose this variable exists:

| Name | Value | Environment scope |
| --- | --- | --- |
| LogLevel | Info |  |
| LogLevel | Warn | Production, Staging |

During deployment, Octopus will try to select the most specifically scoped variable that applies. For example, when deploying to Production and Staging, the *LogLevel* property will be *Warn*, but to any other environment, it will fall back to the less-specific variable and have a value of *Info* instead.

### Assigning Scopes {#Scopingvariables-Assigningscopes}

You can set the scope of a variable values when you are creating or editing your variables, either from the **variable** section of the project, or in the **Variable Sets** section of the Library; however, when you assign scope to variables that are part of a library **variable set**, the variables cannot be scoped to deployment steps or channels.

![Assigning Scope to Variables](scoping-variables.png)

### Using Multiple Scopes

You can scope the values of your variables in multiple ways. For instance, you might scope a value to both the **Dev** and **Test** Environments, and to a step within your process.

When the process runs, Octopus will used the scoped value for the **Dev** OR **Test** environments, AND the steps the value was scoped to.

| Variable | Value | Scope |
| -------- | ----- | ----- |
| MyVariable | Scoped | Environment: Dev, Test; Steps: Step 1 |
| MyVariable | unscoped |  |

With the above *MyVariable* variable, the scoped and unscoped values will be implemented as follows:

| | Step 1 | Step 2|
| ---- | ---- | ---- |
| Dev Environment | Scoped | Unscoped |
| Test Environment | Scoped | Unscoped |
| Stage Environment |  Unscoped | Unscoped |


### Scope Specificity {#Scopingvariables-Scopespecificity}

Imagine you have one variable scoped to an environment (Production), and another scoped to a machine within the environment. Which value should Octopus choose?

Since variables can be scoped in many different ways, there needs to be a predictable, deterministic order in which they are resolved. The list below is the priority in which variable scopes take precedence. The top items are higher priority than the bottom ones:

1. The current step/action (most specific).
1. The current machine.
1. Roles applied to the current machine and targeted by the current step.
1. Roles applied to the current machine.
1. The target tenant (if tenant-features are enabled).
1. The target tenant-tag (if tenant-features are enabled).
1. The target environment.
1. The target channel (if channels are enabled).
1. No scope (least specific).

For example, a **LogLevel** variable with a value scoped to an environment is considered by Octopus to be "less specific" than a value scoped to a machine role. So when two possible values for a variable exist, Octopus will choose the "more specific" scope value over the less specific one.

Variable scoping also works like CSS rules; a value scoped twice is more specific than a value scoped once. For example, a variable scoped to an environment and a role is more specific than a variable scoped to just a role.

If two variables are scoped equally, Octopus will choose project-defined variables ahead of library-defined ones. If this still does not resolve the conflict the result is non-deterministic and you should not depend on a specific value being used. Instead, you should take care when scoping variables so that they are unlikely to conflict.

Scope specificity can quickly become very complicated. Read our blog post for a [better understanding of why scope specificity works the way it does](http://octopus.com/blog/variable-specificity-and-complexity).

### Scoping Variables to Target Roles

Variables can also be scoped to specific [target roles](docs/infrastructure/deployment-targets/target-roles/index.md). This means that the variable will take the specified value only when it is used on a deployment step that runs on a deployment target with the specified role. This feature can be really handy when you want to use the same variable name multiple times and have their values changed depending on the target they are running on.

Let’s say you have the following targets with their respective roles:

| Target   | Role       |
| ---------- | ---------- |
| Target 1 | app-server |
| Target 2 | web-server |

You want to deploy the same package on each server but the deployment path will be different between servers. In this case you can set the same variable (we’ll call it *DeployPath*) with a different value for each target role:

![](deploy-path-variable.png)

Then, on your deployment step, you can set the **[Custom Install Directory](/docs/deployment-process/configuration-features/custom-installation-directory.md)** to `#{DeployPath}`.

![](custom-install-path.png)

### Variables and Permissions

When applying permissions on variables via scopes, the only options that are checked against permissions are Environments, Targets and Tenants.

## Next

Learn about using [variables in your scripts](/docs/deployment-examples/custom-scripts/index.md) or [variable substitutions](/docs/deployment-process/variables/variable-substitutions.md).

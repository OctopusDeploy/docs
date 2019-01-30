---
title: Variables
description: Defining variables in Octopus allows you to promote your applications through environments and update their configuration files.
position: 20
hideInThisSection: true
---

Octopus lets you define variables with values that change based on the [scope](/docs/deployment-process/variables/scoping-variables.md) you've assigned to the variables and the scope of your deployments. For instance, as you define your [deployment processes](/docs/deployment-process/index.md) there will be [steps](/docs/deployment-process/steps/index.md) in your [projects](/docs/deployment-process/projects/index.md) that need different database connection strings (or any number of other parameters, i.e., application settings, web service URLs, etc) depending on the environment you're deploying to.

In this example, you can define a variable with one value (the database connection string for the test database) scoped to the test environment and another value (the database connection string for the production database) scoped to the production environment. Then, when your deployment process runs, it will use the value with the test database connection string when deploying to the test environment, and it will use the value with the production database connection string when deploying to the production environment.

Using variables means you don't need to hardcode any of these values. You define your variables and the values you provide will be used at deployment time, allowing you to create applications and deployments that are agnostic of the target environment.

## Creating Hello World Variables

In this example, we'll add a variable to a Hello World project that runs a script to say hello. The project uses a variable to vary the message it displays based on the environment the script is deployed to.

1. To add a variable to your [project](/docs/deployment-process/projects/index.md), navigate to the Project's Overview page, and click **Variables** to access the variable editor.
1. Give the variable a name, for instance, *Greeting*.
1. Enter the first value for the variable, for instance, *Hello, Test*, in the value field.
1. Define the scope for the value, for instance, by selecting the *Test* environment.
1. Click **ADD ANOTHER VALUE** and enter the second value for the variable, for instance, *Hello, Production*.
1. Define the scope for this value, for instance, by selecting the *Production* environment.

![Adding a Variable](adding-a-variable.png)

1. Save the variable by clicking **SAVE**.
1. In this example, we'll reference this variable from a **Run a Script** step.
1. Define your step and in the **Script Content** section, enter the following PowerShell script into the script editor:

​```
Write-Host
​```

1. Select the variable *Greeting* from the insert variable tool (**#\{\}**) next to the script editor, and click **SAVE**.

![Script with Variable](script-variable.png)

When a release of the project is deployed, the script step will run with the string *Hello, Test* on the Test environment, and with the string *Hello, Production*, on the Production environment

!include <using-variables-in-scripts>

## Variables in Octopus

Variables are an important and useful concept in Octopus, so this section describes different ways in which variables can be used.

|                                          |                                          |
| ---------------------------------------- | ---------------------------------------- |
| **[Scoping variables](/docs/deployment-process/variables/scoping-variables.md)** | Variables can be scoped to different environments, deployment targets, target roles, deployment steps, channels, and tenants which allows you to provide different values for the variables for each scope. |
| **[Binding syntax](/docs/deployment-process/variables/binding-syntax.md)** | Octopus's binding syntax lets you reference variables throughout Octopus. You can also reference variables from other variables. |
| **[Library variable sets](/docs/deployment-process/variables/library-variable-sets.md)** | Library variable sets let you re-use common variables between projects rather than creating them for every project that needs them. |
| **[Prompted variables](/docs/deployment-process/variables/prompted-variables.md)** | Sometimes the value of a variable changes for each deployment. You can prompt a user for a variable value when scheduling deployments. |
| **[Sensitive variables](/docs/deployment-process/variables/sensitive-variables.md)** | Octopus can securely store sensitive values, for instance, passwords and API keys. |
| **[System variables](/docs/deployment-process/variables/system-variables.md)** | Many built-in variables are available within Octopus, such as the current environment name. |
| **[Output variables](/docs/deployment-process/variables/output-variables.md)** | Output variables let you programmatically set variables during a deployment, and then use those values in subsequent steps. |
| **[Variable templates](/docs/deployment-process/variables/variable-templates.md)** | Variable template are used with projects that are deployed to Multi-tenants and let you define which variables are required by tenants for your projects to be successfully deployed. |
| **[Certificate variables](docs/deployment-process/variables/certificate-variables.md)** | Octopus supports a certificate variable type that lets you create a variable with a certificate managed by Octopus as the value. |
| **[Variable Substitution Syntax](docs/deployment-process/variables/variable-substitution-syntax.md)** | Variable substitutions are a flexible way to adjust configuration based on your variables and the context of your deployment. |
| **[AWS Account Variables](docs/deployment-process/variables/certificate-variables.md)** | AWS accounts are included in a project through a project variable of the type Amazon Web Services Account. |
| **[Azure Account Variables](docs/deployment-process/variables/certificate-variables.md)** | Azure accounts can be referenced in a project through a project variable of the type Azure Account. |
| **[Workerpool Variables](docs/deployment-process/variables/workerpool-variables.md)** | Steps in projects can depend on Workerpool variables rather than picking a pool directly. |

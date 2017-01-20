---
title: Variables
position: 26
---


As you promote your application through test, UAT, staging and production, there are going to be differences in database connection strings, application settings, web service URLs, and many other parameters.


To make it easy to support different environments without hard-coding these configuration values, you can define **variables** related to your project. These variables are used during your application deployment. For example, variables you define will be automatically substituted into [XML configuration files](/docs/home/deploying-applications/configuration-files.md), and [made available to your PowerShell scripts](/docs/home/deploying-applications/custom-scripts.md). This allows you to create applications and deployment scripts that are agnostic of the target environment.


Variables are essentially name/value pairs with optional scope rules applied. You can edit the variables using the **Variables** tab within a project.


![](/docs/images/3048089/3278302.png)


Variables are an important and useful concept in Octopus, so this section describes different ways in which variables can be used.

| **[Scoping variables](/docs/home/deploying-applications/variables/scoping-variables.md)** | Variables can have different values depending on the environment or machine that they target |
| **[Binding syntax](/docs/home/deploying-applications/variables/binding-syntax.md)** | Variables can be referenced throughout Octopus |
| **[Library variable sets](/docs/home/deploying-applications/variables/library-variable-sets.md)** | Library variable sets let you re-use variables and [variable templates](/docs/home/deploying-applications/variables/variable-templates.md) between projects |
| **[Prompted variables](/docs/home/deploying-applications/variables/prompted-variables.md)** | Sometimes the value of a variable changes for each deployment. You can prompt for a variable value when scheduling a deployment. |
| **[Sensitive variables](/docs/home/deploying-applications/variables/sensitive-variables.md)** | Octopus can securely store sensitive values, like passwords and API keys |
| **[System variables](/docs/home/deploying-applications/variables/system-variables.md)** | Many built-in variables are available within Octopus, such as the current environment name |
| **[Output variables](/docs/home/deploying-applications/variables/output-variables.md)** | Output variables let you programatically set variables during a deployment, and then use those values in subsequent steps |
| **[Variable templates](/docs/home/deploying-applications/variables/variable-templates.md)** | Variable template let you define variables that are required by your project, but where the values are provided by something else, like a tenant |

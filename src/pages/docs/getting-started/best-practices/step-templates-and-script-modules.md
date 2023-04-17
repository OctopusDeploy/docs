---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Step Templates and Script Modules
description: Guidelines and recommendations for creating re-usable components in Octopus Deploy.
navOrder: 70
hideInThisSection: true
---

[Step Templates](/docs/projects/custom-step-templates/) and [Script Modules](/docs/deployments/custom-scripts/script-modules/) allow you to extend the functionality of Octopus Deploy.  While they appear similar, they are designed to meet different goals.

- Step Templates are re-usable steps you can inject into your deployment or runbook process to perform a specific task.  Examples include stopping IIS, deploying database migration scripts using a third-party tool such as Flyway, notifying VictorOps of a completed deployment, and more.
- Script Modules are re-usable functions you can inject into scripts run by your deployment or runbook process.  Examples include a function to call the Octopus API, functions to write output to a centralized log, or a function to find an item in a list by name.

:::hint
Step templates can use script module functions, but script module functions cannot use step templates.
:::

## Step Template or Script Module

Our recommendation is to create a step template when you want to create a re-usable unit of work.  For example, you want everyone to follow the same standards for deploying to NGINX.  A step template allows you to inherit from the deploy to NGINX built-in step and add your custom rules on top of it.

Our recommendation is to create a script module when you need to share utility functions with your scripts in your project.  Script modules are injected into every script in every step of your deployment or runbook process.  

## Structure

Our recommendation is to write script modules and step templates to be self-contained with no dependencies.  While they have full access to all projects, tenants, referenced library set variables, and system variables, you don't know which project the step template or script module will be used.  Use parameters instead of directly referencing any project, library variable set, or system variables.  

If you are writing custom scripts, passing in parameters will allow you to copy those scripts to your IDE of choice, such as VS Code, and debug your scripts with few modifications.  

## Logging

Our recommendation is you can never have enough logging.  Logging informs your users of the location of the script module or step template they are.  It also helps debug if something isn't working as it should.  

[Octopus Deploy](/docs/deployments/custom-scripts/logging-messages-in-scripts/) supplies built-in logging utilities you can leverage in your scripts.  Using the built-in logging utilities is one of the few areas where it is okay to directly reference these functions instead of passing them in as parameters.

We also recommend leveraging the different logging levels as Octopus treats each one differently.

- Verbose: Automatically hidden by default, useful for low-level logging messages you think will only be useful to other developers.
- Information: Is shown in the task log by default.  Useful for logging status messages to the user.
- Warning: Messages are highlighted in yellow in the task log. Helpful if something isn't quite right, but the script was able to recover.
- Error: Messages are highlighted in red in the task log and task summary.  This is for what it says on the tin, error messages.
- Highlight: Messages are highlighted in blue in the task log and task summary.  Use these for important messages you want to let the user know about.  

Octopus provides [manual interventions](/docs/projects/built-in-step-templates/manual-intervention-and-approvals/) which pause the deployment and allow people to review the progress made so far.  Putting information needed for approvals in logs can make it difficult for the approvers to find.  If there is information needed for approvals, such as test results or database delta scripts, the recommendation is to create an [artifact](/docs/projects/deployment-process/artifacts/).

## Further reading

For further reading on step templates and script modules in Octopus Deploy please see:

- [Step Templates](/docs/projects/custom-step-templates/)
- [Built-in Step Templates](/docs/projects/built-in-step-templates/)
- [Community Step Templates](/docs/projects/community-step-templates/)
- [Script Modules](/docs/deployments/custom-scripts/script-modules/)

<span><a class="btn btn-secondary" href="/docs/getting-started/best-practices/variables">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/best-practices/users-roles-and-teams">Next</a></span>

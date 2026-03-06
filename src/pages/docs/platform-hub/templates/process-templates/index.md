---
layout: src/layouts/Default.astro
pubDate: 2025-09-23
modDate: 2026-03-05
title: Process templates
subtitle: An overview of Process Templates
icon: fa-solid fa-layer-group
navTitle: Overview
navSection: Process Templates
description: An overview of Process Templates
navOrder: 150
---
## Overview

Process templates are reusable sets of deployment steps that can be shared across multiple spaces in Octopus Deploy. Instead of copying and pasting deployment processes across teams and applications, which often leads to configuration drift, unnecessary duplication, and operational debt, you create a single source of truth that any project can consume. By abstracting your best practices for deployments into Process Templates, you make it easy for teams to follow standards and accelerate delivery.

To create or manage your process templates, navigate to Platform Hub. If you haven't set up your Git repository, you must do so first before creating a process template. Similarly, if you've already created templates or are joining an existing team, you'll see the existing templates on the template overview.

:::figure
![The Process Templates Overview page where users create process templates](/docs/img/platform-hub/process-template-overview.png)
:::

Before you can define the deployment process for your template, you must create the template first.

1. Navigate to Process Templates in Platform Hub.
2. Give the process template a **Name** and an optional **Description**.
3. Create your process template.

:::figure
![The experience after creating the template with a name and description](/docs/img/platform-hub/process-template-first-creation.png)
:::

You've created your process template; now, define its deployment process.

A deployment process is a set of steps the Octopus Server orchestrates to deploy your software. Each process template has a single deployment process. You can use Octopus's built-in steps to define this process for your process template.

:::figure
![The add step experience for a process template](/docs/img/platform-hub/process-template-add-step.png)
:::

Some steps look different inside a process template. They ask for a parameter rather than allowing you to define a value. These steps ask for a resource that Platform Hub cannot define, such as Worker Pools, and you must define them inside a project. These fields accept parameters so you can define the values the process template needs inside a project.

:::figure
![The run a script step asks for a worker pool parameter instead of a worker pool](/docs/img/platform-hub/process-template-step-example.png)
:::

:::div{.warning}
Our initial release of Process Templates does not include support for a few built-in steps.
:::

Once you have set up a deployment process, you can use it in any space for a deployment or runbook.

## Parameters

Parameters help you easily manage and apply the correct values during a deployment or runbook run that uses a process template. Using parameters, you can use the same process template across your projects and tailor the inputs based on the project's needs.

For a full reference of supported parameter types and default values, see [Template parameters](/docs/platform-hub/templates/parameters).

To create a parameter, navigate to the **Parameters** tab on a process template and add a new parameter.

:::figure
![The parameters section in a process template](/docs/img/platform-hub/process-template-parameters.png)
:::

### Sensitive parameter defaults

:::div{.hint}
The ability to add default values for Sensitive/password box parameters is available from **Octopus 2026.1**.
:::

Unlike the other parameters, sensitive default values are stored securely in the database with a unique GUID identifier. This identifier is used in the process template to reference the default sensitive value in the database. Because of this approach, sensitive default values are supported in CaC workflows. Scoping for Sensitive/password box parameters is not currently supported.

You can set a default value for a sensitive parameter by navigating to the parameters tab of your process template and committing your changes. When the template is saved, sensitive default values are stored encrypted in the database with a unique identifier. In the OCL, the parameter block will look something like this:

```hcl
parameter "Example Sensitive Parameter" {
    display_settings = {
        Octopus.ControlType = "Sensitive"
    }
    help_text = "An Example Sensitive Parameter"
    label = "An Example Sensitive Parameter"

    value "10d00c16-c905-43fa-90cd-088e22b31751" {}
}
```

The GUID value in the OCL is a reference to the database-stored sensitive value. When the process template is used in a project or runbook, it will retrieve the sensitive value from the database.

### Parameter scoping

Only Account parameters will allow you to scope them by environments. You can choose to scope them by any environment across your Octopus instance.

:::div{.hint}
When a process template is used inside a project, the project supplied values will take precedence over the process template provided ones for overlapping scopes. This includes unscoped project supplied values. For more information on how the precedence works, please visit the [troubleshooting page](/docs/platform-hub/templates/process-templates/troubleshooting).
:::

:::figure
![The account parameter allowing scoping to environments present across Octopus instance](/docs/img/platform-hub/process-templates-account-scoping.png)
:::

## Saving, publishing, and sharing

Once you've configured your process template, see [Publishing and sharing templates](/docs/platform-hub/templates/publishing-and-sharing) for how to commit, publish, and share it.

## A Hello world deployment process in a process template

To define a simple deployment process in Octopus that executes a hello world script on the Octopus Server, complete the following steps:

1. Navigate to **Platform Hub**
2. Add a process template
3. Name the template, for instance, "Hello World", and add an optional description.
4. Add a deployment step.
5. Choose the type of step you'd like to add to filter the available steps.
6. Find the **Run a Script** step and add it to your deployment process.
7. In the Process Editor, give the step a name, for instance "Run a Hello World script".
8. In the Execution Location section use the **Run on the worker pool parameter** option.
9. Create a Worker Pool parameter.
10. Add the Worker Pool parameter to the **Worker Pool** field.
11. Paste the following PowerShell script into the **Inline Source Code** editor:

    ```powershell
    Write-Host "Hello, World!"
    ```

12. Commit your template.
13. Publish and Share your template.
14. Visit a project, and its deployment process
15. Choose the process template you just published
16. Choose the Worker Pool in the parameters tab
17. Add any steps before or after the process template

You can now deploy this process to say "Hello, World!".

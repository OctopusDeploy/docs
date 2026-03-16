---
layout: src/layouts/Default.astro
pubDate: 2026-03-05
modDate: 2026-03-16
title: Project templates
subtitle: An overview of project templates
icon: fa-solid fa-layer-group
navTitle: Overview
navSection: Project Templates
description: An overview of project templates
navOrder: 170
---

:::div{.warning}
Project templates are in Alpha. The feature is incomplete and standard SLAs do not apply. Don't use it for production workloads. It is available to Enterprise customers on Cloud. Self-hosted customers can access it as an early preview via Octopus 2026.2. We're actively developing this feature and would love your feedback.
:::

## Overview

Project templates are reusable project blueprints that can be shared across multiple spaces in Octopus Deploy. Instead of manually configuring each new project from scratch, defining deployment steps and variables every time, you create a single template that any space can use as a starting point. This ensures teams follow the same standards and removes the risk of configuration drift.

To create or manage your project templates, navigate to the Platform Hub. If you haven't set up your Git repository, you must do so before creating a project template.

1. Navigate to **Project Templates** in Platform Hub.
2. Give the project template a **Name** and an optional **Description**.
3. Create your project template.

:::figure
![Creating a project template with a name and description](/docs/img/platform-hub/project-templates/project-templates-onboarding.png)
:::

After creating your template, Octopus adds the template's [folder and OCL files](#git-repository-structure) to your Git repository. If you've already created templates or are joining an existing team, you'll see the existing templates on the overview page.

:::figure
![The Project Templates overview page](/docs/img/platform-hub/project-templates/project-templates-list.png)
:::

You can now define the deployment process, parameters, and variables for the template.

## Deployment process

The deployment process defines the steps Octopus orchestrates when deploying a project created from this template. Each project template has a single deployment process, and you can use Octopus's built-in steps, Step Templates, Community Step Templates, and Process Templates to define it.

Projects created from the template can't modify the deployment process. They can't add, remove, reorder, or disable steps. The only thing a project can configure is the parameter values the producer has explicitly exposed, ensuring every project based on the template follows the same deployment process.

Some steps behave differently inside the project template editor. Instead of letting you set a value directly, they ask for parameters or variables. Parameters are required when a step requires a resource that Platform Hub can't define, such as a Worker Pool, and that resource must be supplied by the project. These fields accept parameters so projects can provide the right values for their context.

:::figure
![A step in a project template asking for a Worker Pool parameter](/docs/img/platform-hub/project-templates/project-templates-process-editor.png)
:::

:::div{.hint}
Unlike standard projects, project templates validate the deployment process when you publish, not when you commit. You can save an incomplete process and continue configuring parameters and variables before publishing. This makes it easier to build your template incrementally: define the process first, then wire up parameters and variables as you go.
:::

:::div{.hint}
If your deployment process includes a process template configured to auto-update on patch or minor versions, those updates flow through to templated projects automatically, even without you publishing a new version of the project template. This means a consumer could create two releases on different days and find that different versions of the process template were used, without either the producer or consumer making any change to the project template itself. We're interested in your [feedback](https://roadmap.octopus.com/submit-idea) on whether this behavior meets your expectations.
:::

## Parameters

Parameters let you define the inputs a project must supply when it's created from the template. They're the mechanism for making a template flexible. Rather than hardcoding values that differ between teams or spaces, you expose them as parameters.

:::div{.warning}
In the Alpha release, project templates don't support parameter scoping or sensitive parameter values. We're still working out how parameters, variables, and scoping should work in project templates and expect this to evolve throughout Alpha. We'd love your [feedback](#feedback).
:::

For a full reference of supported parameter types and default values, see [Template parameters](/docs/platform-hub/templates/parameters).

To create a parameter, navigate to the **Parameters** tab on your project template and add a new parameter.

:::figure
![The Parameters tab in a project template](/docs/img/platform-hub/project-templates/project-templates-parameters.png)
:::

## Variables

Variables in a project template work the same way as project variables in a standard Octopus project. Any variable you define is available to the deployment and can be selected in steps.

Unlike parameters, projects can't override the variables set in a template. Use this for values that must be the same across every project, like accounts or credentials. If you want projects to supply their own value for something, expose it as a parameter instead.

Variable values can reference parameters, letting you combine fixed template-level values with project-supplied inputs where needed.

:::div{.warning}
In the Alpha release, the variable types you can use are limited to resources currently available in Platform Hub, such as Accounts and Git Credentials. Variable scoping is also not supported. We're adding support for additional resource types throughout Alpha. We'd love your [feedback](#feedback) on what you need.
:::

:::figure
![The Variables tab in a project template](/docs/img/platform-hub/project-templates/project-templates-variables.png)
:::

## Git repository structure

Octopus stores each project template as a folder in the Platform Hub Git repository. The folder name is a slug derived from the template name. Each folder contains four OCL files:

```text
project-templates/<template-slug>/
    deployment_process.ocl
    parameters.ocl
    template.ocl
    variables.ocl
```

- **`template.ocl`** contains the template name and description.
- **`deployment_process.ocl`** contains the deployment process steps.
- **`parameters.ocl`** contains the parameters defined for the template.
- **`variables.ocl`** contains the variables defined for the template.

Octopus stores published versions, sensitive variables, and space sharing configurations in the database, not in the Git repository.

## Saving, publishing, and sharing

After you've configured your project template, see [Publishing and sharing templates](/docs/platform-hub/templates/publishing-and-sharing) for how to commit, publish, and share it.

## Using a project template

After you publish and share a template, users in a space can create a new project from it. For details on the consumer experience, see [Templated projects](/docs/platform-hub/templates/project-templates/using-project-templates).

## Feedback

Project templates are in Alpha and we're actively shaping how the feature works. If you run into something unexpected or have thoughts on how parameters, variables, scoping, or anything else should work, we'd love to hear from you. [Share your feedback](https://roadmap.octopus.com/submit-idea) to help us build this the right way.

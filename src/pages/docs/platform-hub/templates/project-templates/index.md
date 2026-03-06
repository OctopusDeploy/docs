---
layout: src/layouts/Default.astro
pubDate: 2026-03-05
modDate: 2026-03-06
title: Project templates
subtitle: An overview of Project Templates
icon: fa-solid fa-layer-group
navTitle: Overview
navSection: Project Templates
description: An overview of Project Templates
navOrder: 170
---

:::div{.warning}
Project templates are in Alpha. The feature is incomplete and standard SLAs do not apply. Do not use it for production workloads. It is available to Enterprise customers on Cloud. Self-hosted customers can access it as an early preview via Octopus 2026.2. We're actively developing this feature and would love your feedback as you test it.
:::

## Overview

Project templates are reusable project blueprints that can be shared across multiple spaces in Octopus Deploy. Instead of manually configuring each new project from scratch, defining deployment steps, parameters, and variables every time, you create a single template that any space can use as a starting point. This ensures teams follow the same standards and removes the risk of configuration drift as projects multiply.

To create or manage your project templates, navigate to Platform Hub. If you haven't set up your Git repository, you must do so first before creating a project template. If you've already created templates or are joining an existing team, you'll see the existing templates on the overview page.

:::figure
![The Project Templates overview page](/docs/img/platform-hub/project-templates/project-templates-list.png)
:::

Before you can configure your template, you must create it first.

1. Navigate to **Project Templates** in Platform Hub.
2. Give the project template a **Name** and an optional **Description**.
3. Create your project template.

:::figure
![Creating a project template with a name and description](/docs/img/platform-hub/project-templates/project-templates-onboarding.png)
:::

Once created, Octopus adds the template's [folder and OCL files](#git-repository-structure) to your Git repository. You can now define the deployment process, parameters, and variables for the template.

## Deployment process

The deployment process defines the steps Octopus orchestrates when a project created from this template is deployed. Each project template has a single deployment process, and you can use Octopus's built-in steps to define it.

:::figure
![The deployment process in a project template](/docs/img/platform-hub/project-templates/project-templates-process-overview.png)
:::

:::div{.hint}
Projects created from this template cannot modify the deployment process in any way. They cannot add steps, remove steps, reorder steps, or disable them. The only thing a project can configure is the parameter values the platform engineer has explicitly exposed. This is by design. It ensures every project follows the same deployment process.
:::

Some steps behave differently inside a project template. Instead of letting you set a value directly, they ask for a parameter. This happens when a step requires a resource that Platform Hub can't define, such as a Worker Pool, and that resource must be supplied by the project. These fields accept parameters so projects can provide the right values for their context.

:::figure
![A step in a project template asking for a Worker Pool parameter](/docs/img/platform-hub/project-templates/project-template-process-editor.png)
:::

## Parameters

Parameters let you define the inputs a project must supply when it's created from the template. They're the mechanism for making a template flexible. Rather than hardcoding values that differ between teams or spaces, you expose them as parameters.

:::div{.warning}
In the Alpha release, project templates do not support parameter scoping or sensitive parameter values. We're still working out how parameters, variables, and scoping should work in project templates and expect this to evolve throughout Alpha. We'd love your [feedback](#feedback) as you test this.
:::

For a full reference of supported parameter types and default values, see [Template parameters](/docs/platform-hub/templates/parameters).

To create a parameter, navigate to the **Parameters** tab on your project template and add a new parameter.

:::figure
![The Parameters tab in a project template](/docs/img/platform-hub/project-templates/project-templates-parameters.png)
:::

## Variables

Variables in a project template work the same way as project variables in a standard Octopus project. Any variable you define here will be available to all projects created from the template.

Variable values can reference parameters, letting you keep the template consistent while still allowing projects to supply their own inputs for specific values.

You can scope variables to Environments, Channels, and Steps within the template. Scoping to Tenant Tags, Targets, Target Tags, and Deployment Process is not supported.

:::div{.warning}
In the Alpha release, the variable types you can use are limited to resources available in Platform Hub, such as Accounts and Git Credentials. Support for additional resource types is being added throughout Alpha. We'd love your [feedback](#feedback) on what you need.
:::

:::figure
![The Variables tab in a project template](/docs/img/platform-hub/project-templates/project-templates-variables.png)
:::

## Git repository structure

Each project template is stored as a folder in the Platform Hub Git repository. The folder name is a slug derived from the template name. Inside each folder, there are four OCL files:

```
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

Published versions and space sharing configurations are stored in the database, not in the Git repository.

## Using a project template

Once a template is published and shared, users in a space can create a new project from it. When creating the project, they supply values for the parameters you've defined. These are referred to as **Template values** in the Octopus UI. Once the parameter values are set, they can create a release and deploy it. The deployment process cannot be modified.

When you publish a new version of the template, projects receive and can action the update in the same way as process templates.

## Saving, publishing, and sharing

Once you've configured your project template, see [Publishing and sharing templates](/docs/platform-hub/templates/publishing-and-sharing) for how to commit, publish, and share it.


## Feedback

Project templates are in Alpha and we're actively shaping how the feature works. If you run into something unexpected or have thoughts on how parameters, variables, scoping, or anything else should work, we'd love to hear from you. [Share your feedback](https://roadmap.octopus.com/submit-idea) to help us build this the right way.

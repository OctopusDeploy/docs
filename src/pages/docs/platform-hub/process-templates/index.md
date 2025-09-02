---
layout: src/layouts/Default.astro
pubDate: 2025-09-30
modDate: 2025-09-30
title: Overview
subtitle: An overview of Process Templates
icon:
navTitle: Overview
navSection: Process Templates
description: An overview of Process Templates
navOrder: 71
---
## Overview

Process templates are reusable sets of deployment steps that can be shared across multiple spaces in Octopus Deploy. Instead of copying and pasting deployment processes across teams and applications, which often leads to configuration drift, unnecessary duplication, and operational debt, you create a single source of truth that any project can consume. By abstracting your best practices for deployments into Process Templates, you make it easy for teams to follow standards and accelerate delivery.

:::div{.warning}
Process templates are in Public Preview for all Enterprise Cloud Customers.
:::

To create or manage your process templates, navigate to Platform Hub. If you haven't set up your Git repository, you must do so first before creating a process template. Similarly, if you've already created templates or are joining an existing team, you'll see the existing templates on the template overview.

![The Process Templates Overview page where users create process templates](~/docs/platform-hub/process-template-overview.png~)

Before you can define the deployment process for your template, you must create the template first.

1. Navigate to Process Templates in Platform Hub.
2. Give the process template a **NAME** and an optional **DESCRIPTION**
3. Create your process template.

![The experience after creating the template with a name and description](~/docs/platform-hub/process-template-first-creation.png~)

You've created your process template; now, define its deployment process.

A deployment process is a set of steps the Octopus Server orchestrates to deploy your software. Each process template has a single deployment process. You can use Octopus's built-in steps to define this process for your process template.

![The add step experience for a process template](~/docs/platform-hub/process-template-add-step.png~)

Some steps look different inside a process template. They ask for a parameter rather than allowing you to define a value. These steps ask for a resource that Platform Hub cannot define, such as Worker Pools, and you must define them inside a project. These fields accept parameters so you can define the values the process template needs inside a project.

![The run a script step asks for a worker pool parameter instead of a worker pool](~/docs/platform-hub/process-template-step-example.png~)

:::Warning
Our initial release of Process Templates does not include support for custom step templates, community step templates, and a few built-in steps.
:::

Once you have set up a deployment process, you can use it in any space for a deployment or runbook.

## Parameters

Parameters help you easily manage and apply the correct values during a deployment or runbook run that uses a process template. Using parameters, you can use the same process template across your projects and tailor the inputs based on the projects needs.

Process Templates can manage the following as parameters.

- AWS Account
- Azure Account
- Certificate
- Channels
- Checkbox
- Container Feed
- Drop down
- Environments
- Generic OIDC Account
- Google Cloud Account
- Multi-line text box
- Single-line text box
- Target Tags
- Teams
- Tenant Tags
- Username Password Account
- Worker Pool
- A previous step name

To create a parameter, you can navigate to the parameters tab on a process template and add a new parameter.

![The parameters section in a process template](~/docs/platform-hub/process-template-parameters.png~)

### Parameter values

You can set an optional default value for these parameters:

- Single-line text
- Multi-line text
- Dropdown
- Checkbox
- AWS Account
- Azure Account
- Generic OIDC Account
- Google Cloud Account
- Username Password Account

You cannot set a default value for these parameters, they must be set inside a project:

- Certificate
- Sensitive
- Worker Pools
- Package
- Previous deployment step name
- Target Tags
- Teams
- Tenant Tags
- Environments
- Container Feed
- Channels

### Parameter scoping

Only Account parameters will allow you to scope them by environments. You can choose to scope them by any environment across your Octopus instance.

![The account parameter allowing scoping to environments present across Octopus instance](~/docs/platform-hub/process-templates-account-scoping.png~)

## Saving a Process Template

Once you've finished making changes to your process template you can commit them to save the changes to your Git repository. You can either **Commit** with a description or quick commit without one.

![The commit experience for a process template](~/docs/platform-hub/process-templates-commit-experience.png~)

## Publishing a Process Template

Once you've made your changes, you will have to publish the template to reflect the changes you've made. You will have three options to choose from when publishing changes:

- Major changes (breaking)
- Minor changes (non-breaking)
- Patch (bug fixes)

You can also optionally publish a pre-release version, which can be used to test the template.

:::hint
The first time you publish a template you can only publish a major or pre-release version
:::

Selecting any option increments the version number following Semantic Versioning. For minor or patch updates, projects that accept these changes will automatically upgrade to the newly published version.

![Publish experience for a process template](~/docs/platform-hub/process-templates-publishing.png~)

### Pre-releases

If you wish to test your changes before publishing a major, minor, or patch version, you can mark a template as a pre-release version.

![Marking a process template as pre-release](~/docs/platform-hub/process-template-prerelease.png~)

## Sharing a template

You must share the process template before it can be consumed by any projects. Process templates can be shared with all current and future spaces, or a select few spaces.

:::hint
Sharing settings can be updated anytime.
:::

![Sharing experience for process templates](~/docs/platform-hub/process-template-sharing.png~)

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
15. Add Step > Add Process Template
16. Choose the process template you just published
17. Choose the Worker Pool in the parameters tab
18. Add any steps before or after the process template

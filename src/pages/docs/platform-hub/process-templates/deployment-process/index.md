---
layout: src/layouts/Default.astro
pubDate: 2025-07-17
title: Process template deployment process
description: Defining your deployment process inside a process template
---

You've created your process template; now, define the deployment process it will use.

A deployment process is a set of steps the Octopus Server orchestrates to deploy your software. Each process template has a single deployment process. You can use Octopus's built-in steps to define this process for your process template.

Some steps look different inside a Process Template. They ask for a parameter rather than allowing you to define a value. These steps ask for a resource that Platform Hub cannot define, such as Worker Pools, and you must define them inside a project. These fields accept parameters so you can define the values the process template needs when it's inside a project.

:::Warning
Custom step template, community step templates and some built-in steps are not available for our EAP release of Process Templates.
:::

Once you have set up a deployment process, you can use it in any space for a deployment process or runbook.

## Parameters

Parameters are how you easily manage and apply the correct vlaues during a deployment that uses a process template. Using parameters, you can use the same process template across your environments and tailor the inputs based on the projects needs.

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

To create a parameter, you can navigate to the parameters tab on a process template and click **Add Parameter**.

### Parameter values

The following parameters will allow you to set a default value in Platform Hub:

- Single-line text
- Multi-line text
- Dropdown
- Checkbox

The following parameters will not allow you to set a default value in Platform Hub and must be set inside a project:

- Certificate
- Sensitive
- Worker Pools
- Package
- Previous deployment step name

### Parameter scoping

Only Account parameters will allow you to scope them by environments. You can choose to scope them by any environment across your Octopus instance.

## Saving a Process Template

Once you've finished making changes to your process template you can commit them to save the changes to your Git repository. You can click the **Commit** button to add a summary and description or **Quick Commit** to quickly save changes.

## Publishing a Process Template

Once you've made your changes, you will have to publish the template to reflect them inside the process template within a project. You will have four options to choose from when publishing changes:

- Major changes (breaking)
- Minor changes (breaking)
- Patch (bug fixes)
- Flag as pre-release

:::hint
The first time you publish a template you can only publish a major or pre-release version
:::

Selecting any option increments the version number following Semantic Versioning. For minor or patch updates, consuming projects that accept these changes will automatically upgrade to the newly published version.

### Pre-releases

If you wish to test your changes before publishing a major, minor, or patch version, you can mark a template as a pre-release version.

## Sharing a template

You must share the process template before it can be consumed by any projects. Sharing settings can be found in the overflow menu next to the **Commit** button in the UI. Process Templates can be shared with all current and future spaces, or a select few spaces.

Sharing settings can be updated anytime.

## A Hello world deployment process in a process template

To define a simple deployment process in Octopus that executes a hello world script on the Octopus Server, complete the following steps:

1. Navigate to **Platform Hub**
2. Click **Add Process Template**
3. Name the template, for instance, > Hello world, and click **Add**
4. Click **Add Step**
5. Choose the type of step you'd like to add to filter the available steps: **Script**.
6. Find the **Run a Script** step and click **Add Step**.
7. In the Process Editor, give the step a name, for instance > Run Hello World scipt.
8. In the Execution Location section select the **Run on the worker pool parameter** option.
9. Create a Worker Pool parameter from the parameters tab.
10. Add the Worker Pool parameter to the **Worker Pool** field.
11. Paste the following PowerShell script into the **Inline Source Code** editor.

~~~ps
Write-Host "Hello, World!" 
~~~

12. Click the **Commit** button

You now have a simple hello world process template that can be published and shared with any project.

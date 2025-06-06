---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-02-18
title: Custom step templates
icon: fa-solid fa-shapes
description: How to create reusable steps
navOrder: 60
---

Sometimes there isn't a [built-in step template](/docs/projects/built-in-step-templates/) or a [community step template](/docs/projects/community-step-templates) available that does what you need. Or perhaps several of your projects have similar or identical steps. You can create your own custom step templates to reuse across your projects. You can also share them with the community.

Custom step templates can be based on a built-in or installed community step template. These custom step templates can be reused in projects and managed in the step template library.

## Creating custom step templates

To create your own step template, perform the following.

1. Navigate to the **Deploy ➜ Step templates** area and click **Create Step Template**.
2. Select a built-in step to base your custom step template on.  
3. Populate the step template. 

There are three parts to any step template:

1. Step details
2. Additional parameters
3. Settings

## Step

The Step tab is where you fill out the details of what the step will do. This tab gives you exactly the same fields as you would see if you added the step type directly to your project, so it will be the most familiar.

Any details that need to be specified at the project level can be handled using parameters. Any parameters specified in the Parameters tab will be exposed to you as [variables](/docs/projects/variables) and can be used in the same way.

## Parameters

The Parameters tab allows you to specify fields that will be filled out by the users of this step.

:::figure
![Add new step template parameter](/docs/projects/images/step-templates-new-parameter.png)
:::

You're required to give the parameter a variable name to use, as well as an optional label, help text and default value.

You can choose the way the field will appear to a user with the **Control type** field. There are a number of options available, however keep in mind the end result will be a variable with a string value.

Any variables you configure as parameters will be available as variables that can be used in the Step tab of the step template.

## Settings

The Settings tab allows you to give your step a name and optional description.

## Usage

After saving your step, you'll notice another page called Usage. This page shows where the step is being used and whether the version being used is current or a previous version.

A warning icon will show next to the Usage link if any projects are out-of-date. You have the ability to filter database-backed usages by project, process type, and whether they are on the latest version of the step template or not.

:::figure
![Step templates usage](/docs/projects/images/step-templates-usage.png)
:::

If you have [version-controlled](/docs/projects/version-control) projects that use step templates, you will be able to see a tab with version-controlled usages from up to twenty recent releases. You can filter this list to search for usage in a specific branch or use the advanced filters. 

:::div{.hint}
Note: The list of version-controlled usages will only include processes that have been released since converting to version control, and usages will be detected only if a version-controlled process used the step template at the time the release was created.
:::

## Custom logo

Custom step templates inherit their logo from the template that was used to create them. This means that most of them will share the same logo. Fortunately this can be easily changed and each custom template can have its own unique logo. To do that, navigate to the Settings tab and upload a custom logo from there.

## Export your custom step template

If you want to transport, backup, or share your custom step templates with the community, you can export a template by clicking the **Export** link.

:::figure
![Export step templates](/docs/projects/images/step-templates-export.png)
:::

Now you can take that exported template document and commit it to source control, or share it on the [Community Library](https://oc.to/community-library).

:::div{.success}
Take a look at the [contributing guide](https://github.com/OctopusDeploy/Library/blob/master/.github/CONTRIBUTING.md) for the Community Library and submit your step template as a [pull request](https://github.com/OctopusDeploy/Library/pulls).
:::

## Linking custom step templates to community step templates

Once a day Octopus retrieves the latest step templates from the [Community Library](https://oc.to/community-library). At the end of that process it also tries to link the community step templates to any existing custom templates that have been imported manually in the past. Once the link is established, the custom template can receive updates directly from the [Community Library](https://oc.to/community-library). If all the properties **except the version property** match, the custom step template and the community step template will be linked.

If the linking process isn't linking a template that you believe should be linked, then you may not have the latest version of the template. The easiest way to fix this problem is to manually update the template with the data from the [Community Library](https://oc.to/community-library).

## Running script based custom step templates

You can run script based custom step templates on a group of machines. This can be very handy to execute script based step templates to test them before starting to use them in your projects as well as performing regular admin or operations functions. This should be familiar to people who have used the [script console](/docs/administration/managing-infrastructure/performance/enable-web-request-logging) in the past.

:::div{.hint}
It's important to note that you can only run script based custom step templates. It's not currently possible to execute step templates based on other step types.
:::

To run a script based step template, perform the following.

1. Navigate to **Deploy ➜ Step templates** area and click the **Run** button next to the script based custom step template or alternately, select a script template and click the **Run** button from the template editor page:

   ![Run step template](/docs/projects/images/step-templates-run.png)

2. Select a group of targets to run the step on. This can be done by target name or by environments and tags.
3. Enter any required parameters.
4. Click the **Run now** button. This will execute the step as a new task. The full script can be found under the Template Parameters tab:

   ![Task parameters](/docs/projects/images/step-templates-run-task-parameters.png)

To re-run the script against different deployment targets or modify the input parameters, simply click the **Modify and re-run** button in the overflow menu (`...`).

## Common step properties

All steps have a name, which is used to identify the step.

:::div{.warning}
Be careful when changing names. Octopus commonly uses names as a convenient identity or handle to things, and the steps and actions in a deployment process are special in that way. For example, you can use [output variables](/docs/projects/variables/output-variables) to chain steps together, and you use the name as the indexer for the output variable. E.g. `#{Octopus.Action[StepA].Output.TestResult}`
:::

## Removing step templates

For projects using Config as Code, it's up to you to take care to avoid deleting any step templates required by your deployments or runbooks. See our [core design decisions](/docs/projects/version-control/unsupported-config-as-code-scenarios#core-design-decision) for more information. 

## Learn more

- [Blog: Creating an Octopus Deploy step template](https://octopus.com/blog/creating-an-octopus-deploy-step-template)

---
layout: src/layouts/Default.astro
pubDate: 2025-09-30
modDate: 2025-09-30
title: Process Templates
navTitle: Setting up your Process template
navSection: Process Templates
description: Setup your Process Template and use it in a project.

---

## Creating a Process Template

::: hint
You have to setup Platform Hub with a Git repository before you can setup your first Process Template
:::

You can create a Process Template from Platform Hub via the Add Process Template experience. If you wish to create templates on a separate branch before moving them to main so you can test templates before promoting them to main, please switch branches before creating the Process Template. All created templates are stored as OCL in the connected Git repository.

<!-- TO-DO add images -->

## Define your deployment process

After you've created the Process Template, you will now need to define it's deployment process. You can do this via the "Add Step" experience in the Octopus UI or write your deployment process as OCL into the Git repository. Unsupported steps will be disabled in the UI regardless of the creation method you chose.

## Use parameters in your deployment process

Parameters are how you easily manage and apply the correct values during a deployment that uses a process template. Using parameters, you can use the same process template across your projects and tailor the inputs based on the project's needs.
Process templates can manage the following resources as parameters:

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
- Single-lin text box
- Target Tags
- Teams
- Tenant Tags
- Username Password Account
- Worker Pool
- A previous step name
- Package
- Project
- Sensitive Password

### When to use parameters

Use parameters within Process Templates when you want to set placeholder values that can be overridden to customize the Process Template for the specific project it is used in. Do not use a parameter if you do not want a value for a step overridden. Instead, supply the value directly inside the Step.

The following parameters let you set a default value in Platform Hub. If a value is provided for these parameters inside a project, the default value is overridden.

- Single-line text
- Multi-line text
- Dropdown
- Checkbox
- Accounts

These parameters do not need to have a default value. They can still be used in a process template in Platform Hub and will use the value provided by a developer when the process template is used in a project.

All other parameters will not let you set a default value in Platform Hub. When used inside a project, users must select a value for them, or an error will be shown on save or commit.

### How to use parameters

To create a parameter, you can navigate to the parameters tab on a Process Template and use the Add parameter experience.

<!-- To-Do add image here-->

We recommend you add a label and help text to inform users what each parameter is used for and what value you are expecting them to provide inside a project.

- Use Labels to give extra context to parameter names when their expected values are unclear. For example, if your parameter is called “Release Version”, and you want developers to provide the version to deploy, you’d label the parameter “Enter the version you want to deploy.”
- Use Help text to clarify the expected values for this parameter and specify the step where it is used. For instance, if you have an account parameter used in three steps of your Process Template, you might write, “Please use Production Azure Account values in this field. This parameter is used in the Apply a Terraform Step to authenticate with our Azure environment and create Terraform resources.”

:::hint
If you wish to use a Platform Hub Account in your deployment process you must create it first in Platform Hub, create an account parameter, and then use the parameter in the Process Template.
:::
<!-- To-Do add image here-->

### How does parameter scoping work

Only account parameters can be optionally scoped by environments. You can choose to scope them by any environment in any space. To do this, use the “Define scope” dropdown when configuring a process template in Platform Hub,  and select from the available environments.

The account parameters' default values apply to the chosen scope when used within a project. The account parameter field accepts only a single project variable and will override the default if the project variable's scope matches the Process Template’s account scope. If the account parameter provides no scopes

Here are some examples that demonstrate common account environment scoping use cases:

- If the Process Template provides an AWS account scoped to Development (Default), Staging (Default), and Production (Default), and it is used in the default space, then the process template will use the AWS account value for Development, Staging, and Production environments if no project variables are provided. However, if a project variable is provided with an AWS account scoped to Development and Staging, the process template will use the project variables' values for Development and Staging, and will use the Process Template AWS account for Production.
- If the Process Template provides an AWS account scoped only to Staging (Default) and Production (Default), and the project variable applies solely to Development (Default) in a space that includes Development, UAT, Staging, and Production, then the Process Template will use the project variable's value in Development and the Process Template's AWS account value for Staging and Production. The deployment will fail if an account value is needed for UAT, and none are provided through the project variable.

## Saving and sharing your Process Template

After you've made the changes that you want, you need to commit your changes in order to save them. You can do this via the "Commit" or "Quick Commit" button in the Octopus UI. After you've committed your changes, you will need to publish and then share them to spaces before any teams can use them.

There are a few different types of versions you can publish:

- Major version - Use this if your Process Template updates contain breaking changes.
- Minor version - Use this if your Process Template updates contain no breaking changes.
- Patch version - Use this if your Process Template updates contain only bugfixes that do not break the template.
- Pre-release version - Use this if you want to test your Process Template before you promote it to a regular version.

## Using a Process Template in a project

After you've committed, published and shared a Process Template, you can use it in a project. Process Templates can be used in both database and version-controlled projects for regular deployments and runbooks.

To use a Process Template in your deployment process, you can do the following **Add Step --> Add Process Template --> Select Process Template from dropdown**.

You can select what type of updates you wish to receive:

- Minor updates
- Patch updates

Picking either option will automatically update the Process Template based on the published version type in Platform Hub.

You can also choose to use the Pre-release version if you're:

- Testing changes after publishing a Pre-release version of a Process Template.
- An early adopter of Process Templates changes and want to try out newer version before they're ready for the rest of the company.

### Filling in parameters for a Process Templates

To tailor the Process Template to your project, you will need to fill out parameters attached to the Process Template. All parameters are mandatory and must be filled out inside a project or an error will be shown. For account parameters, only a project variable can be passed in. For all other parameters, developers can provide a value or bind to a variable, depending on what they need.

## Deploying using a Process Template

After filling in the required parameters for a Process Template, you can create a release or run a runbook with the process template inside. This will work the same as a regular deployment or runbook run, with all the same options available to you.

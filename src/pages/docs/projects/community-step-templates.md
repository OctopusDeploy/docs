---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-04-10
title: Community step templates
description: How to take advantage of step templates contributed by the Octopus community.
navOrder: 50
---

Community step templates are publicly available step templates that have been contributed by the Octopus Community, they're third party code that is licensed under [the Apache 2.0 license](https://github.com/OctopusDeploy/Library/blob/master/LICENSE.txt).

If you can't find a built-in step template that includes the actions you need, you should check the community step template. There is a large number and variety of step templates (and it's growing all the time) that can help you automate your deployments without writing any scripts yourself.

Octopus Community step templates integration is enabled by default, but it can be disabled.

## Enable or disable community step templates integration

1. Navigate to **Configuration ➜ Features**.
2. Expand the **Octopus Community Step Template** section by clicking on it.
3. Toggle the selection to either **Enabled** or **Disabled**, and click **SAVE**.

## Community step template synchronization

The community step templates are synchronized with the Octopus Server. The synchronization process is executed as a standard Octopus task and you can view its execution details from the **Tasks** area. The Octopus Server synchronizes with the [Octopus Library](https://library.octopus.com/) on startup and then every 24 hours over the Internet thus it requires Internet access. If there are any updates or changes, the sync process retrieves all the step templates and stores the relevant community step templates in the Octopus database. Step templates are persisted locally, but they cannot be used in a deployment process until they are explicitly installed.

The Octopus Server uses a sync task to connect to [https://library.octopus.com/](https://library.octopus.com/) over https (port 443). If you don't see any Community Step Templates after enabling the feature, verify outbound traffic is enabled on port 443.

NOTE: The relevant permissions to install and manage step templates are ActionTemplateCreate, ActionTemplateEdit, ActionTemplateView and ActionTemplateDelete.

## Adding community step templates

Unlike the built-in steps included in Octopus, you need to install Community Step Templates. There are three ways you can do this:

- As you define your deployment processes.
- From the **Library** area of the Octopus Web Portal.
- By importing them from the [Community Library](https://library.octopus.com/).

## Add a community step template as you define the deployment process

1. Navigate to your [project's](/docs/projects) overview page by selecting **Projects** and clicking on the project you are working with.
2. Click the **DEFINE YOUR DEPLOYMENT PROCESS** button, and click **ADD STEP**.
3. Scroll past the built-in step templates, and find the Community Step Template you want either by choosing from the available technologies or clicking **SHOW ALL**.
4. Before you install the template you can click **VIEW DETAILS** to view the parameters of the step and the source code.
5. To install the step template, hover over the step template's card and click **INSTALL AND ADD** and **SAVE**.

After the step template has been installed, it will be available alongside the built-in step templates.

## Add a community step template from the Octopus library

1. In the Octopus Web Portal, navigate to **Library ➜ Step Templates**.
2. Click **BROWSE LIBRARY**.
3. Find the Community Step Template you want either by choosing from the available technologies or clicking **SHOW ALL**.
4. Before you install the template you can click **VIEW DETAILS** to view the parameters of the step and the source code.
5. To install the step template, hover over the step template's card and click **INSTALL** and **SAVE**.

After the step template has been installed, it will be available alongside the built-in step templates.

## Import a community step template from the community library

If the Community Step Template feature has been disabled, you can still use community step templates by manually importing the JSON file (which contains all of the information required by Octopus) from the [Community Library](https://library.octopus.com/) into the step template library in Octopus.

1. Navigate to the [Community Library](https://library.octopus.com/) website.
2. Find the template you want to use, review the details, and click the **Copy to clipboard** button.
3. Navigate to **Library ➜ Step Templates** in the Octopus Web Portal and select **Import** from the custom step templates section.
4. Paste in the JSON document for the Step Template into the import window and click **SAVE**.

After the step template has been installed, it will be available alongside the built-in step templates.

## Adding an updated version of a community step template

Sometimes updates are available for step templates.  In this case, you will notice the step template has an option to update the step.  If you select update, you will be taken to the community step details with the option to update the latest version of the step template.  Community step templates can also be updated from the library as needed.

## Raising issues with a community step template

Issues can occur with community step templates, just as they can with built-in steps. That might be due to a deprecated technology or library used in a step, an untested scenario, or something as simple as a typo in a script.

If you run into any problems with a community step template, don't worry - [we are always here to help!](https://octopus.com/support)

Our community step templates live in our [Library repository](https://github.com/OctopusDeploy/Library) on GitHub. If you're familiar with GitHub, you can raise an [issue](https://github.com/OctopusDeploy/Library/issues), and a member of the Octopus team will triage the issue and work with you to get the issue resolved. 

In addition, as the code is open-source, you can also submit a [pull request](https://github.com/OctopusDeploy/Library/pulls) to fix an issue. We have [contributing guidelines](https://github.com/OctopusDeploy/Library/blob/master/.github/CONTRIBUTING.md) that we recommend reading before submitting a change.

## Security 

Community step templates are created, updated, and fixed by the Octopus team and the Octopus community. The Octopus team reviews all contributions before they are added to the Octopus library so that the step template only does what the template is designed to do and nothing malicious. 

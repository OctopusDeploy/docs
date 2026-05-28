---
layout: src/layouts/Default.astro
pubDate: 2026-03-16
modDate: 2026-05-28
title: Templated projects
subtitle: How to create and manage projects from a project template
icon: fa-solid fa-layer-group
navTitle: Templated projects
navSection: Project Templates
description: How to create and manage projects from a project template
navOrder: 171
---

:::div{.warning}
Project templates are in Public Preview. The feature is still evolving and standard SLAs don't apply. We don't recommend it for production workloads yet. It's available to Enterprise customers on Cloud and to self-hosted customers running Octopus 2026.2. We'd love your feedback as we work towards general availability.
:::

A **templated project** is a project created from a project template. It inherits the template's deployment process and variables, which you can't modify. You customize the project by supplying values for the parameters defined in the template.

## Create a project from a template

To use a project template, you create a new project based on it.

<!-- markdownlint-disable MD029 -->

1. Select **Projects** from the main navigation and click **Add Project**.
2. If there are any available project templates, you'll see them listed here. Select the template you want to use.

:::figure
![Selecting a project template when creating a new project](/docs/img/platform-hub/project-templates/project-template-selection.png)
:::

3. Give the project a **Name** and choose where its settings, non-sensitive variables, and template values will be stored.

:::figure
![Naming a templated project and choosing storage settings](/docs/img/platform-hub/project-templates/templated-project-creation.png)
:::

4. Click **Next** to configure your versioning preferences. You can change these later in project settings.

If the template has pre-release versions, you'll also be asked to choose a version type:

- **Stable**: intended for production use.
- **Pre-release**: intended for testing purposes only, typically by the template owner. Not recommended for production use.

:::figure
![Choosing between stable and pre-release template versions](/docs/img/platform-hub/project-templates/templated-project-version-selection.png)
:::

5. Select how you want the project to handle template updates:

   - **Accept minor changes**: automatically updates when a patch or minor version is published. Major versions require a manual update.
   - **Accept patches**: only automatically updates when a patch is published. Minor or major versions require a manual update.

:::figure
![Configuring template version update preferences](/docs/img/platform-hub/project-templates/templated-project-version-settings.png)
:::

<!-- markdownlint-enable MD029 -->

Click **Create Project**. You'll be taken to the **Template values** page.

## Template values

Template values are the parameters the template owner has defined to let you customize the template for your project. They work like project variables: you can provide a value directly or use variable substitutions. Parameters with defaults are marked as optional.

:::figure
![The Template values page for a templated project](/docs/img/platform-hub/project-templates/templated-project-values.png)
:::

After you've provided the required values, you can create a release as usual.

:::div{.hint}
You can't modify the deployment process in a templated project. You can't add, remove, reorder, or disable steps. If you need to change the process, contact the template owner.
:::

## Template updates

When a new version of the template is published, you'll receive the update. How and when it's applied depends on the versioning preferences you set when creating the project:

- **Patch and minor updates**: Octopus applies these automatically if you chose to accept them.
- **Major updates**: you must manually apply these, regardless of your preferences.

When a major update is available, you'll need to review and apply it before you can create new releases.

## Future direction

We're still shaping what project templates can do. [Share your feedback](https://oc.to/feedback) to help guide where we go next.

## Limitations

Some features are not yet supported for templated projects. For a full list, see [Troubleshooting](/docs/platform-hub/templates/project-templates/troubleshooting).

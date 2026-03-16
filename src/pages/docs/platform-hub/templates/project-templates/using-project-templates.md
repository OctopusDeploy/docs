---
layout: src/layouts/Default.astro
pubDate: 2026-03-16
modDate: 2026-03-16
title: Templated projects
subtitle: How to create and manage projects from a project template
icon: fa-solid fa-layer-group
navTitle: Templated projects
navSection: Project Templates
description: How to create and manage projects from a project template
navOrder: 171
---

:::div{.warning}
Project templates are in Alpha. The feature is incomplete and standard SLAs do not apply. Don't use it for production workloads. It is available to Enterprise customers on Cloud. Self-hosted customers can access it as an early preview via Octopus 2026.2. We're actively developing this feature and would love your feedback.
:::

A **templated project** is a project created from a project template. It inherits the template's deployment process and variables, which you can't modify. You customize the project by supplying values for the parameters the producer has defined.

## Create a project from a template

To use a project template, you create a new project based on it.

1. Select **Projects** from the main navigation and click **ADD PROJECT**.
2. If there are any published and shared project templates you'll see a list of project templates shared to your space. Select the template you want to use.

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
- **Pre-release**: intended for testing purposes only, typically by the template producers. Not recommended for production use.

:::figure
![Choosing between stable and pre-release template versions](/docs/img/platform-hub/project-templates/templated-project-version-selection.png)
:::

5. Select how you want the project to handle template updates:

   - **Accept minor changes**: automatically updates when a patch or minor version is published. Major versions require a manual update.
   - **Accept patches**: only automatically updates when a patch is published. Minor or major versions require a manual update.

:::figure
![Configuring template version update preferences](/docs/img/platform-hub/project-templates/templated-project-version-settings.png)
:::

6. Click **Create Project**. You'll be taken to the **Template values** page.

## Template values

Template values are the parameters the producer has defined to let you customize the template for your project. They work like project variables: you can provide a value directly or use variable substitutions. Parameters with defaults are marked as optional.

:::figure
![The Template values page for a templated project](/docs/img/platform-hub/project-templates/templated-project-values.png)
:::

Once you've provided the required values, you can create a release as usual.

:::div{.hint}
You can't modify the deployment process in a templated project. You can't add, remove, reorder, or disable steps. If you need to change the process, contact the template producer.
:::

## Template updates

When the producer publishes a new version of the template, you'll receive the update. How and when it's applied depends on the versioning preferences you set when creating the project:

- **Patch and minor updates**: Octopus applies these automatically if you chose to accept them.
- **Major updates**: you must manually apply these, regardless of your preferences.

When a major update is available, you'll need to review and apply it before you can create new releases.

## Future direction

We're still shaping what project templates can do, and there are a few areas we're actively thinking about. If any of these sound useful to you, we'd love to hear about it. [Share your feedback](https://roadmap.octopus.com/submit-idea).

### Placeholders

Placeholders would let producers give consumers some flexibility to add their own steps to a templated project's deployment process. Rather than a fully fixed process, producers could mark specific points where consumers are permitted to insert their own steps.

### Runbooks and triggers

We're planning to support runbooks and triggers defined in the project template, so templated projects inherit them alongside the deployment process. This would let producers standardize operational runbooks and scheduled triggers across all projects created from the template. Projects would still be able to create and manage their own runbooks and triggers.

## Limitations

Some features are not yet supported for templated projects. For a full list, see [Troubleshooting](/docs/platform-hub/templates/project-templates/troubleshooting).

---
layout: src/layouts/Default.astro
pubDate: 2026-03-16
modDate: 2026-11-26
title: Templated projects
subtitle: How to create and manage projects from a project template
icon: fa-solid fa-layer-group
navTitle: Templated projects
navSection: Project Templates
description: How to create and manage projects from a project template
navOrder: 171
---

:::div{.warning}
Project templates are in Public Preview. The feature is still evolving and standard SLAs don't apply. We don't recommend it for production workloads yet. It's available to Enterprise customers on Cloud and to self-hosted customers running Octopus 2026.2+. We'd love your feedback as we work towards General Availability.
:::

A **templated project** is a project created from a project template. It inherits the template's deployment process, channels, and variables, which you can't modify. You customize the project by supplying values for the parameters defined in the template, and by adding your own steps to any [slots](#slots) the template provides.

## Create a project from a template

To use a project template, you create a new project based on it.

<!-- markdownlint-disable MD029 -->

1. Select **Projects** from the main navigation and click **Add Project**.
2. If there are any available project templates, you'll see them listed here. Select the template you want to use.

:::figure
![Selecting a project template when creating a new project](/docs/img/platform-hub/project-templates/project-template-selection.png)
:::

3. Give the project a **Name**.

:::figure
![Naming a templated project and choosing storage settings](/docs/img/platform-hub/project-templates/templated-project-creation.png)
:::

4. Click **Next** to configure your versioning preferences. You can change these later in project settings.

If the template has pre-release versions, you'll also be asked to choose a version type:

- **Stable**: Intended for production use
- **Pre-release**: Intended for testing purposes only, typically by the template owner. Not recommended for production use

:::figure
![Choosing between stable and pre-release template versions](/docs/img/platform-hub/project-templates/templated-project-version-selection.png)
:::

5. Select how you want the project to handle template updates:

   - **Accept minor changes**: Automatically updates when a patch or minor version is published. Major versions require a manual update.
   - **Accept patches**: Only automatically updates when a patch is published. Minor or major versions require a manual update.

:::figure
![Configuring template version update preferences](/docs/img/platform-hub/project-templates/templated-project-version-settings.png)
:::

<!-- markdownlint-enable MD029 -->

Click **Create Project**. You'll be taken to the **Template Values** page.

## Template values

Template values are the parameters the template owner has defined to let you customize the template for your project. They work like project variables: you can provide a value directly or use variable substitutions. Parameters with defaults are marked as optional.

:::figure
![The Template Values page for a templated project](/docs/img/platform-hub/project-templates/templated-project-values.png)
:::

To use a project variable as a template value, select the **Insert a variable** button (**#\{\}**) next to the field. If the variable doesn't exist yet, select **Create Variable** to create it without leaving the page. It's saved to the project's variables and inserted into the field. For the fields in the drawer, see [Create a variable from the process editor](/docs/projects/variables/getting-started#create-from-process-editor).

After you've provided the required values, you can create a release as usual.

:::div{.hint}
You can't modify the template's steps in a templated project. You can't edit, remove, reorder, or disable them. If you need to change them, contact the template owner.
:::

## Slots

If the template's deployment process includes slots, you can add your own steps to them. A slot marks a point in the template's process where projects can run their own steps, such as smoke tests or notifications. The steps you add run at the slot's position, alongside the template's steps.

You can't add steps outside a slot. If the template has no slots, its deployment process can't be extended.

For how to add and manage steps in slots, see [Using slots in project templates](/docs/platform-hub/templates/project-templates/slots#add-a-step-to-a-slot).

## Channels

A templated project inherits its [channels](/docs/releases/channels) from the project template, along with the [lifecycles](/docs/releases/lifecycles) each channel uses. You can view the channels like you would in any other project, but you can't modify them.

The environments a channel can deploy to depend on the environment parameter values you set in your templated project. You can view the lifecycle configuration used by a channel after you've set all required environment parameter values.

:::figure
![Channels in a templated project](/docs/img/platform-hub/project-templates/templated-project-channel.png)
:::

## Retention policies

A templated project uses the retention policies set on its template's lifecycles. Octopus uses the environment parameter values you set in the project to determine which environments belong to each lifecycle phase.

On Octopus Cloud if the template's policies exceed your license's retention limits, Octopus limits them to match your license and shows a message on the **Channels** page.

:::div{.hint}
For Config as Code projects, Octopus reads environment parameter values from the project's default branch for every release, including releases created from other branches.
:::

## Template updates

A templated project doesn't use a fixed template version. It uses the newest published version that matches its versioning preferences, which you choose when you create the project. Understanding how updates reach a project helps you know when a new template version starts affecting your releases, and which updates you need to apply yourself.

Your preferences decide which updates Octopus applies automatically and which you apply manually:

| Versioning strategy | Applied automatically | Applied manually |
| --- | --- | --- |
| **Accept minor changes** | Patch and minor versions | Major versions |
| **Accept patches** | Patch versions | Minor and major versions |
| **Pre-release** | Pre-release versions | Moving to the latest stable version |

An automatic update takes effect the next time Octopus needs the template, such as when you create a release. Octopus doesn't show a notification, and the project's settings show the version it currently uses. Existing releases keep the template version they were created with.

For a manual update, the project dashboard and the **Versioning** section of the project's settings tell users with the **ProjectEdit** permission that a new version is available. A manual update always moves the project to the latest stable version, skipping any versions in between. You can't choose an earlier version, or move back to an older one. The project keeps its update behavior, except that a project on **Pre-release** switches to **Stable** with **Accept minor changes**.

## Apply a template update

Review what a new template version changes, then move the project to it. Do this for updates that your versioning preferences don't apply automatically.

:::div{.warning}
If the update removes a slot that holds steps you added, those steps stop running, and the next save of the process removes them. See [Clear steps from removed slots](/docs/platform-hub/templates/project-templates/slots#clear-steps-from-removed-slots).
:::

**Before you begin**

You'll need:

- The **ProjectEdit** permission on the project.

To apply a template update:

1. Go to your templated project's dashboard.
2. Select **Review update**.
3. In the **Review template update** drawer, review the changes.

   :::figure
   :img{src="/docs/img/platform-hub/project-templates/templated-project-review-update@2x.png" alt="The Review template update drawer showing release notes, an added Post deployment slot, and an added Notification channel parameter"}
   :::

4. Select **Update to v8.0.0**. The button shows the version you're updating to.

The dashboard shows a confirmation that the project has been updated to the new version, and **Settings** shows the new version under **Template version**.

If you can't create a release after the update, see [Troubleshooting](/docs/platform-hub/templates/project-templates/troubleshooting#cant-create-a-release-after-a-template-update).

If the new version adds parameters, select **Review template values** on the confirmation and set any values they need.

## Review template update drawer

The **Review template update** drawer shows what a new template version changes before you apply it.

| Section | What it shows |
| --- | --- |
| Warnings | Shown at the top when the update removes slots that hold steps you added, or adds steps whose names or slugs clash with yours. |
| **Release notes** | The notes the template owner wrote for the new version. Notes for versions in between aren't shown. |
| **Process changes** | The steps, process templates, and slots that the update adds or removes, with the steps you added to each slot. Select **Show full process** to see the whole process. Changes to how an existing step is configured aren't listed. |
| **Parameters** | The parameters that the update adds or removes. Changes to an existing parameter's label, help text, or default value aren't listed. |

For Config as Code projects, the steps listed under each slot come from the project's default branch. Steps you've added to slots on other branches aren't shown.

## Limitations

Some features are not yet supported for templated projects. For a full list, see [Troubleshooting](/docs/platform-hub/templates/project-templates/troubleshooting).

## Version notes

- Creating a project variable from the **Template Values** page is available from Octopus Server 2026.4.11453.
- Slots, the update notice on the project dashboard, and the **Review template update** drawer are available from Octopus Server 2027.1.759. Earlier versions show a simpler update dialog in the project's settings.

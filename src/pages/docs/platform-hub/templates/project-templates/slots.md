---
layout: src/layouts/Default.astro
pubDate: 2026-11-24
modDate: 2026-11-26
title: Using slots in project templates
subtitle: Let projects add their own steps to a project template's deployment process
icon: fa-solid fa-layer-group
navTitle: Slots
navSection: Project Templates
navOrder: 172
sidebarLabel: Slots
description: Add slots to a project template so projects can run their own steps at set points in the template's deployment process.
subject: project templates, slots, templated projects, deployment process, Platform Hub
type: guide
audience: [platform-eng, devops-eng]
image:
imageAlt:
---

:::div{.warning}
Project templates are in Public Preview. The feature is still evolving and standard SLAs don't apply. We don't recommend it for production workloads yet. It's available to Enterprise customers on Cloud and to self-hosted customers running Octopus 2026.2+. We'd love your feedback as we work towards General Availability, [tell us what you think](https://roadmap.octopus.com/c/263-project-templates).
:::

Slots let teams add their own steps to a deployment process that's otherwise managed in Platform Hub. This page covers adding slots to a project template, and adding steps to those slots in a project created from the template.

## Slots

A slot is a placeholder in a project template's deployment process where projects created from the template can add their own steps. You keep the core of the process standard, and each team gets room for the steps that are specific to their project, such as running smoke tests or sending a notification.

In a project created from the template, the template's steps are locked. The project can only add steps inside a slot, and those steps work like steps in any other project.

Use a slot when teams need to run their own steps at a particular point in the process. If every project needs the same step, add it to the template instead.

## Add a slot to a project template

Add a slot wherever you want projects to be able to run their own steps. A new slot starts at the end of the process, so you move it into position before you commit.

**Before you begin**

You'll need:

- A project template in Platform Hub. Learn more about [project templates](/docs/platform-hub/templates/project-templates).
- The **PlatformHubEdit** permission.

To add a slot:

1. In Platform Hub, go to **Project Templates** and select your template.
2. Select **Process**.
3. Select the dropdown arrow next to **Add Step**.

   :::figure
   ![The Add Step dropdown in a project template's process, showing the Add slot option](/docs/img/platform-hub/project-templates/project-templates-add-slot.png)
   :::

4. Select **Add slot**.
5. In **Slot name**, enter a name that's unique in the process.
6. In **Slot description**, tell teams what kind of steps to add. You can use Markdown.
7. Select the overflow menu (**...**) on the process.
8. Select **Reorder steps**.
9. Drag the slot to where projects should run their steps.
10. Select **Done**.
11. Commit your changes.

:::figure
![A project template's process with a Post deployment slot at the end, labeled Slot, and the slot's name and description fields](/docs/img/platform-hub/project-templates/project-templates-process-slots.png)
:::

After you add slots, [publish the template](/docs/platform-hub/templates/publishing-and-sharing) so projects can use them. A template needs at least one step as well as its slots before you can publish it.

## Delete a slot from a project template

Deleting a slot removes it from the template's deployment process. Projects lose the steps they added to the slot when they update, so Octopus only lets you publish the change as a major version.

**Before you begin**

You'll need:

- The **PlatformHubEdit** permission.

To delete a slot:

1. In Platform Hub, go to **Project Templates** and select your template.
2. Select **Process**.
3. Select the slot.
4. Select the overflow menu (**...**).
5. Select **Delete**.
6. Confirm the deletion.
7. Commit your changes.

:::div{.hint}
Changing a slot's slug has the same effect as deleting the slot, and also needs a major version. The slug appears under **Slot name** when you edit a slot. You can add, rename, describe, and reorder slots in any version.
:::

## Add a step to a slot

Add a step to a slot to run it at that point in the template's deployment process.

**Before you begin**

You'll need:

- A project created from a project template that has slots. Learn more about [templated projects](/docs/platform-hub/templates/project-templates/using-project-templates).
- The **ProcessEdit** permission on the project.

To add a step to a slot:

1. In your templated project, select **Process**.
2. Under the slot you want to use, select **Add step**.
3. Select a step, step template, or process template.
4. Configure the step.
5. Save the process.

:::figure
![A templated project's process with locked template steps and a Post deployment slot holding a step the project added](/docs/img/platform-hub/project-templates/templated-project-slot-steps.png)
:::

The step appears under the slot, and the slot shows how many steps the project has added.

If you can't save the step, or later can't create a release, because the step's name is already in use, see [Troubleshooting](/docs/platform-hub/templates/project-templates/troubleshooting#cant-create-a-release-because-a-slot-step-name-is-in-use).

## Clear steps from removed slots

When a template update removes a slot, the steps your project added to it stop running and no longer show on the process page.

:::div{.warning}
The next time you save the process, Octopus deletes the steps from removed slots. You can't move them into another slot.
:::

To clear the old steps, save the project's process. If the new template version has no slots, select **Clear old data** on the process page instead. You need the **ProcessEdit** permission on the project.

The process page doesn't change. The cleanup shows in the project's audit log, or in its OCL files for a Config as Code project.

## Slots in Config as Code

Slots are stored in `deployment_process.ocl` as `slot` blocks, labeled with the slot's slug. The order of the blocks is the order of the process.

### Project template OCL

In a project template, a slot has a name and an optional description:

```ocl
step "deploy-package" {
    name = "Deploy Package"
    ...
}

slot "post-deploy" {
    name = "Post-deploy"
    description = "Add your own verification or clean-up steps to run after the deployment."
}
```

### Templated project OCL

In a templated project, a slot holds the steps the project added to it:

```ocl
slot "post-deploy" {
    step "smoke-test" {
        name = "Smoke test"
        ...
    }
}
```

## Version notes

- Slots are available from Octopus Server 2027.1.759.

## Related links

- [Project templates](/docs/platform-hub/templates/project-templates)
- [Templated projects](/docs/platform-hub/templates/project-templates/using-project-templates)
- [Publishing and sharing templates](/docs/platform-hub/templates/publishing-and-sharing)
- [Project template best practices](/docs/platform-hub/templates/project-templates/best-practices)

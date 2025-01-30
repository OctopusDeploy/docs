---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Security and unscoped variables
description: Rationale behind limited user access to unscope variables if their access is restricted to specific environments.
navOrder: 1
---

Sometimes, a team will be granted contributor access to a project, but be restricted in the environments that it can access. By default, Octopus's security system will then prevent members of the team editing [variables](/docs/projects/variables) that apply outside of their allowed environments. During development this can be inconvenient, as variables frequently need to be added in support of new application features.

## Why restrict editing of unscoped variables? {#why-restrict-editing-of-unscoped-variables}

Octopus uses variables to control almost every aspect of the deployment process. This provides a great deal of flexibility - for example, variables can control:

- The packages that are deployed.
- Which deployment conventions are applied.
- Which script files will be run.
- The content of custom scripts.
- The location of deployed apps, and other paths on the target machines.

The default permissions applied to unscoped variable editing are restrictive because, although the release details screen shows the values of included variables, it can be hard for a user performing a deployment to verify that the variable contents applied to the environment are appropriate.

This default behavior can be changed by granting an additional permission to the team.

## Granting unscoped variable editing permission {#granting-unscoped-variable-editing-permission}

As an administrator, open **Configuration ➜ User Roles**. In the list of user roles shown, either create a new role to assign to the team, or select a built-in role like **Project contributors** to modify.

:::figure
![](/docs/security/users-and-teams/images/3277947.png)
:::

The individual permissions that make up the role will then be shown. Tick the **VariableEditUnscoped**or **VariableViewUnscoped** items as required, and save the role.

![](/docs/security/users-and-teams/images/3277946.png)

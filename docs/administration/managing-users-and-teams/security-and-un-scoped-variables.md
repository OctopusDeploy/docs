---
title: Security and un-scoped variables
description: Rationale behind limited user access to unscope variables if their access is restricted to specific environments.
position: 1
---

Sometimes, a team will be granted contributor access to a project, but be restricted in the environments that it can access. By default, Octopus's security system will then prevent members of the team editing [variables](/docs/deployment-process/variables/index.md) that apply outside of their allowed environments. During development this can be inconvenient, as variables frequently need to be added in support of new application features.

## Why restrict editing of un-scoped variables? {#Securityandun-scopedvariables-Whyrestricteditingofun-scopedvariables?}

Octopus uses variables to control almost every aspect of the deployment process. This provides a great deal of flexibility - for example, variables can control:

- The packages that are deployed
- Which deployment conventions are applied
- Which script files will be run
- The content of custom scripts
- The location of deployed apps, and other paths on the target machines

The default permissions applied to un-scoped variable editing are restrictive because, although the release details screen shows the values of included variables, it can be hard for a user performing a deployment to verify that the variable contents applied to the environment are appropriate.

This default behavior can be changed by granting an additional permission to the team.

## Granting un-scoped variable editing permission {#Securityandun-scopedvariables-Grantingun-scopedvariableeditingpermission}

As an administrator, open {{Configuration,Teams}}, and select the **Roles** item in the tool area:

![](/docs/images/3048124/3277948.png "width=500")

In the list of user roles shown, either create a new role to assign to the team, or select a built-in role like **Project contributors**to modify.

![](/docs/images/3048124/3277947.png "width=500")

The individual permissions that make up the role will then be shown. Tick the **VariableEditUnscoped**or **VariableViewUnscoped** items as required, and save the role.

![](/docs/images/3048124/3277946.png "width=500")

---
title: Spaces
description: Spaces setup and configuration.
position: 15
---

Spaces let you partition your Octopus Server so that different teams can only access the projects, environments, and infrastructure they work with from the Spaces they are members of. 

Using spaces keeps the different projects and infrastructure your teams use completely separate, which means something configured in **SpaceA**, is not available to projects in **SpaceB**. This makes it easier for large organizations with multiple teams using Octopus because each team member will only see the projects, environments, and infrastructure that is available in their space.

By default, every instance of Octopus Server since **Octopus 2018.11** comes with a default space. However, if your organization is not planning to use multiple spaces, this default Space can be safely ignored and doesn't require configuration or management. 

## Managing Spaces

Spaces are managed by navigating to {{Configuration,Spaces}}.

An Octopus Administrator, or a team member with sufficient permission, is able to create, remove or modify spaces from this screen. It is also possible to nominate a default space, or [disable the default space entirely](#disable-the-default-space). Each space has a logo, which is also shown in the [space switcher](#switching-between-spaces) to make it easy to identify which space is currently focused upon by the UI. There is also a search filter to quickly find the spaces that you are interested in managing, this searches over the name and description fields of each space.

![Spaces configuration page](spaces-configuration.png)

### The Space Manager

Each space has a **Space Manager**. The space manager is the Administrator for that Space and is responsible for managing users and teams to the space and assigning permissions to them.

When creating a new space, you are required to nominate a team member (or a team) to the role of space manager. This space manager is then responsible for [managing teams and permissions](/docs/managing-users-and-teams) within that space.

The user who creates a space doesn't necessarily need to be the space manager of the space. This enables a 'hands off' administrative approach suited to larger organizations or those who which to which to seperate the duties of Octopus Server Administration, from the duties of Team Administration.

Behind the scenes, a **Space Managers** team is created, and any users that are nominated to be a space manager, are put in that team. This team cannot be created or deleted, and serves no other purpose than applying the correct space manager permissions. 

### Create a Space

New spaces are added from the configuration section of the portal.

1. To create a new Space navigate to {{Configuration,Spaces}} and select **ADD SPACE**.
2. Give the Space a name.
3. Give the Space a manager. This can be individual users or teams. Either can be selected from the drop-down menu. Click **SAVE**.
4. Provide a description for the Space.
5. Optionally, upload a logo for the Space.
6. Click **SAVE**.

![Add new space](add-new-space.png)

### Modify a Space

You can modify a space by navigating to {{Configuration,Spaces}} and selecting the space you want to modify. Expand the field you would like to change and click **SAVE** to save your changes.

Here you can rename a space, give it a new logo, modify the space managers, or even stop the spaces task queue from processing.

![Modify a space](modify-space.png)

### Delete a Space

You can delete spaces when you are the **Space manager**. Deleting a space cannot be undone, and the space and all of its contents, including projects, environments, releases, and deployment history will be deleted.

1. Navigate to {{Configuration,Spaces}} and selecT the space you want to delete.
1. Expand the **Task Queue Status** section and select the Stop task queue checkbox, and click **SAVE**.
1. Click the overflow button and select **Delete**.
1. Enter the name of the space and click **DELETE**.

## Disable the Default Space {#disable-the-default-space}

You can disable the default space. <!-- content explaining the ramifications goes here -->

1. Navigate to {{Configuration,Spaces}} and select the default space.
1. Expand the **Task Queue Status** section and select the Stop task queue checkbox, and click **SAVE**.
1. Click the overflow button and select **Disable the default space**.
1. Enter the name of the space and click **YES I'M SURE**.


## Switching Between Spaces

When you log into the Octopus Web Portal, the first item on the navigation menu is the Spaces menu. Click this icon to access the spaces you are a member of and to select the space you need.

## System Scoped or Space Scoped {#system-scope-space-scoped}

There is a hard barrier between Spaces, so, for instance, a deployment target configured for SpaceA isn't available to projects in SpaceB. However, there are some things that aren't scoped to a Spaces, but are system wide. <!-- content explaining why things are scoped the way they are goes here -->

The following table shows what is space-scoped, system-scoped, or scoped to both.

Some things can be scoped to both Spaces and the system.

| Resource               | Space-Scoped                       | System-Scoped      |
| ------------------ | --------------------------- | ---------- |
| Environments | Spaces |  |
| Lifecycles   | Spaces  |  |
| Projects | Spaces |  |
| Variable Sets | Spaces |  |
| Deployment Targets | Spaces |  |
| Tenants | Spaces |  |
| Octopus Server Nodes |  | System  |
| Authentication |  | System |
| Users |  | System |
| License |  | System |
| Events | Spaces | System |

---
title: Spaces
description: Spaces setup and configuration.
position: 15
---

Spaces let you partition your Octopus Server so that different teams access the projects, environments, and infrastructure they work with from the Spaces they are members of.

Using Spaces keeps the different projects and infrastructure your teams use completely separate, which means something configured in **SpaceA**, is not available to projects in **SpaceB**. This makes it easier for large organizations with multiple teams using Octopus because each team member will only see the projects, environments, and infrastructure that is available in their space.

By default, every instance of Octopus Server since **Octopus 2018.11** comes with a default space, however, if you are not planning to use multiple Spaces, this default Space exists in the background and you do not to configure it or manage it. For organizations not using Spaces the default space can be safely ignored.

## Managing Spaces

Spaces are managed by navigating to {{Configuration,Spaces}}.

### The Space Owner

Each Space has a Space Owner. The Space Owner is the Admin for that Space and is responsible for adding team members to the Space and assigning permissions to the members of the space.

### Create a Space

New spaces are added from the configuration section of the portal.

1. To create a new Space navigate to {{Configuration,Spaces}} and select **ADD SPACE**.
2. Give the Space a name.
3. Give the Space an owner. This can be individual users or teams. Either can be selected from the drop-down menu. Click **SAVE**.
4. Provide a description for the Space.
5. Optionally, upload a logo for the Space.
6. Click **SAVE**.

### Modify  a Space

You can modify a space by navigating to {{Configuration,Spaces}} and selecting the space you want to modify. Expand the field you would like to change and click **SAVE** to save your changes.

### Delete a Space

You can delete spaces when you are the **Space Owner**. Deleting a space cannot be undone, and the space and all of its contents, including projects, environments, releases, and deployment history will be deleted.

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

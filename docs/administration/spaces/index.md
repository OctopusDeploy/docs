---
title: Spaces
description: Spaces setup and configuration.
position: 15
---

Spaces let you partition your Octopus Server so that different teams access the projects, environments, and infrastructure they work with from the Spaces they are members of. Using Spaces keeps the different projects and infrastructure your teams use completely separate, which means something configured in SpaceA, is not available to projects in SpaceB. This is intended to make it easier for large organizations with multiple teams using Octopus. Without Spaces, each member of every team can see every project, environment, deployment target and every other asset in Octopus. Using Spaces, let's them focus on the projects they're working on.

By default, every instance of Octopus Server since **Octopus 2018.11** comes with a default space, however, if you are not planning to use multiple Spaces, this default Space exists in the background and you do not to configure it or manage it. For organizations not uses Spaces the default space can be safely ignored.

## Managing Spaces

Spaces are managed by navigating to {{Configuration,Spaces}}.

### Create a Space

New spaces are added from the configuration section of the portal.

1. To create a new space navigate to {{Configuration,Spaces}} and select **ADD SPACE**.
2. Give the space a name.
3. Give the space an owner. This can be individual users or teams. Either can be selected from the drop-down menu.
4. Provide a description for the space.
5. Optionally upload a logo for the space. The logo will be used in the top left corner of the portal to help users who have access to more than one space, quickly see which space they are currently in.
6. Click **SAVE**.

### Delete a Space

Once a space has been deleted it cannot be restored. To delete the resources available to a space, you must...

### Rename a Space

## Switch Between Spaces

When log into the Octopus Web Portal, the first item on the navigation menu is the Spaces menu. The first time you click this menu, you can create a Space. If you are a member of multiple spaces, you can switch between Spaces from this menu.

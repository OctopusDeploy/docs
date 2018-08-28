---
title: Spaces
description: Spaces setup and configuration.
position: 15
---
<!-- Starter text only -->

Spaces let you partition your Octopus Server so that different teams access the projects, environments, and infrastructure they work with from different areas of the Octopus Server. Using Spaces keeps the projects and environments completely separate, which if you have multiple projects and teams within Octopus can make it easier to manage, but also gives you an element of separation between the different spaces you configure.

By default, every Octopus Server since **Octopus 2018.10** comes with a default space, however, if you are not planning to use multiple Spaces, this default Space exists in the background and you do not to configure it or manage it. For organizations not uses Spaces the default space can be safely ignored. <!-- more to it, need details -->

<!-- Limitations: Three Spaces per server? Migration. Sharing across spaces... -->

## Managing Spaces

Spaces are managed from ...

### Create a Space

New spaces are added from the configuration section of the portal.

1. To create a new space navigate to {Configuration,Spaces} and select **ADD SPACE**.
2. Give the space a name.
3. Give the space an owner. This can be individual users or teams. Either can be selected from the drop-down menu.
4. Provide a description for the space.
5. Optionally upload a logo for the space. The logo will be used in the top left corner of the portal to help users who have access to more than one space, quickly see which space they are currently in.
6. Click **SAVE**.

### Delete a Space

Once a space has been deleted it cannot be restored. To delete the resources available to a space, you must...

### Rename a Space

## Switch Between Spaces

<!--
What subsections are needed? Adding resources, projects and teams to a space.

What else do we need to include?

What other docs need to be updated?

https://octopus.com/docs/administration/managing-users-and-teams ?
Does it make sense to add links from the security docs to spaces? Should we add a Spaces section to the high-level security doc: https://octopus.com/docs/administration/security

Add a section to the Getting Started page calling out the capabilities (this could be same text that's used in the intro on this page) -->

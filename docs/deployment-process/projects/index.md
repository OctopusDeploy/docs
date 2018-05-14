---
title: Projects
description: Projects allow you to define all the details required to deploy a project including the steps to run and variables to configure it.
position: 0
---

Projects let you manage multiple software projects from the **Octopus Web Portal**. For each project you have, you define a deployment process (the steps or actions required to deploy your software), configuration variables (for example, application settings, connection strings), and the environments the software will be deployed to (for example, Development, Test, and Production).

Projects can consist of multiple steps and deliverable components, or they might only have a single step.

It can be difficult to decide whether you need a single project or multiple projects. Here are somethings to consider:

- If the packages are delivered by different teams, or have different release schedules and deadlines, use separate projects.
- If the packages are always deployed at the same time, and there is good communication between the teams developing them (or they are the same team), use a single project.

There are other options, for instance, with the [Deploy Release Step](/docs/deployment-process/projects/coordinating-multiple-projects/deploy-release-step.md) it's possible to break bigger projects into smaller projects, that can be released individually or as part of a larger master project. For more options, see the [Coordinating Multiple Releases docs](/docs/deployment-process/projects/coordinating-multiple-releases/index.md).

## Managing Projects

Projects are managed from the **Projects** area of the **Web Portal**. From here you can see and manage all of your projects and [project groups](/docs/deployment-process/projects/index.md#project-groups).

The first time you navigate to the **Projects** area you have the option to either [ADD PROJECT](/docs/deployment-process/projects/index.md#add-a-project) or [ADD GROUP](/docs/deployment-process/projects/index.md#add-a-project-group).

## Add a Project

Before you can define your deployment process, you must create a project.

1. Select **Projects** from the main navigation, and click **ADD PROJECT**.
2. Give the project a name that's meaningful to you, and anybody else who'll work on the project.
3. Click **Save** and you will be taken to the newly created project's overview page.

## Project Settings

You can access the project settings menu from the project's overview page. From here it's possible to edit details about the project, such as the name, description, and the project group, add a logo, and control different aspects of the project's release behavior.

## Project Logo

If you are likely to have a lot of projects, in addition to giving them meaningful names you can also add a project logo, and make it easier to quickly locate them on the project's page.

1. From the project's overview page, select **settings**.
2. Click the **Logo** section of the settings page.
3. Click the file selector and select a file to upload.
4. Click **open** to upload your logo image, and click **Save**.

<!-- continue -->

## Add a Project Group

Project groups are a way of organizing your projects.

When you create a project group, we recommend using a meaningful name and adding a description.

After you have created a project group there are a number of ways you can add projects to the group:

1. Click **ADD PROJECT** from the group's section of the **Projects** page.
1. Edit an existing project by navigating to the project, selecting **Settings** and editing the **Project Group**.
1. Specify the **Project Group** under **Advanced Settings** when you create a new project.

Any projects and project groups you create will be accessible from the projects page. If a project group does not have any projects associated with it, click *SHOW EMPTY GROUPS* to reveal the group.

### Edit or Delete Project Groups

To edit or delete a project group click the project group’s overflow menu and select **edit**. From there you can edit the groups name or description. If you need to delete the group, click the overflow menu again and select **Delete**.

## Project Permissions

For information about project permissions, see [managing users and teams](/docs/administration/managing-users-and-teams/index.md).

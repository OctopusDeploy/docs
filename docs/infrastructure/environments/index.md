---
title: Environments
description: Environments are how you group your deployment targets so you can promote your software through different phases, for instance, into Development, then Test, and finally into Production.
position: 10
---

!include <environments>

## Add New Environments {#add-new-environments}

1. Navigate to **{{Infrastructure,Environments}}** and click **ADD ENVIRONMENT**.
1. Give your new environment a meaningful name and click **SAVE**.
1. Add a description for the environment.
1. Select the checkbox in the **Default Guided Failure Mode** section if you want Octopus Deploy to prompt users for intervention if a deployment to this environment fails. Learn more about [guided failure mode](/docs/deployment-process/releases/guided-failures.md).
1. Select the checkbox in the **Dynamic Infrastructure** section if deployments to this environment are allowed to create infrastructure such as targets and accounts. Learn more about [Dynamic Infrastructure](docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md).
1. Click **SAVE**.

You can add as many environments as you need.

## Editing Your Environments

To edit individual environments, click the ... overflow menu for that environment. From here, it is possible to edit the environment, description, change the [guided failure mode](#guided-failure-mode), enable or disable [dynamic infrastructure](#dynamic-infrastructure), or delete the environment.

## Environment Permissions

You can control who has access to view, edit, and deploy to environments by assigning users to Teams and assigning roles to those teams. For more information, see the section on [managing users and teams](/docs/administration/managing-users-and-teams/index.md).

## Managing Your Environments

If you're working with a large number of environments and deployment targets, the **Environments** page makes it easy to sort, filter, and view your environments and the deployment targets that belong to each environment.

## Sorting Your Environments

Click the ... overflow menu on the environments sections to reveal the **reorder** menu and access a drag and drop pane to sort your environments.

The order that environments are shown in the environments tab also affects:

- The order that they are shown in the Dashboard.
- The order that they are listed when choosing which environment to deploy a release to.

It's a good idea to put your least production-like environments first, and the most production-like environments last.

## Using Advanced Filters

You can use advanced filters to search your environments by clicking on **SHOW ADVANCED FILTERS** from the environment page.

This will let you search by:

- Name
- Deployment Target
- Environment
- Target Roles
- Health Status
- Communication Style

## Next

Learn how to add and manage your [Deployment Targets](/docs/infrastructure/deployment-targets/index.md).

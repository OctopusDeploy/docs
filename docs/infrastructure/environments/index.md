---
title: Environments
description: Environments allow you to define a group of deployment targets that you will deploy to at the same time; common examples of environments are Development, Test and Production.
position: 10
---
Octopus Deploy organizes your infrastructure, that is the deployment targets you deploy software to (whether on-premises servers or cloud services), into *environments*. Typical examples of environments are **Development**, **Test**, and **Production**.

Organizing your deployment targets into environments lets you define your deployment processes (no matter how many deployment targets or steps are involved) and have Octopus deploy the right versions of your software to the right environments at the right time.

## Add New Environments

Add new environments to Octopus Deploy by navigating to **{{Infrastructure,Environments}}** in the **Octopus Web Portal** and click **ADD ENVIRONMENT**:

![Add Environment Screen](add-environment.png)

Give your new environments meaningful names, like **Development**, **Test**, or **Production**.

You can add as many environments as you need.

## Managing Your Environments

If you're working with a large number of environments and deployment targets, the infrastructure tab makes it easy to sort, filter, and view your environments.

![Environments Screen](environments.png)

## Sorting Your Environments

Click the overflow menu on the environments sections to reveal the **reorder** menu and access a drag and drop pane to sort your environments

The order that environments are shown in the environments tab also affects:

- The order that they are shown in the Dashboard.
- The order that they are listed in when choosing which environment to deploy a release to.

It's a good idea to put your least production-like environments first, and the most production-like environments last.

## Using Advanced Filters

You can use advanced filters to search your environments by clicking on **SHOW ADVANCED FILTERS** from the environment tab.

This will let you search by:

- Name
- Deployment Target
- Environment
- Target Roles
- Health Status
- Communication Style

## Editing Your Environments

To edit individual environments, click the overflow menu for that environment. From here, it is possible to edit the environment, description, select [guided failure mode](/docs/infrastructure/environments/index.md#Environments-Guidedfailures), or delete the environment.

## Guided Failures

[Guided failure mode](/docs/deployment-process/releases/guided-failures.md), when enabled for an environment, will prompt a user for intervention if a deployment fails in that environment. Guided failure can be enabled on an environment by default. This is useful for critical environments that are usually deployed to manually (for example, staging and production-like environments), though you might not want to enable this feature for environments which are deployed to automatically such as smoke testing environments.

### Enable Guided Failure for the Environment

1. Navigate to {{Infrastructure,Environments}}.
1. Click the overflow menu for the specific environment you want to enable guided failure on and select *Edit*.
1. Expand the **Default Guided Failure Mode** section and tick the checkbox to enable the feature.
1. Click **SAVE**.

Note, you can still override this setting for individual deployments. For more information, see the section on [Guided Failures](/docs/deployment-process/releases/guided-failures.md).

## Environment Permissions

You can control who has access to view, edit, and deploy to environments by assigning users to Teams and assigning roles to those teams. For more information, see the section on [managing users and teams](/docs/administration/managing-users-and-teams/index.md).

## Dynamic Targets in an Environment

To manage the targets within an Environment dynamically using the [Dynamic Infrastructure](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md) PowerShell Cmdlets, select **Edit** in the overflow menu for the environment, expand the **Dynamic Infrastructure** section, and click the checkbox to *Allow managing dynamic infrastructure*.

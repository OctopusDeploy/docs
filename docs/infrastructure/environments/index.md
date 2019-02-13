---
title: Environments
description: Environments are how you group your deployment targets so you can promote your software through different phases, for instance, into Development, then Test, and finally into Production.
position: 10
---
Octopus Deploy organizes your infrastructure, that is the deployment targets you deploy software to (whether on-premises servers or cloud services), into **environments**. Typical examples of environments are **Development**, **Test**, and **Production**.

Organizing your deployment targets into environments lets you define your deployment processes (no matter how many deployment targets or steps are involved) and have Octopus deploy the right versions of your software to the right environments at the right time. This means you can promote your software through the phases of its [lifecycle](/docs/deployment-process/lifecycles/index.md).

## Add New Environments

1. Navigate to **{{Infrastructure,Environments}}** and click **ADD ENVIRONMENT**.
1. Give your new environment a meaningful name and click **SAVE**.
1. Add a description for the environment.
1. Select the checkbox in the **Default Guided Failure Mode** section if you want Octopus Deploy to prompt users for intervention if a deployment to this environment fails. Learn more about [guided failure mode](#guided-failure-mode).
1. Select the checkbox in the **Dynamic Infrastructure** section if deployments to this environment are allowed to create infrastructure such as targets and accounts. Learn more about [Dynamic Infrastructure](#dynamic-infrastructure).
1. Click **SAVE**.

You can add as many environments as you need.

## Managing Your Environments

If you're working with a large number of environments and deployment targets, the **Environments** page makes it easy to sort, filter, and view your environments and the deployment targets that belong to each environment.

### Sorting Your Environments

Click the overflow menu on the environments sections to reveal the **reorder** menu and access a drag and drop pane to sort your environments.

The order that environments are shown in the environments tab also affects:

- The order that they are shown in the Dashboard.
- The order that they are listed when choosing which environment to deploy a release to.

It's a good idea to put your least production-like environments first, and the most production-like environments last.

### Using Advanced Filters

You can use advanced filters to search your environments by clicking on **SHOW ADVANCED FILTERS** from the environment page.

This will let you search by:

- Name
- Deployment Target
- Environment
- Target Roles
- Health Status
- Communication Style

### Editing Your Environments

To edit individual environments, click the overflow menu for that environment. From here, it is possible to edit the environment, description, change the [guided failure mode](#guided-failure-mode), enable or disable [dynamic infrastructure](#dynamic-infrastructure), or delete the environment.

## Guided Failure Mode

[Guided failure mode](/docs/deployment-process/releases/guided-failures.md), when enabled for an environment, will prompt a user for intervention if a deployment fails in that environment. Guided failure can be enabled on an environment by default. This is useful for critical environments that are usually deployed to manually (for example, staging and production-like environments), though you might not want to enable this feature for environments which are deployed to automatically such as smoke testing environments.

### Change the Guided Failure Mode for an Environment

Guided failure mode can be set when a new environment is created, or it can be enabled or disabled for existing environments.

1. Navigate to **{{Infrastructure,Environments}}**.
1. Click the overflow menu for the environment you want to enable or disable guided failure mode on and select **Edit**.
1. Expand the **Default Guided Failure Mode** section and tick or untick the checkbox to enable or disable guided failure mode.
1. Click **SAVE**.

Note, you can still override this setting for individual deployments. For more information, see the section on [Guided Failures](/docs/deployment-process/releases/guided-failures.md).

## Lifecycles

[Lifecycles](/docs/deployment-process/lifecycles/index.md) give you control over the order of promotion between your environments in addition to other advanced deployment workflow features, such as automatic deployments to specific environments.

Learn more about [Lifecycles](/docs/deployment-process/lifecycles/index.md).

## Dynamic Infrastructure

When enabled, environments can create some deployment targets within Octopus Deploy. For details, see [dynamic infrastructure](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md).

### Enabling Dynamic Infrastructure

Dynamic infrastructure can be enabled when a new environment is created, or it can be enabled or disabled for existing environments.

1. Navigate to **{{Infrastructure,Environments}}**.
1. Click the overflow menu for the environment you want to enable or disable dynamic infrastructure on and select **Edit**.
1. Expand the **Dynamic infrastructure** section and tick or untick the checkbox to enable or disable managing dynamic infrastructure.
1. Click **SAVE**.

### Environment Permissions

You can control who has access to view, edit, and deploy to environments by assigning users to Teams and assigning roles to those teams. For more information, see the section on [managing users and teams](/docs/administration/managing-users-and-teams/index.md).

## Next

Learn how to add and manage your [Deployment Targets](/docs/infrastructure/deployment-targets/index.md).

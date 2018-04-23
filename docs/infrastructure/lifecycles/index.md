---
title: Lifecycles
description: Lifecycles allow you to control the way releases are promoted between environments. You can define automatic deployment environments in your lifecycle phases. This will automate deployments to an environment as soon as the phase becomes available.
position: 20
---

Lifecycles allow you to control the way releases are promoted between environments. Lifecycles enable a number of advanced deployment workflow features:

- Control the order of promotion: for example, to prevent a release being deployed to Production if it hasn't been deployed to Staging
- Automate the deployment to environments: for example, automatically deploy to Test as soon as a release is created
- Retention policies: specify the number of releases to keep depending on how far they have progressed through the lifecycle

A Lifecycle is defined by **phases**. Each phase can have one or more environments. And each environment can be defined as an automatic deployment environment or a manual deployment environment. Each phase can have a set number of environments that must be released to before the next phase is available for deployment.

A Lifecycle can have a default retention policy defined and each phase inherits this policy or can also have it's own policy defined.

## Managing Lifecycles {#Lifecycles-ManagingLifecycles}

Lifecycle management can be found under **Library** and then **Lifecycles**.

![](lifecycles.png "width=500")

To add a new Lifecycle click on the **Add Lifecycle** button.

![](lifecycle-create-new.png "width=500")

To start with you define a Name, description and default retention policy for the whole Lifecycle. Each phase will inherit the Lifecycle retention policy unless it's own is defined.

Once these initial details are defined you can add your first phase.

## Lifecycle Phases {#Lifecycles-LifecyclePhases}

Phases define the deployment pipeline. A phase must have a complete successful deployment before further phases are able to be deployed to.

To add a phase click the **+ Add Phase** button.

![](lifecycle-add-phase.png "width=500")

Once you have named the phase, you can add environments.

![](lifecycle-phase-add-environment.png "width=500")

You can define if this environment is automatically deployed to when the release enters the phase, or it is a manual deployment. Automatic deployment will send a release to the environment as soon as the phase becomes available for deployment. Automatic deployment environments are denoted by a lightning bolt icon next to the environment (see below).

:::hint
**Automatic Release Creation**
If you have a project setup with [Automatic Release Creation](/docs/deployment-process/releases/automatic-release-creation.md) and set your first phase and environment to automatically deploy, pushing a package to the internal library will trigger both a release, and a deployment to that environment. A hands off deployment triggered by a build server push!
:::

Once you have more than one environment defined in a phase you can gate the phase.

![](lifecycle-gated-phase.png "width=500")

There is a setting for the phase called "Required to progress". This allows you to state how many environments within a phase must be deployed to before the next phase can be activated. If you have 5 environments and set this value to 2, only two environments must be deployed to before the next phase can be actively deployed to. If any environments within the next phase have automatic deployments set, they will trigger.

To configure this, click the **Change** button and select the option you would like to use.

![](lifecycle-gated-phase-progression.png "width=500")

Click **OK** to save your changes

![](lifecycle-gated-phase-only-one.png "width=500")

Once all of your phases are defined your Lifecycle has a 'tree view'.

![](lifecycle-tree-view.png "width=500")

It shows the flow of the deployment in a visual way.

### Optional Phases {#Lifecycles-OptionalPhases}

Introduced in `3.12.8`, Optional Phases allow you to configure a phase to be optionally skipped when it is reached in the Lifecycle. This allows you to release to environments in the next phase without being required to deploy to _any_ in the optional phase. The standard Lifecycle progression and Automatic Deployment rules apply that determine when an optional phase is deployable.

This feature may be useful for scenarios such as the provision of a `Testing` phase that can optionally be deployed to, but isn't crucial to progressing on to `Production`. A previous work around for this feature would involve adding the `Testing` environment to the previous `Dev` phase with a specific minimum deployed environment count set, however this may result in the project being deployed to `Testing` _instead of_ the required `Dev` before progression.

![Optional Phase](optional-phase.png)

### No Progression

If you want to be able to deploy to any environment at any time then simply create a single phase which has `Phase Progression` set to `All must complete` and includes all your environments.

## Lifecycles and Projects {#Lifecycles-LifecyclesandProjects}

A project can only be deployed to any environments defined in their lifecycle.

![](lifecycle-deployment-process.png "width=500")

The overview for a project now shows where a release is up to on the deployment process.

![](lifecycle-project-overview.png "width=500")

You can see which environments have been released to and what is available for release via the Lifecycle tree.

---
title: Lifecycles
description: Lifecycles allow you to control the way releases are promoted between environments.
position: 2
---

Lifecycles give you control over the way releases are promoted between environments. Lifecycles enable a number of advanced deployment workflow features:

- **Control the order of promotion**: for example, to prevent a release being deployed to *Production* if it hasn't been deployed to *Staging*.
- **Automate deployment to specific environments**: for example, automatically deploy to *Test* as soon as a release is created.
- **Retention policies**: specify the number of releases to keep depending on how far they have progressed through the lifecycle.

Lifecycles are defined by phases. A lifecycle can have one or many phases.

- Phases occur in order. One phase must have a complete successful deployment before the next phase will be deployed to.
- Phases have one or more environments.
- Environments in a phase can be defined as automatic deployment environments or manual deployment environments.
- Phases can have a set number of environments that must be released to, before the next phase is available for deployment.

## Managing Lifecycles

Lifecycles are managed by navigating to **{{Library,Lifecyles}}**.

## Create a New Lifecycle

1. From the Lifecycle page, click on the **ADD LIFECYCLE** button.
2. Give the Lifecycle a name and add a description.
3. Define the Retention Policy.

Retention policies define how long releases are kept for, and how long extracted packages and files are kept on Tentacles. The default for both is to keep all. Learn more about [Retention Policies](/docs/administration/retention-policies/index.md).

4. Click **ADD PHASE**, to explicitly define the phases of the lifecycle.
5. Give the phase a name.
6. Click **ADD ENVIRONMENT** to define which environments can be deployed to during this phase of the lifecycle. Add multiple environments at this point, if this phase deploys to multiple environments.
7. Select the environment.
8. By default, users must manually queue the deployment to the environment, if you would like the deployment to occur automatically as soon as the release enters the phase, select *Deploy automatically...*.

If you have a project setup with [Automatic Release Creation](/docs/deployment-process/releases/automatic-release-creation.md) and set your first phase and environment to automatically deploy, pushing a package to the internal library will trigger both a release, and a deployment to that environment.

9. Set the *Required to progress* option. This determines how many environments must be deployed to before the next phase can be activated. The options are:

  - All must complete.

If you want to be able to deploy to any environment at any time, then simply create a single phase which has `Phase Progression` set to `All must complete` and includes all your environments.

  - A minimum of x must complete. If choose this option, and, for example, have 5 environments in the phase and choose **2**, then 2 of the 5 environments must be deployed to before the next phase can be activated.
  - Optional. This lets you skip a phase when it is reached in the Lifecycle. This allows you to release to environments in the next phase without being required to deploy to _any_ in the optional phase. The standard Lifecycle progression and Automatic Deployment rules apply that determine when an optional phase is deployable. Optional phases may be useful for scenarios such as the provision of a `Testing` phase that can optionally be deployed to, but isn't crucial to progressing on to `Production`.

![Optional Phase](optional-phase.png)

10. Each phase of the Lifecycle can have its own retention policy defined. Set the retention policy for the phase if you don't want it to inherit the retention policy defined for the entire Lifecycle.
11. Add as many additional phases as you need.
12. Click **SAVE**.

After you have defined your lifecycles, they become available to your projects. Projects can be deployed to any environment in their lifecycle.

![](lifecycle-deployment-process.png "width=500")

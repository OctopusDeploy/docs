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

You can specify multiple Lifecycles to control which projects are deployed to which environments. Lifecycles are a key component of [channels](/docs/deployment-process/channels/index.md) which give you even great control over how your software is deployed. Channels let you use multiple Lifecycles for a project and then automatically deploy to specific channels, using the defined lifecycle, based on the version of the software being deployed.

## Managing Lifecycles

Every [project](/docs/deployment-process/projects/index.md) has a default lifecycle.

Lifecycles are managed from the library page by navigating to **{{Library,Lifecyles}}**.

## Create a New Lifecycle

1. From the Lifecycle page, click on the **ADD LIFECYCLE** button.
2. Give the Lifecycle a name and add a description.
3. Define the Retention Policy.

Retention policies define how long releases are kept for, and how long extracted packages and files are kept on Tentacles. The default for both is to keep all. Learn more about [Retention Policies](/docs/administration/retention-policies/index.md).

4. Click **ADD PHASE**, to explicitly define the phases of the lifecycle.
5. Give the phase a name.
6. Click **ADD ENVIRONMENT** to define which environments can be deployed to during this phase of the lifecycle.

At this point, you can add one or multiple environments, or leave the default **Any Environments** option selected. Note, if you choose to use **Any Environments**, this phase of the Lifecycle will deploy to all the environments that haven't been explicitly added to the Lifecycle in previous phases. Any future environments you define will also be deployed to as part of this phase of the Lifecycle.

7. By default, users must manually queue the deployment to the environment, if you would like the deployment to occur automatically as soon as the release enters the phase, select *Deploy automatically...*.

If you have a project setup with [Automatic Release Creation](/docs/deployment-process/releases/automatic-release-creation.md) and set your first phase and environment to automatically deploy, pushing a package to the internal library will trigger both a release, and a deployment to that environment.

:::hint
**Tenants and automatic-environments**

1. If tenanted deployments are allowed, attempt to enqueue a new deployment for each tenant connected to the automatic-environment(s), taking the following into consideration:
  1a. Filter the tenants by any Tenant filter defined on the Channel for the Release being considered for deployment.
  1b. Further filter the tenants based on promotion rules (e.g. deploy to UAT before Production for this tenant)
2. If untenanted deployments are allowed, attempt to enqueue the untenanted deployment to the automatic-environment(s).

:::

8. Set the *Required to progress* option. This determines how many environments must be deployed to before the next phase can be activated. The options are:

- **All must complete**.
- **A minimum of x must complete**. If choose this option, and, for example, have 5 environments in the phase and choose **2**, then 2 of the 5 environments must be deployed to before the next phase can be activated.
- **Optional**. This lets you skip a phase when it is reached in the Lifecycle. This allows you to release to environments in the next phase without being required to deploy to _any_ in the optional phase. The standard Lifecycle progression and Automatic Deployment rules apply that determine when an optional phase is deployable. Optional phases may be useful for scenarios such as the provision of a `Testing` phase that can optionally be deployed to, but isn't crucial to progressing on to `Production`.

![Optional Phase](optional-phase.png)

If you want to be able to deploy to any environment at any time, then simply create a single phase which has `Phase Progression` set to `All must complete` and includes all your environments.

9. Each phase of the Lifecycle can have its own retention policy defined. Set the retention policy for the phase if you don't want it to inherit the retention policy defined for the entire Lifecycle.
10. Add as many additional phases as you need.
11. Click **SAVE**.

After you have defined your lifecycles, they become available to your projects. Projects can be deployed to any environment in their lifecycle.

![](lifecycle-deployment-process.png "width=500")

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-04-28
title: Deployment target triggers
icon: fa-solid fa-desktop
description: Deployment target triggers allow you to define unattended behavior for your project that will cause an automatic deployment of a release into an environment.
navOrder: 1
---

Deployment target triggers (also known as auto-deploy) let you define an unattended behavior for your [projects](/docs/projects/) that will cause an automatic deployment of a release into an [environment](/docs/infrastructure/environments). This means, you can configure new deployment targets to be just like their counterparts.

Deployment target triggers can help you:

- [Elastically scale a farm of servers](/docs/deployments/patterns/elastic-and-transient-environments).
- [Automatically keep your deployment targets up to date](/docs/deployments/patterns/elastic-and-transient-environments/keeping-deployment-targets-up-to-date) without needing to perform manual deployments.
- [Deploy to transient deployment targets](/docs/deployments/patterns/elastic-and-transient-environments/deploying-to-transient-targets) (targets that are disconnected from time to time).
- [Implement immutable infrastructure environments](/docs/deployments/patterns/elastic-and-transient-environments/immutable-infrastructure) (sometimes called "Phoenix Environments").
- Remove deployment targets that have gone offline. For instance, disable a machine in Octopus and have a deployment process that removes disabled machines from your load balancer.

On the surface deployment target triggers appear to be simple, however they can grow complex very quickly and we recommend reading our [Elastic and Transient Environments](/docs/deployments/patterns/elastic-and-transient-environments) guide before getting started with your own implementation.

## Defining deployment target triggers

Deployment target triggers can be triggered by any machine-related event. A scheduled task runs in Octopus every 30 seconds looking for new events to determine whether any automatic deployment triggers need to fire. Each trigger is inspected to see if the recent stream of events should cause the trigger to fire, and if so, the appropriate deployments will be queued and run for the deployment target(s) that caused the trigger to fire.

Events have been placed into the following pre-defined groups:

| Event group | Included Events |
| ----------- | --------------- |
| **Machine events** | Machine cleanup failed, Machine created, Machine deployment-related property modified, Machine disabled, Machine enabled, Machine found healthy, Machine found to be unavailable, Machine found to be unhealthy, Machine found to have warnings |
| **Machine critical-events** | Machine cleanup failed, Machine found to be unavailable |
| **Machine becomes available for deployment** | Machine enabled, Machine found healthy, Machine found to have warnings |
| **Machine is no longer available for deployment** | Machine disabled, Machine found to be unavailable, Machine found to be unhealthy |
| **Machine health changed** | Machine found healthy, Machine found to be unavailable, Machine found to be unhealthy, Machine found to have warnings |

:::div{.success}
For the majority of cases where you want to auto-deploy your project as new deployment targets become available, we advise you use only the **Machine becomes available for deployment** event group.
:::

As you define your deployment target triggers, you can select the pre-defined **event groups** or individual **events**:

- Machine cleanup failed
- Machine created
- Machine deployment-related property modified
- Machine disabled
- Machine enabled
- Machine found healthy
- Machine found to be unavailable
- Machine found to be unhealthy
- Machine found to have warnings

You can restrict deployments target triggers further by specifying the following:

- The environment(s) the trigger applies to.
- The target tags the trigger applies to.
- The environment and target tags the trigger applies to.

## Add a deployment target trigger

1. From a project, select **Triggers**, then **Add Trigger ➜ Deployment target**.
2. Give the trigger a name.
3. Specify the event group or individual events that will trigger the releases.
4. If you want to limit the trigger to specific environments, select those environments.
5. If you want to limit the trigger to specific target tags, select those target tags.
6. Specify whether or not to re-deploy to deployment targets even if they are already up-to date with the current deployment.
7. Save the trigger.

With the trigger save, Octopus will run a scheduled task every 30 seconds looking for events that machine the deployment trigger.

## Unattended release behavior

Deployment target triggers let you configure unattended deployment behavior that configures new deployment targets to be just like their counterparts.

When a deployment target trigger fires, the following rules are applied:

- By default, Octopus will re-run the *currently successful* deployment for the project/environment/tenant combination. You can override this behavior by configuring an [auto deploy override](/docs/octopus-rest-api/octopus-cli/create-autodeployoverride). Note, if multiple identical deployment targets all become available within the same 30 second polling window, they will all be included in the same automatic deployment. This could happen if you scale your web farm up by four nodes, and all four nodes finish provisioning within the same time window. However, this kind of behavior should not be expected or relied on (one or more of the targets might fall outside the 30 second window).
- The steps that were run for the *currently successful* deployment will be run for the deployment targets that triggered the deployment. This includes [manual intervention](/docs/projects/built-in-step-templates/manual-intervention-and-approvals/) and [guided failure](/docs/releases/guided-failures) steps. Note, if you skip steps in a manual deployment, they will be skipped in the subsequent automatic deployment. If you need to run a deployment and skip some steps, there are two ways you can reset the skipped steps:
  1. Re-running the entire deployment of the same release again (we generally recommend designing your steps so they can be re-run without negative side-effects).
  2. Configuring an [auto deploy override](/docs/octopus-rest-api/octopus-cli/create-autodeployoverride) for the same release to the same environment/tenant (this will result in a new deployment being generated without the manually skipped steps).
- If a deployment of a release fails, Octopus will continue deploying the last successful deployment. This ensures auto-deployments will continue, even if a release has been updated and failed.

## The order of deployment target triggers

Because projects are considered independent in Octopus, and there is no built-in way to define dependencies between projects or control the order in which projects are deployed.

:::div{.success}
We generally recommend catering for application dependencies in the applications themselves, rather than pushing that responsibility to your deployments. This practice will reduce friction between your applications allowing you to reliably deploy your applications independently of each other.
:::

One workaround for this is to create a project in Octopus with the job of orchestrating the deployment of multiple projects.

In this case you could:

1. Create a project that orchestrates the deployment of multiple projects.
2. Each step in the deployment process of this project could call the Octopus API to deploy the next project in the dependency chain, waiting for a successful deployment before continuing to the next project.
3. Optionally create an deployment target trigger in the orchestrating project to start the whole process.

:::div{.success}
The [Chain Deployment](https://library.octopus.com/step-template/actiontemplate-chain-deployment) step template might be a perfect fit for you in this situation, or you may want to customize this step template for more advanced scenarios.
:::

### Specifying a specific release to be deployed

If you need to specify a specific release, either because the release hasn't been deployed yet, or Octopus is calculating the wrong release for a particular situation, you can configure an [auto deploy override](/docs/octopus-rest-api/octopus-cli/create-autodeployoverride/) to override the default automatic deployment behavior.  This is useful for scenarios like [immutable infrastructure](/docs/deployments/patterns/elastic-and-transient-environments/immutable-infrastructure/), [deploying to transient targets](/docs/deployments/patterns/elastic-and-transient-environments/deploying-to-transient-targets), and force deployment target triggers to use a specific release for a specific environment/tenant.

## Deployment target trigger subscription notifications

If you want to be notified of automatic deployments events, like blockages or failures, you can configure [subscriptions](/docs/administration/managing-infrastructure/subscriptions) to notify you by email or use web hooks to create your own notification channels. You can even use web hooks to code your own recovery behavior based on your specific situation.

## Troubleshooting deployment target triggers

There are a number of reasons why automatic deployments may not work the way you expected, some of which we've already discussed earlier. Here are some troubleshooting steps you can take to figure out what is going wrong.

### Is the dashboard green?

Octopus will attempt to automatically deploy the current releases for the environments that are appropriate for a machine. The current release is the one that was most recently *successfully* deployed as shown on the [project dashboard](/docs/projects/project-dashboard).

- Octopus will not automatically deploy a release if the deployment for that release was not successful (this can be a failed deployment or even a canceled deployment)

You will need you to complete a successful deployment again before auto-deployments can continue for the given release, or configure an [auto deploy override](/docs/octopus-rest-api/octopus-cli/create-autodeployoverride).

### Investigate the diagnostic logs

Go to **Configuration ➜ Diagnostics ➜ Auto deploy logs**. The **verbose** logs usually contain the reason why a project trigger didn't take any action. For example:

```
Auto-deploy: Machine 'Local' does not need to run release '2.6.6' for project 'My Project' and tenant '<none>' because it already exists on the machine or is pending deployment.
```

:::div{.info}
Diagnostics are only available on [self-hosted Octopus](/docs/getting-started#self-hosted-octopus) instances.
:::

### Investigate the audit messages

The deployment triggers are all triggered based on events occurring in Octopus, all of which are logged reliably as audit events. Go to **Configuration ➜ Audit** and filter down to see the events related to your deployments.

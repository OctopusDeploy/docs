---
title: Project Triggers
description: Project Triggers allow you to define unattended behavior for your project such as automatically deploying a release to an environment.
position: 4
version: 3.4
---

Project Triggers allow you to define an unattended behavior for your [Projects](/docs/deployment-process/projects/index.md).

:::success
We have written a [comprehensive guide](/docs/deployment-targets/elastic-and-transient-environments/index.md) about using Project Triggers with a focus on deploying to elastic and transient environments.
:::

Project Triggers allow you to choose from a subset of **events** that can occur in Octopus Deploy, apply a **filter** to those events, and decide on an **action** you want performed once the trigger fires. The example below shows an Automatic Deployment Trigger configured to fire when a [Deployment Target](/docs/infrastructure/index.md) with the [Machine Role](/docs/infrastructure/environments/target-roles/index.md) **web-server** belonging to the **Production** [Environment](/docs/infrastructure/environments/index.md) becomes available.

![](/docs/images/5671189/5865830.png "width=500")

## Automatic Deployment Triggers

Automatic Deployment Triggers were introduced in **Octopus Deploy 3.4**.

Automatic Deployment Triggers (also known as auto-deploy) allow you to define an unattended behavior for your [Projects](/docs/deployment-process/projects/index.md) that will cause an automatic deployment of a release into an [Environment](/docs/infrastructure/environments/index.md).

Automatic Deployment Triggers can help you:

- [Elastically scale a farm of servers](/docs/deployment-targets/elastic-and-transient-environments/index.md)
- [Automatically keep your deployment targets up to date](/docs/deployment-targets/elastic-and-transient-environments/keeping-deployment-targets-up-to-date.md) without needing to perform manual deployments
- [Deploy to transient deployment targets](/docs/deployment-targets/elastic-and-transient-environments/deploying-to-transient-targets.md) (targets that are disconnected from time to time)
- [Implement immutable infrastructure environments](/docs/deployment-targets/elastic-and-transient-environments/immutable-infrastructure.md) (sometimes called "Phoenix Environments")

On the surface Automatic Deployments appear to be simple, however they can grow complex very quickly and we recommend reading our [Elastic and Transient Environments](/docs/deployment-targets/elastic-and-transient-environments/index.md) guide before getting started with your own implementation.

:::success
The fundamental design of Automatic Deployments revolves around "configuring new deployment targets to be just like their counterparts".
:::

## How it works {#AutomaticDeploymentTriggers-Howitworks}

All [Project Triggers](/docs/deployment-process/project-triggers.md) in Octopus work on an event-sourcing basis. Automatic deployment triggers look for events like when deployment targets are added to an environment, or they are enabled, or given a new role, or deployments of a project are completed successfully.

A scheduled task runs in Octopus every 30 seconds looking for new events to determine whether any automatic deployment triggers need to fire. Each trigger is inspected to see if the recent stream of events should cause the trigger to fire, and if so, the appropriate deployments will be queued.

When the trigger fires and queues a deployment it will run the steps appropriate for the deployment target(s) that caused the trigger to fire.

There are quite a few complexities to the decision making process for automatic deployments, most of which are discussed in the following sections.

## Frequently Asked Questions {#AutomaticDeploymentTriggers-FrequentlyAskedQuestions}

### Which events can trigger an automatic deployment? {#AutomaticDeploymentTriggers-Whicheventscantriggeranautomaticdeployment?}

For Octopus 3.6 and above, you can select any machine-related event to cause an automatic deployment. We have also provided a convenient event-grouping mechanism to select a pre-defined group of events:

![](create-trigger.png "width=500")

The following table outlines each event group and their included events:

| Event Group | Included Events |
| ----------- | --------------- |
| **Machine critical-events** | Machine cleanup failed, Machine found to be unavailable |
| **Machine becomes available for deployment** | Machine enabled, Machine found healthy, Machine found to have warnings |
| **Machine is no longer available for deployment** | Machine disabled, Machine found to be unavailable, Machine found to be unhealthy |

:::success
For the majority of cases where you want to auto-deploy your project as new deployment targets become available, we advise you use only the **Machine becomes available for deployment** event group.
:::

For Octopus 3.4 and 3.5, there are two types of events that can trigger an automatic deployment:

![](/docs/images/5671191/5865883.png "width=500")

| Event | Description | Examples |
| ----- | ----------- | ---------|
| **New deployment target becomes available** | Occurs when a deployment target is added to Octopus for the first time | |
| **Existing deployment target changes state** | Occurs when a deployment target has a *positive* state change (it doesn't really make sense to deploy to a freshly disabled deployment target) | <ul> <li>Health status changes from Unhealthy to Healthy</li> <li>A new environment/role/tenant is added to the deployment target</li> <li>The deployment target is enabled</li> </ul> |

### Can I configure automatic deployments for a specific role or environment? {#AutomaticDeploymentTriggers-CanIconfigureautomaticdeploymentsforaspecificroleorenvironment?}
Yes! You can apply a filter to the events to restrict which deployment targets will actually cause the trigger to fire, and consequently, which deployment targets will be automatically deployed to. Consider the example of an auto-scaling web farm shown below where we only want to trigger automatic deployments for **TradingWebServers** in the **Production** environment.

![](/docs/images/5671191/5865833.png "width=500")

### Which release will be deployed automatically? {#AutomaticDeploymentTriggers-Whichreleasewillbedeployedautomatically?}

The best way to answer this is to look at your dashboard or project overview. By default Octopus will re-run the *currently successful* deployment for the project/environment/tenant combination. The end result should be that the new deployment target is configured just like its counterparts.

![](/docs/images/5671191/5865836.png "width=500")

You can override this behavior by configuring an [Auto Deploy Override](/docs/api-and-integration/octo.exe-command-line/creating-auto-deploy-overrides/index.md).

### Which steps will be run during automatic deployments? {#AutomaticDeploymentTriggers-Whichstepswillberunduringautomaticdeployments?}

The automatic deployment will run the same steps as you would expect for a manual deployment to the deployment target(s) involved in the automatic deployment. The basic idea is to "configure the new deployment targets just like their counterparts".

Consider again our example of an auto-scaling farm of servers - when the pool scales up you want every server in the pool to behave consistently. The best way for Octopus to achieve this is to re-run the same steps as the *currently successful* deployment for each project required by the deployment target by its **role(s)** and the **environment(s)** it belongs to.

Based on the example of adding nodes to a pool of web servers, when a deployment target with the **TradingWebServer** role is added to the **Production** environment in Octopus, the deployment process will:

- Include any "unscoped" steps (unscoped steps are run regardless of the target environment)
- Include any steps targeting the **TradingWebServer** role
- Include any steps scoped to the **Production** environment
- Exclude any steps that were skipped as part of the currently successful deployment (if they were skipped in the original deployment they should be skipped in the automatic deployments) - *see the following sections for more details*.

This should mimic the deployment process that was already run for all of the deployment target's counterparts.

In this illustration below you can see the steps targeting the **RateServer** role will be ignored, but the rolling steps targeting the **TradingWebServer** role will be executed.

![](/docs/images/5671191/5865837.png "width=500")

:::success
You can use the advanced deployment screen to see an approximation of the deployment process that will run for any combination of environment and roles by building a deployment to that environment and selecting an existing machine with matching roles.

![](/docs/images/5671191/5865838.png "width=500")
:::

### How to exclude steps? {#AutomaticDeploymentTriggers-HowToExcludeSteps?}

The current recommendation is to not have any steps in the project that you do not want to run, as there is not a way to determine if it's a manual or automatic deployment. There isn't a variable or other approach to determine how a deployment was triggered.

### What happens with Manual Interventions and Guided Failures? {#AutomaticDeploymentTriggers-WhathappenswithManualInterventionsandGuidedFailures?}

[Manual Intervention](/docs/deployment-process/steps/manual-intervention-and-approvals.md) steps and [Guided Failures](/docs/deployment-process/releases/guided-failures.md) will work just like they do in a manual deployment. At face value this may seem like it's not very automatic, and that's true. In the case where you use a Manual Intervention for smoke testing a new web server before it enters the load balanced pool you may want the step to pause until you've smoke tested. In the case where you use Manual Intervention for approving the deployment of a Release you may not want it to pause. We made the decision to pause for Manual Intervention steps and Guided Failures so that automatic deployments mimic manual deployments, like we described earlier.

We generally recommend avoiding the use of Manual Intervention steps unless absolutely necessary. If you need Manual Intervention steps to pause for manual deployments, but skip for automatic deployments, you can use a workaround: add the Manual Intervention step to a [Rolling Deployment](/docs/deployment-patterns/rolling-deployments.md) step which is targeted at a role that will never be part of an automatic deployment.

![](/docs/images/5671191/5865839.png "width=500")

### What happens if I disable some steps? {#AutomaticDeploymentTriggers-WhathappensifIdisablesomesteps?}

Disabled steps won't run in a manual deployment, and likewise they won't run in an automatic deployment.

### What happens if I skip steps in a manual deployment? {#AutomaticDeploymentTriggers-WhathappensifIskipstepsinamanualdeployment?}

Those steps will be skipped in automatic deployments as well. This decision is based on the principal of "configuring the new deployment target just like its counterparts" - if a step was skipped in the original deployment it should be skipped in subsequent automatic deployments. See the previous answer for more context.

**Resetting skipped steps**
We generally recommend running full deployments, and only skipping steps and/or choosing specific deployment targets when absolutely necessary. If you need to run a deployment choosing to skip some steps, there are two ways you can reset the skipped steps:

1. Re-running the entire deployment of the same Release again (we generally recommend designing your steps so they can be re-run without negative side-effects)
2. Configuring an [Auto Deploy Override](/docs/api-and-integration/octo.exe-command-line/creating-auto-deploy-overrides/index.md) for the same Release to the same Environment/Tenant (this will result in a new deployment being generated without the manually skipped steps)

In most cases configuring the Auto Deploy Override will work best.

### What happens if a deployment fails? {#AutomaticDeploymentTriggers-Whathappensifadeploymentfails?}

If a deployment of a release to an environment fails for any reason (including canceling a deployment), subsequent automatic deployments will be blocked for that release/environment. This decision is based in being safe-by-default - if a deployment fails, further automatic deployments are likely to fail also.

To unblock automatic deployments you can either:

1. Perform a successful manual deployment so the current deployment on the dashboard is successful
2. Configure an [Auto Deploy Override](/docs/api-and-integration/octo.exe-command-line/creating-auto-deploy-overrides/index.md) to override the default behavior and force a deployment of the selected release

:::success
You can be notified when this situation occurs, or use web hooks to code your own recovery actions - see [Subscriptions](/docs/administration/subscriptions.md) for more details.
:::

### Can automatic deployments become blocked? {#AutomaticDeploymentTriggers-Canautomaticdeploymentsbecomeblocked?}

Yes. See the previous answer for more context.

### Can multiple deployment targets be included in an automatic deployment? {#AutomaticDeploymentTriggers-Canmultipledeploymenttargetsbeincludedinanautomaticdeployment?}

Yes. If, for example, multiple identical deployment targets all become available within the same 30 second polling window, they will all be included in the same automatic deployment. This could happen if you scale your web farm up by four nodes, and all four nodes finish provisioning within the same time window.

Since this is not an exact science, we would discourage you from depending on this kind of behavior, instead designing your deployment process to cater for single and/or multiple deployment targets as part of the same automatic deployment process.

### Can I control the order of automatic deployments? {#AutomaticDeploymentTriggers-CanIcontroltheorderofautomaticdeployments?}

No. Projects are considered to be independent by Octopus, and there is no built-in way to define dependencies between Projects or control the order in which Projects are deployed.

:::success
We generally recommend catering for application dependencies in the applications themselves, rather than pushing that responsibility to your deployments. This practice will reduce friction between your applications allowing you to reliably deploy your applications independently of each other.
:::

One workaround for this is to create a Project in Octopus with the job of orchestrating the deployment of multiple Projects.

In this case you could:

1. Create a Project that orchestrates the deployment of multiple projects
2. Each step in the deployment process of this project could call the Octopus API to deploy the next project in the dependency chain, waiting for a successful deployment before continuing to the next project
3. Optionally create an automatic deployment trigger in the orchestrating project to start the whole process

:::success
The [Chain Deployment](https://library.octopusdeploy.com/step-template/actiontemplate-chain-deployment) step template might be a perfect fit for you in this situation, or you may want to customize this step template for more advanced scenarios.
:::

### Can I choose a Release that hasn't been deployed yet? {#AutomaticDeploymentTriggers-CanIchooseaReleasethathasn&#39;tbeendeployedyet?}

Yes! You can configure an [Auto Deploy Override](/docs/api-and-integration/octo.exe-command-line/creating-auto-deploy-overrides/index.md) to override the default automatic deployment behavior. This is really useful for scenarios like [Immutable Infrastructure](/docs/deployment-targets/elastic-and-transient-environments/immutable-infrastructure.md) or [Deploying to transient targets](/docs/deployment-targets/elastic-and-transient-environments/deploying-to-transient-targets.md).

### Octopus is choosing the wrong Release, can I force it? {#AutomaticDeploymentTriggers-OctopusischoosingthewrongRelease,canIforceit?}

Yes. If Octopus is calculating the wrong release for a particular situation you can configure an [Auto Deploy Overrides](/docs/api-and-integration/octo.exe-command-line/creating-auto-deploy-overrides/index.md) to force automatic deployments to use a specific release for a specific environment/tenant.

### Can I be notified of Automatic Deployment events (like blockages or failures)? {#AutomaticDeploymentTriggers-CanIbenotifiedofAutomaticDeploymentevents(likeblockagesorfailures)?}

Yes you can! By configuring [Subscriptions](/docs/administration/subscriptions.md) you can be notified by email or use web hooks to create your own notification channels. You can even use web hooks to code your own recovery behavior based on your specific situation.

### Can I include disabled machines in my automated deployments? {#AutomaticDeploymentTriggers-CanIincludedisabledmachinesinmyautomateddeployments?}

Starting in Octopus 3.6, you can! Because we allow selection of any machine event, you can select 'MachineDisabled' as a trigger event. This may be useful if you wish to disable a machine in Octopus and have a deployment process that removes disabled machines from your load balancer. It also means that you need to be careful when selecting your trigger event types, because if you create a project trigger with 'MachineDisabled' selected and did not mean to, anytime a machine becomes disabled it will re-deploy your project to this disabled machine.

## Troubleshooting automatic deployments {#AutomaticDeploymentTriggers-Troubleshootingautomaticdeployments}

There are a number of reasons why automatic deployments may not work the way you expected, some of which we've already discussed earlier. Here are some troubleshooting steps you can take to figure out what is going wrong.

### Is the dashboard green? {#AutomaticDeploymentTriggers-Isthedashboardgreen?}

Octopus will attempt to automatically deploy the current releases for the environments that are appropriate for a machine. The current release is the one that was most recently *successfully* deployed as shown on the project dashboard.

- Octopus will not automatically deploy a release if the deployment for that release was not successful (this can be a failed deployment or even a canceled deployment)
- If the initial deployment of a release was successful but an automatic deployment of that release fails, **Octopus will stop automatically deploying that release**.

You will need you to complete a successful deployment again before auto-deployments can continue for the given release, or configure an [Auto Deploy Override](/docs/api-and-integration/octo.exe-command-line/creating-auto-deploy-overrides/index.md).

### Investigate the diagnostic logs {#AutomaticDeploymentTriggers-Investigatethediagnosticlogs}

Go to {{Configuration,Diagnostics,Auto Deploy Logs}}. The **verbose** logs usually contain the reason why a project trigger didn't take any action. For example:

`Auto-deploy: Machine 'Local' does not need to run release '2.6.6' for project 'My Project' and tenant '<none>' because it already exists on the machine or is pending deployment.`

### Investigate the audit messages {#AutomaticDeploymentTriggers-Investigatetheauditmessages}

The automatic deployments are all triggered based on events occurring in Octopus, all of which are logged reliably as audit events. Go to {{Configuration,Audit}} and filter down to see the events related to your deployments.

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-05-01
title: Rolling deployments
description: Implementing rolling deployments, i.e. deploying to release to servers one-by-one, with Octopus.
navOrder: 0
---

Rolling deployments are a pattern whereby, instead of deploying a package to all servers at once, we slowly roll out the release by deploying it to each server one-by-one. In load balanced scenarios, this allows us to reduce overall downtime.

Normally, when executing a deployment process with multiple steps, Octopus runs all of the steps **sequentially**; it waits for the first step to finish before starting the second, and so on.

:::figure
![](/docs/deployments/patterns/images/normal-deployment.png)
:::

NuGet package steps and [PowerShell steps](/docs/deployments/custom-scripts), however, identify machines via [target tags](/docs/infrastructure/deployment-targets/#target-roles), which may be associated with multiple deployment targets. When a single step targets multiple machines, the step is run on those machines **in parallel**. So to recap:

- Deployment steps are run in sequence
- The actions performed by each step are performed in parallel on all deployment targets

However, sometimes this isn't desired. If you are deploying to a farm of 10 web servers, it might be nice to deploy to one machine at a time, or to batches of machines at a time. This is called a **rolling deployment**.

## Configuring a rolling deployment {#configure-rolling-deployment}

Rolling deployments can be configured on a PowerShell or NuGet package step by clicking **Configure a rolling deployment**.

:::figure
![](/docs/deployments/patterns/images/rolling-deployments-select.png)
:::

When configuring a rolling deployment, you specify a **window size**.

:::figure
![](/docs/deployments/patterns/images/rolling-deployments-window-size.png)
:::

The window size controls how many deployment targets can be deployed to at once.

- A window size of 1 will deploy to a single deployment target at a time. Octopus will wait for the step to finish running on deployment target A before starting on deployment target B
- A window size of 3 will deploy to a three deployment targets at a time. Octopus will wait for the step to finish running on deployment targets A, B *or* C before starting on deployment target D

:::div{.hint}
**Window size with Octopus.Action.MaxParallelism**
If you include the variable `Octopus.Action.MaxParallelism` in your Project you will find the **Window size** value is no longer respected. This is expected behavior as Octopus also uses this variable to limit the number of deployment targets on which the rolling deployment step will run concurrently. To set a **Window size** for the rolling deployment, add a variable value to `Octopus.Action.MaxParallelism` and scope it to the rolling steps. A warning will also be printed in the Task Log.
:::

## Child steps {#child-steps}

Rolling deployments allow you to wait for a step to finish on one deployment target before starting the step on the next deployment target. But what if you need to perform a series of steps on one target, before starting that series of steps on the next target? To support this, Octopus allows you to create **Child Steps**.

First, open the menu for an existing step, and click **Add Child Step**.

:::figure
![](/docs/deployments/patterns/images/rolling-deployments-child-step.png)
:::

Octopus has numerous steps that support rolling deployments depending on your install version including:

- Deploy to IIS step
- Deploy a Windows Service step
- Deploy a package step
- Run a Script
- Send an Email step
- Manual intervention required step
- Run an Azure PowerShell Script step
- Deploy an Azure Resource Manager template step
- Run a Service Fabric SDK PowerShell Script step

:::figure
![](/docs/deployments/patterns/images/rolling-deployments-package-type.png)
:::

After adding a child step, the deployment process will now show the step as containing multiple actions:

:::figure
![](/docs/deployments/patterns/images/rolling-deployments-multiple-actions.png)
:::

All child steps run on the same machine at the same time, and you can add more than one child step. You can also change the order that the steps are executed in using the **Reorder steps** link.

:::figure
![](/docs/deployments/patterns/images/rolling-deployments-reorder.png)
:::

You can edit the parent step to change the target tags that the steps run on or the window size.

With this configuration, we run the entire website deployment step - taking the machine out of the load balancer, deploying the site, and returning it to the load balancer - on each machine in sequence as part of a rolling deployment step.


### Child step variable run conditions {#child-step-variable-run-conditions}

It's possible to add variable [run conditions](/docs/projects/steps/conditions) to child steps in a rolling deployment. Both [variable expressions](/docs/projects/steps/conditions/#variable-expressions) and [machine-level](/docs/projects/steps/conditions/#machine-level-variable-expressions) variable expressions are supported. This allows you to customize the deployment process for machines taking part in a rolling deployment based on your specific needs.

For example, if you are deploying a web service update to a web farm in a rolling deployment, you could sanity test the service in a step called `Sanity Test Web Service`. This step would run after the update step and set the service status in an output variable:

```powershell
# $serviceStatus would be set by your own sanity test
$serviceStatus = "OK" 

$shouldAddBackToWebFarm = $serviceStatus -eq "OK"
Set-OctopusVariable -name "ShouldAddBackToWebFarm" -value "$shouldAddBackToWebFarm"
```

In a follow-up step, you can add it back to the web farm if the service status is positive with a machine-level variable run condition:

```powershell
#{if Octopus.Action[Sanity Test Web Service].Output[#{Octopus.Machine.Name}].ShouldAddBackToWebFarm == "True"}True#{/if}
```

Octopus will evaluate the value of the [Output variable](/docs/projects/variables/output-variables) indicated by `#{Octopus.Machine.Name}` individually as the value will be specific to each machine in the rolling deployment.

## Rolling deployments with guided failures

[Guided failures](/docs/releases/guided-failures) work perfectly with rolling deployments. If your deployment fails to one of the targets in your rolling deployment you can decide how to proceed. Imagine a scenario where you have three web servers in a load-balanced pool: `Web01`, `Web02` and `Web03`:

1. `Web01` is removed from the load balancer, the new release is deployed successfully and `Web01` is returned to the load-balanced pool.
2. `Web02` is removed from the load balancer, but the deployment of the new release fails. You can choose what happens next while `Web01` and `Web03` are still in the load-balanced pool.

    a. **Fail** the entire deployment so you can try again later.
    b. **Retry** the deployment to `Web02` as if the failure never happened.
    c. **Ignore** the error as if it never happened.
    d. **Exclude the machine from the deployment** continuing the deployment to the next machine in the rolling deployment.

## Learn more
- [View rolling deployment examples on our samples instance](https://oc.to/PatternRollingSamplesSpace).
- [Rolling deployment knowledge base articles](https://oc.to/RollingDeployTaggedKBArticles).
- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).

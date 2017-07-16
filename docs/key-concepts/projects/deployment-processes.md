---
title: Deployment Processes
description: Deployment Processes define the actions/steps performed on your behalf to deploy a project.
position: 0
---

Each [project](/docs/key-concepts/projects/index.md) defines the actions you want Octopus to perform on your behalf. In Octopus terms this is called the **deployment process**. The deployment process is like a recipe. It defines the set of instructions that will be run repeatably each time the project is deployed.

## Example: A simple deployment process {#DeploymentProcesses-Example:Asimpledeploymentprocess}

In the example shown below there are three steps that will be executed from top to bottom. The first is a [manual intervention](/docs/deploying-applications/manual-intervention-and-approvals.md) which executes on the Octopus Server pausing the deployment until someone intervenes and allow the deployment to continue. *You may have noticed this step will only execute when targeting the Production [environment](/docs/key-concepts/environments/index.md) - we'll talk more about that below.* The remaining steps both [deploy a package](/docs/deploying-applications/deploying-packages/index.md) and execute [custom scripts](/docs/deploying-applications/custom-scripts/index.md) on all of the [deployment targets](/docs/deployment-targets/index.md) with the [role](/docs/key-concepts/machine-roles.md) **web-server**.

![](/docs/images/5671366/5865841.png "width=500")

## Example: A rolling deployment {#DeploymentProcesses-Example:Arollingdeployment} {#rolling-deployments}

Let's consider a more complex example like the one shown below. In this example we have configured Octopus to deploy a web application across one or more servers in a web farm behind a load balancer. This process has a single **step** and three **actions** which form a [rolling deployment](/docs/patterns/rolling-deployments.md).

![](/docs/images/5671366/5865842.png "width=500")

:::hint
In most simple cases each step will have a single action, and as a convenience these are combined together in the user interface. This is why we talk mostly about steps, and sometimes the word step and action are used interchangeably.
:::

## Steps and actions {#DeploymentProcesses-Stepsandactions}

To fully leverage the power of Octopus deployments it helps to understand the difference between **steps** and **actions**, and how they are treated.

> Each deployment process consists of a series of **steps**, where each step can have one or more **actions**. Each action defines **what** you want Octopus to do on your behalf, and each step defines the **execution plan**and**context** of its action(s).

Let's look at the **Trading Website Rolling** step from our earlier example. It is configured to execute the actions across all deployment targets with the **web-server** role (this is the **context**), one deployment target at a time due to the **window size** of 1 (this is the **execution plan**). Learn more about [rolling deployments](/docs/patterns/rolling-deployments.md).

![](/docs/images/5671366/5865843.png "width=500")

This distinction between steps and actions has proven to be a really simple way to enable complex scenarios like rolling deployments, even though the distinction causes some confusion for our customers.

## How Octopus executes your deployment process {#DeploymentProcesses-HowOctopusexecutesyourdeploymentprocess}

By default, the list of steps in a deployment process are run sequentially from top-to-bottom, one after another.

![](/docs/images/5671366/5865844.png "width=500")

A step that is configured to execute across multiple deployment targets will execute across all of those deployment targets in parallel.

![](/docs/images/5671366/5865847.png "width=500")

You can define steps with multiple actions and apply a window size (like our earlier example) where the same step will execute across a limited number of deployment targets in parallel.

![](/docs/images/5671366/5865848.png "width=500")

For more information, see the section on [rolling deployments](/docs/patterns/rolling-deployments.md).

### Conditions {#DeploymentProcesses-Conditions}

Steps and actions can also have conditions. You can restrict a step so that it only runs when deploying to specific [environments](/docs/key-concepts/environments/index.md) (e.g., an Email step that only runs on production deployments).

![](/docs/images/3048075/3277617.png "width=500")

If you have created some [channels](/docs/key-concepts/projects/channels.md), you can also specify whether a step runs only when deploying a release through specific channels (e.g., a Script step that only runs for deployments through certain channels to configure extra telemetry). *This will only appear if you have created one or more non-default channels.*

![](/docs/images/3048075/3278573.png "width=500")

You can also specify whether a step runs only when previous steps are successful (default), when a previous step fails, or always.

![](/docs/images/3048075/3277616.png "width=500")

## Working with the Octopus API {#DeploymentProcesses-WorkingwiththeOctopusAPI}

Octopus Deploy is built API-first, which means everything you can do through the Octopus UI can be done with the API. In the API we model the deployment process the same way, starting at the Project:

- Project
 - Deployment Process
  - Steps
   - Actions

We have provided lots of helpful functions for building your deployment process in the [.NET SDK](/docs/api-and-integration/octopus.client.md), or you can use the raw HTTP API if that suits your needs better.

Learn about using the [Octopus REST API](/docs/api-and-integration/octopus-rest-api.md).

:::success
Record the HTTP requests made by the Octopus UI to see how we build your deployment processes using the Octopus API. You can do this in the Chrome developer tools, or using a tool like Fiddler.
:::

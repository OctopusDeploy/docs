---
title: Steps
description: Adding steps to define your project's deployment process.
position: 3
---
Steps contain the actions your deployment process will execute each time you create a release of your software to be deployed. Steps can contain multiple actions and deployment processes can include multiple steps. Steps are executed in sequence by default or you can configure [conditions](/docs/deployment-process/conditions/index.md) to control where and when steps run.

Octopus includes built-in step templates that have been developed by the Octopus team to handle the most common deployment scenarios. In addition to the built-in step templates, there are also [Community Step Templates](/docs/deployment-process/steps/community-step-templates.md) that have been contributed by the community. You can also use the built-in step templates as the base to create [custom steps templates](/docs/deployment-process/steps/custom-step-templates.md) to use across your projects.

## Adding Steps to Your Deployment Processes

1. Navigate to your [project's](/docs/deployment-process/projects/index.md) overview page by selecting **Projects** and clicking on the project you are working with.
2. Click the **DEFINE YOUR DEPLOYMENT PROCESS** button, and click **ADD STEP**.
3. Find the step template you need, hover over the step and click **ADD**.

At this point, you have the choice of choosing from the built-in **Installed Step Templates** or the [Community Contributed Step Templates](/docs/deployment-process/steps/community-step-templates.md).

If you're looking for example deployments, see the [Deploying Applications examples](/docs/deployment-examples/index.md).

4. Give the step a short memorable name.
5. The **Execution Plan** tells the step where to run. Depending on the type of step you are configuring the options will vary:

  - Octopus Server. (Learn about [Running steps on the Octopus Server](/docs/deployment-process/steps/how-to-run-steps-on-the-octopus-server.md).)
  - Octopus Server on behalf of target roles.
  - Deployment targets.

6. If you are deploying to deployment targets or running the step on the server on behalf of deployment targets, you can deployment to all targets in parallel (default) or configure a rolling deployment. To configure a rolling deployment click *configure a rolling deployment* and specify the window size for the deployment. The window size controls how many deployment targets will be deployed to in parallel.

Learn more about [rolling deployments](/docs/deployment-patterns/rolling-deployments.md).

7. The next section of the step is where you specify the actions for the step to take, if you are running a script or deploying a package this is where you provide the details. This section will vary depending on the type of step you're configuring. For example deployments, see the [Deploying Applications examples](/docs/deployment-examples/index.md). If you're deploying packages you'll likely need to set your [configuration variables](/docs/deployment-process/configuration-features/configuration-variables.md).
8. After providing the actions the steps takes, you can set the conditions for the step. You can set the following conditions:

- Only run the step when deploying to specific environments.
- Only run the step when deploying a release through a specific channel.
- Set the step to run depending on the status of the previous step.
- Set when package acquisition should occur.
- Specifying whether or not the step is required.

Learn more about [conditions](/docs/deployment-process/conditions/index.md).

9. Save the step.
10. Add additional steps.

With your deployment configured you're ready to create a [release](/docs/deployment-process/releases/index.md).

## Example: A Simple Deployment Process

In the example shown below there are three steps that will be executed from top to bottom. The first is a [manual intervention](/docs/deployment-examples/manual-intervention-and-approvals.md) which executes on the Octopus Server pausing the deployment until someone intervenes and allow the deployment to continue. This step will only execute when targeting the Production [environment](/docs/infrastructure/environments/index.md). The remaining steps both [deploy a package](/docs/deployment-examples/deploying-packages/index.md) and execute [custom scripts](/docs/deployment-examples/custom-scripts/index.md) on all of the [deployment targets](/docs/infrastructure/index.md) with the [role](/docs/infrastructure/target-roles/index.md) **web-server**.

![A simple deployment process](simple-process.png)

## Example: A Rolling Deployment Process

Let's consider a more complex example like the one shown below. In this example we have configured Octopus to deploy a web application across one or more servers in a web farm behind a load balancer. This process has a single step and three actions which form a [rolling deployment](/docs/deployment-patterns/rolling-deployments.md).

![A Rolling Deployment](rolling-process.png)

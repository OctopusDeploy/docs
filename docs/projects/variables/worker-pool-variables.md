---
title: Worker Pool variables
description: Create a worker pool variable and use it in deployment steps
position: 60
---

:::hint
Worker pool variables are only available in **Octopus 2020.1** and later.
:::

Worker pool variables are [variables](/docs/projects/variables/index.md) which can be used to select where a deployment or a [runbook](/docs/operation-runbooks/index.md) is executed. Steps that use workers can specify a worker pool directly on the step or have the step depend on a worker pool variable.  First you should set up your [worker](/docs/infrastructure/workers/index.md) and [worker pool](/docs/infrastructure/workers/worker-pools.md) infrastructure before you can use worker pool variables.

In Octopus, you can scope worker pools to:

- [Environments](/docs/octopus-concepts/environments.md)
- [Processes](/docs/octopus-concepts/deployment-process.md)
- [Steps](/docs/deployment-process/steps/index.md)
- [Channels](/docs/deployment-process/channels/index.md)

## Adding and creating worker pool variables

1. Enter variable name and select **Open Editor** select the **Change Type** drop-down and select **worker pool**.

![addworkerpoolvariable](images/workerpoolvariable-add.png "width=500")

2. In the the **Add Variable** window it lists all the available worker pools. Select the worker pool and then define the scope for the worker pool.

![addworkerpoolvariable](images/workerpoolvariable-changetype.png "width=500")

3. If required, add multiple values, binding each to the required scope. Worker pool variables can not be scoped to roles or targets as the pool is resolved during the planning phase of the deployment.

## Step Configuration

:::hint
Worker pool variables need to be configured on **all steps** in your deployment process that require it.
:::

By default, deployment steps are not configured to run on a worker pool set by a variable and you will need to change your deployment step to the variable required.

1. Open step and ensure the deployment step is configured to run on a worker.

2. Select **Runs on a worker from a pool selected via a variable**.

3. Pick the worker pool variable.

![addworkerpoolvariable](images/workerpoolvariable-selection.png "width=500")

4. Save step and test.

## Worker Pool Variable Examples

There are a range of use cases for worker pool variables

### Environment

Worker pool variables have a multiple use cases for consideration during set up. The most common would be to use environment specific Worker Pools to separate this for Development, Test and Production. Often these sit in different network segments, and often Production is in the cloud or in a DMZ and this would help with Security.

![addworkerpoolvariable](images/workerpoolvariable-environments.png "width=500")

### Performance

You can specify to run Deployment tasks in parallel and to use different Worker Pools to enable better concurrency of tasks.

### Role separation

In some cases you will want to specify different Worker Pools for different steps and an example of that is using a separate Worker Pool for Application deployments and a different Worker Pool for Database deployments.

### Security


## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
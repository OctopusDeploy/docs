---
title: Worker Pool variables
description: Create a worker pool variable and use it in deployment steps
position: 60
---
:::hint
Worker Pool variables are only available in **Octopus 2020.1** and later.
:::

## Add a Worker Pool to Octopus

Steps that use workers can specify a worker pool directly on the step or have the step depend on a worker pool variable.  First you should set up your [worker](/docs/infrastructure/workers/index.md) and [worker pool](/docs/infrastructure/workers/worker-pools.md) infrastructure before you can use Worker Pool variables.

## Worker Pool variables scopes

In Octopus, you can scope Worker Pools to:

- Environments
- Processes
- Steps
- Channels

## Adding and creating Worker Pool variables

1. Enter variable name and select **Open Editor** select **Change Type** drop-down and select **Worker Pool**.

![addworkerpoolvariable](images/workerpoolvariable-add.png "width=500")

2. In the the **Add Variable** window it lists all the available worker pools. Select the correct Worker Pool and then define the Scope for the Worker Pool. 

![addworkerpoolvariable](images/workerpoolvariable-changetype.png "width=500")

3. If required, add multiple values, binding each to the required scope. Worker pool variables can not be scoped to roles or targets as the pool is resolved during the planning phase of the deployment.

## Step Configuration

By default, deployment steps are not configured to run on a Worker Pool set by a variable and you will need to change your deployment step to the variable required.

1. Open step and ensure the deployment step is configured to run on a worker.

2. Select **Runs on a worker from a pool selected via a variable**

3. Pick the worker pool variable.

![addworkerpoolvariable](images/workerpoolvariable-selection.png "width=500")

4. Save step and test.

## Worker Pool Variable Examples

There are a range of use cases for Worker Pool Variables

### Environment

Worker Pool Variables have a range of use cases to consider when setting up. The default would be to use environment specific Worker Pools to separate this for Development, Test and Production. Often these sit in different network segments, and often Production is in the cloud or in a DMZ and this would help with Security.

![addworkerpoolvariable](images/workerpoolvariable-environments.png "width=500")

### Performance

You can specify to run Deployment tasks in parallel and to use different Worker Pools to enable better concurrency of tasks.

### Role separation

### Security


## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
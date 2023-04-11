---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Worker Pool variables
description: Create a worker pool variable and use it in deployment steps
navOrder: 60
---

:::hint
Worker pool variables are only available in **Octopus 2020.1** and later.
:::

Worker pool variables are [variables](/docs/projects/variables/index.md) which can be used to select where a deployment or a [runbook](/docs/runbooks/index.md) is executed. Steps that use workers can specify a worker pool directly on the step or have the step depend on a worker pool variable.  Before you can use worker pool variables, you must set up your [worker](/docs/infrastructure/workers/index.md) and [worker pool](/docs/infrastructure/workers/worker-pools.md) infrastructure.

In Octopus, you can [scope](/docs/projects/variables/index.md#scoping-variables) worker pools to:

- [Environments](/docs/infrastructure/environments/index.md)
- [Processes](/docs/projects/deployment-process/index.md)
- [Steps](/docs/projects/steps/index.md)
- [Channels](/docs/releases/channels/index.md)

## Add and create worker pool variables

1. Enter the variable name and select **Open Editor** select the **Change Type** drop-down and select **worker pool**.

![Add worker pool variable](images/workerpoolvariable-add.png "width=500")

2. In the **Add Variable** window, it lists all the available worker pools. Select the worker pool and then define the scope of the worker pool.

![Add worker pool variable type](images/workerpoolvariable-changetype.png "width=500")

3. If required, add multiple values, binding each to the required scope. Worker pool variables can not be scoped to roles or targets as the pool is resolved during the planning phase of the deployment.

## Step Configuration

:::hint
Worker pool variables need to be configured on **all steps** in your deployment process that requires it.
:::

By default, deployment steps are not configured to run on a worker pool set by a variable, and you will need to change your deployment step to the required variable.

1. Open step and configure the deployment step to run on a worker.
2. Select **Runs on a worker from a pool selected via a variable**.
3. Pick the worker pool variable.

![Select the worker pool variable](images/workerpoolvariable-selection.png "width=500")

4. Save the step.

## Worker pool variable examples

Worker pool variables have multiple use cases for consideration during set up. The benefit of worker pool variables is that you can use them separately or combine the examples.

### Environment

The most common would be to use environment-specific worker pools to separate this for development, test, and production. Often these sit in different network segments, and often production is in the cloud or in a DMZ, which would help with Security.

![addworkerpoolvariable](images/workerpoolvariable-environments.png "width=500")

### Performance & Role separation

Worker pool variables enable different worker pools for different steps, for example, you could use a separate worker pool for application deployments and a different worker pool for database deployments.

Running deployment tasks in parallel using different worker pools can enable better concurrency of tasks. Using worker pool variables for multiple tasks using parallel deployments on different workers would increase concurrency and performance of your deployment process.

Licensing requirements of software installed on workers may mean that the software can't be justified on all workers. You may choose to install the software on a small subsection of workers.

![Separation of roles for worker pool variables](images/workerpoolvariable-roleseparation.png "width=500")

### Network and security

[Network isolation](https://en.wikipedia.org/wiki/Network_segmentation) or [DMZ or a perimeter network](https://en.wikipedia.org/wiki/DMZ_(computing)) are common for most companies. They are considered best practices for most scenarios to control and manage the flow of your network and keep items separated. Using worker pool variables will allow you to control where your deployment or scripts run, which will ensure scripts or deployments can't access networks they may not be permitted to access.

![Worker pool variable network isolation](images/workerpoolvariable-networkisolation.png "width=500")

### Multi-Cloud and Multi-Region workers

[Multi-cloud](https://en.wikipedia.org/wiki/Multicloud) and Multi-Region strategies are commonplace. It's common to have workloads spread over multiple clouds and locations such as:

- [Azure](https://azure.microsoft.com/en-us/)
- [AWS](https://aws.amazon.com/)
- [GCP](https://cloud.google.com/)
- On-Premises
- Private Cloud

![multi-cloud worker pool variable](images/workerpoolvariable-multicloud.png "width=500")

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
- [Worker blog posts](https://octopus.com/blog/tag/workers)

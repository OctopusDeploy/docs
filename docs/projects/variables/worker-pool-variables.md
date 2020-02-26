---
title: Worker Pool Variables
description: Create a worker pool variable and use it in deployment steps
position: 60
---

Steps that use workers can specify a worker pool directly on the step or have the step depend on a worker pool variable.  First you should set up your [worker](/docs/infrastructure/workers/index.md) and [worker pool](/docs/infrastructure/workers/worker-pools.md) infrastructure.

In the variable editor select **Change Type** and **Worker Pool** as the variable type.  The **Add Variable** window is then displayed and lists all the available worker pools.

Select the pool you want to use.  If required, add multiple values, binding each to the required scope. Worker pool variables can not be scoped to roles or targets as the pool is resolved during the planning phase of the deployment.

## Add a Worker pool to Octopus

For instructions to set up worker pools in Octopus, see [worker pool](/docs/infrastructure/workers/worker-pools.md).

## Learn more

- [Variable blog posts](https:www.octopus.com/blog/tag/variables)
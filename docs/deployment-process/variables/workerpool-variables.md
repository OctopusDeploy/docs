---
title: Workerpool Variables
description: Create a worker pool variable and use it in deployment steps
position: 80
version: "[2019.2,)"
---

Steps that use workers can specify a worker pool directly on the step or have the step depend on a worker pool variable.  First you should set up your [worker](/docs/infrastructure/workers/index.md) and [worker pool](/docs/infrastructure/worker-pools.md) infrastructure.

In the variable editor select **Change Type** and **Worker Pool** as the variable type.  The **Add Variable** window is then displayed and lists all the available worker pools.

![AWS Account Variable](aws-account-variable.png "width=500")

Select the pool you want to use.  If required, add multiple values, binding each to the required scope.


## Worker pool Variable Properties

The Worker pool Variable also exposes the following properties that you can reference in a PowerShell script:

| Name and Description | Example |
| -------------------- | ------------------------|
| **`WorkerPoolId`** <br/> The Id of the pool | |
| **`WorkerPoolName`** <br/> The name of the pool | |

## Add a Worker pool to Octopus

For instructions to set up worker pools in Octopus, see [worker pool](/docs/infrastructure/worker-pools.md).

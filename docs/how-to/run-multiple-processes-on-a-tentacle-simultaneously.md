---
title: Run multiple processes on a Tentacle Simultaneously
position: 14
---


By default, Octopus will only run one process on each target at a time, queuing the rest. There may be reasons that you need to run multiple, and that's okay we have a setting for that!


![](/docs/images/3048158/3278139.png)


**OctopusBypassDeploymentMutex** must be set at the project variable stage. It will allow for multiple processes to run at once on the target.

:::hint
**Multiple projects**
If you require multiple steps to run on a target, by multiple Projects in parallel, you need to add this variable to **ALL** of your projects.
:::

:::problem
**Caution**
When this variable is enabled, Octopus will be able to run multiple deployments simultaneity on the same machine. This can cause deployments to fail if the same file is modified more than once at the same time.


If you use **OctopusBypassDeploymentMutex,**make sure that your projects will not conflict with each other on the same machine.
:::







:::hint
**Max Parallelism**
When enabling **OctopusBypassDeploymentMutex** there are a couple of special variables that may impact the number of parallel tasks that are run.

- `Octopus.Acquire.MaxParallelism`
 - This variable limits the number of package acquisitions that can run simultaneously on the Tentacle
 - By default, this is set to `10`
- `Octopus.Action.MaxParallelism`
 - This variable limits the maximum number of machines on which the action will concurrently execute
 - By default, this is set to `int.MaxValue`
:::

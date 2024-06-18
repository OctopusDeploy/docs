---
layout: src/layouts/Default.astro
pubDate: 2023-10-20
modDate: 2024-09-12
title: Prioritize Tasks
description: Tasks can be manually prioritized to run before other earlier queued tasks.
---

Tasks are run sequentially based on the time they are queued to start. If you have many deployments or runbooks running simultaneously, this can result in a large queue of Tasks. Octopus **2023.4** adds support for prioritizing Tasks that require immediate execution, such as production hotfixes.

Prioritizing Tasks can be done either on the **Tasks** page or when viewing an individual Task. On the **Tasks** page, select the overflow menu (`...`) on a queued task and click **Move to Top**. If you are viewing an individual Task, click the **Move to Top** button. Once an executing Task has completed, the prioritized Task will immediately start executing before any other Tasks in the queue.

The **Move to Top** button prioritizes the selected task above all others. This ensures that urgent tasks, such as hotfixes, can be addressed immediately.

:::div{.warning}
Ensure any other queued deployments to the same environment are cancelled when prioritizing a deployment, otherwise an unexpected version of a release may overwrite the prioritized deployment.
:::

## Task queue priority
In Octopus **2024.2** we have redesigned the task system. Each task will be assigned a weight and the task queue will evaluate the weight when picking up the task. Currently there are six different factors, listed in order of their significance:
* Queued tasks that are moved to the top
* Tasks created by a prioritized task
* Prioritized tasks
* Tasks created by a regular task
* Regular task


## Lifecycle phases
To mark a phase within a lifecycle as a priority, see [lifecycle phases with priority](/docs/releases/lifecycles#phases-with-priority) for more information. 

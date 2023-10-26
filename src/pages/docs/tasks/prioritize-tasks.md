---
layout: src/layouts/Default.astro
pubDate: 2023-10-20
modDate: 2023-10-20
title: Prioritize Tasks
description: Tasks can be manually prioritized to run before other earlier queued tasks.
---

Tasks are run sequentially based on the time they are queued to start. If you have many deployments or runbooks running simultaneously, this can result in a large queue of Tasks. Octopus **2023.4** adds support for prioritizing Tasks that require immediate execution, such as production hotfixes.

Prioritizing Tasks can be done either on the **Tasks** page or when viewing an individual Task. On the **Tasks** page, select the overflow menu (`...`) on a queued task and click **Move to Top**. If you are viewing an individual Task, click the **Move to Top** button. Once an executing Task has completed, the prioritized Task will immediately start executing before any other Tasks in the queue.

:::div{.warning}
Ensure any other queued deployments to the same environment are cancelled when prioritizing a deployment, otherwise an unexpected version of a release may overwrite the prioritized deployment.
:::
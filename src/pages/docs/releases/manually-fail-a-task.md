---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-29
title: Manually fail a task
description: How to manually fail a running or canceling task when tasks hang or get stuck.
icon: fa-regular fa-circle-stop
navOrder: 21
---

Octopus implements a queue of running background tasks. Sometimes, a task may hang, or be canceled, but never actually finish canceling. This prevents any new tasks from beginning, and new tasks will eventually appear as Timed Out.

When a task is queued, you'll see a list of tasks that it is waiting on in the task summary:

:::figure
![Cancel a running task](/docs/releases/images/cancel-tasks.png)
:::

You can navigate to any of these tasks, and then click the Cancel button in the top right corner on the executing/waiting/queued task (you may need to click it twice). This will mark the blocked task as Failed and then allow your new task to proceed.

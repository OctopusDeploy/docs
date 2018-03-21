---
title: Manually Fail a Running or Canceling Task
description: How to manually fail a running or canceling task when tasks hang or get stuck.
position: 21
---

Octopus implements a queue of running background tasks. Sometimes, a task may hang, or be canceled, but never actually finish canceling. This prevents any new tasks from beginning, and new tasks will eventually appear as Timed Out.

When a task is queued, you'll see a list of tasks that it is waiting on in the task summary:

![](/docs/images/3048144/3278080.png "width=500")

You can navigate to any of these tasks, and then click the Cancel button in the top right corner on the executing/waiting/queued task (you may need to click it twice). This will mark the blocked task as Failed and then allow your new task to proceed.

---
title: Manually fail a running or cancelling task
position: 2
---


Octopus implements a queue of running background tasks. Sometimes, a task may hang, or be cancelled, but never actually finish cancelling. This prevents any new tasks from beginning, and new tasks will eventually appear as Timed Out.


When a task is queued, you'll see a list of tasks that it is waiting on in the task summary:


![](/docs/images/3048144/3278080.png)


You can navigate to any of these tasks, and then click the Cancel button in the top right corner on the executing/waiting/queued task (you may need to click it twice). This will mark the blocked task as Failed and then allow your new task to proceed.

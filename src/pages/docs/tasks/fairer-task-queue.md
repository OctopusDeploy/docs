---
layout: src/layouts/Default.astro
pubDate: 2026-07-27
modDate: 2026-07-27
title: Fairer task queue
description: How Octopus shares the task cap between projects with queued priority tasks, so one project can't monopolize the queue.
---

:::div{.info}
The fairer task queue was introduced in Octopus **2026.2** and is being rolled out progressively to all customers.
:::

The number of tasks Octopus can run at the same time is limited by the [task cap](/docs/support/increase-the-octopus-server-task-cap). When you queue more tasks than the task cap allows, the remaining tasks wait in the queue.

Previously, [priority tasks](/docs/tasks/prioritize-tasks) ran strictly in the order they were queued. This meant a single project that queued a large number of priority tasks, such as a multi-tenanted deployment creating hundreds of tasks at the same time, could fill every available slot for hours. Priority tasks from other projects had to wait until the entire backlog cleared, even though they were also marked as priority.

The fairer task queue solves this by sharing the task cap between projects. When more than one project has priority tasks waiting, each project gets a fair share of the available slots, so a busy project can't crowd out the others.

## How it works

When Octopus picks the next task to run, it checks whether any projects have queued priority tasks. If they do, Octopus:

1. Divides the task cap equally between the projects that have queued priority tasks. For example, with a task cap of 20 and 2 projects with queued priority tasks, each project gets a share of 10.
2. Counts how many tasks each of those projects is currently running.
3. Runs priority tasks from projects that are below their share ahead of priority tasks from projects that have already reached their share.

Octopus re-evaluates the queue every time a task starts, so as projects reach their share, waiting projects get the next available slots. If only one project has queued priority tasks, it can still use the entire task cap, and tasks run in the same order as before.

### Example

Consider an instance with a task cap of 4:

- Project A queues 5 priority deployments. The first 4 start immediately, using all 4 slots. One remains queued.
- Project B then queues 1 priority deployment.

Two projects now have queued priority tasks, so each project's share is 2. Project A is running 4 tasks, which is above its share, and Project B is running none. When the next slot becomes free, Project B's deployment starts ahead of Project A's remaining task, even though Project A's task was queued first.

## What doesn't change

- **Regular tasks are unaffected.** Tasks that aren't priority tasks keep their first in, first out order, and still run after priority tasks.
- **The task cap is unchanged.** The fairer task queue only changes the order tasks are picked from the queue. It never runs more tasks than your task cap allows.
- **Tasks never skip locks.** A task that's blocked, for example by another deployment to the same target, is skipped and the next eligible task in the queue runs instead, just like before.
- **Move to Top still jumps the queue.** Tasks moved to the top with the **Move to Top** button are treated as priority tasks, so they're subject to the same per-project sharing. Within a project's share, they still run before other priority tasks.

:::div{.hint}
On [High Availability](/docs/administration/high-availability) clusters, a project may briefly run 1 or 2 tasks above its share when multiple nodes pick up tasks at the same time. This corrects itself as the queue is re-evaluated.
:::

## Availability

On Octopus Cloud, we're turning on the fairer task queue progressively for all instances. You don't need to do anything.

On self-hosted instances running Octopus **2026.2** or later, you can turn on the fairer task queue by setting this environment variable on each Octopus Server node and restarting the service:

```
OCTOPUS__FeatureToggles__FairPriorityTaskOrdererFeatureToggle=true
```

## Learn more

- [Prioritize tasks](/docs/tasks/prioritize-tasks)
- [Increase the Octopus Server task cap](/docs/support/increase-the-octopus-server-task-cap)
- [Octopus Cloud task cap](/docs/octopus-cloud/task-cap)

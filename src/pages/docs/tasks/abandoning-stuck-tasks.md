---
layout: src/layouts/Default.astro
pubDate: 2026-09-14
modDate: 2026-09-14
title: Abandoning stuck tasks
sidebarLabel: Abandoning tasks
navOrder:
description: Clear a deployment or runbook run that is stuck in the Cancelling state so it stops holding up other work.
subject: tasks, cancellation, stuck tasks, deployments, runbook runs
type: guide
audience: [devops-eng, admin, power-user]
image:
imageAlt:
---

When you cancel a deployment or runbook run, Octopus asks the execution to stop and moves the task to the **Cancelling** state. In rare cases the task never finishes cancelling and stays in **Cancelling** indefinitely, holding up everything waiting on it. This page explains what abandoning a task does to it, and how to abandon one from the task page.

## Abandoned tasks

An abandoned task is a deployment or runbook run that Octopus records as **Canceled** because it stopped responding to cancellation. Abandoning clears a task that normal cancellation could not, so the work queued behind it can proceed.

A task that sits in **Cancelling** still counts as in progress. It continues to block work that is waiting on it, including further deployments of the same release, and no other action in the Octopus Web Portal will clear it.

Abandoning changes only Octopus's record of the task. It does not stop the work:

- Scripts and steps may keep running on your deployment targets, and Octopus no longer reports on them.
- The usual cancellation clean-up is skipped, so related records such as deployment history and any manual interventions linked to the task may be left inconsistent.
- The task cannot return to running, and abandoning cannot be undone.

Abandoning is deliberately a last resort. Octopus offers it only after a task has been in **Cancelling** for more than 10 minutes, which gives normal cancellation time to complete on its own, and it shows you these consequences before it acts. Only abandon a task when it being stuck is causing more harm than the inconsistency abandoning leaves behind.

:::div{.warning}
Abandoning a task cannot be undone. Work already running on your deployment targets continues after you abandon the task, and Octopus stops tracking it.
:::

## Abandon a stuck task

Abandoning records a stuck task as **Canceled** so it stops blocking other work. Do this only when a deployment or runbook run has been stuck in **Cancelling** long enough that it is holding up work you need to run, and you accept that Octopus will stop tracking it.

**Before you begin**

You'll need:

- A deployment or runbook run that has been in the **Cancelling** state for more than 10 minutes. Abandoning is not available for any other task type or state.
- The `TaskCancel` permission, scoped to the project and environment of the task. Learn more about [permissions](/docs/security/users-and-teams/default-permissions).

To abandon a stuck task:

1. From the task's project, select **Tasks**, then select the stuck task to open its task page. You can also reach it from **Tasks** in the main navigation.
2. Select **Abandon** in the top right of the task page.
3. Read the consequences listed in the confirmation dialog.
4. Select **Abandon task** to confirm.

The task moves to the **Canceled** state, and its error message records who abandoned it. Work that was blocked by the task, such as a queued deployment of the same release, can now start.

:::div{.hint}
The **Abandon** button appears on the task page only once the task has been in **Cancelling** for more than 10 minutes. If you don't see it, the task either hasn't passed the 10 minute mark yet or isn't a deployment or runbook run. Refresh the task page after the 10 minutes have passed.
:::

## Version notes

- Abandoning a deployment or runbook run stuck in the **Cancelling** state is available from [PLACEHOLDER: the self-hosted Octopus Server version this ships in — needs: the release version and build number from the release train this merges to].

## Related links

- [Manually fail a task](/docs/releases/manually-fail-a-task)
- [Superseded tasks](/docs/tasks/superseded-tasks)
- [Troubleshooting failed or hanging tasks](/docs/support/troubleshooting-failed-or-hanging-tasks)
- [Tasks](/docs/tasks)

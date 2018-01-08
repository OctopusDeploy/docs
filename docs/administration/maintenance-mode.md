---
title: Maintenance mode
description: You can put Octopus Server into maintenance mode so you can safely perform server maintenance or other administrative activities.
position: 101
---

From time to time you will need to perform certain administrative activities on your Octopus Server, like [upgrading Octopus](/docs/administration/upgrading/index.md) or [applying operating system patches](/docs/administration/applying-operating-system-upgrades.md). Typically you will want to schedule a maintenance window where you perform these activities, and Octopus Server helps with this by switching to **Maintenance Mode**.

## How does it work

In summary Maintenance Mode enables you to safely prepare your server for maintenance, allowing existing tasks to complete, and preventing changes you didn't expect.

To enable or disable Maintenance Mode, go to {{Configuration,Maintenance}}.

![Maintenance Mode Configuration](maintenance-mode.png "width=500")

Only users with the `Administer System` permission can enable/disable Maintenance Mode.

Once Octopus is in Maintenance Mode:

- Users with the `Administer System` permission can still do anything they want, just like normal. All other users are prevented from making changes, which includes queuing new deployments or other tasks.
- The task queue will still be processed:
  - Tasks which were already running will run through to completion.
  - Tasks which were already queued (including [scheduled deployments](/docs/deployment-process/releases/scheduled-deployments.md)) will be started and run through to completion.
  - System tasks will still be queued and execute at their scheduled intervals. These kinds of tasks can be ignored since they are designed to be safe to cancel at any point in time.

## What about high availability

When you are using [Octopus High Availbility](/docs/administration/high-availability/index.md) clusters, you will typically want to limit downtime to a minimum. You should enable Maintenace Mode when it is appropriate for the activity you need to perform.

- [Applying operating system patches](/docs/administration/applying-operating-system-upgrades.md) can be an online operation.
- [Upgrading Octopus Server](/docs/administration/upgrading/index.md) is an online operation for patches, but you should schedule a small maintenance window for major and minor upgrades.
- [Moving parts of your Octopus Server around](/docs/administration/moving-your-octopus/index.md) will usually require a small maintenance window.
- Other activities where you want to temporarily prevent changes to your Octopus Server will benefit from going into Maintenance Mode.
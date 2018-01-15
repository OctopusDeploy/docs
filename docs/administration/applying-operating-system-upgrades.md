---
title: Applying operating system upgrades
description: This is the procedure you should follow when applying patches to the Operating System where Octopus Server is hosted.
position: 0
---

You should schedule regular maintenance of the Operating System hosting your Octopus Server to maintain the integrity, performance, and security of your deployments.

:::hint
**Recovering from failure**

If anything goes wrong during your Operating System maintenance you should restore the Operating System to the state just prior to applying patches and then start Octopus Server again.

You should not restore a backup of the Octopus SQL Database.
:::

## Single Octopus Server

1. Schedule a maintenance window with the teams using Octopus
1. Go to {{Configuration > Maintenance}} and enable [Maintenance Mode](/docs/administration/upgrading/maintenance-mode.md)
1. Wait for any remaining Octopus Tasks to complete by watching the {{Configuration > Nodes}} page
1. Stop the Octopus Server windows service

    - At this point you are ready to perform your Operating System maintenance. You should take whatever precautions you deem necessary in order to recover the system in case of failure. That could be a VM snapshot, full disk image backup, or just the automatic Restore Point created by Windows.

1. Apply patches and reboot as required
1. Start the Octopus Server windows service
1. Exit [Maintenance Mode](/docs/administration/upgrading/maintenance-mode.md)

## Octopus High Availability

If you are using an [Octopus High Availability](/docs/administration/high-availability/index.md) cluster you don't need to plan any downtime. Instead, you can just drain the tasks from each node and apply Operating System patches one at a time, while the other nodes continue to orchestrate your deployments.

For each node in your cluster:

1. Go to {{Configuration > Nodes}} and put the node into drain mode
1. Wait for any remaining Octopus Tasks on that node to complete
1. Stop the Octopus Server windows service on that node

    - At this point you are ready to perform your Operating System maintenance. You should take whatever precautions you deem necessary in order to recover the system in case of failure. That could be a VM snapshot, full disk image backup, or just the automatic Restore Point created by Windows.

1. Apply patches and reboot as required
1. Start the Octopus Server windows service on that node
1. Exit drain mode for that node so it will start accepting Octopus Tasks again
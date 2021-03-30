---
title: Increase the Octopus Server task cap
description: How to change the maximum number of tasks the Octopus Server can run in parallel.
---

Octopus limits the number of tasks it can run in parallel to a default of five tasks. If you find yourself needing to change this limit, you can do so with the following steps.

Under **Configuration** -> **Nodes** Select your Octopus Node.

1. Select the ... overflow menu.
2. Select Change Task Cap:

![nodes.png](images/taskcap.png "width=500")


3. In the new window you can select a new maximum synchronous Task Cap and save:


![taskcap.png](images/taskcap2.png "width=500")


Increasing the task cap will increase the maximum number of tasks the Octopus Server can run simultaneously. This should be increased with caution, as Octopus will require more system resources to handle the increased limit.

For information specific to High Availability nodes and task caps please see the following documentation page.
[Maintaining High Availability nodes](docs/administration/high-availability/maintain/maintain-high-availability-nodes.md)

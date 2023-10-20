---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-10-20
title: Task cap
description: The task cap is the limit of tasks that can be executing at a time.
---

Octopus limits the number of tasks it can run in parallel to a default of five tasks.

# Increasing the task cap

If you are running the self-hosted version of Octopus and you find yourself needing to change this limit, you can do so with the steps outlined on this page.

:::div{.hint}
If you're running [Octopus Cloud](/docs/octopus-cloud), your task cap is controlled by Octopus. To discuss changing your task cap in Octopus Cloud, [get in touch with us](https://octopus.com/company/contact).
:::

Under **Configuration ➜ Nodes** select your Octopus Node.

1. Select the overflow menu (`...`).
2. Select **Change Task Cap**:

   ![nodes.png](/docs/support/images/taskcap.png)


3. In the new window you can select a new maximum synchronous Task Cap and save:


   ![taskcap.png](/docs/support/images/taskcap2.png)

Increasing the task cap will increase the maximum number of tasks the Octopus Server can run simultaneously. This should be increased with caution, as Octopus will require more system resources to handle the increased limit.

For information specific to High Availability nodes and task caps please see the following documentation page.
[Maintaining High Availability nodes](/docs/administration/high-availability/maintain/maintain-high-availability-nodes)

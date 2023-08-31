---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Create a runbook
description: Step by step guide on how to create a runbook in Octopus Deploy.
navOrder: 30
hideInThisSection: true
---

A single Octopus Deploy Project can have multiple Runbooks.  Each Runbook has a unique runbook process, retention policy, and allowable environments to run in.  For example, a project might have a runbook to spin up additional infrastructure, or restart the server, or perform a daily backup.  

:::figure
![example runbook](/docs/getting-started/first-runbook-run/images/runbook-overview.png)
:::

1. From the *Hello world* project you created on the previous page, click **OPERATIONS** on the left menu to expand it (if it is not already expanded).
1. Click **GO TO RUNBOOKS**. 
1. Click **ADD RUNBOOK**.
1. Give the Runbook a name, for example, *Hello Runbook* and click **SAVE**.

The next step will [define a simple runbook process](/docs/getting-started/first-runbook-run/define-the-runbook-process) to run on either the Octopus Server or a worker (if you are using Octopus Cloud).

**Further Reading**

For further reading on Runbooks please see:

- [Runbook Documentation](/docs/runbooks)
- [Runbook Examples](/docs/runbooks/runbook-examples)

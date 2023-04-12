---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Defining the runbook process for workers
description: Step by step guide on how to define a runbook process to run on Workers in Octopus Deploy.
navOrder: 40
hideInThisSection: true
---

The runbook process is the steps the Octopus Server orchestrates to perform various tasks on your infrastructure.  To first understand how runbook proccesses work, we will add a single step to run on the Octopus Server (if self-hosted) or on a worker (if Octopus Cloud).  Future steps in this tutorial will configure additional steps to run on your servers.

![The Hello world deployment process](images/runbook-process.png "width=500")

1. From the *Hello Runbook* runbook you created on the previous page, click **DEFINE YOUR RUNBOOK PROCESS**.
1. Click **ADD STEP**.
1. Select the **Script** tile to filter the types of steps.
1. Scroll down and click **ADD** on the **Run a Script** tile.
1. Accept the default name for the script and leave the **Enabled** check-box ticked.
1. In the **Execution Location** section, select **Run once on a worker** (if you are on self-hosted Octopus, select **Run once on the Octopus Server**).  If you are using Octopus Cloud and want to use Bash scripts change the worker pool from **Default Worker Pool** to **Hosted Ubuntu**.
1. Scroll down to the **Script**, select your script language of choice, and enter the following script in the **Inline Source Code** section:

```powershell PowerShell
Write-Host "Hello, World!"
```
```bash Bash
echo "Hello, World!"
```

:::hint
If you are using Octopus Cloud, Bash scripts require you to select the **Hosted Ubuntu** worker pool.  The **Default Worker Pool** is running Windows and doesn't have Bash installed.
:::

8. Click **SAVE**.

The next step will [run the runbook](/docs/getting-started/first-runbook-run/running-a-runbook.md).

**Further Reading**

For further reading on runbook processes and what is possible please see:

- [Runbook Examples](/docs/runbooks/runbook-examples/)
- [Runbook Documentation](/docs/runbooks/)

<span><a class="btn btn-secondary" href="/docs/getting-started/first-runbook-run/create-a-runbook">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/first-runbook-run/running-a-runbook">Next</a></span>
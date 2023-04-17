---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Defining the deployment process
description: Step by step guide on how to define a deployment process in Octopus Deploy
navOrder: 30
hideInThisSection: true
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/0oWRg_TxWxM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The deployment process is the steps the Octopus Server orchestrates to deploy your software. For our simple hello world script, we will only have one step.

![The Hello world deployment process](/docs/getting-started/first-deployment/legacy-guide/images/deployment-process.png "width=500")

1. From the *Hello world* project you created on the previous page, click **DEFINE YOUR DEPLOYMENT PROCESS**.
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

The next step will [create a release and deploy it](/docs/getting-started/first-deployment/legacy-guide/create-and-deploy-a-release/).

**Further Reading**

For further reading on defining a deployment process in Octopus Deploy please see:

- [Deployment Process Documentation](/docs/projects/deployment-process/)
- [Deployment Documentation](/docs/deployments/)
- [Patterns and Practices](/docs/deployments/patterns/)

<span><a class="btn btn-secondary" href="/docs/getting-started/first-deployment/legacy-guide/create-projects/">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/first-deployment/legacy-guide/create-and-deploy-a-release/">Next</a></span>

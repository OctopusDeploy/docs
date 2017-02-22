---
title: Stage package uploads
description: How to stage package uploads to reduce your applications or services downtime.
position: 15
---

To reduce downtime, Octopus always uploads all packages before installing any of them. For example, given a deployment process that looks like this:

- Run a script
- Deploy package A
- Deploy package B
- Run another script
- Deploy package C

When the deployment runs, Octopus will insert an "Acquire" step to execute as part of the deployment process, before the first step that depends on packages:

- Run a script
- **Acquire packages**
- Deploy package A
- Deploy package B
- Run another script
- Deploy package C

You'll see this when the deployment executes:

![](/docs/images/3048154/3278134.png "width=500")

During the acquire packages stage, Octopus will upload all NuGet packages used in the deployment to all servers. We do this because package uploads can be time consuming, so we want to minimize the downtime between installing packages A and B in this example.

If you have a small window for downtime, you might like to **pre-stage** your packages. An easy way to do this is to use a [manual intervention step](/docs/deploying-applications/manual-intervention-and-approvals.md). The deployment process would become:

- **Acquire packages**
- [Manual intervention step](/docs/deploying-applications/manual-intervention-and-approvals.md)
- Deploy package A
- Deploy package B
- Run another script
- Deploy package C

Effectively, this will upload all packages, and then pause the deployment until you are ready to proceed. When your downtime window arrives, you can then click Proceed, and have the deployment continue.

When configuring your manual intervention step, take note:

- Check the "Wait for packages to be downloaded" checkbox (this will only appear after you move the manual step to the top of the deployment process). This ensures the manual step happens after package acquisition.
- You can scope the step to different environments - e.g., perhaps only production.

![](/docs/images/3048154/3278133.png "width=500")

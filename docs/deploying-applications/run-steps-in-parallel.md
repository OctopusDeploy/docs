---
title: Run steps in parallel
description: Running deployment steps in parallel can help reduce your deployment times.
position: 24
---

In Octopus 2.6 we added support to run steps in parallel. Before this feature, if you wanted to deploy many packages to different servers, you had to wait for step to finish before another one could start. By being able to run steps in parallel you can cut down your deployment time considerably in some scenarios.

To run steps in Parallel, simply create a deployment process with at least 2 steps:

![](/docs/images/3048080/3277652.png "width=500")

Then edit the second step and change its *Start Trigger* to **Run in parallel with previous step.**

![](/docs/images/3048080/3277651.png "width=500")

After you hit save, you'll notice that the two steps are now tied up together, meaning they will run at the same time during the deployment.

![](/docs/images/3048080/3277650.png "width=500")

## Steps in parallel on the same Tentacle {#Runstepsinparallel-Stepsinparallelonthesametentacle}

For safety reasons, by default Octopus runs only one step at the same time on a single Tentacle. If you want to run multiple steps on a Tentacle in parallel, [you'll need to enable that setting](/docs/how-to/run-multiple-processes-on-a-tentacle-simultaneously.md).

:::warning
**Friendly reminder**
Watch out not to run steps that depend on each other in parallel. If **Step2** depends on the success of **Step1**, it might not be the best idea to run them in parallel, but one after the other only if **Step1** was successful
:::

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Approvals with Manual Interventions
description: Step by step guide on how to use Manual Interventions in Octopus Deploy for approvals
navOrder: 60
hideInThisSection: true
---

[Getting Started - Manual Intervention](https://www.youtube.com/watch?v=ePQjCClGfZQ)

The manual intervention step accomplishes approvals in Octopus Deploy.  A deployment will pause when a manual intervention step is encountered and wait for approval or a rejection from a member of the specified team.

1. From the *Hello world* project you created earlier, click on **Process** on the left menu.
1. Click **ADD STEP**.
1. Select the **Other** tile to filter the types of steps.
1. Scroll down and click **ADD** on the **Manual Intervention Required** tile.
1. Accept the default name for the script and leave the **Enabled** check-box ticked.
1. Leave the **Container Image** set on the default.
1. Enter "Please verify the Production environment is ready before proceeding" in the **Instructions**.
1. Select "Octopus Administrators" and "Octopus Managers" as **Responsible Teams**
1. Select "Run only for specific environments" and select *Production* in the **Environments** conditions.
1. Click the **SAVE** button.

Right now, the step is configured to execute after the hello world script runs.  It makes much more sense for the approval to come before any other step.

1. Click on the overflow menu next to the **Filter by name** text box, and select **Reorder Steps**
1. Reorder the steps, so the manual intervention is the first one on the list.
1. Click on **DONE** and then click on **SAVE**.

:::figure
![Reorder steps](/docs/getting-started/first-deployment/images/img-reordersteps.png)
:::

Please create a new release and deploy it through to **Production**.  You will see the approval step being skipped in *Development* and *Testing*.  When you deploy to **Production**, the deployment will pause, and you will need to approve it before continuing.

:::figure
![Manual intervention is required in production](/docs/getting-started/first-deployment/images/img-manualintervention.png)
:::

The next step will [add deployment targets](/docs/getting-started/first-deployment/add-deployment-targets).

**Further Reading**

For further reading on approvals in Octopus Deploy please see:

- [Manual Intervention and Approvals](/docs/projects/built-in-step-templates/manual-intervention-and-approvals)
- [Deployment Documentation](/docs/deployments)
- [Patterns and Practices](/docs/deployments/patterns)

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-01-07
title: Approvals with Manual Interventions
description: Step by step guide on how to use Manual Interventions in Octopus Deploy for approvals
navOrder: 60
hideInThisSection: true
---

The **Manual Intervention Required** step lets you add approvals or manual checks to your deployment process. When manual intervention occurs, the deployment will pause and wait for approval or rejection from a member of a nominated responsible team.

## Add manual intervention step

1. From the *Hello world deployment* project you created earlier, click **Process** in the left menu.
2. Click **Add Step**.
3. Select the **Other** category to filter the types of steps.
4. Locate the Manual Intervention Required card and click **Add Step**.

:::figure
![Add Manual Intervention Required step to deployment process](/docs/getting-started/first-deployment/images/manual-intervention-step.png)
:::

### Step name

You can leave this as the default *Manual Intervention Required*.

### Instructions

5. Copy the message below and paste it into the **Instructions** field.

```
Please verify the Production environment is ready before proceeding.
```

### Responsible Teams

6. Select **Octopus Administrators** and **Octopus Managers** from the **Responsible Teams** dropdown list.

### Environments

7. Select **Run only for specific environments**.
8. Select **Production** from the **Environments** dropdown list.

You can skip the other sections of this page for this tutorial.

## Reorder deployment steps

Currently, your deployment process will run manual intervention after the script step. In a real deployment scenario, it makes more sense to run manual intervention before any other step.

1. Click the overflow menu **⋮** next to the **Filter by name** search box and click **Reorder Steps**.
2. Reorder the steps so manual intervention is at the top of the list.
3. Click **Done**.
4. **Save** your deployment process.

:::figure
![Reorder steps](/docs/getting-started/first-deployment/images/reorder-steps.png)
:::

## Release and deploy

1. Create a new release and deploy it through to the Production environment.

You will notice manual intervention doesn’t run in the Development or Staging environments. When the deployment reaches Production, it will pause and request approval.

:::figure
![Manual intervention is required in production](/docs/getting-started/first-deployment/images/manual-intervention.png)
:::

Your project is coming together well! Next, let's add a [deployment target](/docs/getting-started/first-deployment/add-deployment-targets).

### All guides in this tutorial series

1. [First deployment](/docs/getting-started/first-deployment)
2. [Define and use variables](/docs/getting-started/first-deployment/define-and-use-variables)
3. Approvals with manual interventions (this page)
4. [Add deployment targets](/docs/getting-started/first-deployment/add-deployment-targets)
5. [Deploy a sample package](/docs/getting-started/first-deployment/deploy-a-package)

### Further reading for approvals

- [Manual Intervention and Approvals](/docs/projects/built-in-step-templates/manual-intervention-and-approvals)
- [Deployments](/docs/deployments)
- [Patterns and Practices](/docs/deployments/patterns)

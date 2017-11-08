---
title: Working with groups of tenants using tags
description: How to use tenant tags to make working with tenanted deployments in Octopus.
position: 4
---

Previous step: [Working with tenant-specific variables](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-tenant-specific-variables.md)

This page describes how to use [tenant tags](/docs/reference/tenant-tags.md) to make working with tenanted deployments in Octopus much easier.

## Classifying and working with groups of tenants {#Workingwithgroupsoftenantsusingtags-Classifyingandworkingwithgroupsoftenants}

Working with a small number of tenants is quite easy, they all fit on one page, and you can tailor deployments for your projects and environments based in individual tenants. Working with a lot of tenants (we hope all of our customers are this successful!) is much harder if you try to tailor everything based on individual tenants. This is where it makes sense to work with tenants in aggregate, just like [environments](/docs/deployment-targets/environments/index.md) and [machine roles](/docs/deployment-targets/environments/machine-roles/index.md) let you work with machines in aggregate instead of individually.

Consider the example of setting up new infrastructure as a shared host for multiple tenants: Instead of specifying each tenant by their name, you could tag each tenant as belonging to a shared pool, and add that single tag to each deployment target in the pool. You can [jump ahead in our guide](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md) if this is of interest to you.

![](/docs/images/5669428/5865648.png "width=500")

*In the example above we are configuring a single deployment target for each tenant individually - what a headache!*

![](/docs/images/5669428/5865647.png "width=500")

*In the example above we are configuring a single deployment target for a group of tenants using a single tag - what a dream!*

## Introducing tenant tags {#Workingwithgroupsoftenantsusingtags-Introducingtenanttags}

In Octopus, tenant tags help you to classify your tenants using custom tags that meet your needs, and tailor tenanted deployments for your projects and environments. You can read more about [tenant tags](/docs/reference/tenant-tags.md) in our reference documentation, or jump to other sections in this guide to learn about tailoring your projects and environments for your tenants:

- [Designing a multi-tenant upgrade process](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md)
- [Designing a multi-tenant hosting model](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md)

## Example scenario: Treating VIP tenants with extra care and attention {#Workingwithgroupsoftenantsusingtags-Examplescenario:TreatingVIPtenantswithextracareandattention}

Let's walk through an example of classifying our tenants by some measure of importance which will help us group our tenants, and find them more easily.

- Step 1: Create a tag set and tags
- Step 2: Tag your existing tenant
- Step 3: Tailor the deployment process for VIP tenants
- Step 4: Deploy the project to your VIP tenant
- Step 5: Create and tag some more tenants to see the results

### Step 1: Create a tag set and tags {#Workingwithgroupsoftenantsusingtags-Step1:Createatagsetandtags}

Let's create a tag set called **Tenant importance** with some tags that represent different reasons why we might treat one tenant differently to others.

1. Go to {{Library,Tenant Tag Sets}}
2. Create a tag set called **Tenant importance** with the description:
   *Allows you to have different customers that we should pay more or less attention to*
3. Now add some tags to your tag set using these examples as a guide

| Name     | Description                            | Color      |
| -------- | -------------------------------------- | ---------- |
| VIP      | Very important tenant - pay attention! | Dark Red   |
| Standard | These are our standard customers       | Light Gray |
| Trial    | These are trial customers              | Purple     |

The result should look like the screen below:

![](tenant-importance.png "width=500")

:::success
Order is important for tag sets, and tags within those tag sets. Octopus will sort tag sets and tags based on the order you define in the library. This allows you to tailor the Octopus user interface to your own situation.
:::

### Step 2: Tag your existing tenant {#Workingwithgroupsoftenantsusingtags-Step2:Tagyourexistingtenant}

Let's tag your existing tenant to see how easy it is to work with tags.

1. Find your tenant, our example, **Beverley Sanchez** and tag them as a **VIP**, remembering to click **Save**. That's it!

The result should look like the screen below:

![](/docs/images/5669428/5865653.png "width=500")

### Step 3: Tailor the deployment process for VIP tenants {#Workingwithgroupsoftenantsusingtags-Step3:TailorthedeploymentprocessforVIPtenants}

Let's modify the deployment process so we provide our VIP tenants with a custom email announcing a new deployment.

1. Go to your Project
2. Add a step, to run the PowerShell script shown below, called **Notify VIP Contact** targeting the **Octopus Server**:

**Script: Notify VIP Contact**

```powershell
$projectName = $OctopusParameters["Octopus.Project.Name"]
$tenantName = $OctopusParameters["Octopus.Deployment.Tenant.Name"]
$contactEmail = $OctopusParameters["Tenant.ContactEmail"]
$environmentName = $OctopusParameters["Octopus.Environment.Name"]
if ($tenantName) {
    Write-Host "Email to $contactEmail - Hi $tenantName, just wanted to let you know we've upgraded $projectName in your $environmentName environment."
}
```
    *This script doesn't do anything, it just simulates sending an email to notify our VIP tenants of the new deployment.*
3. Modify the step to make sure it is only executed when deploying our project for VIP tenants.
    ![](/docs/images/5669428/5865655.png "width=500")

:::success
**Tenant filter design/preview**
Clicking the Design/Preview link will open a dialog to help you design your tenant filter. You can [learn more about designing complex tenant filters in our reference documentation](/docs/reference/tenant-tags.md).
:::

The resulting deployment process should look like this:

![](/docs/images/5669428/5865656.png "width=500")

### Step 4: Deploy the project to your VIP tenant {#Workingwithgroupsoftenantsusingtags-Step4:DeploytheprojecttoyourVIPtenant}

Now this new step in your deployment process will execute when deploying to VIP tenants, but not for any other tenants.

![](/docs/images/5669428/5865657.png "width=500")

### Step 5: Create and tag some more tenants to see the results {#Workingwithgroupsoftenantsusingtags-Step5:Createandtagsomemoretenantstoseetheresults}

To really see the benefit of tagging you could go and create some more tenants and tag them. The example shown below are taken from a fully built sample showing how tenant tags can help with your multi-tenant deployments.

![](/docs/images/5669428/5865698.png "width=500")

## Next steps {#Workingwithgroupsoftenantsusingtags-Nextsteps}

Learn about [designing a multi-tenant upgrade process](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md) and [designing a multi-tenant hosting model](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md) which all use tags as a fundamental building block.

---
title: Designing a multi-tenant hosting model
description: Design and implement both dedicated and shared multi-tenant hosting models.
position: 5
---

Previous step: [Working with groups of tenants using tags](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-groups-of-tenants-using-tags.md)

This page describes how to design and implement both **dedicated** and **shared** multi-tenant hosting models using [Environments](/docs/key-concepts/environments/index.md), [Deployment Targets](/docs/deployment-targets/index.md) and [Accounts](/docs/key-concepts/environments/accounts/index.md) and [Tenant Tags](/docs/key-concepts/tenants/tenant-tags.md).

:::hint
**Tenanted and un-tenanted deployments**
In this section we will focus on tenanted deployments, but un-tenanted deployments deserve some explanation with regards to hosting. Un-tenanted deployments provide a way for you to start introducing tenants into your existing Octopus configuration. An un-tenanted deployment is just like good old Octopus - a deployment to an environment **without** a tenant. Octopus decides which deployment targets to include in a deployment like this:

- **Tenanted deployments** will use **matching tenanted deployment targets**
- **Un-tenanted deployments** will only use **un-tenanted deployment targets**

We talk more about tenanted and un-tenanted deployments in [Deploying a simple multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).
:::

:::warning
**Mixing tenanted and un-tenanted deployments on the same machine**
In Octopus 3.4 you cannot mix tenanted and un-tenanted deployments on the same machine(s). This was a design decision we made based on feedback and testing during the Octopus 3.4 beta program - to be safe by default. We are planning to implement some features to enable mixing an matching both tenanted and un-tenanted deployments on the same machine, and you can get involved by following this [GitHub Issue](https://github.com/OctopusDeploy/Issues/issues/2722).

In the meantime you can work around this by creating a single dummy tenant for your un-tenanted project as described in that GitHub Issue.
:::

## Multi-tenant hosting {#Designingamulti-tenanthostingmodel-Multi-tenanthosting}

The hosting model you want to achieve will vary depending on your application, your customers and your sales model. Instead of trying to cover every scenario, we will cover some of the most common scenarios:

- **Dedicated hosting**: where you create new dedicated servers for each customer
- **Shared hosting**: where you create farms or pools of servers to host all of your customers achieving higher density

## How Octopus Deploy chooses deployment targets for a tenanted deployment {#Designingamulti-tenanthostingmodel-HowOctopusDeploychoosesdeploymenttargetsforatenanteddeployment}

When you deploy a project, you can deploy to one environment and a selection of tenants. Octopus creates one deployment for each environment/tenant combination, and calculates which deployment targets to include in each deployment using logic like this:

1. Find deployment targets in the target environment with the [roles](/docs/key-concepts/machine-roles.md) required by the deployment process
2. Filter those deployment targets, selecting only those matching the tenant

Each deployment will then proceed independently with the resulting set of deployment targets. We are going to leverage this behavior to implement dedicated and shared hosting in our sample.

## Scenario: Dedicated hosting {#Designingamulti-tenanthostingmodel-Scenario:Dedicatedhosting}

In this case we want to ensure the applications for some tenants are completely isolated from those of other tenants. You may want to do this to provide security or performance guarantees that would be problematic in a shared hosting model. To implement dedicated hosting you need to create the dedicated servers, and indicate which tenant will be hosted on those servers.

### Step 1: Configure the dedicated deployment targets {#Designingamulti-tenanthostingmodel-Step1:Configurethededicateddeploymenttargets}

Let's configure some deployment targets as dedicated hosts for the tenant we created earlier:

1. Create one or more deployment targets that will be used to host the applications for the tenant. *This could be any type of deployment target.*
2. Configure each deployment target as a dedicated host for the tenant
   ![](/docs/images/5669555/5865740.png "width=500")

### Step 2: Deploy! {#Designingamulti-tenanthostingmodel-Step2:Deploy!}

That's it! Now let's deploy the project for this tenant and see the results. You will see how Octopus includes these specific deployment targets in that tenant's deployments, creating an isolated hosting environment for that tenant.

![](/docs/images/5669555/5865741.png "width=500")

## Scenario: Shared hosting {#Designingamulti-tenanthostingmodel-Scenario:Sharedhosting}

In this case we are willing to host the applications of multiple tenants on the same machines to reduce hosting costs by increasing density. To implement shared hosting you need to create the shared server farm, and indicate which tenants will be hosted on that farm. *This is very similar to the dedicated hosting scenario, but instead of choosing a single tenant, we will use a tenant tag to indicate these servers will be hosting applications for multiple tenants.*

### Step 1: Create a "Hosting" tag set {#Designingamulti-tenanthostingmodel-Step1:Createa&quot;Hosting&quot;tagset}

Firstly let's create a tag set to identify which tenants should be hosted on which shared server farms:

1. Go to {{Library,Tenant Tag Sets}} and create a new tag set called **Hosting**
2. Add a tag called **Shared-Farm-1** and set the color to green which will help identify tenants on shared hosting more quickly
   ![](/docs/images/5669555/5865742.png "width=500")

### Step 2: Configure the shared server farm {#Designingamulti-tenanthostingmodel-Step2:Configurethesharedserverfarm}

Now let's configure some shared servers in a farm:

1. Create one or more deployment targets that will be used to host the applications for these tenants. *This could be any type of deployment target.*
2. Select the **Hosting/Shared-Farm-1** tag

![](/docs/images/5669555/5865743.png "width=500")

These deployment targets will now be included in deployments for any tenants matching this filter, that is any tenants tagged with **Hosting/Shared-Farm-1**.

### Step 3: Configure the tenants to deploy onto the shared server farm {#Designingamulti-tenanthostingmodel-Step3:Configurethetenantstodeployontothesharedserverfarm}

Now let's select some tenants that should be hosted on **Shared-Farm-1**:

1. Create some new tenants (or find existing ones) and tag them with **Hosting/Shared-Farm-1**
   **![](/docs/images/5669555/5865744.png "width=500")**

### Step 4: Deploy! {#Designingamulti-tenanthostingmodel-Step2:Deploy!.1}

That's it! Now let's deploy the project for one of these tenants and see the results. You will see how Octopus includes any matching deployment targets in that tenant's deployments, creating a shared hosting environment your tenants.

![](/docs/images/5669555/5865745.png "width=500")

:::success
**Accounts can also be restricted to tenants**
Imagine a scenario where you have tenant-specific [Accounts](/docs/key-concepts/environments/accounts/index.md) - you can similarly configure which tenants should be authorized to use particular accounts.
:::

## Next steps {#Designingamulti-tenanthostingmodel-Nextsteps}

We will [design and implement a multi-tenant upgrade process](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md).

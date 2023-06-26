---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Tenant tags
description: Tenant Tags help you to classify your tenants with custom tags so you can tailor your tenanted deployments accordingly.
navOrder: 40
---

In Octopus, tenant tags help you to classify your tenants using custom tags that meet your needs, and tailor tenanted deployments for your projects and environments. Tenant tags also make it easier to work with tenants as groups instead of individuals. Using tags you can apply meaningful metadata to tenants, to describe them using your own terminology, improve search and filtering, and tailor the deployment process to their needs.

## What can you do with tenant tags? {#what-can-you-do}

Octopus allows you to group similar tags together into tag sets. This enables you to more easily understand which tags fit together, what effect they should have on tenanted deployments, and design powerful tag-based queries using combinations of tags:

:::figure
![](/docs/tenants/images/tag-sets.png "width=500")
:::

With tenant tags you can:

- Classify your tenants using custom tags that match your situation.
- Find tenants more quickly by searching and filtering with tags.
- Group the project overview by tag set.
- Deploy to multiple tenants at the same time - read more [below](#deploying-to-multiple-tenants-tags).
- Customize the deployment process for tenants.
- Scope project variables to tags.
- Design a multi-tenant hosting model - read more in our [tenant infrastructure](/docs/tenants/tenant-infrastructure) section.
- Design a multi-tenant deployment process for SaaS applications, regions and more - for further details, see our [guides](/docs/tenants/guides/#guides).
- Control which releases can be deployed to tenants using [channels](/docs/releases/channels/) - read more in our [tenant lifecycle](/docs/tenants/tenant-lifecycles) section.

## Managing Tenant Tags {#managing-tenant-tags}

Go to **Library ➜ Tenant tag sets** to create, modify and reorder tag sets and tags.

:::figure
![](/docs/tenants/images/tenant-importance.png "width=500")
:::


### Design your tag sets carefully {#design-tagsets-carefully}

We suggest taking some time to design your tag sets based on how you will apply them to your projects and environments. Our recommendation is to make sure each of your **tag sets are orthogonal**, like different axes on a chart. This kind of design is important because of [how tags are combined in tag filters](#tag-based-filters).

Let's look at an Example tag set design :

- **Importance (VIP, Standard, Trial):** concerned with classifying tenants so they can be found easily.
- **Hosting Region (West US, East US 2):** concerned with how the tenant software is hosted - read more about this in our [tenant infrastructure](/docs/tenants/tenant-infrastructure) section.
- **Release ring (Alpha, Beta, Stable):** concerned with when the tenant's applications are upgraded in relationship to other tenants - read more about this in our [guide](/docs/tenants/guides/multi-tenant-region/deploying-to-release-ring).

This kind of tag set design will make it easier for each different class of Octopus user to understand which tags apply to their area, and the impact it will have on your tenanted deployments.

### Ordering tag sets and tags {#ordering-tagsets}

Order is important for tag sets, and tags within those tag sets. Octopus will sort tag sets and tags based on the order you define in the library. This allows you to tailor the Octopus user interface to your own situation.

This example of configuring a tenanted deployment target shows how the tenant filter field order is defined based on the order of the tag sets and tags in the library.

:::figure
![](/docs/tenants/images/tag-set-order.png "width=500")
:::

## Tag-based filters {#tag-based-filters}

Once you have defined some tag sets and tags you can start leveraging those tags to tailor your environments and deployments.

:::div{.hint}
**Combinational logic**
When filtering tenants, Octopus will combine tags within the same tag set using the **`OR`** operator, and combine tag sets using the **`AND`** operator.
:::

Let's take a look at an example:

:::figure
![](/docs/tenants/images/tag-based-filters.png "width=500")
:::

In this example Octopus will execute a query like the one shown below:

```sql
TenantsNamed("Capital Animal Hospital") UNION TenantsTagged(VIP AND (Alpha OR Beta))
```

When paired with a well-structured tag design, this logic will enable you to tailor your tenanted deployments in interesting and effective ways.

:::div{.hint}
**Tips for working with tenant filters**
- Only specify a tenant "by name" (explicitly) if you absolutely want that tenant included in the result, otherwise leave it blank
- A filter with tags in the same tag set will be more inclusive since they are combined using **`OR`**
- A filter with tags across different tag sets will become more reductive since they are combined using **`AND`**
  :::

## Referencing tenant tags {#referencing-tenant-tags}

If you want to use tenant tags to automate Octopus Deploy you should use the **Canonical Name** for the Tag which looks like this: `Tag Set Name/Tag Name`

Consider an example deploying a release to the tenants tagged with the **Alpha** tag in the **Release Ring** tag set.

:::figure
![](/docs/tenants/images/release-ring.png "width=500")
:::

```powershell
# Deploys My Project 1.0.1 to all tenants tagged as in the Alpha ring
./octo deploy-release --server=http://octopus.company.com --apiKey=API-1234567890123456 --project="My Project" --version="1.0.1" --tenantTag="Release ring/Alpha"
```

Some places you can use tags are:

- When deploying releases of your projects using one of the [build server integrations](/docs/octopus-rest-api/) or the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/deploy-release).
- Scoping a deployment target to one or more tenants when registering a new Tentacle - read more in our [tenant infrastructure](/docs/tenants/tenant-infrastructure) section.
- When automating Octopus via the [Octopus REST API](/docs/octopus-rest-api).

## Deploying to multiple tenants using tags {#deploying-to-multiple-tenants-tags}

You can create tenant tag sets specifically to help with deployments and rolling out upgrades. Quite often, you want to deploy targeted releases to your testers, and once testing is finished, you want to flight/prove that upgrade with a smaller group of tenants before rolling it out to the rest of your tenants. This is also useful when breaking down large amounts of tenants into smaller deployments. Here we outline the steps needed to design that kind of process using tenant tags.

### Step 1: Create a tag set called Upgrade ring {#deploy-step-1-create-tagset}

Firstly we create a tag set called **Upgrade ring** with tags allowing each tenant to choose how early in the development/test cycle they want to receive upgrades.

1. Create a new tenant tag set called **Upgrade ring** and add tags for **Tester**, **Early adopter**, and **Stable**.
1. Make sure to choose colors that highlight different tenants.

:::figure
![](/docs/tenants/images/multi-tenant-upgrade-ring.png "width=500")
:::

### Step 2: Configure a test tenant {#deploy-step-2-configure-test-tenant}

Either create a new tenant, or configure an existing tenant. This tenant will receive upgrades before any of the other configured tenants.

1. Tag your test tenant(s) with **Tester**.

### Step 3: Configure some early adopter tenants and stable tenants {#deploy-step-3-configure-other-tenants}

*Optionally*, configure some external tenants as opting into early or stable releases to see the effect.

1. Find or create some tenants and tag them as either **Stable** or **Early adopter**.

### Step 4: Deploy {#deploy-step-4-deployment}

Now it's time to deploy using tenant tags as a way to select multiple tenants easily. In this example, we will deploy version **1.0.1** to all of the tenants tagged with **Tester** who are connected to the the **Test** environment. You can use multiple tags and complex tag queries to achieve other interesting scenarios.

:::figure
![](/docs/tenants/images/multi-tenant-deploy-test.png "width=500")
:::

You can also use the Project Overview to deploy to groups of tenants by grouping the dashboard, selecting a release, and clicking the **Deploy to all** button.

:::figure
![](/docs/tenants/images/multi-tenant-deploy-all.png "width=500")
:::

## Learn more {#learn-more}

- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).

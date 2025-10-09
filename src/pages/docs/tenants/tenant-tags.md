---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-10-08
title: Tenant tags
icon: fa-solid fa-tags
description: Use tags to classify tenants and tailor your multi-tenant deployments.
navOrder: 40
---

This page covers how to use tags with tenants. For general information about tag sets, types, and scopes, see [Tag sets](/docs/tenants/tag-sets).

:::div{.hint}
Tag set types (SingleSelect and FreeText) require Octopus Deploy version **2025.4.3897** or later with the `extended-tag-sets` feature toggle enabled. Without this feature, all tag sets use MultiSelect type with predefined tags only.
:::

Tenant tags allow you to:

- Find tenants faster using tag filters.
- Group a project's deployments overview by tag set.
- Deploy to multiple tenants at the same time.
- Customize deployment processes for tenants.
- Scope project variables to tenant tags.
- Design a multi-tenant hosting model - read more in our [tenant infrastructure](/docs/tenants/tenant-infrastructure) section.
- Design a multi-tenant deployment process for SaaS applications, regions and more - for further details, see our [guides](/docs/tenants/guides/#guides).
- Control which releases can be deployed to tenants using [channels](/docs/releases/channels/) - read more in our [tenant lifecycle](/docs/tenants/tenant-lifecycles) section. 

## Tag-based filters {#tag-based-filters}

Once you have defined some tag sets and tags you can start leveraging those tags to tailor your environments and deployments.

:::div{.hint}
**Combinational logic**

When filtering tenants, Octopus will combine tags within the same tag set using the **`OR`** operator, and combine tag sets using the **`AND`** operator.
:::

Let's take a look at an example:

:::figure
![](/docs/img/tenants/images/tag-based-filters.png)
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

When automating deployments to tenants, you reference tags using their **canonical name**: `Tag Set Name/Tag Name`

Consider an example deploying a release to all tenants tagged with **Alpha** in the **Release Ring** tag set:

:::figure
![](/docs/img/tenants/images/release-ring.png)
:::

```powershell
# Deploys My Project 1.0.1 to all tenants tagged as in the Alpha ring
octopus release deploy --project "My Project" --version "1.0.1" --tenant-tag "Release ring/Alpha"
```

You can use tenant tags when:

- Deploying releases using [build server integrations](/docs/octopus-rest-api/) or the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/deploy-release).
- Scoping a deployment target to one or more tenants when registering a new Tentacle - read more in our [tenant infrastructure](/docs/tenants/tenant-infrastructure) section.
- Automating Octopus via the [Octopus REST API](/docs/octopus-rest-api).

For more information about canonical names and how to reference tags, see [Tag sets](/docs/tenants/tag-sets#referencing-tags).

## Deploying to multiple tenants using tags {#deploying-to-multiple-tenants-tags}

You can create tag sets specifically to help with deployments and rolling out upgrades. Often, you want to deploy targeted releases to your testers, and once they've finished testing, prove that upgrade with a smaller group of tenants before rolling it out to the rest of your tenants. This is also useful to split up a large number of tenants into smaller groups for deployment.

### Step 1: Create a tag set called Upgrade Ring {#deploy-step-1-create-tagset}

First, create a tag set called **Upgrade Ring** with tags that allow each tenant to choose how early in the development/test cycle they want to receive upgrades.

1. Go to **Tenant ➜ Tag Sets** and create a new tag set called **Upgrade Ring**.
2. Add tags for **Tester**, **Early Adopter**, and **Stable**.
3. Choose colors that highlight different tenants.

Learn more about [creating and managing tag sets](/docs/tenants/tag-sets#managing-tag-sets).

:::figure
![](/docs/img/tenants/images/multi-tenant-upgrade-ring.png)
:::

### Step 2: Configure a test tenant {#deploy-step-2-configure-test-tenant}

Either create a new tenant or configure an existing tenant. Tag your test tenant(s) with **Tester** - this tenant will receive upgrades before any other configured tenants.

### Step 3: Configure some early adopter tenants and stable tenants {#deploy-step-3-configure-other-tenants}

*Optionally*, configure some external tenants as opting into early or stable releases to see the effect. Find or create some tenants and tag them as either **Stable** or **Early Adopter**.

### Step 4: Deploy {#deploy-step-4-deployment}

Now it's time to deploy using tenant tags as a way to select multiple tenants easily. In this example, we will deploy version **1.0.1** to all of the tenants tagged with **Tester** who are connected to the **Test** environment. You can use multiple tags and complex tag queries to achieve other interesting scenarios.

:::figure
![](/docs/img/tenants/images/multi-tenant-deploy-test.png)
:::

You can also use the project overview to deploy to groups of tenants by grouping the dashboard, selecting a release, and clicking the **Deploy all...** button.

:::figure
![](/docs/img/tenants/images/multi-tenant-deploy-all.png)
:::

## Learn more

- [Tag sets](/docs/tenants/tag-sets) - General information about tag sets, types, and scopes
- [Environment tags](/docs/infrastructure/environments#environment-tags) - Using tags with environments
- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns)

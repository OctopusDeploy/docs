---
layout: src/layouts/Default.astro
pubDate: 2025-10-08
title: Tag sets
icon: fa-solid fa-tags
description: Tag sets are a categorizing system that let you add custom metadata to resources in Octopus Deploy.
navOrder: 35
---

Tag sets provide the structure for grouping similar tags together, resulting in more orderly metadata. Currently, tags can be applied to tenants and environments, with support for additional resource types planned for the future.

:::figure
![An example set of tenant tags](/docs/img/tenants/images/tag-sets.png)
:::

:::div{.warning}
From Octopus Cloud version **2025.4.3897** we have extended the functionality of tag sets to include the type and scope of a tag set.
:::

## Tag set types {#tag-set-types}

There are three types of tag sets that can be created:

- **MultiSelect:** Allows selecting multiple predefined tags from the tag set. This is the standard behavior and works for most scenarios.
- **SingleSelect:** Allows selecting only one predefined tag from the tag set. Useful when you need to ensure only one option is chosen, such as a cloud provider or deployment tier.
- **FreeText:** Allows entering custom text values without requiring predefined tags. The tag set name must match exactly, but the tag value can be any arbitrary text. Useful for dynamic values like region identifiers, customer IDs, or version numbers. When using FreeText, only one value per tag set is allowed.

## Tag set scopes {#tag-set-scopes}

Tag sets can be scoped to specific resource types:

- **Tenant**
- **Environment**
- **Project**

A tag set can be scoped to multiple resource types (Tenant, Environment, and/or Project), allowing you to use the same tag set across different resources.

## Managing tag sets {#managing-tag-sets}

Go to **Deploy ➜ Tag Sets** to create, modify and reorder tag sets and tags.

:::figure
![The tenant tag set edit screen](/docs/img/tenants/images/tenant-importance.png)
:::

### Design your tag sets carefully {#design-tag-sets-carefully}

We suggest taking some time to design your tag sets based on how you will apply them to your resources. Our recommendation is to make sure each of your tag sets are orthogonal, like different axes on a chart. This kind of design is important because of [how tags are combined when filtering](/docs/tenants/tenant-tags#tag-based-filters).

Let's look at example tag sets:

- **Importance (VIP, Standard, Trial):** concerned with classifying resources so they can be found easily.
- **Hosting Region (West US, East US 2):** concerned with where resources are hosted or deployed.
- **Release Ring (Alpha, Beta, Stable):** concerned with when updates are applied.

Grouping tag sets makes it easier for each different class of Octopus user to understand which tags apply to their area, and the impact it will have on their deployments.

### Ordering tag sets and tags {#ordering-tag-sets}

Order is important for tag sets, and tags within those tag sets. Octopus will sort tag sets and tags based on the order you define in the library. This allows you to tailor the Octopus user interface to your own situation.

:::figure
![Ordering of tenant tags shown in the deployment target restrictions section](/docs/img/tenants/images/tag-set-order.png)
:::

### Removing tags

If tags are in use by resources, included in project/runbook release [variable snapshots](/docs/releases#variable-snapshot) (via project/variable sets), or captured in published runbooks, you will not be able to delete the relevant tag(s) until these associations are removed.

For projects using Config as Code, there are fewer guardrails in place. It's up to you to take care to avoid deleting any tags required by your deployments. See our [core design decisions](/docs/projects/version-control/unsupported-config-as-code-scenarios#core-design-decision) for more information.

## Referencing tags {#referencing-tags}

Tags are referenced using their **canonical name** which looks like this: `Tag Set Name/Tag Name`

For example:

- `Release Ring/Alpha` - References the predefined "Alpha" tag in the "Release Ring" tag set
- `Importance/VIP` - References the predefined "VIP" tag in the "Importance" tag set
- `Region/us-west-2` - For FreeText tag sets, the tag set name "Region" must match exactly, but "us-west-2" can be any arbitrary value

You can use canonical names when:

- Deploying releases using [build server integrations](/docs/octopus-rest-api/) or the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/).
- Scoping variables to tags.
- Automating Octopus via the [Octopus REST API](/docs/octopus-rest-api).

## Using tags with different resources

- **[Tenant tags](/docs/tenants/tenant-tags):** Learn how to use tags to classify tenants, deploy to multiple tenants, and design multi-tenant deployment processes.
- **[Environment tags](/docs/infrastructure/environments#environment-tags):** Learn how to use tags to classify environments by attributes like cloud provider, region, or tier.
- **[Project tags](/docs/projects/setting-up-projects#project-tags):** Learn how to use tags to classify and organize projects.

## Learn more

- [Create a tag set via the REST API](/docs/octopus-rest-api/examples/tagsets/create-tagset)
- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns)

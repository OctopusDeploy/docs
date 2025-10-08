---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-10-08
title: Tag sets
icon: fa-solid fa-tags
description: Tag sets are a classification system that lets you add custom metadata to resources in Octopus Deploy.
navOrder: 35
---

Tag sets are a classification system that lets you add custom metadata to resources in Octopus Deploy. Currently, tags can be applied to tenants and environments, with support for additional resource types planned for the future.

:::figure
![](/docs/img/tenants/images/tag-sets.png)
:::

## Tag set types {#tag-set-types}

:::div{.hint}
**Feature availability**

Tag set types (SingleSelect and FreeText) and environment scoping require the `extended-tag-sets` feature toggle to be enabled. Without this feature enabled, all tag sets default to MultiSelect type and Tenant scope.
:::

Tag sets can have different types that control how tags can be selected:

- **MultiSelect:** Allows selecting multiple predefined tags from the tag set. This is the standard behavior and works for most scenarios.
- **SingleSelect:** Allows selecting only one predefined tag from the tag set. Useful when you need to ensure only one option is chosen, such as a cloud provider or deployment tier.
- **FreeText:** Allows entering custom text values without requiring predefined tags. Useful for dynamic values like region identifiers, customer IDs, or version numbers. When using FreeText, only one value per tag set is allowed.

## Tag set scopes {#tag-set-scopes}

Tag sets can be scoped to specific resource types:

- **Tenant:** The tag set can be used to tag tenants.
- **Environment:** The tag set can be used to tag environments.

A tag set can be scoped to both Tenants and Environments if needed, allowing you to use the same tag set across both resource types.

## Managing tag sets {#managing-tag-sets}

Go to **Tenant ➜ Tag Sets** to create, modify and reorder tag sets and tags.

:::figure
![](/docs/img/tenants/images/tenant-importance.png)
:::

### Design your tag sets carefully {#design-tag-sets-carefully}

We suggest taking some time to design your tag sets based on how you will apply them to your resources. Our recommendation is to make sure each of your tag sets are orthogonal, like different axes on a chart. This kind of design is important because of [how tags are combined when filtering](/docs/tenants/tenant-tags#tag-based-filters).

Let's look at an example tag set design:

- **Importance (VIP, Standard, Trial):** concerned with classifying resources so they can be found easily.
- **Hosting Region (West US, East US 2):** concerned with where resources are hosted or deployed.
- **Release Ring (Alpha, Beta, Stable):** concerned with when updates are applied.

This kind of tag set design will make it easier for each different class of Octopus user to understand which tags apply to their area, and the impact it will have on your deployments.

### Ordering tag sets and tags {#ordering-tag-sets}

Order is important for tag sets, and tags within those tag sets. Octopus will sort tag sets and tags based on the order you define in the library. This allows you to tailor the Octopus user interface to your own situation.

:::figure
![](/docs/img/tenants/images/tag-set-order.png)
:::

### Removing tags

If tags are in use by resources, included in project/runbook release [variable snapshots](/docs/releases#variable-snapshot) (via project/variable sets), or captured in published runbooks, you will not be able to delete the relevant tag(s) until these associations are removed.

For projects using Config as Code, there are fewer guardrails in place. It's up to you to take care to avoid deleting any tags required by your deployments. See our [core design decisions](/docs/projects/version-control/unsupported-config-as-code-scenarios#core-design-decision) for more information.

## Referencing tags {#referencing-tags}

Tags are referenced using their **canonical name** which looks like this: `Tag Set Name/Tag Name`

For example:
- `Release Ring/Alpha`
- `Importance/VIP`
- `Region/us-west-2` (for FreeText tag sets)

You can use canonical names when:

- Deploying releases using [build server integrations](/docs/octopus-rest-api/) or the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/).
- Scoping variables to tags.
- Automating Octopus via the [Octopus REST API](/docs/octopus-rest-api).

## Using tags with different resources

- **[Tenant tags](/docs/tenants/tenant-tags):** Learn how to use tags to classify tenants, deploy to multiple tenants, and design multi-tenant deployment processes.
- **[Environment tags](/docs/infrastructure/environments#environment-tags):** Learn how to use tags to classify environments by attributes like cloud provider, region, or tier.

## Learn more

- [Create a tag set via the REST API](/docs/octopus-rest-api/examples/tagsets/create-tagset)
- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns)

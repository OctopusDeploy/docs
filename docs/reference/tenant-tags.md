---
title: Tenant Tags
description: Tenant Tags help you to classify your tenants with custom tags so you can tailor your tenanted deployments accordingly.
---

In Octopus, tenant tags help you to classify your tenants using custom tags that meet your needs, and tailor tenanted deployments for your projects and environments. Tenant tags also make it easier to work with tenants as groups instead of individuals. Using tags you can apply meaningful metadata to tenants, to describe them using your own terminology, improve search and filtering, and tailor the deployment process to their needs.

Octopus allows you to group similar tags together into tag sets. This enables you to more easily understand which tags fit together, what effect they should have on tenanted deployments, and design powerful tag-based queries using combinations of tags.

:::success
Have you read [our guide](/docs/deploying-applications/multi-tenant-deployments/multi-tenant-deployment-guide/index.md) on multi-tenant deployments yet? There is a section dedicated to [working with groups of tenants using tags](/docs/deploying-applications/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-groups-of-tenants-using-tags.md).
:::

## What can you do with tenant tags? {#TenantTags-Whatcanyoudowithtenanttags?}

![](tag-sets.png "width=500")

With tenant tags you can:

- Classify your tenants using custom tags that match your situation
- Find tenants more quickly by searching and filtering with tags
- Group the project overview by tag set
- Deploy to multiple tenants at the same time - read more in our [guide](/docs/deploying-applications/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md)
- Customize the deployment process for tenants
- Scope project variables to tags
- Design a multi-tenant hosting model - read more in our [guide](/docs/deploying-applications/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md)
- Design a multi-tenant upgrade process - read more in our [guide](/docs/deploying-applications/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md)
- Control which releases can be deployed to tenants using [channels](/docschannels.md) - read more in our [guide](/docs/deploying-applications/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md)

## Managing tenant tags {#TenantTags-Managingtenanttags}

Go to {{Library,Tenant tag sets}} to create, modify and reorder tag sets and tags.

![](tenant-importance.png "width=500")


### Design your tag sets carefully
We suggest taking some time to design your tag sets based on how you will apply them to your projects and environments. Our recommendation is to make sure each of your **tag sets are orthogonal**, like different axes on a chart. This kind of design is important because of [how tags are combined in tag filters](#TenantTags-Tag-basedfilters).

Example tag set design (based on the sample provided in our guide):

- **Importance (VIP, Standard, Trial):** concerned with classifying tenants so they can be found easily
- **Hosting (Shared-Farm-1, Dedicated):** concerned with how the tenant software is hosted - read more about this in our [guide](/docs/deploying-applications/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md)
- **Upgrade ring (Early adopter, Stable, Pinned):** concerned with when the tenant's applications are upgraded in relationship to other tenants - read more about this in our [guide](/docs/deploying-applications/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md)

This kind of tag set design will make it easier for each different class of Octopus user to understand which tags apply to their area, and the impact it will have on your tenanted deployments.

### Ordering tag sets and tags
Order is important for tag sets, and tags within those tag sets. Octopus will sort tag sets and tags based on the order you define in the library. This allows you to tailor the Octopus user interface to your own situation.

This example of configuring a tenanted deployment target shows how the tenant filter field order is defined based on the order of the tag sets and tags in the library.

![](/docs/images/5670003/5865645.png "width=500")

## Tag-based filters {#TenantTags-Tag-basedfilters}

Once you have defined some tag sets and tags you can start leveraging those tags to tailor your environments and deployments.

:::hint
**Combinational logic**
When filtering tenants, Octopus will combine tags within the same tag set using the **`OR`** operator, and combine tag sets using the **`AND`** operator.
:::

Let's take a look at an example (click the image to zoom):

![](/docs/images/5670003/5865646.png "width=300")

In this example Octopus will execute a query like the one shown below:

```sql
TenantsNamed("Alvin Warren") UNION TenantsTagged(VIP AND (Early Adopter OR Stable))
```

When paired with a well-structured tag design, this logic will enable you to tailor your tenanted deployments in interesting and effective ways.

:::hint
**Tips for working with tenant filters**
- Only specify a tenant "by name" (explicitly) if you absolutely want that tenant included in the result, otherwise leave it blank
- A filter with tags in the same tag set will be more inclusive since they are combined using **`OR`**
- A filter with tags across different tag sets will become more reductive since they are combined using **`AND`**
  :::

## Referencing tenant tags {#TenantTags-Referencingtenanttags}

If you want to use tenant tags to automate Octopus Deploy you should use the **Canonical Name** for the Tag which looks like this: `Tag Set Name/Tag Name`

Consider an example deploying a release to the tenants tagged with the **Early adopter** tag in the **Upgrade ring** tag set.

![](upgrade-ring.png)

```powershell
# Deploys My Project 1.0.1 to all tenants tagged as early adopters
.\octo.exe deploy-release --server=http://octopus.company.com --apiKey=API-1234567890123456 --project="My Project" --version="1.0.1" --tenantTag="Upgrade ring/Early adopter"
```

Some places you can use tags are:

- When deploying releases of your projects using one of the [build server integrations](/docs/api-and-integration/index.md) or [octo.exe](/docs/api-and-integration/octo.exe-command-line/deploying-releases.md) - [read more in our guide](/docs/deploying-applications/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md)
- Scoping a deployment target to one or more tenants when registering a new Tentacle - [read more in our guide](/docs/deploying-applications/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md)
- When automating Octopus via the [Octopus REST API](/docs/api-and-integration/octopus-rest-api.md)

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Tenant types
description: There are several different types of tenants that can be supported with Octopus Deploy.
navOrder: 10
---

Tenants in Octopus can represent multiple use cases:

- Software as a Service (SaaS)
- Geographical regions or datacenters
- Developers, testers, or Teams
- Feature branches

This section covers some of the common tenancy types you can model with Octopus.

## Software as a Service (SaaS) {#saas}

Software as a Service (SaaS) is perhaps the most common implementation of multi-tenancy with Octopus Deploy.  The SaaS model is where the same software is deployed to multiple customers (tenants).  The deployment process can include items such as custom branding per tenant or scoping specific steps to tenant tags so that modules can be deployed to tenants that have purchased them.

:::figure
![](/docs/tenants/images/saas-tenants.png "width=500")
:::

Tenants using the SaaS model typically fall into three distinct categories:

- Code based
- Database based
- Isolated

### Code-based multi-tenancy {#saas-code-based}

Code-based tenancy is where all tenants share the same infrastructure and it's up to the code to determine what a tenant sees and has access to.  Code based multi-tenancy can be the easiest option to deploy and maintain, but there are tradeoffs. There is a risk for cross tenant contamination. A missed "where" clause makes for a terrible day. You also cannot deploy different versions of the application to different tenants.

### Database multi-tenancy {#saas-database}

Database based tenancy is similar to Code based, however, each tenant has their own database.  Deploying the application is easy, but deploying the database changes can be harder than the first approach. Database changes need to be deployed to all databases prior an application update. Having a large number of databases will create a bottleneck in the deployment.

### Isolated multi-tenancy {#saas-isolated}

Isolated is where each tenant has their own, dedicated infrastructure.  This removes the risk of cross tenant data contamination, but it complicates deployments. The deployment process itself may not change, but the application now has to be deployed per tenant. Each deployment has to configure the application instance for that tenant. The complication to the deployment process offers flexibility and scalability to the application and its deployments. Tenants can now be upgraded independently and be hosted on hardware that fits their needs.

Learn more about how to to configure multi-tenancy for a SaaS application in Octopus with our [multi-tenant SaaS guide](/docs/tenants/guides/multi-tenant-saas-application).

## Geographical regions or datacenters {#regions}

Another pattern for multi-tenancy is to treat geographic regions of the same organization as tenants.  Using this model, something like an e-commerce application can test out new or beta features in a specific region before releasing them out to the rest of the organization.  Scheduling deployments during a maintenance window is another way this pattern can be used as each region may have different hours when they are least busy.

:::figure
![](/docs/tenants/images/region-tenants.png "width=500")
:::

Learn more about how to to configure multi-tenancy for regions in Octopus with our [multi-tenant regions guide](/docs/tenants/guides/multi-tenant-region).

## Teams {#teams}

Concurrent application development is another multi-tenant use-case.  Using tenants for teams allows an Octopus Administrator to re-use the same deployment process as well as Environments giving each team the autonomy to deploy.  Deployment targets can be assigned tenant tags or even be dedicated to specific tenants so that each team can deploy without affecting the other.

:::figure
![](/docs/tenants/images/team-tenants.png "width=500")
:::

Learn more about how to to configure multi-tenancy for teams in Octopus with our [multi-tenant teams guide](/docs/tenants/guides/multi-tenant-teams).

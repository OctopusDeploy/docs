---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-04-29
title: Tenants
navTitle: Overview
navSection: Tenants
description: Tenants allow you to easily create customer specific deployment pipelines without duplicating project configuration.
navOrder: 60
hideInThisSection: true
---

Tenants in Octopus help you deploy software to many production instances, targets, or customers without duplicating effort. This includes:

- Delivering [Software as a Service (SaaS)](https://octopus.com/use-case/tenanted-deployments/saas/) applications where each customer has its own resources
- Deploying to [physical locations](https://octopus.com/use-case/tenanted-deployments/physical-locations/) like stores, hospitals, or data centers
- Dealing with multiple cloud regions

Although you can model these scenarios using multiple projects, or multiple environments, this can quickly become overwhelming. These models also don’t scale well as there is a lot of duplication.

[Tenants](https://octopus.com/features/tenants) let you easily create customer or location-specific deployment pipelines without duplicating project configuration. You can manage separate instances of your application in multiple environments – all from a single Octopus project. This allows you to define one process and easily deploy to any number of tenants. 

:::figure
![](/docs/tenants/images/octopus-tenants-deployments.png)
:::

Tenants let you:

- Deploy multiple instances of your project to the same [environment](/docs/infrastructure/environments).
- Manage configuration settings unique to each tenant.
- Promote releases using safe, [tenant-aware lifecycles](/docs/tenants/tenant-lifecycles).
- Use [tenant tags](/docs/tenants/tenant-tags) to tailor the deployment process and manage large groups of tenants.
- Deploy to shared or dedicated [infrastructure](/docs/tenants/tenant-infrastructure) per tenant.
- Limit access to tenants by [scoping team roles](/docs/tenants/tenant-roles-and-security) to tenants.
- Create release rings to easily deploy to alpha and beta tenants.
- Build simple [tenanted deployment](https://octopus.com/use-case/tenanted-deployments) processes that can scale as you add more tenants.

## When to use tenants {#when-to-use-tenants}
Tenants simplify complex deployments if you're deploying your application more than once in an environment.

Consider using tenants if:

- You need to deploy different versions of your application to the same environment.
- You're creating multiple environments of the same type. This could be multiple test environments for different testers, or multiple production environments for different customers.

You don't need tenants in every deployment scenario. If you don't deploy multiple instances of your software, and don't have unique needs like features, branding, or compliance, you may not need tenanted deployments. 

Check out our [multi-tenancy guides](https://octopus.com/docs/tenants/guides) for more detail on how to use tenanted deployments in Octopus for common scenarios.

## Types of tenants {#types-of-tenants}
While it’s common to use tenants to represent the customers of your application, there are many more ways you can use tenants. 

Tenants can also represent:

- Geographical regions or data centers
- Developers, testers, or teams
- Feature branches

Learn more about [tenant types](https://octopus.com/docs/tenants/tenant-types).

## Create your first tenant {#create-your-first-tenant}

It’s simple to configure a new or existing Octopus project to use the Tenants feature:
1. [Create a tenant](/docs/tenants/tenant-creation)
2. [Enable tenanted deployments](/docs/tenants/tenant-creation/tenanted-deployments)
3. [Connect a tenant to a project](/docs/tenants/tenant-creation/connecting-projects)

## Tenant variables {#tenant-variables}
You often want to define different variable values for each tenant, like database connection settings or a tenant-specific URL. If you use an untenanted project, you’ll have previously defined these values in the project itself. But with a tenanted project, you can set these values directly on the tenant for any connected projects.

### Tenant-provided variables are not snapshotted 
When you [create a release](/docs/octopus-rest-api/octopus-cli/create-release/) in Octopus Deploy, we take a snapshot of the deployment process and the current state of the [project variables](https://octopus.com/docs/projects/variables). However, we do not take a snapshot of tenant variables. This lets you add new tenants at any time and deploy to them without creating a new release. This means any changes you make to tenant variables take immediate effect.

Learn more about [tenant variables](/docs/tenants/tenant-variables) in our documentation.

## Tenant tags {#tenant-tags}
Tenant tags help you to classify your tenants using custom tags that meet your needs, and tailor tenanted deployments for your projects and environments. Learn more about [tenant tags](/docs/tenants/tenant-tags) in our documentation.

## Troubleshooting tenanted deployments
If you’re having any issues with tenants, we have useful answers to common questions about tenanted deployments in Octopus:

- [Multi-tenant deployments FAQ](/docs/tenants/tenant-deployment-faq)
- [Troubleshooting multi-tenant deployments](/docs/tenants/troubleshooting-multi-tenant-deployments)

If you still have questions, [we’re always here to help](/support).
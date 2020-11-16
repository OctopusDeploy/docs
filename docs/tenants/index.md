---
title: Tenants
description: Releases allow you to capture everything required to deploy a project in a repeatable and reliable manner.
position: 59
---



## Introducing multi-tenant deployments in Octopus {#Multi-tenantdeployments-Introducingmulti-tenantdeploymentsinOctopus}

With tenants you can:

1. Deploy multiple instances of your project into the same [Environment](/docs/infrastructure/environments/index.md);
  - Tenant-per-customer
  - Tenant-per-tester
  - Tenant-per-feature/tenant-per-branch
  - Tenant-per-geographical-region
  - Tenant-per-datacenter
2. Easily manage unique configuration settings using variables defined on the tenant.
3. Promote releases to your tenants using safe customer-aware lifecycles, potentially through multiple environments:
  - Tenant-specific UAT and Production environments.
4. Tailor the deployment process of your projects per-tenant as necessary.
5. Implement dedicated or shared hosting models for your tenants.
6. Employ tenant-aware security for managing tenants and deploying projects, including 3rd-party self-service sign in.
7. Implement early access or pre-release test programs incorporating 1st-party or 3rd-party testers.
8. Easily scale to large numbers of tenants using tags to manage tenants as groups instead of individuals.
9. Easily implement simple multi-tenant deployment scenarios, and scale to support complex scenarios as your needs require.

## Why should I care about multi-tenant deployments in Octopus Deploy? {#Multi-tenantdeployments-WhyshouldIcareaboutmulti-tenantdeploymentsinOctopusDeploy}

> **Have you ever wanted to have multiple instances of your project deployed to each environment? You should consider multi-tenant deployments in Octopus Deploy.**

Tenants in Octopus Deploy allow you to deploy your projects into multiple isolated containers inside your environments. It's kind of like slicing up your environment into multiple pieces.

![](images/multi-tenant-deployment.png "width=500")

The multi-tenant features in Octopus Deploy will simplify your deployments in all of these scenarios:

- You want multiple isolated deployments in your Test/QA/UAT environment.
- You want to provide each tester with an isolated test deployment so they can work on test data, and choose when to upgrade.
- You want to provide isolated, time-limited, deployments for work on feature branches.
- You want to manage deployments to individual targets across environments, like managing a fleet of embedded devices, or a fleet of laptops/workstations.
- You deploy your application to multiple geographic regions - this way you can avoid creating multiple environments instead modeling each region as a tenant in the same environment - [example](/docs/deployment-patterns/multi-region-deployment-pattern.md).
- You deploy unique instances of your application for each end-customer - keep reading!

### You want to deploy a multi-tenant application {#Multi-tenantdeployments-Youwanttodeployamulti-tenantapplication}

We built the multi-tenant features in Octopus Deploy for this kind of scenario:

- You want to deploy your project(s) to another customer.
- You want to turn your project(s) into a SaaS application by deploying multiple instances of your project(s) to other customers.

Consider the following example:

> NameBadge makes HR software for large corporate customers. They provide the software as a SaaS offering to their customers, and host the web site and associated services for them. Due to the application architecture, for each customer, they deploy:
>
> - A different SQL database
> - A copy of an ASP.NET website
> - A copy of a Windows Service

The key issue in this scenario is that the same components need to be deployed multiple times, one for each end-customer, with different configuration settings for each customer, possibly targeting multiple environments.

:::success
You don't need Octopus Deploy to implement a multi-tenant SaaS application: you can also architect your application so you can deploy it once and serve multiple customers. We have built multi-tenant deployments into Octopus for those situations where you want to deploy your application once for each end-customer.
:::

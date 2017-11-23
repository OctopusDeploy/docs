---
title: Multi-tenant deployments
description: How to use Octopus to manage deployments of your applications to multiple end-customers.
version: 3.4
position: 2
---

This page describes how to use Octopus to manage deployments of your applications to multiple end-customers.

## Introducing multi-tenant deployments in Octopus {#Multi-tenantdeployments-Introducingmulti-tenantdeploymentsinOctopus}

Starting with Octopus 3.4 you can manage tenants as a first-class citizen enabling you to:

1. Deploy multiple instances of your project into the same [Environment](/docs/infrastructure/environments/index.md);
   a. tenant-per-customer
   a. tenant-per-tester
   a. tenant-per-feature/tenant-per-branch
   a. tenant-per-geographical-region
   a. tenant-per-datacenter
2. Easily manage unique configuration settings using variables defined on the tenant;
3. Promote releases to your tenants using safe customer-aware lifecycles, potentially through multiple environments;
   a. tenant-specific UAT and Production environments
4. Tailor the deployment process of your projects per-tenant as necessary;
5. Implement dedicated or shared hosting models for your tenants;
6. Employ tenant-aware security for managing tenants and deploying projects, including 3rd-party self-service sign in;
7. Implement early access or pre-release test programs incorporating 1st-party or 3rd-party testers;
8. Easily scale to large numbers of tenants using tags to manage tenants as groups instead of individuals; and
9. Easily implement simple multi-tenant deployment scenarios, and scale to support complex scenarios as your needs require.

## Why should I care about multi-tenant deployments in Octopus Deploy? {#Multi-tenantdeployments-WhyshouldIcareaboutmulti-tenantdeploymentsinOctopusDeploy?}

> **Have you ever wanted to have multiple instances of your project deployed to each environment? You should consider multi-tenant deployments in Octopus Deploy.**

Tenants in Octopus Deploy allow you to deploy your projects into multiple isolated containers inside your environments. It's kind of like slicing up your environment into multiple pieces.

![](/docs/images/3048184/5866225.png "width=500")

The multi-tenant features in Octopus Deploy will simplify your deployments in all of these scenarios:

- you want multiple isolated deployments in your Test/QA/UAT environment
- you want to provide each tester with an isolated test deployment so they can work on test data, and choose when to upgrade
- you want to provide isolated, time-limited, deployments for work on feature branches
- you want to manage deployments to individual targets across environments, like managing a fleet of embedded devices, or a fleet of laptops/workstations
- you deploy your application to multiple geographic regions - this way you can avoid creating multiple environments instead modeling each region as a tenant in the same environment - [example](/docs/patterns/multi-region-deployment-pattern.md)
- you deploy unique instances of your application for each end-customer - keep reading!

### You want to deploy a multi-tenant application {#Multi-tenantdeployments-Youwanttodeployamulti-tenantapplication}

We built the multi-tenant features in Octopus Deploy for this kind of scenario:

- you want to deploy your project(s) to another customer
- you want to turn your project(s) into a SaaS application by deploying multiple instances of your project(s) to other customers

Consider the following example:

> NameBadge makes HR software for large corporate customers. They provide the software as a SaaS offering to their customers, and host the web site and associated services for them. Due to the application architecture, for each customer, they deploy:
>
> - A different SQL database
> - A copy of an ASP.NET website
> - A copy of a Windows Service

The key issue in this scenario is that the same components need to be deployed multiple times, one for each end-customer, with different configuration settings for each customer, possibly targeting multiple environments.

:::success
You don't need Octopus Deploy to implement a multi-tenant SaaS application: you can also architect your application so you can deploy it once and serve multiple customers. We have built multi-tenant deployments into Octopus for those situations where you want to deploy your application once for each end-customer. See the section below about [building multi-tenant applications](/docs/guides/multi-tenant-deployments/index.md) and [considering architectural changes](/docs/guides/multi-tenant-deployments/index.md).
:::

## Building multi-tenant applications {#Multi-tenantdeployments-Buildingmulti-tenantapplications}

:::success
**Podcast**
Octopus founder and CEO, [Paul Stovell](https://twitter.com/paulstovell), recently recorded an episode of [.NET Rocks](http://dotnetrocks.com/) talking about [Building Multi-Tenant Applications](https://www.dotnetrocks.com/?show=1332). It's a great listen to get a better understanding of why you would want to build a multi-tenant application, and the considerations that go into their design and deployment.
:::

How should I build my application to support multiple tenants or end-customers? Unfortunately the answer is: it depends. There are so many issues to consider when designing an application to handle multiple tenants or end-customers:

- **security, privacy and data integrity** - how do you ensure data from one tenant is protected from other tenants?
- **execution isolation** - perhaps your application launches other processes, how do you protect other tenants on the same host?
- **performance** - how do you measure which tenants are consuming the most resources, and ensure other tenants are not adversely affected by noisy-neighbours?
- **density and economy** - how do you host all of your tenants in a cost-effective way?

For many of these considerations, deploying multiple instances of your application make a lot of sense, and might be the best way to design your multi-tenant application. The podcast we mentioned above explores these issues in depth.

### High density SaaS applications {#Multi-tenantdeployments-HighdensitySaaSapplicationsarchitectural-changes}

When much larger numbers of customers are concerned it may be wise to consider making architectural changes to the application.

For example, if deployment consists of many copies of the exact same website, just with a few configuration differences per customer, perhaps store those configuration settings in the database, and use the host header field (`HttpContext.Request.Url.Host` in ASP.NET) to determine who the current customer is and respond accordingly. Not only will this make deployment simpler; it will most likely result in an easier to manage application, and reduce overall resource utilization resulting in higher density and profitability.

## Deciding whether multi-tenant deployments in Octopus Deploy suits your scenario

We have worked hard to design multi-tenant deployments in Octopus Deploy to work with a wide variety of scenarios. That being said there may be some limitations and problems which may hamper your adoption. In order to decide if you should adopt multi-tenant deployments for your scenario we recommend:

1. Read through the [multi-tenant deployment guide](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/index.md)
2. Investigate if there are any current [limitations or problems](https://github.com/OctopusDeploy/Issues/issues?q=is%3Aopen+is%3Aissue+label%3Afeature%2Ftenants) which will impact your specific scenario.
3. Get in touch with our [support team](https://octopus.com/support) who can help you understand if multi-tenant deployments are right for you, and how to best model your deployments using Octopus Deploy!

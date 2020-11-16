---
title: Multi-tenant deployment pattern
description: How to manage application deployments to multiple end-customers with Octopus Deploy.
position: 10
---

This section describes how to manage application deployments to multiple end-customers with Octopus Deploy.

## Types of multi-tenancy

Many Octopus Deploy users deploy SaaS software to many end-customers. Those end-customers should not be aware of each other, impact each other, or see the others' data. One way to satisfy that requirement is to make the applications multi-tenanted. There are three common ways to make an application multi-tenant.

### Code based multi-tenancy

The first approach is code based multi-tenancy. In this approach, all tenants share the application and database instances.

Each user is assigned to a tenant, usually their parent company. Every database table has a column that identifies the tenant, such as a "CustomerId" column. Every database query has "where CustomerId=[LoggedInCustomerId]" filter. Users are shown only the information related to their tenant.

Code based multi-tenancy can be the easiest option to deploy and maintain, but there are tradeoffs. There is a risk for cross tenant contamination. A missed "where" clause makes for a terrible day. You also cannot deploy different versions of the application to different tenants.

### Database based multi-tenancy

The second approach is a slight variation on the first approach. The difference is that each tenant gets a separate database.

A connection string is attached to each user session. The application uses the connection string attached to the session when making database queries.

Database queries are more straightforward in this approach. There is no need to add an ID to every query. There is still a risk of cross tenant contamination because every tenant is still using the same application instance.

Deploying the application is easy, but deploying the database changes can be harder than the first approach. Database changes need to be deployed to all databases prior an application update. Having a large number of databases will create a bottleneck in the deployment.

### Isolated multi-tenancy

The third approach is totally isolated application and databases per tenant. Each tenant gets their own web and application servers and a separate database.

The application logic is simpler compared to the first two approaches. There is no need to store an ID or separate connection string per user. Each tenant will have their own application instance that connects to their isolated database.

This removes the risk of cross tenant data contamination, but it complicates deployments. The deployment process itself may not change, but the application now has to be deployed per tenant. Each deployment has to configure the application instance for that tenant. The complication to the deployment process offers flexibility and scalability to the application and its deployments. Tenants can now be upgraded independently and be hosted on hardware that fits their needs.

## Isolated multi-tenancy in Octopus Deploy

### Terms


## Example

Consider the following scenario:

> NameBadge makes HR software for large corporate customers. They provide the software as a SaaS offering to their customers, and host the web site and associated services for them. Due to how the application is architected, for each customer, they deploy:
>
> - A different SQL database
> - A copy of an ASP.NET website
> - A copy of a Windows Service

The key issue in this scenario is that the same components need to be deployed multiple times, one for each end-customer.

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


## Building multi-tenant applications {#Multi-tenantdeployments-Buildingmulti-tenantapplications}

:::success
**Podcast**
Octopus founder and CEO, [Paul Stovell](https://twitter.com/paulstovell), recently recorded an episode of [.NET Rocks](http://dotnetrocks.com/) talking about [Building Multi-Tenant Applications](https://www.dotnetrocks.com/?show=1332). It's a great listen to get a better understanding of why you would want to build a multi-tenant application, and the considerations that go into their design and deployment.
:::

How should I build my application to support multiple tenants or end-customers? Unfortunately the answer is: it depends. There are so many issues to consider when designing an application to handle multiple tenants or end-customers:

- **Security, privacy and data integrity** - how do you ensure data from one tenant is protected from other tenants?
- **Execution isolation** - perhaps your application launches other processes, how do you protect other tenants on the same host?
- **Performance** - how do you measure which tenants are consuming the most resources, and ensure other tenants are not adversely affected by noisy-neighbors?
- **Density and economy** - how do you host all of your tenants in a cost-effective way?

For many of these considerations, deploying multiple instances of your application make a lot of sense, and might be the best way to design your multi-tenant application. The podcast we mentioned above explores these issues in depth.

### High density SaaS applications {#Multi-tenantdeployments-HighdensitySaaSapplicationsarchitectural-changes}

When much larger numbers of customers are concerned it may be wise to consider making architectural changes to the application.

For example, if deployment consists of many copies of the exact same website, just with a few configuration differences per customer, perhaps store those configuration settings in the database, and use the host header field (`HttpContext.Request.Url.Host` in ASP.NET) to determine who the current customer is and respond accordingly. Not only will this make deployment simpler; it will most likely result in an easier to manage application, and reduce overall resource utilization resulting in higher density and profitability.

## Deciding whether multi-tenant deployments in Octopus Deploy suits your scenario

We have worked hard to design multi-tenant deployments in Octopus Deploy to work with a wide variety of scenarios. That being said there may be some limitations and problems which may hamper your adoption. In order to decide if you should adopt multi-tenant deployments for your scenario we recommend:

1. Read through the [multi-tenant deployment guide](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/index.md).
2. Investigate if there are any current [limitations or problems](https://github.com/OctopusDeploy/Issues/issues?q=is%3Aopen+is%3Aissue+label%3Afeature%2Ftenants) which will impact your specific scenario.
3. Get in touch with our [support team](https://octopus.com/support) who can help you understand if multi-tenant deployments are right for you, and how to best model your deployments using Octopus Deploy.

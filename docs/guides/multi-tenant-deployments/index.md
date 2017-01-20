---
title: Multi-tenant deployments
position: 2
---


This page describes how to use Octopus to manage deployments of your applications to multiple end-customers.

:::hint
**Requires Octopus 3.4 or newer**
This guide focuses on Octopus 3.4 (or newer) which provides a rich set of fully-integrated features to build repeatable and reliable multi-tenant deployments that are easy to configure and manage.


Using an older version of Octopus? Take a look at [how to implement multi-tenant deployments using Octopus prior to Octopus 3.4](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployments-prior-to-octopus-3.4.md) and [how to migrate to Octopus 3.4](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployments-prior-to-octopus-3.4/migrating-to-octopus-3.4.md).
:::


On this page:


- Introducing multi-tenant deployments in Octopus
- Why should I care about multi-tenant deployments in Octopus Deploy?
 - You want to deploy a multi-tenant application
- Building multi-tenant applications
 - High density SaaS applications
- Guide: Multi-tenant deployments in Octopus




## Introducing multi-tenant deployments in Octopus


Starting with Octopus 3.4 you can manage tenants as a first-class citizen enabling you to:

1. Deploy multiple instances of your project into the same [Environment](/docs/home/key-concepts/environments.md);
 1. tenant-per-customer
 2. tenant-per-tester
 3. tenant-per-feature/tenant-per-branch
 4. tenant-per-geographical-region
 5. tenant-per-datacentre
2. Easily manage unique configuration settings using variables defined on the tenant;
3. Promote releases to your tenants using safe customer-aware lifecycles, potentially through multiple environments;
 1. tenant-specific UAT and Production environments
4. Tailor the deployment process of your projects per-tenant as necessary;
5. Implement dedicated or shared hosting models for your tenants;
6. Employ tenant-aware security for managing tenants and deploying projects, including 3rd-party self-service sign in;
7. Implement early access or pre-release test programs incorporating 1st-party or 3rd-party testers;
8. Easily scale to large numbers of tenants using tags to manage tenants as groups instead of individuals; and
9. Easily implement simple multi-tenant deployment scenarios, and scale to support complex scenarios as your needs require.


## Why should I care about multi-tenant deployments in Octopus Deploy?


> **Have you ever wanted to have multiple instances of your project deployed to each environment? You should consider multi-tenant deployments in Octopus Deploy.**



Tenants in Octopus Deploy allow you to deploy your projects into multiple isolated containers inside your environments. It's kind of like slicing up your environment into multiple pieces.


![](/docs/images/3048184/5866225.png)


The multi-tenant features in Octopus Deploy will simplify your deployments in all of these scenarios:

- you want multiple isolated deployments in your Test/QA/UAT environment
- you want to provide each tester with an isolated test deployment so they can work on test data, and choose when to upgrade
- you want to provide isolated, time-limited, deployments for work on feature branches
- you want to manage deployments to individual targets across environments, like managing a fleet of embedded devices, or a fleet of laptops/workstations
- you deploy your application to multiple geographic regions - this way you can avoid creating mutliple environments instead modeling each region as a tenant in the same environment - [example](/docs/home/patterns/multi-region-deployment-pattern.md)
- you deploy unique instances of your application for each end-customer - keep reading!


### You want to deploy a multi-tenant application


We built the multi-tenant features in Octopus Deploy for this kind of scenario:

- you want to deploy your project(s) to another customer
- you want to turn your project(s) into a SaaS application by deploying multiple instances of your project(s) to other customers



Consider the following example:


> NameBadge make HR software for large corporate customers. They provide the software as a SaaS offering to their customers, and host the web site and associated services for them. Due to the application architecture, for each customer, they deploy:
> 
> - A different SQL database
> - A copy of an ASP.NET website
> - A copy of a Windows Service



The key issue in this scenario is that the same components need to be deployed multiple times, one for each end-customer, with different configuration settings for each customer, possibly targeting multiple environments.

:::success
You don't need Octopus Deploy to implement a multi-tenant SaaS application: you can also architect your application so you can deploy it once and serve multiple customers. We have built multi-tenant deployments into Octopus for those situations where you want to deploy your application once for each end-customer. See the section below about [building multi-tenant applications](/docs/home/guides/multi-tenant-deployments.md) and [considering architectural changes](/docs/home/guides/multi-tenant-deployments.md).
:::

## Building multi-tenant applications

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

### High density SaaS applications


When much larger numbers of customers are concerned it may be wise to consider making architectural changes to the application.


For example, if deployment consists of many copies of the exact same website, just with a few configuration differences per customer, perhaps store those configuration settings in the database, and use the host header field (`HttpContext.Request.Url.Host` in ASP.NET) to determine who the current customer is and respond accordingly. Not only will this make deployment simpler; it will most likely result in an easier to manage application, and reduce overall resource utilization resulting in higher density and profitability.

## Guide: Multi-tenant deployments in Octopus


This guide will introduce you to multi-tenant deployments in Octopus, starting with simple scenarios, then incorporating more complex capabilities over time.


- [Multi-tenant deployment guide](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide.md)
 - [Creating your first tenant](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-tenant.md)
 - [Creating your first multi-tenant project](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-multi-tenant-project.md)
 - [Deploying a simple multi-tenant project](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md)
 - [Working with tenant-specific variables](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-tenant-specific-variables.md)
 - [Working with groups of tenants using tags](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-groups-of-tenants-using-tags.md)
 - [Designing a multi-tenant hosting model](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md)
 - [Designing a multi-tenant upgrade process](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md)
 - [Multi-tenant roles and security](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/multi-tenant-roles-and-security.md)
- [Multi-tenant deployments FAQ](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployments-faq.md)
- [Other scenarios for multi-tenant deployments](/docs/home/guides/multi-tenant-deployments/other-scenarios-for-multi-tenant-deployments.md)
- [Troubleshooting multi-tenant deployments](/docs/home/guides/multi-tenant-deployments/troubleshooting-multi-tenant-deployments.md)
- [Multi-tenant deployments prior to Octopus 3.4](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployments-prior-to-octopus-3.4.md)
 - [Migrating to Octopus 3.4](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployments-prior-to-octopus-3.4/migrating-to-octopus-3.4.md)

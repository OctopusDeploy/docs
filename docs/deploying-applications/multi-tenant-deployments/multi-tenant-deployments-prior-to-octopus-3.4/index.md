---
title: Multi-tenant deployments prior to Octopus 3.4
description: Trade-offs to consider deciding how to use Octopus (prior to Octopus 3.4) in scenarios that involve deployments for multiple managed customers.
position: 4
version: "(,4.0)"
---

This page describes some of the trade-offs you would consider deciding how to use Octopus (prior to Octopus 3.4) in scenarios that involve deployments for multiple managed customers.

:::success
**Built-in support for multi-tenant deployments**
Consider upgrading to Octopus 3.4 which provides built-in support for multi-tenant deployments. Read through our [multi-tenant deployment guide](/docs/deploying-applications/multi-tenant-deployments/index.md) to see if it fits your situation.
:::

## Scenario: {#Multi-tenantdeploymentspriortoOctopus3.4-Scenario:}

NameBadge make HR software for large corporate customers. They provide the software as a SaaS offering to their customers, and host the web site and associated services for them. Due to how the application is architected, for each customer, they deploy:

- A different SQL database
- A copy of an ASP.NET website
- A copy of a Windows Service

The key issue in this scenario is that the same components need to be deployed multiple times, one for each end-customer, which makes it different from the scenarios Octopus is typically designed to handle.

In Octopus (prior to Octopus 3.4), there were two main ways to model this scenario, plus some additional options to consider.

- Environment per customer
- Project per customer
- Consider architectural changes

## Environment per customer {#Multi-tenantdeploymentspriortoOctopus3.4-Environmentpercustomerenvironment-per-customer}

The simplest solution was to create a separate environment per customer.

![](/docs/images/5669204/5865537.png "width=500")

This was usually the easiest way to manage these kinds of scenarios. If all customers run on dedicated servers, it could be handled by having different servers in each environment. If all customers use a single server, it could be handled by adding the machine to all environments:

![](/docs/images/5669204/5865538.png "width=500")

Keep in mind that variables can be scoped per environment (thus customer).

## Project per customer {#Multi-tenantdeploymentspriortoOctopus3.4-Projectpercustomerproject-per-customer}

In this scenario, we would set up a project with the three deployment steps, and use it as a template. We would then clone the project once per customer, and customize the variables and other settings per customer.

![](/docs/images/5669204/5865539.png "width=500")

If customers use separate, dedicated machines, you could use custom roles (e.g., **customer-a-web**, **customer-b-web**) and edit each deployment step to target that role.

The advantage of this approach is that the deployment process can be heavily customized for each customer, and each customer can more easily have multiple environments. It also means the dashboard looks nicer and requires less horizontal scrolling.

The disadvantage was that separate releases must be created per project, and keeping settings in sync is harder.

:::success
**Rule of thumb**
If all customers tend to be very similar, with perhaps just a few configuration differences, we recommended **environment-per-customer**.

If each customer had major differences, and possibly bespoke work, we recommended **project-per-customer**.
:::

The solutions above would work well for a few dozen customers, and with some effort, be made to work for many more using the [REST API](/docs/api-and-integration/octopus-rest-api.md) and [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md).

## Consider architectural changes {#Multi-tenantdeploymentspriortoOctopus3.4-Considerarchitecturalchangesarchitectural-changes}

When much larger numbers of customers are concerned it may be wise to consider making architectural changes to the application.

For example, if deployment consists of many copies of the exact same website, just with a few configuration differences per customer, perhaps store those configuration settings in the database, and use the host header field (`HttpContext.Request.Url.Host` in ASP.NET) to determine who the current customer is and respond accordingly. Not only will this make deployment simpler; it will most likely result in an easier to manage application, and reduce overall resource utilization resulting in higher density and profitability.

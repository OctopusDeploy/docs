---
title: Tenants
description: Tenants allow you to deploy multiple instances of your project to an environment.
position: 60
hideInThisSection: true
---

This section describes the multi-tenancy feature of Octopus Deploy.

Tenants in Octopus Deploy allow you to easily manage separate instances of your application in an environment. Without tenants, you can only deploy a single instance of your application to an environment.

![](images/multi-tenant-deployment.png "width=500")

Tenants enable:

1. Deploying multiple instances of your project to the same [Environment](/docs/infrastructure/environments/index.md).
2. Managing configuration settings unique to each tenant.
3. Promoting releases using safe tenant-aware lifecycles.
4. Tailoring the deployment process using tenant tags.
5. Deploying to shared or dedicated infrastructure per tenant.
6. Limiting access to tenants by scoping team roles to tenants.
7. Creating release rings so that you can easily deploy to alpha and beta tenants.
8. Managing large groups of tenants using tenant tags.
9. Building simple multi-tenant deployment processes that can scale as you add more tenants.

## Types of tenants {#types-of-tenants}

We designed tenants to be generic so that they can satisfy multiple use cases.

Tenants usually represent the customers of your application, especially when it comes to SaaS products.

Tenants can also represent:

- Developers, testers, or other team members
- Feature branches
- Geographical regions or datacenters

## When to use tenants {#when-to-use-tenants}

:::success
You don't need tenants to implement a multi-tenant SaaS application. You can architect your application so that one instance can serve multiple customers. We built multi-tenancy for situations where you want to deploy your application more than once in an environment.
:::

Here are some signs that you should consider using tenants:

- You need to deploy different versions of your application to the same environment.
- You are creating multiple environments of the same type. This could be multiple Test environments for different testers or multiple Production environments for different customers.

Check out our [multi-tenancy guides](/docs/tenants/guides/index.md) that go into more detail on how to use multi-tenancy in Octopus for some common scenarios.

## Add a tenant {#add-tenants}

1. Select **Tenants** from the main navigation, and click **ADD TENANT**.

   ![](images/add-new-tenant.png "width=500")

2. Enter the name you want to use for the tenant and click the **SAVE** button:

    ![](images/creating-new-tenant.png "width=500")

Now that you've created a tenant, you can [enable tenanted deployments](#enable-tenanted-deployments) and then [connect the tenant to a project](#connect-tenant-to-project).

:::hint
It's also possible to create a tenant using the [Octopus REST API](/docs/octopus-rest-api/index.md). To learn more, see our [Create a Tenant](/docs/octopus-rest-api/examples/tenants/create-tenant.md) example.
:::

## Tenant logo {#tenant-logo}

Try adding a logo for your tenant - this will make it much easier to distinguish your tenants. You can do this within the Octopus Tenant section by clicking on the tenant's logo placeholder or going to the Settings tab on the tenant.

Your tenants will likely be other businesses, and you could use their logo to help quickly identify the correct tenant.

You could consider using logos based on:

- Customer logos
- Data center region(s) or flags
- Individual tester(s) photo/avatar

## Enable tenanted deployments {#enable-tenanted-deployments}

//TODO: Summary

## Connect a tenant to a project {#connect-tenant-to-project}

//TODO: Summary
You can enable tenanted deployments for a project by navigating to the project's settings

## Tenant variables {#tenant-variables}

//TODO: Summary

## Tenant tags {#tenant-tags}

//TODO: Summary

## Troubleshooting multi-tenant deployments

If you're running into any issues with tenants, then this section has some useful answers to some of the questions we are often asked relating to multi-tenant deployments in Octopus Deploy:

- [Multi-tenant deployments FAQ](/docs/tenants/tenant-deployment-faq.md)
- [Troubleshooting multi-tenant deployments](/docs/tenants/troubleshooting-multi-tenant-deployments.md)

If you still need assistance, don't worry - [we are always here to help!](https://octopus.com/support)
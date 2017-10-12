---
title: Tenants
description: Tenants allow you to deploy your projects into multiple isolated containers inside your environments. It's kind of like slicing up your environment into multiple pieces.
position: 7
version: 3.4
---

This page describes the concept of tenants available in Octopus. Prior to Octopus 3.4 the best choice available to you was to create an environment-per-tenant or project-per-tenant leading to duplication and complexity. In Octopus 3.4 you can implement tenants as first-class concepts alongside your existing projects and environments with support for advanced scenarios like [per-tenant configuration](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-tenant-specific-variables.md), tenant-aware [lifecycles](/docs/key-concepts/lifecycles.md), and self-service deployments.

## Introducing multi-tenant deployments in Octopus {#Tenants-Introducingmulti-tenantdeploymentsinOctopus}

Tenants as a first-class citizen enabling you to:

1. Deploy multiple instances of your project into the same [Environment](/docs/key-concepts/environments/index.md);
1. Manage tenants per customer/tester/feature/branch/geographical-region/datacentre;
1. Easily manage unique configuration settings using variables defined on the tenant;
1. Promote releases to your tenants using safe customer-aware lifecycles, potentially through multiple environments;
1. Tenant specific UAT and Production environments;
1. Tailor the deployment process of your projects per-tenant as necessary;
1. Implement dedicated or shared hosting models for your tenants;
1. Employ tenant-aware security for managing tenants and deploying projects, including 3rd-party self-service sign in;
1. Implement early access or pre-release test programs incorporating 1st-party or 3rd-party testers;
1. Easily scale to large numbers of tenants using tags to manage tenants as groups instead of individuals;
1. Easily implement simple multi-tenant deployment scenarios, and scale to support complex scenarios as your needs require;

## Why should I care about multi-tenant deployments in Octopus Deploy? {#Tenants-WhyshouldIcareaboutmulti-tenantdeploymentsinOctopusDeploy?}

> **Have you ever wanted to have multiple instances of your project deployed to each environment? You should consider multi-tenant deployments in Octopus Deploy.**

Tenants in Octopus Deploy allow you to deploy your projects into multiple isolated containers inside your environments. It's kind of like slicing up your environment into multiple pieces.

![](/docs/images/3048184/5866225.png "width=500")

The multi-tenant features in Octopus Deploy will simplify your deployments in all of these scenarios:

- you want multiple isolated deployments in your Test/QA/UAT environment
- you want to provide each tester with an isolated test deployment so they can work on test data, and choose when to upgrade
- you want to provide isolated, time-limited, deployments for work on feature branches
- you want to manage deployments to individual targets across environments, like managing a fleet of embedded devices, or a fleet of laptops/workstations
- you deploy your application to multiple geographic regions - this way you can avoid creating mutliple environments instead modeling each region as a tenant in the same environment - [example](/docs/patterns/multi-region-deployment-pattern.md)
- you deploy unique instances of your application for each end-customer - keep reading!

### You want to deploy a multi-tenant application {#Tenants-Youwanttodeployamulti-tenantapplication}

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
**You don't need Octopus Deploy to implement a multi-tenant SaaS application**
You can also architect your application so you can deploy it once and serve multiple customers. We have built multi-tenant deployments into Octopus for those situations where you want to deploy your application once for each end-customer. See the section below about [building multi-tenant applications](/docs/guides/multi-tenant-deployments/index.md) and [considering architectural changes](/docs/guides/multi-tenant-deployments/index.md).
:::

## Making the most of tenants in Octopus {#Tenants-MakingthemostoftenantsinOctopus}

Multi-tenant deployments are an advanced topic in Octopus and we have written a [comprehensive guide](/docs/guides/multi-tenant-deployments/index.md) to help you get the most benefit from your deployment automation.

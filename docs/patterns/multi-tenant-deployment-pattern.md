---
title: Multi-tenant deployment pattern
description: Implementing multi-tenant deployments, i.e. deploying the same components to an environment multiple times, with Octopus.
position: 2
---

Consider the following scenario:

> NameBadge make HR software for large corporate customers. They provide the software as a SaaS offering to their customers, and host the web site and associated services for them. Due to how the application is architected, for each customer, they deploy:
>
> - A different SQL database
> - A copy of an ASP.NET website
> - A copy of a Windows Service

The key issue in this scenario is that the same components need to be deployed multiple times, one for each end-customer.

## Multi-tenant deployments using Octopus {#Multi-tenantdeploymentpattern-Multi-tenantdeploymentsusingOctopus}

We have introduced first-class support for multi-tenant deployments in Octopus 3.4. For more information refer to our comprehensive guide: [Multi-tenant deployments](/docs/guides/multi-tenant-deployments/index.md)

!partial <before>
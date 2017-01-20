---
title: Multi-tenant deployment pattern
position: 2
---


Consider the following scenario:


> NameBadge make HR software for large corporate customers. They provide the software as a SaaS offering to their customers, and host the web site and associated services for them. Due to how the application is architected, for each customer, they deploy:
> 
> - A different SQL database
> - A copy of an ASP.NET website
> - A copy of a Windows Service



The key issue in this scenario is that the same components need to be deployed multiple times, one for each end-customer.

## Multi-tenant deployments using Octopus


We have introduced first-class support for multi-tenant deployments in Octopus 3.4. For more information refer to our comprehensive guide: [Multi-tenant deployments](/docs/home/guides/multi-tenant-deployments.md)


If you are using an earlier version of Octopus we have provided some recommendations and trade-offs for you to consider: [Multi-tenant deployments prior to Octopus 3.4](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployments-prior-to-octopus-3.4.md)

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Multi-tenant regions
description: A guide showing you how to use tenants to deploy an application to regions using different release rings in Octopus Deploy.
navOrder: 10
hideInThisSectionHeader: true
---

This guide introduces the concept of using geographic locations as tenants for an application as well as different upgrade rings.  In this guide, we are using a fictitious Car Rental company that has three locations; Los Angeles International Airport (LAX), Des Moines Iowa, and Norfolk Virginia.  In this scenario, the Des Moines location is used as a pilot facility, with Norfolk testing beta features.  LAX is their busiest location so it uses only stable releases.

The Car Rental company utilizes Azure to host the application for its stores.  To minimize latency, the application is deployed to the closest Azure datacenter known as regions; LAX uses `West US`, De Moines uses `Central US`, and the Norfolk location uses `East US`.  

<span><a class="button btn-success" href="/docs/tenants/guides/multi-tenant-region/creating-new-tenants">Get Started</a></span>

## Guide contents

The following sections make up the guide:

- [Creating new tenants](/docs/tenants/guides/multi-tenant-region/creating-new-tenants)
- [Creating tenant tags](/docs/tenants/guides/multi-tenant-region/creating-tenant-tags)
- [Manage Tenants and Tag sets](/docs/tenants/guides/multi-tenant-region/manage-tenant-and-tenant-tags)
- [Tenant infrastructure](/docs/tenants/guides/multi-tenant-region/assigning-tenants-to-infrastructure)
- [Deploying to a Release Ring](/docs/tenants/guides/multi-tenant-region/deploying-to-release-ring)
- [Region specific workers](/docs/tenants/guides/multi-tenant-region/region-specific-workers)
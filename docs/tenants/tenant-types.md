---
title: Tenant types
description: There are several different types of tenants that can be supported with Octopus Deploy.
position: 70
---

## Types of multi-tenancy
The most common types of tenancy are:
- Software as a Service (SaaS)
- Region
- Teams

### SaaS
SaaS is perhaps the most common implementation of mutli-tenancy with Octopus Deploy is the SaaS model.  The SaaS model is where the same software is deployed to multiple customers (tenants).  The deployment process can include items such as custom branding per tenant or scoping specific steps to tenant tags so that modules can be deployed to tenants that have purchased them.  

### Region
Another pattern for multi-tenancy is to treat geographic regions of the same organization as tenants.  Using this model, something like an e-commerce application can test out new or beta features in a specific region before releasing them out to the rest of the organization.  Scheduling deployments during a maintenance window is another way this pattern can be used as each region may have different hours when they are least busy.

### Teams
Concurrent application development is another multi-tenant use-case.  Using tenants for teams allows an Octopus Administrator to re-use the same deployment process as well as Environments giving each team the autonomy to deploy.  Deployment targets can be assigned tenant tags or even be dedicated to specific tenants so that each team can deploy without affecting the other.
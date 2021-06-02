---
title: Multi-Tenant regions
description: Guides showing you how to use tenants to deploy an application to regions using different release rings.
position: 30
hideInThisSectionHeader: true
---
Each store in the Car Rental chain is named after the city or location they are in.  To ensure that the application is deployed to the correct location with the correct features, we must associate each tenant with the correct tags.

## Managing Tenant Tag Sets for Tenants
To manage the Tag Sets associated with a Tenant, navigate to the Tenants, then select the Tenant to manage

![](images/car-rental-tenants.png)

Click on **MANAGE TAGS** to edit which tags are associated to a Tenant

![](images/tenant-manage-tags.png)

The De Moines location for Car Rental application deploys to the Azure region of Central US and participates in all Release Rings.  This tenant will be assigned the `Central US` Azure Region tag as well as `Alpha`, `Beta`, and `Stable` Release Rings tags

![](images/demoines-tags.png)
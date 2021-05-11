---
title: Create a tenant
description: How to create a tenant in Octopus Deploy.
position: 10
---

This page describes how to create a tenant in Octopus for use in a multi-tenanted deployment.

## Create a tenant using the Web Portal {#create-tenant-web-portal}

1. In the Octopus Web Portal, navigate to **Tenants** and click the **ADD TENANT** button:

   ![](images/add-new-tenant.png "width=500")

2. Enter the name you want to use for the tenant and click the **SAVE** button:

    ![](images/creating-new-tenant.png "width=500")

And that's it, you've created your first tenant! 

You may have noticed you cannot do much with that tenant on it's own.

To be able to deploy to this tenant, you need to:
- Enable [tenanted deployments](/docs/tenants/enable-tenanted-deployments.md) in a project.
- Connect [the tenant to a project](/docs/tenants/connecting-projects.md).

## Create a tenant using the REST API

Since Octopus is built API-first, that means anything you can do in the Web Portal can be done using the [Octopus REST API](/docs/octopus-rest-api/index.md). This includes creating a tenant. 

We have a wide range of [API examples](/docs/octopus-rest-api/examples/index.md). To learn how to create a tenant using the REST API, see our [Create a Tenant](/docs/octopus-rest-api/examples/tenants/create-tenant.md) example.

## Add your logo {#add-logo}

Try adding a logo for your tenant - this will make it much easier to distinguish your tenants. You can do this within the Octopus Tenant section by clicking on the tenant's logo placeholder or going to the Settings tab on the tenant.

Your tenants will likely be other businesses, and you could use their logo to help quickly identify the correct tenant.

You could consider using logos based on:

- Customer logos
- Data center region(s) or flags
- Individual tester(s) photo/avatar
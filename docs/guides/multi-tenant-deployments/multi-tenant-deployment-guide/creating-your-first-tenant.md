---
title: Creating your first tenant
position: 0
---

This page describes each step involved in creating your first tenant.

1. Enable the **multi-tenancy** feature in *Configuration > Features* if you haven't already - *you will need an Octopus Administrator to do this*.
   ![](/docs/images/5669223/5865660.png "width=500")
   The Tenants link should be added to the main menu of Octopus when you click the **Save** button.
2. Go to *Tenants* and click the **Add tenant** button
   ![](/docs/images/5669223/5865661.png "width=500")
3. Enter the name you want to use for the tenant and click the **Save** button.
    ![](/docs/images/5669223/5865662.png "width=500")

That's it - you've created your first tenant, but you may have noticed you cannot do much with that tenant right now. In the following steps we will create a project and connect this tenant to that project and deploy it into the tenant's environment.

:::success
Try adding a logo for your tenant - this will make it much easier to distinguish your tenants from each other. You can do this by clicking on the tenant's logo placeholder or going to the Settings tab on the tenant.

![](/docs/images/5669223/5865697.png "width=500")

In reality your tenants would be other businesses, but for our sample we've used anonymous people data from [http://api.randomuser.me/](http://api.randomuser.me/).
:::

## Next steps {#Creatingyourfirsttenant-Nextsteps}

In the following steps we will [create a multi-tenant project](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-multi-tenant-project.md) and then [deploy that project into the tenant's environment](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md).

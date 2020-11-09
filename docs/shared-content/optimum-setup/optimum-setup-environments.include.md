In this section, we will walk through our recommendations for configuring your environments to better prepare you to scale your Octopus Deploy instance up and out as you add more projects.

## Environment terminology

We recommend configuring your environments to match your company's terminology. Keep it general where possible. Think of how you want to phrase it during a conversation with a non-technical person. "I'm pushing some code up to Dev," or "I'm deploying my app to Production," makes a lot more sense than "I'm pushing to Dev Omaha 45." What does Omaha mean? The data center? Where did 45 come from?

:::hint
A good sign that you have well-modeled environments is that they are easy to explain. If it takes longer than a few seconds to explain your environments, that's a sign you need to make some changes.
:::

## Keep environment numbers low

Keep the list of environments under a dozen or so. Have the standard four or five environments, such as Dev, Test, Staging, and Production. For dynamic infrastructure and maintenance, you can also add SpinUp, TearDown, and Maintenance. Those environments will help when it's time to build up infrastructure, tear down applications, or perform some scheduled maintenance tasks like taking a backup of logs in production.

![The Environment overview](docs/shared-content/optimum-setup/images/environment-list.png "width=500")

Don't worry about the order of the environments, this can be changed using the [reorder environment](/docs/infrastructure/environments/index.md#sort-your-environments) option.

## Common environment scenarios

In this section, we walk you through a couple of common scenarios we've seen with environments and how to work through them.

### Multiple Data Centers

In the world of cloud providers such as Azure, AWS, and Google Cloud, it's becoming common to deploy to multiple data centers. In some scenarios, you might need to deploy the software in specific intervals or orders. For example, you might deploy to a data center in Illinois before deploying to one in Texas.

It can be tempting to name your environment _Production [Data Center]_ or _Production Omaha_. You'd do this in the event you might not want to deploy to all data centers at the same time, or because you want to know what version of the code is in each data center. Unfortunately, this doesn't scale very well. Every time you add a new data center, you'll need to adjust many different parts of your infrastructure and Octopus configuration. To name just a few, you'd have to add a new environment, add that environment to a lifecycle, and you'd need to update any environment variable scopes too.

One scenario that we've seen is customers deploy to an on-premises data center for dev, test, and staging, but production is hosted in data centers in Illinois and Texas. Before pushing to production, they run some sanity checks in a staging environment in Illinois and Texas. If you create an environment per data center, you would have seven environments when you actually only need four.

![Multi-tenancy Environments](docs/shared-content/optimum-setup/images/multi-tenancy-environments.png "width=500")

If don't have any targets or projects set up yet, creating seven environments is easy to do, but it doesn't scale. A better way would be to use the [multi-tenancy](/docs/deployment-patterns/multi-tenant-deployments/index.md) feature. For this to work, you'd add two new tenants, modeling each data center as a tenant. To add the new tenants, click on the tenant link in the navigation bar in the Octopus portal and then clicking **ADD TENANT** in the top right corner.

![Data Center tenants](docs/shared-content/optimum-setup/images/data-center-tenants.png "width=500")

:::hint
Adding images to your tenants makes them easier to find. You can do this by clicking on the tenant and selecting the settings link on the left. On that screen, you can upload an image for a tenant.
:::

Once added, you would update any targets and connect each project to include your newly created tenants.

Then when you choose a release to deploy you choose which data center to deploy to; Illinois or Texas.

### Multiple Customers

In the same vein of deploying the same project to multiple data centers, a lot of our customers deploy the same project to multiple clients.

Each of their customers gets their own set of machines and other resources. Again, you might be tempted to configure a unique set of environments for each customer. You could create _Dev [Customer Name]_, _Staging [Customer Name]_, and _Production [Customer Name]_, and this will work for the first dozen or so customers, but again, it doesn't scale very well.

Imagine if you had five clients:

1. An internal testing customer
1. Coca-Cola
1. Ford
1. Nike
1. Starbucks.  

The internal customer deploys to all the environments, dev, test, staging, and prod. Coca-Cola and Nike have resources in test, staging, and production, while Ford and Starbucks only have resources in staging and production. 

If you create an environment per tenant, you would have 14 environments. And that is only for five customers!

This is where the [multi-tenancy](/docs/deployment-patterns/multi-tenant-deployments/index.md) feature again shines. It allows you to keep the number of environments low while creating a unique workflow per client.

![Tenants as Customers](docs/shared-content/optimum-setup/images/multi-tenancy-customers.png "width=500")

## Conclusion

In summary, the major ting to remember is when configuring Octopus, keep the number of environments you create low, and leverage tenants to handle deployments to different data centers or customers.
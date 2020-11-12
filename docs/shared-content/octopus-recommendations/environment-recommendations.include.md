In this section, we will walk through our recommendations for configuring your environments to better prepare you to scale your Octopus Deploy instance up and out as you add more projects.

## Environment terminology

We recommend configuring your environments to match your company's terminology. Try to keep naming as general as possible. Sometimes it helps to consider how you would phrase it during a conversation with a colleague:

> "I'm pushing some code up to Dev"

or

> "I'm deploying my app to Production"

These are clearer than:

> "I'm pushing to Dev Omaha 45." 

Without context, it's not clear what _Omaha_ refers to, or what the significance of _45_ is.

A good sign that you have well-modeled environments is that the names don't need an explanation. You should consider changing a name if it is not clear.

## Keep environment numbers low

In general, try to keep the number of environments under ten. Having fewer environments makes configuring and maintaining your Octopus Server easier. 

We recommend creating a standard set of environments. For example, Dev, Test, Staging, and Production. If you have [dynamic infrastructure](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md), you might also need SpinUp, TearDown, and Maintenance.

![The Environment overview](docs/shared-content/octopus-recommendations/images/environment-list.png "width=500")

If you need to change the order of your environments later, you can use the [sort](/docs/infrastructure/environments/index.md#sort-your-environments) option.

### Deployment targets and environments

Octopus will choose the targets to deploy to based on the environment, target roles, and if configured, tenants. This guarantees that the release is deployed to the appropriate targets. Sharing the same environments across projects ensures a consistent and maintainable Octopus experience.

## Common environment scenarios

In this section, we walk you through some common scenarios we've seen with environments and how to work through them.

### Multiple Data Centers

Cloud providers such as Azure, AWS, and Google Cloud make deploying to many data centers commonplace. You might need to deploy the software at specific intervals or in a specific order. For example, you might deploy to a data center in Illinois before deploying to one in Texas.

It can be tempting to name environments to match a data center location. For example _Production [Data Center]_ or _Production Omaha_. This is convenient as you can deploy to an individual data center at a time. You can also see what version of code is deployed to each data center.

Unfortunately, this doesn't scale very well. Every time you add a new data center, your infrastructure and Octopus configuration will need modification, such as:

- Adding a new environment.
- Updating lifecycles.
- Updating any variables with environment scoped values.

One scenario that we've seen is customers deploy to an on-premises data center for dev, test, and staging, but production is hosted in data centers in Illinois and Texas. Before pushing to production, they run some sanity checks in a staging environment in Illinois and Texas. If you create an environment per data center, you would have seven environments when you actually only need four.

![Multi-tenancy Environments](docs/shared-content/octopus-recommendations/images/multi-tenancy-environments.png "width=500")

If don't have any targets or projects set up yet, creating seven environments is easy to do, but it doesn't scale. A better way would be to use the [multi-tenancy](/docs/deployment-patterns/multi-tenant-deployments/index.md) feature in Octopus. For this to work, you'd modeling each data center as a new tenant. To add the new tenants, navigate to the **Tenants** menu and click **ADD TENANT** in the top right corner.

![Data Center tenants](docs/shared-content/octopus-recommendations/images/data-center-tenants.png "width=500")

:::hint
**Tip:** Adding images to your tenants makes them easier to find. You can do this by clicking on the tenant and selecting the settings link on the left. On that screen, you can upload an image for a tenant.
:::

Once added, update any targets and connect each project to include the newly created tenants.

Then when choosing a release, select which data center tenant to deploy to, Illinois or Texas.

### Multiple Customers

In the same vein of deploying the same project to multiple data centers, we see a lot of customers deploy the same project to multiple clients.

Each of their customers gets their own set of machines and other resources. Again, you might be tempted to configure a unique set of environments for each customer. You could create:
- _Dev [Customer Name]_
- _Staging [Customer Name]_ and
- _Production [Customer Name]_

This will work for the first dozen or so customers, but again, it doesn't scale very well.

Imagine if you had five clients:

1. An internal testing customer
1. Coca-Cola
1. Ford
1. Nike
1. Starbucks.  

The internal customer deploys to all the environments, dev, test, staging, and prod. Coca-Cola and Nike have resources in test, staging, and production, while Ford and Starbucks only have resources in staging and production. 

If you create an environment per tenant, you would have 14 environments. And that is only for five customers.

This is where the [multi-tenancy](/docs/deployment-patterns/multi-tenant-deployments/index.md) feature in Octopus again shines. It allows you to keep the number of environments low, while creating a unique workflow per client.

![Tenants as Customers](docs/shared-content/octopus-recommendations/images/multi-tenancy-customers.png "width=500")

## Conclusion

In summary, the major thing to remember when configuring Octopus is to keep the number of environments you create low, and leverage tenants to handle deployments to different data centers or customers.
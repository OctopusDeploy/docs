---
title: Deploying a Simple Multi-tenant Project
description: Connect your tenant.
position: 2
---

Previous step: [Creating your first multi-tenant project](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-multi-tenant-project.md)

In this step we will connect your tenant to the **Mojo** project and deploy it to the **MT Production** environment for your tenant.

## Connecting Your Tenant to a Project

By connecting tenants to projects you can control which projects will be deployed into which environments for each tenant.

1. Navigate to your tenant.
2. Click on the **Connect to a project** button.

![](images/deploying-a-simple-multi-tenant-project-5865688.png)

3. Select the **Mojo** project and click on the **Enable tenanted deployments for Mojo** button which will enable the multi-tenant deployment features for the Mojo project. This will configure the project to allow deployments *with* or *without* a tenant, and we will discuss these options later on.

![](images/deploying-a-simple-multi-tenant-project-5865689.png)

4. Now select the **MT Production** environment and click the **Add connection** button.

![](images/deploying-a-simple-multi-tenant-project-5865557.png)

5. Click the **Save** button to save the tenant configuration.

:::info
You can connect a tenant to any environment included in any of the lifecycles used by your project. Not seeing the environment you want? Make sure at least one lifecycle used by your project includes that environment.
:::

:::success
You can connect each tenant to any number of projects, and for each project any combination of environments that can be targeted by each project. This gives you the most flexibility when designing your multi-tenant deployments.

- You can offer certain projects to some tenants and not to others.
- You can also provide most of your tenants with a single environment while offering certain special customers extra environments. For example, you could provide certain customers with a test/staging/acceptance environment where they can test new releases before you upgrade their production environment.
  :::

## Deploying the Project to Your Tenant {#Deployingasimplemulti-tenantproject-Deployingtheprojecttoyourtenant}

Now your tenant is connected to the **Mojo** project you can start deploying releases to your tenant.

1. Navigate to the **Mojo** project and create a new release, which by default will be called **0.0.1**.
2. Click the **Deploy to MT Production** button so we can start the deployment process.
3. Select the **Deploy to one or more tenants** radio button option. This indicates you want to perform a **tenanted deployment** instead of an **untenanted deployment** - we will discuss this option a little later.
4. Select your tenant by finding them in the tenant selector and click **Deploy now**.

![](images/deploying-a-simple-multi-tenant-project-5865649.png "width=300")

Once the deployment completes you should see the result of running the [script we set up in an earlier step](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-multi-tenant-project.md), where the **Octopus.Tenant.Name** is written to the log, and the database connection string is calculated. At the moment the connection string and URL are empty - we are going to configure tenant-specific variables in the next step.

:::success
You can deploy a release to multiple tenants at the same time using the Octopus UI, the Octopus CLI or any of the build-server extensions! See [this FAQ](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployments-faq.md) for more details.
:::

:::hint
**Tenanted and untenanted deployments explained**
When you select **Deploy to one or more tenants** you are performing a **tenanted deployment** - deploying a release of a project to an environment for a specific tenant. When you perform a tenanted deployment the selected tenant can impact the entire process including which steps are run, which variable values are used, and which deployment targets are included, all depending on your deployment design.

Also note Octopus will create a deployment per-tenant. This means if you select 20 tenants, Octopus will create 20 separate deployments: one for each tenant. Each of those deployments will execute in its own task.

When you select **Deploy to one or more environments** you are performing an **untenanted deployment** - this is the same kind of deployment Octopus has always performed where you deploy a release of a project to an environment... there is no tenant for the deployment, and there will be no tenant influence on the deployment process.

When you first enable multi-tenant deployments you won't have any tenants, and we don't want that to stop you from deploying your existing projects. Perhaps you are using an environment-per-tenant model and will migrate to tenants over a period of time, so some deployments will start to have a tenant whilst others do not.

At some point in time you may want to disable untenanted deployments and require a tenant for every deployment of a project. You can control this behavior for each project in the project settings.

![](images/deploying-a-simple-multi-tenant-project-require-tenant.png)
:::

## Next Steps {#Deployingasimplemulti-tenantproject-Nextsteps}

Now that we can deploy the **Mojo** project to your tenant, we need to make sure it is configured correctly for each tenant - we are going to [start working with tenant-specific variables](/docs/deployment-patterns/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-tenant-specific-variables.md).

## Learn more

- [Deployment patterns blog posts](https://www.octopus.com/blog/tag/Deployment%20Patterns).
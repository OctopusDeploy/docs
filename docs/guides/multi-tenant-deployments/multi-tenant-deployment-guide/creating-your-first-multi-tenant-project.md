---
title: Creating your first multi-tenant project
description: Create a simple project and environment in preparation to deploy a project to your tenant.
position: 1
---

Previous step: [Creating your first tenant](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-tenant.md)

In this section we will create a simple project and environment in preparation to deploy a project to your tenant. We will create an isolated environment, deployment target, lifecycle, project group and project so we can design our multi-tenant deployments without affecting anything else on our Octopus Server.

:::hint
**Using an existing project?**
Already have a project you'd like to try out with your tenant? That's fine, just be aware you may need to consider your project's lifecycle progression in order to deploy to your tenant depending on which environment(s) you connect your tenant to.
:::

## Step 1: Build your environment and project {#Creatingyourfirstmulti-tenantproject-Step1:Buildyourenvironmentandproject}

In this step you will build your entire environment and project structure ready for multi-tenant deployments.

:::hint
Multi-tenant deployments is an advanced deployment concept, so we expect you to be familiar with Octopus concepts like [projects](/docs/deploying-applications/projects/index.md), [environments](/docs/infrastructure/environments/index.md), [lifecycles](/docs/deploying-applications/projects/lifecycles/index.md), [variables](/docs/deploying-applications/variables/index.md) and [deploying applications](/docs/deploying-applications/index.md).
:::

1. Create a new [environment](/docs/infrastructure/environments/index.md) called **MT Production** to represent your production environment for this guide. *We will create other environments later on.*
2. Add a new cloud region deployment target called **MT Web Server** with the role **MT-web-server**.
   *Note: We are using a cloud region to simulate a real deployment target as a convenience - you could equivalently use any other deployment target you already have available.*
3. Create a new [lifecycle](/docs/deploying-applications/projects/lifecycles/index.md) called **MT Lifecycle** adding a single phase called **MT Production** deploying manually into the **MT Production** environment we created earlier.
4. Create a new [project group](/docs/deploying-applications/projects/project-groups.md) called **MT Sample** so we can keep our sample project separate from the rest.
5. Create a new [project](/docs/deploying-applications/projects/index.md) called **Mojo** (or any other name of your choice).
6. Add a step, to run the PowerShell script shown below, called **Deploy Application** targeting the **MT-web-server** role:

**Script: Deploy Application**

```powershell
$projectName = $OctopusParameters["Octopus.Project.Name"]
$tenantName = $OctopusParameters["Octopus.Deployment.Tenant.Name"]
$environmentName = $OctopusParameters["Octopus.Environment.Name"]
$databaseConnectionString = $OctopusParameters["DatabaseConnectionString"]
$hostURL = $OctopusParameters["HostUrl"]

if ($tenantName) {
    Write-Host "Deploying $projectName into the $environmentName environment for $tenantName"
} else {
    Write-Host "Deploying $projectName into $environmentName"
}
Write-Host "Database Connection String: $databaseConnectionString"
Write-Host "URL: $hostURL"
```
*This script doesn't do anything, it just simulates deploying an application with or without a tenant, showing the resulting database connection string.*

![](/docs/images/5669300/5865553.png "width=500")

**That's it!** You are now ready to start connecting tenants to your project so you can deploy to those tenants, which is exactly what we will do in the next steps.

:::hint
**Project Settings**
If you look at the project settings you may notice a new set of options related to how the new multi-tenant deployment features should impact the project. By default every project will disable the tenanted deployment features, and each project can opt-in to the features as required.

![](/docs/images/5669300/5865692.png)

We'll leave this setting alone right now and let Octopus configure it for us in the next steps.
:::

## Next steps {#Creatingyourfirstmulti-tenantproject-Nextsteps}

We will [connect your tenant to this project and deploy it into the tenant's production environment](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md). Talk about living life on the edge!

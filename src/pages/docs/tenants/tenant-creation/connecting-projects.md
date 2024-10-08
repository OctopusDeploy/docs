---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-12
title: Connecting projects
icon: fa-solid fa-share-nodes
description: By connecting tenants to projects, you can control which projects will be deployed into which environments for each tenant.
navOrder: 20
---

By connecting tenants to projects, you can control which projects will be deployed into which environments for each tenant.

1. Navigate to your tenant.
2. Click on the **CONNECT PROJECTS** button.

   :::figure
   ![](/docs/tenants/tenant-creation/images/multi-tenant-connect-projects.png)
   :::

3. Choose the projects you want to connect to your tenant, by clicking any project in the left-hand panel of the wizard. Click the - button of a project in the right-hand panel to deselect that project.
   
   :::figure
   ![](/docs/tenants/tenant-creation/images/multi-tenant-connect-projects-dialog.png)
   :::

4. Once you have selected the projects you want to connect, click **NEXT**.
5. Choose the [environments](/docs/infrastructure/environments) you want the tenant to be connected to for each project. You can select just one or two from the drop-down menu, or click **Assign all available environments** to select all available environments.

:::div{.info}
Not seeing the environment you want? Make sure at least one lifecycle used by your project includes that environment.
:::

6. A preview of the selected projects and environments is shown in the connection preview panel. The selected environments will be assigned to each project based on whether they are part of any lifecycle in the project. If an environment is not part of any lifecycle in the project, it will not be assigned to the project.

   :::figure
   ![](/docs/tenants/tenant-creation/images/multi-tenant-connect-environments.png)
   :::

7. Click **CONNECT PROJECTS**

You can connect each tenant to any number of projects and, for each project, any combination of environments that each project can target. This gives you the most flexibility when designing your multi-tenant deployments.

- You can offer specific projects to some tenants and not to others.
- You can also provide most of your tenants with a single environment while offering specific customers extra environments. For example, you could give particular customers a test/staging/acceptance environment where they can test new releases before upgrading their production environment.

## Older versions
The project connection feature was updated to allow bulk selection in Octopus Deploy **2023.4**. If you are running an older version of Octopus the dialog will only allow selecting a single project at a time.

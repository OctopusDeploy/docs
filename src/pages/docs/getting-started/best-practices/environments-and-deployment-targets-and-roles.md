---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Environments, Deployment Targets, and Roles
description: Guidelines and recommendations for configuring environments, deployment targets, and lifecycles in Octopus Deploy.
navOrder: 30
hideInThisSection: true
---

[Deployment targets](/docs/infrastructure/deployment-targets/) are what Octopus Deploy deploys to.  They can be Windows servers, Linux servers, Kubernetes (K8s) clusters, Azure Web Apps, and more.  Please refer to the [Deployment targets](/docs/infrastructure/deployment-targets/) for an up to date list on deployment targets.  [Environments](/docs/infrastructure/environments) are how you organize your deployment targets into groups that represent different stages of your deployment pipeline.  These stages are typically given names such as **development**, **test**, and **production**.  Target roles, or tags, are a filter to select specific deployment targets in an environment.

## Deployment Target Environment and Role Relationship
Environments are how you group deployment targets in a stage in your deployment pipeline.  Target roles, or tags, are how you identify which deployment targets you wish to deploy to in that specific stage.

When you register a deployment target, you must provide at least one environment and one target role.

:::figure
![environment and roles for targets](/docs/getting-started/best-practices/images/registering-deployment-target.png "width=500")
:::

In the deployment process, you assign steps to run on specific roles.

:::figure
![deployment process role assignment](/docs/getting-started/best-practices/images/target-roles-in-deployment-process.png "width=500")
:::

For example, imagine you have three deployment targets in the **development** environment with the following roles
- dev-server-01: `hello-world`, `hello-world-api`, `hello-world-ui`, and `IIS-Server-2019` roles
- dev-server-02: `hello-world-api` and `IIS-Server-2019` roles
- dev-server-03: `octo-petshop-api` and `IIS-Server-2019` roles

The deployment process from above targets the `hello-world-api` role.  When a deployment to **development** is triggered, Octopus will only select the two servers assigned to **development** AND have the `hello-world-api` role.

:::figure
![Octopus selecting deployment targets](/docs/getting-started/best-practices/images/selecting-target-roles.png "width=500")
:::

:::div{.hint}
Assigning multiple roles to a deployment step results in an OR statement.  For example, adding `octo-petshop-api` to the deployment process and deploying to **development** will result in the filtering logic to be: 

All servers in the **development** AND the servers who have the roles `hello-world-api` OR `octo-petshop-api`.  

For the software developers you can rewrite that sentence as:

`If (server.Environment == "development" && (server.Role == "hello-world-api" || server.Role == "octo-petshop-api"))`

Using the example from above, Octopus would select all three servers.
:::

## Environment and Role Usage Differences

Environments are designed as a macro grouping of deployment targets meant for use across multiple projects, library sets, and more.  Below is a list of items where environments are used:

- Lifecycles
- Project Variable scoping
- Library Set Variable scoping
- Log filtering
- Tenant variable scoping
- Accounts
- Certificates
- Deployment targets
- Process step scoping (only run a step on a specific environment)

Target roles are designed as a micro grouping of deployment targets meant to deploy a specific project or application component.  Below is a list of items where roles are used:

- Project Variable scoping
- Process step scoping (run this step for specific environments)

:::div{.hint}
A deployment target can be assigned to 1 to N environments and 1 to N roles.  
:::

## Environments

Adding an environment is a non-trivial task, as it involves adding/updating additional deployment targets, variable scoping, lifecycles accounts, certificates, and more.  There is a direct correlation between a high number of environments and poor maintainability, usability, and performance.  

Our recommendations for environments are:
- Keep the number of environments per space to be between 2 and 20.  
- Name environments to match your company's terminology so you can re-use them across projects.  Common names include **development**, **test**, **QA**, **acceptance**, **uat**, and **production**.
- If you have between one and five data centers (including cloud regions), it's okay to have an environment per data center.  For example, **Production - AU** for a data center in Australia and **Production - Central US** for the Azure Central US region. If you have more than five data centers, consider [tenants](/docs/tenants) where each data center is a tenant.
- It's okay to have team-specific environments, similar to data center environments.  Although if you have more than five or six teams, consider [tenants](//docs/tenants/) where each team is a tenant.

Anti-patterns to avoid are:
- Project names in your environments.  An environment name of **QA - OctoPetShop** indicates you need to either have more specific roles on your targets or you need to leverage spaces to isolate that application.  Project-specific environments are a good indicator to consider [spaces](/docs/administration/spaces).  
- Branch names in your environment names.  Consider using temporary [tenants](/docs/tenants) for your branch names or storing your branch name in a pre-release tag in the release version.
- A single deployment environment, **production**.  You should have at least one test environment to test and verify your release.

## Roles

There is also a direct correlation between generic roles, such as `web-server` and the number of environments.  As stated earlier, adding an environment is a non-trivial task, and leads to maintenance and performance overhead.  The goal is to keep the number of environments low.

Using the generic role `web-server` will pick all the servers in a specific environment.  For example, you have 25 servers in **production** with the role `web-server`.  When you deploy to **production**, Octopus will pick all 25 servers, but you only want to deploy to 4 of them.  There is no automatic way to limit the servers picked without either creating a specific role `hello-world-api` or creating a new environment.

Generic roles also impact your future flexibility.  For example, using `web-server` for 100 projects would require all targets on all environments to host those same 100 projects.  If you were to decide in six months to split up those servers, you'd have to update over 100 projects.

Our recommendations for target roles are:
- Avoid generic roles, such as `web-server`, whenever possible.
- Use specific target roles, `hello-world-api`, to uniquely identify a project and component to deploy.  Use those specific target roles in your deployment process.
- Use architecture and platform-specific target roles, for example, `IIS-Server-Windows-2019`.  Use those target roles for everyday maintenance tasks; updating to the latest version of Node.js, or installing a patch.

:::div{.hint}
Add an environment for a business need; a new data center is brought online, you are adding your disaster recovery location into Octopus, or adding the ability for customers to test changes prior to **production**.  

Add a new role to group servers and filter servers within each environment.
:::

## Further reading

For further reading on environments, deployment targets, and roles in Octopus Deploy please see:

- [Deployment Targets](/docs/infrastructure/deployment-targets)
- [Environments](/docs/infrastructure/environments)
- [Target Roles](/docs/infrastructure/deployment-targets/#create-target-roles)

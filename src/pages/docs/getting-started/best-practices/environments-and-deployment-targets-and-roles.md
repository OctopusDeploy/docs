---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-02-18
title: Environments, Deployment Targets, and Target Tags
description: Guidelines and recommendations for configuring environments, deployment targets, and lifecycles in Octopus Deploy.
navOrder: 30
hideInThisSection: true
---

[Deployment targets](/docs/infrastructure/deployment-targets/) are what Octopus Deploy deploys to.  They can be Windows servers, Linux servers, Kubernetes (K8s) clusters, Azure Web Apps, and more.  Please refer to the [Deployment targets](/docs/infrastructure/deployment-targets/) for an up to date list on deployment targets.  [Environments](/docs/infrastructure/environments) are how you organize your deployment targets into groups that represent different stages of your deployment pipeline.  These stages are typically given names such as **development**, **test**, and **production**.  Target tags are a filter to select specific deployment targets in an environment.

## Deployment Target, Environment, and Target Tag relationship \{#deployment-target-environment-and-role-relationship}
Environments are how you group deployment targets in a stage in your deployment pipeline.  Target tags are how you identify which deployment targets you wish to deploy to in that specific stage.

When you register a deployment target, you must provide at least one environment and one target tag.

:::figure
![Environments and target tags for a deployment target](/docs/getting-started/best-practices/images/registering-deployment-target.png)
:::

In the deployment process, you assign steps to run on deployment targets with specific target tags.

:::figure
![Deployment process target tag assignment](/docs/getting-started/best-practices/images/target-roles-in-deployment-process.png)
:::

For example, imagine you have three deployment targets in the **development** environment with the following target tags:
- dev-server-01: `hello-world`, `hello-world-api`, `hello-world-ui`, and `IIS-Server-2019` tags
- dev-server-02: `hello-world-api` and `IIS-Server-2019` tags
- dev-server-03: `octo-petshop-api` and `IIS-Server-2019` tags

The deployment process from above targets the `hello-world-api` tag.  When a deployment to the **development** environment is triggered, Octopus will only select the two servers assigned to the **development** environment AND with the `hello-world-api` target tag.

:::figure
![Octopus selecting deployment targets](/docs/getting-started/best-practices/images/selecting-target-roles.png)
:::

:::div{.hint}
Assigning multiple target tags to a deployment step results in an OR statement.  For example, adding the target tag `octo-petshop-api` to the deployment process and deploying to the **development** environment will result in the filtering logic to be: 

All servers in the **development** environment AND the servers with the target tags `hello-world-api` OR `octo-petshop-api`.  

For software developers, you can rewrite that sentence as:

`If (server.Environment == "development" && (server.TargetTag == "hello-world-api" || server.TargetTag == "octo-petshop-api"))`

Using the example from above, Octopus would select all three servers.
:::

## Environment and Target Tag usage differences \{#environment-and-role-usage-differences}

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

Target tags are designed as a micro grouping of deployment targets meant to deploy a specific project or application component.  Below is a list of items where tags are used:

- Project Variable scoping
- Process step scoping (run this step for specific environments)

:::div{.hint}
A deployment target can be assigned to 1 to N environments and 1 to N target tags.  
:::

## Environments

Adding an environment is a non-trivial task, as it involves adding/updating additional deployment targets, variable scoping, lifecycles accounts, certificates, and more.  There is a direct correlation between a high number of environments and poor maintainability, usability, and performance.  

Our recommendations for environments are:
- Keep the number of environments per space to be between 2 and 10.  
- Name environments to match your company's terminology so you can re-use them across projects.  Common names include **development**, **test**, **QA**, **acceptance**, **uat**, and **production**.
- If you have between one and five data centers (including cloud regions), it's okay to have an environment per data center.  For example, **Production - AU** for a data center in Australia and **Production - Central US** for the Azure Central US region. If you have more than five data centers, consider [tenants](/docs/tenants) where each data center is a tenant.
- It's okay to have team-specific environments, similar to data center environments.  Although if you have more than five or six teams, consider [tenants](//docs/tenants/) where each team is a tenant.

Anti-patterns to avoid are:
- Project names in your environments.  An environment name of **QA - OctoPetShop** indicates you need to either have more specific target tags on your deployment targets or you need to leverage spaces to isolate that application.  Project-specific environments are a good indicator to consider [spaces](/docs/administration/spaces).  
- Branch names in your environment names.  Consider using temporary [tenants](/docs/tenants) for your branch names or storing your branch name in a pre-release tag in the release version.
- A single deployment environment, **production**.  You should have at least one test environment to test and verify your release.

## Target Tags \{#roles}

There is also a direct correlation between generic target tags, such as `web-server` and the number of environments.  As stated earlier, adding an environment is a non-trivial task, and leads to maintenance and performance overhead.  The goal is to keep the number of environments low.

Using the generic target tag `web-server` will pick all the servers in a specific environment.  For example, you have 25 servers in **production** with the tag `web-server`.  When you deploy to **production**, Octopus will pick all 25 servers, but you only want to deploy to 4 of them.  There is no automatic way to limit the servers picked without either creating a specific tag `hello-world-api` or creating a new environment.

Generic target tags also impact your future flexibility.  For example, using `web-server` for 100 projects would require all targets on all environments to host those same 100 projects.  If you were to decide in six months to split up those servers, you'd have to update over 100 projects.

Our recommendations for target tags are:
- Avoid generic tags, such as `web-server`, whenever possible.
- Use specific tags, `hello-world-api`, to uniquely identify a project and component to deploy.  Use those specific tags in your deployment process.
- Use architecture and platform-specific tags, for example, `IIS-Server-Windows-2019`.  Use those tags for everyday maintenance tasks; updating to the latest version of Node.js, or installing a patch.

:::div{.hint}
Add an environment for a business need; a new data center is brought online, you are adding your disaster recovery location into Octopus, or adding the ability for customers to test changes prior to **production**.  

Add a new target tag to group servers and filter servers within each environment.
:::

## Further reading

For further reading on environments, deployment targets, and target tags in Octopus Deploy please see:

- [Deployment Targets](/docs/infrastructure/deployment-targets)
- [Environments](/docs/infrastructure/environments)
- [Target Tags](/docs/infrastructure/deployment-targets/#create-target-roles)

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-08-27
title: Sync multiple instances
description: How to keep two or more Octopus Deploy instances in sync.
navOrder: 45
hideInThisSection: true
---

Syncing instances involves copying projects and all required scaffolding data between Octopus Deploy instances with different environments, targets, tenants, or even variable values.  Each instance has a separate database, storage, and URL.

Keeping multiple instances in sync is a complex task involving dozens if not hundreds of decisions across all the projects.  This guide will walk you through suitable scenarios, unsuitable scenarios, tooling available, and how to design a syncing process.  

:::div{.problem}

TL;DR; copying projects between instances should be done when all other options have been exhausted.  There is no provided tooling to support syncing instances with different environments, tenants, or variable values.  Due to the number of decisions and business rules, you will have to create and maintain a custom syncing process.  Before making this decision, reach out to [support@octopus.com](mailto:support@octopus.com) to see if there are alternatives.
:::

## Unsuitable Scenarios

We know of a very small subset of customers who have successfully split their instances and sync between the processes between them.  Almost universally those customers started on older versions (pre-2021) and did so to address limitations of Octopus Deploy at that time.  Today, the most common scenario we hear for splitting an instance is:

- An instance per environment for example one instance in **Development**, another in **Test**, and another in **Production**.  
- Releases are promoted between environments. For example, a release starts in the **Development** instance, is promoted to the **Test** instance, and finally the **Production** instance.

Typically the concerns are:

- Approval process for any changes to the deployment process.
- Separate VLANs or networks for each environment.
- Specific steps are included for every **Production** deployment.

Octopus Deploy includes functionality to mitigate those concerns.  That enables large banks, hospitals, retail companies, software vendors, insurance agencies, and government clients to have all environments on the same instance.

Other unsuitable use cases for splitting instance include:

- You want to move a project from the default space to another space on the same instance (or different instance).  Please see our documentation on our [Export/Import Projects feature](/docs/projects/export-import).
- You want to create a test instance to test out upgrades or try out new processes.  Please see our guide on [creating a test instance](/docs/administration/upgrading/guide/creating-test-instance)
- You want to upgrade the underlying VM hosting Octopus Deploy from Windows Server 2012 to Windows Server 2019.  Please see our guide on [moving the Octopus Server](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-server).
- You want to move the SQL Server database from SQL Server 2012 to SQL Server 2019.  Please see our guide on [moving the Octopus Database](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-server).
- You want to migrate from self-hosted Octopus to Octopus Cloud.  Please see our [migration guide](/docs/octopus-cloud/migrations/) on how to leverage the [Export/Import Projects feature](/docs/projects/export-import) to accomplish this.
- You want to consolidate multiple Octopus Deploy instances into a single Octopus Deploy instance.  Please see our documentation on our [Export/Import Projects feature](/docs/projects/export-import).

## Suitable scenarios  

With the capabilities available in Octopus Deploy today, the only suitable scenarios for splitting an instance and syncing them are true "air-gapped" networks.  

For example:

- A primary **Dev/Test/Staging/Production** instance running on a public cloud (e.g. Azure) with an isolated **Production** only instance for a set of targets hosted in a government cloud (e.g. Azure Gov).
- Same scenario as above, but using multi-tenancy.  The primary instance and isolated instance have different tenants and targets.

In both scenarios:

- Both instances have a **Production** environment.
- The same application is hosted in multiple **Production** environments.
- A new release is created in the isolated instance to deploy those **Production** targets.

The expectation is the source instance is the source of truth and the destination instance(s) contain copies of that data.  The syncing process will run periodically to ensure changes made on the source instance are added to the destination instance.

:::div{.hint}
If you wish to do a one-time split of an instance and have no desire to keep anything in sync afterwards, then we recommend the [Export/Import Projects](/docs/projects/export-import) feature.  
:::

## Avoiding syncing multiple instances

The syncing process is complex an requires constant care and maintenance.  Even if we provided a built-in tool, you'd still need to monitor and maintain the process.

:::div{.hint}
We've been asked if splitting environments, tenants or deployment targets by space is a safer alternative.  [Spaces](/docs/administration/spaces) are hard walls and do not allow the sharing of environments, projects, variable sets, step templates, script modules, deployment targets and more.  For all intents and purposes, a space is a unique instance.  Any problems you encounter when syncing instances will happen when trying to sync spaces.
:::

### Built-in role-based access control

Octopus Deploy provides fine-grained RBAC controls to allow for these common compliance scenarios:

- Developers can modify the deployment process, deploy to **Development**, **Test**, and **Staging** but not **Production**.
- System admins can modify deployment targets in Octopus and deploy to **Production**, but cannot modify a deployment process.
- An engineering team is permitted to modify the set of projects they own.  All other projects are read-only.
- Release managers can modify the variables on a set of tenants assigned to them.  All other tenants are read-only.

### Development, Testing, and Production targets connecting to the same Octopus instance

Often **Development**, **Testing**, **Staging** and **Production** deployment targets are hosted in isolated networks or VLANs.  This presents two concerns:

1. A single instance requires at least three cross-boundary connections.  
2. It's possible misconfigure a **Development** deployment target for **Production** or vice versa.

To mitigate cross-boundary connections:

- Host Octopus Deploy in a "neutral" internal network.  
- Have a worker pools for each environment's network.  Those worker pools can only see the "neutral" network and targets in their environment.  
- Create a [variable set](/docs/projects/variables/library-variable-sets), a worker pool variable, and scope each environment's worker pool to the appropriate environment.

To mitigate misconfigurations, leverage Octopus Deploy's built-in RBAC controls.  A person lacking **Production** permissions cannot add a new **Development** deployment target to **Production**.  They can only add and edit targets in environments where they have permissions.

To mitigate misconfigurations:

- A deployment targets using scripts instead of using the Octopus Deploy UI.
- Use an API Key or Token of a [service account](/docs/security/users-and-teams/service-accounts) scoped to specific environments.
- Limit who can modify deployment targets in all environments to a centralized administration team.

### Approval process

If an approval is required for any deployment process going to **Production** then use [config as code feature](/docs/projects/version-control) as that integrates with git, which allows for branching and pull requests.  The main or primary branch is restricted from direct edits.  All changes to the deployment process are done in a branch and merged via a pull request.  

### Standards and Compliance

Requiring specific steps and ITSM approval is very common.  A separate **Production** instance that is "locked down" where only a handful of people can change the deployment process is no longer necessary with addition of Platform Hub.  

- [Process templates](/docs/platform-hub/templates/process-templates) enables centralized teams to create reusable sets of deployment steps that can be shared across multiple spaces in Octopus Deploy.
- [Project templates](/docs/platform-hub/templates/project-templates) enables centralized teams to create compliant reusable project blueprints that teams can use as a starting point for new projects. Teams supply the required parameter values but can't modify the deployment process.
- [Policies](/docs/platform-hub/policies) ensure required steps and templates are present along with ITSM approval.  They will fail any deployment that attempts to start that is noncompliant.

### Performance improvement

The final reason we hear about is to "speed up the deployment."  We typically hear this when Octopus is located in one data center and deployment targets are located in a data center in another country or continent.  That can lead to long package acquisition from the built-in repository and latency.

- If package acquisition is taking a long time to transfer to the targets, consider:
    - Enabling [delta compression for package transfers](/docs/deployments/packages/delta-compression-for-package-transfers) to reduce the amount of data to transfer.  
    - Leveraging an external feed such as Artifactory, GitHub Packages, AWS CodeArtifact, or Feedz.io and configure Octopus to download the packages directly from the external feeds.
- If there appears to be latency when running scripts on the Octopus Server to make database changes, run e2e tests, or any other similar task, then leverage [workers](/docs/infrastructure/workers).  Workers can execute tasks that don't need to run on individual deployment targets.  They can be located in the same data center as your database or applications.

## Syncing is not cloning

Syncing is not the same as cloning.  Cloning an instance will result in an exact replica (or copy) of data from the source.  In addition to having all the same targets, environments, variables, tenants, projects, etc., the unique identifiers stored in the Octopus database will be the same; including the Server thumbprint and database master key.  Cloning is typically a one-time operation, such as standing up a new server.  

Syncing instances involves copying projects and all required scaffolding data between Octopus Deploy instances with different environments, accounts, lifecycles, targets, tenants, or even variable values.  Each instance will have different ids, Server thumbprint, and database master key.

## Tools and features to avoid

Unfortunately, there is not first-class tooling available to support syncing two instances, due to the many decisions and business rules when working with different environments, tenants, variable values, etc.  In the past, our users have attempted to repurpose provided features and tooling to support their syncing process.  However, they were not designed for syncing use cases; the result was often frustration because of lack of customization, or hand editing files causing corrupted projects.

### Migrator and Export/Import Project

The [Migrator](/docs/administration/data/data-migration/) and the [Export/Import Project](/docs/projects/export-import) feature were designed to migrate or clone a project to another instance (or space for Export/Import Project).  The primary use case for both tools is that a user wants to move a project to a new instance and deprecate the older instance.  For example, when migrating from a self-hosted Octopus Server to Octopus Cloud.

The Migrator and Export/Import Project feature can be run multiple times for the same project.  But they will ensure the source and destination instances match.  There is no way to exclude specific environments, tenants, or any specific data you wish to keep separate.  While it is possible to modify the JSON exported by those tools, such an approach is error-prone and unsupported.  

### Config as Code

Terraform uses Hashicorp Configuration Language or HCL.  The [Config as Code feature](/docs/projects/version-control) uses Octopus Configuration Language (OCL) and that is based on HCL.  To sync instances using these features, you'd need to use a comparison tool such as Beyond Compare to move changes between instances manually.  Anything manual is error-prone and will eventually fail.

You can write a tool to compare files between instances automatically and make the necessary modifications, but you'll be responsible to modify that tool if and when we add or remove properties in the OCL files.

## Tooling to use

We recommend creating a custom tool that leverages:

- The [Octopus Terraform Provider](https://registry.terraform.io/providers/OctopusDeploy/octopusdeploy/latest) to store the desired state of the deployment process and other Octopus resources in git.
- Or, the [Octopus Deploy REST API](/docs/octopus-rest-api), or one of the API wrappers, such as the [Octopus.Client .NET library](https://github.com/OctopusDeploy/OctopusClients), [Octopus Go API Client](https://github.com/OctopusDeploy/go-octopusdeploy), or the [TypeScript API Client](https://github.com/OctopusDeploy/api-client.ts).  

If you opt to use the API, the Octopus team has written a sample PowerShell tool, [SpaceCloner](https://github.com/OctopusDeployLabs/SpaceCloner).  You can use it as a reference or example for your syncing process.  Keep in mind to use it as a reference as it was created with specific use cases in mind and probably won't support your hyper-specific use case.

Each new major/minor release of Octopus Deploy will require significant testing of your syncing process.  Along with fixing any bugs found because of an unexpected edge case.\

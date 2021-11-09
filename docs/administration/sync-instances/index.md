---
title: Sync instances
description: How to keep 2 or more Octopus Deploy instances in sync.
position: 45
hideInThisSection: true
---

Syncing two or more Octopus Deploy instances is not an trivial task as there are several items to consider.  This section will guide you through the necessary steps to sync multiple Octopus Deploy instances.

## Use Cases

This guide assumes you are attempting one of these use cases.  

- You want to create a separate **Dev/Test** instance and a **Staging/Production** instance.  A release starts in Dev/Test and moves to Staging/Production.  You want the deployment process (and a few other items) to be kept in sync.
- You have a "main" Dev/Test/Staging/Production instance, but need an isolated **Production** instance for a set of tenants/targets due to regulations or business contracts.  The main instance is the truth center, the other **Production** instance is a clone with a few minor differences. 
- You need to have multiple **Production** instances, one for each data center/region.

In a nutshell, you have 2 or more instances you want to keep in sync, but each instance will have different variable values, lifecycles, tenants, targets, and more.  You want to keep the deployment process, runbooks, and unscoped variables in sync.

### Use Cases solved by other tooling

This guide will not cover all use cases.  The below use cases are solved with different tooling / guides available.

- You want to create a test instance to test out upgrades or try out new processes.  Please see our guide on [creating a test instance](/docs/administration/upgrading/guide/creating-test-instance.md)
- You want to upgrade the underlying VM hosting Octopus Deploy from Windows Server 2012 to Windows Server 2019.  Please see our guide on [moving the Octopus Server](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-server.md).
- You want to move the SQL Server database from a SQL Server 2012 to SQL Server 2019.  Please see our guide on [moving the Octopus Database](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-server.md).
- You want to migrate from self-hosted Octopus to Octopus Cloud.  Please see our [migration guide](/docs/octopus-cloud/migrations.md) on how to leverage [Projects Export/Import feature](docs/projects/export-import/index.md) to accomplish this.
- You want to consolidate multiple Octopus Deploy instances into a single Octopus Deploy instance.  Please see our documentation on [Projects Export/Import feature](docs/projects/export-import/index.md).
- You want to move a project from the default space to another space on the same instance.  Please see our documentation on [Projects Export/Import feature](docs/projects/export-import/index.md).

## Syncing is not cloning

Syncing is not the same as cloning.  Cloning an instance will result in the same targets, environments, variables, tenants, projects, etc.  If you wish to clone an instance please either look at our guide on [creating a test instance](/docs/administration/upgrading/guide/creating-test-instance.md), [moving the Octopus Server](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-server.md) or how to leverage the new [Projects Export/Import feature](docs/projects/export-import/index.md).

Based on the use cases above we want to sync a subset of data, not clone all the data.

For example:
- Separate Dev/Test instance and Stage/Prod instance will have different environments, lifecycle phases, retention policies, variable values (and scoping), tenants, and deployment targets to name a few.
- A instance per data center will have different variable values (most likely connection strings), deployment targets, and lifecycle phases.
- Instance to isolate specific tenants will have different tenants and deployment targets.

The reason why you are creating separate instances will have a direct impact on which data to keep in sync and which data to keep different.

## Matching on Names

Each instance of Octopus Deploy will have different IDs for your data.  For example, on one instance the **Production** environment's ID is `Environments-123` while on another instance the ID is `Environments-700`.  Because of that the syncing process will need to match on names.  That means there will be a translation from ID to Name on the source instance to Name to ID on the destination instance.  

:::problem
Once you start syncing instances be very careful about each name change.  A name change will result in a "new" item (such as Environment) getting created as opposed to updating an existing item.
:::

## Octopus Data Structure

Before writing a syncing process you should spend some time learning the data structure within Octopus.  Knowing the data structure and how it all fits together will make the sync process more robust.

### Projects

When we talk to customers who wish to sync their instances they generally mean they want to sync their projects.  The project data you will want to sync between instances is:

- Deployment Process
- Runbooks
- Channels
- Variables
- Settings  

You'll notice releases, deployments, runbook snapshots and runbook runs are not included in that list.  That is because that data _must_ be different per instance.  When you create a release or a snapshot a runbook you are snapshotting the process, variables, and packages as it exists on that instance at that point in time.  You will have different variable values, if not slightly different deployment processes (more on that later).  Syncing a release from one instance to another will result in an inaccurate representation of what was snapshotted.  

Our tooling doesn't allow you to copy deployments or runbook runs.  The syncing process will have to use the Octopus Deploy REST API (or a wrapper such as the Octopus CLI) to create a deployment or runbook run.  If you use the REST API it will create the deployment or runbook run, but it will also execute it.  

### Library Variable Sets

### Tenants

### Scaffolding Data

Octopus Deploy is more than deployment processes, tenants, and variables.  A lot of scaffolding data is needed for everything to properly work.  When syncing multiple instances you'll find it is the scaffolding data that is different.  The scaffolding data is:

- Infrastructure
    - Accounts        
    - Environments
    - Worker Pools        
- Library
    - Packages
    - Certificates
    - External Feeds
    - Lifecycles
    - Script Modules
    - Step Templates    
    - Tenant Tags
- Server Configuration
    - Teams

As stated earlier, all the matching between instances must occur by name.  That includes all the scaffolding data.  However, the details of the scaffolding data do not need to be the same.  For example, imagine you have a deployment process using the worker pool **Ubuntu Worker Pool**.  On one Octopus instance that pool has 5 EC2 instances hosted in the AWS Oregon Region.  On another Octopus instance, a worker pool with the same name exists, but it has 3 EC2 instances hosted in the AWS Ohio region.

Some of that scaffolding data is referenced directly in a deployment process or a variable, such as step template or worker pool.  While other scaffolding data is a indirect reference, such as a script module.  








As stated earlier, syncing is not the same as cloning.  You will need to decide on what data to sync and the data you want to be different.  What makes it difficult is a deployment or runbook process relies on a lot of scaffolding data.  The deployment or runbook process is typically the same across all instances while it is the scaffolding data that is different.

There are two ways scaffolding is referenced, as a single ID or as a list of 1 to N IDs.  For example, you can have a deployment process that runs on a worker pool, which is a stored as a single ID.  Or, a step can be configured to run on 1 to N environments, which stored as list of IDs.  When data stored as a single ID is not found an error will occur on save.  When data stored as a list of IDs is not found the save is permitted but you might encounter unexpected results (a step runs in an environment it shouldn't).

Not all data needs to be an exact 1:1 to match between instances.  For example, a deployment process references an external feed with the name of **External Docker Feed**.  All the instances must have an external feed of **External Docker Feed**, but the URL and credentials used on each instance can be different.  As long as that feed is with that name exists on all instances, everything will work fine.  The same is true for worker pools.  The worker pool can have different workers as long as the same worker pool exists on all instances.  

The scaffolding data and the results of it not existing on all instances are:

- Infrastructure
    - Accounts
        - Variables (project, library variable set, and tenants): Fail on save when no matching account are found.
        - Deployment Targets (K8s and Azure Web App targets): Fail on save when no matching account are found.
    - Environments
        - Accounts: Accounts can be configured to limit access to specific environments.  The account will be available to all environments when no matching environments are found.
        - Certificates: Certificates an be configured to limit access to specific environments.  The certificate will be availiable to all environments when no matching environments are found.
        - Deployment Targets: A deployment target must have at least one environment.  When no matching environments are found the deployment target will be unable to save.
        - Team User Role: The user role for a team can be configured to only apply to specific environments.  The user role for that team will apply to all environments when no matching environments are found.
        - Tenants: Part of the Project/Environment relationship.  Will only be scoped to matching environments.
        - Lifecycles: Used to specify environments for each phase.  Each phase will only apply to environments found.  If no environments are found the phase will be for all remaining environments.  Please note: a lifecycle can only have one phase with no environments.
        - Process Step (both runbook process and deployment process): Environments are scoped to run or skip specific environments.  When no matching environments are found to scope to the step will run on all environments.
        - Variables (project, library variable set and tenants): Environments are scoped to specific environments.  When no matching environments are found the variable will be applicable to all environments.
        - Runbooks: Can limit what environments a run book can run in.  When no matching environments are found the runbook can run in any environment.
    - Worker Pools
        - Deployment Targets (Azure Web App, K8s, Service Fabric) : An optional worker pool is configured to use for health checks for specific target types.
        - 
### Packages

Packages can be large which can take a tremendous amount of time to copy over.  We recommend excluding them from your syncing process and instead do one of the following:

- Switch over to an external feed such as Feedz.io, Artifactory, Azure Artifacts, etc.
- Update your build server integration to push to multiple instances.

### Data not to sync

Not all data should be synced between instances.

**Server Configuration**
The Server Configuration data to avoid syncing is core configuration data that you'll set once and shouldn't touch again.  Being core configuration, the risk is too high to be automatically updated.  An error in the syncing process could cause your instance to not allow people to login or get into a unrecoverable state.

The server configuration to not sync is:
- SMTP Settings
- External Issue Trackers
- Authentication Providers
- Users
- Server Folders
- Subscriptions
- User Roles

**Infrastructure**
High-level infrastructure, such as environments and worker pools should be synced.  Those items are referenced directly by projects.  But think back to why you are creating a separate instance.  A big reason is to isolate your infrastructure.  Any specific infrastructure, such as deployment targets should not be synced.

The infrastructure data to not sync is:
    - Targets
    - Worker
    - Machine Proxies
    - Infrastructure Accounts
 

Outline:
- Introduction -> Why should someone read this guide
- Use Cases -> Dev/Test + Production or split Production Instances
- Data Challenges with Syncing Instances
    - Shared Items
        - Environments
        - Feeds
        - Accounts
        - Lifecycle Phases
        - Certificates
        - Targets
        - Workers
        - Library Variable Sets
        - Step Templates
    - Project Items
        - Deployment Processes
        - Runbooks and Runbook Processes
        - Variables
        - Channels (and their rules)
    - What you shouldn't sync
        - Deployments
        - Releases
        - Users
        - External Auth Providers
        - Server Settings (folders, SMTP, issue tracking integration)
- Tools to Avoid
    - Project export/import
    - Legacy Migrator
- Considerations
    - Encrypted Items
        - Accounts
        - Feed Credentials
        - Sensitive Variables
    - Variables
    - Storing Scripts
    - When to sync
- Options     
    - Terraform Provider (link to guide)
    - Config as Code (link to guide)
    - Rest API (link to guide)
    
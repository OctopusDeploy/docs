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

## Data to Sync

Octopus Deploy is more than a deployment process and variables.  A lot of scaffolding data is needed for everything to properly work.  The syncing process should consider syncing the following data:

- Infrastructure
    - Accounts        
    - Environments
    - Worker Pools        
- Library
    - Certificates
    - External Feeds
    - Lifecycles
    - Script Modules
    - Step Templates   
    - Variable Sets 
    - Tenant Tags
    - Packages
- Server Configuration
    - Space Specific Teams
    - User Roles
- Tenants
- Project Groups
    - Projects
        - Deployment Process
        - Runbooks and Runbook Processes            
        - Variables
        - Channels
        - Settings

In our experience, the scaffolding data, and by extension the variables and steps associated with that data, is what is different between your instances.  

### Scaffolding data that must be an exact match

Some scaffolding data must be an exact match between your instances.  If they aren't an exact match then the deployment or runbook run will either fail or have unexpected results.  That data is:

- Script Modules
- Step Templates
- Tenant Tags
- User Roles

### Scaffolding data with different details

Most of the scaffolding data referenced by your deployment and runbook processes as well as your variables has to exist for everything to work.  For example, if your deployment process references a worker pool with the name **Ubuntu Worker Pool** then all instances have to have that worker pool.  

However, while they have to exist, only the name needs to be the same between instances.  The details can be very different.  Going back to the worker pool example.  One instance could have 5 EC2 instances in the Oregon region while another instance could have 3 EC2 instances in the Ohio region.  As long as the worker pool **Ubuntu Worker Pool** exists in both instances with running workers everything will work fine.

That data is:

- Infrastructure
    - Accounts: Same account type, different credentials           
    - Worker Pools: Different workers
- Library
    - Certificates: same certificate type, different cert
    - External Feeds: same feed type, different credentials
    - Lifecycles: different phases and retention policies
- Server Configuration
    - Space Specific Teams: same user role mapping, different members

### Packages

Packages can be very large; we've seen some that are 1 GB+ in size.  Syncing that much BLOB data between instances can take a tremendous amount of time.  We recommend excluding them from your syncing process and instead do one of the following:

- Switch over to an external feed such as Feedz.io, Artifactory, Azure Artifacts, etc.
- Update your build server integration to push to multiple instances.

## Environments

It is very rare to see _all_ environments synced between instances.  It is either a subet of environments or different environments.  Having a different environment list per instance makes a lot of sense, but it impacts a lot of other data.  

That data includes:

- Accounts
- Certificates
- Deployment and Runbook Steps
- Lifecycles
- Runbooks Scoping
- Tenants
- Team User Role Scoping
- Variables

What makes it even trickier is when data is scoped to two or more of those environments and one of those environments is not included in the sync.  For example, a step is scoped to `Development` and `Test`, but only `Test` is included in the sync.  Should that step be cloned with just `Test` scoped to it?  Should all scoping be removed?  Should it be skipped and not synced over?

## Data Not To Sync

The eagle eyed reader will note the above data is not ALL the data stored in Octopus Deploy is on the list of data to sync.  You should avoid syncing the following data:

- Infrastructure
    - Deployment Targets
    - Workers
    - Machine Proxies
- System Configuration
    - System Settings (server folders, SMTP, etc.)
    - External Auth Providers
    - Issue Trackers
    - Users
    - Subscriptions
    - Spaces
    - System Level Teams
- Projects
    - Releases
    - Deployments
    - Runbook Snapshots
    - Runbook Runs

### Infrastructure

The whole point of having separate instances is to have separate deployment targets and workers.  It doesn't make a lot of sense to sync them.  And for tentacles it'd be a real pain as each tentacle would have to be configured to trust all the instances.

### System Configuration

Items in the system configuration list are generally set once and forget about it.  Or set once and update once a quarter or once a year.  And most of that data requires admin-level permission.  It too risky to include system configuration in a syncing process.

### Projects

:::warning
Do not sync releases, deployments, runbook snapshots or runbook runs.  
:::

When you create a release or a snapshot a runbook you are snapshotting the process, variables, and packages as it exists on that instance at that point in time on that instance.  A deployment or runbook run is using that release or runbook snapshot to perform a set of actions on your deployment targets or workers.

All the use cases for syncing an instance has different environments.  You can scope environments to steps in runbooks and deployment processes as well as variables.  Any release or runbook snapshot synced from one instance to another would be innaccurate.  The same is true for deployments or runbook runs.  The destination instance is not the instance that originally ran deployment or runbook.  

Besides it is impossible to sync that data without low-level database access.  The syncing process will have to leverage the Octopus Deploy REST API or a wrapper around the API, such as the Octopus CLI.  If you created a release using the Octopus REST API it will snapshot the deployment process, packages, and variables on the instance at that point in time.  Creating a deployment via the REST API will perform a deployment.

## Migrator or Project Export/Import

:::warning
Do not use the [migrator](docs/administration/data/data-migration.md) or the [Project Export/Import](docs/projects/export-import/index.md) feature to sync instances.
:::

The [migrator](docs/administration/data/data-migration.md) and the [Project Export/Import](docs/projects/export-import/index.md) feature were designed to migrate a project to another instance (or space for Project Export/Import).  The primary use case for both of those tools is a user wants to move a project to a new instance and depreciate the older instance.  For example, migrating from self-hosted Octopus Server to Octopus Cloud.

That use case influences how those tools function.  They both will grab all the scaffolding data associated with a project push it to the destination instance.  That includes releases and deployments.  That is because they are moving projects, not keeping them in sync.

In some, but not all cases, existing scaffolding data is left alone.  But other data, specifically environments, must match exactly.  Outside of a few command line switches, you cannot pick and choose which data the tool will move over.  It is extremely difficult to have a Dev/Test instance and a Production instance when using those tools.  Oftentimes, our users resort to modifying the exported JSON files, which increases the likleyhood of a failed import.    
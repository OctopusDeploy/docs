---
title: Sync instances
description: How to keep 2 or more Octopus Deploy instances in sync.
position: 45
hideInThisSection: true
---

We are sometimes asked about standing one or more separate instances, generally due to regulations or company policies, and syncing data between them.  That is not an trivial task as there are several items to consider.  This section will guide you through those items, along with the various pitfalls.

## Use Cases

This section assumes you are attempting one of these use cases.  

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

Syncing is not the same as cloning.  Cloning an instance will result in the same targets, environments, variables, tenants, projects, etc.  It is typically a one-time operation, such as standing up a new server or moving from self-hosted to the cloud.  Syncing an instance involves copying a subset of data multiple times a day/week/month.  That subset of data is different per use case.

- Separate Dev/Test instance and Stage/Prod instance will have different environments, lifecycle phases, retention policies, variable values (and scoping), tenants, and deployment targets to name a few.
- A instance per data center will have different variable values (most likely connection strings), deployment targets, and lifecycle phases.
- Instance to isolate specific tenants will have different tenants, variable values, deployment targets and workers.

:::hint
If you wish to clone an instance please either look at our guide on [creating a test instance](/docs/administration/upgrading/guide/creating-test-instance.md), [moving the Octopus Server](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-server.md) or how to leverage the new [Projects Export/Import feature](docs/projects/export-import/index.md).
:::

### The Migrator and Project Export/Import are cloning tools

:::warning
Do not use the [migrator](docs/administration/data/data-migration.md) or the [Project Export/Import](docs/projects/export-import/index.md) feature to sync instances.
:::

The [migrator](docs/administration/data/data-migration.md) and the [Project Export/Import](docs/projects/export-import/index.md) feature were designed to migrate or clone a project to another instance (or space for Project Export/Import).  The primary use case for both of those tools is a user wants to move a project to a new instance and depreciate the older instance.  For example, migrating from self-hosted Octopus Server to Octopus Cloud.

Because the Migrator and Project Export/Import are cloning tools, they will grab all the scaffolding data associated with a project and copy it to the destination instance.  Some, but not all, existing scaffolding data will be left alone.  But other data, specifically environments, must match exactly.  There is no built-in mechanism for the Migrator or Project Export/Import to pick and choose which scaffolding data to include.  The only way to get that is to modify the exported JSON files, which is both unsupported and extremely error prone.  

### Matching on Names

Because syncing is not the same as cloning, the data in each Octopus Deploy instance will have different IDs.  For example, on one instance the **Production** environment's ID is `Environments-123` while on another instance the ID is `Environments-700`.  The syncing process will need to match on names.  That means there will be a translation from ID to Name on the source instance to Name to ID on the destination instance.  

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

### Scaffolding data that must be an exact match

Some scaffolding data must be an exact match between your instances.  If they aren't an exact match then the deployment or runbook run will either fail or have unexpected results.  That data is:

- Script Modules
- Step Templates
- Tenant Tags
- User Roles

### Scaffolding data with same name but different details

Most of the scaffolding data referenced by your deployment and runbook processes and variables has to exist for everything to work.  For example, if your deployment process references a worker pool with the name **Ubuntu Worker Pool** then all instances have to have that worker pool.  

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

## Different environments between instances

It is very rare to see _all_ environments synced between instances.  It is either a subet of environments or different environments.  Having a different environment list per instance has a large impact as environments are scoped to a lot of different data.   

That data includes:

- Infrastructure
    - Accounts
- Library
    - Certificates
    - Lifecycles
    - Library Variable Set Variables
- Projects
    - Deployment and Runbook Steps
    - Runbooks
    - Project Variables
- Tenants
- Configuration
    - Team User Role Scoping

Most of those items can be scoped to 0 to N environments.  What happens if data is scoped to multiple environments, but only one or two of them is included in a sync?  For example, an infrastructure account can be scoped to `Dev`, `Test`, and `Staging` and the syncing process will only include `Staging`.  Should you include that account, but only have it scoped to `Staging`?  Or, should you manually create a new account on the destination instance with the same name, but different credentials?  There is no right or wrong answer, as each syncing scenario is unique.  

The scenario where instances have completely separate environments is much more complex.  For example, you have a variable value scoped to `Dev` and another scoped to `Test` on one instance.  The other instance only has `Staging` and `Production`.  Obviously, you cannot clone that variable as-is.  But something should be synced, that way you don't miss a variable required by the deployment or runbook process or is used as a config replacement variable.

Most of our users elect not to sync items such as infrastructure accounts, certificates, or lifecycles where _all_ the environments are different.  For example, a certificate is scoped to `Dev` and `Test` and you are only syncing `Staging`.  It doesn't make much sense to sync that certificate.

Not syncing those items has an impact on other data.

- Library
    - Library Variable Set Variables
        - Certificates
        - Accounts
    - Projects
        - Channels
            - Lifecycles
        - Project Variables
            - Certificates
            - Accounts
- Tenants
    - Tenant Variables
        - Certificates
        - Accounts

As you can see, by not including certain environments.

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
- Library
    - Packages

### Infrastructure data to avoid syncing

The whole point of having separate instances is to have separate deployment targets and workers.  It doesn't make a lot of sense to sync them.  Tentacles especially, as each tentacle would have to be configured to trust all the instances.

### System Configuration to avoid syncing

Items in the system configuration list are generally set once and forget about it.  Or set once and update once a quarter or once a year.  And most of that data requires admin-level permission.  It too risky to include system configuration in a syncing process.

### Project data to avoid syncing

:::warning
You cannot (and should not) sync releases, deployments, runbook snapshots or runbook runs.  
:::

When you create a release or a snapshot a runbook you are snapshotting the process, variables, and packages as it exists on that instance at that point in time on that instance.  A deployment or runbook run is using that release or runbook snapshot to perform a set of actions on your deployment targets or workers.

All the use cases for syncing an instance has some difference in either the variables or processes.  For example, environments.  You can scope environments to steps in runbooks and deployment processes as well as variables.  Any release or runbook snapshot synced from one instance to another would be innaccurate as it wouldn't trully represent what is on the destination instance.  The same is true for deployments or runbook runs.  The destination instance is not the instance that originally ran deployment or runbook.  

Besides it is impossible to sync that data without low-level database access.  The syncing process will have to leverage the Octopus Deploy REST API or a wrapper around the API, such as the Octopus CLI, or the Octopus Terraform Provider.  If you created a release using the Octopus REST API it will snapshot the deployment process, packages, and variables on the instance at that point in time.  Creating a deployment via the REST API will perform a deployment. 

### Packages

Packages can be very large; we've seen some that are 1 GB+ in size.  Syncing files of that size between instances can take a tremendous amount of time.  We recommend excluding them from your syncing process and instead do one of the following:

- Switch over to an external feed such as Feedz.io, Artifactory, Azure Artifacts, etc.
- Update your build server integration to push to multiple instances.

## Guides

The data to sync and decisions to make will vary based on your reason for creating separate instances.  This section will walk you through those considerations.
---
title: Sync instances
description: How to keep 2 or more Octopus Deploy instances in sync.
position: 45
hideInThisSection: true
---

Syncing two or more Octopus Deploy instances is one of those is not an trivial task.  There are several items to consider with lots of hidden pitfalls.  This section will guide you through the necessary steps to sync multiple Octopus Deploy instances.

## Use Cases

There are several use cases for creating separate Octopus Deploy instances and wanting to sync them.

- Separation of Concerns: Developers have full control over a Dev/Test instance, while a Staging/Production instance is locked down to a select few individuals.
- Multiple Data Centers: A main "central control" instance with multiple production instances in different data centers around the globe.
- Isolating Tenants: Specific tenants have to be on a separate instance due to contracts or local laws.

:::problem
The process to sync instances will take time to create and manage.  Before embarking on this effort, please be sure to read this entire guide.  If you are unsure, please reach out to your account manager or a customer success manager at [customersuccess@octopus.com](mailto:customersuccess@octopus.com).  
:::

## Syncing is not cloning

Syncing is not the same as cloning.  Cloning an instance will result in the same targets, environments, variables, tenants, projects, etc.  Based on the use cases above, a clone is not appropriate.  A sync will clone a subset of the data.

For example:
- Separate Dev/Test instance and Stage/Prod instance will have different environments, lifecycle phases, retention policies, variable values (and scoping), tenants, and deployment targets to name a few.
- A instance per data center will have different variable values (most likely connection strings), deployment targets, and lifecycle phases.
- Instance to isolate specific tenants will have different tenants and deployment targets.

Why you want to sync will have a direct impact on the data you need to sync and the data that will be different.

## Matching on Names

Each instance of Octopus Deploy will have different IDs for your data.  For example, on one instance the **Production** environment's ID is `Environments-123` while on another instance the ID is `Environments-700`.  Because of that the syncing process will need to match on names.  That means there will be a translation from ID to Name on the source instance to Name to ID on the destination instance.  

:::problem
Once you start syncing instances think very carefully about each name change.  Most likely a name change will result in a "new" item (such as Environment) getting created as opposed to updating an existing item.
:::

## Data to Sync

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
- Library
    - Certificates
    - External Feeds
    - Lifecycles
    - Script Modules
    - Step Templates
    - Variable Sets
    - Tenant Tags
- Tenants
- Project Groups
- Server Configuration
    - Teams

### Required Scaffolding Data

Required scaffolding data is data that has to exist for a succesful save.  

_However_ the data doesn't have to an exact 1:1 match with the source instance.  For example, if your deployment process references an external feed with the name of **External Docker Feed**.  All the instances must have an external feed of **External Docker Feed**, but the URL and credentials used on each instance can be different.  As long as that feed is there, everything will work.

The required data is:
- Infrastructure    
    - Worker Pools    
- Library
    - Certificates
    - External Feeds
    - Lifecycles    
    - Step Templates    
    - Tenant Tags
- Project Groups
- Server Configuration
    - Teams

### Optional Scaffolding Data

Optional scaffolding dta is data that doesn't need to exist for a successful save, but it not being there can lead to interesting results.

For example, if you have one instance with the environments **Development** and **Test** and another instance with **Staging** and **Production**.  Your deployment process on the first instance has a step scoped to **Test**.  Should that step be synced over to the other instance?  

## Project Data



Once that scaffolding data is in place, then you can sync the project over.  Not all the data in the project should be synced over.  The project data to sync is:

- Settings
- Channels
- Variables
- Runbooks
- Runbook Processes
- Deployment Process

But not all project data should be synced, specifically anything related to releases, runbook snapshots, deployments or runbook runs.  When you create a release or a snapshot a runbook you are snapshotting the process, variables, and packages.  At the very least, there are going to be different variable values.  Syncing a release from one instance to another will result in an inaccurate representation of what was snapshotted.  In addition, if you are using the REST API, or a wrapper around the rest api such as the Octo CLI, then it is impossible to sync releases as the release snapshot will be created on any POST to the API.  

Syncing Deployments or Runbook runs while technically possible is not an accurate representation of what happened on each instance.  If you were to sync a deployment from a Dev/Test instance to a Prod instance then whatever you synced is essentially a lie.  That deployment did not happen on that instance.  It won't deploy to the same machines.   If you attempt to re-run it you will never get the same result.

The project data to not sync is:
    - Releases
    - Deployments
    - Runbook Runs
    - Runbook Snapshots  

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
    
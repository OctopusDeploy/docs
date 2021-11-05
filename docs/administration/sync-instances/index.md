---
title: Sync instances
description: How to keep 2 or more Octopus Deploy instances in sync.
position: 45
hideInThisSection: true
---

Syncing two or more Octopus Deploy instances is not an easy task.  There are several items to consider with lots of hidden pitfalls.  This section will guide you through the necessary steps to sync multiple Octopus Deploy instances.

## Use Cases

There are several use cases for creating separate Octopus Deploy instances and wanting to sync them.

- Separation of Concerns: Developers have full control over a Dev/Test instance, while a Staging/Production instance is locked down to a select few individuals.
- Multiple Data Centers: A main "central control" instance with multiple production instances in different data centers around the globe.
- Isolating Tenants: Specific tenants have to be on a separate instance due to contracts or local laws.

:::problem
The process to sync instances will take time to create and manage.  As such, splitting and syncing instances should be done for business reasons, such as industry regulation requirements or corporate policies.  It should not be done as a way to reduce license costs.  You'll end up spending more time in people-hours maintaining the process than the license cost.
:::

## Syncing is not cloning

It is important to note that syncing is not the same as cloning.  Cloning an instance will result in the same targets, environments, variables, tenants, projects, etc.  Based on the use cases above, a clone is not appropriate.  A sync will clone a subset of the data.

For example:
- Separate Dev/Test instance and Stage/Prod instance will have different environments, lifecycle phases, retention policies, variable values (and scoping), tenants, and deployment targets to name a few.
- A instance per data center will have different variable values (most likely connection strings), deployment targets, and lifecycle phases.
- Instance to isolate specific tenants will have different tenants and deployment targets.

As you can see, your reason for splitting the instance will have a direct impact on the data you'll need to sync.

## Data to Sync

An Octopus Project relies on a lot of scaffolding data.  Some of that data directly, for example a step can reference a worker pool, or indirectly, an environment is part of a lifecycle associated with a channel.  That scaffolding data needs to be in place prior syncing projects.

- Infrastructure
    - Environments
    - Worker Pools
    - Machine Policies
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
    
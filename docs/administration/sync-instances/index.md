---
title: Sync multiple instances
description: How to keep 2 or more Octopus Deploy instances in sync.
position: 45
hideInThisSection: true
---

Syncing instances is when one or more projects appear on more than one Octopus Deploy instance with some delta between instances.  Be it different environments, targets, tenants, or even variable values.  Each instance has its own database, storage, and URL.   Keeping multiple instances in sync is a non-trival task as you will have to design and maintain a syncing process.  That syncing process is complex as it will need to know the data to sync and the data to leave alone.  This guide will walk you through when you should split and sync multiple instances, when you shouldn't, tooling available, and how to design your own syncing process.  

:::warning
TL;DR; splitting an instance and syncing it should be done when all other options are exhausted.  There is no built-in tooling to support syncing instances.  Any sort of syncing process will have to be homegrown.  There are dozens if not hundreds of decisions to make and you will have to maintain the process.  Prior to making this decision, reach out to [customersuccess@octopus.com](mailto:customersuccess@octopus.com) to see if there are alternatives.
:::

## When to split an instance

Only split and sync multiple instances when Octopus lacks a critical feature to satisfy a company policy, industry regulation, or a business contract.  The use cases we've seen in the past are:

- A separate **Dev/Test** instance and a **Staging/Production** instance so developers can have unlimited access to make changes but everything is locked before going into **Production**.
- A primary **Dev/Test/Staging/Production** instance with an isolated **Production Only** instance for a set of targets because of a regulation such as the separate instance must be hosted in Azure Gov.
- A separate instance for a specific set of tenants.  Similar to the above use case, except all the environments are the same, only the tenants are different.

This guide is written for those specific use cases in mind.  

## When not to split an instance

Outside of the above reasons, most other use cases for wanting to split an instance can be solve via other solutions.

- You want an approval process for any changes to your deployment process.  Please see our [config as code feature](/docs/projects/version-control/index.md) as that integrates with git.  
- You want to create a test instance to test out upgrades or try out new processes.  Please see our guide on [creating a test instance](/docs/administration/upgrading/guide/creating-test-instance.md)
- You want to upgrade the underlying VM hosting Octopus Deploy from Windows Server 2012 to Windows Server 2019.  Please see our guide on [moving the Octopus Server](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-server.md).
- You want to move the SQL Server database from a SQL Server 2012 to SQL Server 2019.  Please see our guide on [moving the Octopus Database](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-server.md).
- You want to migrate from self-hosted Octopus to Octopus Cloud.  Please see our [migration guide](/docs/octopus-cloud/migrations.md) on how to leverage [Projects Export/Import feature](docs/projects/export-import/index.md) to accomplish this.
- You want to consolidate multiple Octopus Deploy instances into a single Octopus Deploy instance.  Please see our documentation on [Projects Export/Import feature](docs/projects/export-import/index.md).
- You want to move a project from the default space to another space on the same instance.  Please see our documentation on [Projects Export/Import feature](docs/projects/export-import/index.md).

## Syncing is not cloning

Syncing is not the same as cloning.  Cloning an instance will result in the exact same data.  Not only will all the targets, environments, variables, tenants, projects, etc., be the same, but the unique identifiers stored in the Octopus Database will be the same along with the thumbprint and master key.  Cloning is typically a one-time operation, such as standing up a new server.  

Syncing an instance involves copying data between instances with a known delta.  The delta is typically projects, deployment processes, environments, lifecycles, retention policies, tenants, accounts, workers, targets, or variable values.  Each instance will have different ids in the database as well a different thumbprint and master key.  

## Tools and features to avoid 

The unfortunate truth is there are a lot of decisions and business rules in syncing two instances with a known delta.  In the past our users have attempted to repurpose provided features and tooling to support their syncing process.  However, they were not designed for most syncing use cases.  

### Migrator and Project/Import export.

:::warning
Do not use the [migrator](docs/administration/data/data-migration.md) or the [Project Export/Import](docs/projects/export-import/index.md) feature to sync instances with different environments.
:::

The [migrator](docs/administration/data/data-migration.md) and the [Project Export/Import](docs/projects/export-import/index.md) feature were designed to migrate or clone a project to another instance (or space for Project Export/Import).  The primary use case for both of those tools is a user wants to move a project to a new instance and depreciate the older instance.  For example, migrating from self-hosted Octopus Server to Octopus Cloud.

There is no way to exclude specific environments, tenants, or any other data you wish to keep separate.  While it is possible to modify the JSON exported by those tools, such an approach is error prone and unsupported.  You can use those tools for the initial sync.  But you'll need to perform a lot of clean-up and verification after the fact.  So much so it is better to avoid using either tool altogether when syncing an instance.

### Config as Code and Octopus Terraform Provider

Terraform uses Hashicorp Configuration Language or HCL.  The [Cofig as Code feature](/docs/projects/version-control/index.md) uses Octopus Configuration Language (OCL) and that is based on HCL.  HCL does not support complex logic.  That means you'd need a unique set of files per instance.  To sync instances using these features you'd need to use a tool such as BeyondCompare to manually move changes between instances.  Anything manual is error prone and will eventually fail. 

You could automate the comparison but you'd need a mechanism to compare HCL languages.  In addition, when using the Octopus Terraform Provider, you'd need to consider how to keep the state up to date. 

## Features to use

If you are going to sync two or more instances we recommend creating a custom tool that leverages the [Octopus Deploy REST API](docs/octopus-rest-api/index.md), or one of the wrappers, such as the [Octopus.Client .NET library](https://github.com/OctopusDeploy/OctopusClients), [Octopus Go API Client](https://github.com/OctopusDeploy/go-octopusdeploy), or the [TypeScript API Client](https://github.com/OctopusDeploy/api-client.ts).  

We recommend a custom tool because as you'll soon see, there are a lot of business rules and decisions to make.  Our solutions team has written a sample PowerShell tool, [SpaceCloner](https://github.com/OctopusDeployLabs/SpaceCloner), you can use as a reference or example for your syncing process.  In fact, a lot of this documentation was written using lessons from writing that tool. 

While it supports syncing instances with a known delta we recommend using that tool as a guide.  It was created with specific use cases in mind and probably won't support your hyper-specific use case.

## Syncing Process

While the actual business rules and decisions will vary, the core rules for any syncing process will remain the same.

### Avoid mis-matched versions

It is possible to take a JSON result retrieved via a GET on an instance running 2020.1 and do a POST to an instance running 2021.3.  However, something might have changed between the versions and you'll end up with a dreaded 400 bad request.  The risk of error is directly correlated to the delta between versions.  The greater the delta, the greater the risk.

:::hint
Starting in late 2020 an engineering effort was made to move off of NancyFX to ASP.NET to host the API Controllers.  Since that conversion started missing or additional fields that were previously tolerated by the API now cause errors.  If you look at the SpaceCloner code you will see several cases where a "add field if missing" method is called.
:::

The general rule of thumb to follow is don't have the instances more than one minor version apart.  For example, the source instance is running **Octopus 2021.2** and the destination instance is running **Octopus 2021.3**.  Ideally, all instances would be on the same Major.Minor version.  If you run into errors, the typical remediation is to upgrade.

### Data to Sync

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

### Matching by name

Each instance will have different identifiers for projects, step templates, worker pools, etc.  Project "OctoFx" in the Dev/Test instance id could be `Projects-1234` while in the Stage/Prod instance the project id will be `Projects-7789`.  That means all data matching between instances must be done by name.   

What makes that complex is items such as lifecycles, environments, accounts, etc., are referred to by id in projects, deployment process steps, and more.  For example, a project has a default lifecycle.  When syncing that project the process will need to:

1. Translate the lifecycle id on the project to the lifecycle name using data from the source instance.
2. Translate the lifecycle name to the lifecycle id on the destination instance.
3. Update the project's default lifecycle id prior to saving it on the destination instance.

That complexity is further exacerbated by the fact some data is required, for example a project's default lifecycle, while other data is not, for example a step scoped to an environment.

### Syncing Order

In our experience, it is far easier to group data by type and sync them all together.  For example, sync all the Project Groups before syncing Projects.  That requires an order of precidence in syncing due to data dependencies.  That order of precedence is:

- No Dependencies, can be done in any order
    - Environments
    - Project Groups
    - Tenant Tags
    - External Feeds
    - Teams (not any scoped permissions)
    - Machine Policies
    - Worker Pools (not workers)
- Dependencies, order matters
    - Infrastructure Accounts
    - Step Templates
    - Script Modules
    - Lifecycles
    - Tenants (Tenant name only)
    - Workers
    - Targets
    - Certificates
    - Library Variable Sets
    - Projects
        - Project Settings
        - Channels (no channel version rules)
        - Deployment Process
        - Runbooks and Runbook Processes
        - Variables
        - Channel Version Rules
        - Release Version Strategy
        - Auto Release Creation settings
        - Logo
    - Tenants
        - Tenant / Project relationship 
        - Variables
    - Team Permissions

### Data that must be an exact match

The following items must be an exact match between your instances or you will get unexpected results for any deployments or runbook runs.

- Script Modules
- Step Templates
- Tenant Tags

### Data with same name but different details

Most of the data referenced by your deployment and runbook processes and variables has to exist for everything to work.  For example, if your deployment process references a worker pool with the name **Ubuntu Worker Pool** then all instances have to have that worker pool.  

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

### Data to avoid syncing

The eagle eyed reader will note the above list of data items is not ALL the data stored in Octopus Deploy.  You should avoid syncing the following data:

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
    - System Level Teams

One of the major reasons for having separate instances is to isolate deployment targets and workers.  It doesn't make a lot of sense to sync them.  Tentacles especially, as each tentacle would have to be configured to trust all the instances.

Items in the system configuration list are generally set once and forget about it.  Or set once and update once a quarter or once a year.  And most of that data requires admin-level permission.  It too risky to include system configuration in a syncing process.

### Syncing Packages

Packages can be very large; we've seen some that are 1 GB+ in size.  Syncing files of that size between instances can take a tremendous amount of time.  We recommend excluding them from your syncing process and instead do one of the following:

- Switch over to an external feed such as Feedz.io, Artifactory, Azure Artifacts, etc.
- Update your build server integration to push to multiple instances.

### Data you cannot sync

The Octopus Deploy REST API is very powerful, but it has its limits.  It doesn't return sensitive information and it doesn't allow you to modify audit history.  Because of that, you cannot sync:

- Sensitive Data
    - Sensitive Variables
    - External Feed Credentials
    - User Passwords
    - Infrastructure Account Credentials
- Audit Data
    - Releases
    - Runbook Snapshots
    - Deployments
    - Runbook Runs

The audit data limitation is due to how Octopus Deploy works.  The release endpoint accepts a POST command, but as part of the process of creating a release the variables, package versions and deployment process is snapshotted at that point in time, on that instance.  That prevents the ability to sync a release created six months ago via the Octopus Deploy REST API.  If you did, it wouldn't use the variables and deployment process from six months ago, it would use the variables and deployment process as it exists right now on the destination instance.

A deployment, and runbook run, have the same limitation.  Issuing a POST command to those endpoints will trigger a deployment or a runbook run.  You cannot copy the task history, artifacts, or any task logs via the Octopus Deploy REST API.  That is because that deployment or runbook run you are attempting to clone _did not happen_ on the destination instance, only the source instance.  

## Challenges with different environments

There are three use cases you'll encounter with different environments.  

- The destination instance has a subset of environments of the source instance.  For example, **Dev/Test/Staging/Production** on the source instance and **Staging/Production** on the destination.  
- The destination and source instance have a different set of environments.  For example, **Dev/Test** on the source instance and **Staging/Production** on the destination.
- It is a combo of both use cases.  For example, **Dev/Test/Staging** on the source and **Staging/Production** on the destination. 

In all the use cases, one or more environments is excluded from the syncing process.  Before jumping into the challenges that causes, consider all the places an environment is used.

- Infrastructure
    - Accounts
    - Deployment Targets    
- Library
    - Certificates
    - Lifecycles
    - Library Variable Sets
- Tenants
- Projects
    - Channels
    - Deployment Process Steps
    - Runbook Process Steps
    - Variables

### Lifecycles and Channels

Different environments per instance mean different lifecycles, which can mean different channels.  Channels can be scoped to deployment process steps and variables.

In all of those use cases you'll have to answer:
- Which lifecycles should be cloned?  All of them?  Some of them?
- Lifecycles being cloned
    - Should the phases be included or excluded?  
    - Is it better to clone an "empty" lifecycle and fill out the phases yourself?
- Lifecycles not being cloned
    - Every project has a default lifecycle, if the lifecycle isn't being cloned should the sync fail or should it revert to the default lifecycle?
    - Lifecycles are referenced by channels, should those channels be excluded or should they revert to the default lifecycle?
        - Channels can be scoped to deployment process steps and variables
            - Should the deployment process steps scoped to excluded channels be excluded or included?
            - Should the variable values scoped to channels be excluded, included, or set to a default value?

### Tenants

In Octopus Deploy a is tied to both a Project and 1 to N environments.  Instances 

Should a customer tenant appear in both the Dev/Test instance as well as a Staging/Production instance.  It might not be a simple yes and no.  We've seen several customers who have "test tenants" that appear in all environments.  While other tenants are only associated with Staging/Production.  

### Deployment and Runbook Processes

Imagine you have a manual intervention step on your Dev/Test instance scoped to `Test`.  It pauses a deployment so the QA team can review the newly deployed release prior to starting their integration tests.  Should that step be included with the sync to the Staging/Prod instance?  There are valid use cases for both yes and no.

1. Yes, QA runs integration tests in `Staging`.  It should be cloned, but scoped to run in `Staging`.
2. No, QA only runs integration tests in `Test`.  
3. Yes, QA needs to sign-off on each release prior to promoting to `Production`.  It should be cloned, but scoped to only run in `Staging`.
4. Yes, QA needs to sign-off on each release in each environment after `Development`.  It should be cloned, but configured to run in any environment.

For deployment processes you can also scope steps to channels.  Imagine you had a `Dev only` Channel pointed to a lifecycle with only `Development` as the environment.  In your deployment process you have a step that runs the `Run a Runbook` step template to call a runbook to spin up a temporary database that is scoped to the `Dev only` Channel.  You don't plan on syncing that channel over.  Should you skip syncing that step as well?  It would make sense as that is functionality only associated with the `Development` environment.

### Accounts and Certificates

Both accounts and certificates can be scoped to specific environments.  When an account or certificate is for Dev/Test only it doesn't make much sense to sync between instances.  However, both accounts and certificates can be tied to variables or used directly in deployment or runbook process steps.  You have a few options:

- Syncing processes have to match items by name, create an account and certificate with the same name, but different details.  This way you don't have to modify any variables or processes.
- Completely different accounts and certificates with the same variable name but associated with values.  If you have any processes directly referencing an accounts or certificates they need to be changed to use variables instead.

### Variable Scoping
Variables are much more complex than the Deployment and Runbook processes.  Imagine you had the following variables on your Dev/Test instance.

| Variable Name             | Value        | Scope       |
| ------------------------- | ------------ | ----------- |
| Application.Database.Name | OctoFx-Dev   | Development |
|  | OctoFX-Test  | Test        |
| ConnectionString          | Database=#{Application.Database.Name} | |

Syncing `ConnectionString` as-is to the Staging/Production instance makes a lot of sense as it has no scoping.  You'll obviously need to sync over the variable `Application.Database.Name` as `ConnectionString` references it.  But what about the values?  Those values are clearly tied to a specific environment.  

If your Staging/Prod instance have different values per environment then clone the values as is and exclude scoping.  Edit the values after the sync.  The initial sync would look like this:

| Variable Name             | Value        | Scope       |
| ------------------------- | ------------ | ----------- |
| Application.Database.Name | OctoFx-Dev   | |
|  | OctoFX-Test  |         |
| ConnectionString          | Database=#{Application.Database.Name} | |

If your Staging/Prod instance has the same value in each environment, then clone the variable with place holder text such as "Replace Me" as the value.  The initial sync would look like this:

| Variable Name             | Value        | Scope       |
| ------------------------- | ------------ | ----------- |
| Application.Database.Name | Replace Me   | |
| ConnectionString          | Database=#{Application.Database.Name} | |

That only covers the initial sync.  Recurring syncs will add additional challenges, because you'll need to account both changed and new variables.  The fact a variable can have multiple values, each with different scoping, makes detecting "new" variables complex.  Variables can be scoped to:

- Environments
- Channels
- Process Owner (deployment process or runbooks)
- Deployment Process Steps
- Roles
- Deployment Targets
- Tenant Tags

Some of those items, Tenant Tags, Roles, Process Owner, will be _exactly_ alike between instances.  While other items, Environments, Channels, Deployment Process Steps, Deployment Targets, will be different.  

Imagine the source variables were changed from:

| Variable Name             | Value        | Scope       |
| ------------------------- | ------------ | ----------- |
| Application.Database.Name | OctoFx-Dev   | Development |
|  | OctoFX-Test  | Test        |
| ConnectionString          | Database=#{Application.Database.Name} | |

To this:

| Variable Name             | Value        | Scope       |
| ------------------------- | ------------ | ----------- |
| Application.Database.Name | OctoFx-#{Octopus.Environment.Name}   | |
| ConnectionString          | Database=#{Application.Database.Name} | SQL-Server (role) |
|           | Data Source=#{Application.Database.Name} | Oracle (role) |

The desired end result on the Staging/Production instance will most likely be:

1. Leave `Application.Database.Name` alone.  
1. Add the scoping to `SQL-Server` to the `ConnectionString` variable with the value `Database=#{Application.Database.Name}`.
1. Add an additional `ConnectionString` option with the value set to `Data Source=#{Application.Database.Name}` and the scoping set to `Oracle`.

The decisions you'll need to make are:

- Should you ever overwrite values on the destination instance?
- How to handle scoping mismatches.
    - Options
        - Skip the variable unless the scoping is an exact match.  For example, a variable on Dev/Test is scoped to the role `OctoFX-Web`, any variables with the same name would be ignored unless it is also scoped to `OctoFX-Web`.
        - Skip the variable unless the scoping is a partial match.  For example, a variable is scoped to `Staging` and `Production` on a Dev/Test/Staging/Prod instance.  The other instance only has `Production`.  With this option you'd include that variable value since one of the scoped environments matches.
        - Ignore mismatch.  Clone the value regardless of the scoping.
        - Ignore mismatch on new but leave existing alone.  If the variable is new then ignore the mismatch, but if it is not new then leave everything as is.
    - Potential Scoping Mismatches
        - Environments: guaranteed to be different.
        - Channels: will most likely be different.
        - Process Owners: will be the same (unless runbooks are not synced).
        - Deployment Process Steps: will most likely be the same (depends on the rules for syncing the deployment process)
        - Roles: will be the same.
        - Deployment Targets: guaranteed to be different.
        - Tenant Tags: will most likely be the same.

### Variable Values

So far, the discussion around variables is focused on scoping.  We also have to account for variable values.  A variable can be tied to a worker pool, certificate, and accounts (GCP, Azure, AWS, etc.).  For example, imagine a variable is tied to a certificate scoped to `Development`.  That certificate isn't synced because it is scoped to `Development`.  Do you skip the variable?  Copy it over with an empty value?   
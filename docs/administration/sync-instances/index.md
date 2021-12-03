---
title: Sync multiple instances
description: How to keep two or more Octopus Deploy instances in sync.
position: 45
hideInThisSection: true
---

Syncing instances is when projects appear on more than one Octopus Deploy instance with a delta between instances.  The delta can be different environments, targets, tenants, or even variable values.  Each instance has a separate database, storage, and URL.   

Keeping multiple instances in sync is a non-trivial task as you will have to design and maintain a syncing process.  That syncing process is complex as it will need to know the data to sync and the data to leave alone.  This guide will walk you through when you should split and sync multiple instances, when you shouldn't, tooling available, and how to design a syncing process.  

:::warning
TL;DR; splitting an instance and syncing it should be done when all other options are exhausted.  There is no provided tooling to support syncing instances with different environments, tenants, or variable values.  The syncing process will have to be created by you because of the dozens if not hundreds of decisions to make.  That, in turn, means you will have to maintain the process.  Before making this decision, reach out to [customersuccess@octopus.com](mailto:customersuccess@octopus.com) to see if there are alternatives.
:::

## When to split an instance

Only split and sync multiple instances when Octopus lacks a critical feature to satisfy a company policy, industry regulation, or a business contract.  The use cases we've seen in the past are:

- A separate **Dev/Test** instance and a **Staging/Production** instance so developers can have unlimited access to make changes, but **Production** must be locked down.
- A primary **Dev/Test/Staging/Production** instance with an isolated **Production** only instance for a set of targets because of regulations such as the separate instance must be hosted in Azure Gov.
- A separate instance for a specific set of tenants.  Like the above use case, except all the environments are the same, only the tenants are different.

## Consider alternatives

In our experience, the primary reason for splitting an instance is due to permissions.  Octopus Deploy's Role-Based Access control is robust and supports various use cases.

- Developers can modify the deployment process, deploy to **Development**, **Test**, and **Staging** but not **Production**.
- System admins can modify deployment targets in Octopus, deploy to **Production** but cannot modify a deployment process.
- An engineering team is permitted to modify a small subset of projects.  All other projects are read-only.
- Release managers can modify the variables on a subset of tenants.  All other tenants are read-only.
- An approval process is needed for any changes to the deployment process.  Please see our [config as code feature](/docs/projects/version-control/index.md) as that integrates with git, which allows for branching and pull requests.  

A secondary reason is to "speed up the deployment."  Typically Octopus is located in one data center with the deployment targets in a data center located in another country or continent.  

- If package acquisition is taking a long time to transfer to the targets, consider:
    - Enabling [delta compression for package transfers](/docs/deployments/packages/delta-compression-for-package-transfers.md) to reduce the amount of data to transfer.  
    - Leveraging an external feed such as Artifactory, GitHub Packages, AWS CodeArtifact, or Feedz.io and configure Octopus to download the packages directly from the external feeds.
- If there appears to be latency when running scripts on the Octopus Server to make database changes, run e2e tests, or any other similar task, then leverage [workers](/docs/infrastructure/workers/index.md).  Workers can execute tasks that don't need to run on individual deployment targets.  They can be located in the same data center as your database or applications.

## When not to split an instance

There are alternative solutions for other use cases we've encountered.

- You want an approval process for any changes to your deployment process.  Please see our [config as code feature](/docs/projects/version-control/index.md) as that integrates with git.  
- You want to create a test instance to test out upgrades or try out new processes.  Please see our guide on [creating a test instance](/docs/administration/upgrading/guide/creating-test-instance.md)
- You want to upgrade the underlying VM hosting Octopus Deploy from Windows Server 2012 to Windows Server 2019.  Please see our guide on [moving the Octopus Server](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-server.md).
- You want to move the SQL Server database from SQL Server 2012 to SQL Server 2019.  Please see our guide on [moving the Octopus Database](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-server.md).
- You want to migrate from self-hosted Octopus to Octopus Cloud.  Please see our [migration guide](/docs/octopus-cloud/migrations.md) on how to leverage [Projects Export/Import feature](docs/projects/export-import/index.md) to accomplish this.
- You want to consolidate multiple Octopus Deploy instances into a single Octopus Deploy instance.  Please see our documentation on [Projects Export/Import feature](docs/projects/export-import/index.md).
- You want to move a project from the default space to another space on the same instance.  Please see our documentation on [Projects Export/Import feature](docs/projects/export-import/index.md).

## Syncing is not cloning

Syncing is not the same as cloning.  Cloning an instance will result in the same data.  Not only will all the targets, environments, variables, tenants, projects, etc., be the same, but the unique identifiers stored in the Octopus database will be the same along with the thumbprint and master key.  Cloning is typically a one-time operation, such as standing up a new server.  

Syncing an instance involves copying data between instances with a known delta.  The delta is typically projects, deployment processes, environments, lifecycles, retention policies, tenants, accounts, workers, targets, or variable values.  Each instance will have different ids, thumbprint, and master key.  

## Tools and features to avoid 

Unfortunately, there are many decisions and business rules in syncing two instances with a known delta, and there is no first-class tool to support syncing two instances.  In the past, our users have attempted to repurpose provided features and tooling to support their syncing process.  However, they were not designed for syncing use cases; the result was often frustration or corrupted projects.  

:::warning
Do not use any of the below tools to sync two or more instances with a known delta automatically.
:::

### Migrator and Project Export/Import

The [migrator](docs/administration/data/data-migration.md) and the [Project Export/Import](docs/projects/export-import/index.md) feature were designed to migrate or clone a project to another instance (or space for Project Export/Import).  The primary use case for both tools is that a user wants to move a project to a new instance and depreciate the older instance.  For example, when migrating from a self-hosted Octopus Server to Octopus Cloud.

The migrator and Project Export/Import can be run multiple times, but they will ensure the source and destination instances match.  There is no way to exclude specific environments, tenants, or any specific data you wish to keep separate.  While it is possible to modify the JSON exported by those tools, such an approach is error-prone and unsupported.  

### Octopus CLI

The [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md) includes the [export](/docs/octopus-rest-api/octopus-cli/export.md) and [import](/docs/octopus-rest-api/octopus-cli/import.md) commands.  Those commands are depreciated and should not be used.  

### Config as Code and Octopus Terraform Provider

Terraform uses Hashicorp Configuration Language or HCL.  The [Cofig as Code feature](/docs/projects/version-control/index.md) uses Octopus Configuration Language (OCL) and that is based on HCL.  HCL does not support complex logic.  That means you'd need a unique set of files per instance.  To sync instances using these features, you'd need to use a tool such as Beyond Compare to move changes between instances manually.  Anything manual is error-prone and will eventually fail. 

You can write a tool to compare files between instances automatically.  It would need to follow a lot of the same rules detailed below.

## Tooling to use

We recommend creating a custom tool that leverages the [Octopus Deploy REST API](docs/octopus-rest-api/index.md), or one of the API wrappers, such as the [Octopus.Client .NET library](https://github.com/OctopusDeploy/OctopusClients), [Octopus Go API Client](https://github.com/OctopusDeploy/go-octopusdeploy), or the [TypeScript API Client](https://github.com/OctopusDeploy/api-client.ts).  

We recommend a custom tool because, as you'll soon see, there are a lot of business rules and decisions to make.  Our solutions team has written a sample PowerShell tool, [SpaceCloner](https://github.com/OctopusDeployLabs/SpaceCloner), you can use as a reference or example for your syncing process.  A lot of this documentation used lessons from writing that tool. 

While the SpaceCloner supports syncing instances with a known delta, we recommend using that tool as a guide.  It was created with specific use cases in mind and probably won't support your hyper-specific use case.

## Syncing Process

While the actual business rules and decisions will vary, the core rules for any syncing process will remain the same.

### Avoid mismatched versions

It is possible to take a JSON result retrieved via a GET request on an instance running 2020.1, make some modifications, and then POST that data to an instance running 2021.3.  There is no guarantee that the data model will be the same between versions.  Something might have changed between the versions, and you'll end up with a dreaded 400 bad request.  The risk of error is directly correlated to the delta between versions—the greater the delta, the greater the risk.

:::hint
In late 2020 an engineering effort was made to move from NancyFX to ASP.NET for the Octopus Deploy API Controllers.  Since that conversion started, missing or additional previously tolerated fields will cause a 400 bad request error.  Looking at the SpaceCloner code, you will see several invocations of an "add field if missing" method because of a model change.
:::

The general rule of thumb is don't have instances more than one minor version apart.  For example, the source instance runs **Octopus 2021.2**, and the destination instance runs **Octopus 2021.3**.  Ideally, all instances would be on the same Major.Minor version.  If you run into errors, the typical remediation is to upgrade.

### Data to Sync

Octopus Deploy is more than a deployment process and variables.  A lot of scaffolding data is needed for everything to work correctly.  The syncing process should allow for the syncing of the following data:

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
    - Teams
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

Each instance will have different identifiers for projects, step templates, worker pools, etc.  Project "OctoFx" in the source instance can have an id of `Projects-1234` while the destination instance's project id is `Projects-7789`.  That means all data matching between instances must be by name.   

What makes that complex is that items such as lifecycles, environments, accounts, etc., are referred to by id in projects, deployment process steps, and more.  For example, a project has a default lifecycle.  When syncing that project, the process will need to:

1. Translate the lifecycle id on the project to the lifecycle name using data from the source instance.
2. Translate the lifecycle name to the lifecycle id on the destination instance.
3. Update the project's default lifecycle id before saving it on the destination instance.

That complexity is further exacerbated by the fact that some data is required, for example, a project's default lifecycle, while other data is not, for example, a step scoped to an environment.

### Data that must be an exact match

The following items must be an exact match between your instances, or you will get unexpected results, and most likely errors, for any deployments or runbook runs.

- Script Modules
- Step Templates
- Tenant Tags

### Data with the same name but different details

Most of the data referenced by your deployment and runbook processes have to exist for everything to work.  For example, if your deployment process directly references a worker pool with the name **Ubuntu Worker Pool**, all instances have to have that worker pool.  

However, while they must exist, only the name must be the same between instances.  The details can be very different.  The source instance could have 5 EC2 instances for the **Ubuntu Worker Pool**, while the destination instance could have 3 EC2 instances in a different region.  As long as the worker pool **Ubuntu Worker Pool** exists in both instances with running workers, everything will work fine.

The data that must exist but have different details is:

- Infrastructure
    - Accounts: Same account type, different credentials           
    - Worker Pools: Different workers
    - Machine Policies: Different health check frequency, tentacle, and calamari update settings
- Library
    - Certificates: same certificate type, different cert
    - External Feeds: same feed type, different credentials
    - Lifecycles: different phases and retention policies
- Server Configuration
    - Teams: user role mapping, different members
- Project Groups: You don't have to sync all the projects in a project group; only the project group has to exist.

It is possible to leverage variables instead of directly referencing that data in a deployment or runbook process.  As long as the variable exists, is the correct type, and is assigned to something that exists on the deployment target, the deployment process will work.  For example, if you had a variable `Project.AWS.Account`, it is assigned to `Dev/Test Account` on the source instance, but it is assigned to `Staging/Prod Account` on the destination instance, everything will work fine. 

Items that can be variables are:
- Infrastructure
    - Accounts
    - Worker Pools
- Library
    - Certificates

### Data to avoid syncing

The eagle-eyed reader will note that the above list of data items is not ALL the data stored in Octopus Deploy.  You should avoid syncing the following data:

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

One of the primary reasons for having separate instances is to isolate deployment targets and workers.  It doesn't make much sense to sync them.  Tentacles especially, as each tentacle would have to be configured to trust all the instances.

Items in the system configuration list are set and forget.  Or, set once and update once a year.  Most of that data requires admin-level permission.  It is too risky to include system configuration in a syncing process.

### Syncing Packages

Packages size can be substantial; we've seen some that are 1 GB+ in size.  Syncing files of that size between instances can take a tremendous amount of time.  We recommend excluding them from your syncing process and instead do one of the following:

- Switch over to an external feed such as Feedz.io, Artifactory, Azure Artifacts, etc.
- Update your build server integration to push to multiple instances.

### Syncing Order

In our experience, it is far easier to group data by type and sync them all together.  For example, sync all the Project Groups before syncing Projects.  That requires an order of precedence in syncing due to data dependencies.  That order of precedence is:

- No Dependencies, can be done in any order
    - Environments
    - Project Groups
    - Tenant Tags
    - External Feeds
    - Teams (exclude any scoped permissions on creation)
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

### Data you cannot sync

The Octopus Deploy REST API is powerful, but it has its limits.  It doesn't return sensitive information or allow you to modify audit history.  Because of that, you cannot sync:

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

The sensitive data limitation is for security reasons.  Decrypting and returning that data via the API has never been built into Octopus Deploy.  We have considered it, but there are several security concerns, and we'd want to ensure they were all met or mitigated.

The audit data limitation is due to how Octopus Deploy works.  The release endpoint accepts a POST command.  In addition to creating a release, the variables, package versions, and deployment process is snapshotted using data as it exists at that exact point in time.  That prevents the ability to sync a release created six months ago via the Octopus Deploy REST API.  If you did, it wouldn't use the variables and deployment process from six months ago; it would use the variables and deployment process as it exists right now on the destination instance.

A deployment, and runbook run, have the same limitation.  Issuing a POST command to those endpoints will trigger a deployment or a runbook run.  You cannot copy the task history, artifacts, or task logs via the Octopus Deploy REST API.  That is because that deployment or runbook run you are attempting to clone _did not happen_ on the destination instance, only the source instance.

### Keep a log of data to clean-up

The syncing process will encounter data it can't sync precisely because of a limitation, for example, a sensitive variable.  The variable name must exist on both the source and destination instances because it is referenced by the Deployment or Runbook process.  But the value will be different.  If the sensitive variable name doesn't exist on the destination instance, it should create the variable but insert dummy data.  When that occurs, a log entry should be written to know that data needs to be clean-up once the syncing process is complete.

**Please Note:** The syncing process should only do that only for new data.  Any existing data where it can't match and sync exactly should be left alone.  For example, if the sensitive variable already exists on the destination instance. 

### Log everything

Log everything, from API calls, before and after logic gates, to lookups.  There is no such thing as too much logging with a syncing process.  The syncing process is translating JSON data from one instance to another.  You are going to find it fail in strange and unexpected ways.  There are many business rules, meaning there are a lot of potential bugs.

## Handling different environments

There is a ripple effect when the source and destination instance have different environments.  There are three use cases you'll encounter with different environments.  

- The destination instance has a subset of environments of the source instance.  For example, **Dev/Test/Staging/Production** on the source instance and **Staging/Production** on the destination.  
- The destination and source instance has a different set of environments.  For example, **Dev/Test** on the source instance and **Staging/Production** on the destination.
- It is a combo of both use cases.  For example, **Dev/Test/Staging** on the source and **Staging/Production** on the destination. 

One or more environments are excluded from the syncing process in all the use cases.  Consider all the data that can reference and environment:

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

Different environments per instance mean different lifecycles, which can mean different channels, and those can be scoped to deployment process steps and variables.  

Imagine you have two lifecycles on the source instance:

- Default lifecycle with **Development**, **Test**, **Staging** and **Production**.
- QA lifecycle with **Development** and **Test**.

The project you wish to sync also has two channels on the source instance:

- Default channel
- QA channel
    - A manual intervention step is scoped to only run on the QA channel.
    - A variable value is scoped to the QA channel.

The destination instance has **Staging** and **Production**.

It makes sense to include the Default lifecycle and channel and exclude the QA lifecycle and channel in the sync for this scenario.  Excluding the QA lifecycle and channel has a cascading effect.

- What should happen to the manual intervention step scoped to the QA channel?  In this scenario, it makes sense to exclude it.  However, what if the step ran an E2E test that QA wants to run on the other instance?
- What should happen to the variable value scoped to the QA channel?  If the manual intervention step only uses it, it makes sense to exclude it, but if other steps use it, should that value be synced across or something else?

### Tenants

In Octopus Deploy, a Tenant is tied to both a Project and 1 to N Environments.  There are two data items to consider when mixing tenants and environments:
- Not all tenants should be synced between instances.  It is common to have a different list of tenants on each instance.  There could be some overlap (typically with test tenants) or no overlap.  
- The environments a tenant is scoped to for a project affect the Tenant Variables to copy over.

The source instance has **Development**, **Test**, **Staging** and **Production** and the destination instance has **Staging** and **Production**.  You have the Tenant **Internal** tied to all four environments and another tenant **Development Team A** tied to **Development** and **Test** on the source instance.  

For this scenario, should both tenants be cloned?  It makes sense to sync the **Internal** Tenant and tie it to **Staging** and **Production** on the destination instance and not sync **Development Team A**.  For the **Internal** Tenant, should all the variables in **Staging** and **Production** for that Tenant be copied over as well?  Or, should you have to manually enter the values as they'll be different between instances?

### Deployment and Runbook Processes

A common use for environments is to scope them to steps in Deployment and Runbook Processes.  For example, a manual intervention step is scoped to **Test**on the source instance.  That step pauses a deployment so the QA team can review the newly deployed release before starting their integration tests.  Should that step be included with the Staging/Prod instance sync?  There are valid use cases for both yes and no.

- Yes, QA runs integration tests in **Staging**.  It should be cloned but scoped to run in **Staging**.
- No, QA only runs integration tests in **Test**.  
- Yes, QA needs to sign off on each release before promoting to **Production**.  It should be cloned but scoped to only run in **Staging**.
- Yes, QA needs to sign off on each release in each environment after **Development**.  It should be cloned but configured to run in any environment.

### Accounts and Certificates

Both Accounts and Certificates are referenced by variables in either projects or library variable sets.  They can be scoped to environments directly or by environment variable scoping.  

Best practices recommend different AWS, GCP, and Azure accounts per environment or instance.  For example, an AWS account for **Non-Production** workloads and another account for **Production**.
- Certificates can either be a wildcard, for example, `*.octopusdemos.app`, or tied to a specific domain and subdomain, for example, `mail.octopusdemos.app`.  We typically see either a different domain per environment, `testoctopusdemos.app` and `octopusdemos.app` or different subdomains, `test.octopusdemos.app` and `octopusdemos.app`.   

In most cases, it doesn't make much sense to sync Accounts and Certificates.  But the variables referencing the Accounts and Certificates are used in Deployment and Runbook processes.  You have a few options:

- Create an Account or Certificate with the same name on each instance but different details.  You don't have to modify any variables or processes.
- Re-use the same variable name but associate it to different Accounts or Certificates.  The syncing process will only create new variables and insert dummy data.

### Variable Scoping
Syncing variables between instances with different environments is the most complex problem.  Imagine your source instance has **Development** and **Test** while the destination instance has **Staging** and **Production**.  The source instance has the following variables.

| Variable Name             | Value        | Scope       |
| ------------------------- | ------------ | ----------- |
| Application.Database.Name | OctoFx-Dev   | Development |
|  | OctoFX-Test  | Test        |
| ConnectionString          | Database=#{Application.Database.Name} | |

Syncing `ConnectionString` as-is to the destination instance makes much sense as it has no scoping.  You'll need to sync over the variable `Application.Database.Name` as `ConnectionString` references it.  But what about the values?  Those values are tied to environments that do not exist on the destination instance.  

There are a couple of options.  You could clone the variable values as-is with no environment scoping and then change the values after the sync.  That is useful when the destination instance has unique values per environment.  The initial sync would look like this:

| Variable Name             | Value        | Scope       |
| ------------------------- | ------------ | ----------- |
| Application.Database.Name | OctoFx-Dev   | |
|  | OctoFX-Test  |         |
| ConnectionString          | Database=#{Application.Database.Name} | |

The downside to the above option is that you'd need to know which values to clean up.  Another option is to copy the variable name with text indicating that it needed replacing and exclude any scoping.  The initial sync would look like this:

| Variable Name             | Value        | Scope       |
| ------------------------- | ------------ | ----------- |
| Application.Database.Name | Replace Me   | |
| ConnectionString          | Database=#{Application.Database.Name} | |

That only covers the initial sync.  Recurring syncs will add additional challenges because you'll need to account for both changed and new variables.  The fact that a variable can have multiple values, each with different scoping, makes detecting "new" variables complex.  

Variables can be scoped to:

- Environments
- Channels
- Process Owner (deployment process or runbooks)
- Deployment Process Steps
- Roles
- Deployment Targets
- Tenant Tags

Some of those items, Tenant Tags, Roles, Process Owner, will be _exactly_ alike between instances.  While other items, Environments, Channels, Deployment Process Steps, Deployment Targets, will be different.  

Imagine the variables on the source instance were changed from:

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

The desired result on the destination instance will be:

- Leave `Application.Database.Name` alone.  
- Add the scoping to `SQL-Server` to the `ConnectionString` variable with the value `Database=#{Application.Database.Name}`.
- Add an additional `ConnectionString` option with the value set to `Data Source=#{Application.Database.Name}` and the scoping set to `Oracle`.

Variable syncing is so complex because the rules for each project and variable scoping mismatch are different.  The syncing process will need some logic in it that you can configure.

- Should you ever overwrite values on the destination instance?
- How to handle scoping mismatches.
    - Options
        - Skip the variable unless the scoping is an exact match.  For example, a variable on Dev/Test is scoped to the role `OctoFX-Web`; any variables with the same name would be ignored unless it is also scoped to `OctoFX-Web`.
        - Skip the variable unless the scoping is a partial match.  For example, a variable is scoped to **Staging** and **Production** on a source instance with **Dev/Test/Staging/Prod**.  The destination instance only has **Production**.  Include the variable value because it is scope to one of the environments.
        - Ignore mismatch.  Clone the value regardless of the scoping.
        - Ignore mismatch on new but leave existing alone.  If the variable is new, ignore the mismatch; otherwise, leave everything as is.
    - Potential Scoping Mismatches
        - Environments: guaranteed to be different.
        - Channels: will most likely be different.
        - Process Owners: will be the same (unless runbooks are not synced).
        - Deployment Process Steps: will most likely be the same (depends on the rules for syncing the deployment process)
        - Roles: will be the same.
        - Deployment Targets: guaranteed to be different.
        - Tenant Tags: will most likely be the same.

## Handling different Tenants

It is common to have a different list of Tenants on each Octopus Deploy instance.  Unlike Environments, a different Tenant list is much easier to support in the syncing process.  Tenants are directly tied to the following in Octopus Deploy:

- Deployment Targets
- Accounts
- Certificates
- Team User Role Scoping
- Projects

### Deployment Targets

If a Tenant isn't synced between instances, chances are the deployment targets associated with that Tenant do not need to be synced either.  Deployment and Runbook processes do not reference deployment targets directly. Instead, they are referenced by the roles tied to the deployment target.  

The one thing to watch out for is that it is possible to scope variables to specific deployment targets.  In that case, the best option is to skip the variable value unless there is a partial match.  For example, `Application.Database.Name` has the value `OctoFX-Tenant` scoped to `Machine1`, `Machine2`, and `Machine3` on the source instance.  That value should be skipped unless the destination instance has one of those deployment targets.

### Accounts and Certificates

Both Accounts and Certificates are referenced by variables in either projects or library variable sets.  It is common to have different Accounts and Certificates per Tenant. 

In most cases, it doesn't make much sense to sync Accounts and Certificates.  But the variables referencing the Accounts and Certificates are used in Deployment and Runbook processes.  In this case, the best option is to re-use the same variable name but associate it with different Accounts or Certificates.

### Team User Role Scoping

The Team user role scoping is used for permissions.  For example, a team has access to edit a specific set of Tenants.  In this case, it makes sense to exclude any Tenants not found on the destination instance from the team user role scope.  It won't hurt anything as that Tenant doesn't exist.  Most likely, the list of Tenants that particular team has permission to edit will be very different.

### Projects

The Tenant/Project relationship indicates that Tenant can deploy releases from that project to a specific set of Environments.  There is no impact if the Tenant doesn't exist on the destination instance.  The Tenant/Project relationship won't exist.

## Handling different Deployment Targets

It is common to have a different list of Deployment Targets on each Octopus Deploy instance.  Deployment Targets are not referenced anywhere directly within Octopus Deploy outside of variable scoping.  

All other references are indirect; the role associated with a Deployment Target is how it is tied to a Deployment or Runbook process.  A Deployment or Runbook process can reference a role not associated with any Deployment Targets.  Each project has a setting to tell Octopus what to do when that happens, fail the deployment, or let it skip steps associated with that role.

For variable scoping, the best option is to skip the variable value unless there is a partial match.  For example, `Application.Database.Name` has the value `OctoFX-Tenant` scoped to `Machine1`, `Machine2`, and `Machine3` on the source instance.  That value should be skipped unless the destination instance has one of those deployment targets.

## Ongoing maintenance

Each new major/minor release of Octopus Deploy will require significant testing of your syncing process.  Along with fixing any bugs found because of an unexpected edge case.  

As you can see with all the rules and decisions from above, this is a complex problem requiring time and money to solve.  We only recommend syncing and splitting two instances when no other options are available.  
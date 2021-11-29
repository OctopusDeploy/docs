---
title: Syncing instances with different environments.
description: How to keep 2 or more Octopus Deploy instances in sync with different environments per instance.
position: 10
---

Syncing two or more Octopus Deploy instances with different environments, for example Dev/Test on one instance and Stage/Prod on another instance, is both one of the most popular scenarios for splitting an Octopus Deploy instance and the most complex.  This guide will help walk you through the complexity you'll encounter and the various decisions you'll need to make.

This guide will cover the scenarios.  While they appear to be very different, the core challenges you will run into are the same.  
- Completely different environments: for example, one instance for Dev/Test and another instance for Staging/Production.
- Subset of environments: one instance has Dev/Test/Staging/Production while the other instance only has Production.

:::warning
We do not recommend splitting an instance by environment.  There is a lot of complexity involved and any process you create will require a lot of maintenance.  Prior to making this decision, reach out to [customersuccess@octopus.com](mailto:customersuccess@octopus.com) to see if there are alternatives.
:::

## Understanding Environments

Environments are how Octopus Deploy groups resources together.  An environment are _what_ you want to deploy to.  It can use:  

- Accounts
- Deployment Targets
- Workers

An environment can also influence _how_ you deploy or manage that infrastructure.  Items can be different per environment.

- Deployment Process Steps
- Runbook Process Steps
- Project Variables
- Library Variables
- Certificates
- Tenants

You control how a release is promoted through environments via:

- Lifecycles
- Channels

## Matching by name

Each instance will have different identifiers for projects, step templates, worker pools, etc.  Project "OctoFx" in the Dev/Test instance id could be `Projects-1234` while in the Stage/Prod instance the project id will be `Projects-7789`.  That means any matching must be done by name.  

## Difficuluties of different environments

As you can see, environments are used in a lot of different areas in Octopus Deploy.  Excluding an environment from a syncing process has significant ramifications and requires you to make a number of decisions.  Specifically:

- Lifecycles and Channels
- Tenants
- Deployment and Runbook Processes
- Accounts and Certificates
- Variable Scoping

### Lifecycles and Channels

Different environments per instance mean different lifecycles.  In the use case of Dev/Test/Staging/Production on one instance and Production is doesn't make sense to sync any lifecycles.  Only the default lifecycle is needed on the instance with only the Production environment.  

Not cloning lifecycles has a trickle down effect.  

- Lifecycle
    - Channels
        - Deployment Process Steps
        - Variable Scoping

That leads to another decision for the project.  Should any deployment process steps and variables scoped to channels be cloned or skipped?  If they are cloned, should the channel scoping be removed?

### Tenants

For this section, a tenant is one of your customers.  In Octopus Deploy a is tied to both a Project and 1 to N environments.  

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

## Tools and features to avoid 

The unfortunate truth is there are a lot of decisions and business rules in syncing two instances with different environments.  Below are tools that will not work with this syncing use case.

### Migrator and Project/Import export.

:::warning
Do not use the [migrator](docs/administration/data/data-migration.md) or the [Project Export/Import](docs/projects/export-import/index.md) feature to sync instances with different environments.
:::

Tools such as the [migrator](docs/administration/data/data-migration.md) or the [Project Export/Import](docs/projects/export-import/index.md) both function in a similar way, they grab everything releated to a project (variables, environments, library variable sets, etc.) and export it as .JSON files.  They do not support this use case.  There is no way to exclude specific environments.  While it is possible to modify the JSON exported by those tools, such a thing is error prone and unsupported.

You can use those tools for the initial sync.  But you'll need to perform a lot of clean-up and verification after the fact.  For this use case we recommend avoiding those tools altogether.

### Config as Code and Octopus Terraform Provider

Terraform uses Hashicorp Configuration Language or HCL.  Config as code is based on HCL.  HCL does not support complex logic.  That means you'd need a unique set of files per instance.  Which in turn means you'd need to use a tool such as BeyondCompare to manually move changes between instances.  Anything manual is error prone and will eventually fail.  

## The syncing process

Any sort of syncing process will involve business logic.  We recommend creating a tool to manage the syncing for you by using the [Octopus Deploy REST API](docs/octopus-rest-api/index.md).

Lorem ipsum on how the syncing process will work

Our solutions team has written a sample PowerShell script, [SpaceCloner](https://github.com/OctopusDeployLabs/SpaceCloner), you can use as a reference or example for your syncing process.  It supports syncing instances with different environments.  In fact, a lot of this documentation was written using lessons from writing that tool.
---
title: Operations Runbooks
description: Runbooks can be used to automate routine or emergency operations-centric processes, for instance, disaster recovery and database backups.
position: 140
---

We're planning to introduce Runbooks in **Octopus 2019.10**.

A deployment is only one phase in the life of an application. There are typically many other tasks which are performed to keep an application operating. A large part of DevOps is running operations separate from deploying applications, and this is where Runbooks come into play.

Runbooks can be used to automate routine or emergency operations-centric processes, for instance, disaster recovery and database backups.

:::warning
**Early Access**
This is an early access feature. Early access features are still in development and we encourage you to experiment with this feature.
:::

## Feature Toggle

Runbooks is an early-access feature and is _disabled_ by default. You can enable this experimental feature by navigating to **{{Configuration > Features}}** in the Octopus Web Portal. Once enabled, you will see an Operations/Runbooks menu under your projects.

## Projects

Before you can define how your scripts are run, you must create a project for the runbook. Projects contain the configuration variables that can help define how scripts defined in your runbook steps are run.

Learn more about managing [projects](/docs/deployment-process/projects/index.md).

## Runbooks

Runbooks can be thought of as a simplified version of your project's [Deployment Process](/docs/deployment-process/index.md), for people in the world of Operations who need to run isolated processes quickly and easily against their infrastructure.

An example runbook might be a "Cleanup runbook" that removes various temp files/folders on your environments. To do this, you would simply create a new runbook, add a script step to do your cleanup work (targeting your machines by role) and then run this on your desired environments.

## Variables Support

You can create many runbooks per project and share the [project variables](/docs/deployment-process/variables/index.md) that are available for that project.

### Current Limitations

**Prompted Variables**
Prompted variables are not currently supported for the Runbooks feature, but we aim to have support for prompted variables in the near future. There is no workaround at this time.

**Scoping**
You cannot currently scope project variables to either a Deployment or Runbook Process, but we aim to support this in the future. A workaround is to namespace your project variables for Runbook-specific variables you wish to consume in your Runbook Process. For example: Your project variable could be named `Runbook.MyProjectVariable` and then only access these "Runbook" variables in your Runbook Process.

## Runbook Snapshots and Runs

It is important to understand the difference between **Snapshot** and **Run**.

As you defined your runbook process, you specified the steps that must be taken, the packages and services to run, the scripts to run, and the variables to be used that are required to run your software.

When you create a **Snapshot**, you are capturing the runbook process and all the associated assets (packages, scripts, variables, etc) as they existed at that time. The snapshot is given a unique name, and you can run that snapshot as many times as you need to. You can even run that specific snapshot as it existed at the time the snapshot was created, even if parts of the runbook process have changed (those changes will be included in future snapshots).

When you **Run** a snapshot, you are executing the runbook process with all the associated details, as they existed when the snapshot was created.

You can **Run** a **Snapshot** as many times as you want to.

## Environments Selection

We don't believe that channels or lifecycles (progression) make sense for runbooks. Runbooks can be run on any environments you have access to. The interface has been designed to let you run a runbook quickly, so there's a single `Run on...` screen where you choose environments and specify any `Advanced` options, and then you run it.

## Permissions

Two permissions are available for the top-level Runbooks document: `RunbookView` (for viewing) and `RunbookEdit` (for creating, modifying, and deleting), so if you want to lock down the ability for your teams to create runbooks, you just need to disable these permissions.

Once you create a runbook snapshot and run it, the typical `Deployment` and `Release` permissions are required.

## Working with the Octopus API

Octopus Deploy is built API-first, which means everything you can do through the Octopus UI can be done with the API. In the API, we model the runbook and its process the same way, starting at the Project:

- Project
- Runbooks _(a project can have many runbooks, with RunbookView/RunbookEdit permissions)_
- RunbookProcess _(a runbook has one process / collection of steps, with ProcessEdit permissions)_
- RunbookSnapshots _(a runbook can have many snapshots, each with a unique name, with Release permissions)_
- RunbookRuns _(a runbook snapshot will then be run/executed against an environment, with Deployment permissions)_

We have provided lots of helpful functions for building your runbook process in the [.NET SDK](/docs/octopus-rest-api/octopus.client.md), or you can use the raw HTTP API if that suits your needs better.

Learn about using the [Octopus REST API](/docs/octopus-rest-api/index.md).

:::success
Record the HTTP requests made by the Octopus UI to see how we build your runbook processes using the Octopus API. You can do this in the Chrome developer tools, or using a tool like Fiddler.
:::

## Current Limitations

For this early access feature, there are a number of things we decided to not include initially (so we could get the feature in your hands sooner). Some known limitations that are not currently supported are:

- Prompted variables (if your project includes prompted variables, they will be ignored for runbooks).
- Variable scoping to runbooks (there's no way to scope variables between your project's deployment process vs runbook processes).
- Triggers.
- Viewing Account usage in runbooks.
- Migrator support.

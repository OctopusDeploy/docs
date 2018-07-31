---
title: Built-in Worker
description: Octopus Server comes with a built-in worker which enables you to conveniently run parts of your deployment process on the Octopus Server without the need to install a Tentacle or other deployment target. This page describes how to configure the built-in worker for a variety of scenarios.
position: 2
---

Octopus Server comes with a built-in worker which enables you to conveniently run parts of your deployment process on the Octopus Server without the need to install a Tentacle or other deployment target. This is very convenient when you are getting started with Octopus Deploy, but it does come with several security implications.

This page describes how to configure the built-in worker for a variety of scenarios.

!toc

## Built-in Worker

When the built-in worker is executed, the Octopus server spawns a new process for Calamari.  This conveniently allows a default Octopus set up to enable features like running script steps on the server and Azure deployments.  However, this convenience comes at a cost: **security**.

## Default Configuration

By default Octopus Server runs as the highly privileged `Local System` account on Windows. We typically recommend running Octopus Server as a different account, either a User or Managed Service Account (MSA), so you can grant specific privileges to that account.

When you first install Octopus Server the built-in worker is configured to run using the same user account as the Octopus Server itself. This means your deployment process can do the same things the Octopus Server can do.

## Running Tasks on the Octopus Server as a Different User

You can configure the built-in worker to execute tasks as a different user account. This user account can be a down-level account with very restricted privileges.

```plaintext
Octopus.Server.exe builtin-worker --username=OctopusWorker --password=XXXXXXXXXX
```

All tasks which execute using the built-in worker will run as that user account. The only gotcha is that the user account running the Octopus Server must be a member of the `BUILTIN\Administrators` group to launch new processes as the built-in worker user and impersonate the built-in worker user.

This same command-line tool can automatically configure the correct user accounts on the local machine, and wire it all up for you.

```plaintext
Octopus.Server.exe builtin-worker --auto-configure
```

Which results in something like this:

```plaintext
Creating a user account on the local machine called 'OctopusServer' and adding it to the 'BUILTIN\Administrators' group.
Granting the 'SeServiceLogonRight' privilege to the 'MACHINE-123\OctopusServer' user account.
Configuring the 'OctopusDeploy' Windows Service to start as the 'MACHINE-123\OctopusServer' user account.
[SC] ChangeServiceConfig SUCCESS
Creating a down-level user account on the local machine called 'OctopusWorker' for the built-in worker.
The built-in worker is now configured to execute scripts as MACHINE-123\OctopusWorker.
Testing the built-in worker configuration.
Built-in worker: SUCCESS
The success of this configuration depends on both the source and target user accounts.
Current User: MACHINE-123\admin-user
Target User: MACHINE-123\OctopusWorker


Step 1: Testing credentials... PASSED
Step 2: Testing thread impersonation... PASSED
Step 3: Testing process impersonation... PASSED
Step 4: Check the process impersonation worked as expected... PASSED

NOTE: This test succeeded when starting from the user account 'MACHINE-123\admin-user'. If the Octopus Server usually runs as a different user account these results may vary. The same test will be run each time the Octopus Server starts to be certain the built-in worker is configured correctly.

These changes require a restart of the Octopus Server.
```

## Switching Off the Built-in Worker

The built-in worker can be switched off.  If it is switched off, then the Octopus server does not invoke Calamari locally.  This will mean deployments containing steps that would have run on the built-in worker (Azure, AWS, Terraform, scripts steps targeted at the server) will fail unless an [external worker](/docs/infrastructure/workers/index.md) is provisioned.

Toggle the built-in worker on or off from the **{{Configuration > Features}}** page.

The built-in worker will also not be used if any workers are added to the [default worker pool](/docs/infrastructure/workers/worker-pools.md), but, unless it is switched off, Octopus will revert to using the built-in worker if all workers are later removed from the default pool.

Note that [some steps](/docs/administration/workers/index.md#Where-steps-run) run inside the Octopus server process (not using Calamari), don't need a worker and are not affected by this setting.

## Troubleshooting

You cannot run the Octopus Server as the `Local System` account and successfully launch the built-in worker as a different user account. Please use the `--auto-configure` option, or create a user account as a member of the `BUILTIN\Administrators` group.

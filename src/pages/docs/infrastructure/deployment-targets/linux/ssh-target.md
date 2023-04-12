---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: SSH target
description: Configuring Linux servers as SSH deployment targets in Octopus.
navOrder: 10
hideInThisSectionHeader: true
---

The Octopus Server can communicate with Linux targets via SSH. When using SSH for deployments to a Linux server, the Tentacle agent is not required and doesn't need to be installed.

## Configuring SSH targets

Before you configure an SSH deployment target, review the SSH target [requirements](/docs/infrastructure/deployment-targets/linux/ssh-requirements/) and ensure your SSH deployment targets have the required packages installed.

## Create an SSH account

The SSH connection you configure will use an account with either an [SSH Key Pair](/docs/infrastructure/accounts/ssh-key-pair.md) or a [Username and Password](/docs/infrastructure/accounts/username-and-password/) that has access to the remote host.

See [accounts](/docs/infrastructure/accounts/ssh-key-pair/) for instructions to configure the account.

## Add an SSH connection

!include <configure-ssh-connection-target>

## Health check

Once the target is configured, Octopus will perform an initial health check. Health checks are done periodically or on demand and ensure the endpoint is reachable, configured correctly and the required dependencies are are available (e.g. tar, for more details see [requirements](/docs/infrastructure/deployment-targets/linux/ssh-requirements/), and ready to perform deployment tasks.

If Calamari is not present or is out-of-date, a warning will be displayed, however, Calamari will be updated when it is next required by a task.

If the SSH target is healthy, the version that is displayed is the version of the Octopus Server instance.

If the fingerprint changes after initial configuration, the next health check will update the fingerprint. If the fingerprint returned during the handshake is different to the value stored in the database, the new fingerprint will show up in the logs. If you aren't expecting a change and you see this error it could mean you have been compromised!

Learn more about health checks and [machine policies](/docs/infrastructure/deployment-targets/machine-policies/)

## Running scripts on SSH endpoints

You can use [raw scripting](/docs/deployments/custom-scripts/raw-scripting.md) to run scripts on SSH endpoints without any additional Octopus dependencies. You can set [machine policies](/docs/infrastructure/deployment-targets/machine-policies/) to configure health checks that only test for SSH connectivity for the target to be considered healthy.

## Learn more

- [Linux blog posts](https://octopus.com/blog/tag/linux)

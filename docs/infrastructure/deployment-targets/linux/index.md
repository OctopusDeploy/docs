---
title: Linux Targets
description: Configuring Linux servers as deployment targets in Octopus.
position: 20
---

Linux servers can be configured as [Deployment Targets](/docs/infrastructure/deployment-targets/index.md) in Octopus.   

The Octopus Server communicates with Linux targets via SSH, and therefore Linux servers are modeled as SSH Targets.  

There is no agent required to be pre-installed on Linux servers, unlike [Windows servers](/docs/infrastructure/deployment-targets/windows-targets/index.md) which require the Tentacle agent to be installed.

## Supported Distributions

Any Linux server which meets the [requirements](/docs/infrastructure/deployment-targets/linux/requirements.md) will be able to be configured as a deployment target.

The following platforms are explicitly supported (we run automated tests against them):

- Ubuntu 16.04 LTS
- Ubuntu 14.04 LTS
- Redhat (RHEL) 7.2
- Centos 7.6
- Amazon Linux 2
- Debian 8.7
- Fedora 23
- MacOS 10.12.5
- openSUSE 42.3
- SUSE LES 12 SP2
- FreeBSD 11.2

## Configuring SSH Targets

Before you configure an SSH deployment target, review the [requirements](/docs/infrastructure/deployment-targets/linux/requirements.md) and ensure your SSH deployment targets have the required packages installed.

## Create an SSH Account

The SSH connection you configure will use an account with either an [SSH Key Pair](/docs/infrastructure/accounts/ssh-key-pair.md) or a [Username and Password](/docs/infrastructure/accounts/username-and-password.md) that has access to the remote host.

See [accounts](/docs/infrastructure/accounts/index.md) for instructions to configure the account.

## Add an SSH Connection

1. In the **Octopus Web Portal**, navigate to the **Infrastructure** tab, select **Deployment Targets** and click **{{ADD DEPLOYMENT TARGET,SSH CONNECTION}}**.
2. Click **ADD** on the SSH Connection card.
3. Enter the DNS or IP address of the deployment target, i.e., `example.com` or `10.0.1.23`.
4. Enter the port (port 22 by default) and click **NEXT**.

Make sure the target server is accessible by the port you specify.

The Octopus server will attempt to perform the required protocol handshakes and obtain the remote endpoint's public key fingerprint automatically rather than have you enter it manually. This fingerprint is stored and verified by the server on all subsequent connections.

If this discovery process is not successful, you will need to click **ENTER DETAILS MANUALLY**.

5. Give the target a name.
6. Select which environment the deployment target will be assigned to.
7. Choose or create at least one target role for the deployment target and click **Save**. Learn about [target roles](/docs/infrastructure/deployment-targets/target-roles/index.md).
8. Select the [account](/docs/infrastructure/accounts/index.md) that will be used for the Octopus server and the SSH target to communicate.
9. If entering the details manually, enter the **Host**, **Port** and the host's [fingerprint](#fingerprint).

You can retrieve the fingerprint of the default key configured in your sshd\_config file from the target server with the following command:

```bash
ssh-keygen -E md5 -lf /etc/ssh/ssh_host_rsa_key.pub | cut -d' ' -f2 | awk '{ print $1}' | cut -d':' -f2-
```

10. Specify whether Mono is installed on the SSH target or not to determine which version of [Calamari](/docs/api-and-integration/calamari.md) will be installed.

  - [Calamari on Mono](#mono-calamari) built against the full .NET framework.
  - [Self-contained version of Calamari](#self-contained-calamari) built against .NET Core.

11. Click **Save**.

## Health Check

Once the target is configured, Octopus will perform an initial health check. Health checks are done periodically or on demand and ensure the endpoint is reachable, configured correctly and the required dependencies are are available (e.g. tar, for more details see [requirements](/docs/infrastructure/deployment-targets/linux/requirements.md)), and ready to perform deployment tasks.

If Calamari is not present or is out-of-date, a warning will be displayed, however, Calamari will be updated when it is next required by a task.

If the SSH target is healthy, the version that is displayed is the version of the Octopus server instance.

If the fingerprint changes after initial configuration, the next health check will update the fingerprint. If the fingerprint returned during the handshake is different to the value stored in the database, the new fingerprint will show up in the logs. If you aren't expecting a change and you see this error it could mean you have been compromised!

Learn more about health checks and [machine policies](/docs/infrastructure/machine-policies.md)

## Running Scripts on SSH Endpoints

You can use [raw scripting](/docs/deployment-examples/custom-scripts/raw-scripting.md) to run scripts on SSH endpoints without any additional Octopus dependencies. You can set [machine policies](/docs/infrastructure/machine-policies.md) to configure health checks that only test for SSH connectivity for the target to be considered healthy.

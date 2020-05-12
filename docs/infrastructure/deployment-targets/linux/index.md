---
title: Linux targets
description: Configuring Linux servers as deployment targets in Octopus.
position: 20
hideInThisSectionHeader: true
---

Linux servers can be configured as [deployment targets](/docs/infrastructure/deployment-targets/index.md) in Octopus.   

The Octopus Server can communicate with Linux targets via SSH or the [Linux Tentacle](https://octopus.com/docs/infrastructure/deployment-targets/linux/tentacle).  

When using SSH for deployments to a Linux server, the Tentacle agent is not required and doesn't need to be installed.

## Supported distributions

Any Linux server which meets the [requirements](/docs/infrastructure/deployment-targets/linux/requirements.md) will be able to be configured as a deployment target.

The following platforms are explicitly supported (we run automated tests against them):

- Ubuntu 18.04 LTS
- Ubuntu 16.04 LTS
- Redhat (RHEL) 7.2
- Centos 7.7
- Amazon Linux 2
- Debian 9.12
- Fedora 23
- MacOS 10.15.3
- openSUSE 15.1
- SUSE LES 12 SP5
- FreeBSD 11.3

## Configuring SSH targets

Before you configure an SSH deployment target, review the [requirements](/docs/infrastructure/deployment-targets/linux/requirements.md) and ensure your SSH deployment targets have the required packages installed.

## Create an SSH account

The SSH connection you configure will use an account with either an [SSH Key Pair](/docs/infrastructure/deployment-targets/linux/ssh-key-pair.md) or a [Username and Password](/docs/infrastructure/deployment-targets/username-and-password.md) that has access to the remote host.

See [accounts](/docs/infrastructure/deployment-targets/linux/ssh-key-pair.md) for instructions to configure the account.

## Add an SSH connection

1. In the **Octopus Web Portal**, navigate to the **Infrastructure** tab, select **Deployment Targets** and click **{{ADD DEPLOYMENT TARGET,SSH CONNECTION}}**.
2. Click **ADD** on the SSH Connection card.
3. Enter the DNS or IP address of the deployment target, i.e., `example.com` or `10.0.1.23`.
4. Enter the port (port 22 by default) and click **NEXT**.

Make sure the target server is accessible by the port you specify.

The Octopus Server will attempt to perform the required protocol handshakes and obtain the remote endpoint's public key fingerprint automatically rather than have you enter it manually. This fingerprint is stored and verified by the server on all subsequent connections.

If this discovery process is not successful, you will need to click **ENTER DETAILS MANUALLY**.

5. Give the target a name.
6. Select which environment the deployment target will be assigned to.
7. Choose or create at least one target role for the deployment target and click **Save**. Learn about [target roles](/docs/infrastructure/deployment-targets/index.md#target-roles).
8. Select the account that will be used for the Octopus Server and the SSH target to communicate.
9. If entering the details manually, enter the **Host**, **Port** and the host's [fingerprint](#fingerprint).

You can retrieve the fingerprint of the default key configured in your sshd\_config file from the target server with the following command:

```bash
ssh-keygen -E md5 -lf /etc/ssh/ssh_host_rsa_key.pub | cut -d' ' -f2 | awk '{ print $1}' | cut -d':' -f2-
```

10. Specify whether Mono is installed on the SSH target or not to determine which version of [Calamari](/docs/octopus-rest-api/calamari.md) will be installed.

  - [Calamari on Mono](#mono-calamari) built against the full .NET framework.
  - [Self-contained version of Calamari](#self-contained-calamari) built against .NET Core.

11. Click **Save**.

## Health check

Once the target is configured, Octopus will perform an initial health check. Health checks are done periodically or on demand and ensure the endpoint is reachable, configured correctly and the required dependencies are are available (e.g. tar, for more details see [requirements](/docs/infrastructure/deployment-targets/linux/requirements.md)), and ready to perform deployment tasks.

If Calamari is not present or is out-of-date, a warning will be displayed, however, Calamari will be updated when it is next required by a task.

If the SSH target is healthy, the version that is displayed is the version of the Octopus Server instance.

If the fingerprint changes after initial configuration, the next health check will update the fingerprint. If the fingerprint returned during the handshake is different to the value stored in the database, the new fingerprint will show up in the logs. If you aren't expecting a change and you see this error it could mean you have been compromised!

Learn more about health checks and [machine policies](/docs/infrastructure/deployment-targets/machine-policies.md)

## Running scripts on SSH endpoints

You can use [raw scripting](/docs/deployment-examples/custom-scripts/raw-scripting.md) to run scripts on SSH endpoints without any additional Octopus dependencies. You can set [machine policies](/docs/infrastructure/deployment-targets/machine-policies.md) to configure health checks that only test for SSH connectivity for the target to be considered healthy.

## Learn more

- [Linux blog posts](https://octopus.com/blog/tag/linux)

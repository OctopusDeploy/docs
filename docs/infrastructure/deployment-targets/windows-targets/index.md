---
title: Windows targets
description: How to install Octopus Tentacles on Windows targets as either listening or polling Tentacles.
position: 10
---

When you deploy software to Windows servers, you need to install Tentacle, a lightweight agent service, on your Windows servers so they can communicate with the Octopus Server.

Once installed, Tentacles:

- Run as a Windows service called **OctopusDeploy Tentacle**.
- Wait for tasks from Octopus (deploy a package, run a script, etc).
- Report the progress and results back to the Octopus Server.

Before you install Tentacle, review the software and hardware requirements for:

- [The latest version of Tentacle](/docs/infrastructure/deployment-targets/windows-targets/requirements/index.md).
- [Versions prior to Tentacle 3.1](/docs/infrastructure/deployment-targets/windows-targets/requirements/legacy-requirements.md).

## Communication mode

Tentacles can be configured to communicate in Listening mode or Polling mode. Listening mode is the recommended communication style. Learn about the differences between the two modes and when you might choose to use Polling mode instead of Listening mode on the [Tentacle communication](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md) page.

!include <tentacle-downloads>

## Configure a Listening Tentacle (recommended)

!include <install-tentacle-manager>
!include <configure-listening>
1. Select which [environments](/docs/infrastructure/environments/index.md) the deployment target will be assigned to.
1. Choose or create at least one [target roles](/docs/infrastructure/deployment-targets/index.md#target-roles) for the deployment target and click **Save**.

Your deployment target is configured, next you need to preform a [health check and update Calamari](/docs/infrastructure/deployment-targets/machine-policies.md#health-check).

If the Tentacle isn't connecting, try the steps on the [troubleshooting page](/docs/infrastructure/deployment-targets/windows-targets/troubleshooting-tentacles.md).

### Update your Tentacle firewall

To allow your Octopus Server to connect to the Tentacle, you'll need to allow access to TCP port **10933** on the Tentacle (or the port you selected during the installation wizard).

**Intermediary firewalls**

Don't forget to allow access in any intermediary firewalls between the Octopus Server and your Tentacle (not just the Windows Firewall). For example, if your Tentacle server is hosted in Amazon EC2, you'll also need to modify the AWS security group firewall to tell EC2 to allow the traffic. Similarly, if your Tentacle server is hosted in Microsoft Azure, you'll also need to add an Endpoint to tell Azure to allow the traffic.

## Configure a Polling Tentacle

Listening Tentacles are recommended, but there might be situations where you need to configure a Polling Tentacle. You can learn about the difference between Listening Tentacles and Polling Tentacles on the [Tentacle communication](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md) page.

!include <install-tentacle-manager>
!include <configure-polling>

Your deployment target is configured, next you need to preform a  [health check and update Calamari](/docs/infrastructure/deployment-targets/machine-policies.md#health-check).

If the Tentacle isn't connecting, try the steps on the [troubleshooting page](/docs/infrastructure/deployment-targets/windows-targets/troubleshooting-tentacles.md).

### Update your Octopus Server firewall

To allow Tentacle to connect to your Octopus Server, you'll need to allow access to port **10943** on the Octopus Server (or the port you selected during the installation wizard - port 10943 is just the default). You will also need to allow Tentacle to access the HTTP Octopus Web Portal (typically port **80** or **443** - these bindings are selected when you [install the Octopus Server](/docs/installation/index.md)).

If your network rules only allow port **80** and **443** to the Octopus Server, you can change the server bindings to either HTTP or HTTPS and
use the remaining port for polling Tentacle connections. The listening port can be [changed from the command line](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/index.md).
Even if you do use port **80** for Polling Tentacles, the communication is still secure.

Note that the port used to poll Octopus for jobs is different to the port used by your team to access the Octopus Deploy web interface;
this is on purpose, and it means you can use different firewall conditions to allow Tentacles to access the Octopus Server by IP address.

Using polling mode, you won't typically need to make any firewall changes on the Tentacle machine.

### Intermediary firewalls

Don't forget to allow access not just in Windows Firewall, but also any intermediary firewalls between the Tentacle and your Octopus Server. For example, if your Octopus Server is hosted in Amazon EC2, you'll also need to modify the AWS security group firewall to tell EC2 to allow the traffic. Similarly if your Octopus Server is hosted in Microsoft Azure you'll also need to add an Endpoint to tell Azure to allow the traffic.

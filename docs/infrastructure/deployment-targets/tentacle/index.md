---
title: Octopus Tentacle
description: Octopus Tentacle is a lightweight agent service, available on both Windows and Linux servers to communicate securely with the Octopus Server.
position: 0
---

When you deploy software to your servers, you'll typically need to install Tentacle, a lightweight agent service so they can communicate securely with the Octopus Server.

Tentacle can be installed on either [Windows](/docs/infrastructure/deployment-targets/tentacle/windows/index.md) or [Linux](/docs/infrastructure/deployment-targets/tentacle/linux/index.md). 

When installed, Tentacles can:

- Run as a service:
  - A Windows Service called **OctopusDeploy Tentacle**.
  - A Linux **systemd** service.
- Wait for tasks from Octopus (deploy a package, run a script, etc).
- Report the progress and results back to the Octopus Server.

Before you install Tentacle, review the software and hardware requirements depending on your chosen OS:

- Windows:
  - [The latest version of Tentacle](/docs/infrastructure/deployment-targets/tentacle/windows/requirements/index.md).
  - [Versions prior to Tentacle 3.1](/docs/infrastructure/deployment-targets/tentacle/windows/requirements/legacy-requirements.md).
- Linux [system prerequisites](/docs/infrastructure/deployment-targets/linux/index.md#requirements)


## Communication mode

Tentacles can be configured to communicate in Listening mode or Polling mode. Listening mode is the recommended communication style. Learn about the differences between the two modes and when you might choose to use Polling mode instead of Listening mode on the [Tentacle communication](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md) page.

!include <tentacle-downloads>

## Configure a Listening Tentacle (recommended)

To install and configure Tentacles in listening mode, see either:
 - The [Windows Listening Tentacle installation docs](/docs/infrastructure/deployment-targets/tentacle/windows/index.md#configure-a-listening-tentacle-recommended).
 - The [Linux Tentacle Automation scripts](/docs/infrastructure/deployment-targets/tentacle/linux/index.md#automation-scripts), selecting the tab for either a Listening deployment target or worker for your Linux distro.

### Update your Tentacle firewall

To allow your Octopus Server to connect to the Tentacle, you'll need to allow access to TCP port **10933** on the Tentacle (or the port you selected during the installation wizard).

**Intermediary firewalls**

Don't forget to allow access in any intermediary firewalls between the Octopus Server and your Tentacle (not just the Windows Firewall). For example, if your Tentacle server is hosted in Amazon EC2, you'll also need to modify the AWS security group firewall to tell EC2 to allow the traffic. Similarly, if your Tentacle server is hosted in Microsoft Azure, you'll also need to add an Endpoint to tell Azure to allow the traffic.

## Configure a Polling Tentacle

Listening Tentacles are recommended, but there might be situations where you need to configure a Polling Tentacle. You can learn about the difference between Listening Tentacles and Polling Tentacles on the [Tentacle communication](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md) page.

To install and configure Tentacles in polling mode, see either:
 - The [Windows Polling Tentacle installation docs](/docs/infrastructure/deployment-targets/tentacle/windows/index.md#configure-a-polling-tentacle).
 - The [Linux Tentacle Automation scripts](/docs/infrastructure/deployment-targets/tentacle/linux/index.md#automation-scripts), selecting the tab for either a Polling deployment target or worker for your Linux distro.

### Update your Octopus Server firewall

To allow Tentacle to connect to your Octopus Server, you'll need to allow access to port **10943** on the Octopus Server (or the port you selected during the installation wizard - port 10943 is just the default). You will also need to allow Tentacle to access the HTTP Octopus Web Portal (typically port **80** or **443** - these bindings are selected when you [install the Octopus Server](/docs/installation/index.md)).

If your network rules only allow port **80** and **443** to the Octopus Server, you can either:
- Change the server bindings to either HTTP or HTTPS and use the remaining port for polling Tentacle connections.
  - The listening port Octopus Server uses can be [changed from the command line](/docs/octopus-rest-api/octopus.server.exe-command-line/configure.md) using the `--commsListenPort` option.
Even if you do use port **80** for Polling Tentacles, the communication is still secure.
- Use a reverse proxy to redirect incoming connections to the Tentacle listening port on Octopus Server by differentiating the connection based on Hostname (TLS SNI) or IP Address
  - The polling endpoint Tentacle uses can be [changed from the command line](/docs/infrastructure/deployment-targets/tentacle/polling-tentacles-over-port-443.md#self-hosted) using the `--server-comms-address` option. 
  - You can learn about this configuration on the [Polling Tentacles over port 443](/docs/infrastructure/deployment-targets/tentacle/polling-tentacles-over-port-443.md) page.

Note that the port used to poll Octopus for jobs is different to the port used by your team to access the Octopus Deploy web interface;
this is on purpose, and it means you can use different firewall conditions to allow Tentacles to access the Octopus Server by IP address.

Using polling mode, you won't typically need to make any firewall changes on the Tentacle machine.

### Intermediary firewalls

Don't forget to allow access not just in the OS Firewall (e.g. Windows Firewall), but also any intermediary firewalls between the Tentacle and your Octopus Server. For example, if your Octopus Server is hosted in Amazon EC2, you'll also need to modify the AWS security group firewall to tell EC2 to allow the traffic. Similarly if your Octopus Server is hosted in Microsoft Azure you'll also need to add an Endpoint to tell Azure to allow the traffic.

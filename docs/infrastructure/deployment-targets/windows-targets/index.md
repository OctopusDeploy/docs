---
title: Windows Targets
description: Everything you need to know about installing and configuring Octopus Tentacles on Windows targets for use with your deployments.
position: 10
---
When you deploy software to Windows servers, you need to install Tentacle, a lightweight agent service, on all of those Window servers.

Once installed, Tentacles:

- Run as a Windows service called **OctopusDeploy Tentacle**.
- Wait for tasks from Octopus (deploy a package, run a script, etc).
- Report the progress and results back to the Octopus server.

Before you install Tentacle, review the software and hardware requirements for:

- [The latest version of Tentacle](/docs/infrastructure/deployment-targets/windows-targets/requirements/index.md).
- [Versions prior to Tentacle 3.1](/docs/infrastructure/deployment-targets/windows-targets/requirements/legacy-requirements.md).

## Communication Mode

Tentacles can be configured to communicate in Listening mode or Polling mode. Listening mode is the recommended communication style. Learn about the differences between the two modes on the [Tentacle communication](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md) page.

## Download the Tentacle Installer

The latest Octopus Tentacle MSI can always be downloaded from the [Octopus Deploy downloads page](https://octopus.com/downloads).

## Configure a Listening Tentacle (recommended)

!include <install-tentacle-manager>
!include <configure-listening>
1. Select which environment the deployment target will be assigned to.
1. Choose or create at least one target role for the deployment target and click **Save**. Learn about [target roles](/docs/infrastructure/deployment-targets/target-roles/index.md).

Your deployment target is configured, next you need to preform a [health check and update Calamari](/docs/infrastructure/deployment-targets/windows-targets/index.md#health-check-and-upgrade-calamari).

If the Tentacle isn't connecting, try the steps on the [troubleshooting page](/docs/infrastructure/deployment-targets/windows-targets/troubleshooting-tentacles.md).

### Update your Tentacle Firewall

To allow your Octopus Deploy Server to connect to the Tentacle, you'll need to allow access to TCP port **10933** on the Tentacle (or the port you selected during the installation wizard).

**Intermediary Firewalls**

Don't forget to allow access in any intermediary firewalls between the Octopus Server and your Tentacle (not just the Windows Firewall). For example, if your Tentacle server is hosted in Amazon EC2, you'll also need to modify the AWS security group firewall to tell EC2 to allow the traffic. Similarly if your Tentacle server is hosted in Microsoft Azure you'll also need to add an Endpoint to tell Azure to allow the traffic.

## Configure a Polling Tentacle

Listening Tentacles are recommended, but there might be situations where you need to configure a Polling Tentacle. You can learn about the difference between Listening Tentacles and Polling Tentacles on the [Tentacle communication](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md) page.

!include <install-tentacle-manager>
1. On the communication style screen, select **Polling Tentacle** and click **Next**.
1. If you are using a proxy see [Proxy Support](/docs/infrastructure/deployment-targets/windows-targets/proxy-support.md), or click **next**.
1. Add the Octopus credentials the Tentacle will use to connect to the Octopus Server:
    a. The Octopus URL: the DNS or IP address.
    b. Select the authentication mode and enter the details:
        i. The username and password you use to log into Octopus, or:
        i. Your Octopus API key, see [How to create an API key](/docs/api-and-integration/api/how-to-create-an-api-key.md).
1. Click **Verify credentials**, and then next.
1. Give the machine a meaningful name and select which environment to add to the machine to.
1. Choose or create at least one target role for the deployment target. Learn about [target roles](/docs/infrastructure/deployment-targets/target-roles/index.md).
1. Leave **Tenants** and **Tenant tags** blank unless you are already using Octopus to deploy applications to multiple end users. If you are using Octopus for multiple tenants, enter the **Tenants** and **Tenant Tags**. Learn more about [Multi-tenant Deployments](/docs/deployment-patterns/multi-tenant-deployments/index.md).
1. Click **Install**, and when the script has finished, click **Finish**.

Your deployment target is configured, next you need to preform a  [health check and update Calamari](/docs/infrastructure/deployment-targets/windows-targets/index.md#health-check-and-upgrade-calamari).

If the Tentacle isn't connecting, try the steps on the [troubleshooting page](/docs/infrastructure/deployment-targets/windows-targets/troubleshooting-tentacles.md).

### Update your Octopus Server Firewall

To allow Tentacle to connect to your Octopus Deploy Server, you'll need to allow access to port **10943** on the Octopus Server (or the port you selected during the installation wizard - port 10943 is just the default). You will also need to allow Tentacle to access the Octopus HTTP web portal (typically port **80** or **443** - these bindings are selected when you [install the Octopus Deploy Server](/docs/installation/index.md)).

If your network rules only allow port **80** and **443** to the Octopus Server, you can change the server bindings to either HTTP or HTTPS and
use the remaining port for polling Tentacle connections. The listening port can be [changed from the command line](/docs/administration/server-configuration-and-file-storage/index.md).
Even if you do use port **80** for Polling Tentacles, the communication is still secure.

Note that the port used to poll Octopus for jobs is different to the port used by your team to access the Octopus Deploy web interface;
this is on purpose, and it means you can use different firewall conditions to allow Tentacles to access Octopus by IP address.

Using polling mode, you won't typically need to make any firewall changes on the Tentacle machine.

**Intermediary Firewalls**
Don't forget to allow access not just in Windows Firewall, but also any intermediary firewalls between the Tentacle and your Octopus Server. For example, if your Octopus Server is hosted in Amazon EC2, you'll also need to modify the AWS security group firewall to tell EC2 to allow the traffic. Similarly if your Octopus Server is hosted in Microsoft Azure you'll also need to add an Endpoint to tell Azure to allow the traffic.

## Health Check and Upgrade Calamari

The Octopus Server performs regular health checks to ensure Tentacles are connected and running the latest version of Calamari. After installing and configuring a new Tentacle, you need to run a health check and can upgrade the version of Calamari.

1. From the Infrastructure tab, select deployment targets.
2. Click the overflow menu and select **Check Health**. If you've installed multiple Tentacles, it will check all of your Tentacles (if you'd rather check only one Tentacle, select that Tentacle from the Deployment Targets section, click **Connectivity** and then **Check health**).

The first time you complete a health check on a Tentacle, you will see the Tentacle has health warnings and needs to install Calamari.
Calamari is an [open-source](https://github.com/OctopusDeploy/Calamari), console-application.  It supports many commands, which are responsible for performing deployment steps.

Learn more about [calamari](/docs/api-and-integration/calamari.md).

Octopus will automatically push the latest version of Calamari with your first deployment, but you can do the following to install Calamari:

1. From the Infrastructure tab, select deployment targets.
2. Click the overflow menu and select **Upgrade Calamari on Deployment Targets**.

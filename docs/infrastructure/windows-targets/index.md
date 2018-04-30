---
title: Windows Targets
description: Everything you need to know about installing and configuring Octopus Tentacles on Windows targets for use with your deployments.
position: 40
---
When you deploy software to Windows Servers, you need to install Tentacle, a lightweight agent service, on all of those Window Servers.

Once installed, Tentacles:

- Run as a Windows Service called **OctopusDeploy Tentacle**.
- Wait for tasks from Octopus (deploy a package, run a script, etc).
- Report the progress and results back to the Octopus Server.

Before you install Tentacle, review the the software and hardware requirements for:

- [The latest version of Tentacle](/docs/infrastructure/windows-targets/requirements/index.md).
- [Versions prior to Tentacle 3.1](/docs/infrastructure/windows-targets/requirements/legacy-requirements.md).

## Download the Tentacle Installer

The latest Octopus Tentacle MSI can always be downloaded from the [Octopus Deploy downloads page](https://octopus.com/downloads).

## Install Tentacle Manager

Tentacle Manager is the Windows application that configures your Tentacle. Once installed, you can access it from your start menu/start screen. Tentacle Manager can configure Tentacles to use a [proxy](/docs/infrastructure/windows-targets/proxy-support.md), delete the Tentacle, and show diagnostic information about the Tentacle.

1. Start the Tentacle installer and follow the onscreen prompts.
2. Accept the license agreement, and either accept the default installation location or choose a different location.
3. Click install, and give the app permission to **make changes to your device**.
4. Click finish to exit the installation wizard and launch the setup wizard to configure your Tentacle.
5. Click **Get Started** and **Next**.
6. Accept the default *configuration and log* directory and *application* directory or choose different locations.

Tentacles can be configured in Listening mode (recommended) or Polling mode. Learn more about [Tentacle communication](/docs/infrastructure/windows-targets/tentacle-communication.md).

7. Choose the communication style for the Tentacle:
  - [Listening Tentacle (recommended)](/docs/infrastructure/windows-targets/index.md#configure-a-listening-tentacle-recommended).
  - [Polling Tentacle](/docs/infrastructure/windows-targets/index.md#configure-a-polling-tentacle).

## Configure a Listening Tentacle (recommended)

To complete the installation we need to configure communication between the Octopus Server and the Tentacle. This is done on both the server where you installed Tentacle and the central Octopus Deploy server. We'll start with the Octopus Server and come back to the Tentacle.

1. In the **Octopus Web Portal**, navigate to the **Infrastructure** tab, select **Deployment Targets** and click **ADD DEPLOYMENT TARGET**.
1. Select **Listening Tentacle**.
1. Copy the **Thumbprint** (the long alphanumerical string).
1. Back on the Tentacle server, select **Listening Tentacle** and click **Next**.
1. Accept the default listening port **10933** or provide your own.
1. Paste the **Thumbprint** into the **Octopus Thumbprint** field and click **next**.
1. Click **INSTALL**, and after the installation has finished click **Finish**.
1. Back in the **Octopus Web Portal**, enter the DNS or IP address of the tentacle, i.e., `example.com` or `10.0.1.23`, and click **NEXT**.
1. Add a display name for the deployment target (the server where you just installed the listening tentacle).
1. Select which environment the deployment target will be assigned to.
1. Choose or create at least one target role for the deployment target. Learn about [target roles](/docs/infrastructure/target-roles/index.md).
1. Click save.

Your deployment target is configured, next you need to preform a [health check and update Calamari](/docs/infrastructure/windows-targets/index.md#health-check-and-upgrade-calamari).

If the Tentacle isn't connecting, try the steps on the [troubleshooting page](/docs/infrastructure/windows-targets/troubleshooting-tentacles.md).

### Update your Tentacle Firewall

To allow your Octopus Deploy server to connect to the Tentacle, you'll need to allow access to TCP port **10933** on the Tentacle (or the port you selected during the installation wizard).

**Intermediary Firewalls**

Don't forget to allow access in any intermediary firewalls between the Octopus server and your Tentacle (not just the Windows Firewall). For example, if your Tentacle server is hosted in Amazon EC2, you'll also need to modify the AWS security group firewall to tell EC2 to allow the traffic. Similarly if your Tentacle server is hosted in Microsoft Azure you'll also need to add an Endpoint to tell Azure to allow the traffic.

## Configure a Polling Tentacle

1. Select **Polling Tentacle** and click **next**.
1. If you are using a proxy see [Proxy Support](/docs/infrastructure/windows-targets/proxy-support.md), or click **next**.
1. Add the Octopus credentials the Tentacle will use to connect to the Octopus server:
    a. The Octopus URL: the DNS or IP address.
    b. Select the authentication mode and enter the details:
        i. The username and password you use to log into Octopus, or:
        i. Your Octopus API key, see [How to create an API key](/docs/api-and-integration/api/how-to-create-an-api-key.md).
1. Click **Verify credentials**, and then next.
1. Give the machine a meaningful name and select which environment to add to the machine to.
1. Choose or create at least one target role for the deployment target. Learn about [target roles](/docs/infrastructure/target-roles/index.md).
1. Leave **Tenants** and **Tenant tags** blank unless you are already using Octopus to deploy applications to multiple end users. If you are using Octopus for multiple tenants, enter the **Tenants** and **Tenant Tags**. Learn more about [Multi-tenant Deployments](/docs/deployment-patterns/multi-tenant-deployments/index.md).
1. Click **Install**, and when the script has finished, click **Finish**.

Your deployment target is configured, next you need to preform a  [health check and update Calamari](/docs/infrastructure/windows-targets/index.md#health-check-and-upgrade-calamari).

If the Tentacle isn't connecting, try the steps on the [troubleshooting page](/docs/infrastructure/windows-targets/troubleshooting-tentacles.md).

### Update your Octopus Server Firewall

To allow Tentacle to connect to your Octopus Deploy server, you'll need to allow access to port **10943** on the Octopus server (or the port you selected during the installation wizard - port 10943 is just the default). You will also need to allow Tentacle to access the Octopus HTTP web portal (typically port **80** or **443** - these bindings are selected when you [install the Octopus Deploy server](/docs/installation/index.md)).

If your network rules only allow port **80** and **443** to the Octopus server, you can change the server bindings to either HTTP or HTTPS and
use the remaining port for polling Tentacle connections. The listening port can be [changed from the command line](/docs/administration/server-configuration-and-file-storage/index.md).
Even if you do use port **80** for Polling Tentacles, the communication is still secure.

Note that the port used to poll Octopus for jobs is different to the port used by your team to access the Octopus Deploy web interface;
this is on purpose, and it means you can use different firewall conditions to allow Tentacles to access Octopus by IP address.

Using polling mode, you won't typically need to make any firewall changes on the Tentacle machine.

**Intermediary Firewalls**
Don't forget to allow access not just in Windows Firewall, but also any intermediary firewalls between the Tentacle and your Octopus server. For example, if your Octopus server is hosted in Amazon EC2, you'll also need to modify the AWS security group firewall to tell EC2 to allow the traffic. Similarly if your Octopus server is hosted in Microsoft Azure you'll also need to add an Endpoint to tell Azure to allow the traffic.

## Health Check and Upgrade Calamari

The Octopus Server performs regular health checks to ensure Tentacles are connected and running the latest version of Calamari. After installing and configuring a new Tentacle, you need to run a health check and can upgrade the version of Calamari.

1. From the Infrastructure tab, select deployment targets.
2. Click the overflow menu and select **Check Health**. If you've installed multiple Tentacles, it will check all of your Tentacles (if you'd rather check only one Tentacle, select that Tentacle from the Deployment Targets section, click **Connectivity** and then **Check health**).

The first time you complete a health check on a Tentacle, you will see the Tentacle has health warnings and needs to install calamari.
Calamari is an [open-source](https://github.com/OctopusDeploy/Calamari), console-application.  It supports many commands, which are responsible for performing deployment-steps. Learn more about [calamari](/docs/api-and-integration/calamari.md). Octopus will automatically push the latest version of Calamari with your first deployment, but you can do the following to install Calamari:

1. From the Infrastructure tab, select deployment targets.
2. Click the overflow menu and select **Upgrade Calamari on Deployment Targets**.

---
title: Upgrading a Modern Version of Octopus
description: Everything you need to know about upgrading a modern version of Octopus.
position: 1
---

The following guide provides an overview of how the various components of **Octopus 3.x** can be updated to the latest release.

## Before You Begin

Before you start your upgrade, you should take time to:

- Test your [backup and restore process](/docs/administration/data/backup-and-restore.md).
- Learn about [maintenance mode](/docs/administration/managing-infrastructure/maintenance-mode.md).
- [Plan your upgrade](#upgrade-path).

## How We Version Octopus Deploy {#Upgrading-HowweversionOctopusDeploy}

We use our version numbering scheme to help you understand the type of changes we have introduced between two versions of Octopus Deploy:

- **Major version change** = beware of major breaking changes and new features.
  - Example **Octopus 3.x** to **Octopus 2018.x**.
  - Upgrading may require some manual intervention, we will provide a detailed upgrade guide, and downgrading may be difficult.
  - Check our release notes for more details.
    - For example, from **Octopus 1.x** to **Octopus 2.x** we rewrote the HTTP API, and from **Octopus 2.x** to **Octopus 3.x** we changed the Tentacle communication protocol and moved to SQL Server.
- **Minor version change** = new features, potential for minor breaking changes and database changes.
  - Example **Octopus 2018.1.x** to **Octopus 2018.2.x**.
  - Upgrading should be easy, but rolling back will require restoring your database.
  - We will usually make changes to the database schema.
  - We will usually make changes to the API, being backwards compatible wherever possible.
  - Check our release notes for more details.
    - For example, in **Octopus 3.3** we made a change to how Sensitive Properties work in the API.
- **Patch version change** = small bug fixes and computational logic changes.
  - Example **Octopus 2018.2.3** to any other patch of **Octopus 2018.2.x** (upgrade or downgrade).
  - Patches should be **safe to update, safe to roll back**.
  - We will very rarely make database changes, only if we absolutely must to patch a critical bug. If we do, the change will be safe for any other patches of the same release.
  - We may decide to make API changes, but any changes will be backwards compatible.

If you're interested in more details about how we are versioning Octopus, check out the blog post [Octopus Deploy version changes for 2018](https://octopus.com/blog/version-change-2018).

### Release Notes

For every Major and Minor release we will provide release notes highlighting new features and calling out breaking changes. For example, you can see the features and highlights for the latest feature release on our [downloads page](https://octopus.com/downloads). We also talk about [interesting releases on our blog](https://octopus.com/blog/tag/New%20Release).

You can also use our release comparison tool to see **all of the changes** introduced between any two versions of Octopus Deploy. For example: [https://octopus.com/downloads/compare?from=3.2.15&to=3.5.2](https://octopus.com/downloads/compare?from=3.2.15&amp;to=3.5.2).

## Downgrading or Rolling Back an Upgrade {#Upgrading-DowngradingorRollingBackanUpgrade}

The process for successfully downgrading depends on the upgrade you have performed. The kind of upgrade you perform depends on the difference between versions:

- **Patch upgrade** = If you install a patch of Octopus Deploy and run into any problems, you can reinstall the version of Octopus Deploy that was installed prior to the upgrade straight over-the-top without any problems.
  - For example: **Octopus 2018.1.2** to **Octopus 2018.1.4** (same Major.Minor but different Patch). If you need to downgrade for any reason you can reinstall **Octopus 2018.1.2** straight over the top, and get back to normal operation.
  - On that note, you can move freely between any patch in the same Minor release. For example, **Octopus 3.4.2** or **Octopus 3.4.10** or **Octopus 3.4.12**.
- **Minor upgrade** = If you perform a Minor upgrade and run into any problems, you will need to restore a recent SQL Database backup and reinstall the version of Octopus Deploy that was installed prior to the upgrade.
  - For example: **Octopus 2018.1.4** to **Octopus 2018.2.1** would be a Minor upgrade. Make sure to test a [backup and restore](/docs/administration/data/backup-and-restore.md) before upgrading. If you need to downgrade for any reason, you should restore the backup, and then reinstall **Octopus 2018.1.4**.
- **Major upgrade** = We will provide a detailed upgrade guide for any Major upgrades.
  - For example: **Octopus 3.6.5** to **Octopus 2018.1.4** would be a Major upgrade. You should take care when performing a major upgrade and follow our upgrade guide carefully.

## Update Available Notification {#UpgradingfromOctopus3.x-UpdateAvailableNotification}

When an update is available, a bullhorn icon will appear in the top status bar with details and a link to the downloads page.

![](/docs/images/3048440/3278327.png "width=500")

:::warning
**What is included in the release?**
You can find the differences between your current version and the newest version using our [Compare versions](https://octopus.com/downloads/compare) page. Please note that this will also list the release notes for major and minor version changes which may include **breaking changes** or **dependencies** that you may need to also update. It is important to know what might be affected by your upgrade.
:::

## Scheduling Maintenance

Upgrading Octopus Server is normally quite fast, however you should allow yourself time to perform a good [backup and restore process](/docs/administration/data/backup-and-restore.md).

You should also consider how long the actual upgrade may take:

- [Patch](/docs/administration/upgrading/index.md##Upgrading-HowweversionOctopusDeploy) upgrades are usually very fast - only the executable binaries are upgraded.
- [Minor](/docs/administration/upgrading/index.md##Upgrading-HowweversionOctopusDeploy) upgrades are usually quite fast, however these releases typically require database changes.
- [Major](/docs/administration/upgrading/index.md##Upgrading-HowweversionOctopusDeploy) upgrades usually require detailed planning.

## Upgrading Octopus Server {#UpgradingfromOctopus3.x-UpgradingOctopusServerUpgradingOctopusServer}

Upgrading the Octopus Deploy Server is easy, you will just need to follow these steps:

1. Schedule a maintenance window: Octopus Server will be unavailable during the upgrade (unless you are [upgrading Octopus HA](#upgrading-octopus-ha)).
1. Switch your server to [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode.md) and wait until all current tasks and deployments have completed. This ensures that no further changes will be made that may potentially become lost if the upgrade fails and you need to rollback.

    ![](/docs/images/3048440/5865775.png "width=500")

1. [Backup your database and master key](/docs/administration/data/backup-and-restore.md) so that it can be restored in case anything goes wrong.

    ![](/docs/images/3048440/5865780.png "width=500")

1. Download the latest [Octopus Deploy MSI installer](https://octopus.com/downloads).

:::success
**No internet connection required for install**
Once you have downloaded the required version of the Octopus Server MSI no further internet connectivity is required. This allows for installation on servers and systems that have no internet connectivity.
:::

1. Run the installer and follow the prompts.
1. Turn [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode.md) `OFF`.

    ![](/docs/images/3048440/5865776.png "width=500")

1. Calamari will then be automatically updated if required with the next health check or deployment that takes place.

:::success
**No need to upgrade the Tentacle**
Given that the deployment code is now embedded within Calamari, and this gets pushed out automatically as needed by the Octopus Deploy Server, you no longer need be concerned about ensuring the version number between Tentacle and Server remain in lockstep. Builds of the Server and the Tentacle are no longer in sync as of **Octopus 3.14**, and **Octopus 3.x** is compatible with all **Tentacle 3.x** versions. We hope splitting the Tentacle helps relieve some of the hassle and friction involved with upgrading Octopus and provides better communication about changes to Tentacle.
:::

## Upgrading Octopus HA {#upgrading-octopus-ha}

You should generally follow the same instructions as above but upgrade one node at a time. This will allow you to keep the cluster running and avoid interruption to your users. Read more about [Managing High Availability Nodes](/docs/administration/high-availability/managing-high-availability-nodes.md).

:::warning
It is important to upgrade all nodes in your cluster during the same maintenance window, especially if the database schema is changed. The database schema will be upgraded when you upgrade the first node. Any nodes running the old version can fail due to a database schema mismatch.
:::

### Upgrading Octopus HA Nodes

Follow these steps to upgrade each node in your cluster:

1. Go to the {{Configuration>Nodes}} page.
1. Set Drain to `ON` for the node you want to upgrade.

    ![](/docs/images/3048440/5865778.png "width=500")

1. Wait until all the running tasks complete.
1. Upgrade the Octopus Server instance on the node.
1. Set Drain to `OFF` so the node starts processing tasks again.

## Upgrading Calamari {#UpgradingfromOctopus3.x-UpgradingCalamariUpgradingCalamari}

Calamari will either self-update automatically during a deployment if they are out of date with the latest available on the server, or they can be manually updated to avoid interrupting the deployment.

### Auto Update {#UpgradingfromOctopus3.x-AutoUpdate}

During a deployment process one of the first commands that's executed on the Tentacle is a check to confirm that the latest version of Calamari exists on the target machine. This is currently done by checking for the existence for an empty file in the folder location of`${env:TentacleHome}\Calamari\{{CalamariVersion}}\Success.txt` where the `CalamariVersion` variable is defined by the latest available on the Server.

When deploying to an environment with out of date Calamaris, they will be automatically upgraded. An info message on the deployment page will notify the user that this will happen.

![](https://cloud.githubusercontent.com/assets/1035315/10598722/bc8ea3f6-773e-11e5-8d0a-c72b6627ab9e.png "width=500")

**Manual Update**

The environments page will make machines without latest Calamari yellow, and show a green Update button (per environment) - this will just run a script that ensures Calamari is there.

![](https://cloud.githubusercontent.com/assets/1035315/10654656/9d182880-78b0-11e5-8ffd-c4b917e54730.png)

![](https://cloud.githubusercontent.com/assets/1035315/10654668/c07cc9d4-78b0-11e5-90d3-b79eb568e055.png "width=500")

**Upgrading Octopus Tentacles**

The role of Tentacles has changed in **Octopus 3.x**. Tentacles in 3.x are only responsible for the secure communication protocol, and then calling Calamari to actually perform deployments. This means Tentacle only needs to change when we change some part of the secure communication protocol (hopefully very infrequently).

:::hint
**Why have there been so many different versions of Tentacle 3.x?**
In early versions of 3.x we have been rebuilding Tentacle in lock-step with Octopus Server due to shared dependencies in their project structure even though there have not been any changes to Tentacle itself. We hope to unlock these in the near future.
:::

**Octopus 3.1** supports automatically updating Tentacles via the Environments page. You can upgrade all Tentacles which will systematically work through all Machines in all Environments in batches until all Tentacles are upgraded.

![](/docs/images/3048440/3278436.png "width=500")

Alternatively you can upgrade Tentacles one Environment at a time.

![](/docs/images/3048440/3278437.png "width=500")

:::success
**Optional and Required Tentacle upgrades**
In most cases we will maintain backwards compatibility between versions of Octopus Server and Tentacle. In these cases the Environments page will **recommend** updating your Tentacles while still allowing deployments to continue as normal. In the rare occasion we need to break compatibility you will be **required** to upgrade any incompatible Tentacles before you can Deploy to those machines again from the upgraded Octopus Server.
:::

## Upgrading to Octopus 3.1 or Greater {#UpgradingfromOctopus3.x-UpgradingTo31UpgradingtoOctopus3.1orgreater}

Summary: Tentacle was upgraded from .NET 4.0 to .NET 4.5 to enable TLS 1.2.

:::success
**You can upgrade to Octopus Server 3.1 without upgrading any Tentacles and get all of the new 3.1 deployment features because Calamari will continue to work on both Tentacle 3.0 and 3.1.**
:::

This is the first version of **Octopus 3.x** where there has been a Tentacle upgrade and it has caused some confusion. This section aims to answer some of the most commonly asked questions about upgrading to Octopus 3.1 and the impact on Tentacles.

**Am I required to upgrade to Tentacle 3.1?**
No, you aren't required to upgrade to Tentacle 3.1. Tentacle 3.0 will still work and benefit from the latest version of Calamari and all of the deployment features we shipped in **Octopus 3.1**.

**What changed with Tentacle 3.1?**
The Octopus-Tentacle communication protocol in 3.1 can use TLS 1.2 which requires .NET 4.5 to be installed on the server.

**When should I upgrade to Tentacle 3.1?**
We recommend upgrading to Tentacle 3.1 as soon as you are able. Upgrading Tentacles in **Octopus 3.1** is automated and can be done through the Environments page. The main benefit you'll get is the Octopus-Tentacle communication protocol can use TLS 1.2.

**What would stop me from upgrading to Tentacle 3.1?**
[Your server needs to support .NET 4.5](https://msdn.microsoft.com/en-us/library/8z6watww%28v=vs.110%29.aspx). Tentacle 3.1 requires .NET 4.5 to be installed on the server, which is what enables TLS 1.2 support, and .NET 4.5 is supported on Windows Server 2008 SP2 or newer. This means Windows Server 2003 and Windows Server 2008 SP1 are not supported for Octopus Server or Tentacle 3.1.

**How can I make Octopus/Tentacle use TLS 1.2 instead of TLS 1.0?**
Octopus Server and Tentacle to 3.1 will use TLS 1.2 by default. **Tentacle 3.0** will still work with **Octopus 3.1**, but the communication protocol will fall back to the lowest-common denominator of TLS 1.0.

**Can I have a mixture of Tentacle 3.0 and 3.1? I'm not ready to upgrade some of my application servers.**
Yes, you can have a mixture of **Tentacle 3.0** and **3.1** working happily with **Octopus 3.1**. We have committed to maintaining compatibility with the communication protocol.

**If I keep running Tentacle 3.0 does that mean I won't get any of the new Octopus 3.1 deployment features?**
The deployment features are handled by Calamari and Octopus Server makes sure all Tentacles have the latest Calamari. This means servers hosting **Tentacle 3.0** or **3.1** will get all of the new deployment features we shipped with **Octopus 3.1** by means of the latest Calamari.

**Will you continue to support Windows Server 2003 or Windows Server 2008 SP1?**
No, from **Octopus 3.1** onward we are dropping official support for Octopus Server and Tentacle hosted on Windows Server 2003 or Windows Server 2008 SP1.

:::hint
**Tentacle communications protocol**
Read more about the [Octopus - Tentacle communication](/docs/administration/security/octopus-tentacle-communication/index.md) protocol and [Troubleshooting Schannel and TLS](/docs/administration/security/octopus-tentacle-communication/troubleshooting-schannel-and-tls.md).
:::

## Upgrading to Octopus 3.4 or Greater {#UpgradingfromOctopus3.x-UpgradingtoOctopus3.4orgreater}

See the [Release Notes](https://octopus.com/downloads/compare?from=3.3.27&amp;to=3.4.0) for breaking changes and more information.

**Using TeamCity NuGet feeds?** You will need to upgrade your TeamCity server to v9.0 or newer and [enable the NuGet v2 API](https://teamcity-support.jetbrains.com/hc/en-us/community/posts/206817105-How-to-enable-NuGet-feed-v2). **Octopus 3.4**+ no longer supports the custom NuGet v1 feeds from TeamCity 7.x-8.x. We recommend upgrading to the latest TeamCity version available due to continual improvements in their NuGet feed - or switch to using the [Octopus built-in repository](/docs/packaging-applications/package-repositories/index.md).

**Want to use SemVer 2 for packages or releases?** You will need to upgrade OctoPack and/or octo.exe to 3.4 or newer.

## Upgrading to Octopus 3.5 or Greater {#UpgradingfromOctopus3.x-UpgradingtoOctopus3.5orgreater}

Some server configuration values are moved from the config file into the database in 3.5+.

If you are upgrading to a 3.5+ version please backup your server config file prior to upgrading. If you need to downgrade then replace the config with the original file after the downgrade and restart Octopus Deploy Server.

## How to Downgrade to a Previously Installed Instance of Octopus Server {#Howtodowngradetoapreviousinstalledinstanceofoctopusserver}

If for any reason you need to downgrade to a previous version of Octopus Server, follow the steps below:

1. Turn [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode.md) `ON`.

:::warning
Wait until all current tasks and deployments have completed.
:::

![](/docs/images/3048440/5865775.png "width=500")

2. Navigate to the Octopus Manager and stop the Octopus service.

![](/docs/images/3048440/5866175.png "width=500")

3. Restore the database, by using the database back up you completed prior to installing the new version you were upgrading to.

:::warning
Any data that has been created from between when the backup was taken to when it was restored will be lost. You should always use the most recent backup, or rolling forward may be a better solution if the backup is old.
:::

4. Download the previous version of the Octopus installer, from our [Previous releases page](https://octopus.com/downloads/previous).

![](/docs/images/3048440/5866176.png "width=500")

5. Install the previous version you are rolling back to, over the top of the installation you are rolling back from.

:::warning
There is no need to uninstall the newer version you were trying to upgrade to.
:::

6. Turn [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode.md) `OFF`.

## Troubleshooting {#UpgradingfromOctopus3.x-Troubleshooting}

In a few cases a bug in a 3rd party component causes the installer displays a "Installation directory must be on a local hard drive" error. If this occurs, running the install again from an elevated command prompt using the following command (replacing Octopus.3.3.4-x64.msi with the name of the installer you are using):

`msiexec /i Octopus.3.3.4-x64.msi WIXUI_DONTVALIDATEPATH="1"`

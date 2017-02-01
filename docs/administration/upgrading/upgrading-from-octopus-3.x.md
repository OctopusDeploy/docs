---
title: Upgrading from Octopus 3.x
position: 3
---

The following guide provides an overview of how the various components of Octopus Deploy 3.x can be updated to the latest release.

In this section:

- Update Available Notification
- Upgrading Octopus Server
- Upgrading Calamari
- Upgrading to Octopus 3.1 or greater
- Upgrading to Octopus 3.4 or greater
- Upgrading to Octopus 3.5 or greater
- Troubleshooting

## Update Available Notification {#UpgradingfromOctopus3.x-UpdateAvailableNotification}

When an update is available, a bullhorn icon will appear in the top status bar with details and a link to the downloads page.

![](/docs/images/3048440/3278327.png "width=500")

:::warning
**What is included in the release?**
You can find the differences between your current version and the newest version using our [Compare versions](https://octopus.com/downloads/compare) page. Please note that this will also list the release notes for major and minor version changes which may include **breaking changes** or **dependencies** that you may need to also update. It is important to know what might be effected by your upgrade.
:::

## Upgrading Octopus Server {#UpgradingfromOctopus3.x-UpgradingOctopusServerUpgradingOctopusServer}

Upgrading the Octopus Deploy Server is easy, you will just need to follow these steps:

1. Switch your server to Maintenance Mode and wait until all current tasks and deployments have completed. This ensures that no further changes will be made that may potentially become lost if the upgrade fails and you need to rollback.

![](/docs/images/3048440/5865775.png "width=500")

2. [Backup your database and master key](/docs/administration/backup-and-restore.md) so that it can be restored in case anything goes wrong.

![](/docs/images/3048440/5865780.png "width=500")

3. Download the latest [Octopus Deploy MSI installer
![](/docs/images/3048440/5865777.png "width=500")
](https://octopus.com/downloads)

4. Run the installer and follow the prompts.

![](/docs/images/3048440/5865779.png "width=500")

5. Disable Maintenance Mode.

![](/docs/images/3048440/5865776.png "width=500")

6. Calamari will then be automatically updated if required with the next health check or deployment that takes place.

:::success
**No need to upgrade the Tentacle**
Given that the deployment code is now embedded within Calamari, and this gets pushed out automatically as needed by the Octopus Deploy Server, you no longer need be concerned about ensuring the version number between Tentacle and Server remain in lockstep. Although builds of the Server will be available for download with matching build numbers of the Tentacle, this is an artifact of our project structure and something we would soon like to address. You should rarely be required to update the Tentacle, regardless of what version of the Server you are running.
:::

:::success
**Upgrading server nodes in Octopus HA**
You should follow the same instructions as above, but drain tasks from each node in the HA cluster and upgrade them individually. This will allow you to keep the cluster running and avoid interruption to your users. Read more about [Managing High Availability Nodes](/docs/administration/high-availability/managing-high-availability-nodes.md).

![](/docs/images/3048440/5865778.png "width=500")
:::

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

Upgrading Octopus Tentacles

The role of Tentacles has changed in Octopus 3.x. Tentacles in 3.x are only responsible for the secure communication protocol, and then calling Calamari to actually perform deployments. This means Tentacle only needs to change when we change some part of the secure communication protocol (hopefully very infrequently).

:::hint
**Why have there been so many different versions of Tentacle 3.x?**
In early versions of 3.x we have been rebuilding Tentacle in lock-step with Octopus Server due to shared dependencies in their project structure even though there have not been any changes to Tentacle itself. We hope to unlock these in the near future.
:::

Octopus 3.1 supports automatically updating Tentacles via the Environments page. You can upgrade all Tentacles which will systematically work through all Machines in all Environments in batches until all Tentacles are upgraded.

![](/docs/images/3048440/3278436.png "width=500")

Alternatively you can upgrade Tentacles one Environment at a time.

![](/docs/images/3048440/3278437.png "width=500")

:::success
**Optional and Required Tentacle upgrades**
In most cases we will maintain backwards compatibility between versions of Octopus Server and Tentacle. In these cases the Environments page will **recommend** updating your Tentacles while still allowing deployments to continue as normal. In the rare occasion we need to break compatibility you will be **required** to upgrade any incompatible Tentacles before you can Deploy to those machines again from the upgraded Octopus Server.
:::

## Upgrading to Octopus 3.1 or greater {#UpgradingfromOctopus3.x-UpgradingTo31UpgradingtoOctopus3.1orgreater}

Summary: Tentacle was upgraded from .NET 4.0 to .NET 4.5 to enable TLS 1.2.

:::success
**You can upgrade to Octopus Server 3.1 without upgrading any Tentacles and get all of the new 3.1 deployment features because Calamari will continue to work on both Tentacle 3.0 and 3.1.**
:::

This is the first version of Octopus 3.x where there has been a Tentacle upgrade and it has caused some confusion. This section aims to answer some of the most commonly asked questions about upgrading to Octopus 3.1 and the impact on Tentacles.

**Am I required to upgrade to Tentacle 3.1?**
No, you aren't required to upgrade to Tentacle 3.1. Tentacle 3.0 will still work and benefit from the latest version of Calamari and all of the deployment features we shipped in Octopus 3.1.

**What changed with Tentacle 3.1?**
The Octopus-Tentacle communication protocol in 3.1 can use TLS 1.2 which requires .NET 4.5 to be installed on the server.

**When should I upgrade to Tentacle 3.1?**We recommend upgrading to Tentacle 3.1 as soon as you are able. Upgrading Tentacles in Octopus 3.1 is automated and can be done through the Environments page. The main benefit you'll get is the Octopus-Tentacle communication protocol can use TLS 1.2.

**What would stop me from upgrading to Tentacle 3.1?**
[Your server needs to support .NET 4.5](https://msdn.microsoft.com/en-us/library/8z6watww%28v=vs.110%29.aspx). Tentacle 3.1 requires .NET 4.5 to be installed on the server, which is what enables TLS 1.2 support, and .NET 4.5 is supported on Windows Server 2008 SP2 or newer. This means Windows Server 2003 and Windows Server 2008 SP1 are not supported for Octopus Server or Tentacle 3.1.

**How can I make Octopus/Tentacle use TLS 1.2 instead of TLS 1.0?**
Octopus Server and Tentacle to 3.1 will use TLS 1.2 by default. Tentacle 3.0 will still work with Octopus Server 3.1, but the communication protocol will fall back to the lowest-common denominator of TLS 1.0.

**Can I have a mixture of Tentacle 3.0 and 3.1? I'm not ready to upgrade some of my application servers.**
Yes, you can have a mixture of Tentacle 3.0 and 3.1 working happily with Octopus Server 3.1. We have committed to maintaining compatibility with the communication protocol.

**If I keep running Tentacle 3.0 does that mean I won't get any of the new Octopus 3.1 deployment features?**
The deployment features are handled by Calamari and Octopus Server makes sure all Tentacles have the latest Calamari. This means servers hosting Tentacle 3.0 or 3.1 will get all of the new deployment features we shipped with Octopus 3.1 by means of the latest Calamari.

**Will you continue to support Windows Server 2003 or Windows Server 2008 SP1?**
No, from Octopus 3.1 onward we are dropping official support for Octopus Server and Tentacle hosted on Windows Server 2003 or Windows Server 2008 SP1.

:::hint
**Tentacle communications protocol**
Read more about the [Octopus - Tentacle communication](/docs/reference/octopus-tentacle-communication/index.md) protocol and [Troubleshooting Schannel and TLS](/docs/reference/octopus-tentacle-communication/troubleshooting-schannel-and-tls.md).
:::

## Upgrading to Octopus 3.4 or greater {#UpgradingfromOctopus3.x-UpgradingtoOctopus3.4orgreater}

See the [Release Notes](https://octopus.com/downloads/compare?from=3.3.27&amp;to=3.4.0) for breaking changes and more information.

**Using TeamCity NuGet feeds?** You will need to upgrade your TeamCity server to v9.0 or newer and [enable the NuGet v2 API](https://teamcity-support.jetbrains.com/hc/en-us/community/posts/206817105-How-to-enable-NuGet-feed-v2). Octopus 3.4+ no longer supports the custom NuGet v1 feeds from TeamCity 7.x-8.x. We recommend upgrading to the latest TeamCity version available due to continual improvements in their NuGet feed - or switch to using the [Octopus built-in repository](/docs/packaging-applications/package-repositories/index.md).

**Want to use SemVer 2 for packages or releases?** You will need to upgrade OctoPack and/or octo.exe to 3.4 or newer.

## Upgrading to Octopus 3.5 or greater {#UpgradingfromOctopus3.x-UpgradingtoOctopus3.5orgreater}

Some server configuration values are moved from the config file into the database in 3.5+.

If you are upgrading to a 3.5+ version please backup your server config file prior to upgrading. If you need to downgrade then replace the config with the original file after the downgrade and restart Octopus Deploy server.

How to downgrade to a previously installed instance of Octopus Server

If for any reason you need to downgrade to a previous version of Octopus Server, follow the steps below:

1. Navigate to ‘Configuration’, then select the ‘Maintenance’ tab on the sidebar.  Toggle the switch for ‘Maintenance Mode’ to ‘ON’.

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

6. Turn off Maintenance mode from Step 1.

## Troubleshooting {#UpgradingfromOctopus3.x-Troubleshooting}

In a few cases a bug in a 3rd party component causes the installer displays a "Installation directory must be on a local hard drive" error. If this occurs, running the install again from an elevated command prompt using the following command (replacing Octopus.3.3.4-x64.msi with the name of the installer you are using):

`msiexec /i Octopus.3.3.4-x64.msi WIXUI_DONTVALIDATEPATH="1"`

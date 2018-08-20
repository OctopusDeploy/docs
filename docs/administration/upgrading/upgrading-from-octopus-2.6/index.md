---
title: Upgrading from Octopus 2.6
description: Information on how to upgrade from Octopus 2.6 to newer versions.
position: 2
---

Normally, upgrading Octopus is quite easy - just install the new version over the top. We made some really big changes to our data storage and Tentacle communication protocols in Octopus: upgrading from **Octopus 2.6** is a bit more complicated.

Upgrading to newer versions of Octopus is only possible from Octopus 2.6.x; if you're running a previous version of Octopus:

1. Upgrade to **Octopus 2.6.5**, then
1. Upgrade to the latest version of Octopus.

:::success
**Upgrade to the latest version**
When upgrading to newer versions of Octopus please use the latest version available. We have been constantly improving the data migration process whilst adding new features and fixing bugs.
:::

## Planning Your Upgrade

There are two main parts to the upgrade:

1. **Install the Octopus Server and migrate your data** - we changed our data persistence to use Microsoft SQL Server so we need to migrate the data from your existing Octopus Server to the new database
1. **Upgrade all your Tentacles** - we changed the communications protocol significantly, but we've provided an easy way for you to upgrade all your Tentacles using your existing Octopus Server. See [below](#tentacles).

We recommend choosing from two different approaches for upgrading from Octopus 2.6:

- Create a new Octopus Server and migrate to it. We recommend this approach.
- Install over the top of your existing Octopus Server.

### Approach 1: Install the New Version of Octopus on a New Server, and Migrate To It (recommended) {#UpgradingfromOctopus2.6-Approach1:Install3.xonanewserver,andmigratetoit(recommended)}

If you are able to provision a new Octopus Server, this is the safest option. That way, if something goes wrong in the upgrade, it will be easy to discard the new server and start the process again. And when it works, you can decommission the old Octopus Server.

Read the full guide: [Upgrade with a new Server instance](/docs/administration/upgrading/upgrading-from-octopus-2.6/upgrade-with-a-new-3.0-server-instance.md)

### Approach 2: In-place (Over the Top) Upgrade of an Existing Server {#UpgradingfromOctopus2.6-Approach2:In-place(overthetop)upgradeofanexistingserver}

It is possible to install newer versions of Octopus over the top of a 2.6 instance. You'll upgrade the Tentacles, then upgrade the Octopus Server.

Read the full guide: [In place (over the top) upgrade](/docs/administration/upgrading/upgrading-from-octopus-2.6/in-place-upgrade-install-over-2.6.md)

## Upgrading Your Existing Tentacles {#tentacles}

We have significantly change the communications protocol used by Tentacle. This means your 2.6 Tentacles won't be able to communicate to your new Octopus Server. Likewise, new Tentacles won't be able to communicate with your old Octopus Server. Once you upgrade, going back can be difficult. Please take time to plan your upgrade carefully using this guide.

### Small Number of Tentacles

> "I have an Octopus Server and a handful of Tentacles. I don't mind manually running the new Tentacle MSI's on each of my Tentacle machines."

If you only have a small number of Tentacles, it's easiest to just download the new Octopus and Tentacle MSI's and install them manually.

Read the full guide: [Manual upgrades for smaller instances](/docs/administration/upgrading/upgrading-from-octopus-2.6/manual-upgrade.md)

### Lots of Tentacles {#UpgradingfromOctopus2.6-Largerinstallations}

> "I have lots of Tentacles; there's no way I'm manually updating them all!"

Don't worry, we've got you covered! We build a tool called **Hydra** to help you upgrade all your Tentacles during the upgrade process.

:::warning
Please pay careful attention to the instructions in these guides; if you skip ahead and do the upgrade in the wrong order, you might be stuck upgrading all Tentacles manually!
:::

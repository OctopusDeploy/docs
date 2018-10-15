---
title: Upgrading Octopus
description: Everything you need to know about upgrade Octopus to a newer version.
position: 50
---

We release new versions of Octopus Deploy often, so we try to make the process of upgrading Octopus easy. This page outlines the process of upgrading between Octopus versions. This page describes some of the general concepts around upgrading Octopus, and we provide guides for the more complicated upgrades.

:::success
**Octopus 2018** has been released! Go [download it now](https://octopus.com/downloads).
:::

## Before You Begin

Before you start your upgrade, you should take time to:

- Test your [backup and restore process](/docs/administration/backup-and-restore.md).
- Learn about [maintenance mode](/docs/administration/upgrading/maintenance-mode.md).
- [Plan your upgrade](#upgrade-path).

## Upgrade Path {#upgrade-path}

There are lots of improvements and changes between major versions of Octopus. Please take the time to plan your upgrade path carefully.

:::warning
**Broken upgrade paths**

See [this issue](https://github.com/OctopusDeploy/Issues/issues/4979) for broken upgrade paths that require special attention.
:::

- [Upgrading from Octopus 3.x](/docs/administration/upgrading/upgrading-from-octopus-3.x.md) is generally easy.
  - Upgrading from **Octopus 3.x** to **Octopus 4.x** or **Octopus 2018.x**.
  Follow the same process as you would normally to upgrade your **Octopus 3.x** installation.
- [Upgrading from Octopus 2.6 to a newer version of Octopus](/docs/administration/upgrading/upgrading-from-octopus-2.6/index.md).
  - If you are running a version of Octopus prior to **Octopus 2.6**, you will need to upgrade to **Octopus 2.6** and then upgrade to the latest version of Octopus.  
- [Upgrading from Octopus 2.x](/docs/administration/upgrading/upgrading-from-octopus-2.0.md).
- [Upgrading from Octopus 1.6 to 2.x](/docs/administration/upgrading/upgrading-from-octopus-1.6.md).
  - If you are running a version of Octopus prior to **Octopus 1.6**, you will need to upgrade to **Octopus 1.6** and then upgrade to **Octopus 2.x**.
  - Hint: You can upgrade from **Octopus 1.6** to any version of **Octopus 2.x**. We recommend upgrading from **Octopus 1.6** to the latest version of **Octopus 2.6** directly. This is the quickest path to continue upgrading to the latest version of Octopus.

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
  - For example: **Octopus 2018.1.4** to **Octopus 2018.2.1** would be a Minor upgrade. Make sure to test a [backup and restore](/docs/administration/backup-and-restore.md) before upgrading. If you need to downgrade for any reason, you should restore the backup, and then reinstall **Octopus 3.4.4**.
- **Major upgrade** = We will provide a detailed upgrade guide for any Major upgrades.
  - For example: **Octopus 3.6.5** to **Octopus 2018.1.4** would be a Major upgrade. You should take care when performing a major upgrade and follow our upgrade guide carefully.

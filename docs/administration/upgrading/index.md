---
title: Upgrading
position: 8
---

We release new versions of Octopus Deploy often, so we try to make the process of upgrading your Octopus server easy. This page outlines the process of upgrading between Octopus versions.

:::warning
We highly recommend testing your [Backup and Restore](/docs/administration/backup-and-restore.md) process prior to upgrading Octopus Deploy, regardless of whether you are applying a Patch or performing a Major or Minor upgrade.
:::

There are lots of improvements and changes between Octopus 1.X, Octopus 2.X and Octopus 3.x so we have guides to walk you through the process of upgrading from each version.

- [Upgrading from Octopus 1.6](/docs/administration/upgrading/upgrading-from-octopus-1.6.md)
- [Upgrading from Octopus 2.0](/docs/administration/upgrading/upgrading-from-octopus-2.0.md)
- [Upgrading from Octopus 2.6](/docs/administration/upgrading/upgrading-from-octopus-2.6/index.md)
- [Upgrading from Octopus 3.x](/docs/administration/upgrading/upgrading-from-octopus-3.x.md)

:::warning
If you are running a version of Octopus prior to 2.6, you will need to upgrade to 2.6 and then upgrade to 3.x.
:::

## How we version Octopus Deploy {#Upgrading-HowweversionOctopusDeploy}

We use Semantic Versioning to help you understand the type of changes we have introduced between two versions of Octopus Deploy:

1. **Major version change** = beware of major breaking changes and new features
 1. For example, from 1.x => 2.x we rewrote the HTTP API, and from 2.x => 3.x we changed the Tentacle communication protocol and moved to SQL Server.
 2. Upgrading may require some manual intervention, we will provide a detailed upgrade guide, and downgrading may be difficult
 3. Check our release notes for more details
2. **Minor version change** = new features, potential for minor breaking changes and database changes
 1. For example, in 3.3 we made a change to how Sensitive Properties work in the API
 2. Upgrading should be easy, but rolling back will usually require restoring your database
 3. We will usually make changes to the database schema
 4. We will usually make changes to the API
 5. Check our release notes for more details
3. **Patch version change** = small bug fixes and computational logic changes
 1. Patches should be **safe to update, safe to roll back**
 2. Any database schema changes will be minimal, and be safe to run older and newer versions of Octopus on (within the same major/minor version)
 3. We may decide to make API changes, but any changes will be backwards compatible

:::success
**Release Notes**
For every Major and Minor release we will provide release notes highlighting new features and calling out breaking changes. For example, you can see the features and highlights for the latest feature release on our [downloads page](https://octopus.com/downloads).

You can also use our release comparison tool to see **all of the changes** introduced between any two versions of Octopus Deploy. For example: [https://octopus.com/downloads/compare?from=3.2.15&to=3.5.2](https://octopus.com/downloads/compare?from=3.2.15&amp;to=3.5.2)
:::

## Downgrading or Rolling Back an Upgrade {#Upgrading-DowngradingorRollingBackanUpgrade}

The process for successfully downgrading depends on the upgrade you have performed.

1. **Patch upgrade** = If you install a patch of Octopus Deploy and run into any problems, you should be able to reinstall the version of Octopus Deploy that was installed prior to the upgrade straight over-the-top without any problems
 1. For example: 3.4.4 => 3.4.12 (same Major.Minor but different Patch). If you need to downgrade for any reason you should be able to reinstall 3.4.4 straight over the top of 3.4.12.
2. **Minor upgrade** = If you perform a Minor upgrade and run into any problems, you will need to restore a recent SQL Database backup and reinstall the version of Octopus Deploy that was installed prior to the upgrade
 1. For example: 3.4.4 => 3.5.1 would be a Minor upgrade. Make sure to test a [backup and restore](/docs/administration/backup-and-restore.md) before upgrading. If you need to downgrade for any reason, you should restore the backup, and then reinstall 3.4.4.
3. **Major upgrade** = We will provide a detailed upgrade guide for any Major upgrades
 1. For example: 2.6.5 => 3.4.12 would be a Major upgrade. You should take care when performing a major upgrade and follow our upgrade guide carefully.

:::success
We recommend putting your Octopus Server into Maintenance Mode when performing any of these operations.
:::

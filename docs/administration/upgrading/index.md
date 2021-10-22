---
title: Upgrading Octopus
description: Everything you need to know about upgrading Octopus to a newer version.
position: 40
hideInThisSection: true
---

This guide is for customers managing their self-hosted installation of Octopus. If you are using Octopus Cloud, we take care of everything for you, which means you don't need to worry about upgrades, and you have early access to all the latest features.

## About this guide

This guide provides various upgrade scenarios with the goal of mitigating risk.  

## Core concepts

Octopus Deploy connects to a SQL Server database, and can be hosted:

- As a Windows Service, installed via an MSI.
- In a container, either:
    - A [Linux](docs/installation/octopus-in-container/octopus-server-container-linux.md) container (recommended)
    - A [Windows](docs/installation/octopus-in-container/octopus-server-container-windows.md) container *(deprecated)*

### Upgrade Process

When running on Windows, the typical (manual) upgrade process is:
- Run the MSI to install the latest binaries.
- After the MSI finishes, it will close, and the **Octopus Manager** is launched to update each instance.

Once the **Octopus Manager** starts the upgrade process, downtime _will_ occur.  The upgrade should take anywhere from a minute to 30 minutes to complete depending on the number of database changes, the database's size, and compute resources.  A good rule of thumb is: the greater the delta between versions, the longer the downtime.  An upgrade from 2019.2.1 to 2020.5.1 will generally take longer than an upgrade from 2020.4.1 to 2020.5.1.  

:::hint
[Automating your upgrade process](/docs/administration/upgrading/guide/automate-upgrades.md) will help reduce the total upgrade time.  Automation also mitigates risk, as all steps, including backups, will be followed.  We've found companies who automate their upgrade process are much more likely to stay up to date.  The smaller the delta between versions, the faster the upgrade.
:::

**Upgrades and the Service Watchdog**

If you are using the [Service Watchdog](/docs/administration/managing-infrastructure/service-watchdog.md), you will need to cancel it before you start your upgrade and recreate it after the upgrade is finished. Documentation on canceling the watchdog can be found [here](/docs/administration/managing-infrastructure/service-watchdog.md#ServiceWatchdog-CancelingtheWatchdog).


### Upgrading a highly available Octopus Deploy instance

You are required to install the same MSI on all servers or nodes in your highly available Octopus Deploy instance.  The MSI installs the updated binaries, which include the latest database upgrade scripts.  Unlike the binaries, the database upgrade only needs to happen once.

:::warning
A small outage window will occur when upgrading a highly available Octopus Deploy instance.  The outage window will happen between when you shut down all the nodes and upgrade the first node.  The window duration depends on the number of database changes, the size of the database, and compute resources.  It is highly recommended to [automate your upgrade process](/docs/administration/upgrading/guide/automate-upgrades.md) to reduce that outage window.
:::

### Components

The Windows Service is split across multiple folders to make upgrading easy and low risk.

- **Install Location**: By default, the install location for Octopus on Windows is `C:\Program Files\Octopus Deploy\Octopus`.  The install location contains the binaries for Octopus Deploy and is updated by the MSI.
- **SQL Server Database**: Since `Octopus Deploy 3.x`, the back-end database has been SQL Server.  Each update can contain 0 to N database scripts embedded in a .dll in the install location.  The **Octopus Manager** invokes those database scripts automatically.
- **Home Folder**: The home folder stores configuration, logs, and other items unique to your instance.  The home folder is separate from the install location to make it easier to upgrade, downgrade, uninstall/reinstall without affecting your instance.  The default location of the home folder is `C:\Octopus`.  Except in rare cases, this folder is left unchanged by the upgrade process.
- **Instance Information**: The Octopus Deploy Manager allows you to configure 1 to N instances per Windows Server.  The **Octopus Manager** stores a list of all the instances in the `C:\ProgramData\Octopus\OctopusServer\Instances` folder.   Except in rare cases, this folder is left unchanged by the upgrade process.  
- **Server Folders**: Logs, artifacts, and packages are too big for Octopus Deploy to store in a SQL Server database.  The server folders are subfolders in `C:\Octopus\`.  Except in rare cases, these folders are left unchanged by an upgrade.  
- **Tentacles**: Octopus Deploy connects to deployment targets via the Tentacle service.  Each version of Octopus Deploy includes a specific Tentacle version.  Tentacle upgrades do not occur until _after_ the Octopus Deploy server is upgraded.  Tentacle upgrades are optional; any Tentacle greater than 4.x will work [with any modern version of Octopus Deploy](docs/support/compatibility.md).  We recommend you upgrade them to get the latest bug fixes and security patches when convenient.  
- **Calamari**: The Tentacles facilitate communication between Octopus Deploy and the deployment targets.  Calamari is the software that does the actual deployments.  Calamari and Octopus Deploy are coupled together.  Calamari is upgraded automatically during the first deployment to a target.

## Octopus Deploy Server release schedule

!include <octopus-releases>

## How we version Octopus Deploy {#Upgrading-HowweversionOctopusDeploy}

We use our version numbering scheme to help you understand the type of changes we have introduced between two versions of Octopus Deploy:

- **Major version change**: Beware of major breaking changes and new features.
  - Example **Octopus 2019.x** to **Octopus 2020.x**.
  - Breaking changes means downgrading will be difficult.  Check our release notes for more details.
    - In **Octopus 2019.1** Spaces was introduced, changing the folder structure and user management.
    - In **Octopus 2020.1** We started requiring SQL Server 2016 or higher
- **Minor version change**: New features, the potential for minor breaking changes, and database changes.
  - Example **Octopus 2020.1.x** to **Octopus 2020.2.x**.
  - Upgrading should be easy, but rolling back will require restoring your database.  Check our release notes for more details.
    - We will usually make changes to the database schema.
    - We will usually make changes to the API, being backward compatible wherever possible.  
- **Build version change**: Small bug fixes and computational logic changes.
  - Example **Octopus 2021.1.7500** to **Octopus 2021.1.7595** (upgrade or downgrade).
  - Patches should be **safe to update, safe to roll back*.
  - We will rarely make database changes, only if we absolutely must to patch a critical bug. If we do, the change will be safe for any other patches of the same release.
  - We may decide to make API changes, but any changes will be backward compatible.

If you're interested in more details about versioning Octopus, check out the blog post [Octopus Deploy version changes for 2018](https://octopus.com/blog/version-change-2018).

## Scenarios

Please pick from one of these upgrade scenarios.  Any version 3.x or higher is considered modern; any version before that is considered legacy.

- [Upgrading minor and patch releases](/docs/administration/upgrading/guide/upgrading-minor-and-patch-releases.md)
- [Upgrading major releases](/docs/administration/upgrading/guide/upgrading-major-releases.md)
- [Upgrading from Octopus 4.x or 2018.x to latest version](/docs/administration/upgrading/guide/upgrading-from-octopus-4.x-2018.x-to-modern.md)
- [Upgrading from Octopus 3.x to latest version](/docs/administration/upgrading/guide/upgrading-from-octopus-3.x-to-modern.md)
- [Upgrading host OS or .NET version](/docs/administration/upgrading/guide/upgrade-host-os-or-net.md)
- Legacy Upgrades
  - [Upgrade from 2.6.5 to 2018.10.x](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/index.md)
  - [Upgrade from 2.x to 2.6.5](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.x-2.6.5.md)
  - [Upgrade from 1.6 to 2.6.5](/docs/administration/upgrading/legacy/upgrading-from-octopus-1.6-2.6.5.md)

:::hint
Prior to Octopus Deploy 3.x, the backing database was RavenDB.  That is why we consider it a legacy upgrade.
:::

## Mitigating Risk

The best way to mitigate risk is to automate the upgrade and/or create a test instance.  Automation ensures all steps, including backups, are followed for every upgrade.  A test instance allows you to test out upgrades and new features without affecting your main instance.

- [Automating upgrades](/docs/administration/upgrading/guide/automate-upgrades.md)
- [Create a test instance](/docs/administration/upgrading/guide/creating-test-instance.md)

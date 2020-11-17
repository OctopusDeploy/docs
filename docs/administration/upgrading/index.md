---
title: Upgrading Octopus
description: Everything you need to know about upgrading Octopus to a newer version.
position: 70
---

This guide is for customers managing their self-hosted installation of Octopus. If you are using Octopus Cloud we take care of everything for you, and you will have early access to all the latest features.

## About this guide

This guide is designed to cover different upgrade scenarios.  The goal is to help ensure any upgrade mitigates as much risk as possible.

## Core concepts

At it's core, Octopus Deploy is a Windows Service (or Linux Service) that connects to a SQL Server database.  On Windows, that service is installed via an MSI which automates quite a bit. 

### Upgrade Process

The typical upgrade process is:
- Run MSI to install the latest binaries.
- Once the MSI is finished it will close and the `Octopus Manager` is launched to update each instance.

### Components

That windows service is split across multiple folders to make upgrading easy and low risk.

- **Install Location** By default, Octopus Deploy is installed into the `C:\Program Files\Octopus Deploy\Octopus` folder.  This folder contains the binaries for Octopus Deploy.  This is what the Octopus Deploy installer updates by installing new binaries.
- **SQL Server Database** Since `Octopus Deploy 3.x` the backend database has been SQL Server.  A major or minor version change will result in 1 to N database scripts, which are embedded in a .dll in the install location.  The `Octopus Manager` invokes those database scripts.
- **Home Folder** The home folder stores configuration, logs, and other items unique to your instance.  The home folder is separate from the install location to make it easier to upgrade, downgrade, uninstall/reinstall without affecting your instance.  The default location of the home folder is `C:\Octopus`.  Except in rare cases, this folder is left unchanged by the upgrade process.
- **Instance Information** The Octopus Deploy Manager allows you to configure 1 to N instances per Windows Server.  The `Octopus Manager` stores a list of all the instances in the `C:\ProgramData\Octopus\OctopusServer\Instances` folder.   Except in rare cases, this folder is left unchanged by the upgrade proces..  
- **Server Folders** Some information, such as logs, artifacts, and packages that Octopus Deploy captures is too big to store in a SQL Server database.  The server folders are subfolders in `C:\Octopus\`.  Except in rare cases, these folders are left unchanged by an upgrade.  
- **Tentacles** Octopus Deploy connects to deployment targets via the tentacle service.  Each version of Octopus Deploy includes a specific tentacle version.  Upgrading tentacles is done after the server is updated.  It is also optional.  Any tentacle greater than 4.x will work [with any modern version of Octopus Deploy](docs/support/compatibility).  We recommend you upgrade them to get the latest bug fixes and security patches.  That upgrade doesn't have to happen right away.
- **Calamari** The tentacles facilite communication between Octopus Deploy and the deployment targets.  Calamari is the software that does the actual deployments.  A specific version Calamari is coupled with a specific version of Octopus Deploy.  Calamari is upgraded automatically during the first deployment to the target.

## Octopus Deploy Server release schedule

!include <octopus-releases>

We highly recommend using the latest release for your self-hosted installation of Octopus. We ship a new release every two months, and each release comes with six months of support.  Everything you need can be downloaded from [octopus.com/downloads](https://octopus.com/downloads).

## How we version Octopus Deploy {#Upgrading-HowweversionOctopusDeploy}

We use our version numbering scheme to help you understand the type of changes we have introduced between two versions of Octopus Deploy:

- **Major version change** = beware of major breaking changes and new features.
  - Example **Octopus 2019.x** to **Octopus 2020.x**.
  - Breaking changes means downgrading will be difficult.  Check our release notes for more details.
    - In **Octopus 2019.1** Spaces was introduced, changing the folder structure and user management.
    - In **Octopus 2020.1** We started requiring SQL Server 2016 or higher
- **Minor version change** = new features, potential for minor breaking changes and database changes.
  - Example **Octopus 2020.1.x** to **Octopus 2020.2.x**.
  - Upgrading should be easy, but rolling back will require restoring your database.  Check our release notes for more details.
    - We will usually make changes to the database schema.
    - We will usually make changes to the API, being backwards compatible wherever possible.  
- **Patch version change** = small bug fixes and computational logic changes.
  - Example **Octopus 2020.2.3** to any other patch of **Octopus 2020.2.x** (upgrade or downgrade).
  - Patches should be **safe to update, safe to roll back**.
  - We will very rarely make database changes, only if we absolutely must to patch a critical bug. If we do, the change will be safe for any other patches of the same release.
  - We may decide to make API changes, but any changes will be backwards compatible.

If you're interested in more details about how we are versioning Octopus, check out the blog post [Octopus Deploy version changes for 2018](https://octopus.com/blog/version-change-2018).

## Scenarios

Please pick from one of these upgrade scenarios.

- [Upgrade a major version change]()
- [Upgrade a minor version change]()
- [Upgrade from 2018.x to a modern version]()
- [Upgrade from 3.x to a modern version]()
- [Automating Upgrades]()
- [Upgrading the host OS or .NET]()
- Legacy Upgrades
  - [Upgrade from 2.6.5 to 2018.10.x]()
  - [Upgrade from 2.x to 2.6.5]()
  - [Upgrade from 1.6 to 2.6.5]()

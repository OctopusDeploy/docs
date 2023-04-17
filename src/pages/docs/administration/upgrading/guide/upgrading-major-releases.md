---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Upgrading major releases of Octopus Deploy
description: Information on how to upgrade major releases of Octopus Deploy.
navOrder: 3
---

A major release of Octopus Deploy is when the first number in the version is incremented.  For example, 2020.x.x to 2021.x.x.  Major releases require a bit more planning than minor or patch releases.  This guide will help minimize risk.

## Mitigate risk with a test instance

Major release upgrades typically carry a major change, making rollbacks tricky.  For example:

- **2019.1.0**: Introduced spaces, with several API changes and a new team model.
- **2020.1.0**: Deprecated support for SQL Server 2008 R2 and 2012.  

Except in rare cases, a standard in-place upgrade will work.  However, there are other considerations, such as integrations, API scripts, and so on to consider.  A test instance, be it a full clone of your main instance, or only a subset of your main instance, will allow you to test the upgrade itself, along with testing deployments and other integrations before upgrading your main instance.  If anything goes wrong, you have time to fix it.

In general, the process looks like this:

1. Create a test instance using the same version as your main instance.
1. Upgrade the test instance to the latest version of Octopus Deploy.
1. Verify the test instance works as expected along with testing integrations.
1. Upgrade the main instance.

Learn more about [creating a test instance](/docs/administration/upgrading/guide/creating-test-instance/).

## Prep Work

Before starting the upgrade, it is critical to back up the master key and license key.  If anything goes wrong, you might need these keys to do a restore.  It is better to have the backup and not need it than need the backup and not have it.  The master key doesn't change, while your license key changes, at most, once a year.  Back them up once to a secure location and move onto the standard upgrade process.

1. Backup the Master Key.
1. Backup the License Key.

!include <upgrade-octopus-backup-master-key>

## Standard upgrade process

The standard upgrade process is an in-place upgrade.  In-place upgrades update the binaries in the install directory and update the database.  The guide below includes additional steps to backup key components to make it easier to rollback in the unlikely event of a failure.

### Overview

The steps for this are:

1. Download the latest version of Octopus Deploy.
1. Enable maintenance mode.
1. Backup the database.
1. Do an in-place upgrade.
1. Test the upgraded instance.
1. Disable maintenance mode.

!include <upgrade-download-latest-version>
!include <upgrade-octopus-backup-database>
!include <upgrade-inplace-upgrade>
!include <upgrade-testing-upgraded-instance>
!include <upgrade-high-availability>

## Rollback failed upgrade

While unlikely, an upgrade may fail.  It could fail on a database upgrade script, SQL Server version is no longer supported, license check validation, or plain old bad luck.  Depending on what failed, you have a decision to make.  If the cloned instance upgrade failed, it might make sense to start all over again.  Or, it might make sense to roll back to a previous version.  In either case, if you decide to roll back, the process will be:

1. Restore the database backup.
1. Restore the folders.
1. Download and install the previously installed version of Octopus Deploy.
1. Do some sanity checks.
1. If maintenance mode is enabled, disable it.

!include <upgrade-restore-backup>
!include <upgrade-rollback-folders>
!include <upgrade-find-previous-version>
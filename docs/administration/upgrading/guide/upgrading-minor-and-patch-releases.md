---
title: Upgrading minor and patch releases of Octopus Deploy
description: Information on how to upgrade major releases of Octopus Deploy.
position: 2
---

A minor release of Octopus Deploy is when the second number in the version is incremented.  For example, 2020.4.x to 2020.5.x.  A patch release is when the third number is incremented, from 2020.4.1 to 2020.4.2.

## Standard Upgrade Process

The standard upgrade process is an in-place upgrade.  In-place upgrades update the binaries in the install directory and update the database.  The guide below includes additional steps to backup key components to make it easier to rollback in the unlikely event of a failure.

### Overview

The steps for this are:

1. Download the latest version of Octopus Deploy.
1. Backup master key
1. Enable maintenance mode on.
1. Backup the database.
1. Do an in-place upgrade.
1. Test the upgraded instance.
1. Disable maintenance mode.

!include <upgrade-download-latest-version>
!include <upgrade-octopus-backup-master-key>
!include <upgrade-octopus-backup-database>
!include <upgrade-inplace-upgrade>
!include <upgrade-testing-upgraded-instance>
!include <upgrade-high-availability>

## Rollback Failed Upgrade

While unlikely, an upgrade may fail.  It could fail on a database upgrade script, SQL Server version is no longer supported, license check validation, or plain old bad luck.  When that happens, it is time to rollback to a previous version.

Minor and patch releases are generally the easiest of the scenarios to rollback.  The process will be:

1. Restore the database backup.
1. Download and install the previously installed version of Octopus Deploy.
1. Do some sanity checks.
1. If maintenance mode is enabled, disable it.

!include <upgrade-restore-backup>
!include <upgrade-find-previous-version>

## Recommendation - creating a test instance

The chance of an in-place upgrade failing is low.  However, there is still that chance.  There might be a new feature or a breaking change introduced.  We recommend creating a sandbox or test instance to test out new versions of Octopus Deploy.

Learn more about [creating a test instance](/docs/administration/upgrading/guide/creating-test-instance.md).
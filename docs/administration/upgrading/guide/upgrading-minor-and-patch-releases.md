---
title: Upgrading minor and patch releases of Octopus Deploy
description: Information on how to upgrade major releases of Octopus Deploy.
position: 2
---

A minor release of Octopus Deploy is when the second number in the version is incremented.  For example, 2020.4.x to 2020.5.x.  A patch release is when the third number when the third number is incremented, from 2020.4.1 to 2020.4.2.    

!include <upgrade-octopus-backup-master-key>

## Recommended Approach - In Place Upgrade

An in-place upgrades for these scenarios are generally safe.  The guide below includes additional backup steps to take in the event something goes wrong.

### Overview

The steps for this are:

1. Download latest version of Octopus Deploy.
1. Enable maintenance mode on.
1. Backup the database.
1. Do an in-place upgrade.
1. Test the upgraded instance.
1. Disable maintenance mode.

!include <upgrade-download-latest-version>

!include <upgrade-octopus-backup-database>

!include <upgrade-inplace-upgrade>

!include <upgrade-testing-upgraded-instance>

## Alternative Approach - Create test instance

An alternative approach to an in-place upgrade is to create a test instance to test out upgrades. The steps for this are:

1. Download the same version of Octopus Deploy as your main instance.
1. Install Octopus Deploy on a new VM.
1. Export a subset of projects from the main instance.
1. Import that subset of projects to the test instance.
1. Download the latest version of Octopus Deploy.
1. Backup the test instance database.
1. Upgrade that test instance to the latest version of Octopus Deploy.
1. Test and verify the test instance.  
1. Enable maintenance mode on the main instance.
1. Backup the database on the main instance.
1. Do an in-place upgrade of your main instance.
1. Test upgraded main instance.
1. Disable maintenance mode.

!include <upgrade-download-same-version>

!include <upgrade-install-test-version>

!include <upgrade-export-import-test-projects>

!include <upgrade-download-latest-version>

!include <upgrade-octopus-backup-database>

!include <upgrade-inplace-upgrade>

!include <upgrade-testing-upgraded-instance>

!include <upgrade-octopus-backup-database>

!include <upgrade-main-instance-after-test-instance>

!include <upgrade-high-availability>

## Rollback Failed Upgrade

While unlikely, it is possible an upgrade will fail.  It could fail on an database upgrade script, SQL Server version is no longer supported, license check validation, or plain old bad luck.  When that happens it is time to rollback to a previous version.

Minor and patch releases are generally the easiest of the scenarios to rollback.  The process will be:

1. Restore the database backup.
1. Download and install the previous installed version of Octopus Deploy.
1. Do some sanity checks.
1. If maintenance mode is enabled, disable it.

!include <upgrade-restore-backup>

!include <upgrade-find-previous-version>
---
title: Upgrading from Octopus 4.x / 2018.x to modern version
description: Information on how to upgrade from Octopus Deploy 4.x or 2018.x to a modern version
position: 5
---

Octopus Deploy 4.x/2018.x was the last version of Octopus Deploy prior to spaces.  Spaces made the following changes:

- The majority of endpoints in the API can accept a `Space-Id`, for example `/api/Spaces-1/projects?skip=0&take=100` whereas before it was `/api/projects?skip=0&take=100`.  If a `Space-Id` isn't supplied the default space is used.
- Teams can be assigned to multiple roles and spaces.  Before a team could be assign to only one role.
- Unique internal package feed per space.  Each space has a subfolder in the `Packages` directory to keep them segregated on the file system.  Before a package would be located at `C:\Octopus\packages\MyPackage.2020.1.1.zip`.  Now it is `C:\Octopus\packages\Spaces-1\MyPackage.2020.1.1.zip`
- Almost every table in the database had a `Space-Id` column added to it.

!include <upgrade-octopus-backup-master-key>

## Recommended Approach - Create test instance

An in-place upgrade should be the safest approach.  Upgrade scripts assume you are upgrading from older versions of Octopus Deploy.  While the upgrade will work, there might be a new feature or breaking changes you will want to test first.  The recommended approach is to create a test instance containing a subset of projects representing your main instance.  Upgrade that test instance, verify it, and then upgrade the main instance.  

### Overview

The steps for this are:

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
1. Backup all the folders on the main instance.
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

!include <upgrade-octopus-backup-folders>

!include <upgrade-main-instance-after-test-instance>

## Alternative Approach - Create cloned instance

An alternative approach to an in-place upgrade is to create a cloned instance and upgrade that.  Once the cloned instance is created you can either:

- Use the cloned instance as a test instance going forward
- Migrate over to the cloned instance

Creating a clone of an existing instance involves:

1. Enable maintenance mode on the main instance.
1. Backup the database of the main instance.
1. Disable maintenance mode on the main instance.
1. Restore the backup of main instance's database as a new database on the desired SQL Server.  
1. Download the same version of Octopus Deploy as your main instance.
1. Installing that version on a new server and configure it to point to the existing database.
1. Copying all the files from the backed up folders from the source instance.
1. Optional: Disabling target.
1. Upgrade cloned instance.
1. Test cloned instance.  Verify all API scripts, CI integrations, and deployments work.
1. If migrating, then migrate over.  Otherwise leave the test instance alone, backup the folders and database, and upgrade the main intance.

!include <upgrade-octopus-backup-database>

!include <upgrade-restore-backup>

!include <upgrade-download-same-version>

!include <upgrade-install-cloned-version>

!include <upgrade-copy-files-for-cloned-instance>

!include <upgrade-disable-targets-cloned-instance>

!include <upgrade-inplace-upgrade>

!include <upgrade-testing-upgraded-instance>

!include <upgrade-migrating-instances>

!include <upgrade-octopus-backup-folders>

!include <upgrade-main-instance-after-test-instance>

!include <upgrade-high-availability>

## Rollback Failed Upgrade

While unlikely, it is possible an upgrade will fail.  It could fail on an database upgrade script, SQL Server version is no longer supported, license check validation, or plain old bad luck.  Depending on what failed, you have a decision to make.  If the cloned instance upgrade failed, it might make sense to start all over again.  Or, it might make sense to rollback to a previous version.  In either case, if you decide to rollback the process will be:

1. Restore the database backup.
1. Restore the folders.
1. Download and install the previous installed version of Octopus Deploy.
1. Do some sanity checks.
1. If maintenance mode is enabled, disable it.

!include <upgrade-restore-backup>

!include <upgrade-rollback-folders>

!include <upgrade-find-previous-version>
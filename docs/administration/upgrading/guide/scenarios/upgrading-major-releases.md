---
title: Upgrading major releases of Octopus Deploy.
description: Information on how to upgrade major releases of Octopus Deploy.
position: 8
---

A major release of Octopus Deploy is when the first number in the version is incremented.  For example, 2020.x.x to 2021.x.x.  Typically, but not always, a breaking change is introduced making rollbacks very tricky.  

!include <upgrade-octopus-backup>

## Recommended Approach

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
1. Do an in-place upgrade of your main instance.

!include <upgrade-download-same-version>

!include <upgrade-install-test-version>

!include <upgrade-export-import-test-projects>

!include <upgrade-download-latest-version>

!include <upgrade-backup-database-test-instance>

!include <upgrade-inplace-upgrade>

!include <upgrade-testing-upgraded-instance>

!include <upgrade-main-instance-after-test-instance>

## Alternative Approach

An alternative approach to an in-place upgrade is to create a cloned instance and upgrade that.  Once the cloned instance is created you can either:

- Use the cloned instance as a test instance going forward
- Migrate over to the cloned instance

Creating a clone of an existing instance involves:

1. Restore the backup of main instance's database as a new database on the desired SQL Server.  
1. Download the same version of Octopus Deploy as your main instance.
1. Installing that version on a new server and configure it to point to the existing database.
1. Copying all the files from the backed up folders from the source instance.
1. Optional: Disabling targets, triggers and subscriptions
1. Test cloned instance.  Verify all API scripts, CI integrations, and deployments work.
1. If migrating, then migrate over.  Otherwise leave the test instance alone and upgrade the main intance.

!include <upgrade-restore-backup>

!include <upgrade-download-same-version>

!include <upgrade-install-cloned-version>
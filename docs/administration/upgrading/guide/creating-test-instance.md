---
title: Creating a test instance
description: A guide on how to create a test instance with Octopus Deploy
position: 8
---

There is always a risk an in-place upgrade will fail.  The risk increases as more versions have been released between upgrades.  We do our best to test many different configurations to put downward pressure on that risk. However, we can't cover every hyper-specific scenario.  Also, there might be a new feature, or a breaking change introduced.  Creating a test instance will help you reduce the risk for you and your company.

## Overview

There are two approaches to creating a test instance:

1. Subset of projects representing the main instance.
1. Clone of the main instance.

### Test instance with a subset of projects

Setting up a test instance with a subset of projects over a full clone has several advantages.  

- It is much easier to set up and configure than a clone.  It is also easy to automate the setting up and tearing down a test instance on demand.
- There is tooling in place to export specific projects.
- A clone does a full clone of everything, including deployment targets and triggers, increasing the risk of having the sandbox instance connect to production at first.
- A clone might have hidden configuration options, such as server folders, that you have to change.

The disadvantage of a subset of projects over a full clone is it is not an entire apple to apple upgrade.  If you have significant drift between projects, you might miss something.

The process to create an instance with a subset of projects is:

1. Download the same version of Octopus Deploy as your main instance.
1. Install Octopus Deploy on a new VM.
1. Export a subset of projects from the main instance.
1. Import that subset of projects to the test instance.
1. Test and verify the test instance.  

!include <upgrade-download-same-version>
!include <upgrade-install-test-version>
!include <upgrade-export-import-test-projects>
!include <upgrade-testing-upgraded-instance>

### Test instance is a clone

Setting up a test instance as a clone of the main instance has a few advantages over a subset of projects.

- Upgrades are much closer to a one to one comparison.
- You can do a full test of all integrations with Octopus Deploy.

Configuring a clone typically takes much more time and compute resources.  There are backup locations to consider, targets to disable, and more.  

Creating a clone of an existing instance involves:

1. Enable maintenance mode on the main instance.
1. Backup the database of the main instance.
1. Disable maintenance mode on the main instance.
1. Restore the backup of the main instance's database as a new database on the desired SQL Server.  
1. Download the same version of Octopus Deploy as your main instance.
1. Installing that version on a new server and configure it to point to the existing database.
1. Copying all the files from the backed up folders from the source instance.
1. Disabling targets.

!include <upgrade-octopus-backup-database>
!include <upgrade-restore-backup>
!include <upgrade-download-same-version>
!include <upgrade-install-cloned-version>
!include <upgrade-copy-files-for-cloned-instance>
!include <upgrade-disable-targets-cloned-instance>
!include <upgrade-testing-upgraded-instance>

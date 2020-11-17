---
title: Upgrading from Octopus 4.x / 2018.x to modern version
description: Information on how to upgrade from Octopus Deploy 4.x or 2018.x to a modern version
position: 9
---

Octopus Deploy 4.x/2018.x was the last version of Octopus Deploy prior to spaces.  Spaces made the following changes:

- The majority of endpoints in the API can accept a `Space-Id`, for example `/api/Spaces-1/projects?skip=0&take=100` whereas before it was `/api/projects?skip=0&take=100`.  If a `Space-Id` isn't supplied the default space is used.
- Teams can be assigned to multiple roles and spaces.  Before a team could be assign to only one role.
- Unique internal package feed per space.  Each space has a subfolder in the `Packages` directory to keep them segregated on the file system.  Before a package would be located at `C:\Octopus\packages\MyPackage.2020.1.1.zip`.  Now it is `C:\Octopus\packages\Spaces-1\MyPackage.2020.1.1.zip`
- Almost every table in the database had a `Space-Id` column added to it.

## Recommended Approach

An in-place upgrade should be the safest approach.  While there are significant backend changes, those have been tested and rested through thousands of upgrades.  

Learn more about [doing an in-place upgrade](INSERT LINK).

That being said, there is still risk involved.  The recommendation for this scenario is to create a cloned instance, test it out, then throw it away.  This will enable you test out the upgrade, verify any and all integrations work, and then do the actual upgrade on the production instance.

Creating a clone of an existing instance involves:

1. Restore the backup of the database as a new database on the desired SQL Server.  
2. Downloading the same version of Octopus Deploy as the source from the [previous downloads page](https://octopus.com/downloads).
3. Installing that version on a new server.
4. Configuring an instance to point to the existing database.
5. Copying all the files from the backed up folders from the source instance.
6. Optional: Disabling targets, triggers and subscriptions
7. Test cloned instance.  Verify all API scripts, CI integrations, and deployments work.
8. Do an in place upgrade of the existing instance.
9. Delete cloned instance.

Learn more about [creating a cloned instance](INSERT LINK).

## Alternative Approach

Creating a cloned instance involves quite a bit of work, with lots of backups and restores.  An alternative approach is to create a test instance with a subset of your projects from your production instance and upgrade that.  It won't be a full apples to apples comparison, but you'll be able to test out any API integration changes.  The other difference is to keep that test instance.  This will enable you test future upgrades.

1. Create a test instance using a subset of projects from your main instance.
2. Upgrade that test instance to the latest version of Octopus Deploy.
3. Test and verify the test instance.  
4. Do an in-place upgrade of your main instance.

Learn more about [creating a test instance](INSERT LINK).
---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Restore SQL database to another environment
description: With Octopus Deploy you can restore a MSSQL database to another environment with a runbook.
navOrder: 30
---

To restore a SQL database with a runbook see [restore SQL database](/docs/runbooks/runbook-examples/databases/restore-mssql-database).  

This section shows you how to restore a database to a different environment, for instance restoring from production down to test.  Using a runbook, you can create a self-service method for developers to restore the production database to a lower level environment to test bugs, fixes, and even the deployment process itself.

Using the runbook means developers don't need any extra permissions to the database server itself, eliminating the time normal spent filling out a support ticket or tracking down a DBA to perform the restore.

## Create the Runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new step template from the community library called **SQL - Restore Database**.
5. Fill out all the parameters in the step. We recommend using [variables](/docs/projects/variables) rather than entering the values directly in the step parameters.

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Server | Name database server | SQLserver1 |
| Database | Name of the database to restore | MyDatabase |
| Backup Directory | Location of where the backup file resides | \\\mybackupserver\backupfolder |
| SQL login | Name of the SQL Account to use (leave blank for Integrated Authentication) | MySqlLogin |
| SQL password | Password for the SQL Account | MyPassword |
| Compression Option | Use compression for this backup | Enabled |
| Devices | The number of backup devices to use for the backup | 1 |
| Backup file suffix | Specify a suffix to add to the backup file names. If left blank, the current date, in the format given by the DateFormat parameter, is used | ProdRestore |
| Separator | Separator used between database name and suffix | _ |
| Date Format | Date format to use if backup is suffixed with a date stamp (e.g. yyyy-MM-dd) | yyyy-MM-dd |

6. Add a new step template from the community library called **SQL - Fix Orphaned User**.  This is needed because the SID associated with the login for the database will be different and needs to be re-associated.
7. Fill out all the parameters in the step.

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| SQL Server | Name of the server | SQLserver1 |
| SQL Login | Name of the SQL Account to use (leave blank for Integrated Authentication) | MySqlLogin |
| SQL Password | Password for the SQL Account | MyPassword |
| Database Name | Name of the database for the account | MyDatabase |
| SQL Login | Name of the account to be fixed | MyOrphanedAccount |

After adding all of the required parameters, click **Save**, and you have a runbook to restore your SQL database to another environment and fix the orphaned user accounts.

You can also add additional steps to add security to your runbooks, such as a [manual intervention](/docs/projects/built-in-step-templates/manual-intervention-and-approvals) step for business approvals. 

## Samples

We have a [Target - Windows](https://oc.to/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `OctoFX` project.

## Learn More

- [SQL Backup - Community Step template](https://library.octopus.com/step-templates/34b4fa10-329f-4c50-ab7c-d6b047264b83/actiontemplate-sql-backup-database)
- [SQL Fix Orphaned User - Community Step Template](https://library.octopus.com/step-templates/e56e9b28-1cf2-4646-af70-93e31bcdb86b/actiontemplate-sql-fix-orphaned-user)

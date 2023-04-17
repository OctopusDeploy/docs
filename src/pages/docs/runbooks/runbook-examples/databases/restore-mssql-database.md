---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Restore SQL database
description: With Octopus Deploy you can restore a MSSQL database with a runbook.
navOrder: 20
---

Restoring databases is a common practice in most organizations. Using a Runbook in Octopus can make this process easy and simple allowing you to restore backups ad-hoc or according to a [scheduled trigger](/docs/runbooks/scheduled-runbook-trigger). 

## Permissions

In this example, you will restore a Microsoft SQL Server database using a step template from our [community library](/docs/projects/community-step-templates) called [SQL - Restore Database](https://library.octopus.com/step-templates/469b6d9d-761a-4f94-9745-20e9c2f93841/actiontemplate-sql-restore-database). This template supports both:
- SQL authentication.
- Integrated authentication. 

In this example, we'll use SQL authentication and provide both a SQL username and password. It's important to check that you have the correct permissions to perform the backup. You can find more information about this in the [permissions documentation](/docs/deployments/databases/sql-server/permissions).

## Create the Runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the Runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new step template from the community library called **SQL - Restore Database**.
5. Fill out all the parameters in the step. It's best practice to use [variables](/docs/projects/variables) rather than entering the values directly in the step parameters.

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

:::warning
Use variables where possible so you can assign scopes to values. This will ensure credentials and database connections are correct for the environment you're deploying to.
:::

After adding all of the required parameters, click **Save**, and you have a basic runbook to restore your SQL database. You can also add additional steps to add security to your runbooks, such as a [manual intervention](/docs/projects/built-in-step-templates/manual-intervention-and-approvals) step for business approvals. 

## Samples

We have a [Target - Windows](https://oc.to/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `OctoFX` project.

## Learn More

- [SQL Backup - Community Step template](https://library.octopus.com/step-templates/34b4fa10-329f-4c50-ab7c-d6b047264b83/actiontemplate-sql-backup-database)

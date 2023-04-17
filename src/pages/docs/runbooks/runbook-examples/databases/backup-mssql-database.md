---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Backup SQL database
description: With Octopus Deploy you can backup a MSSQL database with a Runbook.
navOrder: 10
---

Backing up databases to protect application data should be a common practice in most organizations. Using a Runbook in Octopus can make this process easy and simple allowing you to run backups ad-hoc or on a [scheduled trigger](/docs/runbooks/scheduled-runbook-trigger/). 

## Permissions

In this example, you will be backing up a Microsoft SQL Server database using a step template from our [community library](/docs/projects/community-step-templates/) called [SQL - Backup Database](https://library.octopus.com/step-templates/34b4fa10-329f-4c50-ab7c-d6b047264b83/actiontemplate-sql-backup-database). This template supports both:
- SQL Authentication.
- Integrated Authentication. 

In this example, we'll use SQL Authentication and provide both a SQL username and password. It's important to check that you have the correct permissions to perform the backup. You can find more information on this [here](/docs/deployments/databases/sql-server/permissions/).

## Create the Runbook

1. To create a runbook, navigate to {{Project, Operations, Runbooks, Add Runbook}}.
2. Give the Runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new step template from the community library called **SQL - Backup Database**.
5. Fill out all the parameters in the step. It's best practice to use [variables](/docs/projects/variables/) rather than entering the values directly in the step parameters.


| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Server | Database connection string | dbserver01 |
| Database | Name of database to backup | mydatabase |
| Backup Directory | Path to backup data file to | C:\backups\ |
| SQL Login | SQL Username | admin |
| SQL Password | SQL Password | Pa$$word |
| Compression Option | Disable or enable compression | Enabled |
| Devices | Number of backup devices to use for backup | 1 |
| Backup File Suffix | Suffix added to backup file name |prod |
| Connection Timeout | How long the backup should run | 3600 |
| Backup Action | Full or incremental backup| FULL |
| Copy Only | Just do a copy only backup | True |


:::warning
Use variables where possible so you can assign scopes to values. This will ensure credentials and database connections are correct for the environment you're deploying to.
:::

After adding all of the required parameters, click **Save**, and you have a basic runbook to backup your SQL database! You can also add additional steps to add security to your runbooks, such as a [manual intervention](/docs/projects/built-in-step-templates/manual-intervention-and-approvals/) step for business approvals. 

## Samples

We have a [Target - Windows](https://oc.to/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `OctoFX` project.

## Learn More

- [SQL Backup - Community Step template](https://library.octopus.com/step-templates/34b4fa10-329f-4c50-ab7c-d6b047264b83/actiontemplate-sql-backup-database)

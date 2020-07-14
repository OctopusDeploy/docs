---
title: Mssql database backup
description: Example of your to backup your mssql database using a runbook
position: 40
---

Backing up databases to protect application data should be a common practice in most organizations. Using a Runbook in Octopus can make this process easy and simple allowing you to run backups ad-hoc or on a [scheduled trigger](https://octopus.com/docs/operations-runbooks/scheduled-runbook-trigger). 

**Permissions**

In this example, you will be backing up a Microsoft SQL database. The step used to perform the back up requires a database username and password, so it's handy to check that you have the correct permissions to perform the actions. You can find more information on this [here](https://octopus.com/docs/deployment-examples/database-deployments/sql-server/permissions
). 

**Creating the Runbook to backup your database**


1. To create a runbook, navigate to {{Project, Operations, Runbooks, Add Runbook}}.
2. Give the Runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEPP**.
3. Add a new step template from our [community library](https://octopus.com/docs/deployment-process/steps/community-step-templates) called **SQL - Backup Database**.
4. You need to fill out all the fields in the step, and it's best practice to use [variables](https://octopus.com/docs/projects/variables) rather than entering the values directly in the step fields.


| Field  | Meaning | Example | Notes |
| ------------- | ------------- | ------------- | ------------- |
| Server | Database connection string | dbserver01 | 
| Database | Name of database to backup | mydatabase |
| Backup Directory | Path to backup data file to | C:\backups\ |
| SQL Login | SQL Usernsame | admin |
| SQL Password | SQL Password | Pa$$word |
| Compression Option | Disable or enable compression | Enabled |
| Devices | Number of backup devices to use for backup | 1 |
| Backup File Suffix | Suffix added to backup file name |prod |
| Connection Timeout | How long the backup should run | 3600 |
| Backup Action | Full or incremental backup| FULL |
| Copy Only | Just do a copy only backup | True |


:::warning
Use variables where possible so you can assign scopes to values, this will ensure credentials and database connections are correct for the environment you're deploying to.
:::

After filling out, all the fields, click **Save**, and you have a basic runbook to backup your SQL database. You can add additional steps to add security to your Runbooks, such as [manual interventions](https://octopus.com/docs/deployment-process/steps/manual-intervention-and-approvals) for business approvals. 

## Samples
We have a [Target - Windows](https://g.octopushq.com/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this Runbook and more Runbook examples.




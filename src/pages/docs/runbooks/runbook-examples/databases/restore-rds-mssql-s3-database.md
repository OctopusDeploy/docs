---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Restore RDS SQL database from S3
description: An example that demonstrates restoring a database backup file from an S3 bucket.
navOrder: 100
---

You can perform native restores of Amazon Relational Database instances running SQL Server. You may have the backup you want to be restored in S3 storage, and using an Octopus runbook is an easy way to automate the process.

In the following example, we'll use the [AWS RDS SQL Server - Restore from S3 Bucket](https://library.octopus.com/step-templates/55848421-44b9-403c-b1f0-ba8a84b1f177/actiontemplate-aws-rds-sql-server-restore-from-s3-bucket) community step template.

## AWS Prerequisites

* An AWS RDS SQL Server instance.
* A SQL backup stored in an S3 bucket.
* An AWS Identity and Access Management (IAM) Role to access the bucket.
* The SQLSERVER_BACKUP_RESTORE option added to an option group on the DB instance.

For more information on setting up AWS RDS instances for native backup and restores, please see this [AWS knowledgebase article](https://aws.amazon.com/premiumsupport/knowledge-center/native-backup-rds-sql-server/).

## Create the runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new step template from the community library called **AWS RDS SQL Server - Restore from S3 Bucket**.
5. Fill out all the parameters in the step. It's best practice to use [variables](/docs/projects/variables/) rather than entering the values directly in the step parameters:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| SQL Server | The SQL Server to perform the work on. | mydatabase.region.rds.amazonaws.com |
| SQL Login | The login of the user who has permissions to create a database. | backupuser |
| SQL Password | The password of the user who has permission to create SQL Logins. | MyGreatPassword! |
| Database Name | The name of the database to restore to. | MyDatabase |
| S3 Bucket Name | The name of the bucket (including any sub directories) where the backup is stored. | MyS3Bucket/backups/sql |
| Backup File Name and Extension | The name of the back up file (including the extension). | MyBackup.bak |

:::hint
To use integrated SQL authentication, leave SQL Login and SQL Password blank.
:::
 
The step template script will cover the following:

* Download the backup file from the S3 bucket.
* Invokes rds_restore_database stored procedure on the RDS instance.
* Display restore progress by percentage.
* The task will end when the backup file is restored successfully. 
 
## Samples

We have a [Target - SQL Server](https://samples.octopus.app/app#/Spaces-106/projects/aws-backup-and-restore-s3/operations/runbooks/Runbooks-667/overview) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example.

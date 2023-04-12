---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Backup RDS SQL database to S3
description: This section shows you how to perform a native SQL backup for an RDS SQL database and store in an S3 bucket.
navOrder: 90
---

You can perform native backups of Amazon Relational Database instances running SQL Server. You may want to store the backup in S3 storage, and using an Octopus runbook is an easy way to automate the process. 

In the following example, we'll use the [AWS RDS SQL Server - Backup to S3 Bucket](https://library.octopus.com/step-templates/3dd60fea-b98a-4760-8867-cbd049f7aa31/actiontemplate-aws-rds-sql-server-backup-to-s3-bucket) community step template.

## AWS Prerequisites

* An AWS RDS SQL Server instance.
* An Amazon S3 Bucket.
* An AWS Identity and Access Management (IAM) Role to access the bucket.
* The SQLSERVER_BACKUP_RESTORE option added to an option group on the DB instance.

For more information on setting up AWS RDS instances for native backups, please see this [AWS knowledgebase article](https://aws.amazon.com/premiumsupport/knowledge-center/native-backup-rds-sql-server/).

## Create the runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new step template from the community library called **AWS RDS SQL Server - Backup to S3 Bucket**.
5. Fill out all the parameters in the step. It's best practice to use [variables](/docs/projects/variables/) rather than entering the values directly in the step parameters:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| SQL Server | The SQL Server to perform the work on. | mydatabase.region.rds.amazonaws.com |
| SQL Login | The login of the user who has permissions to create a database. | backupuser |
| SQL Password | The password of the user who has permissions to create SQL Logins. | MyGreatPassword! |
| Database Name | The name of the database to backup. | MyDatabase |
| S3 Bucket Name | The name of the bucket (including any sub directories). | MyS3Bucket/backups/sql |
| Backup File Name and Extension | The name of the back up file (including the extension). | MyBackup.bak |

:::hint
To use integrated SQL authentication, leave SQL Login and SQL Password blank.
:::
 
The step template will do the following:

* Invokes rds_backup_database stored procedure on the RDS instance.
* Display backup progress by percentage.
* Upload backup file to the S3 bucket.
* The task will end when the backup file is uploaded successfully.
 
## Samples

We have a [Target - SQL Server](https://samples.octopus.app/app#/Spaces-106/projects/aws-backup-and-restore-s3/operations/runbooks/Runbooks-666/overview) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example.

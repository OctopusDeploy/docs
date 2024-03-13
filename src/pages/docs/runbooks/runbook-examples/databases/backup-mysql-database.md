---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Backup MySQL database
description: With Octopus Deploy you can backup a MySQL database with a Runbook
navOrder: 60
---

There are many different ways to backup a MySQL database. In this case, we will use mysqldump utility provided by MySQL to dump data and table structures from a specific database. It requires the deployment target to have the MySQL installation binaries and local access to the MySQL instance where the database is hosted.

In the following example, we'll use the [MySQL - Backup Database](https://library.octopus.com/step-templates/4fa6d062-d4da-4a02-849e-dec804554453/actiontemplate-mysql-backup-database) community step template.


## Create the Runbook

1. To create a runbook, navigate to **Project ➜ Operations ➜ Runbooks ➜ Add Runbook**.
2. Give the Runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new step template from the community library called **MySQL - backup database**.
5. Fill out all the parameters in the step. It's best practice to use [variables](/docs/projects/variables) rather than entering the values directly in the step parameters:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Server | Name or IP of the MySQL server | MySQL1 |
| Username | Username with rights to create a database | root |
| Password | Password for the user account | MyGreatPassword! |
| Database Name | Name of the database to create | MyDatabase |
| Port | Port number for the MySQL server | 3306 |
| Use SSL | Whether to use the SSL protocol | Checked for True, unchecked for False |
| MySQL Path | Path to binaries | C:\Program Files\MySQL\MySQL Server 5.6\bin |
| Backup Directory | Location to store backup file | C:\backups\ |

This will check if a database exists and backup a database on the MySQL instance.

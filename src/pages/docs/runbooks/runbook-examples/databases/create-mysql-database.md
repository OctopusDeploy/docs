---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Create MySQL database
description: With Octopus Deploy you can create a MySQL database with a Runbook.
navOrder: 40
---

The ability to create a database in MySQL requires that the user account have elevated permissions to the server.  Not only that, the machine that the user is using needs to be specified to their account (unless using %).  This can make permissions somewhat unruly to manage.  Using a runbook, you can create the database without altering permissions by executing it on the server itself or an approved [worker](/docs/infrastructure/workers/).

In the following example, we'll use the [MySQL - Create Database If Not Exists](https://library.octopus.com/step-templates/4a222ac3-ff4b-4328-8778-1c44eebdedde/actiontemplate-mysql-create-database-if-not-exists) community step template.

## Create the Runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the Runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new step template from the community library called **MySQL - Create Database If Not Exists**.
5. Fill out all the parameters in the step. It's best practice to use [variables](/docs/projects/variables/) rather than entering the values directly in the step parameters:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Server | Name or IP of the MySQL server | MySQL1 |
| Username | Username with rights to create a database | root |
| Password | Password for the user account | MyGreatPassword! |
| Database Name | Name of the database to create | MyDatabase |
| Port | Port number for the MySQL server | 3306 |
| Use SSL | Whether to use the SSL protocol | Checked for True, unchecked for False |

This will create a database without having to grant any additional permissions to the server.
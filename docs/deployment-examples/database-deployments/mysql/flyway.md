---
title: MySQL flyway deployment
description: How to do MySQL database deployments with Flyway.
position: 
---

[Flyway](https://flywaydb.org/) is a open source [migrations-based](https://octopus.com/blog/sql-server-deployment-options-for-octopus-deploy) database deployment tool supported by Redgate.  It's a command-line utility that uses Java to execute script files against a number of database technologies such as Microsoft SQL Server, MySQL, MariaDB, and PostgreSQL.  Along with a free Community edition, there is also a paid Pro and Enterprise versions available.  Flyway is a popular tool with the open source community.

## Including Flyway with your project
Adding Flyway to your project is pretty simple, just [download the archive](https://flywaydb.org/download/) file and extract it to disk.  Once the files are extracted, move them into your project folder structure.  The Flyway download comes with everything it needs to execute, including a version of the Java Runtime Environment (JRE).  

:::hint
If Flyway doesn't find Java installed on the machine (detected by the presence of the JAVA_HOME envronment variable), it will fall back to the included JRE.  The included version of the JRE has the .exe and .dll files located within a `bin` subfolder.  It is often the case that source control will ignore any folder with the name `bin`, so be careful when including a Flyway project and you need the included JRE.
:::

## Adding scripts to your Flyway project
Within the Flyway folder structure is a folder called `sql`.  This folder is where all of your scripts are placed.  To control exection order, the [documenation](https://flywaydb.org/documentation/) states that the files need to be named a specific way.  Flyway is capable of doing Versioned Migrations, Undo Migrations, and Repetable Migrations.  All script files follow this naming structure:

- Prefix: V for Versioned, U for Undo, and R for Repeatable (this guide will focus on Versioned migrations)
- Version: Numbers with dots or underscores as separators
- Seperator: Two underscores
- Description: A meaningful name with underscores or spaces to separate the words
- Suffix: Usually `.sql`

An example of what a filename would look like is `V1__initDB.sql`


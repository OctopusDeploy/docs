---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Backup and restore
description: Information on where Octopus data is stored and how to backup and restore an Octopus instance.
navOrder: 110
---

A successful disaster recovery plan for Octopus Deploy requires the ability to restore both:

1. The Octopus [SQL Server Database](/docs/administration/data/octopus-database/).
2. The Octopus [data stored on the file system](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/).

**Runbooks**
[Octopus runbooks](/docs/runbooks/) can help you automate your disaster recovery process.

:::problem
**Without your Master Key, backups are useless**
Sensitive information is encrypted using AES128 with the Master Key as the encryption key. Without this Master Key you will lose your sensitive variables, passwords and other encrypted data. Make sure you've taken a copy of the key! [Learn more about backing up the Master Key](/docs/security/data-encryption/).
:::

## Octopus SQL Database

Most of the data and settings managed by Octopus - the projects, environments, deployments and so on - are stored in a [SQL Server Database](/docs/administration/data/octopus-database/). You are responsible for maintaining your own backups of the SQL Server Database. Refer to [SQL Server documentation](https://msdn.microsoft.com/en-AU/library/ms187510.aspx) for more information on backing up SQL Server.

### Which SQL Database recovery model should I choose?

You should configure a SQL Database maintenance plan using a [recovery model](https://msdn.microsoft.com/en-us/library/ms189275.aspx) which suits your needs:

1. If you happy with daily/weekly restore points you could consider the `SIMPLE` recovery model.
2. If you want point-in-time recovery you should consider the `FULL` recovery model.

Learn more about [restore and recovery of SQL Server Databases](https://msdn.microsoft.com/en-us/library/ms191253.aspx).

## Octopus file storage

In addition to the SQL Server Database, some Octopus data is stored on the file system. This includes task logs that are generated whenever a job is run by the server, artifacts that have been collected during a deployment and packages stored in the [Octopus built-in repository](/docs/packaging-applications/package-repositories/). These files are stored in the Octopus home directory that is configured when Octopus Server is installed (`C:\Octopus` by default). It is a good idea to **do regular backups of your Octopus home directory**.

Learn about [Octopus file storage](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/).

## Encrypted data {#Backupandrestore-Encrypteddata}

Certain sensitive information in the [Octopus database is encrypted](/docs/security/data-encryption.md). This information is encrypted using your Octopus Server "Master Key", a randomly generated string. This Master Key will be needed if you ever plan to restore the database to a new server. You will be prompted for this key during the setup process when connecting to an existing database. If you have already setup the server you can [change the Master Key](/docs/octopus-rest-api/octopus.server.exe-command-line/database/) so that it will work with the restored database.

:::problem
**It's worth repeating! Without your Master Key, backups are useless**
Sensitive information is encrypted using AES128 with the Master Key as the encryption key. Without this Master Key you will lose your sensitive variables, passwords and other encrypted data. Make sure you've taken a copy of the key! [Learn more about backing up the Master Key](/docs/security/data-encryption/).
:::

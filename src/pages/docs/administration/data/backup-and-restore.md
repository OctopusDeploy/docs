---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-11-04
title: Backup and restore
description: Information on where Octopus data is stored and how to backup and restore an Octopus instance.
navOrder: 10
---

A successful disaster recovery plan for Octopus Deploy requires the ability to restore both:

1. The Octopus [SQL Server Database](/docs/administration/data).
2. The Octopus [data stored on the file system](/docs/administration/managing-infrastructure/server-configuration-and-file-storage).

**Runbooks**
[Octopus runbooks](/docs/runbooks) can help you automate your disaster recovery process.

:::div{.problem}

**Without your Master Key, backups are useless**

Sensitive information is encrypted using AES with the Master Key as the encryption key. Without this Master Key you will lose your sensitive variables, passwords, and other encrypted data. Make sure you've taken a copy of the key! [Learn more about backing up the Master Key](/docs/security/data-encryption).

Octopus Server 2024.4 and newer use AES-256 by default but support AES-128 for compatibility. Previous versions use AES-128.

:::

## Octopus SQL Database

Most of the data and settings managed by Octopus, such as projects, environments, and deployments, are stored in a [SQL Server Database](/docs/administration/data). You are responsible for maintaining backups of the SQL Server Database. Refer to [SQL Server documentation](https://msdn.microsoft.com/en-AU/library/ms187510.aspx) for more information on backing up SQL Server.

### Which SQL Database recovery model should I choose?

You should configure a SQL Database maintenance plan using a [recovery model](https://msdn.microsoft.com/en-us/library/ms189275.aspx) that suits your needs:

1. Use the `SIMPLE` recovery model if you're happy with daily/weekly restore points.
2. Use the `FULL` recovery model if you want point-in-time recovery.

Learn more about [restoring and recovering SQL Server Databases](https://msdn.microsoft.com/en-us/library/ms191253.aspx).

## Octopus file storage

In addition to the SQL Server Database, some Octopus data is stored on the file system.

This includes:

- Task logs that are generated whenever the server runs a job
- Artifacts that have been collected during a deployment
- Packages stored in the [Octopus built-in repository](/docs/packaging-applications/package-repositories)

These files are stored in the Octopus home directory you configured when Octopus Server was installed (`C:\Octopus` by default). It is a good idea to **do regular backups of your Octopus home directory**.

Learn about [Octopus file storage](/docs/administration/managing-infrastructure/server-configuration-and-file-storage).

## Encrypted data {#encrypted-data}

Certain sensitive information in the [Octopus database is encrypted](/docs/security/data-encryption/). This information is encrypted using your Octopus Server "Master Key", a randomly generated string. You'll need this Master Key to restore the database to a new server. 

When connecting to an existing database, you will be prompted for this key during the setup process. If you have already set up the server, you can [change the Master Key](/docs/octopus-rest-api/octopus.server.exe-command-line/database) to work with the restored database.

:::div{.problem}

**Without your Master Key, backups are useless**
Sensitive information is encrypted using AES-256 with the Master Key as the encryption key. Without this Master Key you will lose sensitive variables, passwords, and other encrypted data. Make sure you've taken a copy of the key! [Learn more about backing up the Master Key](/docs/security/data-encryption).

:::

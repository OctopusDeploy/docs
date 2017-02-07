---
title: Backup and restore
description: Information on where Octopus data is stored and how to backup and restore an Octopus instance.
position: 1
---

Most of the data and settings managed by Octopus - the projects, environments, deployments and so on - are stored in a [SQL Server database](/docs/administration/octopus-database/index.md). You are responsible for maintaining your own backups of the SQL Server database. Refer to [SQL Server documentation](https://msdn.microsoft.com/en-AU/library/ms187510.aspx) for more information on backing up SQL Server.

In addition to the SQL Server database, some Octopus data is stored on the file system.This includes task logs that are generated whenever a job is run by the server, artifacts that have been collected during a deployment and NuGet packages stored in the [Octopus NuGet feed](/docs/packaging-applications/package-repositories/index.md). These files are stored in the Octopus home directory that is configured when Octopus Server is installed (C:\Octopus by default). It is a good idea to **do regular backups of your Octopus home directory**.

## Encrypted data {#Backupandrestore-Encrypteddata}

Certain sensitive information in the [Octopus database is encrypted](/docs/reference/security-and-encryption.md). This information is encrypted using your Octopus Server "master key", a randomly generated string. This master key will be needed if you ever plan to restore the database to a new server. You will be prompted for this key during the setup process when connecting to an existing database. If you have already setup the server you can [change the master key](/docs/administration/server-configuration-and-file-storage/index.md) so that it will work with the restored database.

:::problem
**Warning: without your master key, backups are useless**
Sensitive information is encrypted using AES128 with the master key as the encryption key. Without this master key you will lose your sensitive variables, passwords and other encrypted data. Make sure you've taken a copy of the key! [Learn more about backing up the master key](/docs/reference/security-and-encryption.md).
:::

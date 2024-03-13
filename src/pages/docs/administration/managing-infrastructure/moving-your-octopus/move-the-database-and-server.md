---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Moving the Octopus Server and database
description: Walk-through outlining how you can move an Octopus database from one server to another.
navOrder: 300
---

You may need to move your Octopus installation of Server and database. The following process is the recommended approach. Skipping any step in this process can result in encryption errors or missing data and files.

## Before you move your Octopus instance
- You will need your Master Key in order for your new Octopus installation to connect to your existing database. You can retrieve and save a copy of the [Master Key](/docs/security/data-encryption) in the Octopus Manager.
- Data that is stored in the file system needs to be moved over to the new server. These are your packages stored in the built-in package repository, your artifacts (includes project logos), your Task Logs, and your Event Exports.
- Tentacle thumbprints are stored in the database. If you're using the same database, you won't need to re-configure your Tentacles.

:::div{.warning}
**You can only move your Octopus Server installation to the same Octopus version, you cannot move to an upgraded version.** Either upgrade your existing Octopus Server version, then move the Server and files, or move and then upgrade on the new server. Please refer to our [upgrading guides](/docs/administration/upgrading) for applicable information for your scenario.
:::

## Process

Below are instructions on how to move your Octopus Server and SQL Database.

1. Place your Octopus instance into [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode) and stop the service when all deployments have completed. You can stop the service via the Octopus Manager, or via the command line using the following command.
`Octopus.Server.exe service --stop`
2. Ensure you have saved a copy of your [Master Key](/docs/security/data-encryption/#Securityandencryption-YourMasterKey).
3. Take a backup of your Octopus database.
4. Restore the database on your new server.
5. Create a new Octopus instance using the same Octopus version as your original instance. You can find an older version and download the MSI in our [previous releases](https://octopus.com/downloads/previous) page.
6. During the installation of your new instance, select the database you restored. It will prompt for the Master Key.
7. Copy the following directories from your original server to the new server (each of these folders are located in C:\Octopus in standard installations).
   - Artifacts
   - Task Logs
   - Packages
      - This folder only needs to be moved if using the built-in package repository. External feed details are stored in the database, and they will connect automatically.
   - Event Exports

:::div{.warning}
The database stores the locations for these directories. After you connect to the database, your settings will be the same as they were in your original server. You can change the locations for these directories, but we recommend first moving the directories to there original location and then pointing to the new location. This process is outlined in the [moving the home directory](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-home-directory) page.
:::

8. Finally, if you have automatic package indexing enabled restart your new Octopus instance to index the packages. You can restart either in your Octopus Manager, or via the command line with the below command. If package indexing is disabled please trigger a manual update via the Sync Now button on your **Library ➜ Packages** page.
```
Octopus.Server.exe service --stop
Octopus.Server.exe service --start
```

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Moving the Octopus Server
description: Walk-through outlining how to move an Octopus instance from one server to another.
navOrder: 100
---

You may want to move only the Octopus Server itself, and continue using your existing database. The following process is the recommended approach. Skipping any step in this process can result in encryption errors or missing data and files.

## Before you move your Octopus instance
- You will need your Master Key to connect your existing database to your new Octopus installation. You can retrieve and save a copy of the [Master Key](/docs/security/data-encryption) in the Octopus Manager.
- Data that is stored in the file system needs to be moved over to the new server. This includes packages stored in the built-in package repository, artifacts (including project logos), archived events, and task logs.
- Tentacle thumbprints are stored in the database. You won't need to re-configure your Tentacles if you're using the same database.

:::div{.warning}
**You can only move your Octopus Server installation to the same Octopus version; you cannot move to an upgraded version.** Either upgrade your existing Octopus Server version, then move the Octopus Server and files, or move and then upgrade on the new server. Please refer to our [upgrading guides](/docs/administration/upgrading) for information applicable to your scenario.
:::

### Process

1. Place your Octopus instance into [Maintenance Mode](/docs/administration/managing-infrastructure/maintenance-mode) and stop the service when all deployments have completed. You can stop the service via the Octopus Manager or the command line using the following command.
`Octopus.Server.exe service --stop`
2. Ensure you have saved a copy of your [Master Key](/docs/security/data-encryption#your-master-key).
3. Create a new Octopus instance using the same Octopus version as your original instance. You can find an older version and download the MSI in our [previous releases](https://octopus.com/downloads/previous) page.
4. When installing your new instance, select your existing database. It will prompt for the Master Key.
5. Copy the following directories from your original server to the new server (each folder is located in C:\Octopus in standard installations).
   - Artifacts
   - Task Logs
   - Packages
      - This folder only needs to be moved if using the built-in package repository. External feed details are stored in the database and will connect automatically.
   - Event Exports
6. Finally, restart your new Octopus instance to index the packages. You can restart using Octopus Manager or the command line with the following command.
```
Octopus.Server.exe service --stop
Octopus.Server.exe service --start
```

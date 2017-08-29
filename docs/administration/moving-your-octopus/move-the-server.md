---
title: Moving the Octopus Server
description: Walkthrough outlining how you can move an Octopus instance from one server to another.
position: 100
---

You may want to move only the Octopus Server itself, and continue using your existing database. The following process is the recommended approach. Skipping any step in this process can result in encryption errors or missing data and files.

## Some things to note prior to moving your Octopus instance
- You will need your master key in order for your new Octopus installation to connect to your existing database. You can retrieve and save a copy of the [master key](/docs/reference/security-and-encryption.md) in the Octopus Manager.
- Data that is stored in the file system needs to be moved over to the new server. These are your packages stored in the built-in package repository, your artifacts (includes project logos), and your Task Logs. 
- Tentacle thumbprints are stored in the database. If you’re using the same database, you won’t need to re-configure your Tentacles.

:::warning
You can only move your server to the same version,  you cannot move to an upgraded version. Either upgrade your existing server, then move the Server and files, or move then upgrade on the new server. Please refer to our [upgrading guides](/docs/administration/upgrading/index.md) for applicable information for your scenario.
:::

### Process

1. Place your Octopus instance into [Maintenance Mode](/docs/administration/maintenance-mode.md) and stop the service when all deployments have completed. You can stop the service via the Octopus Manager, or via the command line using the following command.
`Octopus.Server.exe service --stop`
2. Ensure you have saved a copy of your [master key](/docs/reference/security-and-encryption.md#Securityandencryption-YourMasterKey).
3. Create a new Octopus instance using the same Octopus version as your original instance. You can find an older version and download the MSI in our [previous releases](https://octopus.com/downloads/previous) page.
4. During the installation of your new instance, select your existing database. It will prompt for the master key.
5. Copy the following directories from your original server to the new server (each of these folders are located in C:\Octopus in standard installations).
   - Artifacts
   - Task Logs
   - Packages
      - This folder only needs to be moved if using the built-in package repository. External feed details are stored in the database, and they will connect automatically.
6. Finally, restart your new Octopus instance to index the packages. You can restart either in your Octopus Manager, or via the command line with the following command.
```
Octopus.Server.exe service --stop
Octopus.Server.exe service --start
```

---
title: How to move the Octopus Server to another server or VM
position: 21
---

## Move the Octopus Server to another server or VM {#HowtomovetheOctopusServertoanotherserverorVM-MovetheOctopusServertoanotherserverorVM}

You may find that you need to move your Octopus Server instance/s to another server or VM. The following guide will give instructions on the recommended way to do this.

:::problem
Make sure you have a **current backup** of your Octopus data before proceeding. You will also need your **Master Key** if you need to use the backup, so please copy that also!
:::

:::hint
**Administrator Rights Required**
Any of the following commands will need to be run as Administrator as they require access to the Registry.
:::

### Moving the Octopus Server but not the Database {#HowtomovetheOctopusServertoanotherserverorVM-MovingtheOctopusServerbutnottheDatabase}

If your database is on the same server as your Octopus Server instance/s and you will require to move this also then the following steps will be require

### Moving the Octopus Server and the Database {#HowtomovetheOctopusServertoanotherserverorVM-MovingtheOctopusServerandtheDatabase}

:::hint
**Octopus version.**
Ensure that the installer you use on the new server is the same version of Octopus server that you are currently using. If you no longer have your installer you can check our archives here: [https://octopus.com/downloads/previous](https://octopus.com/downloads/previous)
:::

If you wish to move your Octopus server instance/s and the Database, you will first need to ensure that you have a backup of your Octopus Database and Master Key.

1. The first step is to restore your SQL database to the new location that you wish for it to be hosted. Once you have successfully restored your Octopus DB to the new location, you can start the installation of the Octopus server.
2. You should follow the standard installation guide for installing Octopus, only when you are asked to provide a database, you will need to make sure that you enter you Master Key that you backed up earlier from your current Octopus server.
3. You can then copy the following directories from your \Octopus\ home directory on the original server to your new installed Octopus server.
   -\Octopus\TaskLogs\
   -\Octopus\Packages\
   -\Octopus\Applications\
4. Once you have finished copying your data you should stop the service on the old server and start the service on your new server, ensuring that everything is there and working as expected.

:::problem
**Octopus configuration file**
Make sure you do **NOT** copy configuration files from your \Octopus\ root folder, these contain connection strings for your database and if you copy the old ones over, you will not be able to connect to your new Database.
:::

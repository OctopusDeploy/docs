---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Backup v2.6 database
description: Information on how to backup an Octopus 2.6 database.
---

All of the data and settings managed by Octopus - the projects, environments, deployments and so on - are stored in an embedded database hosted by the Octopus Server. Out of the box, Octopus automatically creates backups of this database and any other files necessary to restore the Octopus instance every four hours. The backup files are copied to a local directory: you can easily change this to use a file share or other path that is backed up externally.

You can view and change the backup settings by browsing to the *Configuration* tab in the Octopus Web Portal, and then clicking the *Backup* tab.

:::figure
![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3277492.png)
:::

## Encrypted backups

The Octopus database is encrypted, and so are the backups. The backups are encrypted using your Octopus Server "Master Key", a randomly generated string. This Master Key will be needed if you ever plan to restore the database to a new server.

### Your Master Key

When Octopus is installed, it generates a random string which will be used as the Master Key. You will need to know your Master Key if you ever hope to restore an Octopus backup on another server.

Making a copy of your Master Key is easy:

1. Open the **Octopus Manager** from the start menu/start screen:

   ![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3277161.png)

2. Click **Copy Master Key to clipboard...**:

   ![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3277158.png)

3. Paste the Master Key into a text editor or a secure enterprise password manager, and save it:

## Backup now

You can take a backup of your Octopus database immediately, simply by clicking the green **Backup now** button.

![](/docs/administration/upgrading/legacy/upgrading-from-octopus-2.6.5-2018.10lts/images/3277490.png)

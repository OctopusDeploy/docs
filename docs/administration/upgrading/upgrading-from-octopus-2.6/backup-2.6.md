---
title: Backup v2.6 database
---

All of the data and settings managed by Octopus - the projects, environments, deployments and so on - are stored in an embedded database hosted by the Octopus Deploy server. Out of the box, Octopus automatically creates backups of this database and any other files necessary to restore the Octopus instance every four hours. The backup files are copied to a local directory: you can easily change this to use a file share or other path that is backed up externally.

You can view and change the backup settings by browsing to the *Configuration* tab in the Octopus web portal, and then clicking the *Backup* tab.

![](/docs/images/backup-2.6/3277492.png "width=500")

## Encrypted backups

The Octopus database is encrypted, and so are the backups. The backups are encrypted using your Octopus Server "master key", a randomly generated string. This master key will be needed if you ever plan to restore the database to a new server.

### Your Master Key

When Octopus is installed, it generates a random string which will be used as the master key. You will need to know your master key if you ever hope to restore an Octopus backup on another server.

Making a copy of your master key is easy:

1. Open the **Octopus Manager** from the start menu/start screen
   ![](/docs/images/backup-2.6/3277161.png "width=500")
2. Click **Copy master key to clipboard...**
   ![](/docs/images/backup-2.6/3277158.png "width=500")
3. Paste the master key into a text editor or a secure enterprise password manager, and save it

## Backup now

You can take a backup of your Octopus database immediately, simply by clicking the green **Backup now** button.

![](/docs/images/backup-2.6/3277490.png "width=500")

---
title: Recovering After Losing Your Octopus Server and its Master Key
description: Sometimes the worst possible thing happens. The machine hosting Octopus Server dies irrecoverably, and you realize you didn't backup your master key! This guide will help you get back up and running.
position: 40
---

Sometimes the worst possible thing happens. The machine hosting Octopus Server dies irrecoverably, and you've discovered you don't have your master key! Whilst you cannot recover the data encrypted with your missing master key, this guide will help you get back up and running again.

If you are reading this page: [PLEASE BACK UP YOUR MASTER KEY!](/docs/api-and-integration/octopus.server.exe-command-line/show-master-key.md)

## Recover the Master Key

The fastest and easiest way to get up and running is to recover the master key. The only way to recover the master key is to get the dead machine up and running again. The master key is stored in the Octopus Server configuration file and encrypted using the machine's encryption key. Simply having a copy of the config file is not enough. The master key can only be decrypted by the machine where the config file came from.

## What is Lost

Octopus [encrypts important and sensitive data](/docs/administration/security/data-encryption.md) using a master key. This includes:

- The Octopus Server X.509 certificate which is used for [Octopus to Tentacle communication](/docs/administration/security/octopus-tentacle-communication/index.md) - this means your Tentacles won't trust your Octopus Server any more.
- Sensitive variable values, wherever you have defined them.
- Sensitive values in your deployment processes, like the password for a custom IIS App Pool user account.
- Sensitive values in your deployment targets, like the password for creating [Offline Drops](/docs/infrastructure/deploymnent-targets/offline-package-drop.md).

## Recovering With a New Master Key

If you are confident with Octopus you can follow these steps to get back up and going. Otherwise, please get in contact with our [support team](https://octopus.com/support) so we can be available to help get you up and going.

### Step 1 - Back up Before You Start

Make sure to [back up everything](/docs/administration/backup-and-restore.md) before you start this process. At least this will help you start the process again from a known position.

### Step 2 - Install Octopus Server on a New Machine

Provision a new machine and install Octopus Server on it just like you would normally **except** you won't be able to point it at your existing database because you don't have the master key. We are going to get your new Octopus Server up and running on a new database, and then trick it into pointing at your new database.

1. Install Octopus Server (the `lost-master-key` command was introduced in **Octopus 2018.3.6**):

    - If you were using **Octopus 2018.3.6** or newer, please download and reinstall the exact same version.
    - If you were using an older version of Octopus Server, please download and install the latest available version.

1. Either point it at a blank database you've created for this purpose, or let Octopus create a database for itself. **We will delete this afterwards.**
1. Load the Octopus Server user interface, click around a little bit, and make sure it looks like a healthy but empty instance of Octopus Server.
1. Run `Octopus.Server.exe service --stop` to stop the Octopus Server (we are going to reconfigure it).
1. Run `Octopus.Server.exe database --connectionString="YOUR-CONNECTION-STRING"` to point this Octopus Server at the database you are trying to recover.
1. Run `Octopus.Server.exe lost-master-key` and carefully follow the prompts. This will take you through each step and generate a detailed report of what has happened.
1. Run `Octopus.Server.exe service --start` to start the Octopus Server running against the recovered database.

**Please read the report carefully and get in touch with us if anything seems out of the ordinary. Back up your new Octopus Server certificate and master key!**

### Step 3 - Restore Trust With Your Tentacles

You will need to sign in to all the machines running Tentacle and run a command to make it trust the new Octopus Server certificate.

Run this script on each machine running Tentacle:

```plaintext
Tentacle.exe service --stop
Tentacle.exe configure --reset-trust --trust="YOUR-NEW-OCTOPUS-SERVER-THUMBPRINT"
Tentacle.exe service --start
```

These commands will:

- Stop the Tentacle agent.
- Clear all trusts so the Tentacle won't trust the old server certificate.
- Configures the Tentacle to trust the new Octopus Server certificate.
- Starts the Tentacle agent again.

After this you should perform a health check on your Infrastructure and fix any problems that come up.

### Step 4 - Re-enter All the Sensitive Values

There is no way to recover this data. You will need to go through and re-enter any sensitive values.

### Step 5 - Back up Your Octopus Server Certificate and Master Key

You may have done this earlier in the process. If not, now is a great time to securely back up your master key and Octopus Server certificate!

### Test Your Backup

Now is a great time to test your backup process worked and ensure you can restore quickly next time when a serious issue occurs. A backup isn't real unless you verify you can restore from it. Take your fresh Octopus backup and recently secured master key and attempt to restore your Octopus Server somewhere else to validate it will work when you need it to.

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Recovering after losing your Octopus Server and Master Key
description: A guide to recovering if the machine hosting Octopus Server dies irrecoverably, and you don't have the Master Key.
navOrder: 40
---

Sometimes the worst possible thing happens. The machine hosting Octopus Server dies irrecoverably, and you've discovered you don't have your Master Key! Whilst you cannot recover the data encrypted with your missing Master Key, this guide will help you get back up and running again.

If you are reading this page: [**please back up your Master Key**](/docs/octopus-rest-api/octopus.server.exe-command-line/show-master-key/)

## Recover the Master Key

The fastest and easiest way to get up and running is to recover the Master Key. The only way to recover the Master Key is to get the dead machine up and running again. The Master Key is stored in the Octopus Server configuration file and encrypted using the machine's encryption key. Simply having a copy of the config file is not enough. The Master Key can only be decrypted by the machine where the config file came from.

## What is lost

Octopus [encrypts important and sensitive data](/docs/security/data-encryption/) using a Master Key. This includes:

- The Octopus Server X.509 certificate which is used for [Octopus to Tentacle communication](/docs/security/octopus-tentacle-communication/) - this means your Tentacles won't trust your Octopus Server any more.
- Sensitive variable values, wherever you have defined them.
- Sensitive values in your deployment processes, like the password for a custom IIS App Pool user account.
- Sensitive values in your deployment targets, like the password for creating [Offline Drops](/docs/infrastructure/deployment-targets/offline-package-drop/).

## Recovering with a New Master Key

If you are confident with Octopus you can follow these steps to get back up and going. Otherwise, please get in contact with our [support team](https://octopus.com/support) so we can be available to help get you up and going.

### Step 1. Back up before you start

Make sure to [back up everything](/docs/administration/data/backup-and-restore/) before you start this process. At least this will help you start the process again from a known position.

### Step 2. Install Octopus Server on a new machine

Provision a new machine and install Octopus Server on it just like you would normally **except** you won't be able to point it at your existing database because you don't have the Master Key. We are going to get your new Octopus Server up and running on a new database, and then trick it into pointing at your old database.

1. Install Octopus Server.
1. Either point it at a blank database you've created for this purpose, or let Octopus create a database for itself. **We will delete this afterwards.**
1. Load the Octopus Server user interface, click around a little bit, and make sure it looks like a healthy but empty instance of Octopus Server.
1. Run `Octopus.Server.exe service --stop` to stop the Octopus Server (we are going to reconfigure it).
1. Run `Octopus.Server.exe database --connectionString="YOUR-CONNECTION-STRING"` to point this Octopus Server at the database you are trying to recover.
1. Run `Octopus.Server.exe lost-master-key` and carefully follow the prompts. This will take you through each step and generate a detailed report of what has happened.
1. Run `Octopus.Server.exe service --start` to start the Octopus Server running against the recovered database.

**Please read the report carefully and get in touch with us if anything seems out of the ordinary. Back up your new Octopus Server certificate and Master Key!**

### Step 3. Restore trust with your Tentacles

You will need to sign in to all the machines running Tentacle and run a command to make it trust the new Octopus Server certificate.

Run this script on each machine running Tentacle:

```
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

### Step 4. Re-enter all the sensitive values

There is no way to recover this data. You will need to go through and re-enter any sensitive values.

### Step 5. Back up your Octopus Server certificate and Master Key

You may have done this earlier in the process. If not, now is a great time to securely back up your Master Key and Octopus Server certificate!

### Test your backup

Now is a great time to test your backup process worked and ensure you can restore quickly next time when a serious issue occurs. A backup isn't real unless you verify you can restore from it. Take your fresh Octopus backup and recently secured Master Key and attempt to restore your Octopus Server somewhere else to validate it will work when you need it to.

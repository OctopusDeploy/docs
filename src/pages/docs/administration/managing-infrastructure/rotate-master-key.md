---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Rotating the Master Key
description: A guide to rotating the Master Key on all machines hosting the Octopus Server.
navOrder: 45
---

:::hint
The ability to rotate the master key was added in **Octopus 2022.4**.
:::

There are times you might want to rotate your master key, for example if you're worried about the existing master key being leaked. This guide walks you through this process. The rotation should have no impact once it's completed.

This guide assumes you still have access to your Master Key. You should be able to run the [`show-master-key` command](/docs/octopus-rest-api/octopus.server.exe-command-line/show-master-key/). If you've lost access to the Master Key, please refer to [Recovering after losing your Octopus Server and Master Key](/docs/administration/managing-infrastructure/lost-master-key/).

## What is affected by the rotation

Octopus [encrypts important and sensitive data](/docs/security/data-encryption/) using a Master Key. This includes:

- The Octopus Server X.509 certificate which is used for [Octopus to Tentacle communication](/docs/security/octopus-tentacle-communication/) - your Tentacles will still trust your Octopus Server after the rotation.
- Sensitive variable values, wherever you have defined them.
- Sensitive values in your deployment processes, like the password for a custom IIS App Pool user account.
- Sensitive values in your deployment targets, like the password for creating [Offline Drops](/docs/infrastructure/deployment-targets/offline-package-drop/).

## Rotating the Master Key

### Step 1. Back up before you start

Make sure to [back up everything](/docs/administration/data/backup-and-restore/) before you start this process. This should also include the `OctopusServer.config` which contains the old master key in case the process fails.

### Step 2. Stop the server

Master key rotation currently only works when Octopus server is stopped, as the database will not be in a valid state during the rotation process. In an HA cluster, this means all the server nodes need to be stopped. You can do this with `Octopus.Server service --stop` on each server node. This also ensures anything in memory or in transit is persisted to disk before we start.

### Step 3. Rotate the master key

Once everything is backed up and the Octopus Server stopped, the steps are as follows.

1. Run `Octopus.Server rotate-master-key` and follow the prompts. This will guide you through the steps and generate a report at the end of the process. A new master key will also be written to its own file. In an HA setup, this command can be run from any server node.
1. If you have an HA setup, run `Octopus.Server set-master-key --masterKey=NEW_MASTER_KEY` on the other server nodes.
1. You can confirm the new master key is being used by running `Octopus.Server show-master-key`.
1. Run `Octopus.Server service --start` to start the Octopus Server running against the rotated database.

:::warning
**Please read the report carefully and get in touch with us if anything seems out of the ordinary. Back up your new Master Key!**
:::

Here's the beginning of an example report:

```
================================================================================
ROTATE MASTER KEY REPORT
================================================================================
New Master Key: Gj3GfVf1gLn8kQA7wX4iXw==
Processed 10533 documents.
10009/10533 documents were updated
0/10533 documents were left unchanged due to errors

--------------------------------------------------------------------------------
Replaced Master Key
--------------------------------------------------------------------------------
Your Master Key has been replaced, and all of your sensitive values updated with new Master Key.

--------------------------------------------------------------------------------
10009/10533 documents were updated
--------------------------------------------------------------------------------
```

### Step 4. Post-rotation

If the rotation goes well, everything should work exactly the same as before. You may want to check

- Tentacles are still healthy and can connect to Octopus Server.
- Each Server node is reporting as online, and that Octopus is fully functioning.

### Step 5. Back up your Octopus Server certificate and Master Key

If not already, now is a great time to securely back up your Master Key and Octopus Server certificate!

#### Test your backup

Now is a great time to test your backup process worked and ensure you can restore quickly next time when a serious issue occurs. A backup isn't real unless you verify you can restore from it. Take your fresh Octopus backup and recently secured Master Key and attempt to restore your Octopus Server somewhere else to validate it will work when you need it to.

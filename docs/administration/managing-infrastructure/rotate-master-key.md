---
title: Rotating the Master Key
description: A guide to rotating the Master Key on all machines hosting the Octopus Server.
position: 45
---

There are times you might want to rotate your master key, for example if you're worried about the existing master key being leaked. This guide walks you through this process. The rotation should have no impact once it's completed.

This guide assumes you still have access to your Master Key. You should be able to run the [`show-master-key` command](/docs/octopus-rest-api/octopus.server.exe-command-line/show-master-key.md). If you've lost access to the Master Key, please refer to [Recovering after losing your Octopus Server and Master Key](/docs/administration/managing-infrastructure/lost-master-key.md).

## What is affected by the rotation

Octopus [encrypts important and sensitive data](/docs/security/data-encryption.md) using a Master Key. This includes:

- The Octopus Server X.509 certificate which is used for [Octopus to Tentacle communication](/docs/security/octopus-tentacle-communication/index.md) - your Tentacles should still trust your Octopus Server after the rotation.
- Sensitive variable values, wherever you have defined them.
- Sensitive values in your deployment processes, like the password for a custom IIS App Pool user account.
- Sensitive values in your deployment targets, like the password for creating [Offline Drops](/docs/infrastructure/deployment-targets/offline-package-drop.md).

## Rotating the Master Key

### Step 1. Back up before you start

Make sure to [back up everything](/docs/administration/data/backup-and-restore.md) before you start this process. This should also include the ``OctopusServer.config` which contains the old master key in case the process fails.

### Step 2. Stop the server

Master key rotation currently only works when the server is stopped. The database will not be in a valid state during the rotation. You can do this with `Octopus.Server.exe service --stop`. This also ensures anything in memory or in transit is persisted to disk before we start.

### Step 3. Rotate the master key

Once everything is backed up and the Octopus Server stopped, the steps are as follows.

1. Run `Octopus.Server.exec rotate-master-key` and follow the prompts. This will guide you through the steps and generate a report at the end of the process. A new master key will also be written to its own file. In an HA setup, this command can be run from any server node.
1. If you have an HA setup, run `Octopus.Server.exec set-master-key --masterKey=NEW_MASTER_KEY` on the other server nodes.
1. You can confirm the new master key is being used by running `Octopus.Server.exec show-master-key`.
1. Run `Octopus.Server.exe service --start` to start the Octopus Server running against the recovered database.

**Please read the report carefully and get in touch with us if anything seems out of the ordinary. Back up your new Master Key!**

### Step 4. Post-rotation

If the rotate goes well, everything should work exactly the same as before. You may want to check

- Tentacles are still healthy and can connect to Octopus Server.
- The HA cluster is fully functioning.

### Step 5. Back up your Octopus Server certificate and Master Key

If not already, now is a great time to securely back up your Master Key and Octopus Server certificate!

### Test your backup

Now is a great time to test your backup process worked and ensure you can restore quickly next time when a serious issue occurs. A backup isn't real unless you verify you can restore from it. Take your fresh Octopus backup and recently secured Master Key and attempt to restore your Octopus Server somewhere else to validate it will work when you need it to.

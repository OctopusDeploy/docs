---
title: Data encryption
description: This section describes how Octopus Deploy encrypts sensitive data at rest.
position: 50
---

This section focuses on securing data in the [Octopus database](/docs/administration/data/octopus-database/index.md), [backup files](/docs/administration/data/backup-and-restore.md), and other settings in the registry and on disk. For information on how Octopus secures data between Octopus and Tentacles, see [Octopus - Tentacle communication](/docs/security/octopus-tentacle-communication/index.md).

When an Octopus Server is installed, we generate a special key used for encryption, called the **Master Key**. The Master Key is then encrypted asymmetrically, using [DPAPI](http://msdn.microsoft.com/en-us/library/ms995355.aspx), and stored in the Octopus configuration file.

The Master Key is then used along with [AES-128](http://en.wikipedia.org/wiki/Advanced_Encryption_Standard) to encrypt certain sensitive data in the Octopus database, including:

- [Sensitive variables](/docs/projects/variables/sensitive-variables.md).
- Private keys used for [Octopus/Tentacle](/docs/security/octopus-tentacle-communication/index.md) communication, and for authenticating with [Azure](/docs/infrastructure/accounts/azure/index.md) and [SSH endpoints](/docs/infrastructure/deployment-targets/linux/ssh-target.md).
- Credentials used to authenticate with [SSH](/docs/infrastructure/accounts/ssh-key-pair.md) (for username/password auth) and [external NuGet feeds](/docs/packaging-applications/package-repositories/index.md).

The practical impact of this is:

- While most data in the database is plain text, sensitive data like the examples below are encrypted.
- The "Master Key" used to encrypt and decrypt this data is itself encrypted by Windows, using a private key known only by Windows.
- If an attacker has access to your Octopus database backup file, but they aren't on the Octopus Server and don't know the Master Key, they won't be able to decrypt the database or other settings.

:::problem
**Warning**
Without keeping a record of your Master Key, you won't be able to make use of your Octopus database backups, since there is no way to decrypt these sensitive values.
:::

## Your Master Key {#Securityandencryption-YourMasterKey}

When Octopus is installed, it generates a random string which will be used as the Master Key. You will need to know your Master Key if you ever hope to restore an Octopus backup on another server.

### Getting the Master Key from the Octopus Manager {#Securityandencryption-GettingthekeyfromtheOctopusManager}

1. Open the **Octopus Manager** from the start menu/start screen.
2. Click **View Master Key**.
3. Click **Save** to save the Master Key to a text file or **Copy to clipboard** and then paste the Master Key into a text editor or a secure enterprise password manager, and save it.

### Getting the Master Key from PowerShell {#Securityandencryption-GettingtheKeyfromPowershell}

Depending on the version of Octopus Server you are using you may need to use a slightly different parsing:


```powershell using text
$MasterKey = .\Octopus.Server.exe show-master-key
```

```powershell using JSON (if you're in the mood)
$MasterKey = (.\Octopus.Server.exe show-master-key --format=json | ConvertFrom-Json).MasterKey
```

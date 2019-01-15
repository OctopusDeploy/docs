---
title: Data Encryption
description: This section describes how Octopus Deploy encrypts sensitive data at rest.
position: 50
---

This section focuses on securing data in the [Octopus database](/docs/administration/data/octopus-database/index.md), [backup files](/docs/administration/data/backup-and-restore.md), and other settings in the registry and on disk. For information on how Octopus secures data between Octopus and Tentacles, see [Octopus - Tentacle communication](/docs/administration/security/octopus-tentacle-communication/index.md).

When an Octopus Server is installed, we generate a special key used for encryption, called the **master key**. The master key is then encrypted asymmetrically, using [DPAPI](http://msdn.microsoft.com/en-us/library/ms995355.aspx), and stored in the Octopus configuration file.

The master key is then used along with [AES-128](http://en.wikipedia.org/wiki/Advanced_Encryption_Standard) to encrypt certain sensitive data in the Octopus database, including:

- [Sensitive variables](/docs/deployment-process/variables/sensitive-variables.md).
- Private keys used for [Octopus/Tentacle](/docs/administration/security/octopus-tentacle-communication/index.md) communication, and for authenticating with [Azure](/docs/infrastructure/deployment-targets/azure/index.md) and [SSH endpoints](/docs/infrastructure/deployment-targets/linux/index.md).
- Credentials used to authenticate with [SSH](/docs/infrastructure/accounts/ssh-key-pair.md) (for username/password auth) and [external NuGet feeds](/docs/packaging-applications/package-repositories/index.md).

The practical impact of this is:

- While most data in the database is plain text, sensitive data like the examples below are encrypted.
- The "master key" used to encrypt and decrypt this data is itself encrypted by Windows, using a private key known only by Windows.
- If an attacker has access to your Octopus database backup file, but they aren't on the Octopus Server and don't know the master key, they won't be able to decrypt the database or other settings.

:::problem
**Warning**
Without keeping a record of your master key, you won't be able to make use of your Octopus database backups, since there is no way to decrypt these sensitive values.
:::

## Your Master Key {#Securityandencryption-YourMasterKey}

When Octopus is installed, it generates a random string which will be used as the master key. You will need to know your master key if you ever hope to restore an Octopus backup on another server.

### Getting the Key From the Octopus Manager {#Securityandencryption-GettingthekeyfromtheOctopusManager}

1. Open the **Octopus Manager** from the start menu/start screen.
2. Click **View master key**.

![](/docs/images/3048071/3277606.png "width=500")

3. Click **Save** to save the master key to a text file or **Copy to clipboard** and then paste the master key into a text editor or a secure enterprise password manager, and save it.

### Getting the Key From PowerShell {#Securityandencryption-GettingtheKeyfromPowershell}

Depending on the version of Octopus Server you are using you may need to use a slightly different parsing:

```powershell Octopus prior to 3.15 stripping extra whitespace
$MasterKey = (.\Octopus.Server.exe show-master-key)[-1]
```

```powershell Octopus 3.15+ using text
$MasterKey = .\Octopus.Server.exe show-master-key
```

```powershell Octopus 3.15+ using JSON (if you're in the mood)
$MasterKey = (.\Octopus.Server.exe show-master-key --format=json | ConvertFrom-Json).MasterKey
```

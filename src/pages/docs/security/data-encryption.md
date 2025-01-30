---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-10-04
title: Data encryption
description: This section describes how Octopus Deploy encrypts sensitive data at rest.
navOrder: 50
---

This section focuses on securing data in the [Octopus database](/docs/administration/data), [backup files](/docs/administration/data/backup-and-restore/), and other settings in the registry and on disk. For information on how Octopus secures data between Octopus and Tentacles, see [Octopus - Tentacle communication](/docs/security/octopus-tentacle-communication).

When an Octopus Server is installed, we generate a special key used for encryption, called the **Master Key**. The Master Key is then encrypted asymmetrically, using [Windows Data Protection](https://learn.microsoft.com/en-us/previous-versions/ms995355(v=msdn.10)), and stored in the Octopus configuration file.

The Master Key is then used along with [AES-256](http://en.wikipedia.org/wiki/Advanced_Encryption_Standard) to encrypt certain sensitive data in the Octopus database, including:

:::div{.hint}

Octopus Server 2024.4 and newer use AES-256 by default but support AES-128 for compatibility. Previous versions use AES-128.

:::

- [Sensitive variables](/docs/projects/variables/sensitive-variables).
- Private keys used for [Octopus/Tentacle](/docs/security/octopus-tentacle-communication/) communication, and for authenticating with [Azure](/docs/infrastructure/accounts/azure/) and [SSH endpoints](/docs/infrastructure/deployment-targets/linux/ssh-target).
- Credentials used to authenticate with [SSH](/docs/infrastructure/accounts/ssh-key-pair/) (for username/password auth) and [external NuGet feeds](/docs/packaging-applications/package-repositories).

The practical impact of this is:

- While most data in the database is plain text, sensitive data like the examples below are encrypted.
- The "Master Key" used to encrypt and decrypt this data is itself encrypted by Windows, using a private key known only by Windows.
- If an attacker has access to your Octopus database backup file, but they aren't on the Octopus Server and don't know the Master Key, they won't be able to decrypt the database or other settings.

:::div{.problem}

**Warning**
Without keeping a record of your Master Key, you won't be able to make use of your Octopus database backups, since there is no way to decrypt these sensitive values.
:::

## Your Master Key {#your-master-key}

When Octopus is installed, it generates a random string which will be used as the Master Key. You will need to know your Master Key if you ever hope to restore an Octopus backup on another server.

### Getting the Master Key from the Octopus Manager {#getting-key-from-octopus-manager}

1. Open the **Octopus Manager** from the start menu/start screen.
2. Click **View Master Key**.
3. Click **Save** to save the Master Key to a text file or **Copy to clipboard** and then paste the Master Key into a text editor or a secure enterprise password manager, and save it.

### Getting the Master Key from PowerShell {#getting-key-from-powershell}

Depending on the version of Octopus Server you are using you may need to use a slightly different parsing:

<details data-group="data-encryption">
<summary>Using text</summary>

```powershell
$MasterKey = .\Octopus.Server.exe show-master-key
```

</details>
<details data-group="data-encryption">
<summary>Using JSON</summary>

```powershell using JSON (if you're in the mood)
$MasterKey = (.\Octopus.Server.exe show-master-key --format=json | ConvertFrom-Json).MasterKey
```

</details>

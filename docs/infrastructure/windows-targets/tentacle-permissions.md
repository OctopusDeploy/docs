---
title: Permissions Required for the Tentacle Windows Service
description: Everything you need to know about the permissions your tentacles need.
position: 40
---

By default, the Tentacle Windows Service runs under the Local System context. You can configure Tentacle to run under a different user account by modifying the service properties via the Services MMC snap-in (**services.msc**).

The account that you use requires, at a minimum:

- `Log on as a service` right on the current machine - [learn more](https://technet.microsoft.com/en-us/library/dn221981(v=ws.11).aspx).
- Rights to enumerate the `Local Machine` certificate store.
- Permissions to load the private key of the Tentacle X.509 certificate from the `Local Machine` certificate store.
- Read/Write permissions to the Tentacle "Home directory" that you selected when Tentacle was installed (typically, **C:\Octopus**).
- Rights to manage Windows Services (start/stop) - [learn more](https://social.technet.microsoft.com/wiki/contents/articles/5752.how-to-grant-users-rights-to-manage-services-start-stop-etc.aspx).

Please be aware that to perform automatic Tentacle updates you need an account with [extra permissions](/docs/infrastructure/machine-policies.md#MachinePolicies-TentacleUpdateAccount).

In addition, since you are probably using Tentacle to install software, you'll need to make sure that the service account has permissions to actually install your software. This totally depends on your applications, but it might mean:

- Permissions to modify IIS (C:\Windows\system32\inetsrv).
- Permissions to connect a SQL Server database.

:::problem
If you **Reinstall** a Tentacle using the Tentacle Manager, the Windows Service account will revert to Local System.
:::

### Using a Managed Service Account (MSA)

You can run Tentacle using a Managed Service Account (MSA):

1. Install the Tentacle and make sure it is running correctly using one of the built-in Windows Service accounts or a Custom Account.
2. Reconfigure the `Tentacle` Windows Service to use the MSA, either manually using the Service snap-in, or using `sc.exe config "OctopusDeploy Tentacle" obj= Domain\Username$`.
3. Restart the Tentacle Windows Service.

Learn about [using Managed Service Accounts](https://technet.microsoft.com/en-us/library/dd548356(v=ws.10).aspx).

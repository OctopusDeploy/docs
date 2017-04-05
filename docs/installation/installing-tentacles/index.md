---
title: Installing Tentacles
description: Everything you need to know about installing and configuring Octopus Tentacles for use with your deployments.
position: 2
---

Tentacle is a secure, lightweight agent service that Octopus uses to deploy software. Tentacle runs as a Windows Service, and is installed on all of the machines that you plan to deploy software to, such as your application and web servers.

In essence, Tentacle is a job runner. It waits for Octopus to give it a job (deploy a package, run a script), and it executes it, reporting the progress and result back to the Octopus server.

## Requirements {#InstallingTentacles-Requirements}

- Windows Server 2003 SP2 (**N.B. Not supported for Tentacle 3.1 and up due to .NET 4.5 dependency**)
  Windows Server 2008 (**N.B. SP1 not supported for Tentacle 3.1 and up due to .NET 4.5 dependency**)
  Windows Server 2008 R2
  Windows Server 2012
  Windows Server 2012 R2 
  Windows Server 2016
  (Both "Server Core" and "Server with a GUI" installations are supported for Tentacle)
- .NET Framework
- Tentacle 3.0 (TLS 1.0): .NET Framework 4.0+ ([download](http://www.microsoft.com/en-au/download/details.aspx?id=17851))
- Tentacle 3.1+ (TLS 1.0 or 1.2): .NET Framework 4.5+ ([download](http://www.microsoft.com/en-au/download/details.aspx?id=42643))
- Windows PowerShell 2.0. This is automatically installed on 2008 R2, but for 2008 pre-R2 you'll need to install it ([x86 download](http://www.microsoft.com/download/en/details.aspx?id=11829&amp;__hstc=254453975.06c54f702f3aed3215f4224e6b75b56f.1380851265147.1386910090621.1387188601891.78&amp;__hssc=254453975.2.1387188601891&amp;__hsfp=4151299608), [x64 download](http://www.microsoft.com/download/en/details.aspx?displaylang=en&amp;id=20430&amp;__hstc=254453975.06c54f702f3aed3215f4224e6b75b56f.1380851265147.1386910090621.1387188601891.78&amp;__hssc=254453975.2.1387188601891&amp;__hsfp=4151299608))
- Windows PowerShell 3.0 or 4.0 is recommended, both of which are compatible with PowerShell 2.0, but execute against .NET 4.0+.
- Windows Server 2003 servers will need [Windows Management Framework](http://support.microsoft.com/kb/968930?__hstc=254453975.06c54f702f3aed3215f4224e6b75b56f.1380851265147.1386910090621.1387188601891.78&amp;__hssc=254453975.2.1387188601891&amp;__hsfp=4151299608) installed (this includes PowerShell)
- Hardware minimum: 512MB RAM, 1GHz CPU, 2GB free disk space

Tentacle uses a pretty small amount of memory when idle, usually around 10MB (it may appear higher in task manager because memory is shared with other .NET processes that are running). When deploying, depending on what happens during the deployment, this may expand to 60-100MB, and will then go back down after the deployment is complete. Tentacle will happily run on single-core machines, and only uses about 100MB of disk space, though of course you'll need more than that to deploy your applications.

## Installation {#InstallingTentacles-Installation}

:::success
**Download the Tentacle MSI**
The latest Tentacle MSI can always be [downloaded from the Octopus Deploy downloads page](https://octopus.com/downloads).
:::

Octopus and Tentacle can be configured to communicate two different ways depending on your network setup. The mode you are using will change the installation process slightly.

- [Listening mode](/docs/installation/installing-tentacles/listening-tentacles.md) (recommended)
- [Polling mode](/docs/installation/installing-tentacles/polling-tentacles.md)

:::success
**Listening mode is recommended**
When choosing a communication mode, we recommend listening mode when possible. Listening mode uses the least resources (listening on a TCP port is cheaper than actively trying to connect to one). It also gives you the most control (you can use rules in your firewall to limit which IP addresses can connect to the port). [Octopus and Tentacle use SSL when communicating](/docs/reference/octopus-tentacle-communication/index.md), and Tentacle will outright reject connections that aren't from an Octopus server that it trusts (identified by an X.509 certificate public key that you provide during setup).
:::

:::warning
**SSL offloading is not supported**
The communication protocol used by Octopus and Tentacle requires intact end-to-end TLS connection for message encryption, tamper-proofing, and authentication. For this reason SSL offloading is not supported.
:::

:::warning
**Proxy servers supported for Tentacle communications since Octopus 3.4**
The communication protocol used by Octopus and Tentacle 3.4 and above supports proxies. Read more about configuring proxy servers for Tentacle communications in [proxy support](/docs/installation/installing-tentacles/proxy-support.md).

If you are using a version of Octopus/Tentacle prior to 3.4 refer to either [Listening Tentacles](/docs/installation/installing-tentacles/listening-tentacles.md) or [Polling Tentacles](/docs/installation/installing-tentacles/polling-tentacles.md) for more information on configuring a bypass rule.
:::

Tentacle can be installed and configured directly from the command prompt, which is very useful when you need to install Tentacle on a large number of machines. See more in [automating Tentacle installations](/docs/installation/installing-tentacles/automating-tentacle-installation.md).

:::warning
**Cloning Tentacle VMs**
In a virtualized environment, it may be desirable to install Tentacle on a base virtual machine image, and clone this image to create multiple machines.

If you choose to do this, please **do not complete the configuration wizard** before taking the snapshot. The configuration wizard generates a unique per-machine cryptographic certificate that should not be duplicated. Instead, use PowerShell to [automate configuration](/docs/installation/installing-tentacles/automating-tentacle-installation.md) after the clone has been materialized.
:::

After installation, Tentacle runs as a Windows Service named **OctopusDeploy Tentacle**.

:::warning
**Calamari warning in health check**
When you first install a Tentacle it does not have the latest Calamari package installed. So, on the first health check a warning will be written to the log with the following message ***Not running latest version of Calamari. Directory does not exist: C:\<TentacleHomeDirectoryChosenDuringInstallation>\Calamari***, this message can safely be ignored as we will automatically push the latest Calamari package to the Tentacle on the first deployment made to it, or you can manually push the latest Calamari package to the Tentacle from the Environments page.
:::

## Tentacle Manager {#InstallingTentacles-TentacleManager}

The Tentacle MSI installer is very simple: it extracts the core program files on disk, adds an event log source, and that's about it. The actual configuration of your Tentacle is done through a tool called **Tentacle Manager**. When the MSI completes Tentacle Manager will appear, and you can access it any time from your start menu/start screen. Tentacle Manager is a Windows application that:

- Has a setup wizard to configure your Tentacle instance
- Has wizards to configure Tentacle to use a proxy server, or delete the Tentacle instance
- Shows other diagnostic information about Tentacle

## Permissions {#InstallingTentacles-Permissions}

By default, the Tentacle Windows Service runs under the Local System context. You can configure Tentacle to run under a different user account by modifying the service properties via the Services MMC snap-in (**services.msc**).

The account that you use requires, at a minimum:

- Log on as a service rights on the current machine
- Rights to view X.509 certificates in the local machine context
- Read/Write access to the Tentacle "Home directory" that you selected when Tentacle was installed (typically, **C:\Octopus**)
- Permissions to start/stop services

In addition, since you are probably using Tentacle to install software, you'll need to make sure that the service account has permissions to actually install your software. This totally depends on your applications, but it might mean:

- Permissions to modify IIS (C:\Windows\system32\inetsrv)
- Permissions to connect a SQL Server database

:::problem
If you **Reinstall** a Tentacle using the Tentacle Manager, the Windows Service account will revert to Local System.
:::

### Using a Managed Service Account (MSA) {#InstallingTentacles-UsingaManagedServiceAccount(MSA)}

You can run Tentacle using a Managed Service Account (MSA):

1. Install the Tentacle and make sure it is running correctly using one of the built-in Windows Service accounts or a Custom Account
2. Reconfigure the `Tentacle` Windows Service to use the MSA, either manually using the Service snap-in, or using `sc.exe config "OctopusDeploy Tentacle" obj= Domain\Username$`
3. Restart the Tentacle Windows Service

Learn about [using Managed Service Accounts](https://technet.microsoft.com/en-us/library/dd548356(v=ws.10).aspx).

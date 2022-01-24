---
title: Hardening Octopus
description: If you are hosting Octopus Deploy yourself, this guide will help you harden your network, host operating system, and Octopus Server itself. This includes things such as configuring malware protection (anti-virus), and utilizing allow lists.
position: 10
---

We pride ourselves on making Octopus Deploy a secure product. If you are hosting the Octopus Server yourself, you are responsible for the security and integrity of your Octopus installation. This guide will help you harden your network, host operating system, and the Octopus Server itself.

:::hint
Have you heard about [Octopus Cloud](https://octopus.com/cloud)? We take care of hosting your Octopus Server for you so you can get on with the job of deploying and managing your applications.
:::

## Before you begin

Octopus Deploy is a complex system with many security features baked in and tuned by default. Take some time to understand what we've built in to the product, and what you are ultimately taking responsibility for when self-hosting Octopus Deploy.

Learn about [security in Octopus Deploy](index.md).

Reading this guide carefully before you begin will help you prepare all the secure networking and server infrastructure you need for your Octopus installation. If you need any help along the way, don't hesitate to [get in touch](https://octopus.com/support)!

Depending on your scenario you may want to relax or ignore these recommendations.

### Familiarize yourself With Octopus Server

If you consider networking, the host operating system, Microsoft SQL Server, and Octopus Server: it is very likely Octopus Server is the new kid on the block. You should consider downloading a free trial of Octopus Server and setting it up on your local machine so you are familiar with how it works. This will eliminate some potential surprises as you progress through the security hardening.

Learn about [getting started with Octopus Deploy](/docs/getting-started/index.md).

### Choose your order for hardening

Depending on your familiarity with Octopus Server, or SQL Server, or networking, or your host operating system, you should consider the order in which you perform the hardening. For example, if you are unfamiliar with Octopus Server, perhaps you should start there, getting your server up and running and working as you'd expect, then move on to the host operating system, the SQL Server, and finally your networking.

## Harden your Octopus Server

1. Upgrade to the latest version.
1. Securely expose your Octopus Server to your users, infrastructure, and external services
    a. Use HTTPS over SSL.
    b. Configure HTTP security.
1. Configure your workers.
1. Configure the way Octopus Server communicates with deployment targets.

### Upgrade to the latest version

Generally speaking, the latest available version of Octopus Server will be the most secure. You should consider a strategy for keeping Octopus Server updated. We follow a [responsible disclosure policy](index.md#disclosure-policy) so it is possible for you to be aware of any known issues which affect the security and integrity of your Octopus Server.

### Securely expose your Octopus Server

For Octopus Server to be useful you need to expose its HTTP API to your users, and perhaps your infrastructure and some external services. There are many different approaches to solving this problem, but at its core you will want to:

1. Use HTTPS over SSL. Learn about [safely exposing your Octopus Server](/docs/security/exposing-octopus/expose-the-octopus-web-portal-over-https.md).
1. Configure the built in HTTP security features as appropriate for your scenario. Learn about [HTTP security headers](/docs/security/http-security-headers.md).

### Configure your Workers {#configuring-workers}

Workers offer a convenient way to run scripts and certain deployment steps. Learn about [workers](/docs/infrastructure/workers/index.md).

We highly recommend configuring external workers running on a different host to your Octopus Server. This is the easiest and more secure approach to prevent user-provided scripts from doing harm to your Octopus Server.

Learn about the [built-in worker](/docs/infrastructure/workers/built-in-worker.md).

Learn about [external workers](/docs/infrastructure/workers/index.md).

### Configure how Octopus Server communicates with deployment targets

Octopus Server always uses a secure and tamper-proof communications transport for communicating with deployment targets:

- Learn about [Octopus Server to Tentacle communication](/docs/security/octopus-tentacle-communication/index.md).
- Learn about [Octopus Server to SSH communication](/docs/infrastructure/deployment-targets/linux/ssh-target.md).

The decisions you need to make are:

1. Which kind of deployment targets do you want to allow? Listening Tentacles? Polling Tentacles? SSH? This will have an impact on how you configure your network. See [harden your network](#harden-your-network).
1. Do you want to use a proxy server? Learn about [proxy support in Octopus Deploy](/docs/infrastructure/deployment-targets/proxy-support.md).

## Harden your host operating system

These steps apply to the host operating system for your Octopus Server. You may want to consider similar hardening for your [deployment targets](/docs/infrastructure/index.md) and any [workers](/docs/infrastructure/workers/index.md).

1. Rename local administrator account.
1. Configure malware protection.
1. Disable insecure TLS protocols.
1. Prevent user-provided scripts from doing harm.
    a. Run workers under a different security context.
    a. Prevent unwanted file access.
    a. Prevent unwanted file execution.
    a. Prevent creating scheduled tasks.
1. Configure your operating system firewall - see [harden your network](#harden-your-network).

### Rename local administrator accounts

It might seem really simple, but by renaming your `Administrator` account to anything else makes it that much harder for attackers to use this attack vector in to your Octopus Server.

Here is an example script to rename the built-in `Administrator` account in Windows.

```powershell
Write-Output "Ensure local Administrator account renamed..."

$user = Get-LocalUser -Name Administrator -ErrorAction SilentlyContinue

if($user) {
  Write-Output "Renaming local 'Administrator' account to 'Bob'..."
  Rename-LocalUser -Name Administrator -NewName Bob
} else {
  Write-Output "The local 'Administrator' account has already been renamed."
}
```

### Configure malware protection

Depending on your host operating system, and your requirements for malware protection, you may want to install and configure a specific application. At the very least, Windows Defender is a very good starting place on modern Windows operating systems.

Here is an example script for configuring Windows Defender to exclude the Octopus work folders, and to automatically download new definitions.

**Note:** you may need to change the excluded folders/files if you install Octopus Server or Tentacle into a different location.

```powershell
# Install and Configure: https://docs.microsoft.com/en-us/windows/threat-protection/windows-defender-antivirus/windows-defender-antivirus-on-windows-server-2016
# Automatic Exclusions: https://docs.microsoft.com/en-us/windows/threat-protection/windows-defender-antivirus/configure-server-exclusions-windows-defender-antivirus
# Configure Custom Exclusions: https://docs.microsoft.com/en-us/windows/threat-protection/windows-defender-antivirus/configure-extension-file-exclusions-windows-defender-antivirus

Write-Output "Installing Windows Defender..."
Install-WindowsFeature -Name "Windows-Defender"

Write-Output "Setting Windows Update to 'Download updates but let me choose whether to install them'."
Write-Output "This value allows Windows Defender to download and install definition updates automatically, but other updates are not automatically installed."
cscript C:\Windows\System32\Scregedit.wsf /AU 3

Write-Output "Excluding the Calamari folder from Windows Defender..."
Add-MpPreference -ExclusionPath "C:\Octopus\Calamari"
Add-MpPreference -ExclusionPath "C:\Octopus\Calamari\*"

Write-Output "Excluding Octopus Work folder from Windows Defender..."
Add-MpPreference -ExclusionPath "C:\Octopus\Work"
Add-MpPreference -ExclusionPath "C:\Octopus\Work\*"
```

### Disable insecure TLS protocols {#disable-insecure-tls-protocols}

All communication between Octopus Server and Tentacles is performed over a secure ([TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security)) connection. Both Server and Tentacle rely on the host OS for the available TLS version to use when establishing a secure TLS connection when communicating. 

It's possible to disable older, less secure versions of SSL and TLS. This can be done on your Octopus Server as well as both [deployment targets](/docs/infrastructure/index.md) and any [workers](/docs/infrastructure/workers/index.md) you have.

!include <security-disclaimer>

#### Disable SSLv3, TLS 1.0 and 1.1 on Windows {#disable-insecure-tls-protocols-windows}

On Windows, the way to disable insecure versions of SSL and TLS are by editing the registry.

:::problem
**Take care editing registry entries**
Editing the Windows registry can have serious implications. Please make sure you understand and are comfortable with the potential risks. Remember to always backup any keys before they are modified. If you have any questions or need assistance, please [contact us](https://octopus.com/support).
:::

The following example PowerShell will disable `SSLv3`, `TLSv1` and `TLSv1.1`:

```powershell
# SSLv3
New-Item "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0\Server" -Force | Out-Null
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0\Server" -name "Enabled" -value "0" -PropertyType "DWord" -Force | Out-Null
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0\Server" -name "DisabledByDefault" -value 1 -PropertyType "DWord" -Force | Out-Null
New-Item "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0\Client" -Force | Out-Null
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0\Client" -name "Enabled" -value "0" -PropertyType "DWord" -Force | Out-Null
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\SSL 3.0\Client" -name "DisabledByDefault" -value 1 -PropertyType "DWord" -Force | Out-Null

# TLSv1.0
Write-Output "Disable TLS 1.0"

New-Item "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Server" -Force | Out-Null
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Server" -name "Enabled" -value "0" -PropertyType "DWord" -Force | Out-Null
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Server" -name "DisabledByDefault" -value 1 -PropertyType "DWord" -Force | Out-Null
New-Item "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Client" -Force | Out-Null    
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Client" -name "Enabled" -value "0" -PropertyType "DWord" -Force | Out-Null
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Client" -name "DisabledByDefault" -value 1 -PropertyType "DWord" -Force | Out-Null

# TLSv1.1
Write-Output "Disable TLS 1.1"

New-Item "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1\Server" -Force | Out-Null
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1\Server" -name "Enabled" -value "0" -PropertyType "DWord" -Force | Out-Null
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1\Server" -name "DisabledByDefault" -value 1 -PropertyType "DWord" -Force | Out-Null
New-Item "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1\Client" -Force | Out-Null
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1\Client" -name "Enabled" -value "0" -PropertyType "DWord" -Force | Out-Null    
New-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.1\Client" -name "DisabledByDefault" -value 1 -PropertyType "DWord" -Force | Out-Null
```

:::hint
Once the version of TLS is set, reboot your Server and it should be available via `TLSv1.2`.
:::

#### Disable SSLv3, TLS 1.0 and 1.1 on Ubuntu Server  {#disable-insecure-tls-protocols-ubuntu}

On Ubuntu `20.04` using OpenSSL `1.1.1f` (the latest at time of writing), you can specify the minimum TLS version to use to be `TLSv1.2` by setting the `MinProtocol` directive in the `/etc/ssl/openssl.cnf` OpenSSL config file:

```bash
[system_default_sect]
MinProtocol = TLSv1.2
```

On Ubuntu `18.04`, if the `MinProtocol` directive doesn't work, you can try this alternative. When using OpenSSL `1.1.1` (the latest at time of writing), you can specify the available TLS Protocols explicitly in the `/etc/ssl/openssl.cnf` OpenSSL config file:

```bash
[system_default_sect]
Protocol = -SSLv3, -TLSv1, -TLSv1.1, TLSv1.2
```

:::hint
Once the version of TLS is set in your config, you'll want to restart any Tentacle service, and it should be available via `TLSv1.2`.
:::

### Prevent user-provided scripts from doing harm

These steps only apply if you are running either the built-in worker or an external worker on the same host operating system as the Octopus Server itself. You should prevent custom scripts executed by these workers from doing harm to your Octopus Server.

:::hint
Consider using an [external worker](/docs/infrastructure/workers/index.md) and moving this workload to a different server. This is the very best way to prevent any potential for harm to your Octopus Server, and you won't need to rely on the rest of these steps to prevent harm to your Octopus Server.
:::

#### Run as a different user

Applies to: `Built-in worker` and `External worker` running on the Octopus Server

The first step is to make the worker run under a different security context to the Octopus Server. This enables you to make the distinction between what the Octopus Server should be able to do, versus what the worker should be able to do.

See [configuring workers](#configuring-workers).

#### Prevent unwanted file access

Applies to: `Built-in worker` and `External worker` running on the Octopus Server

Here is an example script preventing the worker from accessing the Octopus Server configuration which contains sensitive information.

**Note:** In your scenario you may need to use a different username and/or Octopus Home folder path.

```powershell
$username = "svcWorker"
$octopusHome = "C:\Octopus"
$acl = Get-Acl -Path $octopusHome
$acl.SetAccessRule(New-Object System.Security.AccessControl.FileSystemAccessRule("$username","FullControl","Deny"))
Set-Acl -Path $octopusHome -AclObject $acl
```

If you are using an external worker, that's all you need to do. However if you are using the built-in worker you should allow access to its `Work` directory which is located under the Octopus Home directory.

```powershell
$workDirectory = Join-Path $octopusHome "OctopusServer\Work"
$acl = Get-Acl -Path $workDirectory
$acl.SetAccessRule(New-Object System.Security.AccessControl.FileSystemAccessRule("$username","FullControl","Allow"))
Set-Acl -Path $workDirectory -AclObject $acl
```

### Prevent unwanted execution

Applies to: `Built-in worker` and `External worker` running on the Octopus Server

Here is an example script for preventing execution of certain Windows executables which could be used by an attacker to learn information about your network.

```powershell
$username = "svcOctopus"
$executables = @("C:\Windows\System32\NETSTAT.EXE", "C:\Windows\System32\ROUTE.EXE", "C:\Windows\System32\NETSH.EXE")
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("$username","Read","Deny")

foreach ($executable in $executables) {
  $acl = Get-Acl -Path $executable
  $acl.SetAccessRule($rule)

  Write-Output "Denying read access to $executable for $username..."
  Set-Acl -Path $executable -AclObject $acl
}
```

### Prevent creating scheduled tasks or chron jobs

Applies to: `Built-in worker` and `External worker` running on the Octopus Server

Attackers could potentially create a scheduled task or chron job to run as a privileged user account.

Here is an example script to prevent members of the `Authenticated Users` group from creating Scheduled Tasks in Windows.

```powershell
Write-Output "Prevent users from creating scheduled tasks..."

# /grant:r    replace existing permissions
# S-1-5-11    "Authenticated Users"
# (CI)        "Container Inherit"
# (Rc)        "Read Permissions"
& "$env:SystemRoot\System32\icacls.exe" "$env:SystemRoot\System32\Tasks\" "/grant:r" "*S-1-5-11:(CI)(Rc)"
```

## Harden your SQL Server

You don't need to do very much here specific to Octopus Server.

1. Use Integrated Security for the database connection if possible, otherwise use a strong password.
1. Prevent the Octopus Server's Server Principal (Login) from doing harm outside its own database.

Learn about managing your [Octopus SQL database](/docs/installation/sql-server-database.md).

## Harden your network {#harden-your-network}

Your Octopus Server is very similar to any other secure web server: to do anything useful you need to allow certain network traffic in/out. Depending on your scenario you will need to apply these rules at several levels including:

- network control infrastructure
- the firewall in the host operating system

The TCP ports listed below are defaults, and can be changed if required - refer to the relevant documentation if you need to change from these default ports.

### Inbound rules

|Name|Type|Source|Target|Allow/Deny|Description|
|---|---|---|---|---|---|
|HTTP|`TCP 80`|Users|Octopus Server|ALLOW|We recommend only using HTTPS over SSL, however it can be convenient to allow HTTP for the initial connection which is then forced to HTTPS over SSL.|
|HTTPS|`TCP 443`|Users, Polling Tentacles, external services|Octopus Server|ALLOW|Required for HTTPS over SSL. Also required if using [Polling Tentacles](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#polling-tentacles) over [Web Sockets](/docs/infrastructure/deployment-targets/windows-targets/polling-tentacles-web-sockets.md).|
|Polling Tentacle|`TCP 10943`|Polling Tentacles|Octopus Server|ALLOW|Required when using [Polling Tentacles](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#polling-tentacles) via TCP as deployment targets or external workers.|
|SSH|`TCP 22`|Octopus Server|SSH deployment targets|ALLOW|Allows Octopus Server to securely connect to any SSH deployment targets.|
|RDP|`TCP 3389`|Remote Desktop Users|Octopus Server|ALLOW|Allows your system administrators to perform maintenance tasks on your Octopus Server.|
|All inbound|`ALL`|Anywhere|Octopus Server|DENY|Prevent any other unwanted inbound traffic.|

### Outbound rules

|Name|Type|Source|Target|Allow/Deny|Description|
|---|---|---|---|---|---|
|Listening Tentacle|`TCP 10933`|Octopus Server|Listening Tentacles|ALLOW|Required when using [Listening Tentacles](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#listening-tentacles-recommended) as deployment targets or external workers.|
|MS SQL|`TCP 1433`|Octopus Server|SQL Server|ALLOW|Allows Octopus Server to connect to its SQL Server Database.|
|MS SQL|`UDP 1434`|Octopus Server|SQL Server|ALLOW|Allows Octopus Server to connect to a named instance using the SQL Server Browser Service. This may not be required in your configuration.|
|SMB|`TCP 445`|Octopus Server|Anywhere|DENY|Prevents attackers from spreading malware via known SMB vulnerabilities.|
|RDP|`TCP 3389`|Octopus Server|Anywhere|DENY|Prevents attackers from using the Octopus Server as a beachhead into your network via RDP.|
|WinRM-HTTP|`TCP 5985`|Octopus Server|Anywhere|DENY|Prevents attackers from using the Octopus Server as a beachhead into your network via unsecured WinRM.|
|All outbound|`ALL`|Octopus Server|Anywhere|???|Depends on how fine-grained control you want over what your Octopus Server can do. It also depends on where your workers are, and where you are deploying to. Allowing all outbound traffic is a good place to start, then perform network analysis to decide on your next step.|

## Harden your containers

If you run an [Octopus Deploy container](/docs/installation/octopus-server-linux-container/index.md), in addition to your usual security measure for running apps out of containers, take the following steps to secure it: 

- Move your docker data directory (the default location is `/var/lib/docker`) so that your containers are stored on a separate partition. 
- Assign resources carefully:
  - Consider pinning CPUs to namespaces in order to give them a boundary. 
  - Consider the amount of memory required, if you assign too much the container is susceptible to denial of service attacks, but if you assign too little or make use of memory ballooning performance will be impacted. 
- Consider which containers reside in each network namespace as all processes in a namespace can talk to the namespace interface.

The security of your Linux container host and its Docker configuration can be analyzed in detail by using [Docker Bench for Security](https://github.com/docker/docker-bench-security) from the [Center for Internet Security](https://www.cisecurity.org/about-us/). For more generalized advice for your platform they provide their benchmarks as [PDF documents](https://www.cisecurity.org/benchmark/docker/).

## Samples

We have an [Octopus Admin](https://g.octopushq.com/OctopusAdminSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at some examples of how we have used Octopus for hardening tasks. 

## Getting help

We are more than happy to help if you are having trouble with self-hosting Octopus Deploy, or are concerned about the security or integrity of your Octopus installation. Don't hesitate to [get in touch](https://octopus.com/support)!

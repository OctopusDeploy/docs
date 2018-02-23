---
title: Security hardening Octopus Server
description: If you are hosting Octopus Deploy yourself, this guide will help you harden your network, host operating system, and Octopus Server itself.
position: 1
---

We pride ourselves on making Octopus Deploy a secure product. If you are hosting the Octopus Server yourself, you are responsible for the security and integrity of your Octopus installation. This guide will help you harden your network, host operating system, and the Octopus Server itself.

:::hint
Have you heard about [Octopus Cloud](https://octopus.com/cloud)? We take care of hosting your Octopus Server for you so you can get on with the job of deploying and managing your applications.
:::

!toc

## Before you begin

Octopus Deploy is a complex system with many security features baked in and tuned by default. Take some time to understand what we've built in to the product, and what you are ultimately taking responsibility for when self-hosting Octopus Deploy.

Learn about [security in Octopus Deploy](index.md).

Reading this guide carefully before you begin will help you prepare all the secure networking and server infrastructure you need for your Octopus installation. If you need any help along the way, don't hesitate to [get in touch](https://octopus.com/support)!

Depending on your scenario you may want to relax or ignore these recommendations.

### Familiarize yourself with Octopus Server

If you consider networking, the host operating system, and Octopus Server: it is very likely Octopus Server is the new kid on the block. You should consider downloading a free trial of Octopus Server and setting it up on your local machine so you are familiar with how it works. This will eliminate some potential surprises as you progress through the security hardening.

Learn about [getting started with Octopus Deploy](/docs/getting-started.md).

### Choose your order for hardening

Depending on your familiarity with Octopus Server, or networking, or your host operating system, you should consider the order in which you perform the hardening. For example, if you are unfamiliar with Octopus Server, perhaps you should start there, getting your server up and running and working as you'd expect, then move on to the operating system, and finally your networking.

## Harden your Octopus Server

1. Securely expose your Octopus Server to your users, infrastructure, and external services
    a. Use HTTPS over SSL
    b. Configure HTTP security
1. Use external workers
1. Configure the way your Octopus Server communicates with deployment targets

## Harden your host operating system

These steps apply to the host operating system for your Octopus Server. You may want to consider similar hardening for your [deployment targets](/docs/infrastructure/index.md) and any [workers](/docs/administration/workers/index.md).

1. Configure your operating system firewall - see [harden your network](#harden-your-network)
1. Configure file access control
1. Prevent unwanted execution
1. Prevent creating scheduled tasks
1. Rename local administrator account

### Configure malware protection

Applies to: `Everywhere`



```powershell
# Install and Configure: https://docs.microsoft.com/en-us/windows/threat-protection/windows-defender-antivirus/windows-defender-antivirus-on-windows-server-2016
# Automatic Exclusions: https://docs.microsoft.com/en-us/windows/threat-protection/windows-defender-antivirus/configure-server-exclusions-windows-defender-antivirus
# Configure Custom Exclusions: https://docs.microsoft.com/en-us/windows/threat-protection/windows-defender-antivirus/configure-extension-file-exclusions-windows-defender-antivirus

Write-Output "Installing Windows Defender..."
Install-WindowsFeature -Name "Windows-Defender"

Write-Output "Setting Windows Update to 'Download updates but let me choose whether to install them'."
Write-Output "This value allows Windows Defender to download and install definition updates automatically, but other updates are not automatically installed."
cscript C:\Windows\System32\Scregedit.wsf /AU 3

Write-Output "Excluding D:\Octopus\Calamari from Windows Defender..."
Add-MpPreference -ExclusionPath "D:\Octopus\Calamari"
Add-MpPreference -ExclusionPath "D:\Octopus\Calamari\*"

Write-Output "Excluding D:\Octopus\Work from Windows Defender..."
Add-MpPreference -ExclusionPath "D:\Octopus\Work"
Add-MpPreference -ExclusionPath "D:\Octopus\Work\*"
```

### Configure file access control

Applies to: `Workers`, `Tentacle` targets, and `SSH` targets



### Prevent unwanted execution

Applies to: `Workers`, `Tentacle` targets, and `SSH` targets

You should prevent user-provided scripts from executing certain sensitive programs on the host operating system. User-provided scripts are executed by workers and Tentacles.

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

Applies to: `Workers`, `Tentacle` targets, and `SSH` targets

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

### Rename local administrator accounts

Applies to: `Everything`

Rename the `Administrator` account to something else.

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

## Harden your network {#harden-your-network}

Your Octopus Server is very similar to any other secure web server: to do anything useful you need to allow certain network traffic in/out. Depending on your scenario you will need to apply these rules at several levels including:

- network control infrastructure
- the firewall in the host operating system

The TCP ports listed below are defaults, and can be changed if required - refer to the relevant documentation if you need to change from these default ports.

### Inbound rules

|Name|Type|Source|Target|Allow/Deny|Description|
|---|---|---|---|---|---|
|HTTP|`TCP 80`|Users|Octopus Server|ALLOW|We recommend only using HTTPS over SSL, however it can be convenient to allow HTTP for the initial connection which is then forced to HTTPS over SSL.|
|HTTPS|`TCP 443`|Users, Polling Tentacles, external services|Octopus Server|ALLOW|Required for HTTPS over SSL. Also required if using [Polling Tentacles](/docs/infrastructure/windows-targets/polling-tentacles/index.md) over [Web Sockets](/docs/infrastructure/windows-targets/polling-tentacles/polling-tentacles-web-sockets.md).|
|Polling Tentacle|`TCP 10943`|Polling Tentacles|Octopus Server|ALLOW|Required when using [Polling Tentacles](/docs/infrastructure/windows-targets/polling-tentacles/index.md) via TCP as deployment targets or external workers.|
|SSH|`TCP 22`|Octopus Server|SSH deployment targets|ALLOW|Allows Octopus Server to securely connect to any SSH deployment targets.|
|RDP|`TCP 3389`|Remote Desktop Users|Octopus Server|ALLOW|Allows your system administrators to perform maintenance tasks on your Octopus Server.|
|All inbound|`ALL`|Anywhere|Octopus Server|DENY|Prevent any other unwanted inbound traffic.|

### Outbound rules

|Name|Type|Source|Target|Allow/Deny|Description|
|---|---|---|---|---|---|
|Listening Tentacle|`TCP 10933`|Octopus Server|Listening Tentacles|ALLOW|Required when using [Listening Tentacles](/docs/infrastructure/windows-targets/listening-tentacles/index.md) as deployment targets or external workers.|
|MS SQL|`TCP 1443`|Octopus Server|SQL Server|ALLOW|Allows Octopus Server to connect to its SQL Server database.|
|SMB|`TCP 445`|Octopus Server|Anywhere|DENY|Prevents attackers from spreading malware via known SMB vulnerabilities.|
|RDP|`TCP 3389`|Octopus Server|Anywhere|DENY|Prevents attackers from using the Octopus Server as a beachhead into your network via RDP.|
|WinRM-HTTP|`TCP 5985`|Octopus Server|Anywhere|DENY|Prevents attackers from using the Octopus Server as a beachhead into your network via unsecured WinRM.|
|All outbound|`ALL`|Octopus Server|Anywhere|???|Depends on how fine-grained control you want over what your Octopus Server can do. It also depends on where your workers are, and where you are deploying to. Allowing all outbound traffic is a good place to start, then perform network analysis to decide on your next step.|

## Getting help

We are more than happy to help if you are having trouble with self-hosting Octopus Deploy, or are concerned about the security or integrity of your Octopus installation. Don't hesitate to [get in touch](https://octopus.com/support)!
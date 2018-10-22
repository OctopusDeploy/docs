---
title: Troubleshooting Schannel and TLS
description: Troubleshooting Octopus secure communication issues with Schannel and TLS.
---

Octopus uses `Schannel` for secure communications and will attempt to use the best available protocol available to both servers. A few industry pressures and changes have been causing problems for Tentacle communications:

1. Firstly TLS 1.1 and TLS 1.2 are [disabled by default on Windows Server 2003 and Windows Server 2008](https://blogs.msdn.microsoft.com/kaushal/2011/10/02/support-for-ssltls-protocols-on-windows/) and need to be manually enabled.
2. Server administrators are generally being encouraged by Microsoft to prefer TLS 1.1 or 1.2 over TLS 1.0.
3. Similarly certain ciphers and hashes are commonly being disabled.
4. Recent Windows patches (like [KB3140245](https://support.microsoft.com/en-au/kb/3140245) and [KB3174644](https://support.microsoft.com/en-us/kb/3174644)) enable server administrators to modify the default behavior of Schannel using group policy or registry changes.

A mismatch in the enabled protocols, ciphers, hashes or key exchanges on either end can break Tentacle communications.

**Error message you may see when Schannel fails:**

Client-side:`System.Security.Authentication.AuthenticationException: A call to SSPI failed, see inner exception. ---> System.ComponentModel.Win32Exception: One or more of the parameters passed to the function was invalid`

Server-side:`System.IO.IOException: Unable to read data from the transport connection: An existing connection was forcibly closed by the remote host.`

## Solutions {#TroubleshootingSchannelandTLS-Solutions}

Depending on your circumstances you may need to implement one or more of these suggested solutions.

### Solution: Ensure TLS 1.1 and/or TLS 1.2 Are Enabled on Both Machines {#TroubleshootingSchannelandTLS-Solution:EnsureTLS1.1and/orTLS1.2areenabledonbothmachines}

TLS 1.1 and 1.2 are disabled by default on Windows Server 2003 and 2008 and need to be enabled by an administrator. See [this blog post](https://blogs.msdn.microsoft.com/kaushal/2011/10/02/support-for-ssltls-protocols-on-windows/) for more information. You can enable TLS 1.2 by changing the Windows registry (as described in that blog post), or use a tool like [IISCrypto](https://www.nartac.com/Products/IISCrypto). In some cases we have seen the Tentacle machine forced to use TLS 1.2 (via [KB3140245](https://support.microsoft.com/en-au/kb/3140245)) when the Octopus Server only supported TLS 1.0. Enabling TLS 1.2 on the Octopus Server fixed that problem.

### Solution: Upgrade Octopus Server and Tentacle to 3.1 or Newer {#TroubleshootingSchannelandTLS-Solution:UpgradeOctopusServerandTentacleto3.1ornewer}

Upgrading Octopus Server and Tentacle to 3.1 or newer will enable TLS 1.2 which is enabled in most networks, noting TLS 1.2 needs to be enabled on Windows Server 2003 and Windows Server 2008.

- Octopus Server and Tentacle prior to 3.1 used TLS 1.0 (due to a dependency on .NET Framework 4.0).
- Octopus Server and Tentacle 3.1 or newer enable the newer TLS protocols and will use TLS 1.2 by default (with the updated dependency on .NET Framework 4.5).

### Solution: Ensure Schannel is Configured Consistently on Both Servers {#TroubleshootingSchannelandTLS-Solution:EnsureSchannelisconfiguredconsistentlyonbothservers}

You can use a tool like [IISCrypto](https://www.nartac.com/Products/IISCrypto) to confirm and repair the configuration of Schannel on both servers. A mismatch in the enabled protocols, ciphers, hashes or key exchanges on either end can break Tentacle communications.

![](/docs/images/5670828/5865774.png "width=500")

### Solution: Consider Rolling Back Recent Windows Patches {#TroubleshootingSchannelandTLS-Solution:ConsiderrollingbackrecentWindowspatches}

Some customers have decided to roll back the Windows patches mentioned above and have reported success getting Tentacle communication working again. We would recommend upgrading Octopus and Tentacle to make use of TLS 1.2 by default in preference to rolling back any patches.

### Solution: Increase the RSA Key Length of Your Octopus Server or Tentacle Certificate {#TroubleshootingSchannelandTLS-Solution:IncreaseRdaKeyLength}

Some customers have reported that after tightening the use of TLS to exclusively enable TLS 1.2, Tentacles become unable to communicate with Octopus Server and they see the error `A call to SSPI failed, see inner exception`.

This could occur if the RSA Key length is small (512 bit) and we have received reports that regenerating the TLS Certificate using [new-certificate](/docs/api-and-integration/tentacle.exe-command-line/new-certificate,md) fixes the issue.

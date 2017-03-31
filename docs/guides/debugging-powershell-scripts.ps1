---
title: Debugging PowerShell scripts on remote machines
description: This guide provides details on debugging PowerShell scripts with Octopus Deploy.
position: 13
---

This guide provides details on how to debug PowerShell scripts while they are being deployed by Octopus Deploy to remote machines. This guide demonstrates connecting to the worst case scenario: connecting via IP address to an untrusted machine on a public network. Some steps may be ommited when connecting to machines on the same subnet or domain.

## Configuring PowerShell remoting
PowerShell remoting must be enabled on the remote machine and configured for SSL and the trust established between the remote machine and the debugging machine.

To enable PowerShell remoting on the remote machine:
```powershell
Enable-PSRemoting -SkipNetworkProfileCheck -Force
```

To establish trust between the debugging machine and the remote machine let's configure remoting over SSL.  The remote machine requires a self-signed certificate, an HTTPS listener and a firewall rule to allow incoming requests on port 5986:

```powershell
$dnsName = "55.555.55.555" # The IP address you are using to connect to the machine

$certificate = New-SelfSignedCertificate -CertstoreLocation Cert:\LocalMachine\My -DnsName "$dnsName"
New-Item -Path WSMan:\LocalHost\Listener -Transport HTTPS -Address * -CertificateThumbPrint $certificate.Thumbprint –Force
New-NetFirewallRule -DisplayName "Windows Remote Management (HTTPS-In)" -Name "Windows Remote Management (HTTPS-In)" -Profile Any -LocalPort 5986 -Protocol TCP
```

We also need to export the certificate so that it can be trusted by the debugging machine:
```powershell
Export-Certificate -Cert $certificate -FilePath "C:\remoting-certificate.cer"
```

In order to connect to the remote machine, the debugging machine must add the certificate to its Trusted Root Certification Authorities. Copy the exported certificate (remoting-certificate.cer) from the remote machine to the machine that will be doing the debugging. Import the certificate into Trusted Root Certification Authorities:

```powershell
Import-Certificate -Filepath "C:\remoting-certificate.cer" -CertStoreLocation "Cert:\LocalMachine\Root"
```

## Setting up Octopus for PowerShell debugging
Create a project with a "Run a Script" step that contains some PowerShell.  For example:

TODO: Image

PowerShell debugging is enabled by the adding the variable `Octopus.Action.PowerShell.DebugMode` and setting the value to `true`. See [the PowerShell debugging documentation](docs/deploying-applications/custom-scripts/debugging-powershell-scripts.md) for all of the possible settings.

TODO: Image

Now, create a release and deploy it.  The deployment will pause while waiting for a PowerShell debugger to attach:

TODO: Image

## Starting the PowerShell debug session
The deployment in Octopus outputs the information required to start debugging the PowerShell script. We will be connecting to our remote machine via IP address so we can not use the name indicated by Octopus. First we must start a session with the remote computer.  Open PowerShell ISE and run the following:

```powershell
$userName = "Administrator" # The user name to use to connect to the remote machine
$password = "MyPassword" # The password to use to connect to the remote machine
$ipAddress = "55.555.55.555" # The IP address of the remote machine

$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$credentials = New-Object System.Management.Automation.PSCredential ($userName, $securePassword)

Enter-PSSession -ComputerName $ipAddress -UseSSL -Credential $credentials
```

One the session is established we can connect to the PowerShell process and start debugging.  The information provided in the Octopus deployment log can be used here:

```powershell
Enter-PSHostProcess -Id 3720
Debug-Runspace -Id 2
```

PowerShell ISE will open a window showing the script currently executing on the remote machine.  You can step through the script like in most debuggers.

TODO: Image

When you are finished debugging, run to the end of the script and the deployment will be complete.

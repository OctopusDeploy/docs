---
title: Debugging PowerShell Scripts on Remote Machines
description: This guide provides details on debugging PowerShell scripts with Octopus Deploy.
position: 13
version: 3.12
---

This guide provides details on how to debug PowerShell scripts while they are being deployed by Octopus Deploy to remote machines. This guide demonstrates connecting via IP address to an untrusted machine on a public network. Some steps may be omitted when connecting to machines on the same subnet or domain.

## Configuring PowerShell Remoting
PowerShell remoting must be enabled on the remote machine and configured for SSL and the trust established between the remote machine and the debugging machine.

To enable PowerShell remoting on the remote machine:

```powershell
Enable-PSRemoting -SkipNetworkProfileCheck -Force
```

To establish trust between the debugging machine and the remote machine let's configure remoting over SSL.  The remote machine requires a certificate, an HTTPS listener and a firewall rule to allow incoming requests on port 5986:

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

In order to connect to the remote machine, the debugging machine must add the certificate to its Trusted Root Certification Authorities. Copy the exported certificate (`remoting-certificate.cer`) from the remote machine to the machine that will be doing the debugging. Import the certificate into Trusted Root Certification Authorities:

```powershell
Import-Certificate -Filepath "C:\remoting-certificate.cer" -CertStoreLocation "Cert:\LocalMachine\Root"
```

## Setting up Octopus for PowerShell Debugging
Create a project with a "Run a Script" step that contains some PowerShell.  For example:

```powershell
$sampleDebugValue = 45

Write-Host "$sampleDebugValue"
```

PowerShell debugging is enabled by adding the project variable `Octopus.Action.PowerShell.DebugMode` and setting the value to `true`. See [the PowerShell debugging documentation](/docs/deployment-examples/custom-scripts/debugging-powershell-scripts.md) for all of the possible settings.

Now, create a release and deploy it.  The deployment will pause while waiting for a PowerShell debugger to attach.

## Starting the PowerShell Debug Session
The deployment in Octopus outputs the information required to start debugging the PowerShell script. If we have name resolution configured we could connect to the machine using the name indicated by Octopus, but in this instance we will use the machine's IP address. First we must start a session with the remote computer.  Open PowerShell ISE and run the following:

```powershell
$ipAddress = "55.555.55.555" # The IP address of the remote machine

$credentials = Get-Credential

Enter-PSSession -ComputerName $ipAddress -UseSSL -Credential $credentials
```

Once the session is established we can connect to the PowerShell process and start debugging.  The information provided in the Octopus deployment log can be used here:

```powershell
Enter-PSHostProcess -Id 3720
Debug-Runspace -Id 2
```

PowerShell ISE will open a window showing the script currently executing on the remote machine.  You can step through the script using `F10` to step over and `F11` to step in.

![Debugging remote PowerShell scripts](debugging-powershell-scripts-debug.png)

When you are finished debugging, run to the end of the script and the deployment will be complete.

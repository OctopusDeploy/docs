---
title: Troubleshoot Polling Tentacles
description: How to troubleshoot problems with polling Tentacles.
position: 65
---

If Tentacle is unable to connect to the Octopus Deploy server, any errors will appear in the Windows Event Viewer. You can also open a web browser on the Tentacle and try browsing to the Octopus Deploy server using **HTTPS** (will not work with HTTP) and be welcomed with a friendly message.

:::hint
**Client Certificates and Certificate Warnings**
You may be prompted to provide a client certificate, you can simply cancel this prompt and move on. You may also be warned the connection is not private or the server is not trusted which happens because Octopus uses a self-signed certificate for its listening endpoint. You can safely ignore these warnings and proceed to the site.
:::

![](/docs/images/3048113/3277906.png "width=500")

If you can browse to the Octopus server listening endpoint, but Tentacle is unable to communicate with it, try using remote desktop on the Tentacle server and browsing to the Octopus listening endpoint address using the format above. If you can't access the Octopus server, check any intermediary firewalls.

**Like Using Curl?**

```bash
curl https://your-octopus:10943 -k
```

**Prefer PowerShell?**

```powershell
Add-Type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@

[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy
Invoke-WebRequest -Uri https://your-octopus:10943
```


When an Octopus Tentacle is configured in [Polling mode](/docs/infrastructure/windows-targets/tentacle-communication.md#polling-tentacles), it will attempt to connect to the Octopus Server on the configured TCP port (by default TCP port **10943** on the Octopus Server) poll the Octopus Server for work to be performed.

![](/docs/images/5670828/5865874.png)

All of the 'classic' problems of TCP networking: firewalls, proxies, timeouts, DNS issues and so-on can affect Octopus Tentacles. This guide will help to track down these issues when either a machine cannot be registered with the Octopus installation, or a previously working machine fails to health-check with errors from the networking stack.

:::success
Before following the steps below, it can be worthwhile to restart the Octopus and Tentacle services, and refresh the browser you're using to connect to the Octopus Web Portal. Neither action *should* fix a communication problem, but sometimes they can help flush a problem out.
:::

:::success
If you have worked through this guide without success, it can be worthwhile to completely remove the Tentacle configuration, data, and working folders, and then reconfigure it from scratch. This can be done without any impact to the applications you have deployed. Learn about [manually uninstalling Tentacle](/docs/administration/tentacle-configuration-and-file-storage/manually-uninstall-tentacle.md). Working from a clean slate can sometimes expose the underlying problem.
:::

## Identify the Problem {#TroubleshootPollingTentacles-Homeinontheproblem}

If you're at "square 1" and can't register a new Tentacle with the Octopus Server, take note of the error presented when you attempt to register the Tentacle. During the registration phase the tooling attempts to use the Octopus Server API (by default TCP Port **80** or **443**). It is not until the registration is successful that the Tentacle will attempt to start polling the Octopus Server (by default TCP port **10943** on the Octopus Server).

If you are having problems with a previously-working machine, or you've successfully registered a machine but can't get communication to work afterwards, you can find information in three places:

1. If the machine has been included in a Health Check or Deployment, examine the Raw Task Log. There's a link to this on the page containing the details of the Health Check or Deployment, which can usually be located using the *Tasks* page in the Octopus Web Portal.
2. On the *Infrastructure* page of the Octopus Web Portal, click on the problem machine and select the *Connectivity* tab. There's often specific information about the communication status of the machine here.
3. In the Octopus Web Portal, open {{Configuration,Diagnostics}}. Information on this page can be helpful to work out what's going on in the Octopus installation. Following the link to *Server logs* and searching for the machine's name or IP address can turn up useful information.

:::success
**Don't miss the great info already on the web**
Many communication problems between Octopus Servers and Tentacles have been discussed online. A quick web search for *Octopus <your error message>* will often turn up useful information.
:::

Verify the Tentacle communications settings

*On the Tentacle machine*, open the Tentacle Manager application from the Start screen or Start menu.

![](/docs/images/5670828/5865770.png "width=500")

The application should show the service as running.

There are three pieces of information to verify.

1. Ensure that the Tentacle is in *Polling* mode.
Below the thumbprint, you should see the text *This Tentacle polls the Octopus server...*.
2. Check the port that the Tentacle polls the Octopus Server on.
3. Check that the **Octopus Server** thumbprint shown matches the one shown in the {{Configuration,Certificates}} screen in the Octopus Web Portal.

Note that there are two thumbprints displayed - that of the Tentacle itself (shown first in bold) and the thumbprints of trusted servers (shown inline in the gray text).

:::hint
**If any communication settings are incorrect...**
If any of the communications settings are incorrect, choose *Delete this Tentacle instance...*. After doing so, you'll be presented with the Tentacle installation wizard, where the correct settings can be chosen.
:::

Finally, verify that the Tentacle's thumbprint, shown in bold in the large box, matches any that have been presented in error messages, and in the *Machine Settings* page on the Octopus Web Portal.

## Verify the Octopus and Tentacle Services are Running {#TroubleshootPollingTentacles-VerifytheOctopusandTentacleservicesarerunning}

If you're successfully connecting to the Octopus Web Portal with your web browser, you can be confident the Octopus Server service is running.

The Tentacle Manager usually shows correct service status, but it pays to double-check. *On the Tentacle machine*, open the Windows Services Control Panel applet (`services.msc`) and look for "OctopusDeploy Tentacle". Verify that the service is in the "Running" state.

:::hint
**If the services is not running...**
If the Tentacle service is not running, you can try to start it from the Services applet. Allow 30 seconds for the service to start work, then refresh the Services screen. **If the Tentacle service keeps running**, go back to the Octopus Web Portal and try Health Checking the affected machine again. **If the service stops**, it is likely that the service is crashing during startup; this can be caused by a number of things, most of which can be diagnosed from the Tentacle log files. Inspect these yourself, and either send the [log files](/docs/support/log-files.md) or extracts from them showing the issue to the Octopus Deploy Support email address for assistance.
:::

If the service is up and running, continue to the next step.

## Connect Locally to the Octopus Server Polling Endpoint Using Your Browser {#TroubleshootPollingTentacles-ConnectlocallytotheOctopusServerpollingendpointusingyourbrowser}

*On the Octopus Server machine*, open a web browser and navigate to [https://localhost:10943](https://localhost:10943) (or your chosen Tentacle communications port if it isn't the default). Make sure an**HTTPS** URL is used.

- If you're presented with a prompt to "confirm a certificate" or "select a certificate" choose "Cancel" - don't provide one

- If you're presented with a warning about the invalidity of the site's certificate, "continue to the site" or "add an exception" (Octopus Server uses a self-signed certificate by default)

The page shown should look like the one below.

![](/docs/images/3048113/3277906.png "width=500")

If you've made it this far, good news! Your Octopus Server is running and ready to accept inbound connections from Polling Tentacles.

:::hint
**If you can't browse to the page...**
If this is where your journey ends, there's a problem on the Octopus Serve machine itself. It is very likely that the Octopus Server is unable to open the communications port, either because of permissions, or because another process is listening on that port. Using the Windows `netstat -o -n -a -b` command can help to get to the bottom of this quickly. If you're still in trouble, check the Octopus Server [log files](/docs/support/log-files.md) and contact Octopus Deploy support.
:::

## Connect From the Tentacle Machine {#TroubleshootPollingTentacles-ConnectfromtheTentaclemachine}

Next, repeat the process of connecting to the Octopus Server with a web browser, but do this *from the Tentacle machine*.

When forming the URL to check:

- First try using the Octopus Server's DNS hostname, e.g. [https://my-octopus:10943](https://my-octopus:10943)
- If this fails, try using the Octopus Server's IP address instead, e.g. [https://1.2.3.4:10943](https://1.2.3.4:10943) - success using the IP address but not the DNS hostname will indicate a DNS issue

:::hint
**If you can't connect...**
Failing to connect at this step means that you have a network issue preventing traffic between the Tentacles and Octopus Server. Check that the Octopus Server polling port is open in any firewalls, and that other services on the network are working. There's not usually much that Octopus Deploy Support can suggest for these issues as networks are complex and highly varied. Having the network administrator from your organization help diagnose the issue is the best first step. If that draws a blank, please get in touch.

Remember to check both the built-in Windows Firewall, and any other firewalls (in Amazon EC2, check your security group settings for example).
:::

If the Tentacle welcome page is shown, good news - your network is fine.

:::problem
**Watch out for proxy servers or SSL offloading...**
Octopus and Tentacle use TCP to communicate, with special handling to enable web browsers to connect for diagnostic purposes. Full HTTP is not supported, so network services like **SSL offloading** are not supported, and **proxies** are not supported in earlier versions of Octopus Deploy. Make sure there's a direct connection between the Tentacle and Octopus Server, without an HTTP proxy or a network appliance performing SSL offloading in between.

**NOTE**: Octopus Deploy 3.4 introduced [advanced support for HTTP proxies](/docs/infrastructure/windows-targets/proxy-support.md).
:::

## Tentacle Ping {#TroubleshootPollingTentacles-Tentacleping}

We have built a small utility for testing the communications protocol between two servers called [Tentacle Ping](https://github.com/OctopusDeploy/TentaclePing). This tool helps isolate the source of communication problems without needing a full Octopus configuration. It is built as a simple client and server component that emulates the communications protocol used by Octopus Server and Tentacle.

In Octopus 3.0 you will need **TentaclePing** and **TentaclePong**, you cannot test directly to Octopus Server nor Tentacle:

- Run **TentaclePing** on your Tentacle machine (which is the client in this relationship)
- Run **TentaclePong** on your Octopus Server machine (which is the server in this relationship)

Use the output to help diagnose what is going wrong.

## Check the Octopus Server Polling IP Address {#TroubleshootPollingTentacles-ChecktheOctopusServerpollingIPaddress}

Your Octopus Server may have multiple IP addresses that it listens on. For example, in Amazon EC2 machines in a VPN might have both an internal IP address and an external addresses using NAT. Octopus Server may not listen on all addresses; you can check which addresses are configured on the server by running `ipconfig /all` from the command line and looking for the IPv4 addresses.

## Check Octopus Server Service Account Permissions {#TroubleshootPollingTentacles-CheckOctopusServerserviceaccountpermissions}

If the Octopus Server is running as the *Local System* account you can skip this section.

If the Octopus Server is running as a specific user, make sure that the user has "full control" permission to the *Octopus Home* folder on the machine. This is usually `C:\Octopus` - apply permissions recursively.

## Check Octopus.Server.exe Load Time {#TroubleshootPollingTentacles-CheckOctopus.Server.exeloadtime}

In some DMZ-style environments without Internet access, failing to disable Windows code signing certificate revocation list checking will cause Windows to pause during loading of the Octopus applications and installers. This can have a significant negative performance impact, which may prevent Octopus and Tentacles connecting.

To test this, run:

```powershell
Octopus.Server.exe help
```

If the command help is not displayed immediately (< 1s) you may need to consider disabling the CRL check while the Octopus Server is configured.

To do this open {{Control Panel,Internet Options,Advanced}}, and uncheck the *Check for publisher's certificate revocation* option as shown below.

![](/docs/images/5670828/5865771.png)

## Schannel and TLS Configuration Mismatches {#TroubleshootPollingTentacles-SchannelandTLSconfigurationmismatches}

Octopus uses `Schannel` for secure communications and will attempt to use the best available protocol available to both servers.  If you are seeing error messages like below, try [Troubleshooting Schannel and TLS](/docs/administration/security/octopus-tentacle-communication/troubleshooting-schannel-and-tls.md):

Client-side:`System.Security.Authentication.AuthenticationException: A call to SSPI failed, see inner exception. ---> System.ComponentModel.Win32Exception: One or more of the parameters passed to the function was invalid`

Server-side:`System.IO.IOException: Unable to read data from the transport connection: An existing connection was forcibly closed by the remote host.`

## Other Error Messages {#TroubleshootPollingTentacles-OtherErrorMessages}

**Halibut.Transport.Protocol.ConnectionInitializationFailedException: Unable to process remote identity; unknown identity 'HTTP/1.0'**

If a Tentacle health-check fails with an error message containing this error message, then there is network infrastructure inserting a web page into the communication.  The most common components to do this are firewalls and proxy servers so it's recommend to check your network setup to verify connectivity between the two servers using the information above and then update your infrastructure appropriately.

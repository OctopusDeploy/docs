---
title: Troubleshoot Listening Tentacles
description: How to troubleshoot problems with listening Tentacles.
position: 4
---

When an Octopus Tentacle is configured in [Listening mode](/docs/installation/installing-tentacles/listening-tentacles.md), it will open the specified port (by default TCP port **10933**) and listen for inbound connections from the Octopus server.

![](/docs/images/3048143/5865873.png)

All of the 'classic' problems of TCP networking: firewalls, proxies, timeouts, DNS issues and so-on can affect Octopus Tentacles. This guide will help to track down these issues when either a machine cannot be "Discovered" to add to the Octopus installation, or a previously working machine fails to health-check with errors from the networking stack.

:::success
Before following the steps below, it can be worthwhile to restart the Octopus and Tentacle services, and refresh the browser you're using to connect to the Octopus Web Portal. Neither action *should*fix a communication problem, but sometimes they can help flush a problem out.
:::

:::success
If you have worked through this guide without success, it can be worthwhile to completely remove the Tentacle configuration, data, and working folders, and then reconfigure it from scratch. This can be done without any impact to the applications you have deployed. Learn about [manually uninstalling Tentacle](/docs/administration/tentacle-configuration-and-file-storage/manually-uninstall-tentacle.md). Working from a clean slate can sometimes expose the underlying problem.
:::

## Home in on the problem {#TroubleshootListeningTentacles-Homeinontheproblem}

If you're at "square 1" and can't connect to a new Tentacle machine, take note of the error presented in the "Discover" page.

If you are having problems with a previously-working machine, or you've successfully "Discovered" a machine but can't get communication to work afterwards, you can find information in three places:

1. If the machine has been included in a Health Check or Deployment, examine the Raw Task Log. There's a link to this on the page containing the details of the Health Check or Deployment, which can usually be located using the *Tasks* page in the Octopus Web Portal.
2. On the *Environments* page of the Octopus Web Portal, click on the problem machine and select the *Connectivity* tab. There's often specific information about the communication status of the machine here.
3. In the Octopus Web Portal, open *Configuration > Diagnostics*. Information on this page can be helpful to work out what's going on in the Octopus installation. Following the link to *Server logs* and searching for the machine's name or IP address can turn up useful information.

:::success
**Don't miss the great info already on the web**
Many communication problems between Octopus Servers and Tentacles have been discussed online. A quick web search for *Octopus <your error message>* will often turn up useful information.
:::

Verify the Tentacle communications settings

*On the Tentacle machine*, open the Tentacle Manager application from the Start screen or Start menu.

![](/docs/images/3048143/3278076.png "width=500")

The application should show the service as running.

There are three pieces of information to verify.

1. Ensure that the Tentacle is in *Listening* mode
2. Check the port that the Tentacle listens on
3. Check that the **Octopus Server** thumbprint shown matches the one shown in the *Configuration > Certificates* screen in the Octopus Web Portal.

Note that there are two thumbprints displayed - that of the Tentacle itself (shown first in bold) and the thumbprints of trusted servers (shown inline in the grey text).

:::hint
**If any communication settings are incorrect...**
If any of the communications settings are incorrect, choose *Delete this Tentacle instance...*. After doing so, you'll be presented with the Tentacle installation wizard, where the correct settings can be chosen.
:::

Finally, verify that the Tentacle's thumbprint, shown in bold in the large box, matches any that have been presented in error messages, and in the *Machine Settings* page on the Octopus Web Portal.

## Verify the Octopus and Tentacle services are running {#TroubleshootListeningTentacles-VerifytheOctopusandTentacleservicesarerunning}

If you're successfully connecting to the Octopus Web Portal with your web browser, you can be confident the Octopus Server service is running.

The Tentacle Manager usually shows correct service status, but it pays to double-check.*On the Tentacle machine*, open the Windows Services Control Panel applet (`services.msc`) and look for "OctopusDeploy Tentacle". Verify that the service is in the "Running" state.

:::hint
**If the services is not running...**
If the Tentacle service is not running, you can try to start it from the Services applet. Allow 30 seconds for the service to start work, then refresh the Services screen. **If the Tentacle service keeps running**, go back to the Octopus Web Portal and try Health Checking the affected machine again. **If the service stops**, it is likely that the service is crashing during startup; this can be caused by a number of things, most of which can be diagnosed from the Tentacle log files. Inspect these yourself, and either send the [log files](/docs/reference/log-files.md) or extracts from them showing the issue to the Octopus Deploy Support email address for assistance.
:::

If the service is up and running, continue to the next step.

## Connect locally to the Tentacle {#TroubleshootListeningTentacles-ConnectlocallytotheTentacle}

The Tentacle service can only be controlled by a trusted Octopus, but to help with diagnostics it will present a welcome page if visited in a web browser.

*On the Tentacle machine*, open a web browser and navigate to [https://localhost:10933](https://localhost:10933) (or your chosen Tentacle communications port if it isn't the default). Make sure an **HTTPS** URL is used.

- If you're presented with a prompt to "confirm a certificate" or "select a certificate" choose "Cancel" - don't provide one

- If you're presented with a warning about the invalidity of the site's certificate, "continue to the site" or "add an exception"

The page shown should look like the one below.

![](/docs/images/3048143/3278074.png "width=500")

If you've made it this far, good news! Your Tentacle is running and ready to accept connections.

:::hint
**If you can't browse to the page...**
If this is where your journey ends, there's a problem on the Tentacle machine. It is very likely that the Tentacle is unable to open the communications port, either because of permissions, or because another process is listening on that port. Using the Windows `netstat -o -n -a -b` command can help to get to the bottom of this quickly. If you're still in trouble, check the Tentacle [log files](/docs/reference/log-files.md) and contact Octopus Deploy support.
:::

## Connect from the Octopus Server {#TroubleshootListeningTentacles-ConnectfromtheOctopusServer}

Next, repeat the process of connecting to the Tentacle with a web browser, but do this *from the Octopus Server machine*.

When forming the URL to check:

- First try using the Tentacle's DNS hostname, e.g. [https://my-tentacle:10933](https://my-tentacle:10933)
- If this fails, try using the Tentacle's IP address instead, e.g. [https://1.2.3.4:10933](https://1.2.3.4:10933) - success using the IP address but not the DNS hostname will indicate a DNS issue

:::hint
**If you can't connect...**
Failing to connect at this step means that you have a network issue preventing traffic between the Octopus Server and Tentacles. Check that the Tentacle port is open in any firewalls, and that other services on the network are working. There's not usually much that Octopus Deploy Support can suggest for these issues as networks are complex and highly varied. Having the network administrator from your organisation help diagnose the issue is the best first step. If that draws a blank, please get in touch.

Remember to check both the built-in Windows Firewall, and any other firewalls (in Amazon EC2, check your security group settings for example).
:::

If the Tentacle welcome page is shown, good news - your network is fine.

:::problem
**Watch out for proxy servers or SSL offloading...**
Octopus and Tentacle use TCP to communicate, with special handling to enable web browsers to connect for diagnostic purposes. Full HTTP is not supported, so network services like **SSL offloading** are not supported, and **proxies** are not supported in earlier versions of Octopus Deploy. Make sure there's a direct connection between the Octopus Server and Tentacle, without an HTTP proxy or a network appliance performing SSL offloading in between.

**NOTE**: Octopus Deploy 3.4 introduced [advanced support for HTTP proxies](/docs/installation/installing-tentacles/proxy-support.md).
:::

## Tentacle ping {#TroubleshootListeningTentacles-Tentacleping}

We have built a small utility for testing the communications protocol between two servers called [Tentacle Ping](https://github.com/OctopusDeploy/TentaclePing). This tool helps isolate the source of communication problems without needing a full Octopus configuration. It is built as a simple client and server component that emulates the communications protocol used by Octopus Server and Tentacle.

In Octopus 3.0 you will need **TentaclePing** and **TentaclePong**, you cannot test directly to Octopus Server nor Tentacle:

- Run **TentaclePing** on your Octopus Server machine (which is the client in this relationship)
- Run **TentaclePong** on your Tentacle machine (which is the server in this relationship)

Use the output to help diagnose what is going wrong.

## Check the listening IP address {#TroubleshootListeningTentacles-CheckthelisteningIPaddress}

Your Tentacle server may have multiple IP addresses that it listens on. For example, in Amazon EC2 machines in a VPN might have both an internal IP address and an external addresses using NAT. Tentacle may not listen on all addresses; you can check which addresses are configured on the server by running `ipconfig /all` from the command line and looking for the IPv4 addresses.

## Check for zombie child processes locking TCP ports {#TroubleshootListeningTentacles-CheckforzombiechildprocesseslockingTCPports}

If Tentacle fails to start with an error message like this: **A required communications port is already in use.**

The most common scenario is when you already have an instance of Tentacle (or something else) listening on the same TCP port. However, we have seen cases where there is no running Tentacle in the list of processes. In this very specific case it could be due to a zombie PowerShell.exe or Calamari.exe process that was launched by Tentacle that is still holding the TCP port. This can happen when attempting to cancel a task that has hung inside of Calamari/PowerShell. Simply rebooting the machine, or killing the zombie process will fix this issue, and you should be able to start Tentacle successfully.

Take a look at [this thread](http://help.octopusdeploy.com/discussions/problems/40076-tentacle-wont-start-after-stopped#comment_38833291) for more background and troubleshooting tips.

## Check Tentacle service account permissions {#TroubleshootListeningTentacles-CheckTentacleserviceaccountpermissions}

If the Octopus Tentacle is running as the *Local System*account you can skip this section.

If the Tentacle is running as a specific user, make sure that the user has "full control" permission to the *Octopus Home* folder on the Tentacle machine. This is usually `C:\Octopus` - apply permissions recursively.

## Check Tentacle.exe load time {#TroubleshootListeningTentacles-CheckTentacle.exeloadtime}

In some DMZ-style environments without Internet access, failing to disable Windows code signing certificate revocation list checking will cause Windows to pause during loading of the Octopus applications and installers. This can have a significant negative performance impact, which may prevent Octopus and Tentacles connecting.

To test this, run:

```powershell
Tentacle.exe help
```

If the command help is not displayed immediately (< 1s) you may need to consider disabling the CRL check while the Tentacle is configured.

To do this open *Control Panel > Internet Options > Advanced*, and un-check the *Check for publisher's certificate revocation*option as shown below.

![](/docs/images/3048143/3278077.png)

## Schannel and TLS configuration mismatches {#TroubleshootListeningTentacles-SchannelandTLSconfigurationmismatches}

Octopus uses `Schannel` for secure communications and will attempt to use the best available protocol available to both servers.  If you are seeing error messages like below, try [Troubleshooting Schannel and TLS](/docs/reference/octopus-tentacle-communication/troubleshooting-schannel-and-tls.md):

Client-side:`System.Security.Authentication.AuthenticationException: A call to SSPI failed, see inner exception. ---> System.ComponentModel.Win32Exception: One or more of the parameters passed to the function was invalid`

Server-side:`System.IO.IOException: Unable to read data from the transport connection: An existing connection was forcibly closed by the remote host.`

## Error Messages {#TroubleshootListeningTentacles-ErrorMessages}

**Halibut.Transport.Protocol.ConnectionInitializationFailedException: Unable to process remote identity; unknown identity 'HTTP/1.0'**

If a Tentacle health-check fails with an error message containing this error message, then there is network infrastructure inserting a web page into the communication.  The most common components to do this are firewalls and proxy servers so it's recommend to check your network setup to verify connectivity between the two servers using the information above and then update your infrastructure appropriately.

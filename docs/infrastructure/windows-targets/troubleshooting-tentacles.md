---
title: Troubleshooting Tentacles
description: How to troubleshoot problems with Octopus Tentacles.
position: 63
---

All of the 'classic' problems of TCP networking: firewalls, proxies, timeouts, DNS issues, and so-on can affect Octopus Tentacles. This guide will help to track down these issues when either a machine cannot be "Discovered" (Listening Tentacles) or "Registered" (Polling Tentacles) with the Octopus Server, or a previously working machine fails a health-check with errors from the networking stack.

## Restart the Octopus and Tentacle Services

Before following the steps below, it can be worthwhile to restart the Octopus and Tentacle services, and refresh the browser you're using to connect to the Octopus Web Portal. Neither action *should* fix a communication problem, but sometimes they can help flush a problem out.

### Restart the Octopus Service

Open the Octopus Manager app, and select **Restart**.

Alternatively, open the **Services** app, find **OctopusDeploy**, and click restart.

### Restart the Tentacle Service

Open the Tentacle Manager app, and select **Restart**.

Alternatively, open the **Services** app, find **OctopusDeploy Tentacle**, and click restart.

## Uninstall Tentacles

If you get to the end of this guide without success, it can be worthwhile to completely remove the Tentacle configuration, data, and working folders, and then reconfigure it from scratch. This can be done without any impact to the applications you have deployed. Learn about [manually uninstalling Tentacle](/docs/administration/tentacle-configuration-and-file-storage/manually-uninstall-tentacle.md). Working from a clean slate can sometimes expose the underlying problem.

## Communication Mode

Before continuing, it's worth briefly revisiting the concept of **Listening Tentacles** and **Polling Tentacles**. As you troubleshoot problems with your Tentacles, please pay attention to which communication mode they are configured for.

### Listening Tentacles

When an Octopus Tentacle is configured in [Listening mode](/docs/infrastructure/windows-targets/tentacle-communication.md#listening-tentacles-recommended)), it will open the specified port (by default TCP port **10933**) and listen for inbound connections from the trusted Octopus Server.

![](/docs/images/3048143/5865873.png)

### Polling Tentacles

When an Octopus Tentacle is configured in [Polling mode](/docs/infrastructure/windows-targets/tentacle-communication.md#polling-tentacles), it will attempt to connect to the Octopus Server on the configured TCP port (by default TCP port **10943** on the Octopus Server) and poll the Octopus Server for work to be performed.

![](/docs/images/5670828/5865874.png)

## Identify the Problem

If you are having problems with a previously-working machine, or you've successfully "Discovered" or "Registered" a machine but can't get communication to work afterwards, you can find information in three places:

1. If the machine has been included in a Health Check or Deployment, examine the Raw Task Log. There's a link to this on the page containing the details of the Health Check or Deployment, which can usually be located using the *Tasks* page in the Octopus Web Portal.
2. On the *Infrastructure* page of the Octopus Web Portal, click on the problem machine and select the *Connectivity* tab. There's often specific information about the communication status of the machine here.
3. In the Octopus Web Portal, open {{Configuration,Diagnostics}}. Information on this page can be helpful to work out what's going on in the Octopus installation. Look at the information under *Server logs* and searching for the machine's name or IP address can turn up useful information.

## Check the Octopus and Tentacle Services are Running

If you're successfully connecting to the Octopus Web Portal with your web browser, you can be confident the Octopus Server service is running.

The Tentacle Manager usually shows correct service status, but it pays to double-check. *On the Tentacle machine*, open the Windows Services Control Panel applet (`services.msc`) and look for "OctopusDeploy Tentacle". Verify that the service is in the "Running" state.

**If the services is not running...**

If the Tentacle service is not running, you can try to start it from the Services applet. Allow 30 seconds for the service to start work, then refresh the Services screen. **If the Tentacle service keeps running**, go back to the Octopus Web Portal and try Health Checking the affected machine again. **If the service stops**, it is likely that the service is crashing during startup; this can be caused by a number of things, most of which can be diagnosed from the Tentacle log files. Inspect these yourself, and either send the [log files](/docs/support/log-files.md) or extracts from them showing the issue to the Octopus Deploy Support email address for assistance.

If the service is running, continue to the next step.

## Communication Settings

To verify the communication settings, *On the Tentacle machine*, open the Tentacle Manager application from the Start screen or Start menu.

There are three pieces of information to verify and they are slightly different, depending on whether you configured you Tentacle to communicate in **Listening** mode or **Polling** mode:

### Listening Tentacle

1. Ensure that the Tentacle is in *Listening* mode.
Below the thumbprint, you should see the text *This Tentacles listens for connections on port 10933.*
2. Check the port that the Tentacle listens on.
3. Check that the **Octopus Server** thumbprint shown in light gray in the Tentacle manager matches the one shown in the {{Configuration,Thumbprints}} screen in the Octopus Web Portal.

Note, that there are two thumbprints displayed - that of the Tentacle itself (shown first in bold) and the thumbprints of trusted servers (shown inline in the gray text).

If any of the communications settings are incorrect, choose *Delete this Tentacle instance...*. After doing so, you'll be presented with the Tentacle installation wizard, where the correct settings can be chosen. If the settings are correct, continue to next step.

### Polling Tentacles

1. Ensure that the Tentacle is in *Polling* mode.
Below the thumbprint, you should see the text *This Tentacle polls the Octopus Server...*.
2. Check the port that the Tentacle polls the Octopus Server on.
3. Check that the **Octopus Server** thumbprint shown in light gray in the Tentacle manager matches the one shown in the {{Configuration,Thumbprints}} screen in the Octopus Web Portal.

Note, that there are two thumbprints displayed - that of the Tentacle itself (shown first in bold) and the thumbprints of trusted servers (shown inline in the gray text).

If any of the communications settings are incorrect, choose *Delete this Tentacle instance...*. After doing so, you'll be presented with the Tentacle installation wizard, where the correct settings can be chosen. If the settings are correct, continue to next step.

### Check the Tentacle Thumbprint

Verify that the Tentacle's thumbprint, shown in bold in the large box, matches any that have been presented in error messages, and in the *Machine Settings* page on the Octopus Web Portal.

## Check the Connections

To help with diagnostics, we've include a welcome page you can connect to from your web browser. The process of connecting is slightly different depending on if you are using a listening Tentacle or a polling Tentacle.

When you conduct these checks:

- If you're presented with a prompt to "confirm a certificate" or "select a certificate" choose "Cancel" - don't provide one.
- If you're presented with a warning about the invalidity of the site's certificate, "continue to the site" or "add an exception" (Octopus Server uses a self-signed certificate by default).

### Checking a Listening Tentacle

*On the Tentacle machine*, open a web browser and navigate to [https://localhost:10933](https://localhost:10933) (or your chosen Tentacle communications port if it isn't the default). Make sure you use an **HTTPS** URL is used.

The page shown should look like the one below.

![](/docs/images/3048143/3278074.png "width=500")

**If you can't browse to the page...**
If this is where your journey ends, there's a problem on the Tentacle machine. It is very likely that the Tentacle is unable to open the communications port, either because of permissions, or because another process is listening on that port. Using the Windows `netstat -o -n -a -b` command can help to get to the bottom of this quickly. If you're still in trouble, check the Tentacle [log files](/docs/support/log-files.md) and contact Octopus Deploy support.

Next, repeat the process of connecting to the Tentacle with a web browser, but do this *from the Octopus Server machine*.

When forming the URL to check:

- First try using the Tentacle's DNS hostname, e.g. [https://my-tentacle:10933](https://my-tentacle:10933)
- If this fails, try using the Tentacle's IP address instead, e.g. [https://1.2.3.4:10933](https://1.2.3.4:10933) - success using the IP address but not the DNS hostname will indicate a DNS issue

**If you can't connect...**
Failing to connect at this step means that you have a network issue preventing traffic between the Octopus Server and Tentacles. Check that the Tentacle port is open in any firewalls, and that other services on the network are working. There's not usually much that Octopus Deploy Support can suggest for these issues as networks are complex and highly varied. Having the network administrator from your organization help diagnose the issue is the best first step. If that draws a blank, please get in touch.

Remember to check both the built-in Windows Firewall, and any other firewalls (in Amazon EC2, check your security group settings for example).

### Checking a Polling Tentacle

*On the Octopus Server machine*, open a web browser and navigate to [https://localhost:10943](https://localhost:10943) (or your chosen Tentacle communications port if it isn't the default). Make sure an**HTTPS** URL is used.

The page shown should look like the one below.

![](/docs/images/3048113/3277906.png "width=500")

If you've made it this far, good news! Your Octopus Server is running and ready to accept inbound connections from Polling Tentacles.

:::hint
**If you can't browse to the page...**
If this is where your journey ends, there's a problem on the Octopus Serve machine itself. It is very likely that the Octopus Server is unable to open the communications port, either because of permissions, or because another process is listening on that port. Using the Windows `netstat -o -n -a -b` command can help to get to the bottom of this quickly. If you're still in trouble, check the Octopus Server [log files](/docs/support/log-files.md) and contact Octopus Deploy support.
:::

Next, repeat the process of connecting to the Octopus Server with a web browser, but do this *from the Tentacle machine*.

When forming the URL to check:

- First try using the Octopus Server's DNS hostname, e.g. [https://my-octopus:10943](https://my-octopus:10943)
- If this fails, try using the Octopus Server's IP address instead, e.g. [https://1.2.3.4:10943](https://1.2.3.4:10943) - success using the IP address but not the DNS hostname will indicate a DNS issue

**If you can't connect...**
Failing to connect at this step means that you have a network issue preventing traffic between the Tentacles and Octopus Server. Check that the Octopus Server polling port is open in any firewalls, and that other services on the network are working. There's not usually much that Octopus Deploy Support can suggest for these issues as networks are complex and highly varied. Having the network administrator from your organization help diagnose the issue is the best first step. If that draws a blank, please get in touch.

Remember to check both the built-in Windows Firewall, and any other firewalls (in Amazon EC2, check your security group settings for example).

If the Tentacle welcome page is shown, good news - your network is fine.

:::problem
**Watch out for proxy servers or SSL offloading...**
Octopus and Tentacle use TCP to communicate, with special handling to enable web browsers to connect for diagnostic purposes. Full HTTP is not supported, so network services like **SSL offloading** are not supported, and **proxies** are not supported in earlier versions of Octopus Deploy. Make sure there's a direct connection between the Octopus Server and Tentacle, without an HTTP proxy or a network appliance performing SSL offloading in between.

**NOTE**: **Octopus 3.4** introduced [advanced support for HTTP proxies](/docs/infrastructure/windows-targets/proxy-support.md).
:::

## Tentacle Ping

We have built a small utility for testing the communications protocol between two servers called [Tentacle Ping](https://github.com/OctopusDeploy/TentaclePing). This tool helps isolate the source of communication problems without needing a full Octopus configuration. It is built as a simple client and server component that emulates the communications protocol used by Octopus Server and Tentacle.

In **Octopus 3.0** you will need **TentaclePing** and **TentaclePong**, you cannot test directly to Octopus Server nor Tentacle:

### Listening Tentacles

- Run **TentaclePing** on your Octopus Server machine (which is the client in this relationship)
- Run **TentaclePong** on your Tentacle machine (which is the server in this relationship)

Use the output to help diagnose what is going wrong.

### Polling Tentacles

- Run **TentaclePing** on your Tentacle machine (which is the client in this relationship)
- Run **TentaclePong** on your Octopus Server machine (which is the server in this relationship)

Use the output to help diagnose what is going wrong.

## Check the IP Address

Your Octopus Server or Tentacle Server may have multiple IP addresses that they listen on. For example, in Amazon EC2 machines in a VPN might have both an internal IP address and an external addresses using NAT. Octopus Server and Tentacle Server may not listen on all addresses; you can check which addresses are configured on the server by running `ipconfig /all` from the command line and looking for the IPv4 addresses.

## Check for Zombie Child Processes Locking TCP Ports (Listening Tentacles)

If Tentacle fails to start with an error message like this: **A required communications port is already in use.**

The most common scenario is when you already have an instance of Tentacle (or something else) listening on the same TCP port. However, we have seen cases where there is no running Tentacle in the list of processes. In this very specific case it could be due to a zombie PowerShell.exe or Calamari.exe process that was launched by Tentacle that is still holding the TCP port. This can happen when attempting to cancel a task that has hung inside of Calamari/PowerShell. Simply rebooting the machine, or killing the zombie process will fix this issue, and you should be able to start Tentacle successfully.

Take a look at [this thread](http://help.octopusdeploy.com/discussions/problems/40076-tentacle-wont-start-after-stopped#comment_38833291) for more background and troubleshooting tips.

## Check the Server Service Account Permissions

### Listening Tentacle

If the Tentacle is running as the *Local System* account you can skip this section.

If the Tentacle is running as a specific user, make sure that the user has "full control" permission to the *Octopus Home* folder on the Tentacle machine. This is usually `C:\Octopus` - apply permissions recursively.

### Polling Tentacle

For polling Tentacles we need to check the Octopus Server is running as the *Local System* account. If it is, you can skip this section.

If the Octopus Server is running as a specific user, make sure that the user has "full control" permission to the *Octopus Home* folder on the machine. This is usually `C:\Octopus` - apply permissions recursively.

## Check the Load Time

In some DMZ-style environments without Internet access, failing to disable Windows code signing certificate revocation list checking will cause Windows to pause during loading of the Octopus applications and installers. This can have a significant negative performance impact, which may prevent Octopus and Tentacles connecting.

### Check Tentacle.exe Load Time  (Listening Tentacle)

To test this on a listening Tentacle, run:

```powershell
Tentacle.exe help
```

If the command help is not displayed immediately (< 1s) you may need to consider disabling the CRL check while the Tentacle is configured.

To do this open {{Control Panel,Internet Options,Advanced}}, and uncheck the *Check for publisher's certificate revocation* option as shown below.

![](/docs/images/3048143/3278077.png)

### Check Octopus.Server.exe Load Time (Polling Tentacle)

To test this for a polling Tentacle, on the Octopus Server, run:

```powershell
Octopus.Server.exe help
```

If the command help is not displayed immediately (< 1s) you may need to consider disabling the CRL check while the Octopus Server is configured.

To do this open {{Control Panel,Internet Options,Advanced}}, and uncheck the *Check for publisher's certificate revocation* option as shown below.

![](/docs/images/5670828/5865771.png)

## Schannel and TLS Configuration Mismatches

Octopus uses `Schannel` for secure communications and will attempt to use the best available protocol available to both servers.  If you are seeing error messages like below, try [Troubleshooting Schannel and TLS](/docs/administration/security/octopus-tentacle-communication/troubleshooting-schannel-and-tls.md):

Client-side:`System.Security.Authentication.AuthenticationException: A call to SSPI failed, see inner exception. ---> System.ComponentModel.Win32Exception: One or more of the parameters passed to the function was invalid`

Server-side:`System.IO.IOException: Unable to read data from the transport connection: An existing connection was forcibly closed by the remote host.`

## Other Error Messages

**Halibut.Transport.Protocol.ConnectionInitializationFailedException: Unable to process remote identity; unknown identity 'HTTP/1.0'**

If a Tentacle health-check fails with an error message containing this error message, then there is network infrastructure inserting a web page into the communication.  The most common components to do this are firewalls and proxy servers so it's recommend to check your network setup to verify connectivity between the two servers using the information above and then update your infrastructure appropriately.

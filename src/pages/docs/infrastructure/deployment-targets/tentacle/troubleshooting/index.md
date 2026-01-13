---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-08-28
title: Troubleshooting Tentacles
description: How to troubleshoot problems with Octopus Tentacles.
navOrder: 60
---

All 'classic' problems of TCP networking: firewalls, proxies, timeouts, DNS issues, and so-on can affect Octopus Tentacles. This guide will help to track down these issues when either a machine cannot be "Discovered" (Listening Tentacles) or "Registered" (Polling Tentacles) with the Octopus Server, or a previously working machine fails a health-check with errors from the networking stack.

:::div{.problem}
**WARNING**
A breaking change in Tentacle releases with version 6.3+ means that all versions above 6.2.277 will require .NET 4.8 or above to run. This is a Microsoft dependency due to EOL for older .NET versions.
:::

## Identify the problem

If you are having problems with a previously-working machine, or you've successfully "Discovered" or "Registered" a machine but can't get communication to work afterwards, you can find information in four places:

1. If the machine has been included in a Health Check or Deployment, examine the Raw Task Log. There's a link to this on the page containing the details of the Health Check or Deployment, which can usually be located using the *Tasks* page in the Octopus Web Portal.
2. On the *Infrastructure* page of the Octopus Web Portal, click on the problem machine and select the *Connectivity* tab. There's often specific information about the communication status of the machine here.
3. In the Octopus Web Portal, open **Configuration ➜ Diagnostics**. Information on this page can be helpful to work out what's going on in the Octopus installation. Look at the information under *Server logs* and searching for the machine's name or IP address can turn up useful information.
4. On the target itself you can inspect the Tentacle [log files](/docs/support/log-files) to see what is going on during a deployment or health check.

## Check and Restart the Octopus and Tentacle services

Before following the steps below, it can be worthwhile to restart the Octopus and Tentacle services, and refresh the browser you're using to connect to the Octopus Web Portal. Neither action *should* fix a communication problem, but sometimes they can help flush a problem out.

### Check the Octopus and Tentacle services are running

If you're successfully connecting to the Octopus Web Portal with your web browser, you can be confident the Octopus Server service is running.

The Tentacle Manager usually shows correct service status, but it pays to double-check. *On the Tentacle machine*, open the Windows Services Control Panel applet (`services.msc`) and look for "OctopusDeploy Tentacle". Verify that the service is in the "Running" state.

**If the service is not running...**

If the Tentacle service is not running, you can try to start it from the Services applet. Allow 30 seconds for the service to start work, then refresh the Services screen. **If the Tentacle service keeps running**, go back to the Octopus Web Portal and try Health Checking the affected machine again. **If the service stops**, it is likely that the service is crashing during startup; this can be caused by a number of things, most of which can be diagnosed from the Tentacle log files. Inspect these yourself, and either send the [log files](/docs/support/log-files) or extracts from them showing the issue to the Octopus Deploy Support email address for assistance.

If the service is running, continue to the next step.

### Restart the Octopus services

Open the Octopus Manager app, and select **Restart**.

Alternatively, open the **Services** app, find **OctopusDeploy**, and click restart.

### Restart the Tentacle service

Open the Tentacle Manager app, and select **Restart**.

Alternatively, open the **Services** app, find **OctopusDeploy Tentacle**, and click restart.

## Communication mode

At this point it's worth briefly revisiting the concept of **Listening Tentacles** and **Polling Tentacles**. As you troubleshoot problems with your Tentacles, please pay attention to which communication mode they are configured for.

Review [Tentacle communication modes](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication).

### Specific troubleshooting for each communication mode

- [Listening Tentacles](/docs/infrastructure/deployment-targets/tentacle/troubleshooting/troubleshooting-listening)
- [Polling Tentacles](/docs/infrastructure/deployment-targets/tentacle/troubleshooting/troubleshooting-polling)

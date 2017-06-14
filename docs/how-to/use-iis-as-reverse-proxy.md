---
title: Use IIS as a Reverse Proxy for Octopus Deploy
description: How to set up IIS 7 (or later) as a Reverse Proxy for Octopus Deploy
position: 10
---

There are scenarios in which you may be required to run Octopus Deploy behind a reverse proxy configuration, such as compliance with specific organisation standards, or a need to add custom HTTP headers. This document outlines how to use Microsoft's Internet Information Services as that reverse proxy, using URLRewrite and ARR.

The example assumes the following scenario:

- Octopus Deploy installed on http://servername:8080/
- IIS Default website installed on http://servername:80/
- IIS Management Tools installed

## Install URLRewrite and ARR

URLRewrite and Application Request Routing are provided by the [Microsoft Web Platform Installer](http://download.microsoft.com/download/C/F/F/CFF3A0B8-99D4-41A2-AE1A-496C08BEB904/WebPlatformInstaller_amd64_en-US.msi). After installing the Web Platform Installer, search for "URL Rewrite" and "Application Request Routing", and install.

Alternatively, use the following [PowerShell snippet](https://gist.github.com/stopthatastronaut/cda4f18ae6be36ece5dbe61821165cd4).

## Configure URLRewrite 

:::success
After installing URLRewrite and ARR, you may need to restart IIS and/or the IIS Management Console to ensure that the URLRewite icon is appearing
:::

Open the IIS Mangement Console (inetmgr.exe)

Navigate to your Default Web Site

Click on the URLRewrite icon to bring up the URLRewrite interface.

In the action pane, click on "Add Rule(s)"

Under "Select a Rule Template", choose "Reverse Proxy"

![](/docs/images/reverse-proxy/addrule.png)

If you have never enabled reverse proxy functionality before, you'll be prompted to enable it

In the "Add Reverse Proxy Rules" dialog, specify the URL of your backend Octopus Server in "Inbound Rules". In our example, this is `127.0.0.1:8080`. If you wish to terminate SSL at IIS, select "Enable SSL offloading" and ensure your certificates are correctly configured.

![](/docs/images/reverse-proxy/addrule.png)

:::success
There is no need to specify outbound rules, as Octopus Deploy refrains from using absolute links within the app.
:::

Click OK and close down all dialogs

You should now be able to navigate to http://servername/ in your browser and log in to Octopus Deploy

:::warning
**Polling Tentacles are not supported with this scenario**
Polling tentacles communicate with the Octopus Server over an end-to-end encrypted channel. This solution does not currently support polling tentacles
:::








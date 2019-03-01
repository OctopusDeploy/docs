---
title: Proxy Support
description: Octopus supports proxy servers to ensure Octopus Server and Tentacle can operate correctly.
position: 60
---

Octopus has support for proxies in two use cases. You can specify a proxy server for Octopus to use when communicating with a Tentacle or SSH Target, you can also specify a proxy server when a Tentacle and the Octopus Server make web requests to other servers.

Proxy support for Tentacle and SSH communications was added in **Octopus 3.4**.

:::hint
**HTTP Proxies Only**
Octopus supports the use of HTTP proxies with support for SSL. There is no support for SOCKS proxies. See below for details on [choosing a proxy server](#Choosing-a-proxy-server).
:::

![](/docs/images/5669147/5865713.png)

## Configuring a Tentacle Communications Proxy {#ProxySupport-ConfiguringaTentacleCommunicationsProxy}

Tentacles can communicate with the Octopus Server via a proxy server. This can be really useful when you want to set up a secure network topology, where all traffic into a secure zone must pass through an intermediary, like a proxy server. A similar example is where you could introduce a remote desktop gateway (RD Gateway) to provide controlled remote access to your application servers.

The process for configuring a proxy for Tentacle communication differs for Listening and Polling Tentacles:

### Listening Tentacles {#ProxySupport-ListeningTentacles}

For Listening Tentacles, the Octopus Server can be configured to communicate with the Tentacle via a proxy. Go to **{{Infrastructure,Proxies}}** to configure proxy servers to use when connecting to Listening Tentacles. Multiple proxies can be setup here depending on the requirements of your network topology.

![](proxy-create.png)

Once you have created a proxy, Listening Tentacles can be set to use that proxy in the communication part of Deployment Target Settings.

![](machine-proxy.png)

### SSH Targets {#ProxySupport-SSHTargets}

Configuring a proxy for an SSH target works in essentially the same way as with a Listening Tentacle as described above. Simply configure up the proxy details via **{{Infrastructure,Proxies}}** and then select the appropriate proxy in the SSH Target details screen.

### Polling Tentacles {#ProxySupport-PollingTentacles}

The proxy for a Polling Tentacle is configured with the Octopus Tentacle Manager application. During installation if you choose to create a Polling Tentacle you will be given the option to configure a Polling Proxy. This proxy will then be used for all polling communications with the Octopus Server. The proxy will also be used to perform the credential check that is part of the installation wizard.

![](/docs/images/5669147/5865531.png)

:::hint
Please note, if you select "Use the proxy server configured in Internet Explorer" as your desired proxy configuration, when the installer check is completed it will use the proxy configured for the user running the installer. When the Tentacle service runs, it will use the proxy configured for the user running the Tentacle service, which were not checked and may not work or be configured correctly. It may be clearer to use the custom proxy option to explicitly set the proxy details.
:::

## Configuring a Web Request Proxy {#ProxySupport-WebRequestConfiguringaWebRequestProxy}

The Octopus Manager and Octopus Tentacle Manager applications also allow you to configure a proxy that will be used for other web requests made by the server or Tentacle, such as within a PowerShell script used as part of a deployment. This proxy is independent of the settings used for Tentacle/Server communications. To configure the web proxy used by a Tentacle launch the Octopus Tentacle Manager application and click the "Change proxy server settings..." link.

![](/docs/images/5669147/5865624.png)

This launches the proxy settings wizard which will let you setup the proxy used by the Tentacle to make web requests. If this is a Polling Tentacle, you can also change the settings for the Tentacle communications proxy in the "Polling Proxy" page of the wizard. This page will not be shown for Listening Tentacles.

![](/docs/images/5669147/5865625.png)

Configuring the proxy used by the Octopus Server to make web requests is done in the same manner, using the Octopus Manager application.

## Choosing a Proxy Server {#Choosing-a-proxy-server}

 **Any** HTTP proxy should work as long as it supports HTTPS/SSL. We recommend selecting and configuring the HTTP proxy server which best suits your security requirements. Every release of Octopus Deploy is automatically tested against a [squid proxy](http://www.squid-cache.org/), and has been proven to work with [CCProxy](http://www.youngzsoft.net/ccproxy/) and [WinGate Proxy Server](http://www.wingate.com/products/wingate/index.php) to name just a few options.

:::hint
Do not enable SSL offloading for Tentacle Communication - the Tentacle communication protocol uses Client Certificate Authentication and requires an uninterrupted TLS tunnel.
:::

## Which Proxy Should I Configure? {#ProxySupport-WhichproxyshouldIconfigure?}

Depending on the context of the operation you are trying to perform, you will need to configure different components in your Octopus Deploy installation.

### Working with Azure {#ProxySupport-WorkingwithAzure}

Azure steps are executed on the Octopus Server. You should configure the Web Request Proxy using the Octopus Server Manager.

### Working with External NuGet Feeds {#ProxySupport-WorkingwithExternalNuGetFeeds}

The Octopus Server will query your external NuGet feed when creating releases. It will also download packages from the feed when your package steps are configured with "Octopus Server will download the package, then securely upload it to the Tentacles". You should configure the Web Request Proxy using the Octopus Server Manager.

If your package step is configured with "Each Tentacle will download the package directly from the remote server" you should configure the Web Request Proxy using the Tentacle Manager on each of your Tentacles as required.

### Working with Docker Registry {#ProxySupport-WorkingwithDockerRegistry}

The Octopus Server will query your external Docker Registry when creating releases. You should configure the Web Request Proxy using the Octopus Server Manager.

The Docker steps will access your external Docker Registry when deploying. You should configure the Web Request Proxy using the Tentacle Manager on each of your Tentacles as required.

### Making Web Requests From Custom Scripts {#ProxySupport-MakingwebrequestsfromCustomScripts}

You should configure the Web Request Proxy using either the Octopus Server Manager or Tentacle Manager depending on where your custom script actually executes.

### Configuring a Polling Tentacle to Communicate via Proxy {#ProxySupport-ConfiguringaPollingTentacletocommunicateviaproxy}

You should use the Tentacle Manager to configure the Polling Tentacle Proxy Settings. See above for an example of configuring a Polling Tentacle.

### Configuring a Listening Tentacle to Communicate via Proxy {#ProxySupport-ConfiguringaListeningTentacletocommunicateviaproxy}

You should configure a Proxy in your Octopus Server, and configure the Listening Tentacle Deployment Target to use that Proxy. See above for an example of configuring a Listening Tentacle.

### Configuring a Proxy for Communication with an SSH Target {#ProxySupport-ConfiguringaproxyforcommunicatingwithanSSHtarget}

You should configure a Proxy in your Octopus Server, and configure the SSH Deployment Target to use that Proxy. See above for an example of configuring an SSH endpoint.

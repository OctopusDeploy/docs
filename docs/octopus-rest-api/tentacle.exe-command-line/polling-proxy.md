---
title: Polling proxy
description: Using the Tentacle.exe command line executable to configure the HTTP proxy used by polling Tentacles to reach the Octopus Server.
---

Configure the HTTP proxy used by Polling Tentacles to reach the Octopus Server

**Polling proxy options**

```text
Usage: tentacle polling-proxy [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --proxyEnable=VALUE    Whether to use a proxy
      --proxyUsername=VALUE  Username to use when authenticating with the
                               proxy
      --proxyPassword=VALUE  Password to use when authenticating with the
                               proxy
      --proxyHost=VALUE      The proxy host to use. Leave empty to use the
                               default Internet Explorer proxy
      --proxyPort=VALUE      The proxy port to use in conjunction with the
                               Host set with proxyHost

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples
This example configures the polling tentacle to use the Internet Explorer porxy
```
Tentacle polling-proxy --proxyHost="" --proxyEnable="true"
```

This example disables the proxy server for the `MyNewInstance` polling tentacle
```
Tentacle polling-proxy --proxyEnable="false" --instance="MyNewInstance"
```
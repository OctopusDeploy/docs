---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Proxy
description:  Configure the HTTP proxy used by Octopus
navOrder: 161
---

Use the proxy command to configure the HTTP proxy used by Octopus.

**Proxy options**

```text
Usage: octopus.server proxy [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
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

This example enables Octopus Server to use a proxy server using the default Internet Explorer proxy:

```
octopus.server proxy --proxyEnable="true"
```

This example enables Octopus Server to use a defined proxy server for instance `MyNewInstance`:

```
octopus.server proxy --proxyEnable="true" --proxyHost="MyProxyServer" --instance="MyNewInstance"
```

This example prevents a proxy server from being used on the default instance:

```
octopus.server proxy --proxyEnable="false"
```

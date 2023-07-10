---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Proxy
description: Using the Tentacle.exe command line executable to configure the HTTP proxy used by Octopus.
---

Configure the HTTP proxy used by Octopus.

**Proxy options**

```text
Usage: tentacle proxy [<options>]

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

This example configures the proxy server for a listening Tentacle:

```
tentacle proxy --proxyHost="" --proxyEnable="true"
```

This example disables the proxy server for the instance `MyNewInstance`:

```
tentacle proxy --proxyEnable="false" --instance="MyNewInstance"
```

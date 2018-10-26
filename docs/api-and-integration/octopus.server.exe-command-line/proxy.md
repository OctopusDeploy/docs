---
title: Proxy
description:  Configure the HTTP proxy used by Octopus
---

Use the proxy command to configure the HTTP proxy used by Octopus.

**Proxy options**

```text
Usage: octopus.server proxy [<options>]

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

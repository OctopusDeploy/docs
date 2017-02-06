---
title: Polling proxy
---

Configure the HTTP proxy used by polling tentacles to reach the Octopus Server

**Polling proxy options**

```text
Usage: Tentacle polling-proxy [<options>]

Where [<options>] is any of:
      --instance=VALUE       Name of the instance to use
      --proxyEnable=VALUE    Whether to use a proxy
      --proxyUsername=VALUE  Username to use when authenticating with the
                               proxy
      --proxyPassword=VALUE  Password to use when authenticating with the
                               proxy
      --proxyHost=VALUE      The proxy host to use. Leave empty to use the
                               default Internet Explorer proxy
      --proxyPort=VALUE      The proxy port to use in conjuction with the
                               Host set with proxyHost
Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```


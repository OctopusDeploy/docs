---
title: Export Certificates
description: Exports the certificate that Octopus server can use to authenticate itself with its Tentacles
---

Use the export certificate command to backup the certificate that Octopus server uses to authenticate itself with its Tentacles.

**Export certificate options**

```text
Usage: Octopus.Server export-certificate [<options>]

Where [<options>] is any of:
      --instance=VALUE       Name of the instance to use
      --export-pfx=VALUE     The filename to which to export the certificate
      --pfx-password=VALUE   The password to use for the exported pfx file

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```

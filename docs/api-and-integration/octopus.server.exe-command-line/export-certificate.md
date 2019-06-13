---
title: Export Certificates
description: Exports the certificate that Octopus Server can use to authenticate itself with its Tentacles
---

Use the export certificate command to backup the certificate that Octopus Server uses to authenticate itself with its Tentacles.

**Export certificate options**

```text
Usage: octopus.server export-certificate [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --export-pfx=VALUE     The filename to which to export the certificate
      --pfx-password=VALUE   The password to use for the exported pfx file

Or one of the common options:

      --help                 Show detailed help for this command
```


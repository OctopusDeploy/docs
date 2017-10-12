---
title: New Certificate
description: Creates a new certificate that Octopus server can use to authenticate itself with its Tentacles
---

Use the new certificate command to create a new certificate that Octopus server can use to authenticate itself with its Tentacles.

**New certificate options**

```text
Usage: Octopus.Server new-certificate [<options>]

Where [<options>] is any of:
      --instance=VALUE       Name of the instance to use
      --replace              Replaces the existing certificate that Octopus
                               server uses to authenticate itself with its
                               Tentacles
      --export-pfx=VALUE     Exports the new certificate to the specified
                               file; for use with the import-certificate command
      --pfx-password=VALUE   The password to use for the exported pfx file

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log messages to the stdout - errors are
                               still logged to stderr
```

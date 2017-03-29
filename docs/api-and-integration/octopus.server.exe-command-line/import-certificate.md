---
title: Import Certificate
description:  Replace the certificate that Octopus server uses to authenticate itself with its Tentacles
---

Use the import certificate command to replace the certificate that Octopus server uses to authenticate itself with its Tentacles.

**Import certificate options**

```text
Usage: Octopus.Server import-certificate [<options>]

Where [<options>] is any of:
  -f, --from-file=VALUE      Import a certificate from the specified file generated
                               by the new-certificate command or a
                               Personal Information Exchange (PFX) file
 -pw, --pfx-password=VALUE   Personal Information Exchange (PFX) private key password

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```

---
title: Import Certificates
description:  Replace the certificate that Octopus Server uses to authenticate itself with its Tentacles
---

Use the import certificate command to replace the certificate that Octopus Server uses to authenticate itself with its Tentacles.

**Import certificate options**

```text
Usage: Octopus.Server import-certificate [<options>]

Where [<options>] is any of:
  -f, --from-file=VALUE      Import a certificate from the specified file generated
                               by the new-certificate command or a
                               Personal Information Exchange (PFX) file
 -pw, --pfx-password=VALUE   Personal Information Exchange (PFX) private key password

Or one of the common options:
      --help                 Show detailed help for this command
```

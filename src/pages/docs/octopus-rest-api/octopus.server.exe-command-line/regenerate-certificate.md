---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Regenerate certificates
description:  Regenerate one or more of the certificates that Octopus uses
navOrder: 180
---

Use the regenerate certificate command to regenerate one or more of the certificates that Octopus uses.

**Deprecated**: The `regenerate-certificate` option has been deprecated and will be removed in a future version. Please use `new-certificate` in conjunction with `import-certificate` instead.

**Regenerate Certificate options**

```
Usage: Octopus.Server regenerate-certificate [<options>]

Where [<options>] is any of:
      --octopus-tentacle=VALUE   Regenerate the certificate used to authenticate to Tentacles

      Deprecated in 3.0:
      --octopus-azure=VALUE      Use Accounts to update or regenerate Azure Management Certificates.

Or one of the common options:
      --help                 Show detailed help for this command
```

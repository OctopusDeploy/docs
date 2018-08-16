---
title: New Certificate
description: Using the Tentacle.exe command line executable to create and install a new certificate for this Tentacle.
---

Creates and installs a new certificate for this Tentacle

**New certificate options**

```text
Usage: Tentacle new-certificate [<options>]

Where [<options>] is any of:
      --instance=VALUE       Name of the instance to use
  -b, --if-blank             Generates a new certificate only if there is none
  -e, --export-file=VALUE    DEPRECATED: Exports a new certificate to the
                               specified file as unprotected base64 text, but
                               does not save it to the Tentacle configuration;
                               for use with the import-certificate command
      --export-pfx=VALUE     Exports the new certificate to the specified
                               file as a password protected pfx, but does not
                               save it to the Tentacle configuration; for use
                               with the import-certificate command
      --pfx-password=VALUE   The password to use for the exported pfx file

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log messages to the stdout - errors are
                               still logged to stderr
```

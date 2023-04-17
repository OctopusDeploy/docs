---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: New certificate
description: Using the Tentacle.exe command line executable to create and install a new certificate for this Tentacle.
---

Creates and installs a new certificate for this Tentacle.

**New certificate options**

```
Usage: tentacle new-certificate [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
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

      --help                 Show detailed help for this command
```

## Basic examples

This example creates and installs a new certificate for the default Tentacle instance:

```
tentacle new-certificate
```

This example creates, installs, and exports a new certificate for the instance `MyNewInstance`:

Windows:

```
tentacle new-certificate --instance="MyNewInstance" --export-pfx="c:\temp\MyNewInstance.pfx" --pfx-password="$uper$ecretP@ssw0rd"
```
Linux:

```
tentacle new-certificate --instance="MyNewInstance" --export-pfx="/tmp/MyNewInstance.pfx" --pfx-password="$uper$ecretP@ssw0rd"
```

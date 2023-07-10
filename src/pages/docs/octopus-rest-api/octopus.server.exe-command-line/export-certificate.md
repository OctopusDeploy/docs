---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Export certificates
description: Exports the certificate that Octopus Server can use to authenticate itself with its Tentacles
navOrder: 50
---

Use the export certificate command to backup the certificate that Octopus Server uses to authenticate itself with its Tentacles.

**Export certificate options**

```text
Usage: octopus.server export-certificate [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --export-pfx=VALUE     The filename to which to export the certificate
      --pfx-password=VALUE   The password to use for the exported pfx file

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example exports the certificate that the Octopus Server instance named `OctopusServer` uses to authenticate itself with its [Tentacles](/docs/infrastructure/deployment-targets/tentacle/windows):

```
octopus.server export-certificate --instance="OctopusServer" --export-pfx="C:\temp\OctopusServer-certificate.pfx" --pfx-password="Sup3r5ecretPa$$w0rd"
```

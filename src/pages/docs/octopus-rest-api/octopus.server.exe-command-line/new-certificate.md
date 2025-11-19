---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-11-19
title: New certificate
description: Creates a new certificate that Octopus Server can use to authenticate itself with its Tentacles
navOrder: 140
---

Use the new certificate command to create a new certificate that Octopus Server can use to authenticate itself with its Tentacles.

## New certificate options

```bash
Usage: Octopus.Server new-certificate [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --replace              Replaces the existing certificate that Octopus
                               Server uses to authenticate itself
      --export-pfx=VALUE     Exports the new certificate to the specified
                               file; for use with the import-certificate command
      --pfx-password=VALUE   The password to use for the exported pfx file
      --type=VALUE           Sets which certificate will be updated. Valid
                               options are: 'tentacle' or 'grpc'. Default:
                               'tentacle'
      --skipDatabaseCompatibilityCheck
                             Skips the database compatibility check
      --skipDatabaseSchemaUpgradeCheck
                             Skips the database schema upgrade checks. Use
                               with caution

Or one of the common options:

      --help                 Show detailed help for this command
```

:::div{.hint}
The `--type` parameter is only available in versions `>= 2025.4`
:::

## Basic examples

### Replacing existing Tentacle certificate

This example creates a new Tentacle certificate for instance `MyNewInstance` and replaces the old one:

```bash
octopus.server new-certificate --instance="MyNewInstance" --replace
```

### Generating and exporting a new Tentacle certificate

This example creates a new Tentacle certificate and exports it to a PFX file:

```bash
octopus.server new-certificate --export-pfx="c:\temp\new-certificate.pfx" --pfx-password="$uper$3cretPassw0rd"
```

### Replacing existing gRPC certificate

This example creates a new gRPC certificate for instance `MyNewInstance` and replaces the old one:

```bash
octopus.server new-certificate --instance="MyNewInstance" --replace --type="grpc"
```

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-11-19
title: Export certificates
description: Exports the certificate that Octopus Server can use to authenticate itself with its Tentacles
navOrder: 50
---

Use the export certificate command to backup the certificate that Octopus Server uses to authenticate itself with its Tentacles.

## Export certificate options

```bash
Usage: Octopus.Server export-certificate [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --export-pfx=VALUE     The filename to which to export the certificate
      --pfx-password=VALUE   The password to use for the exported pfx file
      --type=VALUE           Sets which certificate will be exported. Valid
                               options are: 'tentacle' or 'grpc'. Default:
                               'tentacle'

Or one of the common options:

      --help                 Show detailed help for this command
```

:::div{.hint}
The `--type` parameter is only available in versions `>= 2025.4`
:::

## Basic examples

### Exporting Tentacle certificate

This example exports the certificate that the Octopus Server instance named `OctopusServer` uses to authenticate itself with its [Tentacles](/docs/infrastructure/deployment-targets/tentacle/windows):

```bash
octopus.server export-certificate --instance="OctopusServer" --export-pfx="C:\temp\OctopusServer-certificate.pfx" --pfx-password="your-secret-password"
```

### Exporting gRPC certificate

This example exports the certificate that the Octopus Server instance named `OctopusServer` uses to authenticate itself with its [Kubernetes Monitors](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor) and [Argo CD Gateways](/docs/argo-cd/instances):

```bash
octopus.server export-certificate --instance="OctopusServer" --export-pfx="C:\temp\OctopusServer-certificate.pfx" --pfx-password="your-secret-password" --type="grpc"
```

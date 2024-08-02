---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-02
title: Linux targets
description: Configuring Linux servers as deployment targets in Octopus.
navOrder: 30
hideInThisSectionHeader: true
---

Linux servers can be configured as [deployment targets](/docs/infrastructure/deployment-targets) in Octopus.   

The Octopus Server can communicate with Linux targets in two ways:
- Using the [Linux Tentacle](/docs/infrastructure/deployment-targets/tentacle/linux).  
- Over SSH using an [SSH target](/docs/infrastructure/deployment-targets/linux/ssh-target). 

When using SSH for deployments to a Linux server, the Tentacle agent is not required and doesn't need to be installed.

:::div{.success}
The Linux Tentacle is the recommended way to configure your server as a deployment target. This allows you to secure the SSH port on your servers.

If you operate in a highly secure environment, where it's not possible to open an inbound TCP port for Tentacle (`10933` by default), you can configure the Linux Tentacle in [Polling mode](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#polling-tentacles).
:::

## Requirements

- The `$HOME` environment variable must be available.
- `bash` 3+ is available at `/bin/bash`. 
- `tar` is available. This is used to unpack Calamari.
- `base64` is available. This is used for encoding and decoding variables.
- `grep` is available.

Any Linux server which meets these minimum requirements will be able to be configured as a deployment target or worker. However, there are additional requirements to be aware of for both [SSH targets](/docs/infrastructure/deployment-targets/linux/ssh-requirements) and [Linux Tentacle](/docs/infrastructure/deployment-targets/tentacle/linux/#requirements).

## Supported distributions

The following platforms are explicitly supported (we run automated tests against them):

- Ubuntu 22.04 LTS
- Redhat (RHEL) 8.10
- Amazon Linux 2
- Debian 11
- Fedora 39
- MacOS 12.6.3
- openSUSE 15.6
- SUSE LES 15 SP5

## Learn more

- [Linux blog posts](https://octopus.com/blog/tag/linux)

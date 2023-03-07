---
title: Linux targets
description: Configuring Linux servers as deployment targets in Octopus.
position: 20
hideInThisSectionHeader: true
---

Linux servers can be configured as [deployment targets](/docs/infrastructure/deployment-targets/index.md) in Octopus.   

The Octopus Server can communicate with Linux targets in two ways:
- Using the [Linux Tentacle](/docs/infrastructure/deployment-targets/tentacle/linux/index.md).  
- Over SSH using an [SSH target](/docs/infrastructure/deployment-targets/linux/ssh-target.md). 

When using SSH for deployments to a Linux server, the Tentacle agent is not required and doesn't need to be installed.

:::success
The Linux Tentacle is the recommended way to configure your server as a deployment target. This allows you to secure the SSH port on your servers.

If you operate in a highly secure environment, where it's not possible to open an inbound TCP port for Tentacle (`10933` by default), you can configure the Linux Tentacle in [Polling mode](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#polling-tentacles).
:::

## Requirements

- The `$HOME` environment variable must be available.
- `bash` 3+ is available at `/bin/bash`. 
- `tar` is available. This is used to unpack Calamari.
- `base64` is available. This is used for encoding and decoding variables.
- `grep` is available.

Any Linux server which meets these minimum requirements will be able to be configured as a deployment target or worker. However, there are additional requirements to be aware of for both [SSH targets](/docs/infrastructure/deployment-targets/linux/ssh-requirements.md) and [Linux Tentacle](/docs/infrastructure/deployment-targets/tentacle/linux/index.md#requirements).

## Supported distributions

The following platforms are explicitly supported (we run automated tests against them):

- Ubuntu 18.04 LTS
- Ubuntu 16.04 LTS
- Redhat (RHEL) 7.2
- Centos 7.7
- Amazon Linux 2
- Debian 9.12
- Fedora 23
- MacOS 10.15.3
- openSUSE 15.1
- SUSE LES 12 SP5
- FreeBSD 11.3

## Learn more

- [Linux blog posts](https://octopus.com/blog/tag/linux)

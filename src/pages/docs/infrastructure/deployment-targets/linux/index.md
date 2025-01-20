---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-01-20
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

## Dependencies

- The `$HOME` environment variable must be available.
- `bash` 3+ is available* at `/bin/bash`
- `tar` is available. This is used to unpack Calamari.
- `base64` is available. This is used for encoding and decoding variables.
- `grep` is available.

There are additional dependency requirements to be aware of for both [SSH targets](/docs/infrastructure/deployment-targets/linux/ssh-requirements) and [Linux Tentacle](/docs/infrastructure/deployment-targets/tentacle/linux/#requirements).

*The `bash` requirement is not required if exclusively utilizing [Raw Scripts](https://octopus.com/docs/deployments/custom-scripts/raw-scripting).

## Supported distributions

Since tooling used to invoke Octopus workloads is based on .NET 6, Octopus Server supports running workloads on the following distributions as per the [.NET 6 supported platform details](https://github.com/dotnet/core/blob/main/release-notes/6.0/supported-os.md#linux).

| OS                                                     | Versions               |
|--------------------------------------------------------|------------------------|
| [Alpine](https://alpinelinux.org)                      | 3.20, 3.19, 3.18, 3.17 |
| [CentOS Stream](https://centos.org/)                   | 9                      |
| [Debian](https://www.debian.org/)                      | 12, 11                 |
| [Fedora](https://fedoraproject.org/)                   | 40, 39                 |
| [openSUSE Leap](https://www.opensuse.org/)             | 15.6, 15.5             |
| [Red Hat Enterprise Linux](https://access.redhat.com/) | 9, 8                   |
| [SUSE Enterprise Linux](https://www.suse.com/)         | 15.6, 15.5, 12.5       |
| [Ubuntu](https://ubuntu.com/)                          | 24.04, 22.04, 20.04    |

Although the tooling requires the platform to support .NET Core, since it runs as a self-contained .NET deployment there is no .NET _installation_ prerequisite.

In addition to the .NET 6 requirement, Octopus will only support those Operating Systems which are themselves still considered as supported by the platform vendors themselves.

## Learn more

- [Linux blog posts](https://octopus.com/blog/tag/linux)

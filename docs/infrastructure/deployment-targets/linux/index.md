---
title: Linux Targets
description: Configuring Linux servers as deployment targets in Octopus 
position: 20 
---

Linux servers can be configured as [Deployment Targets](/docs/infrastructure/deployment-targets/index.md) in Octopus.   

The Octopus Server communicates with Linux targets via SSH, and therefore Linux servers are modeled as SSH Targets.  

There is no agent required to be pre-installed on Linux servers, unlike [Windows servers](/docs/infrastructure/deployment-targets/windows-targets/index.md) which require the Tentacle agent to be installed.

## Supported Distributions

Any Linux server which meets the [requirements](/docs/infrastructure/deployment-targets/linux/ssh-targets/requirements.md) will be able to be configured as a deployment target.

The following platforms are explicitly supported (we run automated tests against them):

- Ubuntu 16.04 LTS
- Ubuntu 14.04 LTS
- Ubuntu 12.04 LTS
- Redhat 7.2
- Centos 7.5
- Amazon Linux 2
- Debian 8.7
- Fedora 23
- MacOS 10.12.5
- openSUSE 42.3 
- SUSE LES 12 SP2
- FreeBSD 11.2

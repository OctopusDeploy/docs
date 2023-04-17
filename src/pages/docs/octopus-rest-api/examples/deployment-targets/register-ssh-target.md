---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Register SSH target
description: An example script to register an SSH target using the REST API.
---

This script demonstrates how to programmatically register an [SSH target](/docs/infrastructure/deployment-targets/linux/ssh-target/) using the REST API.

## Usage

Provide values for the following:
- Octopus URL
- Octopus API Key
- Name of the space to work with
- The name for the SSH target
- Hostname or IP address of the SSH target to register
- Port for the SSH target (`22` by default)
- The SSH target's host fingerprint (see below)
- The Account name to use when authenticating.
- A list of environments for the SSH target
- A list of roles for the SSH target
- Octopus Tenanted Participation Type (`Tenanted` | `Untenanted` | `TenantedOrUntenanted`)
- *Optional*: A list of Tenant names to connect to the SSH target.

You can find the host fingerprint for an SSH target by remotely logging onto the machine and retrieving it. An example bash script to do this is shown below:

```bash
ssh-keygen -E md5 -lf /etc/ssh/ssh_host_ed25519_key.pub | cut -d' ' -f2 | awk '{ print $1}' | cut -d':' -f2-
```

## Script

!include <register-ssh-target-scripts>

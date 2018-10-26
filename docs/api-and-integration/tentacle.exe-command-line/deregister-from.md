---
title: Deregister From
description: Using the Tentacle.exe command line executable to deregister a deployment target from an Octopus Server.
---

Deregisters this deployment target from an Octopus Server

**Deregister from options**

```text
Usage: tentacle deregister-from [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --server=VALUE         The Octopus server - e.g., 'http://octopus'
      --apiKey=VALUE         Your API key; you can get this from the Octopus
                               web portal
  -u, --username=VALUE       If not using API keys, your username
  -p, --password=VALUE       If not using API keys, your password
  -m, --multiple             Deregister all machines that use the same
                               thumbprint

Or one of the common options:

      --help                 Show detailed help for this command


```

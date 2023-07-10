---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Deregister Worker
description: Using the Tentacle.exe command line executable to deregister a Worker from an Octopus Server.
---

Deregisters this Worker from an Octopus Server.

**Deregister Worker options**

```text
Usage: tentacle deregister-worker [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --server=VALUE         The Octopus Server - e.g., 'http://octopus'
      --apiKey=VALUE         Your API key; you can get this from the Octopus
                               web portal
  -u, --username, --user=VALUE
                             If not using API keys, your username
  -p, --password=VALUE       If not using API keys, your password
  -m, --multiple             Deregister all workers that use the same
                               thumbprint
      --space=VALUE          The space which this worker will be deregistered
                               from, - e.g. 'Finance Department' where Finance
                               Department is the name of an existing space; the
                               default value is the Default space, if one is
                               designated.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example deregisters a worker from the Octopus Server:

```
tentacle deregister-worker --server="https://MyOctopusServer" --apiKey="API-MyApiKey"
```

This example deregisters the worker instance `MyNewInstance` from space `MyNewSpace`:

```
tentacle deregister-worker --server="https://MyOctopusServer" --apiKey="API-MyApiKey" --instance="MyNewInstance" --space="MyNewSpace"
```

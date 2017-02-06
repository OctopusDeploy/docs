---
title: Deleting releases
description: Using the Octo.exe command line tool to delete releases.
position: 3
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to delete releases from your Octopus instance. Releases deleted this way **cannot be recovered**.

:::success
**Using Channels?**
If you are using channels (introduced in Octopus 3.2) you can filter this command so it only deletes releases for a particular channel.
:::

```bash
octo delete-releases [<options>]
```

Where `[<options>]` is any of:

**delete-releases options**

```text
Deletion: 

      --project=VALUE        Name of the project
      --minversion=VALUE     Minimum (inclusive) version number for the range 
                             of versions to delete
      --maxversion=VALUE     Maximum (inclusive) version number for the range 
                             of versions to delete
      --channel=VALUE        [Optional] if specified, only releases 
                             associated with the channel will be deleted; 
                             specify this argument multiple times to target 
                             multiple channels.
      --whatif               [Optional, Flag] if specified, releases won't 
                             actually be deleted, but will be listed as if 
                             simulating the command

Common options: 

      --server=VALUE         The base URL for your Octopus server - e.g., 
                             http://your-octopus/
      --apiKey=VALUE         Your API key. Get this from the user profile 
                             page.
      --user=VALUE           [Optional] Username to use when authenticating 
                             with the server.
      --pass=VALUE           [Optional] Password to use when authenticating 
                             with the server.
      --configFile=VALUE     [Optional] Text file of default values, with one 
                             'key = value' per line.
      --debug                [Optional] Enable debug logging
      --ignoreSslErrors      [Optional] Set this flag if your Octopus server 
                             uses HTTPS but the certificate is not trusted on 
                             this machine. Any certificate errors will be 
                             ignored. WARNING: this option may create a 
                             security vulnerability.
      --enableServiceMessages
                             [Optional] Enable TeamCity or Team Foundation 
                             Build service messages when logging.

```

## Basic example {#Deletingreleases-Basicexample}

The following command will delete all the releases from the project **Web** between versions **0.0.8** to **0.0.12**.

```bash
octo delete-releases --project Web --minversion="0.0.8" --maxversion="0.0.12" --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

:::warning
On the example above, both **minversion** and **maxversion** will be delete as well. The complete list of releases deleted by that command will be:

0.0.8, 0.0.9, 0.0.10, 0.0.11, 0.0.12.
:::

:::success
**Tip**
Learn more about [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), and [creating API keys](/docs/how-to/how-to-create-an-api-key.md).
:::

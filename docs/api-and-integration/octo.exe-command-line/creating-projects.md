---
title: Creating projects
position: 1
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to create a project inside a project group.

```text
octo create-project [<options>]
```

Where `[<options>]` is any of:

**create-project options**

```text
Project creation:
      --name=VALUE           The name of the project
      --projectGroup=VALUE   The name of the project group to add this
                             project to. If the group doesn't exist, it will
                             be created.
      --ignoreIfExists       If the project already exists, an error will be
                             returned. Set this flag to ignore the error.
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
                             [Optional] Enable TeamCity service messages when
                             logging.
```

## Basic example {#Creatingprojects-Basicexample}

The following command will create a project called *MyWebApp* into the project group *MyProjectGroup*

```text
Octo create-project --name MyWebApp --projectgroup MyProjectGroup --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

:::success
**Tip**
Learn more about [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), and [creating API keys](/docs/how-to/how-to-create-an-api-key.md).
:::

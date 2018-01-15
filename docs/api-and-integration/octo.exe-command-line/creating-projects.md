---
title: Creating projects
description: Using the Octo.exe command line tool to create projects.
position: 1
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to create a project inside a project group.

```bash
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
      --lifecycle=VALUE      The name of the lifecycle that the project will 
                             use.
      --ignoreIfExists       If the project already exists, an error will be 
                             returned. Set this flag to ignore the error.

Common options: 

      --help                 [Optional] Print help for a command
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, only valid 
                             option is json
      --outputFormat=VALUE   [Optional] Output format, only valid option is 
                             json
      --server=VALUE         The base URL for your Octopus server - e.g., 
                             http://your-octopus/
      --apiKey=VALUE         [Optional] Your API key. Get this from the user 
                             profile page. Your must provide an apiKey or 
                             username and password. If the guest account is 
                             enabled, a key of API-GUEST can be used.
      --user=VALUE           [Optional] Username to use when authenticating 
                             with the server. Your must provide an apiKey or 
                             username and password.
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
      --timeout=VALUE        [Optional] Timeout in seconds for network 
                             operations. Default is 600.
      --proxy=VALUE          [Optional] The URI of the proxy to use, eg 
                             http://example.com:8080.
      --proxyUser=VALUE      [Optional] The username for the proxy.
      --proxyPass=VALUE      [Optional] The password for the proxy. If both 
                             the username and password are omitted and 
                             proxyAddress is specified, the default 
                             credentials are used. 
      --logLevel=VALUE       [Optional] The log level. Valid options are 
                             verbose, debug, information, warning, error and 
                             fatal. Defaults to 'debug'.
```

## Basic example {#Creatingprojects-Basicexample}

The following command will create a project called *MyWebApp* into the project group *MyProjectGroup*

```bash
Octo create-project --name MyWebApp --projectgroup MyProjectGroup --server http://MyOctopusServerURL.com --apikey MyAPIKey
```

:::success
**Tip**
Learn more about [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), and [creating API keys](/docs/api-and-integration/api/how-to-create-an-api-key.md).
:::

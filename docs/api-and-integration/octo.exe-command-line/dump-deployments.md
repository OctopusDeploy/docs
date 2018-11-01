---
title: Dump Deployments
description: Writes deployments to an XML file that can be imported in Excel.
position: 12
---


```bash
octo dump-deployments [<options>]

Where `[<options>]` is any of:

Dumper: 

      --filePath=VALUE       The full path and name of the export file

Common options: 

      --help                 [Optional] Print help for a command
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, only valid 
                             option is json
      --server=VALUE         The base URL for your Octopus Server - e.g., 
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
      --ignoreSslErrors      [Optional] Set this flag if your Octopus Server 
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

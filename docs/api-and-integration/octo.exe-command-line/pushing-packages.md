---
title: Pushing packages
description: Using the Octo.exe command line tool to push packages to Octopus.
position: 10
---

:::hint
In Octo.exe version 3.3.8 we have added a command to push packages to Octopus directly from Octo.exe. The push command can push any of the supported packages types listed on this [page](/docs/packaging-applications/supported-packages.md).
:::

## Basic example {#Pushingpackages-Basicexample}

The following command will push the package ***MyPackage*** to your Octopus Server and will replace the package if it already exists in the built-in repository.

```bash
C:\> Octo.exe push --package MyPackage.1.0.0.zip --replace-existing --server http://my.octopus.url --apiKey API-XXXXXXXXXXXXXXXX
```

## Pushing multiple packages example {#Pushingpackages-Pushingmultiplepackagesexample}

The following command will push the packages ***MyPackage*** and ***MyOtherPackage*** to the Octopus Server but will not replace a package if it already exists in the built-in repository.

```bash
C:\> Octo.exe push --package MyPackage.1.0.0.zip --package MyOtherPackage.1.0.1.nupkg --server http://my.octopus.url --apiKey API-XXXXXXXXXXXXXXXX
```

## Push command usage {#Pushingpackages-Pushcommandusage}

```bash
C:\> Octo.exe help push

Package pushing: 

      --package=VALUE        Package file to push. Specify multiple packages 
                             by specifying this argument multiple times: 
                             --package package1 --package package2
      --replace-existing     If the package already exists in the repository, 
                             the default behavior is to reject the new 
                             package being pushed. You can pass this flag to 
                             overwrite the existing package.

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

---
title: Pushing packages
position: 10
---


:::hint
In Octo.exe version 3.3.8 we have added a command to push packages to Octopus directly from Octo.exe. The push command can push any of the supported packages types listed on this [page](/docs/home/packaging-applications/supported-packages.md).
:::

### Basic example


The following command will push the package ***MyPackage*** to your Octopus Server and will replace the package if it already exists in the built-in repository.

```powershell
C:\> Octo.exe push --package MyPackage.1.0.0.zip --replace-existing --server http://my.octopus.url --apiKey API-XXXXXXXXXXXXXXXX
```

### Pushing multiple packages example


The following command will push the packages ***MyPackage*** and ***MyOtherPackage*** to the Octopus Server but will not replace a package if it already exists in the built-in repository.

```powershell
C:\> Octo.exe push --package MyPackage.1.0.0.zip --package MyOtherPackage.1.0.1.nupkg --server http://my.octopus.url --apiKey API-XXXXXXXXXXXXXXXX
```

### Push command usage

```powershell
C:\> Octo.exe help push
Octopus Deploy Command Line Tool, version 3.3.8+Branch.master.Sha.f8a34fc6097785d7d382ddfaa9a7f009f29bc5fb

Usage: Octo push [<options>]

Where [<options>] is any of:

Package pushing:

      --package=VALUE        Package file to push. Specify multiple packages
                             by specifying this argument multiple times:
                             --package package1 --package package2
      --replace-existing     If the package already exists in the repository,
                             the default behavior is to reject the new
                             package being pushed. You can pass this flag to
                             overwrite the existing package.

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

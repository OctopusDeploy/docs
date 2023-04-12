---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus package upload
description: upload one or more packages to Octopus Deploy
navOrder: 61
---

upload one or more packages to Octopus Deploy. Glob patterns are supported.


```
Usage:
  octopus package upload [flags]

Aliases:
  upload, push

Flags:
  -p, --package strings         Package to upload, may be specified multiple times. Any arguments without flags will be treated as packages
      --overwrite-mode string   Action when a package already exists. Valid values are 'fail', 'overwrite', 'ignore'. Default is 'fail'
      --continue-on-error       When uploading multiple packages, controls whether the CLI continues after a failed upload. Default is to abort.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```
$ octopus package upload --package SomePackage.1.0.0.zip
$ octopus package upload SomePackage.1.0.0.tar.gz --overwrite-mode overwrite
$ octopus package push SomePackage.1.0.0.zip	
$ octopus package upload bin/**/*.zip --continue-on-error
$ octopus package upload PkgA.1.0.0.zip PkgB.2.0.0.tar.gz PkgC.1.0.0.nupkg


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)
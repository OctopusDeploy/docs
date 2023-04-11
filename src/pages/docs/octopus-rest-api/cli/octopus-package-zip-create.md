---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus package zip create
description: Create zip
navOrder: 64
---

Create zip package


```text
Usage:
  octopus package zip create [flags]

Flags:
      --id string           The ID of the package.
  -v, --version string      The version of the package, must be a valid SemVer.
      --base-path string    Root folder containing the contents to zip.
      --out-folder string   Folder into which the zip file will be written.
      --include strings     Add a file pattern to include, relative to the base path e.g. /bin/*.dll; defaults to "**".
      --verbose             Verbose output.
      --overwrite           Allow an existing package file of the same ID/version to be overwritten.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus package zip create --id SomePackage --version 1.0.0


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)
---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus package nuget create
description: Create nuget
navOrder: 60
---

Create nuget package


```text
Usage:
  octopus package nuget create [flags]

Flags:
      --id string                 The ID of the package
  -v, --version string            The version of the package, must be a valid SemVer.
      --base-path string          Root folder containing the contents to zip.
      --out-folder string         Folder into which the zip file will be written.
      --include strings           Add a file pattern to include, relative to the base path e.g. /bin/*.dll; defaults to "**".
      --verbose                   Verbose output.
      --overwrite                 Allow an existing package file of the same ID/version to be overwritten.
      --author strings            Add author/s to the package metadata.
      --title string              The title of the package.
      --description string        A description of the package, defaults to "A deployment package created from files on disk.".
      --releaseNotes string       Release notes for this version of the package.
      --releaseNotesFile string   A file containing release notes for this version of the package.


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus package nuget create --id SomePackage --version 1.0.0


```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)
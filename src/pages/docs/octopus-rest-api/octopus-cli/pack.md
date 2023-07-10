---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Pack
description: Creates a package (.nupkg or .zip) from files on disk, without needing a .nuspec or .csproj
navOrder: 260
---

The [Octopus CLI](/docs/octopus-rest-api/octopus-cli) can be used to create packages (.nupkg or .zip) from files on disk, without needing a .nuspec or .csproj file.

```text
Creates a package (.nupkg or .zip) from files on disk, without needing a .nuspec or .csproj.

Usage: octo pack [<options>]

Where [<options>] is any of:

Basic options:

      --id=VALUE             The ID of the package; e.g. MyCompany.MyApp.
      --format=VALUE         Package format. Valid values are Zip and NuPkg.
                             Default is NuPkg, though we recommend Zip going
                             forward.
      --version=VALUE        [Optional] The version of the package; must be a
                             valid SemVer; defaults to a timestamp-based
                             version.
      --outFolder=VALUE      [Optional] The folder into which the generated
                             NuPkg file will be written; defaults to '.'.
      --basePath=VALUE       [Optional] The root folder containing files and
                             folders to pack; defaults to '.'.
      --verbose              [Optional] verbose output.
      --logLevel=VALUE       [Optional] The log level. Valid options are
                             verbose, debug, information, warning, error and
                             fatal. Defaults to 'debug'.

NuGet packages:

      --author=VALUE         [Optional, Multiple] Add an author to the
                             package metadata; defaults to the current user.
      --title=VALUE          [Optional] The title of the package.
      --description=VALUE    [Optional] A description of the package;
                             defaults to a generic description.
      --releaseNotes=VALUE   [Optional] Release notes for this version of the
                             package.
      --releaseNotesFile=VALUE
                             [Optional] A file containing release notes for
                             this version of the package.

Zip packages:

      --compressionLevel=VALUE
                             [Optional] Sets the compression level of the
                             package. Valid values are None, Fast and Optima-
                             l. Default is Optimal.

Advanced options:

      --include=VALUE        [Optional, Multiple] Add a file pattern to
                             include, relative to the base path e.g. /bin/-
                             *.dll - if none are specified, defaults to **.
      --overwrite            [Optional] Allow an existing package file of the
                             same ID/version to be overwritten.

Common options:

      --help                 [Optional] Print help for a command.
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, valid options
                             are Default or Json
      --outputFormat=VALUE   [Optional] Output format, valid options are
                             Default or Json
```

## Basic example

This example packs the contents of a temp directory:

Windows:

```
octo pack --id="MyPackage" --format="zip" --version="1.0.0.0" --basePath="c:\temp\MyPackage" --outFolder="c:\temp"
```
Linux:

```
octo pack --id="MyPackage" --format="zip" --version="1.0.0.0" --basePath="/tmp/MyPackage" --outFolder="/tmp"
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)
- [Create packages with the Octopus CLI](/docs/packaging-applications/create-packages/octopus-cli)

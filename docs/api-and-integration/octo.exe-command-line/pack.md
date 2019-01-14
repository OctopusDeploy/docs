---
title: pack
description: Creates a package (.nupkg or .zip) from files on disk, without needing a .nuspec or .csproj
---

Creates a package (.nupkg or .zip) from files on disk, without needing a .nuspec or .csproj

**pack options**

```text
Usage: octo pack [<options>]

Where [<options>] is any of:

Basic options:

      --id=VALUE             The ID of the package; e.g. MyCompany.MyApp
      --format=VALUE         Package format. Options are: NuPkg, Zip.
                             Defaults to NuPkg, though we recommend Zip going
                             forward
      --version=VALUE        [Optional] The version of the package; must be a
                             valid SemVer; defaults to a timestamp-based
                             version
      --outFolder=VALUE      [Optional] The folder into which the generated
                             NUPKG file will be written; defaults to '.'
      --basePath=VALUE       [Optional] The root folder containing files and
                             folders to pack; defaults to '.'
      --verbose              [Optional] verbose output
      --logLevel=VALUE       [Optional] The log level. Valid options are
                             verbose, debug, information, warning, error and
                             fatal. Defaults to 'debug'.

NuGet packages:

      --author=VALUE         [Optional, Multiple] Add an author to the
                             package metadata; defaults to the current user
      --title=VALUE          [Optional] The title of the package
      --description=VALUE    [Optional] A description of the package;
                             defaults to a generic description
      --releaseNotes=VALUE   [Optional] Release notes for this version of the
                             package
      --releaseNotesFile=VALUE
                             [Optional] A file containing release notes for
                             this version of the package

Zip packages:

      --compressionlevel=VALUE
                             [Optional] Set compression level of package:
                             none, fast, optimal (default).

Advanced options:

      --include=VALUE        [Optional, Multiple] Add a file pattern to
                             include, relative to the base path e.g. /bin/-
                             *.dll - if none are specified, defaults to **
      --overwrite            [Optional] Allow an existing package file of the
                             same ID/version to be overwritten

Common options:

      --help                 [Optional] Print help for a command
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, only valid
                             option is json
      --outputFormat=VALUE   [Optional] Output format, only valid option is
                             json
```


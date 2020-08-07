---
title: Extract
description: Extracts a NuGet package
---

Extracts a NuGet package

**extract options**

```text
Usage: tentacle extract [<options>]

Where [<options>] is any of:

      --package=VALUE        Package file
      --destination=VALUE    Destination directory

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example
This example extracts a package file to a destination directory
```text Windows
Tentacle extract --package="c:\temp\OctoFX.Web.1.0.20181.124538.nupkg" --destination="c:\temp\octofx"
```
```text Linux
Tentacle extract --package="/tmp/OctoFX.Web.1.0.20181.124538.nupkg" --destination="/tmp/octofx"
```
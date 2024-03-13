---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Extract
description: Extracts a NuGet package
---

Extracts a NuGet package.

**extract options**

```
Usage: tentacle extract [<options>]

Where [<options>] is any of:

      --package=VALUE        Package file
      --destination=VALUE    Destination directory

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example extracts a package file to a destination directory:

Windows:

```
tentacle extract --package="c:\temp\OctoFX.Web.1.0.20181.124538.nupkg" --destination="c:\temp\octofx"
```
Linux:

```
tentacle extract --package="/tmp/OctoFX.Web.1.0.20181.124538.nupkg" --destination="/tmp/octofx"
```

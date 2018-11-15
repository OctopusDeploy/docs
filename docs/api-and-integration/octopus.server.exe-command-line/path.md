---
title: path
description: Set the file paths that Octopus will use for storage
---

Set the file paths that Octopus will use for storage

**path options**

```text
Usage: octopus.server path [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --cacheDirectory=VALUE Directory to use for temporary files and cachin-
                               g, e.g. downloaded packages. This data in this
                               directory can be removed when the Octopus server
                               is not running. This directory should not be
                               shared between nodes.
      --nugetRepository=VALUE
                             Set the package path for the built-in package
                               repository
      --artifacts=VALUE      Set the path where artifacts are stored
      --taskLogs=VALUE       Set the path where task logs are stored

Or one of the common options:

      --help                 Show detailed help for this command
```


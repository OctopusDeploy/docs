---
title: Show Thumbprint
description: Using the Tentacle.exe command line executable to show the thumbprint of the Tentacle's certificate.
---

Show the thumbprint of the Tentacle's certificate

**New certificate options**

```text
Usage: tentacle show-thumbprint [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
  -e, --export-file=VALUE    Exports the Tentacle thumbprint to a file
      --thumbprint-only      DEPRECATED: Only print out the thumbprint, with
                               no additional text. This switch has been
                               deprecated and will be removed in Octopus 4.0
                               since it is no longer needed.
      --format=VALUE         The format of the output (text,json). Defaults
                               to text.

Or one of the common options:

      --help                 Show detailed help for this command


```

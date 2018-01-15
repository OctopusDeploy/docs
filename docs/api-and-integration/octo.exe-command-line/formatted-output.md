---
title: JSON Formatted Output
description: Formatting output from Octo.exe
position: 30
---

Introduced in Octo.exe version 4.30, most commands support printing the result in JSON format. 

[Dump Deployment](dump-deployments.md), [Export](export.md) and [Import](import.md) do not support JSON output.

To access JSON formatted output, use the `--outputformat=json` parameter.

```bash
octo list-projects --server http://your-octopus-server/ --apiKey API-ABCDEF123456 --outputformat=json
```

This command will output the list of projects in parsable JSON format:

```text
[
  {
    "Id": "Projects-81",
    "Name": "Phoenix"
  },
  {
    "Id": "Projects-61",
    "Name": "OctoFX"
  },
]
```
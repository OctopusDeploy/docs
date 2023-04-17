---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: JSON formatted output
description: Formatting output from the Octopus CLI
navOrder: 1
---

Most commands support printing the result in JSON format.

:::warning
[Dump Deployment](/docs/octopus-rest-api/octopus-cli/dump-deployments/), [Export](/docs/octopus-rest-api/octopus-cli/export/) and [Import](/docs/octopus-rest-api/octopus-cli/import) do not support JSON output.
:::

To access JSON formatted output, use the `--outputformat=json` parameter.

```bash
octo list-projects --server http://your-octopus-server/ --apiKey API-ABCDEF123456 --outputformat=json
```

This command outputs the list of projects in parsable JSON format:

```
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

You can also work with the JSON output in PowerShell:
```powershell
$json = (./octo list-releases --server http://your-octopus-server/ --apikey API-ABCDEF123456 --project=OctoLifecycle --outputformat=json) | ConvertFrom-Json
$json | select -expand Releases | where {[datetime]$_.Assembled -gt ((Get-Date).AddMonths(-1))}
```

This script writes out a list of releases for the last month:

```
Version Assembled                     PackageVersions ReleaseNotes
------- ---------                     --------------- ------------
0.0.16  2018-01-04T14:27:25.221+10:00 Deploy1 0.0.1
0.0.15  2018-01-04T14:14:29.369+10:00 Deploy1 0.0.1
0.0.14  2018-01-04T14:06:55.799+10:00 Deploy1 0.0.1
0.0.13  2018-01-04T14:06:44.784+10:00 Deploy1 0.0.1
0.0.12  2018-01-04T13:44:29.273+10:00 Deploy1 0.0.1
0.0.11  2017-12-18T09:36:44.995+10:00 Deploy 0.0.1    
0.0.10  2017-12-18T09:26:22.671+10:00 Deploy 0.0.1    
0.0.9   2017-12-18T09:25:02.342+10:00 Deploy 0.0.1    
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)


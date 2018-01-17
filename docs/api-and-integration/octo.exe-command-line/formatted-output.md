---
title: JSON Formatted Output
description: Formatting output from Octo.exe
position: 30
---

Introduced in Octo.exe version 4.30.0, most commands support printing the result in JSON format. 

:::warning
[Dump Deployment](dump-deployments.md), [Export](export.md) and [Import](import.md) do not support JSON output.
:::

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

You can also work with the JSON output in Powershell
```powershell
$json = (./octo list-releases --server http://your-octopus-server/ --apikey API-ABCDEF123456 --project=OctoLifecycle --outputformat=json) | ConvertFrom-Json
$json | select -expand Releases | where {[datetime]$_.Assembled -gt ((Get-Date).AddMonths(-1))} 
```

This script will write out a list of releases for the last month:

```text
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


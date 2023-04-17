---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Remove Octopus Target Command
description: Cmdlet for removing an Octopus target
navOrder: 60
---

## Delete target
Command: **_Remove-OctopusTarget_**

| Parameter         | Value                                  |
| ----------------- | -------------------------------------- |
| `-targetIdOrName` | The Name or Id of the target to delete |

Example:
```powershell
Remove-OctopusTarget -targetIdOrName "My Azure Web Application"
```
---
title: Remove Target Command
description: Cmdlet for removing an Octopus target
version: "[2018.5,)"
position: 50
---

## Delete Target
Command: **_Remove-OctopusTarget_**

| Parameter         | Value                                  |
| ----------------- | -------------------------------------- |
| `-targetIdOrName` | The Name or Id of the target to delete |

Example:
```powershell
Remove-OctopusTarget -targetIdOrName "My Azure Web Application"
```
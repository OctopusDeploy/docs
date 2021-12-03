---
title: Remove Octopus Target Command
description: Cmdlet for removing an Octopus target
position: 60
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
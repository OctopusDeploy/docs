---
title: Create Token Account Command
description: New-OctopusTokenAccount allows you to create a Token account in Octopus from within a running deployment
position: 10
---

## Token Account
Command: **_New-OctopusTokenAccount_**

_**New-OctopusTokenAccount** allows you to create a Token account in Octopus from within a running deployment_

| Parameters                    | Value                                                                                                      |
|-------------------------------|------------------------------------------------------------------------------------------------------------|
| `-name`                       | Name for the Token account                                                                                 |
| `-token`                      | The password to use to when authenticating against the remote host.                                        |
| `-updateIfExisting`           | Will update an existing account with the same name, create if it doesn't exist                             |

Example:
```powershell
New-OctopusTokenAccount -name "My Token Account" `
                        -token "dea39b531ac84adcb291a44b205921af" `
                        -updateIfExisting
```

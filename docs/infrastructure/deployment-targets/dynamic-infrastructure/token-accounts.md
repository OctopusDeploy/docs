---
title: Create Token Account Command
description: Cmdlet for creating a Token account
position: 7
---

## Token Account
Command: **_New-OctopusTokenAccount_**

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

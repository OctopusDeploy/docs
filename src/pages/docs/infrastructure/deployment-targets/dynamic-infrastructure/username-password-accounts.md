---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Create username/password command
description: New-OctopusUserPassAccount allows you to create a username/password account in Octopus from within a running deployment
navOrder: 10
---

## Username/password account
Command: **_New-OctopusUserPassAccount_**

_**New-OctopusUserPassAccount** allows you to create a username/password account in Octopus from within a running deployment_

| Parameters                    | Value                                                                                                      |
|-------------------------------|------------------------------------------------------------------------------------------------------------|
| `-name`                       | Name for the Username/Password account                                                                     |
| `-username`                   | The username to use when authenticating against the remote host.                                           |
| `-password`                   | The password to use to when authenticating against the remote host.                                        |
| `-updateIfExisting`           | Will update an existing account with the same name, create if it doesn't exist                             |

Example:
```powershell
New-OctopusUserPassAccount -name "My Username Password Account" `
                           -username "myuser" `
                           -password "correct horse battery staple" `
                           -updateIfExisting
```

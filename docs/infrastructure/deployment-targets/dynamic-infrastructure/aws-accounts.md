---
title: Create AWS Account Command
description: New-OctopusAwsAccount allows you to create an AWS account in Octopus from within a running deployment
position: 10
---

## AWS Account
Command: **_New-OctopusAwsAccount_**

_**New-OctopusAwsAccount** allows you to create an AWS account in Octopus from within a running deployment_

| Parameters                    | Value                                                                                                      |
|-------------------------------|------------------------------------------------------------------------------------------------------------|
| `-name`                       | Name for the AWS account                                                                                   |
| `-secretKey`                  | The AWS secret key to use when authenticating against Amazon Web Services.                                 |
| `-accessKey`                  | The AWS access key to use when authenticating against Amazon Web Services.                                 |
| `-updateIfExisting`           | Will update an existing account with the same name, create if it doesn't exist                             |

Example:
```powershell
New-OctopusAwsAccount -name "My AWS Account" `
                      -secretKey "7U4MhdfjgcAk9niwPgXD81pTYY+fIvVsN3m" `
                      -accessKey "AKIAVY29QTUTKPJC3R5K" `
                      -updateIfExisting
```

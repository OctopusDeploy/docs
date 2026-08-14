---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Create AWS account command
description: New-OctopusAwsAccount allows you to create an AWS account in Octopus from within a running deployment
navOrder: 10
---

## AWS account

Command: ***New-OctopusAwsAccount***

***New-OctopusAwsAccount** allows you to create an AWS account in Octopus from within a running deployment*

| Parameters                    | Value                                                                                                      |
|-------------------------------|------------------------------------------------------------------------------------------------------------|
| `-name`                       | Name for the AWS account                                                                                   |
| `-secretKey`                  | The AWS secret key to use when authenticating against Amazon Web Services.                                 |
| `-accessKey`                  | The AWS access key to use when authenticating against Amazon Web Services.                                 |
| `-updateIfExisting`           | Will update an existing account with the same name, create if it doesn't exist                             |

Example:

```powershell
New-OctopusAwsAccount -name "My AWS Account" `
                      -secretKey "YOUR-SECRET-KEY" `
                      -accessKey "AKIAVY29QTUTKPJC3R5K" `
                      -updateIfExisting
```

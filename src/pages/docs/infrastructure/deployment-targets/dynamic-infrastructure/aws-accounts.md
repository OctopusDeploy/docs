---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-04-08
title: Create AWS account commands
description: New-OctopusAwsAccount and New-OctopusAwsOidcAccount allow you to create AWS accounts in Octopus from within a running deployment
navOrder: 10
---

## AWS account

Command: ***New-OctopusAwsAccount***

***New-OctopusAwsAccount*** *allows you to create an AWS account in Octopus from within a running deployment*

| Parameters          | Value                                                                            |
| ------------------- | -------------------------------------------------------------------------------- |
| `-name`             | Name for the AWS account.                                                        |
| `-secretKey`        | The AWS secret key to use when authenticating against Amazon Web Services.       |
| `-accessKey`        | The AWS access key to use when authenticating against Amazon Web Services.       |
| `-region`           | The AWS region to use for authentication (e.g. `us-east-1`).                     |
| `-updateIfExisting` | Will update an existing account with the same name, create if it doesn't exist.  |

Example:

```powershell
New-OctopusAwsAccount -name "My AWS Account" `
                      -secretKey "7U4MhdfjgcAk9niwPgXD81pTYY+fIvVsN3m" `
                      -accessKey "AKIAVY29QTUTKPJC3R5K" `
                      -region "us-east-1" `
                      -updateIfExisting
```

## AWS OIDC account

Command: ***New-OctopusAwsOidcAccount***

***New-OctopusAwsOidcAccount*** *allows you to create an AWS OIDC account in Octopus from within a running deployment*

| Parameters          | Value                                                                            |
| ------------------- | -------------------------------------------------------------------------------- |
| `-name`             | Name for the AWS OIDC account.                                                   |
| `-roleArn`          | The Amazon Resource Name (ARN) of the role to assume.                            |
| `-sessionDuration`  | The duration of the session in seconds. Defaults to `3600`.                      |
| `-region`           | The AWS region to use for authentication (e.g. `us-east-1`).                     |
| `-updateIfExisting` | Will update an existing account with the same name, create if it doesn't exist.  |

Example:

```powershell
New-OctopusAwsOidcAccount -name "My AWS OIDC Account" `
                          -roleArn "arn:aws:iam::123456789012:role/my-role" `
                          -sessionDuration "3600" `
                          -region "ap-southeast-2" `
                          -updateIfExisting
```

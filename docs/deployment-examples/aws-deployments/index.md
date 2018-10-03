---
title: AWS
description: Octopus Deploy provides first-class support for deploying AWS CloudFormation templates.
position: 20
---

Octopus Deploy provides first-class support for deploying AWS CloudFormation templates and uploading files to s3 buckets.

The `Deploy an AWS CloudFormation Template` step can be used to create or update a CloudFormation stack, while the `Delete an AWS CloudFormation stack` step can be used to delete an existing CloudFormation stack.

:::hint
**Where do AWS Steps execute?**
All AWS steps execute on a worker.  By default, that will be the built-in worker in the Octopus Server. Learn about [workers](/docs/administration/workers/index.md) and the different configuration options.
:::

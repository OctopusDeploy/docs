---
title: Terraform
description: Terraform deployments
position: 150
---
Terraform support was introduced in **Octopus 2018.3**.

Octopus Deploy provides first-class support for deploying Terraform templates.

The `Apply a Terraform template` step can be used to create or update a resources from a Terraform template, while the `Destroy Terraform resources` step can be used to destroy existing Terraform resources.

:::hint
**Where do Terraform Steps execute?**
All Terraform steps execute on a worker.  By default, that will be the built-in worker in the Octopus Server. Learn about [workers](/docs/infrastructure/workers/index.md) and the different configuration options.
:::

:::warning
If the Terraform tool is updated above version 0.11 and you are using the **Source Code** option within a Terraform step, you will receive syntax warnings within Octopus. You can update the Terraform tool to a version higher than 0.11 without issue if you only use the **File inside a package** option within the terraform step.
:::

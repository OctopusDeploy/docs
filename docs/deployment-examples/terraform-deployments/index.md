---
title: Terraform Deployments
description: Terraform Deployments
position: 120
---

Terraform support was introduced to Octopus in version `2018.3`.

Octopus Deploy provides first-class support for deploying Terraform templates.

The `Apply a Terraform template` step can be used to create or update a resources from a Terraform template, while the `Destroy Terraform resources` step can be used to destroy existing Terraform resources.

:::hint
**Where do Terraform Steps execute?**
All Terraform steps execute on a worker.  By default, that will be the built-in worker in the Octopus Server. Learn about [workers](/docs/administration/workers/index.md) and the different configuration options.
:::

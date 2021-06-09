---
title: Terraform
description: Terraform deployments
position: 130
hideInThisSectionHeader: true
---

Octopus Deploy provides first-class support for deploying Terraform templates.

The `Apply a Terraform template` step can be used to create or update a resources from a Terraform template, while the `Destroy Terraform resources` step can be used to destroy existing Terraform resources.

**Where do Terraform Steps execute?**

All Terraform steps execute on a worker. By default, that will be the built-in worker in the Octopus Server. Learn about [workers](/docs/infrastructure/workers/index.md) and the different configuration options.

:::warning
If the Terraform tool is updated above version `0.11`, you are using an Octopus version prior to **2020.5.0**, and you are using the **Source Code** option within a Terraform step, you will receive syntax warnings within Octopus. You can update the Terraform tool to a version higher than `0.11` without issue in an Octopus version prior to **2020.5.0** only if you use the **File inside a package** option within the terraform step.
:::

## Warning messages

The Terraform steps include a number of unique warning messages that may be displayed in the output if there was a warning. Below is a list of these warnings along with any troubleshooting steps that can be taken to rectify them.

### Terraform-Configuration-UntestedTerraformCLIVersion

The Terraform steps in Octopus Deploy are tested against a range of versions of the Terraform CLI from 0.11.15 to 1.0.0. As new versions of Terraform are released testing will be expanded to include these versions to ensure that they are compatible with the Terraform steps in Octopus. In the meantime if the Terraform CLI version used in a step is newer than the tested range a warning will be displayed in the output indicating this. The Terraform step may continue to run successfully even if this warning is present, it is recommended to check the results of your step to ensure that it performs the expected Terraform actions.

## Learn more

- [Manage Terraform with runbooks](/docs/runbooks/runbook-examples/terraform/index.md)

---
title: Terraform
description: Terraform deployments
position: 130
hideInThisSectionHeader: true
---

Octopus Deploy provides first-class support for deploying Terraform templates.

![Octopus Terraform step badges](./images/terraform-step-badges.png)

The `Plan to apply a Terraform template` will generate a plan for the result of running `apply` on a template, while `Plan a Terraform destroy` will generate a plan for the result of running `destroy` on the template.

Similarly, the `Apply a Terraform template` step can be used to create or update a resources from a Terraform template, while the `Destroy Terraform resources` step can be used to destroy existing Terraform resources.

The built-in Octopus Terraform steps are created to help you follow a pipeline using the following process:

- [Preparing your Terraform workspace (backend, remote state, cloud accounts)](./preparing-your-terraform-environment/index.md)
- [Configure your Terraform template](./working-with-built-in-steps/index.md)
- [Run `Terraform Plan` to create an execution plan](./plan-terraform/index.md)
- [Run `Terraform Apply` to process the created execution plan](./apply-terraform-changes/index.md)
- Configure advanced items like [output variables](./terraform-output-variables/index.md) and [the Terraform plugin cache](./plugin-cache/index.md)

**Where do Terraform Steps execute?**

All Terraform steps execute on a worker. By default, that will be the built-in worker in the Octopus Server. Learn about [workers](/docs/infrastructure/workers/index.md) and the different configuration options.

:::warning
If the Terraform tool is updated above version `0.11`, you are using an Octopus version prior to **2020.5.0**, and you are using the **Source Code** option within a Terraform step, you will receive syntax warnings within Octopus. You can update the Terraform tool to a version higher than `0.11` without issue in an Octopus version prior to **2020.5.0** only if you use the **File inside a package** option within the terraform step.
:::

## Special variables

Setting the variable `Octopus.Action.Terraform.CustomTerraformExecutable` to the absolute path of a custom Terraform executable will result in the step using that executable instead of the one shipped with Octopus. You can use this variable to force the Terraform steps to use a specific version of Terraform, or to use the x64 version if you wish.

For example, setting `Octopus.Action.Terraform.CustomTerraformExecutable` to `C:\Apps\terraform.exe` will cause the steps to execute `C:\Apps\terraform.exe` rather than the built in copy of Terraform.

Setting the `Octopus.Action.Terraform.AttachLogFile` variable to `True` will attach the Terraform log file as an artifact to the step.

## Specific messages

The Terraform steps have some unique messages that may be displayed in the output if there is something important to note as part of deployment. Below is a list of these messages.

### Terraform-Configuration-UntestedTerraformCLIVersion

The Terraform steps in Octopus Deploy are tested against a range of versions of the Terraform CLI from 0.11.15 to 1.0.0. As new versions of Terraform are released, testing will be expanded to include these versions to ensure that they are compatible with the Terraform steps in Octopus. In the meantime, if the Terraform CLI version used in a step is outside the tested range a message will be displayed in the output indicating this. The Terraform step will likely continue to run successfully even if the CLI version being used has not been tested in Octopus. If the step succeeds, then the message will be informational only, and there is no action that needs to be taken. If the step resulted in an error, then the message will be a warning; however, the error may not be related to the version of Terraform being used.

## Learn more

- [Manage Terraform with runbooks](/docs/runbooks/runbook-examples/terraform/index.md)

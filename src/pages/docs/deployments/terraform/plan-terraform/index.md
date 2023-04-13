---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Planning changes made by Terraform templates
description: Planning changes made by applying or destroying Terraform templates
navOrder: 30
---

The Terraform [plan command](https://www.terraform.io/cli/commands/plan) is used to identify changes that would be executed if a template was applied or destroyed. This information is useful to confirm the intended changes before they are executed.

Octopus has two steps that generate plan information: 
- `Plan to apply a Terraform template` and 
- `Plan a Terraform destroy`

As their names suggest, the `Plan to apply a Terraform template` step will generate a plan for the result of running `apply` on the template, while the `Plan a Terraform destroy` step will generate a plan for the result of running `destroy` on the template.

![Octopus Steps](/docs/deployments/terraform/plan-terraform/images/octopus-terraform-plan-step.png "width=500")

## Step options

The planning steps offer the [same base configuration as the other built-in Terraform steps](/docs/deployments/terraform/working-with-built-in-steps/). You can refer to the documentation for those steps for more details on the options for the plan steps.

:::warning
The plan steps do not support saving the plan to a file and applying that file at a later date. This means the plan information only makes sense when the same values are used in the plan and apply/destroy steps. Configuring shared variables for the step fields ensures that the same values will be used.
:::

## Plan output format

Terraform planning steps can output the plan details in either plain text or JSON.

### Plain text output

When a plan steps is run, the output will include a line that looks like this:

```
Saving variable "Octopus.Action[Plan Apply].Output.TerraformPlanOutput" with the details of the plan
```

This log message indicates the output variable that was created with the plan text (the name of the step, `Plan Apply` in this case, will reflect the name you assigned to the plan step).

### JSON output

Selecting the **JSON output** option configures Terraform to generate JSON output for any planning steps. Each JSON blob is captured in a variable like `Octopus.Action[Plan Apply].Output.TerraformPlanLine[#].JSON`, with `#` replaced by a number.

This variable format can be used with Octostache loops:

```powershell
#{each output in Octopus.Action[Plan Apply].Output.TerraformPlanLine}
Write-Host 'JSON Output line #{output}: #{output.JSON}'
#{/each}
```

The resource change counts are captured in the following variables:

* `Octopus.Action[Plan Apply].Output.TerraformPlanJsonAdd`
* `Octopus.Action[Plan Apply].Output.TerraformPlanJsonRemove`
* `Octopus.Action[Plan Apply].Output.TerraformPlanJsonChange`

## Manual intervention

Typically the result of a plan will be displayed in a Manual Intervention step. Because the plan text can contain markdown characters, the variable should be wrapped up in back ticks to display it verbatim.

````
```
#{Octopus.Action[Plan Apply].Output.TerraformPlanOutput}
```
````

![Terraform manual intervention](/docs/deployments/terraform/plan-terraform/images/terraform-manual-intervention.png "width=500")

When run as part of a deployment, the plan output will be displayed like the image below.

![Manual Intervention Message](/docs/deployments/terraform/plan-terraform/images/manual-intervention-message.png "width=500")

## Advanced options section

You can optionally control how Terraform downloads plugins and where the plugins will be located in the `Advanced Options` section.

- The `Terraform workspace` field can optionally be set to the desired workspace. If the workspace does not exist it will be created and selected, and if it does it exist it will be selected.

- The `Terraform plugin cache directory` can be optional set to a directory where Terraform will look for existing plugins, and optionally download new plugins into. By default this directory is not shared between targets, so additional plugins have to be downloaded by all targets. By setting this value to a shared location, the plugins can be downloaded once and shared amongst all targets.

- The `Allow additional plugin downloads` option can be checked to allow Terraform to download missing plugins, and unchecked to prevent these downloads.

- The `Custom terraform init parameters` option can be optionally set to include any parameters to pass to the `terraform init` action.

- The `Custom terraform plan parameters` option can be optionally set to include any parameters to pass to the `terraform plan` action.

![Terraform Advanced Options](/docs/deployments/terraform/images/terraform-advanced.png "width=500")

---
title: Apply a Terraform template
description: Apply a Terraform template.
---

Octopus supports the deployment of Terraform templates through the `Apply a Terraform template` step. This step executes a Terraform template, optionally using AWS credentials managed by Octopus, and captures the Terraform output variables as Octopus output variables.

These instructions can be followed to configure the `Apply a Terraform template` step, which can be found by navigating to your project and clicking **{{Process, Add Step}}** and selecting the `Apply a Terraform template` step.

## Terraform backends

Neither Octopus nor Terraform will generate errors if a [remote backend](/docs/deployments/terraform/remote-state/index.md) is not configured, most attempts to update or delete existing resources will not work as expected without a remote backend. We therefore recommend using a remote backend when using terraform with Octopus. You can learn more about storing state remotely [here](/docs/deployments/terraform/remote-state/index.md) and more general information
regarding backends in the [Terraform documentation](https://www.terraform.io/docs/backends/index.html).

!include <aws-account>

!include <azure-account>

!include <google-cloud-account>

## Template section

The Terraform template can come from two sources: directly entered source code or from files in a package.

### Source code

The first option is to paste the template directly into the step. This is done by selecting the `Source code` option, and clicking the `ADD SOURCE CODE` button.

![Source Code](images/step-aws-sourcecode.png "width=500")

This will present a dialog in which the Terraform template can be pasted, in either JSON or HCL.

![Source Code Dialog](images/step-aws-code-dialog.png "width=500")

Once the `OK` button is clicked, the input variables defined in the template will be shown under the `Variables` section.

![Parameters](images/step-parameters.png "width=500")

Terraform variables are either strings, lists or maps.

Strings (including numbers and `true`/`false`) are supplied without quotes. For example `my string`, `true` or `3.1415`.

Lists and maps are supplied as raw HCL or JSON structures, depending on the format of the template. For example, if the template is written in HCL, a list variable would be provided as `["item1", {item2="embedded map"}]` and a map variable would be provided as `{item1="hi", item2="there"}`. If the template is written is JSON, a list variable would be provided as `["item1", {"item2": "embedded map" }]` and a map variable would be provided as `{"item1": "hi", "item2": "there"}`.

### Package

The second option is to use the files contained in a package. This is done by selecting the `File inside a package` option, and specifying the package.

The contents of the package will be extracted, and Terraform will automatically detect the files to use. See the [Terraform documentation](https://www.terraform.io/docs/configuration/load.html) for more details on the file load order.

You can optional run Terraform from a subdirectory in the package by specifying the path in the `Terraform template directory` field. The path must be relative (i.e. without a leading slash). If your package has the Terraform templates in the root folder, leave this field blank.

:::hint
Given that Terraform templates and variable files are plain text, you may find it convenient to use the GitHub Repository Feed to provide the packages used by Terraform steps. Using GitHub releases means you do not have to manually create and upload a package, and can instead tag a release and download it directly from GitHub.
:::

![Package](images/step-aws-package.png "width=500")

### Variable replacements

Variable replacement is performed before the template is applied or destroyed when defined in either an inline script or a package.

When deploying a template from a package, all `*.tf`, `*.tfvar`, `*.tf.json` and `*.tfvar.json` files will have variable substitution applied to them. You can also have variable substitution applied to additional files by defining the file names in the `Target files` field.

For example, if you were deploying from a package and your template file looked like this:

```json
provider "aws" { }

resource "aws_instance" "example" {
  ami           = "#{AMI}"
  instance_type = "m3.medium"
  tags {
    Name = "My EC2 Instance"
  }
}
```

Then the value from the project variable `AMI` would be substituted for the marker `#{AMI}`.

When applying an inline template, the variable fields can also include replacement markers. For example, if a map variable for a HCL template was defined as `{"key" = "value", #{MapValues}}` and the Octopus project had a variable called `MapValues` defined as `"key2" = "value2"`, then the final variable would resolve to `{"key" = "value", "key2" = "value2"}`.

See the [variable substitution](/docs/projects/variables/variable-substitutions.md) documentation for more information.

### Additional variable files

The `Additional variable files` option contains a new-line separated list of variable files to use with the deployment. All files called `terraform.tfvars`, `terraform.tfvars.json`, `*.auto.tfvars` and `*.auto.tfvars.json` are automatically loaded by Terraform, and do not need to be listed here. However you may want to reference environment specific variable files by referencing them with files names built around variable substitution such as `#{Octopus.Environment.Name}.tfvars`.

Each line entered into this field will be passed to Terraform as `-var-file '<filename>'`.

## Advanced options section

You can optionally control how Terraform downloads plugins and where the plugins will be located in the `Advanced Options` section.

The `Terraform workspace` field can optionally be set to the desired workspace. If the workspace does not exist it will be created and selected, and if it does it exist it will be selected.

The `Terraform plugin cache directory` can be optional set to a directory where Terraform will look for existing plugins, and optionally download new plugins into. By default this directory is not shared between targets, so additional plugins have to be downloaded by all targets. By setting this value to a shared location, the plugins can be downloaded once and shared amongst all targets.

The `Allow additional plugin downloads` option can be checked to allow Terraform to download missing plugins, and unchecked to prevent these downloads.

The `Custom terraform init parameters` option can be optionally set to include any parameters to pass to the `terraform init` action.

The `Custom terraform apply parameters` option can be optionally set to include any parameters to pass to the `terraform apply` action.

![Terraform Advanced Options](images/terraform-advanced.png "width=500")

## Output variables

Terraform's output variables are captured as Octopus variables after a template is applied. Each output variable is captured in two different formats: the JSON representation of the variable, and the value only of the variable.

The JSON representation of the output variable is the result of calling `terraform output -json variablename`. For example, the JSON representation of a string output variable (which would appear in the logs as a message similar to `Saving variable "Octopus.Action[Apply Template].Output.TerraformJsonOutputs[test]" with the JSON value of "test"`) would look similar to this:

```json
{
    "sensitive":  false,
    "type":  "string",
    "value":  "hi there"
}
```

While the value only output (which would appear in the logs as a message similar to `Saving variable "Octopus.Action[Apply Template].Output.TerraformValueOutputs[test]" with the value only of "test"`) would look similar to this:

```
"hi there"
```

## Accessing Terraform output variables

Using the previous example output variable called `test` you can access the output using PowerShell as follows:

```
$value = $OctopusParameters["Octopus.Action[Apply Template].Output.TerraformValueOutputs[test]"]

// OR

$value = $OctopusParameters["Octopus.Action[Apply Template].Output.TerraformJsonOutputs[test]"] | ConvertFrom-Json  | select -ExpandProperty value
```

The syntax for accessing JSON variables as covered by our [documentation here](/docs/projects/variables/variable-substitutions.md#VariableSubstitutionSyntax-JSONParsingjson) applies to both `TerraformJsonOutputs` as well as `TerraformValueOutputs`. However the latter is less useful as it can also be a primitive value. In this case Octostache won't know that it should deserialize the value and will provide you with a JSON encoded result. It is therefore recommended to prefer `TerraformJsonOutputs` where possible. The following syntax can be used to access the value using the binding syntax:

```
#{Octopus.Action[Apply Template].Output.TerraformJsonOutputs[test].value}
```

### Special variables

Setting the variable `Octopus.Action.Terraform.CustomTerraformExecutable` to the absolute path of a custom Terraform executable will result in the step using that executable instead of the one shipped with Octopus. You can use this variable to force the Terraform steps to use a specific version of Terraform, or to use the x64 version if you wish.

For example, setting `Octopus.Action.Terraform.CustomTerraformExecutable` to `C:\Apps\terraform.exe` will cause the steps to execute `C:\Apps\terraform.exe` rather than the built in copy of Terraform.

Setting the `Octopus.Action.Terraform.AttachLogFile` variable to `True` will attach the Terraform log file as an artifact to the step.

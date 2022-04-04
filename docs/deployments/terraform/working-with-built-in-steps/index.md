---
title: Terraform step configuration
description: Configuring common Terraform options using the Octopus built in steps 
position: 20
---

Octopus provides four built-in step templates for managing and interacting with your Terraform code: 
- `Apply a Terraform template`
- `Destroy Terraform resources`
- `Plan to apply a Terraform template` 
- `Plan a Terraform destroy`

![Built-in Terraform step badges](images/terraform-step-badges.png "width=500")

All four of the built-in Terraform steps provide common configuration points you can use to control how the steps execute your Terraform code.

:::hint
While these are the options common to each step, there are additional ways to interact and extend these steps, specifically using [Terraform plan outputs](/docs/deployments/terraform/plan-terraform/index.md#plan-output-format) and [Terraform output variables](/docs/deployments/terraform/terraform-output-variables/index.md)
:::

## Managed Accounts

You can optionally prepare the environment that Terraform runs in using the details defined in accounts managed by Octopus. If an account is selected then those credentials do not need to be included in the Terraform template.

:::hint
Using credentials managed by Octopus is optional, and credentials defined in the Terraform template take precedence over any credentials defined in the step. You can learn more about creating managed cloud accounts using Octopus [here](/docs/infrastructure/accounts/index.md).
:::

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

You can optionally run Terraform from a subdirectory in the package by specifying the path in the `Terraform template directory` field. The path must be relative (i.e. without a leading slash). If your package has the Terraform templates in the root folder, leave this field blank.

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
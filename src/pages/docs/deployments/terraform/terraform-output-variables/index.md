---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Terraform output variables
description: Instructions on accessing and utilizing Terraform output variables
navOrder: 50
---

Terraform supports [output values](https://www.terraform.io/language/values/outputs), which are useful for providing relevant information about your infrastructure configuration both to other Terraform resources as well as administrators. Octopus supports these output values natively through output variables in your deployment process.

## Output variable handling

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

```text
"hi there"
```

## Accessing Terraform output variables

Using the previous example output variable called `test` you can access the output using PowerShell as follows:

```ps
$value = $OctopusParameters["Octopus.Action[Apply Template].Output.TerraformValueOutputs[test]"]

// OR

$value = $OctopusParameters["Octopus.Action[Apply Template].Output.TerraformJsonOutputs[test]"] | ConvertFrom-Json  | select -ExpandProperty value
```

The syntax for accessing JSON variables as covered by our [documentation here](/docs/projects/variables/variable-substitutions.md#VariableSubstitutionSyntax-JSONParsingjson) applies to both `TerraformJsonOutputs` as well as `TerraformValueOutputs`. However the latter is less useful as it can also be a primitive value. In this case Octostache won't know that it should deserialize the value and will provide you with a JSON encoded result. It is therefore recommended to prefer `TerraformJsonOutputs` where possible. The following syntax can be used to access the value using the binding syntax:

```text
#{Octopus.Action[Apply Template].Output.TerraformJsonOutputs[test].value}
```
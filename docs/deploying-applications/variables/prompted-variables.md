---
title: Prompted variables
position: 3
---

Sometimes you may not want to store the value of a variable inside Octopus (though [Octopus does store variables securely](/docs/deploying-applications/variables/sensitive-variables.md)), or the value of the variable may change for each deployment.

Octopus can handle this using **Prompted variables**.

## Defining a prompted variable {#Promptedvariables-Definingapromptedvariable}

You can configure a variable to be prompted when editing the variable:

![](/docs/images/3048314/3278298.png "width=500")

When defining a prompted variable, you can provide a friendly name and description, and specify if the value is required.

![](/docs/images/3048314/3278299.png "width=500")

Prompted variables will appear with an icon next to the value:

![](/docs/images/3048314/3278300.png "width=500")

## Providing a value for the variable {#Promptedvariables-Providingavalueforthevariable}

When deploying (not creating a release), you'll be prompted to provide a value for the variable:

![](/docs/images/3048314/3278301.png "width=500")

Prompted variables can also be provided when using the [command-line Octo.exe tool to deploy releases](/docs/api-and-integration/octo.exe-command-line/deploying-releases.md):

```ruby
octo.exe create-release ... --variable "Launch codes:LAUNCH123" --variable "Variable 2:Some value"
```

:::hint
Prompted variables can be combined with [sensitive variables](/docs/deploying-applications/variables/sensitive-variables.md). They will appear with a password box when creating the deployment.
:::

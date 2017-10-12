---
title: Prompted variables
description: Prompted variables allow you to prompt a user to enter a value rather than storing it in Octopus.
position: 3
---

Sometimes you may not want to store the value of a variable inside Octopus (though [Octopus does store variables securely](/docs/deploying-applications/variables/sensitive-variables.md)), or the value of the variable may change for each deployment.

Octopus can handle this using **Prompted variables**.

## Defining a prompted variable {#Promptedvariables-Definingapromptedvariable}

You can configure a variable to be prompted when editing the variable:

![](/docs/images/3048314/3278298.png "width=500")

When defining a prompted variable, you can provide a friendly name and description, and specify if the value is required. A required variable must be supplied when the deployment is created and must not be empty or white space.

![](/docs/images/3048314/3278299.png "width=500")

Prompted variables will appear with an icon next to the value:

![](/docs/images/3048314/3278300.png "width=500")

## Providing a value for the variable {#Promptedvariables-Providingavalueforthevariable}

When deploying (not creating a release), you'll be prompted to provide a value for the variable:

![](/docs/images/3048314/3278301.png "width=500")

A value can also be passed to a prompted variable when using `Octo.exe` through the `--variable` parameter of the [Create-Release](/docs/api-and-integration/octo.exe-command-line/creating-releases.md) or [Deploy-Release](/docs/api-and-integration/octo.exe-command-line/deploying-releases.md) commands

```ruby
octo.exe create-release ... --variable "Missile launch code:LAUNCH123" --variable "Variable 2:Some value"
```

:::hint
Prompted variables can be combined with [sensitive variables](/docs/deploying-applications/variables/sensitive-variables.md). They will appear with a password box when creating the deployment.
:::

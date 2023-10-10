---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Output variables
description: Your scripts can emit variables that are available in subsequent deployment steps.
navOrder: 70
---

Your scripts can emit variables that are available in subsequent deployment steps. This means you can factor your deployment into smaller, more well-defined steps that leverage the result of prior steps. It is an extremely powerful feature and you should refer to the documentation on [output variables](/docs/projects/variables/output-variables) for more information.

This example is from the sample project in the [Channels Walk-through](https://octopus.com/blog/channels-walkthrough#prerequisites).

Step 1 calculates a name by convention, which is used by subsequent steps.

:::figure
![Deployment Process](/docs/deployments/custom-scripts/images/deployment-process.png)
:::

## Creating an output variable

<details data-group="creating-an-output-variable">
<summary>PowerShell</summary>

```powershell
Set-OctopusVariable -name "AppInstanceName" -value "MyAppInstance"
```

</details>
<details data-group="creating-an-output-variable">
<summary>C#</summary>

```csharp
SetVariable("AppInstanceName", "MyAppInstance");
```

</details>
<details data-group="creating-an-output-variable">
<summary>Bash</summary>

```bash
set_octopusvariable "AppInstanceName" "MyAppInstance"
```

</details>
<details data-group="creating-an-output-variable">
<summary>F#</summary>

```fsharp
Octopus.setVariable "AppInstanceName" "MyAppInstance"
```

</details>
<details data-group="creating-an-output-variable">
<summary>Python3</summary>

```python
set_octopusvariable("AppInstanceName", "MyAppInstance")
```

</details>

## Using the variable in another step

<details data-group="using-variable-in-another-step">
<summary>PowerShell</summary>

```powershell
$appInstanceName = $OctopusParameters["Octopus.Action[Determine App Instance Name].Output.AppInstanceName"]
```

</details>
<details data-group="using-variable-in-another-step">
<summary>C#</summary>

```csharp
var appInstanceName = OctopusParameters["Octopus.Action[Determine App Instance Name].Output.AppInstanceName"]
```

</details>
<details data-group="using-variable-in-another-step">
<summary>Bash</summary>

```bash
appInstanceName=$(get_octopusvariable "Octopus.Action[Determine App Instance Name].Output.AppInstanceName")
```

</details>
<details data-group="using-variable-in-another-step">
<summary>F#</summary>

```fsharp
//throw if not found
let appInstanceName1 = Octopus.findVariable "Octopus.Action[Determine App Instance Name].Output.AppInstanceName"

//supply a default value to use if not found
let appInstanceName2 = Octopus.findVariableOrDefault "Value if not found" "Octopus.Action[Determine App Instance Name].Output.AppInstanceName"

//return an Option type
let appInstanceName3 = Octopus.tryFindVariable "Octopus.Action[Determine App Instance Name].Output.AppInstanceName"
```

</details>
<details data-group="using-variable-in-another-step">
<summary>Python3</summary>

```python Python3
appInstanceName = get_octopusvariable("Octopus.Action[Determine App Instance Name].Output.AppInstanceName")
```

</details>

## Service message

The following service message can be written directly (substituting the properties with the relevant values) to standard output which will be parsed by the server and the values processed as an output variable. Note that the properties must be supplied as a base64 encoded UTF-8 string.
```
##octopus[setVariable name='<Base64Encoded-VariableName>' value='<Base64Encoded-VariableValue>']
```

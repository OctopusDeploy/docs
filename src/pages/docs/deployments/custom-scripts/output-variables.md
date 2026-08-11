---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-08-11
title: Output variables
description: Your scripts can emit variables that are available in subsequent deployment steps.
icon: fa-solid fa-file-export
navOrder: 70
---

Your scripts can emit variables that are available in subsequent deployment steps. This means you can factor your deployment into smaller, more well-defined steps that leverage the result of prior steps. It is an extremely powerful feature and you should refer to the documentation on [output variables](/docs/projects/variables/output-variables) for more information.

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
<summary>Python3</summary>

```python
appInstanceName = get_octopusvariable("Octopus.Action[Determine App Instance Name].Output.AppInstanceName")
```

</details>

## Service message

The following service message can be written directly (substituting the properties with the relevant values) to standard output which will be parsed by the server and the values processed as an output variable. Note that the properties must be supplied as a base64 encoded UTF-8 string.

```text Write an output variable from standard output
##octopus[setVariable name='<Base64Encoded-VariableName>' value='<Base64Encoded-VariableValue>']
```

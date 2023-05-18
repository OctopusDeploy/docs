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
![Deployment Process](/docs/deployments/custom-scripts/images/deployment-process.png "width=500")
:::

## Creating an output variable
```powershell PowerShell
Set-OctopusVariable -name "AppInstanceName" -value "MyAppInstance"
```

```csharp C#
Octopus.SetVariable("AppInstanceName", "MyAppInstance");
```

```bash Bash
set_octopusvariable "AppInstanceName" "MyAppInstance"
```

```fsharp F#
Octopus.setVariable "AppInstanceName" "MyAppInstance"
```

```python Python3
set_octopusvariable("AppInstanceName", "MyAppInstance")
```

## Using the variable in another step

```powershell PowerShell
$appInstanceName = $OctopusParameters["Octopus.Action[Determine App Instance Name].Output.AppInstanceName"]
```

```csharp C#
var appInstanceName = Octopus.Parameters["Octopus.Action[Determine App Instance Name].Output.AppInstanceName"]
```

```bash Bash
appInstanceName=$(get_octopusvariable "Octopus.Action[Determine App Instance Name].Output.AppInstanceName")
```

```fsharp F#
//throw if not found
let appInstanceName1 = Octopus.findVariable "Octopus.Action[Determine App Instance Name].Output.AppInstanceName"

//supply a default value to use if not found
let appInstanceName2 = Octopus.findVariableOrDefault "Value if not found" "Octopus.Action[Determine App Instance Name].Output.AppInstanceName"

//return an Option type
let appInstanceName3 = Octopus.tryFindVariable "Octopus.Action[Determine App Instance Name].Output.AppInstanceName"
```

```python Python3
appInstanceName = get_octopusvariable("Octopus.Action[Determine App Instance Name].Output.AppInstanceName")
```

## Service message

The following service message can be written directly (substituting the properties with the relevant values) to standard output which will be parsed by the server and the values processed as an output variable. Note that the properties must be supplied as a base64 encoded UTF-8 string.
```
##octopus[setVariable name='<Base64Encoded-VariableName>' value='<Base64Encoded-VariableValue>']
```

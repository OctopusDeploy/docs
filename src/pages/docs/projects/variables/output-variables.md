---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Output variables
description: Output variables allow you to set dynamic variables in one step that can be used in subsequent steps.
navOrder: 30
---

As you work with [variables](/docs/projects/variables) in Octopus, there will be times when you want to use dynamic variables, for example, the value of a variable is the result of a calculation, or the output from running a command. For these scenarios, Octopus supports **output variables**.

Output variables can be set anywhere that Octopus runs scripts - for example, the [Script Console](/docs/administration/managing-infrastructure/script-console/), or [package scripts and script steps](/docs/deployments/custom-scripts) in a deployment. *See below for examples of setting output variables in each of the different scripting languages supported by Octopus.*

For example, you might have a standalone [PowerShell script step](/docs/deployments/custom-scripts) called **StepA** that does something like this:

<details data-group="output-variables">
<summary>PowerShell</summary>

```powershell
Set-OctopusVariable -name "TestResult" -value "Passed"
```

</details>
<details data-group="output-variables">
<summary>C#</summary>

```csharp
Octopus.SetVariable("TestResult", "Passed");
```

</details>
<details data-group="output-variables">
<summary>Bash</summary>

```bash
set_octopusvariable "TestResult" "Passed"
```

</details>
<details data-group="output-variables">
<summary>F#</summary>

```fsharp
Octopus.setVariable "TestResult" "Passed"
```

</details>
<details data-group="output-variables">
<summary>Python3</summary>

```python
set_octopusvariable("TestResult", "Passed")
```

</details>

You can then use the variable from other steps, either in [variable binding syntax](/docs/projects/variables/variable-substitutions):

```powershell
#{Octopus.Action[StepA].Output.TestResult}
```

Or other scripts:

<details data-group="output-variables-use-in-other-steps">
<summary>PowerShell</summary>

```powershell
$TestResult  = $OctopusParameters["Octopus.Action[StepA].Output.TestResult"]
```

</details>
<details data-group="output-variables-use-in-other-steps">
<summary>C#</summary>

```csharp
var testResult = Octopus.Parameters["Octopus.Action[StepA].Output.TestResult"]
```

</details>
<details data-group="output-variables-use-in-other-steps">
<summary>Bash</summary>

```bash
testResult=$(get_octopusvariable "Octopus.Action[StepA].Output.TestResult")
```

</details>
<details data-group="output-variables-use-in-other-steps">
<summary>F#</summary>

```fsharp
let testResult = Octopus.findVariable "Octopus.Action[StepA].Output.TestResult"
```

</details>
<details data-group="output-variables-use-in-other-steps">
<summary>Python3</summary>

```python
testResult = get_octopusvariable("Octopus.Action[StepA].Output.TestResult")
```

</details>

## Sensitive output variables

<details data-group="sensitive-output-variables">
<summary>PowerShell</summary>

```powershell PowerShell
Set-OctopusVariable -name "Password" -value "correct horse battery staple" -sensitive
```

</details>
<details data-group="sensitive-output-variables">
<summary>C#</summary>

```csharp
Octopus.SetVariable("Password", "correct horse battery staple", true);
```

</details>
<details data-group="sensitive-output-variables">
<summary>Bash</summary>

```bash
set_octopusvariable "Password" "correct horse battery staple" -sensitive
```

</details>
<details data-group="sensitive-output-variables">
<summary>F#</summary>

```fsharp
Octopus.setSensitiveVariable "Password" "correct horse battery staple"
```

</details>
<details data-group="sensitive-output-variables">
<summary>Python3</summary>

```python
set_octopusvariable("Password", "correct horse battery staple", True)
```

</details>

## System output variables {#Outputvariables-Systemoutputvariables}

After a step runs, Octopus captures the output variables, and keeps them for use in subsequent steps. In addition to variables that you create yourself using `Set-OctopusVariable`, Octopus also makes a number of built-in variables available. Here are some examples of commonly used built-in output variables:

- For NuGet package steps:
  - `Octopus.Action[StepName].Output.Package.InstallationDirectoryPath` - the path that the package was deployed to
- For manual intervention steps:
  - `Octopus.Action[StepName].Output.Manual.Notes` - notes entered in response to the manual step
  - `Octopus.Action[StepName].Output.Manual.ResponsibleUser.Id`
  - `Octopus.Action[StepName].Output.Manual.ResponsibleUser.Username`
  - `Octopus.Action[StepName].Output.Manual.ResponsibleUser.DisplayName`
  - `Octopus.Action[StepName].Output.Manual.ResponsibleUser.EmailAddress`

## Output from multiple deployment targets {#Outputvariables-Outputfrommultiplemachines}

Output variables become more complex when multiple deployment targets are involved, but they can still be used.

Imagine that an output variable was set by a script which ran on two deployment targets (Web01 and Web02) in parallel, and that both set it to a different value. Which value should be used in subsequent steps?

In this scenario, the following output variables would be captured:

| Name                                     | Value    | Scope          |
| ---------------------------------------- | -------- | -------------- |
| `Octopus.Action[StepA].Output[Web01].TestResult` | `Passed` |                |
| `Octopus.Action[StepA].Output[Web02].TestResult` | `Failed` |                |
| `Octopus.Action[StepA].Output.TestResult` | `Passed` | Deployment Target: Web01 |
| `Octopus.Action[StepA].Output.TestResult` | `Failed` | Deployment Target: Web02 |
| `Octopus.Action[StepA].Output.TestResult` | `Passed` |                |
| `Octopus.Action[StepA].Output.TestResult` | `Failed` |                |

Note that for each output variable/deployment target combination:

- A variable is created with the deployment target name contained in the variable name: this allows you to reference output variables from set by one deployment target from another deployment target.
- A variable is created that is [scoped](/docs/projects/variables/#scoping-variables) to the deployment target. This way Web01 will always get the value Web01 set, and Web02 will get the value Web02 set.
- A variable is created with no scope, and no differentiator in the name. When referencing this value, the result will be indeterministic, but it allows scripts to use the value without knowing which deployment target set it.

For some practical examples of using output variables, and how scoping rules are applied, see the following blog posts:

- [Fun with output variables](https://octopus.com/blog/fun-with-output-variables)
- [Changing website ports using output variables](http://octopus.com/blog/changing-website-port-on-each-deployment)

## Output from deploy a release steps {#Outputvariables-Outputfromdeployareleasesteps}

Output variables from deployments triggered by a _Deploy a Release_ step are captured and exposed as output variables on the _Deploy a Release_ step.

To get the value of an output variable from a _Deploy a Release_ step, use the `Output.Deployment` variable on the _Deploy a Release_ step. For example, if your _Deploy a Release_ step is named "Deploy Web Project", the target step in the child project is named "Update IP Address", and the variable name is "IPAddress", you would use the following variable to access it in the parent project: `Octopus.Action[Deploy Web Project].Output.Deployment[Update IP Address].IPAddress`.

## Setting output variables using scripts {#Outputvariables-Settingoutputvariablesusingscripts}

You can set output variables using any of the scripting languages supported by Octopus. In each case we make special functions available to your scripts by bootstrapping them with a template defined in the [open-source Calamari project](https://github.com/OctopusDeploy/Calamari).

### PowerShell {#Outputvariables-PowerShell}

[PowerShell Bootstrapping](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari.Common/Features/Scripting/WindowsPowerShell/)

From a PowerShell script, you can use the PowerShell CmdLet `Set-OctopusVariable` to set the name and value of an output variable. The CmdLet takes two parameters:

- `[string]$name` - the name you want to give the output variable following the same naming conventions used for input [variables](/docs/projects/variables).
- `[string]$value` - the value you want to give the output variable.

For example:

**PowerShell**

```powershell
Set-OctopusVariable -name "TestResult" -value "Passed"
```

### C# {#Outputvariables-C#}

[ScriptCS Bootstrapping](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari.Common/Features/Scripting/ScriptCS)

From a C# script, you can use the `public static void SetVariable(string name, string value)` method to set the name and value of an output variable.

**C#**

```csharp
Octopus.SetVariable("TestResult", "Passed");
```

### Bash {#Outputvariables-Bash}

[Bash Bootstrapping](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari.Common/Features/Scripting/Bash)

In a Bash script you can use the `set_octopusvariable` function to set the name and value of an output variable. This function takes two positional parameters with the same purpose as the PowerShell CmdLet.

**Bash**

```bash
set_octopusvariable "TestResult" "Passed"
```

### F# {#Outputvariables-F#}

[FSharp Bootstrapping](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari.Common/Features/Scripting/FSharp)

From a F# script, you can use the `setVariable : name:string -> value:string -> unit` function to collect artifacts. The function takes two parameters with the same purpose as the PowerShell CmdLet.

**F#**

```fsharp
Octopus.setVariable "TestResult" "Passed"
```

**Python3**

```python Python3
set_octopusvariable("TestResult", "Passed")
```

## Best practice

If you have multiple steps which depend on an output variable created by a previous step in your deployment process, it can be cumbersome to need to use the full variable name everywhere, e.g. `Octopus.Action[StepA].Output.TestResult`. 

A useful pattern is to create a project variable which evaluates to the output variable, e.g.

| Variable name                                     | Value    |
| ---------------------------------------- | -------- |
| `TestResult` | `#{Octopus.Action[StepA].Output.TestResult}` |

This allows using `TestResult` as the variable name in dependent steps, rather than the full output variable name.  In the case of the step name changing (e.g. `StepA` -> `StepX`), this also reduces the amount of places the step name in the output variable expression needs to be changed. 

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
---
title: Output Variables
description: Output variables allow you to set dynamic variables in one step that can be used in subsequent steps.
position: 15
---

As you work with [variables](/docs/deployment-process/variables/index.md) in Octopus, there will be times when you want to use dynamic variables, for example, the value of a variable is the result of a calculation, or the output from running a command. For these scenarios, Octopus supports **output variables**.

Output variables can be set anywhere that Octopus runs scripts - for example, the [Script Console](/docs/administration/script-console.md), or [package scripts and script steps](/docs/deployment-examples/custom-scripts/index.md) in a deployment. *See below for examples of setting output variables in each of the different scripting languages supported by Octopus.*

For example, you might have a standalone [PowerShell script step](/docs/deployment-examples/custom-scripts/index.md) called **StepA** that does something like this:

```powershell PowerShell
Set-OctopusVariable -name "TestResult" -value "Passed"
```

```c# C#
Octopus.SetVariable("TestResult", "Passed");
```

```bash Bash
set_octopusvariable "TestResult" "Passed"
```

```fsharp F#
Octopus.setVariable "TestResult" "Passed"
```

You can then use the variable from other steps, either in [variable binding syntax](/docs/deployment-process/variables/binding-syntax.md):

```powershell
#{Octopus.Action[StepA].Output.TestResult}
```

Or other scripts:

```powershell PowerShell
$TestResult  = $OctopusParameters["Octopus.Action[StepA].Output.TestResult"]
```

```c# C#
var testResult = Octopus.Parameters["Octopus.Action[StepA].Output.TestResult"]
```

```bash Bash
testResult = $(get_octopusvariable "Octopus.Action[StepA].Output.TestResult")
```

```fsharp F#
let testResult = Octopus.findVariable "Octopus.Action[StepA].Output.TestResult"
```

## Sensitive Output Variables

Output variables can be created as sensitive (since **Octopus 2018.5.2**).

```powershell PowerShell
Set-OctopusVariable -name "Password" -value "correct horse battery staple" -sensitive
```

```c# C#
Octopus.SetVariable("Password", "correct horse battery staple", true);
```

```bash Bash
set_octopusvariable "Password" "correct horse battery staple" -sensitive
```

```fsharp F#
Octopus.setSensitiveVariable "Password" "correct horse battery staple"
```


## System Output Variables {#Outputvariables-Systemoutputvariables}

After a step runs, Octopus captures the output variables, and keeps them for use in subsequent steps. In addition to variables that you create yourself using `Set-OctopusVariable`, Octopus also makes a number of built-in variables available. Here are some examples of commonly used built-in output variables:

- For NuGet package steps:
  - `Octopus.Action[StepName].Output.Package.InstallationDirectoryPath` - the path that the package was deployed to
- For manual intervention steps:
  - `Octopus.Action[StepName].Output.Manual.Notes` - notes entered in response to the manual step
  - `Octopus.Action[StepName].Output.Manual.ResponsibleUser.Id`
  - `Octopus.Action[StepName].Output.Manual.ResponsibleUser.Username`
  - `Octopus.Action[StepName].Output.Manual.ResponsibleUser.DisplayName`
  - `Octopus.Action[StepName].Output.Manual.ResponsibleUser.EmailAddress`

## Output From Multiple Deployment Targets {#Outputvariables-Outputfrommultiplemachines}

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
- A variable is created that is [scoped](/docs/deployment-process/variables/scoping-variables.md) to the deployment target. This way Web01 will always get the value Web01 set, and Web02 will get the value Web02 set.
- A variable is created with no scope, and no differentiator in the name. When referencing this value, the result will be indeterministic, but it allows scripts to use the value without knowing which deployment target set it.

For some practical examples of using output variables, and how scoping rules are applied, see the following blog posts:

- [Fun with output variables](https://octopus.com/blog/fun-with-output-variables)
- [Changing website ports using output variables](http://octopus.com/blog/changing-website-port-on-each-deployment)

## Setting Output Variables Using Scripts {#Outputvariables-Settingoutputvariablesusingscripts}

You can set output variables using any of the scripting languages supported by Octopus. In each case we make special functions available to your scripts by bootstrapping them with a template defined in the [open-source Calamari project](https://github.com/OctopusDeploy/Calamari).

### PowerShell {#Outputvariables-PowerShell}

[PowerShell Bootstrapping](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari.Shared/Integration/Scripting/WindowsPowerShell)

From a PowerShell script, you can use the PowerShell CmdLet `Set-OctopusVariable` to set the name and value of an output variable. The CmdLet takes two parameters:

- `[string]$name` - the name you want to give the output variable following the same naming conventions used for input [variables](/docs/deployment-process/variables/index.md).
- `[string]$value` - the value you want to give the output variable.

For example:

**PowerShell**

```powershell
Set-OctopusVariable -name "TestResult" -value "Passed"
```

### C# {#Outputvariables-C#}

[ScriptCS Bootstrapping](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari/Integration/Scripting/ScriptCS)

From a C# script, you can use the `public static void SetVariable(string name, string value)` method to set the name and value of an output variable.

**C#**

```c#
Octopus.SetVariable("TestResult", "Passed");
```

### Bash {#Outputvariables-Bash}

[Bash Bootstrapping](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari/Integration/Scripting/Bash)

In a Bash script you can use the `set_octopusvariable` function to set the name and value of an output variable. This function takes two positional parameters with the same purpose as the PowerShell CmdLet.

**Bash**

```bash
set_octopusvariable "TestResult" "Passed"
```

### F# {#Outputvariables-F#}

:::success
F# support was introduced in **Octopus 3.4**.
:::

[FSharp Bootstrapping](https://github.com/OctopusDeploy/Calamari/tree/enhancement-fsharpscripts/source/Calamari/Integration/Scripting/FSharp)

From a F# script, you can use the `setVariable : name:string -> value:string -> unit` function to collect artifacts. The function takes two parameters with the same purpose as the PowerShell CmdLet.

**F#**

```fsharp
Octopus.setVariable "TestResult" "Passed"
```

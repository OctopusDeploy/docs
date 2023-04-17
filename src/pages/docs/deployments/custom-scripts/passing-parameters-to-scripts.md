---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Passing parameters to scripts
description: Octopus can pass parameters to your custom script files for any of the supported scripting languages.
navOrder: 40
---

Octopus can pass parameters to your custom script files for any of the supported scripting languages. This means you can use existing scripts, or write and test your own parameterized scripts that have no knowledge of Octopus, passing Octopus Variables directly to your scripts as parameters. The Octopus scripting API is still available within the context of your script, meaning you can use a mixture of parameters and other Octopus variables and functions.

Consider this example PowerShell script:

**PowerShell script using Octopus Variables**

```powershell
$environment = $OctopusParameters["Octopus.Environment.Name"]
Write-Host "Environment: $environment"
```

You can parameterize this script making it easier to test outside of Octopus:

**PowerShell script using parameters**

```powershell
param (
	[Parameter(Mandatory=$True)]
	[string]$Environment
)
Write-Host "Environment: $Environment"
```

When you call external scripts (sourced from a file inside a package) you can pass parameters to your script. This means you can write "vanilla" scripts that are unaware of Octopus, and test them in your local development environment.

You can define your parameters in the **Script Parameters** field using the format expected by your scripting execution environment (see below for examples).

![Script Parameters](/docs/deployments/custom-scripts/images/script-parameters.png "width=500")

:::hint
**Delimiting string values**
Don't forget to correctly delimit your parameters correctly for the scripting engine. In the example above we have surrounded the parameter value in double-quotes to handle cases where the Environment Name has spaces: `"#{Octopus.Environment.Name}"`
:::

## Passing parameters to PowerShell scripts {#Customscripts-PassingparameterstoPowerShellscripts}

You can pass parameters to PowerShell scripts as if you were calling the script yourself from PowerShell, using positional or named parameters.

**Script Parameters in Octopus**

```bash
-Environment "#{Octopus.Environment.Name}" -StoragePath "#{MyApplication.Storage.Path}"
```

**Usage in PowerShell script**

```powershell
Param (
	[Parameter(Mandatory=$True)]
	[string]$Environment,
	[Parameter(Mandatory=$True)]
	[string]$StoragePath
)
 
Write-Host "$Environment storage path: $StoragePath"
```

## Passing parameters to C# scripts {#Customscripts-PassingparameterstoC#scripts}

You can pass parameters to C# scripts [as described here for the ScriptCS engine](https://github.com/scriptcs/scriptcs/wiki/Pass-arguments-to-scripts). ScriptCS only supports positional parameters.

**Script Parameters in Octopus**

```bash
-- "#{Octopus.Environment.Name}" "#{MyApplication.Storage.Path}"
```

**Usage in C# script**

```csharp
var environment = Env.ScriptArgs[0]
var storagePath = Env.ScriptArgs[1]
Console.WriteLine("{0} storage path: {1}", environment, storagePath);
```

## Passing parameters to Bash scripts {#Customscripts-PassingparameterstoBashscripts}

You can pass parameters to Bash scripts [as described in Bash manual.](https://www.gnu.org/software/bash/manual/bash.html#Positional-Parameters)

**Script Parameters in Octopus**

```powershell
"#{Octopus.Environment.Name}" "#{MyApplication.Storage.Path}"
```

**Usage in Bash script**

```bash
environment="$1"
storagePath="$2"
echo "$environment storage path: $storagePath"
```

## Passing parameters to F# scripts {#Customscripts-PassingparameterstoF#scripts}

You can pass parameters to FSharp scripts [as described by the F# documentation.](https://docs.microsoft.com/en-us/dotnet/fsharp/tools/fsharp-interactive/#using-the-fsi-object-in-f-code)

**Script Parameters in Octopus**

```powershell
"#{Octopus.Environment.Name}" "#{MyApplication.Storage.Path}"
```

**Usage in F# script**

```fsharp
let environment = fsi.CommandLineArgs.[1]
let storagePath = fsi.CommandLineArgs.[2]
printfn "$s storage path: $s" environment storagePath
```

## Passing parameters to Python3 scripts {#Customscripts-Passingparameterstopythonscripts}

You can pass parameters to python scripts [as described by the python documentation.](https://docs.python.org/3/tutorial/interpreter.html#argument-passing)

**Script Parameters in Octopus**

```python
'#{Octopus.Environment.Name}' '#{MyApplication.Storage.Path}'
```
**Usage in Python3 script**

```python
environment=sys.argv[1]
storagePath=sys.argv[2]
print("Parameters {} {}".format(environment, storagePath))
```
:::hint
**Note:** If your python scripts make use of [argparse](https://docs.python.org/3/library/argparse.html), it's possible you might encounter an error at execution time, as Calamari bootstraps the execution of the python script as part of the deployment or runbook run.
:::

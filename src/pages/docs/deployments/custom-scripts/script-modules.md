---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Script modules
description: Script modules allow users to create collections of functions that can be used in deployment processes across multiple projects.
navOrder: 120
---

Script modules allow users to create collections of language specific functions that can be used in deployment processes across multiple projects.

## Creating a script module {#ScriptModules-CreatingaScriptmodule}

1.  Navigate to **Library ➜ Script Modules ➜ Add Script Module**.

![](/docs/deployments/custom-scripts/images/script-modules-add.png "width=500")

2.  Name your new Script Module:

![](/docs/deployments/custom-scripts/images/script-modules-new.png "width=500")

3.  Your new script module will default to PowerShell and come with a function called *Say-Hello.* Each supported script language has a similar function. In this walk-through we will work with PowerShell and modify the provided sample function a bit with the following code for the sake of showing a better example:

```powershell
function Say-Hello($name)
{
    Write-Output "Hello $name. Welcome to Octopus!"
}
```

After inserting the modified function, the Script Module should look like this:

![](/docs/deployments/custom-scripts/images/script-modules-new-body.png "width=500")

Once this is done, click on **Save**.

## Using a script module on a deployment {#ScriptModules-UsingaScriptModuleonaDeployment}

Once you have created a Script Module, you can start using the functions it contains in Script Steps in your deployment processes. These steps must use the same language as the Script Module.

1.  Go to your **[Deployment Process](/docs/deployments)** and click **Include.**

![](/docs/deployments/custom-scripts/images/script-modules-deployment.png "width=500")

A new window will pop up up, prompting you to select you script module. Select the module you just created (make sure the check-box is checked) and hit **Save**.

![](/docs/deployments/custom-scripts/images/script-modules-deployment-include.png "width=500")

You will now be able to see your module loaded on your Deployment Process

![](/docs/deployments/custom-scripts/images/script-modules-deployment-included.png "width=500")

2.  Add a **[Script step](/docs/deployments/custom-scripts)**, ensure you choose PowerShell and call the *Say-Hello* function from it.

```powershell
Say-Hello -name "George"
```

![](/docs/deployments/custom-scripts/images/script-modules-deployment-step.png "width=500")

Once you're done, hit **Save.**

:::div{.success}
Make sure to select a **Role**, an **Environment** and to put a **Step Name**
:::

3.  Create and Deploy a release.

4.  Check the Release task log and expand all the steps. You should be able to see the output of the *Say-Hello* function in there.

![](/docs/deployments/custom-scripts/images/script-modules-deployment-release.png "width=500")


## Using script modules{#ScriptModules-using}

Each language has a slightly different syntax for using the Script Module. Please see the language specific section below.

* [PowerShell](#ScriptModules-PowerShell)
* [Bash](#ScriptModules-Bash)
* [C#](#ScriptModules-CSharp)
* [F#](#ScriptModules-FSharp)
* [Python](#ScriptModules-Python)

## PowerShell script modules{#ScriptModules-PowerShell}

PowerShell script modules get automatically loaded once for every PowerShell script step in your deployment process - the functions and cmdlets will automatically be in scope for your script.

Script Module:
```powershell
function Say-Hello($name) {
    Write-output "Hello $name. Welcome to Octopus!"
}
```

Script Step:
```powershell
Say-Hello -name "George"
```

### Gotcha
If your process has 4 steps (i.e Stop IIS, Backup, Deploy, Start IIS) the entire module will get loaded once at the start of each step. Because of this we encourage users to avoid putting code outside functions on your Script Modules. This way the code will only get executed when the function is properly called from a PowerShell Script step.

In the example Script Module below, the first line which attempts to stop the service "ImportantService" will run for every PowerShell-Script-based step on your deployment. The first time it might succeed (stopping the service), but subsequent tries will most likely make the overall deployment fail.

```powershell
# bad example - do not copy
Stop-Service -Name ImportantService
 
function Say-Hello($name) {
    Write-output "Hello $name. Welcome to Octopus!"
}
```

## Bash script modules{#ScriptModules-Bash}

Bash Script Modules are written as a `.sh` file next to your script. Import them
via `source MyScriptModule.sh`, where `MyScriptModule` is the name of your Script
Module with invalid characters removed. The help text above the Script Module body
will show the filename that will be created.

Given a Bash Script Module called `Bash Script Module`:
```bash
say_hello() {
    echo "Hello $1. Welcome to Octopus!"
}
```

Call it from your Script Step with:
```bash
source BashScriptModule.sh
say_hello George
```

## C# script modules{#ScriptModules-CSharp}

C# Script Modules are written as a `.csx` file next to your script. Import them
via `#load "MyScriptModule.csx"`, where `MyScriptModule` is the name of your Script
Module with invalid characters removed. The help text above the Script Module body
will show the filename that will be created.

The `#load` statement must be at the top of your script.

Given a C# Script Module called `CSharp Script Module`:
```csharp
public void SayHello(string name) {
    Console.WriteLine("Hello " + name + ". Welcome to Octopus!");
}
```

Call it from your Script Step with:
```csharp
#load "CSharpScriptModule.csx"
SayHello("George");
```

## F# script modules{#ScriptModules-FSharp}

F# Script Modules are written as an `.fsx` file next to your script. Import them
via `#load "MyScriptModule.fsx"`, where `MyScriptModule` is the name of your Script
Module with invalid characters removed. The help text above the Script Module body
will show the filename that will be created.

F# script modules need to declare a module name at the top of the Script Module body with `module MyModule`.

Once the Script Module file is loaded, you can either use the functions from the Script Module by prefixing the functions with the module name, or by "opening" the Script Module with `open MyModule`:

```fsharp
#load "MyScriptModule.fsx"
// call the function in the module directly
let result = MyModule.add 1 3
// Or, open the module, and import the functions into scope
open MyModule
let result = add 1 3
```

The `#load` statement must be at the top of your script.

Given an F# Script Module called `FSharp Script Module`:
```fsharp
module MyFSharpScriptModule
let sayhello name =
    printfn "Hello %s. Welcome to Octopus!" name;
```

Call it from your Script Step with:
```fsharp
#load "FSharpScriptModule.fsx"
open MyFSharpScriptModule
sayhello "George";
```

## Python script modules{#ScriptModules-Python}

Python Script Modules are written as a `.py` file next to your script. Import them
via `import MyScriptModule`, where `MyScriptModule` is the name of your Script
Module with invalid characters removed. The help text above the Script Module body
will show the filename that will be created.

Once imported, functions from the Script Module will be available prefixed with the Script Module name.

Given a Python Script Module called `Python Script Module`:
```python
def sayhello(name):
    print(f"Hello {name}. Welcome to Octopus!")
```

Call it from your Script Step with:
```python
import PythonScriptModule
PythonScriptModule.sayhello("George")
```

## Usage

From the Usages tab, you can see where a Script Module is being used. This shows the Projects that are referencing
the Script Module, as well as the Releases that have a snapshot of the Script Module. This allows you to assess the
ramifications of changing a Script Module, as well as track down where it has been used in the past.

![](/docs/deployments/custom-scripts/images/script-modules-usage.png "width=500")

## Permissions

To be able to access and use the script modules feature you will require the following permissions:

To see the "Script Modules" menu requires the `VariableView` permission.

To create a new Script Module requires the `LibraryVariableSetCreate` permission.

To view an existing Script Module requires the `LibraryVariableSetView`, `VariableView` and `VariableViewUnscoped` permissions.

To edit an existing Script Module requires the `LibraryVariableSetEdit` permission.

---
title: Script Modules
description: Script modules allow users to create Powershell functions or Cmdlets that could later on be used in deployment processes across multiple projects.
position: 700
---

Script modules allow users to create *Powershell functions* or *Cmdlets* that could later on be used in deployment processes across multiple projects. You can think of them as regular Powershell Modules that will get loaded at deploy time.

## Creating a Script module {#ScriptModules-CreatingaScriptmodule}

1.  Click on {{Library,Script Modules,Add Script Module}}

![](script-modules-add.png "width=500")

2.  Name your new Script Module and click on **Save**

![](script-modules-new.png "width=500")

3.  By default, your new script module will come with a function called *Say-Hello.* We will modify it a bit with the following code for the sake of showing a better example.

```powershell
function Say-Hello($name)
{
    Write-Output "Hello $name. Welcome to Octopus!"
}
```

After inserting the modified function, the Script Module should look like this:

![](script-modules-new-body.png "width=500")

Once this is done, click on **Save**.

:::problem
**Gotcha**
The script modules get loaded once for every step on your deployment process. If you process has 4 steps (i.e Stop IIS, Backup ,Deploy, Start IIS) the entire module will get loaded once at the start of each step. Because of this we encourage users to avoid putting code outside functions on your Script Modules. This way the code will only get executed when the function is properly called from a Powershell Script step.

In the example Script Module below, the first line which attempts to stop the service "ImportantService" will run for every Powershell-Script-based step on your deployment . The first time it might succeed (stopping the service), but the subsequent tries will most likely make the overall deployment fail.

```powershell
Stop-Service -Name ImportantService
 
function Say-Hello($name) {
	Write-output "Hello $name. Welcome to Octopus!"
}
```
:::

## Using a Script Module on a Deployment {#ScriptModules-UsingaScriptModuleonaDeployment}

!partial <deployment>

:::hint
To be able to access and use the script modules feature you will require the following permissions:


To see the `Script modules` menu requires the `VariableView` permission.

To create a new `Script module` requires the `LibraryVariableSetCreate` permission.

To view an existing `Script module` requires the `LibraryVariableSetView`, `VariableView` and `VariableViewUnscoped` permissions.

To edit an existing `Script module` requires the `LibraryVariableSetEdit`permission.
:::


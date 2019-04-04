---
title: Script Modules
description: Script modules allow users to create PowerShell functions or Cmdlets that could later on be used in deployment processes across multiple projects.
position: 120
---

Script modules allow users to create *PowerShell functions* or *Cmdlets* that could later on be used in deployment processes across multiple projects. You can think of them as regular PowerShell Modules that will get loaded at deploy time.

## Creating a Script Module {#ScriptModules-CreatingaScriptmodule}

1.  Click on **{{Library,Script Modules,Add Script Module}}**:

![](script-modules-add.png)

2.  Name your new Script Module and click on **Save**:

![](script-modules-new.png)

3.  By default, your new script module will come with a function called *Say-Hello.* We will modify it a bit with the following code for the sake of showing a better example.

```powershell
function Say-Hello($name)
{
    Write-Output "Hello $name. Welcome to Octopus!"
}
```

After inserting the modified function, the Script Module should look like this:

![](script-modules-new-body.png)

Once this is done, click on **Save**.

### Gotcha

The script modules get loaded once for every step on your deployment process. If you process has 4 steps (i.e Stop IIS, Backup ,Deploy, Start IIS) the entire module will get loaded once at the start of each step. Because of this we encourage users to avoid putting code outside functions on your Script Modules. This way the code will only get executed when the function is properly called from a PowerShell Script step.

In the example Script Module below, the first line which attempts to stop the service "ImportantService" will run for every PowerShell-Script-based step on your deployment . The first time it might succeed (stopping the service), but the subsequent tries will most likely make the overall deployment fail.

```powershell
Stop-Service -Name ImportantService
 
function Say-Hello($name) {
	Write-output "Hello $name. Welcome to Octopus!"
}
```


## Using a Script Module on a Deployment {#ScriptModules-UsingaScriptModuleonaDeployment}

Once you have created a Script Module, you can start using the functions contained on it on your deployment processes.

1.  Go to your **[Deployment Process](/docs/deployment-examples/index.md)** and click **Include.**

![](script-modules-deployment.png)

A new window will pop up up, prompting you to select you script module. Select the module you just created (make sure the checkbox is checked) and hit **Save**.

![](script-modules-deployment-include.png)

You should now be able to see your module loaded on your Deployment Process

![](script-modules-deployment-included.png)

2.  Add a **[Standalone PowerShell Script step](/docs/deployment-examples/custom-scripts/index.md)** and call the *Say-Hello* function from it.

```powershell
Say-Hello -name George
```

![](script-modules-deployment-step.png)

Once you're done, hit **Save.**

:::success
Make sure to select a **Role**, an **Environment** and to put a **Step Name**
:::

3.  Create and Deploy a release.

4.  Check the Release task log and expand all the steps. You should be able to see the output of the *Say-Hello* function in there.

![](script-modules-deployment-release.png)

:::hint
To be able to access and use the script modules feature you will require the following permissions:

To see the `Script modules` menu requires the `VariableView` permission.

To create a new `Script module` requires the `LibraryVariableSetCreate` permission.

To view an existing `Script module` requires the `LibraryVariableSetView`, `VariableView` and `VariableViewUnscoped` permissions.

To edit an existing `Script module` requires the `LibraryVariableSetEdit` permission.
:::

---
title: Script Modules
position: 7
---

Script modules allow users to create *Powershell functions*or *Cmdlets* that could later on be used in deployment processes across multiple projects. You can think of them as regular Powershell Modules that will get loaded at deploy time.

## Creating a Script module {#ScriptModules-CreatingaScriptmodule}

##   1.  Click on **Library**&#10140;**Script Modules**&#10140;**Add Script Module** {#ScriptModules-1.ClickonLibrary-&gt;ScriptModules-&gt;AddScriptModule}

**![](/docs/images/3048136/3278027.png "width=500")**

2.  Name your new Script Module and click on **Save**

**![](/docs/images/3048136/3278026.png "width=500")**

3.  By default, your new script module will come with a function called *Say-Hello.* We will modify it a bit with the following code for the sake of showing a better example.

```powershell
function Say-Hello($name)
{
    Write-Output "Hello $name. Welcome to Octopus!"
}
```

After inserting the modified function, the Script Module should look like this:

![](/docs/images/3048136/3278025.png "width=500")

Once this is done, click on **Save.**

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

Once you have created a Script Module, you can start using the functions contained on it on your deployment processes.

1.  Go to your **[Deployment Process](/docs/deploying-applications/index.md)** and click on Include **Script Modules**

**![](/docs/images/3048136/3278024.png "width=500")**

A new window will pop up up, prompting you to select you script module. Select the module you just created (make sure the checkbox is checked) and hit **Apply**.

![](/docs/images/3048136/3278023.png "width=500")

You should now be able to see your module loaded on your Deployment Process

![](/docs/images/3048136/3278022.png "width=500")

2.  Add a **[Standalone Powershell Script step](/docs/deploying-applications/custom-scripts/index.md)** and call the *Say-Hello* function from it.

```powershell
Say-Hello -name George
```

![](/docs/images/3048136/3278021.png "width=500")

Once you're done, hit **Save.**

:::success
Make sure to select a**Role**, an **Environment**and to put a **Step Name**
:::

3.  Create and Deploy a release.

4.  Check the Release task log and expand all the steps. You should be able to see the output of the *Say-Hello* function in there.

![](/docs/images/3048136/3278020.png "width=500")

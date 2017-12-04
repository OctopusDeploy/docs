---
title: Standalone scripts
description: Standalone scripts allow you to run scripts contained in a package, or ad-hoc scripts you've saved as part of the step.
position: 0
---

Octopus also allows you to run standalone scripts as part of your deployment process. You can run a script on the Octopus Server or across the deployment targets in roles. You can run scripts contained in a package, or ad-hoc scripts you've saved as part of the step. For information about adding a step to the deployment process, see the [add step](/docs/deploying-applications/deployment-process/steps.md) section.

:::success
You can use all of the features we provide for [custom scripts](/docs/deploying-applications/custom-scripts/index.md), like [using variables](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Variables), [passing parameters](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Passingparameterstoscripts), publishing [output variables](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Outputvariables) and [collecting artifacts](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Collectingartifacts).
:::

- Choosing where the script will run
- Choosing where to source the script
- Passing parameters to scripts

![](/docs/images/5671696/5865914.png "width=170")

## Choosing where the script will run {#Standalonescripts-Choosingwherethescriptwillrun}

:::hint
The ability to run scripts on the Octopus Server shipped in Octopus Deploy 3.3
:::

When adding a script you choose where the script will run, and in which context the script will run.

![](5275659.png "width=500")

Choosing the right combination of **Target** and **Roles** enables some really interesting scenarios. See below for some common examples:

| Target            | Roles                  | Description                              | Variables                                | Example scenarios                        |                              |
| ----------------- | ---------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------- |
| Deployment target | `web-serverapp-server` | The script will run on each deployment target with either of the `web-server` or `app-server` roles | The variables scoped to the deployment target will be available to the script. For example, `Octopus.Machine.Name` will be the deployment target's name | Apply server hardening or ensure standard pre-requisites are met on each deployment target | ![](5275661.png "width=100") |
| Octopus Server    |                        | The script will run once on the Octopus Server | Scope variables to the Step in order to customize variables for this script | Calculate some output variables to be used by other steps or run a database upgrade process | ![](5275662.png "width=100") |
| Octopus Server    | `web-server`           | The script will run on the Octopus Server on behalf of the deployment targets with the `web-server` role. The script will execute once per deployment target | The variables scoped to the deployment target will be available to the script. For example, `Octopus.Machine.Name` will be the deployment target's name | Remove web servers from a load balancer as part of a [rolling deployment](/docs/patterns/rolling-deployments.md) where access to the load balancer API is restricted | ![](5275663.png "width=100") |

:::hint
Bash scripts are not able to be run on the Octopus Server, even if Bash is installed on that server
:::

## Choosing where to source the script {#Standalonescripts-Choosingwheretosourcethescript}

:::hint
The ability to source your script from a package shipped in Octopus 3.3
:::

You may also select the source of the script, either:

- an ad-hoc or inline script, saved as part of the step itself, or
- a script file inside a package (shown below)

![](5865637.png "width=500")

:::success
**Scripts from packages, versioning and source control**
Using scripts from inside a package is a great way to version and source control your scripts. (You can be assured the correct version of your script will be run when deploying each version of your application.) Both methods (ad-hoc versus packaged) have benefits and suit different applications: choose the method best suited to your situation.
:::

:::hint
When sourcing a script from a file inside a package you cannot choose to run the step before packages are acquired.
:::

## Passing parameters to scripts {#Standalonescripts-Passingparameterstoscripts}

:::hint
The ability to pass parameters to scripts was added in Octopus 3.4
:::

When you call external scripts (sourced from a file inside a package) you can pass parameters to your script. This means you can write "vanilla" scripts that are unaware of Octopus, and test them in your local development environment. Read about [passing parameters to scripts](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Passingparameterstoscripts).

![](5865636.png "width=500")

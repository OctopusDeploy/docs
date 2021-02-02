---
title: Define and use variables
description: Step by step guide on how to define and use variables in a Octopus Deploy deployment.
position: 50
hideInThisSection: true
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Hd71uhcD61E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Octopus allows you to define variables and scope them for use in different phases of your deployments.  Variables allow you to have a consistent deployment process across your infrastructure without having to hard-code or manually update configuration settings that differ across environments, deployment targets, channels, or tenants.

1. From the *Hello world* project you created earlier, click **Variables** in the left menu.
1. Enter **Helloworld.Greeting** into the variable name column on the first row of the table.
1. Add **Hello, Development** into the value column.
1. Click the **Scope** column and select the `Development` environment.
1. Click **ADD ANOTHER VALUE** button.
1. Add **Hello, Test** and scope it to the `Test` environment.
1. Click **ADD ANOTHER VALUE** button.
1. Add **Hello, Production** and scope it to the `Production` environment.
1. Click the **SAVE** button.

![The hello world variables](images/variables.png)

Steps in the deployment process can reference the variables.

1. Click **Process** on the left menu.
1. Select the **Hello World** step.
1. Change the script in the script step based on your language of choice:

```powershell PowerShell
Write-Host $OctopusParameters["Helloworld.Greeting"]
```
```bash Bash
greeting=$(get_octopusvariable "Helloworld.Greeting")
echo $greeting
```

:::hint
If you are using Octopus Cloud, Bash scripts require you to select the **Hosted Ubuntu** worker pool.  The **Default Worker Pool** is running Windows and doesn't have Bash installed.
:::

4. Click the **SAVE** button and create a new release.

:::hint
A release snapshots everything about your project, including variables and the deployment process. You have to create a new release to see any changes.
:::

As you promote through the environments, you will see the greeting change.

![The results of the hello world deployment with variables](images/deployment-with-variables.png)

:::success
To learn more about variables, variable types, and sharing variables between projects, please refer to the [variable documentation](/docs/projects/variables/index.md)
:::

So far, the process has ran in each environment with impunity.  The next step will [add an approval process using manual interventions](/docs/getting-started/first-deployment/approvals-with-manual-interventions.md).  
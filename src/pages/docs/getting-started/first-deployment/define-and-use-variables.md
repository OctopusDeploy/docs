---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Define and use variables
description: Step by step guide on how to define and use variables in an Octopus Deploy deployment.
navOrder: 50
hideInThisSection: true
---

[Getting Started - Variables](https://www.youtube.com/watch?v=Hd71uhcD61E)

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

:::figure
![The hello world variables](/docs/getting-started/first-deployment/images/img-variables.png)
:::

Steps in the deployment process can reference the variables.

1. Click Process on the left menu.
1. Select the previously created Run a Script step.
1. Replace the inline source code script based on your selected language:

<details data-group="getting-started-first-deployment-define-and-use-variables">
<summary>PowerShell</summary>

```powershell
Write-Host $OctopusParameters["Helloworld.Greeting"]
```

</details>
<details data-group="getting-started-first-deployment-define-and-use-variables">
<summary>Bash</summary>

```bash
greeting=$(get_octopusvariable "Helloworld.Greeting")
echo $greeting
```

</details>

:::div{.hint}
If you are using Octopus Cloud, Bash scripts require you to select the **Hosted Ubuntu** worker pool.  The **Default Worker Pool** is running Windows and doesn't have Bash installed.
:::

4. Click the **SAVE** button and create a new release.

:::div{.hint}
A release snapshots everything about your project, including variables and the deployment process. You have to create a new release to see any changes.
:::

As you promote through the environments, you will see the greeting change.

:::figure
![The results of the hello world deployment with variables](/docs/getting-started/first-deployment/images/img-environmentvariables.png)
:::

The next step will [add an approval process using manual interventions](/docs/getting-started/first-deployment/approvals-with-manual-interventions). 

**Further Reading**

For further reading on variables in Octopus Deploy please see:

- [Variable Documentation](/docs/projects/variables)
- [Deployment Documentation](/docs/deployments)
- [Patterns and Practices](/docs/deployments/patterns)

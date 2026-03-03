---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-09-03
title: Prompted variables
icon: fa-solid fa-terminal
description: Prompted variables allow you to prompt a user to enter a value rather than storing it in Octopus.
navOrder: 40
---
As you work with [variables](/docs/projects/variables) in Octopus, there may be times when the value of a variable isn't known and you need a user to enter the variable at deployment time. Octopus can handle this using **Prompted variables**.

## Defining a prompted variable {#defining-prompted-variable}

To make a variable a **prompted variable**, enter the variable editor when creating or editing the variable. On the variable value field, click **Open Editor**:

:::figure
![Open variable editor](/docs/img/projects/variables/images/open-variable-editor.png)
:::

When defining a prompted variable, you can provide a friendly name and description, and specify if the value is required. A required variable must be supplied when the deployment is created and must not be empty or white space.

:::figure
![Prompted variable](/docs/img/projects/variables/images/prompted-variable.png)
:::

You can identify prompted variables by looking for the icon next to the value:

:::figure
![](/docs/img/projects/variables/images/prompted-variable-icon.png)
:::

:::div{.hint}
You can select one of several different data types. This controls the user interface provided to collect the variable value, and determines how the variable value is interpreted. Note the variable values will be stored and interpreted as text. Control type options are:
- Single-line text box
- Multi-line text box
- Drop-down
- Checkbox
:::

## Providing a value for the variable {#providing-value-for-variable}

When deploying (not creating a release), you'll be prompted to provide a value for the variable:

:::figure
![Required prompted variable](/docs/img/projects/variables/images/3278301.png)
:::

These variables will be ordered alphabetically by label (or name, if the variable label is not provided).

A value can also be passed to a prompted variable when using the Octopus CLI through the `--variable` parameter of the [octopus release deploy](/docs/octopus-rest-api/cli/octopus-release-deploy) command.

```bash;
octopus release deploy ... --variable "Missile launch code:LAUNCH123" --variable "Variable 2:Some value"
```

:::div{.hint}
Prompted variables can be combined with [sensitive variables](/docs/projects/variables/sensitive-variables/). They will appear with a password box when creating the deployment. They can also be combined with [Azure Account variables](/docs/projects/variables/azure-account-variables/), [AWS Account variables](/docs/projects/variables/aws-account-variables/), [Certificate variables](/docs/projects/variables/certificate-variables/), and [Worker Pool variables](/docs/projects/variables/worker-pool-variables), passing in the ID, e.g. `WorkerPools-1`.
:::

## Restricting a prompted variable for runbooks

By default, a prompted variable will prompt when deploying a release and when executing any runbooks in the project.

Prompted variables can be [scoped to specific processes](/docs/runbooks/runbook-variables/#prompted-variables), causing them to only be shown when deploying releases, or only when executing runbooks.

## Prompted variable ordering

When Octopus renders prompted variables for a deployment or runbook, they are sorted alphabetically by the prompted variable label. If you want to customize the order in which the variables appear, one option is to include a numerical prefix in the label:

:::figure
![](/docs/img/projects/variables/images/prompted-variable-custom-sort.png)
:::

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables/1)

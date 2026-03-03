---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Debug problems with Octopus variables
description: How to debug problems with Octopus variables when a variable used during a deploying is different than the one you expect.
navOrder: 1
---

Sometimes a variable used during deployment may have a different value from the one you expect. Here are the first steps to debugging these issues.

Project variables and [library variable set](/docs/projects/variables/library-variable-sets) variables are captured in a snapshot when you create a release or publish a runbook snapshot. If you update a variable after the snapshot is taken, the change won't apply to existing releases or snapshots. To pick up the new value, you'll need to either create a new release (or update the existing release's variable snapshot) for deployments, or create and publish a new runbook snapshot for runbooks.

## Check the variable snapshot for the release {#check-variable-snapshot-for-release}

1. Open the **Project ➜ Releases ➜ Release** page for the Release you are debugging.
2. Scroll down to find the **Variables** section and click the **Show Snapshot** link so see the snapshot of Variables being used by this Release.
3. If the variable is wrong in the Snapshot:
    * Update the Variable in the **Variables** section of the project, and then.
    * Click the **Update variables** button - beware this will update **all** variables in the Snapshot to the latest values.

:::figure
![](/docs/img/support/images/3278466.png)
:::

:::div{.hint}
**Tenant variables are the exception.** Unlike project and library variable set variables, [tenant variables](/docs/tenants/tenant-variables) are not included in the snapshot. They take effect immediately without needing a new release or snapshot. For more details, see [Tenant variables and snapshots](/docs/tenants/tenant-variables#tenant-variables-and-snapshots).
:::

## Check the variable value in the all variables tab {#check-variable-value-in-all-variables-tab}

1. Open the **Project ➜ All Variables** tab.
2. Investigate the variables from all possible sources for the project including the project itself, [variable sets](/docs/projects/variables/library-variable-sets/), and [tenants](/docs/tenants).

:::figure
![](/docs/img/support/images/5865680.png)
:::

:::div{.success}
Did you know you can sort filter all variables grids? Click **Show Advanced filters** and select your filter type.
:::

## Write the variables to the deployment log {#write-variables-to-deployment-log}

This will log the variables available at the beginning of each step in the deployment as Verbose messages.

1. Open the **Project ➜ Variables** page.
2. Set the following two variables:

| Name | Value |
| --- | --- |
| OctopusPrintVariables | True |
| OctopusPrintEvaluatedVariables | True |

It should look like this. You can have as many extra variables as you want besides these two.

:::figure
![](/docs/img/support/images/evaluatedvars.png)
:::

3. **Create a new release** of the project or **Update the variable snapshot** for the release as shown above.
4. Deploy the new release.
5. Enable **Verbose** output on the **Task log** page.
6. Expand the element corresponding to the Tentacle on which the problem is observed. Two sets of variables will be printed, first, the raw definitions before any substitutions have been performed, then the result of evaluating all variables for deployment.

:::div{.warning}
**For debugging only**
When adding these variables to your project, Octopus will add the following warning to your deployment log
`20:30:45   Warning  |       OctopusPrintVariables is enabled. This should only be used for debugging problems with variables, and then disabled again for normal deployments.`
This is because printing variables increases the size of the task logs, and can make your deployments run slower. Don't forget to turn this off when you're finished debugging. These variables are false by default.
:::

## Use debug mode {#debug-mode}

As an alternative to setting `OctopusPrintVariables` and `OctopusPrintEvaluatedVariables`, you can enable **Debug Mode** when creating a deployment or running a runbook. Debug mode writes detailed variable information to the task log without requiring you to add variables to your project.

- For **project deployments**, you'll find the Debug Mode option on the deployment creation screen.
- For **runbooks**, click **Show advanced** on the run screen to reveal the Debug Mode option.

Debug mode is a convenient way to get variable diagnostics for a single run without modifying your project's variables.

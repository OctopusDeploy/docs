---
title: Debug Problems With Octopus Variables
description: How to debug problems with Octopus variables when a variable used during a deploying is different than the one you expect.
position: 1
---

Sometimes a variable used during deployment may have a different value from the one you expect. Here are the first steps to debugging these issues.

## Check the Variable Snapshot for the Release {#DebugproblemswithOctopusvariables-ChecktheVariableSnapshotfortheRelease}

1. Open the **{{Project,Releases,Release}}** page for the Release you are debugging.
2. Scroll down to find the **Variables** section and click **Show Snapshot** link to see the snapshot of Variables being used by this Release.
3. If the variable is wrong in the Snapshot:
    * Update the Variable under the **Variables** section of the project.
    * Go back to the **release** page and click the **Update variables** button - beware this will update **all** variables in the Snapshot to the latest values.

![](images/3278466.png)

## Check the Variable Value in the All Variables Tab {#DebugproblemswithOctopusvariables-CheckthevariablevalueintheAllVariablestab}

1. Open the **{{Project,Variables,All Variables}}** tab.
2. Investigate the variables from all possible sources for the project including the project itself, [library variable sets](/docs/deployment-process/variables/library-variable-sets.md), and [tenants](/docs/deployment-patterns/multi-tenant-deployments/index.md).

![](images/5865680.png)

:::success
Did you know you can filter all of the variables grids? Click **Show Advanced Filter** to reveal filter options.
:::

## Write the Variables to the Deployment Log {#DebugproblemswithOctopusvariables-Writethevariablestothedeploymentlog}

This will log the variables available at the beginning of each step in the deployment as Verbose messages.

1. Open the **{{Project,Variables}}** page.
2. Set the following two variables:

| Name | Value |
| --- | --- |
| OctopusPrintVariables | True |
| OctopusPrintEvaluatedVariables | True |

It should look like this. You can have as many extra variables as you want besides these two.

![](images/3278087.png)

3. **Create a new release** of the project or **Update the variable snapshot** for the release as shown above.
4. Deploy the new release.
5. Enable **Verbose** output on the **Task log** page.
6. Expand the element corresponding to the Tentacle on which the problem is observed. Two sets of variables will be printed, first, the raw definitions before any substitutions have been performed, then the result of evaluating all variables for deployment.

:::warning
**For debugging only**
When adding these variables to your project, Octopus will add the following warning to your deployment log
`20:30:45   Warning  |       OctopusPrintVariables is enabled. This should only be used for debugging problems with variables, and then disabled again for normal deployments.`
This is because printing variables increases the size of the task logs, and can make your deployments run slower. Don't forget to turn this off when you're finished debugging.
:::

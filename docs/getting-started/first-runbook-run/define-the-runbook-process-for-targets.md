---
title: Defining the runbook process
description: Step by step guide on how to define a runbook process in Octopus Deploy.
position: 80
hideInThisSection: true
---

With deployment targets added, we can add a run a script step to the runbook process configured to run on those targets.

1. Click **Runbooks** on the left menu.
1. Click *Hello Runbook* in the list of runbooks.
1. Click **Process** in the runbook menu.
1. Click **ADD STEP**.
1. Select the **Script** tile to filter the types of steps.
1. Scroll down and click **ADD** on the **Run a Script** tile.
1. Change **Name** of the script to be "Run a script on deployment targets" for the script 
1. Leave the **Enabled** check-box ticked.
1. In the **Execution Location** section change the option to be **Run on a deployment target**.
1. In the **On Target In Roles** section change the role to be `Hello-World`.

![Changing the script step to run on a deployment target](images/run-script-on-deployment-target.png)

11. Scroll down to the **Script**, select your script language of choice and enter the following script in the **Inline Source Code** section:

```powershell PowerShell
Write-Host $OctopusParameters["Helloworld.Greeting"]
Write-Host $OctopusParameters["Octopus.Machine.Name"]
```
```bash Bash
greeting=$(get_octopusvariable "Helloworld.Greeting")
echo $greeting
machineName = $(get_octopusvariable "Octopus.Machine.Name")
echo $machineName
```

12. Click **SAVE**
13. Click **RUN...** and select an environment to run on.

![Running the runbook script on a deployment target](images/run-deployment-target-results.png)

:::hint
Not all steps can and should be run on a deployment target.  A rule of thumb is a runbook should target a deployment target if it needs to modify something specific on that target, such as restarting a service, or installing a web server.  If you need to manage PaaS targets, K8s clusters, or database servers, the recommendation is to run the runbook script on a worker.
:::

And with that, all the modifications to this runbook are completed.  The [runbook is ready to be published](/docs/getting-started/first-runbook-run/publishing-a-runbook.md) so it can used by triggers and users have a good known version to run.

<span>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<a class="btn" href="/docs/getting-stated/first-runbook-run/add-runbook-deployment-targets">Previous</a></span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span><a class="btn btn-success" href="/docs/getting-started/first-runbook-run/publishing-a-runbook">Next</a>&nbsp;</span><br />
&nbsp;<br />
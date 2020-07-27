---
title: Restart server
description: With Octopus Deploy you can restart a server with a runbook.
position: 30
---

"Have you tried turning it off and on again?"  There are numerous reasons why a server would need to be restarted.  Typically this responsibility lies solely in the hands of Operations as the ability to restart a machine requires elevated permissions.  With a runbook, you can give developers the ability to restart a machine whenever they need.  The auditing feature of Octopus Deploy records the identity of the person who initiated the run of the runbook so you have the ability to see who did what and when.

Unlike most other runbooks, this type of operation needs to run on a [worker](https://octopus.com/docs/infrastructure/workers) machine instead of the machine that needs to be restarted.  The reason for this is that if you go against the machine directly, communication to the Tentacle will be interrupted as it restarts resulting in a failed run of the runbook.

## Create the runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a **Run a script** step
5. Change the Execution Location to `Run on a worker on behalf of each deployment target`
6. Select the role from the `On Targets in Roles` drop-down list
7. Select the radio button that corresponds with the language you're using

```PowerShell Inline Source Code
Invoke-Command -ScriptBlock { Restart-Computer } -ComputerName #{Octopus.Machine.Name}
```
```bash Inline Source Code
ssh #{Octopus.Machine.Name} sudo reboot
```
---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-05-26
title: Troubleshooting failed or hanging tasks
description: A guide for troubleshooting tasks that fail unexpectedly or are unresponsive
navOrder: 8
---

Sometimes your deployments, health checks, or other tasks may unexpectedly fail, or can even appear unresponsive. This page describes some common issues and strategies to help you overcome these issues.

## Check the logs

The first step to debug your failed tasks is to check the [Task Log](/docs/support/get-the-raw-output-from-a-task). This will usually contain detailed information about the failure. For deployments, this includes the step, and information about the deployment targets that the step was running on.

If a deployment failed unexpectedly within a built-in step, you may have misconfigured the step. Double-check the configuration of your [step](/docs/projects/steps/) in your [deployment process](/docs/projects/deployment-process/). If your step is relying on [variables](/docs/projects/variables/), then you may have also misconfigured your variables. There are [some methods](/docs/support/debug-problems-with-octopus-variables) available that can help you debug your variables.

If a task fails while executing a PowerShell script, you may be able to get more information by debugging the PowerShell script. You can easily [debug PowerShell scripts](/docs/deployments/custom-scripts/debugging-powershell-scripts) as they are executed by Tentacle.

Manually running the failed script on the same target may often be a helpful step towards getting more useful error information, and helping to isolate the problem. Remember to run the script under the same user account as the Tentacle service. This user is often the **Local System** account, but this may have been changed so that [Tentacle runs under a specific user account](/docs/infrastructure/deployment-targets/tentacle/windows/running-tentacle-under-a-specific-user-account).

If none of the above steps help, then you may have encountered a bug in a built-in step, in which case you can contact support for further assistance.

## Networking errors

If your task logs contain errors that indicate a networking issue, there could be a few possible causes.

### Connections between Octopus Server and Tentacles

The Octopus Server communicates with Tentacles in either Listening mode or Polling mode. Both modes require different configuration.

A common problem is that traffic on the appropriate ports (10933 by default for Listening Tentacles) is not allowed by your firewall. If you are encountering problems with your connections, then your Task log might show messages that indicate a connection timing out, or a connection that was rejected by the remote host.

A utility called [TentaclePing](https://github.com/OctopusDeploy/TentaclePing) can be used to test and diagnose connections between the machine hosting Octopus Server and the machines hosting Tentacles. This allows you to quickly test connections in isolation, without involving the complexity of Octopus Server, Tentacles, or tasks.

See [Tentacle Communication Modes](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication) for more information on configuring your Tentacles.

#### Halibut

The tool that manages connections between the Octopus Server and your Tentacles is called [Halibut](https://github.com/OctopusDeploy/Halibut/). In order to discover more detailed information about the connections, it may be useful to [increase the log level for Halibut](/docs/support/log-files/#Logfiles-Changingloglevelshalibut). The same change to increase the log level for Halibut can also be made on [Tentacle](/docs/support/log-files/#Logfiles-Changingloglevelstentacle).

### Connections to external services

Steps that execute on deployment targets or workers may need to reach out to contact other external services. In these cases, a useful first step to help diagnose the problem is to attempt to manually perform the same connection, this can help to isolate the problem to a networking issue rather than a problem with Octopus Deploy.

Remember these connections are usually initiated by your deployment targets or workers, and not by the Octopus Server. You may need to remotely connect to these remote machines, and then initiate a connection from those machines. This is distinct from attempting to establish the connection on the machine that hosts Octopus Server itself.

## Hanging tasks

Sometimes tasks appear to be unresponsive or "hanging". In most cases, this ends up being antivirus or anti-malware software interfering with the task, and the first step in diagnosing the problem is to eliminate this source of interference, [see below](#anti-virus-software).

If you can completely rule out antivirus software as a source of interference, then the problem may lie in your [custom scripts](/docs/deployments/custom-scripts). The next step to diagnosing these problems is to examine your logs and determine the exact location that the task became unresponsive. If this occurs within the logs output by a custom script, then the bug likely originates from your script.

If you are still unable to determine the cause of your hanging tasks, please contact support for further assistance.

### Automatic failure of hanging tasks

In some instances, Octopus will automatically trigger the failure of a task that has become unresponsive. When this occurs, the following will happen:

- Your currently executing steps will be marked as failed with an error message saying that the "Operation has been unresponsive for {duration}"
- Subsequent steps configured to always run will run
- The overall task will be marked as failed

This is generally indicative of an internal error in Octopus. In Octopus Cloud we actively monitor for these issues, but please reach out to support for further assistance, especially if the problem persists.

### Recovering from stuck PowerShell scripts on Tentacle

PowerShell scripts on a Tentacle target can sometimes fail to run normally because of interference from antivirus or endpoint-protection software on the target. Without help, this used to leave the target's deployment queue blocked: you'd have to remote into the target and end the process, or restart the Tentacle service, before the next deployment could run.

Octopus now has two automatic recoveries that keep the queue moving while you investigate the underlying interference. Both are mitigation, not a fix. The underlying problem is on the target machine, and you'll still want to configure your antivirus software ([see the antivirus section below](#anti-virus-software)) so the interference stops happening.

#### Detecting scripts that never start

When Tentacle launches `powershell.exe` to run your script, the PowerShell process can sometimes start but never actually begin executing the script body. This typically happens when endpoint-protection software hooks into PowerShell startup and the script content never reaches the runtime.

If `powershell.exe` doesn't reach the first instruction of your script in 5 minutes, Tentacle marks the task as failed with exit code `-47` and prevents the script body from ever running, even if PowerShell wakes up later. Tentacle records a log line like:

```
PowerShell startup detection: PowerShell did not start within 5 minutes for task <task ID>
```

The mutex protecting the target is released as part of normal task cleanup, so the next deployment to that machine can begin straight away. The Tentacle itself stays healthy and doesn't need to be restarted.

This recovery is supported on Windows Tentacles running `powershell.exe`. Linux `pwsh` is not currently covered.

#### Releasing the target when cancellation can't take effect

If you cancel a deployment from the Octopus Web Portal and the cancellation can't take effect on the Tentacle in 2 minutes, Octopus tells the Tentacle to abandon the script and accept new work. This means:

- The script's underlying process may still be running on the target. Octopus does not kill it. If your script was performing an operation that could leave the target in an inconsistent state (a database migration, a file system change, and so on), inspect the target and clean up manually.
- The Tentacle releases its mutex and immediately accepts the next deployment in the queue.
- The task is marked as Cancelled.

When abandonment runs, you'll see this in the task log:

```
Cancellation hasn't taken effect on Tentacle after 2 minutes. Abandoning the script so this target can accept new deployments.
Tentacle abandoned the script.
```

Tentacle's own log will also record:

```
Tentacle has abandoned this script. The underlying script process may still be running on this host.
```

If your cancellation succeeded cleanly, no abandonment runs and the task is marked Cancelled without these messages. Check your task log to know which path your cancellation took.

#### Version requirements

The automatic recoveries described above are available from:

- Octopus Server `2026.2.5952` or later
- Tentacle `9.1.3801` or later for the script-startup detection
- Tentacle version supporting the cancellation abandon to be confirmed when the work ships

If either component is on an older version, your deployments use the previous behavior, where a stuck script may require you to remote into the target and end the process manually or restart the Tentacle service.

#### What to do if automatic recovery fires regularly

If you see automatic recovery firing on the same target more than occasionally, that target has an environmental problem worth investigating directly. Common causes:

- Antivirus or endpoint-protection software (CrowdStrike, Rapid7, and similar) hooking into PowerShell startup or holding file locks on the Tentacle's working directories.
- Multiple security agents installed on the same host, contending for the same kernel locks.

The first step is to configure your antivirus or endpoint-protection software per the [antivirus section below](#anti-virus-software). You can identify how often automatic recovery is firing on a specific target by searching your task logs for the messages above across recent deployments to that target.

If the recoveries keep firing after exclusions are in place, contact support and include a process dump from the target during the next occurrence. This helps us identify which agent is interfering.

### Antivirus software {#anti-virus-software}

If the task appears to hang after a log message output by the Octopus Server or Tentacle, then in most cases the cause is antivirus or anti-malware software interfering with the task. The first step is to determine if your antivirus software is actually affecting your Tasks, and this can easily be done by removing your antivirus protection and confirming whether the tasks continue to be unresponsive.

#### "Bootstrapper did not return the bootstrapper service message" error

If you see the error `Bootstrapper did not return the bootstrapper service message` in your task log, this typically indicates that antivirus or security software is interfering with the deployment. [Calamari](/docs/octopus-rest-api/calamari) is the lightweight bootstrapper that Tentacle invokes for each deployment step. It's installed and updated in the `Tools` folder and runs steps from the `Work` folder within your Tentacle home directory. When security software blocks or delays Calamari's execution, Tentacle can't receive the expected response, causing this error.

To resolve this, configure your antivirus or endpoint protection software to exclude the Tentacle `Tools` and `Work` directories listed below. For detailed guidance, see [configuring malware protection exclusions](/docs/security/hardening-octopus#configure-malware-protection).

If this test shows that antivirus is interfering with your tasks, you may need to configure your antivirus software with the appropriate exclusions to ensure that it does not lock any files owned by Octopus, or affect any running processes initiated by Octopus. Consult your antivirus provider's documentation for more information.

Some examples of directories (and their subdirectories) you could try adding to an allow-list are:

- `<Tentacle Home>\Tools`
  - This is where the Calamari packages and other tools are installed so Tentacle can execute deployments on your behalf.
- `<Tentacle Home>\Work`
  - This is the temporary working directory used when Tentacle and Calamari execute deployments on your behalf.

If you're still seeing issues you could also try including these additional directories (and their subdirectories):

- `<Tentacle Home>\Files`
  - This is the package cache used to store the most recent packages in case they need to be used again.
- `<Tentacle Home>\Logs`
  - This is where the Tentacle log files are stored.

:::div{.hint}
We recommend including subdirectories in any allow list for the directories listed above as processes initiated by Octopus may also create new folders within them.
:::

## Steps are slow to start

If you notice that your PowerShell script or built-in steps take a while to begin execution, and the time is consistent across your steps, then you may have something in your Tentacle user's PowerShell profile which is causing PowerShell to take a long time to initialize. Add the `Octopus.Action.PowerShell.ExecuteWithoutProfile` variable to your deployment to help diagnose this problem. See [System Variables](/docs/projects/variables/system-variables/#user-modifiable-settings) for more information.

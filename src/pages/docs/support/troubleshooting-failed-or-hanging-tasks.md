---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Troubleshooting failed or hanging tasks
description: A guide for troubleshooting tasks that fail unexpectedly or are unresponsive
navOrder: 8
---

Sometimes your deployments, health checks, or other tasks may unexpectedly fail, or can even appear unresponsive. This page describes some common issues and strategies to help you overcome these issues.

## Check the logs

The first step to debug your failed tasks is to check the [Task Log](/docs/support/get-the-raw-output-from-a-task). This will usually contain detailed information about the failure. For deployments, this includes the step, and information about the deployment targets that the step was running on.

If a deployment failed unexpectedly within a built-in step, you may have misconfigured the step. Double check the configuration of your [step](/docs/projects/steps/) in your [deployment process](/docs/projects/deployment-process/). If your step is relying on [variables](/docs/projects/variables/), then you may have also misconfigured your variables. There are [some methods](/docs/support/debug-problems-with-octopus-variables) available that can help you debug your variables.

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

Sometimes tasks appear to be unresponsive or "hanging". In most cases, this ends up being anti-virus or anti-malware software interfering with the task, and the first step in diagnosing the problem is to eliminate this source of interference, [see below](#anti-virus-software). 

If you can completely rule out anti-virus software as a source of interference, then the problem may lie in your [custom scripts](/docs/deployments/custom-scripts). The next step to diagnosing these problems is to examine your logs and determine the exact location that the task became unresponsive. If this occurs within the logs output by a custom script, then the bug likely originates from your script.

If you are still unable to determine the cause of your hanging tasks, please contact support for further assistance.

### Anti-virus software {#anti-virus-software}

If the task appears to hang after a log message output by the Octopus Server or Tentacle, then in most cases the cause is anti-virus or anti-malware software interfering with the task. The first step is to determine if your anti-virus software is actually affecting your Tasks, and this can easily be done by removing your anti-virus protection and confirming whether the tasks continue to be unresponsive.

If this test shows that anti-virus is interfering with your tasks, you may need to configure your anti-virus software with the appropriate exclusions to ensure that it does not lock any files owned by Octopus, or affect any running processes initiated by Octopus. Consult your anti-virus provider's documentation for more information.

Some examples of directories (and their sub-directories) you could try adding to an allow list are:

- `<Tentacle Home>\Tools`
    - This is where the Calamari packages and other tools are installed so Tentacle can execute deployments on your behalf.
- `<Tentacle Home>\Work`
    - This is the temporary working directory used when Tentacle and Calamari execute deployments on your behalf.

If you're still seeing issues you could also try including these additional directories (and their sub-directories):

- `<Tentacle Home>\Files`
    - This is the package cache used to store the most recent packages in case they need to be used again.
- `<Tentacle Home>\Logs`
    - This is where the Tentacle log files are stored.

:::div{.hint}
We recommend including sub-directories in any allow list for the directories listed above as processes initiated by Octopus may also create new folders within them.
:::

## Steps are slow to start

If you notice that your PowerShell script or built-in steps take a while to begin execution, and the time is consistent across your steps, then you may have something in your Tentacle user's PowerShell profile which is causing PowerShell to take a long time to initialize. Add the `Octopus.Action.PowerShell.ExecuteWithoutProfile` variable to your deployment to help diagnose this problem. See [System Variables](/docs/projects/variables/system-variables/#Systemvariables-User-modifiablesettings) for more information.
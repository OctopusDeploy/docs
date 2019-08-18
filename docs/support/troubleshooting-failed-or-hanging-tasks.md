---
title: Troubleshooting Failed or Hanging Tasks
description: A guide for troubleshooting tasks that fail unexpectedly or are unresponsive
position: 8
---

Sometimes your deployments, health checks, or other tasks may unexpectedly fail, or can even appear unresponsive. This page describes some common issues along with strategies to help you overcome them.

## Check the Logs

The first step to debug your failed tasks is to check the [Task Log](docs/support/get-the-raw-output-from-a-task.md). This will usually contain detailed information about the failure. For deployments, this includes the step, and information about the deployment targets that the step was running on.

If a deployment failed unexpectedly within a built-in step, you may have misconfigured the step. Double check the configuration of your step in your deployment process. If your step is relying on variables, then you may have also misconfigured your variables. There are [some methods](docs/support/debug-problems-with-octopus-variables.md) available that can help you debug your variables.

If none of the above steps help, then you may have encountered a bug in a built-in step, in which case you can contact support for further assistance.

## Networking Errors

If your task logs contain errors that indicate a networking issue, there could be a few possible causes.

### Connections between Octopus Server and Tentacles

Octopus Server communicates with Tentacles in either Listening mode or Polling mode. Both modes require different configuration. 

A common problem is that traffic on the appropriate ports (10933 by default for Listening Tentacles) is not allowed by your firewall. If you are encountering problems with your connections, then your Task log might show messages that indicate a connection timing out, or a connection that was rejected by the remote host.

See [Tentacle Communication Modes](docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md) for more information on configuring your Tentacles.

#### Halibut

The tool that manages connections between Octopus Server and your Tentacles is called [Halibut](https://github.com/OctopusDeploy/Halibut/). In order to discover more detailed information about the connections, it may be useful to [increase the log level for Halibut](docs/support/log-files.md#Logfiles-Changingloglevelshalibut). The same change to increase the log level for Halibut can also be made on [Tentacle](docs/support/log-files.md#Logfiles-Changingloglevelstentacle).

### Connections to external services

Steps that execute on Deployment Targets or Workers may need to reach out to contact other external services. In these cases, a useful first step to help diagnose the problem is to attempt to manually perform the same connection - this can help to isolate the problem to a networking issue rather than a problem with Octopus Deploy.

Remember that these connections are usually initiated by your Deployment Targets or Workers, and not by Octopus Server. You may need to remotely connect to these remote machines, and then initiate a connection from those machines. This is distinct from attempting to establish the connection on the machine that hosts Octopus Server itself.

## Hanging Tasks

Sometimes tasks appear to be unresponsive or "hanging". The first step to diagnosing these problems is to examine your logs and determine the exact location that the task became unresponsive. If this occurs within the logs output by a custom script, then the bug is likely to originate from your script.

### Anti-virus software

If the task appears to hang after a log message output by Octopus Server or Tentacle, then the cause may be anti-virus software interfering with the task.

The first step is to determine if your anti-virus software is actually affecting your Tasks, and this can easily be done by disabling your anti-virus protection and confirming whether the tasks continue to be unresponsive.

If this test shows that anti-virus is interfering with your tasks, you may need to configure your anti-virus software with the appropriate exclusions to ensure that it does not lock any files owned by Octopus, or affect any running processes initiated by Octopus. Consult your anti-virus provider's documentation for more information.
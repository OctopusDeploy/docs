---
title: Record a performance trace
description: How to record a software performance trace of your running Octopus Server so we can solve performance issues.
position: 27
---

If you are experiencing a problem with the performance of your Octopus installation we may ask you to record a performance trace and send the recording to us for analysis.

Performance analysis is most successful when you can provide us with a full picture of the problem at hand:

- Recording of server metrics like CPU, RAM, Disk I/O and any other metrics which may be useful
- Detailed Octopus logs
- The performance trace recording itself

## Privacy

We use [JetBrains dotTrace](https://www.jetbrains.com/profiler/) to record and analyze the performance trace. We are only concerned with which functions are called, how often they are called, and how long they take to execute. To protect your privacy we will provide you with a secure location to upload the recording, only use the recording for the performance analysis, and then delete all traces of the recording.

## Getting prepared

:::hint
Some of these steps may require you to restart the Octopus Server. If you cannot restart the Octopus Server, or restarting the Octopus Server would remediate the problem, don't worry about reconfiguring Octopus logging. The most important thing is to record the performance trace while the problem is occurring.
:::

1. Download and install a trial of [JetBrains dotTrace](https://www.jetbrains.com/profiler/) on your Octopus Server
2. [Enable detailed Octopus logging](/docs/reference/log-files.md)
3. [Enable web request logging](enable-web-request-logging.md)
4. Start recording CPU, RAM and Disk I/O using performance monitor (or similar)

## Recording the performance trace

:::hint
We don't usually need a long recording, the most important thing is to get a recording of a short period of time where the problem occurs. This may be during a particular deployment, or when another Octopus task is running (like retention policy processing or health checks), or perhaps it's just happening throughout the day.

If we haven't asked for anything specific, start with a 1-5 minute recording so we can analyze it and go from there.
:::

1. Install dotTrace on the Octopus Server and start a free trial.
2. Start dotTrace as an Administrator
3. Start a [timeline trace](https://www.jetbrains.com/help/profiler/10.0/Concurrency_Profiling_Timeline_.html) by [attaching to the running Octopus Server process](https://www.jetbrains.com/help/profiler/10.0/Profile_Running_Process.html)
4. When enough time has passed, take a [snapshot](https://www.jetbrains.com/help/profiler/10.0/Profiling_Guidelines__Launching_and_Controlling_the_Profiling_Process.html) using `Get Snapshot'n'Wait`
5. Detach from the process.
6. Close dotTrace
7. Zip the dotTrace recording, the Octopus Server logs, Task Logs for tasks running during that period of time, and server metrics or a performance chart covering that period in time
8. Upload the zip file bundle to the secure and private share which should have been provided by an Octopus team member, then get back in touch with us - unfortunately we don't get notified of file uploads
9. [Pause the dotTrace trial](https://www.jetbrains.com/help/profiler/10.0/Configuring_dotTrace__Configuring_License_Information.html) when you've finished recording. 

## Analysis

Due to the nature and depth of these investigations it may take a little while to analyze the performance trace and get to the bottom of what's happening.

### DIY performance analysis

We ship debugging symbols (PDB) files in the box with Octopus Server. This means you can use the dotTrace tooling to do your own analysis and understand exactly which functions could be causing the problem.
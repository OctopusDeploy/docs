---
title: Record Memory Snapshots
description: How to record memory snapshots of your running Octopus Server so we can solve memory issues.
position: 28
---

If you are experiencing a problem with the memory consumption of your Octopus installation we may ask you to record some memory snapshots and send them through to us for analysis.

Memory analysis is most successful when you can provide us with a full picture of the problem at hand:

- Recording of server metrics like CPU, RAM, Disk I/O and any other metrics which may be useful
- Detailed Octopus logs.
- The exported dotMemory Workspace (containing the snapshots you've recorded).

## Privacy

We use [JetBrains dotMemory](https://www.jetbrains.com/dotmemory/) to record and analyze the memory snapshots. We are only concerned with memory allocations, whether there is a memory leak, and which functions allocated the memory. To protect your privacy we will provide you with a secure location to upload the snapshots and any supporting data, only use the data you provide for the memory analysis, and then delete everything once the analysis has been completed.

## Getting Prepared

1. [Enable detailed Octopus logging](/docs/support/log-files.md) - doesn't require a restart.
2. Start recording CPU, RAM and Disk I/O using performance monitor (or similar).

## Recording the Memory Snapshots

:::hint
We usually only need one or two snapshots, the most important thing is that the snapshots cover the period of time where the problem occurs. This may be during a particular deployment, or when another Octopus task is running (like retention policy processing or health checks), or perhaps it's just happening throughout the day.

If we haven't asked for anything specific, start by taking a single snapshot of your running Octopus Server so we can analyze it and go from there.
:::

### Get a Snapshot From Your Running Octopus Server

This is the best way to start, especially if you cannot restart your Octopus Server, or if the memory problem takes a long time to occur or is difficult to reproduce. It requires a small standalone executable called `dotmemory.exe` which will take snapshots of your running Octopus Server.

1. Download the [dotMemory command-line tool](https://www.jetbrains.com/dotmemory/download/#section=command-line-profiler) and extract it to a location on the Octopus Server like `C:\tools\dotmemory.exe`.
2. Open a command prompt as an Administrator (elevation is required).
3. Run: `dotmemory.exe get-snapshot Octopus.Server`.
4. Take note of the location where the dotMemory workspace file was saved (you'll need this later).
5. Use Octopus in a way which causes the memory problem.
6. Get another snapshot using the same command as before.
7. Zip the dotMemory Workspaces, the Octopus Server logs, Task Logs for tasks running during that period of time, and server metrics or a performance chart covering that period in time.
8. Upload the zip file bundle to the secure and private share which should have been provided by an Octopus team member, then get back in touch with us - unfortunately we don't get notified of file uploads.

### Start Octopus Server with dotMemory (alternative method)

If you can easily restart your Octopus Server, and the problem you are experiencing is reproducible, you can start Octopus Server with dotMemory for a better result. Starting Octopus Server with dotMemory means it can record the source of the memory allocations and help us track down the root cause of any memory leaks.

1. Download the [JetBrains dotMemory application](https://www.jetbrains.com/dotmemory/) and install it on the machine hosting Octopus Server.
2. Start dotMemory **as an Administrator** and start a free trial (the trial can be paused afterwards).
3. Stop the Octopus Deploy windows service.
4. Configure dotMemory to start your Octopus Server windows service.
![dotMemory start Octopus Server](record-a-memory-trace-start-windows-service.png).
5. If everything is working as expected you should see a screen like the one shown below
![dotMemory take snapshot](record-a-memory-trace-take-snapshot.png).
6. Take a snapshot just after the Octopus Server has started.
7. Use Octopus in a way which causes the memory problem.
8. Take another snapshot.
9. Once it is safe, stop the Octopus Server process using dotMemory.
10. Start your Octopus Server normally again.
11. Export the dotMemory Workspace so you can share it with us.
12. Close dotMemory.
13. Zip the exported dotMemory Workspace, the Octopus Server logs, Task Logs for tasks running during that period of time, and server metrics or a performance chart covering that period in time.
14. Upload the zip file bundle to the secure and private share which should have been provided by an Octopus team member, then get back in touch with us - unfortunately we don't get notified of file uploads.

## Analysis

Due to the nature and depth of these investigations it may take a little while to analyze the memory snapshots and get to the bottom of what's happening.

### DIY Memory Analysis

We ship debugging symbols (PDB) files in the box with Octopus Server. This means you can use the dotMemory tooling to do your own analysis and understand the root cause of any memory problems.

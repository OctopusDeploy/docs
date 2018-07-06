---
title: Process Dumps
description: Octopus Server and Tentacle process dumps
position: 14
---

For some problems, such as unresponsive servers/Tentacles and hung tasks, providing a dump or dump analysis of the Octopus Server and/or Tentacle process may speed up diagnosis and resolution.

## Creating a Process Dump

:::warning
A process dump consists of all the memory the process is currently using. 
This includes deployment variables, credentials and certificates.

Therefore we take great care in handling these dumps and will provide a 
secure upload facility. We will also delete them as soon as they have been analyzed.
:::

:::warning
Creating a process dump will pause the process for anywhere between a few seconds
to a few minutes, depending on the amount of memory in use and the disk speed
:::

1. Right click on the task bar and select 'Task Manager`
1. Select the `Details` tab
1. Find the `Octopus.Server.exe` or `Tentacle.exe` process
1. Right click on it and select `Create dump file`
1. Note where the file is saved (generally in your temp folder)


## Dump File Analysis 

This process creates an analysis file from a process dump file. This analysis file
contains a limited set of information outlining the current state of the 
application. This file can contain connection strings, Tentacle thumbprints, project, step and machine names.
It should not contain sensitive variables or certificates. For our purposes it contains for which threads 
are running and where they are in the code.

:::success
This process can be performed on a different computer to the one the dump file was captured on
:::

1. Download and install the [Debug Diagnostics tools](https://www.microsoft.com/en-us/download/details.aspx?id=49924)
from microsoft
1. Run `DebugDiag Analysis` from the start menu
1. Check `CrashHangAnalysis`
1. Click `Add Data Files` and select the demo file.
1. Click `Start Analysis`
1. Wait

The result will open in Internet Explorer. Note the location of the file, 
which is usually in `<MyDocuments>\DebugDiag\Reports`.

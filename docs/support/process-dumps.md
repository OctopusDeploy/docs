---
title: Process dumps
description: Octopus Server and Tentacle process dumps
position: 14
---

For some problems, such as unresponsive servers/Tentacles and hung tasks, providing a dump or dump analysis of the Octopus Server and/or Tentacle process may speed up diagnosis and resolution.

## Create a process dump

A process dump consists of all the memory the process is currently using.
This includes deployment variables, credentials and certificates.

Creating a process dump will pause the process for anywhere between a few seconds
to a few minutes, depending on the amount of memory in use and the disk speed.

:::hint
Due to the nature of data contained in a process dump, we take great care in handling these files and will provide a secure upload facility. 
We will also delete them as soon as they have been analyzed.
:::

1. Right click on the task bar and select **Task Manager**.
1. Select the **Details** tab.
1. Find the relevant process. That will either be:
   - **Octopus.Server.exe** or
   - **Tentacle.exe** (and any **Calamari.exe** processes).
1. Right click on it and select **Create dump file**.
1. Note where the file is saved (generally in your temp folder).

:::warning
When capturing a process dump for **Tentacle.exe**, please make sure to also capture any child **Calamari.exe** processes.
:::

## Dump file analysis

This process creates an analysis file from a process dump file. This analysis file contains a limited set of information outlining the current state of the
application. This file can contain connection strings, Tentacle thumbprints, project, step and machine names.

It should not contain sensitive variables or certificates. For our purposes it contains for which threads are running and where they are in the code.

:::hint
This process can be performed on a different computer to the one the dump file was captured on
:::

1. Download and install the [Debug Diagnostics tools](https://www.microsoft.com/en-us/download/details.aspx?id=49924)
from Microsoft.
1. Run `DebugDiag Analysis` from the start menu.
1. Check `CrashHangAnalysis`.
1. Click `Add Data Files` and select the dump file.
1. Click `Start Analysis`.
1. Wait.

The result will open in Internet Explorer. Note the location of the file,
which is usually in `<MyDocuments>\DebugDiag\Reports`.

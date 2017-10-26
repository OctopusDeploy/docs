---
title: Minimize the data-migration time 
description: Tips to minimize the time taken to migrate your data from Octopus 2.6 to 3.x 
position: 5
---

Migrating data from a 2.6 backup file into an Octopus 3.x instance can take a significant time to run (hours or even days in some cases).  

We strongly recommend taking the following actions to minimize the migration duration.  

## Remove unnecessary data from your 2.6 instance 

Our strongest recommendation is to use [retention-policies](/docs/administration/retention-policies) in your 2.6 instance to remove some data.

The goal is for the document count in the 2.6 RavenDB as low as possible.
You can find the document count by viewing Raven through the Octopus Manager. The document count is in the footer of the RavenDB studio.
Less than 150k documents is a rule-of-thumb.

:::hint
The original complete backup can always be retained if it is required for audit purposes.
:::


## RAM, RAM and more RAM

The migrator is a memory-hungry process.  Allocate (possibly temporarily) the machine which will execute the migrator process as much memory as possible.  The more memory is available, the faster the process will run.

As a rule-of-thumb: 

- If your .octobak file is > 500MB, allow at least 16GB of RAM 
- If your .octobak file is >1GB, allow at least 32GB of RAM

## No Logs

To minimize the initial migration time, you can skip migrating the server-task log files.  
This option is available as a check-box in the Octopus Manager, or can be supplied as a `--nologs` option if running via the [command-line](/docs/api-and-integration/octopus.migrator.exe-command-line/migrator-import).

:::hint
The logs can always be imported later using the `--onlylogs` option if required
:::
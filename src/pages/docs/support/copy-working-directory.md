---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Copy the working directory 
description: Copy the Calamari working directory to assist in debugging.
navOrder: 2 
---

It can be frustrating when a deployment step isn't working as expected.  Often the working directory is deleted before it is able to be inspected.

A handy way to debug is by using the variable `Octopus.Calamari.CopyWorkingDirectoryIncludingKeyTo`, which if set to a file-path will cause the [Calamari](/docs/octopus-rest-api/calamari) working directory to be copied to the configured location. The file-path location is local to the deployment target, so setting the value to c:\temp or #{Octopus.Agent.ProgramDirectoryPath}/#{Octopus.Release.Number} will copy the working directory to these folders on each of the targets. 

:::warning
The copied directory will include a file which contains the secret one-time key passed to Calamari to decrypt the sensitive variables used in the deployment.  
This directory (or at least the `Variable.secret` file) should be deleted once no longer required.
:::

This variable was created primarily for use by Octopus staff during development. We have documented it publicly as it has proven useful to our customers on occasion.  Please use it only for debugging purposes.  Do not rely on this behavior as part of your deployment process, as there is no guarantee it will not be removed in the future.

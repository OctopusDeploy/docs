---
title: Copy the Working Directory 
description: Copy the Calamari working directory to assist in debugging.
position: 2 
---

It can be frustrating when a deployment step isn't working as expected.  Often the working directory is deleted before it is able to be inspected.

There is a variable, `Octopus.Calamari.CopyWorkingDirectoryIncludingKeyTo`, which if set to a file-path will cause the [Calamari](/docs/octopus-rest-api/calamari.md) working directory to be copied to the configured location.  This may assist in debugging. 

:::warning
The copied directory will include a file which contains the secret one-time key passed to Calamari to decrypt the sensitive variables used in the deployment.  
This directory (or at least the `Variable.secret` file) should be deleted once no longer required.
:::

This variable was created primarily for use by Octopus staff during development. We have documented it publicly as it has proven useful to our customers on occasion.  Please use it only for debugging purposes.  Do not rely on this behavior as part of your deployment process, as there is no guarantee it will not be removed in the future.
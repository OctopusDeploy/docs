---
title: Delta compression for package transfers
description: Octopus delta compression for package transfers can dramatically reduce the time for package acquisition during deployment.
position: 18
---

Octopus Deploy 3.0 supports delta compression for package transfer using our [delta compression library](https://github.com/OctopusDeploy/Octodiff). Delta compression will speed up the package acquisition phase of your deployments, especially when the limiting factor is transfer bandwidth, or if the delta achieves significant size reduction.

:::info
Delta compression is not available when a package is downloaded directly on your machine(s).
Delta compression is used by default when a package is uploaded from the Built-in repository to the remote machine(s).
Delta compression is used by default when a package is downloaded from an external feed to the Octopus Server's package cache and then uploaded to the remote machine(s).
:::

A typical scenario in Octopus Deploy is frequent deployments of small changes to packages. For example, you might push some code updates but all of your libraries are unchanged. In the past Octopus Deploy would upload the entire package to each machine, regardless of how little had changed. With the introduction of delta compression, only the changes to your package will be uploaded to each machine.

## A package deployment in Octopus Deploy now looks something like this {#Deltacompressionforpackagetransfers-ApackagedeploymentinOctopusDeploynowlookssomethinglikethis}

1. Find nearest previous versions of the package on the machine by calling [Calamari](https://octopus.com/blog/calamari)
2. If a previous version of a package is found and the same package (matching PackageId, Version and file hash) exist on the Octopus Server
3. Create a signature file for the nearest package found
4. Build the delta between the previous package (using the above signature file) and the new package
5. Upload delta file to Tentacle and call Calamari to apply the delta file to the package found in the previous step
6. If no previous version of the package was found, we upload the full package instead

:::info
**Delta file size**
If the final size of the delta file is within 80% of the new package, we upload the full package instead of uploading and applying the delta file as this will save on server resources as applying the delta file can be quite resource heavy with big delta files.
:::

## What if something goes wrong? {#Deltacompressionforpackagetransfers-Whatifsomethinggoeswrong?ifanyofthebelowoccurswewilluploadthefullpackage}

If any of the below occurs the full package will be uploaded:

1. The signature file fails to create
2. The delta file fails to create
3. Applying the delta fails
4. The package details (size and file hash) don't match after applying the delta

## Running a deployment that generates a delta file {#Deltacompressionforpackagetransfers-Runningadeploymentthatgeneratesadeltafile}

When running a deployment that creates and applies a delta file, you will see the following in the logs under the `Acquire packages` section

![](/docs/images/3048083/3277668.png "width=500")

:::hint
**Delta progress logging**
As can be seen in the screenshot above, the logging of the progress of applying the delta doesn't look like it's successfully completed as it's reporting only 20% and 0%(!!). Don't worry though, this is due to a problem with how our delta compression library (Octodiff) reports progress (we will be fixing this logging issue) and it's actually applying the full delta.
:::

## Optimizing delta compression {#OptimizingDeltaCompression}

The best way to guarantee the best size reduction is to use the tools provided by Octopus Deploy when creating your packages. All of our packaging tools are automatically tested to ensure the package contents are bundled in a delta-compression-friendly format.

If you want to use your own tools, that is fine! Just be sure to test the performance of delta compression to make sure you have configured everything correctly.

:::hint
The most common mistake causing delta compression to yield minimal size reduction is when artificial differences are injected into the package file. One example is when timestamps are changed each time the package is built. The tools provied by Octopus Deploy are designed to yield high size reductions based on the actual content of your packaged files.
:::

## Turning delta compression off {#Deltacompressionforpackagetransfers-TurningCompressionoff}

To turn this feature off, set the value of **Octopus.Acquire.DeltaCompressionEnabled** to **False**

![](/docs/images/3048083/5275657.jpg "width=500")

:::hint
**Delta calculations can be CPU intensive**
You should consider disabling delta compression if package transfer bandwidth is not a limiting factor (all the machines are in the same network segment), or if the CPU on the Octopus Server is pegged at 100% during your deployments.
:::

:::hint
**Are you really benefiting from delta compression?**
The deployment logs will tell you the % saving delta compression is achieving. If you are constantly transferring 50% or more of the original package, perhaps delta compression is actually becoming a bottleneck and should be disabled.
:::
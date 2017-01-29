---
title: Delta compression for package transfers
position: 12
---

Octopus Deploy 3.0 supports delta compression for package transfer using our [Delta compression library](https://github.com/OctopusDeploy/Octodiff).

:::hint
Currently the delta compression is only applicable to NuGet steps.
:::

A typical scenario in Octopus Deploy is frequent deployments of small changes to packages. For example, you might push some code updates but all of your libraries are unchanged. In the past Octopus Deploy would upload the entire package to each Tentacle, regardless of how little had changed. With the introduction of delta compression, only the changes to your package will be uploaded to each Tentacle.

## A package deployment in Octopus Deploy now looks something like this {#Deltacompressionforpackagetransfers-ApackagedeploymentinOctopusDeploynowlookssomethinglikethis}

1. Find nearest previous versions of the package on the Tentacle by calling [Calamari](https://octopus.com/blog/calamari)
2. If a previous version of a package is found and the same package (matching PackageId, Version and file hash) exist on the Octopus Server
3. Create a signature file for the nearest package found
4. Build the delta between the previous package (using the above signature file) and the new package
5. Upload delta file to Tentacle and call Calamari to apply the delta file to the package found in the previous step
6. If no previous version of the package was found, we upload the full package instead

:::hint
**Delta file size**
If the final size of the delta file is within 80% of the new package, we upload the full package instead of uploading and applying the delta file as this will save on server resources as applying the delta file can be quite resource heavy with big delta files.
:::

## What if something goes wrong? if any of the below occurs we will upload the full package {#Deltacompressionforpackagetransfers-Whatifsomethinggoeswrong?ifanyofthebelowoccurswewilluploadthefullpackage}

1. If we fail to create the signature file
2. If we fail to create the delta file
3. If applying the delta on the Tentacle fails
4. If the package details (size and file hash) don't match after applying the delta

## Running a deployment that generates a delta file {#Deltacompressionforpackagetransfers-Runningadeploymentthatgeneratesadeltafile}

When running a deployment that creates and applies a delta file, you will see the following in the logs under the `Acquire packages` section

![](/docs/images/3048083/3277668.png "width=500")

:::hint
**Delta progress logging**
As can be seen in the screenshot above, the logging of the progress of applying the delta doesn't look like it's successfully completed as it's reporting only 20% and 0%(!!). Don't worry though, this is due to a problem with how our Delta compression library (Octodiff) reports progress (we will be fixing this logging issue) and it's actually applying the full delta.
:::

## Turning Delta Compression off {#Deltacompressionforpackagetransfers-TurningDeltaCompressionoff}

To turn this feature off, set the value of **Octopus.Acquire.DeltaCompressionEnabled** to **False**

![](/docs/images/3048083/5275657.jpg "width=500")

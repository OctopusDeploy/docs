---
title: Service Fabric PowerShell scripts
description: Service Fabric PowerShell scripts allow you to manage your Service Fabric clusters using the Service Fabric SDK as part of your deployment process.
position: 1
---

:::success
You can use all of the features we provide for [custom scripts](/docs/deploying-applications/custom-scripts/index.md), like [using variables](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Variables), [passing parameters](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Passingparameterstoscripts), publishing [output variables](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Outputvariables) and [collecting artifacts](/docs/deploying-applications/custom-scripts/index.md#Customscripts-Collectingartifacts).
:::

:::hint
The [Service Fabric SDK](https://g.octopushq.com/ServiceFabricSdkDownload) must be installed on the Octopus Server. If this SDK is missing, the step will fail with an error: _"Could not find the Azure Service Fabric SDK on this server."_
:::

This step allows you to run Service Fabric SDK PowerShell cmdlets against your cluster. Once a connection has been established to your Service Fabric cluster, these cmdlets can be used to query or control various aspects of your cluster/applications.

Please see the [Microsoft Service Fabric SDK documentation](https://docs.microsoft.com/en-us/powershell/servicefabric/vlatest/servicefabric) for available cmdlets.

## Example {#ServiceFabricPowerShellScripts-Example}

This example uses the Service Fabric SDK to query the health of an application, from the cluster that we've connected to.

```powershell
# Hey, we can query things about our cluster because this PowerShell session 
# is connected to our SF cluster and we have context!

# Determine the health of an application on our cluster.
$clusterApplication = "fabric:/MyServiceFabricApp"
$health = Get-ServiceFabricApplicationHealth -ApplicationName $clusterApplication
If ($health.AggregatedHealthState -eq "OK") {
    Write-Verbose "$($clusterApplication)'s health is ok!"
} Else {
    Write-Error "$($clusterApplication)'s health was found to be $($health.AggregatedHealthState)!  This is not ok :("
}
```

## Connection Troubleshooting {#ServiceFabricPowerShellScripts-ConnectionTroubleshooting}

Calamari uses the [Connect-ServiceFabricCluster cmdlet](https://docs.microsoft.com/en-us/powershell/servicefabric/vlatest/connect-servicefabriccluster) to connect to your Service Fabric cluster. The connection parameters are logged (Verbose) at the time of a deployment to help if you need to debug connection problems to your Service Fabric cluster.
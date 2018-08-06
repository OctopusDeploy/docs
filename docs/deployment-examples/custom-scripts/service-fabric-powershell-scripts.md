---
title: Service Fabric PowerShell Scripts
description: Service Fabric PowerShell scripts allow you to manage your Service Fabric clusters using the Service Fabric SDK as part of your deployment process.
position: 1
version: "[3.13,)"
---

:::success
You can use all of the features we provide for [custom scripts](/docs/deployment-examples/custom-scripts/index.md), like [using variables](/docs/deployment-examples/custom-scripts/index.md#Customscripts-Variables), [passing parameters](/docs/deployment-examples/custom-scripts/index.md#Customscripts-Passingparameterstoscripts), publishing [output variables](/docs/deployment-examples/custom-scripts/index.md#Customscripts-Outputvariables) and [collecting artifacts](/docs/deployment-examples/custom-scripts/index.md#Customscripts-Collectingartifacts).
:::

:::hint
The [Service Fabric SDK](https://g.octopushq.com/ServiceFabricSdkDownload) must be installed on the Octopus Server. If this SDK is missing, the step will fail with an error: _"Could not find the Azure Service Fabric SDK on this server."_

**PowerShell script execution** may also need to be enabled. See the _"Enable PowerShell script execution"_ section from the above link for more details.

After the above SDK has been installed, you will need to restart your Octopus service before the changes will take effect.
:::

This step allows you to run Service Fabric SDK PowerShell cmdlets against your cluster. Once a connection has been established to your Service Fabric cluster, these cmdlets can be used to query or control various aspects of your cluster/applications.

Please see the [Microsoft Service Fabric SDK documentation](https://docs.microsoft.com/powershell/module/servicefabric/) for available cmdlets.

## Example

This example uses the Service Fabric SDK to query the health of an application, from the cluster that we've connected to.

```powershell
# Hey, we can query things about our cluster because this PowerShell session
# is connected to our SF cluster and we have context!

# Determine the health of an application on our cluster.
$clusterApplication = "fabric:/MyServiceFabricApp"
$health = Get-ServiceFabricApplicationHealth -ApplicationName $clusterApplication
If ($health.AggregatedHealthState -eq "OK") {
    Write-Host "$($clusterApplication)'s health is ok!"
} Else {
    Write-Error "$($clusterApplication)'s health was found to be $($health.AggregatedHealthState)!  This is not ok :("
}
```

## Connection Troubleshooting

Calamari uses the [Connect-ServiceFabricCluster cmdlet](https://docs.microsoft.com/en-us/powershell/servicefabric/vlatest/connect-servicefabriccluster) to connect to your Service Fabric cluster. The connection parameters are logged (Verbose) at the time of a deployment to help if you need to debug connection problems to your Service Fabric cluster.

If you receive an error such as: _"Unable to load DLL 'FabricCommon.dll': The specified module could not be found."_ and you have already installed the Service Fabric SDK on your server, the Octopus service may need to be restarted _after_ this SDK has been installed. Please see the [Service Fabric SDK](https://g.octopushq.com/ServiceFabricSdkDownload) documentation for more information.

If you are using a secure Service Fabric cluster and receive errors such as _"An error occurred during this operation.  Please check the trace logs for more details."_, this is an error from Azure and may indicate that the Octopus Server was unable to connect to the Service Fabric cluster because of security reasons. If you are using [Client Certificates](/docs/deployment-examples/azure-deployments/deploying-to-service-fabric/connecting-securely-with-client-certificates/index.md) for example, please ensure the client certificate is correctly installed on your Octopus Server in the `LocalMachine` (unless you have specifically overridden this store location).

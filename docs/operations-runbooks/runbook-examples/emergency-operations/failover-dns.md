Power outages, natural disasters, or fibre lines being cut in construction projects are just a few things that can cause outages.  One of the most common Disaster Recovery (DR) methods is to have a secondary site where you can update the Domain Name System (DNS) record and be back online.

:::info
While updating the IP address of a DNS entry is quick and easy, you are at the mercy of those changes being propogated throughout the Internet.
:::

## Infrastructure as a Service (IaaS) DNS failover
Popular IaaS providers such as Azure, AWS, or GCP provide a CLI where with a couple of commands, you can update your DNS record to point to another site.

The following example uses the Azure CLI to update the DNS record for OctopusSamples.com

## Create the Runbook

1. To create a runbook, navigate to {{Project, Operations, Runbooks, Add Runbook}}.
2. Give the Runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new **Run an Azure Script** step.
5. Choose **Inline source code (with optional package references)**
6. Enter the following PowerShell code, we recommend using [variables](/docs/projects/variables/index.md) instead of hardcoding entries.

```PowerShell
$resourceGroup = $OctopusParameters["OctoFX.Azure.Resource.Group"]
$zoneName = $OctopusParameters["OctoFX.DNS.Name"]
$ipAddressDR = $OctopusParameters["OctoFX.DR.IP.Address"]
$ipAddressProd = $OctopusParameters["OctoFX.Production.IP.Address"]

az network dns record-set a add-record --resource-group $resourceGroup --zone-name $zoneName --record-set-name www --ipv4-address $ipAddressProd
az network dns record-set a remove-record --resource-group $resourceGroup --zone-name $zoneName --record-set-name www --ipv4-address $ipAddressDR
```

This script within a runbook lets your switch your DNS entry at the click of a button and lets you go back to sleep when this happens in the wee hours of the night.

## Samples
We have a [Target - Windows](https://g.octopushq.com/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `OctoFX` project.

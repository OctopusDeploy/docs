---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Manually failover DNS
description: With Octopus Deploy you can manually failover DNS with a Runbook.
navOrder: 10
---

Power outages, natural disasters, or fiber lines being cut in construction projects are just a few things that can cause outages.  One of the most common Disaster Recovery (DR) methods is to have a secondary site where you can update the Domain Name System (DNS) record and be back online.

:::info
Updating the IP address of a DNS entry is quick and easy, but you are at the mercy of those changes being propagated throughout the Internet.
:::

## Infrastructure as a Service (IaaS) DNS failover

Popular IaaS providers such as Azure, AWS, or GCP provide a CLI to make it easy update your DNS record to point to another site with just a couple of commands.

The following example uses the Azure CLI to update the DNS record for www.octopussamples.com

## Create the runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new **Run an Azure Script** step.
5. Choose **Inline source code (with optional package references)**
6. Enter the following PowerShell code, we recommend using [variables](/docs/projects/variables/) instead of hard-coding entries.

```powershell
$resourceGroup = $OctopusParameters["OctoFX.Azure.Resource.Group"]
$zoneName = $OctopusParameters["OctoFX.DNS.Name"]
$ipAddressDR = $OctopusParameters["OctoFX.DR.IP.Address"]
$ipAddressProd = $OctopusParameters["OctoFX.Production.IP.Address"]

az network dns record-set a add-record --resource-group $resourceGroup --zone-name $zoneName --record-set-name www --ipv4-address $ipAddressProd
az network dns record-set a remove-record --resource-group $resourceGroup --zone-name $zoneName --record-set-name www --ipv4-address $ipAddressDR
```

This script within a runbook lets your switch your DNS entry with the click of a button, so no matter when disaster strikes, it is easy to recover.

## Samples

We have a [Target - Windows](https://oc.to/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `OctoFX` project.

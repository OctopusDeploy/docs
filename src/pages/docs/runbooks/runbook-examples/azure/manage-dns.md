---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Manage DNS records in Azure
description: Create or delete DNS A records in Azure DNS using a runbook.
navOrder: 30
---

[Azure DNS](https://docs.microsoft.com/en-us/azure/dns/dns-overview) is a hosting service for DNS domains that provides name resolution by using Microsoft Azure infrastructure. Using a runbook, Octopus makes it easy to manage DNS records hosted in Azure DNS.

The next section shows how you can create runbooks to manage DNS records:

- [Create DNS record runbook](#create-dnsrecord)
- [Delete DNS record runbook](#delete-dnsrecord)

## Create DNS record runbook {#create-dnsrecord}

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
1. Add a **Run an Azure Script** step, and give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. Choose whether to use the bundled **Azure Tools** or the ones pre-installed on the worker.
1. Choose the **Azure Account** to use:
1. In the **Azure** section, select the variable that references the **Account**. If you don't have an **Azure Account** yet, check our [documentation on how to create one](/docs/infrastructure/accounts/azure/).

![Azure Account variable](images/azure-account-variable.png "width=500")

:::hint
[Azure accounts](/docs/infrastructure/accounts/azure/) can be referenced in a project through a project [variable](/docs/projects/variables/) of the type **Azure account**. 

The [Azure Run a Script](/docs/deployments/azure/running-azure-powershell/) step will allow you to bind the account to an **Azure account** variable, using the [binding syntax](/docs/projects/variables/#Bindingsyntax-Referencingvariablesinstepdefinitions). By using a variable for the account, you can have different accounts used across different environments or regions using [scoping](/docs/projects/variables/#Bindingsyntax-Referencingvariablesinstepdefinitions).
:::
  
9. In the **Inline source code** section, add the following code as a **PowerShell** script:

:::hint
Note the use of Octopus project variables, you will need to make sure you create these for this example to work.  You will also see use of an output variable for the IP address created in a step not shown here.
:::

```powershell
# Provide the IPv4 address to use for the A record
$IPAddress = $OctopusParameters["Octopus.Action[Get IPv4 Address].Output.IPAddress"]
# The resource group associated with the DNS Zone
$resourceGroup = $OctopusParameters["Global.Azure.DNS.ResourceGroup"]
# The DNS Zone name in Azure
$zoneName = $OctopusParameters["Global.Azure.DNS.Samples.ZoneName"]
# The DNS A record name you wish to create
$recordSetName = $OctopusParameters["Project.Azure.DNS.Name"]

Write-Host "Checking for existing DNS A-record for $recordSetName"

$existingRecordSetName = (az network dns record-set a list --resource-group=$resourceGroup --zone-name $zoneName --query "[?name=='$recordSetName'].name | [0]" -o json)

if( -not ([string]::IsNullOrEmpty($existingRecordSetName))) 
{
	Write-Highlight "Skipping DNS creation as $recordSetName already exists"
}
else {
  Write-Highlight "Creating DNS A record for $recordSetName pointing at $IPAddress"
  az network dns record-set a add-record --resource-group $resourceGroup --zone-name $zoneName --record-set-name $recordSetName --ipv4-address $IPAddress
}
```

The script will check to see if the DNS A record specified in the `Project.Azure.DNS.Name` variable exists. If it does, it skips creation of the record. If not, it will create the record using the Azure CLI `add-record` command.

Configure any other settings for the step and click **Save**, and in just a few steps, we've created a runbook to automate the creation of a DNS A record hosted in Azure.

## Delete DNS record runbook {#delete-dnsrecord}

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
1. Add a **Run an Azure Script** step, and give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. Choose whether to use the bundled **Azure Tools**, or the ones pre-installed on the worker.
1. Choose the **Azure Account** to use:
1. In the **Azure** section, select the variable that references the **Account**. If you don't have an **Azure Account Variable** yet, check our [documentation on how to create one](/docs/infrastructure/accounts/azure/).
1. In the **Inline source code** section, add the following code as a **PowerShell** script:

:::hint
Note the use of Octopus project variables, you will need to make sure you create these for this example to work.  You will also see use of an output variable for the IP address obtained in a step not shown here.
:::

```powershell
# Provide the IPv4 address of the associated A record to be deleted.
$IPAddress = $OctopusParameters["Octopus.Action[Get IPv4 Address].Output.IPAddress"]
# The resource group associated with the DNS Zone
$resourceGroup = $OctopusParameters["Global.Azure.DNS.ResourceGroup"]
# The DNS Zone name in Azure
$zoneName = $OctopusParameters["Global.Azure.DNS.Samples.ZoneName"]
# The DNS A record search pattern to look for in Azure DNS to remove.
$dnsTag = $OctopusParameters["Project.Azure.DNS.Tag"]

Write-Host "Checking for existing DNS A-records for $dnsTag"

$allDnsRecords = (az network dns record-set a list --resource-group=$resourceGroup --zone-name $zoneName --query "[*].name" -o json | ConvertFrom-Json)
$matchingRecords = $allDnsRecords.Where{ $_ -like "$dnsTag*"}

$recordCount = $allDnsRecords.Count
$matchingCount = $matchingRecords.Count
Write-Highlight "Found $matchingCount (out of $recordCount) DNS A-records matching $dnsTag"
if($matchingCount -gt 0) 
{
	if(([string]::IsNullOrEmpty($IPAddress))) 
	{
    	Write-Warning "Skipping DNS deletion as IP Address is not set/found"
	}
    else {
      foreach($dnsRecord in $matchingRecords) {
          Write-Host "Deleting DNS Record: $dnsRecord pointing at $IPAddress"
          az network dns record-set a remove-record --resource-group $resourceGroup --zone-name $zoneName --record-set-name $dnsRecord --ipv4-address $IPAddress
      }
    }
}
else {
	Write-Highlight "Skipping DNS deletion as no records found"
}

Write-Host "Completed deletion of existing DNS for $dnsTag"
```

The script will check to see if the DNS A record specified in the `Project.Azure.DNS.Tag` variable exists. If it does, it will proceed to delete the record using the the Azure CLI `remove-record` command. If it doesn't, it skips deleting any records.

Configure any other settings for the step and click **Save**, and in just a few steps, we've created a runbook to automate the deletion of a DNS A record hosted in Azure.

## Samples

We have a [Pattern - Rolling](https://oc.to/PatternRollingSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at these examples in the `PetClinic Infrastructure` project:
- The Create DNS record step is located in the `Spin up GCP PetClinic Project Infrastructure` runbook.
- The Delete DNS record step is located in the `Destroy the GCP Kraken` runbook.
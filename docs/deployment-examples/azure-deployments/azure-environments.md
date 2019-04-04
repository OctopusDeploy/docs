---
title: Azure Environments
description: Information on how to use alternate Azure environments.
position: 6
---

The vast majority of Azure users and subscriptions operate in the AzureCloud environment.  There are also an increasing number of other Azure environments, for example Azure Germany, Azure China, Azure US Gov, Azure US DoD.  These are designed to be isolated from other cloud environments, and as such have their own hosting and API endpoints etc.  In order to deploy to these environments from Octopus Deploy the endpoint configuration must therefore be overridden.  This page describes how to go about overriding the values.

The defaults for all of the settings related to the environment are blank, which denotes the use of the AzureCloud environment.

The first thing you are going to need when overriding the values is to know what the endpoints are for your target environment.  You can get these using the following PowerShell command (Note: you have to have the Azure PowerShell modules loaded).

```powershell
Get-AzureEnvironment
```

You'll usually see a number of entries displayed.  Below is the details for one of the environments:

![Azure Germany cloud details](de.png)

Armed with that information you now need to head over to the Azure Account page in Octopus Deploy.  Depending on the authentication method (Management Certificate or Service Principal) the UI will look slightly different.  Service Principal accounts will appear as follows:

![Service Principal fields](sp.png)

And Management Certificate accounts as below:

![Management Certificate fields](mc.png)

Once you have entered the environment name and endpoint values you should **Save and Test** the account.

## Step Templates
Whenever you are using an Azure step template, once you've selected an account its settings will be used to determine the endpoints for all of the API operations.  So lists like Resource Groups and Web Apps will be loaded using the endpoints defined by the Account.

## Calamari and Deployments
When a deployment executes, the values for the environment and endpoints will be passed to Calamari if they have been overridden (i.e. they aren't blank).  You will be able to see the values if you have [OctopusPrintVariables set to true](/docs/support/debug-problems-with-octopus-variables.md#DebugproblemswithOctopusvariables-Writethevariablestothedeploymentlog) and Calamari will also always log an information message to tell you if it's using overridden values and what they are.

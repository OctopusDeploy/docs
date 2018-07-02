---
title: Outbound Requests
description: Traffic details of network requests made by Octopus and Tentacle, and what information is included when Octopus checks for updates.
position: 25
---

This page describes any outbound network requests made by Octopus and Tentacle, and what information is included when Octopus checks for updates.

## Outbound requests by Tentacle {#Outboundrequests-OutboundrequestsbyTentacle}

For security reasons, we minimize the number of outbound requests made by the Tentacle deployment agent. The only outbound requests you should see are for:

- [Certificate revocation list checking](http://en.wikipedia.org/wiki/Revocation_list), which is a security feature of the .NET framework.
- [Automatic root certificate updates](http://help.octopusdeploy.com/discussions/problems/30827), again triggered by the .NET framework
- NuGet package downloads (only when using the **Tentacle downloads directly from NuGet** option).
- Connections back to the Octopus server (only when Tentacle is configured in [polling mode](/docs/infrastructure/windows-targets/tentacle-communication.md#polling-tentacles)).

It's possible that PowerShell scripts in your packages may make outbound requests; in this case you should take care when deploying packages created by a third party.

## Outbound requests by Octopus {#Outboundrequests-OutboundrequestsbyOctopus}

The Octopus Deploy server makes the following outbound requests:

1. Pushing packages and deployment instructions, and checking the health, of Tentacles
2. Downloading packages from the [NuGet feeds](/docs/packaging-applications/package-repositories/index.md) that you configure
3. Windows Azure traffic (only when deploying to an Azure deployment target)
4. Checking for updates (if enabled)
5. Checking for updated [community contribute step templates](docs/deployment-process/steps/community-step-templates.md)  (if enabled)

NOTE: Our community contributed step template integration queries `library.octopus.com` for updates.

## What information is included when Octopus checks for updates? {#Outboundrequests-WhatinformationisincludedwhenOctopuschecksforupdates?}

During installation, Octopus will ask you whether you want to check for new releases, and whether you would also like to opt-in to providing usage statistics to help us understand how the product is used and how we can improve it.

![](/docs/images/3048073/3277613.png "width=500")

When the checkbox "Automatically check for new Octopus releases" is checked during installation, Octopus will make a HTTPS request to the `octopus.com` domain every 8 hours. This request includes:

- The current Octopus Deploy version number that you are running
- A unique installation ID (read more below)

:::hint
**Microsoft Azure**
The octopus.com site is hosted on Microsoft Azure, so you will see traffic going to Azure services.
:::

In addition, if you also check the box "Help improve Octopus by sending usage statistics", we'll send some specific aggregate criteria along with the request. This has evolved a bit over time, so it depends on the version you are running:

| Metrics       | Since   |
| ------------- | ------- |
| The number of environments that you have | <2.6 |
| The number of machines and deployment targets that you have (including Listening Tentacles, Polling Tentacles, Offline package drops, Azure Web Apps, Azure Cloud Services and SSH connections) | <2.6 |
| The number of projects that you have | <2.6 |
| The number of each of the different types of deployment steps that you have | <2.6 |
| The number of releases and deployments that you have done in the last 90 days | <2.6 |
| The number of users that you have | <2.6 |
| A SHA1 hash of your license key serial number | 2.6 |
| The amount of memory Octopus is using | 2.6 |
| The % of CPU Octopus is using on average | 2.6 |
| The number of channels you are using | 3.2 |
| Usage of multi-tenant features (number of tenants, number of tenant tags) | 3.4 |
| The number of certificates you have | 3.11.2 |
| The time to your first deployment | 3.12 |
| Whether you are using LetsEncrypt | 3.15 |
| Whether you are using the guest account | 3.16.1 |
| The number of each of the different community steps you have | 2018.2.2 |
| The number of Azure accounts and AWS accounts | 2018.2.2 |
| Whether you have a custom account configured for the built-in worker | 2018.2.2 |
| The number of non built-in workers you have | 2018.2.2 |

The installation ID is a GUID that we generate when Octopus is installed. This GUID is simply a way for us to get a rough idea of the number of installations there are in the wild, and which versions people are using, so we can make decisions about backwards compatibility support.

Together, this information helps us when making decisions about the product. For example, we expected users to only have a handful of machines, but the statistics tell us that some customers have over 900; we now take that into account when designing the user experience.

Be assured that **we only send a *count* of the items, and no other details** - names, descriptions, URI's and so on are _never_ included.

Please do consider enabling usage statistics reporting. We look at the data every week, and it really does help us to make a better product.

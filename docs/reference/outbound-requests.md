---
title: Outbound requests
position: 1
---

This page describes any outbound network requests made by Octopus and Tentacle, and what information is included when Octopus checks for updates.

## Outbound requests by Tentacle {#Outboundrequests-OutboundrequestsbyTentacle}

For security reasons, we minimize the number of outbound requests made by the Tentacle deployment agent. The only outbound requests you should see are for:

- [Certificate revocation list checking](http://en.wikipedia.org/wiki/Revocation_list), which is a security feature of the .NET framework.
- [Automatic root certificate updates](http://help.octopusdeploy.com/discussions/problems/30827), again triggered by the .NET framework
- NuGet package downloads (only when using the **Tentacle downloads directly from NuGet** option)
- Connections back to the Octopus server (only when Tentacle is configured in [polling mode](/docs/installation/installing-tentacles/polling-tentacles.md))

It's possible that PowerShell scripts in your packages may make outbound requests; in this case you should take care when deploying packages created by a third party.

## Outbound requests by Octopus {#Outboundrequests-OutboundrequestsbyOctopus}

The Octopus Deploy server makes the following outbound requests:

1. Pushing packages and deployment instructions, and checking the health, of Tentacles
2. Downloading packages from the [NuGet feeds](/docs/packaging-applications/package-repositories/index.md) that you configure
3. Windows Azure traffic (only when deploying to an Azure deployment target)
4. Checking for updates (if enabled)

## What information is included when Octopus checks for updates? {#Outboundrequests-WhatinformationisincludedwhenOctopuschecksforupdates?}

During installation, Octopus will ask you whether you want to check for new releases, and whether you would also like to opt-in to providing usage statistics to help us understand how the product is used and how we can improve it.

![](/docs/images/3048073/3277613.png "width=500")

When the checkbox "Automatically check for new Octopus releases" is checked during installation, Octopus will make a HTTPS request to the `octopusdeploy.com` domain every 8 hours. This request includes:

1. The current Octopus Deploy version number that you are running
2. A unique installation ID (read more below)

:::hint
**AWS**
The octopusdeploy.com site is hosted on Amazon AWS EC2, so you will see traffic going to AWS services.
:::

In addition, if you also check the box "Help improve Octopus by sending usage statistics", we'll attach:

1. The number of environments that you have
2. The number of machines and deployment targets that you have (including Listening Tentacles, Polling Tentacles, Offline package drops, Azure Web Apps, Azure Cloud Services and SSH connections)
3. The number of projects that you have
4. The number of each of the different types of deployment steps that you have
5. The number of releases and deployments that you have done in the last 90 days
6. The number of users that you have
7. (As of 2.6) A SHA1 hash of your license key serial number
8. (As of 2.6) The amount of memory Octopus is using
9. (As of 2.6) The % of CPU Octopus is using on average

The installation ID is a GUID that we generate when Octopus is installed. This GUID is simply a way for us to get a rough idea of the number of installations there are in the wild, and which versions people are using, so we can make decisions about backwards compatibility support.

Together, this information helps us when making decisions about the product. For example, we expected users to only have a handful of machines, but the statistics tell us that some customers have over 900; we now take that into account when designing the user experience.

Be assured that **we only send a *count* of the items, and no other details** - names, descriptions, URI's and so on are \_never\_ included.

Please do consider enabling usage statistics reporting. We look at the data every week, and it really does help us to make a better product.

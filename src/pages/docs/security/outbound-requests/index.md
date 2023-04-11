---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Outbound requests
description: Traffic details of network requests made by Octopus and Tentacle, and what information is included when Octopus checks for updates.
navOrder: 25
---

This page describes any outbound network requests made by Octopus and Tentacle, and what information is included when Octopus checks for updates.

## Outbound requests by Tentacle {#Outboundrequests-OutboundrequestsbyTentacle}

For security reasons, we minimize the number of outbound requests made by the Tentacle deployment agent. The only outbound requests you should see are for:

- [Certificate revocation list checking](http://en.wikipedia.org/wiki/Revocation_list), which is a security feature of .NET.
- [Automatic root certificate updates](https://help.octopus.com/t/crl-ocsp-lookups-and-akamai-url-hits-from-octopus-and-tentacles/4854/3), again triggered by .NET.
- NuGet package downloads (only when using the **Tentacle downloads directly from NuGet** option).
- Connections back to the Octopus Server (only when Tentacle is configured in [polling mode](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#polling-tentacles)).

It's possible that scripts in your packages may make outbound requests; in this case you should take care when deploying packages created by a third party.

## Outbound requests by Octopus {#Outboundrequests-OutboundrequestsbyOctopus}

The Octopus Server makes the following outbound requests:

1. Pushing packages and deployment instructions, and checking the health, of Tentacles.
2. Downloading packages from the [NuGet feeds](/docs/packaging-applications/package-repositories/index.md) that you configure.
3. Windows Azure traffic (only when deploying to an Azure deployment target).
4. Checking for updates (if enabled).
5. Checking for updated [built-in step templates](/docs/projects/built-in-step-templates/index.md) (if enabled).
6. Checking for updated [community contributed step templates](/docs/projects/community-step-templates.md) (if enabled).
7. Behavioral telemetry is sent to https://telemetry.octopus.com (if enabled).

### Built-in step templates

From **Octopus 2022.1** some built-in step templates can be automatically updated. Octopus will make requests to the following URLs in order to check for and download updated versions of step templates:

- `steps-feed.octopus.com`
- `stepsprodpackages.blob.core.windows.net`. The infrastructure for the service that hosts the updated versions of step templates runs in Azure.

### Community contributed step templates

Our community contributed step template integration queries `library.octopus.com` for updates.

## What information is included when Octopus checks for updates? {#Outboundrequests-WhatinformationisincludedwhenOctopuschecksforupdates?}

By default, Octopus will periodically check for new releases. You can opt-out of checking for updates by navigating to **{{Configuration,Settings,Updates}}** in Octopus.

When the "Check for updates" option is enabled, Octopus will make a HTTPS request to the `octopus.com` domain every 8 hours. This request includes:

- The current Octopus Deploy version number that you are running.
- A unique installation ID.

:::hint
**Microsoft Azure**
The Octopus.com site is hosted on Microsoft Azure, so you will see traffic going to Azure services.
:::

## Disabling outbound requests

In isolated/air-gapped scenarios without access to the internet, it may prove beneficial to disable attempts to contact these external services to prevent failed tasks and/or errors in the logs. Details on how to disable each feature are as follows:
* Octopus Server updates
  * Via the Web Portal: **{{ Configuration, Settings, Updates }}**
  * Via the CLI [configure command](/docs/octopus-rest-api/octopus.server.exe-command-line/configure.md): `Octopus.Server.exe configure --upgradeCheck=false`
* Built-in step template updates
  * Via the Web Portal: **{{ Configuration, Features, Step Template Updates }}**
* Community step updates
  * Via the Web Portal: **{{ Configuration, Features, Community Step Templates }}**
* Telemetry
  * Via the Web Portal: **{{ Configuration, Telemetry }}**
  * Via the CLI [configure command](/docs/octopus-rest-api/octopus.server.exe-command-line/configure.md): `Octopus.Server.exe configure --sendTelemetry=false`
* Dynamic Extensions
  * Via the CLI [configure command](/docs/octopus-rest-api/octopus.server.exe-command-line/configure.md): `Octopus.Server.exe configure --dynamicExtensionsEnabled=false`

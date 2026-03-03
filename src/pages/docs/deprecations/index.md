---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-12-16
title: Deprecations
description: Upcoming and past deprecations by version for Octopus Server
navOrder: 300
---

## Overview

Occasionally, Octopus will deprecate features that will no longer be supported. These features are eventually removed.

We aim to follow the deprecation lifecycle below:

- Announce deprecation with in-app warnings, newsletters and/or blog posts
- (+6 months) Switch off deprecated functionality
- (+6 months) Remove deprecated functionality

:::div{.warning}
Deprecations are subject to change in detail or time frame.

While Octopus strives to follow the deprecation lifecycle, there are cases where we must act more quickly.

Security fixes or changes to services and dependencies used by Octopus Server, but not managed by Octopus Deploy, may need accelerated timeframes outside of our control. In these cases, we will provide as much notice and mitigation as we can. However, the timelines for change may be earlier than our target of a year's notice.

If you have questions or need help assessing the impact of a deprecation on your Octopus instance, please contact our [support team](https://octopus.com/support).
:::

## Planned Deprecations

## Octopus Tentacle TLS specification deprecation

From **9.0.0 onwards**, Octopus Tentacle will no longer explicitly specify supported TLS versions. Instead, TLS version selection will be delegated to the host operating system. This only applies to network connections between Octopus Tentacle and Octopus Server, both Cloud and self-hosted.

Currently, Tentacle specifies supported TLS versions within Halibut, Octopus’s custom RPC library. This behavior will change so that TLS version is fully controlled by the operating system by default. A feature flag will be available to restore the previous behavior temporarily, but it will be removed in a future release.

Potential impacts include:

- Newer Tentacle host operating systems may not connect to Octopus Server using older TLS versions
- Older Tentacle host operating systems may not connect to Octopus Server if newer TLS versions are not enabled

We expect minimal impact from this change due to the stability and long lifespan of TLS versions.

## TLS 1.0-1.1 Support Deprecation

We're removing support for TLS 1.0 and 1.1 to improve security. This affects both Octopus Cloud and self-hosted customers using our official Linux Docker image.

- **Octopus Cloud**: We'll disable TLS 1.0/1.1 from mid-November 2025, with complete removal by January 2026
- **Self-hosted Docker**: You'll see changes when we upgrade the official image to Debian 12 in January 2026  
- **Self-hosted Windows**: Your setup will continue to work as before

Most customers won't be affected since TLS 1.2+ support is already widely adopted. For detailed information, timeline, and migration guidance, see our blog post: [Deprecating support for TLS 1.0 and 1.1](https://octopus.com/blog/deprecating-tls-1-0-and-1-1)

## Deprecations for 2026.1

### Dropping capability for Windows Server 2008 Workers and Targets in 2026.1

Microsoft [dropped extended support](https://learn.microsoft.com/en-us/lifecycle/products/windows-server-2008) for the Windows Server 2008 family in January 2020. This operating system is also the last Windows OS that does not support .NET Core, one of the languages used to build Octopus Deploy. The complexity required to support this legacy platform outweighs the value to our customers.

It has been [noted for several years](https://octopus.com/docs/infrastructure/deployment-targets/tentacle/windows/requirements) that Octopus no longer actively tests against or supports Windows Server 2008. The planned change in `2026.1` will make this operating system requirement more definitive by introducing changes that may prevent standard deployment and runbook tasks from executing on this operating system.

To provide ample time to act, from Octopus Server `2024.1`, workloads that run on Windows 2008 Servers will begin logging warnings. We urge you to upgrade your targets to a later version of Windows Server before `2026.1` to prepare for the removal of functionality.

Further notes about this pending change can be found in the [2024.1 deprecation blog post](https://octopus.com/blog/2024-deprecated-features#windows-server-2008)

**Note that this change was originally planned to take place in 2025.1 however this was instead pushed back until this later major release.**

## Atlassian Bamboo EOL - December 2025

As of December 2025 the Octopus Deploy add-on for Bamboo has been removed from the Atlassian marketplace. If you are using the add-on in your Atlassian Data Center it will continue to work, the removal prevents new installations of the add-on. This is in response to Atlassian's end of life decision on Bamboo and Data Center.

## Deprecations for 2025.3

### Removing support on Linux self-hosted and Cloud for SHA-1 certificates in Octopus Tentacles

Starting in Octopus 2025.3, Tentacle instances using SHA‑1 certificates will no longer be supported. SHA‑1 is an outdated hashing algorithm with known security weaknesses, and modern security standards recommend stronger alternatives such as SHA‑256.

If any of your deployment targets are running Tentacles with SHA‑1 certificates, they will be unable to connect to your Octopus Server after upgrading to 2025.3. We recommend updating your Tentacle certificates to SHA‑256 before upgrading.

For background, migration guidance, and a detailed timeline, please see our blog post: [Removing support for SHA‑1 certificates in Octopus Tentacles](https://octopus.com/blog/removing-sha1-tentacles).

## Deprecations for 2025.2

### Defaulting C# scripting to dotnet-script

We announced the deprecation of ScriptCS back in 2022, with pathways for migrating added in 2024. As of 2025.2 we have switched the default C# scripting library over to dotnet-script. A migration guide is available [on our blog](https://g.octopushq.com/ScriptCSDeprecation).

ScriptCS is still supported in 2025.2 by setting the `OCTOPUS__FeatureToggles__UseDotnetScriptCSharpExecutorFeatureToggle` environment variable to false or at the project level using the variable `Octopus.Action.Script.CSharp.UseDotnetScript`. This is not recommended as support for ScriptCS will be removed in 2025.3.

## Deprecations for 2024.4

### ScriptCS

On 30 September, 2022 it was [announced](https://github.com/scriptcs/scriptcs/issues/1323) that ScriptCS would no longer be maintained.

As of `2024.4` the usage of ScriptCS is being deprecated in Octopus. This has been replaced with [dotnet-script](https://github.com/dotnet-script/dotnet-script). See our post on migrating from [scriptcs to dotnet-script](https://g.octopushq.com/ScriptCSDeprecation).

## Deprecations for 2024.3

### Azure Resource Manager PowerShell Module

The AzureRM PowerShell modules were Microsoft's way of integrating PowerShell with Azure resources. Microsoft has deprecated AzureRM in favor of the Azure CLI or the Az PowerShell modules.

AzureRM was [deprecated by Microsoft](https://learn.microsoft.com/en-us/powershell/azure/azurerm-retirement-overview) as of February 29, 2024.

AzureRm will remain available until July 2024 (with an in-app warning). After this, you'll need to move to either `az cli` or the `az module for PowerShell` for Azure authentication.

## Deprecations for 2024.2

### Bundled Tools

For some time, command line tools for AWS, Azure, and Terraform have been included with Octopus Deploy as a convenience mechanism. The provided versions of these tools are out of date and won't be updated.

As of `2024.2`, you won't be able to configure deployment steps to use the bundled tools, but existing steps will continue to function. The bundled tools will be removed from Octopus Deploy in `2025.1`.

If you're currently using these bundled tools, you'll need to either manually install the required versions on your workers or modify your deployment processes to make use of [execution containers](/docs/projects/steps/execution-containers-for-workers).

## Deprecations for 2024.1

### Helm V2

Helm V2 was [deprecated in November 2020](https://helm.sh/blog/helm-v2-deprecation-timeline/) and is no longer receiving updates.

As a result, coupled with very low usage, Helm V2 support will be switched off in `2024.3` and removed in `2025.1`. When you use `2024.1`, you'll see deprecation warnings in both the UI and task logs if you use Helm V2.

An official [Helm V2 to V3 migration guide](https://helm.sh/docs/topics/v2_v3_migration/) details migration to Helm V3. After upgrading Helm, you should update deployment process steps in Octopus to use Helm V3 rather than Helm V2.

### Azure Cloud Services (Classic)

Azure has announced the sunsetting of the original **Cloud Services** resource, renamed **Cloud Services (Classic)**, with the [final retirement date set as August 31, 2024](https://learn.microsoft.com/en-us/lifecycle/products/azure-cloud-services-classic). In a little over 6 months, teams still relying on this cloud service will be unable to deploy to them, with Octopus Deploy or otherwise.

In the lead-up, Octopus workloads using Azure Cloud Service Targets, Azure Cloud Service Steps, or Management Certificates in Octopus Deploy will start to see in-app and in-task warnings appear in Octopus Server `2024.1`.

When Azure removes support for these resources, these warnings will become errors. We will then remove these resources from Octopus.

The recommended migration path outlined by Azure is to make use of the separate [**Azure Cloud Services (extended support)**](https://learn.microsoft.com/en-us/azure/cloud-services-extended-support/overview) product. There are no plans to support this feature in Octopus.

### Mono-based SSH Deployment Targets

From `2024.1` SSH deployments will no longer support running tasks via Mono. Instead, Linux workers and targets will only execute using .NET Core compiled tooling, which, in most cases, can be enabled via a simple change on the machine configuration page.

Further details on the background of this update and the reasoning behind it are available in the [Deprecating Mono](https://octopus.com/blog/deprecating-mono) blog post.

### Dropped support for Windows Server 2003 and un-patched Windows Server 2008 Workers and Targets

Windows Server 2003 Workers and Targets will no longer execute Octopus workloads from `2024.1`. We highly recommend upgrading your targets to a later version of Windows Server before updating your Octopus Server instance to this release, as deployments and runbooks using these machines are unlikely to run.

Windows Server 2008 Workers and Targets that do not have the latest Service Packs installed will also no longer execute Octopus workloads from `2024.1` due to the dependency on .NET Framework 4.6.2, which is unavailable on these Operating Systems. We strongly recommend that you upgrade your targets to a later version of Windows Server before updating your Octopus Server instance to this release, as deployments and runbooks using these machines are unlikely to run.

Further details on the background for this update are available on the [Dropping support for Windows Server 2003 machines](https://octopus.com/blog/deprecating-win2003) blog post.

### F# Script Steps

Due to the low uptake of F# script steps and the work required to upgrade them for continued use in our modern codebase, we will no longer support F# script steps from `2024.1`. Customers who continue to need F# scripts in later Octopus versions should use standard shell scripting (PowerShell or bash) and invoke their scripts via their own F# tools included in additional [referenced packages](https://octopus.com/docs/deployments/custom-scripts/run-a-script-step#referencing-packages).

## Deprecations for 2023.3

### Project level `/runbooks/all` API endpoint {#project-level-runbooks-all-api-endpoint}

The `GET /projects/{projectId}/runbooks/all` API endpoint is being replaced by a new version that omits the ProjectIds query string parameter in future versions of Octopus. It was adopted from an earlier product version and is now redundant and potentially confusing.
The same functionality is available via the `GET /runbooks/all` API endpoint, passing relevant Project IDs via the `ProjectIds` query parameter. If the `ProjectIds` parameter is not required, you can use the `GET /projects/{projectId}/runbooks/all/v2` endpoint.

### Reporting `/reporting/deployments-counted-by-week` API endpoint {#reporting-deployments-by-week}

The `GET /reporting/deployments-counted-by-week` API endpoint is being removed in future versions of Octopus. None of our supported clients currently use this endpoint.

While there is no direct replacement for this endpoint, much more detailed reporting is available via the [Insights feature](https://octopus.com/docs/insights).

### Project level `/git/branches` API endpoint

The `POST` method on the `/projects/{projectId}/git/branches` endpoint for version-controlled projects will be removed in a future version of Octopus. The same functionality is available using the `/projects/{projectId}/git/branches/v2` endpoint.

To use the new endpoint, replace the `CurrentBranchName` field with `BaseGitRef`. The value of this field should be a fully-qualified git ref (e.g., `refs/heads/main` for the `main` branch, `refs/tags/v1.2.3` for the `v1.2.3` tag, or a commit hash).

## Deprecations for 2023.1

### Space level `/useronboarding` API endpoint

The Space level `/useronboarding` API endpoint will be removed in a future version of Octopus. We used this endpoint to improve the user onboarding experience but have reworked the new user experience and removed the old endpoint.

There is no replacement for this endpoint. We do not expect that anyone outside our internal teams has used this endpoint. If you believe this could negatively affect you, please contact our [support team](https://octopus.com/support).

### Unsupported Microsoft DFS configurations

We are updating the supported configurations of Microsoft DFS as shared storage for Octopus Server instances using a High Availability setup. We will continue to support DFS for disaster recovery scenarios, but only in the recommended configuration. You can find more details in our [documentation](https://octopus.com/docs/getting-started/best-practices/configuring-microsoft-dfs-with-octopus-server).

## Deprecations for 2022.4

### Server extensibility

Server extensibility is deprecated and no longer maintained. It will no longer work at the end of 2023. Some of you may have implemented an extension for Octopus Server, however, we would be interested in understanding your requirements better to work towards resolving missing capabilities. Contact us via [support team](https://octopus.com/support) to let us know if this will affect your instance.

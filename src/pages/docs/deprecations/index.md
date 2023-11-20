---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-11-20
title: Deprecations
description: Upcoming and past deprecations by version for Octopus Server
navOrder: 300
---

## Overview

From time to time, Octopus will deprecate features that are no longer going to be supported, and will eventually be removed.

Deprecations have the following lifecycle:

- Announce deprecation
- (+6 months) Toggle off deprecated functionality
- (+1 year) Remove deprecated functionality

:::div{.warning}
Deprecations are subject to change in detail or time frame. If you need help assessing the impact of deprecation of a feature on your particular Octopus Server configuration, please contact our [support team](https://octopus.com/support).
:::

## Deprecations coming in 2024.1

### Azure Cloud Services (Classic)
Azure have announced the sun setting of the original _Cloud Services_ resource, renamed _Cloud Services (Classic)_, with the [final retirement date set as August 31, 2024](https://learn.microsoft.com/en-us/lifecycle/products/azure-cloud-services-classic). In a little over 6 months, teams that are still relying on this cloud service will be unable to deploy to them at all, with Octopus Deploy or otherwise.

In the lead up to this, Octopus workloads making use of Azure Cloud Service Targets, Azure Cloud Service Steps or Management Certificates in Octopus Deploy will start to see in-app and in-task warnings appear in Octopus Server `2024.1`. 

Once support has been fully dropped for these resources by Azure mid-year, then these warnings will turn into errors followed by the removal of these resources from Octopus instances entirely.

The recommended migration path outlined by Azure is to make use of the separate [_Azure Cloud Services (extended support)_](https://learn.microsoft.com/en-us/azure/cloud-services-extended-support/overview) product, however at this time there are no plans to support this feature in Octopus natively.

### Mono based SSH Deployment Targets

From `2024.1` SSH deployments will no longer support running tasks via Mono. Instead, Linux workers and targets will only execute using .NET Core compiled tooling, which for most cases can be enabled via a simple configuration change on the machine configuration page. Further details on the background for this update as well as the reasoning behind it are available on the [Deprecating Mono](https://octopus.com/blog/deprecating-mono) blog post.

### Dropped support for Windows Server 2003 Workers and Targets

Windows Server 2003 Workers and Targets will no longer execute Octopus workloads from `2024.1`. It is highly recommended that you upgrade your targets to a later version of Windows Server before updating your Octopus Server instance to this release as deployments and runbooks using these machines are unlikely to run.

Further details on the background for this update are available on the [Dropping support for Windows Server 2003 machines](https://octopus.com/blog/deprecating-win2003) blog post.

### F# Script Steps

Due to the low uptake of F# script steps and the work required to upgrade them for continued use in our modern codebase, we will no longer be supporting F# script steps from `2024.1`. Customers who continue to need F# scripts in later Octopus versions should use standard shell scripting (powershell or bash) and invoke their scripts via their own F# tools included in additional [referenced packages](https://octopus.com/docs/deployments/custom-scripts/run-a-script-step#referencing-packages).

## Deprecations for 2023.3

### Project level `/runbooks/all` API endpoint

The `GET /projects/{projectId}/runbooks/all` API endpoint is being replaced by a new version that omits the ProjectIds query string parameter in future versions of Octopus. It was adopted from an earlier version of the product and is now redundant and potentially confusing.
The same functionality is available via the `GET /runbooks/all` API endpoint, passing relevant Project IDs via the `ProjectIds` query parameter. If the `ProjectIds` parameter is not required, the `GET /projects/{projectId}/runbooks/all/v2` endpoint should be used instead.

### Reporting `/reporting/deployments-counted-by-week` API endpoint

The `GET /reporting/deployments-counted-by-week` API endpoint is being removed in future versions of Octopus.
It is an old endpoint that is no longer used by any of our supported clients.
While there is no direct replacement for this endpoint, much more detailed reporting is available via the [Insights feature](https://octopus.com/docs/insights).

### Project level `/git/branches` API endpoint

The `POST` method on the `/projects/{projectId}/git/branches` endpoint for version controlled projects is being removed in future versions of Octopus. The same functionality is available using the `/projects/{projectId}/git/branches/v2` endpoint, however, a minor change will need to be made to the request payload.
The `CurrentBranchName` field has been replaced with `BaseGitRef`. The value of this field should be a fully-qualified git ref (e.g: `refs/heads/main` for the `main` branch, `refs/tags/v1.2.3` for the `v1.2.3` tag, or a commit hash).

## Deprecations for 2023.1

### Space level `/useronboarding` API endpoint

The Space level `/useronboarding` API endpoint is being removed in future versions of Octopus. It was used internally to improve the user onboarding experience. We have since reworked the new user experience and removed the old endpoint. There is no replacement for this endpoint. We do not expect that anyone outside our internal teams has used this endpoint. If you believe this could negatively affect you, please get in touch with our [support team](https://octopus.com/support).

### Unsupported Microsoft DFS configurations

We are updating the supported configurations of Microsoft DFS as shared storage for Octopus Server instances using a High Availability setup. We will continue to support DFS for disaster recovery scenarios, but only in the recommended configuration. You can find more details in our [documentation](https://octopus.com/docs/getting-started/best-practices/configuring-microsoft-dfs-with-octopus-server).

## Deprecations for 2022.4

### Server extensibility

Server extensibility is deprecated and no longer maintained. It will no longer work at the end of 2023. Some of you may have implemented an extension for Octopus Server, however, we would be interested in understanding your requirements better to work towards resolving missing capabilities. Contact us via [support team](https://octopus.com/support) to let us know if this will affect your instance.

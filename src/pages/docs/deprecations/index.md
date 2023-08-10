---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
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
Deprecations are subject to change in detail or timeframe. If you need help assessing the impact of deprecation of a feature on your particular Octopus Server configuration, please contact our [support team](https://octopus.com/support).
:::

## Deprecations coming in 2024.1

### Mono based SSH Deployment Targets

From `2024.1` SSH deployments will no longer support running tasks via Mono. Instead, Linux workers and targets will only execute using .NET Core compiled tooling, which for most cases can be enabled via a simple configuration change on the machine configuration page. Further details on the background for this update as well as the reasoning behind it are available on the [Deprecating Mono](https://octopus.com/blog/deprecating-mono) blog post.

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

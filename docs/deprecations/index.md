---
title: Deprecations
description: Upcoming and past deprecations by version for Octopus Server
position: 300
---

## Overview

From time to time, Octopus will deprecate features that are no longer going to be supported, and will eventually be removed.

Deprecations have the following lifecycle:

- Announce deprecation
- (+6 months) Toggle off deprecated functionality
- (+1 year) Remove deprecated functionality

:::warning
Deprecations are subject to change in detail or timeframe. If you need help assessing the impact of deprecation of a feature on your particular Octopus Server configuration, please contact our [support team](https://octopus.com/support).
:::

## Deprecations for 2023.1

* Space level `/useronboarding` endpoint is being removed in future versions of Octopus. It was used internally to improve user onboarding experience. We have since reworked the new user experience and decided to remove the old endpoint. There is no replacement for this endpoint. We do not expect that anyone outside our internal teams have used this endpoint, if you believe this could negatively affect you, please contact our [support team](https://octopus.com/support).

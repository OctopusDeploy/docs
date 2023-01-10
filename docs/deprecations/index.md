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

* The Space level `/useronboarding` API endpoint is being removed in future versions of Octopus. It was used internally to improve the user onboarding experience. We have since reworked the new user experience and removed the old endpoint. There is no replacement for this endpoint. We do not expect that anyone outside our internal teams has used this endpoint. If you believe this could negatively affect you, please get in touch with our [support team](https://octopus.com/support).

## Deprecations for 2022.4

* Server extensibility is deprecated and no longer maintained. It will no longer work at the end of 2023. Some of you may have implemented an extension for Octopus Server, they will keep working as normal, however we would be interested in understanding your requirements better so that we can work towards resolving missing capabilities. Contact us via [support team](https://octopus.com/support) to let us know if this will affect your instance.
---
layout: src/layouts/Default.astro
pubDate: 2026-04-20
modDate: 2026-11-05
title: OpenFeature providers
sidebarLabel: OpenFeature providers
navTitle: OpenFeature providers
navSection: Feature Flags
navOrder: 80
icon: fa-solid fa-code
description: The Octopus OpenFeature providers for each language, and the minimum versions projects that use feature flag rules need.
subject: feature flags, OpenFeature, providers, SDK, .NET, Java, TypeScript
type: reference
audience: [app-dev]
image:
imageAlt:
---

Your application connects to Octopus Feature Flags through an Octopus provider for the [OpenFeature](https://openfeature.dev/) SDK in its language. This page lists the available providers and the versions you need.

## Octopus providers

This table lists every Octopus OpenFeature provider. The minimum versions apply to projects that use feature flag rules. Projects that haven't been upgraded to rules can use earlier versions, listed in [Legacy OpenFeature providers](/docs/feature-flags/legacy/providers).

| Language | Type | Repository | Minimum version for rules |
| --- | --- | --- | --- |
| .NET | Server | [openfeature-provider-dotnet](https://github.com/OctopusDeploy/openfeature-provider-dotnet) | [VERIFY: `4.0.0` — needs: the released version with rule support; the Octopus UI marks this as provisional] |
| Java | Server | [openfeature-provider-java](https://github.com/OctopusDeploy/openfeature-provider-java) | [VERIFY: `2.0.0` — needs: the released version with rule support; the Octopus UI marks this as provisional] |
| TypeScript/JavaScript | Web | [openfeature-provider-ts-web](https://github.com/OctopusDeploy/openfeature-provider-ts-web) | [VERIFY: `5.0.0` — needs: the released version with rule support; the Octopus UI marks this as provisional] |

Each repository's README covers installing the provider and configuring it with your client identifier.

An application on an earlier provider version keeps the flag values it had when its project was upgraded to rules, and doesn't see any changes made after that. See [Upgrading to feature flag rules](/docs/feature-flags/upgrading-to-rules).

## Related links

- [Getting started with feature flags](/docs/feature-flags/getting-started)
- [Targeting users with feature flag rules](/docs/feature-flags/rules)
- [Upgrading to feature flag rules](/docs/feature-flags/upgrading-to-rules)

---
layout: src/layouts/Default.astro
pubDate: 2026-04-20
modDate: 2026-11-11
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

This table lists every Octopus OpenFeature provider. The minimum versions apply to projects that use feature flag rules. Projects that haven't been upgraded to rules still work with older provider versions, but those versions are deprecated and will stop working in the future.

| Language | Type | Repository | Minimum version for rules |
| --- | --- | --- | --- |
| .NET | Server | [openfeature-provider-dotnet](https://github.com/OctopusDeploy/openfeature-provider-dotnet) | `4.0.0` |
| Java | Server | [openfeature-provider-java](https://github.com/OctopusDeploy/openfeature-provider-java) | `2.0.0` |
| TypeScript/JavaScript | Web | [openfeature-provider-ts](https://github.com/OctopusDeploy/openfeature-provider-ts) | `5.0.0` |

Each repository's README covers installing the provider and configuring it with your client identifier.

## Related links

- [Getting started with feature flags](/docs/feature-flags/getting-started)
- [Targeting users with feature flag rules](/docs/feature-flags/rules)
- [Upgrading to feature flag rules](/docs/feature-flags/upgrading-to-rules)

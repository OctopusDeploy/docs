---
layout: src/layouts/Default.astro
pubDate: 2026-04-20
modDate: 2026-04-20
title: Targeting
subtitle: Configure rollout within an environment
icon: fa-solid fa-bullseye
navTitle: Targeting
navSection: Feature Toggles
description: Targeting options for Octopus Feature Toggles
navOrder: 96
---

## Minimum version

You can configure a feature toggle to require a minimum version before being enabled in an environment. The toggle will be enabled once that version (or any later version) is deployed to that environment.

![Screenshot of feature toggle environment drawer, minimum version section is expanded, minimum version input has value 12.1.0](/docs/img/feature-toggles/minimum-version.png)

## Tenants {#tenants}

If your project uses [Tenants](/docs/tenants/), you can configure a feature toggle to be enabled for subsets of your tenants within an environment. There are many options for configuring a feature toggle for tenants.

These are all modeled in Octopus and do not require any custom configuration in application code.

### Excluded tenants

You can exclude tenants individually or exclude groups of tenants using tenant tags. Excluded tenants will always override any other rollout configuration, even if the rollout percentage is set to 100%.

![Screenshot of feature toggle environment drawer, excluded tenants section expanded, tenants to exclude multi-select has Acme Corporation and Contoso Ltd tenants selected, tenant tags to exclude multi-select has Tier/Enterprise tag selected](/docs/img/feature-toggles/excluded-tenants.png)

Once a feature toggle is configured with an excluded tenant tag, any changes to tenant tag assignments apply immediately to feature toggles (no update to the feature toggle configuration is required).

### Included tenants

You can enable feature toggles for individual tenants. These tenants will always be included, even if the tenant rollout percentage is set to 0%.

![Screenshot of feature toggle environment drawer, included tenants section expanded, tenants to include multi-select has Acme Corporation selected, tenant rollout percentage and tenant tags to include in rollout inputs are empty](/docs/img/feature-toggles/included-tenants.png)

### Tenant rollout

Tenant rollout allows you to enable a toggle for a random percentage of all tenants.

The included tenants are determined using a MurmurHash of the tenant ID and a toggle-specific key. This guarantees deterministic evaluation for any given tenant and toggle combination, while ensuring that a different set of tenants is included for each toggle.

![Screenshot of feature toggle environment drawer, included tenants section expanded, tenants to include is empty, tenant rollout percentage is set to 50% and tenant tags to include in rollout multi-select has Tier/Free, Region/Australia, and Region/Europe selected](/docs/img/feature-toggles/tenant-rollout.png)

You can further restrict the rollout using tenant tags. For example, if you specify `Region/Australia`, `Region/Europe`, and `Tier/Enterprise`, the rollout will only apply to Enterprise tenants in either Australia or Europe. If you do not specify any tenant tags, the rollout will apply to all tenants.

As with excluded tenants, any changes to tenant tags apply immediately to feature toggles.

## Client rollout

Client rollout allows you to enable a toggle for a random percentage of your application users. The included users are determined using a MurmurHash of the [OpenFeature Targeting Key](https://openfeature.dev/docs/reference/concepts/evaluation-context#targeting-key) and a toggle-specific key. This guarantees deterministic evaluation for any given user and toggle combination.

To use client rollout, you must configure a targeting key in your OpenFeature client. Refer to the [OpenFeature SDK](https://openfeature.dev/docs/reference/sdks/) documentation for your development language for details on how to set the targeting key. If you do not set a targeting key, the feature will not be enabled for any users unless the rollout is set to 100%.

You should set the targeting key to a value that uniquely identifies your evaluation subject. For most applications, this will be a user identifier (such as a user ID), but you can use any identifier that suits your needs (for example, team, region, or server instance).

:::div{.warning}
Support for client rollout percentages was added in the following versions of the [provider libraries](/docs/feature-toggles/providers):

- [.NET: `2.1.0`](https://github.com/OctopusDeploy/openfeature-provider-dotnet/releases/tag/v2.1.0)
- [Java: `0.3.0`](https://github.com/OctopusDeploy/openfeature-provider-java/releases/tag/0.3.0)
- [TypeScript/JavaScript: `3.0.0`](https://github.com/OctopusDeploy/openfeature-provider-ts-web/releases/tag/v3.0.0)

If you are not running the required minimum version of these libraries, the rollout percentage will be ignored (and handled as if the value was set to 100%).
:::

### Segments {#segments}

Segments allow you to further refine the client rollout for a toggle based on data that is not modeled in Octopus. Segments are key/value pairs, and are supplied by your application via the [OpenFeature evaluation context](https://openfeature.dev/docs/reference/concepts/evaluation-context).

Like tenant targeting, segments are configured per-environment on the feature toggle in Octopus.

![Screenshot of feature toggle environment drawer, client rollout section expanded, client rollout percentage is set to 50% with 3 segments region/eu, region/au, and ring/early-adopter](/docs/img/feature-toggles/segments.png)

Refer to the [OpenFeature SDK](https://openfeature.dev/docs/reference/sdks/) documentation for your development language for more details on how to set these values.

Common segment examples include:

- Specific users (e.g. `user-id/123456`)
- Specific accounts (e.g. `account-id/123456`)
- License types (e.g. `license-type/free`)
- Geographic regions (e.g. `region/eu`)
- Rollout rings (e.g. `ring/early-adopter`)

A feature toggle evaluation will match on segments if the evaluation context matches at least one segment for each key. If you specify `ring/early-adopter`, `region/eu`, and `region/au`, the rollout will apply only to users in the early-adopter ring who are in either the EU or AU regions. If you do not specify any segments, the rollout will apply to all users.

Some examples:

| Segments                                       | Evaluation Context                | Result |
|------------------------------------------------|-----------------------------------|--------|
| `user-id/123456`                               | `user-id/123456`                  | `On`   |
| `user-id/123456`                               | `user-id/789383`                  | `Off`  |
| `ring/early-adopter`, `region/eu`, `region/au` | `ring/early-adopter`, `region/eu` | `On`   |
| `ring/early-adopter`, `region/eu`, `region/au` | `ring/early-adopter`, `region/au` | `On`   |
| `ring/early-adopter`, `region/eu`, `region/au` | `license-type/free`               | `Off`  |
| `ring/early-adopter`, `region/eu`, `region/au` | `region/au`                       | `Off`  |

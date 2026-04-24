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

You can configure a feature toggle to only be enabled for an environment once the application is running on a specific version. The toggle will be enabled once that version (or any later version) is deployed to that environment.

![](/docs/img/feature-toggles/minimum-version.png)

## Tenants {#tenants}

If your Project uses [Tenants](/docs/tenants/) you can configure a Toggle to be enabled for subsets of your Tenants within an environment. There are many options for configuring a Feature Toggle for Tenants.

These are all modelled in Octopus and do not require any custom configuation in application code.

### Excluded tenants

You can exclude tenants individually or exclude groups of tenants using tenant tags. Excluded tenants will override any other rollout configuration. If a tenant is excluded it will always be excluded (even if rollout is set to 100%).

![](/docs/img/feature-toggles/excluded-tenants.png)

Changes to tenant tags assignments apply immediately to feature toggles (and do not require an update to the feature toggle configuration).

### Included tenants

You can enable feature toggles for individual tenants. These tenants will always be included, regardless of any configured tenant rollout configuration (even if the rollout is set to 0%).

![](/docs/img/feature-toggles/included-tenants.png)

### Tenant rollout

Tenant rollouts allow you to enable a toggle for a random percentage of all tenants.

The included tenants are determined using a MurmurHash of the tenant ID and a unique key for each toggle. This guarantees deterministic evaluation for any given tenant and toggle combination, but ensures that a different set of tenants is included for each toggle.

![](/docs/img/feature-toggles/tenant-rollout.png)

You can refine the rollout using tenant tags. For example, if you specify `Region/Australia`, `Region/Europe`, and `Tier/Enterprise`, the rollout will apply only enterprise tenants in either Australia or Europe. If you do not specify any tenant tags, the rollout will apply to all tenants.

As with excluded tenants, any changes to tenant tags apply immediately to feature toggles.

## Client rollout

Client rollouts allows you to enable a toggle for a random percentage of your application users. The included users are determined using a MurmurHash of the [OpenFeature Targeting Key](https://openfeature.dev/docs/reference/concepts/evaluation-context#targeting-key) and a key for each toggle. This guarantees deterministic evaluation for any given user and toggle combination.

To use client rollouts, you must configure a targeting key in your OpenFeature client. Refer to the [OpenFeature SDK](https://openfeature.dev/docs/reference/sdks/) documentation for your development language for details on how to set the targeting key. If you do not set a targeting key, the feature will not be enabled for any users unless the rollout it set to 100%.

You should set the targeting to some value that uniquely identifies your evaluation subject. For most applications the evaluation subject will be a user, so you will want to set this to be a unique for the user. Targeting users is a good default for most applications, but you can use any identifier that you want here (for example team, region, server instance, etc). 

:::div{.warning}
Support for client rollout percentages was added in these versions of the [provider libraries](/docs/feature-toggles/providers):

- [.NET: `2.1.0`](https://github.com/OctopusDeploy/openfeature-provider-dotnet/releases/tag/v2.1.0)
- [Java: `0.3.0`](https://github.com/OctopusDeploy/openfeature-provider-java/releases/tag/0.3.0)
- [TypeScript/JavaScript: `3.0.0`](https://github.com/OctopusDeploy/openfeature-provider-ts-web/releases/tag/v3.0.0)

If you are not running the required minimum version of the these libraries, the rollout percentage will ignored (and handled as if the value was set to 100%).
:::

### Segments {#segments}

Segments allow you to further refine the client rollout for a toggle based on data that is not modelled in Octopus. Segments are key/value pairs, and are supplied by your application via the [OpenFeature evaluation context](https://openfeature.dev/docs/reference/concepts/evaluation-context).

Like Tenant targeting, Segments are configured per-environment on the Feature Toggle in Octopus.

![](/docs/img/feature-toggles/segments.png)

Refer to the [OpenFeature SDK](https://openfeature.dev/docs/reference/sdks/) documentation for your development language for more details on how to set these values.

Common segment examples include:

- Specific users. e.g. `user-id/123456`
- Specific accounts. e.g. `account-id/123456`
- License types. e.g. `license-type/free`
- Geographic regions. e.g. `region/eu`
- Rollout rings. e.g. `ring/early-adopter`

A Toggle evaluation will match on segments if the evaluation context matches at least one segment for each key. If you specify `ring/early-adopter`, `region/eu`, and `region/au`, the rollout will apply only enterprise tenants in either the EU or AU regions. If you do not specify any segments, the rollout will apply to all users.

Some examples:

| Segments                                      | Evaluation Context                | Result |
|-----------------------------------------------|-----------------------------------|--------|
| `user-id/123456`                              | `user-id/123456`                  | `On`   |
| `user-id/123456`                              | `user-id/789383`                  | `Off`  |
| `license-type/free` `region/Asia` `region/EU` | `license-type/free` `region/Asia` | `On`   |
| `license-type/free` `region/Asia` `region/EU` | `license-type/free` `region/US`   | `Off`  |
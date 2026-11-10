---
layout: src/layouts/Default.astro
pubDate: 2026-11-05
modDate: 2026-11-05
title: Targeting users with feature flag rules
sidebarLabel: Rules
navTitle: Rules
navSection: Feature Flags
navOrder: 30
icon: fa-solid fa-bullseye
description: Use rules and conditions to turn Octopus feature flags on for specific tenants, users, versions, and percentages, and pass evaluation context from your app.
subject: feature flags, rules, conditions, targeting, evaluation context, targeting key, tenants
type: guide
audience: [app-dev, devops-eng]
image:
imageAlt:
---

Rules let you turn a feature flag on for some users in an environment and not others. This page covers adding rules to an environment, the conditions a rule can use, and passing the evaluation context those conditions need from your application.

## Rules and conditions

A rule describes a group of users who should get a flag, such as "enterprise tenants in Europe" or "10% of users on version 3.2 or later". Each rule is made of one or more conditions. Conditions in a rule combine with AND, so a rule matches only when all its conditions match. Rules combine with OR, so the flag is on for a user when any rule matches.

Rules belong to an environment on a flag, and each environment has its own rules. An environment without rules has the flag on for everyone, so adding the first rule is what narrows the flag down to a group.

Some conditions use information Octopus already knows, such as the tenant in the client identifier or the version of the release deployed to the environment. Others use information your application passes in when it evaluates the flag, called the evaluation context. If a condition needs evaluation context and your application doesn't pass it, the condition doesn't match.

Because rules combine with OR, a condition in one rule has no effect on another rule. To exclude a tenant or a user from a flag entirely, add the exclusion to every rule on the environment.

## Add a rule

Add a rule to narrow a flag down to a group of users in one environment. Add more rules to reach more groups.

**Before you begin**

You'll need:

- A feature flag with the environment added to it. See [Turn on a feature flag for an environment](/docs/feature-flags/getting-started#turn-on-a-feature-flag-for-an-environment).

To add a rule:

1. From your project, select **Feature Flags**, then select the flag.
2. In the **Environments** section, select the environment.
3. Select **Add**, then select **Rule**.
4. Enter a **Rule name** that describes the group the rule targets.
5. Select **Add Condition**, then select the condition type.
6. Enter the condition's values.
7. Select **Done**.
8. Save the flag.

The rule appears in the environment's rule list, with its conditions joined by **And** and separated from any other rules by **Or**. To check who the rule reaches before or after you save, see [Previewing feature flag evaluations](/docs/feature-flags/previewing-evaluations).

:::div{.hint}
Adding a rule to an environment that's switched on applies it straight away when you save. To stage a rule so it applies later, add it to a phase. See [Rolling out feature flags in phases](/docs/feature-flags/phased-rollouts).
:::

## Rule conditions {#rule-conditions}

This table lists every condition a rule can use. The **Tenants** and **Tenant tags** conditions, and percentages by tenants, appear only in projects that use tenants.

| Condition | Match | Matches when | Values come from |
| --- | --- | --- | --- |
| **Percentage** | By tenants, by targeting keys | The tenant, or the targeting key in the evaluation context, falls in the given percentage. Percentages go up in steps of 10%. | Octopus (tenant) or your application (targeting key) |
| **Tenants** | One of, not one of | The tenant in the client identifier is, or isn't, one of the selected tenants. | Octopus (client identifier) |
| **Tenant tags** | One of, not one of | The tenant has, or doesn't have, any of the selected tags. All the tags in one condition come from the same tag set. Only one tag needs to match for the condition to be met. | Octopus (tenant tags) |
| **Minimum version** | Version is at least | The latest release deployed to the environment (and tenant) is the given version or later. The version must be a valid semantic version. | Octopus (deployed release) |
| **Context attribute** | One of, not one of | The named attribute in the evaluation context is, or isn't, one of the listed values. | Your application (evaluation context) |

To reach several tag sets, such as a region and a tier, add a **Tenant tags** condition for each tag set. A rule with `Region` is one of `Australia`, `Europe` AND `Tier` is one of `Enterprise` matches enterprise tenants in either Australia or Europe.

## Rule limits

Each environment on a flag has limits on how many rules and conditions it can hold. These limits apply to every project that uses feature flag rules.

| Item | Limit |
| --- | --- |
| Conditions in a rule | 100 |
| Rules in an environment, counted across all its phases | 100 |
| Phases in an environment | 50 |

A rule needs at least one condition. An environment that needs more than 100 rules usually needs fewer, broader rules, such as a tenant tag in place of a list of individual tenants.

## Pass evaluation context from your application {#evaluation-context}

The evaluation context is the information about the current user that your application passes to OpenFeature when it evaluates a flag. **Context attribute** conditions and **Percentage** conditions by targeting keys only work when your application supplies it.

The evaluation context has 2 parts:

- The **targeting key**: one value that uniquely identifies whoever you're evaluating the flag for. Percentage conditions by targeting keys use it to decide who's in the percentage. For most applications, this is a user ID, but it can be any stable identifier, such as an account, a team, or a server instance.
- **Attributes**: key/value pairs that **Context attribute** conditions match against, such as `region: eu`, `license-type: free`, or `ring: early-adopter`.

To pass evaluation context:

1. Choose a targeting key that stays the same for a user across sessions.
2. Build an OpenFeature evaluation context with the targeting key and any attributes your rules use.
3. Pass the evaluation context when you evaluate the flag, or set it on the OpenFeature client so every evaluation uses it.

For example, in C#:

```cs
var context = EvaluationContext.Builder()
    .SetTargetingKey(user.Id)
    .Set("region", user.Region)
    .Set("license-type", user.LicenseType)
    .Build();

var darkModeEnabled = await featureClient.GetBooleanValueAsync("dark-mode", false, context);
```

For other languages, and for setting context once for every evaluation, see the [OpenFeature evaluation context documentation](https://openfeature.dev/docs/reference/concepts/evaluation-context).

:::div{.warning}
If your application doesn't set a targeting key, a **Percentage** condition by targeting keys doesn't match unless the percentage is 100%.
:::

Attribute keys and values are case-sensitive, so `Region` and `region` are different attributes.

## Related links

- [How feature flag evaluation works](/docs/feature-flags/how-evaluation-works)
- [Rolling out feature flags in phases](/docs/feature-flags/phased-rollouts)
- [Previewing feature flag evaluations](/docs/feature-flags/previewing-evaluations)
- [Managing rollout groups](/docs/feature-flags/rollout-groups)
- [OpenFeature providers](/docs/feature-flags/providers)

---
layout: src/layouts/Default.astro
pubDate: 2026-11-05
modDate: 2026-11-05
title: How feature flag evaluation works
sidebarLabel: How evaluation works
navTitle: How evaluation works
navSection: Feature Flags
navOrder: 20
icon: fa-solid fa-diagram-project
description: Learn how Octopus decides whether a feature flag is on, from environment switches and default values to rules, phases, and percentage rollouts.
subject: feature flags, evaluation, default values, percentage rollout, rules, phases
type: concept
audience: [app-dev, devops-eng]
image:
imageAlt:
---

When your application asks for a feature flag, Octopus works through the flag's configuration for that application's environment and returns `true` or `false`. This page explains each part of that decision, so you can predict what any user will get before you change a flag.

## The evaluation sequence

Every evaluation follows the same sequence, and it stops at the first step that decides the result. Knowing the order tells you which part of a flag's configuration to look at when a user gets a result you didn't expect.

For the environment named in the application's client identifier:

1. If the environment hasn't been added to the flag, the result is the flag's default value.
2. If the environment's switch is off, the result is `false`. [VERIFY: that a switched-off environment returns false rather than the flag's default value — needs: confirmation from the feature flags team]
3. If the environment has no rules, the result is `true`, for everyone.
4. If the environment has phases and none of them is on, the result is `false`.
5. If any rule in a phase that's on matches, the result is `true`. Otherwise, it's `false`.

If the application can't reach the Octopus feature flag service at all, none of this happens, and the application uses the default value in its own code.

<!-- SUGGESTED VISUAL: a flowchart of the evaluation sequence, from "Is the environment added?" through to "Does any rule in an enabled phase match?", with each exit labeled with its result -->

## Rules and conditions

A rule is a set of conditions that together describe a group of users, and the rules on an environment are how a flag reaches some users but not others. Conditions in a rule combine with AND: the rule matches only when every condition matches. Rules combine with OR: the flag is on when at least one rule matches.

For example, an environment with these 2 rules:

- **Internal users**: context attribute `email-domain` is one of `octopus.com`
- **Early adopters**: tenant has tag `Ring/Early adopter` AND 50% of targeting keys

turns the flag on for every internal user, and for half the users of tenants in the early adopter ring.

Because rules combine with OR, a condition only limits the rule it's in. To keep a flag away from someone no matter which rule they'd otherwise match, such as excluding one tenant, add that condition to every rule. For the full list of conditions, see [Rule conditions](/docs/feature-flags/rules#rule-conditions).

## Phases

A phase is a stage in a rollout that holds one or more rules. When a phase is on, its rules join the rules from earlier phases that are already on, so each phase widens the rollout rather than replacing it. When a phase is off, its rules are ignored.

Phases turn on in order. A phase can't be on while a phase before it is off, which keeps the rollout moving in one direction. Turning a phase off rolls the flag back to the users the earlier phases target.

An environment with rules but no visible phases holds all its rules in a single phase that's on. For how phases turn on by themselves, see [Rolling out feature flags in phases](/docs/feature-flags/phased-rollouts).

## Default values {#default-values}

A flag has 2 default values, and each applies in a different situation. Mixing them up is the most common cause of a flag returning something unexpected.

The default value on the flag in Octopus is returned for any environment that hasn't been added to the flag. For example, if a flag's default value is off and only `Staging` and `Production` have been added to it, an application in `Development` gets `false`.

The default value in your code, the second argument to the evaluation call, is used only when the application can't get a value from the Octopus feature flag service, for example during a network outage:

```cs
var darkModeEnabled = await featureClient.GetBooleanValueAsync("dark-mode", false);
```

Set the default value in your code to the result that's safest for your users if Octopus can't be reached. In most cases, that's `false`.

## Percentage rollouts

A percentage condition turns a flag on for a share of tenants or users, such as 20% of tenants. Percentages let you limit how many people a change reaches while you watch for problems, then widen it.

Octopus decides who falls in a percentage by hashing an identifier together with a key that belongs to the flag. For tenants, the identifier is the tenant ID. For users, it's the [targeting key](/docs/feature-flags/rules#evaluation-context) your application supplies. The hash is deterministic, so the same tenant or user always gets the same result for the same flag, and they don't flip between on and off as they use your application.

Because the flag's key is part of the hash, a 20% rollout of one flag reaches a different 20% than a 20% rollout of another flag. This stops the same users from always being the first to get every new feature. When you want related flags to reach the same users, put them in a [rollout group](/docs/feature-flags/rollout-groups), which gives every flag in the group the same key.

[VERIFY: that increasing a percentage keeps everyone already included and only adds new tenants or users — needs: confirmation of the bucketing behavior from the feature flags team]

## Publishing

Octopus doesn't evaluate flags inside your deployments. When you save a change to a flag, Octopus publishes the project's flag configuration to the Octopus feature flag service, which your applications' providers read from. This is why flag changes reach running applications without a redeployment.

If a publish fails, the project's **Feature Flags** page shows a callout, and your applications keep the configuration from the last successful publish. To check recent publishes, see [Check a project's publish history](/docs/feature-flags/managing-flags#check-a-projects-publish-history).

[VERIFY: how long a running application takes to see a published change — needs: the provider refresh interval from the feature flags team]

## Related links

- [Targeting users with feature flag rules](/docs/feature-flags/rules)
- [Rolling out feature flags in phases](/docs/feature-flags/phased-rollouts)
- [Previewing feature flag evaluations](/docs/feature-flags/previewing-evaluations)
- [Managing rollout groups](/docs/feature-flags/rollout-groups)

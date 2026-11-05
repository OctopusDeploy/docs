---
layout: src/layouts/Default.astro
pubDate: 2025-05-21
modDate: 2026-11-05
title: Feature flags
sidebarLabel: Overview
navTitle: Overview
navSection: Feature Flags
navOrder: 95
icon: fa-solid fa-toggle-on
description: Turn features on and off without redeploying, and roll changes out to the right users in stages with Octopus Feature Flags.
subject: feature flags, feature toggles, progressive delivery, OpenFeature, phased rollouts, rules
type: concept
audience: [app-dev, devops-eng, evaluator]
image:
imageAlt:
---

This page explains what Octopus Feature Flags are, the parts a flag is built from, and how they connect to the projects, environments, and tenants you already deploy with.

:::div{.hint}
Octopus Feature Flags are available to Octopus Cloud customers as a Private Preview. To get access, [register your interest](https://survey.octopus.com/t/piv3LpVWWmus).
:::

:::div{.info}
If your project's **Feature Flags** page shows an **Upgrade to feature flag rules** callout, the project still uses the previous way of configuring flags. See [Legacy feature flags](/docs/feature-flags/legacy) for how those flags work, or [Upgrading to feature flag rules](/docs/feature-flags/upgrading-to-rules) to move the project to rules.
:::

## Feature flags

A feature flag is a named on/off switch that your application checks at runtime. Flags let you ship code with a feature turned off, then turn it on for some or all of your users without another deployment, and turn it off again as quickly if something goes wrong.

Feature flags belong to a project in Octopus. Your application evaluates them with [OpenFeature](https://openfeature.dev/), an open standard for feature flag SDKs, and the [Octopus provider](/docs/feature-flags/providers) for your language. When your application starts, the provider uses a client identifier to tell the Octopus feature flag service which project, environment, and tenant the application belongs to. Octopus injects the client identifier during deployment, so the same build gets the right flags in every environment.

When you change a flag in Octopus, Octopus publishes the change to the feature flag service, and your applications pick it up without being redeployed.

Use a feature flag when you want to separate releasing a feature from deploying it: to test a change with a small group of users, to roll it out gradually, or to keep a way to turn it off quickly. Feature flags are boolean. They aren't a replacement for configuration values that differ by environment. Use [variables](/docs/projects/variables) for those.

## Environment configuration

A feature flag is configured separately for each environment in your project. Adding an environment to a flag gives that environment its own on/off switch and its own targeting, so a flag can be on for everyone in Development, on for a few internal users in Production, and absent from Staging entirely.

An environment that isn't added to a flag returns the flag's default value. An environment that's added and switched on, with no rules, has the flag on for everyone. To narrow down who gets the flag, you add rules.

## Rules, conditions, and phases

Rules decide who gets a flag in an environment. A rule is made of one or more conditions, such as "the tenant has the tag `Tier/Enterprise`" or "the user falls in 20% of targeting keys". A rule matches when all its conditions match, and the flag is on for a user when any rule matches.

Phases group rules into stages of a rollout. Each phase adds more rules, and turning on a phase adds its rules to the rules that are already on. Phases can turn on by themselves at a set date and time, or a set delay after the phase before them, so a rollout can move from internal users to 10% of users to everyone without anyone having to be online for each step.

<!-- SUGGESTED VISUAL: a diagram showing a feature flag containing environments, an environment containing ordered phases, and each phase containing rules made of conditions, with AND between conditions and OR between rules -->

You don't need phases to use rules. An environment with rules and no phases behaves like a single phase that's always on. To see how these parts combine into a single result, see [How feature flag evaluation works](/docs/feature-flags/how-evaluation-works).

## Feature flags and tenants

In a project that uses [tenants](/docs/tenants), the client identifier also names the tenant an application was deployed for. Rules can target tenants directly, target tenants by their tenant tags, or roll a flag out to a percentage of tenants. This means you can give a feature to one customer, to every customer on a particular tier, or to a growing share of customers, without writing any targeting code in your application.

## Related links

- [Getting started with feature flags](/docs/feature-flags/getting-started)
- [How feature flag evaluation works](/docs/feature-flags/how-evaluation-works)
- [Targeting users with feature flag rules](/docs/feature-flags/rules)
- [Rolling out feature flags in phases](/docs/feature-flags/phased-rollouts)
- [OpenFeature providers](/docs/feature-flags/providers)

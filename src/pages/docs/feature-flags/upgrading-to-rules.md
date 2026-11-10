---
layout: src/layouts/Default.astro
pubDate: 2026-11-05
modDate: 2026-11-05
title: Upgrading to feature flag rules
sidebarLabel: Upgrading to rules
navTitle: Upgrading to rules
navSection: Feature Flags
navOrder: 90
icon: fa-solid fa-circle-up
description: Move an Octopus project's feature flags to rules and phases, and learn how existing targeting converts so your flags keep behaving the same.
subject: feature flags, rules, upgrade, migration, legacy feature flags, targeting
type: guide
audience: [app-dev, devops-eng]
image:
imageAlt:
---

Projects that had feature flags before feature flag rules were introduced keep using the legacy way of configuring flags until you upgrade them. This page explains what the upgrade changes, how your existing targeting converts to rules, and how to upgrade a project.

## The upgrade to feature flag rules

The upgrade moves a project's feature flags from the legacy targeting settings to [rules](/docs/feature-flags/rules) and [phases](/docs/feature-flags/phased-rollouts). Octopus converts every flag in the project, so each flag targets the same tenants and users after the upgrade as it did before. You don't need to set up any flags again.

You upgrade one project at a time, and an upgrade can't be undone. New projects, and existing projects that don't have any feature flags yet, already use rules and don't need upgrading.

The upgrade changes what Octopus publishes to the feature flag service. Applications on a provider version that supports rules get every change you make after the upgrade. Applications on an earlier provider version keep the flag values they had at the upgrade, but don't see any changes after it. Upgrade the provider in every application that uses the project's flags before you upgrade the project. See [OpenFeature providers](/docs/feature-flags/providers) for the minimum versions.

## How legacy settings convert to rules

This table lists each legacy targeting setting on an environment and the rule condition it becomes. Each environment with targeting gets one phase, named `Phase 1`, that's on. An environment with no targeting, or with a 100% tenant rollout and no other settings, gets no rules and stays on for everyone.

| Legacy setting | Becomes |
| --- | --- |
| **Minimum version** | **Minimum version**: Version is at least, in every rule |
| **Tenants to exclude** | **Tenants**: not one of, in every rule |
| **Tenant tags to exclude** | **Tenant tags**: not one of, one condition for each tag set, in every rule |
| **Tenants to include** | **Tenants**: one of, in a rule of its own when the environment also has a tenant rollout |
| **Tenant rollout percentage** | **Percentage** by tenants, when it's less than 100% |
| **Tenant tags to include in rollout** | **Tenant tags**: one of, one condition for each tag set |
| **Client rollout percentage** | **Percentage** by targeting keys, in every rule, when it's less than 100% |
| Segments | **Context attribute**: one of, one condition for each segment key, in every rule |

Because rules combine with OR, the legacy "included tenants OR tenant rollout" becomes 2 rules, and every other setting is repeated in both. For example, an environment with a minimum version of `2.0.0`, the included tenant `Acme Corporation`, and a 50% tenant rollout converts to:

- **Rule 1**: Version is at least `2.0.0` AND tenant is one of `Acme Corporation`
- **Rule 2**: Version is at least `2.0.0` AND 50% of tenants

## Upgrade a project to feature flag rules

Upgrade a project when you're ready to use rules and phases for its feature flags. After the upgrade, the project's flags open in the rules editor.

**Before you begin**

You'll need:

- Every application that uses the project's feature flags on a provider version that supports rules. See [OpenFeature providers](/docs/feature-flags/providers).
- `FeatureToggleEdit` permission for all environments in the project.

To upgrade a project to feature flag rules:

1. From your project, select **Feature Flags**.
2. In the **Upgrade to feature flag rules** callout, select **Upgrade project**.
3. Check the minimum provider versions listed in the dialog against your applications.
4. Type `Upgrade` to confirm.
5. Select **Upgrade**.

The callout no longer appears on the **Feature Flags** page, and each environment with targeting shows its converted rules.

## Related links

- [Feature flags](/docs/feature-flags)
- [Targeting users with feature flag rules](/docs/feature-flags/rules)
- [Rolling out feature flags in phases](/docs/feature-flags/phased-rollouts)
- [OpenFeature providers](/docs/feature-flags/providers)
- [Legacy feature flags](/docs/feature-flags/legacy)

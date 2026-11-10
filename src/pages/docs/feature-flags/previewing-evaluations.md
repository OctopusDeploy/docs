---
layout: src/layouts/Default.astro
pubDate: 2026-11-05
modDate: 2026-11-05
title: Previewing feature flag evaluations
sidebarLabel: Previewing evaluations
navTitle: Previewing evaluations
navSection: Feature Flags
navOrder: 60
icon: fa-solid fa-magnifying-glass
description: Check what an Octopus feature flag returns in each environment and for each tenant, including unsaved changes, before your users see it.
subject: feature flags, evaluation preview, tenants, environments, rules, testing
type: guide
audience: [app-dev, devops-eng]
image:
imageAlt:
---

Evaluation previews show what a feature flag returns for each environment and tenant, based on the flag's rules and what's deployed. This page covers previewing one flag across your environments and tenants, and previewing every flag for one tenant.

## Evaluation previews

An evaluation preview runs a flag's configuration the same way the Octopus feature flag service does, for each environment or tenant in your project, and shows the result with the reason for it. Previews take the version of the release deployed to each environment into account, so **Minimum version** conditions show the result your applications get now.

Previews also include changes you haven't saved yet. While you edit a flag, the preview shows both the saved value and the unsaved value, so you can check a change before it reaches anyone.

A preview covers what Octopus knows: environments, tenants, and deployed versions. It can't know your application's evaluation context, so the result for rules that use **Context attribute** or **Percentage** by targeting keys conditions cannot be previewed in Octopus.

## Preview a feature flag

Preview a flag to check its result in every environment, or for every tenant in one environment, after a change or while you plan one.

To preview a feature flag:

1. From your project, select **Feature Flags**, then select the flag.
2. Select the **Evaluate** tab.
3. In **Display by**, select **Environments** or **Tenants**.
4. Select the **Tenant** or **Environment** to preview for, and the **Channel** if your project uses more than one.

The table lists each environment or tenant with the flag's **Value**, the **Reason** for it, and the deployed **Version**. Projects that use tenants also show an **Untenanted** row for applications deployed without a tenant.

## Preview every feature flag for a tenant

Preview a tenant's flags to answer "what does this customer see?" for every flag in a project at once, such as before a support call or a tenant's upgrade.

**Before you begin**

You'll need:

- A tenant connected to at least one environment in the project.

To preview every feature flag for a tenant:

1. Select **Tenants**, then select the tenant.
2. Select **Feature Flags** on the tenant page.
3. Select the **Project** and **Environment**.

The page lists each of the project's feature flags with its value for that tenant in the environment.

## Related links

- [How feature flag evaluation works](/docs/feature-flags/how-evaluation-works)
- [Targeting users with feature flag rules](/docs/feature-flags/rules)
- [Rolling out feature flags in phases](/docs/feature-flags/phased-rollouts)

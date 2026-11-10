---
layout: src/layouts/Default.astro
pubDate: 2026-11-05
modDate: 2026-11-05
title: Managing feature flags
sidebarLabel: Managing flags
navTitle: Managing flags
navSection: Feature Flags
navOrder: 70
icon: fa-solid fa-sliders
description: Clone Octopus feature flags, copy rules between flags, change slugs safely, and check publish history.
subject: feature flags, clone, slug, client identifier, publish history, troubleshooting
type: guide
audience: [app-dev, devops-eng]
image:
imageAlt:
---

This page covers the everyday upkeep of feature flags in a project: reusing configuration from other flags, renaming a flag's slug without breaking your applications, and checking that your changes reached the Octopus feature flag service.

## Clone a feature flag

Clone a flag to start a new one with the same environments, rules, and phases, such as for a feature that rolls out the same way as an earlier one.

**Before you begin**

You'll need:

- Permission to edit the flag and every environment it's configured for.
- No unsaved changes on the flag.

To clone a feature flag:

1. From your project, select **Feature Flags**, then select the flag.
2. Open the overflow menu and select **Clone**.
3. Enter a **Name** for the new flag.
4. Select **Clone**.

The new flag opens with the original flag's environments, rules, and phases. To stop the clone from reaching users before you're ready, the clone differs from the original in these ways:

- Every environment's switch is off.
- Every phase is off.
- **Specific date/time** triggers are removed. **After a delay** triggers are kept, because they can't fire until you turn on the phase before them.

## Copy rules and phases from another flag

Copy configuration into one environment of a flag when another flag, or another environment, already targets the users you need.

To copy rules and phases from another flag:

1. From your project, select **Feature Flags**, then select the flag you're copying to.
2. In the **Environments** section, select the environment to copy into.
3. Select **Add**, then select **Existing configuration**.
4. Select the flag to copy from.
5. Select **Clone**.
6. Save the flag.

The copied rules or phases appear in the environment, and Octopus shows what it added. If the source is a different environment, the preview reminds you that the configuration may need changes, such as tenants that aren't connected to this environment.

What you get depends on what's already in the environment:

- **No rules yet**: the environment gets a copy of the source's rules or phases.
- **Rules but no phases**: copied rules are added to the existing rules. Copied phases are added after the existing rules, which become the first phase.
- **Phases**: copied rules are added as a new phase at the end, and copied phases are added after the existing phases.

Copied rules that aren't in a phase take effect when you save, like any other rule. Copied phases arrive off, and they keep **After a delay** triggers but not **Specific date/time** triggers, so they don't go live until you turn them on.

## Change a feature flag's slug

Your applications refer to a flag by its slug, so changing the slug changes what your code must ask for. Plan the change so your applications don't fall back to their code defaults.

To change a feature flag's slug safely:

1. Release a version of your application that handles both the old slug and the new slug.
2. From your project, select **Feature Flags**, then select the flag.
3. Change the **Slug**.
4. Save the flag.
5. Release a version of your application that only uses the new slug.

Applications that still ask for the old slug after it is changed in Octopus get the default value in their own code.

## Check a project's publish history

When you save a flag, Octopus publishes the project's flag configuration to the Octopus feature flag service. Publish history shows all publish attempts for the project and the result (success or failure).

To check a project's publish history:

1. From your project, select **Feature Flags**.
2. Select **View publish history**. If the latest publish failed, this link also appears in the callout at the top of the page.

The history lists recent publish attempts and whether each one succeeded. To retry a failed publish, select **Publish now**.

If publishes keep failing on Octopus Server, check that any firewall or proxy lets Octopus Server reach the feature flag service at `features.octopus.com`.

## Related links

- [Feature flags](/docs/feature-flags)
- [Rolling out feature flags in phases](/docs/feature-flags/phased-rollouts)
- [Managing rollout groups](/docs/feature-flags/rollout-groups)
- [Getting started with feature flags](/docs/feature-flags/getting-started)

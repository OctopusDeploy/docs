---
layout: src/layouts/Default.astro
pubDate: 2026-11-05
modDate: 2026-11-05
title: Rolling out feature flags in phases
sidebarLabel: Phased rollouts
navTitle: Phased rollouts
navSection: Feature Flags
navOrder: 40
icon: fa-solid fa-stairs
description: Roll an Octopus feature flag out in stages with phases, and use date and delay triggers to move between stages automatically.
subject: feature flags, phases, phased rollout, triggers, progressive delivery, rollback
type: guide
audience: [app-dev, devops-eng]
image:
imageAlt:
---

Phases let you plan a feature flag's whole rollout in an environment up front, from the first internal users to everyone, and move through it one stage at a time. This page covers adding phases, setting triggers so phases turn on by themselves, and turning phases on and off by hand to move a rollout forward or roll it back.

## Phases and triggers

A phase is a stage in a flag's rollout in one environment, such as "Internal", "10% of users", or "Everyone". Each phase holds one or more [rules](/docs/feature-flags/rules). When a phase is on, its rules join the rules from the phases before it, so every phase you turn on widens the rollout.

Phases are ordered, and they turn on in that order. A phase can't be on while a phase before it is off. Turning a phase off removes its rules from the rollout and rolls the flag back to the users that earlier phases still target.

A trigger turns a phase on without anyone having to do it. Each phase can have one trigger. A phase can turn on at a specific date and time, or a set delay after the phase before it turns on. A phase without a trigger waits for someone to turn it on.

Triggers chain. If phase 2 starts 1 day after phase 1, and phase 3 starts 2 days after phase 2, turning on phase 1 sets the whole rollout in motion. Each delay counts from when the phase before it actually turned on, so if you hold phase 2 back by turning it on by hand later, phase 3 moves back too.

Use phases when you want a planned, staged rollout in an environment. If you only need to target a fixed group of users, rules on their own are enough.

## Add a phase

Add a phase for each stage of the rollout. The first time you add a phase to an environment that already has rules, those rules become the first phase.

**Before you begin**

You'll need:

- A feature flag with the environment added to it. See [Turn on a feature flag for an environment](/docs/feature-flags/getting-started#turn-on-a-feature-flag-for-an-environment).

To add a phase:

1. From your project, select **Feature Flags**, then select the flag.
2. In the **Environments** section, select the environment.
3. Select **Add**, then select **Phase**.
4. Enter a **Phase Name** that describes the stage.
5. Add one or more rules to the phase. See [Add a rule](/docs/feature-flags/rules#add-a-rule).
6. Save the flag.

The new phase appears at the end of the environment's phase list. It's off until you turn it on or its trigger fires.

:::div{.hint}
A phase can't be empty. Removing a phase's last rule removes the phase, including its trigger. To start a new phase from an existing one, open the phase's menu and select **Clone phase**.
:::

## Phase triggers

A phase's trigger decides when the phase turns on. This table lists the trigger types you can choose in the phase's trigger settings.

| Trigger | Settings | Turns the phase on |
| --- | --- | --- |
| **Manual** | None | Only when someone turns it on. |
| **After a delay** | **Delay** and **Unit** (hours or days) | The given time after the phase before it turns on. Not available on the first phase. |
| **Specific date/time** | **Date**, **Time**, and **Timezone** | At the given date and time in the given timezone. |

Delays are exact durations, so a 24-hour delay that crosses a daylight saving change is still 24 hours. A **Specific date/time** trigger still waits for the phases before it: if an earlier phase is off when the date passes, the phase turns on after the earlier phases do.

## Set a phase trigger

Set a trigger to turn a phase on automatically, so the rollout keeps moving outside working hours or without someone watching.

To set a phase trigger:

1. From your project, select **Feature Flags**, then select the flag.
2. In the **Environments** section, select the environment.
3. Select the phase's trigger to open the trigger configuration.
4. Select the trigger type.
5. Enter the trigger's settings.
6. Save the flag.

The phase shows when it's due to turn on, such as "Triggers in 2 days". Octopus checks for due triggers every 30 seconds, so a phase will turn on a short time after its due time.

If a trigger's time has already passed when you save, for example because you set a date in the past, Octopus asks you to confirm in a **Save and Trigger Phases** dialog. Saving turns those phases on straight away, along with any later phases whose triggers also become due.

## Turn a phase on or off

Turn a phase on by hand to start a rollout or move it forward early. Turn a phase off to roll the flag back to the users that earlier phases target.

To turn a phase on or off:

1. From your project, select **Feature Flags**, then select the flag.
2. In the **Environments** section, select the environment.
3. Select **Turn this phase on** or **Turn this phase off** on the phase.
4. Save the flag.

The phase shows as on or off in the environment's phase list, and applications in the environment get the new result after Octopus publishes the change.

Because phases turn on in order, a phase can only be turned off while every phase after it is off. If any phases are enabled out of order the save will be blocked.

:::div{.warning}
Turning a phase off also clears the time it turned on. If the next phase has an **After a delay** trigger, its delay starts again from when you turn the earlier phase back on.
:::

To stop a flag for everyone in the environment straight away (without changing any of the phase configuration), turn off the environment's switch instead.

## Related links

- [How feature flag evaluation works](/docs/feature-flags/how-evaluation-works)
- [Targeting users with feature flag rules](/docs/feature-flags/rules)
- [Previewing feature flag evaluations](/docs/feature-flags/previewing-evaluations)
- [Managing feature flags](/docs/feature-flags/managing-flags)

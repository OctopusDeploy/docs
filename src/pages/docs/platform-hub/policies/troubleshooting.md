---
layout: src/layouts/Default.astro
pubDate: 2025-11-25
modDate: 2026-06-19
title: Troubleshooting policies
subtitle: Diagnose and fix common issues with policy evaluation
icon: fa-solid fa-layer-group
navTitle: Troubleshooting
navSection: Policies
description: How to diagnose and fix common issues with policies in Platform Hub.
navOrder: 175
---

This page covers how to read policy evaluation output, diagnose common problems, and fix known issues. If you're setting up your first policy, see the [getting started guide](/docs/platform-hub/policies) first.

## Understanding evaluation output

Every time a policy is evaluated, Octopus records the result in three places. Use these to confirm a policy is working as expected, or to diagnose why a deployment or runbook run was blocked or flagged.

### Task log

The task log for every deployment or runbook run shows the result of each policy evaluation, including whether it passed or failed and the violation reason if it failed.

:::figure
![The task log showing policy evaluation records](/docs/img/platform-hub/policies-task-log.png)
:::

To see the full input object that was passed to the policy engine, turn on the verbose option in the task log. This shows you the exact data your Rego conditions evaluated against, which is useful when a policy isn't behaving as expected.

:::figure
![Verbose options shown in task logs](/docs/img/platform-hub/policies-verbose-task-log.png)
:::

### Project dashboard

Policy violations appear on the project dashboard so teams can see at a glance whether a recent deployment or runbook run was flagged.

:::figure
![Project dashboard showing policy violation notifications](/docs/img/platform-hub/policies-dashboard-notification.png)
:::

### Audit log

All policy evaluations are recorded in the audit log, including evaluations that passed. To view them, go to **Configuration** > **Audit** and filter by the **Compliance Policy Evaluated** event group.

Audit log entries only appear for executions that fall in the policy's scope. If an execution isn't appearing in the audit log, check that the scope Rego is evaluating correctly for that execution.

:::figure
![Audit log containing policy evaluation records](/docs/img/platform-hub/policies-audit-log.png)
:::

---

## Evaluate a policy against past executions

:::div{.info}
Policy Evaluations is available from Octopus **2026.3.3064**.
:::

The fastest way to diagnose a scope or conditions problem is the **Evaluations** tab on the edit policy page. It evaluates a policy version against deployments and runbook runs that have already happened, without you having to run a new deployment. The results aren't stored and don't affect real executions.

By default it evaluates your current draft, including uncommitted changes, so you can edit your Rego and immediately re-check the results. You can also select a published version from the **Policy version** dropdown.

Each result shows a **Verdict** and a **Scope**:

| Column | Values | What it tells you |
| :--- | :--- | :--- |
| Verdict | `Compliant`, `Block`, `Warning`, `Runtime error` | Whether the execution passes, and what would happen if it didn't |
| Scope | `In`, `Out`, `Invalid` | Whether the execution is evaluated by this policy |

Select **View** on any row to see the violation reason and the full policy input object that was evaluated. Use **Show advanced filters** to narrow the results by task name, space, environment, project, tenant, execution type, or date range.

A `Runtime error` verdict or an `Invalid` scope points to an error in your Rego, often a reference to a conditional field that isn't present. See [Policy causes an evaluation error on runbook runs](#policy-causes-an-evaluation-error-on-runbook-runs).

---

## Common problems

### Policy is not evaluating

If a policy isn't appearing in the task log or audit log for an execution you expect it to cover, work through the following checks.

1. **Check the policy is activated.** A published policy must be activated before Octopus evaluates it. Go to the **Versions** tab on the edit policy page and confirm the policy is active.

1. **Check the scope Rego.** The scope determines which executions the policy evaluates. Open the policy editor and review your scope Rego. Use the verbose task log on a deployment you expect to be in scope to see what input fields were passed, and check whether your scope conditions would match. You can also use the [Evaluations tab](#preview-a-policy-against-past-executions) to see whether past executions resolve to `In` or `Out` of scope.

### Policy is blocking when it should warn

If a policy is blocking deployments or runbook runs when you expect it to only warn, check the following.

1. **Check the default result.** If your conditions Rego sets `default result := {"allowed": false}` without an `action` property, Octopus uses the violation action set on the policy itself. If that's set to `block`, all failures will block. Add `"action": "warn"` to your default result while testing.

    ```ruby
    default result := {"allowed": false, "action": "warn"}
    ```

2. **Check the policy violation action.** The violation action on the policy UI sets the default behaviour for all failures. Go to the edit policy page and confirm it's set to **Warn** if you want warnings by default.

### Policy is not catching skipped steps

If a policy intended to catch skipped steps isn't working, the conditions are likely only checking for step existence and not checking the `SkippedSteps` field.

A step that's been skipped still appears in `input.Steps`, but its ID is also added to `input.SkippedSteps`. Your conditions need to check both:

```ruby
result := {"allowed": true} if {
    some step in input.Steps
    step.Source.SlugOrId == "<step-slug>"
    not step.Id in input.SkippedSteps
    step.Enabled == true
}
```

:::div{.hint}

See [Check for both existence and skipping](/docs/platform-hub/policies/best-practices#check-for-both-existence-and-skipping) in the best practices guide.

:::

### Policy causes an evaluation error on runbook runs

If a policy works correctly for deployments but causes an error on runbook runs, it's likely referencing `input.Release` without guarding against its absence. `Release` is only present for deployments. These errors show as a `Runtime error` verdict on the [Evaluations tab](#preview-a-policy-against-past-executions).

Add a scope to limit the policy to deployments only:

```ruby
default evaluate := false

evaluate if {
    not input.Runbook
}
```

Or, if the policy must evaluate both, check for the field's existence before referencing it:

```ruby
result := {"allowed": true} if {
    input.Release
    input.Release.GitRef == "refs/heads/main"
}
```

The same applies to `input.Runbook` on deployments, and `input.Tenant` on non-tenanted deployments.

:::div{.hint}

See [Guard against conditional fields](/docs/platform-hub/policies/best-practices#guard-against-conditional-fields) in the best practices guide.

:::

### Policy evaluates the wrong executions

If a policy is evaluating executions it shouldn't, or not evaluating ones it should, the scope Rego is likely not matching as expected.

Turn on verbose logging in the task log for an affected execution. This shows the full input object, including the exact values for `Environment.Slug`, `Project.Slug`, `Space.Slug`, and other fields your scope may be checking. Compare these against your scope Rego to identify the mismatch. The [Evaluations tab](#preview-a-policy-against-past-executions) is also useful here: filter the results and check the **Scope** column to see exactly which past executions your scope matches.

Common causes:

- Matching on `Name` instead of `Slug`. Names can change; slugs are stable. Prefer `Slug` for matching.
- Case sensitivity. Rego string comparisons are case-sensitive. `"Production"` and `"production"` are not the same value.
- Missing a guard for `input.Runbook` or `input.Tenant` when the scope assumes those fields are always present.

---

## Known issues

### Windows Server missing Visual C++ dependency

If you see the error "The Compliance Policy engine failed to load. There may be missing dependencies on the machine hosting Octopus Server" when trying to load or create a policy, your Windows Server host is missing the Visual C++ Redistributable.

:::figure
![An error shown when trying to load the policies page due to a missing dependency](/docs/img/platform-hub/policies/policies-missing-dependency.png)
:::

To fix this, install the latest Visual C++ Redistributable for your machine. See [Latest supported Visual C++ Redistributable downloads](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#latest-supported-redistributable-version) on the Microsoft documentation site.

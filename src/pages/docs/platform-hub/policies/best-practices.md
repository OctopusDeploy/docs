---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-09-25
title: Policy best practices
subtitle: Guidance on naming, rollout, and writing reliable policies
icon: fa-solid fa-lock
navTitle: Best practices
navSection: Policies
description: Best practices for creating and managing policies in Platform Hub.
navOrder: 165
---

This page covers the practices that will save you time and prevent problems as you build and roll out policies across your organization. If you're writing your first policy, start with the [getting started guide](/docs/platform-hub/policies) first.

## Naming your policies

A consistent naming standard makes it easy for everyone to understand what a policy does and when it runs, without having to open it.

Use the format **[Scope] - [Policy name]**, where the scope prefix reflects what type of execution the policy applies to:

| Scope prefix | Use when |
| --- | --- |
| `Deployments` | The policy only applies to deployments |
| `Runbook Runs` | The policy only applies to runbook runs |
| `Deployments and Runbook Runs` | The policy applies to both |

For example: `Deployments - Manual intervention required` or `Runbook Runs - Main branch only`.

## Use warn before block

Every new policy should start with `"action": "warn"` in the default result. A warning lets the execution proceed but records the violation in the task log, dashboard, and audit log. This gives you a chance to verify the policy is evaluating the right executions before it starts blocking anyone.

Once you've confirmed the policy is working as expected, switch to `"action": "block"`.

```rego
# Start here while testing
default result := {"allowed": false, "action": "warn"}

# Switch to this once confirmed
default result := {"allowed": false, "action": "block"}
```

You can also use the `action` field in individual rules to block in production while warning elsewhere. See the [block in production, warn elsewhere](/docs/platform-hub/policies/examples#block-in-production-warn-elsewhere) example.

## Start narrow, then broaden

When you create a new policy, limit its scope as tightly as possible:

1. **Start with a single project and execution type.** For example, scope to one project and deployments only. This limits the blast radius if the policy behaves unexpectedly.
2. **Extend to more projects or tenants** once you're confident the policy is correct.
3. **Extend to project groups or spaces** once you're satisfied with behaviour across multiple projects.

This progression also gives teams time to fix violations before the policy scope reaches them, rather than discovering a blocked deployment with no warning.

## Write a clear violation reason

A policy violation is often the first time a user encounters the policies feature. The violation reason is the message they see when a deployment or runbook run fails. Make it specific enough for them to understand what's wrong and what to do about it.

Avoid generic messages like "Policy violation" or "Deployment blocked". Instead, explain what was expected:

:::figure
![An example of a clear, actionable policy violation message](/docs/img/platform-hub/policies/policy-violation-user-message.png)
:::

You can set a default violation reason in the policy UI, and override it per rule using the `reason` property in your conditions Rego:

```rego
result := {"allowed": false, "reason": "A manual intervention step is required and cannot be skipped in this environment"} if {
    manual_intervention_skipped
}
```

## Check for both existence and skipping

It's not enough to check that a required step exists in the process. Users can skip steps when scheduling a deployment or runbook run, even if the step is present.

:::figure
![An example of a step that can be skipped when scheduling a deployment](/docs/img/platform-hub/policies/a-step-that-can-be-skipped-violating-a-policy.png)
:::

Your policy conditions should check both that the step is present and that it hasn't been skipped:

```rego
result := {"allowed": true} if {
    some step in input.Steps
    step.Source.SlugOrId == "<step-slug>"
    not step.Id in input.SkippedSteps
    step.Enabled == true
}
```

:::figure
![An example of a policy checking both step existence and that it is not skipped](/docs/img/platform-hub/policies/example-of-policy-with-two-conditions.png)
:::

See the [steps and skipping examples](/docs/platform-hub/policies/examples#ensure-required-steps-are-present) for complete patterns.

## Guard against conditional fields

Three input fields are not always present in the input object: `Tenant`, `Release`, and `Runbook`. Referencing them without checking for their existence first will cause a policy evaluation error.

| Field | When it's present |
| --- | --- |
| `Tenant` | Tenanted deployments only |
| `Release` | Deployments only |
| `Runbook` | Runbook runs only |

Always guard against their absence in your scope or conditions:

```rego
# Safe: check Runbook exists before accessing its properties
evaluate if {
    input.Runbook
    input.Runbook.Id == "<runbook-id>"
}

# Unsafe: will error if Runbook is absent
evaluate if {
    input.Runbook.Id == "<runbook-id>"
}
```

The simplest way to avoid this is to scope your policy to deployments only or runbook runs only when the policy is specific to one type. See the [scoping examples](/docs/platform-hub/policies/examples#scoping-examples).

## Check for parallel execution

Steps can be configured to run in parallel or sequentially. If your organization requires sequential execution for compliance or audit purposes, add a policy to enforce it.

Each item in the `Execution` input field has a `StartTrigger` property with one of two values:

- `StartAfterPrevious`: the step runs after the previous step completes
- `StartWithPrevious`: the step runs at the same time as the previous step

To enforce sequential execution:

```rego
result := {"allowed": true} if {
    every execution in input.Execution {
        execution.StartTrigger != "StartWithPrevious"
    }
}
```

See the [prevent parallel execution](/docs/platform-hub/policies/examples#prevent-parallel-execution) example for the complete policy.

## Stream evaluations to your SIEM

All policy evaluations are recorded in the Octopus audit log. If your organization uses a SIEM tool such as Splunk, Sumo Logic, or an OpenTelemetry collector, set up [audit log streaming](/docs/security/users-and-teams/auditing/audit-stream) to forward those records automatically.

This gives your security team visibility into policy violations across your entire Octopus instance, and lets you build dashboards and alerts that match your compliance requirements.

## Testing your policy

Before extending a policy's scope or switching from warn to block, verify it's evaluating correctly:

1. Run a deployment or runbook run that should fail the policy. Confirm the violation appears in the task log and project dashboard.
2. Run a deployment or runbook run that should pass the policy. Confirm it proceeds without a violation.
3. Check the audit log under **Configuration** > **Audit**, filtered by **Compliance Policy Evaluated**, to see the full evaluation history.

To see the exact input object that was passed to the policy engine for a specific execution, turn on the verbose option in the task log. This is useful when a policy isn't evaluating as expected. See [Troubleshooting policies](/docs/platform-hub/policies/troubleshooting) for more detail.

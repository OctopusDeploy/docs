---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-11-25
title: Policy examples
subtitle: Ready-to-use Rego organized by what you want to enforce
icon: fa-solid fa-lock
navTitle: Examples
navSection: Policies
description: Example Rego for common policy scenarios, organized by enforcement goal.
navOrder: 161
---

This page organizes policy examples by what you're trying to achieve, rather than by the underlying input fields they use. Find the scenario closest to your goal, copy the Rego, and adapt it to your environment.

If you haven't written a policy before, start with the [getting started guide](/docs/platform-hub/policies). For the full list of input fields available in your Rego, see the [schema for policies](/docs/platform-hub/policies/schema).

## How to use these examples

Each example shows Rego for the scope and conditions sections separately. You can apply them in two ways.

- **Using the policy editor:** Copy the scope Rego into the **Scope** editor and the conditions Rego into the **Conditions** editor, including the `package` declaration in each. The package name must match your policy's slug.
- **Using OCL files:** See [Writing policies as OCL files](#writing-policies-as-ocl-files) at the end of this page.

:::div{.hint}

Start every new policy with `"action": "warn"` in your default result. This lets executions proceed while you verify the policy is evaluating correctly, without risking blocked deployments. Switch to `"action": "block"` once you're confident it's working as expected.

:::

## Ensure required steps are present

Use these examples when you want to guarantee that specific steps, such as approvals, security scans, or manual interventions, are always included in a deployment or runbook run and can't be removed or skipped.

### Require a manual intervention step

Blocks deployments that don't include a manual intervention step. Also blocks deployments where the step exists but has been skipped.

**Scope** (apply to the environments where manual intervention is required):

```rego
package manual_intervention_required

default evaluate := false

evaluate if {
    input.Environment.Slug == "<environment-slug>"
    input.Project.Slug == "<project-slug>"
}
```

**Conditions:**

```rego
package manual_intervention_required

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    some step in input.Steps
    step.ActionType == "Octopus.Manual"
    not manual_intervention_skipped
}

result := {"allowed": false, "reason": "A manual intervention step is required and cannot be skipped"} if {
    manual_intervention_skipped
}

manual_intervention_skipped if {
    some step in input.Steps
    step.Id in input.SkippedSteps
    step.ActionType == "Octopus.Manual"
}
```

### Require a step template

Blocks deployments where a specific step template is absent, disabled, or skipped. Replace `<ActionTemplate-ID>` with the ID of your step template.

**Conditions:**

```rego
package step_template_required

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    some step in input.Steps
    step.Source.Type == "Step Template"
    step.Source.SlugOrId == "<ActionTemplate-ID>"
    not step.Id in input.SkippedSteps
    step.Enabled == true
}
```

### Require a step template at a specific version

Use this when you need to ensure a step template is not just present, but pinned to an approved version. For example, to prevent teams from using an outdated or unpatched version of a shared step.

**Conditions:**

```rego
package step_template_version_required

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    some step in input.Steps
    step.Source.Type == "Step Template"
    step.Source.SlugOrId == "<ActionTemplate-ID>"
    step.Source.Version == "<required-version>"
    not step.Id in input.SkippedSteps
    step.Enabled == true
}
```

### Require a process template

Process templates can contribute multiple steps. This example checks that all steps from the specified process template are present and none have been skipped or disabled.

**Conditions:**

```rego
package process_template_required

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    count(process_template_steps) > 0

    every step in process_template_steps {
        not step.Id in input.SkippedSteps
        step.Enabled
    }
}

process_template_steps := [step |
    some step in input.Steps
    step.Source.Type == "Process Template"
    step.Source.SlugOrId == "<ProcessTemplate-slug>"
]
```

### Require a process template at a specific version

Uses `semver.compare` to check that every step from the process template matches the required version.

**Conditions:**

```rego
package process_template_version_required

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    count(process_template_steps) > 0

    every step in process_template_steps {
        semver.compare(step.Source.Version, "<required-version>") == 0
        step.Enabled
        not step.Id in input.SkippedSteps
    }
}

process_template_steps := [step |
    some step in input.Steps
    step.Source.Type == "Process Template"
    step.Source.SlugOrId == "<ProcessTemplate-slug>"
]
```

### Prevent steps from being skipped or disabled

Use these when you want a blanket rule across all steps, rather than targeting a specific one.

**No steps skipped:**

```rego
package no_steps_skipped

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    count(input.SkippedSteps) == 0
}
```

**No steps disabled:**

```rego
package no_steps_disabled

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    every step in input.Steps {
        step.Enabled
    }
}
```

## Control deployments to production

Use these examples when you want stricter rules for production environments, such as enforcing minimum release versions, restricting which branches can be deployed, or blocking in production while only warning elsewhere.

### Block in production, warn elsewhere

This pattern lets you run a policy in warn mode across all environments but escalate to block in production. Useful when rolling out a new policy: you can observe violations across all environments before they start blocking.

**Conditions:**

```rego
package block_in_production_warn_elsewhere

default result := {"allowed": false, "action": "warn"}

result := {"allowed": false, "action": "block"} if {
    production
    not compliant
}

result := {"allowed": false, "action": "warn"} if {
    not production
    not compliant
}

result := {"allowed": true} if {
    compliant
}

production if {
    startswith(input.Environment.Slug, "prod")
}

# Replace this with your actual compliance check
compliant if {
    count(input.SkippedSteps) == 0
}
```

### Enforce a minimum release version

Blocks production deployments where the release version is below the required minimum, and warns in other environments.

:::div{.hint}
`Release` is only present for deployments, not runbook runs. Use `not input.Runbook` in your scope to prevent evaluation errors.
:::

**Scope:**

```rego
package minimum_release_version

default evaluate := false

evaluate if {
    not input.Runbook
}
```

**Conditions:**

```rego
package minimum_release_version

default result := {"allowed": false, "action": "warn"}

result := {"allowed": false, "action": "block"} if {
    production
    version_too_low
}

result := {"allowed": false, "action": "warn"} if {
    not production
    version_too_low
}

result := {"allowed": true} if {
    not version_too_low
}

production if {
    startswith(input.Environment.Slug, "prod")
}

version_too_low if {
    semver.compare(input.Release.Version, "1.0.0") < 0
}
```

### Require releases to come from the main branch

Blocks deployments where the release was created from a branch other than `main`.

:::div{.hint}
`Release` is only present for deployments. Use `not input.Runbook` in your scope.
:::

**Scope:**

```rego
package release_from_main_branch

default evaluate := false

evaluate if {
    not input.Runbook
}
```

**Conditions:**

```rego
package release_from_main_branch

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    input.Release.GitRef == "refs/heads/main"
}
```

### Require packages to come from the main branch

Blocks deployments where any package was built from a branch other than `main`.

**Conditions:**

```rego
package packages_from_main_branch

default result := {"allowed": false, "action": "warn"}

all_packages := [pkg | some step in input.Steps; some pkg in step.Packages]

result := {"allowed": true} if {
    count(all_packages) == 0
}

result := {"allowed": true} if {
    count(all_packages) > 0
    every pkg in all_packages {
        pkg.GitRef == "refs/heads/main"
    }
}
```

### Require runbook runs to come from the main branch

Blocks runbook runs where the runbook was published from a branch other than `main`.

:::div{.hint}

`Runbook` is only present for runbook runs. Use `input.Runbook` in your scope.

:::

**Scope:**

```rego
package runbook_from_main_branch

default evaluate := false

evaluate if {
    input.Runbook
}
```

**Conditions:**

```rego
package runbook_from_main_branch

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    input.Runbook.GitRef == "refs/heads/main"
}
```

---

## Enforce process structure

Use these examples when you want to ensure deployments and runbook runs follow a predictable structure, with steps running in the right sequence, nothing running in parallel, and specific steps appearing at known positions in the process.

### Prevent parallel execution

Blocks any deployment or runbook run where steps are configured to run at the same time. Useful for environments where parallel execution makes troubleshooting difficult or violates compliance requirements.

**Conditions:**

```rego
package no_parallel_steps

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    every execution in input.Execution {
        execution.StartTrigger != "StartWithPrevious"
    }
}
```

### Require a step to run first or last

Use this to ensure a specific step, such as a pre-flight check or a notification, always appears at the start or end of the process.

**Conditions:**

```rego
package step_at_boundary

default result := {"allowed": false, "action": "warn"}

# Step runs first
result := {"allowed": true} if {
    input.Steps[0].Source.SlugOrId == "<step-slug>"
}

# Step runs last
result := {"allowed": true} if {
    input.Steps[count(input.Steps)-1].Source.SlugOrId == "<step-slug>"
}
```

### Require a process template to run first or last

Similar to the example above, but for a process template that contributes multiple steps.

**Conditions:**

```rego
package process_template_at_boundary

default result := {"allowed": false, "action": "warn"}

# Process template is first
result := {"allowed": true} if {
    input.Steps[0].Source.Type == "Process Template"
    input.Steps[0].Source.SlugOrId == "<ProcessTemplate-slug>"
}

# Process template is last
result := {"allowed": true} if {
    input.Steps[count(input.Steps)-1].Source.Type == "Process Template"
    input.Steps[count(input.Steps)-1].Source.SlugOrId == "<ProcessTemplate-slug>"
}
```

### Require a process template to run before or after a specific step

Use this when relative ordering matters. For example, a security scan process template must always run before a deployment step.

**Conditions:**

```rego
package process_template_ordering

default result := {"allowed": false, "action": "warn"}

# Process template runs before the target step
result := {"allowed": true} if {
    some i, template_step in input.Steps
    template_step.Source.Type == "Process Template"
    template_step.Source.SlugOrId == "<ProcessTemplate-ID>"
    some j, target_step in input.Steps
    target_step.Source.SlugOrId == "<target-step-id>"
    i < j
}

# Process template runs after the target step
result := {"allowed": true} if {
    some i, template_step in input.Steps
    template_step.Source.Type == "Process Template"
    template_step.Source.SlugOrId == "<ProcessTemplate-ID>"
    some j, target_step in input.Steps
    target_step.Source.SlugOrId == "<target-step-id>"
    i > j
}
```

### Require a step template to run before or after a built-in step

Use this when you need to enforce ordering between a custom step template and a built-in action type.

**Conditions:**

```rego
package step_template_and_builtin_ordering

default result := {"allowed": false, "action": "warn"}

# Step template runs before the built-in step
result := {"allowed": true} if {
    some i, template_step in input.Steps
    template_step.Source.Type == "Step Template"
    template_step.Source.SlugOrId == "<StepTemplate-ID>"
    some j, builtin_step in input.Steps
    builtin_step.ActionType == "<builtin-action-type>"
    i < j
}

# Step template runs after the built-in step
result := {"allowed": true} if {
    some i, template_step in input.Steps
    template_step.Source.Type == "Step Template"
    template_step.Source.SlugOrId == "<StepTemplate-ID>"
    some j, builtin_step in input.Steps
    builtin_step.ActionType == "<builtin-action-type>"
    i > j
}
```

### Require ordering between two built-in steps

Use this when two built-in action types must always run in a specific sequence.

**Conditions:**

```rego
package builtin_step_ordering

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    some i, first_step in input.Steps
    first_step.ActionType == "<first-action-type>"
    some j, second_step in input.Steps
    second_step.ActionType == "<second-action-type>"
    i < j
}
```

## Enforce tagging standards

Use these examples when you want to ensure projects, tenants, or environments carry the tags your organisation uses to classify workloads. For example, to confirm a tenant has been assigned a support tier before a deployment can proceed.

:::div{.hint}

`Tenant` is only present for tenanted deployments. Always check for `input.Tenant` before referencing its properties. If your policy evaluates both tenanted and non-tenanted deployments, add an existence check in your conditions.

:::

### Require a project and tenant to carry tags from specific tag sets

Blocks deployments where the tenant doesn't have a tag from the `size/` set, or the project doesn't have a tag from the `lang/` set. Adjust the tag prefixes to match your own tag sets.

**Conditions:**

```rego
package required_tags

default result := {"allowed": false, "action": "warn"}

result := {"allowed": true} if {
    tenant_has_size_tag
    project_has_lang_tag
}

tenant_has_size_tag if {
    some tag in input.Tenant.Tags
    startswith(tag, "size/")
}

project_has_lang_tag if {
    some tag in input.Project.Tags
    startswith(tag, "lang/")
}
```

## Scoping examples

Every policy evaluates all deployments and runbook runs by default. Use scope to limit evaluation to the specific executions your policy is relevant to.

### Scope to a specific space, environment, or project

```rego
package scope_example

default evaluate := false

evaluate if {
    # Match by slug (recommended), name, or ID
    # Use a list to match multiple values: input.Space.Slug in ["slug1", "slug2"]
    input.Space.Slug == "<space-slug>"
    input.Environment.Slug == "<environment-slug>"
    input.Project.Slug == "<project-slug>"
}
```

### Scope to all projects except specific ones

```rego
package scope_example

default evaluate := true

evaluate := false if {
    input.Project.Slug in ["<excluded-slug-1>", "<excluded-slug-2>"]
}
```

### Scope to deployments only

```rego
package scope_example

default evaluate := false

evaluate if {
    not input.Runbook
}
```

### Scope to runbook runs only

```rego
package scope_example

default evaluate := false

evaluate if {
    input.Runbook
}
```

### Scope to a specific runbook

```rego
package scope_example

default evaluate := false

evaluate if {
    input.Runbook
    input.Runbook.Id == "<runbook-id>"
}
```

## Writing policies as OCL files

If you prefer to write policies directly in your Git repository instead of using the policy editor, create `.ocl` files in the `policies` folder of your Platform Hub repository.

### OCL file format

```ocl
name = "Policy Name"
description = "Policy description"
violation_reason = "Custom message shown when the policy fails"
violation_action = "warn"

scope {
    rego = <<-EOT
        package policy_file_name

        default evaluate := false

        evaluate if {
            # Your scope Rego here
        }
    EOT
}

conditions {
    rego = <<-EOT
        package policy_file_name

        default result := {"allowed": false, "action": "warn"}

        result := {"allowed": true} if {
            # Your conditions Rego here
        }
    EOT
}
```

### Rules for OCL files

- The filename must match the package name in your Rego. For example, `checkformanualintervention.ocl` requires `package checkformanualintervention`.
- You can't use dashes in the filename.
- The package name must be identical in both the scope and conditions sections.
- You must include the `package` declaration in both Rego blocks.

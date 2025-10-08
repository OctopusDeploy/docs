---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-09-11
title: Policies examples
subtitle: Examples of policies for different deployment scenarios
icon: fa-solid fa-lock
navTitle: Examples
navSection: Policies
description: Example code for enforcing policies
navOrder: 161
---

There are many different deployment scenarios that you might have that need to be evaluated in order to meet policy conditions. You can use this page as a reference document to help you quickly get started with enforcing policies.

## Scoping examples

The following examples will cover various ways that you can scope your policies:

### Scope policy to a space or many spaces

```ruby
name = "Block executions"
description = "This policy applies to all Deployments and Runbook runs in one or more space(s) and will block executions."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        evaluate if { 
            # input.Space.Name == "<space-name>" - If you want to use Space Name
            # input.Space.Id == "<space-id>" - If you want to use Space Id
            # input.Space.Slug in ["<space-slug>", "<space-slug2>"] - If you want to check multiple Spaces
            input.Space.Slug == "<space-slug>"

        }
    EOT
}

conditions {
    rego = <<-EOT
        package block_executions

        default result := {"allowed": false}
    EOT
}
```

### Scope policy to an environment or many environments

```ruby
name = "Block executions"
description = "This policy applies to all Deployments and Runbook runs and will block executions, to particular Environment(s)."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        evaluate if { 
            # input.Environment.Name == "<environment-name>" - If you want to use Environment Name
            # input.Environment.Id == "<environment-id>" - If you want to use Environment Id
            # input.Environment.Slug in ["<environment-slug>", "<environment-slug2>"] - If you want to check multiple Environments
            input.Environment.Slug == "<environment-slug>"

        }
    EOT
}

conditions {
    rego = <<-EOT
        package block_executions

        default result := {"allowed": false} 
    EOT
}
```

### Scope policy to a project or many projects

```ruby
name = "Block executions"
description = "This policy applies to all Deployments and Runbook runs and will block executions, to particular Project(s)."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        evaluate if { 
            # input.Project.Name == "<project-name>" - If you want to use Project Name
            # input.Project.Id == "<project-id>" - If you want to use Project Id
            # input.Project.Slug in ["<project-slug>", "<project-slug2>"] - If you want to check multiple Projects
            input.Project.Slug == "<project-slug>"

        }
    EOT
}

conditions {
    rego = <<-EOT
        package block_executions

        default result := {"allowed": false}
    EOT
}
```

### Scope policy to runbook runs only

```ruby
name = "Block executions"
description = "This policy applies only to Runbook runs and will block executions to all Runbook runs."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        evaluate if { 
            input.Runbook
        }
    EOT
}

conditions {
    rego = <<-EOT
        package block_executions

        default result := {"allowed": false}
    EOT
}
```

### Scope policy to a runbook and its runs

```ruby
name = "Block executions"
description = "This policy applies only to Runbook runs and will block executions to specific Runbook runs."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        evaluate if {
            # input.Runbook.Name == "<runbook-name>" - If you want to use Runbook Name
            # input.Runbook.Snapshot == "<runbook-snapshot-name>" - If you want to use Runbook Snapshot
            # input.Runbook.Id in ["<runbook-id>", "<runbook-id2>"] - If you want to check multiple Runbooks
            input.Runbook.Id == "<runbook-id>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package block_executions

        default result := {"allowed": false}
    EOT
}
```

### Scope policy to deployments only

```ruby
name = "Block executions"
description = "This policy applies only to Deployments and will block executions to all Deployments."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        evaluate if { 
            not input.Runbook
        }
    EOT
}

conditions {
    rego = <<-EOT
        package block_executions

        default result := {"allowed": false}
    EOT
}
```

## Policy conditions

The following examples will cover different deployment scenarios that can be enforced with policies:

### Check that a step isn't skipped in a deployment

```ruby
name = "All steps are not skipped"
description = "This policy applies to all Deployments and Runbook runs and will check that all steps are not skipped"
violationreason = "No steps can be skipped."

scope {
    rego = <<-EOT
        package all_steps_are_not_skipped

        default evaluate := true
    EOT
}

conditions {
    rego = <<-EOT
        package all_steps_are_not_skipped

        default result := {"allowed": false}

        # Check all steps are not skipped
        result := {"allowed": true} if {
            count(input.SkippedSteps) == 0
        }
    EOT
}
```

### Check that all deployment steps are enabled

```ruby
name = "All steps must be enabled"
description = "This policy applies to all Deployments and Runbook runs and will check that all steps are enabled"
ViolationReason = "No steps can be disabled."

scope {
    rego = <<-EOT
        package all_steps_must_be_enabled

        default evaluate := true
    EOT
}

conditions {
    rego = <<-EOT
        package all_steps_must_be_enabled

        default result := {"allowed": false}

        # Check all steps are enabled
        result := {"allowed": true} if {
            some step in input.Steps
            step.Enabled == true
        }
    EOT
}
```

### Check that a step exists at the beginning or at the end during execution

```ruby
name = "Check Step location"
description = "This policy applies to all Deployments and Runbook runs and will check that a particular step exists at the start or the end of the execution."
ViolationReason = "Step needs to be at the start or end"

scope {
    rego = <<-EOT
        package check_step_location

        default evaluate := true
    EOT
}

conditions {
    rego = <<-EOT
        package check_step_location

        default result := {"allowed": false }

        # Step is at the start
        result := {"allowed": true} if {
            input.Steps[0].Source.SlugOrId == "<step-slug>"
        }

        # Step is at the end
        result := {"allowed": true} if {
            input.Steps[count(input.Steps)-1].Source.SlugOrId == "<step-slug>"
        }
    EOT
}
```

### Check that a Step Template isn't skipped or disabled during a deployment

```ruby
name = "Step Template is executed"
description = "This policy applies to all Deployments and Runbook runs and will check that a particular Step Template exists and is not skipped."
ViolationReason = "Step Template must be run"

scope {
    rego = <<-EOT
        package step_template_is_executed

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package step_template_is_executed

        default result := {"allowed": false}

        result := {"allowed": true} if {
            some step in input.Steps
            step.Source.Type == "Step Template"
            step.Source.SlugOrId == "<ActionTemplate-ID>"
            not step.Id in input.SkippedSteps
            step.Enabled == true
        }
    EOT
}
```

### Check that a Step Template is of a certain version when deployments occur

```ruby
name = "Step Template with version is executed"
description = "This policy applies to all Deployments and Runbook runs and will check that a particular Step Template with a version exists and is not skipped."
ViolationReason = "Step Template with version must be run"

scope {
    rego = <<-EOT
        package step_template_with_version_is_executed

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package step_template_with_version_is_executed

        default result := {"allowed": false}
        
        result := {"allowed": true} if {
            some step in input.Steps
            step.Source.Type == "Step Template"
            step.Source.SlugOrId == "<ActionTemplate-ID>"
            step.Source.Version == "<ActionTemplate-Version>"
            not step.Id in input.SkippedSteps
            step.Enabled == true
        }
    EOT
}
```

### Check that a Process Template is present, and not skipped

```ruby
name = "Process Template is executed"
description = "This policy applies to all Deployments and Runbook runs and will check that a particular Process Template exists and is not skipped."
ViolationReason = "Process Template must be run"

scope {
    rego = <<-EOT
        package process_template_is_executed

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package process_template_is_executed

        default result := {"allowed": false}

        result := {"allowed": true} if {
            some step in input.Steps
            step.Source.Type == "Process Template"
            step.Source.SlugOrId == "<ProcessTemplate-slug>"
            not step.Id in input.SkippedSteps
        }
    EOT
}
```

### Check that a Process Template is enabled

```ruby
name = "Process Template is enabled"
description = "This policy applies to all Deployments and Runbook runs and will check that a particular Process Template is enabled."
ViolationReason = "Process Template must be enabled"

scope {
    rego = <<-EOT
        package process_template_is_enabled

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package process_template_is_enabled

        default result := {"allowed": false}

        result := {"allowed": true} if {
            some step in input.Steps
            step.Source.Type == "Process Template"
            step.Source.SlugOrId == "<ProcessTemplate-slug>"
            step.Enabled == true
        }
    EOT
}
```

### Check that a Process Template is at the beginning or end of a process

```ruby
name = "Process Template location check"
description = "This policy applies to all Deployments and Runbook runs and will check that a particular Process Template exists at the start or the end of the execution."
ViolationReason = "Process Template needs to be at the start or end"

scope {
    rego = <<-EOT
        package process_template_location_check

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package process_template_location_check

        default result := {"allowed": false}

        # Process Template is at the start
        result := {"allowed": true} if {
            input.Steps[0].Source.Type == "Process Template"
            input.Steps[0].Source.SlugOrId == "<ProcessTemplate-slug>"
        }

        # Process Template is at the end
        result := {"allowed": true} if {
            input.Steps[count(input.Steps)-1].Source.Type == "Process Template"
            input.Steps[count(input.Steps)-1].Source.SlugOrId == "<ProcessTemplate-slug>"
        }
    EOT
}
```

### Check that a Process Template is of a certain version when deployments occur

```ruby
name = "Process Template with version is executed"
description = "This policy applies to all Deployments and Runbook runs and will check that a particular Process Template with a specific version exists and is not skipped."
ViolationReason = "Process Template with specific version must be run"

scope {
    rego = <<-EOT
        package process_template_with_version_is_executed

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package process_template_with_version_is_executed

        default result := {"allowed": false}
        
        result := {"allowed": true} if {
            some step in input.Steps
            step.Source.Type == "Process Template"
            step.Source.SlugOrId == "<ProcessTemplate-slug>"
            semver.compare(step.Source.Version, "<specific-version>") == 0
            not step.Id in input.SkippedSteps
            step.Enabled == true
        }
    EOT
}
```

### Check that a Process Template exists before or after certain steps

```ruby
name = "Process Template step ordering"
description = "This policy applies to all Deployments and Runbook runs and will check that a particular Process Template exists before or after a certain step."
ViolationReason = "Process Template must be in correct position relative to other steps"

scope {
    rego = <<-EOT
        package process_template_step_ordering

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package process_template_step_ordering

        default result := {"allowed": false}

        # Process Template exists before a specific step
        result := {"allowed": true} if {
            some i, step in input.Steps
            step.Source.Type == "Process Template"
            step.Source.SlugOrId == "<ProcessTemplate-ID>"
            some j, target_step in input.Steps
            target_step.Source.SlugOrId == "<target-step-id>"
            i < j
        }

        # Process Template exists after a specific step
        result := {"allowed": true} if {
            some i, step in input.Steps
            step.Source.Type == "Process Template"
            step.Source.SlugOrId == "<ProcessTemplate-ID>"
            some j, target_step in input.Steps
            target_step.Source.SlugOrId == "<target-step-id>"
            i > j
        }
    EOT
}
```

### Check if a built-in step happens before another built-in step

```ruby
name = "Built-in step ordering - before"
description = "This policy applies to all Deployments and Runbook runs and will check that one built-in step happens before another built-in step."
ViolationReason = "Built-in step must occur before the target built-in step"

scope {
    rego = <<-EOT
        package builtin_step_before_builtin

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package builtin_step_before_builtin

        default result := {"allowed": false}

        result := {"allowed": true} if {
            some i, first_step in input.Steps
            first_step.ActionType == "<first-builtin-action-type>"
            some j, second_step in input.Steps
            second_step.ActionType == "<second-builtin-action-type>"
            i < j
        }
    EOT
}
```

### Check if a built-in step happens after another built-in step

```ruby
name = "Built-in step ordering - after"
description = "This policy applies to all Deployments and Runbook runs and will check that one built-in step happens after another built-in step."
ViolationReason = "Built-in step must occur after the target built-in step"

scope {
    rego = <<-EOT
        package builtin_step_after_builtin

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package builtin_step_after_builtin

        default result := {"allowed": false}

        result := {"allowed": true} if {
            some i, first_step in input.Steps
            first_step.ActionType == "<first-builtin-action-type>"
            some j, second_step in input.Steps
            second_step.ActionType == "<second-builtin-action-type>"
            i > j
        }
    EOT
}
```

### Check if a custom step template happens before a built-in step

```ruby
name = "Step Template before built-in step"
description = "This policy applies to all Deployments and Runbook runs and will check that a custom step template happens before a built-in step."
ViolationReason = "Step Template must occur before the built-in step"

scope {
    rego = <<-EOT
        package step_template_before_builtin

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package step_template_before_builtin

        default result := {"allowed": false}

        result := {"allowed": true} if {
            some i, template_step in input.Steps
            template_step.Source.Type == "Step Template"
            template_step.Source.SlugOrId == "<StepTemplate-ID>"
            some j, builtin_step in input.Steps
            builtin_step.ActionType == "<builtin-action-type>"
            i < j
        }
    EOT
}
```

### Check if a custom step template happens after a built-in step

```ruby
name = "Step Template after built-in step"
description = "This policy applies to all Deployments and Runbook runs and will check that a custom step template happens after a built-in step."
ViolationReason = "Step Template must occur after the built-in step"

scope {
    rego = <<-EOT
        package step_template_after_builtin

        evaluate if { 
            input.Space.Slug == "<space-slug>"
        }
    EOT
}

conditions {
    rego = <<-EOT
        package step_template_after_builtin

        default result := {"allowed": false}

        result := {"allowed": true} if {
            some i, template_step in input.Steps
            template_step.Source.Type == "Step Template"
            template_step.Source.SlugOrId == "<StepTemplate-ID>"
            some j, builtin_step in input.Steps
            builtin_step.ActionType == "<builtin-action-type>"
            i > j
        }
    EOT
}
```

### Check that a deployment contains a manual intervention step

 ```ruby
name = "Require Manual Intervention step"
description = "Require Manual Intervention step"
violationreason = "Manual intervention step is required in production environment"

scope {
    rego = <<-EOT
        package manualintervention

        evaluate if { 
            startswith(input.Space.Name, "Policies")
            startswith(input.Project.Name, "Payment")
            startswith(input.Environment.Name, "Production")
        }
    EOT
}

conditions {
    rego = <<-EOT
        package manualintervention

        default result := {"allowed": false }

        result := {"allowed": true} if {
            some step in input.Steps
            step.ActionType == "Octopus.Manual"
            not manual_intervention_skipped
        }

        result := {"allowed": false, "Reason": "Manual intervention step cannot be skipped in production environment"} if {
            manual_intervention_skipped
        }

        manual_intervention_skipped if {
            some step in input.Steps
            step.Id in input.SkippedSteps
            step.ActionType == "Octopus.Manual"
        }
    EOT
}
 ```

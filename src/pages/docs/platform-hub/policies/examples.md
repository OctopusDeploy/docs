---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-09-11
title: Policies examples
subtitle: Examples of policies for different deployment scenarios
icon: 
navTitle: Examples
navSection: Policies
description: Example code for enforcing policies
navOrder: 166
listable: false
---

There are many different deployment scenarios that you might have that need to be evaluated in order to meet policy conditions. You can use this page as a reference document to help you quickly get started with enforcing policies.

## Scoping examples

The following examples will cover various ways that you can scope your policies:

### Scope policy to a space or many spaces

```plaintext
name = "Block executions"
description = "This policy applies to all Deployments and Runbook runs in one or more space(s) and will block executions."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        default evaluate := false
        evaluate := true if { 
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

```plaintext
name = "Block executions"
description = "This policy applies to all Deployments and Runbook runs and will block executions, to particular Environment(s)."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        default evaluate := false
        evaluate := true if { 
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

```plaintext
name = "Block executions"
description = "This policy applies to all Deployments and Runbook runs and will block executions, to particular Project(s)."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        default evaluate := false
        evaluate := true if { 
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

```plaintext
name = "Block executions"
description = "This policy applies only to Runbook runs and will block executions to all Runbook runs."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        default evaluate := false
        evaluate := true if { 
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

```plaintext
name = "Block executions"
description = "This policy applies only to Runbook runs and will block executions to specific Runbook runs."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        default evaluate := false
        evaluate := true if {
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

```plaintext
name = "Block executions"
description = "This policy applies only to Deployments and will block executions to all Deployments."
ViolationReason = "Execution are blocked"

scope {
    rego = <<-EOT
        package block_executions

        default evaluate := false
        evaluate := true if { 
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

```plaintext
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

```plaintext
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

```plaintext
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

```plaintext
name = "Step Template is executed"
description = "This policy applies to all Deployments and Runbook runs and will check that a particular Step Template exists and is not skipped."
ViolationReason = "Step Template must be run"

scope {
    rego = <<-EOT
        package step_template_is_executed

        default evaluate := false
        evaluate := true if { 
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

```plaintext
name = "Step Template with version is executed"
description = "This policy applies to all Deployments and Runbook runs and will check that a particular Step Template with a version exists and is not skipped."
ViolationReason = "Step Template with version must be run"

scope {
    rego = <<-EOT
        package step_template_with_version_is_executed

        default evaluate := false
        evaluate := true if { 
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

### Check that a deployment contains a manual intervention step

 ```plaintext
name = "Require Manual Intervention step"
description = "Require Manual Intervention step"
violationreason = "Manual intervention step is required in production environment"

scope {
	rego = <<-EOT
		package manualintervention

		default evaluate := false

		evaluate := true if { 
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

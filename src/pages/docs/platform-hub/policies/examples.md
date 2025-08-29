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
navOrder: 71
---

There are many different deployment scenarios that you might have that need to be evaluated in order to meet policy conditions. You can use this page as a reference document to help you quickly get started with enforcing policies.

## Scoping examples

The following examples will cover various ways that you can scope your policies:

### Scope policy to all spaces

 ```plaintext
    Example code to go here
 ```

## Policy conditions

The following examples will cover different deployment scenarios that can be enforced with policies:

### Check that no steps in a deployment is skipped

```plaintext
name = "All steps are not skipped"
description = "This policy applies to all deployments and runbook runs and will check that all steps are not skipped"
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

### Check that all steps are enabled

```plaintext
name = "All steps must be enabled"
description = "This policy applies to all deployments and runbook runs and will check that all steps are enabled"
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


### Check that a step exists at the beginning or end during execution
```plaintext
name = "Check Step location"
description = "This policy applies to all deployments and runbook runs and will check that a particular step exists at the start or the end of the execution."
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

### Check that a step template is in the execution (check that it isn’t skipped or disabled) 

```plaintext
name = "Step Template is executed"
description = "This policy applies to all deployments and runbook runs and will check that a particular step template exists and is not skipped."
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


### Check that a step template is in the execution that is a particular version (check that it isn’t skipped or disabled) 

```plaintext
name = "Step Template with version is executed"
description = "This policy applies to all deployments and runbook runs and will check that a particular step template with a version exists and is not skipped."
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


### Check that a deployment process contains a manual intervention step

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

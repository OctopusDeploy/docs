---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-11-25
title: Policies examples
subtitle: Examples of policies for different deployment scenarios
icon: fa-solid fa-lock
navTitle: Examples
navSection: Policies
description: Example code for enforcing policies
navOrder: 161
---

There are many different deployment scenarios that you might have that need to be evaluated in order to meet policy conditions. You can use this page as a reference document to help you quickly get started with enforcing policies.

## How to use these examples

You can create policies using the editor available when editing a policy in the Platform Hub or by writing OCL files directly in your Git repository. The examples below show the Rego code for both the scope and conditions sections that you'll need.

### Using the policy editor

When creating a policy using the policy editor in Platform Hub:

1. Enter the policy name, description, violation action and violation reason in the UI fields
2. Add the package name at the top of both the Scope and Conditions editors - this must match your policy's slug
3. Copy the scope Rego code into the Scope editor (including the package declaration)
4. Copy the conditions Rego code into the Conditions editor (including the package declaration)

For example, if your policy slug is `manual_intervention_required`, you need to include `package manual_intervention_required` at the top of both editors.

### Using OCL files

If you prefer to write policies as OCL files in your Git repository, see the [Writing policies as OCL files](#writing-policies-as-ocl-files) section at the end of this page for the complete format.

## Scoping examples

The following examples will cover various ways that you can scope your policies:

### Scope policy to a space or many spaces

```ruby
package scope_example

default evaluate := false

evaluate if { 
    # input.Space.Name == "<space-name>" - If you want to use Space Name
    # input.Space.Id == "<space-id>" - If you want to use Space Id
    # input.Space.Slug in ["<space-slug>", "<space-slug2>"] - If you want to check multiple Spaces
    input.Space.Slug == "<space-slug>"
}
```

### Scope policy to an environment or many environments

```ruby
package scope_example

default evaluate := false

evaluate if { 
    # input.Environment.Name == "<environment-name>" - If you want to use Environment Name
    # input.Environment.Id == "<environment-id>" - If you want to use Environment Id
    # input.Environment.Slug in ["<environment-slug>", "<environment-slug2>"] - If you want to check multiple Environments
    input.Environment.Slug == "<environment-slug>"
}
```

### Scope policy to a project or many projects

```ruby
package scope_example

default evaluate := false

evaluate if { 
    # input.Project.Name == "<project-name>" - If you want to use Project Name
    # input.Project.Id == "<project-id>" - If you want to use Project Id
    # input.Project.Slug in ["<project-slug>", "<project-slug2>"] - If you want to check multiple Projects
    input.Project.Slug == "<project-slug>"
}
```

### Scope policy to all except a particular project

```ruby
package scope_example

default evaluate := true

evaluate := false if { 
    # input.Project.Slug == "<project-slug-to-exclude>" - If you want to exclude one project
    # input.Project.Slug in ["<project-slug1>", "<project-slug2>"] - If you want to exclude multiple projects
    input.Project.Slug == "<project-slug-to-exclude>"
}
```

### Scope policy to runbook runs only

```ruby
package scope_example

default evaluate := false

evaluate if { 
    input.Runbook
}
```

### Scope policy to a runbook and its runs

```ruby
package scope_example

default evaluate := false

evaluate if {
    # input.Runbook.Name == "<runbook-name>" - If you want to use Runbook Name
    # input.Runbook.Snapshot == "<runbook-snapshot-name>" - If you want to use Runbook Snapshot
    # input.Runbook.Id in ["<runbook-id>", "<runbook-id2>"] - If you want to check multiple Runbooks
    input.Runbook.Id == "<runbook-id>"
}
```

### Scope policy to deployments only

```ruby
package scope_example

default evaluate := false

evaluate if { 
    not input.Runbook
}
```

## Conditions examples

The following examples will cover different deployment scenarios that can be enforced with policies:

### Check that a step isn't skipped in a deployment

```ruby
package all_steps_are_not_skipped

default result := {"allowed": false}

# Check all steps are not skipped
result := {"allowed": true} if {
    count(input.SkippedSteps) == 0
}
```

### Check that all deployment steps are enabled

```ruby
package all_steps_must_be_enabled

default result := {"allowed": true}

# Check if any steps are disabled
result := {"allowed": false} if {
    some step in input.Steps
    step.Enabled == false
}
```

### Check that a step exists at the beginning or at the end during execution

```ruby
package check_step_location

default result := {"allowed": false}

# Step is at the start
result := {"allowed": true} if {
    input.Steps[0].Source.SlugOrId == "<step-slug>"
}

# Step is at the end
result := {"allowed": true} if {
    input.Steps[count(input.Steps)-1].Source.SlugOrId == "<step-slug>"
}
```

### Check that a Step Template isn't skipped or disabled during a deployment

```ruby
package step_template_is_executed

default result := {"allowed": false}

result := {"allowed": true} if {
    some step in input.Steps
    step.Source.Type == "Step Template"
    step.Source.SlugOrId == "<ActionTemplate-ID>"
    not step.Id in input.SkippedSteps
    step.Enabled == true
}
```

### Check that a Step Template is of a certain version when deployments occur

```ruby
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
```

### Check that a Process Template is present, and not skipped

```ruby
package process_template_is_executed

default result := {"allowed": false}

result := {"allowed": true} if {
    some step in input.Steps
    step.Source.Type == "Process Template"
    step.Source.SlugOrId == "<ProcessTemplate-slug>"
    not step.Id in input.SkippedSteps
}
```

### Check that a Process Template is enabled

```ruby
package process_template_is_enabled

default result := {"allowed": false}

result := {"allowed": true} if {
    some step in input.Steps
    step.Source.Type == "Process Template"
    step.Source.SlugOrId == "<ProcessTemplate-slug>"
    step.Enabled == true
}
```

### Check that a Process Template is at the beginning or end of a process

```ruby
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
```

### Check that a Process Template is of a certain version when deployments occur

```ruby
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
```

### Check that a Process Template exists before or after certain steps

```ruby
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
```

### Check if a built-in step happens before another built-in step

```ruby
package builtin_step_before_builtin

default result := {"allowed": false}

result := {"allowed": true} if {
    some i, first_step in input.Steps
    first_step.ActionType == "<first-builtin-action-type>"
    some j, second_step in input.Steps
    second_step.ActionType == "<second-builtin-action-type>"
    i < j
}
```

### Check if a built-in step happens after another built-in step

```ruby
package builtin_step_after_builtin

default result := {"allowed": false}

result := {"allowed": true} if {
    some i, first_step in input.Steps
    first_step.ActionType == "<first-builtin-action-type>"
    some j, second_step in input.Steps
    second_step.ActionType == "<second-builtin-action-type>"
    i > j
}
```

### Check if a custom step template happens before a built-in step

```ruby
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
```

### Check if a custom step template happens after a built-in step

```ruby
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
```

### Check that a deployment contains a manual intervention step

```ruby
package manualintervention

default result := {"allowed": false}

result := {"allowed": true} if {
    some step in input.Steps
    step.ActionType == "Octopus.Manual"
    not manual_intervention_skipped
}

result := {"allowed": false, "reason": "Manual intervention step cannot be skipped in production environment"} if {
    manual_intervention_skipped
}

manual_intervention_skipped if {
    some step in input.Steps
    step.Id in input.SkippedSteps
    step.ActionType == "Octopus.Manual"
}
```

### Check that a deployment have packages from main branch only

```ruby
package packages_from_main_branch

default result := {"allowed": true}

all_packages := [pkg | some step in input.Steps; some pkg in step.Packages]

result := {"allowed": false} if {
    count(all_packages) > 0
    some pkg in all_packages
    pkg.GitRef != "refs/heads/main"
}
```

### Check that no steps run in parallel

```ruby
package no_parallel_steps

default result := {"allowed": false}

result := {"allowed": true} if {
    # All steps should have StartAfterPrevious, not StartWithPrevious
    every execution in input.Execution {
        execution.StartTrigger != "StartWithPrevious"
    }
}
```

### Check that a release version is greater than required minimum

This policy will block deployments in production environments, but allow deployments with warnings in other environments. The violation action for this policy has been set to `warn` as a default.

```ruby
package specific_release_version

default result := {"allowed": false}

result := {"allowed": false, "action": "block"} if {
    production
    version_less_than_required
}

result := {"allowed": false} if {
    not production
    version_less_than_required
}

result := {"allowed": true} if {
    not version_less_than_required
}

production if {
    startswith(input.Environment.Slug, "prod")
}

version_less_than_required if {
    semver.compare(input.Release.Version, "1.0.0") < 0
}
```

### Check that release is based on the main branch

```ruby
package main_branch_release

default result := {"allowed": false}

result := {"allowed": true} if {
    input.Release.GitRef == "refs/heads/main"
}
```

### Check that runbook is from the main branch

```ruby
package main_branch_runbook

default result := {"allowed": false}

result := {"allowed": true} if {
    input.Runbook.GitRef == "refs/heads/main"
}
```

### Check that the project and tenant have a tag from the specified tag set

Example of a policy that checks tags for Environments, Tenants and Projects.

```ruby
package tags

default result := {"allowed": false}

result := {"allowed": true} if {
    has_size_tags
    has_lang_tags
}
    
has_size_tags if {
    some tag in input.Tenant.Tags
    startswith(tag, "size/")
}
    
has_lang_tags if {
    some tag in input.Project.Tags
    startswith(tag, "lang/")
}
```

## Writing policies as OCL files

If you prefer to write policies directly as OCL files in your Git repository instead of using the UI editor, you can create `.ocl` files in the `policies` folder of your Platform Hub Git repository.

### OCL file format

The OCL file format wraps the Rego code with metadata about the policy. Here's the structure:

```ruby
name = "Policy Name"
description = "Policy description"
violation_reason = "Custom message shown when policy fails"
violation_action = "warn" or "block"

scope {
    rego = <<-EOT
        package policy_file_name
        
        default evaluate := false
        
        evaluate if {
            # Your scope conditions here
        }
    EOT
}

conditions {
    rego = <<-EOT
        package policy_file_name
        
        default result := {"allowed": false}
        
        result := {"allowed": true} if {
            # Your policy conditions here
        }
    EOT
}
```

### Important notes for OCL files

- The file name must match the package name in your Rego code (e.g., `checkformanualintervention.ocl` requires `package checkformanualintervention`)
- You cannot use dashes in your policy file name
- The package name must be identical in both the scope and conditions sections
- You must include the `package` declaration in the Rego code when using OCL files


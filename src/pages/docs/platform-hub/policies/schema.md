---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-09-11
title: Schema for policies
subtitle: A reference for the input schema passed to the policy engine, including field descriptions, conditional fields, and example patterns.
icon: fa-solid fa-lock
navTitle: Schema for policies
navSection: Policies
description: Schema for policies
navOrder: 162
---

When Octopus evaluates a policy, it passes a structured input object to the policy engine. Your Rego conditions read from this object using `input.<Field>` to make decisions about whether a deployment or runbook run should be allowed to proceed.

This page describes every field available in that input object, explains which fields are always present and which are conditional, and shows common patterns for using them. For complete working examples, see [Policy examples](/docs/platform-hub/policies/examples).

## What's in the input object

The table below summarizes every top-level field available to your policies.

| Field | Type | Always present | Description |
| :--- | :--- | :--- | :--- |
| [Environment](#environment) | object | Yes | The environment the deployment or runbook run is targeting |
| [Project](#project) | object | Yes | The project being deployed |
| [Space](#space) | object | Yes | The space the deployment belongs to |
| [ProjectGroup](#projectgroup) | object | Yes | The project group the project belongs to |
| [Steps](#steps) | array | Yes | All steps included in the deployment process |
| [SkippedSteps](#steps-and-skippedsteps) | array | Yes | IDs of any steps excluded from this deployment |
| [Execution](#execution) | array | Yes | Execution order and parallelism settings for each step |
| RequiresApproval | boolean | Yes | Whether the execution requires an [approval](/docs/approvals) |
| [Tenant](#tenant) | object | **No** | Present only for tenanted deployments |
| [Release](#release) | object | **No** | Present only for deployments (not runbook runs) |
| [Runbook](#runbook) | object | **No** | Present only for runbook runs (not deployments) |

:::div{.hint}

Because `Tenant`, `Release`, and `Runbook` are conditionally present, always check for their existence before referencing them in your conditions. For example, use `input.Runbook` to check the field exists before accessing `input.Runbook.GitRef`. See [Scoping to deployments or runbook runs](#scoping-to-deployments-or-runbook-runs) below.

:::

## Input fields

### Environment

The environment the deployment or runbook run is targeting.

| Property | Type | Description |
| :--- | :--- | :--- |
| Id | string | The unique identifier for the environment |
| Name | string | The display name of the environment |
| Slug | string | The URL-safe slug for the environment |
| Tags | array of strings | Tags applied to the environment |

**Example usage:**

```ruby
# Match environments whose slug starts with "prod"
production if {
    startswith(input.Environment.Slug, "prod")
}

# Match environments with a specific tag
input.Environment.Tags[_] == "regulated"
```

### Project

The Octopus project where the deployment or runbook will be executed.

| Property | Type | Description |
| :--- | :--- | :--- |
| Id | string | The unique identifier for the project |
| Name | string | The display name of the project |
| Slug | string | The URL-safe slug for the project |
| Tags | array of strings | Tags applied to the project |

### Space

The Octopus space the deployment belongs to.

| Property | Type | Description |
| :--- | :--- | :--- |
| Id | string | The unique identifier for the space |
| Name | string | The display name of the space |
| Slug | string | The URL-safe slug for the space |

### ProjectGroup

The project group the project belongs to.

| Property | Type | Description |
| :--- | :--- | :--- |
| Id | string | The unique identifier for the project group |
| Name | string | The display name of the project group |
| Slug | string | The URL-safe slug for the project group |

### Tenant

The tenant for tenanted deployments. **This field is absent for non-tenanted deployments.** Always guard against its absence before using it.

| Property | Type | Description |
| :--- | :--- | :--- |
| Id | string | The unique identifier for the tenant |
| Name | string | The display name of the tenant |
| Slug | string | The URL-safe slug for the tenant |
| Tags | array of strings | Tags applied to the tenant |

**Example usage:**

```ruby
# Only evaluate for tenanted deployments
evaluate if {
    input.Tenant
}

# Check a tag on the tenant
has_required_tag if {
    some tag in input.Tenant.Tags
    startswith(tag, "tier/")
}
```

### Steps and SkippedSteps

`Steps` contains every step in the deployment process. `SkippedSteps` contains the IDs of any steps the person creating the deployment chose to exclude.

These two fields work together. A step that's skipped still appears in `Steps`, but its ID is also added to `SkippedSteps`. This means policies that enforce required steps need to check both fields.

#### Steps

| Property | Type | Always Present | Description |
| :--- | :--- | :--- | :--- |
| Id | string | Yes | The unique identifier for the step |
| Slug | string | Yes | The URL-safe slug for the step |
| ActionType | string | Yes | The built-in action type (e.g. `Octopus.Manual`, `Octopus.Script`) |
| Enabled | boolean | Yes | Whether the step is enabled in the process |
| IsRequired | boolean | Yes | Whether the step has been marked as required |
| IsConditional | boolean | Yes | Whether the step has non-default [run conditions](/docs/projects/steps/conditions) |
| [Source](#source-object) | object | Yes | Where the step comes from. See the Source object below |
| [Packages](#packages-array) | array | No | Packages referenced by this step. Not present for Runbook runs |

#### Source object

| Property | Type | Always Present | Description |
| :--- | :--- | :--- | :--- |
| Type | string | Yes | The source type. Valid values: `"Step Template"`, `"Process Template"` |
| SlugOrId | string | Yes | The slug or ID of the step or process template |
| Version | string | No | The pinned version, if one is set |

#### Packages array

| Property | Type | Always Present | Description |
| :--- | :--- | :--- | :--- |
| Id | string | Yes | The unique identifier for the package reference |
| Name | string | Yes | The name of the package |
| Version | string | No | The resolved package version |
| GitRef | string | No | The Git reference for the package. Sourced from linked Build Information |
| [Feed](#feed-object) | object | No | Details of the feed the package is sourced from |

#### Feed object

| Property | Type | Always Present | Description |
| :--- | :--- | :--- | :--- |
| Id | string | Yes | The unique identifier for the feed |
| Name | string | Yes | Display name of the feed |
| Slug | string | Yes | The URL-safe slug for the feed |
| Type | string | Yes | The feed type (e.g. `BuiltIn`, `Docker`) |
| Uri | string | No | The configured endpoint for the feed |

**Example usage:**

```ruby
# Check that no steps are skipped
result := {"allowed": true} if {
    count(input.SkippedSteps) == 0
}

# Check a specific step template is present and not skipped
result := {"allowed": true} if {
    some step in input.Steps
    step.Source.Type == "Step Template"
    step.Source.SlugOrId == "<ActionTemplate-ID>"
    not step.Id in input.SkippedSteps
    step.Enabled == true
}
```

:::div{.hint}

See the [steps and skipping examples](/docs/platform-hub/policies/examples#check-that-a-step-isnt-skipped-in-a-deployment) for more patterns.

:::

### Execution

The `Execution` array describes the order steps run in and how each step relates to the previous one. Use this field to enforce rules about parallelism or step sequencing.

| Property | Type | Description |
| :--- | :--- | :--- |
| StartTrigger | string | How this step starts. `"StartAfterPrevious"` runs sequentially; `"StartWithPrevious"` runs in parallel with the previous step |
| Steps | array of strings | The IDs of the steps in this execution group |

**Example usage:**

```ruby
# Prevent any steps from running in parallel
result := {"allowed": true} if {
    every execution in input.Execution {
        execution.StartTrigger != "StartWithPrevious"
    }
}
```

### Release

Details about the release being deployed. **This field is absent for runbook runs.**

| Property | Type | Always Present | Description |
| :--- | :--- | :--- | :--- |
| Id | string | Yes | The unique identifier for the release |
| Name | string | Yes | The release name |
| Version | string | Yes | The release version string |
| GitRef | string | No | The Git reference for the release. Only present for version-controlled projects |

**Example usage:**

```ruby
# Only allow releases from the main branch
result := {"allowed": true} if {
    input.Release.GitRef == "refs/heads/main"
}

# Block releases below a minimum version in production
result := {"allowed": false, "action": "block"} if {
    production
    semver.compare(input.Release.Version, "1.0.0") < 0
}
```

:::div{.hint}

See the [release version examples](/docs/platform-hub/policies/examples#check-that-a-release-version-is-greater-than-required-minimum) for more patterns.

:::

### Runbook

Details about the runbook run. **This field is absent for deployments.**

| Property | Type | Always Present | Description |
| :--- | :--- | :--- | :--- |
| Id | string | Yes | The unique identifier for the runbook |
| Name | string | Yes | The display name of the runbook |
| Snapshot | string | Yes | The snapshot name used for this run |
| GitRef | string | No | The Git reference the runbook. Only present for version-controlled runbooks |

**Example usage:**

```ruby
# Scope a policy to runbook runs only
evaluate if {
    input.Runbook
}

# Only allow runbook runs published from main
result := {"allowed": true} if {
    input.Runbook.GitRef == "refs/heads/main"
}
```

---

## Scoping to deployments or runbook runs

Because `Release` and `Runbook` are mutually exclusive, you can use them to scope a policy to one type of execution or the other.

```ruby
# Deployments only
evaluate if {
    not input.Runbook
}

# Runbook runs only
evaluate if {
    input.Runbook
}
```

---

## Output schema

Your Rego conditions must define a `result` object that Octopus reads to determine what to do. The `result` object supports three properties:

| Property | Type | Always Present | Description |
| :--- | :--- | :--- | :--- |
| allowed | boolean | Yes | Whether the policy permits the deployment to proceed |
| reason | string | No | A message shown to the user when the policy fails |
| action | string | No | Overrides the violation action. Valid values: `"block"` or `"warn"` |

The `action` field lets individual policy rules override the default violation action set on the policy. This is useful when you want a single policy to block in production but warn in other environments.

**Example:**

```ruby
# Block in production, warn elsewhere
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
```

---

## Full input schema reference

The complete JSON schema for the policy input object is provided below for use with schema validation tools or IDE integrations.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Octopus Policy input schema",
  "type": "object",
  "properties": {
    "Environment": {
      "type": "object",
      "properties": {
        "Id": { "type": "string" },
        "Name": { "type": "string" },
        "Slug": { "type": "string" },
        "Tags": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["Id", "Name", "Slug", "Tags"]
    },
    "Project": {
      "type": "object",
      "properties": {
        "Id": { "type": "string" },
        "Name": { "type": "string" },
        "Slug": { "type": "string" },
        "Tags": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["Id", "Name", "Slug", "Tags"]
    },
    "Space": {
      "type": "object",
      "properties": {
        "Id": { "type": "string" },
        "Name": { "type": "string" },
        "Slug": { "type": "string" }
      },
      "required": ["Id", "Name", "Slug"]
    },
    "Tenant": {
      "type": "object",
      "properties": {
        "Id": { "type": "string" },
        "Name": { "type": "string" },
        "Slug": { "type": "string" },
        "Tags": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["Id", "Name", "Slug", "Tags"]
    },
    "ProjectGroup": {
      "type": "object",
      "properties": {
        "Id": { "type": "string" },
        "Name": { "type": "string" },
        "Slug": { "type": "string" }
      },
      "required": ["Id", "Name", "Slug"]
    },
    "SkippedSteps": {
      "type": "array",
      "items": { "type": "string" }
    },
    "Steps": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "Id": { "type": "string" },
          "Slug": { "type": "string" },
          "ActionType": { "type": "string" },
          "Enabled": { "type": "boolean" },
          "IsRequired": { "type": "boolean" },
          "IsConditional": { "type": "boolean" },
          "Source": {
            "type": "object",
            "properties": {
              "Type": { "type": "string" },
              "SlugOrId": { "type": "string" },
              "Version": { "type": "string" }
            },
            "required": ["Type", "SlugOrId"]
          },
          "Packages": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "Id": { "type": "string" },
                "Name": { "type": "string" },
                "Version": { "type": "string" },
                "GitRef": { "type": "string" },
                "Feed": {
                  "type": "object",
                  "properties": {
                    "Id": { "type": "string" },
                    "Name": { "type": "string" },
                    "Slug": { "type": "string" },
                    "Uri": { "type": "string" },
                    "Type": { "type": "string" }
                  },
                  "required": ["Id", "Name", "Slug", "Type"]
                }
              },
              "required": ["Id", "Name"]
            }
          }
        },
        "required": ["Id", "Slug", "ActionType", "Enabled", "IsRequired", "IsConditional", "Source"]
      }
    },
    "Release": {
      "type": "object",
      "properties": {
        "Id": { "type": "string" },
        "Name": { "type": "string" },
        "Version": { "type": "string" },
        "GitRef": { "type": "string" }
      },
      "required": ["Id", "Name", "Version"]
    },
    "Runbook": {
      "type": "object",
      "properties": {
        "Id": { "type": "string" },
        "Name": { "type": "string" },
        "Snapshot": { "type": "string" },
        "GitRef": { "type": "string" }
      },
      "required": ["Id", "Name", "Snapshot"]
    },
    "Execution": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "StartTrigger": { "type": "string" },
          "Steps": { "type": "array", "items": { "type": "string" } }
        },
        "required": ["StartTrigger", "Steps"]
      }
    },
    "RequiresApproval": { "type": "boolean" }
  },
  "required": [
    "Environment",
    "Project",
    "Space",
    "SkippedSteps",
    "Steps",
    "ProjectGroup",
    "Execution",
    "RequiresApproval"
  ]
}
```

---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-09-11
title: Policies
subtitle: An overview of Policies
icon: 
navTitle: Overview
navSection: Policies
description: Policies let you enforce standards across your Octopus instance with ease. 
navOrder: 165
---

Policies in Octopus are designed to ensure compliance and governance by default, making it easier to enforce pre- and post-deployment controls at scale. This approach allows you to shift compliance left, alleviating the burden of manual audits and enabling you to maintain high standards across your organization. With policies, you can enforce organization-wide compliance across teams and regions, moving governance out of Confluence docs and Slack threads and into the heart of your delivery pipeline. Using Rego, you can write custom policy checks that align with your requirements, block non-compliant deployments, and access detailed audit logs of policy evaluation events. This method ensures compliance is not an afterthought; it is embedded within every deployment pipeline, providing a seamless and efficient way to uphold governance standards across all activities.

## When to use Policies

Policies streamline the enforcement of standards across all deployments by automating compliance checks and governance measures.

Consider implementing policies if

- You want to ensure that every deployment conforms to predefined standards without manual effort.
- You wish to manage these standards centrally, allowing for consistent application across your organization and easy updating of standards.

While policies may not be necessary in every deployment scenario, they are invaluable if maintaining compliance and security is a priority. By embedding policies into your deployments, you can minimize risks and ensure that all teams are aligned with your organizational standards.

## Enforceable Policies

:::div{.warning}
Policies is currently in Open Alpha
:::

For the Alpha release of Policies, you can enforce that all deployments to specific environments contain a certain step.

Deployments refers to regular deployments and runbook runs. Policies can verify the presence of built-in steps, custom step templates, and community step templates.

An example use-case you might have is to enforce that all deployments going to production environments must contain a manual intervention step.

## Getting Started

All policies are written in Rego and saved as an OCL file. For a comprehensive guide to Rego, please visit the official [documentation.](https://www.openpolicyagent.org/docs/policy-language)

### Building your first policy

1. To get started, you must create a new policies folder in your Platform Hub Git repository. In the folder, you will need to create an OCL file for your policy.

:::div{.warning}
You cannot use dashes in your policy file name
:::

```json
checkformanualintervention.ocl
```

2. After you’ve done this, open the OCL file in your code editor, and start with a name and an optional description

```json
name = "Require Manual Intervention step"
description = "This Policy checks that a manual intervention step isn't skipped when deploying to Production"
```


3. You’ll now need to define the policy's scope, as Rego in the OCL file. Octopus will provide data about your deployments to the policy engine to use during evaluation. When you are writing your Rego code for scoping or conditions, this input data is available under the value input.VALUE.

    For example, Octopus provides the environment details that you are deploying to.


```json
{
    "Environment": {
        "Id": "Environments-1",
        "Name": "Development",
        "Slug": "development"

    }
}
```


    To use the environment name in your Rego, you would add the following:


```json
input.environment.name = "Development"
```


    Full details on the data available for scoping can be found under the [schema section](#schema-for-policies).
    Our worked example applies only to deployments and runbook runs to the production environment for the ACME project, in the default space. All Rego code has to have a package defined, which is the name of your ocl file.


```json
scope {
    rego = <<-EOT
        package checkformanualintervention 
        default evaluate := false
        evaluate := true if {
            input.Environment.Name == "Production"
            input.Project.Name == "ACME"
            input.Space.Name == "Default"
        }
    EOT
}
```


4. After defining your scope, you must specify the policy rules. These rules are written in Rego. Octopus will check the results of your Rego code to determine if a deployment complies with the policy. The result should contain a composite value with the properties “allowed” and an optional “reason.” In this example, we will set the default rule result to be non-compliant. Any deployment that does not meet the policy rules will be prevented from executing.


```json
conditions {
    rego = <<-EOT
    package checkformanualintervention
    default result := {"allowed": false}
    EOT
}

```


5. After you’ve set the default state, you’ll need to define the policy rules that will update the “result” state to be true so the deployment can execute. In this example, the deployment must contain at least one manual intervention step. We can do this by checking the step.ActionType is “Octopus.Manual”


```json
conditions {
    rego = <<-EOT
        package checkformanualintervention
        default result := {"allowed": false}
        result := {"allowed": true} if {
            some step in input.Steps
            step.ActionType == "Octopus.Manual"
        }
    EOT
}
```

6. You’ve now defined a basic policy to ensure a manual intervention step is present when deploying to any environment. You can test this policy by creating a deployment and deploying to an environment. If you choose not to include the manual intervention step, you will see errors in the task log and project dashboards when you try to run the deployment. All policy evaluations will appear in the Audit log (Configuration → Audit) with the “Compliance Policy Evaluated” type. Audit logs and Server Tasks will only appear for deployments within the policy's scope.

```json
name = "Require Manual Intervention step" 
description = "This Policy checks that a manual intervention step isn't skipped when deploying to Production" 

scope {
    rego = <<-EOT
        package checkformanualintervention 
        default evaluate := false
        evaluate := true if {
            input.Environment.Name == "Production"
            input.Project.Name == "ACME"
            input.Space.Name == "Default"
        }
    EOT
} 

conditions {
    rego = <<-EOT
        package checkformanualintervention
        default result := {"allowed": false}
        result := {"allowed": true} if {
            some step in input.Steps
            step.ActionType == "Octopus.Manual"
        }
    EOT
}
```

If you wish to see more comprehensive examples for other deployment scenarios, please visit the [examples page](examples.md).

## Schema for Policies

Octopus has a set number of inputs that are provided to evaluate policies against deployments. The following is the full schema that is passed into the engine to evaluate deployments:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Octopus Policy input schema",
  "type": "object",
  "properties": {
    "Environment": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Slug": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Slug"
      ]
    },
    "Project": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Slug": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Slug"
      ]
    },
    "Space": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Slug": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Slug"
      ]
    },
    "SkippedSteps": {
      "type": "array",
      "items": {}
    },
    "Steps": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "Id": {
            "type": "string"
          },
          "Slug": {
            "type": "string"
          },
          "ActionType": {
            "type": "string"
          },
          "Enabled": {
            "type": "boolean"
          },
          "IsRequired": {
            "type": "boolean"
          },
          "Source": {
            "type": "object",
            "properties": {
              "Type": {
                "type": "string"
              },
              "SlugOrId": {
                "type": "string"
              },
              "Version": {
                "type": "string"
              }
            },
            "required": [
              "Type",
              "SlugOrId"
            ]
          }
        },
        "required": [
          "Id",
          "Slug",
          "ActionType",
          "Enabled",
          "IsRequired",
          "Source"
        ]
      }
    },
    "Runbook": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string"
        },
        "Name": {
          "type": "string"
        },
        "Snapshot": {
          "type": "string"
        }
      },
      "required": [
        "Id",
        "Name",
        "Snapshot"
      ]
    }
  },
  "required": [
    "Environment",
    "Project",
    "Space",
    "SkippedSteps",
    "Steps"
  ]
}
```

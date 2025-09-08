---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-09-11
title: Policies
subtitle: An overview of Policies
icon: 
navTitle: Getting started
navSection: Policies
description: Policies let you enforce standards across your Octopus instance with ease. 
navOrder: 165
navMenu: false
listable: false
---

Policies in Octopus are designed to ensure compliance and governance by default, making it easier to enforce deployment controls at scale. This approach allows you to shift compliance left, alleviating the burden of manual audits and enabling you to maintain high standards across your organization. With policies, you can enforce organization-wide compliance across teams and regions, moving governance out of Confluence docs and Slack threads and into the heart of your delivery pipeline. 

Using Rego, you can write custom policy checks that align with your requirements, block non-compliant deployments, and access detailed audit logs of policy evaluation events. This method ensures compliance is not an afterthought; it is embedded within every deployment pipeline, providing a seamless and efficient way to uphold governance standards across all activities.

## When to use Policies

Policies streamline the enforcement of standards across all deployments by automating compliance checks and governance measures.

Consider implementing policies if:

- You want to ensure that every deployment conforms to predefined standards without manual effort.
- You wish to manage these standards centrally, allowing for consistent application across your organization and easy updating of standards.

While policies may not be necessary in every deployment scenario, they are invaluable if maintaining compliance and security is a priority. By embedding policies into your deployments, you can minimize risks and ensure that all teams are aligned with your organizational standards.

## Enforceable Policies

:::div{.warning}
Policies is currently in Alpha for all Enterprise Tier Cloud Customers. The feature is not finished or fully tested, and may change drastically as we iterate and build more functionality.
:::

For the Alpha release of Policies, you can enforce that all deployments to specific environments contain a certain step. A policy will by default, scope to both runbooks and deployment processes.

An example use-case you might have is to enforce that all deployments going to production environments must contain a manual intervention step.

## Getting started

All policies are written in Rego and saved as an OCL file. For a comprehensive guide to Rego, please visit the official [documentation.](https://www.openpolicyagent.org/docs/policy-language) If you would like to jump straight to examples that are more representative of the deployment scenario you want to enforce, please visit our [examples page](/docs/platform-hub/policies/examples).

:::div{.warning}
Policies can be created on any branch, but will only evaluate deployments from the default branch
:::

In our example below, we are writing a policy that checks for the existence of a manual intervention step whenever deployments go to production.

### Building your first policy

1. To get started, you must create a new folder called **policies** in your Git File Storage Directory. In the folder, you will need to create an OCL file for your policy.

:::div{.warning}
- You cannot use dashes in your policy file name.
- Policies are a 1:1 relationship with an ocl file.
:::

```json
checkformanualintervention.ocl
```

<br>

2. After you’ve done this, open the OCL file in your code editor, and start with a name, an optional description, and an optional violation reason. A violation reason will show a custom message to users when they fail to meet the conditions of a policy.

<br>

   ```json
   name = "Require Manual Intervention step"
   description = "This Policy checks that a manual intervention step isn't skipped when deploying to Production"
   ViolationReason = "Manual intervention step is required to deploy"
   ```

<br>

3. You’ll now need to define the policy's scope, as Rego in the OCL file. Octopus will provide data about your deployments to the policy engine to use during evaluation. When you are writing your Rego code for scoping or conditions, this input data is available under the value ```input.VALUE```. This scope section of the policy defines the package name, which must match the underlying .ocl file name the policy is stored in. By default, the policy evaluates to false. The scope will evaluate to true if the deployment is going to the Production environment, for the ACME project, and in the Default space - all three conditions must be true at the same time.

<br>

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

:::div{.warning}
 Full details on the data available for scoping can be found under the [schema page](/docs/platform-hub/policies/schema).
:::


   Our example applies only to deployments and runbook runs to the production environment for the ACME project, in the default space. **All Rego code has to have a package defined, which is the name of your ocl file.**

   ```ruby
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

4. After defining your scope, you must specify the policy rules. These rules are written in Rego. Octopus will check the results of your Rego code to determine if a deployment complies with the policy. The result should contain a composite value with the properties **allowed** and an optional **reason.** In this example, we will set the default rule result to be non-compliant. Any deployment that does not meet the policy rules will be prevented from executing. This conditions section of the policy defines the package name, which must match the underlying .ocl file name the policy is stored in. By default, the policy evaluates to false. The condition will evaluate to true if the deployment contains the required steps.

   :::div{.warning}
   - You cannot rename **result**, it must be called **result**.
   - The package name must be the same as your policy file name.
   :::

   ```json
   conditions {
       rego = <<-EOT
       package checkformanualintervention
       default result := {"allowed": false}
       EOT
   } 
   ```

<br>

5. After you’ve set the default state, you’ll need to define the policy rules that will update the **result** state to be true so the deployment can execute. In this example, the deployment must contain at least one manual intervention step. We can do this by checking the step.ActionType is “Octopus.Manual”

<br>

   ```ruby
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
<br>

6. You’ve now defined a basic policy to ensure a manual intervention step is present when deploying to any environment. You can test this policy by customizing the values in the scope block, and then deploying to an environment. If you choose not to include the manual intervention step in your process, you will see errors in the task log and project dashboards when you try to run the deployment. All policy evaluations will appear in the Audit log (**Configuration** → **Audit**) with the “Compliance Policy Evaluated” filter applied. Audit logs and Server Tasks will only appear for deployments within the policy's scope.

<br>

   ```ruby
   name = "Require Manual Intervention step" 
   description = "This Policy checks that a manual intervention step isn't skipped when deploying to Production" 
   ViolationReason = "Manual intervention step is required to deploy"
    
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

   :::div{.hint}
   - If you wish to see more comprehensive examples for other deployment scenarios, please visit the [examples page](/docs/platform-hub/policies/examples).
   - If you wish to see the schema of inputs available for policies, please visit the [schemas page](/docs/platform-hub/policies/schema).
   :::

## Policy evaluation information

If you want to see what information was provided to the policy engine when it evaluates a deployment, you can do so in the task log. Every deployment, whether they succeeded or failed due to a policy evaluation, will show information in the following places:

1. Task logs

![The task logs showing policy audit records](/docs/platform-hub/policies-task-log.png)

<br>

2. Project dashboards

![Dashboards showing policy errors](/docs/platform-hub/policies-dashboard-notification.png)

<br>

3. Audit records

![Audit log containing policy evaluation records](/docs/platform-hub/policies-audit-log.png)

<br>

You can see what information was evaluated at the time of policy evaluation by using the verbose option in the task logs. This is useful if you want to troubleshoot a policy and see if it is evaluating deployments correctly.

![Verbose options shown in task logs](/docs/platform-hub/policies-verbose-task-log.png)

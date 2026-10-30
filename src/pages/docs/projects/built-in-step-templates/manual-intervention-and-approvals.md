---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-10-29
title: Manual intervention and approval step
icon: fa-solid fa-check
description: Manual intervention and approvals allow a human to review, approve, or sign off on deployments.
navOrder: 20
---

While fully automated deployment is a great goal, there are times when a human needs to be involved in the deployment process. For instance:

- To provide sign off/approval before a deployment proceeds.
- To manually check the homepage of a newly deployed site works before making it live.
- To perform a database upgrade or update some infrastructure in an environment where you're not allowed to automate the steps (e.g. you have to deliver your database changes to a DBA to be manually reviewed and run).
- To receive sign off/approval after a deployment completes.

The **Manual intervention step** is a step that can be added to deployment processes to pause the deployment to wait for a member of a specified team to either allow the deployment to proceed or to be aborted.

:::div{.hint}
Manual interventions result in either a success or failure outcome based on the user's input. Subsequent steps evaluate this outcome according to their run conditions. By default, the run condition is set to "Success: only run when previous steps succeed." This means manual interventions can prevent these steps from executing, causing the deployment to fail.

However, if "Always Run" is selected for subsequent steps, they will proceed regardless of the manual intervention outcome. For steps with the condition "Variable: only run when the variable expression is true," the manual intervention's outcome must be included in the variable expression to determine whether the step should run.
:::

[Getting Started - Manual Intervention](https://www.youtube.com/watch?v=ePQjCClGfZQ)

:::div{.hint}
[Easy Mode - Manual Interventions](https://octopus.com/blog/octo-easy-mode-03-manual-intervention) provides a practical example of manual intervention steps you can apply to your own Octopus instance.
:::

## Add a manual intervention step

Manual intervention steps are added to deployment processes in the same way as other steps.

1. Navigate to your [project](/docs/projects).
2. Click **Process** and **Add step** to add a step to an existing process. Alternatively, if this is a new deployment process, click the **Create process** button.
3. Find the **Manual Intervention Required** step and click **Add step**.
4. Give the step a short memorable name.
5. Provide instructions for the user to follow. For instance, "*Ensure traders are aware of the deployment.*"
6. Select which teams are responsible for the step. Note, if you don't specify a team, anybody with permission to deploy the project can perform the manual intervention.
7. You can set conditions to determine when the step should run. For instance:
   - Only run the manual intervention for specific environments.
   - Run the manual intervention based on the status (success or failure) of the previous step.
   - Wait for the previous step to complete.
   - Run based on the value of a variable expression.
   - [Make the step required](#make-the-step-required) so it can't be excluded.
8. Save the deployment process.

## Make the step required

By default, anyone who creates a deployment or runbook run, including an AI agent, can exclude a manual intervention step in the **Excluded steps** section. The step then doesn't run, so nobody is asked to action it.

To stop the step from being excluded, select **Required** in the step's **Conditions**. Selecting responsible teams also makes the step required.

A required step still doesn't run if its environment, channel, tenant, or run conditions exclude it. Anyone who can edit the deployment process or runbook can also clear the **Required** option. To enforce manual interventions across projects, use a [policy that requires a manual intervention step](/docs/platform-hub/policies/examples#require-a-manual-intervention-step).

## When the deployment pauses

The point at which a deployment or runbook run pauses depends on how the manual intervention step is positioned in the deployment process:

### As a standalone step

The deployment pauses after all currently executing parallel steps have completed. Once the intervention is handled, the deployment may need to wait for a task cap slot to become available before it resumes.

### As a child step

A manual intervention can be configured as a child step nested inside another step. In this case:

- The deployment does **not** pause at the task level — the task slot remains active while waiting for intervention.
- The deployment will not progress to subsequent child steps until the intervention is handled.

The exception is when the manual intervention is the **last child step** of a parent step with no associated deployment target (i.e., the parent is not part of a rolling deployment). In that case, the deployment pauses in the same way as a standalone step.

:::div{.hint}
When a manual intervention pauses the deployment task, it frees the task slot for other work. When the deployment is ready to resume, it will wait for an available task cap slot, which may introduce a delay before it continues.

When a manual intervention does not pause the deployment task, the task slot remains in use while awaiting intervention. If multiple deployments are held at manual interventions simultaneously, they can exhaust all available task cap slots and prevent new tasks from starting.
:::

## Assigning manual interventions

When a deployment is executing and a manual step is encountered, the deployment will show a status of **Waiting**. An interruption will appear at the top of the deployment page.

:::figure
![A deployment waiting on a manual intervention, with Assign to me, Show details, and View log in the banner above the task log](/docs/img/projects/built-in-step-templates/images/waiting-status.png)
:::

You can click **Show details** to view the instructions.

If you are in the team of users that can take responsibility for the interruption, you'll also be able to assign the interruption to yourself by clicking **Assign to me**.

:::div{.hint}
Interruptions can only be assigned to one person at a time to prevent two people from accidentally performing the manual step.
:::

When the interruption has been assigned to you, you can then perform the action in the instructions, and then choose to either **Proceed** (allow the deployment to continue) or **Abort** (fail and stop the deployment from continuing):

When aborting a deployment, it's a good idea to write a reason into the **Notes** field, so that the rest of the team can see why the deployment was aborted.

The tasks page, under the "Needs Approval" tab, contains a list of deployments pending manual intervention. In addition to the deployment page, you can **Assign**, **Proceed**, and **Abort** deployments from this list.

## Block AI agents

By default, AI agents can assign and submit manual interventions, the same as the person they act for. To make sure a person actions the intervention, set **Block AI agents** to **Prevent AI agents from actioning this intervention** on the manual intervention step. Also [make the step required](#make-the-step-required), so an AI agent can't exclude the step when it starts a deployment or runbook run.

When AI agents are blocked:

- AI agents can't assign or submit the manual intervention. They're told a person needs to action it, with a link to the task.
- The task page shows that AI agents can't action the manual intervention.
- People can always action it.
- Only callers that sign in as an AI agent are blocked, such as with an AI agent API key or through the Octopus MCP server. An agent using a person's API key counts as a person.
- If a **Deploy a release** step runs a deployment that's waiting on this manual intervention, AI agents can't action it from the parent either.
- AI agents can still cancel the task if they have permission to.

You can bind **Block AI agents** to a variable. If the value isn't `True` or `False`, AI agents are blocked and the task log shows a warning.

To pause only deployments or runbook runs started by an AI agent, set the step's **Run Condition** to **Variable** with this expression:

```text
#{if Octopus.Deployment.CreatedBy.ActorType == "Agent"}true#{/if}
```

:::div{.warning}
**This setting is advisory, not a security boundary.** Anyone who can edit the deployment process or runbook can turn this setting off, clear the **Required** option, or remove the step. This includes an AI agent with that permission.

A project variable named `Octopus.Action.Manual.PreventAgentResponses` overrides this setting. Anyone who can edit project variables can use it to let AI agents action manual interventions.
:::

## Output variables

When a manual step is completed, details of the interruption are saved as variables that can be used in other steps including [email](/docs/projects/built-in-step-templates/email-notifications) templates.

*Step Name* below refers to the name given to the manual step. For example "*Ensure traders are aware of the deployment*".

| Variable name                                                          | Contains                                                          | Example value                                                         |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| `Octopus.Action[Step Name].Output.Manual.Notes`                        | The contents of the *Notes* field from the interruption form      | *Checked with Rick, got the all-clear; Michelle is out at a meeting.* |
| `Octopus.Action[Step Name].Output.Manual.Approved`                     | Indicates if the step was approved                                | *True*                                                                |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.Id`           | The user ID of the user who submitted the interruption form       | *users-237*                                                           |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.Username`     | The username of the user who submitted the interruption form      | *j_jones*                                                             |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.DisplayName`  | The display name of the user who submitted the interruption form  | *Jamie Jones*                                                         |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.EmailAddress` | The email address of the user who submitted the interruption form | *<jamie.jones@example.com>*                                           |

## Evaluating manual intervention output in following steps

If you want to control subsequent steps based on the outcome of the manual intervention step, you can use "Variable: only run when the variable expression is true", and use the `Octopus.Deployment.Error` variable as the conditional. For example:

```text
#{unless Octopus.Deployment.Error}RESULT IF MANUAL INTERVENTION PROCEEDED{/unless}
```

or

```text
#{if Octopus.Deployment.Error}RESULT IF MANUAL INTERVENTION WAS ABORTED{/if}
```

## Learn more

- [Advanced manual approvals](/docs/deployments/databases/common-patterns/manual-approvals)
- [Automated approvals](/docs/deployments/databases/common-patterns/automatic-approvals)
- [Automated approval sample](https://samples.octopus.app/app#/Spaces-202/projects/octofx/deployments/process)
- [Automatic approvals for your database deployments](https://octopus.com/blog/autoapprove-database-deployments)
- [Building trust in an automated database deployment process](https://octopus.com/blog/building-trust-in-automated-db-deployments)

---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-12-02
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
Manual interventions result in either a success or failure outcome based on the user’s input. Subsequent steps evaluate this outcome according to their run conditions. By default, the run condition is set to "Success: only run when previous steps succeed." This means manual interventions can prevent these steps from executing, causing the deployment to fail.

However, if "Always Run" is selected for subsequent steps, they will proceed regardless of the manual intervention outcome. For steps with the condition "Variable: only run when the variable expression is true," the manual intervention's outcome must be included in the variable expression to determine whether the step should run.
:::

[Getting Started - Manual Intervention](https://www.youtube.com/watch?v=ePQjCClGfZQ)

## Add a manual intervention step

Manual intervention steps are added to deployment processes in the same way as other steps.

1. Navigate to your [project](/docs/projects).
2. Click **Process** and **Add step** to add a step to an existing process. Alternatively, if this is a new deployment process, click the **Create process** button.
3. Find the **Manual Intervention Required** step and click **Add step**.
4. Give the step a short memorable name.
5. Provide instructions for the user to follow. For instance, "*Ensure traders are aware of the deployment.*"
6. Select which teams are responsible for the step. Note, if you don't specify a team, anybody with permission to deploy the project can perform the manual intervention. Specifying a team makes the step a required step that cannot be skipped.
7. You can set conditions to determine when the step should run. For instance:
   - Only run the manual intervention for specific environments.
   - Run the manual intervention based on the status (success or failure) of the previous step.
   - Wait for the previous step to complete.
   - Run based on the value of a variable expression.
8.  Save the deployment process.

## Assigning manual interventions

When a deployment is executing and a manual step is encountered, the deployment will show a status of **Waiting**. An interruption will appear at the top of the deployment summary.

:::figure
![Waiting Status](/docs/projects/built-in-step-templates/images/waiting-status.png)
:::

You can click **Show details** to view the instructions.

If you are in the team of users that can take responsibility for the interruption, you'll also be able to assign the interruption to yourself by clicking **Assign to me**. 

:::div{.hint}
Interruptions can only be assigned to one person at a time to prevent two people from accidentally performing the manual step.
:::

When the interruption has been assigned to you, you can then perform the action in the instructions, and then choose to either **Proceed** (allow the deployment to continue) or **Abort** (fail and stop the deployment from continuing):

When aborting a deployment, it's a good idea to write a reason into the **Notes** field, so that the rest of the team can see why the deployment was aborted.

The tasks page, under the "Needs Approval" tab, contains a list of deployments pending manual intervention. In addition to the deployment page, you can **Assign**, **Proceed**, and **Abort** deployments from this list.

## Output variables

When a manual step is completed, details of the interruption are saved as variables that can be used in other steps including [email](/docs/projects/built-in-step-templates/email-notifications) templates.

*Step Name* below refers to the name given to the manual step. For example "*Ensure traders are aware of the deployment*".

| Variable name | Contains | Example value |
| --- | --- | --- |
| `Octopus.Action[Step Name].Output.Manual.Notes` | The contents of the *Notes* field from the interruption form | *Checked with Rick, got the all-clear; Michelle is out at a meeting.* |
| `Octopus.Action[Step Name].Output.Manual.Approved` | Indicates if the step was approved | *True*
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.Id` | The user ID of the user who submitted the interruption form | *users-237* |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.Username` | The username of the user who submitted the interruption form | *j_jones* |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.DisplayName` | The display name of the user who submitted the interruption form | *Jamie Jones* |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.EmailAddress` | The email address of the user who submitted the interruption form | *jamie.jones@example.com* |

## Evaluating manual intervention output in following steps
If you want to control subsequent steps based on the outcome of the manual intervention step, you can use "Variable: only run when the variable expression is true", and use the `Octopus.Deployment.Error` variable as the conditional. For example:

```
#{unless Octopus.Deployment.Error}RESULT IF MANUAL INTERVENTION PROCEEDED{/unless}
```
or
```
#{if Octopus.Deployment.Error}RESULT IF MANUAL INTERVENTION WAS ABORTED{/if}
```

## Learn more

- [Advanced manual approvals](/docs/deployments/databases/common-patterns/manual-approvals)
- [Automated approvals](/docs/deployments/databases/common-patterns/automatic-approvals)
- [Automated approval sample](https://samples.octopus.app/app#/Spaces-202/projects/octofx/deployments/process)
- [Automatic approvals for your database deployments](https://octopus.com/blog/autoapprove-database-deployments)
- [Building trust in an automated database deployment process](https://octopus.com/blog/building-trust-in-automated-db-deployments)

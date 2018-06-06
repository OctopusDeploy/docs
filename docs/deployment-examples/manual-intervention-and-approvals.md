---
title: Manual Intervention and Approvals
description: Manual intervention and approvals allow a human to review, approve, or sign off on deployments.
position: 11
---

While fully automated deployment is a great goal, there are times when a human needs to be involved in the deployment process. For instance:

- To provide sign off/approval before a deployment proceeds.
- To manually check the homepage of a newly deployed site works before making it live.
- To perform a database upgrade or update some infrastructure in an environment where you're not allowed to automate the steps (e.g., you have to deliver your database changes to a DBA to be manually reviewed and run).
- To receive sign off/approval after a deployment completes.

The **Manual intervention step** is a step that can be added to deployment processes to pause the deployment to wait for a member of a specified team to either allow the deployment to proceed or to be aborted.

## Add a Manual Intervention Step

Manual intervention steps are added to deployment processes in the same way as other steps.

1. Navigate to your [project's](/docs/deployment-process/projects/index.md) overview page by selecting **Projects** and clicking on the project you are working with.
2. Click **PROCESS** and **ADD STEP** to add a step to an existing process. Alternatively, if this is a new deployment process, click the **DEFINE YOUR DEPLOYMENT PROCESS** button, and click **ADD STEP**.
3. Find the **Manual Intervention Required** step, hover over the step, and click **ADD**.
4. Give the step a short memorable name.
5. The step will run on the Octopus Server.
6. Provide instructions for the user to follow, for instance, *Ensure traders are aware of the deployment.*
7. Select which teams are responsible for the step. Note, if you don't specify a team, anybody with permission to deploy the project can perform the manual intervention. Specifying a team, makes the step a required step that cannot be skipped.
9. You can set conditions to determine when the step should run. For instance:

  - Only run the manual intervention for specific environments.
  - Run the manual intervention based on the status (success or failure) of the previous step.
  - Wait for the previous step to complete.
  - Run based on the value of a variable expression.

10. Save the step.

## Assigning Manual Interventions

When a deployment is executing and a manual step is encountered, the deployment will show a status of **Waiting**. An interruption will appear at the top of the deployment summary.

![](/docs/images/3048086/3277689.png "width=500")

You can click **show details** to view the instructions.

If you are in the team of users that can take responsibility for the interruption, you'll also be able to assign the interruption to yourself by clicking **ASSIGN TO ME**. Note: interruptions can only be assigned to one person at a time to prevent two people from accidentally performing the manual step.

When the interruption has been assigned to you, you can then perform the action in the instructions, and then choose to either **Proceed** (allow the deployment to continue) or **Abort** (fail and stop the deployment from continuing):

When aborting a deployment, it's a good idea to write a reason into the **Notes** field, so that the rest of the team can see why the deployment was aborted.

## Output Variables

When a manual step is completed, details of the interruption are saved as variables that can be used in other steps including [email](/docs/deployment-examples/email-notifications.md) templates.

*Step Name* below refers to the name given to the manual step, for example *Ensure traders are aware of the deployment*.

| Variable name | Contains | Example value |
| --- | --- | --- |
| `Octopus.Action[Step Name].Output.Manual.Notes` | The contents of the *Notes* field from the interruption form | *Checked with Rick, got the all-clear; Michelle is out at a meeting.* |
| `Octopus.Action[Step Name].Output.Manual.Approved` | Indicates if the step was approved | *True*
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.Id` | The user ID of the user who submitted the interruption form | *users-237* |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.Username` | The username of the user who submitted the interruption form | *jjones* |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.DisplayName` | The display name of the user who submitted the interruption form | *Jamie Jones* |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.EmailAddress` | The email address of the user who submitted the interruption form | *jamie.jones@example.com* |

---
title: Manual Intervention and Approvals
description: Manual intervention and approvals allow a human to review, approve or sign off on deployments.
position: 11
---

While fully automated deployment is a great goal, not every step in a deployment can be automated, and sometimes a human needs to get involved. Production deployments may require:

- Getting sign off/approval before a deployment
- A human checking that the homepage of a newly deployed site works before making it live
- Performing a database upgrade or updating some infrastructure in an environment where you're not allowed to automate the steps (e.g., you have to deliver your database changes to a DBA to be manually reviewed and run)
- Getting sign off/approval after a deployment completes

To support these scenarios, you can add **Manual Steps** to your deployment process.

## Adding manual steps {#Manualinterventionandapprovals-Addingmanualsteps}

Manual steps are one of the step types that appear when you click **Add step** on the **Process** tab of your project. For information about adding a step to the deployment process, see the [add step](/docs/deploying-applications/adding-steps.md) section.

![](/docs/images/5671696/5865911.png "width=170")

When you define a manual step, you specify some instructions for the step, and select a team of users who can *take responsibility* for the step.

![](/docs/images/3048086/3277690.png "width=500")

## Assigning manual interventions {#Manualinterventionandapprovals-Assigningmanualinterventions}

When a deployment is executing and a manual step is encountered, the deployment will show a status of **Waiting**. An interruption will appear at the top of the deployment summary.

![](/docs/images/3048086/3277689.png "width=500")

You can click **show details** to view the instructions.

![](/docs/images/3048086/3277688.png "width=500")

If you are in the team of users that can take responsibility for the interruption, you'll also be able to assign the interruption to yourself. Interruptions can only be assigned to one person at a time - this is a simple way to prevent two people from accidentally performing the manual step.

![](/docs/images/3048086/3277687.png "width=500")

When the interruption has been assigned to you, you can then perform the action in the instructions, and then choose to either **Proceed** (allow the deployment to continue) or **Abort** (fail and stop the deployment from continuing):

![](/docs/images/3048086/3277686.png "width=500")

When aborting a deployment, it's a good idea to write a reason into the **Notes** field, so that the rest of the team can see why the deployment was aborted.

## Output variables {#Manualinterventionandapprovals-Outputvariables}

When a manual step is completed, details of the interruption are saved as variables that can be used in other steps including [email](/docs/deploying-applications/email-notifications.md) templates.

*Step Name* below refers to the name given to the manual step, for example *Ensure traders are aware of the deployment*.

| Variable name | Contains | Example value |
| --- | --- | --- |
| `Octopus.Action[Step Name].Output.Manual.Notes` | The contents of the *Notes* field from the interruption form | *Checked with Rick, got the all-clear; Michelle is out at a meeting.* |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.Id` | The user ID of the user who submitted the interruption form | *users-237* |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.Username` | The username of the user who submitted the interruption form | *jjones* |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.DisplayName` | The display name of the user who submitted the interruption form | *Jamie Jones* |
| `Octopus.Action[Step Name].Output.Manual.ResponsibleUser.EmailAddress` | The email address of the user who submitted the interruption form | *jamie.jones@example.com* |

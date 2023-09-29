---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Rollbacks
description: Rolling back to a previous version of code is entirely possible, but there is quite a bit to consider.  This guide will walk you through the patterns and pitfalls for a successful rollback.
navOrder: 10
hideInThisSectionHeader: false
---

Being able to roll back to a known good state of code is often just as important as deploying software.  In our experience, rolling back to a previous release is rarely as simple as "re-deploying the last successful deployment."  This section will walk you through the patterns and pitfalls you'll encounter when configuring a rollback process.

## Built-In Rollback Support

Octopus Deploy supports rollbacks out of the box.  It always keeps the two most successful releases in any given environment, making it easy to roll back to the previous version.  In addition, you can configure [retention policies](/docs/administration/retention-policies) to keep more releases on your target machines.

For example, Imagine you just deployed `1.1.21` to your **QA** servers.  For whatever reason, that version does not work.  You can re-deploy the previous version, `1.1.20`, to **QA** by going to that release and clicking on the **REDEPLOY** button.  That scenario is supported by default; you won't have to configure anything else.

:::div{.hint}
Doing that will re-run the previous deployment process as it existed at release creation.  It will re-extract any packages, re-run all the configuration transforms, re-run any manual intervention steps, etc.  If it took an hour before, it would most likely retake an hour on re-deployment.
:::

## Ideal Rollback Scenarios

It would be impossible to list every scenario in which a rollback will be successful, as each application is different.  That being said, we have found rollbacks are most likely to succeed when one or more of the following is true.

- Styling or markup only changes.
- Code changes with no public interface or contract changes.
- Zero to minimal coupling with other applications.
- Zero to minimal coupled database changes (new index, tweaked view, store procedure performance improvement).
- Number of changes since the last release is low.

Rollbacks are much more complicated (if not impossible) when you have tightly coupled database and code changes, are doing a once-a-quarter release with 100s of changes, or the changes are tightly coupled with other applications.  In those scenarios, we recommend **rolling forward**.

## Designing a Rollback Process

Having the ability to roll back, even if rarely used, is a valuable option.  What you don't want is to make up your rollback process in the middle of an emergency.  If you want to have the ability to roll back, start thinking about what that process should look like now.  Below are some questions to help get you started.

- Who will trigger the rollback?  Will it be automated or manual?
- What platform are you using (Windows, Linux, Azure Web Apps, K8s, etc.)?  Does it support multiple paths or versions?
- When a rollback occurs, do you want to do a complete re-deployment of your application (including variable transforms)?
- If you have manual interventions, should they run?
- If you have database deployments, should they run?
- Are there any other steps that should be skipped?
- Should _any_ specific steps _only_ run during a rollback?

For example, consider a project that has the following steps:

1. Run a runbook to create the database if not exists.
1. Deploy the database changes.
1. Deploy a service.
1. Deploy a website.
1. Pause deployment for manual verification of application.
1. Notify stakeholders of deployment.

Re-running that deployment process as-is for a rollback could lead to data loss (depending on the database deployment tool).  That same process during a rollback might be:

1. ~~Run a runbook to create the database if not exists.~~
1. ~~Deploy the database changes.~~
1. Deploy a service.
1. Deploy a website.
1. Pause deployment for manual verification of application.
1. Notify stakeholders of deployment.

### Calculating Deployment Mode

When a release is deployed to an environment, there are three possible "Deployment Mode" scenarios.

- **Deploy**: The first time the release is deployed to the environment.  For example, `2021.2.1` is deployed.
- **Rollback**: The previous version is re-deployed to the environment.  For example, `2021.2.1` is rolled back to `2021.1.10`.
- **Redeployment**: The same release is re-deployed to the environment.  For example, `2021.2.1` is re-deployed the same environment because a new webserver was added.

Calculating deployment mode is done by comparing the system variable `Octopus.Release.CurrentForEnvironment.Number` with the system variable `Octopus.Release.Number`.

- When `Octopus.Release.CurrentForEnvironment.Number` is less than `Octopus.Release.Number` then the deployment mode is **Deploy**.
- When `Octopus.Release.CurrentForEnvironment.Number` is greater than `Octopus.Release.Number` then the deployment mode is **Rollback**.
- When `Octopus.Release.CurrentForEnvironment.Number` is equal to `Octopus.Release.Number` then the deployment mode is **Redeployment**.

We have created the step template [Calculate Deployment Mode](https://library.octopus.com/step-templates/d166457a-1421-4731-b143-dd6766fb95d5/actiontemplate-calculate-deployment-mode) to do that for you.

### Enabling and Disabling Steps based on Deployment Mode

Once you know the deployment mode, you can enable or disable steps using [output variables](/docs/projects/variables/output-variables) and [variable run conditions](/docs/projects/steps/conditions/#variable-expressions).  You can have steps run only on **Rollback**, only on **Deploy**, only on **Deploy** or **Redeployment**, or any other combination.  

The step template [Calculate Deployment Mode](https://library.octopus.com/step-templates/d166457a-1421-4731-b143-dd6766fb95d5/actiontemplate-calculate-deployment-mode) includes a number of [output variables](/docs/projects/variables/output-variables).

 - **DeploymentMode**: Will be `Deploy`, `Rollback`, or `Redeploy`.
 - **Trigger**: This indicates if the deployment was caused by a deployment target trigger or a scheduled trigger.  It will be `True` or `False`.
 - **VersionChange**: Will be `Identical`, `Major`, `Minor`, `Build`, or `Revision`.

It also includes a number of output variables to use in variable run conditions.

- **RunOnDeploy**: Only run the step when the DeploymentMode is **Deploy**.
- **RunOnRollback**: Only run the step when the DeploymentMode is **Rollback**.
- **RunOnRedeploy**: Only run the step when the DeploymentMode is **Redeploy**.
- **RunOnDeployOrRollback**: Only run the step when the DeploymentMode is **Deploy** or **Rollback**.
- **RunOnDeployOrRedeploy**: Only run the step when the DeploymentMode is **Deploy** or ** Re-deploy**.
- **RunOnRedeployOrRollback**: Only run the step when the DeploymentMode is **Redeploy** or **Rollback**.
- **RunOnMajorVersionChange**: Only run the step when the VersionChange is **Major**.
- **RunOnMinorVersionChange**: Only run the step when the VersionChange is **Minor**.
- **RunOnMajorOrMinorVersionChange**: Only run the step when the VersionChange is **Major** or **Minor**.
- **RunOnBuildVersionChange**: Only run the step when the VersionChange is **Build**.
- **RunOnRevisionVersionChange**: Only run the step when the VersionChange is **Revision**.

The usage will be:

```
#{Octopus.Action[Calculate Deployment Mode].Output.RunOnRollback}
```

## Automatic Trigger of Rollbacks

Using the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/deploy-release), or [one of our step templates](https://library.octopus.com/step-templates/0dac2fe6-91d5-4c05-bdfb-1b97adf1e12e/actiontemplate-deploy-child-octopus-deploy-project) it is possible to automatically trigger a rollback process.  

While it is possible to automatically trigger a rollback, this is not something we recommend unless you have a robust testing suite and you've tested your rollback process multiple times.  We recommend first manually triggering the rollback.  Once you are confident in your rollback process, look into updating your process to be automatically triggered.

## Rollback Considerations

Once a rollback process is in place, you'll need to decide when to use it.  Specifically, when an issue occurs, you must decide to roll forward or rollback.  When making that decision, here are a few questions to ask.

- Carefully reviewing the changelog, and answering "if this were reverted, what would happen?"
- Were there any database schema changes?
- Are there any external components/applications depending on this deployment?  
- How long have the changes "been live" for users to use?  Will they notice if a rollback were to occur?

### Large Changeset

Rolling back a large changeset is much, much harder than rolling back a small changeset.  When you roll back, you cannot pick a specific change in a specific application's binaries to roll back.  Everything goes, or none of it goes.  If you have made dozens and dozens of changes, attempting to untangle the web of what to roll back could take just as long as rolling forward.

If it has been a month or more since the last release to **Production**, we recommend **rolling forward**.  If it has been a few hours since the last release, for example, deploying to a **Test** or **QA** environment, then a **rollback** is suitable.

### Database Rollbacks

Rolling back code is much easier than rolling back a database **without data loss**.  It becomes nearly impossible to roll back a database schema change once users start manipulating data.  

Consider the scenario in which a new table is added during a deployment.  If you decide to roll back your application, you have two choices.

1. Delete the table (either via script or database restore).
2. Leave the table as-is.

The previous version of the code _should_ run fine if the table is left as-is.  After all, the previous code version wasn't aware of that table and won't reference it or insert data directly.  However, there is no way to know for sure the code will work if the database changes weren't tested with the previous version of the code.  A stored procedure, view, or function could now expect data in that new table.

Restoring a backup will also result in data loss; any data changed by users since that backup will be lost.  Restoring a database backup should be for disaster recovery or an emergency rollback. 

In the event you have a schema change in your database, we recommend **rolling forward**. 

### Dependent Applications

In a perfect world, every service and project would be loosely coupled.  While great in theory, the real world is often messy, and coupling exists.  Services and their clients have an implied or explicit data contract and can be tightly coupled together.  If either the service or the client violates that contract, a failure will occur.

Imagine the scenario where a credit card service introduces a new endpoint in version `3.1.0`.  Your application makes a change to leverage that new endpoint.  If version `3.1.0` of the credit card service was rolled out along with your application and then rolled back to `3.0.0` a few days later, that endpoint would no longer exist.  Any functionality your application depends on from that service would start failing.   

In the event you make a contract change, we recommend **rolling forward** unless all the dependent applications can be rolled back as well or have fault tolerance built-in to handle missing endpoints or unexpected results.

### Time since deployment

A timer starts once a release is deployed.  Once that timer reaches zero, the ability to roll back successfully becomes impossible with minimal user impact.  The timer duration depends on the number of users and the day-to-day importance of the application.  An application used by a dozen people once a day can be rolled back days or even a week after the last deployment.  Meanwhile, an internal application used by everyone in the company for three hours a day might have a few business hours before a rollback becomes impossible.

That is due to user perception.  If a release with a new feature and several bug fixes is deployed, users _will_ notice when a rollback occurs.  Either they will see the feature disappears, or a bug they thought was fixed happens again.  

Generally, unless a showstopping bug is found, limit rollbacks to outage windows.  Once the userbase starts using the new release, we recommend **rolling forward**.  

## Staging Your Deployments

In our experience, deployments (and rollbacks) have the highest chance of success when deployed to the target environment in a "staging" area on your production servers.  The deployment is then verified, and assuming verification passes, the "staging" area becomes live.  If there is a problem, the deployment is aborted, and all the preexisting configuration remains untouched.

That is the core concept around deployment patterns:

- [Blue/Green Deployments](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Red/Black Deployments](https://octopus.com/blog/blue-green-red-black)
- [Canary Deployments](https://martinfowler.com/bliki/CanaryRelease.html)

In addition, a lot of popular tools have similar concepts and provide the necessary tools.  Some examples include:

- [Azure Web App "Staging" slots](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)
- [Kubernetes Blue/Green Deployments](https://octopus.com/blog/deconstructing-blue-green-deployments)
- [Canary Deployments on AWS Lambda Functions](https://aws.amazon.com/blogs/compute/implementing-canary-deployments-of-aws-lambda-functions-with-alias-traffic-shifting/)
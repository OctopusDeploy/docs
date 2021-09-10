---
title: Rollbacks
description: Rolling back to a previous version of code is entirely possible, but there is quite a bit to consider.  This guide will walk you through the patterns and pitfalls for a successful rollback.
position: 10
hideInThisSectionHeader: true
---

Being able to rollback to a known good state of code is often just as important as deploying software.  In our experience, rolling back to a previous release is rarely as simple as "redeploying the last successful deployment."  This guide will walk you through the patterns and pitfalls you'll encounter when configuring a rollback process.

## Zero Configuration Rollbacks

Octopus Deploy supports zero configuration rollbacks out of the box.  Octopus always keeps the two most recent successful releases in any given environment with the goal of being able to rollback quickly.

Imagine you just deployed `1.1.21` to your **QA** servers.  For whatever reason, that version does not work.  You can redeploy the previous version, `1.1.20` to **QA** by going to that release and clicking on the **REDEPLOY** button.  You won't have to configure or change anything in Octopus Deploy.  However, it will re-extract any packages, re-run all the configuration transforms, re-run any manual intervention steps, etc.  You are re-running that deployment, if it took an hour before, it will most likely take an hour again.    

## Rollback Scenarios

It would be impossible for us to list every scenario in which a rollback will be successful, as each application is different.  However, we have found rollbacks are most likely to succeed when one or more of the following is true.

- Styling or markup only changes.
- Code changes with no public interface or contract changes.
- Zero to minimial coupling with other applications.
- Zero to minimial coupled database changes (new index, tweaked view, store procedure performance improvement).
- Number of changes is kept low between releases.

Rollbacks are much harder (if not impossible) when you have tightly coupled database and code changes, are doing a once a quarter release with 100s of changes, or the changes are tightly coupled with other applications.  

### Database Rollbacks

In general, rolling back code is easy, while rolling back a database **without data loss** is extremely difficult.  It becomes nearly impossible when users start using your application.  Consider the scenario in which a new table is added during a deployment.  If you decide to rollback your application you are left with two choices.

1. Delete the table (either via script or database restore).
2. Leave the table as-is.

The previous version of the code _should_ run fine if the table is left as-is.  After all, the previous version of the code wasn't aware of that table, and won't try to reference it or insert data directly.  However, what about any stored procedures or views that were changed to include columns from that new table?  Will they return the same results if that table is empty?

### Dependent Applications

One of the primary goals of Service Oriented Architecture (SOA) and it's cousin Microservices is to loose coupling.  Changes in one service shouldn't affect any dependent applications.  While great in theory, the real-world is often messy, and coupling exists.  Imagine the scenario where a credit card service introduces a new endpoint your application depends on.  If the latest version of the credit card service was rolled out, then rolled back after a few days, then that endpoint will no longer exist.  Any functionality your application depends on from that service would start failing.

## Designing a Rollback Process

Our default recommendation is to rollforward rather than rollback.  In our experience, it causes much less user disruption, has fewer gotchas, and (generally) has a much higher chance of success.

However, there are certain scenarios where a rollback is the best solution.  Having the ability to rollback, even if rarely used, is a useful option.  What you don't want is to make up your rollback process in the middle of an emergency.  If you want to have the ability to rollback, start thinking about what that process should look like now.  Below are some questions to help get you started.

- Who will trigger the rollback?  Will it be automated or manual?
- What platform are you using (Windows, Linux, Azure Web Apps, K8s, etc.)?  Does it support multiple paths or versions?
- When a rollback occurs, do you want to do a full redeployment of your application (including variable transforms)?
- If you have manual interventions, should they run?
- If you have database deployments, should they be skipped?
- Are there any other steps that should be skipped?
- Should certain steps _only_ run during a rollback?

For example, consider a project that has the following steps:

1. Run a runbook to create the database if not exists.
1. Deploy the database changes.
1. Deploy a windows service.
1. Deploy an IIS website.
1. Pause deployment for manual verification of application.
1. Notify stakeholders of deployment.

Re-running that deployment process as-is for a rollback could lead to data loss (depending on the database deployment tool).  In addition, the deploy a windows service and deploy an IIS website will extract the package into a newly created folder, run any predeploy/deploy/postdeploy scripts, and perform configuration transforms.  

Depending on your application, all of that is perfectly okay.  In talking with some of our customers, extracting packages, running scripts and performing configuration transforms is sub-optimal.  What they'd prefer is the ability to point to the folder created during the first deployment.  _How_ that is accomplished is dependent upon the underlying application framework and host operating system.  Please see the guides in this section for further details on how to accomplish that.

### Skip If Already Installed

Adding the variable `Octopus.Action.Package.SkipIfAlreadyInstalled` with a value of `True` will short-circuit the package installation process for steps run on Windows or Linux targets.  When present, Calamari will check the `DeploymentJournal.xml` file for the package.  If that package is found in the deployment journal it will set the output variable `Octopus.Action[STEP NAME].Output.Package.InstallationDirectoryPath` to the previously installed location and exit the step.

### Previous Deployments System Variables

Octopus provides a number of system variables containing information about the previous deployment, and the current release number in the environment.  

- `Octopus.Deployment.PreviousSucessful.Id`: The ID (`deployments-122`) of the previous **successful** deployment of this project in the target environment.
- `Octopus.Release.Previous.Id`: The ID (`releases-122`) of the last release of the project.
- `Octopus.Release.Previous.Number`: The number (`1.2.2`) of the last release of the project.
- `Octopus.Release.PreviousForEnvironment.Id`: The ID (`releases-122`) of the last release deployed to the current environment.
- `Octopus.Release.PreviousForEnvironment.Number`: The number (`1.2.2`) of the last release deployed to the current environment.
- `Octopus.Release.CurrentForEnvironment.Id`: The ID (`releases-122`) of the last **successful** release deployed to the current environment.
- `Octopus.Release.CurrentForEnvironment.Number`: The ID (`releases-122`) of the last **successful** release deployed to the current environment.
- `Octopus.Tentacle.PreviousInstallation.CustomInstallationDirectory`: The directory (`C:\InetPub\WWWRoot\OctoFx`) into which the previous version of the package was deployed.
- `Octopus.Tentacle.PreviousInstallation.OriginalInstalledPath`: The directory (`C:\Octopus\Tentacle\Apps\Production\OctoFx\1.2.2`) into which the previous version of the package was extracted.
- `Octopus.Tentacle.PreviousInstallation.PackageFilePath`: The path to the package file previously deployed (`C:\Octopus\Tentacle\Packages\OctoFx.1.2.2.nupkg`).
- `Octopus.Tentacle.PreviousInstallation.PackageVersion`: The previous version (`1.2.3`) of the package that was deployed to the Tentacle.

### Staging Your Deployments

In our experience, deployments have the highest chance of success (and rollbacks), when they are deployed to the target environment in a "staging" area.  The deployment is then verified, and assuming everything checks out the "staging" area becomes live.  If there is a problem, the deployment is aborted and all the pre-exiting configuration remains untouched.

That is the core concept around deployment patterns:

- [Blue/Green Deployments](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Red/Black Deployments](https://octopus.com/blog/blue-green-red-black)
- [Canary Deployments](https://martinfowler.com/bliki/CanaryRelease.html)

In addition, a lot of popular tools have similar concepts and provide the necessary tools

- [Azure Web App "Staging" slots](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)
- [Kubernetes Blue/Green Deployments](https://octopus.com/blog/deconstructing-blue-green-deployments)
- [Canary Deployments on AWS Lambda Functions](https://aws.amazon.com/blogs/compute/implementing-canary-deployments-of-aws-lambda-functions-with-alias-traffic-shifting/)

## Deciding to rollback

Deciding to rollback can be a complex decision.  During a deployment we typically see a user pass through multiple "go/no-go" decision gates.

- Approval or decision to start the deployment.
- After database changes.
- After backend changes.
- After front-end changes.
- After the deployment is complete.

We've typically seen anyone on a frequent deployment schedule generally deploy a subset of components rather than the entire application.  Rolling back changes involves rolling back that same subset.  

Before making the decision to rollback we asking yourself the following:

- Carefully reviewing the changelog, and answering "if this were reverted what would happen?"
- Would it be easier to rollforward to make this fix rather than rollback?
- Are there any external components/applications depending on this deployment?  
- How long have the changes "been live" for users to use?  Will they notice if a rollback were occur?

Keep in mind, when you rollback a component or an entire application you cannot cherry pick which change to rollback.  Everything goes, or none of it goes.

### Automatic Trigger of Rollbacks

Using the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/deploy-release.md), or the [one of our step templates](https://library.octopus.com/step-templates/0dac2fe6-91d5-4c05-bdfb-1b97adf1e12e/actiontemplate-deploy-child-octopus-deploy-project) it is possible to automatically trigger a rollback process.  While this is possible, this is not something we recommend unless you have a robust testing suite to avoid any "false positives" that would cause a rollback to be triggered.  Starting out, we recommend manually triggering the rollback.  Once you are confident in your rollback process then look into updating your process to be automatically triggered.
---
title: Rollbacks
description: Rolling back to a previous version of code is entirely possible, but there is quite a bit to consider.  This guide will walk you through the patterns and pitfalls for a successful rollback.
position: 10
hideInThisSectionHeader: true
---

Being able to roll back to a known good state of code is often just as important as deploying software.  In our experience, rolling back to a previous release is rarely as simple as "redeploying the last successful deployment."  This section will walk you through the patterns and pitfalls you'll encounter when configuring a rollback process.

## Zero Configuration Rollbacks

Octopus Deploy supports rollbacks out of the box.  It always keeps the two most recent successful releases in any given environment, so you can quickly roll back to the previous version.  In addition, you can configure [retention policies](/docs/administration/retention-policies/index.md) to keep more releases on your target machines.

Imagine you just deployed `1.1.21` to your **QA** servers.  For whatever reason, that version does not work.  You can redeploy the previous version, `1.1.20`, to **QA** by going to that release and clicking on the **REDEPLOY** button.  You won't have to configure or change anything in Octopus Deploy.  

It is worth pointing out that doing that will re-run the previous deployment process as it existed at release creation.  That means it will re-extract any packages, re-run all the configuration transforms, re-run any manual intervention steps, etc.  If it took an hour before, it would most likely retake an hour.

## Rollback Scenarios

It would be impossible to list every scenario in which a rollback will be successful, as each application is different.  However, we have found rollbacks are most likely to succeed when one or more of the following is true.

- Styling or markup only changes.
- Code changes with no public interface or contract changes.
- Zero to minimal coupling with other applications.
- Zero to minimal coupled database changes (new index, tweaked view, store procedure performance improvement).
- Number of changes is kept low between releases.

Rollbacks are much more complicated (if not impossible) when you have tightly coupled database and code changes, are doing a once-a-quarter release with 100s of changes, or the changes are tightly coupled with other applications.  

### Database Rollbacks

In general, rolling back code is much easier than rolling back a database **without data loss**.  It becomes nearly impossible to roll back when users start using your application after database changes are made.  Consider the scenario in which a new table is added during a deployment.  If you decide to roll back your application, you have two choices.

1. Delete the table (either via script or database restore).
2. Leave the table as-is.

The previous version of the code _should_ run fine if the table is left as-is.  After all, the previous version of the code wasn't aware of that table and won't reference it or insert data directly.  However, if the database changes weren't explictily tested with the previous version of the code there is no way to know for sure.  What about any stored procedures or views that were changed to include columns from that new table?  Will they return the same results if that table is empty?

Restoring a backup will also result in data loss, as any data changed by users since that backup will be lost.  Restoring a database backup should be for disaster recovery or a emergency rollback. 

In the event you have a schema change in your database, we recommend rolling forward. 

### Dependent Applications

One of the goals of Service Oriented Architecture (SOA) and its cousin Microservices is loose coupling.  Changes in one service shouldn't affect any dependent applications.  While great in theory, the real world is often messy, and coupling exists.  Services and their clients have an implied or explicit data contract, and can be tightly coupled together.  If either the service or the client violates that contract, a failure will occur.

Imagine the scenario where a credit card service introduces a new endpoint in version `3.1.0`.  Your application makes a change to leverage that new endpoint.  If version `3.1.0` of the credit card service was rolled out along with your application, and then a few days later rolled back to `3.0.0` that endpoint will no longer exist.  Any functionality your application depends on from that service would start failing.   

In the event you make a contract change, we recommend rolling forward unless all the dependent applications can be rolled back as well, or have fault tolerance built-in to handle missing endpoints or unexpected results.

## Designing a Rollback Process

Our default recommendation is to roll forward rather than roll back.  In our experience, it causes much less user disruption, has fewer gotchas, and (generally) has a much higher chance of success.

While rolling forward is preferred, there are specific scenarios where a rollback is the best solution.  Having the ability to roll back, even if rarely used, is a valuable option.  What you don't want is to make up your rollback process in the middle of an emergency.  If you want to have the ability to roll back, start thinking about what that process should look like now.  Below are some questions to help get you started.

- Who will trigger the rollback?  Will it be automated or manual?
- What platform are you using (Windows, Linux, Azure Web Apps, K8s, etc.)?  Does it support multiple paths or versions?
- When a rollback occurs, do you want to do a complete redeployment of your application (including variable transforms)?
- If you have manual interventions, should they run?
- If you have database deployments, should they be skipped?
- Are there any other steps that should be skipped?
- Should specific steps _only_ run during a rollback?

For example, consider a project that has the following steps:

1. Run a runbook to create the database if not exists.
1. Deploy the database changes.
1. Deploy a service.
1. Deploy a website.
1. Pause deployment for manual verification of application.
1. Notify stakeholders of deployment.

Re-running that deployment process as-is for a rollback could lead to data loss (depending on the database deployment tool).  In addition, re-deploying a service and a website will extract the package into a newly created folder, run any pre-deploy/deploy/post-deploy scripts, and perform configuration transforms.  

Depending on your application, that all might be perfectly okay.  Or it might be sub-optimal as it could take quite a bit of time to re-extract packages, run scripts, and finish all configuration transforms.  Being able to point a website or a service at a previous folder might be preferred.  _How_ that is accomplished is dependent upon the underlying application framework and host operating system.  Please see the guides in this section for further details on how to accomplish that.

Octopus provides tools and information to make it easier to tweak your rollback process to match your requirements.

### Skip If Already Installed

Adding the variable `Octopus.Action.Package.SkipIfAlreadyInstalled` with a value of `True` will short-circuit the package installation process for steps run on Windows or Linux targets.  When present, Calamari will check the `DeploymentJournal.xml` file for the package.  If that package is found in the deployment journal, it will set the output variable `Octopus.Action[STEP NAME].Output.Package.InstallationDirectoryPath` to the previously installed location and exit the step.

### Previous Deployments System Variables

Octopus provides several system variables containing information about the previous deployment and the current release number in the environment.  

- `Octopus.Deployment.PreviousSucessful.Id`: The ID (`deployments-122`) of this project's previous **successful** deployment in the target environment.
- `Octopus.Release.Previous.Id`: The ID (`releases-122`) of the project's last release.
- `Octopus.Release.Previous.Number`: The number (`1.2.2`) of the project's last release.
- `Octopus.Release.PreviousForEnvironment.Id`: The ID (`releases-122`) of the last release deployed to the current environment.
- `Octopus.Release.PreviousForEnvironment.Number`: The number (`1.2.2`) of the last release deployed to the current environment.
- `Octopus.Release.CurrentForEnvironment.Id`: The ID (`releases-122`) of the last **successful** release deployed to the current environment.
- `Octopus.Release.CurrentForEnvironment.Number`: The ID (`releases-122`) of the last **successful** release deployed to the current environment.
- `Octopus.Tentacle.PreviousInstallation.CustomInstallationDirectory`: The directory (`C:\InetPub\WWWRoot\OctoFx`) into which the previous version of the package was deployed.
- `Octopus.Tentacle.PreviousInstallation.OriginalInstalledPath`: The directory (`C:\Octopus\Tentacle\Apps\Production\OctoFx\1.2.2`) into which the previous version of the package was extracted.
- `Octopus.Tentacle.PreviousInstallation.PackageFilePath`: The path to the package file previously deployed (`C:\Octopus\Tentacle\Packages\OctoFx.1.2.2.nupkg`).
- `Octopus.Tentacle.PreviousInstallation.PackageVersion`: The previous version (`1.2.3`) of the package that was deployed to the Tentacle.

## Staging Your Deployments

In our experience, deployments (and rollbacks) have the highest chance of success when deployed to the target environment in a "staging" area on your production servers.  The deployment is then verified, and assuming verification passes, the "staging" area becomes live.  If there is a problem, the deployment is aborted, and all the pre-exiting configuration remains untouched.

That is the core concept around deployment patterns:

- [Blue/Green Deployments](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Red/Black Deployments](https://octopus.com/blog/blue-green-red-black)
- [Canary Deployments](https://martinfowler.com/bliki/CanaryRelease.html)

In addition, a lot of popular tools have similar concepts and provide the necessary tools.

- [Azure Web App "Staging" slots](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)
- [Kubernetes Blue/Green Deployments](https://octopus.com/blog/deconstructing-blue-green-deployments)
- [Canary Deployments on AWS Lambda Functions](https://aws.amazon.com/blogs/compute/implementing-canary-deployments-of-aws-lambda-functions-with-alias-traffic-shifting/)

## Deciding to rollback

Deciding to roll back can be a complex decision when you are not staging your deployments.  We typically see a user pass through multiple "go/no-go" decision gates during a deployment.  Any one of those decision gates could trigger a rollback.

- Approval or decision to start the deployment.
- After database changes.
- After backend changes.
- After front-end changes.
- After the deployment is complete.

When making the decision to rollback, we recommend going through these questionss first:

- What has been deployed, and what still needs to be deployed.
- Carefully reviewing the changelog, and answering "if this were reverted, what would happen?"
- Would it be easier to roll forward to make this fix rather than rollback?
- Are there any external components/applications depending on this deployment?  
- How long have the changes "been live" for users to use?  Will they notice if a rollback were to occur?

Keep in mind, when you roll back, you cannot pick a specific change in a specific application's binaries to roll back.  Everything goes, or none of it goes.  If you have made dozens and dozens of changes, attempting to untangle the web of what to rollback could take just as long as rolling forward.

### Automatic Trigger of Rollbacks

Using the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/deploy-release.md), or the [one of our step templates](https://library.octopus.com/step-templates/0dac2fe6-91d5-4c05-bdfb-1b97adf1e12e/actiontemplate-deploy-child-octopus-deploy-project) it is possible to automatically trigger a rollback process.  

While it is possible to automatically trigger a rollback, this is not something we recommend unless you have a robust testing suite and you've tested your rollback process multiple times.  We recommend first manually triggering the rollback.  Once you are confident in your rollback process, look into updating your process to be automatically triggered.
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
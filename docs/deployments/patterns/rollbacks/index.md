---
title: Rollbacks
description: Rolling back to a previous version of code is entirely possible, but there is quite a bit to consider.  This guide will walk you through the patterns and pitfalls for a successful rollback.
position: 10
hideInThisSectionHeader: true
---

In our experience, rolling back to a previous release is rarely as simple as "redeploying the last successful deployment."  This guide will walk you through the patterns and pitfalls you'll encounter when configuring a rollback process.

## Zero Configuration Rollbacks

Octopus Deploy supports zero configuration rollbacks.  Imagine you just deployed `1.1.21` to your **QA** servers.  For whatever reason, that version does not work.  You can redeploy the previous version, `1.1.20` to **QA** by going to that release and clicking on the **REDEPLOY** button.  You won't have to configure or change anything in Octopus Deploy.  However, it will re-extract any packages, re-run all the configuration transforms, re-run any manual intervention steps, etc.  You are re-running that deployment, if it took an hour before, it will most likely take an hour again.    

## Rollback Scenarios

It would be impossible for us to list every scenario in which a rollback will be successful, each application and company is different.  However, we have found rollbacks are most likely to succeed when one or more of the following is true.

- Styling or markup only changes.
- Code changes with no public interface or contract changes.
- Zero to minimial coupling with other applications.
- Zero to minimial coupled database changes (new index, tweaked view, store procedure performance improvement).
- Number of changes is kept low between releases.

Rollbacks are much harder (if not impossible) when you have tightly coupled database and code changes, are doing a once a quarter release with 100s of changes, or you are deploying an update to a REST API with a new endpoint that dozens of applications are expecting to be there.  

Before making the decision to rollback we recommend carefully reviewing the changelog and asking "if this were reverted what would happen?  Who would be affected?  Are there any external components/applications depending on this change?"  Keep in mind, when you rollback an application you cannot cherry pick which change to rollback.  Everything goes, or none of it goes.



- Intro
    - Why rollback code
    - When not to rollback your code
- Code only rollbacks
    - Previous known state
        - More than just re-run last deployment
    - Scenarios
        - UI changes
        - Service changes with no contract changes
    - Each scenario and use case is different
        - Be aware of coupled changes
    - Carefully review change logs to determine what to rollback
    - Checklist of can rollback?
- Staging changes has highest chance of success
    - Can test prior to "go live"
    - Leverage load balancer / reverse proxy after testing is complete
    - Very similar to blue/green or canary deployments
- Decoupling database changes
    - Restoring a database backup is a last resort
    - Dropping tables or columns will result in lost data
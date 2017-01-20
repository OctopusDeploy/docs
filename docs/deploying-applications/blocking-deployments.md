---
title: Blocking Deployments
position: 29
---


Sometimes you may want to block your Project from deploying a specific Release. Perhaps you just want to temporarily block the Release, or you need to fix some variables before proceeding? Perhaps the Release itself is bad, but you don't want to delete the Release for auditing purposes?


On this page:


- Block Deployment
- Resolve and Unblock
- Permissions

## Block Deployment


You are able to block a Release of a Project from being used in any future deployments, no matter which phase the Release is currently on. This can be done from the release page of the project you're wishing to block.


![](/docs/images/3049133/5865856.png)


Select the option to "**Block deployment**."


![](/docs/images/3049133/5865857.png)


Input a reason why you're blocking it, so your team is aware and on the same page, and hit "**Block**."


![](/docs/images/3049133/5865858.png)

## Resolve and Unblock


Once you're happy with the deployment process continuing, go back to the release page of the project, and select "**Resolve and unblock**."


![](/docs/images/3049133/5865859.png)

## Permissions


There are two permissions required for the act of blocking and unblocking your deployments, which you'll have to assign to the user performing the task:

- **DefectReport**: Allows a user to block a release from progressing to the next lifecycle phase
- **DefectResolve**: Allows a user to unblock a release so it can progress to the next phase


:::hint
**What is a Defect?**
When you block a Release from being deployed, we actually use the Octopus API to create a "Defect" for that Release with the reason you provided for blocking future Deployments from using that Release.
:::

:::success
Learn about [managing Roles and Permissions](/docs/home/administration/managing-users-and-teams/user-roles.md).
:::

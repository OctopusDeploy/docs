---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Create and Deploy a Release
description: Step by step guide on how to create and deploy a release in Octopus Deploy
navOrder: 40
hideInThisSection: true
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/syfl59pR4ZU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

A release is a snapshot of the deployment process and the associated assets (packages, scripts, variables) as they existed when the release was created. Our hello world deployment process only has one step that executes the script we entered in the previous section.

When you deploy the release, you execute the deployment process with all the associated details, as they existed when the release was created.

1. Click **CREATE RELEASE**.
1. The release is created and given a version number. There is a space to add release notes—click **SAVE**.
1. To deploy this version of the release, click **DEPLOY TO TEST...**.

The next screen gives you the details of the release you are about to deploy:

![Deploy release screen in the Octopus Web Portal](/docs/getting-started/first-deployment/legacy-guide/images/deploy-release.png "width=500")

4. To deploy the release, click **Deploy**.
5. The next screen displays a task summary. If you click the **TASK LOG**, you'll see the steps Octopus took to execute your hello world script.

Because we didn't define any deployment targets for the **Test** environment, Octopus leased a [dynamic worker](/docs/infrastructure/workers/dynamic-worker-pools/#on-demand) (a machine that executes tasks on behalf of the Octopus Server) that was then used to execute the hello world script.  If you are on a self-hosted instance of Octopus Deploy, you won't see that message.

![The results of the Hello world deployment](/docs/getting-started/first-deployment/legacy-guide/images/deployed-release.png "width=500")

You have finished your first deployment!  But there is still a bit of work to do.  The next step will [define and use variables](/docs/getting-started/first-deployment/define-and-use-variables/) in the deployment process.

**Further Reading**

For further reading on creating releases in Octopus Deploy please see:

- [Releases Documentation](/docs/releases/)
- [Deployment Documentation](/docs/deployments/)
- [Patterns and Practices](/docs/deployments/patterns/)

<span><a class="btn btn-secondary" href="/docs/getting-started/first-deployment/define-the-deployment-process">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/first-deployment/define-and-use-variables">Next</a></span>

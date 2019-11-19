Once you've defined your [deployment process](/docs/deployment-process/index.md) and you're ready to deploy you software, you can deploy a release of your software.

## Releases and Deployments

It is important to understand the difference between releases and deployments.

As you defined your deployment process, you specified the steps that must be taken, the packages and services to deploy, the scripts to run, and the variables to be used that are required to deploy your software.

When you create a release, you are capturing the deployment process and all the associated assets (packages, scripts, variables, etc) as they existed at that time. The release is given a version number, and you can deploy that release as many times as you need to. You can even deploy that specific release as it existed at the time the release was created, even if parts of the deployment process have changed (those changes will be included in future releases).

When you deploy a release, you are executing the deployment process with all the associated details, as they existed when the release was created.

You can deploy a release as many times as you want to.

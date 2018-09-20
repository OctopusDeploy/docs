---
title: Deploying Releases
description: Releases allow you to capture everything required to deploy a project in a repeatable and reliable manner.
position: 50
---

Once you've defined your [deployment process](/docs/deployment-process/index.md) and you're ready to deploy you software, you can deploy a release.

## Releases and Deployments

It is important to understand the difference between **Releases** and **Deployments**.

As you defined your deployment process, you specified the steps that must be taken, the packages and services to deploy, the scripts to run, and the variables to be used that are required to deploy your software.

When you create a **release**, you are capturing the deployment process and all the associated assets (packages, scripts, variables, etc) as they existed at that time. The release is given a version number, and you can deploy that release as many times as you need to. You can even deploy that specific release as it existed at the time the release was create, even if parts of the deployment process have changed (those changes will be included in future releases).

When you **Deploy** a release, you are executing the deployment process and all the associated details, as they existed when the release was created.

You can **Deploy** a **Release** as many times as you want to.

## Creating a Release

1. With you deployment process defined, you can create a release on the Project's Overview page, by clicking **CREATE RELEASE**.
1. Depending on the type of steps you configured in the deployment process, there will be additional options available, for instance, if you're using a step to deploy a package, you  can specify which version of the package to use in the release.
1. Give the release a version number, add any release notes you'd like to include, and click **SAVE**.

You can fully automate your build and deployment pipeline, so that the releases are generally created automatically.  For more information on this topic, see our [API and Integration](/docs/api-and-integration/index.md) documentation.

## Releases

By navigating to the Project's Overview page and selecting **Releases**, you can see all the releases that have been created for the project. If you want to deploy a release or [schedule a deployment](#schedule-a-deployment), click on the release.

## Deploying Releases

If the [Lifecycle](/docs/deployment-process/lifecycles/index.md) associated with the project is configured to deploy automatically to its first environment, the release will start to be deployed as soon as the release is created.

If the release is not deployed automatically, you can click **DEPLOY TO Environment** where *Environment* is the first environment in the project's lifecycle. Alternatively, you can click **Deploy to...** to select a specific environment to deploy to.

### Scheduling a Deployment

1. Select the release you want to schedule for deployment.
1. Click **DEPLOY TO...** or **DEPLOY TO (Environment)**.
1. Expand the **WHEN** section and select **later**.
1. Specify the time and date you would like the deployment to run. Note, deployments can only be scheduled for 30 days in advance.
1. Specify a timeout period. If the deployment does not start within the specified timeout period, the deployment will not run.
1. Click **SAVE**.

Deployments schedule for the future can be viewed under the Project Overview page, the Dashboard, and the **Tasks** section of the web portal.

#### Scheduling Deployments and Octo.exe Command Line

For everyone using the [command line tool Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), you can use the following option:

```powershell
octo deploy-release --deployAt="2014-07-12 17:54:00 +11:00" --project=HelloWorld --releaseNumber=1.0.0 --deployto=Production --server=http://octopus/api --apiKey=ABCDEF123456
```

### Excluding Steps from Releases

1. Select the release you want to deploy.
1. Click **DEPLOY TO...** or **DEPLOY TO (Environment)**.
1. If deploying to a specific environment, select the environment to be deployed to.
1. Expand the **Excluded steps** section and use the checkbox to select steps to excluded from the deployment.

### Modify the Guided Failure Mode

Guide failure mode asks for users to intervene when a deployment encounters an error. Learn more about [Guided Failures](/docs/deployment-process/guided-failures.md).

1. Select the release you want to deploy.
1. Click **DEPLOY TO...** or **DEPLOY TO (Environment)**.
1. If deploying to a specific environment, select the environment to be deployed to.
1. Expand the **Failure mode** section, and select the mode you want to use.
1. Click **SAVE**.

### Variable Snapshot

For each release you create, a snapshot is taken of the project variables. You can review the variables in the **Variable Snapshot** section of the release page by clicking **SHOW SNAPSHOT**. This lets you see the variables as they existed when the release was created.

You can update the variables by clicking **UPDATE VARIABLES**. This can be useful when:

* The release has not been deployed yet, but the variables have changed since the release was created.
* The release needs to be **redeployed** and the variables have changed since the release was created.
* The release failed to deploy due to a problem with the variables and you need to update the variables and redeploy the release.

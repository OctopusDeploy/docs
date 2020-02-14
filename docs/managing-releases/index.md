---
title: Managing Releases
description: Releases allow you to capture everything required to deploy a project in a repeatable and reliable manner.
position: 55
---

!include <releases>

## Creating a Release

1. With your deployment process defined, you can create a release on the Project's Overview page, by clicking **CREATE RELEASE**.

![Create Release](images/create-release.png)

1. Depending on the type of steps you configured in the deployment process, there could be additional options available, for instance, if you're using a step to deploy a package, there will be a package section where you can specify which version of the package to use in the release.
1. Give the release a version number, add any release notes you'd like to include, and click **SAVE**.

You can fully automate your build and deployment pipeline, so that the releases are generally created automatically.  For more information on this topic, see our [API and Integration](/docs/octopus-rest-api/index.md) documentation.

## Releases

By navigating to the Project's Overview page and selecting **Releases**, you can see all the releases that have been created for the project. If you want to deploy a release or [schedule a deployment](#scheduling-a-deployment), click on the release.

## Deploying Releases

After creating the release, if the [Lifecycle](/docs/deployment-process/lifecycles/index.md) associated with the project is configured to deploy automatically to its first environment, the release will start to be deployed as soon as the release is created.

If the release is not deployed automatically, you can click **DEPLOY TO (Environment)** where *(Environment)* is the first environment in the project's lifecycle. Alternatively, you can click **Deploy to...** to select a specific environment to deploy to.

### Scheduling a Deployment

1. Select the release you want to schedule for deployment.
1. Click **DEPLOY TO...** or **DEPLOY TO (Environment)**.
1. If you selected **DEPLOY TO...**, select the environment to be deployed to.
1. Expand the **WHEN** section and select **later**.
1. Specify the time and date you would like the deployment to run. Note, deployments can only be scheduled for 30 days in advance.
1. Specify a timeout period. If the deployment does not start within the specified timeout period, the deployment will not run.
1. Click **SAVE**.

Deployments scheduled for the future can be viewed under the Project Overview page, on the **Dashboard**, and the **Tasks** section of the web portal.

#### Scheduling Deployments with the Octopus CLI

For everyone using the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md), you can use the following option:

```powershell
octo deploy-release --deployAt="2014-07-12 17:54:00 +11:00" --project=HelloWorld --releaseNumber=1.0.0 --deployto=Production --server=http://octopus/api --apiKey=ABCDEF123456
```

### Excluding Steps from Releases

1. Select the release you want to deploy.
1. Click **DEPLOY TO...** or **DEPLOY TO (Environment)**.
1. If you selected **DEPLOY TO...**, select the environment to be deployed to.
1. Expand the **Excluded steps** section and use the checkbox to select steps to excluded from the deployment.
1. Click **SAVE**.

### Modify the Guided Failure Mode

Guide failure mode asks for users to intervene when a deployment encounters an error. Learn more about [Guided Failures](/docs/managing-releases/guided-failures.md).

1. Select the release you want to deploy.
1. Click **DEPLOY TO...** or **DEPLOY TO (Environment)**.
1. If you selected **DEPLOY TO...**, select the environment to be deployed to.
1. Expand the **Failure mode** section, and select the mode you want to use.
1. Click **SAVE**.

### Deploy to a Specific Subset of Deployment Target

You can deploy releases to a specific subset of deployment targets.

1. Select the release you want to deploy.
1. Click **DEPLOY TO (Environment)**.
1. Expand the **Preview and customize** section.
1. Expand the **Deployment Targets** section.
1. Select whether you would like to include or exclude specific deployment targets. The default is to include all applicable deployment targets.
1. Select the deployment targets to include or exclude, and click **DEPLOY**.

### Variable Snapshot

For each release you create, a snapshot is taken of the project variables. You can review the variables in the **Variable Snapshot** section of the release page by clicking **SHOW SNAPSHOT**. This lets you see the variables as they existed when the release was created.

You can update the variables by clicking **UPDATE VARIABLES**. This can be useful when:

* The release has not been deployed yet, but the variables have changed since the release was created.
* The release needs to be **redeployed** and the variables have changed since the release was created.
* The release failed to deploy due to a problem with the variables and you need to update the variables and redeploy the release.

After you've updated the variables, the release will use the updated variables when it is deployed.

---
title: Creating and deploying releases on a version-controlled project
description: What to expect when creating and deploying releases on a version-controlled project using the Configuration as Code feature in Octopus Deploy.
position: 40 
---

There are slight differences when creating and deploying a release with a version-controlled project using the Configuration as Code feature in Octopus Deploy. This page will walk through those differences.

## Creating a Release

When you create a release with a version-controlled Octopus Project, you will have the ability to select the branch and specify a release number and package versions. Like before, a snapshot will be created using the deployment process, variables, and packages.  

### Creating a release via the UI

When you create a release via the UI, you must specify a branch name. Octopus will select the default branch configured in the project settings. When the **SAVE** button is pressed, a snapshot will be created using OCL files from the most recent commit from the specified branch for the Snapshot.  

![creating a release via the Octopus UI](create-release-octopus-ui.png)

### Creating a release from a build server plug-in

We have added two new fields to our standard integrations - TeamCity, Azure DevOps, Jenkins, GitHub Actions, and Bamboo.

* Git Reference - a user-friendly alias for a commit hash (branch).
* Git Commit - the commit SHA-1 hash.

The use of these fields will change depending on your requirements and where the Octopus project code resides. 

If the Project's Deployment Process is in the same repository as the application, then it's most likely that a specific commit is to be used which relates to the build artifacts (see [Build.SourceVersion](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml)). This ensures that deployments will use the correct process and not any potential changes made to the head of the branch by the time the build was finished. The Release Creation Step in this case would include both the GitCommit, specifying the desired commit id, and GitRef for the branch, which provides additional information. 

However, if the Projects Deployment Process is in a different repository as the application, then a specific branch or tag can identify which Deployment Process to use. E.g  Use the master branch, regardless of the application package contents. In this case, the Release Creation Step would not include a GitCommit, and only need to specify the GitRef for the branch. 


:::hint
Octopus and your build server have a different copy of your git repo. Sending in the commit or reference via the plug-in or the CLI is your build server's way of telling Octopus Deploy which copy of your OCL files to use.
:::

### Snapshot

The deployment process stored in OCL files in your git repo will be included in the release snapshot as part of the release creation process.

## Deploying the release

The experience for deploying a release created from a deployment process using OCL files is the same as one created from a deployment process stored in SQL Server. Once that release snapshot is created, the Octopus UI behaves the same.
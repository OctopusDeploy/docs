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

Octopus does not guess or auto-populate the commit or branch when creating a release from a build-server plug-in. Instead, to provide this information, we have added two new fields to our standard integrations - TeamCity, Azure DevOps, Jenkins, GitHub Actions, and Bamboo.

* Git Reference - a user-friendly alias for a commit hash. This is typically a branch name or tag.
* Git Commit - the commit SHA-1 hash.

The use of these fields can change depending on where the version-controlled project's OCL files are stored:

1. If the OCL files are stored in the **same repository** as the application(s) being built, it's likely that a specific commit that relates to any artifacts created as part of the build itself should be used when creating the release. In this scenario, you should provide both the Git Reference and Git Commit hash of the executing build. This ensures that the release will use the correct version of the project, and won't include any potential changes made to the `HEAD` of the branch *before* the build has completed.
2. If the OCL files are stored in a **different repository** than the application(s) being built, a specific branch or tag can identify which version of the project to use when creating the release. In this case, you would provide the Git Reference where the OCL files are stored, and not the Git Commit hash. e.g. Use the `main` branch, regardless of the location of the repository where the application(s) are being built as they are different.

It is highly recommended that you provide the commit and not just the branch in both cases.

:::hint
Octopus and your build server have a different copy of your git repo. Sending in the commit or reference via the plug-in or the CLI is your build server's way of telling Octopus Deploy which copy of your OCL files to use.
:::

### Snapshot

The deployment process stored in OCL files in your git repo will be included in the release snapshot as part of the release creation process.

## Deploying the release

The experience for deploying a release created from a deployment process using OCL files is the same as one created from a deployment process stored in SQL Server. Once that release snapshot is created, the Octopus UI behaves the same.
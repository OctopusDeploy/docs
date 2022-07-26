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

!include <build-server-plugin-version-control-fields>

For more information, see examples of [creating a release from a build server plug-in](/docs/projects/version-control/creating-release-from-a-build-server-plug-in.md).

### Snapshot

The deployment process stored in OCL files in your git repo will be included in the release snapshot as part of the release creation process.

## Deploying the release

The experience for deploying a release created from a deployment process using OCL files is the same as one created from a deployment process stored in SQL Server. Once that release snapshot is created, the Octopus UI behaves the same.
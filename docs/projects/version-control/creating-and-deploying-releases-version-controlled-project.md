---
title: Creating and deploying releases on a version controlled project
description: What to expect when creating and deploying releases on a version controlled project using the Configuration as Code feature in Octopus Deploy.
position: 30 
---

There are some small differences when creating a deploying a release with a version controlled project using the Configuration as Code feature in Octopus Deploy.  This page will walk through those differences.

## Creating a Release

When you create a release with a version controlled project you will have the ability to select the branch along with specifying a release number and package versions.  Just like before a snapshot of the deployment process, variables, and packages will be created.  

### Creating a release via the UI

When you create a release via the UI, Octopus will use OCL files from the most recent commit from the specified branch for the snapshot.  
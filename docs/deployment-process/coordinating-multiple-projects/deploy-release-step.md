---
title: Deploy Release Step 
description: The Deploy Release Step allows you to trigger the deployment of a Release of a Project from another Project 
position: 1
version: 4.3
---

The _Deploy Release_ step allows you to trigger the deployment of a release of a project from another project.  This is useful when you are [coordinating multiple Projects](index.md).

When you add a _Deploy Release_ step to your deployment process, you are then able to select the project which will be deployed.

You can add many _Deploy Release_ steps to your process, if you wish to deploy releases of many projects.

When creating a release of a project containing _Deploy Release_ steps you are able to select the release version of each project, similar to the way versions of packages are selected.  

### Lifecycles

The Lifecycles of project's being deployed by a _Deploy Release_ step must be compatible with the coordinating project.

For example, if you have two projects, `Project A` and `Project B` which are referenced by _Deploy Release_ steps in another project `Project Alphabet`. When deploying `Project Alphabet` to the `Test` environment, the release versions chosen for `Project A` and `Project B` must be eligible to be deployed to the `Test` environment according to the lifecycles of those projects. 
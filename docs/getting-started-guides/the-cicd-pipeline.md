---
title: The CI/CD pipeline
description: Understand a typical CI/CD pipeline.
position: 20
---

CI/CD refers to continuous integration and continuous deployment. A typical CI/CD pipeline involves a continuous integration server (or build server) and a continuous deployment server.

The continuous integration server compiles your code into an artifact and runs tests against that build of the artifact. 

The continuous deployment server takes the compiled artifact from a successful build and deploys the artifact through the deployment pipeline which might consist of the following environments, **Dev**, **Test**, and **Production**.

## A typical CI/CD pipeline

A typical CI/CD pipeline with Octopus Deploy looks like this:

1. A developer commits code changes to version control.
1. The continuous integration server detects a change and performs the continuous integration build, which includes resolving dependencies, running unit tests, packaging the software and making it available in a package repository.
1. Octopus Deploy detects a new artifact in the package repository and executes the deployment process to create a release that is deployed to the **Dev** environment.
1. When a team member (perhaps a tester) wants to see what is in a particular release, they use Octopus to manually deploy a release to the **Test** environment.
1. When the team is satisfied with the quality of the release and they are ready for it to go to production, they use Octopus to promote the release from the **Test** environment to the **Production** environment.

Next, learn how to [setup up Octopus Deploy](/docs/getting-started-guides/setup-octopus-deploy.md) or you can return to the [getting started guides](/docs/getting-started-guides/index.md).


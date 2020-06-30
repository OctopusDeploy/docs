---
title: The CI/CD pipeline
description: Understand a typical CI/CD pipeline.
position: 5
---

CI/CD refers to continuous integration and continuous deployment. A typical CI/CD pipeline involves a continuous integration server (or build server) and a continuous deployment server.

The continuous integration server compiles your code into an artifact and runs tests against the build. 

The continuous deployment server takes the compiled artifact from a successful build and deploys the artifact through the deployment pipeline which might consist of the following environments, **Dev**, **Test**, and **Production**.

## A typical CI/CD pipeline

A typical CI/CD pipeline with Octopus Deploy looks like this:

1. A developer commits code changes to version control.
1. The continuous integration server detects a change and performs the continuous integration build, which includes resolving dependencies, running unit tests, packaging the software and making it available in a package repository.
1. Octopus Deploy detects a new artifact in the package repository and deploys the changes to the **Dev** environment.
1. When a member of your team (perhaps a tester) wants to see what's in a particular release, they can use Octopus to manually deploy a release to the **Test** environment.
1. When the team is satisfied with the quality of the release and they are ready for it to go to production, they use Octopus to promote the release from the **Test** environment to the **Production** environment.

Next, learn how to [setup up Octopus Deploy](/docs/quickstart/setup-octopus-deploy.md)


---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Build server integration
description: Integrate your continuous integration or build server with Octopus Deploy.
navOrder: 20
hideInThisSection: true
---

CI/CD refers to continuous integration and continuous deployment. A typical CI/CD pipeline involves a continuous integration server (or build server) and a continuous deployment server, such as Octopus. 

The continuous integration/build server compiles your code into one or more artifacts and runs tests against them.  

The continuous deployment server takes the compiled artifacts from a successful build and deploys them through the deployment pipeline which might consist of the following environments, **Dev**, **Test**, and **Production**.

## A typical CI/CD pipeline {#typical-cicd-pipeline}

A typical CI/CD pipeline with Octopus Deploy looks like this:

1. A developer commits code changes to version control.
1. The build server detects a change and performs the continuous integration build, which includes resolving dependencies, running unit tests, packaging the software and making it available in a [package repository](/docs/packaging-applications/package-repositories).
1. Octopus Deploy is notified of a new artifact in the package repository and executes the deployment process to create a release that is deployed to the **Dev** environment.
1. When a team member (perhaps a tester) wants to see what is in a particular release, they use Octopus to manually deploy a release to the **Test** environment.
1. When the team is satisfied with the quality of the release and they are ready for it to go to production, they use Octopus to promote the release from the **Test** environment to the **Production** environment.

:::div{.hint}
To learn more on how to package your software using your CI server of choice and deploy software to your specific deployment targets, please see our [End-to-End CI/CD pipeline tutorial](https://octopus.com/docs/guides).
:::

## Octopus build server integrations {#build-server-integrations}

The following tools are available to integrate your continuous integration/build server with Octopus Deploy:

 - [AppVeyor](/docs/packaging-applications/build-servers/appveyor)
 - [Azure DevOps & Team Foundation Server](/docs/packaging-applications/build-servers/tfs-azure-devops)
 - [Bamboo](/docs/packaging-applications/build-servers/bamboo)
 - [BitBucket Pipelines](/docs/packaging-applications/build-servers/bitbucket-pipelines)
 - [Continua CI](/docs/packaging-applications/build-servers/continua-ci)
 - [GitHub Actions](/docs/packaging-applications/build-servers/github-actions)
 - [Jenkins](/docs/packaging-applications/build-servers/jenkins)
 - [TeamCity](/docs/packaging-applications/build-servers/teamcity)

Octopus supports uploading [Build information](/docs/packaging-applications/build-servers/build-information) from your build server, manually or with the use of one of the plugins, to Octopus Deploy.
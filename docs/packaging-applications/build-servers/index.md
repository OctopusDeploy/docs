---
title: Build server integration
description: Integrate your continuous integration or build server with Octopus Deploy.
position: 20
hideInThisSection: true
---

CI/CD refers to continuous integration and continuous deployment. A typical CI/CD pipeline involves a continuous integration server (or build server) and a continuous deployment server, such as Octopus. 

The continuous integration/build server compiles your code into one or more artifacts and runs tests against them.  

The continuous deployment server takes the compiled artifacts from a successful build and deploys them through the deployment pipeline which might consist of the following environments, **Dev**, **Test**, and **Production**.

## A typical CI/CD pipeline {#typical-cicd-pipeline}

A typical CI/CD pipeline with Octopus Deploy looks like this:

1. A developer commits code changes to version control.
1. The build server detects a change and performs the continuous integration build, which includes resolving dependencies, running unit tests, packaging the software and making it available in a [package repository](/docs/packaging-applications/package-repositories/index.md).
1. Octopus Deploy is notified of a new artifact in the package repository and executes the deployment process to create a release that is deployed to the **Dev** environment.
1. When a team member (perhaps a tester) wants to see what is in a particular release, they use Octopus to manually deploy a release to the **Test** environment.
1. When the team is satisfied with the quality of the release and they are ready for it to go to production, they use Octopus to promote the release from the **Test** environment to the **Production** environment.

:::hint
To learn more on how to package your software using your CI server of choice and deploy software to your specific deployment targets, please see our [End-to-End CI/CD pipeline tutorial](https://octopus.com/docs/guides).
:::

## Octopus build server integrations {#build-server-integrations}

The following tools are available to integrate your continuous integration/build server with Octopus Deploy:

 - [AppVeyor](/docs/packaging-applications/build-servers/appveyor/index.md)
 - [Azure DevOps & Team Foundation Server](/docs/packaging-applications/build-servers/tfs-azure-devops/index.md)
 - [Bamboo](/docs/packaging-applications/build-servers/bamboo.md)
 - [BitBucket Pipelines](/docs/packaging-applications/build-servers/bitbucket-pipelines/index.md)
 - [Continua CI](/docs/packaging-applications/build-servers/continua-ci.md)
 - [Github Actions](/docs/packaging-applications/build-servers/github-actions.md)
 - [Jenkins](/docs/packaging-applications/build-servers/jenkins/index.md)
 - [TeamCity](/docs/packaging-applications/build-servers/teamcity.md)

## Build information {#build-information}

It is often useful to have information flow from your build server to be associated with packages, releases, and deployments in Octopus.

The build information is associated with a package and includes:

- Build URL: A link to the build which produced the package.
- Commits: Details of the source commits related to the build.
- Issues: Issue references parsed from the commit messages.

## Passing build information to Octopus {#passing-build-information-to-octopus}

Build information is passed to Octopus as a file using a custom format. The recommended way to supply the build information is to add the _Build Information_ step from the Octopus Deploy plugin to your build server.

:::hint
**Build server support**
The Build Information step is currently available in the official Octopus [TeamCity](/docs/packaging-applications/build-servers/teamcity.md), [Bamboo](/docs/packaging-applications/build-servers/bamboo.md), and [Jenkins](/docs/packaging-applications/build-servers/jenkins/index.md) plugins.

Check our [downloads page](https://octopus.com/downloads) for our latest build server plugins.
:::

Build information is independent from the packages that it relates to. You can pass build information to Octopus **before** the packages have been pushed to either the built-in repository or an external feed. You can also [push build information manually](/blog/manually-push-build-information-to-octopus) using calls to the API when you are not utilising a Build Server.

:::warning 

Commit messages and deep links may not be shown if an unsupported `VcsType` is passed to Octopus as part of the build information call. Currently we support values of `Git` and `TFVC` (TFS / Azure DevOps). `SVN` (Subversion) is **not supported**.

:::

## Build information step {#build-information-step}

The TeamCity version of the _Build Information_ step is shown below.

![TeamCity Build Information Step](images/build-information-step.png "width=500")

:::hint

The Verbose logging option can be used to include more detail in the build logs. This includes a complete output of all of the build information being passed to Octopus, which can be useful when troubleshooting.

:::

## Viewing build information

As of `2019.10.0`, the build information for a package can be viewed by navigating to **{{Library,Build Information}}**

![Library Build information](images/library-build-information-2.png "width=500")

The build information for a package can be viewed on any release which contains the package.

![Build information on release page](images/build-information-release-2.png "width=500")

For packages pushed to the Octopus built-in repository, the build information can also be viewed in the package version details by navigating to **{{Library, Packages}}** and selecting the package.

![Build information on package version page](images/build-information-package-version-2.png "width=500")

## Using build information in release notes #{release-notes}

The build information associated with packages is available for use in [release notes](/docs/releases/release-notes.md) (and [release notes templates](/docs/releases/release-notes.md#Release-Notes-Templates)) as Octopus variables.

See the [system variable documentation](/docs/projects/variables/system-variables.md#release-package-build-information) for the available variables.

## Using build information in deployments

Package build information associated with a release will be also [captured in deployments](/docs/releases/deployment-notes.md) of the release.

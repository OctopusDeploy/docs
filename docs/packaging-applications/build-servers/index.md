---
title: Build Server Integration
description: Integrate your build server with Octopus Deploy.
position: 20
hideInThisSection: true
---

Your continuous integration/build server will package your applications and make them available to Octopus for deployment from a [package repository](/docs/packaging-applications/package-repositories/index.md). The following tools are available to integrate your continuous integration/build server with Octopus Deploy:

 - [AppVeyor](/docs/packaging-applications/build-servers/appveyor/index.md)
 - [Azure DevOps & Team Foundation Server](/docs/packaging-applications/build-servers/tfs-azure-devops/index.md)
 - [Bamboo](/docs/packaging-applications/build-servers/bamboo.md)
 - [BitBucket Pipelines](/docs/packaging-applications/build-servers/bitbucket-pipelines/index.md)
 - [Continua CI](/docs/packaging-applications/build-servers/continua-ci.md)
 - [Jenkins](/docs/packaging-applications/build-servers/jenkins.md)
 - [TeamCity](/docs/packaging-applications/build-servers/teamcity.md)

## Build Information {#build-information}

It is often useful to have information flow from your build server to be associated with packages, releases, and deployments in Octopus.

The build information is associated with a package and includes:

- Build URL: A link to the build which produced the package.
- Commits: Details of the source commits related to the build.
- Issues: Issue references parsed from the commit messages.

## Passing Build Information to Octopus {#passing-build-information-to-octopus}

Build information is passed to Octopus as a file using a custom format. The recommended way to supply the build information is to add the _Build Information_ step from the Octopus Deploy plugin to your build server.

:::hint
**Build Server support**
The Build Information step is currently available in the official Octopus [TeamCity](/docs/packaging-applications/build-servers/teamcity.md), [Bamboo](/docs/packaging-applications/build-servers/bamboo.md), and [Jenkins](/docs/packaging-applications/build-servers/jenkins.md) plugins.

Check our [downloads page](https://octopus.com/downloads) for our latest build server plugins.
:::

## Build Information Step {#build-information-step}

The TeamCity version of the _Build Information_ step is shown below.

![TeamCity Build Information Step](images/build-information-step.png)

:::hint

The Verbose logging option can be used to include more detail in the build logs. This includes a complete output of all of the build information being passed to Octopus, which can be useful when troubleshooting.

:::

## Viewing Build Information

As of `2019.10.0`, the build information for a package can be viewed by navigating to **{{Library,Build Information}}**

![Library Build information](images/library-build-information.png)

The build information for a package can be viewed on any release which contains the package.

![Build information on release page](images/build-information-release.png)

For packages pushed to the Octopus built-in repository, the build information can also be viewed in the package version details by navigating to **{{Library, Packages}}** and selecting the package.

![Build information on package version page](images/build-information-package-version.png)

## Using Build Information in Release Notes #{release-notes}

The build information associated with packages is available for use in [release notes](/docs/release-management/release-notes.md) (and [release notes templates](/docs/release-management/release-notes.md#Release-Notes-Templates)) as Octopus variables.

See the [system variable documentation](/docs/projects/variables/system-variables.md#release-package-build-information) for the available variables.

## Using Build Information in Deployments

Package build information associated with a release will be also [captured in deployments](/docs/release-management/deployment-notes.md) of the release.

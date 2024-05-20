---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-05-20
title: Build information
description: Integrate your commits and work items with Octopus Deploy.
navOrder: 5
hideInThisSection: true
---

When deploying a release, it's useful to know which build produced the artifact, what commits it contained, and which work items it's associated with. Build information allows you to upload these details from your build server, either manually or with the use of a plugin, to Octopus Deploy.

Build information is associated with a package and includes:

- Build URL: A link to the build which produced the package.
- Commits: Details of the source commits related to the build.
- Work items: Issue references parsed from the commit messages.

## Passing build information to Octopus {#passing-build-information-to-octopus}

Build information is passed to Octopus as a file using a custom format. The recommended way to supply the build information is to add the _build information_ step from the Octopus Deploy plugin to your build server.

## Build server support {#build-server-support}

The build information step is currently available in the official Octopus Deploy plugins:

- [GitHub Actions](/docs/packaging-applications/build-servers/github-actions) 
- [TeamCity](/docs/packaging-applications/build-servers/teamcity) 
- [Bamboo](/docs/packaging-applications/build-servers/bamboo)
- [Jenkins](/docs/packaging-applications/build-servers/jenkins) 
- [TFS/AzureDevOps](/docs/packaging-applications/build-servers/tfs-azure-devops)

Check our [downloads page](https://octopus.com/downloads) for our latest build server plugins.

In addition to the official plugins, there are some community supported integrations available for:
- [BitBucket Pipelines](https://bitbucket.org/octopusdeploy/octopus-cli-run/src/master)
- [CircleCI](https://circleci.com/developer/orbs/orb/octopus-samples/octo-exp)
- [Continua CI](/docs/packaging-applications/build-servers/continua-ci)

Build information is independent of the packages that it relates to. You can pass build information to Octopus **before** the packages have been pushed to either the built-in repository or an external feed. You can also [push build information manually](https://octopus.com/blog/manually-push-build-information-to-octopus) using the Octopus REST API when you aren't utilizing a build server.

:::div{.warning}
Commit messages and deep links may not be shown if an unsupported `VcsType` is passed to Octopus as part of the build information call. Currently we support values of `Git` and `TFVC` (TFS / Azure DevOps). `SVN` (Subversion) is **not supported**.

Work items will not show unless you have one of the [issue tracker](/docs/releases/issue-tracking) integrations configured.
:::

## Build information step {#build-information-step}

All of the available plugins contain a build information step/task, the TeamCity version of the _build information_ step is shown below. 

:::figure
![TeamCity build information Step](/docs/packaging-applications/build-servers/build-information/images/build-information-step.png)
:::

The build information step requires
- Octopus URL: URL of your Octopus server
- API Key: API key to use for uploading
- (Optional) Space name: Name of the space to upload the build information to
- Package ID: List of package IDs to associate the build information to
- Package version: The version of the packages

:::div{.hint}

Verbose logging can be used to include more detail in the build logs. This includes a complete output of all of the build information being passed to Octopus, which can be useful when troubleshooting.

:::

## Viewing build information {#viewing-build-information}

As of Octopus **2019.10.0**, the build information for a package can be viewed by navigating to **Library ➜ Build Information**

:::figure
![Library Build information](/docs/packaging-applications/build-servers/build-information/images/library-build-information-2.png)
:::

The build information for a package can be viewed on any release which contains the package.

:::figure
![Build information on release page](/docs/packaging-applications/build-servers/build-information/images/build-information-release-2.png)
:::

For packages pushed to the Octopus built-in repository, the build information can also be viewed in the package version details by navigating to **Library ➜ Packages** and selecting the package.

:::figure
![Build information on package version page](/docs/packaging-applications/build-servers/build-information/images/build-information-package-version-2.png)
:::

## Using build information in release notes {#build-info-in-release-notes}

The build information associated with packages is available for use in [release notes](/docs/releases/release-notes) (and [release notes templates](/docs/releases/release-notes/#templates)) as Octopus variables.

See the [system variable documentation](/docs/projects/variables/system-variables/#release-package-build-information) for the available variables.

## Using build information in deployments {#build-info-in-deployments}

Package build information associated with a release will be also [captured in deployments](/docs/releases/deployment-changes) of the release.

:::div{.warning}
Ensure you're using [pre-release versions](/docs/releases/deployment-changes#versioning) for any releases that aren't intended to be a production release. Any releases that aren't a pre-release will be treated as a full release by Octopus, which can result in deployments containing a larger amount of build information than intended.
:::
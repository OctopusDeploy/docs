---
title: Build Information 
description: Passing information from your build server into Octopus Deploy 
position: 05 
hideInThisSection: true
---

It is often useful to have information flow from your build server, and be associated with packages, releases, and deployments in Octopus.  
The build information is associated with a package, and includes:

- Build URL: A link to the build which produced the package  
- Commits: Details of the source commits related to the build 
- Issues: Issue references parsed from the commit messages 

## Passing Build Information to Octopus {#passing-build-information-to-octopus}

Build information is passed to Octopus as a file, using a custom format.  The recommended way to supply the build information is to add the _Build Information_ step from the Octopus Deploy plugin to your build server. 

:::hint
**Build Server support**
The Build Information step is currently available in the official Octopus [TeamCity](/docs/packaging-applications/build-servers/teamcity.md) and [Bamboo](/docs/packaging-applications/build-servers/bamboo.md) plugins. Support for other build servers is coming soon. 

Check our [downloads page](https://octopus.com/downloads) for our latest build server plugins.
:::

The TeamCity version of the _Build Information_ step is shown below.

![TeamCity Build Information Step](metadata-step.png)

## Viewing Build Information

The build information for a package can be viewed on any release which contains the package.

![Build information on release page](build-information-release.png)

For packages pushed to the Octopus built-in repository, the build information can also be viewed on the package version details in {{Library, Packages}} 

![Build information on package version page](build-information-package-version.png)

## Using Build Information in Release Notes #{release-notes}

The build information associated with packages is available to be used in [release notes](/docs/deployment-process/releases/release-notes.md) (and [release notes templates](/docs/deployment-process/releases/release-notes.md#Release-Notes-Templates)) as Octopus variables.

See the [system variable documentation](/docs/deployment-process/variables/system-variables.md#release-package-build-information) for the available variables.

## Using Build Information in Deployments

Package build information associated with a release will be also [captured in deployments](/docs/deployment-process/releases/deployment-notes.md) of the release.
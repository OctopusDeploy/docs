---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Release notes
description: Enrich your releases with notes
navOrder: 135
---

When you create a release, you can add notes:

![Editing release notes](/docs/releases/images/release-notes-edit.png "width=500")

![Viewing release notes](/docs/releases/images/release-notes-view.png "width=500")

## Using variables in release notes

Release notes may contain variable expressions. These will be evaluated and substituted when the release is created.

Only variables in scope when the release is created will be available for use in release notes. Variables scoped to environments, tenants, target roles, or targets will _not_ be available as these scopes apply only during deployments.   

[Build information](/docs/packaging-applications/build-servers/build-information/) associated with packages in the release may also be used in release notes.

![Build information variables in release notes](/docs/releases/images/release-notes-build-information.png "width=500")

## Accessing release notes during a deployment

The release notes may be accessed during a deployment using the [Octopus.Release.Notes](/docs/projects/variables/system-variables/#Systemvariables-Release) variable.  

Release notes are also rolled up into the [deployment notes](/docs/releases/deployment-notes/).

## Release notes templates {#Release-Notes-Templates}

A release notes template can be configured in {{Project,Settings,Release Notes Template}}

A release notes template is a convenient way to keep release notes consistent and avoid entering the same text repeatedly.   

Release notes templates will generally be most useful when combined with package build information, pushed from the build server.

The following are examples of using release notes templates with package [build information](/docs/packaging-applications/build-servers/build-information/) and [issues](/docs/releases/issue-tracking/).

:::hint
4 spaces of indentation in a Release Note template indicates a code block. 
:::

### Example templates

The following example illustrates some sample text followed by the packages, with the packages rendered as a bullet point list:

```
Here are the notes for the packages
#{each package in Octopus.Release.Package}
- #{package.PackageId} #{package.Version}
#{each workItem in package.WorkItems}
    - [#{workItem.Id}](#{workItem.LinkUrl}) - #{workItem.Description}
#{/each}
#{/each}
```

Sometimes you might have different packages contributing to an application, e.g. app server and database might be separate packages. In these cases both packages might contain fixes for the same work item, which would look confusing in the release notes. To support this case there is a distinct list of work items, across all packages, included at the top level of the data. An example of using it is as follows:

```
#{each workItem in Octopus.Release.WorkItems}
- [#{workItem.Id}](#{workItem.LinkUrl}) - #{workItem.Description}
#{/each}
```

For some use cases there are actually no work items, the nature of the changes is such that the commit messages themselves should form the release notes. The raw commit data is available per package for the release notes templates:

```
Here are the notes for the packages
#{each package in Octopus.Release.Package}
- #{package.PackageId} #{package.Version}
#{each commit in package.Commits}
    - [#{commit.CommitId}](#{commit.LinkUrl}) - #{commit.Comment}
#{/each}
#{/each}
```

Build and version control details are exposed by the `Octopus.Release.Builds` variable. The example below lists the details of each build that contributed to the release:

```
#{each build in Octopus.Release.Builds}
* #{build.Packages}
* #{build.BuildUrl}
* #{build.Branch}
* #{build.BuildEnvironment}
* #{build.BuildNumber}
* #{build.VcsRoot}
* #{build.VcsType}
* #{build.VcsCommitNumber}
* #{build.VcsCommitUrl}
#{/each}
```

The `Octopus.Release.Builds[].Packages` variable is a JSON array containing the packages produced by a build. An example of this variable's value is `[{"PackageId":"randomquotes","Version":"0.1.247"}]`.

The package ID can be used as an index for the `Octopus.Release.Package` variable with a nested Octostache expression:

```
#{Octopus.Release.Package[#{Octopus.Release.Builds[0].Packages[0].PackageId}].WorkItems}
```

### Release notes accumulation 

Inherent in building software is the idea that over time the product is the accumulation of the features, issues, and bugs that have been built, released, and deployed.  When software is deployed to a particular environment it is an aggregate of functionality that has been added since the last deployment.  

Consider this example:

![release notes accumulation](/docs/releases/images/release-notes-accumulation.png "width=500")

When deploying `1.0.3` to **Development** the only difference is `Enh 6` because the most recent release was `1.0.2`.  However, `1.0.2` was not deployed to **Staging**, when `1.0.3` is deployed to **Staging** is is the accumulation of both `1.0.2` and `1.0.3`.  

Under the covers, Octopus tracks this by channels.  When it is time to deploy `1.0.3` to **Production** the logic will do the following:

- Calculate the last release to **Production** was `1.0.0`.
- Determine releases `1.0.1` and `1.0.2` have numbers between the releases `1.0.0` and `1.0.3`.
- Aggregate all the work items and packages for releases `1.0.1`, `1.0.2`, and `1.0.3`.

:::hint
The code goes strictly off of version numbers, not when the release was deployed.  If you were to deploy `1.0.1` to **Production**, then rollback to `1.0.0` it will include `1.0.1` in the next deployment to **Production**
:::
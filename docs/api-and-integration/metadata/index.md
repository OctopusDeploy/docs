---
title: Metadata and Work Items
description: Configuring Octopus metadata and work item integration.
position: 0
hideInThisSection: true
---

Octopus uses metadata that can tell you how a package was built and what went into the package. This metadata includes work items which represent the bugs and enhancements that go into new builds of your software.

As an example, consider the following

![Work item accumulation](accumulation.png)

This diagram depicts multiple releases and deployments that have occurred over time, along with which work item details are included for each deployment. In this scenario, each release was immediately deployed to the Dev environment, which results in the simplest case because there was only a single release involved.

The deployments for `1.0.3` illustrate a more complex roll-up of work items. When `1.0.3` was deployed to the Staging environment, it included work items from releases `1.0.2` and `1.0.3`. Similarly, when it was deployed to the Prod environment, it also included the work items from `1.0.1`.

When configured, your build server passes metadata to Octopus and it is included in the release and deployment details. This section explains how to configure integration between your build server and Octopus to take advantage of these features.

## Building the Metadata

Octopus uses a custom metadata file as the method of transport for passing this information through the pipeline, pushing the file to the server separately from the package itself.

Keeping the file separate to the package means that packages stored in external feeds can still provide the custom metadata to Octopus. This means it also works for things like container images that are pushed to container repositories.

:::hint
**Build Server support**
Our metadata step is included in our TeamCity, Bamboo, and Azure DevOps/TFS plugins, but we do not yet have an official Jenkins plugin. Therefore our metadata step, and thus Jira integration, is not yet supported with a Jenkins build server.
:::

To create the metadata file and provide it to Octopus, use the Octopus _Metadata_ step in your build server (below is the TeamCity version of the step for illustration).

![Package Metadata Step](metadata-step.png)

The **Commit processing** tells Octopus which format of work item references to look for in the commit messages.

The metadata will appear in the package feed details for any package in the internal feed that has had metadata pushed.

![Package Details](package-detail.png)

If you have configured an issue tracker extension (e.g. Jira), that matches the work items type, they will appear as a link to the issue tracking system. If not, they appear as plain text.

Note that you can actually have multiple "issue trackers" enabled at the same time. In the screenshot above, both the Jira and GitHub trackers are enabled. The reason being that the GitHub tracker knows how to render the links back to the commits. If you disabled it then the work items links would still appear to Jira, but the commit link would not display.

## Releases and Deployments

When a release is created for the project, the work items are collected from the selected package versions and displayed with the package details.

![Release work-items](release-work-items.png)

When this release is deployed the metadata from the release will be passed to the deployment. This metadata will be displayed in the deployment preview.

![Deployment preview collapsed](deploy-preview-work-items.png)

When expanded you will see the details of each release that has gone in to the deployment.

![Deployment preview expanded](deploy-preview-expanded.png)

The Release Changes are also displayed on the task summary for the deployment.

![Deployment work items](deploy-work-items.png)

In some scenarios this one-to-one between releases and deployments will be the norm. Teams using continuous deployment may see a rapid progression of versions through their environments and on to production.

Many teams don't operate like this though. It is common for a number of releases to be prepared and tested before being promoted to the next environment. For example, they may merge pull requests for several fixes/features and then deploy the final release to test. This can be repeated several times and eventually a final release progresses from test to production. In this situation the deployment to production isn't just the work items from that last release, it is _the accumulation of all of the work items in all of the releases since the last one that was deployed to production_.

Given that you can initiate deployments to multiple "scopes" at once in Octopus it is expected that you could see different work items lists for each scope.

For instance, if you have two tenants in the same environment, and **tenant A** is on an earlier version than **tenant B**, the resulting list for **tenant A** will be the list for **tenant B** plus the additional work items between the version it was on and the version **tenant B** was on.

As a second example, imagine you have two environments in a lifecycle, for instance, **staging** and **performance**, but you don't always deploy to one of the environments. Maybe you periodically deploy to the **performance** environment to check for regressions but not every time you deploy to **staging**. The work items for the **performance** environment will be the same as **staging** plus the additional work items for the releases in between.

## Deploy a Release Step

The Octopus [deploy release step](https://g.octopushq.com/DeployReleaseStep) adds an interesting dimension to metadata accumulation. When you use this step Octopus treats each "child project" like it is a package. It also treats the child project's release as a potential source for metadata.

When creating the releases in the "parent project" Octopus accumulates the release notes and metadata from the child projects just as it would for packages.

## Release Notes Templates {#Release-Notes-Templates}

To help take advantage of all of this metadata knowledge in the packages, Octopus supports using release notes with variables substitution. A release notes template can also be specified in the project settings, to make consistency across releases easy.

Learn more about [Release Notes Templates](release-notes-templates.md).

## Release Notes from the issue tracker

The Octopus extensions support a default format for the work item details for each issue tracker. They can also be configured to retrieve release note information from the work items in the issue tracker itself.

This allows for more specific control over the release notes content. For more details on how each issue tracker can be configured see the issue tracker specific pages listed in the section below.

## Issue Trackers

If you are using an issue tracker like Jira, Octopus can also be integrated with it to provide information about the progress of work items. For more details see:

- [Jira Issue Tracker](/docs/api-and-integration/metadata/jira.md)
- [GitHub Issue Tracker](/docs/api-and-integration/metadata/github.md)
- [Release note Templates](/docs/api-and-integration/metadata/release-notes-templates.md)

---
title: Channels
description: Channels allow you to dynamically change the deployment logic and lifecycle of a project based on the version being deployed.
position: 40
---

Channels is a feature in Octopus that gives you control over how different versions of your software are [released](/docs/deployment-process/releases/index.md) across your [environments](/docs/infrastructure/environments/index.md), without the need to clone [projects](/docs/deployment-process/projects/index.md) or duplicate work across multiple projects.

Promoting your software across your different environments is a standard part of the [deployment process](/docs/deployment-process/index.md) in Octopus, and you don't need channels to achieve it. Every project has a default channel that is used when you create releases.

Channels is designed to give you more control and options when you need more than a single release strategy for a project. For instance, Channels let you use different  [lifecycles](/docs/deployment-process/lifecycle/index.md) to control which versions of your software go to which environments and can be useful in the following scenarios:

- New versions of the software are released automatically to dev environments, promoted to test environments, and finally released to production environments.
- Different customers are on different versions of your software and you want to provide patches to each version, for instance, `version 1` and `version 2`.
- Feature branches are deployed to test environments but not production.
- Experimental branches are released to development environments but never released to test or production.
- Early access versions of the software are released to members of your early access program.
- Hot-fixes are deployed straight to production.
- You need to update you deployment process without interrupting production releases.

When you are implementing a deployment process that uses channels you can scope the following to specific channels:

- Lifecycles
- Steps
- Variables
- Tenants

You can also define versioning rules per channel to ensure that only versions which meet specific criteria are deployed to specific channels.

## Managing Channels

Every [project](/docs/deployment-process/projects/index.md) has a default channel.

Channels are managed from the Project overview page by selecting the specific project you are working with and clicking **Channels**.

## Create a New Channel

1. From the Channels page, click on the **ADD CHANNEL** button.
2. Give the Channel a name and add a description. The name must be unique within the project.
3. Select the [Lifecycle](/docs/deployment-process/lifecycle/index.md) the channel will use, or allow the channel to inherit the default lifecycle for the project. See the [Lifecycle docs](/docs/deployment-process/lifecycle/index.md) for information about creating new lifecycles.
4. If you want to make this the default Channel for the project, click the **Default Channel** checkbox.
5. Design the [version rules](#version-rules) that will be used to enforce which versions of you packages are deployed to this channel.







:::success
The [Channels Walkthrough](https://octopus.com/blog/channels-walkthrough) blog post and accompanying video, goes implementing some of these channel Strategies.
:::



Create a lifecycle
create a channel
Add a version rule
scope steps for the ....
Create the release
... select the channel

Default channel...

<!-- source content -->

Channels in Octopus Deploy will help you if you want to:

[Manage multiple active versions of the same project](https://octopus.com/blog/channels-walkthrough#supporting-multiple-versions). For example, maintaining patch/hotfix releases for v1 whilst starting work on v2.
-[Change your deployment process without creating a barrier for production releases](https://octopus.com/blog/channels-walkthrough#supporting-multiple-versions). For example, adding a new step to your process, or modifying an existing step.
[Deploy a hot-fix directly to Production](https://octopus.com/blog/channels-walkthrough#hotfix-deployments) where you would normal promote each release through a series of Environments.
[Provide your customers with access to early builds of your project](https://octopus.com/blog/channels-walkthrough#early-access-programs).
[Automatically deploy feature-branch builds to a test environment](https://octopus.com/blog/channels-walkthrough#feature-branch-deployments), sometimes called a Phoenix environment. For example, as soon as a developer commits code to a feature branch, you want that version of the project to be deployed into a sandbox test environment.
-[You use a branching strategy in your source code repository](/docs/deployment-patterns/branching.md). For example, you might be using [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/) or another source code branching strategy.

Each Release you create in Octopus Deploy is placed into a Channel, and Releases in each Channel can be treated differently. For each Channel you can define:

- Which [Lifecycle](/docs/deployment-process/lifecycles/index.md) to use for promoting Releases: for example, feature releases may be promoted through the testing environments, while hot-fix releases may go directly to production.
- Which [Deployment Process](/docs/deployment-examples/index.md) to use when deploying Releases: for example, steps can be enabled for specific channels.
- Which [Variables](/docs/deployment-process/variables/index.md) to use: Variables can be scoped to channels.
- Which tenants should be included when deploying Releases: for example, you can ensure only Releases from certain Channels are deployed to certain Tenants.

Channels can also help you to create consistent Releases by specifying Version Rules that apply to each Package.

## Managing Channels {#Channels-ManagingChannels}

Channels are managed per project.  Select the **Channels** menu item from the Project overview page.

Click **Create Channel** to create a new Channel.

The Channel must have a unique name per project.

You can associate a Lifecycle with the Channel, or it may inherit the default from the Project.

### Defining Version Rules {#Channels-versionrules}

Version rules assist in selecting the correct versions of packages for the Channel.  They are only used when creating a release, either manually or via [Automatic Release Creation](/docs/deployment-process/releases/automatic-release-creation.md).

:::hint
**SemVer works best**
Version Rules will work best when you follow [Semantic Versioning (SemVer 2.0.0)](http://semver.org) for your versioning strategy.
:::

To add version rules to a Channel, click **Add version rule** on the Channel page.

![](/docs/images/3048999/3278458.png "width=500")

#### Steps {#Channels-Steps}

The steps selected for a specific rule define which packages will be filtered on the *Create Release* page based on the following provided range and tag information. Note that either a version range or pre-release tag regex must be provided for a valid version rule.

#### Version Range {#Channels-VersionRange}

A provided version range based on the [NuGet versioning syntax](http://g.octopushq.com/NuGetVersioning) can be applied to the release creation package selection.

:::success
You can use the full semantic version as part of your version range specification. For example: `[2.0.0-alpha.1,2.0.0)` will match all 2.0.0 pre-releases (where the pre-release component is `>= alpha.1`), and will exclude the 2.0.0 release.

![](/docs/images/3048999/5865686.png "width=500")
:::

#### Tags {#Channels-tags}

Following the standard 2.0.0 [semver syntax](http://semver.org/), a pre-release tag is the alpha numeric text that can appear after the standard *major.minor.patch* pattern immediately following a hyphen. Providing a regex pattern for this field allows the channel to filter packages based on their tag in a very flexible manner. Some examples are.

| **Pattern** | **Description** | **Example use-case** |
| --- | --- | --- |
| .\+ | matches any pre-release | Enforce inability to push to production by specifying lifecycle that stops at staging |
| ^$ | matches any non pre-release | Ensure a script step only runs for non pre-release packages |
| beta.\* | matches pre-releases like beta and beta0003 | Deploy pre-releases using a Lifecycle that goes directly to a pre-release Environment |
| ^(?!beta).+ | matches pre-releases that don't start with beta | Consider anything other than 'beta' to be a feature branch package so you can provision short-term infrastructure and deploy to it |
| bugfix- | matches any with '*bugfix-*' prefix (e.g. *bugfix-syscrash)* | Bypass Dev & UAT environments when urgent bug fixes are made to the mainline branch and to be released straight from Staging to Production |

## Using Channels {#Channels-UsingChannels}

Once a project has more than one Channel, there a number of places they may be used.

### Controlling Deployment Lifecycle {#Channels-ControllingDeploymentLifecycle}

Each Channel defines which Lifecycle to use when promoting Releases between Environments. You can choose a Lifecycle for each Channel, or use the default Lifecycle defined by the Project.

![](/docs/images/3048999/5865685.png "width=500")

### Modifying Deployment Process {#Channels-ModifyingDeploymentProcess}

Deployment Steps can be restricted to only run on specific Channels.

![](/docs/images/3048999/3278459.png "width=500")

### Variables {#Channels-Variables}

Variables may be scoped to specific Channels.

![](/docs/images/3048999/3278460.png "width=500")

### Deploying to Tenants {#Channels-DeployingtoTenants}

You can control which Releases will be deployed to certain Tenants using Channels. In this example, Releases in this Channel will only be deployed to Tenants tagged with `Early access program/2.x Beta`.

![](/docs/images/3048999/5865683.png "width=500")

## Creating Releases {#Channels-CreatingReleases}

Every Release in Octopus Deploy must be placed into a Channel. Wherever possible Octopus will choose the best possible Channel for your Release, or you can manually select a Channel for your Release.

### Manually Creating Releases {#Channels-ManuallyCreatingReleases}

When you are creating a Release, you can select a Channel.

![](/docs/images/3048999/3278463.png "width=500")

Selecting the Channel will cause the Release to use the Lifecycle associated with the Channel (or the Project default, if the Channel does not have a Lifecycle).  It will also cause the Deployment Process and Variables to be modified as specified above.

The package list allows you to select the version of each package involved in the deployment.  The *latest* column displays the latest packages that match the version rules defined for the Channel (see [version rules](/docs/deployment-process/channels.md) for more information).

### Using Build Server Extensions or Octo.exe {#Channels-UsingBuildServerExtensionsorOcto.exe}

When using one of the [build server extensions](/docs/api-and-integration/index.md) or [octo.exe](/docs/api-and-integration/octo.exe-command-line/creating-releases.md) to create releases, you can either let Octopus automatically choose the correct Channel for your Release (this is the default behavior), or choose a specific Channel yourself.

### Automatic Release Creation {#Channels-AutomaticReleaseCreation}

When enabling [Automatic Release Creation](/docs/deployment-process/releases/automatic-release-creation.md) for your project, you are required to select a Channel (if the project has more than one).

![](/docs/images/3048999/3278462.png "width=500")

Any releases created automatically will use the configured channel.  Additionally, any Version Rules configured for the Channel will be used to decide whether a release is automatically created.

For example, if version 3.1.0 of a package Acme.Web is pushed to the Octopus internal NuGet repository, and the Channel selected for Automatic Release Creation has a Version Rule as pictured below, then no release will be created.

![](/docs/images/3048999/3278461.png "width=500")

:::hint
If adding a pre-release tag to channels, you will also need to add the tag `^$` to your `default` channel
:::
